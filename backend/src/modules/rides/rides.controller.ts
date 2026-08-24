import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RidesService } from './rides.service';
import { CreateRideDto, SubmitBidDto, VerifyOtpStartDto } from './dto/ride.dto';

@ApiTags('Rides Lifecycle & Bidding')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('api/v1/rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new ride request (Instant or Bidding)' })
  async createRide(@Request() req: any, @Body() dto: CreateRideDto) {
    return this.ridesService.createRide(req.user.id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ride details and current bidding offers' })
  async getRide(@Param('id') id: string) {
    return this.ridesService.getRideById(id);
  }

  @Post(':id/bid')
  @ApiOperation({ summary: 'Driver submits or counter-offers a price on a bidding ride' })
  async submitBid(@Request() req: any, @Param('id') id: string, @Body() body: { proposedFare: number; etaMinutes: number }) {
    return this.ridesService.submitBid(req.user.driverProfileId, {
      rideId: id,
      proposedFare: body.proposedFare,
      etaMinutes: body.etaMinutes,
    });
  }

  @Post(':id/accept-bid/:bidId')
  @ApiOperation({ summary: 'Rider accepts a specific driver bid offer' })
  async acceptBid(@Request() req: any, @Param('id') rideId: string, @Param('bidId') bidId: string) {
    return this.ridesService.acceptBid(req.user.id, rideId, bidId);
  }

  @Post(':id/arrived')
  @ApiOperation({ summary: 'Driver marks arrival at pickup point' })
  async driverArrived(@Request() req: any, @Param('id') rideId: string) {
    return this.ridesService.driverArrived(req.user.driverProfileId, rideId);
  }

  @Post(':id/start')
  @ApiOperation({ summary: 'Driver enters Rider 4-digit OTP to officially start the ride' })
  async startRide(@Request() req: any, @Param('id') rideId: string, @Body() dto: VerifyOtpStartDto) {
    return this.ridesService.startRide(req.user.driverProfileId, rideId, dto);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Driver completes the ride, calculates fare and settles commission' })
  async completeRide(@Request() req: any, @Param('id') rideId: string) {
    return this.ridesService.completeRide(req.user.driverProfileId, rideId);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel ride with reason' })
  async cancelRide(@Request() req: any, @Param('id') rideId: string, @Body() body: { reason?: string }) {
    return this.ridesService.cancelRide(req.user.id, rideId, body.reason);
  }
}
