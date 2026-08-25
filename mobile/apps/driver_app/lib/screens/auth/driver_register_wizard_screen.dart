import 'package:flutter/material.dart';
import '../../theme/driver_theme.dart';
import '../../models/driver_kyc_models.dart';
import '../kyc/driver_kyc_dashboard_screen.dart';

class DriverRegisterWizardScreen extends StatefulWidget {
  final String phoneNumber;

  const DriverRegisterWizardScreen({
    super.key,
    required this.phoneNumber,
  });

  @override
  State<DriverRegisterWizardScreen> createState() => _DriverRegisterWizardScreenState();
}

class _DriverRegisterWizardScreenState extends State<DriverRegisterWizardScreen> {
  int _currentStep = 0;
  final CaptainRegistrationData _regData = CaptainRegistrationData();

  // Controllers
  final TextEditingController _nameController = TextEditingController(text: 'محمود السيد إبراهيم');
  final TextEditingController _nationalIdController = TextEditingController(text: '29510150104892');
  final TextEditingController _makeModelController = TextEditingController(text: 'تويوتا كورولا 2022');
  final TextEditingController _plateLettersController = TextEditingController(text: 'أ ب ج');
  final TextEditingController _plateNumbersController = TextEditingController(text: '1234');
  final TextEditingController _emergencyNameController = TextEditingController(text: 'أحمد السيد (شقيق)');
  final TextEditingController _emergencyPhoneController = TextEditingController(text: '01123456789');
  final TextEditingController _payoutAddressController = TextEditingController(text: 'mahmoud@instapay');

  final List<String> _cities = ['القاهرة الكبرى (القاهرة، الجيزة، القليوبية)', 'الإسكندرية والساحل', 'محافظات الدلتا (طنطا، المنصورة)', 'محافظات القناة', 'الصعيد'];
  final List<String> _vehicleTypes = ['ملاكي حديث (سيدان/هاتشباك)', 'تاكسي أبيض معتمد', 'سكوتر / دراجة نارية', 'توك توك شعبي'];
  final List<String> _colors = ['أبيض', 'فضي / رمادي', 'أسود ملكي', 'برونزي / موكا', 'أزرق / كحلي', 'أحمر'];

  @override
  void initState() {
    super.initState();
    _regData.phone = widget.phoneNumber;
  }

