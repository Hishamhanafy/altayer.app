import 'package:flutter/material.dart';
import '../theme/driver_theme.dart';
import '../models/driver_models.dart';

class DriverWalletHubScreen extends StatefulWidget {
  const DriverWalletHubScreen({super.key});

  @override
  State<DriverWalletHubScreen> createState() => _DriverWalletHubScreenState();
}

class _DriverWalletHubScreenState extends State<DriverWalletHubScreen> {
  double _balance = 140.0;
  final double _debtLimit = -150.0;

  final List<LedgerItem> _ledgerItems = const [
    LedgerItem(id: 'L-101', title: 'مشوار إلى سيتي ستارز مول (#ALT-8821)', date: 'اليوم، 04:30 م', amount: 75.0, commission: 7.5, isTrip: true),
    LedgerItem(id: 'L-102', title: 'مشوار إلى التجمع الخامس (#ALT-8818)', date: 'اليوم، 02:15 م', amount: 140.0, commission: 14.0, isTrip: true),
    LedgerItem(id: 'L-103', title: 'إيداع رصيد - إنستاباي InstaPay', date: 'أمس، 09:00 م', amount: 100.0, commission: 0.0, isTrip: false),
    LedgerItem(id: 'L-104', title: 'مشوار إلى الشيخ زايد (#ALT-8790)', date: 'أمس، 06:40 م', amount: 190.0, commission: 19.0, isTrip: true),
  ];

  void _showTopUpModal() {
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
              const Row(
                children: [
                  Text('💳', style: TextStyle(fontSize: 22)),
                  SizedBox(width: 8),
                  Text('شحن رصيد المحفظة وسداد العمولات', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
                ],
              ),
              const SizedBox(height: 14),
              // InstaPay option
              Container(
                margin: const EdgeInsets.only(bottom: 8),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: DriverColors.surfaceLight,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: DriverColors.border),
                ),
                child: Row(
                  children: [
                    const Text('⚡', style: TextStyle(fontSize: 20)),
                    const SizedBox(width: 10),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('إنستاباي InstaPay (تحويل لحظي)', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                          Text('عنوان الدفع: altayer@instapay', style: TextStyle(fontSize: 10, color: DriverColors.textMuted)),
                        ],
                      ),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        setState(() => _balance += 100);
                        Navigator.pop(ctx);
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('تم إيداع 100.00 ج.م في محفظتك بنجاح عبر إنستاباي 🟢')),
                        );
                      },
                      style: ElevatedButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6)),
                      child: const Text('شحن 100 ج', style: TextStyle(fontSize: 11)),
                    ),
                  ],
                ),
              ),
              // Vodafone Cash option
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: DriverColors.surfaceLight,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: DriverColors.border),
                ),
                child: Row(
                  children: [
                    const Text('📱', style: TextStyle(fontSize: 20)),
                    const SizedBox(width: 10),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('فودافون كاش / محافظ المحمول', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                          Text('تحويل فوري إلى رقم: 01012345678', style: TextStyle(fontSize: 10, color: DriverColors.textMuted)),
                        ],
                      ),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        setState(() => _balance += 50);
                        Navigator.pop(ctx);
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('تم إيداع 50.00 ج.م في محفظتك بنجاح عبر فودافون كاش 🟢')),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: DriverColors.accentOrange,
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                      ),
                      child: const Text('شحن 50 ج', style: TextStyle(fontSize: 11)),
                    ),
                  ],
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
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Balance & Debt Limit Card
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF0F172A), Color(0xFF1E293B)],
                  begin: Alignment.topRight,
                  end: Alignment.bottomLeft,
                ),
                borderRadius: BorderRadius.circular(22),
                border: Border.all(color: DriverColors.border),
              ),
              child: Column(
                children: [
                  const Text('الرصيد المتاح للتشغيل في المحفظة', style: TextStyle(fontSize: 11, color: DriverColors.textMuted)),
                  const SizedBox(height: 4),
                  Text(
                    '${_balance.toStringAsFixed(2)} ج.م',
                    style: TextStyle(
                      fontSize: 30,
                      fontWeight: FontWeight.w900,
                      color: _balance >= 0 ? DriverColors.primary : DriverColors.accentRed,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'الحد الأقصى للمديونية المسموح بها: ${_debtLimit.toInt()} ج.م',
                    style: const TextStyle(fontSize: 10, color: DriverColors.textMuted),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: _showTopUpModal,
                          icon: const Icon(Icons.add_circle_outline, size: 16),
                          label: const Text('شحن / سداد عمولة', style: TextStyle(fontSize: 11)),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: () {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text('تم إرسال طلب سحب الأرباح لمحفظتك البنكية 💸')),
                            );
                          },
                          icon: const Icon(Icons.download, size: 16),
                          label: const Text('سحب أرباحك', style: TextStyle(fontSize: 11)),
                          style: OutlinedButton.styleFrom(
                            foregroundColor: Colors.white,
                            side: const BorderSide(color: DriverColors.border),
                            padding: const EdgeInsets.symmetric(vertical: 12),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 18),

            const Text(
              'سجل العمليات والرحلات الأخيرة:',
              style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.textSecondary),
            ),
            const SizedBox(height: 10),

            // Ledger List
            ..._ledgerItems.map((item) {
              return Container(
                margin: const EdgeInsets.only(bottom: 8),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: DriverColors.surface,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: DriverColors.border.withValues(alpha: 0.5)),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            item.title,
                            style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(height: 2),
                          Text(
                            item.isTrip ? '${item.date} • عمولة: -${item.commission} ج.م' : item.date,
                            style: const TextStyle(fontSize: 10, color: DriverColors.textMuted),
                          ),
                        ],
                      ),
                    ),
                    Text(
                      item.isTrip ? '+${(item.amount - item.commission).toStringAsFixed(1)} ج' : '+${item.amount.toInt()} ج',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w900,
                        color: item.isTrip ? DriverColors.primary : DriverColors.accentBlue,
                      ),
                    ),
                  ],
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}
