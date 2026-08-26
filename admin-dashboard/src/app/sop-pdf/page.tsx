'use client';

import React from 'react';
import { Printer, ArrowRight, ShieldCheck, FileText, Download } from 'lucide-react';
import Link from 'next/link';

export default function SopPdfPage() {
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
            📄 الدورة الإدارية والمستندية والتشغيلية المعتمدة (SOPs Master Manual)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 text-xs font-black rounded-xl transition shadow-lg shadow-amber-500/20"
          >
            <Printer className="w-4 h-4" />
            طباعة وحفظ بصيغة PDF فوراً
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
            <span className="inline-block px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded text-[10px] font-bold mb-1">
              سري وموثق رسمياً 🔒
            </span>
            <div className="font-mono font-bold text-slate-800">AKH-SOP-2026-V1</div>
            <div>تاريخ الإصدار: 26 أغسطس 2026</div>
          </div>
        </div>

        {/* Title Box */}
        <div className="bg-gradient-to-r from-slate-950 to-indigo-950 text-white p-5 rounded-2xl flex justify-between items-center">
          <div>
            <h2 className="text-lg md:text-xl font-black text-amber-300">
              الدورة الإدارية والمستندية والتشغيلية المعتمدة (SOPs Master Manual)
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              السياسات القياسية المعتمدة للتوثيق، الرحلات، المشتريات، الموارد البشرية، الصلاحيات، والمالية
            </p>
          </div>
          <div className="text-left hidden sm:block">
            <span className="bg-white/10 px-3 py-1.5 rounded-xl text-xs font-bold border border-white/20">
              إصدار مجلس الإدارة 👑
            </span>
          </div>
        </div>

        {/* Section 1: Driver KYC */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-indigo-950 flex items-center gap-2 border-b-2 border-slate-200 pb-2">
            <span>🧪</span> 1. دورة توثيق واعتماد الكباتن والفحص الطبي الدوري (Driver Onboarding & Medical KYC)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
              <h4 className="font-bold text-slate-900">المسار الإجرائي للتوثيق:</h4>
              <ul className="list-decimal list-inside space-y-1 text-slate-700">
                <li>تسجيل الكابتن ورفع صور (الرقم القومي، رخصة القيادة، ورخصة السيارة) عبر تطبيق الكابتن.</li>
                <li>تقديم الفيش الجنائي المميكن ساري موجه لشركة أخيل.</li>
                <li>إجراء فحص تحاليل المخدرات بالمعامل المعتمدة (البرج / المختبر / المعامل المركزية) وصلاحيته 6 أشهر.</li>
                <li>مراجعة وتدقيق مسؤول الـ KYC واعتماد الحساب واستلام استيكر علامة أخيل وبرثونة المضيء.</li>
              </ul>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
              <h4 className="font-bold text-slate-900">النماذج والمستندات الملزمة:</h4>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>نموذج (DOC-KYC-01):</strong> استمارة فحص ومطابقة بيانات الكابتن والمركبة.</li>
                <li>• <strong>نموذج (DOC-KYC-02):</strong> شهادة الفحص الطبي وتحليل السموم المعتمدة.</li>
                <li>• <strong>نموذج (DOC-SAF-03):</strong> إقرار وتعهد الالتزام بسلامة الركاب والتسعير العادل.</li>
                <li>• <strong>سياسة الإلغاء:</strong> حظر فوري ونهائي لأي نتيجة تحليل إيجابية.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: Operations & Cash Settlement */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-indigo-950 flex items-center gap-2 border-b-2 border-slate-200 pb-2">
            <span>🚗</span> 2. دورة الرحلات، التسعير العادل، والتحصيل المالي (Operations & Revenue Cycle)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1.5">
              <h4 className="font-bold text-slate-900">أ. آلية الرحلات النقدية (Cash Rides):</h4>
              <p className="text-slate-700 leading-relaxed">
                يقوم الراكب بسداد الأجرة كاملة نقداً للكابتن عند نقطة الوصول. يقوم النظام آلياً باستقطاع <strong>عمولة الشركة الثابتة (10%)</strong> من المحفظة الرقمية للكابتن فوراً وترحيلها لحساب الإيرادات.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1.5">
              <h4 className="font-bold text-slate-900">ب. آلية الرحلات الإلكترونية (Card / Wallet):</h4>
              <p className="text-slate-700 leading-relaxed">
                يتم تحصيل المبلغ عبر بوابة الدفع <strong>(Paymob / ميزة)</strong>، ويقوم النظام بإيداع <strong>90% صافي أرباح</strong> في محفظة الكابتن القابلة للسحب الفوري عبر InstaPay، مع احتفاظ الشركة بـ 10%.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Procurement & POs */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-indigo-950 flex items-center gap-2 border-b-2 border-slate-200 pb-2">
            <span>🛒</span> 3. دورة المشتريات، الموردين، والمخازن (Procurement & Inventory SOP)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs border border-slate-300">
              <thead className="bg-indigo-950 text-white font-bold text-[11px]">
                <tr>
                  <th className="p-2.5 border border-indigo-950">المرحلة</th>
                  <th className="p-2.5 border border-indigo-950">المستند الصادر</th>
                  <th className="p-2.5 border border-indigo-950">الجهة المنفذة</th>
                  <th className="p-2.5 border border-indigo-950">سلطة الاعتماد والموافقة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                <tr className="bg-slate-50">
                  <td className="p-2 font-bold">1. طلب الاحتياج</td>
                  <td className="p-2">طلب شراء داخلي (PR)</td>
                  <td className="p-2">القسم الطالب (IT / تسويق / عمليات)</td>
                  <td className="p-2">مدير القسم المختص</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">2. فحص العروض</td>
                  <td className="p-2">جدول مقارنة عروض الأسعار</td>
                  <td className="p-2">قسم المشتريات والتعاقدات</td>
                  <td className="p-2 font-semibold text-emerald-800">المدير المالي</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2 font-bold">3. أمر التوريد</td>
                  <td className="p-2">أمر شراء معتمد (PO)</td>
                  <td className="p-2">المشتريات للمورد المعتمد</td>
                  <td className="p-2 font-semibold text-amber-800">المدير المالي + Super Admin</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">4. الاستلام المخزني</td>
                  <td className="p-2">إذن فحص واستلام مخزني (GRN)</td>
                  <td className="p-2">أمين مستودع التجمع الخامس</td>
                  <td className="p-2">مدير المخازن والجودة</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: HR & Payroll */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-indigo-950 flex items-center gap-2 border-b-2 border-slate-200 pb-2">
            <span>👥</span> 4. دورة الموارد البشرية ومسير الرواتب والأجور (HR & Payroll SOP)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1.5">
              <h4 className="font-bold text-slate-900">الجدول الزمني الشهري لإقفال الرواتب:</h4>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>يوم 20:</strong> حصر كشوف الحضور والانصراف والمناوبات 24/7.</li>
                <li>• <strong>يوم 22:</strong> احتساب ساعات العمل الإضافية والبدلات والمكافآت.</li>
                <li>• <strong>يوم 24:</strong> خصم التأمينات الاجتماعية (11% موظف) وضريبة كسب العمل.</li>
                <li>• <strong>يوم 26:</strong> اعتماد مسير الرواتب النهائي من المدير المالي والتنفيذي.</li>
                <li>• <strong>يوم 28:</strong> تحويل صافي الرواتب لحظياً عبر شبكة <strong>InstaPay / CIB</strong>.</li>
              </ul>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1.5">
              <h4 className="font-bold text-slate-900">الامتثال للتأمينات والضرائب:</h4>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>حصة الشركة في التأمينات:</strong> 18.75% تسدد شهرياً لمكتب التأمينات.</li>
                <li>• <strong>حصة الموظف المستقطعة:</strong> 11% تسدد ضمن الشيك الشهري الموحد.</li>
                <li>• <strong>ملف الموظف القانوني:</strong> عقد عمل محدد المدة، المؤهل، التجنيد، والفيش.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 5: Authority Matrix */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-indigo-950 flex items-center gap-2 border-b-2 border-slate-200 pb-2">
            <span>🛡️</span> 5. مصفوفة الصلاحيات واعتمادات التوقيع الرسمية (Approval Authority Matrix)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs border border-slate-300">
              <thead className="bg-indigo-950 text-white font-bold text-[11px]">
                <tr>
                  <th className="p-2 border border-indigo-950">نوع المعاملة أو الصلاحية</th>
                  <th className="p-2 border border-indigo-950">مسؤول القسم</th>
                  <th className="p-2 border border-indigo-950">المدير المالي</th>
                  <th className="p-2 border border-indigo-950">مدير العمليات</th>
                  <th className="p-2 border border-indigo-950">مدير النظام (Super Admin 👑)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                <tr className="bg-slate-50">
                  <td className="p-2 font-bold">اعتماد وتفعيل كابتن جديد</td>
                  <td className="p-2 text-emerald-700 font-bold">🟢 صلاحية كاملة (KYC)</td>
                  <td className="p-2 text-slate-400">⚪ إشعار مالي</td>
                  <td className="p-2 text-emerald-700 font-bold">🟢 صلاحية كاملة</td>
                  <td className="p-2 text-emerald-700 font-bold">🟢 اعتماد نهائي</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">تعويض محفظة راكب (حتى 50 ج)</td>
                  <td className="p-2 text-emerald-700 font-bold">🟢 صلاحية كاملة (دعم)</td>
                  <td className="p-2 text-slate-400">⚪ مراجعة لاحقة</td>
                  <td className="p-2 text-emerald-700 font-bold">🟢 متاح</td>
                  <td className="p-2 text-emerald-700 font-bold">🟢 متاح</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2 font-bold">أمر شراء أكثر من 100,000 ج.م</td>
                  <td className="p-2 text-slate-400">⚪ طلب فقط</td>
                  <td className="p-2 text-emerald-700 font-bold">🟢 دراسة موازنة</td>
                  <td className="p-2 text-slate-400">⚪ للعلم</td>
                  <td className="p-2 font-black text-amber-700">👑 توقيع واعتماد حصري</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">اعتماد مسير الرواتب الشهري</td>
                  <td className="p-2 text-slate-400">⚪ إعداد الكشف (HR)</td>
                  <td className="p-2 text-emerald-700 font-bold">🟢 تدقيق مالي شامل</td>
                  <td className="p-2 text-slate-400">⚪ للعلم</td>
                  <td className="p-2 font-black text-amber-700">👑 توقيع واعتماد إلزامي</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 6: Signatures */}
        <div className="border-t-2 border-dashed border-slate-300 pt-6 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-[10px] font-bold text-slate-500 mb-6">إعداد وتوثيق (Operations)</div>
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
              <div className="text-[10px] font-bold text-amber-800 mb-6">الاعتماد النهائي (Super Admin 👑)</div>
              <div className="font-black text-amber-950 border-t border-amber-300 pt-1">م. هشام حنفي</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[10px] text-slate-400 border-t border-slate-200 pt-3">
          جميع الحقوق محفوظة لشركة أخيل لتكنولوجيا النقل والخدمات اللوجستية ش.م.م © 2026 • وثيقة سياسات وإجراءات رسمية معتمدة
        </div>
      </div>
    </div>
  );
}