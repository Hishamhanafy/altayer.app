import 'package:flutter/material.dart';
import '../theme/driver_theme.dart';
import '../models/driver_models.dart';

class DriverQuestsScreen extends StatelessWidget {
  const DriverQuestsScreen({super.key});

  final List<QuestCampaign> _quests = const [
    QuestCampaign(
      id: 'Q-1',
      title: 'تارجت ساعات الذروة المسائية 🌙',
      description: 'أنجز 6 مشاوير بين الساعة 5:00 م و 9:00 م',
      currentTrips: 4,
      targetTrips: 6,
      bonusAmount: 60.0,
      validUntil: 'اليوم، 9:00 م',
    ),
    QuestCampaign(
      id: 'Q-2',
      title: 'تحدي عطلة نهاية الأسبوع 🚀',
      description: 'أنجز 20 مشواراً خلال يومي الجمعة والسبت',
      currentTrips: 13,
      targetTrips: 20,
      bonusAmount: 250.0,
      validUntil: 'غداً، منتصف الليل',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: DriverColors.background,
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Header Hero Banner
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFFEA580C), Color(0xFFC2410C)],
                begin: Alignment.topRight,
                end: Alignment.bottomLeft,
              ),
              borderRadius: BorderRadius.circular(22),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('🏆 مكافآت وبونص الكابتن', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Colors.white)),
                SizedBox(height: 4),
                Text('حقق التارجت واحصل على مبالغ نقدية إضافية معفية من العمولات تماماً!', style: TextStyle(fontSize: 11, color: Colors.white70)),
              ],
            ),
          ),

          const SizedBox(height: 18),

          const Text(
            'التحديات المتاحة لك اليوم:',
            style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.textSecondary),
          ),
          const SizedBox(height: 10),

          // Quest Cards
          ..._quests.map((q) {
            final double progress = q.currentTrips / q.targetTrips;
            return Container(
              margin: const EdgeInsets.only(bottom: 12),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: DriverColors.surface,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: DriverColors.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(q.title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
                      Text('+${q.bonusAmount.toInt()} ج.م بونص', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w900, color: DriverColors.accentOrange)),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(q.description, style: const TextStyle(fontSize: 11, color: DriverColors.textMuted)),
                  const SizedBox(height: 10),
                  // Progress Bar
                  ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: LinearProgressIndicator(
                      value: progress,
                      backgroundColor: DriverColors.surfaceLight,
                      valueColor: const AlwaysStoppedAnimation<Color>(DriverColors.primary),
                      minHeight: 6,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('التقدم: ${q.currentTrips} من ${q.targetTrips} مشاوير', style: const TextStyle(fontSize: 10, color: DriverColors.primary)),
                      Text('ينتهي: ${q.validUntil}', style: const TextStyle(fontSize: 10, color: DriverColors.textMuted)),
                    ],
                  ),
                ],
              ),
            );
          }),
        ],
      ),
    );
  }
}
