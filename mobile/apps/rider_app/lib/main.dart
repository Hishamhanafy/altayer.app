import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'theme/app_theme.dart';
import 'screens/home_map_screen.dart';
import 'screens/rewards/rider_rewards_shop_screen.dart';
import 'screens/wallet/rider_payment_methods_screen.dart';
import 'screens/profile/rider_profile_screen.dart';
import 'screens/auth/rider_login_phone_screen.dart';

void main() {
  runApp(const AkhilRiderApp());
}

class AkhilRiderApp extends StatelessWidget {
  const AkhilRiderApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'أخيل - عميل',
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
      theme: AppTheme.darkTheme,
      home: const RiderMainHubScreen(),
    );
  }
}

class RiderMainHubScreen extends StatefulWidget {
  const RiderMainHubScreen({super.key});

  @override
  State<RiderMainHubScreen> createState() => _RiderMainHubScreenState();
}

class _RiderMainHubScreenState extends State<RiderMainHubScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    HomeMapScreen(),
    RiderRewardsShopScreen(),
    RiderPaymentMethodsScreen(),
    RiderProfileScreen(),
  ];

  final List<String> _titles = const [
    'أخيل | أبعد من طريق 🐎⚡',
    'حوافز ومكافآت أخيل 🌟',
    'المحفظة وطرق الدفع 💳',
    'الملف الشخصي للعميل 👤',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text(
          _titles[_currentIndex],
          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w900),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.login, size: 20, color: Color(0xFFFBBF24)),
            tooltip: 'شاشة تسجيل الدخول والتسجيل الجديد',
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const RiderLoginPhoneScreen()),
              );
            },
          ),
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: AppColors.surfaceLight,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFF59E0B).withValues(alpha: 0.5)),
            ),
            child: const Row(
              children: [
                Icon(Icons.star, color: Color(0xFFFBBF24), size: 14),
                SizedBox(width: 4),
                Text('340 نقطة ⭐', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFFFBBF24))),
              ],
            ),
          ),
        ],
      ),
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        backgroundColor: AppColors.surface,
        selectedItemColor: const Color(0xFFF59E0B),
        unselectedItemColor: AppColors.textMuted,
        selectedFontSize: 10,
        unselectedFontSize: 9,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.map_outlined), label: 'الرئيسية والرحلات'),
          BottomNavigationBarItem(icon: Icon(Icons.stars_outlined), label: 'حوافز أخيل'),
          BottomNavigationBarItem(icon: Icon(Icons.account_balance_wallet_outlined), label: 'المحفظة والدفع'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline), label: 'حسابي'),
        ],
      ),
    );
  }
}
