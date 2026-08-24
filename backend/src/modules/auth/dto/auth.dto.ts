import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestOtpDto {
  @ApiProperty({ example: '+201012345678', description: 'User phone number in E.164 format' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}

export class VerifyOtpDto {
  @ApiProperty({ example: '+201012345678', description: 'User phone number' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: '123456', description: '6-digit OTP received via SMS' })
  @IsNotEmpty()
  @IsString()
  otpCode: string;

  @ApiProperty({ example: 'RIDER', enum: ['RIDER', 'DRIVER'], required: false })
  role?: 'RIDER' | 'DRIVER';

  @ApiProperty({ example: 'Ahmed Ali', required: false })
  fullName?: string;
}
