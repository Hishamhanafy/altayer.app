import 'package:flutter/material.dart';
import '../theme/driver_theme.dart';
import '../models/driver_models.dart';

class DriverQuestsScreen extends StatefulWidget {
  const DriverQuestsScreen({super.key});

  @override
  State<DriverQuestsScreen> createState() => _DriverQuestsScreenState();
}

class _DriverQuestsScreenState extends State<DriverQuestsScreen> {
  final List<AkhilDriverIncentive> _incentives = const [
    AkhilDriverIncentive(code: 'READY', title: 'AKHIL READY', description: 'رصيد تشغيلي مقدّم في محفظتك لبدء استقبال الرحلات فوراً دون تعطيل.', reward: 'رصيدك مقدّم', icon: '💳'),
    AkhilDriverIncentive(code: 'FLEX_RATE', title: 'AKHIL FLEX RATE', description: 'عمولة مخفضة وحافز الشهر الأول لتشجيع الكباتن الجدد والنشطين.', reward: 'عمولة مرنة متناقصة', icon: '📉'),
    AkhilDriverIncentive(code: 'FREE_MOBILE', title: 'AKHIL FREE MOBILE', description: 'هاتف ذكي هدية مجاناً عند تحقيق تارجت الرحلات السنوي المعتمد.', reward: 'موبايل حديث هدية', icon: '📱'),
    AkhilDriverIncentive(code: 'WEEKLY_FLOW', title: 'AKHIL WEEKLY FLOW', description: 'مكافآت وتدفق أرباح أسبوعية إضافية معفاة من العمولات.', reward: 'أرباح أسبوعية منتظمة', icon: '💵'),
    AkhilDriverIncentive(code: 'FREE_CAR', title: 'FREE CAR (جائزة الفئة الملكية)', description: 'سيارة جديدة مجاناً سنوياً لأفضل كابتن على مستوى الجمهورية (ROYAL AKHIL).', reward: 'سيارة زيرو 👑', icon: '🚗'),
    AkhilDriverIncentive(code: 'LINK', title: 'AKHIL LINK', description: 'مكافأة نقدية فورية عند دعوة كابتن جديد ويبدأ رحلاته بنجاح.', reward: '300 ج / كابتن', icon: '👥'),
    AkhilDriverIncentive(code: 'SERVICES', title: 'AKHIL SERVICES', description: 'خصومات خاصة على الصيانة، تغيير الزيوت، وقطع الغيار والتأمين.', reward: 'تخفيضات صيانة 25%', icon: '🔧'),
    AkhilDriverIncentive(code: 'FAMILY', title: 'AKHIL FAMILY', description: 'مكافآت ومنح تعليمية ورعاية اجتماعية لعائلة وأبناء الكباتن المتميزين.', reward: 'هدية عائلتك', icon: '👨‍👩‍👧'),
    AkhilDriverIncentive(code: 'SUPPORT', title: 'برامج الدعم والحماية', description: 'تغطية تأمينية ودعم طبي وقانوني أثناء فترات العمل على مدار الساعة.', reward: 'حماية شاملة', icon: '🛡️'),
  ];

  void _showIncentiveModal(AkhilDriverIncentive inc) {
    showModalBottomSheet(
      context: context,
      backgroundColor: DriverColors.surface,
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
                    Text(inc.title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900, color: Colors.white)),
                    Text(inc.reward, style: const TextStyle(fontSize: 12, color: DriverColors.accentAmber, fontWeight: FontWeight.bold)),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 14),
            Text(inc.description, style: const TextStyle(fontSize: 12, color: DriverColors.textSecondary, height: 1.5)),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: DriverColors.surfaceLight,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: DriverColors.border),
              ),
              child: const Row(
                children: [
                  Icon(Icons.verified, color: DriverColors.primary, size: 18),
                  SizedBox(width: 8),
                  Expanded(
                    child: Text('البرنامج مفعل ومتاح في لوحة تحكم حسابك وفق الشروط التشغيلية.', style: TextStyle(fontSize: 11, color: Colors.white)),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 18),
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
    return Scaffold(
      backgroundColor: DriverColors.background,
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Banner Header
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
              boxShadow: const [BoxShadow(color: Colors.black45, blurRadius: 15)],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  children: [
                    Text('🏆', style: TextStyle(fontSize: 26)),
                    SizedBox(width: 10),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('مركز حوافز الكابتن — أخيل طريق للأفضل', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900, color: Colors.white)),
                        Text('برامج دعم وحوافز حقيقية مصممة لزيادة دخلك واستقرارك', style: TextStyle(fontSize: 10, color: Color(0xFFFBBF24))),
                      ],
                    ),
                  ],
                ),
                const Divider(color: DriverColors.border, height: 24),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: const [
                    Text('المستوى التشغيلي الحالي:', style: TextStyle(fontSize: 11, color: DriverColors.textMuted)),
                    Text('قادة أخيل 🥈 (88 / 100 نقطة)', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFFFBBF24))),
                  ],
                ),
              ],
            ),
          ),

          const SizedBox(height: 18),

          const Text(
            'برامج الحوافز والجوائز المتاحة (اضغط للتفاصيل):',
            style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.textSecondary),
          ),
          const SizedBox(height: 10),

          // Grid of Incentives
          ..._incentives.map((inc) {
            final isRoyal = inc.code == 'FREE_CAR';
            return Container(
              margin: const EdgeInsets.only(bottom: 10),
              decoration: BoxDecoration(
                color: isRoyal ? const Color(0xFF1E1B4B) : DriverColors.surface,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: isRoyal ? const Color(0xFFF59E0B) : DriverColors.border.withValues(alpha: 0.6),
                  width: isRoyal ? 1.5 : 1,
                ),
              ),
              child: ListTile(
                onTap: () => _showIncentiveModal(inc),
                leading: Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: isRoyal ? const Color(0xFFF59E0B).withValues(alpha: 0.2) : DriverColors.surfaceLight,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(inc.icon, style: const TextStyle(fontSize: 20)),
                ),
                title: Text(
                  inc.title,
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: isRoyal ? const Color(0xFFFBBF24) : Colors.white,
                  ),
                ),
                subtitle: Text(
                  inc.reward,
                  style: const TextStyle(fontSize: 10, color: DriverColors.textMuted),
                ),
                trailing: const Icon(Icons.chevron_left, color: DriverColors.textMuted, size: 18),
              ),
            );
          }),
        ],
      ),
    );
  }
}
