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
        return 'AKHIL ECONOMY (اقتصادي)';
      case VehicleCategory.plus:
        return 'AKHIL PLUS (بلس)';
      case VehicleCategory.business:
        return 'AKHIL BUSINESS (أعمال)';
      case VehicleCategory.parthona:
        return 'AKHIL PARTHONA (برثونة)';
      case VehicleCategory.time:
        return 'AKHIL TIME (مجدولة)';
      case VehicleCategory.extra:
        return 'AKHIL EXTRA (إضافي)';
      case VehicleCategory.carry:
        return 'AKHIL CARRY (حمولة)';
      case VehicleCategory.box:
        return 'AKHIL BOX (طرد)';
      case VehicleCategory.trip:
        return 'AKHIL TRIP (سفر)';
      case VehicleCategory.partnerOfEvents:
        return 'PARTNER OF EVENTS (فعاليات)';
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
        return 'الخدمة الأساسية للانتقال اليومي بأعلى معايير الجودة (1.00x)';
      case VehicleCategory.plus:
        return 'سيارات حديثة ومستوى راحة وتجربة أعلى للعميل (1.10x)';
      case VehicleCategory.business:
        return 'الخدمة المميزة لرجال الأعمال وأعلى فئات السيارات (1.20x)';
      case VehicleCategory.parthona:
        return 'رحلة بقيادة برثونة (سائقة معتمدة) دون أي زيادة سعرية (1.00x)';
      case VehicleCategory.time:
        return 'مظلة الرحلات المجدولة (ONE, ROUTINE, CONTRACT)';
      case VehicleCategory.extra:
        return 'نقل عدد ركاب إضافي (+50% إلى +100% بحسب العدد)';
      case VehicleCategory.carry:
        return 'نقل العميل مع حمولة كبيرة تتجاوز السيارات العادية (2.00x)';
      case VehicleCategory.box:
        return 'نقل وتسليم الطرود والأغراض دون راكب بنظام النقل المباشر (1.00x)';
      case VehicleCategory.trip:
        return 'رحلات السفر عند تجاوز الخطوط الحدودية بين المحافظات (+استراحة 15د/100كم)';
      case VehicleCategory.partnerOfEvents:
        return 'شراكة وتنظيم نقل الفعاليات والمؤتمرات (تسعير تعاقدي)';
    }
  }

  double multiplier() {
    switch (this) {
      case VehicleCategory.economy:
        return 1.00; // Base x 1.00
      case VehicleCategory.plus:
        return 1.10; // Base x 1.10
      case VehicleCategory.business:
        return 1.20; // Base x 1.20
      case VehicleCategory.parthona:
        return 1.00; // Base x 1.00 (لا زيادة سعرية)
      case VehicleCategory.time:
        return 1.00; // Base x 1.00
      case VehicleCategory.extra:
        return 1.50; // Minimum +50%
      case VehicleCategory.carry:
        return 2.00; // Base x 2.00
      case VehicleCategory.box:
        return 1.00; // Base x 1.00
      case VehicleCategory.trip:
        return 1.80; // Distance-based long trip
      case VehicleCategory.partnerOfEvents:
        return 2.50; // Custom event contract
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
