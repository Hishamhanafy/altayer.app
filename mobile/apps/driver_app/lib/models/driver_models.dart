enum AkhilDriverMode {
  guarantee, // AKHIL GUARANTEE (أخيل ضمان مالي)
  flex,      // AKHIL FLEX (أخيل عمولة مرنة)
}

enum AkhilCaptainTier {
  captainOrParthona, // كابتن / برثونة
  akhilTeam,         // فريق أخيل
  akhilLeaders,      // قادة أخيل
  akhilElite,        // نخبة أخيل
  royalAkhil,        // القائد الملكي ROYAL AKHIL
}

extension AkhilCaptainTierExtension on AkhilCaptainTier {
  String get title {
    switch (this) {
      case AkhilCaptainTier.captainOrParthona:
        return 'كابتن / برثونة';
      case AkhilCaptainTier.akhilTeam:
        return 'فريق أخيل 🥉';
      case AkhilCaptainTier.akhilLeaders:
        return 'قادة أخيل 🥈';
      case AkhilCaptainTier.akhilElite:
        return 'نخبة أخيل 🥇';
      case AkhilCaptainTier.royalAkhil:
        return 'القائد الملكي (ROYAL AKHIL) 👑';
    }
  }

  int get requiredScore {
    switch (this) {
      case AkhilCaptainTier.captainOrParthona:
        return 50;
      case AkhilCaptainTier.akhilTeam:
        return 70;
      case AkhilCaptainTier.akhilLeaders:
        return 85;
      case AkhilCaptainTier.akhilElite:
        return 95;
      case AkhilCaptainTier.royalAkhil:
        return 99;
    }
  }
}

class AkhilDriverIncentive {
  final String code;
  final String title;
  final String description;
  final String reward;
  final String icon;

  const AkhilDriverIncentive({
    required this.code,
    required this.title,
    required this.description,
    required this.reward,
    required this.icon,
  });
}

class RideOrder {
  final String id;
  final String riderName;
  final String riderAvatar;
  final double riderRating;
  final String pickupAddress;
  final String dropoffAddress;
  final double tripDistanceKm;
  final int riderOfferedFare;
  final double distanceToPickupKm;
  final int etaToPickupMinutes;
  final int estimatedMinutes;
  final String category;
  final String serviceCategory;
  final bool isParthonaOnly;

  const RideOrder({
    required this.id,
    required this.riderName,
    this.riderAvatar = '👨🏻',
    required this.riderRating,
    required this.pickupAddress,
    required this.dropoffAddress,
    required this.tripDistanceKm,
    required this.riderOfferedFare,
    required this.distanceToPickupKm,
    required this.etaToPickupMinutes,
    this.estimatedMinutes = 18,
    this.category = 'Economy',
    this.serviceCategory = 'Economy',
    this.isParthonaOnly = false,
  });
}

class LedgerItem {
  final String id;
  final String title;
  final String date;
  final double amount;
  final double commission;
  final bool isTrip;

  const LedgerItem({
    required this.id,
    required this.title,
    required this.date,
    required this.amount,
    required this.commission,
    required this.isTrip,
  });
}
