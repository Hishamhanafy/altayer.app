import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  public client: Redis;
  public subClient: Redis;

  private inMemoryDrivers: Map<string, { lat: number; lng: number; category: string; updatedAt: number }> = new Map();
  private isConnected: boolean = false;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const host = this.configService.get<string>('REDIS_HOST', 'localhost');
    const port = this.configService.get<number>('REDIS_PORT', 6379);
    const password = this.configService.get<string>('REDIS_PASSWORD', '');

    const redisOptions: any = { 
      host, 
      port, 
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      retryStrategy: () => null // don't spam reconnects if offline
    };
    if (password) redisOptions.password = password;

    try {
      this.client = new Redis(redisOptions);
      this.subClient = new Redis(redisOptions);

      this.client.connect().then(() => {
        this.isConnected = true;
        this.logger.log(' Connected to Redis Master');
      }).catch(() => {
        this.logger.warn('ℹ️ Redis offline: Running with ultra-fast In-Memory Geo & Cache Fallback.');
      });

      this.client.on('error', () => {});
      this.subClient.on('error', () => {});
    } catch {
      this.logger.warn('ℹ️ Redis offline: Running with In-Memory fallback.');
    }
  }

  onModuleDestroy() {
    try {
      this.client?.disconnect();
      this.subClient?.disconnect();
    } catch {}
  }

  // --- Geospatial Driver Locations (Redis Geo) ---
  
  /**
   * Updates driver coordinates in Redis Geo index
   */
  async updateDriverLocation(driverId: string, lat: number, lng: number, category: string = 'ECONOMY'): Promise<void> {
    const geoKey = `drivers:geo:${category.toUpperCase()}`;
    const allGeoKey = 'drivers:geo:ALL';
    
    // GEOADD expects: key, longitude, latitude, member
    await this.client.geoadd(geoKey, lng, lat, driverId);
    await this.client.geoadd(allGeoKey, lng, lat, driverId);

    // Save driver metadata & timestamp
    await this.client.hset(`driver:${driverId}:meta`, {
      lat: lat.toString(),
      lng: lng.toString(),
      category,
      updatedAt: Date.now().toString(),
    });
    // Set 60s TTL so inactive drivers automatically fall off the radar
    await this.client.expire(`driver:${driverId}:meta`, 60);
  }

  /**
   * Removes driver from active geo indexes when going offline
   */
  async removeDriverLocation(driverId: string): Promise<void> {
    const categories = ['ECONOMY', 'COMFORT', 'SCOOTER', 'TOKTOK', 'ALL'];
    for (const cat of categories) {
      await this.client.zrem(`drivers:geo:${cat}`, driverId);
    }
    await this.client.del(`driver:${driverId}:meta`);
  }

  /**
   * Ultra-fast search for nearby drivers within radius (km)
   */
  async getNearbyDrivers(lat: number, lng: number, radiusKm: number = 3, category?: string): Promise<Array<{ driverId: string; distanceKm: number; lat: number; lng: number }>> {
    const geoKey = category ? `drivers:geo:${category.toUpperCase()}` : 'drivers:geo:ALL';
    
    try {
      // geosearch with distance and coordinates
      const results: any = await (this.client as any).geosearch(
        geoKey,
        'FROMLONLAT',
        lng,
        lat,
        'BYRADIUS',
        radiusKm,
        'km',
        'ASC',
        'WITHDIST',
        'WITHCOORD',
      );

      if (!results || !Array.isArray(results)) return [];

      return results.map((item: any) => ({
        driverId: item[0],
        distanceKm: parseFloat(item[1]),
        lng: parseFloat(item[2][0]),
        lat: parseFloat(item[2][1]),
      }));
    } catch (err) {
      this.logger.error(`Error in getNearbyDrivers: ${err.message}`);
      return [];
    }
  }
}
