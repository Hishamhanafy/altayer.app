import { Module } from '@nestjs/common';
import { RidesModule } from '../rides/rides.module';

@Module({
  imports: [RidesModule],
  providers: [],
  exports: [],
})
export class BiddingModule {}