  void _nextStep() {
    if (_currentStep == 0) {
      if (_nameController.text.trim().isEmpty || _nationalIdController.text.trim().length < 14) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('يرجى إدخال الاسم الرباعي والرقم القومي المكون من 14 رقماً')),
        );
        return;
      }
      _regData.fullName = _nameController.text.trim();
      _regData.nationalId = _nationalIdController.text.trim();
      _regData.emergencyName = _emergencyNameController.text.trim();
      _regData.emergencyPhone = _emergencyPhoneController.text.trim();
    } else if (_currentStep == 1) {
      if (_makeModelController.text.trim().isEmpty || _plateNumbersController.text.trim().isEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('يرجى إدخال موديل وسنة صنع السيارة وأرقام اللوحة')),
        );
        return;
      }
      _regData.makeModelYear = _makeModelController.text.trim();
      _regData.plateLetters = _plateLettersController.text.trim();
      _regData.plateNumbers = _plateNumbersController.text.trim();
    } else if (_currentStep == 2) {
      _regData.payoutAddress = _payoutAddressController.text.trim();
      // Completed -> Navigate to KYC Dashboard
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) => DriverKycDashboardScreen(
            registrationData: _regData,
          ),
        ),
      );
      return;
    }

    setState(() => _currentStep++);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: DriverColors.background,
      appBar: AppBar(
        title: const Text('تسجيل كابتن جديد 📝'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_forward),
          onPressed: () {
            if (_currentStep > 0) {
              setState(() => _currentStep--);
            } else {
              Navigator.pop(context);
            }
          },
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Step Progress Indicator Bar
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              color: DriverColors.surface,
              child: Row(
                children: [
                  _buildStepBubble(0, 'البيانات الشخصية'),
                  _buildStepDivider(0),
                  _buildStepBubble(1, 'بيانات السيارة'),
                  _buildStepDivider(1),
                  _buildStepBubble(2, 'المحفظة والسحب'),
                ],
              ),
            ),

            // Form Body
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(20),
                child: _currentStep == 0
                    ? _buildStep1PersonalInfo()
                    : _currentStep == 1
                        ? _buildStep2VehicleInfo()
                        : _buildStep3PayoutInfo(),
              ),
            ),

            // Bottom Navigation Controls
            Container(
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(
                color: DriverColors.surface,
                borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
              ),
              child: SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  onPressed: _nextStep,
                  child: Text(
                    _currentStep == 2 ? 'حفظ البيانات والانتقال لتوثيق الرخص (KYC) 📷' : 'المتابعة للخطوة التالية ➡️',
                    style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w900),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStepBubble(int stepIndex, String title) {
    final isDone = _currentStep > stepIndex;
    final isCurrent = _currentStep == stepIndex;

    return Row(
      children: [
        Container(
          width: 28,
          height: 28,
          decoration: BoxDecoration(
            color: isDone || isCurrent ? DriverColors.primary : DriverColors.surfaceLight,
            shape: BoxShape.circle,
            border: Border.all(color: isCurrent ? Colors.white : Colors.transparent, width: 2),
          ),
          child: Center(
            child: isDone
                ? const Icon(Icons.check, size: 16, color: Colors.white)
                : Text('${stepIndex + 1}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
          ),
        ),
        const SizedBox(width: 6),
        Text(
          title,
          style: TextStyle(
            fontSize: 10,
            fontWeight: isCurrent ? FontWeight.bold : FontWeight.normal,
            color: isCurrent ? Colors.white : DriverColors.textMuted,
          ),
        ),
      ],
    );
  }

  Widget _buildStepDivider(int stepIndex) {
    final isDone = _currentStep > stepIndex;
    return Expanded(
      child: Container(
        height: 2,
        margin: const EdgeInsets.symmetric(horizontal: 6),
        color: isDone ? DriverColors.primary : DriverColors.border,
      ),
    );
  }

  // Step 1: Personal Info
  Widget _buildStep1PersonalInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('1. بيانات الكابتن الشخصية 👤', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Colors.white)),
        const SizedBox(height: 4),
        const Text('أدخل بياناتك تماماً كما هي مسجلة في بطاقة الرقم القومي المصرية.', style: TextStyle(fontSize: 11, color: DriverColors.textSecondary)),
        const SizedBox(height: 20),

        _buildTextField('الاسم الرباعي الكامل:', _nameController, 'مثال: محمود السيد إبراهيم علي', Icons.person),
        const SizedBox(height: 14),

        _buildTextField('الرقم القومي (14 رقماً):', _nationalIdController, '29510150104892', Icons.badge, isNumber: true, maxLength: 14),
        const SizedBox(height: 14),

        const Text('منطقة ونطاق العمل الأساسي:', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: DriverColors.textSecondary)),
        const SizedBox(height: 6),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 14),
          decoration: BoxDecoration(
            color: DriverColors.surface,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: DriverColors.border),
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<String>(
              value: _regData.city,
              isExpanded: true,
              dropdownColor: DriverColors.surface,
              items: _cities.map((c) => DropdownMenuItem(value: c, child: Text(c, style: const TextStyle(fontSize: 12, color: Colors.white)))).toList(),
              onChanged: (val) {
                if (val != null) setState(() => _regData.city = val);
              },
            ),
          ),
        ),
        const SizedBox(height: 14),

        _buildTextField('اسم جهة اتصال الطوارئ (شقيق / قريب):', _emergencyNameController, 'أحمد السيد (شقيق)', Icons.contact_phone),
        const SizedBox(height: 14),

        _buildTextField('رقم هاتف الطوارئ:', _emergencyPhoneController, '01123456789', Icons.phone, isNumber: true),
      ],
    );
  }

  // Step 2: Vehicle Info
  Widget _buildStep2VehicleInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('2. بيانات وفئة المركبة 🚗', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Colors.white)),
        const SizedBox(height: 4),
        const Text('حدد فئة السيارة وموديلها وأرقام اللوحات المعدنية للربط.', style: TextStyle(fontSize: 11, color: DriverColors.textSecondary)),
        const SizedBox(height: 20),

        const Text('نوع وفئة المركبة:', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: DriverColors.textSecondary)),
        const SizedBox(height: 6),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 14),
          decoration: BoxDecoration(
            color: DriverColors.surface,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: DriverColors.border),
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<String>(
              value: _regData.vehicleType,
              isExpanded: true,
              dropdownColor: DriverColors.surface,
              items: _vehicleTypes.map((v) => DropdownMenuItem(value: v, child: Text(v, style: const TextStyle(fontSize: 12, color: Colors.white)))).toList(),
              onChanged: (val) {
                if (val != null) setState(() => _regData.vehicleType = val);
              },
            ),
          ),
        ),
        const SizedBox(height: 14),

        _buildTextField('الماركة، الموديل، وسنة الصنع:', _makeModelController, 'مثال: نيسان صني 2023', Icons.directions_car),
        const SizedBox(height: 14),

        // Plate Letters & Numbers
        const Text('بيانات اللوحة المعدنية:', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: DriverColors.textSecondary)),
        const SizedBox(height: 6),
        Row(
          children: [
            Expanded(
              flex: 3,
              child: _buildTextField('حروف اللوحة:', _plateLettersController, 'أ ب ج', Icons.text_fields),
            ),
            const SizedBox(width: 10),
            Expanded(
              flex: 3,
              child: _buildTextField('أرقام اللوحة:', _plateNumbersController, '1234', Icons.numbers, isNumber: true),
            ),
          ],
        ),
        const SizedBox(height: 14),

        const Text('لون السيارة الخارجي:', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: DriverColors.textSecondary)),
        const SizedBox(height: 6),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 14),
          decoration: BoxDecoration(
            color: DriverColors.surface,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: DriverColors.border),
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<String>(
              value: _regData.carColor,
              isExpanded: true,
              dropdownColor: DriverColors.surface,
              items: _colors.map((c) => DropdownMenuItem(value: c, child: Text(c, style: const TextStyle(fontSize: 12, color: Colors.white)))).toList(),
              onChanged: (val) {
                if (val != null) setState(() => _regData.carColor = val);
              },
            ),
          ),
        ),
      ],
    );
  }

  // Step 3: Payout Info
  Widget _buildStep3PayoutInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('3. إعدادات استلام الأرباح 💳', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Colors.white)),
        const SizedBox(height: 4),
        const Text('حدد وسيلة سداد العمولات واستلام أرباح الرحلات والمكافآت.', style: TextStyle(fontSize: 11, color: DriverColors.textSecondary)),
        const SizedBox(height: 20),

        // Payout Options
        _buildPayoutOption(
          'INSTAPAY',
          '⚡ إنستاباي InstaPay (تحويل بنكي لحظي فوري)',
          'mahmoud@instapay أو رقم الهاتف المسجل بالبنك',
        ),
        const SizedBox(height: 10),
        _buildPayoutOption(
          'VODAFONE_CASH',
          '📱 فودافون كاش / محافظ المحمول الإلكترونية',
          'رقم المحفظة (010xxxxxxxx)',
        ),
        const SizedBox(height: 10),
        _buildPayoutOption(
          'BANK',
          '🏦 الحساب البنكي المباشر (IBAN)',
          'رقم الحساب الدولي المكون من 29 حرفاً ورقم',
        ),

        const SizedBox(height: 20),

        _buildTextField('عنوان الحساب / رقم المحفظة:', _payoutAddressController, 'mahmoud@instapay', Icons.account_balance_wallet),
      ],
    );
  }

  Widget _buildPayoutOption(String type, String title, String subtitle) {
    final isSelected = (_regData.payoutType == type);
    return InkWell(
      onTap: () => setState(() => _regData.payoutType = type),
      borderRadius: BorderRadius.circular(14),
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: isSelected ? DriverColors.primary.withValues(alpha: 0.15) : DriverColors.surface,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: isSelected ? DriverColors.primary : DriverColors.border, width: isSelected ? 1.5 : 1),
        ),
        child: Row(
          children: [
            Icon(isSelected ? Icons.radio_button_checked : Icons.radio_button_off, color: isSelected ? DriverColors.primary : DriverColors.textMuted, size: 20),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                  const SizedBox(height: 2),
                  Text(subtitle, style: const TextStyle(fontSize: 10, color: DriverColors.textMuted)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTextField(String label, TextEditingController controller, String hint, IconData icon, {bool isNumber = false, int? maxLength}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: DriverColors.textSecondary)),
        const SizedBox(height: 6),
        TextField(
          controller: controller,
          keyboardType: isNumber ? TextInputType.number : TextInputType.text,
          maxLength: maxLength,
          style: const TextStyle(fontSize: 13, color: Colors.white),
          decoration: InputDecoration(
            counterText: '',
            hintText: hint,
            hintStyle: const TextStyle(color: DriverColors.textMuted, fontSize: 12),
            prefixIcon: Icon(icon, color: DriverColors.primary, size: 18),
            filled: true,
            fillColor: DriverColors.surface,
            contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: BorderSide.none),
          ),
        ),
      ],
    );
  }
}
