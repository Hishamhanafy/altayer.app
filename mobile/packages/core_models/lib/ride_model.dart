enum BookingType { instant, bidding }
enum RideStatus {
  created,
  searching,
  broadcasting,
  accepted,
  arrived,
  inProgress,
  completed,
  cancelled
}

enum VehicleCategory { 
  economy, 
  comfort, 
  scooter, 
  toktok 
}

extension VehicleCategoryExtension on VehicleCategory {
  String nameAr() {
    switch (this) {
      case VehicleCategory.economy:
        return 'عادية (اقتصادي)';
      case VehicleCategory.comfort:
        return 'كومفورت (مكيفة)';
      case VehicleCategory.scooter:
        return 'سكوتر (سريع)';
      case VehicleCategory.toktok:
        return 'توكتوك';
    }
  }

  String nameEn() {
    switch (this) {
      case VehicleCategory.economy:
        return 'Economy';
      case VehicleCategory.comfort:
        return 'Comfort';
      case VehicleCategory.scooter:
        return 'Scooter';
      case VehicleCategory.toktok:
        return 'Toktok';
    }
  }
}

class RideModel {
  final String id;
  final String rideNumber;
  final String riderId;
  final String? driverId;
  final BookingType bookingType;
  final VehicleCategory serviceCategory;
  final double pickupLat;
  final double pickupLng;
  final String pickupAddress;
  final double dropoffLat;
  final double dropoffLng;
  final String dropoffAddress;
  final double estimatedDistanceKm;
  final int estimatedDurationMins;
  final double initialPrice;
  final double? finalFare;
  final String currency; // 'EGP'
  final String currencyAr; // 'ج.م'
  final String otpCode;
  final RideStatus status;

  RideModel({
    required this.id,
    required this.rideNumber,
    required this.riderId,
    this.driverId,
    required this.bookingType,
    required this.serviceCategory,
    required this.pickupLat,
    required this.pickupLng,
    required this.pickupAddress,
    required this.dropoffLat,
    required this.dropoffLng,
    required this.dropoffAddress,
    required this.estimatedDistanceKm,
    required this.estimatedDurationMins,
    required this.initialPrice,
    this.finalFare,
    this.currency = 'EGP',
    this.currencyAr = 'ج.م',
    required this.otpCode,
    required this.status,
  });

  factory RideModel.fromJson(Map<String, dynamic> json) {
    return RideModel(
      id: json['id'],
      rideNumber: json['rideNumber'] ?? '',
      riderId: json['riderId'],
      driverId: json['driverId'],
      bookingType: json['bookingType'] == 'BIDDING'
          ? BookingType.bidding
          : BookingType.instant,
      serviceCategory: VehicleCategory.values.firstWhere(
        (e) => e.name.toUpperCase() == (json['serviceCategory'] ?? 'ECONOMY'),
        orElse: () => VehicleCategory.economy,
      ),
      pickupLat: (json['pickupLat'] as num).toDouble(),
      pickupLng: (json['pickupLng'] as num).toDouble(),
      pickupAddress: json['pickupAddress'] ?? '',
      dropoffLat: (json['dropoffLat'] as num).toDouble(),
      dropoffLng: (json['dropoffLng'] as num).toDouble(),
      dropoffAddress: json['dropoffAddress'] ?? '',
      estimatedDistanceKm: (json['estimatedDistanceKm'] as num).toDouble(),
      estimatedDurationMins: json['estimatedDurationMins'] ?? 0,
      initialPrice: (json['initialPrice'] as num).toDouble(),
      finalFare: json['finalFare'] != null
          ? (json['finalFare'] as num).toDouble()
          : null,
      currency: json['currency'] ?? 'EGP',
      currencyAr: json['currencyAr'] ?? 'ج.م',
      otpCode: json['otpCode'] ?? '',
      status: RideStatus.values.firstWhere(
        (e) => e.name.toUpperCase() == (json['status'] ?? 'CREATED'),
        orElse: () => RideStatus.created,
      ),
    );
  }
}
