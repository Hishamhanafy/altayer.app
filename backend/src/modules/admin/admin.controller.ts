import { Controller, Get, Post, Body, Param, Patch, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('Admin Operations & Control')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('api/v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get overall operations stats, ongoing trips, active drivers, and daily commissions in EGP' })
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('drivers/pending')
  @ApiOperation({ summary: 'List all drivers with pending documents waiting for verification' })
  async getPendingDrivers() {
    return this.adminService.getPendingDrivers();
  }

  @Patch('drivers/:id/verify')
  @ApiOperation({ summary: 'Approve or reject a driver profile and vehicle' })
  async verifyDriver(
    @Param('id') driverId: string,
    @Body() body: { isApproved: boolean; rejectReason?: string },
  ) {
    return this.adminService.verifyDriver(driverId, body.isApproved, body.rejectReason);
  }

  @Get('rides/live')
  @ApiOperation({ summary: 'Get live stream of all active rides (Instant & Bidding)' })
  async getLiveRides() {
    return this.adminService.getLiveRides();
  }

  @Get('pricing-rules')
  @ApiOperation({ summary: 'Get pricing rules for all vehicle categories in Egypt' })
  async getPricingRules() {
    return this.adminService.getPricingRules();
  }

  @Patch('pricing-rules/:category')
  @ApiOperation({ summary: 'Update pricing rates and commission percentages for a category' })
  async updatePricingRule(
    @Param('category') category: string,
    @Body() body: any,
  ) {
    return this.adminService.updatePricingRule(category, body);
  }
}
