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

  final List<AkhilIncentiveProgram> _akhilIncentives = const [
    AkhilIncentiveProgram(code: 'FIRST', title: 'AKHIL FIRST', slogan: 'تجربة تستحق', description: 'أولوية قصوى وضمان جودة الخدمة لرحلتك الأولى', icon: '🌟'),
    AkhilIncentiveProgram(code: 'WELCOME', title: 'AKHIL WELCOME', slogan: 'رصيد ترحيبي 200 جنيه', description: 'رصيد مجاني يضاف لمحفظتك يخصم منه في رحلاتك الأولى', icon: '🎁'),
    AkhilIncentiveProgram(code: 'SHARE', title: 'AKHIL SHARE', slogan: 'دعوة صديق وربح مشترك', description: 'اكسب 200 نقطة ولاء ورصيد 50 ج عند تسجيل صديقك', icon: '👥'),
    AkhilIncentiveProgram(code: 'CASH_UP', title: 'AKHIL CASH UP', slogan: 'رحلة مجانية شهرياً', description: 'رحلة مجانية حتى 100 ج شهرياً عند إتمام 15 مشواراً', icon: '🚗'),
    AkhilIncentiveProgram(code: 'YOUR_PRICE', title: 'AKHIL YOUR PRICE', slogan: 'روتينك بسعرك', description: 'ثبت سعر مشوار عملك اليومي بدون أي زيادات في الذروة', icon: '💰'),
    AkhilIncentiveProgram(code: 'SPECIAL', title: 'AKHIL SPECIAL', slogan: 'هدية يومك الخاص', description: 'مشوار مجاني ومفاجآت في عيد ميلادك ومناسباتك', icon: '🎉'),
    AkhilIncentiveProgram(code: 'CREDIT', title: 'AKHIL CREDIT', slogan: 'رحلتك وادفع بعدين', description: 'دفع مؤجل ونطاق ائتماني خاص للعملاء المؤهلين', icon: '💳', isCredit: true),
    AkhilIncentiveProgram(code: 'WIN', title: 'AKHIL WIN', slogan: 'أرباحك مستمرة', description: 'جوائز وسحوبات أسبوعية على رحلات وهدايا عينية', icon: '🏆'),
  ];

  final List<RewardVoucherItem> _rewards = [
    RewardVoucherItem(
      id: 'R-1',
      title: 'خصم 25 ج.م على مشوارك القادم',
      description: 'ينطبق على أي مشوار في القاهرة أو الإسكندرية',
      pointsCost: 1000,
      discountEgp: 25,
      icon: '🎟️',
    ),
    RewardVoucherItem(
      id: 'R-2',
      title: 'خصم 60 ج.م على مشاوير Plus و Business',
      description: 'ينطبق على رحلات فئات أخيل المميزة والفارهة',
      pointsCost: 2000,
      discountEgp: 60,
      icon: '🚘',
    ),
    RewardVoucherItem(
      id: 'R-3',
      title: 'مشوار مجاني بالكامل (حتى 100 ج.م)',
      description: 'رحلة مجانية كاملة لأي وجهة تختارها عبر أخيل',
      pointsCost: 3000,
      discountEgp: 100,
      icon: '🌟',
    ),
  ];

  final List<PointsHistoryItem> _history = const [
    PointsHistoryItem(id: 'H-1', title: 'مشوار Economy إلى سيتي ستارز', date: 'اليوم، 04:30 م', points: 30, isPositive: true),
    PointsHistoryItem(id: 'H-2', title: 'تقييم رحلة كابتن أخيل (5 نجوم)', date: 'أمس، 02:00 م', points: 10, isPositive: true),
    PointsHistoryItem(id: 'H-3', title: 'بونص ترحيبي AKHIL WELCOME', date: 'منذ يومين', points: 100, isPositive: true),
    PointsHistoryItem(id: 'H-4', title: 'دعوة صديق جديد AKHIL SHARE', date: 'منذ أسبوع', points: 200, isPositive: true),
  ];

  void _redeemReward(RewardVoucherItem reward) {
    if (_pointsBalance >= reward.pointsCost) {
      setState(() {
        _pointsBalance -= reward.pointsCost;
        reward.isRedeemed = true;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('🎉 تم استبدال ${reward.pointsCost} نقطة بنجاح! كود الخصم (${reward.discountEgp} ج) مفعل في مشوارك القادم'),
          backgroundColor: AppColors.accentGreen,
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('رصيدك ($_pointsBalance نقطة) غير كافٍ. تحتاج ${reward.pointsCost - _pointsBalance} نقطة إضافية.'),
          backgroundColor: AppColors.primary,
        ),
      );
    }
  }

  void _showIncentiveDetails(AkhilIncentiveProgram inc) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (ctx) => Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Text(inc.icon, style: const TextStyle(fontSize: 28)),
                const SizedBox(width: 10),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(inc.title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Colors.white)),
                    Text(inc.slogan, style: const TextStyle(fontSize: 12, color: Color(0xFFFBBF24), fontWeight: FontWeight.bold)),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 14),
            Text(inc.description, style: const TextStyle(fontSize: 12, color: AppColors.textSecondary, height: 1.5)),
            const SizedBox(height: 18),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.surfaceLight,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.border),
              ),
              child: const Row(
                children: [
                  Icon(Icons.check_circle_outline, color: AppColors.accentGreen, size: 18),
                  SizedBox(width: 8),
                  Expanded(
                    child: Text('البرنامج مفعل ومتاح في حسابك وفق الشروط والأحكام المعتمدة.', style: TextStyle(fontSize: 11, color: Colors.white)),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () => Navigator.pop(ctx),
                child: const Text('حسناً، فهمت'),
              ),
            ),
          ],
        ),
      ),
    );
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
                colors: [Color(0xFF0F172A), Color(0xFF1E1B4B)],
                begin: Alignment.topRight,
                end: Alignment.bottomLeft,
              ),
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: const Color(0xFFF59E0B).withValues(alpha: 0.5)),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFFF59E0B).withValues(alpha: 0.15),
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
                        const Text('مستوى عميل أخيل الحالي', style: TextStyle(fontSize: 11, color: AppColors.textMuted)),
                        const SizedBox(height: 2),
                        const Text('عميل أخيل فضي 🥈', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w900, color: Colors.white)),
                        const SizedBox(height: 4),
                        Text('متبقي ${nextTierTarget - _pointsBalance} نقطة للوصول للمستوى الذهبي 🥇', style: const TextStyle(fontSize: 10, color: Color(0xFFFBBF24))),
                      ],
                    ),
                    // Points Circle
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      decoration: BoxDecoration(
                        color: const Color(0xFFF59E0B).withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFFF59E0B)),
                      ),
                      child: Column(
                        children: [
                          Text('$_pointsBalance', style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: Color(0xFFFBBF24))),
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
                    valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFFF59E0B)),
                    minHeight: 6,
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 20),

          // AKHIL 8 Incentives Hub
          const Text(
            '🌟 برامج وحوافز أخيل الثمانية (AKHIL Incentives):',
            style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.textSecondary),
          ),
          const SizedBox(height: 10),

          SizedBox(
            height: 110,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: _akhilIncentives.length,
              itemBuilder: (ctx, i) {
                final inc = _akhilIncentives[i];
                return GestureDetector(
                  onTap: () => _showIncentiveDetails(inc),
                  child: Container(
                    width: 150,
                    margin: const EdgeInsets.only(left: 10),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppColors.surface,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: inc.isCredit ? AppColors.primary : AppColors.border),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(inc.icon, style: const TextStyle(fontSize: 20)),
                            const Icon(Icons.info_outline, size: 14, color: AppColors.textMuted),
                          ],
                        ),
                        const Spacer(),
                        Text(inc.title, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w900, color: Colors.white), maxLines: 1),
                        Text(inc.slogan, style: const TextStyle(fontSize: 9, color: Color(0xFFFBBF24)), maxLines: 1),
                      ],
                    ),
                  ),
                );
              },
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
                        Text('${reward.pointsCost} نقطة', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w900, color: Color(0xFFFBBF24))),
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
