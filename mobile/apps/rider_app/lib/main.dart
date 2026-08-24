import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  runApp(const AltayerRiderApp());
}

class AltayerRiderApp extends StatelessWidget {
  const AltayerRiderApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'عالطاير - راكب',
      debugShowCheckedModeBanner: false,
      locale: const Locale('ar', 'EG'),
      supportedLocales: const [
        Locale('ar', 'EG'),
        Locale('en', 'US'),
      ],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      theme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF020617),
        primaryColor: const Color(0xFFEA580C),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFFEA580C),
          secondary: Color(0xFFF97316),
          surface: Color(0xFF0F172A),
          background: Color(0xFF020617),
        ),
        textTheme: GoogleFonts.cairoTextTheme(ThemeData.dark().textTheme),
      ),
      home: const RiderHomeScreen(),
    );
  }
}

class RiderHomeScreen extends StatefulWidget {
  const RiderHomeScreen({Key? key}) : super(key: key);

  @override
  State<RiderHomeScreen> createState() => _RiderHomeScreenState();
}

class _RiderHomeScreenState extends State<RiderHomeScreen> {
  String _mode = 'BIDDING'; // BIDDING or INSTANT
  int _proposedFare = 75;
  bool _isSearching = false;
  bool _driverAccepted = false;
  String _appliedPromo = 'ALTAYER50';
  int _discount = 25;

  final List<Map<String, dynamic>> _sampleBids = [
    {
      'driver': 'كابتن محمود السيد',
      'car': 'تويوتا كورولا 2022',
      'plate': 'أ ب ج 1234',
      'rating': 4.9,
      'trips': 340,
      'fare': 75,
      'eta': 3,
    },
    {
      'driver': 'كابتن أحمد فؤاد',
      'car': 'هيونداي إلنترا 2024',
      'plate': 'ط ك ل 9101',
      'rating': 4.8,
      'trips': 512,
      'fare': 85,
      'eta': 5,
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        elevation: 0,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: const Color(0xFFEA580C),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text('⚡', style: TextStyle(fontSize: 16)),
            ),
            const SizedBox(width: 8),
            const Text(
              'عالطاير',
              style: TextStyle(fontWeight: FontWeight.w900, fontSize: 18, color: Colors.white),
            ),
          ],
        ),
        actions: [
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: const Color(0xFF1E293B),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0xFF334155)),
            ),
            child: const Row(
              children: [
                Text('⭐ 140 نقطة', style: TextStyle(fontSize: 12, color: Colors.amber, fontWeight: FontWeight.bold)),
              ],
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          // Map Representation
          Expanded(
            flex: 3,
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
                            color: const Color(0xFFEA580C).withOpacity(0.2),
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(Icons.directions_car, color: Color(0xFFEA580C), size: 40),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          _isSearching ? 'جاري استقبال عروض الكباتن...' : 'خريطة القاهرة الكبرى الحية (GPS)',
                          style: const TextStyle(fontSize: 13, color: Colors.white70, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  ),
                  Positioned(
                    top: 16,
                    right: 16,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                      decoration: BoxDecoration(
                        color: const Color(0xFF10B981),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.my_location, size: 14, color: Colors.white),
                          SizedBox(width: 4),
                          Text('ميدان التحرير', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Bottom Control Sheet
          Expanded(
            flex: 4,
            child: Container(
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(
                color: Color(0xFF0F172A),
                borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
              ),
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Mode Toggle (Bidding vs Instant)
                    Row(
                      children: [
                        Expanded(
                          child: GestureDetector(
                            onTap: () => setState(() => _mode = 'BIDDING'),
                            child: Container(
                              padding: const EdgeInsets.all(12),
                              decoration: BoxDecoration(
                                color: _mode == 'BIDDING' ? const Color(0xFFEA580C).withOpacity(0.2) : const Color(0xFF1E293B),
                                border: Border.all(
                                  color: _mode == 'BIDDING' ? const Color(0xFFEA580C) : Colors.transparent,
                                  width: 2,
                                ),
                                borderRadius: BorderRadius.circular(14),
                              ),
                              child: Column(
                                children: const [
                                  Text('🤝 مزايدة وتفاوض', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFFEA580C))),
                                  Text('حدد سعرك المقترح', style: TextStyle(fontSize: 10, color: Colors.white54)),
                                ],
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: GestureDetector(
                            onTap: () => setState(() => _mode = 'INSTANT'),
                            child: Container(
                              padding: const EdgeInsets.all(12),
                              decoration: BoxDecoration(
                                color: _mode == 'INSTANT' ? const Color(0xFF3B82F6).withOpacity(0.2) : const Color(0xFF1E293B),
                                border: Border.all(
                                  color: _mode == 'INSTANT' ? const Color(0xFF3B82F6) : Colors.transparent,
                                  width: 2,
                                ),
                                borderRadius: BorderRadius.circular(14),
                              ),
                              child: Column(
                                children: const [
                                  Text('⚡ حجز فوري', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF3B82F6))),
                                  Text('سعر ثابت وكابتن سريع', style: TextStyle(fontSize: 10, color: Colors.white54)),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 14),

                    // Fare Counter
                    if (_mode == 'BIDDING') ...[
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: const Color(0xFF020617),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: const Color(0xFF334155)),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            IconButton(
                              onPressed: () => setState(() => _proposedFare = (_proposedFare > 30) ? _proposedFare - 5 : 30),
                              icon: const Icon(Icons.remove_circle, color: Color(0xFFEA580C), size: 28),
                            ),
                            Column(
                              children: [
                                Text('$_proposedFare ج.م', style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: Colors.white)),
                                const Text('الأجرة المقترحة للرحلة', style: TextStyle(fontSize: 11, color: Colors.white54)),
                              ],
                            ),
                            IconButton(
                              onPressed: () => setState(() => _proposedFare += 5),
                              icon: const Icon(Icons.add_circle, color: Color(0xFFEA580C), size: 28),
                            ),
                          ],
                        ),
                      ),
                    ],

                    const SizedBox(height: 12),

                    // Promo Voucher Badge
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      decoration: BoxDecoration(
                        color: const Color(0xFF10B981).withOpacity(0.15),
                        border: Border.all(color: const Color(0xFF10B981).withOpacity(0.4)),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('🎟️ كود الخصم مفعّل: $_appliedPromo', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF10B981))),
                          Text('-$_discount ج.م', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF10B981))),
                        ],
                      ),
                    ),

                    const SizedBox(height: 14),

                    // Action Button
                    SizedBox(
                      width: double.infinity,
                      height: 50,
                      child: ElevatedButton(
                        onPressed: () => setState(() => _isSearching = !_isSearching),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFFEA580C),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        ),
                        child: Text(
                          _isSearching ? 'إلغاء الطلب' : '🚀 طلب مشوار عالطاير (${_proposedFare - _discount} ج.م بعد الخصم)',
                          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
