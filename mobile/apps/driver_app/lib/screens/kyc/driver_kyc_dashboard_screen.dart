import 'package:flutter/material.dart';
import '../../theme/driver_theme.dart';
import '../../models/driver_kyc_models.dart';
import 'driver_document_camera_screen.dart';
import '../../main.dart';

class DriverKycDashboardScreen extends StatefulWidget {
  final CaptainRegistrationData? registrationData;

  const DriverKycDashboardScreen({
    super.key,
    this.registrationData,
  });

  @override
  State<DriverKycDashboardScreen> createState() => _DriverKycDashboardScreenState();
}

class _DriverKycDashboardScreenState extends State<DriverKycDashboardScreen> {
  late final List<KycDocumentItem> _documents;

  @override
  void initState() {
    super.initState();
    // Default initial mock statuses
    _documents = [
      KycDocumentItem(type: KycDocType.nationalIdFront, status: KycStatus.approved, expiryDate: '2030-05-12'),
      KycDocumentItem(type: KycDocType.nationalIdBack, status: KycStatus.approved),
      KycDocumentItem(type: KycDocType.captainSelfie, status: KycStatus.approved),
      KycDocumentItem(type: KycDocType.driverLicenseFront, status: KycStatus.approved, expiryDate: '2028-11-20'),
      KycDocumentItem(type: KycDocType.driverLicenseBack, status: KycStatus.approved),
      KycDocumentItem(type: KycDocType.criminalRecord, status: KycStatus.pendingReview),
      KycDocumentItem(type: KycDocType.carLicenseFront, status: KycStatus.approved, expiryDate: '2026-09-30'),
      KycDocumentItem(type: KycDocType.carLicenseBack, status: KycStatus.approved),
      KycDocumentItem(type: KycDocType.carFrontPhoto, status: KycStatus.approved),
      KycDocumentItem(type: KycDocType.carBackPhoto, status: KycStatus.approved),
      KycDocumentItem(type: KycDocType.carInteriorPhoto, status: KycStatus.approved),
    ];
  }

  void _openCameraForDoc(KycDocumentItem item) async {
    final result = await Navigator.push<Map<String, dynamic>>(
      context,
      MaterialPageRoute(
        builder: (_) => DriverDocumentCameraScreen(docType: item.type),
      ),
    );

    if (result != null) {
      setState(() {
        item.status = KycStatus.pendingReview;
        item.imagePath = result['imagePath'];
        if (result['expiryDate'] != null) {
          item.expiryDate = result['expiryDate'];
        }
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('تم رفع وتحديث (${item.type.title}) بنجاح 🟢')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final int uploadedCount = _documents.where((d) => d.status != KycStatus.notUploaded).length;
    final int totalDocs = _documents.length;
    final bool allDone = uploadedCount == totalDocs;

    return Scaffold(
      backgroundColor: DriverColors.background,
      appBar: AppBar(
        title: const Text('مركز توثيق الرخص والوثائق (KYC) 🛡️'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_forward),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Status Progress Header Banner
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: DriverColors.surface,
                borderRadius: const BorderRadius.vertical(bottom: Radius.circular(24)),
                border: Border.all(color: DriverColors.primary.withValues(alpha: 0.3)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('حالة ملف التوثيق الرسمي:', style: TextStyle(fontSize: 11, color: DriverColors.textMuted)),
                          Text(
                            allDone ? 'مكتمل وجاري التفعيل الفوري 🟢' : 'باقي استكمال بعض الوثائق ⚠️',
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w900,
                              color: allDone ? DriverColors.primary : DriverColors.accentOrange,
                            ),
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(
                          color: DriverColors.primary.withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          '$uploadedCount من $totalDocs وثائق',
                          style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.primary),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: LinearProgressIndicator(
                      value: uploadedCount / totalDocs,
                      backgroundColor: DriverColors.surfaceLight,
                      valueColor: const AlwaysStoppedAnimation<Color>(DriverColors.primary),
                      minHeight: 6,
                    ),
                  ),
                ],
              ),
            ),

            // Categorized Document List
            Expanded(
              child: ListView(
                padding: const EdgeInsets.all(16),
                children: [
                  _buildCategorySection('الهوية الشخصية والصورة الرسمية', [
                    _documents[0],
                    _documents[1],
                    _documents[2],
                  ]),
                  const SizedBox(height: 16),
                  _buildCategorySection('رخص القيادة والأمان الجنائي', [
                    _documents[3],
                    _documents[4],
                    _documents[5],
                  ]),
                  const SizedBox(height: 16),
                  _buildCategorySection('رخص وفحص وتصوير المركبة', [
                    _documents[6],
                    _documents[7],
                    _documents[8],
                    _documents[9],
                    _documents[10],
                  ]),
                ],
              ),
            ),

            // Bottom Action Trigger
            Container(
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(
                color: DriverColors.surface,
                borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
              ),
              child: SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton.icon(
                  onPressed: () {
                    Navigator.pushAndRemoveUntil(
                      context,
                      MaterialPageRoute(builder: (_) => const DriverMainHubScreen()),
                      (route) => false,
                    );
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('تم اعتماد وتفعيل الكابتن بنجاح! مرحباً بك في رحلات عالطاير 🚗⚡')),
                    );
                  },
                  icon: const Icon(Icons.check_circle_outline),
                  label: const Text('دخول لوحة الرادار والبدء بالقيادة 🚀', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w900)),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCategorySection(String title, List<KycDocumentItem> items) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: DriverColors.textSecondary)),
        const SizedBox(height: 8),
        ...items.map((item) => _buildDocTile(item)),
      ],
    );
  }

  Widget _buildDocTile(KycDocumentItem item) {
    final statusColor = item.status == KycStatus.approved
        ? DriverColors.primary
        : item.status == KycStatus.pendingReview
            ? DriverColors.accentAmber
            : item.status == KycStatus.needsAction
                ? DriverColors.accentRed
                : DriverColors.textMuted;

    final statusText = item.status == KycStatus.approved
        ? 'معتمد 🟢'
        : item.status == KycStatus.pendingReview
            ? 'قيد المراجعة ⏳'
            : item.status == KycStatus.needsAction
                ? 'مطلوب إعادة الرفع ⚠️'
                : 'لم يتم الرفع ⚪';

    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: DriverColors.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: item.status == KycStatus.approved ? DriverColors.primary.withValues(alpha: 0.3) : DriverColors.border),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: DriverColors.surfaceLight,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Text(item.type.icon, style: const TextStyle(fontSize: 18)),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  item.type.title,
                  style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 2),
                Row(
                  children: [
                    Text(statusText, style: TextStyle(fontSize: 10, color: statusColor, fontWeight: FontWeight.bold)),
                    if (item.expiryDate != null) ...[
                      const SizedBox(width: 8),
                      Text('• ساري حتى ${item.expiryDate}', style: const TextStyle(fontSize: 9, color: DriverColors.textMuted)),
                    ],
                  ],
                ),
              ],
            ),
          ),
          ElevatedButton(
            onPressed: () => _openCameraForDoc(item),
            style: ElevatedButton.styleFrom(
              backgroundColor: item.status == KycStatus.approved ? DriverColors.surfaceLight : DriverColors.primary,
              foregroundColor: item.status == KycStatus.approved ? DriverColors.textSecondary : Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
            child: Text(item.status == KycStatus.approved ? 'تحديث' : 'تصوير', style: const TextStyle(fontSize: 11)),
          ),
        ],
      ),
    );
  }
}
