import { Controller, Get, Patch, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users & Drivers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current logged-in user profile' })
  async getProfile(@Request() req: any) {
    return this.usersService.getUserProfile(req.user.id);
  }

  @Patch('driver/status')
  @ApiOperation({ summary: 'Toggle driver online/offline mode' })
  async toggleDriverStatus(@Request() req: any, @Body() body: { isOnline: boolean; lat?: number; lng?: number; category?: string }) {
    return this.usersService.setDriverOnlineStatus(req.user.id, body.isOnline, body.lat, body.lng, body.category);
  }

  @Post('driver/vehicle')
  @ApiOperation({ summary: 'Register or update driver vehicle details' })
  async updateVehicle(@Request() req: any, @Body() body: any) {
    return this.usersService.updateVehicle(req.user.id, body);
  }
}
