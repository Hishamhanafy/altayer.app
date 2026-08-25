import 'package:flutter/material.dart';
import '../../theme/driver_theme.dart';
import '../kyc/driver_kyc_dashboard_screen.dart';

class DriverDocumentsListScreen extends StatelessWidget {
  const DriverDocumentsListScreen({super.key});

  final List<Map<String, dynamic>> _docs = const [
    {
      'title': 'بطاقة الرقم القومي المصرية',
      'icon': '🪪',
      'expiry': '2030-05-12',
      'status': 'سارية ومعتمدة 🟢',
      'daysLeft': 1360,
    },
    {
      'title': 'رخصة القيادة الخاصة / المهنية',
      'icon': '💳',
      'expiry': '2028-11-20',
      'status': 'سارية ومعتمدة 🟢',
      'daysLeft': 820,
    },
    {
      'title': 'رخصة تسيير السيارة (تويوتا)',
      'icon': '🚗',
      'expiry': '2026-09-30',
      'status': 'سارية ومعتمدة 🟢',
      'daysLeft': 400,
    },
    {
      'title': 'صحيفة الحالة الجنائية (الفيش الجنائي)',
      'icon': '⚖️',
      'expiry': '2026-11-15',
      'status': 'ساري ومطابق 🟢',
      'daysLeft': 80,
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: DriverColors.background,
      appBar: AppBar(
        title: const Text('محفظة الوثائق والرخص المعتمدة 📄'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_forward),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Banner
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: DriverColors.surface,
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: DriverColors.primary.withValues(alpha: 0.4)),
            ),
            child: const Row(
              children: [
                Icon(Icons.verified_user, color: DriverColors.primary, size: 28),
                SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('جميع وثائقك الرسمية موثقة ومطابقة 🟢', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                      Text('نرسل لك تنبيهاً تلقائياً قبل شهر من انتهاء أي رخصة لتجديدها بسهولة.', style: TextStyle(fontSize: 10, color: DriverColors.textMuted)),
                    ],
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 18),

          const Text('الوثائق المسجلة على حسابك:', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.textSecondary)),
          const SizedBox(height: 10),

          ..._docs.map((doc) {
            return Container(
              margin: const EdgeInsets.only(bottom: 10),
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: DriverColors.surface,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: DriverColors.border),
              ),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: DriverColors.surfaceLight,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(doc['icon'], style: const TextStyle(fontSize: 20)),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(doc['title'], style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                        const SizedBox(height: 2),
                        Text('تاريخ الانتهاء: ${doc['expiry']}', style: const TextStyle(fontSize: 10, color: DriverColors.textMuted)),
                        const SizedBox(height: 2),
                        Text(doc['status'], style: const TextStyle(fontSize: 10, color: DriverColors.primary, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ),
                ],
              ),
            );
          }),

          const SizedBox(height: 20),

          // Update Documents / KYC Center link
          SizedBox(
            width: double.infinity,
            height: 48,
            child: ElevatedButton.icon(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const DriverKycDashboardScreen()),
                );
              },
              icon: const Icon(Icons.camera_alt),
              label: const Text('فتح مركز التوثيق (KYC) لتحديث أي وثيقة'),
            ),
          ),
        ],
      ),
    );
  }
}
