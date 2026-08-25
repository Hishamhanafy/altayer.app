import 'package:flutter/material.dart';
import '../../theme/driver_theme.dart';
import 'driver_vehicle_details_screen.dart';
import 'driver_documents_list_screen.dart';
import 'driver_payout_settings_screen.dart';
import '../kyc/driver_kyc_dashboard_screen.dart';
import '../auth/driver_login_phone_screen.dart';

class DriverProfileScreen extends StatelessWidget {
  const DriverProfileScreen({super.key});

  void _showWorkPreferencesModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: DriverColors.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        bool acceptIntercity = true;
        bool acceptEconomy = true;
        bool acceptComfort = true;

        return StatefulBuilder(
          builder: (context, setModalState) {
            return Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('⚙️ تفضيلات استقبال الرحلات', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
                  const SizedBox(height: 4),
                  const Text('حدد أنواع المشاوير التي تود أن تظهر لك على الرادار.', style: TextStyle(fontSize: 11, color: DriverColors.textMuted)),
                  const SizedBox(height: 16),
                  SwitchListTile(
                    title: const Text('مشاوير عالطاير توفير', style: TextStyle(fontSize: 12, color: Colors.white)),
                    subtitle: const Text('مشاوير يومية سريعة بداخل المدينة', style: TextStyle(fontSize: 10, color: DriverColors.textMuted)),
                    value: acceptEconomy,
                    activeColor: DriverColors.primary,
                    onChanged: (val) => setModalState(() => acceptEconomy = val),
                  ),
                  SwitchListTile(
                    title: const Text('مشاوير عالطاير راحة (Comfort)', style: TextStyle(fontSize: 12, color: Colors.white)),
                    subtitle: const Text('أجرة أعلى لسيارات السيدان المكيفة', style: TextStyle(fontSize: 10, color: DriverColors.textMuted)),
                    value: acceptComfort,
                    activeColor: DriverColors.primary,
                    onChanged: (val) => setModalState(() => acceptComfort = val),
                  ),
                  SwitchListTile(
                    title: const Text('مشاوير السفر بين المحافظات (Intercity)', style: TextStyle(fontSize: 12, color: Colors.white)),
                    subtitle: const Text('رحلات الساحل والإسكندرية والسخنة', style: TextStyle(fontSize: 10, color: DriverColors.textMuted)),
                    value: acceptIntercity,
                    activeColor: DriverColors.primary,
                    onChanged: (val) => setModalState(() => acceptIntercity = val),
                  ),
                  const SizedBox(height: 16),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.pop(ctx);
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('تم تحديث تفضيلات العمل بنجاح 🟢')),
                        );
                      },
                      child: const Text('حفظ التفضيلات'),
                    ),
                  ),
                ],
              ),
            );
          },
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
          // Captain Card Header
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
              boxShadow: const [BoxShadow(color: Colors.black38, blurRadius: 15)],
            ),
            child: Column(
              children: [
                Row(
                  children: [
                    // Avatar & Tier Badge
                    Stack(
                      alignment: Alignment.bottomRight,
                      children: [
                        Container(
                          width: 60,
                          height: 60,
                          decoration: BoxDecoration(
                            color: DriverColors.surfaceLight,
                            shape: BoxShape.circle,
                            border: Border.all(color: DriverColors.primary, width: 2),
                          ),
                          child: const Center(child: Text('👨🏻‍✈️', style: TextStyle(fontSize: 32))),
                        ),
                        Container(
                          padding: const EdgeInsets.all(4),
                          decoration: const BoxDecoration(color: DriverColors.accentAmber, shape: BoxShape.circle),
                          child: const Icon(Icons.star, size: 12, color: Colors.white),
                        ),
                      ],
                    ),
                    const SizedBox(width: 14),
                    // Name & Stats
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              const Text('محمود السيد', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Colors.white)),
                              const SizedBox(width: 6),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(
                                  color: DriverColors.primary.withValues(alpha: 0.2),
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: const Text('كابتن ذهبي 🥇', style: TextStyle(fontSize: 9, color: DriverColors.primary, fontWeight: FontWeight.bold)),
                              ),
                            ],
                          ),
                          const SizedBox(height: 2),
                          const Text('01012345678 • كود: #CPT-491', style: TextStyle(fontSize: 11, color: DriverColors.textMuted)),
                          const SizedBox(height: 4),
                          Row(
                            children: const [
                              Icon(Icons.star, color: DriverColors.accentAmber, size: 14),
                              SizedBox(width: 3),
                              Text('4.94 ⭐ (1,240 رحلة)', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const Divider(color: DriverColors.border, height: 24),
                // Performance KPIs Row
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _buildKpiItem('نسبة القبول', '96%', DriverColors.primary),
                    Container(height: 24, width: 1, color: DriverColors.border),
                    _buildKpiItem('نسبة الإلغاء', '1.2%', DriverColors.accentGreen),
                    Container(height: 24, width: 1, color: DriverColors.border),
                    _buildKpiItem('الالتزام بالموعد', '99%', DriverColors.accentBlue),
                  ],
                ),
              ],
            ),
          ),

          const SizedBox(height: 18),

          const Text('إدارة الحساب والخدمات:', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.textSecondary)),
          const SizedBox(height: 10),

          // Menu Tiles
          _buildMenuTile(
            context,
            icon: Icons.directions_car,
            color: DriverColors.primary,
            title: 'بيانات وفحص المركبة',
            subtitle: 'تويوتا كورولا 2022 • لوحة: أ ب ج 1234',
            onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const DriverVehicleDetailsScreen())),
          ),

          _buildMenuTile(
            context,
            icon: Icons.verified_user,
            color: DriverColors.accentGreen,
            title: 'محفظة الوثائق والرخص الرسمية',
            subtitle: 'عرض تواريخ انتهاء الرخص وبطاقة الرقم القومي',
            onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const DriverDocumentsListScreen())),
          ),

          _buildMenuTile(
            context,
            icon: Icons.camera_alt,
            color: DriverColors.accentAmber,
            title: 'مركز التوثيق الذاتي (KYC)',
            subtitle: 'إعادة تصوير أو تحديث أي وثيقة بكاميرا الهاتف',
            onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const DriverKycDashboardScreen())),
          ),

          _buildMenuTile(
            context,
            icon: Icons.account_balance_wallet,
            color: DriverColors.accentBlue,
            title: 'إعدادات استلام الأرباح (إنستاباي / البنك)',
            subtitle: 'mahmoud.elsayed@instapay',
            onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const DriverPayoutSettingsScreen())),
          ),

          _buildMenuTile(
            context,
            icon: Icons.tune,
            color: DriverColors.accentOrange,
            title: 'تفضيلات العمل ونطاق المشاوير',
            subtitle: 'تفعيل رحلات السفر وفئات السيارات',
            onTap: () => _showWorkPreferencesModal(context),
          ),

          const SizedBox(height: 14),

          // Logout Button
          Container(
            decoration: BoxDecoration(
              color: DriverColors.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: DriverColors.accentRed.withValues(alpha: 0.3)),
            ),
            child: ListTile(
              leading: const Icon(Icons.logout, color: DriverColors.accentRed),
              title: const Text('تسجيل الخروج من الحساب', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.accentRed)),
              trailing: const Icon(Icons.chevron_left, color: DriverColors.accentRed, size: 18),
              onTap: () {
                Navigator.pushAndRemoveUntil(
                  context,
                  MaterialPageRoute(builder: (_) => const DriverLoginPhoneScreen()),
                  (route) => false,
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildKpiItem(String title, String value, Color color) {
    return Column(
      children: [
        Text(value, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900, color: color)),
        const SizedBox(height: 2),
        Text(title, style: const TextStyle(fontSize: 10, color: DriverColors.textMuted)),
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
        color: DriverColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: DriverColors.border.withValues(alpha: 0.5)),
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
        subtitle: Text(subtitle, style: const TextStyle(fontSize: 10, color: DriverColors.textMuted)),
        trailing: const Icon(Icons.chevron_left, color: DriverColors.textMuted, size: 18),
      ),
    );
  }
}
