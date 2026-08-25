import 'package:flutter/material.dart';
import '../theme/driver_theme.dart';
import '../models/driver_models.dart';

class ActiveNavigationScreen extends StatefulWidget {
  final RideOrder order;
  final int agreedFare;

  const ActiveNavigationScreen({
    super.key,
    required this.order,
    required this.agreedFare,
  });

  @override
  State<ActiveNavigationScreen> createState() => _ActiveNavigationScreenState();
}

class _ActiveNavigationScreenState extends State<ActiveNavigationScreen> {
  String _tripPhase = 'PICKING_UP'; // PICKING_UP, ARRIVED_AT_PICKUP, IN_TRIP, FINISHED
  final TextEditingController _otpController = TextEditingController();

  void _verifyOtpAndStartTrip() {
    if (_otpController.text.trim().length >= 4) {
      setState(() => _tripPhase = 'IN_TRIP');
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('تم التحقق من كود الأمان وبدأت الرحلة بنجاح 🟢')),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('يرجى إدخال كود الأمان المكون من 4 أرقام من الراكب')),
      );
    }
  }

  void _completeTripAndCollectCash() {
    final commission = widget.agreedFare * 0.10;
    final netProfit = widget.agreedFare - commission;

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        backgroundColor: DriverColors.surface,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(22)),
        title: const Row(
          children: [
            Text('💰', style: TextStyle(fontSize: 24)),
            SizedBox(width: 8),
            Text('تحصيل الأجرة كاش', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: DriverColors.primary)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              '${widget.agreedFare}.00 ج.م',
              style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: Colors.white),
            ),
            const SizedBox(height: 4),
            const Text('المبلغ المطلوب تحصيله نقداً من الراكب', style: TextStyle(fontSize: 11, color: DriverColors.textMuted)),
            const Divider(color: DriverColors.border, height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('عمولة المنصة (10%):', style: TextStyle(fontSize: 11, color: DriverColors.textMuted)),
                Text('-${commission.toStringAsFixed(1)} ج.م', style: const TextStyle(fontSize: 11, color: DriverColors.accentOrange, fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(height: 4),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('صافي أرباحك في المحفظة:', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.textPrimary)),
                Text('+${netProfit.toStringAsFixed(1)} ج.م', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: DriverColors.primary)),
              ],
            ),
          ],
        ),
        actions: [
          ElevatedButton(
            onPressed: () {
              Navigator.pop(ctx);
              Navigator.pop(context); // Return to Driver Radar Screen
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('تم تسجيل تحصيل ${widget.agreedFare} ج.م بنجاح! 🚗⚡')),
              );
            },
            style: ElevatedButton.styleFrom(backgroundColor: DriverColors.primary),
            child: const Text('تم استلام الكاش وإنهاء المشوار', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: DriverColors.background,
      body: Stack(
        children: [
          // Map & Navigation Representation
          Column(
            children: [
              Expanded(
                flex: 5,
                child: Container(
                  color: const Color(0xFF0B132B),
                  child: Stack(
                    children: [
                      Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              padding: const EdgeInsets.all(14),
                              decoration: BoxDecoration(
                                color: DriverColors.primary.withValues(alpha: 0.2),
                                shape: BoxShape.circle,
                              ),
                              child: const Icon(Icons.navigation, color: DriverColors.primary, size: 36),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              _tripPhase == 'PICKING_UP'
                                  ? 'التوجه لموقع الراكب: ${widget.order.pickupAddress}'
                                  : 'الملاحة الحية نحو الوجهة: ${widget.order.dropoffAddress}',
                              style: const TextStyle(fontSize: 12, color: Colors.white, fontWeight: FontWeight.bold),
                              textAlign: TextAlign.center,
                            ),
                          ],
                        ),
                      ),
                      // 1-Tap Google Maps Shortcut
                      Positioned(
                        top: 50,
                        right: 16,
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            color: DriverColors.surface.withValues(alpha: 0.9),
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(color: DriverColors.border),
                          ),
                          child: const Row(
                            children: [
                              Icon(Icons.map, color: DriverColors.primary, size: 16),
                              SizedBox(width: 6),
                              Text('فتح في خرائط Google', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const Expanded(flex: 5, child: SizedBox()),
            ],
          ),

          // Bottom Lifecycle Control Sheet
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              padding: const EdgeInsets.all(18),
              decoration: const BoxDecoration(
                color: DriverColors.surface,
                borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
                boxShadow: [
                  BoxShadow(color: Colors.black54, blurRadius: 20, offset: Offset(0, -5)),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Rider Info Row
                  Row(
                    children: [
                      Container(
                        width: 48,
                        height: 48,
                        decoration: BoxDecoration(
                          color: DriverColors.surfaceLight,
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: Center(child: Text(widget.order.riderAvatar, style: const TextStyle(fontSize: 24))),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(widget.order.riderName, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
                            Row(
                              children: [
                                const Icon(Icons.star, color: DriverColors.accentAmber, size: 13),
                                const SizedBox(width: 3),
                                Text('${widget.order.riderRating}', style: const TextStyle(fontSize: 11, color: DriverColors.textSecondary)),
                              ],
                            ),
                          ],
                        ),
                      ),
                      // Fare Badge
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text('${widget.agreedFare} ج.م', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: DriverColors.primary)),
                          const Text('أجرة كاش متفق عليها', style: TextStyle(fontSize: 9, color: DriverColors.textMuted)),
                        ],
                      ),
                    ],
                  ),

                  const SizedBox(height: 16),

                  // Phase 1: Arrived at Pickup Button
                  if (_tripPhase == 'PICKING_UP') ...[
                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: ElevatedButton.icon(
                        onPressed: () => setState(() => _tripPhase = 'ARRIVED_AT_PICKUP'),
                        icon: const Icon(Icons.pin_drop),
                        label: const Text('وصلت لنقطة الالتقاط (أنا بالخارج) 📍', style: TextStyle(fontSize: 13)),
                        style: ElevatedButton.styleFrom(backgroundColor: DriverColors.accentOrange),
                      ),
                    ),
                  ]
                  // Phase 2: Enter Safety OTP
                  else if (_tripPhase == 'ARRIVED_AT_PICKUP') ...[
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: DriverColors.surfaceLight,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: DriverColors.primary.withValues(alpha: 0.5)),
                      ),
                      child: Column(
                        children: [
                          const Text('أدخل كود الأمان (OTP) المكون من 4 أرقام من الراكب:', style: TextStyle(fontSize: 11, color: DriverColors.textSecondary)),
                          const SizedBox(height: 8),
                          Row(
                            children: [
                              Expanded(
                                child: TextField(
                                  controller: _otpController,
                                  keyboardType: TextInputType.number,
                                  maxLength: 4,
                                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, letterSpacing: 8, color: DriverColors.primary),
                                  textAlign: TextAlign.center,
                                  decoration: InputDecoration(
                                    counterText: '',
                                    hintText: '8492',
                                    hintStyle: const TextStyle(color: DriverColors.textMuted, fontSize: 14),
                                    filled: true,
                                    fillColor: DriverColors.background,
                                    contentPadding: const EdgeInsets.symmetric(vertical: 8),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
                                  ),
                                ),
                              ),
                              const SizedBox(width: 8),
                              ElevatedButton(
                                onPressed: _verifyOtpAndStartTrip,
                                child: const Text('تأكيد وبدء الرحلة'),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ]
                  // Phase 3: In Trip Navigation
                  else if (_tripPhase == 'IN_TRIP') ...[
                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: ElevatedButton.icon(
                        onPressed: _completeTripAndCollectCash,
                        icon: const Icon(Icons.check_circle),
                        label: Text('تم الوصول وتحصيل ${widget.agreedFare} ج كاش 🏁', style: const TextStyle(fontSize: 13)),
                        style: ElevatedButton.styleFrom(backgroundColor: DriverColors.primary),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
