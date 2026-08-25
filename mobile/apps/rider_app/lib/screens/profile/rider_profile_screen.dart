import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import 'rider_saved_places_screen.dart';
import '../rewards/rider_rewards_shop_screen.dart';
import '../wallet/rider_payment_methods_screen.dart';
import '../auth/rider_login_phone_screen.dart';

class RiderProfileScreen extends StatelessWidget {
  const RiderProfileScreen({super.key});

  void _showSafetyCenter(BuildContext context) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.surface,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(22)),
        title: const Row(
          children: [
            Text('🛡️', style: TextStyle(fontSize: 22)),
            SizedBox(width: 8),
            Text('مركز الأمان ومشاركة المشاوير', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.accentGreen)),
          ],
        ),
        content: const Text(
          'يمكنك تحديد جهة اتصال الطوارئ لمشاركة خط سير رحلتك مباشرة عبر الواتساب، والاتصال الفوري بشرطة النجدة (122) بضغطة زر.',
          style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
        ),
        actions: [
          ElevatedButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('حسناً، فهمت'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Rider Profile Card Header
          Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF0F172A), Color(0xFF1E293B)],
                begin: Alignment.topRight,
                end: Alignment.bottomLeft,
              ),
              borderRadius: BorderRadius.circular(22),
              border: Border.all(color: AppColors.primary.withValues(alpha: 0.4)),
              boxShadow: const [BoxShadow(color: Colors.black38, blurRadius: 15)],
            ),
            child: Column(
              children: [
                Row(
                  children: [
                    // Avatar
                    Container(
                      width: 60,
                      height: 60,
                      decoration: BoxDecoration(
                        color: AppColors.surfaceLight,
                        shape: BoxShape.circle,
                        border: Border.all(color: AppColors.primary, width: 2),
                      ),
                      child: const Center(child: Text('🧑🏻‍💼', style: TextStyle(fontSize: 32))),
                    ),
                    const SizedBox(width: 14),
                    // Name & Details
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              const Text('عمر الشناوي', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Colors.white)),
                              const SizedBox(width: 6),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(
                                  color: AppColors.accentAmber.withValues(alpha: 0.2),
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: const Text('فضي 🥈', style: TextStyle(fontSize: 9, color: AppColors.accentAmber, fontWeight: FontWeight.bold)),
                              ),
                            ],
                          ),
                          const SizedBox(height: 2),
                          const Text('01098765432 • omar@example.com', style: TextStyle(fontSize: 10, color: AppColors.textMuted)),
                          const SizedBox(height: 4),
                          Row(
                            children: const [
                              Icon(Icons.star, color: AppColors.accentAmber, size: 14),
                              SizedBox(width: 3),
                              Text('4.95 ⭐ (48 مشوار)', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const Divider(color: AppColors.border, height: 24),
                // Quick Summary Row
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _buildSummaryStat('رصيد المحفظة', '120.00 ج', AppColors.primary),
                    Container(height: 24, width: 1, color: AppColors.border),
                    _buildSummaryStat('نقاط الولاء', '140 نقطة ⭐', AppColors.accentAmber),
                    Container(height: 24, width: 1, color: AppColors.border),
                    _buildSummaryStat('كوبونات فعالة', '2 كوبون', AppColors.accentGreen),
                  ],
                ),
              ],
            ),
          ),

          const SizedBox(height: 18),

          const Text('إعدادات وخدمات الحساب:', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.textSecondary)),
          const SizedBox(height: 10),

          _buildMenuTile(
            context,
            icon: Icons.place_outlined,
            color: AppColors.primary,
            title: 'الأماكن المحفوظة والمفضلة',
            subtitle: 'المنزل، العمل، المولات وعناوينك المتكررة',
            onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const RiderSavedPlacesScreen())),
          ),

          _buildMenuTile(
            context,
            icon: Icons.stars,
            color: AppColors.accentAmber,
            title: 'سوق المكافآت ونقاط الولاء',
            subtitle: 'استبدال 140 نقطة بخصومات على الرحلات',
            onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const RiderRewardsShopScreen())),
          ),

          _buildMenuTile(
            context,
            icon: Icons.payment,
            color: AppColors.accentGreen,
            title: 'المحفظة وطرق الدفع والشحن',
            subtitle: 'كاش، فيزا/ميزة، إنستاباي، وفودافون كاش',
            onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const RiderPaymentMethodsScreen())),
          ),

          _buildMenuTile(
            context,
            icon: Icons.security,
            color: AppColors.accentBlue,
            title: 'مركز الأمان ومشاركة المشاوير (SOS)',
            subtitle: 'تحديد جهات اتصال الطوارئ لمشاركة الرحلات',
            onTap: () => _showSafetyCenter(context),
          ),

          const SizedBox(height: 14),

          // Logout Button
          Container(
            decoration: BoxDecoration(
              color: AppColors.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.accentRed.withValues(alpha: 0.3)),
            ),
            child: ListTile(
              leading: const Icon(Icons.logout, color: AppColors.accentRed),
              title: const Text('تسجيل الخروج من الحساب', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.accentRed)),
              trailing: const Icon(Icons.chevron_left, color: AppColors.accentRed, size: 18),
              onTap: () {
                Navigator.pushAndRemoveUntil(
                  context,
                  MaterialPageRoute(builder: (_) => const RiderLoginPhoneScreen()),
                  (route) => false,
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSummaryStat(String title, String value, Color color) {
    return Column(
      children: [
        Text(value, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w900, color: color)),
        const SizedBox(height: 2),
        Text(title, style: const TextStyle(fontSize: 9, color: AppColors.textMuted)),
      ],
    );
  }

  Widget _buildMenuTile(
    BuildContext context, {
    required IconData icon,
    required Color color,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border.withValues(alpha: 0.5)),
      ),
      child: ListTile(
        onTap: onTap,
        leading: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: color.withValues(alpha: 0.15),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(icon, color: color, size: 20),
        ),
        title: Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
        subtitle: Text(subtitle, style: const TextStyle(fontSize: 10, color: AppColors.textMuted)),
        trailing: const Icon(Icons.chevron_left, color: AppColors.textMuted, size: 18),
      ),
    );
  }
}
