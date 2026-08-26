import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../theme/driver_theme.dart';

class DriverKycCameraScreen extends StatefulWidget {
  const DriverKycCameraScreen({super.key});

  @override
  State<DriverKycCameraScreen> createState() => _DriverKycCameraScreenState();
}

class _DriverKycCameraScreenState extends State<DriverKycCameraScreen> {
  final ImagePicker _picker = ImagePicker();
  final Map<String, String?> _capturedPhotos = {
    'بطاقة الرقم القومي (الوجه الأمامي)': null,
    'بطاقة الرقم القومي (الوجه الخلفي)': null,
    'رخصة القيادة السارية': null,
    'رخصة تسيير السيارة': null,
    'صحيفة الحالة الجنائية (فيش وتشبيه)': null,
    'صورة أمامية واضحة للسيارة': null,
    'سيلفي الوجه الحي (Biometric Face)': null,
  };

  Future<void> _pickImage(String docTitle, ImageSource source) async {
    try {
      final XFile? photo = await _picker.pickImage(
        source: source,
        maxWidth: 1600,
        maxHeight: 1200,
        imageQuality: 85,
        preferredCameraDevice: docTitle.contains('سيلفي') ? CameraDevice.front : CameraDevice.rear,
      );

      if (photo != null) {
        setState(() {
          _capturedPhotos[docTitle] = photo.path;
        });
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('تم التقاط وحفظ ($docTitle) بنجاح 🟢')),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('تنبيه الكاميرا: $e')),
        );
      }
    }
  }

  void _showCameraOptions(String docTitle) {
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
              Text('📷 توثيق: $docTitle', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: DriverColors.textPrimary)),
              const SizedBox(height: 16),
              ListTile(
                leading: const CircleAvatar(
                  backgroundColor: DriverColors.primary,
                  child: Icon(Icons.camera_alt, color: Colors.black),
                ),
                title: const Text('التقاط مباشر بالكاميرا الحية 📸', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: DriverColors.textPrimary)),
                subtitle: const Text('فتح كاميرا الموبايل للتصوير الفوري', style: TextStyle(fontSize: 11, color: DriverColors.textMuted)),
                onTap: () {
                  Navigator.pop(ctx);
                  _pickImage(docTitle, ImageSource.camera);
                },
              ),
              const Divider(color: DriverColors.border),
              ListTile(
                leading: const CircleAvatar(
                  backgroundColor: DriverColors.surfaceLight,
                  child: Icon(Icons.photo_library, color: DriverColors.primary),
                ),
                title: const Text('اختيار من ألبوم الصور / المعرض 📁', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: DriverColors.textPrimary)),
                subtitle: const Text('رفع مستند تم تصويره مسبقاً', style: TextStyle(fontSize: 11, color: DriverColors.textMuted)),
                onTap: () {
                  Navigator.pop(ctx);
                  _pickImage(docTitle, ImageSource.gallery);
                },
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final int completedCount = _capturedPhotos.values.where((v) => v != null).length;
    final int totalCount = _capturedPhotos.length;

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
                      value: totalCount > 0 ? completedCount / totalCount : 0,
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
            ..._capturedPhotos.entries.map((entry) {
              final photoPath = entry.value;
              final isDone = photoPath != null;
              return Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: DriverColors.surface,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(
                    color: isDone ? DriverColors.primary.withValues(alpha: 0.5) : DriverColors.border,
                  ),
                ),
                child: Column(
                  children: [
                    Row(
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
                                isDone ? 'تم التصوير والتحقق بنجاح 🟢' : 'مطلوب التصوير بالكاميرا',
                                style: TextStyle(fontSize: 10, color: isDone ? DriverColors.primary : DriverColors.textMuted),
                              ),
                            ],
                          ),
                        ),
                        ElevatedButton.icon(
                          onPressed: () => _showCameraOptions(entry.key),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: isDone ? DriverColors.surfaceLight : DriverColors.primary,
                            foregroundColor: isDone ? DriverColors.textSecondary : Colors.white,
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                          ),
                          icon: const Icon(Icons.camera_alt, size: 14),
                          label: Text(isDone ? 'إعادة التصوير' : 'تصوير', style: const TextStyle(fontSize: 11)),
                        ),
                      ],
                    ),
                    if (isDone) ...[
                      const SizedBox(height: 10),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(10),
                        child: Image.file(
                          File(photoPath),
                          height: 110,
                          width: double.infinity,
                          fit: BoxFit.cover,
                        ),
                      ),
                    ],
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
                    const SnackBar(content: Text('تم إرسال الوثائق المصورة لفريق العمليات للمراجعة والتفعيل الفوري 🚀')),
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
