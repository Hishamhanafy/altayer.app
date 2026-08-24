import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../modules/redis/redis.service';
import { RidesService } from '../modules/rides/rides.service';
import { CreateRideDto, SubmitBidDto, VerifyOtpStartDto } from '../modules/rides/dto/ride.dto';
import { BookingType } from '@prisma/client';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(RealtimeGateway.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly ridesService: RidesService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.replace('Bearer ', '');
      if (token) {
        const payload = this.jwtService.decode(token) as any;
        if (payload?.sub) {
          client.data.userId = payload.sub;
          client.data.role = payload.role;
          client.data.driverProfileId = payload.driverProfileId;

          // Join personal room for private notifications
          client.join(`user:${payload.sub}`);
          if (payload.driverProfileId) {
            client.join(`driver:${payload.driverProfileId}`);
            client.join('drivers:active');
          }
          this.logger.log(`Client Connected: ${payload.phoneNumber} (${payload.role})`);
        }
      }
    } catch (err) {
      this.logger.warn(`Unauthenticated client connection: ${client.id}`);
    }
  }

  handleDisconnect(client: Socket) {
    if (client.data.driverProfileId) {
      this.redisService.removeDriverLocation(client.data.driverProfileId);
    }
    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  // --- Driver Location Updates ---
  @SubscribeMessage('driver:update_location')
  async handleDriverLocation(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { lat: number; lng: number; heading?: number; speed?: number; category?: string; rideId?: string },
  ) {
    const driverId = client.data.driverProfileId;
    if (!driverId) return;

    await this.redisService.updateDriverLocation(driverId, data.lat, data.lng, data.category || 'ECONOMY');

    // If driver is currently on an active ride, stream location directly to the rider
    if (data.rideId) {
      this.server.to(`ride:${data.rideId}`).emit('ride:live_tracking', {
        driverId,
        lat: data.lat,
        lng: data.lng,
        heading: data.heading,
        speed: data.speed,
      });
    }

    // Broadcast to Admin live radar
    this.server.to('admin:radar').emit('radar:driver_moved', {
      driverId,
      lat: data.lat,
      lng: data.lng,
    });
  }

  // --- Create Ride Request (Instant or Bidding) ---
  @SubscribeMessage('ride:create_request')
  async handleCreateRide(@ConnectedSocket() client: Socket, @MessageBody() dto: CreateRideDto) {
    const riderId = client.data.userId;
    const ride = await this.ridesService.createRide(riderId, dto);

    // Rider joins dedicated ride room
    client.join(`ride:${ride.id}`);

    if (dto.bookingType === BookingType.BIDDING) {
      // Broadcast bidding request to nearby drivers within 5km
      const nearby = await this.redisService.getNearbyDrivers(dto.pickupLat, dto.pickupLng, 5, dto.serviceCategory);
      
      for (const d of nearby) {
        this.server.to(`driver:${d.driverId}`).emit('ride:new_bidding_available', {
          rideId: ride.id,
          rideNumber: ride.rideNumber,
          pickupAddress: ride.pickupAddress,
          dropoffAddress: ride.dropoffAddress,
          distanceKm: ride.estimatedDistanceKm,
          estimatedMinutes: ride.estimatedDurationMins,
          initialPrice: ride.initialPrice,
          serviceCategory: ride.serviceCategory,
          pickupLat: ride.pickupLat,
          pickupLng: ride.pickupLng,
        });
      }
    } else {
      // Instant auto-dispatch: Alert nearest driver
      const nearby = await this.redisService.getNearbyDrivers(dto.pickupLat, dto.pickupLng, 3, dto.serviceCategory);
      if (nearby.length > 0) {
        const nearestDriver = nearby[0];
        this.server.to(`driver:${nearestDriver.driverId}`).emit('ride:instant_request', {
          rideId: ride.id,
          rideNumber: ride.rideNumber,
          pickupAddress: ride.pickupAddress,
          dropoffAddress: ride.dropoffAddress,
          fare: ride.initialPrice,
          distanceKm: ride.estimatedDistanceKm,
          timeoutSeconds: 15,
        });
      }
    }

    return { success: true, ride };
  }

  // --- Driver Submits Bid (in Bidding Mode) ---
  @SubscribeMessage('ride:submit_bid')
  async handleSubmitBid(@ConnectedSocket() client: Socket, @MessageBody() dto: SubmitBidDto) {
    const driverProfileId = client.data.driverProfileId;
    const bid = await this.ridesService.submitBid(driverProfileId, dto);

    // Stream bid card to Rider in real-time
    this.server.to(`ride:${dto.rideId}`).emit('ride:bid_received', bid);
    return { success: true, bid };
  }

  // --- Rider Accepts a Bid ---
  @SubscribeMessage('ride:accept_bid')
  async handleAcceptBid(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { rideId: string; bidId: string },
  ) {
    const riderId = client.data.userId;
    const updatedRide = await this.ridesService.acceptBid(riderId, data.rideId, data.bidId);

    // Notify the chosen driver
    this.server.to(`driver:${updatedRide.driverId}`).emit('ride:bid_won', {
      ride: updatedRide,
    });

    // Notify the ride room
    this.server.to(`ride:${data.rideId}`).emit('ride:status_changed', {
      status: 'ACCEPTED',
      ride: updatedRide,
    });

    return { success: true, ride: updatedRide };
  }

  // --- Driver Lifecycle Actions ---
  @SubscribeMessage('ride:driver_arrived')
  async handleDriverArrived(@ConnectedSocket() client: Socket, @MessageBody() data: { rideId: string }) {
    const updatedRide = await this.ridesService.driverArrived(client.data.driverProfileId, data.rideId);
    this.server.to(`ride:${data.rideId}`).emit('ride:status_changed', {
      status: 'ARRIVED',
      ride: updatedRide,
    });
    return { success: true };
  }

  @SubscribeMessage('ride:start_trip')
  async handleStartTrip(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { rideId: string; otpCode: string },
  ) {
    const updatedRide = await this.ridesService.startRide(client.data.driverProfileId, data.rideId, { otpCode: data.otpCode });
    this.server.to(`ride:${data.rideId}`).emit('ride:status_changed', {
      status: 'IN_PROGRESS',
      ride: updatedRide,
    });
    return { success: true };
  }

  @SubscribeMessage('ride:complete_trip')
  async handleCompleteTrip(@ConnectedSocket() client: Socket, @MessageBody() data: { rideId: string }) {
    const updatedRide = await this.ridesService.completeRide(client.data.driverProfileId, data.rideId);
    this.server.to(`ride:${data.rideId}`).emit('ride:status_changed', {
      status: 'COMPLETED',
      ride: updatedRide,
    });
    return { success: true, ride: updatedRide };
  }
}
