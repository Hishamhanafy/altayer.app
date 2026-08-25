import 'package:flutter/material.dart';
import '../../theme/driver_theme.dart';
import 'driver_otp_screen.dart';

class DriverLoginPhoneScreen extends StatefulWidget {
  const DriverLoginPhoneScreen({super.key});

  @override
  State<DriverLoginPhoneScreen> createState() => _DriverLoginPhoneScreenState();
}

class _DriverLoginPhoneScreenState extends State<DriverLoginPhoneScreen> {
  final TextEditingController _phoneController = TextEditingController(text: '01012345678');
  bool _isNewCaptain = false;

  void _sendOtp() {
    final phone = _phoneController.text.trim();
    if (phone.length < 10) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('يرجى إدخال رقم هاتف مصري صحيح مكون من 11 رقماً')),
      );
      return;
    }

    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => DriverOtpScreen(
          phoneNumber: phone,
          isNewCaptain: _isNewCaptain,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: DriverColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 30),
              // Brand Header
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFFF59E0B), Color(0xFFD97706)],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFFF59E0B).withValues(alpha: 0.4),
                          blurRadius: 15,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: const Text('🐎', style: TextStyle(fontSize: 28)),
                  ),
                  const SizedBox(width: 14),
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'أخيل | AKHIL',
                        style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: Colors.white),
                      ),
                      Text(
                        'منظومة الكابتن والبرثونة • أبعد من طريق 🇪🇬',
                        style: TextStyle(fontSize: 11, color: Color(0xFFFBBF24), fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ],
              ),

              const SizedBox(height: 40),

              Text(
                _isNewCaptain ? 'انضم ككابتن / برثونة في أخيل 🚀' : 'تسجيل دخول الكابتن 👋',
                style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: Colors.white),
              ),
              const SizedBox(height: 6),
              Text(
                _isNewCaptain
                    ? 'سجّل بياناتك وارفع رخصك الآن للاستفادة من عمولة مرنة منخفضة (10%) وضمان الدخل الشهري!'
                    : 'أدخل رقم هاتفك المسجل لاستقبال رمز التحقق والدخول إلى رادار الرحلات والأرباح.',
                style: const TextStyle(fontSize: 12, color: DriverColors.textSecondary, height: 1.5),
              ),

              const SizedBox(height: 30),

              // Phone Field
              const Text(
                'رقم الهاتف المحمول (مصر):',
                style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.textSecondary),
              ),
              const SizedBox(height: 8),
              Container(
                decoration: BoxDecoration(
                  color: DriverColors.surface,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: DriverColors.border),
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
                      decoration: const BoxDecoration(
                        color: DriverColors.surfaceLight,
                        borderRadius: BorderRadius.horizontal(right: Radius.circular(16)),
                      ),
                      child: const Text('🇪🇬 +20', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
                    ),
                    Expanded(
                      child: TextField(
                        controller: _phoneController,
                        keyboardType: TextInputType.phone,
                        style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.white, letterSpacing: 1.5),
                        decoration: const InputDecoration(
                          hintText: '01012345678',
                          hintStyle: TextStyle(color: DriverColors.textMuted, fontSize: 13),
                          border: InputBorder.none,
                          contentPadding: EdgeInsets.symmetric(horizontal: 14),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              // Mode Toggle
              Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: DriverColors.surface,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: DriverColors.border),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: GestureDetector(
                        onTap: () => setState(() => _isNewCaptain = false),
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 10),
                          decoration: BoxDecoration(
                            color: !_isNewCaptain ? DriverColors.primary : Colors.transparent,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Center(
                            child: Text(
                              'كابتن مسجل بالفعل',
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                                color: !_isNewCaptain ? Colors.white : DriverColors.textMuted,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Expanded(
                      child: GestureDetector(
                        onTap: () => setState(() => _isNewCaptain = true),
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 10),
                          decoration: BoxDecoration(
                            color: _isNewCaptain ? DriverColors.primary : Colors.transparent,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Center(
                            child: Text(
                              'تسجيل كابتن جديد ⚡',
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                                color: _isNewCaptain ? Colors.white : DriverColors.textMuted,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 30),

              // Submit Button
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton(
                  onPressed: _sendOtp,
                  child: Text(
                    _isNewCaptain ? 'المتابعة لإنشاء الحساب الجديد ➡️' : 'إرسال رمز الدخول السريع (SMS OTP) 📲',
                    style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w900),
                  ),
                ),
              ),

              const SizedBox(height: 24),

              // Feature Highlights
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: DriverColors.surface,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: DriverColors.border),
                ),
                child: Column(
                  children: const [
                    Row(
                      children: [
                        Icon(Icons.check_circle_outline, color: DriverColors.primary, size: 16),
                        SizedBox(width: 8),
                        Text('عمولة عادلة تبدأ من 10% فقط وسداد فوري بإنستاباي', style: TextStyle(fontSize: 11, color: DriverColors.textSecondary)),
                      ],
                    ),
                    SizedBox(height: 6),
                    Row(
                      children: [
                        Icon(Icons.check_circle_outline, color: DriverColors.primary, size: 16),
                        SizedBox(width: 8),
                        Text('فئة البرثونة المخصصة للسائقات لخدمة السيدات', style: TextStyle(fontSize: 11, color: DriverColors.textSecondary)),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
