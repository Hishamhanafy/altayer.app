import { Module } from '@nestjs/common';
import { RidesService } from './rides.service';
import { RidesController } from './rides.controller';
import { GeospatialModule } from '../geospatial/geospatial.module';
import { WalletsModule } from '../wallets/wallets.module';

@Module({
  imports: [GeospatialModule, WalletsModule],
  controllers: [RidesController],
  providers: [RidesService],
  exports: [RidesService],
})
export class RidesModule {}
