import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { GeospatialService } from '../geospatial/geospatial.service';
import { WalletsService } from '../wallets/wallets.service';
import { CreateRideDto, SubmitBidDto, VerifyOtpStartDto } from './dto/ride.dto';
import { BookingType, RideStatus, PaymentMethod, PaymentStatus } from '@prisma/client';

@Injectable()
export class RidesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly geoService: GeospatialService,
    private readonly walletsService: WalletsService,
  ) {}

  /**
   * Create a new ride request (Instant or Bidding)
   */
  async createRide(riderId: string, dto: CreateRideDto) {
    const distanceKm = this.geoService.calculateDistanceKm(
      dto.pickupLat,
      dto.pickupLng,
      dto.dropoffLat,
      dto.dropoffLng,
    );
    const estimatedMinutes = Math.max(Math.ceil(distanceKm * 2.4), 5);
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const rideNumber = `#ALT-${Math.floor(10000 + Math.random() * 90000)}`;

    const initialStatus = dto.bookingType === BookingType.INSTANT ? RideStatus.SEARCHING : RideStatus.BROADCASTING;

    const ride = await this.prisma.ride.create({
      data: {
        rideNumber,
        riderId,
        bookingType: dto.bookingType,
        serviceCategory: dto.serviceCategory,
        pickupLat: dto.pickupLat,
        pickupLng: dto.pickupLng,
        pickupAddress: dto.pickupAddress,
        dropoffLat: dto.dropoffLat,
        dropoffLng: dto.dropoffLng,
        dropoffAddress: dto.dropoffAddress,
        estimatedDistanceKm: distanceKm,
        estimatedDurationMins: estimatedMinutes,
        initialPrice: dto.initialPrice,
        finalFare: dto.bookingType === BookingType.INSTANT ? dto.initialPrice : null,
        paymentMethod: dto.paymentMethod || PaymentMethod.CASH,
        otpCode,
        status: initialStatus,
      },
      include: {
        rider: { select: { id: true, fullName: true, phoneNumber: true, avatarUrl: true } },
      },
    });

    return ride;
  }

  /**
   * Get ride details by ID
   */
  async getRideById(rideId: string) {
    const ride = await this.prisma.ride.findUnique({
      where: { id: rideId },
      include: {
        rider: { select: { id: true, fullName: true, phoneNumber: true, avatarUrl: true } },
        driver: {
          include: {
            user: { select: { id: true, fullName: true, phoneNumber: true, avatarUrl: true } },
            vehicle: true,
          },
        },
        bids: {
          include: {
            driver: {
              include: {
                user: { select: { id: true, fullName: true, phoneNumber: true, avatarUrl: true } },
                vehicle: true,
              },
            },
          },
          orderBy: { proposedFare: 'asc' },
        },
      },
    });

    if (!ride) throw new NotFoundException('Ride not found');
    return ride;
  }

  /**
   * Driver submits a bid for a bidding ride
   */
  async submitBid(driverProfileId: string, dto: SubmitBidDto) {
    const ride = await this.prisma.ride.findUnique({ where: { id: dto.rideId } });
    if (!ride) throw new NotFoundException('Ride not found');
    if (ride.status !== RideStatus.BROADCASTING && ride.status !== RideStatus.SEARCHING) {
      throw new BadRequestException('This ride is no longer accepting bids');
    }

    // Upsert bid
    const bid = await this.prisma.rideBid.create({
      data: {
        rideId: dto.rideId,
        driverId: driverProfileId,
        proposedFare: dto.proposedFare,
        etaMinutes: dto.etaMinutes,
      },
      include: {
        driver: {
          include: {
            user: { select: { id: true, fullName: true, phoneNumber: true, avatarUrl: true } },
            vehicle: true,
          },
        },
      },
    });

    return bid;
  }

  /**
   * Rider accepts a driver's bid (in Bidding mode)
   */
  async acceptBid(riderId: string, rideId: string, bidId: string) {
    const ride = await this.prisma.ride.findUnique({ where: { id: rideId } });
    if (!ride) throw new NotFoundException('Ride not found');
    if (ride.riderId !== riderId) throw new ForbiddenException('Unauthorized');
    if (ride.status !== RideStatus.BROADCASTING && ride.status !== RideStatus.SEARCHING) {
      throw new BadRequestException('Ride is already assigned or completed');
    }

    const bid = await this.prisma.rideBid.findUnique({ where: { id: bidId } });
    if (!bid || bid.rideId !== rideId) throw new NotFoundException('Bid not found');

    // Commission calculation (e.g. 10% for bidding)
    const commission = parseFloat((bid.proposedFare * 0.10).toFixed(2));

    // Update ride to ACCEPTED
    const updatedRide = await this.prisma.ride.update({
      where: { id: rideId },
      data: {
        driverId: bid.driverId,
        finalFare: bid.proposedFare,
        platformCommission: commission,
        status: RideStatus.ACCEPTED,
      },
      include: {
        driver: {
          include: {
            user: { select: { id: true, fullName: true, phoneNumber: true, avatarUrl: true } },
            vehicle: true,
          },
        },
      },
    });

    // Mark winning bid as ACCEPTED and others as REJECTED
    await this.prisma.rideBid.update({ where: { id: bidId }, data: { status: 'ACCEPTED' } });
    await this.prisma.rideBid.updateMany({
      where: { rideId, id: { not: bidId } },
      data: { status: 'REJECTED' },
    });

    return updatedRide;
  }

  /**
   * Driver confirms arrival at pickup location
   */
  async driverArrived(driverProfileId: string, rideId: string) {
    const ride = await this.prisma.ride.findUnique({ where: { id: rideId } });
    if (!ride || ride.driverId !== driverProfileId) throw new BadRequestException('Invalid ride or driver');

    return this.prisma.ride.update({
      where: { id: rideId },
      data: { status: RideStatus.ARRIVED },
    });
  }

  /**
   * Start trip after verifying Rider's OTP
   */
  async startRide(driverProfileId: string, rideId: string, dto: VerifyOtpStartDto) {
    const ride = await this.prisma.ride.findUnique({ where: { id: rideId } });
    if (!ride || ride.driverId !== driverProfileId) throw new BadRequestException('Invalid ride or driver');
    if (ride.otpCode !== dto.otpCode) throw new BadRequestException('Invalid OTP security code');

    return this.prisma.ride.update({
      where: { id: rideId },
      data: {
        status: RideStatus.IN_PROGRESS,
        startedAt: new Date(),
      },
    });
  }

  /**
   * Complete trip, finalize accounting & wallets
   */
  async completeRide(driverProfileId: string, rideId: string) {
    const ride = await this.prisma.ride.findUnique({
      where: { id: rideId },
      include: { driver: true },
    });

    if (!ride || ride.driverId !== driverProfileId) throw new BadRequestException('Invalid ride or driver');
    if (ride.status !== RideStatus.IN_PROGRESS) throw new BadRequestException('Ride is not in progress');

    const completedAt = new Date();
    const finalFare = ride.finalFare || ride.initialPrice;
    
    // Commission rate: 15% for instant, 10% for bidding
    const commissionPct = ride.bookingType === BookingType.INSTANT ? 0.15 : 0.10;
    const commission = parseFloat((finalFare * commissionPct).toFixed(2));

    const updatedRide = await this.prisma.ride.update({
      where: { id: rideId },
      data: {
        status: RideStatus.COMPLETED,
        completedAt,
        finalFare,
        platformCommission: commission,
        paymentStatus: PaymentStatus.PAID,
      },
    });

    // Update driver trip count
    await this.prisma.driverProfile.update({
      where: { id: driverProfileId },
      data: { totalTrips: { increment: 1 } },
    });

    // Process Ledger accounting (deduct commission from driver's wallet if cash)
    await this.walletsService.processRideSettlement(
      ride.driver.userId,
      ride.riderId,
      ride.id,
      finalFare,
      commission,
      ride.paymentMethod,
    );

    return updatedRide;
  }

  /**
   * Cancel Ride
   */
  async cancelRide(userId: string, rideId: string, reason?: string) {
    const ride = await this.prisma.ride.findUnique({ where: { id: rideId } });
    if (!ride) throw new NotFoundException('Ride not found');

    const isRider = ride.riderId === userId;

    return this.prisma.ride.update({
      where: { id: rideId },
      data: {
        status: RideStatus.CANCELLED,
        cancelReason: reason || 'Cancelled by user',
        cancelledBy: isRider ? 'RIDER' : 'DRIVER',
      },
    });
  }
}
