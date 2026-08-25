import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/ride_models.dart';
import 'trip_summary_rating_screen.dart';

class InTripTrackingScreen extends StatefulWidget {
  final DriverBid bid;
  final String destination;

  const InTripTrackingScreen({
    super.key,
    required this.bid,
    required this.destination,
  });

  @override
  State<InTripTrackingScreen> createState() => _InTripTrackingScreenState();
}

class _InTripTrackingScreenState extends State<InTripTrackingScreen> {
  String _tripStatus = 'ARRIVING'; // ARRIVING, IN_PROGRESS, COMPLETED
  final String _safetyPin = '8492';
  final List<String> _chatMessages = [
    'كابتن محمود: أنا في طريقي إليك، دقيقتين وأصل.',
  ];
  final TextEditingController _chatController = TextEditingController();

  void _showChatBottomSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            return Padding(
              padding: EdgeInsets.only(
                bottom: MediaQuery.of(context).viewInsets.bottom,
                left: 16,
                right: 16,
                top: 16,
              ),
              child: SizedBox(
                height: 400,
                child: Column(
                  children: [
                    Container(
                      width: 36,
                      height: 4,
                      decoration: BoxDecoration(
                        color: AppColors.border,
                        borderRadius: BorderRadius.circular(4),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Text(widget.bid.avatar, style: const TextStyle(fontSize: 22)),
                        const SizedBox(width: 8),
                        Text(
                          'المحادثة مع ${widget.bid.driverName}',
                          style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                        ),
                      ],
                    ),
                    const Divider(color: AppColors.border),
                    // Messages
                    Expanded(
                      child: ListView(
                        children: _chatMessages.map((msg) {
                          return Container(
                            margin: const EdgeInsets.symmetric(vertical: 4),
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: AppColors.surfaceLight,
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Text(msg, style: const TextStyle(fontSize: 12, color: AppColors.textPrimary)),
                          );
                        }).toList(),
                      ),
                    ),
                    // Quick replies
                    Row(
                      children: [
                        _buildQuickReply('أنا في انتظارك بالخارج', setModalState),
                        const SizedBox(width: 6),
                        _buildQuickReply('أمام البوابة الرئيسية', setModalState),
                      ],
                    ),
                    const SizedBox(height: 8),
                    // Input Bar
                    Row(
                      children: [
                        Expanded(
                          child: TextField(
                            controller: _chatController,
                            style: const TextStyle(fontSize: 13, color: AppColors.textPrimary),
                            decoration: InputDecoration(
                              hintText: 'اكتب رسالة للكابتن...',
                              hintStyle: const TextStyle(color: AppColors.textMuted, fontSize: 12),
                              filled: true,
                              fillColor: AppColors.surfaceLight,
                              contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12),
                                borderSide: BorderSide.none,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        IconButton(
                          icon: const Icon(Icons.send, color: AppColors.primary),
                          onPressed: () {
                            if (_chatController.text.trim().isNotEmpty) {
                              setModalState(() {
                                _chatMessages.add('أنت: ${_chatController.text.trim()}');
                              });
                              _chatController.clear();
                            }
                          },
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildQuickReply(String text, StateSetter setModalState) {
    return InkWell(
      onTap: () {
        setModalState(() {
          _chatMessages.add('أنت: $text');
        });
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
        decoration: BoxDecoration(
          color: AppColors.border.withValues(alpha: 0.4),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Text(text, style: const TextStyle(fontSize: 10, color: AppColors.textSecondary)),
      ),
    );
  }

  void _showSosDialog() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.surface,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Row(
          children: [
            Text('🚨', style: TextStyle(fontSize: 22)),
            SizedBox(width: 8),
            Text('مركز الطوارئ والأمان (SOS)', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.accentRed)),
          ],
        ),
        content: const Text(
          'يمكنك الاتصال الفوري بشرطة النجدة (122) أو مشاركة موقعك اللحظي وتفاصيل السيارة مع جهات اتصال الطوارئ.',
          style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('إلغاء', style: TextStyle(color: AppColors.textMuted)),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(ctx);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('تم إرسال إشعار الطوارئ وموقعك الحالي بنجاح 🚨')),
              );
            },
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.accentRed),
            child: const Text('اتصال بالطوارئ (122)', style: TextStyle(fontSize: 12, color: Colors.white)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Stack(
        children: [
          // Map Background Representation
          Column(
            children: [
              Expanded(
                flex: 5,
                child: Container(
                  color: const Color(0xFF0B132B),
                  child: Stack(
                    children: [
                      Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              padding: const EdgeInsets.all(14),
                              decoration: BoxDecoration(
                                color: AppColors.primary.withValues(alpha: 0.2),
                                shape: BoxShape.circle,
                              ),
                              child: const Icon(Icons.navigation, color: AppColors.primary, size: 36),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              _tripStatus == 'ARRIVING'
                                  ? 'الكابتن في طريقه إليك (يبعد ${widget.bid.etaMinutes} دقائق)'
                                  : 'أنت الآن في الطريق إلى: ${widget.destination}',
                              style: const TextStyle(fontSize: 13, color: AppColors.textPrimary, fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                      ),
                      // Top Floating Bar (SOS & Share)
                      Positioned(
                        top: 50,
                        left: 16,
                        right: 16,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            GestureDetector(
                              onTap: _showSosDialog,
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                                decoration: BoxDecoration(
                                  color: AppColors.accentRed.withValues(alpha: 0.9),
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: const Row(
                                  children: [
                                    Text('🚨', style: TextStyle(fontSize: 14)),
                                    SizedBox(width: 4),
                                    Text('SOS طوارئ', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 11)),
                                  ],
                                ),
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                              decoration: BoxDecoration(
                                color: AppColors.surface.withValues(alpha: 0.9),
                                borderRadius: BorderRadius.circular(20),
                                border: Border.all(color: AppColors.border),
                              ),
                              child: const Row(
                                children: [
                                  Icon(Icons.share, color: AppColors.accentGreen, size: 14),
                                  SizedBox(width: 4),
                                  Text('مشاركة المشوار', style: TextStyle(color: AppColors.accentGreen, fontWeight: FontWeight.bold, fontSize: 11)),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const Expanded(flex: 5, child: SizedBox()),
            ],
          ),

          // Bottom Slide Sheet
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              padding: const EdgeInsets.all(18),
              decoration: const BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
                boxShadow: [
                  BoxShadow(color: Colors.black45, blurRadius: 20, offset: Offset(0, -5)),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Safety OTP PIN Banner
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceLight,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.primary.withValues(alpha: 0.5)),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('كود أمان المشوار (OTP)', style: TextStyle(fontSize: 11, color: AppColors.textMuted)),
                            Text('أعطِ هذا الكود للكابتن عند ركوب السيارة', style: TextStyle(fontSize: 10, color: AppColors.textSecondary)),
                          ],
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppColors.primary.withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Text(
                            _safetyPin,
                            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, letterSpacing: 2, color: AppColors.primary),
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 14),

                  // Driver Details
                  Row(
                    children: [
                      Container(
                        width: 50,
                        height: 50,
                        decoration: BoxDecoration(
                          color: AppColors.surfaceLight,
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Center(child: Text(widget.bid.avatar, style: const TextStyle(fontSize: 26))),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(widget.bid.driverName, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.textPrimary)),
                            const SizedBox(height: 2),
                            Text('${widget.bid.carModel} • ${widget.bid.plateNumber}', style: const TextStyle(fontSize: 11, color: AppColors.textMuted)),
                          ],
                        ),
                      ),
                      // Chat & Call Actions
                      Row(
                        children: [
                          IconButton(
                            onPressed: _showChatBottomSheet,
                            icon: const Icon(Icons.chat_bubble_outline, color: AppColors.accentBlue),
                          ),
                          IconButton(
                            onPressed: () {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(content: Text('جاري الاتصال الآمن بالكابتن 📞')),
                              );
                            },
                            icon: const Icon(Icons.phone, color: AppColors.accentGreen),
                          ),
                        ],
                      ),
                    ],
                  ),

                  const SizedBox(height: 16),

                  // Progress Toggle & Finish Simulation
                  SizedBox(
                    width: double.infinity,
                    height: 48,
                    child: ElevatedButton(
                      onPressed: () {
                        if (_tripStatus == 'ARRIVING') {
                          setState(() => _tripStatus = 'IN_PROGRESS');
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text('بدأت الرحلة الآن مع الكابتن 🚗')),
                          );
                        } else {
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                              builder: (_) => TripSummaryRatingScreen(
                                bid: widget.bid,
                                destination: widget.destination,
                              ),
                            ),
                          );
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: _tripStatus == 'ARRIVING' ? AppColors.accentGreen : AppColors.primary,
                      ),
                      child: Text(
                        _tripStatus == 'ARRIVING' ? 'تأكيد ركوب السيارة وبدء الرحلة' : 'إنهاء الرحلة والانتقال للتقييم والدفع 🏁',
                        style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
