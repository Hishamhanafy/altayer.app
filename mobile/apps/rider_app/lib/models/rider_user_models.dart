enum LoyaltyTier {
  bronze,
  silver,
  gold,
  platinum,
}

extension LoyaltyTierExtension on LoyaltyTier {
  String get title {
    switch (this) {
      case LoyaltyTier.bronze:
        return 'راكب برونزي 🥉';
      case LoyaltyTier.silver:
        return 'راكب فضي 🥈';
      case LoyaltyTier.gold:
        return 'راكب ذهبي 🥇';
      case LoyaltyTier.platinum:
        return 'راكب بلاتيني VIP 💎';
    }
  }

  String get perk {
    switch (this) {
      case LoyaltyTier.bronze:
        return 'خصم 5% على أول مشوارين كل أسبوع';
      case LoyaltyTier.silver:
        return 'خصم 10% ونقاط مضاعفة 1.2x';
      case LoyaltyTier.gold:
        return 'خصم 15% وأولوية في قبول الكباتن + نقاط 1.5x';
      case LoyaltyTier.platinum:
        return 'خصم 20% وأسرع كابتن متاح + دعم VIP مخصص';
    }
  }

  int get requiredPoints {
    switch (this) {
      case LoyaltyTier.bronze:
        return 0;
      case LoyaltyTier.silver:
        return 1000;
      case LoyaltyTier.gold:
        return 3000;
      case LoyaltyTier.platinum:
        return 6000;
    }
  }
}

class RewardVoucherItem {
  final String id;
  final String title;
  final String description;
  final int pointsCost;
  final int discountEgp;
  final String icon;
  bool isRedeemed;

  RewardVoucherItem({
    required this.id,
    required this.title,
    required this.description,
    required this.pointsCost,
    required this.discountEgp,
    required this.icon,
    this.isRedeemed = false,
  });
}

class PointsHistoryItem {
  final String id;
  final String title;
  final String date;
  final int points;
  final bool isPositive;

  const PointsHistoryItem({
    required this.id,
    required this.title,
    required this.date,
    required this.points,
    required this.isPositive,
  });
}

class PaymentMethodItem {
  final String id;
  final String type; // CASH, CARD, VODAFONE_CASH, INSTAPAY
  final String title;
  final String subtitle;
  final String icon;
  final bool isDefault;

  const PaymentMethodItem({
    required this.id,
    required this.type,
    required this.title,
    required this.subtitle,
    required this.icon,
    this.isDefault = false,
  });
}

class SavedPlaceItem {
  final String id;
  final String title;
  final String address;
  final String icon;

  const SavedPlaceItem({
    required this.id,
    required this.title,
    required this.address,
    required this.icon,
  });
}
