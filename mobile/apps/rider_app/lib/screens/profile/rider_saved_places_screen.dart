import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/rider_user_models.dart';

class RiderSavedPlacesScreen extends StatefulWidget {
  const RiderSavedPlacesScreen({super.key});

  @override
  State<RiderSavedPlacesScreen> createState() => _RiderSavedPlacesScreenState();
}

class _RiderSavedPlacesScreenState extends State<RiderSavedPlacesScreen> {
  final List<SavedPlaceItem> _places = [
    const SavedPlaceItem(id: 'SP-1', title: 'المنزل', address: 'شارع النصر، المعادي، القاهرة', icon: '🏠'),
    const SavedPlaceItem(id: 'SP-2', title: 'العمل', address: 'مبنى B2، القرية الذكية، الجيزة', icon: '💼'),
    const SavedPlaceItem(id: 'SP-3', title: 'النادي الأهلي', address: 'فرع مدينة نصر، القاهرة', icon: '⚽'),
    const SavedPlaceItem(id: 'SP-4', title: 'مطار القاهرة الدولي', address: 'مبنى الركاب 3، طريق المطار', icon: '✈️'),
  ];

  void _showAddPlaceModal() {
    final titleCtrl = TextEditingController();
    final addressCtrl = TextEditingController();

    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (ctx) {
        return Padding(
          padding: EdgeInsets.only(
            bottom: MediaQuery.of(context).viewInsets.bottom,
            left: 20,
            right: 20,
            top: 20,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('📍 إضافة مكان مفضل جديد', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
              const SizedBox(height: 12),
              TextField(
                controller: titleCtrl,
                style: const TextStyle(fontSize: 13, color: Colors.white),
                decoration: InputDecoration(
                  hintText: 'اسم المكان (مثال: بيت العيلة)',
                  hintStyle: const TextStyle(color: AppColors.textMuted, fontSize: 12),
                  filled: true,
                  fillColor: AppColors.surfaceLight,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                ),
              ),
              const SizedBox(height: 10),
              TextField(
                controller: addressCtrl,
                style: const TextStyle(fontSize: 13, color: Colors.white),
                decoration: InputDecoration(
                  hintText: 'العنوان بالتفصيل أو اسم الشارع والمنطقة',
                  hintStyle: const TextStyle(color: AppColors.textMuted, fontSize: 12),
                  filled: true,
                  fillColor: AppColors.surfaceLight,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    if (titleCtrl.text.trim().isNotEmpty) {
                      setState(() {
                        _places.add(SavedPlaceItem(
                          id: 'SP-${_places.length + 1}',
                          title: titleCtrl.text.trim(),
                          address: addressCtrl.text.trim(),
                          icon: '🌟',
                        ));
                      });
                      Navigator.pop(ctx);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('تمت إضافة المكان المفضل بنجاح 🟢')),
                      );
                    }
                  },
                  child: const Text('حفظ المكان'),
                ),
              ),
              const SizedBox(height: 12),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('الأماكن المحفوظة والمفضلة 📍'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_forward),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          ..._places.map((p) {
            return Container(
              margin: const EdgeInsets.only(bottom: 10),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.border),
              ),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceLight,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(p.icon, style: const TextStyle(fontSize: 20)),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(p.title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
                        Text(p.address, style: const TextStyle(fontSize: 10, color: AppColors.textMuted)),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.delete_outline, color: AppColors.accentRed, size: 18),
                    onPressed: () {
                      setState(() => _places.removeWhere((item) => item.id == p.id));
                    },
                  ),
                ],
              ),
            );
          }),

          const SizedBox(height: 16),

          SizedBox(
            width: double.infinity,
            height: 48,
            child: OutlinedButton.icon(
              onPressed: _showAddPlaceModal,
              icon: const Icon(Icons.add_location_alt_outlined),
              label: const Text('إضافة مكان مفضل جديد'),
              style: OutlinedButton.styleFrom(
                side: const BorderSide(color: AppColors.primary),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
