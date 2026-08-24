import { Module } from '@nestjs/common';
import { GeospatialService } from './geospatial.service';
import { GeospatialController } from './geospatial.controller';

@Module({
  controllers: [GeospatialController],
  providers: [GeospatialService],
  exports: [GeospatialService],
})
export class GeospatialModule {}
