import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/ride_models.dart';

class TripSummaryRatingScreen extends StatefulWidget {
  final DriverBid bid;
  final String destination;

  const TripSummaryRatingScreen({
    super.key,
    required this.bid,
    required this.destination,
  });

  @override
  State<TripSummaryRatingScreen> createState() => _TripSummaryRatingScreenState();
}

class _TripSummaryRatingScreenState extends State<TripSummaryRatingScreen> {
  int _rating = 5;
  int _selectedTip = 0;
  final Set<String> _selectedCompliments = {'سائق محترف', 'سيارة نظيفة ومريحة'};

  final List<String> _complimentsList = const [
    'سائق محترف',
    'سيارة نظيفة ومريحة',
    'قيادة آمنة وهادئة',
    'التزام تام بالموعد',
    'محادثة لطيفة ومحترمة',
    'طريق سريع ومختصر',
  ];

  @override
  Widget build(BuildContext context) {
    const int discount = 20;
    final int finalAmount = (widget.bid.fare - discount > 0 ? widget.bid.fare - discount : widget.bid.fare) + _selectedTip;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('تفاصيل الرحلة والتقييم 🏁'),
        automaticallyImplyLeading: false,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(18),
        child: Column(
          children: [
            // Success Header
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.accentGreen.withValues(alpha: 0.4)),
              ),
              child: Column(
                children: [
                  const Text('🎉', style: TextStyle(fontSize: 36)),
                  const SizedBox(height: 6),
                  const Text(
                    'وصلت بالسلامة وجهتك!',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: AppColors.textPrimary),
                  ),
                  Text(
                    widget.destination,
                    style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                  ),
                  const Divider(color: AppColors.border, height: 24),
                  // Receipt breakdown
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('الأجرة المتفق عليها:', style: TextStyle(fontSize: 12, color: AppColors.textMuted)),
                      Text('${widget.bid.fare}.00 ج.م', style: const TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                    ],
                  ),
                  const SizedBox(height: 4),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('خصم الكوبون (ALTAYER50):', style: TextStyle(fontSize: 12, color: AppColors.accentGreen)),
                      Text('-$discount.00 ج.م', style: TextStyle(fontSize: 12, color: AppColors.accentGreen, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  if (_selectedTip > 0) ...[
                    const SizedBox(height: 4),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('إكرامية الكابتن:', style: TextStyle(fontSize: 12, color: AppColors.accentAmber)),
                        Text('+$_selectedTip.00 ج.م', style: const TextStyle(fontSize: 12, color: AppColors.accentAmber, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ],
                  const Divider(color: AppColors.border, height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('المبلغ المطلوب سداده كاش:', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.textPrimary)),
                      Text('$finalAmount.00 ج.م', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: AppColors.primary)),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 18),

            // Rating Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.border),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(widget.bid.avatar, style: const TextStyle(fontSize: 20)),
                      const SizedBox(width: 8),
                      Text('كيف كانت رحلتك مع ${widget.bid.driverName}؟', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.textPrimary)),
                    ],
                  ),
                  const SizedBox(height: 12),
                  // Star Rating
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(5, (index) {
                      final starIndex = index + 1;
                      return IconButton(
                        onPressed: () => setState(() => _rating = starIndex),
                        icon: Icon(
                          starIndex <= _rating ? Icons.star : Icons.star_border,
                          color: AppColors.accentAmber,
                          size: 32,
                        ),
                      );
                    }),
                  ),
                  const SizedBox(height: 12),
                  // Compliment Chips
                  const Align(
                    alignment: Alignment.centerRight,
                    child: Text('أوسمة الإشادة بالكابتن:', style: TextStyle(fontSize: 11, color: AppColors.textMuted)),
                  ),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 6,
                    runSpacing: 6,
                    children: _complimentsList.map((comp) {
                      final isSelected = _selectedCompliments.contains(comp);
                      return FilterChip(
                        selected: isSelected,
                        label: Text(comp, style: TextStyle(fontSize: 11, color: isSelected ? Colors.white : AppColors.textSecondary)),
                        backgroundColor: AppColors.surfaceLight,
                        selectedColor: AppColors.primary,
                        checkmarkColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        onSelected: (val) {
                          setState(() {
                            if (val) {
                              _selectedCompliments.add(comp);
                            } else {
                              _selectedCompliments.remove(comp);
                            }
                          });
                        },
                      );
                    }).toList(),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 18),

            // Driver Tip Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    children: [
                      Text('☕', style: TextStyle(fontSize: 18)),
                      SizedBox(width: 8),
                      Text('إكرامية إضافية للكابتن (اختياري)', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.textPrimary)),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [0, 5, 10, 20].map((tip) {
                      final isSelected = (_selectedTip == tip);
                      return Expanded(
                        child: Container(
                          margin: const EdgeInsets.symmetric(horizontal: 3),
                          child: OutlinedButton(
                            onPressed: () => setState(() => _selectedTip = tip),
                            style: OutlinedButton.styleFrom(
                              backgroundColor: isSelected ? AppColors.accentAmber.withValues(alpha: 0.2) : AppColors.surfaceLight,
                              side: BorderSide(color: isSelected ? AppColors.accentAmber : AppColors.border),
                              padding: const EdgeInsets.symmetric(vertical: 8),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                            ),
                            child: Text(
                              tip == 0 ? 'بدون' : '+$tip ج',
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.bold,
                                color: isSelected ? AppColors.accentAmber : AppColors.textSecondary,
                              ),
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Submit Button
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.popUntil(context, (route) => route.isFirst);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('شكراً لتقييمك! نتمنى لك يوماً سعيداً عالطاير ⚡')),
                  );
                },
                child: const Text('إرسال التقييم والعودة للرئيسية', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
