import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'theme/app_theme.dart';
import 'screens/home_map_screen.dart';
import 'screens/rewards/rider_rewards_shop_screen.dart';
import 'screens/wallet/rider_payment_methods_screen.dart';
import 'screens/profile/rider_profile_screen.dart';
import 'screens/auth/rider_login_phone_screen.dart';

void main() {
  runApp(const AltayerRiderApp());
}

class AltayerRiderApp extends StatelessWidget {
  const AltayerRiderApp({super.key});

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
    'طلب مشوار عالطاير ⚡',
    'سوق المكافآت ونقاط الولاء 🌟',
    'المحفظة وطرق الدفع 💳',
    'الملف الشخصي للراكب 👤',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text(
          _titles[_currentIndex],
          style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.login, size: 20, color: AppColors.primaryLight),
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
              border: Border.all(color: AppColors.accentAmber.withValues(alpha: 0.5)),
            ),
            child: const Row(
              children: [
                Icon(Icons.star, color: AppColors.accentAmber, size: 14),
                SizedBox(width: 4),
                Text('1,400 نقطة ⭐', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.accentAmber)),
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
        selectedItemColor: AppColors.primary,
        unselectedItemColor: AppColors.textMuted,
        selectedFontSize: 10,
        unselectedFontSize: 9,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.map_outlined), label: 'الرئيسية والمشاوير'),
          BottomNavigationBarItem(icon: Icon(Icons.stars_outlined), label: 'المكافآت والنقاط'),
          BottomNavigationBarItem(icon: Icon(Icons.account_balance_wallet_outlined), label: 'المحفظة والدفع'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline), label: 'حسابي'),
        ],
      ),
    );
  }
}
