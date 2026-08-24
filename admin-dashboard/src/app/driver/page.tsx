'use client';

import React, { useState } from 'react';
import { 
  Car, 
  Navigation, 
  Power, 
  Wallet, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Gift, 
  Headphones, 
  CheckCircle2, 
  AlertCircle, 
  CreditCard, 
  Smartphone, 
  Send, 
  History,
  TrendingUp,
  Receipt
} from 'lucide-react';

export default function DriverWebApp() {
  const [activeTab, setActiveTab] = useState<'rides' | 'wallet' | 'quests' | 'support'>('rides');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [driverState, setDriverState] = useState<'idle' | 'incoming' | 'arrived' | 'in_progress' | 'settled'>('idle');
  const [otpInput, setOtpInput] = useState<string>('');
  const [proposedFare, setProposedFare] = useState<number>(75);
  
  // Wallet State
  const [walletBalance, setWalletBalance] = useState<number>(140.00);
  const [showTopupModal, setShowTopupModal] = useState<boolean>(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [topupAmount, setTopupAmount] = useState<number>(100);
  const [topupMethod, setTopupMethod] = useState<'instapay' | 'vodafone_cash' | 'fawry' | 'card'>('instapay');
  const [withdrawMethod, setWithdrawMethod] = useState<'instapay' | 'vodafone_cash'>('instapay');
  const [withdrawAddress, setWithdrawAddress] = useState<string>('mahmoud@instapay');

  // Support / Dispute State
  const [supportCategory, setSupportCategory] = useState<string>('cash_not_paid');
  const [disputeMessage, setDisputeMessage] = useState<string>('');
  const [ticketSubmitted, setTicketSubmitted] = useState<boolean>(false);

  // Sample Detailed Ledger
  const [ledgerItems, setLedgerItems] = useState([
    { id: 'TX-104', title: 'مشوار إلى سيتي ستارز (#ALT-8821)', type: 'trip_cash', gross: 75.0, comm: -7.5, net: 67.5, time: 'منذ 15 دقيقة', payment: 'كاش' },
    { id: 'TX-103', title: 'مشوار إلى التجمع الخامس (#ALT-8818)', type: 'trip_cash', gross: 140.0, comm: -14.0, net: 126.0, time: 'منذ ساعتين', payment: 'كاش' },
    { id: 'TX-102', title: 'شحن محفظة - إنستاباي (InstaPay)', type: 'deposit', gross: 100.0, comm: 0, net: 100.0, time: 'أمس 8:30 م', payment: 'إلكتروني' },
    { id: 'TX-101', title: 'مكافأة إنجاز تارجت الذروة (بونص)', type: 'bonus', gross: 50.0, comm: 0, net: 50.0, time: 'أمس 6:00 م', payment: 'مكافأة' },
  ]);

  const handleGoOnline = () => {
    setIsOnline(!isOnline);
  };

  const handleSimulateIncoming = () => {
    setDriverState('incoming');
    setActiveTab('rides');
  };

  const handleAcceptBid = (fare: number) => {
    setProposedFare(fare);
    setDriverState('arrived');
  };

  const handleVerifyOtp = () => {
    if (otpInput === '5924') {
      setDriverState('in_progress');
    } else {
      alert('كود OTP غير صحيح! الكود الصحيح هو 5924');
    }
  };

  const handleCompleteTrip = () => {
    const comm = parseFloat((proposedFare * 0.10).toFixed(2));
    const net = parseFloat((proposedFare - comm).toFixed(2));
    setWalletBalance(prev => parseFloat((prev - comm).toFixed(2)));

    setLedgerItems(prev => [
      {
        id: `TX-${Date.now().toString().slice(-3)}`,
        title: `مشوار جديد (#ALT-${Math.floor(1000 + Math.random() * 9000)})`,
        type: 'trip_cash',
        gross: proposedFare,
        comm: -comm,
        net: net,
        time: 'الآن',
        payment: 'كاش',
      },
      ...prev,
    ]);

    setDriverState('settled');
  };

  const handleProcessTopup = () => {
    setWalletBalance(prev => parseFloat((prev + topupAmount).toFixed(2)));
    setLedgerItems(prev => [
      {
        id: `TX-${Date.now().toString().slice(-3)}`,
        title: `شحن محفظة عبر ${topupMethod === 'instapay' ? 'إنستاباي' : topupMethod === 'vodafone_cash' ? 'فودافون كاش' : 'فوري'}`,
        type: 'deposit',
        gross: topupAmount,
        comm: 0,
        net: topupAmount,
        time: 'الآن',
        payment: 'إلكتروني',
      },
      ...prev,
    ]);
    setShowTopupModal(false);
    alert(`تم شحن المحفظة بنجاح بمبلغ ${topupAmount} ج.م 🟢`);
  };

  const handleProcessWithdraw = () => {
    if (walletBalance < 50) {
      alert('الحد الأدنى لسحب الأرباح هو 50 ج.م');
      return;
    }
    const amount = 100;
    setWalletBalance(prev => parseFloat((prev - amount).toFixed(2)));
    setShowWithdrawModal(false);
    alert(`تم إرسال طلب سحب ${amount} ج.م إلى حسابك (${withdrawAddress}) وسيصلك خلال دقائق 🟢`);
  };

  const handleSubmitDispute = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setDisputeMessage('');
      alert('تم استلام تذكرتك بنجاح! سيقوم فريق العمليات بمراجعة مسار الـ GPS وتعويضك في المحفظة 🟢');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 font-sans" dir="rtl">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[720px] relative">
        
        {/* Header */}
        <header className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-bold text-white shadow-md text-base">
              🚗
            </div>
            <div>
              <h1 className="font-bold text-xs text-white">كابتن محمود السيد</h1>
              <p className="text-[10px] text-emerald-400">تويوتا كورولا • 4.9 ⭐ (340 مشوار)</p>
            </div>
          </div>

          <button
            onClick={handleGoOnline}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              isOnline
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            {isOnline ? 'متصل 🟢' : 'غير متصل ⚪'}
          </button>
        </header>

        {/* Quick Balance & Debt Status Strip */}
        <div className="bg-slate-950/90 px-4 py-2 border-b border-slate-800/80 flex justify-between items-center text-xs">
          <div className="flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-slate-400">رصيد المحفظة:</span>
            <strong className={`font-mono font-bold ${walletBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {walletBalance.toFixed(2)} ج.م
            </strong>
          </div>

          <div className="text-[10px] text-slate-400">
            حد الديون: <span className="text-slate-300 font-mono">-150 ج.م</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex bg-slate-950 border-b border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('rides')}
            className={`flex-1 py-2.5 font-bold text-center border-b-2 transition flex items-center justify-center gap-1 ${
              activeTab === 'rides' ? 'border-orange-500 text-orange-400 bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Car className="w-3.5 h-3.5" /> المشاوير
          </button>
          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex-1 py-2.5 font-bold text-center border-b-2 transition flex items-center justify-center gap-1 ${
              activeTab === 'wallet' ? 'border-orange-500 text-orange-400 bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" /> المحفظة والحسابات
          </button>
          <button
            onClick={() => setActiveTab('quests')}
            className={`flex-1 py-2.5 font-bold text-center border-b-2 transition flex items-center justify-center gap-1 ${
              activeTab === 'quests' ? 'border-orange-500 text-orange-400 bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Gift className="w-3.5 h-3.5" /> التارجت والبونص
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`flex-1 py-2.5 font-bold text-center border-b-2 transition flex items-center justify-center gap-1 ${
              activeTab === 'support' ? 'border-orange-500 text-orange-400 bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" /> الدعم والنزاعات
          </button>
        </nav>

        {/* TAB 1: RIDES SCREEN */}
        {activeTab === 'rides' && (
          <div className="flex-1 flex flex-col justify-between">
            {/* Map Visual Area */}
            <div className="h-44 bg-slate-900 relative border-b border-slate-800 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>

              {driverState === 'idle' && (
                <div className="text-center p-4 z-10">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mx-auto mb-2 animate-ping">
                    🚗
                  </div>
                  <p className="font-bold text-xs text-slate-300">الرادار يبحث عن طلبات قريبة في وسط البلد...</p>
                </div>
              )}

              {driverState === 'incoming' && (
                <div className="text-center p-4 z-10 animate-bounce">
                  <span className="text-3xl">🔔</span>
                  <p className="font-bold text-xs text-orange-400 mt-1">طلب مشوار مزايدة جديد!</p>
                </div>
              )}

              {(driverState === 'arrived' || driverState === 'in_progress') && (
                <div className="text-center p-4 z-10">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center mx-auto mb-1">
                    <Navigation className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="font-bold text-xs text-blue-300">
                    {driverState === 'arrived' ? 'أنت في الطريق لنقطة الركوب' : 'المشوار جاري إلى سيتي ستارز'}
                  </p>
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              {driverState === 'idle' && (
                <div className="space-y-3 my-auto text-center">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1.5">
                    <p className="text-xs text-slate-400">سيارتك المسجلة:</p>
                    <h3 className="font-bold text-xs text-white">تويوتا كورولا 2022 (أ ب ج 1234)</h3>
                    <span className="inline-block text-[10px] bg-slate-800 text-orange-400 px-2 py-0.5 rounded font-bold">
                      فئة عادي (اقتصادي)
                    </span>
                  </div>

                  <button
                    onClick={handleSimulateIncoming}
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl text-xs transition shadow-lg shadow-orange-600/20"
                  >
                    محاكاة: استقبال طلب راكب فوري 🔔
                  </button>
                </div>
              )}

              {driverState === 'incoming' && (
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-950 border-2 border-orange-500 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded font-bold text-[10px]">
                        🤝 طلب مزايدة وتفاوض
                      </span>
                      <span className="text-slate-400 text-[11px]">يبعد 1.2 كم (3 د)</span>
                    </div>

                    <div className="text-xs space-y-1 text-slate-300">
                      <p>📍 <strong>من:</strong> ميدان التحرير، وسط البلد</p>
                      <p>🏁 <strong>إلى:</strong> سيتي ستارز، مدينة نصر (12.5 كم)</p>
                    </div>

                    <div className="p-2 bg-slate-900 rounded-xl flex justify-between items-center">
                      <span className="text-xs text-slate-400">سعر الزبون:</span>
                      <span className="text-lg font-bold text-white font-mono">75.00 ج.م</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1 font-medium">تقديم عرض سعر سريع:</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      <button
                        onClick={() => handleAcceptBid(75)}
                        className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition"
                      >
                        75 ج (قبول)
                      </button>
                      <button
                        onClick={() => handleAcceptBid(80)}
                        className="p-2 bg-slate-800 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition"
                      >
                        80 (+5)
                      </button>
                      <button
                        onClick={() => handleAcceptBid(85)}
                        className="p-2 bg-slate-800 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition"
                      >
                        85 (+10)
                      </button>
                      <button
                        onClick={() => handleAcceptBid(90)}
                        className="p-2 bg-slate-800 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition"
                      >
                        90 (+15)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {driverState === 'arrived' && (
                <div className="space-y-3">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-xs text-white">الزبون: أحمد سالم</h3>
                      <p className="text-[10px] text-slate-400">نقطة الركوب: ميدان التحرير</p>
                    </div>
                    <span className="font-bold text-sm text-orange-400">{proposedFare} ج.م</span>
                  </div>

                  {/* OTP Input Form */}
                  <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                    <label className="text-xs text-slate-300 font-medium block">
                      أدخل رمز أمان بدء الرحلة (OTP) من الراكب:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="5924"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-center text-base font-mono font-bold text-white tracking-widest"
                      />
                      <button
                        onClick={handleVerifyOtp}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 rounded-xl text-xs"
                      >
                        بدء 🚀
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {driverState === 'in_progress' && (
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-1">
                    <p className="text-xs text-emerald-400 font-bold">🟢 المشوار جاري الآن</p>
                    <p className="text-[11px] text-slate-300">الوجهة: سيتي ستارز، مدينة نصر</p>
                  </div>

                  <button
                    onClick={handleCompleteTrip}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-xl shadow-lg text-xs"
                  >
                    🏁 إنهاء المشوار وتحصيل الأجرة (كاش)
                  </button>
                </div>
              )}

              {driverState === 'settled' && (
                <div className="space-y-3 text-center py-2">
                  <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-xs">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-lg">
                      💰
                    </div>
                    <h3 className="font-bold text-xs text-white">تم تحصيل الأجرة بنجاح</h3>
                    <div className="text-slate-300 divide-y divide-slate-800 pt-1 space-y-1 text-[11px]">
                      <div className="flex justify-between py-1">
                        <span>الأجرة المستلمة كاش من الزبون:</span>
                        <span className="font-bold text-white">{proposedFare}.00 ج.م</span>
                      </div>
                      <div className="flex justify-between py-1 text-rose-400">
                        <span>عمولة التطبيق المخصومة (10%):</span>
                        <span className="font-bold">-{(proposedFare * 0.10).toFixed(2)} ج.م</span>
                      </div>
                      <div className="flex justify-between py-1 text-emerald-400 font-bold">
                        <span>صافي ربحك في جيبك:</span>
                        <span>{(proposedFare * 0.90).toFixed(2)} ج.م</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setDriverState('idle')}
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 rounded-xl text-xs"
                  >
                    جاهز لطلب جديد 🟢
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: DETAILED WALLET & SETTLEMENT HUB */}
        {activeTab === 'wallet' && (
          <div className="p-4 flex-1 flex flex-col justify-between space-y-4 overflow-y-auto">
            {/* Wallet Big Card */}
            <div className="p-4 bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[11px] text-slate-400 font-medium">الرصيد الصافي المتاح:</span>
                  <div className="text-2xl font-mono font-black text-emerald-400 mt-0.5">
                    {walletBalance.toFixed(2)} <span className="text-xs text-slate-300">ج.م</span>
                  </div>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-mono">
                  الحد المسموح: -150 ج.م
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setShowTopupModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md"
                >
                  <ArrowDownLeft className="w-3.5 h-3.5" /> شحن / سداد عمولة
                </button>
                <button
                  onClick={() => setShowWithdrawModal(true)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-orange-400" /> سحب أرباحك
                </button>
              </div>
            </div>

            {/* Financial Summary Strip */}
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-slate-500 text-[10px] block">إجمالي دخل اليوم</span>
                <span className="font-bold text-sm text-slate-200 font-mono">315.00 ج.م</span>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-slate-500 text-[10px] block">إجمالي دخل الأسبوع</span>
                <span className="font-bold text-sm text-emerald-400 font-mono">2,480.00 ج.م</span>
              </div>
            </div>

            {/* Detailed Ledger List */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xs text-slate-300 flex items-center gap-1">
                  <Receipt className="w-3.5 h-3.5 text-orange-400" /> كشف الحركات والرحلات:
                </h3>
                <span className="text-[10px] text-slate-500">آخر العمليات</span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {ledgerItems.map((item) => (
                  <div key={item.id} className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-200 text-[11px]">{item.title}</p>
                      <p className="text-[10px] text-slate-500">{item.time} • دفع {item.payment}</p>
                    </div>
                    <div className="text-left">
                      <p className={`font-mono font-bold text-xs ${item.comm !== 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {item.comm !== 0 ? `${item.comm.toFixed(2)} ج.م (عمولة)` : `+${item.net.toFixed(2)} ج.م`}
                      </p>
                      <p className="text-[9px] text-slate-400 font-mono">صافي لك: {item.net} ج</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: QUESTS & INCENTIVES */}
        {activeTab === 'quests' && (
          <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <h2 className="font-bold text-sm text-white mb-1 flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-amber-400" /> مكافآت وتارجت الكابتن اليومي
              </h2>
              <p className="text-[11px] text-slate-400">حقق التارجت واحصل على مبالغ نقدية إضافية معفية من العمولة 100%!</p>
            </div>

            <div className="space-y-3">
              {/* Quest 1 */}
              <div className="p-3.5 bg-slate-950 border border-orange-500/30 rounded-2xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xs text-slate-200">تارجت ساعات الذروة المسائية 🌙</h3>
                    <p className="text-[10px] text-slate-400">أنجز 6 مشاوير بين 5:00 م و 9:00 م</p>
                  </div>
                  <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-bold">
                    +60 ج.م بونص
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>التقدم: 4 من 6 مشاوير</span>
                    <span className="text-orange-400 font-bold">66%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full w-2/3"></div>
                  </div>
                </div>
              </div>

              {/* Quest 2 */}
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xs text-slate-200">تارجت بطل الأسبوع 🏆</h3>
                    <p className="text-[10px] text-slate-400">أنجز 40 مشواراً خلال الأسبوع</p>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                    +300 ج.م بونص
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>التقدم: 28 من 40</span>
                    <span className="text-emerald-400 font-bold">70%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[70%]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[11px] text-amber-300 text-center">
              💡 المكافآت والبونص تُضاف مباشرة إلى رصيدك الصافي وتسحبها في أي وقت!
            </div>
          </div>
        )}

        {/* TAB 4: SUPPORT & DISPUTE RESOLUTION */}
        {activeTab === 'support' && (
          <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <h2 className="font-bold text-sm text-white mb-1 flex items-center gap-1.5">
                <Headphones className="w-4 h-4 text-blue-400" /> مركز مساعدة الكابتن والشكاوى
              </h2>
              <p className="text-[11px] text-slate-400">فريق العمليات متواجد 24/7 لحماية حقوقك وتعويضك فوراً</p>
            </div>

            <form onSubmit={handleSubmitDispute} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">نوع المشكلة في المشوار:</label>
                <select
                  value={supportCategory}
                  onChange={(e) => setSupportCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="cash_not_paid">الراكب نزل دون دفع الأجرة كاش</option>
                  <option value="cancel_after_arrival">الراكب ألغى المشوار بعد وصولي لنقطة الركوب</option>
                  <option value="toll_gate">استرداد رسوم بوابات أو كارتة طريق</option>
                  <option value="wrong_route_dispute">خلاف حول مسار الخريطة والمسافة</option>
                  <option value="other">مشكلة أخرى في الحساب أو الوثائق</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">رقم الرحلة:</label>
                <input
                  type="text"
                  defaultValue="#ALT-8821 (سيتي ستارز)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-slate-300 font-mono"
                  readOnly
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">تفاصيل البلاغ:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="اكتب ما حدث بدقة لمراجعة مسار الـ GPS وتعويضك..."
                  value={disputeMessage}
                  onChange={(e) => setDisputeMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={ticketSubmitted}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                {ticketSubmitted ? 'جاري الإرسال...' : 'إرسال البلاغ لفريق العمليات'}
              </button>
            </form>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-xs">
              <p className="font-bold text-slate-300">📞 رقم الطوارئ والدعم الهاتفي:</p>
              <p className="text-emerald-400 font-mono font-bold">19820 (خط ساخن مخصص للكباتن)</p>
            </div>
          </div>
        )}

        {/* MODAL: TOP-UP WALLET */}
        {showTopupModal && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 w-full max-w-sm space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-white">سداد العمولات / شحن المحفظة</h3>
                <button onClick={() => setShowTopupModal(false)} className="text-slate-400 text-sm">✕</button>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1.5">اختر وسيلة الدفع في مصر:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTopupMethod('instapay')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-right transition ${
                      topupMethod === 'instapay' ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    ⚡ إنستاباي (InstaPay)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTopupMethod('vodafone_cash')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-right transition ${
                      topupMethod === 'vodafone_cash' ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    📱 فودافون / محافظ كاش
                  </button>
                  <button
                    type="button"
                    onClick={() => setTopupMethod('fawry')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-right transition ${
                      topupMethod === 'fawry' ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    🏪 كود فوري (Fawry)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTopupMethod('card')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-right transition ${
                      topupMethod === 'card' ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    💳 كارت بنكي (Visa/Master)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">المبلغ المراد شحنه (ج.م):</label>
                <div className="grid grid-cols-3 gap-1.5 mb-2">
                  {[50, 100, 200].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopupAmount(amt)}
                      className={`py-1.5 rounded-lg border text-xs font-mono font-bold ${
                        topupAmount === amt ? 'bg-orange-600 border-orange-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      {amt} ج.م
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleProcessTopup}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs shadow-lg shadow-emerald-600/30"
              >
                تأكيد الشحن فوراً 🟢
              </button>
            </div>
          </div>
        )}

        {/* MODAL: WITHDRAW EARNINGS */}
        {showWithdrawModal && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 w-full max-w-sm space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-white">طلب سحب الأرباح لحسابك</h3>
                <button onClick={() => setShowWithdrawModal(false)} className="text-slate-400 text-sm">✕</button>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl text-xs flex justify-between items-center">
                <span className="text-slate-400">الرصيد المتاح للسحب:</span>
                <span className="font-bold text-emerald-400 font-mono text-sm">{walletBalance.toFixed(2)} ج.م</span>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">طريقة استلام الأرباح:</label>
                <select
                  value={withdrawMethod}
                  onChange={(e: any) => setWithdrawMethod(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white mb-2"
                >
                  <option value="instapay">تحويل فوري عبر إنستاباي (InstaPay IPA)</option>
                  <option value="vodafone_cash">محفظة هاتفية (فودافون / أورنج / اتصالات / وي كاش)</option>
                </select>

                <label className="text-xs text-slate-400 block mb-1">عنوان الحساب / رقم المحفظة:</label>
                <input
                  type="text"
                  value={withdrawAddress}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                  placeholder="مثال: yourname@instapay أو 01012345678"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>

              <button
                onClick={handleProcessWithdraw}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl text-xs shadow-lg shadow-orange-600/30"
              >
                تأكيد سحب 100.00 ج.م 💸
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
