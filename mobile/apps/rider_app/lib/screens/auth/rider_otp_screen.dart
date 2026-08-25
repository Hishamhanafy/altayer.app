import 'dart:async';
import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import 'rider_register_screen.dart';
import '../../main.dart';

class RiderOtpScreen extends StatefulWidget {
  final String phoneNumber;
  final bool isNewRider;

  const RiderOtpScreen({
    super.key,
    required this.phoneNumber,
    required this.isNewRider,
  });

  @override
  State<RiderOtpScreen> createState() => _RiderOtpScreenState();
}

class _RiderOtpScreenState extends State<RiderOtpScreen> {
  final TextEditingController _otpController = TextEditingController();
  int _secondsRemaining = 60;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _startCountdown();
  }

  void _startCountdown() {
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (_secondsRemaining > 0) {
        setState(() => _secondsRemaining--);
      } else {
        _timer?.cancel();
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _otpController.dispose();
    super.dispose();
  }

  void _verifyOtp(String code) {
    if (code.length == 4) {
      if (widget.isNewRider) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (_) => RiderRegisterScreen(phoneNumber: widget.phoneNumber),
          ),
        );
      } else {
        Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (_) => const RiderMainHubScreen()),
          (route) => false,
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('رمز التحقق (OTP)'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_forward),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 10),
              const Text(
                'أدخل رمز التحقق 📲',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: Colors.white),
              ),
              const SizedBox(height: 6),
              const Text(
                'تم إرسال رسالة SMS برمز مكون من 4 أرقام إلى:',
                style: TextStyle(fontSize: 11, color: AppColors.textSecondary),
              ),
              const SizedBox(height: 4),
              Row(
                children: [
                  Text(
                    '+20 ${widget.phoneNumber}',
                    style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.primary, letterSpacing: 1),
                  ),
                  const SizedBox(width: 8),
                  GestureDetector(
                    onTap: () => Navigator.pop(context),
                    child: const Text('تعديل الرقم', style: TextStyle(fontSize: 11, color: AppColors.primaryLight, decoration: TextDecoration.underline)),
                  ),
                ],
              ),

              const SizedBox(height: 35),

              // 4-Box Styled OTP Field
              Center(
                child: SizedBox(
                  width: 260,
                  child: TextField(
                    controller: _otpController,
                    autofocus: true,
                    keyboardType: TextInputType.number,
                    maxLength: 4,
                    textAlign: TextAlign.center,
                    style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900, letterSpacing: 24, color: Colors.white),
                    decoration: InputDecoration(
                      counterText: '',
                      hintText: '••••',
                      hintStyle: const TextStyle(fontSize: 28, letterSpacing: 24, color: AppColors.textMuted),
                      filled: true,
                      fillColor: AppColors.surface,
                      contentPadding: const EdgeInsets.symmetric(vertical: 14),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(16),
                        borderSide: const BorderSide(color: AppColors.primary, width: 2),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(16),
                        borderSide: const BorderSide(color: AppColors.primary, width: 2),
                      ),
                    ),
                    onChanged: (val) {
                      if (val.length == 4) {
                        _verifyOtp(val);
                      }
                    },
                  ),
                ),
              ),

              const SizedBox(height: 24),

              // Quick Demo Fast Testing Button
              Center(
                child: OutlinedButton.icon(
                  onPressed: () {
                    _otpController.text = '1234';
                    _verifyOtp('1234');
                  },
                  icon: const Icon(Icons.flash_on, color: AppColors.accentAmber, size: 16),
                  label: const Text('دخول تجريبي سريع (1234)', style: TextStyle(fontSize: 11, color: AppColors.accentAmber)),
                  style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: AppColors.accentAmber),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  ),
                ),
              ),

              const SizedBox(height: 30),

              // Resend Countdown
              Center(
                child: _secondsRemaining > 0
                    ? Text(
                        'إعادة إرسال الرمز خلال $_secondsRemaining ثانية',
                        style: const TextStyle(fontSize: 11, color: AppColors.textMuted),
                      )
                    : TextButton(
                        onPressed: () {
                          setState(() => _secondsRemaining = 60);
                          _startCountdown();
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text('تمت إعادة إرسال رمز التحقق SMS بنجاح 📲')),
                          );
                        },
                        child: const Text('إعادة إرسال رمز التحقق الآن', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.primary)),
                      ),
              ),

              const SizedBox(height: 30),

              // Submit Button
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  onPressed: () => _verifyOtp(_otpController.text.trim()),
                  child: const Text('تأكيد والمتابعة 🚀', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
