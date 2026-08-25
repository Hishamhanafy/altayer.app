import 'package:flutter/material.dart';
import '../theme/driver_theme.dart';

class DriverKycCameraScreen extends StatefulWidget {
  const DriverKycCameraScreen({super.key});

  @override
  State<DriverKycCameraScreen> createState() => _DriverKycCameraScreenState();
}

class _DriverKycCameraScreenState extends State<DriverKycCameraScreen> {
  final Map<String, bool> _uploadedDocs = {
    'بطاقة الرقم القومي (الوجه الأمامي)': true,
    'بطاقة الرقم القومي (الوجه الخلفي)': true,
    'رخصة القيادة السارية': true,
    'رخصة تسيير السيارة': false,
    'صحيفة الحالة الجنائية (فيش وتشبيه)': false,
    'صورة أمامية واضحة للسيارة': false,
  };

  void _simulateCaptureDoc(String docTitle) {
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
              Text('📷 تصوير وثيقة: $docTitle', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: DriverColors.textPrimary)),
              const SizedBox(height: 12),
              Container(
                height: 140,
                width: double.infinity,
                decoration: BoxDecoration(
                  color: DriverColors.surfaceLight,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: DriverColors.border, style: BorderStyle.solid),
                ),
                child: const Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.camera_alt, size: 40, color: DriverColors.primary),
                      SizedBox(height: 6),
                      Text('ضع الوثيقة داخل الإطار واضغط تصوير', style: TextStyle(fontSize: 11, color: DriverColors.textMuted)),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () {
                    setState(() {
                      _uploadedDocs[docTitle] = true;
                    });
                    Navigator.pop(ctx);
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('تم مسح وتصوير ($docTitle) بنجاح 🟢')),
                    );
                  },
                  icon: const Icon(Icons.check),
                  label: const Text('التقاط الصورة وتأكيد الوضوح'),
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
    final int completedCount = _uploadedDocs.values.where((v) => v).length;
    final int totalCount = _uploadedDocs.length;

    return Scaffold(
      backgroundColor: DriverColors.background,
      appBar: AppBar(
        title: const Text('توثيق وثائق وبيانات الكابتن 📄'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_forward),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header Progress Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: DriverColors.surface,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: DriverColors.primary.withValues(alpha: 0.4)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('اكتمال ملف التوثيق (KYC)', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: DriverColors.textPrimary)),
                      Text('$completedCount من $totalCount وثائق', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.primary)),
                    ],
                  ),
                  const SizedBox(height: 8),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: LinearProgressIndicator(
                      value: completedCount / totalCount,
                      backgroundColor: DriverColors.surfaceLight,
                      valueColor: const AlwaysStoppedAnimation<Color>(DriverColors.primary),
                      minHeight: 6,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 18),

            const Text(
              'الوثائق المطلوبة للتفعيل الفوري:',
              style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.textSecondary),
            ),
            const SizedBox(height: 10),

            // Docs Checklist
            ..._uploadedDocs.entries.map((entry) {
              final isDone = entry.value;
              return Container(
                margin: const EdgeInsets.only(bottom: 10),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: DriverColors.surface,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(
                    color: isDone ? DriverColors.primary.withValues(alpha: 0.5) : DriverColors.border,
                  ),
                ),
                child: Row(
                  children: [
                    Icon(
                      isDone ? Icons.check_circle : Icons.circle_outlined,
                      color: isDone ? DriverColors.primary : DriverColors.textMuted,
                      size: 22,
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            entry.key,
                            style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.textPrimary),
                          ),
                          Text(
                            isDone ? 'تم التصوير والتحقق' : 'مطلوب التصوير بالكاميرا',
                            style: TextStyle(fontSize: 10, color: isDone ? DriverColors.primary : DriverColors.textMuted),
                          ),
                        ],
                      ),
                    ),
                    ElevatedButton(
                      onPressed: () => _simulateCaptureDoc(entry.key),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: isDone ? DriverColors.surfaceLight : DriverColors.primary,
                        foregroundColor: isDone ? DriverColors.textSecondary : Colors.white,
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      ),
                      child: Text(isDone ? 'تعديل' : 'تصوير', style: const TextStyle(fontSize: 11)),
                    ),
                  ],
                ),
              );
            }),

            const SizedBox(height: 20),

            // Submit for Verification Button
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('تم إرسال الوثائق لفريق العمليات للمراجعة والتفعيل الفوري 🚀')),
                  );
                },
                child: const Text('إرسال الوثائق للمراجعة والتفعيل', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w900)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
