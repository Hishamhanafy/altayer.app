enum VehicleCategory {
  economy,
  plus,
  business,
  parthona,
  time,
  extra,
  carry,
  box,
  trip,
  partnerOfEvents,
}

extension VehicleCategoryExtension on VehicleCategory {
  String get title {
    switch (this) {
      case VehicleCategory.economy:
        return 'Economy (إيكونومي)';
      case VehicleCategory.plus:
        return 'Plus (بلس حديث)';
      case VehicleCategory.business:
        return 'Business (بزنس فاخر)';
      case VehicleCategory.parthona:
        return 'Parthona (برثونة - نسائي)';
      case VehicleCategory.time:
        return 'Time (مشاوير بالساعة)';
      case VehicleCategory.extra:
        return 'Extra (مساحة أكبر)';
      case VehicleCategory.carry:
        return 'Carry (نقل بضائع)';
      case VehicleCategory.box:
        return 'Box (توصيل طرود)';
      case VehicleCategory.trip:
        return 'Trip (سفر ومحافظات)';
      case VehicleCategory.partnerOfEvents:
        return 'Partner of Events (فعاليات)';
    }
  }

  String get icon {
    switch (this) {
      case VehicleCategory.economy:
        return '🚗';
      case VehicleCategory.plus:
        return '🚘';
      case VehicleCategory.business:
        return '💼';
      case VehicleCategory.parthona:
        return '🌸';
      case VehicleCategory.time:
        return '⏱️';
      case VehicleCategory.extra:
        return '➕';
      case VehicleCategory.carry:
        return '📦';
      case VehicleCategory.box:
        return '📫';
      case VehicleCategory.trip:
        return '🛣️';
      case VehicleCategory.partnerOfEvents:
        return '🎪';
    }
  }

  String get description {
    switch (this) {
      case VehicleCategory.economy:
        return 'مشوار يومي اقتصادي بأفضل سعر عادل';
      case VehicleCategory.plus:
        return 'سيارات حديثة ومريحة مكيفة';
      case VehicleCategory.business:
        return 'سيارات سيدان فارهة لرجال الأعمال';
      case VehicleCategory.parthona:
        return 'خدمة مخصصة للسيدات بسائقات معتمدات فقط';
      case VehicleCategory.time:
        return 'تأجير سيارة بالساعة مع كابتن خاص';
      case VehicleCategory.extra:
        return 'سيارات 7 ركاب ومساحة حقائب واسعة';
      case VehicleCategory.carry:
        return 'نقل الأغراض والأثاث الخفيف والمقتنيات';
      case VehicleCategory.box:
        return 'توصيل مستندات وشحنات سريعة فوري';
      case VehicleCategory.trip:
        return 'سفر مريح بين المحافظات والساحل';
      case VehicleCategory.partnerOfEvents:
        return 'تنظيم وتوصيل فعاليات وحفلات ومؤتمرات';
    }
  }

  double multiplier() {
    switch (this) {
      case VehicleCategory.economy:
        return 1.0;
      case VehicleCategory.plus:
        return 1.25;
      case VehicleCategory.business:
        return 1.6;
      case VehicleCategory.parthona:
        return 1.15;
      case VehicleCategory.time:
        return 2.0;
      case VehicleCategory.extra:
        return 1.4;
      case VehicleCategory.carry:
        return 1.3;
      case VehicleCategory.box:
        return 0.85;
      case VehicleCategory.trip:
        return 2.5;
      case VehicleCategory.partnerOfEvents:
        return 3.0;
    }
  }
}

class DriverBid {
  final String id;
  final String driverName;
  final String avatar;
  final double rating;
  final int totalTrips;
  final String carModel;
  final String carColor;
  final String plateNumber;
  final int fare;
  final double distanceKm;
  final int etaMinutes;
  final bool isParthona;

  const DriverBid({
    required this.id,
    required this.driverName,
    required this.avatar,
    required this.rating,
    required this.totalTrips,
    required this.carModel,
    required this.carColor,
    required this.plateNumber,
    required this.fare,
    required this.distanceKm,
    required this.etaMinutes,
    this.isParthona = false,
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
    this.lat = 30.0444,
    this.lng = 31.2357,
  });
}
