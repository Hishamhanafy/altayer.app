import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/rider_user_models.dart';

class RiderRewardsShopScreen extends StatefulWidget {
  const RiderRewardsShopScreen({super.key});

  @override
  State<RiderRewardsShopScreen> createState() => _RiderRewardsShopScreenState();
}

class _RiderRewardsShopScreenState extends State<RiderRewardsShopScreen> {
  int _pointsBalance = 340;

  final List<RewardVoucherItem> _rewards = [
    RewardVoucherItem(
      id: 'R-1',
      title: 'خصم 25 ج.م على مشوارك القادم',
      description: 'ينطبق على أي مشوار داخل القاهرة أو الإسكندرية',
      pointsCost: 1000,
      discountEgp: 25,
      icon: '🎟️',
    ),
    RewardVoucherItem(
      id: 'R-2',
      title: 'خصم 60 ج.م على مشاوير الراحة (Comfort)',
      description: 'ينطبق على رحلات فئة عالطاير راحة و VIP',
      pointsCost: 2000,
      discountEgp: 60,
      icon: '🚘',
    ),
    RewardVoucherItem(
      id: 'R-3',
      title: 'مشوار مجاني بالكامل (حتى 100 ج.م)',
      description: 'رحلة مجانية كاملة لأي وجهة تختارها',
      pointsCost: 3000,
      discountEgp: 100,
      icon: '🌟',
    ),
  ];

  final List<PointsHistoryItem> _history = const [
    PointsHistoryItem(id: 'H-1', title: 'مشوار إلى سيتي ستارز مول', date: 'اليوم، 04:30 م', points: 30, isPositive: true),
    PointsHistoryItem(id: 'H-2', title: 'تقييم رحلة الكابتن محمود', date: 'أمس، 02:00 م', points: 10, isPositive: true),
    PointsHistoryItem(id: 'H-3', title: 'بونص ترحيبي عند إنشاء الحساب', date: 'منذ يومين', points: 100, isPositive: true),
    PointsHistoryItem(id: 'H-4', title: 'دعوة صديق جديد (أحمد علي)', date: 'منذ أسبوع', points: 200, isPositive: true),
  ];

  void _redeemReward(RewardVoucherItem reward) {
    if (_pointsBalance >= reward.pointsCost) {
      setState(() {
        _pointsBalance -= reward.pointsCost;
        reward.isRedeemed = true;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('🎉 تم استبدال ${reward.pointsCost} نقطة بنجاح! كود الخصم مفعل في مشوارك القادم (${reward.discountEgp} ج.م)'),
          backgroundColor: AppColors.accentGreen,
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('رصيدك (${_pointsBalance} نقطة) غير كافٍ. تحتاج ${reward.pointsCost - _pointsBalance} نقطة إضافية.'),
          backgroundColor: AppColors.primary,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    const int nextTierTarget = 3000;
    final double tierProgress = _pointsBalance / nextTierTarget;

    return Scaffold(
      backgroundColor: AppColors.background,
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Points Balance & Tier Card
          Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF0F172A), Color(0xFF1E293B)],
                begin: Alignment.topRight,
                end: Alignment.bottomLeft,
              ),
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: AppColors.accentAmber.withValues(alpha: 0.4)),
              boxShadow: [
                BoxShadow(
                  color: AppColors.accentAmber.withValues(alpha: 0.15),
                  blurRadius: 15,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('مستوى الولاء الحالي', style: TextStyle(fontSize: 11, color: AppColors.textMuted)),
                        const SizedBox(height: 2),
                        const Text('راكب فضي 🥈', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w900, color: Colors.white)),
                        const SizedBox(height: 4),
                        Text('متبقي ${nextTierTarget - _pointsBalance} نقطة للوصول للمستوى الذهبي 🥇', style: const TextStyle(fontSize: 10, color: AppColors.accentAmber)),
                      ],
                    ),
                    // Points Circle
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      decoration: BoxDecoration(
                        color: AppColors.accentAmber.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: AppColors.accentAmber),
                      ),
                      child: Column(
                        children: [
                          Text('$_pointsBalance', style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: AppColors.accentAmber)),
                          const Text('نقطة ولاء ⭐', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Colors.white70)),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 14),
                // Tier Progress Bar
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: LinearProgressIndicator(
                    value: tierProgress > 1.0 ? 1.0 : tierProgress,
                    backgroundColor: AppColors.surfaceLight,
                    valueColor: const AlwaysStoppedAnimation<Color>(AppColors.accentAmber),
                    minHeight: 6,
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 20),

          // Rewards Marketplace Title
          const Text(
            'سوق استبدال النقاط بخصومات المشاوير 🛍️:',
            style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.textSecondary),
          ),
          const SizedBox(height: 10),

          // Rewards List
          ..._rewards.map((reward) {
            final bool canRedeem = _pointsBalance >= reward.pointsCost;

            return Container(
              margin: const EdgeInsets.only(bottom: 10),
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: reward.isRedeemed ? AppColors.accentGreen : AppColors.border),
              ),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceLight,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(reward.icon, style: const TextStyle(fontSize: 22)),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(reward.title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                        const SizedBox(height: 2),
                        Text(reward.description, style: const TextStyle(fontSize: 10, color: AppColors.textMuted)),
                        const SizedBox(height: 4),
                        Text('${reward.pointsCost} نقطة', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w900, color: AppColors.accentAmber)),
                      ],
                    ),
                  ),
                  ElevatedButton(
                    onPressed: reward.isRedeemed ? null : () => _redeemReward(reward),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: reward.isRedeemed ? AppColors.accentGreen : canRedeem ? AppColors.primary : AppColors.surfaceLight,
                      foregroundColor: reward.isRedeemed ? Colors.white : canRedeem ? Colors.white : AppColors.textMuted,
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                    child: Text(reward.isRedeemed ? 'مفعل 🟢' : 'استبدال', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            );
          }),

          const SizedBox(height: 18),

          // Points Activity History
          const Text(
            'سجل كسب النقاط الأخير:',
            style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.textSecondary),
          ),
          const SizedBox(height: 10),

          ..._history.map((item) {
            return Container(
              margin: const EdgeInsets.only(bottom: 8),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.border.withValues(alpha: 0.4)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(item.title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                        Text(item.date, style: const TextStyle(fontSize: 10, color: AppColors.textMuted)),
                      ],
                    ),
                  ),
                  Text(
                    '+${item.points} نقطة',
                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w900, color: AppColors.accentGreen),
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
