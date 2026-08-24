import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BookingType, VehicleCategory, PaymentMethod } from '@prisma/client';

export class CreateRideDto {
  @ApiProperty({ enum: BookingType, example: 'BIDDING' })
  @IsEnum(BookingType)
  bookingType: BookingType;

  @ApiProperty({ enum: VehicleCategory, example: 'ECONOMY' })
  @IsEnum(VehicleCategory)
  serviceCategory: VehicleCategory;

  @ApiProperty({ example: 30.0444 })
  @IsNumber()
  pickupLat: number;

  @ApiProperty({ example: 31.2357 })
  @IsNumber()
  pickupLng: number;

  @ApiProperty({ example: 'Tahrir Square, Cairo' })
  @IsString()
  pickupAddress: string;

  @ApiProperty({ example: 30.0131 })
  @IsNumber()
  dropoffLat: number;

  @ApiProperty({ example: 31.2089 })
  @IsNumber()
  dropoffLng: number;

  @ApiProperty({ example: 'Giza Pyramids' })
  @IsString()
  dropoffAddress: string;

  @ApiProperty({ example: 65.0, description: 'Offered or estimated initial price' })
  @IsNumber()
  initialPrice: number;

  @ApiProperty({ enum: PaymentMethod, default: 'CASH' })
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;
}

export class SubmitBidDto {
  @ApiProperty({ example: 'ride-uuid-123' })
  @IsNotEmpty()
  @IsString()
  rideId: string;

  @ApiProperty({ example: 70.0, description: 'Counter-offer or accepted fare' })
  @IsNumber()
  proposedFare: number;

  @ApiProperty({ example: 4, description: 'Estimated minutes to pickup' })
  @IsNumber()
  etaMinutes: number;
}

export class VerifyOtpStartDto {
  @ApiProperty({ example: '4921', description: '4-digit OTP provided by rider' })
  @IsNotEmpty()
  @IsString()
  otpCode: string;
}
