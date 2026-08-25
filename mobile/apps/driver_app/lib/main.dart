import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'theme/driver_theme.dart';
import 'screens/driver_radar_screen.dart';
import 'screens/driver_quests_screen.dart';
import 'screens/driver_wallet_hub_screen.dart';
import 'screens/kyc/driver_kyc_dashboard_screen.dart';
import 'screens/profile/driver_profile_screen.dart';
import 'screens/auth/driver_login_phone_screen.dart';

void main() {
  runApp(const AkhilDriverApp());
}

class AkhilDriverApp extends StatelessWidget {
  const AkhilDriverApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'أخيل - كابتن',
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
      theme: DriverTheme.darkTheme,
      home: const DriverMainHubScreen(),
    );
  }
}

class DriverMainHubScreen extends StatefulWidget {
  const DriverMainHubScreen({super.key});

  @override
  State<DriverMainHubScreen> createState() => _DriverMainHubScreenState();
}

class _DriverMainHubScreenState extends State<DriverMainHubScreen> {
  int _currentIndex = 0;
  bool _isOnline = true;

  final List<Widget> _screens = const [
    DriverRadarScreen(),
    DriverQuestsScreen(),
    DriverWalletHubScreen(),
    DriverKycDashboardScreen(),
    DriverProfileScreen(),
  ];

  final List<String> _titles = const [
    'أخيل | رادار طلبات الكابتن 📡',
    'حوافز الكابتن (أخيل طريق للأفضل) 🏆',
    'المحفظة وسحب الأرباح 💰',
    'مركز اعتماد الوثائق KYC 🛡️',
    'الملف الشخصي والتقييم 👤',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: DriverColors.background,
      appBar: AppBar(
        title: Text(
          _titles[_currentIndex],
          style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w900),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.login, size: 20, color: Color(0xFFFBBF24)),
            tooltip: 'شاشة تسجيل الدخول والتسجيل الجديد',
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const DriverLoginPhoneScreen()),
              );
            },
          ),
          // Online/Offline Toggle
          GestureDetector(
            onTap: () => setState(() => _isOnline = !_isOnline),
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: _isOnline ? DriverColors.primary.withValues(alpha: 0.2) : DriverColors.surfaceLight,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: _isOnline ? DriverColors.primary : DriverColors.textMuted,
                ),
              ),
              child: Row(
                children: [
                  Container(
                    width: 8,
                    height: 8,
                    decoration: BoxDecoration(
                      color: _isOnline ? DriverColors.primary : DriverColors.textMuted,
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(width: 6),
                  Text(
                    _isOnline ? 'متاح أونلاين 🟢' : 'غير متاح ⚪',
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      color: _isOnline ? DriverColors.primary : DriverColors.textMuted,
                    ),
                  ),
                ],
              ),
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
        backgroundColor: DriverColors.surface,
        selectedItemColor: DriverColors.primary,
        unselectedItemColor: DriverColors.textMuted,
        selectedFontSize: 10,
        unselectedFontSize: 9,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.radar), label: 'الرادار'),
          BottomNavigationBarItem(icon: Icon(Icons.emoji_events_outlined), label: 'حوافز أخيل'),
          BottomNavigationBarItem(icon: Icon(Icons.account_balance_wallet_outlined), label: 'المحفظة'),
          BottomNavigationBarItem(icon: Icon(Icons.verified_user_outlined), label: 'التوثيق KYC'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline), label: 'حسابي'),
        ],
      ),
    );
  }
}
