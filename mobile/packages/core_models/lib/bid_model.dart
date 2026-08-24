class DriverSummary {
  final String id;
  final String fullName;
  final String phoneNumber;
  final String? avatarUrl;
  final double ratingAvg;
  final int totalTrips;
  final String carMake;
  final String carModel;
  final String plateNumber;

  DriverSummary({
    required this.id,
    required this.fullName,
    required this.phoneNumber,
    this.avatarUrl,
    required this.ratingAvg,
    required this.totalTrips,
    required this.carMake,
    required this.carModel,
    required this.plateNumber,
  });

  factory DriverSummary.fromJson(Map<String, dynamic> json) {
    final user = json['user'] ?? {};
    final vehicle = json['vehicle'] ?? {};
    return DriverSummary(
      id: json['id'] ?? '',
      fullName: user['fullName'] ?? 'كابتن',
      phoneNumber: user['phoneNumber'] ?? '',
      avatarUrl: user['avatarUrl'],
      ratingAvg: (json['ratingAvg'] as num?)?.toDouble() ?? 5.0,
      totalTrips: json['totalTrips'] ?? 0,
      carMake: vehicle['make'] ?? '',
      carModel: vehicle['model'] ?? '',
      plateNumber: vehicle['plateNumber'] ?? '',
    );
  }
}

class BidModel {
  final String id;
  final String rideId;
  final String driverId;
  final double proposedFare;
  final int etaMinutes;
  final String status;
  final DriverSummary? driver;

  BidModel({
    required this.id,
    required this.rideId,
    required this.driverId,
    required this.proposedFare,
    required this.etaMinutes,
    required this.status,
    this.driver,
  });

  factory BidModel.fromJson(Map<String, dynamic> json) {
    return BidModel(
      id: json['id'],
      rideId: json['rideId'],
      driverId: json['driverId'],
      proposedFare: (json['proposedFare'] as num).toDouble(),
      etaMinutes: json['etaMinutes'] ?? 5,
      status: json['status'] ?? 'PENDING',
      driver: json['driver'] != null ? DriverSummary.fromJson(json['driver']) : null,
    );
  }
}
