import 'dart:async';
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/ride_models.dart';
import 'in_trip_tracking_screen.dart';

class LiveBiddingScreen extends StatefulWidget {
  final int initialFare;
  final String destination;
  final VehicleCategory category;

  const LiveBiddingScreen({
    super.key,
    required this.initialFare,
    required this.destination,
    required this.category,
  });

  @override
  State<LiveBiddingScreen> createState() => _LiveBiddingScreenState();
}

class _LiveBiddingScreenState extends State<LiveBiddingScreen> {
  late int _currentFare;
  int _secondsRemaining = 60;
  Timer? _timer;
  final List<DriverBid> _incomingBids = [];

  final List<DriverBid> _mockBids = const [
    DriverBid(
      id: 'BID-101',
      driverName: 'كابتن محمود السيد',
      avatar: '👨🏻‍✈️',
      carModel: 'تويوتا كورولا 2023',
      carColor: 'فضي',
      plateNumber: 'أ ب ج 1234',
      rating: 4.94,
      totalTrips: 1240,
      fare: 75,
      etaMinutes: 3,
      distanceKm: 1.2,
    ),
    DriverBid(
      id: 'BID-102',
      driverName: 'كابتن أحمد فؤاد',
      avatar: '🧔🏻',
      carModel: 'هيونداي إلنترا CN7',
      carColor: 'أبيض',
      plateNumber: 'ط ك ل 5678',
      rating: 4.88,
      totalTrips: 890,
      fare: 85,
      etaMinutes: 4,
      distanceKm: 1.8,
    ),
    DriverBid(
      id: 'BID-103',
      driverName: 'كابتن كريم ممدوح',
      avatar: '👨🏽‍✈️',
      carModel: 'نيسان صني 2024',
      carColor: 'برونزي',
      plateNumber: 'س ع ص 9012',
      rating: 4.97,
      totalTrips: 2150,
      fare: 80,
      etaMinutes: 2,
      distanceKm: 0.9,
    ),
  ];

