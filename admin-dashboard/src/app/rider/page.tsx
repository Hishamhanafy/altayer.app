'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Car, 
  Zap, 
  HandCoins, 
  ShieldCheck, 
  Phone, 
  AlertTriangle, 
  Star, 
  Tag, 
  Gift, 
  CheckCircle2, 
  Share2, 
  Sparkles, 
  Percent, 
  Copy, 
  ChevronLeft 
} from 'lucide-react';

export default function RiderWebApp() {
  const [activeTab, setActiveTab] = useState<'book' | 'promos' | 'referrals'>('book');
  const [bookingMode, setBookingMode] = useState<'BIDDING' | 'INSTANT'>('BIDDING');
  const [proposedFare, setProposedFare] = useState<number>(75);
  const [step, setStep] = useState<'create' | 'bidding' | 'en_route' | 'completed'>('create');
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  // Promo Code State
  const [promoInput, setPromoInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountAmount: number; desc: string } | null>({
    code: 'ALTAYER50',
    discountAmount: 25,
    desc: 'خصم ترحيبي 50% (وفرت 25 ج.م)',
  });
  const [promoError, setPromoError] = useState<string>('');

  // Referral State
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const referralCode = 'SALEM-789';

  // Loyalty points
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(140);

  const sampleBids = [
    { id: '1', driverName: 'كابتن محمود السيد', car: 'تويوتا كورولا 2022', plate: 'أ ب ج 1234', rating: 4.9, trips: 340, fare: proposedFare, eta: 3 },
    { id: '2', driverName: 'كابتن أحمد فؤاد', car: 'هيونداي إلنترا 2024', plate: 'ط ك ل 9101', rating: 4.8, trips: 512, fare: proposedFare + 10, eta: 5 },
    { id: '3', driverName: 'كابتن كريم عبد الله', car: 'سكوتر بينيلي', plate: 'س ص ع 5678', rating: 5.0, trips: 185, fare: Math.max(35, proposedFare - 25), eta: 2 },
  ];

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (code === 'ALTAYER50') {
      setAppliedPromo({ code: 'ALTAYER50', discountAmount: 25, desc: 'خصم ترحيبي 50% (وفرت 25 ج.م)' });
      setPromoInput('');
      alert('تم تفعيل كود الخصم الترحيبي بنجاح! 🎉');
    } else if (code === 'WEEKEND20') {
      setAppliedPromo({ code: 'WEEKEND20', discountAmount: 15, desc: 'خصم عطلة نهاية الأسبوع 20%' });
      setPromoInput('');
      alert('تم تفعيل كود خصم الويك إند 20% بنجاح! 🎉');
    } else if (code === 'FREE30') {
      setAppliedPromo({ code: 'FREE30', discountAmount: 30, desc: 'كوبون رصيد دعوة صديق (30 ج.م)' });
      setPromoInput('');
      alert('تم تفعيل كوبون رصيد الدعوة 30 ج.م! 🎉');
    } else {
      setPromoError('كود الخصم غير صالح أو منتهي الصلاحية');
    }
  };

  const handleCopyReferral = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRequestRide = () => {
    if (bookingMode === 'BIDDING') {
      setStep('bidding');
    } else {
      setSelectedDriver(sampleBids[0]);
      setStep('en_route');
    }
  };

  const handleAcceptBid = (bid: any) => {
    setSelectedDriver(bid);
    setStep('en_route');
  };

  const finalPayableFare = Math.max(15, proposedFare - (appliedPromo ? appliedPromo.discountAmount : 0));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 font-sans" dir="rtl">
      {/* Mobile Shell Simulation Container */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[720px] relative">
        
        {/* Header */}
        <header className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center font-bold text-white shadow-md text-base">
              ⚡
            </div>
            <div>
              <h1 className="font-bold text-xs text-white">عالطاير (3altayer)</h1>
              <p className="text-[10px] text-orange-400">الزبون: أحمد سالم 🇪🇬</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] bg-slate-800 text-amber-400 px-2.5 py-1 rounded-full border border-slate-700 font-mono font-bold flex items-center gap-1">
              ⭐ {loyaltyPoints} نقطة
            </span>
          </div>
        </header>

        {/* Rider Top Navigation Tabs */}
        <nav className="flex bg-slate-950 border-b border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('book')}
            className={`flex-1 py-2.5 font-bold text-center border-b-2 transition flex items-center justify-center gap-1 ${
              activeTab === 'book' ? 'border-orange-500 text-orange-400 bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Car className="w-3.5 h-3.5" /> حجز مشوار
          </button>
          <button
            onClick={() => setActiveTab('promos')}
            className={`flex-1 py-2.5 font-bold text-center border-b-2 transition flex items-center justify-center gap-1 ${
              activeTab === 'promos' ? 'border-orange-500 text-orange-400 bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Tag className="w-3.5 h-3.5" /> أكواد الخصم والعروض
          </button>
          <button
            onClick={() => setActiveTab('referrals')}
            className={`flex-1 py-2.5 font-bold text-center border-b-2 transition flex items-center justify-center gap-1 ${
              activeTab === 'referrals' ? 'border-orange-500 text-orange-400 bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Gift className="w-3.5 h-3.5" /> ادعُ واكسب (30 ج)
          </button>
        </nav>

        {/* TAB 1: BOOK RIDE */}
        {activeTab === 'book' && (
          <div className="flex-1 flex flex-col justify-between">
            {/* Map Mock Area */}
            <div className="h-44 bg-slate-900 relative border-b border-slate-800 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              {step === 'create' && (
                <>
                  <div className="absolute top-4 right-6 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-lg flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> ميدان التحرير
                  </div>
                  <div className="absolute bottom-4 left-6 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-lg flex items-center gap-1">
                    <Navigation className="w-3 h-3" /> سيتي ستارز (12.5 كم)
                  </div>
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center animate-pulse">
                    <Car className="w-5 h-5 text-orange-400" />
                  </div>
                </>
              )}

              {step === 'bidding' && (
                <div className="text-center p-4 z-10">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center mx-auto mb-1 animate-spin">
                    ⏳
                  </div>
                  <p className="font-bold text-xs text-white">جاري استقبال عروض الكباتن...</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">سعرك المقترح: <strong className="text-orange-400 font-mono">{proposedFare} ج.م</strong></p>
                </div>
              )}

              {step === 'en_route' && (
                <div className="text-center p-4 z-10">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-1">
                    <Car className="w-5 h-5 text-emerald-400" />
                  </div>
                  <p className="font-bold text-xs text-emerald-400">الكابتن في طريقه إليك</p>
                  <p className="text-[10px] text-slate-400">وقت الوصول المتوقع: 3 دقائق</p>
                </div>
              )}

              {step === 'completed' && (
                <div className="text-center p-4 z-10">
                  <div className="text-3xl mb-1">🎉</div>
                  <p className="font-bold text-sm text-white">تم الوصول بسلامة الله</p>
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              {step === 'create' && (
                <div className="space-y-2.5">
                  {/* Route Display */}
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[11px] space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">🟢</span>
                      <span className="text-slate-300 font-medium">ميدان التحرير، وسط البلد</span>
                    </div>
                    <div className="flex items-center gap-2 border-t border-slate-800/60 pt-1.5">
                      <span className="text-rose-400">🔴</span>
                      <span className="text-slate-300 font-medium">سيتي ستارز، مدينة نصر (12.5 كم)</span>
                    </div>
                  </div>

                  {/* Mode Selection */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setBookingMode('BIDDING')}
                      className={`p-2.5 rounded-xl border text-right transition ${
                        bookingMode === 'BIDDING'
                          ? 'border-orange-500 bg-orange-500/10 text-orange-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-1 font-bold text-xs">
                        <HandCoins className="w-3.5 h-3.5 text-orange-400" />
                        مزايدة وتفاوض
                      </div>
                      <p className="text-[9px] text-slate-500 mt-0.5">اقترح سعرك واستقبل عروض</p>
                    </button>

                    <button
                      onClick={() => setBookingMode('INSTANT')}
                      className={`p-2.5 rounded-xl border text-right transition ${
                        bookingMode === 'INSTANT'
                          ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-1 font-bold text-xs">
                        <Zap className="w-3.5 h-3.5 text-blue-400" />
                        حجز فوري مباشر
                      </div>
                      <p className="text-[9px] text-slate-500 mt-0.5">سعر ثابت وكابتن سريع</p>
                    </button>
                  </div>

                  {/* Price Setup & Active Promo Pill */}
                  {bookingMode === 'BIDDING' ? (
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">أجرتك المقترحة:</span>
                        <span className="text-orange-400 font-bold">الاسترشادي: 75 ج.م</span>
                      </div>
                      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg p-1">
                        <button
                          onClick={() => setProposedFare((p) => Math.max(30, p - 5))}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-white flex items-center justify-center text-base"
                        >
                          -
                        </button>
                        <div className="text-lg font-bold text-white font-mono">
                          {proposedFare} <span className="text-[10px] text-orange-400">ج.م</span>
                        </div>
                        <button
                          onClick={() => setProposedFare((p) => p + 5)}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-white flex items-center justify-center text-base"
                        >
                          +
                        </button>
                      </div>

                      {/* Active Promo Discount Applied */}
                      {appliedPromo && (
                        <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex justify-between items-center text-[11px]">
                          <div className="flex items-center gap-1 text-emerald-400 font-bold">
                            <Tag className="w-3 h-3" /> كود الخصم مفعّل: <span className="font-mono">{appliedPromo.code}</span>
                          </div>
                          <span className="text-emerald-300 font-bold font-mono">-{appliedPromo.discountAmount} ج.م</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-slate-950 p-3 rounded-xl border border-blue-500/30 flex justify-between items-center">
                      <div>
                        <span className="text-[11px] text-slate-400 block">أجرة الرحلة الفورية:</span>
                        <span className="text-lg font-bold text-blue-400 font-mono">85.00 ج.م</span>
                      </div>
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-bold">
                        سيارة عادية مكيفة
                      </span>
                    </div>
                  )}

                  {/* Net Price you will pay */}
                  <div className="flex justify-between items-center px-1 text-xs">
                    <span className="text-slate-400">المبلغ النهائي بعد الخصم:</span>
                    <strong className="text-base text-emerald-400 font-mono font-bold">{finalPayableFare}.00 ج.م</strong>
                  </div>

                  <button
                    onClick={handleRequestRide}
                    className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-600/30 transition text-xs flex items-center justify-center gap-1.5"
                  >
                    🚀 طلب مشوار عالطاير
                  </button>
                </div>
              )}

              {step === 'bidding' && (
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400 font-medium">عروض الكباتن المتقدمين:</p>
                    {sampleBids.map((bid) => (
                      <div key={bid.id} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between hover:border-orange-500/50 transition">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-bold text-xs text-slate-200">{bid.driverName}</p>
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1 py-0.2 rounded flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /> {bid.rating}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400">{bid.car} • وصول خلال {bid.eta} د</p>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-xs text-orange-400 font-mono mb-1">{bid.fare} ج.م</p>
                          <button
                            onClick={() => handleAcceptBid(bid)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg transition"
                          >
                            قبول الكابتن ✅
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setStep('create')}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs py-2 rounded-xl"
                  >
                    إلغاء الطلب
                  </button>
                </div>
              )}

              {step === 'en_route' && (
                <div className="space-y-3">
                  <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl text-center">
                    <p className="text-[11px] text-slate-300 mb-0.5">رمز أمان بدء الرحلة (OTP):</p>
                    <p className="text-2xl font-mono font-black text-orange-400 tracking-widest">5924</p>
                    <p className="text-[9px] text-slate-400">أعطِ هذا الكود للكابتن عند ركوبك</p>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-base">
                        👨🏻‍✈️
                      </div>
                      <div>
                        <h3 className="font-bold text-xs text-white">{selectedDriver?.driverName}</h3>
                        <p className="text-[10px] text-slate-400">{selectedDriver?.car}</p>
                        <span className="text-[9px] bg-slate-800 text-slate-300 px-1 py-0.5 rounded font-mono">
                          {selectedDriver?.plate}
                        </span>
                      </div>
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] text-slate-400 block">المبلغ بعد الخصم:</span>
                      <span className="font-bold text-sm text-emerald-400 font-mono">{finalPayableFare} ج.م</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep('completed')}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs mt-1"
                  >
                    محاكاة: إنهاء الرحلة من الكابتن 🏁
                  </button>
                </div>
              )}

              {step === 'completed' && (
                <div className="space-y-3 text-center py-3">
                  <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                    <p className="text-[11px] text-slate-400">المبلغ المدفوع كاش للكابتن:</p>
                    <p className="text-xl font-bold text-emerald-400 font-mono my-0.5">{finalPayableFare}.00 ج.م</p>
                    {appliedPromo && (
                      <p className="text-[10px] text-orange-400 font-semibold">وفرت {appliedPromo.discountAmount} ج.م بفضل كود {appliedPromo.code}!</p>
                    )}
                  </div>

                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                    <p className="text-xs text-slate-300 mb-1">تقييم الكابتن:</p>
                    <div className="flex justify-center gap-1.5 text-lg text-amber-400 cursor-pointer">
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>

                  <button
                    onClick={() => setStep('create')}
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 rounded-xl text-xs"
                  >
                    مشوار جديد 🚗
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PROMO CODES & OFFERS */}
        {activeTab === 'promos' && (
          <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div>
                <h2 className="font-bold text-sm text-white mb-0.5 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-orange-400" /> أكواد الخصم والكوبونات
                </h2>
                <p className="text-[11px] text-slate-400">أدخل كود الخصم لتطبيقه فوراً على مشاويرك القادمة</p>
              </div>

              {/* Promo Input Box */}
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="مثال: ALTAYER50 أو WEEKEND20"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white uppercase placeholder:normal-case placeholder:text-slate-500"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-4 rounded-xl text-xs"
                  >
                    تطبيق الكود
                  </button>
                </div>
                {promoError && (
                  <p className="text-[10px] text-rose-400 font-medium">❌ {promoError}</p>
                )}
              </div>

              {/* Active / Available Promos List */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-300">الكوبونات المتاحة لك اليوم:</p>

                {/* Voucher 1 */}
                <div className="p-3 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-black text-xs text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded">ALTAYER50</span>
                      <span className="text-[10px] text-emerald-400 font-bold">خصم 50%</span>
                    </div>
                    <p className="text-[10px] text-slate-300 mt-1">كود ترحيبي لأول مشوار (بحد أقصى 25 ج.م)</p>
                  </div>
                  <button
                    onClick={() => { setPromoInput('ALTAYER50'); }}
                    className="bg-slate-800 hover:bg-orange-600 text-slate-200 hover:text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition"
                  >
                    استخدام
                  </button>
                </div>

                {/* Voucher 2 */}
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-black text-xs text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded">WEEKEND20</span>
                      <span className="text-[10px] text-blue-300 font-bold">خصم 20%</span>
                    </div>
                    <p className="text-[10px] text-slate-300 mt-1">مشاوير نهاية الأسبوع (الخميس والجمعة)</p>
                  </div>
                  <button
                    onClick={() => { setPromoInput('WEEKEND20'); }}
                    className="bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition"
                  >
                    استخدام
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('book')}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 rounded-xl text-xs"
            >
              العودة إلى حجز المشوار ⬅️
            </button>
          </div>
        )}

        {/* TAB 3: REFERRAL PROGRAM (INVITE & EARN) */}
        {activeTab === 'referrals' && (
          <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3.5 text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center mx-auto text-2xl shadow-lg shadow-orange-600/30">
                🎁
              </div>

              <div>
                <h2 className="font-bold text-sm text-white">ادعُ أصحابك واكسبوا معاً 30 ج.م!</h2>
                <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
                  شارك كودك الخاص: صاحبك هيحصل على <strong>25 ج.م خصم</strong> على أول مشوار، وأنت هينزل في محفظتك <strong>30 ج.م رصيد كاش</strong> فوراً!
                </p>
              </div>

              {/* Referral Code Box */}
              <div className="p-3.5 bg-slate-950 border border-orange-500/40 rounded-2xl space-y-2">
                <span className="text-[10px] text-slate-400 block">كود الدعوة الشخصي الخاص بك:</span>
                <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
                  <span className="font-mono font-black text-base text-orange-400 tracking-widest">{referralCode}</span>
                  <button
                    onClick={handleCopyReferral}
                    className="text-[11px] bg-orange-600 hover:bg-orange-500 text-white font-bold px-2.5 py-1 rounded-lg transition flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    {copiedCode ? 'تم النسخ ✅' : 'نسخ الكود'}
                  </button>
                </div>
              </div>

              {/* Share via WhatsApp Button */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`استخدم كود الخصم بتاعي (${referralCode}) في تطبيق عالطاير واحصل على 25 ج.م خصم على أول مشوار ليك! 🚗⚡`)}`}
                target="_blank"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <Share2 className="w-4 h-4" /> مشاركة الكود عبر الواتساب فوراً
              </a>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-slate-500 text-[10px] block">الأصدقاء المنضمين</span>
                  <span className="font-bold text-white font-mono text-sm">4 أصدقاء</span>
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-slate-500 text-[10px] block">أرباحك المكتسبة</span>
                  <span className="font-bold text-emerald-400 font-mono text-sm">120.00 ج.م</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('book')}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 rounded-xl text-xs"
            >
              العودة إلى حجز المشوار ⬅️
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
