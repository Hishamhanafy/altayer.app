import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/ride_models.dart';
import 'search_destination_screen.dart';
import 'live_bidding_screen.dart';
import 'in_trip_tracking_screen.dart';

class HomeMapScreen extends StatefulWidget {
  const HomeMapScreen({super.key});

  @override
  State<HomeMapScreen> createState() => _HomeMapScreenState();
}

class _HomeMapScreenState extends State<HomeMapScreen> {
  String _mode = 'BIDDING'; // BIDDING or INSTANT
  VehicleCategory _selectedCategory = VehicleCategory.economy;
  String _destination = 'سيتي ستارز مول، مدينة نصر';
  final int _baseFare = 75;

  int _calculateRoundedFare() {
    final double raw = _baseFare * _selectedCategory.multiplier();
    // Round to next multiple of 5 EGP
    return ((raw / 5).ceil() * 5).toInt();
  }

  void _showScheduledTripModal() {
    DateTime selectedDate = DateTime.now().add(const Duration(hours: 3));
    TimeOfDay selectedTime = TimeOfDay.fromDateTime(selectedDate);

    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (ctx) {
        return Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Row(
                children: [
                  Text('📅', style: TextStyle(fontSize: 24)),
                  SizedBox(width: 8),
                  Text('حجز رحلة مجدولة مسبقاً — أخيل', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w900, color: Colors.white)),
                ],
              ),
              const SizedBox(height: 6),
              const Text('حدد موعد رحلتك وسنقوم بتعيين أقرب كابتن معتمد مسبقاً مع إرسال تنبيهات استباقية.', style: TextStyle(fontSize: 11, color: AppColors.textMuted)),
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppColors.surfaceLight,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: AppColors.border),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('الموعد المختار:', style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                    Text('${selectedDate.day}/${selectedDate.month} — ${selectedTime.format(context)}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFFFBBF24))),
                  ],
                ),
              ),
              const SizedBox(height: 18),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () {
                    Navigator.pop(ctx);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('تم جدولة الرحلة بنجاح! سننبهك قبل الموعد بـ 30 دقيقة 📅🟢')),
                    );
                  },
                  icon: const Icon(Icons.check_circle),
                  label: const Text('تأكيد حجز الرحلة المجدولة'),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final int estimatedFare = _calculateRoundedFare();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: Stack(
        children: [
          // Simulated Dark Vector Map
          Positioned.fill(
            child: Container(
              color: const Color(0xFF0F172A),
              child: Stack(
                children: [
                  // Vector Grid Lines
                  CustomPaint(
                    size: Size.infinite,
                    painter: MapGridPainter(),
                  ),
                  // Roaming Car Markers
                  const Positioned(top: 180, left: 90, child: Text('🚗', style: TextStyle(fontSize: 22))),
                  const Positioned(top: 240, right: 110, child: Text('🚘', style: TextStyle(fontSize: 22))),
                  const Positioned(top: 130, right: 70, child: Text('🌸', style: TextStyle(fontSize: 22))),
                  const Positioned(top: 310, left: 160, child: Text('🚗', style: TextStyle(fontSize: 22))),
                  // User Location Pin
                  Positioned(
                    top: 220,
                    left: MediaQuery.of(context).size.width / 2 - 20,
                    child: Column(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: const Color(0xFF1E1B4B),
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: const Color(0xFFF59E0B), width: 1.5),
                          ),
                          child: const Text('موقعك الحالي', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                        ),
                        const Icon(Icons.location_on, color: Color(0xFFF59E0B), size: 36),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Top Mode Switcher & Slogan
          Positioned(
            top: 16,
            left: 16,
            right: 16,
            child: Row(
              children: [
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(4),
                    decoration: BoxDecoration(
                      color: AppColors.surface.withValues(alpha: 0.95),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.border),
                    ),
                    child: Row(
                      children: [
                        Expanded(
                          child: GestureDetector(
                            onTap: () => setState(() => _mode = 'BIDDING'),
                            child: Container(
                              padding: const EdgeInsets.symmetric(vertical: 8),
                              decoration: BoxDecoration(
                                color: _mode == 'BIDDING' ? AppColors.primary : Colors.transparent,
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Center(
                                child: Text(
                                  'المزايدة بسعرك ⚡',
                                  style: TextStyle(
                                    fontSize: 11,
                                    fontWeight: FontWeight.bold,
                                    color: _mode == 'BIDDING' ? Colors.white : AppColors.textMuted,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                        Expanded(
                          child: GestureDetector(
                            onTap: () => setState(() => _mode = 'INSTANT'),
                            child: Container(
                              padding: const EdgeInsets.symmetric(vertical: 8),
                              decoration: BoxDecoration(
                                color: _mode == 'INSTANT' ? AppColors.accentGreen : Colors.transparent,
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Center(
                                child: Text(
                                  'حجز فوري مباشر 🚀',
                                  style: TextStyle(
                                    fontSize: 11,
                                    fontWeight: FontWeight.bold,
                                    color: _mode == 'INSTANT' ? Colors.white : AppColors.textMuted,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  onPressed: _showScheduledTripModal,
                  icon: const Icon(Icons.calendar_month, color: Color(0xFFFBBF24)),
                  tooltip: 'رحلة مجدولة',
                  style: IconButton.styleFrom(backgroundColor: AppColors.surface),
                ),
              ],
            ),
          ),

          // Bottom Ride Ordering Sheet
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              padding: const EdgeInsets.fromLTRB(16, 14, 16, 16),
              decoration: const BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
                boxShadow: [
                  BoxShadow(color: Colors.black54, blurRadius: 20, offset: Offset(0, -4)),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Destination Search Bar
                  GestureDetector(
                    onTap: () async {
                      final result = await Navigator.push<String>(
                        context,
                        MaterialPageRoute(builder: (_) => const SearchDestinationScreen()),
                      );
                      if (result != null) setState(() => _destination = result);
                    },
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: AppColors.surfaceLight,
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(color: AppColors.border),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.search, color: Color(0xFFFBBF24), size: 20),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Text(
                              _destination,
                              style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          const Icon(Icons.edit, color: AppColors.textMuted, size: 14),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 12),

                  // AKHIL 10 Services Carousel
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('خدمات أخيل (اختر الفئة المناسبة):', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.textSecondary)),
                      Text('سعر مقرب لأعلى 5 ج', style: TextStyle(fontSize: 9, color: AppColors.textMuted)),
                    ],
                  ),
                  const SizedBox(height: 8),

                  SizedBox(
                    height: 85,
                    child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: VehicleCategory.values.length,
                      itemBuilder: (ctx, index) {
                        final cat = VehicleCategory.values[index];
                        final isSelected = (_selectedCategory == cat);

                        return GestureDetector(
                          onTap: () => setState(() => _selectedCategory = cat),
                          child: Container(
                            width: 110,
                            margin: const EdgeInsets.only(left: 8),
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: isSelected ? const Color(0xFF1E1B4B) : AppColors.surfaceLight,
                              borderRadius: BorderRadius.circular(14),
                              border: Border.all(
                                color: isSelected ? const Color(0xFFF59E0B) : AppColors.border,
                                width: isSelected ? 1.5 : 1,
                              ),
                            ),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(cat.icon, style: const TextStyle(fontSize: 20)),
                                const SizedBox(height: 2),
                                Text(
                                  cat.title,
                                  style: TextStyle(
                                    fontSize: 10,
                                    fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                                    color: isSelected ? const Color(0xFFFBBF24) : Colors.white,
                                  ),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),

                  const SizedBox(height: 10),

                  // Waiting Policy Note
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceLight,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Row(
                      children: [
                        Icon(Icons.timer_outlined, size: 14, color: AppColors.accentGreen),
                        SizedBox(width: 6),
                        Text('سياسة الانتظار: أول دقيقتين مجاناً ثم 3 ج/دقيقة', style: TextStyle(fontSize: 10, color: AppColors.textMuted)),
                      ],
                    ),
                  ),

                  const SizedBox(height: 12),

                  // Order CTA Button
                  SizedBox(
                    width: double.infinity,
                    height: 48,
                    child: ElevatedButton(
                      onPressed: () {
                        if (_mode == 'BIDDING') {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => LiveBiddingScreen(
                                initialFare: estimatedFare,
                                destination: _destination,
                                category: _selectedCategory,
                              ),
                            ),
                          );
                        } else {
                          // Instant mode
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => InTripTrackingScreen(
                                destination: _destination,
                                bid: DriverBid(
                                  id: 'D-1',
                                  driverName: 'محمود السيد (كابتن أخيل)',
                                  avatar: '👨🏻‍✈️',
                                  rating: 4.94,
                                  totalTrips: 1240,
                                  carModel: 'تويوتا كورولا 2022',
                                  carColor: 'أبيض لؤلؤي',
                                  plateNumber: 'أ ب ج 1234',
                                  fare: estimatedFare,
                                  distanceKm: 1.2,
                                  etaMinutes: 4,
                                ),
                              ),
                            ),
                          );
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: _mode == 'BIDDING' ? AppColors.primary : AppColors.accentGreen,
                      ),
                      child: Text(
                        _mode == 'BIDDING'
                            ? 'استدعِ أخيل الآن بسعر ($estimatedFare ج.م) ⚡'
                            : 'حجز فوري مباشر ($estimatedFare ج.م) 🚀',
                        style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w900),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class MapGridPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0xFF1E293B).withValues(alpha: 0.6)
      ..strokeWidth = 1.0;

    for (double i = 0; i < size.width; i += 40) {
      canvas.drawLine(Offset(i, 0), Offset(i, size.height), paint);
    }
    for (double i = 0; i < size.height; i += 40) {
      canvas.drawLine(Offset(0, i), Offset(size.width, i), paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
