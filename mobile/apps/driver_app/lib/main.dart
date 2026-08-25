import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'theme/driver_theme.dart';
import 'screens/driver_radar_screen.dart';
import 'screens/driver_wallet_hub_screen.dart';
import 'screens/driver_quests_screen.dart';
import 'screens/driver_disputes_screen.dart';

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

  final List<Widget> _screens = const [
    DriverRadarScreen(),
    DriverWalletHubScreen(),
    DriverQuestsScreen(),
    DriverDisputesScreen(),
  ];

  final List<String> _titles = const [
    'كابتن محمود السيد (تويوتا كورولا)',
    'المحفظة وسداد العمولات',
    'تارجت ومكافآت الكابتن اليومي',
    'مركز دعم وحماية الكباتن',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: DriverColors.background,
      appBar: AppBar(
        title: Text(
          _titles[_currentIndex],
          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
        ),
        actions: [
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: DriverColors.primary.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: DriverColors.primary.withValues(alpha: 0.4)),
            ),
            child: const Row(
              children: [
                Icon(Icons.star, color: DriverColors.accentAmber, size: 14),
                SizedBox(width: 4),
                Text('4.94 ⭐', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: DriverColors.primary)),
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
        backgroundColor: DriverColors.surface,
        selectedItemColor: DriverColors.primary,
        unselectedItemColor: DriverColors.textMuted,
        selectedFontSize: 11,
        unselectedFontSize: 10,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.radar), label: 'الرادار والطلب'),
          BottomNavigationBarItem(icon: Icon(Icons.account_balance_wallet_outlined), label: 'المحفظة والسداد'),
          BottomNavigationBarItem(icon: Icon(Icons.emoji_events_outlined), label: 'التارجت والبونص'),
          BottomNavigationBarItem(icon: Icon(Icons.support_agent), label: 'الدعم والشكاوى'),
        ],
      ),
    );
  }
}
