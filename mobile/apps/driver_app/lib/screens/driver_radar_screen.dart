import 'package:flutter/material.dart';
import '../theme/driver_theme.dart';
import '../models/driver_models.dart';
import 'incoming_bid_modal.dart';
import 'driver_kyc_camera_screen.dart';

class DriverRadarScreen extends StatefulWidget {
  const DriverRadarScreen({super.key});

  @override
  State<DriverRadarScreen> createState() => _DriverRadarScreenState();
}

class _DriverRadarScreenState extends State<DriverRadarScreen> {
  bool _isOnline = true;

  final RideOrder _sampleOrder = const RideOrder(
    id: 'ORD-7819',
    riderName: 'أحمد إبراهيم',
    riderAvatar: '🧔🏻',
    riderRating: 4.85,
    pickupAddress: 'ميدان طلعت حرب، وسط البلد',
    dropoffAddress: 'كايرو فيستيفال سيتي، التجمع الخامس',
    tripDistanceKm: 16.5,
    estimatedMinutes: 28,
    riderOfferedFare: 85,
    distanceToPickupKm: 0.9,
    etaToPickupMinutes: 2,
    category: 'عالطاير توفير',
  );

  void _triggerIncomingRide() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => IncomingBidModal(order: _sampleOrder),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: DriverColors.background,
      body: Stack(
        children: [
          // Simulated Dark Map with Surge Zones
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
                                color: _isOnline ? DriverColors.primary.withValues(alpha: 0.2) : DriverColors.surfaceLight,
                                shape: BoxShape.circle,
                              ),
                              child: Icon(
                                Icons.radar,
                                color: _isOnline ? DriverColors.primary : DriverColors.textMuted,
                                size: 38,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              _isOnline
                                  ? 'الرادار يبحث عن طلبات قريبة في محيطك (القاهرة)...'
                                  : 'أنت في وضع غير متصل • لن تستقبل طلبات',
                              style: const TextStyle(fontSize: 12, color: Colors.white70),
                            ),
                          ],
                        ),
                      ),
                      // Surge Badges on Cairo Map
                      Positioned(
                        top: 20,
                        right: 30,
                        child: _buildSurgeBadge('التحرير', '1.4x 🔥'),
                      ),
                      Positioned(
                        top: 70,
                        left: 40,
                        child: _buildSurgeBadge('التجمع', '1.6x ⚡'),
                      ),
                      Positioned(
                        bottom: 40,
                        right: 80,
                        child: _buildSurgeBadge('المعادي', '1.3x 🌟'),
                      ),
                    ],
                  ),
                ),
              ),
              const Expanded(flex: 4, child: SizedBox()),
            ],
          ),

          // Top Stats Bar & Online Switch
          Positioned(
            top: 10,
            left: 16,
            right: 16,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              decoration: BoxDecoration(
                color: DriverColors.surface.withValues(alpha: 0.95),
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: DriverColors.border),
                boxShadow: const [BoxShadow(color: Colors.black38, blurRadius: 10)],
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('أرباح اليوم (7 رحلات)', style: TextStyle(fontSize: 10, color: DriverColors.textMuted)),
                      Text('485.50 ج.م', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: DriverColors.primary)),
                    ],
                  ),
                  // Online/Offline Switch
                  GestureDetector(
                    onTap: () => setState(() => _isOnline = !_isOnline),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      decoration: BoxDecoration(
                        color: _isOnline ? DriverColors.primary.withValues(alpha: 0.2) : DriverColors.surfaceLight,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: _isOnline ? DriverColors.primary : DriverColors.border),
                      ),
                      child: Text(
                        _isOnline ? 'متصل الآن 🟢' : 'غير متصل ⚪',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                          color: _isOnline ? DriverColors.primary : DriverColors.textMuted,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Bottom Trigger & KYC Status Card
          Positioned(
            bottom: 16,
            left: 16,
            right: 16,
            child: Column(
              children: [
                // KYC Verification Banner
                InkWell(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (_) => const DriverKycCameraScreen()),
                    );
                  },
                  borderRadius: BorderRadius.circular(14),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                    decoration: BoxDecoration(
                      color: DriverColors.surface,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: DriverColors.primary.withValues(alpha: 0.5)),
                    ),
                    child: const Row(
                      children: [
                        Text('📄', style: TextStyle(fontSize: 18)),
                        SizedBox(width: 10),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('حالة توثيق الكابتن (مفعل جزئياً)', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
                              Text('اضغط لاستكمال رفع رخصة السيارة والفيش بالكاميرا', style: TextStyle(fontSize: 9, color: DriverColors.primary)),
                            ],
                          ),
                        ),
                        Icon(Icons.chevron_left, color: DriverColors.primary, size: 18),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 10),

                // Simulate Incoming Bid Button
                SizedBox(
                  width: double.infinity,
                  height: 50,
                  child: ElevatedButton.icon(
                    onPressed: _isOnline ? _triggerIncomingRide : null,
                    icon: const Icon(Icons.notifications_active),
                    label: const Text('محاكاة: استقبال طلب مزايدة جديد 🔔', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w900)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: DriverColors.accentOrange,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSurgeBadge(String area, String surge) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: DriverColors.accentOrange.withValues(alpha: 0.85),
        borderRadius: BorderRadius.circular(12),
        boxShadow: const [BoxShadow(color: Colors.black26, blurRadius: 4)],
      ),
      child: Text(
        '$area $surge',
        style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white),
      ),
    );
  }
}
