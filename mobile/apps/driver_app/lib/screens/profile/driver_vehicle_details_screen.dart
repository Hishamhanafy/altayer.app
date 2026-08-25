import 'package:flutter/material.dart';
import '../../theme/driver_theme.dart';

class DriverVehicleDetailsScreen extends StatelessWidget {
  const DriverVehicleDetailsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: DriverColors.background,
      appBar: AppBar(
        title: const Text('بيانات وفحص المركبة 🚗'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_forward),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Vehicle Card Header
          Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF0F172A), Color(0xFF1E293B)],
                begin: Alignment.topRight,
                end: Alignment.bottomLeft,
              ),
              borderRadius: BorderRadius.circular(22),
              border: Border.all(color: DriverColors.primary.withValues(alpha: 0.4)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Row(
                      children: [
                        Text('🚘', style: TextStyle(fontSize: 28)),
                        SizedBox(width: 10),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('تويوتا كورولا 2022', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w900, color: Colors.white)),
                            Text('فئة: عالطاير توفير / راحة (مكيفة)', style: TextStyle(fontSize: 11, color: DriverColors.primary)),
                          ],
                        ),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: DriverColors.primary.withValues(alpha: 0.2),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: const Text('مفعلة 🟢', style: TextStyle(fontSize: 11, color: DriverColors.primary, fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
                const Divider(color: DriverColors.border, height: 24),
                // Plate Details Display
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('رقم اللوحة المعدنية:', style: TextStyle(fontSize: 12, color: DriverColors.textMuted)),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                      decoration: BoxDecoration(
                        color: DriverColors.surfaceLight,
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: DriverColors.border),
                      ),
                      child: const Text(
                        'أ ب ج  |  1 2 3 4',
                        style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900, letterSpacing: 2, color: Colors.white),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),

          const SizedBox(height: 18),

          const Text('المواصفات والفحص الفني:', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.textSecondary)),
          const SizedBox(height: 10),

          _buildSpecRow('لون السيارة:', 'فضي ميتاليك'),
          _buildSpecRow('سنة الصنع والموديل:', '2022 (سيدان)'),
          _buildSpecRow('نوع الوقود:', 'بنزين 92 + غاز طبيعي فابريكا'),
          _buildSpecRow('حالة الفحص الفني الدوري:', 'معتمد وساري حتى 2026-10-15 🟢'),
          _buildSpecRow('تأمين المركبة:', 'تأمين شامل ساري'),

          const SizedBox(height: 24),

          // Add or Switch Vehicle Button
          SizedBox(
            width: double.infinity,
            height: 48,
            child: OutlinedButton.icon(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('يمكنك إضافة سيارة بديلة وتوثيق رخصتها فوراً 🚗')),
                );
              },
              icon: const Icon(Icons.add_circle_outline),
              label: const Text('إضافة سيارة جديدة أو تبديل المركبة'),
              style: OutlinedButton.styleFrom(
                side: const BorderSide(color: DriverColors.primary),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSpecRow(String label, String value) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: DriverColors.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: DriverColors.border.withValues(alpha: 0.5)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 11, color: DriverColors.textMuted)),
          Text(value, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
        ],
      ),
    );
  }
}
