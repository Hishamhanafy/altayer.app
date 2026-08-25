class DriverProfile {
  final String id;
  final String name;
  final String phone;
  final String avatar;
  final String carModel;
  final String carPlate;
  final double rating;
  final int totalTrips;
  final double walletBalance;
  final bool isVerified;

  const DriverProfile({
    required this.id,
    required this.name,
    required this.phone,
    required this.avatar,
    required this.carModel,
    required this.carPlate,
    required this.rating,
    required this.totalTrips,
    required this.walletBalance,
    required this.isVerified,
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
  final int estimatedMinutes;
  final int riderOfferedFare;
  final double distanceToPickupKm;
  final int etaToPickupMinutes;
  final String category;

  const RideOrder({
    required this.id,
    required this.riderName,
    required this.riderAvatar,
    required this.riderRating,
    required this.pickupAddress,
    required this.dropoffAddress,
    required this.tripDistanceKm,
    required this.estimatedMinutes,
    required this.riderOfferedFare,
    required this.distanceToPickupKm,
    required this.etaToPickupMinutes,
    required this.category,
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

class QuestCampaign {
  final String id;
  final String title;
  final String description;
  final int currentTrips;
  final int targetTrips;
  final double bonusAmount;
  final String validUntil;

  const QuestCampaign({
    required this.id,
    required this.title,
    required this.description,
    required this.currentTrips,
    required this.targetTrips,
    required this.bonusAmount,
    required this.validUntil,
  });
}
