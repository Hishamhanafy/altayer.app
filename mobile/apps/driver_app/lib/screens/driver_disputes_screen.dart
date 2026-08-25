import 'package:flutter/material.dart';
import '../theme/driver_theme.dart';

class DriverDisputesScreen extends StatelessWidget {
  const DriverDisputesScreen({super.key});

  void _showDisputeModal(BuildContext context, String title) {
    showModalBottomSheet(
      context: context,
      backgroundColor: DriverColors.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text('تقديم شكوى: $title', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
              const SizedBox(height: 12),
              TextField(
                maxLines: 3,
                style: const TextStyle(fontSize: 12, color: Colors.white),
                decoration: InputDecoration(
                  hintText: 'اكتب تفاصيل المشكلة ورقم المشوار...',
                  hintStyle: const TextStyle(color: DriverColors.textMuted, fontSize: 11),
                  filled: true,
                  fillColor: DriverColors.surfaceLight,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.pop(ctx);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('تم فتح تذكرة دعم فوري وجاري تعويضك في المحفظة 🟢')),
                    );
                  },
                  child: const Text('إرسال الشكوى لفريق العمليات'),
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
    return Scaffold(
      backgroundColor: DriverColors.background,
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Support Banner
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: DriverColors.surface,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: DriverColors.border),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text('🎧', style: TextStyle(fontSize: 22)),
                    SizedBox(width: 8),
                    Text('مركز دعم وحماية الكابتن 24/7', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
                  ],
                ),
                SizedBox(height: 4),
                Text('فريق العمليات متواجد على مدار الساعة لحمايتك وتعويض أي مبالغ مستحقة.', style: TextStyle(fontSize: 11, color: DriverColors.textMuted)),
              ],
            ),
          ),

          const SizedBox(height: 18),

          const Text(
            'أنواع الشكاوى السريعة:',
            style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.textSecondary),
          ),
          const SizedBox(height: 10),

          _buildDisputeItem(
            context,
            icon: Icons.money_off,
            color: DriverColors.accentRed,
            title: 'الراكب لم يدفع الأجرة كاش',
            subtitle: 'طلب تعويض فوري في محفظتك الإلكترونية',
          ),
          _buildDisputeItem(
            context,
            icon: Icons.toll,
            color: DriverColors.accentAmber,
            title: 'استرداد رسوم كارتة وبوابات السفر',
            subtitle: 'إرفاق صورة إيصال الكارتة واسترداد القيمة',
          ),
          _buildDisputeItem(
            context,
            icon: Icons.star_half,
            color: DriverColors.accentBlue,
            title: 'مراجعة وتعديل تقييم غير عادل',
            subtitle: 'طلب شطب تقييم سلبي غير مبرر من راكب',
          ),
          _buildDisputeItem(
            context,
            icon: Icons.support_agent,
            color: DriverColors.primary,
            title: 'محادثة مباشرة مع خدمة الكباتن',
            subtitle: 'شات فوري مع ممثل الدعم والعمليات',
          ),
        ],
      ),
    );
  }

  Widget _buildDisputeItem(
    BuildContext context, {
    required IconData icon,
    required Color color,
    required String title,
    required String subtitle,
  }) {
    return InkWell(
      onTap: () => _showDisputeModal(context, title),
      borderRadius: BorderRadius.circular(14),
      child: Container(
        margin: const EdgeInsets.only(bottom: 10),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: DriverColors.surface,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: DriverColors.border.withValues(alpha: 0.5)),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: color.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: color, size: 20),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                  const SizedBox(height: 2),
                  Text(subtitle, style: const TextStyle(fontSize: 10, color: DriverColors.textMuted)),
                ],
              ),
            ),
            const Icon(Icons.chevron_left, color: DriverColors.textMuted, size: 20),
          ],
        ),
      ),
    );
  }
}
