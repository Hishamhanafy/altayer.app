import 'package:flutter_test/flutter_test.dart';
import 'package:rider_app/main.dart';

void main() {
  testWidgets('AKHIL Rider App smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const AkhilRiderApp());
    expect(find.text('أخيل - عميل'), findsNothing);
  });
}
