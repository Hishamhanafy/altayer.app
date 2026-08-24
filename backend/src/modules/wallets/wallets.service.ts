import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentMethod, TransactionType, TransactionDirection } from '@prisma/client';

@Injectable()
export class WalletsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get user wallet balance & transaction history
   */
  async getWallet(userId: string) {
    let wallet = await this.prisma.wallet.findUnique({
      where: { userId },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!wallet) {
      wallet = await this.prisma.wallet.create({
        data: { userId, balance: 0.0 },
        include: { transactions: true },
      });
    }

    return wallet;
  }

  /**
   * Process financial settlement when a ride is completed
   */
  async processRideSettlement(
    driverUserId: string,
    riderUserId: string,
    rideId: string,
    finalFare: number,
    commission: number,
    paymentMethod: PaymentMethod,
  ) {
    const driverWallet = await this.getWallet(driverUserId);

    if (paymentMethod === PaymentMethod.CASH) {
      // Driver collected full fare in cash in hand.
      // We deduct the platform commission from the driver's in-app wallet balance.
      const newBalance = parseFloat((driverWallet.balance - commission).toFixed(2));

      await this.prisma.wallet.update({
        where: { id: driverWallet.id },
        data: { balance: newBalance },
      });

      await this.prisma.walletTransaction.create({
        data: {
          walletId: driverWallet.id,
          rideId,
          amount: commission,
          type: TransactionType.TRIP_COMMISSION,
          direction: TransactionDirection.DEBIT,
          balanceAfter: newBalance,
          notes: `Platform commission deducted for cash ride`,
        },
      });
    } else {
      // Digital Wallet or Card Payment:
      // Platform collects full fare, credits net earnings (fare - commission) to driver wallet.
      const netEarnings = parseFloat((finalFare - commission).toFixed(2));
      const newBalance = parseFloat((driverWallet.balance + netEarnings).toFixed(2));

      await this.prisma.wallet.update({
        where: { id: driverWallet.id },
        data: { balance: newBalance },
      });

      await this.prisma.walletTransaction.create({
        data: {
          walletId: driverWallet.id,
          rideId,
          amount: netEarnings,
          type: TransactionType.TRIP_EARNINGS,
          direction: TransactionDirection.CREDIT,
          balanceAfter: newBalance,
          notes: `Net earnings credited for electronic ride`,
        },
      });
    }
  }

  /**
   * Top up driver wallet (Deposit)
   */
  async topUpWallet(userId: string, amount: number, referenceId?: string) {
    if (amount <= 0) throw new BadRequestException('Amount must be positive');
    const wallet = await this.getWallet(userId);
    const newBalance = parseFloat((wallet.balance + amount).toFixed(2));

    await this.prisma.wallet.update({
      where: { id: wallet.id },
      data: { balance: newBalance },
    });

    return this.prisma.walletTransaction.create({
      data: {
        walletId: wallet.id,
        amount,
        type: TransactionType.DEPOSIT,
        direction: TransactionDirection.CREDIT,
        balanceAfter: newBalance,
        referenceId,
        notes: `Wallet top-up / recharge`,
      },
    });
  }
}
