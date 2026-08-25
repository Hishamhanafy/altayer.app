import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/rider_user_models.dart';

class RiderPaymentMethodsScreen extends StatefulWidget {
  const RiderPaymentMethodsScreen({super.key});

  @override
  State<RiderPaymentMethodsScreen> createState() => _RiderPaymentMethodsScreenState();
}

class _RiderPaymentMethodsScreenState extends State<RiderPaymentMethodsScreen> {
  double _walletBalance = 120.0;
  String _selectedDefaultPayment = 'CASH';
  final TextEditingController _promoController = TextEditingController();
  String _activePromo = 'ALTAYER50 (خصم 50% حتى 25 ج)';

  final List<PaymentMethodItem> _paymentMethods = const [
    PaymentMethodItem(id: 'PM-1', type: 'CASH', title: 'الدفع نقداً كاش', subtitle: 'سداد الأجرة مباشرة للكابتن', icon: '💵', isDefault: true),
    PaymentMethodItem(id: 'PM-2', type: 'CARD', title: 'بطاقة ميزة / فيزا البنكية', subtitle: 'البنك الأهلي المصري (•••• 4892)', icon: '💳'),
    PaymentMethodItem(id: 'PM-3', type: 'VODAFONE_CASH', title: 'محفظة فودافون كاش', subtitle: 'رقم المحفظة: 01098765432', icon: '📱'),
    PaymentMethodItem(id: 'PM-4', type: 'AKHIL_CREDIT', title: 'AKHIL CREDIT (ادفع بعدين)', subtitle: 'حد ائتماني مفعل حتى 500 ج.م للعملاء المؤهلين 🌟', icon: '💎'),
  ];

