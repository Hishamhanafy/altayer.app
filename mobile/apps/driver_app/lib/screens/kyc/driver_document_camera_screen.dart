import 'package:flutter/material.dart';
import '../../theme/driver_theme.dart';
import '../../models/driver_kyc_models.dart';

class DriverDocumentCameraScreen extends StatefulWidget {
  final KycDocType docType;

  const DriverDocumentCameraScreen({
    super.key,
    required this.docType,
  });

  @override
  State<DriverDocumentCameraScreen> createState() => _DriverDocumentCameraScreenState();
}

class _DriverDocumentCameraScreenState extends State<DriverDocumentCameraScreen> {
  bool _isCaptured = false;
  bool _flashOn = false;
  final TextEditingController _expiryDateController = TextEditingController(text: '2028-10-15');

  @override
  Widget build(BuildContext context) {
    final bool isSelfie = widget.docType == KycDocType.captainSelfie;
    final bool hasExpiry = widget.docType == KycDocType.driverLicenseFront || widget.docType == KycDocType.carLicenseFront;

    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: Text(widget.docType.title, style: const TextStyle(fontSize: 14)),
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          IconButton(
            icon: Icon(_flashOn ? Icons.flash_on : Icons.flash_off, color: _flashOn ? DriverColors.accentAmber : Colors.white),
            onPressed: () => setState(() => _flashOn = !_flashOn),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Instructions Banner
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
              color: DriverColors.surface.withValues(alpha: 0.9),
              child: Row(
                children: [
                  const Icon(Icons.info_outline, color: DriverColors.primary, size: 18),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      widget.docType.instructions,
                      style: const TextStyle(fontSize: 11, color: DriverColors.textSecondary),
                    ),
                  ),
                ],
              ),
            ),

            // Camera Viewport & Frame Guideline Overlay
            Expanded(
              child: Stack(
                alignment: Alignment.center,
                children: [
                  // Simulated Camera Feed or Captured Image
                  Container(
                    width: double.infinity,
                    color: const Color(0xFF0F172A),
                    child: Center(
                      child: _isCaptured
                          ? Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Container(
                                  width: 220,
                                  height: 140,
                                  decoration: BoxDecoration(
                                    color: DriverColors.surfaceLight,
                                    borderRadius: BorderRadius.circular(16),
                                    border: Border.all(color: DriverColors.primary, width: 2),
                                  ),
                                  child: Center(
                                    child: Column(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: [
                                        Text(widget.docType.icon, style: const TextStyle(fontSize: 40)),
                                        const SizedBox(height: 6),
                                        const Text('تم التقاط الصورة بدقة ووضوح 🟢', style: TextStyle(fontSize: 11, color: DriverColors.primary, fontWeight: FontWeight.bold)),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            )
                          : Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(isSelfie ? Icons.face : Icons.document_scanner, size: 64, color: Colors.white24),
                                const SizedBox(height: 12),
                                Text(
                                  isSelfie ? 'ضع وجهك داخل الإطار الدائري' : 'ضع الوثيقة داخل الإطار المستطيل',
                                  style: const TextStyle(fontSize: 12, color: Colors.white54),
                                ),
                              ],
                            ),
                    ),
                  ),

                  // Framing Box Overlay
                  if (!_isCaptured)
                    Container(
                      width: isSelfie ? 240 : 320,
                      height: isSelfie ? 240 : 200,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(isSelfie ? 120 : 18),
                        border: Border.all(color: DriverColors.primary, width: 2.5),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withValues(alpha: 0.6),
                            blurRadius: 200,
                            spreadRadius: 80,
                          ),
                        ],
                      ),
                    ),
                ],
              ),
            ),

            // Expiry Date (if applicable) & Action Controls
            Container(
              padding: const EdgeInsets.all(20),
              color: DriverColors.surface,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (_isCaptured && hasExpiry) ...[
                    Row(
                      children: [
                        const Icon(Icons.event, color: DriverColors.primary, size: 18),
                        const SizedBox(width: 8),
                        const Text('تاريخ انتهاء سريان الوثيقة:', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
                        const SizedBox(width: 10),
                        Expanded(
                          child: TextField(
                            controller: _expiryDateController,
                            style: const TextStyle(fontSize: 12, color: Colors.white, fontWeight: FontWeight.bold),
                            decoration: InputDecoration(
                              filled: true,
                              fillColor: DriverColors.background,
                              contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: BorderSide.none),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 14),
                  ],

                  if (!_isCaptured) ...[
                    // Capture Shutter Button
                    GestureDetector(
                      onTap: () => setState(() => _isCaptured = true),
                      child: Container(
                        width: 70,
                        height: 70,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: Colors.white, width: 4),
                          color: DriverColors.primary,
                        ),
                        child: const Center(
                          child: Icon(Icons.camera_alt, color: Colors.white, size: 30),
                        ),
                      ),
                    ),
                  ] else ...[
                    // Confirmation & Retake Buttons
                    Row(
                      children: [
                        Expanded(
                          child: OutlinedButton.icon(
                            onPressed: () => setState(() => _isCaptured = false),
                            icon: const Icon(Icons.refresh),
                            label: const Text('إعادة التصوير'),
                            style: OutlinedButton.styleFrom(
                              foregroundColor: Colors.white,
                              side: const BorderSide(color: DriverColors.border),
                              padding: const EdgeInsets.symmetric(vertical: 12),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          flex: 2,
                          child: ElevatedButton.icon(
                            onPressed: () {
                              Navigator.pop(context, {
                                'imagePath': 'mock://docs/${widget.docType.name}.jpg',
                                'expiryDate': hasExpiry ? _expiryDateController.text : null,
                              });
                            },
                            icon: const Icon(Icons.check),
                            label: const Text('تأكيد وحفظ الوثيقة 🟢', style: TextStyle(fontWeight: FontWeight.w900)),
                          ),
                        ),
                      ],
                    ),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
