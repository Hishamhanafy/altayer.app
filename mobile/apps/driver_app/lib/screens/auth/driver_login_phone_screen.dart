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
              // Brand Logo & Title
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: DriverColors.primary,
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: [
                        BoxShadow(
                          color: DriverColors.primary.withValues(alpha: 0.4),
                          blurRadius: 15,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: const Text('🚗', style: TextStyle(fontSize: 28)),
                  ),
                  const SizedBox(width: 14),
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'عالطاير كابتن',
                        style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: Colors.white),
                      ),
                      Text(
                        'منصة القيادة والأرباح الحرة 🇪🇬',
                        style: TextStyle(fontSize: 12, color: DriverColors.primary, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ],
              ),

              const SizedBox(height: 40),

              // Title Headline
              Text(
                _isNewCaptain ? 'انضم لأسطول كباتن عالطاير 🚀' : 'تسجيل دخول الكابتن 👋',
                style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: Colors.white),
              ),
              const SizedBox(height: 6),
              Text(
                _isNewCaptain
                    ? 'سجّل بياناتك وسيارتك وابدأ في استقبال المشاوير وتحقيق دخل يومي ممتاز بأقل نسبة عمولة في مصر.'
                    : 'أدخل رقم هاتفك المسجل لاستقبال كود الدخول ومتابعة رحلاتك وأرباحك.',
                style: const TextStyle(fontSize: 12, color: DriverColors.textSecondary, height: 1.5),
              ),

              const SizedBox(height: 30),

              // Phone Input Field with Egypt Flag
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
                      decoration: BoxDecoration(
                        color: DriverColors.surfaceLight,
                        borderRadius: const BorderRadius.horizontal(right: Radius.circular(16)),
                      ),
                      child: const Row(
                        children: [
                          Text('🇪🇬 +20', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
                        ],
                      ),
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

              // New vs Existing Captain Switch Toggle
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
                            color: _isNewCaptain ? DriverColors.accentOrange : Colors.transparent,
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

              // Submit Action Button
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton(
                  onPressed: _sendOtp,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: _isNewCaptain ? DriverColors.accentOrange : DriverColors.primary,
                  ),
                  child: Text(
                    _isNewCaptain ? 'المتابعة لتسجيل البيانات والسيارة ➡️' : 'إرسال رمز الدخول السريع (SMS OTP) 📲',
                    style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w900),
                  ),
                ),
              ),

              const SizedBox(height: 24),

              // Security & Privacy Note
              Center(
                child: Column(
                  children: const [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.shield_outlined, color: DriverColors.primary, size: 16),
                        SizedBox(width: 6),
                        Text(
                          'بياناتك مؤمنة ومشفرة بالكامل طبقاً للقانون المصري',
                          style: TextStyle(fontSize: 10, color: DriverColors.textMuted),
                        ),
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
