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
        return 'عميل أخيل برونزي 🥉';
      case LoyaltyTier.silver:
        return 'عميل أخيل فضي 🥈';
      case LoyaltyTier.gold:
        return 'عميل أخيل ذهبي 🥇';
      case LoyaltyTier.platinum:
        return 'عميل أخيل بلاتيني VIP 💎';
    }
  }

  String get perk {
    switch (this) {
      case LoyaltyTier.bronze:
        return 'خصم 5% ونقاط مشاوير أساسية';
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

class AkhilIncentiveProgram {
  final String code;
  final String title;
  final String slogan;
  final String description;
  final String icon;
  final bool isCredit;

  const AkhilIncentiveProgram({
    required this.code,
    required this.title,
    required this.slogan,
    required this.description,
    required this.icon,
    this.isCredit = false,
  });
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
  final String type; // CASH, WALLET, CARD, VODAFONE_CASH, INSTAPAY, AKHIL_CREDIT
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
