import 'dart:async';
import 'package:flutter/material.dart';
import '../theme/driver_theme.dart';
import '../models/driver_models.dart';
import 'active_navigation_screen.dart';

class IncomingBidModal extends StatefulWidget {
  final RideOrder order;

  const IncomingBidModal({
    super.key,
    required this.order,
  });

  @override
  State<IncomingBidModal> createState() => _IncomingBidModalState();
}

class _IncomingBidModalState extends State<IncomingBidModal> {
  int _secondsRemaining = 15;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (_secondsRemaining > 0) {
        setState(() => _secondsRemaining--);
      } else {
        _timer?.cancel();
        if (mounted) Navigator.pop(context);
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _acceptOffer(int finalFare) {
    _timer?.cancel();
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(
        builder: (_) => ActiveNavigationScreen(
          order: widget.order,
          agreedFare: finalFare,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final int baseFare = widget.order.riderOfferedFare;

    return Container(
      padding: const EdgeInsets.all(18),
      decoration: const BoxDecoration(
        color: DriverColors.surface,
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        boxShadow: [
          BoxShadow(color: Colors.black54, blurRadius: 25, offset: Offset(0, -5)),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Header & Timer
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(6),
                    decoration: BoxDecoration(
                      color: DriverColors.accentOrange.withValues(alpha: 0.2),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Text('🔔', style: TextStyle(fontSize: 16)),
                  ),
                  const SizedBox(width: 8),
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('طلب مشوار جديد!', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: DriverColors.accentOrange)),
                      Text('مزايدة فورية في محيطك', style: TextStyle(fontSize: 10, color: DriverColors.textMuted)),
                    ],
                  ),
                ],
              ),
              // Circular Timer
              Stack(
                alignment: Alignment.center,
                children: [
                  SizedBox(
                    width: 42,
                    height: 42,
                    child: CircularProgressIndicator(
                      value: _secondsRemaining / 15,
                      strokeWidth: 3,
                      backgroundColor: DriverColors.surfaceLight,
                      valueColor: const AlwaysStoppedAnimation<Color>(DriverColors.accentOrange),
                    ),
                  ),
                  Text(
                    '$_secondsRemaining',
                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w900, color: DriverColors.textPrimary),
                  ),
                ],
              ),
            ],
          ),

          const SizedBox(height: 14),

          // Route Details Box
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: DriverColors.background,
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: DriverColors.border),
            ),
            child: Column(
              children: [
                // Pickup
                Row(
                  children: [
                    const Icon(Icons.circle, color: DriverColors.primary, size: 12),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        widget.order.pickupAddress,
                        style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.textPrimary),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    Text(
                      '${widget.order.distanceToPickupKm} كم (${widget.order.etaToPickupMinutes} د)',
                      style: const TextStyle(fontSize: 10, color: DriverColors.textMuted),
                    ),
                  ],
                ),
                const Padding(
                  padding: EdgeInsets.symmetric(vertical: 4, horizontal: 5),
                  child: Align(
                    alignment: Alignment.centerRight,
                    child: SizedBox(
                      height: 12,
                      child: VerticalDivider(color: DriverColors.border, thickness: 1.5),
                    ),
                  ),
                ),
                // Dropoff
                Row(
                  children: [
                    const Icon(Icons.location_on, color: DriverColors.accentOrange, size: 14),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        widget.order.dropoffAddress,
                        style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.textPrimary),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    Text(
                      '${widget.order.tripDistanceKm} كم',
                      style: const TextStyle(fontSize: 10, color: DriverColors.textMuted),
                    ),
                  ],
                ),
              ],
            ),
          ),

          const SizedBox(height: 14),

          // Proposed Fare Highlight
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('سعر الزبون المقترح:', style: TextStyle(fontSize: 12, color: DriverColors.textSecondary)),
              Text(
                '$baseFare.00 ج.م',
                style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: Colors.white),
              ),
            ],
          ),

          const SizedBox(height: 16),

          // 1-Tap Counter Bid Buttons Grid
          Row(
            children: [
              Expanded(
                flex: 2,
                child: ElevatedButton(
                  onPressed: () => _acceptOffer(baseFare),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: DriverColors.primary,
                    padding: const EdgeInsets.symmetric(vertical: 12),
                  ),
                  child: Text('قبول ($baseFare ج)', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                ),
              ),
              const SizedBox(width: 6),
              Expanded(
                child: OutlinedButton(
                  onPressed: () => _acceptOffer(baseFare + 10),
                  style: OutlinedButton.styleFrom(
                    backgroundColor: DriverColors.surfaceLight,
                    side: const BorderSide(color: DriverColors.border),
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: Text('+10 (${baseFare + 10}ج)', style: const TextStyle(fontSize: 10, color: DriverColors.textPrimary)),
                ),
              ),
              const SizedBox(width: 6),
              Expanded(
                child: OutlinedButton(
                  onPressed: () => _acceptOffer(baseFare + 20),
                  style: OutlinedButton.styleFrom(
                    backgroundColor: DriverColors.surfaceLight,
                    side: const BorderSide(color: DriverColors.border),
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: Text('+20 (${baseFare + 20}ج)', style: const TextStyle(fontSize: 10, color: DriverColors.textPrimary)),
                ),
              ),
              const SizedBox(width: 6),
              IconButton(
                onPressed: () => Navigator.pop(context),
                icon: const Icon(Icons.close, color: DriverColors.accentRed),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
