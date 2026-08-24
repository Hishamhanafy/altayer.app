import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GeospatialService {
  constructor(
    private readonly redis: RedisService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Calculate Haversine distance in kilometers between two GPS coordinates
   */
  calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(2));
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  /**
   * Estimate pricing in Egyptian Pounds (EGP / ج.م) for both Instant and Bidding modes
   */
  async estimateFare(pickupLat: number, pickupLng: number, dropoffLat: number, dropoffLng: number) {
    const distanceKm = this.calculateDistanceKm(pickupLat, pickupLng, dropoffLat, dropoffLng);
    // Average Cairo/urban speed: ~25 km/h -> ~2.4 mins per km
    const estimatedMinutes = Math.max(Math.ceil(distanceKm * 2.4), 5);

    // Pricing matrices in Egyptian Pounds (EGP / ج.م) per category
    const rates: Record<string, { nameAr: string; nameEn: string; base: number; perKm: number; min: number; discountBidding: number }> = {
      ECONOMY: { nameAr: 'عادية (اقتصادي)', nameEn: 'Economy', base: 18, perKm: 5.0, min: 25, discountBidding: 0.88 },
      COMFORT: { nameAr: 'كومفورت (سيارة حديثة ومكيفة)', nameEn: 'Comfort', base: 28, perKm: 7.0, min: 40, discountBidding: 0.90 },
      SCOOTER: { nameAr: 'سكوتر (سريع وفردي)', nameEn: 'Scooter', base: 12, perKm: 3.5, min: 18, discountBidding: 0.85 },
      TOKTOK: { nameAr: 'توكتوك (مشاوير قصيرة)', nameEn: 'Toktok', base: 10, perKm: 3.0, min: 15, discountBidding: 0.85 },
    };

    const estimates = Object.entries(rates).map(([category, rate]) => {
      const calculated = rate.base + distanceKm * rate.perKm;
      const instantPrice = Math.max(Math.round(calculated), rate.min);
      // Bidding recommended starting offer
      const biddingSuggestedPrice = Math.max(Math.round(instantPrice * rate.discountBidding), rate.min);

      return {
        category,
        nameAr: rate.nameAr,
        nameEn: rate.nameEn,
        currency: 'EGP',
        currencyAr: 'ج.م',
        distanceKm,
        estimatedMinutes,
        instantFare: instantPrice,
        biddingSuggestedFare: biddingSuggestedPrice,
        biddingMinFare: Math.round(instantPrice * 0.75),
        biddingMaxFare: Math.round(instantPrice * 1.5),
      };
    });

    return {
      distanceKm,
      estimatedMinutes,
      currency: 'EGP',
      currencyAr: 'ج.م',
      categories: estimates,
    };
  }

  /**
   * Get active drivers in the vicinity
   */
  async getNearbyDrivers(lat: number, lng: number, radiusKm: number = 5, category?: string) {
    return this.redis.getNearbyDrivers(lat, lng, radiusKm, category);
  }
}