  @override
  void initState() {
    super.initState();
    _currentFare = widget.initialFare;
    _startTimer();
    _simulateIncomingBids();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (_secondsRemaining > 0) {
        setState(() => _secondsRemaining--);
      } else {
        _timer?.cancel();
      }
    });
  }

  void _simulateIncomingBids() {
    Future.delayed(const Duration(milliseconds: 1200), () {
      if (mounted) setState(() => _incomingBids.add(_mockBids[0]));
    });
    Future.delayed(const Duration(milliseconds: 2800), () {
      if (mounted) setState(() => _incomingBids.add(_mockBids[1]));
    });
    Future.delayed(const Duration(milliseconds: 4500), () {
      if (mounted) setState(() => _incomingBids.add(_mockBids[2]));
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _acceptBid(DriverBid bid) {
    _timer?.cancel();
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(
        builder: (_) => InTripTrackingScreen(
          bid: bid,
          destination: widget.destination,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('رادار المزايدة المباشر 🤝'),
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Column(
        children: [
          // Radar & Current Fare Header
          Container(
            padding: const EdgeInsets.all(16),
            decoration: const BoxDecoration(
              color: AppColors.surface,
              borderRadius: BorderRadius.vertical(bottom: Radius.circular(24)),
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'الوجهة: ${widget.destination}',
                          style: const TextStyle(fontSize: 12, color: AppColors.textSecondary, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 2),
                        Row(
                          children: [
                            Text(widget.category.icon, style: const TextStyle(fontSize: 14)),
                            const SizedBox(width: 4),
                            Text(widget.category.title, style: const TextStyle(fontSize: 11, color: AppColors.textMuted)),
                          ],
                        ),
                      ],
                    ),
                    // Circular Countdown Timer
                    Stack(
                      alignment: Alignment.center,
                      children: [
                        SizedBox(
                          width: 44,
                          height: 44,
                          child: CircularProgressIndicator(
                            value: _secondsRemaining / 60,
                            strokeWidth: 3,
                            backgroundColor: AppColors.surfaceLight,
                            valueColor: const AlwaysStoppedAnimation<Color>(AppColors.primary),
                          ),
                        ),
                        Text(
                          '$_secondsRemaining',
                          style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w900, color: AppColors.textPrimary),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                // Current Proposed Fare with Adjustment Buttons
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                  decoration: BoxDecoration(
                    color: AppColors.surfaceLight,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: AppColors.border),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      IconButton(
                        onPressed: () {
                          if (_currentFare > 30) setState(() => _currentFare -= 5);
                        },
                        icon: const Icon(Icons.remove_circle, color: AppColors.primary, size: 28),
                      ),
                      Column(
                        children: [
                          Text(
                            '$_currentFare ج.م',
                            style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: AppColors.textPrimary),
                          ),
                          const Text('سعرك المقترح الحالي', style: TextStyle(fontSize: 10, color: AppColors.textMuted)),
                        ],
                      ),
                      IconButton(
                        onPressed: () => setState(() => _currentFare += 5),
                        icon: const Icon(Icons.add_circle, color: AppColors.primary, size: 28),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // Incoming Bids Stream
          Expanded(
            child: _incomingBids.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const SizedBox(
                          width: 40,
                          height: 40,
                          child: CircularProgressIndicator(
                            strokeWidth: 3,
                            color: AppColors.primary,
                          ),
                        ),
                        const SizedBox(height: 16),
                        const Text(
                          'جاري إرسال طلبك لكباتن المنطقة...',
                          style: TextStyle(fontSize: 13, color: AppColors.textSecondary, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'استقبل عروض أسعار وقارن بين السائقين والسيارات',
                          style: TextStyle(fontSize: 11, color: AppColors.textMuted.withValues(alpha: 0.8)),
                        ),
                      ],
                    ),
                  )
                : ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: _incomingBids.length,
                    itemBuilder: (context, index) {
                      final bid = _incomingBids[index];
                      return _buildBidCard(bid);
                    },
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildBidCard(DriverBid bid) {
    final bool isExactMatch = (bid.fare <= _currentFare);

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(
          color: isExactMatch ? AppColors.accentGreen.withValues(alpha: 0.8) : AppColors.primary.withValues(alpha: 0.4),
          width: isExactMatch ? 1.5 : 1,
        ),
      ),
      child: Column(
        children: [
          Row(
            children: [
              // Avatar
              Container(
                width: 46,
                height: 46,
                decoration: BoxDecoration(
                  color: AppColors.surfaceLight,
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Center(
                  child: Text(bid.avatar, style: const TextStyle(fontSize: 24)),
                ),
              ),
              const SizedBox(width: 12),
              // Driver & Car Info
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      bid.driverName,
                      style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                    ),
                    const SizedBox(height: 2),
                    Row(
                      children: [
                        const Icon(Icons.star, color: AppColors.accentAmber, size: 14),
                        const SizedBox(width: 3),
                        Text(
                          '${bid.rating} (${bid.totalTrips} رحلة)',
                          style: const TextStyle(fontSize: 11, color: AppColors.textSecondary),
                        ),
                      ],
                    ),
                    const SizedBox(height: 2),
                    Text(
                      '${bid.carModel} • ${bid.plateNumber}',
                      style: const TextStyle(fontSize: 11, color: AppColors.textMuted),
                    ),
                  ],
                ),
              ),
              // Fare & ETA
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    '${bid.fare} ج.م',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w900,
                      color: isExactMatch ? AppColors.accentGreen : AppColors.primary,
                    ),
                  ),
                  Text(
                    'يبعد ${bid.etaMinutes} د (${bid.distanceKm} كم)',
                    style: const TextStyle(fontSize: 10, color: AppColors.textMuted),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 12),
          // Action Buttons
          Row(
            children: [
              Expanded(
                child: ElevatedButton(
                  onPressed: () => _acceptBid(bid),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: isExactMatch ? AppColors.accentGreen : AppColors.primary,
                    padding: const EdgeInsets.symmetric(vertical: 10),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: Text(
                    'قبول العرض (${bid.fare} ج.م)',
                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              OutlinedButton(
                onPressed: () {
                  setState(() => _incomingBids.removeWhere((b) => b.id == bid.id));
                },
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppColors.textMuted,
                  side: const BorderSide(color: AppColors.border),
                  padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text('تخطي', style: TextStyle(fontSize: 12)),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
