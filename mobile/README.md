# 📱 3altayer Mobile Workspace (Flutter)

هيكل تطبيقات الهواتف الذكية لمشروع **عالطاير** بنظام Multi-App Monorepo:

## التطبيقات:
1. **`apps/rider_app`**: تطبيق الراكب (تحديد الوجهة، مقارنة الفوري بالمزايدة، استلام عروض الكباتن، التتبع اللحظي، ورمز OTP).
2. **`apps/driver_app`**: تطبيق الكابتن (نمط Online/Offline، استقبال إشعارات الفوري والطلبات المفتوحة للمزايدة، العداد المالي، والملاحة).

## الحزم المشتركة (Shared Packages):
- `packages/core_models`: نماذج البيانات المشتركة (Ride, User, Bid, Location).
- `packages/core_network`: إدارة اتصالات الـ REST APIs و WebSockets Live Gateway.
- `packages/core_ui`: الثيم، الألوان، الأزرار، والخرائط.
