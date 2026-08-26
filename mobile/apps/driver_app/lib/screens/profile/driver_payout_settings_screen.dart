import 'package:flutter/material.dart';
import '../../theme/driver_theme.dart';

class DriverPayoutSettingsScreen extends StatefulWidget {
  const DriverPayoutSettingsScreen({super.key});

  @override
  State<DriverPayoutSettingsScreen> createState() => _DriverPayoutSettingsScreenState();
}

class _DriverPayoutSettingsScreenState extends State<DriverPayoutSettingsScreen> {
  String _selectedMethod = 'INSTAPAY';
  final TextEditingController _instapayController = TextEditingController(text: 'mahmoud.elsayed@instapay');
  final TextEditingController _vodafoneController = TextEditingController(text: '01012345678');
  bool _autoDailyPayout = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: DriverColors.background,
      appBar: AppBar(
        title: const Text('إعدادات استلام الأرباح 💳'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_forward),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Header Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: DriverColors.surface,
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: DriverColors.border),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('وسيلة استلام الأرباح والمكافآت المفضلة', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
                SizedBox(height: 4),
                Text('يتم تحويل أرباح مشاوير الفيزا ومكافآت التارجت تلقائياً لحسابك بدون أي رسوم تحويل.', style: TextStyle(fontSize: 11, color: DriverColors.textMuted)),
              ],
            ),
          ),

          const SizedBox(height: 18),

          const Text('اختر وسيلة التحويل الأساسية:', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.textSecondary)),
          const SizedBox(height: 10),

          // InstaPay Option
          _buildMethodTile(
            'INSTAPAY',
            '⚡ إنستاباي InstaPay (تحويل بنكي لحظي)',
            'التحويل الفوري إلى عنوان IPA أو رقم الهاتف',
            _instapayController,
            'عنوان الدفع (مثال: captain@instapay)',
          ),

          const SizedBox(height: 12),

          // Vodafone Cash Option
          _buildMethodTile(
            'VODAFONE_CASH',
            '📱 فودافون كاش / محافظ المحمول',
            'التحويل المباشر لمحفظتك الإلكترونية',
            _vodafoneController,
            'رقم المحفظة (010xxxxxxxx)',
            isNumber: true,
          ),

          const SizedBox(height: 18),

          // Auto Daily Payout Switch
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: DriverColors.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: DriverColors.border),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('التحويل التلقائي اليومي للأرباح', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                      Text('تحويل الرصيد الزائد يومياً في تمام الساعة 11:00 مساءً', style: TextStyle(fontSize: 10, color: DriverColors.textMuted)),
                    ],
                  ),
                ),
                Switch(
                  value: _autoDailyPayout,
                  activeThumbColor: DriverColors.primary,
                  onChanged: (val) => setState(() => _autoDailyPayout = val),
                ),
              ],
            ),
          ),

          const SizedBox(height: 24),

          // Save Settings Button
          SizedBox(
            width: double.infinity,
            height: 50,
            child: ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('تم حفظ وتحديث إعدادات استلام الأرباح بنجاح 🟢')),
                );
              },
              child: const Text('حفظ التعديلات 💾', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w900)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMethodTile(String method, String title, String subtitle, TextEditingController controller, String hint, {bool isNumber = false}) {
    final isSelected = (_selectedMethod == method);

    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: isSelected ? DriverColors.primary.withValues(alpha: 0.1) : DriverColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: isSelected ? DriverColors.primary : DriverColors.border, width: isSelected ? 1.5 : 1),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Radio<String>(
                value: method,
                groupValue: _selectedMethod,
                activeColor: DriverColors.primary,
                onChanged: (val) => setState(() => _selectedMethod = val!),
              ),
              const SizedBox(width: 6),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                    Text(subtitle, style: const TextStyle(fontSize: 10, color: DriverColors.textMuted)),
                  ],
                ),
              ),
            ],
          ),
          if (isSelected) ...[
            const SizedBox(height: 10),
            TextField(
              controller: controller,
              keyboardType: isNumber ? TextInputType.phone : TextInputType.text,
              style: const TextStyle(fontSize: 12, color: Colors.white, fontWeight: FontWeight.bold),
              decoration: InputDecoration(
                hintText: hint,
                hintStyle: const TextStyle(color: DriverColors.textMuted, fontSize: 11),
                filled: true,
                fillColor: DriverColors.background,
                contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
