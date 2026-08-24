import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { WalletsService } from './wallets.service';

@ApiTags('Wallets & Accounting')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('api/v1/wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get('my-wallet')
  @ApiOperation({ summary: 'Get current user/driver wallet and transaction ledger' })
  async getMyWallet(@Request() req: any) {
    return this.walletsService.getWallet(req.user.id);
  }

  @Post('topup')
  @ApiOperation({ summary: 'Recharge / Deposit money to wallet' })
  async topUp(@Request() req: any, @Body() body: { amount: number; referenceId?: string }) {
    return this.walletsService.topUpWallet(req.user.id, body.amount, body.referenceId);
  }
}
