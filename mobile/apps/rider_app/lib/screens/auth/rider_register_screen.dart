import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../main.dart';

class RiderRegisterScreen extends StatefulWidget {
  final String phoneNumber;

  const RiderRegisterScreen({
    super.key,
    required this.phoneNumber,
  });

  @override
  State<RiderRegisterScreen> createState() => _RiderRegisterScreenState();
}

class _RiderRegisterScreenState extends State<RiderRegisterScreen> {
  final TextEditingController _nameController = TextEditingController(text: 'عمر الشناوي');
  final TextEditingController _emailController = TextEditingController(text: 'omar@example.com');
  final TextEditingController _emergencyNameController = TextEditingController(text: 'محمد الشناوي (والد)');
  final TextEditingController _emergencyPhoneController = TextEditingController(text: '01011122233');
  String _preferredPayment = 'CASH';

  void _completeRegistration() {
    if (_nameController.text.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('يرجى إدخال اسمك الكريم للمتابعة')),
      );
      return;
    }

    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (_) => const RiderMainHubScreen()),
      (route) => false,
    );

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('🎉 مرحباً بك في أخيل! تم تفعيل رصيد AKHIL WELCOME (200 ج) + 100 نقطة ولاء مجانية 🎁'),
        duration: Duration(seconds: 4),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('بيانات حساب عميل أخيل 👤'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_forward),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Welcome Bonus Header
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF0F172A), Color(0xFF1E1B4B)],
                    begin: Alignment.topRight,
                    end: Alignment.bottomLeft,
                  ),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: const Color(0xFFF59E0B)),
                ),
                child: const Row(
                  children: [
                    Text('🎁', style: TextStyle(fontSize: 28)),
                    SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('AKHIL WELCOME — رصيدك الترحيبي!', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w900, color: Color(0xFFFBBF24))),
                          SizedBox(height: 2),
                          Text('رصيد ترحيبي 200 جنيه + 100 نقطة ولاء تضاف لمحفظتك فوراً عند إتمام التسجيل.', style: TextStyle(fontSize: 11, color: Colors.white70)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              const Text('بياناتك الأساسية:', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.textSecondary)),
              const SizedBox(height: 12),

              _buildInput('الاسم الكريم (يظهر للكابتن):', _nameController, 'مثال: عمر الشناوي', Icons.person),
              const SizedBox(height: 14),

              _buildInput('البريد الإلكتروني (لاستلام فواتير الرحلات):', _emailController, 'omar@example.com', Icons.email, isEmail: true),
              const SizedBox(height: 14),

              _buildInput('اسم جهة اتصال الطوارئ (اختياري للأمان):', _emergencyNameController, 'محمد الشناوي (والد)', Icons.contact_phone),
              const SizedBox(height: 14),

              _buildInput('رقم هاتف الطوارئ:', _emergencyPhoneController, '01011122233', Icons.phone, isNumber: true),

              const SizedBox(height: 20),

              const Text('وسيلة الدفع الافتراضية المفضلة:', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.textSecondary)),
              const SizedBox(height: 10),

              _buildPaymentOption('CASH', '💵 الدفع نقداً كاش للكابتن', 'المشوار يحاسب عليه الكابتن مباشرة نقداً'),
              const SizedBox(height: 8),
              _buildPaymentOption('WALLET', '👛 محفظة أخيل الرقمية', 'خصم تلقائي من رصيد المحفظة'),

              const SizedBox(height: 30),

              // Submit Button
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  onPressed: _completeRegistration,
                  child: const Text('إتمام التسجيل وبدء رحلات أخيل 🚀', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPaymentOption(String type, String title, String subtitle) {
    final isSelected = (_preferredPayment == type);
    return InkWell(
      onTap: () => setState(() => _preferredPayment = type),
      borderRadius: BorderRadius.circular(14),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.primary.withValues(alpha: 0.15) : AppColors.surface,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: isSelected ? AppColors.primary : AppColors.border),
        ),
        child: Row(
          children: [
            Icon(isSelected ? Icons.radio_button_checked : Icons.radio_button_off, color: isSelected ? AppColors.primary : AppColors.textMuted, size: 20),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                  Text(subtitle, style: const TextStyle(fontSize: 10, color: AppColors.textMuted)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInput(String label, TextEditingController controller, String hint, IconData icon, {bool isNumber = false, bool isEmail = false}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.textSecondary)),
        const SizedBox(height: 6),
        TextField(
          controller: controller,
          keyboardType: isNumber ? TextInputType.phone : isEmail ? TextInputType.emailAddress : TextInputType.text,
          style: const TextStyle(fontSize: 13, color: Colors.white),
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: const TextStyle(color: AppColors.textMuted, fontSize: 12),
            prefixIcon: Icon(icon, color: AppColors.primary, size: 18),
            filled: true,
            fillColor: AppColors.surface,
            contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: BorderSide.none),
          ),
        ),
      ],
    );
  }
}
