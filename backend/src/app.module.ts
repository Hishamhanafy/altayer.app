import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { RedisModule } from './modules/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { GeospatialModule } from './modules/geospatial/geospatial.module';
import { RidesModule } from './modules/rides/rides.module';
import { BiddingModule } from './modules/bidding/bidding.module';
import { WalletsModule } from './modules/wallets/wallets.module';
import { AdminModule } from './modules/admin/admin.module';
import { RealtimeGateway } from './gateways/realtime.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env'],
    }),
    PrismaModule,
    RedisModule,
    AuthModule,
    UsersModule,
    GeospatialModule,
    RidesModule,
    BiddingModule,
    WalletsModule,
    AdminModule,
  ],
  providers: [RealtimeGateway],
})
export class AppModule {}
