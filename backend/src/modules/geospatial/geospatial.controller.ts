import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GeospatialService } from './geospatial.service';

@ApiTags('Geospatial & Pricing')
@Controller('api/v1/geo')
export class GeospatialController {
  constructor(private readonly geoService: GeospatialService) {}

  @Get('estimate')
  @ApiOperation({ summary: 'Calculate route distance, duration and fare estimates (Instant vs Bidding)' })
  async estimateFare(
    @Query('pickupLat') pickupLat: number,
    @Query('pickupLng') pickupLng: number,
    @Query('dropoffLat') dropoffLat: number,
    @Query('dropoffLng') dropoffLng: number,
  ) {
    return this.geoService.estimateFare(
      Number(pickupLat),
      Number(pickupLng),
      Number(dropoffLat),
      Number(dropoffLng),
    );
  }

  @Get('nearby-drivers')
  @ApiOperation({ summary: 'Get active drivers around coordinates for live map radar' })
  async getNearbyDrivers(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radiusKm') radiusKm?: number,
    @Query('category') category?: string,
  ) {
    return this.geoService.getNearbyDrivers(Number(lat), Number(lng), Number(radiusKm || 5), category);
  }
}
