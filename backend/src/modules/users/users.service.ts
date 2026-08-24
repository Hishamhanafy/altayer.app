import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        driverProfile: {
          include: {
            vehicle: true,
            documents: true,
          },
        },
        wallet: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async setDriverOnlineStatus(userId: string, isOnline: boolean, lat?: number, lng?: number, category: string = 'ECONOMY') {
    const driverProfile = await this.prisma.driverProfile.findUnique({
      where: { userId },
    });

    if (!driverProfile) throw new BadRequestException('User is not registered as a driver');

    const updated = await this.prisma.driverProfile.update({
      where: { id: driverProfile.id },
      data: { isOnline },
    });

    if (isOnline && lat && lng) {
      await this.redis.updateDriverLocation(driverProfile.id, lat, lng, category);
    } else if (!isOnline) {
      await this.redis.removeDriverLocation(driverProfile.id);
    }

    return updated;
  }

  async updateVehicle(userId: string, data: any) {
    const driverProfile = await this.prisma.driverProfile.findUnique({
      where: { userId },
    });

    if (!driverProfile) throw new BadRequestException('Driver profile required');

    return this.prisma.vehicle.upsert({
      where: { driverId: driverProfile.id },
      create: {
        driverId: driverProfile.id,
        category: data.category || 'ECONOMY',
        make: data.make,
        model: data.model,
        year: data.year || 2020,
        color: data.color,
        plateNumber: data.plateNumber,
      },
      update: {
        category: data.category,
        make: data.make,
        model: data.model,
        year: data.year,
        color: data.color,
        plateNumber: data.plateNumber,
      },
    });
  }
}
