import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  runApp(const AltayerDriverApp());
}

class AltayerDriverApp extends StatelessWidget {
  const AltayerDriverApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'عالطاير - كابتن',
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
        primaryColor: const Color(0xFF10B981),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF10B981),
          secondary: Color(0xFFEA580C),
          surface: Color(0xFF0F172A),
        ),
        textTheme: GoogleFonts.cairoTextTheme(ThemeData.dark().textTheme),
      ),
      home: const DriverHomeScreen(),
    );
  }
}

class DriverHomeScreen extends StatefulWidget {
  const DriverHomeScreen({super.key});

  @override
  State<DriverHomeScreen> createState() => _DriverHomeScreenState();
}

class _DriverHomeScreenState extends State<DriverHomeScreen> {
  int _currentIndex = 0;
  bool _isOnline = true;
  double _walletBalance = 140.0;
  bool _hasIncomingBid = false;

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
                color: const Color(0xFF10B981),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text('🚗', style: TextStyle(fontSize: 16)),
            ),
            const SizedBox(width: 8),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('كابتن محمود السيد', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.white)),
                Text('تويوتا كورولا 2022 • ⭐ 4.9', style: TextStyle(fontSize: 10, color: Color(0xFF10B981))),
              ],
            ),
          ],
        ),
        actions: [
          GestureDetector(
            onTap: () => setState(() => _isOnline = !_isOnline),
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: _isOnline ? const Color(0xFF10B981).withValues(alpha: 0.2) : const Color(0xFF334155),
                border: Border.all(color: _isOnline ? const Color(0xFF10B981) : Colors.transparent),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                _isOnline ? 'متصل 🟢' : 'غير متصل ⚪',
                style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: _isOnline ? const Color(0xFF10B981) : Colors.white60),
              ),
            ),
          ),
        ],
      ),
      body: _buildCurrentTab(context),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        backgroundColor: const Color(0xFF0F172A),
        selectedItemColor: const Color(0xFFEA580C),
        unselectedItemColor: Colors.white54,
        selectedFontSize: 11,
        unselectedFontSize: 10,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.radar), label: 'الرادار والطلب'),
          BottomNavigationBarItem(icon: Icon(Icons.account_balance_wallet), label: 'المحفظة والسداد'),
          BottomNavigationBarItem(icon: Icon(Icons.emoji_events), label: 'التارجت والبونص'),
          BottomNavigationBarItem(icon: Icon(Icons.support_agent), label: 'الدعم والشكاوى'),
        ],
      ),
    );
  }

  Widget _buildCurrentTab(BuildContext context) {
    switch (_currentIndex) {
      case 0:
        return _buildRadarTab();
      case 1:
        return _buildWalletTab(context);
      case 2:
        return _buildQuestsTab();
      case 3:
        return _buildSupportTab();
      default:
        return _buildRadarTab();
    }
  }

  // 1. Radar & Bidding
  Widget _buildRadarTab() {
    return Column(
      children: [
        // Map Area
        Expanded(
          flex: 3,
          child: Container(
            color: const Color(0xFF0B132B),
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: const Color(0xFF10B981).withValues(alpha: 0.2),
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(Icons.navigation, color: Color(0xFF10B981), size: 36),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    _isOnline ? 'الرادار يبحث عن طلبات قريبة في وسط البلد...' : 'أنت في وضع غير متصل',
                    style: const TextStyle(fontSize: 12, color: Colors.white70),
                  ),
                ],
              ),
            ),
          ),
        ),

        // Incoming Bid Overlay / Actions
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
                children: [
                  if (!_hasIncomingBid) ...[
                    const SizedBox(height: 20),
                    const Text('لا توجد طلبات جارية حالياً', style: TextStyle(color: Colors.white54, fontSize: 13)),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: () => setState(() => _hasIncomingBid = true),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFEA580C),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                      ),
                      child: const Text('محاكاة: استقبال طلب مزايدة جديد 🔔', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                    ),
                  ] else ...[
                    // Incoming Bid Card
                    Container(
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: const Color(0xFF020617),
                        border: Border.all(color: const Color(0xFFEA580C), width: 2),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: const Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text('🤝 طلب مزايدة جديد!', style: TextStyle(color: Color(0xFFEA580C), fontWeight: FontWeight.bold, fontSize: 13)),
                              Text('يبعد 1.2 كم (3 د)', style: TextStyle(color: Colors.white54, fontSize: 11)),
                            ],
                          ),
                          SizedBox(height: 8),
                          Text('📍 ميدان التحرير ➡️ 🏁 سيتي ستارز (12.5 كم)', style: TextStyle(fontSize: 12, color: Colors.white)),
                          SizedBox(height: 8),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text('سعر الزبون المقترح:', style: TextStyle(color: Colors.white54, fontSize: 12)),
                              Text('75.00 ج.م', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Colors.white)),
                            ],
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 14),
                    // Quick Counter Bid Buttons
                    Row(
                      children: [
                        Expanded(
                          child: ElevatedButton(
                            onPressed: () => setState(() => _hasIncomingBid = false),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF10B981),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                            ),
                            child: const Text('75 ج (قبول)', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
                          ),
                        ),
                        const SizedBox(width: 6),
                        Expanded(
                          child: ElevatedButton(
                            onPressed: () => setState(() => _hasIncomingBid = false),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF1E293B),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                            ),
                            child: const Text('+5 ج', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
                          ),
                        ),
                        const SizedBox(width: 6),
                        Expanded(
                          child: ElevatedButton(
                            onPressed: () => setState(() => _hasIncomingBid = false),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF1E293B),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                            ),
                            child: const Text('+10 ج', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
                          ),
                        ),
                        const SizedBox(width: 6),
                        Expanded(
                          child: ElevatedButton(
                            onPressed: () => setState(() => _hasIncomingBid = false),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFFEA580C),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                            ),
                            child: const Text('+15 ج', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
                          ),
                        ),
                      ],
                    ),
                  ],
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  // 2. Wallet & Settlement
  Widget _buildWalletTab(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: const LinearGradient(colors: [Color(0xFF0F172A), Color(0xFF1E293B)]),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0xFF334155)),
            ),
            child: Column(
              children: [
                const Text('الرصيد المتاح في المحفظة', style: TextStyle(color: Colors.white54, fontSize: 12)),
                const SizedBox(height: 4),
                Text('$_walletBalance ج.م', style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w900, color: Color(0xFF10B981))),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () {
                          setState(() => _walletBalance += 100);
                          ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('تم شحن المحفظة بنجاح عبر إنستاباي 🟢')));
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF10B981),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        ),
                        child: const Text('شحن / سداد عمولة', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () {
                          ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('تم إرسال طلب سحب 100 ج.م إلى محفظتك 💸')));
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF334155),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        ),
                        child: const Text('سحب أرباحك', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          Expanded(
            child: ListView(
              children: [
                _buildLedgerTile('مشوار إلى سيتي ستارز (#ALT-8821)', 'أجرة 75 ج • عمولة -7.5 ج', '+67.50 ج.م', true),
                _buildLedgerTile('مشوار إلى التجمع الخامس (#ALT-8818)', 'أجرة 140 ج • عمولة -14 ج', '+126.00 ج.م', true),
                _buildLedgerTile('شحن محفظة - إنستاباي', 'إيداع رصيد فوري', '+100.00 ج.م', false),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLedgerTile(String title, String subtitle, String amount, bool isTrip) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFF1E293B)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
              Text(subtitle, style: const TextStyle(fontSize: 10, color: Colors.white54)),
            ],
          ),
          Text(amount, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF10B981))),
        ],
      ),
    );
  }

  // 3. Quests & Incentives
  Widget _buildQuestsTab() {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('🏆 مكافآت وتارجت الكابتن اليومي', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(height: 4),
          const Text('حقق التارجت واحصل على مبالغ إضافية معفية من العمولات!', style: TextStyle(fontSize: 11, color: Colors.white54)),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: const Color(0xFF0F172A),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFEA580C).withValues(alpha: 0.4)),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('تارجت ساعات الذروة المسائية 🌙', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.white)),
                SizedBox(height: 4),
                Text('أنجز 6 مشاوير بين 5:00 م و 9:00 م (التقدم: 4 من 6)', style: TextStyle(fontSize: 11, color: Colors.white70)),
                SizedBox(height: 8),
                Text('+60.00 ج.م بونص نقدي فوري', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFFEA580C))),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // 4. Support & Disputes
  Widget _buildSupportTab() {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('🎧 مركز الشكاوى والمساعدة', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(height: 4),
          const Text('فريق العمليات متواجد 24/7 لتعويضك وحل أي مشكلة', style: TextStyle(fontSize: 11, color: Colors.white54)),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: const Color(0xFF0F172A),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFF334155)),
            ),
            child: const Column(
              children: [
                ListTile(
                  leading: Icon(Icons.money_off, color: Colors.redAccent),
                  title: Text('الراكب لم يدفع الأجرة كاش', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                  subtitle: Text('طلب تعويض فوري في المحفظة', style: TextStyle(fontSize: 10, color: Colors.white54)),
                  trailing: Icon(Icons.chevron_left, color: Colors.white38),
                ),
                Divider(color: Color(0xFF1E293B)),
                ListTile(
                  leading: Icon(Icons.toll, color: Colors.amber),
                  title: Text('استرداد رسوم كارتة وبوابات', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                  subtitle: Text('إرفاق صورة الإيصال واسترداد القيمة', style: TextStyle(fontSize: 10, color: Colors.white54)),
                  trailing: Icon(Icons.chevron_left, color: Colors.white38),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