  void _showAddCardModal() {
    final cardNumberCtrl = TextEditingController();
    final expiryCtrl = TextEditingController();
    final cvvCtrl = TextEditingController();

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (ctx) {
        return Padding(
          padding: EdgeInsets.only(
            bottom: MediaQuery.of(context).viewInsets.bottom,
            left: 20,
            right: 20,
            top: 20,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('💳 إضافة بطاقة بنكية جديدة (فيزا / ميزة)', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
              const SizedBox(height: 14),
              TextField(
                controller: cardNumberCtrl,
                keyboardType: TextInputType.number,
                style: const TextStyle(fontSize: 13, color: Colors.white),
                decoration: InputDecoration(
                  hintText: 'رقم البطاقة (16 رقماً)',
                  hintStyle: const TextStyle(color: AppColors.textMuted, fontSize: 12),
                  filled: true,
                  fillColor: AppColors.surfaceLight,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                ),
              ),
              const SizedBox(height: 10),
              Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: expiryCtrl,
                      style: const TextStyle(fontSize: 13, color: Colors.white),
                      decoration: InputDecoration(
                        hintText: 'MM/YY (الشهر/السنة)',
                        hintStyle: const TextStyle(color: AppColors.textMuted, fontSize: 12),
                        filled: true,
                        fillColor: AppColors.surfaceLight,
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: TextField(
                      controller: cvvCtrl,
                      keyboardType: TextInputType.number,
                      obscureText: true,
                      style: const TextStyle(fontSize: 13, color: Colors.white),
                      decoration: InputDecoration(
                        hintText: 'CVV (3 أرقام)',
                        hintStyle: const TextStyle(color: AppColors.textMuted, fontSize: 12),
                        filled: true,
                        fillColor: AppColors.surfaceLight,
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.pop(ctx);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('تم ربط وتوثيق البطاقة البنكية بنجاح 🟢')),
                    );
                  },
                  child: const Text('حفظ وربط البطاقة'),
                ),
              ),
              const SizedBox(height: 12),
            ],
          ),
        );
      },
    );
  }

  void _showTopUpModal() {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (ctx) {
        return Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('👛 شحن محفظة عالطاير الرقمية', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
              const SizedBox(height: 14),
              _buildTopUpTile('إنستاباي InstaPay (شحن فوري)', 'تحويل لحظي لعنوان: altayer@instapay', '+50 ج.م', () {
                setState(() => _walletBalance += 50);
                Navigator.pop(ctx);
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('تم إيداع 50.00 ج.م في محفظتك بنجاح عبر إنستاباي 🟢')));
              }),
              const SizedBox(height: 8),
              _buildTopUpTile('فودافون كاش ومحافظ المحمول', 'تحويل فوري لرقم: 01012345678', '+100 ج.م', () {
                setState(() => _walletBalance += 100);
                Navigator.pop(ctx);
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('تم إيداع 100.00 ج.م في محفظتك بنجاح عبر فودافون كاش 🟢')));
              }),
            ],
          ),
        );
      },
    );
  }

  Widget _buildTopUpTile(String title, String subtitle, String amount, VoidCallback onTap) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.surfaceLight,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                Text(subtitle, style: const TextStyle(fontSize: 10, color: AppColors.textMuted)),
              ],
            ),
          ),
          ElevatedButton(
            onPressed: onTap,
            style: ElevatedButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6)),
            child: Text(amount, style: const TextStyle(fontSize: 11)),
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
          // Wallet Balance Card
          Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFFEA580C), Color(0xFFC2410C)],
                begin: Alignment.topRight,
                end: Alignment.bottomLeft,
              ),
              borderRadius: BorderRadius.circular(22),
              boxShadow: [
                BoxShadow(
                  color: AppColors.primary.withValues(alpha: 0.3),
                  blurRadius: 15,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('رصيد المحفظة المتاح للمشاوير', style: TextStyle(fontSize: 12, color: Colors.white70)),
                const SizedBox(height: 4),
                Text(
                  '${_walletBalance.toStringAsFixed(2)} ج.م',
                  style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: Colors.white),
                ),
                const SizedBox(height: 12),
                ElevatedButton.icon(
                  onPressed: _showTopUpModal,
                  icon: const Icon(Icons.add_circle, size: 16),
                  label: const Text('شحن رصيد المحفظة', style: TextStyle(fontSize: 11)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: AppColors.primary,
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 20),

          // Payment Methods Section
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('وسائل الدفع المسجلة:', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.textSecondary)),
              TextButton.icon(
                onPressed: _showAddCardModal,
                icon: const Icon(Icons.add, size: 16, color: AppColors.primaryLight),
                label: const Text('إضافة بطاقة', style: TextStyle(fontSize: 11, color: AppColors.primaryLight, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          const SizedBox(height: 6),

          ..._paymentMethods.map((pm) {
            final isSelected = (_selectedDefaultPayment == pm.type);
            return Container(
              margin: const EdgeInsets.only(bottom: 8),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: isSelected ? AppColors.primary.withValues(alpha: 0.1) : AppColors.surface,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: isSelected ? AppColors.primary : AppColors.border),
              ),
              child: Row(
                children: [
                  Radio<String>(
                    value: pm.type,
                    groupValue: _selectedDefaultPayment,
                    activeColor: AppColors.primary,
                    onChanged: (val) => setState(() => _selectedDefaultPayment = val!),
                  ),
                  Text(pm.icon, style: const TextStyle(fontSize: 20)),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(pm.title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                        Text(pm.subtitle, style: const TextStyle(fontSize: 10, color: AppColors.textMuted)),
                      ],
                    ),
                  ),
                ],
              ),
            );
          }),

          const SizedBox(height: 18),

          // Promo Codes Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.surface,
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: AppColors.border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('كوبونات الخصم', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _promoController,
                        style: const TextStyle(fontSize: 12, color: Colors.white),
                        decoration: InputDecoration(
                          hintText: 'أدخل كود الخصم (مثال: WEEKEND20)',
                          hintStyle: const TextStyle(color: AppColors.textMuted, fontSize: 11),
                          filled: true,
                          fillColor: AppColors.surfaceLight,
                          contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    ElevatedButton(
                      onPressed: () {
                        if (_promoController.text.trim().isNotEmpty) {
                          setState(() => _activePromo = '${_promoController.text.trim().toUpperCase()} (خصم 20 ج)');
                          _promoController.clear();
                          ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('تم تفعيل كود الخصم بنجاح! 🎟️')));
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      ),
                      child: const Text('تطبيق', style: TextStyle(fontSize: 11)),
                    ),
                  ],
                ),
                if (_activePromo.isNotEmpty) ...[
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                    decoration: BoxDecoration(
                      color: AppColors.accentGreen.withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('كوبون مفعل: $_activePromo', style: const TextStyle(fontSize: 11, color: AppColors.accentGreen, fontWeight: FontWeight.bold)),
                        const Icon(Icons.check_circle, color: AppColors.accentGreen, size: 16),
                      ],
                    ),
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}
