import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/ride_models.dart';
import 'search_destination_screen.dart';
import 'live_bidding_screen.dart';
import 'rider_wallet_promo_screen.dart';
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
  int _baseFare = 75;

  @override
  Widget build(BuildContext context) {
    final int estimatedFare = (_baseFare * _selectedCategory.multiplier()).round();

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: AppColors.primary,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text('⚡', style: TextStyle(fontSize: 16)),
            ),
            const SizedBox(width: 8),
            const Text('عالطاير'),
          ],
        ),
        actions: [
          IconButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const RiderWalletPromoScreen()),
              );
            },
            icon: const Icon(Icons.account_balance_wallet_outlined, color: AppColors.primaryLight),
          ),
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: AppColors.surfaceLight,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppColors.border),
            ),
            child: const Row(
              children: [
                Text('⭐ 140 نقطة', style: TextStyle(fontSize: 11, color: AppColors.accentAmber, fontWeight: FontWeight.bold)),
              ],
            ),
          ),
        ],
      ),
      body: Stack(
        children: [
          // Simulated Dark Vector Map
          Column(
            children: [
              Expanded(
                flex: 4,
                child: Container(
                  color: const Color(0xFF0B132B),
                  child: Stack(
                    children: [
                      Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              padding: const EdgeInsets.all(12),
                              decoration: BoxDecoration(
                                color: AppColors.primary.withValues(alpha: 0.15),
                                shape: BoxShape.circle,
                              ),
                              child: const Icon(Icons.directions_car, color: AppColors.primary, size: 36),
                            ),
                            const SizedBox(height: 6),
                            const Text(
                              'خريطة القاهرة الكبرى الحية (GPS)',
                              style: TextStyle(fontSize: 12, color: AppColors.textSecondary, fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                      ),
                      // Roaming Car Markers
                      const Positioned(
                        top: 40,
                        right: 80,
                        child: Text('🚖', style: TextStyle(fontSize: 22)),
                      ),
                      const Positioned(
                        top: 100,
                        left: 60,
                        child: Text('🚗', style: TextStyle(fontSize: 20)),
                      ),
                      const Positioned(
                        bottom: 60,
                        right: 120,
                        child: Text('🚘', style: TextStyle(fontSize: 24)),
                      ),
                      // Current Pickup Tag
                      Positioned(
                        top: 16,
                        right: 16,
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                          decoration: BoxDecoration(
                            color: AppColors.accentGreen,
                            borderRadius: BorderRadius.circular(10),
                            boxShadow: const [BoxShadow(color: Colors.black26, blurRadius: 6)],
                          ),
                          child: const Row(
                            children: [
                              Icon(Icons.my_location, size: 12, color: Colors.white),
                              SizedBox(width: 4),
                              Text('ميدان التحرير، وسط البلد', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
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

          // Bottom Interactive Ride Control Sheet
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
                boxShadow: [
                  BoxShadow(color: Colors.black45, blurRadius: 20, offset: Offset(0, -5)),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Destination Search Bar trigger
                  InkWell(
                    onTap: () async {
                      final result = await Navigator.push<String>(
                        context,
                        MaterialPageRoute(builder: (_) => const SearchDestinationScreen()),
                      );
                      if (result != null && result.isNotEmpty) {
                        setState(() => _destination = result);
                      }
                    },
                    borderRadius: BorderRadius.circular(14),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                      decoration: BoxDecoration(
                        color: AppColors.surfaceLight,
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(color: AppColors.border),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.search, color: AppColors.primary, size: 20),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('الوجهة المحددة:', style: TextStyle(fontSize: 10, color: AppColors.textMuted)),
                                Text(
                                  _destination,
                                  style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ],
                            ),
                          ),
                          const Icon(Icons.edit, color: AppColors.textMuted, size: 16),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 12),

                  // Mode Selector (Instant vs Bidding)
                  Row(
                    children: [
                      Expanded(
                        child: GestureDetector(
                          onTap: () => setState(() => _mode = 'BIDDING'),
                          child: Container(
                            padding: const EdgeInsets.symmetric(vertical: 10),
                            decoration: BoxDecoration(
                              color: _mode == 'BIDDING' ? AppColors.primary.withValues(alpha: 0.15) : AppColors.surfaceLight,
                              border: Border.all(
                                color: _mode == 'BIDDING' ? AppColors.primary : Colors.transparent,
                                width: 1.5,
                              ),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: const Column(
                              children: [
                                Text('🤝 مزايدة وتفاوض', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: AppColors.primary)),
                                Text('حدد سعرك واقبل الأنسب', style: TextStyle(fontSize: 9, color: AppColors.textMuted)),
                              ],
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: GestureDetector(
                          onTap: () => setState(() => _mode = 'INSTANT'),
                          child: Container(
                            padding: const EdgeInsets.symmetric(vertical: 10),
                            decoration: BoxDecoration(
                              color: _mode == 'INSTANT' ? AppColors.accentBlue.withValues(alpha: 0.15) : AppColors.surfaceLight,
                              border: Border.all(
                                color: _mode == 'INSTANT' ? AppColors.accentBlue : Colors.transparent,
                                width: 1.5,
                              ),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: const Column(
                              children: [
                                Text('⚡ حجز فوري', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: AppColors.accentBlue)),
                                Text('سعر ثابت وأسرع كابتن', style: TextStyle(fontSize: 9, color: AppColors.textMuted)),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 12),

                  // Vehicle Category Carousel
                  SizedBox(
                    height: 90,
                    child: ListView(
                      scrollDirection: Axis.horizontal,
                      children: VehicleCategory.values.map((cat) {
                        final isSelected = (_selectedCategory == cat);
                        final fare = (_baseFare * cat.multiplier()).round();

                        return GestureDetector(
                          onTap: () => setState(() => _selectedCategory = cat),
                          child: Container(
                            width: 100,
                            margin: const EdgeInsets.only(left: 8),
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: isSelected ? AppColors.primary.withValues(alpha: 0.15) : AppColors.surfaceLight,
                              border: Border.all(
                                color: isSelected ? AppColors.primary : AppColors.border,
                                width: isSelected ? 1.5 : 1,
                              ),
                              borderRadius: BorderRadius.circular(14),
                            ),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(cat.icon, style: const TextStyle(fontSize: 20)),
                                const SizedBox(height: 2),
                                Text(cat.title, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppColors.textPrimary), maxLines: 1),
                                Text('$fare ج.م', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w900, color: AppColors.primaryLight)),
                              ],
                            ),
                          ),
                        );
                      }).toList(),
                    ),
                  ),

                  const SizedBox(height: 14),

                  // Action Button (Launch Bidding or Instant)
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
                          // Instant Ride matching
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => InTripTrackingScreen(
                                bid: DriverBid(
                                  id: 'INSTANT-88',
                                  driverName: 'كابتن محمود السيد (فوري)',
                                  avatar: '👨🏻‍✈️',
                                  carModel: 'تويوتا كورولا 2023',
                                  carColor: 'فضي',
                                  plateNumber: 'أ ب ج 1234',
                                  rating: 4.95,
                                  totalTrips: 1540,
                                  fare: estimatedFare,
                                  etaMinutes: _selectedCategory.etaMinutes,
                                  distanceKm: 1.4,
                                ),
                                destination: _destination,
                              ),
                            ),
                          );
                        }
                      },
                      child: Text(
                        _mode == 'BIDDING'
                            ? '🚀 بدء رادار المزايدة ($estimatedFare ج.م)'
                            : '⚡ طلب فوري الآن ($estimatedFare ج.م • وصل في ${_selectedCategory.etaMinutes} د)',
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
