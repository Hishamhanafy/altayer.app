import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { RideStatus, VehicleCategory } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async getDashboardStats() {
    const activeDriversCount = await this.prisma.driverProfile.count({
      where: { isOnline: true },
    });

    const activeRidesCount = await this.prisma.ride.count({
      where: {
        status: {
          in: [RideStatus.SEARCHING, RideStatus.BROADCASTING, RideStatus.ACCEPTED, RideStatus.ARRIVED, RideStatus.IN_PROGRESS],
        },
      },
    });

    const totalUsersCount = await this.prisma.user.count();

    // Total commissions today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const completedRidesToday = await this.prisma.ride.findMany({
      where: {
        status: RideStatus.COMPLETED,
        completedAt: { gte: startOfDay },
      },
      select: { platformCommission: true, finalFare: true },
    });

    const todayCommissions = completedRidesToday.reduce((acc, r) => acc + (r.platformCommission || 0), 0);
    const todayGmv = completedRidesToday.reduce((acc, r) => acc + (r.finalFare || 0), 0);

    return {
      currency: 'EGP',
      currencyAr: 'ج.م',
      activeDriversCount,
      activeRidesCount,
      totalUsersCount,
      todayCommissions: parseFloat(todayCommissions.toFixed(2)),
      todayGmv: parseFloat(todayGmv.toFixed(2)),
      completedTripsToday: completedRidesToday.length,
    };
  }

  async getPendingDrivers() {
    return this.prisma.driverProfile.findMany({
      where: { isVerified: false },
      include: {
        user: { select: { id: true, fullName: true, phoneNumber: true, email: true, avatarUrl: true } },
        vehicle: true,
        documents: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async verifyDriver(driverId: string, isApproved: boolean, rejectReason?: string) {
    const driver = await this.prisma.driverProfile.findUnique({ where: { id: driverId } });
    if (!driver) throw new NotFoundException('Driver profile not found');

    return this.prisma.driverProfile.update({
      where: { id: driverId },
      data: {
        isVerified: isApproved,
        documents: {
          updateMany: {
            where: { driverId },
            data: { isApproved, rejectReason: isApproved ? null : rejectReason },
          },
        },
      },
      include: { user: true, vehicle: true, documents: true },
    });
  }

  async getLiveRides() {
    return this.prisma.ride.findMany({
      where: {
        status: {
          in: [RideStatus.SEARCHING, RideStatus.BROADCASTING, RideStatus.ACCEPTED, RideStatus.ARRIVED, RideStatus.IN_PROGRESS],
        },
      },
      include: {
        rider: { select: { fullName: true, phoneNumber: true } },
        driver: {
          include: {
            user: { select: { fullName: true, phoneNumber: true } },
            vehicle: true,
          },
        },
        bids: { take: 5, orderBy: { proposedFare: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async getPricingRules() {
    let rules = await this.prisma.pricingRule.findMany();
    if (rules.length === 0) {
      // Create defaults
      const defaults = [
        { category: VehicleCategory.ECONOMY, baseFare: 18, pricePerKm: 5.0, pricePerMinute: 0.5, minimumFare: 25, instantCommPct: 15, biddingCommPct: 10 },
        { category: VehicleCategory.COMFORT, baseFare: 28, pricePerKm: 7.0, pricePerMinute: 0.8, minimumFare: 40, instantCommPct: 15, biddingCommPct: 10 },
        { category: VehicleCategory.SCOOTER, baseFare: 12, pricePerKm: 3.5, pricePerMinute: 0.3, minimumFare: 18, instantCommPct: 15, biddingCommPct: 10 },
        { category: VehicleCategory.TOKTOK, baseFare: 10, pricePerKm: 3.0, pricePerMinute: 0.3, minimumFare: 15, instantCommPct: 15, biddingCommPct: 10 },
      ];
      for (const d of defaults) {
        await this.prisma.pricingRule.create({ data: d });
      }
      rules = await this.prisma.pricingRule.findMany();
    }
    return rules;
  }

  async updatePricingRule(categoryStr: string, data: any) {
    const category = categoryStr.toUpperCase() as VehicleCategory;
    return this.prisma.pricingRule.upsert({
      where: { category },
      create: {
        category,
        baseFare: Number(data.baseFare) || 18,
        pricePerKm: Number(data.pricePerKm) || 5.0,
        pricePerMinute: Number(data.pricePerMinute) || 0.5,
        minimumFare: Number(data.minimumFare) || 25,
        instantCommPct: Number(data.instantCommPct) || 15,
        biddingCommPct: Number(data.biddingCommPct) || 10,
      },
      update: {
        ...(data.baseFare !== undefined && { baseFare: Number(data.baseFare) }),
        ...(data.pricePerKm !== undefined && { pricePerKm: Number(data.pricePerKm) }),
        ...(data.minimumFare !== undefined && { minimumFare: Number(data.minimumFare) }),
        ...(data.instantCommPct !== undefined && { instantCommPct: Number(data.instantCommPct) }),
        ...(data.biddingCommPct !== undefined && { biddingCommPct: Number(data.biddingCommPct) }),
      },
    });
  }
}
