enum VehicleCategory {
  economy,
  comfort,
  vip,
  scooter,
  toktok,
}

extension VehicleCategoryExtension on VehicleCategory {
  String get title {
    switch (this) {
      case VehicleCategory.economy:
        return 'عالطاير توفير';
      case VehicleCategory.comfort:
        return 'عالطاير راحة';
      case VehicleCategory.vip:
        return 'عالطاير VIP';
      case VehicleCategory.scooter:
        return 'سكوتر طلقة';
      case VehicleCategory.toktok:
        return 'توك توك شعبي';
    }
  }

  String get subtitle {
    switch (this) {
      case VehicleCategory.economy:
        return 'سيدان اقتصادية موفرة';
      case VehicleCategory.comfort:
        return 'سيارة حديثة ومكيفة';
      case VehicleCategory.vip:
        return 'سيارة فارهة فاخرة';
      case VehicleCategory.scooter:
        return 'لتفادي الزحام بسرعة';
      case VehicleCategory.toktok:
        return 'للمشاوير والحواري الضيقة';
    }
  }

  String get icon {
    switch (this) {
      case VehicleCategory.economy:
        return '🚗';
      case VehicleCategory.comfort:
        return '🚘';
      case VehicleCategory.vip:
        return '🏎️';
      case VehicleCategory.scooter:
        return '🛵';
      case VehicleCategory.toktok:
        return '🛺';
    }
  }

  int get etaMinutes {
    switch (this) {
      case VehicleCategory.economy:
        return 3;
      case VehicleCategory.comfort:
        return 5;
      case VehicleCategory.vip:
        return 8;
      case VehicleCategory.scooter:
        return 2;
      case VehicleCategory.toktok:
        return 3;
    }
  }

  double multiplier() {
    switch (this) {
      case VehicleCategory.economy:
        return 1.0;
      case VehicleCategory.comfort:
        return 1.25;
      case VehicleCategory.vip:
        return 1.80;
      case VehicleCategory.scooter:
        return 0.65;
      case VehicleCategory.toktok:
        return 0.50;
    }
  }
}

class DriverBid {
  final String id;
  final String driverName;
  final String avatar;
  final String carModel;
  final String carColor;
  final String plateNumber;
  final double rating;
  final int totalTrips;
  final int fare;
  final int etaMinutes;
  final double distanceKm;

  const DriverBid({
    required this.id,
    required this.driverName,
    required this.avatar,
    required this.carModel,
    required this.carColor,
    required this.plateNumber,
    required this.rating,
    required this.totalTrips,
    required this.fare,
    required this.etaMinutes,
    required this.distanceKm,
  });
}

class SavedPlace {
  final String title;
  final String address;
  final String icon;
  final double lat;
  final double lng;

  const SavedPlace({
    required this.title,
    required this.address,
    required this.icon,
    required this.lat,
    required this.lng,
  });
}
