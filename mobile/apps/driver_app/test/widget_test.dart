import 'package:flutter_test/flutter_test.dart';
import 'package:driver_app/main.dart';

void main() {
  testWidgets('AKHIL Driver App smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const AkhilDriverApp());
    expect(find.text('أخيل - كابتن'), findsNothing); // Title is inside MaterialApp
  });
}
