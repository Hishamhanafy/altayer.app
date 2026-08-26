'use client';

import React from 'react';
import { Printer, ArrowRight, Download, Calculator, DollarSign, ShieldCheck, Car } from 'lucide-react';
import Link from 'next/link';

export default function PricingPdfPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8" dir="rtl">
      {/* Top Floating Control Bar */}
      <div className="max-w-5xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl backdrop-blur print:hidden">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition border border-slate-700"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للوحة التحكم
          </Link>
          <div className="h-6 w-px bg-slate-700 hidden sm:block" />
          <span className="text-xs text-amber-400 font-bold hidden sm:inline">
            📑 وثيقة ودليل سياسة التسعير العادل واحتساب الأرباح (AKHIL Pricing Master Policy)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/AKHIL_Pricing_Policy_Rider_Driver.pdf"
            download="AKHIL_Pricing_Policy_Rider_Driver.pdf"
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow"
          >
            <Download className="w-4 h-4" />
            تحميل وثيقة الـ PDF 📥
          </a>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 text-xs font-black rounded-xl transition shadow-lg shadow-amber-500/20"
          >
            <Printer className="w-4 h-4" />
            طباعة فورية
          </button>
        </div>
      </div>

      {/* Printable Paper Canvas */}
      <div className="max-w-5xl mx-auto bg-white text-slate-900 p-6 md:p-12 rounded-3xl shadow-2xl space-y-6 print:p-0 print:shadow-none print:rounded-none print:max-w-full">
        {/* Document Header */}
        <div className="flex justify-between items-center border-b-4 border-indigo-950 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-tr from-indigo-950 to-amber-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-md">
              🐎
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-indigo-950 tracking-tight">
                شركة أخيل لتكنولوجيا النقل والخدمات اللوجستية ش.م.م
              </h1>
              <p className="text-xs text-amber-700 font-bold">
                AKHIL Smart Transportation & Logistics Enterprise (S.A.E)
              </p>
            </div>
          </div>
          <div className="text-left text-xs text-slate-500 space-y-0.5">
            <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold mb-1">
              معتمد مالياً ورسمياً 🔒
            </span>
            <div className="font-mono font-bold text-slate-800">AKH-PRICE-2026-V1</div>
            <div>تاريخ الاعتماد: 26 أغسطس 2026</div>
          </div>
        </div>

        {/* Title Box */}
        <div className="bg-gradient-to-r from-slate-950 to-indigo-950 text-white p-5 rounded-2xl flex justify-between items-center">
          <div>
            <h2 className="text-lg md:text-xl font-black text-amber-300">
              دليل وثيقة التسعير العادل واحتساب الكيلومترات والأرباح للراكب والكابتن
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              المعايير الرقمية لاحتساب الأجرة، عمولة الـ 10%، تسعير فئات أخيل الـ 10، وسحب الأرباح الفوري
            </p>
          </div>
          <div className="text-left hidden sm:block">
            <span className="bg-white/10 px-3 py-1.5 rounded-xl text-xs font-bold border border-white/20">
              الإدارة المالية والحسابات 📑
            </span>
          </div>
        </div>

        {/* Section 1: The Master Formula */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-indigo-950 flex items-center gap-2 border-b-2 border-slate-200 pb-2">
            <span>📐</span> 1. معادلة التسعير القياسية واحتساب الكيلومترات آلياً (Calculation Engine)
          </h3>
          <div className="p-4 bg-slate-950 text-amber-300 font-mono text-center rounded-2xl text-xs md:text-sm font-bold border border-slate-800">
            الأجرة التقديرية = [ 20 ج (فتح العداد) + (المسافة بالـ KM × 4.5 ج) + (دقائق الانتظار × 3 ج) ] × معامل الفئة
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border-r-4 border-emerald-500 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">1. فتح العداد (Base Fare):</div>
              <div className="text-slate-600"><strong>20.00 ج.م ثابتة</strong> تشمل أول دقيقتين انتظار مجاناً عند نقطة الانطلاق.</div>
            </div>
            <div className="p-3 bg-slate-50 border-r-4 border-amber-500 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">2. تسعير الكيلومتر (Per KM):</div>
              <div className="text-slate-600"><strong>4.50 ج.م / كم</strong> تُحسب وفق مسار الـ GPS الفعلي على خرائط جوجل.</div>
            </div>
            <div className="p-3 bg-slate-50 border-r-4 border-indigo-500 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">3. التقريب لأعلى 5 جنيهات:</div>
              <div className="text-slate-600">تقريب آلي لأعلى 5 ج (مثال: 61 ج تصبح 65 ج) لحل أزمة الفكة نهائياً.</div>
            </div>
          </div>
        </div>

        {/* Section 2: Services Matrix */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-indigo-950 flex items-center gap-2 border-b-2 border-slate-200 pb-2">
            <span>🎛️</span> 2. جدول معاملات تسعير فئات أخيل الـ 10 (10 AKHIL Services Matrix)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs border border-slate-300">
              <thead className="bg-indigo-950 text-white font-bold text-[11px]">
                <tr>
                  <th className="p-2.5 border border-indigo-950">الفئة / الخدمة</th>
                  <th className="p-2.5 border border-indigo-950">المعامل</th>
                  <th className="p-2.5 border border-indigo-950">فتح العداد</th>
                  <th className="p-2.5 border border-indigo-950">سعر الكيلومتر</th>
                  <th className="p-2.5 border border-indigo-950">الميزة والسياسة التشغيلية المعتمدة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                <tr className="bg-slate-50">
                  <td className="p-2 font-bold">🚗 أخيل اقتصادي (ECONOMY)</td>
                  <td className="p-2 font-bold text-blue-700">1.00x</td>
                  <td className="p-2">20.00 ج.م</td>
                  <td className="p-2">4.50 ج.م</td>
                  <td className="p-2">الخدمة القياسية اليومية بأعلى معايير النظافة والراحة.</td>
                </tr>
                <tr className="bg-pink-50/60 font-semibold">
                  <td className="p-2 font-bold text-pink-700">🌸 أخيل برثونة (PARTHONA)</td>
                  <td className="p-2 font-bold text-pink-700">1.00x (بدون زيادة)</td>
                  <td className="p-2">20.00 ج.م</td>
                  <td className="p-2">4.50 ج.م</td>
                  <td className="p-2 text-pink-900">سيدات حصراً بنفس السعر العادي لضمان العدالة والأمان.</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2 font-bold">🚘 أخيل بلس (PLUS)</td>
                  <td className="p-2 font-bold text-sky-700">1.10x</td>
                  <td className="p-2">22.00 ج.م</td>
                  <td className="p-2">4.95 ج.م</td>
                  <td className="p-2">موديلات سيارات أحدث ومستوى راحة وترفيه إضافي.</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">💼 أخيل أعمال (BUSINESS)</td>
                  <td className="p-2 font-bold text-purple-700">1.20x</td>
                  <td className="p-2">24.00 ج.م</td>
                  <td className="p-2">5.40 ج.م</td>
                  <td className="p-2">سيارات فارهة VIP مخصصة للشركات والاجتماعات الرسمية.</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2 font-bold">⏱️ أخيل مجدولة (TIME)</td>
                  <td className="p-2 font-bold text-indigo-700">1.00x (خصم 20%)</td>
                  <td className="p-2">20.00 ج.م</td>
                  <td className="p-2">4.50 ج.م</td>
                  <td className="p-2">حجز مسبق (ONE/ROUTINE/CONTRACT) مع خصومات دورية.</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">🛣️ أخيل سفر بين المحافظات (TRIP)</td>
                  <td className="p-2 font-bold text-emerald-700">1.80x</td>
                  <td className="p-2">36.00 ج.م</td>
                  <td className="p-2">8.10 ج.م</td>
                  <td className="p-2">سفر لجميع المحافظات + 15د استراحة مجاناً لكل 100 كم.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Simulations */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-indigo-950 flex items-center gap-2 border-b-2 border-slate-200 pb-2">
            <span>🚗</span> 3. نماذج محاكاة لأسعار أشهر مشاوير القاهرة والجيزة (Real Simulations)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs border border-slate-300">
              <thead className="bg-indigo-950 text-white font-bold text-[11px]">
                <tr>
                  <th className="p-2 border border-indigo-950">مسار المشوار</th>
                  <th className="p-2 border border-indigo-950">المسافة</th>
                  <th className="p-2 border border-indigo-950">أجرة أخيل</th>
                  <th className="p-2 border border-indigo-950">صافي ربح الكابتن (90%)</th>
                  <th className="p-2 border border-indigo-950">عمولة أخيل (10%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                <tr className="bg-slate-50">
                  <td className="p-2 font-bold">ميدان التحرير ⬅️ سيتي ستارز (مدينة نصر)</td>
                  <td className="p-2">12.4 كم</td>
                  <td className="p-2 font-black text-amber-700">75.00 ج.م</td>
                  <td className="p-2 text-emerald-700 font-bold">67.50 ج.م</td>
                  <td className="p-2 text-slate-600">7.50 ج.م</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">ميدان الدقي ⬅️ التجمع الخامس (كايرو فيستيفال)</td>
                  <td className="p-2">24.5 كم</td>
                  <td className="p-2 font-black text-amber-700">130.00 ج.م</td>
                  <td className="p-2 text-emerald-700 font-bold">117.00 ج.م</td>
                  <td className="p-2 text-slate-600">13.00 ج.م</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2 font-bold">المهندسين (ميدان لبنان) ⬅️ هايبر وان (الشيخ زايد)</td>
                  <td className="p-2">18.2 كم</td>
                  <td className="p-2 font-black text-amber-700">105.00 ج.م</td>
                  <td className="p-2 text-emerald-700 font-bold">94.50 ج.م</td>
                  <td className="p-2 text-slate-600">10.50 ج.م</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">هضبة الأهرام ⬅️ مطار القاهرة الدولي</td>
                  <td className="p-2">36.0 كم</td>
                  <td className="p-2 font-black text-amber-700">185.00 ج.م</td>
                  <td className="p-2 text-emerald-700 font-bold">166.50 ج.م</td>
                  <td className="p-2 text-slate-600">18.50 ج.م</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Signatures */}
        <div className="border-t-2 border-dashed border-slate-300 pt-6 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-[10px] font-bold text-slate-500 mb-6">إعداد التسعير والعمليات</div>
              <div className="font-bold text-slate-900 border-t border-slate-300 pt-1">أ. طارق عبد العزيز</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-[10px] font-bold text-slate-500 mb-6">التدقيق المالي (CFO)</div>
              <div className="font-bold text-slate-900 border-t border-slate-300 pt-1">أ. ياسمين خليل</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-[10px] font-bold text-slate-500 mb-6">المستشار القانوني (Legal)</div>
              <div className="font-bold text-slate-900 border-t border-slate-300 pt-1">المستشار / أحمد فهمي</div>
            </div>
            <div className="p-3 bg-amber-50 border-2 border-amber-500 rounded-xl">
              <div className="text-[10px] font-bold text-amber-800 mb-6">التصديق النهائي (Super Admin 👑)</div>
              <div className="font-black text-amber-950 border-t border-amber-300 pt-1">م. هشام حنفي</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[10px] text-slate-400 border-t border-slate-200 pt-3">
          جميع الحقوق محفوظة لشركة أخيل لتكنولوجيا النقل والخدمات اللوجستية ش.م.م © 2026 • وثيقة سياسة التسعير العادل الرسمية
        </div>
      </div>
    </div>
  );
}