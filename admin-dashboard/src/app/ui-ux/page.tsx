'use client';

import React, { useState } from 'react';
import { 
  Palette, 
  Type, 
  Layers, 
  Smartphone, 
  Zap, 
  HandCoins, 
  ShieldCheck, 
  Navigation, 
  Car, 
  Phone, 
  AlertTriangle, 
  Star,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function MobileUiUxShowcase() {
  const [activeCategory, setActiveCategory] = useState<'tokens' | 'components' | 'rider_flow' | 'driver_flow'>('rider_flow');

  const colors = [
    { name: 'Primary Flame (البرتقالي الأساسي)', hex: '#EA580C', role: 'الهوية البصرية، الأزرار الأساسية، والمزايدة' },
    { name: 'Accent Amber (الكهرماني المساعد)', hex: '#F59E0B', role: 'التقييمات، التنبيهات، والنجوم' },
    { name: 'Success Emerald (الأخضر للنجاح والكباتن)', hex: '#10B981', role: 'تأكيد الحجز، المحفظة، وحالة الكابتن متصل' },
    { name: 'Instant Blue (الأزرق للحجز الفوري)', hex: '#3B82F6', role: 'شارة الحجز الفوري السريع والأمان' },
    { name: 'Dark Surface (الخلفية الداكنة العميقة)', hex: '#020617', role: 'خلفية التطبيق لراحة العين وتوفير طاقة البطارية' },
    { name: 'Card Surface (بطاقات العناصر)', hex: '#0F172A', role: 'البطاقات المنبثقة وحقول الإدخال' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-orange-600/30">
                ⚡
              </div>
              <h1 className="text-2xl font-black text-white">منظومة التصميم وتجربة المستخدم (Mobile UI & UX System)</h1>
            </div>
            <p className="text-xs text-slate-400">
              الدليل البصري المتكامل لتطبيقي الراكب والكابتن لمنصة <strong>"عالطاير" (3altayer.app)</strong> 🇪🇬
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/rider"
              target="_blank"
              className="text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5"
            >
              📱 تجربة تطبيق الراكب الحي
            </a>
            <a
              href="/driver"
              target="_blank"
              className="text-xs bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5"
            >
              🚗 تجربة تطبيق الكابتن الحي
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveCategory('rider_flow')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeCategory === 'rider_flow' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" /> رحلة الراكب (Rider Flow UX)
          </button>
          <button
            onClick={() => setActiveCategory('driver_flow')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeCategory === 'driver_flow' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            <Car className="w-4 h-4" /> رحلة الكابتن (Driver Flow UX)
          </button>
          <button
            onClick={() => setActiveCategory('components')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeCategory === 'components' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" /> مكتبة العناصر (Component Library)
          </button>
          <button
            onClick={() => setActiveCategory('tokens')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeCategory === 'tokens' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            <Palette className="w-4 h-4" /> الألوان والخطوط (Design Tokens)
          </button>
        </div>

        {/* 1. RIDER FLOW UX */}
        {activeCategory === 'rider_flow' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">رحلة المستخدم لتطبيق الراكب (Rider User Journey)</h2>
              <p className="text-xs text-slate-400">تدفق شاشات الراكب من فتح التطبيق واختيار النمط حتى الوصول وتقييم الكابتن</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {/* Screen 1 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-bold">
                  الشاشة 1: تحديد الوجهة والمقارنة
                </span>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
                  <p className="text-slate-300 font-bold">خريطة GPS + اختيار النمط</p>
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                      <span className="text-[11px] font-bold text-blue-400 block">⚡ فوري</span>
                      <span className="text-[9px] text-slate-400">85 ج.م ثابت</span>
                    </div>
                    <div className="p-2 bg-orange-500/10 border border-orange-500/30 rounded-lg text-center">
                      <span className="text-[11px] font-bold text-orange-400 block">🤝 مزايدة</span>
                      <span className="text-[9px] text-slate-400">75 ج.م مقترح</span>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">الراكب يرى مقارنة شفافة وسريعة ويختار بين الحجز الفوري أو التفاوض.</p>
              </div>

              {/* Screen 2 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold">
                  الشاشة 2: استقبال عروض الكباتن
                </span>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
                  <p className="text-slate-300 font-bold">كروت العروض الحية (Live Bids)</p>
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-bold text-[11px] text-white">كابتن محمود ⭐ 4.9</p>
                      <p className="text-[9px] text-slate-400">تويوتا كورولا • 3 د</p>
                    </div>
                    <span className="font-bold text-orange-400 font-mono text-xs">75 ج.م</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">عروض متدفقة بالوقت الفعلي مع إمكانية اختيار الكابتن الأنسب بلمسة واحدة.</p>
              </div>

              {/* Screen 3 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                  الشاشة 3: التتبع ورمز OTP
                </span>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2 text-center">
                  <p className="text-[10px] text-slate-400">رمز بدء المشوار:</p>
                  <p className="text-xl font-black font-mono text-orange-400 tracking-widest">5924</p>
                  <div className="p-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] rounded-lg font-bold">
                    🚗 الكابتن في الطريق (3 د)
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">حماية فائقة: لا تبدأ الرحلة إلا بعد إدخال الكابتن لكود الـ OTP من هاتف الراكب.</p>
              </div>

              {/* Screen 4 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-bold">
                  الشاشة 4: إنهاء الرحلة والتقييم
                </span>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2 text-center">
                  <p className="text-[11px] text-slate-300 font-bold">حمد الله على السلامة 🎉</p>
                  <p className="text-base font-bold text-orange-400 font-mono">75.00 ج.م كاش</p>
                  <div className="text-amber-400 text-sm">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-[11px] text-slate-400">إيصال دفع فوري، تقييم السائق، وإمكانية إضافة إكرامية (Tip).</p>
              </div>
            </div>
          </div>
        )}

        {/* 2. DRIVER FLOW UX */}
        {activeCategory === 'driver_flow' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">رحلة المستخدم لتطبيق الكابتن (Driver User Journey)</h2>
              <p className="text-xs text-slate-400">تجربة الكابتن اليومية من تسجيل الدخول وبدء الوردية واستقبال الطلبات وتحديث الأرباح</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {/* Step 1 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                  1. شاشة الرادار وبدء العمل
                </span>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-bold">كابتن متصل 🟢</span>
                    <span className="text-emerald-400 font-mono">140 ج.م</span>
                  </div>
                  <p className="text-[10px] text-slate-500">خريطة رادار تبحث عن أقرب ركاب</p>
                </div>
                <p className="text-[11px] text-slate-400">وضوح تام للرصيد، زر تشغيل الوردية بلمسة واحدة، وخريطة رادار حية.</p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-bold">
                  2. استقبال طلب المزايدة
                </span>
                <div className="bg-slate-950 p-3 rounded-xl border border-orange-500/40 text-xs space-y-2">
                  <p className="font-bold text-white">📍 التحرير ➡️ 🏁 سيتي ستارز</p>
                  <p className="text-[11px] text-orange-400">سعر الزبون: 75 ج.م</p>
                  <div className="grid grid-cols-3 gap-1">
                    <span className="bg-emerald-600 text-white text-[9px] p-1 rounded text-center font-bold">75 ج</span>
                    <span className="bg-slate-800 text-slate-300 text-[9px] p-1 rounded text-center">+5 ج</span>
                    <span className="bg-slate-800 text-slate-300 text-[9px] p-1 rounded text-center">+10 ج</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">أزرار سريعة بنقرة واحدة لتقديم عرض سعر أعلى بدون كتابة أرقام أثناء القيادة.</p>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold">
                  3. التحقق برمز OTP والتوجه
                </span>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
                  <p className="font-bold text-slate-200">أدخل كود الـ OTP:</p>
                  <div className="bg-slate-900 p-2 rounded text-center font-mono font-bold text-white text-base">
                    [ 5 9 2 4 ]
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">بدء الملاحة التلقائية وتوثيق ركوب العميل لمنع أي خلافات.</p>
              </div>

              {/* Step 4 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                  4. تصفية الحساب والأرباح
                </span>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">المحصل كاش:</span>
                    <span className="font-bold text-white">75.00 ج.م</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-rose-400">
                    <span>العمولة (10%):</span>
                    <span>-7.50 ج.م</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-emerald-400 font-bold border-t border-slate-800 pt-1">
                    <span>صافي ربحك:</span>
                    <span>67.50 ج.م</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">شفافية مالية مطلقة مع خصم فوري لعمولة التطبيق وعرض رصيد المحفظة الجديد.</p>
              </div>
            </div>
          </div>
        )}

        {/* 3. DESIGN TOKENS & COLORS */}
        {activeCategory === 'tokens' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">لوحة الألوان المعتمدة (Design Tokens Palette)</h2>
              <p className="text-xs text-slate-400">ألوان وتدرجات مدروسة لتحقيق أعلى تباين بصري وهوية مصرية عصرية</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {colors.map((c, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="h-16 rounded-xl shadow-inner flex items-center justify-center font-mono font-bold text-sm text-white" style={{ backgroundColor: c.hex }}>
                    {c.hex}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-200">{c.name}</h3>
                    <p className="text-[11px] text-slate-400 mt-1">{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. COMPONENT LIBRARY */}
        {activeCategory === 'components' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">مكتبة مكونات الواجهة (Component Library)</h2>
              <p className="text-xs text-slate-400">أزرار وبطاقات وحقول إدخال موحدة بين كود فلاتر والموقع</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Component 1 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="font-bold text-xs text-orange-400">1. محدد نمط الحجز (Ride Booking Toggle)</h3>
                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl">
                  <div className="p-3 bg-orange-500/15 border-2 border-orange-500 rounded-xl text-center">
                    <span className="font-bold text-xs text-orange-400 block">🤝 مزايدة وتفاوض</span>
                    <span className="text-[10px] text-slate-400">اقترح سعرك</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-center opacity-60">
                    <span className="font-bold text-xs text-blue-400 block">⚡ حجز فوري</span>
                    <span className="text-[10px] text-slate-400">سعر ثابت</span>
                  </div>
                </div>
              </div>

              {/* Component 2 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="font-bold text-xs text-emerald-400">2. بطاقة عرض الكابتن في المزايدة (Bid Offer Card)</h3>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center">👨🏻‍✈️</div>
                    <div>
                      <p className="font-bold text-xs text-white">كابتن محمود ⭐ 4.9</p>
                      <p className="text-[10px] text-slate-400">تويوتا كورولا • 3 د</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm text-orange-400 font-mono">75 ج.م</p>
                    <button className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                      قبول ✅
                    </button>
                  </div>
                </div>
              </div>

              {/* Component 3 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="font-bold text-xs text-amber-400">3. كود أمان بدء الرحلة (OTP Security Badge)</h3>
                <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl text-center">
                  <p className="text-[11px] text-slate-300">رمز الأمان للراكب (OTP):</p>
                  <p className="text-xl font-mono font-black text-orange-400 tracking-widest my-1">5924</p>
                </div>
              </div>

              {/* Component 4 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="font-bold text-xs text-blue-400">4. أزرار العروض السريعة للكابتن (+5, +10, +15 ج)</h3>
                <div className="grid grid-cols-4 gap-1.5 bg-slate-950 p-3 rounded-xl">
                  <span className="bg-emerald-600 text-white text-xs py-2 rounded-lg text-center font-bold">75 ج</span>
                  <span className="bg-slate-800 text-slate-300 text-xs py-2 rounded-lg text-center font-bold">+5 ج</span>
                  <span className="bg-slate-800 text-slate-300 text-xs py-2 rounded-lg text-center font-bold">+10 ج</span>
                  <span className="bg-slate-800 text-slate-300 text-xs py-2 rounded-lg text-center font-bold">+15 ج</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
