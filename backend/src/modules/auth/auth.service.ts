import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { RequestOtpDto, VerifyOtpDto } from './dto/auth.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Generates and sends OTP to phone number
   */
  async requestOtp(dto: RequestOtpDto) {
    const { phoneNumber } = dto;
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryMinutes = this.configService.get<number>('OTP_EXPIRY_MINUTES', 5);

    // Save to redis with TTL
    await this.redis.client.setex(`otp:${phoneNumber}`, expiryMinutes * 60, otp);

    // In production, integrate Twilio / Unifonic / WhatsApp API.
    // For development, we return the bypass code or logged OTP.
    return {
      success: true,
      message: 'OTP sent successfully',
      debugOtp: process.env.NODE_ENV !== 'production' ? otp : undefined,
    };
  }

  /**
   * Verifies OTP and signs JWT token for rider/driver
   */
  async verifyOtp(dto: VerifyOtpDto) {
    const { phoneNumber, otpCode, role = 'RIDER', fullName } = dto;
    const bypassOtp = this.configService.get<string>('OTP_BYPASS_CODE', '123456');

    const storedOtp = await this.redis.client.get(`otp:${phoneNumber}`);

    if (otpCode !== storedOtp && otpCode !== bypassOtp) {
      throw new UnauthorizedException('Invalid or expired OTP code');
    }

    // Clear used OTP
    await this.redis.client.del(`otp:${phoneNumber}`);

    // Find or create user
    let user = await this.prisma.user.findUnique({
      where: { phoneNumber },
      include: { driverProfile: true, wallet: true },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          phoneNumber,
          fullName: fullName || (role === 'DRIVER' ? 'New Captain' : 'New Rider'),
          role: role as UserRole,
          wallet: {
            create: { balance: 0.0 },
          },
          ...(role === 'DRIVER' && {
            driverProfile: {
              create: {
                nationalId: `TEMP-${Date.now()}`,
              },
            },
          }),
        },
        include: { driverProfile: true, wallet: true },
      });
    }

    // Generate JWT
    const payload = {
      sub: user.id,
      phoneNumber: user.phoneNumber,
      role: user.role,
      driverProfileId: user.driverProfile?.id,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        phoneNumber: user.phoneNumber,
        fullName: user.fullName,
        role: user.role,
        status: user.status,
        driverProfile: user.driverProfile,
        wallet: user.wallet,
      },
    };
  }
}
