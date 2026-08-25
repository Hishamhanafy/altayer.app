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
    LedgerItem(id: 'L-101', title: 'مشوار كاش (#ALT-8821) - سيتي ستارز', date: 'اليوم، 04:30 م', amount: 100.0, commission: 10.0, isTrip: true),
    LedgerItem(id: 'L-102', title: 'مشوار فيزا (#ALT-8818) - التجمع الخامس', date: 'اليوم، 02:15 م', amount: 150.0, commission: 15.0, isTrip: true),
    LedgerItem(id: 'L-103', title: 'سداد عمولات - إنستاباي InstaPay', date: 'أمس، 09:00 م', amount: 100.0, commission: 0.0, isTrip: false),
    LedgerItem(id: 'L-104', title: 'مشوار كاش (#ALT-8790) - الشيخ زايد', date: 'أمس، 06:40 م', amount: 200.0, commission: 20.0, isTrip: true),
  ];

  void _showInstantCashoutModal() {
    final amountCtrl = TextEditingController(text: '100');
    final instapayAddressCtrl = TextEditingController(text: 'mahmoud@instapay');

    showModalBottomSheet(
      context: context,
      backgroundColor: DriverColors.surface,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (ctx) {
        return Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Row(
                children: [
                  Text('💸', style: TextStyle(fontSize: 22)),
                  SizedBox(width: 8),
                  Text('سحب الأرباح الفوري (InstaPay 24/7)', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
                ],
              ),
              const SizedBox(height: 6),
              const Text('تحويل لحظي مباشر إلى حسابك البنكي أو عنوان إنستاباي بدون أي رسوم تحويل.', style: TextStyle(fontSize: 11, color: DriverColors.textMuted)),
              const SizedBox(height: 14),
              TextField(
                controller: instapayAddressCtrl,
                style: const TextStyle(fontSize: 12, color: Colors.white),
                decoration: InputDecoration(
                  labelText: 'عنوان الدفع اللحظي (IPA):',
                  labelStyle: const TextStyle(color: DriverColors.textSecondary, fontSize: 11),
                  filled: true,
                  fillColor: DriverColors.surfaceLight,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                ),
              ),
              const SizedBox(height: 10),
              TextField(
                controller: amountCtrl,
                keyboardType: TextInputType.number,
                style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white),
                decoration: InputDecoration(
                  labelText: 'المبلغ المطلوب سحبه (ج.م):',
                  labelStyle: const TextStyle(color: DriverColors.textSecondary, fontSize: 11),
                  filled: true,
                  fillColor: DriverColors.surfaceLight,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () {
                    final double requested = double.tryParse(amountCtrl.text) ?? 50.0;
                    if (_balance >= requested) {
                      setState(() => _balance -= requested);
                      Navigator.pop(ctx);
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('تم تحويل ${requested.toInt()} ج.م لحظياً إلى حسابك (${instapayAddressCtrl.text}) عبر InstaPay بنجاح 🟢⚡'),
                          backgroundColor: DriverColors.primary,
                        ),
                      );
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('رصيدك المتاح أقل من المبلغ المطلوب')),
                      );
                    }
                  },
                  icon: const Icon(Icons.flash_on),
                  label: const Text('تنفيذ التحويل اللحظي الآن ⚡'),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

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
                  Text('سداد العمولات وشحن المحفظة', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
                ],
              ),
              const SizedBox(height: 6),
              const Text('عمولة المنصة 10% فقط عن المشاوير المكتملة.', style: TextStyle(fontSize: 11, color: DriverColors.textMuted)),
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
                          const SnackBar(content: Text('تم سداد وإيداع 100.00 ج.م في محفظتك بنجاح عبر إنستاباي 🟢')),
                        );
                      },
                      style: ElevatedButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6)),
                      child: const Text('سداد 100 ج', style: TextStyle(fontSize: 11)),
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
                          Text('فودافون كاش ومحافظ المحمول', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                          Text('تحويل فوري إلى رقم: 01012345678', style: TextStyle(fontSize: 10, color: DriverColors.textMuted)),
                        ],
                      ),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        setState(() => _balance += 50);
                        Navigator.pop(ctx);
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('تم سداد 50.00 ج.م في محفظتك بنجاح عبر فودافون كاش 🟢')),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: DriverColors.accentOrange,
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                      ),
                      child: const Text('سداد 50 ج', style: TextStyle(fontSize: 11)),
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
        children: [
          // Commission Highlight Banner
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(
              color: DriverColors.primary.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: DriverColors.primary.withValues(alpha: 0.4)),
            ),
            child: const Row(
              children: [
                Icon(Icons.verified, color: DriverColors.primary, size: 20),
                SizedBox(width: 10),
                Expanded(
                  child: Text(
                    'عمولة المنصة 10% فقط (الأقل في مصر) • صافي ربحك 90% كاش في جيبك 🚗',
                    style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white),
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 14),

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
                const Text('الرصيد المتاح للتشغيل وسحب الأرباح', style: TextStyle(fontSize: 11, color: DriverColors.textMuted)),
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
                        icon: const Icon(Icons.payment, size: 16),
                        label: const Text('سداد عمولة / شحن', style: TextStyle(fontSize: 11)),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: OutlinedButton.icon(
                        onPressed: _showInstantCashoutModal,
                        icon: const Icon(Icons.flash_on, size: 16, color: DriverColors.accentAmber),
                        label: const Text('سحب فوري (InstaPay)', style: TextStyle(fontSize: 11, color: DriverColors.accentAmber, fontWeight: FontWeight.bold)),
                        style: OutlinedButton.styleFrom(
                          foregroundColor: Colors.white,
                          side: const BorderSide(color: DriverColors.accentAmber),
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
                          item.isTrip ? '${item.date} • عمولة المنصة (10%): -${item.commission} ج.م' : item.date,
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
    );
  }
}
