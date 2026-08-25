import 'package:flutter/material.dart';
import '../../theme/driver_theme.dart';
import 'driver_vehicle_details_screen.dart';
import 'driver_documents_list_screen.dart';
import 'driver_payout_settings_screen.dart';
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
        bool acceptEconomy = true;
        bool acceptPlus = true;
        bool acceptParthona = false;

        return StatefulBuilder(
          builder: (context, setModalState) {
            return Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('⚙️ تفضيلات استقبال رحلات أخيل', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
                  const SizedBox(height: 4),
                  const Text('حدد فئات المشاوير التي تود أن تظهر لك على الرادار.', style: TextStyle(fontSize: 11, color: DriverColors.textMuted)),
                  const SizedBox(height: 16),
                  SwitchListTile(
                    title: const Text('مشاوير أخيل Economy (إيكونومي)', style: TextStyle(fontSize: 12, color: Colors.white)),
                    subtitle: const Text('مشاوير يومية سريعة بداخل المدينة', style: TextStyle(fontSize: 10, color: DriverColors.textMuted)),
                    value: acceptEconomy,
                    activeThumbColor: DriverColors.primary,
                    onChanged: (val) => setModalState(() => acceptEconomy = val),
                  ),
                  SwitchListTile(
                    title: const Text('مشاوير أخيل Plus و Business', style: TextStyle(fontSize: 12, color: Colors.white)),
                    subtitle: const Text('أجرة أعلى لسيارات السيدان المكيفة والفارهة', style: TextStyle(fontSize: 10, color: DriverColors.textMuted)),
                    value: acceptPlus,
                    activeThumbColor: DriverColors.primary,
                    onChanged: (val) => setModalState(() => acceptPlus = val),
                  ),
                  SwitchListTile(
                    title: const Text('خدمة البرثونة (Parthona - نسائي فقط)', style: TextStyle(fontSize: 12, color: Colors.white)),
                    subtitle: const Text('مخصصة للسائقات المعتمدات لتوصيل السيدات', style: TextStyle(fontSize: 10, color: DriverColors.textMuted)),
                    value: acceptParthona,
                    activeThumbColor: const Color(0xFFEC4899),
                    onChanged: (val) => setModalState(() => acceptParthona = val),
                  ),
                  const SizedBox(height: 14),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () => Navigator.pop(ctx),
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
          // Profile Card with Akhil Leaders Tier
          Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF0F172A), Color(0xFF1E1B4B)],
                begin: Alignment.topRight,
                end: Alignment.bottomLeft,
              ),
              borderRadius: BorderRadius.circular(22),
              border: Border.all(color: const Color(0xFFF59E0B).withValues(alpha: 0.5)),
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
                            border: Border.all(color: const Color(0xFFF59E0B), width: 2),
                          ),
                          child: const Center(child: Text('👨🏻‍✈️', style: TextStyle(fontSize: 32))),
                        ),
                        Container(
                          padding: const EdgeInsets.all(4),
                          decoration: const BoxDecoration(color: Color(0xFFF59E0B), shape: BoxShape.circle),
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
                              const Text('محمود السيد', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w900, color: Colors.white)),
                              const SizedBox(width: 6),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFF59E0B).withValues(alpha: 0.2),
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: const Text('قادة أخيل 🥈', style: TextStyle(fontSize: 9, color: Color(0xFFFBBF24), fontWeight: FontWeight.bold)),
                              ),
                            ],
                          ),
                          const SizedBox(height: 2),
                          const Text('01012345678 • كود: #AKHIL-491', style: TextStyle(fontSize: 11, color: DriverColors.textMuted)),
                          const SizedBox(height: 4),
                          Row(
                            children: const [
                              Icon(Icons.star, color: DriverColors.accentAmber, size: 14),
                              SizedBox(width: 3),
                              Text('4.94 ⭐ (88/100 نقطة)', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
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
            icon: Icons.drive_eta,
            title: 'بيانات السيارة المسجلة',
            subtitle: 'تويوتا كورولا 2022 • أ ب ج 1234',
            onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const DriverVehicleDetailsScreen())),
          ),
          _buildMenuTile(
            context,
            icon: Icons.folder_shared,
            title: 'مركز وثائق ورخص الكابتن',
            subtitle: 'البطاقة، رخصة القيادة، الفيش، والتحليل',
            onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const DriverDocumentsListScreen())),
          ),
          _buildMenuTile(
            context,
            icon: Icons.account_balance,
            title: 'إعدادات استلام الأرباح (InstaPay)',
            subtitle: 'حساب بنكي، إنستاباي، فودافون كاش',
            onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const DriverPayoutSettingsScreen())),
          ),
          _buildMenuTile(
            context,
            icon: Icons.tune,
            title: 'تفضيلات ومناطق استقبال الرحلات',
            subtitle: 'تخصيص الفئات والمناطق المفضلة',
            onTap: () => _showWorkPreferencesModal(context),
          ),

          const SizedBox(height: 18),

          // Logout Button
          Container(
            width: double.infinity,
            decoration: BoxDecoration(
              color: DriverColors.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: DriverColors.accentRed.withValues(alpha: 0.3)),
            ),
            child: ListTile(
              leading: const Icon(Icons.logout, color: DriverColors.accentRed, size: 20),
              title: const Text('تسجيل الخروج من الحساب', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.accentRed)),
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

  Widget _buildKpiItem(String label, String value, Color color) {
    return Column(
      children: [
        Text(value, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900, color: color)),
        const SizedBox(height: 2),
        Text(label, style: const TextStyle(fontSize: 10, color: DriverColors.textMuted)),
      ],
    );
  }

  Widget _buildMenuTile(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: DriverColors.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: DriverColors.border.withValues(alpha: 0.5)),
      ),
      child: ListTile(
        onTap: onTap,
        leading: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: DriverColors.surfaceLight,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(icon, color: DriverColors.primary, size: 20),
        ),
        title: Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
        subtitle: Text(subtitle, style: const TextStyle(fontSize: 10, color: DriverColors.textMuted)),
        trailing: const Icon(Icons.chevron_left, color: DriverColors.textMuted, size: 18),
      ),
    );
  }
}
