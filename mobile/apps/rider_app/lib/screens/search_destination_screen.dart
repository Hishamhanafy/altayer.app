import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/ride_models.dart';

class SearchDestinationScreen extends StatefulWidget {
  const SearchDestinationScreen({super.key});

  @override
  State<SearchDestinationScreen> createState() => _SearchDestinationScreenState();
}

class _SearchDestinationScreenState extends State<SearchDestinationScreen> {
  final TextEditingController _pickupController = TextEditingController(text: 'ميدان التحرير، وسط البلد');
  final TextEditingController _dropoffController = TextEditingController();

  final List<SavedPlace> _savedPlaces = const [
    SavedPlace(title: 'المنزل', address: 'شارع النصر، المعادي، القاهرة', icon: '🏠', lat: 29.9602, lng: 31.2569),
    SavedPlace(title: 'العمل', address: 'مبنى B2، القرية الذكية، الجيزة', icon: '💼', lat: 30.0731, lng: 31.0184),
    SavedPlace(title: 'سيتي ستارز مول', address: 'شارع عمر بن الخطاب، مدينة نصر', icon: '🛍️', lat: 30.0734, lng: 31.3468),
    SavedPlace(title: 'مطار القاهرة الدولي', address: 'مبنى الركاب 3، طريق المطار', icon: '✈️', lat: 30.1114, lng: 31.3995),
    SavedPlace(title: 'كايرو فيستيفال سيتي', address: 'الطريق الدائري، التجمع الخامس', icon: '🌟', lat: 30.0298, lng: 31.4069),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('تحديد وجهة المشوار'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_forward),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Column(
        children: [
          // Inputs Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: const BoxDecoration(
              color: AppColors.surface,
              borderRadius: BorderRadius.vertical(bottom: Radius.circular(24)),
            ),
            child: Column(
              children: [
                // Pickup Input
                Row(
                  children: [
                    Container(
                      width: 12,
                      height: 12,
                      decoration: const BoxDecoration(
                        color: AppColors.accentGreen,
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: TextField(
                        controller: _pickupController,
                        style: const TextStyle(fontSize: 13, color: AppColors.textPrimary),
                        decoration: InputDecoration(
                          hintText: 'موقع الانطلاق',
                          hintStyle: const TextStyle(color: AppColors.textMuted, fontSize: 12),
                          filled: true,
                          fillColor: AppColors.surfaceLight,
                          contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: BorderSide.none,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                // Dropoff Input
                Row(
                  children: [
                    Container(
                      width: 12,
                      height: 12,
                      decoration: const BoxDecoration(
                        color: AppColors.primary,
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: TextField(
                        controller: _dropoffController,
                        autofocus: true,
                        style: const TextStyle(fontSize: 13, color: AppColors.textPrimary),
                        decoration: InputDecoration(
                          hintText: 'إلى أين تريد الذهاب؟ (اكتب الوجهة)',
                          hintStyle: const TextStyle(color: AppColors.textMuted, fontSize: 12),
                          filled: true,
                          fillColor: AppColors.surfaceLight,
                          contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: const BorderSide(color: AppColors.primary, width: 1),
                          ),
                        ),
                        onSubmitted: (val) {
                          if (val.trim().isNotEmpty) {
                            Navigator.pop(context, val);
                          }
                        },
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),

          // Saved / Recent Places List
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                const Text(
                  'الأماكن المحفوظة والمقترحة في القاهرة',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.textSecondary),
                ),
                const SizedBox(height: 12),
                ..._savedPlaces.map((place) => _buildPlaceItem(place)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPlaceItem(SavedPlace place) {
    return InkWell(
      onTap: () {
        Navigator.pop(context, place.title);
      },
      borderRadius: BorderRadius.circular(14),
      child: Container(
        margin: const EdgeInsets.only(bottom: 8),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: AppColors.border.withValues(alpha: 0.5)),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: AppColors.surfaceLight,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(place.icon, style: const TextStyle(fontSize: 20)),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    place.title,
                    style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    place.address,
                    style: const TextStyle(fontSize: 11, color: AppColors.textMuted),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
            const Icon(Icons.chevron_left, color: AppColors.textMuted, size: 20),
          ],
        ),
      ),
    );
  }
}
