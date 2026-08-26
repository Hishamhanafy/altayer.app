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
  Receipt,
  Crown,
  Sparkles,
  Zap,
  Award,
  Camera,
  RefreshCw,
  X,
  FileText,
  UserCheck
} from 'lucide-react';
import LiveInteractiveMap from '../../components/LiveInteractiveMap';

export default function DriverWebApp() {
  const [activeTab, setActiveTab] = useState<'radar' | 'wallet' | 'incentives' | 'profile'>('radar');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [operatingMode, setOperatingMode] = useState<'AKHIL_FLEX' | 'AKHIL_GUARANTEE'>('AKHIL_FLEX');
  const [driverState, setDriverState] = useState<'idle' | 'incoming' | 'arrived' | 'in_progress' | 'settled'>('idle');
  const [otpInput, setOtpInput] = useState<string>('');
  const [currentFare, setCurrentFare] = useState<number>(85);
  
  // Wallet State
  const [walletBalance, setWalletBalance] = useState<number>(320.00);
  const [cashDebt, setCashDebt] = useState<number>(140.00);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(150);
  const [payoutMethod, setPayoutMethod] = useState<'instapay' | 'wallet'>('instapay');
  const [withdrawAddress, setWithdrawAddress] = useState<string>('hisham15008@instapay');
  const [withdrawPhone, setWithdrawPhone] = useState<string>('01206777771');

  // Camera & KYC Verification State
  const [showCameraModal, setShowCameraModal] = useState<boolean>(false);
  const [kycDocType, setKycDocType] = useState<'selfie' | 'nationalId' | 'license' | 'drugTest'>('selfie');
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<{ [key: string]: string }>({
    selfie: '',
    nationalId: '',
    license: '',
    drugTest: '',
  });
  const [isScanningAi, setIsScanningAi] = useState<boolean>(false);
  const [cameraFacing, setCameraFacing] = useState<'user' | 'environment'>('user');
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Captain Tier & Score
  const [captainScore, setCaptainScore] = useState<number>(94);
  const [captainTier, setCaptainTier] = useState<string>('نخبة أخيل (ELITE)');

  // Camera Control Functions
  const startCamera = async (facing: 'user' | 'environment' = cameraFacing) => {
    try {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facing,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    } catch (err) {
      console.warn('Camera access info:', err);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const handleSnapPhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setIsScanningAi(true);
        setTimeout(() => {
          setCapturedPhotos(prev => ({ ...prev, [kycDocType]: dataUrl }));
          setIsScanningAi(false);
          stopCamera();
        }, 1200);
      }
    }
  };

  const handleFileCaptureFallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setIsScanningAi(true);
        setTimeout(() => {
          setCapturedPhotos(prev => ({ ...prev, [kycDocType]: dataUrl }));
          setIsScanningAi(false);
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSimulateIncoming = () => {
    setDriverState('incoming');
    setActiveTab('radar');
  };

  const handleAcceptBid = (fare: number) => {
    setCurrentFare(fare);
    setDriverState('arrived');
  };

  const handleVerifyOtp = () => {
    if (otpInput === '8492' || otpInput.length === 4) {
      setDriverState('in_progress');
    } else {
      alert('كود الأمان هو 8492');
    }
  };

  const handleCompleteTrip = () => {
    const commission = operatingMode === 'AKHIL_FLEX' ? currentFare * 0.10 : 0;
    setCashDebt(prev => prev + commission);
    setDriverState('settled');
  };

  const handleExecuteInstaPayPayout = () => {
    if (withdrawAmount > walletBalance) {
      alert('الرصيد المتاح غير كافٍ!');
      return;
    }
    setWalletBalance(prev => prev - withdrawAmount);
    setShowWithdrawModal(false);
    if (payoutMethod === 'instapay') {
      alert(`تم تحويل ${withdrawAmount} ج.م لحظياً إلى إنستاباي (IPA: ${withdrawAddress}) بنجاح! ⚡🟢 (كود المعاملة: #INS-${Math.floor(10000 + Math.random() * 90000)})`);
    } else {
      alert(`تم تحويل ${withdrawAmount} ج.م لحظياً إلى محفظة كاش (${withdrawPhone}) بنجاح! 📱🟢 (كود المعاملة: #WAL-${Math.floor(10000 + Math.random() * 90000)})`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 font-sans" dir="rtl">
      {/* Mobile Shell Simulation Container */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[760px] relative">
        
        {/* AKHIL Driver Brand Header */}
        <header className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-xl shadow-lg shadow-amber-500/20 text-slate-950 font-bold">
              👨🏻‍✈️
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-base text-white">أخيل كابتن</h1>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded">👑 {captainTier}</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">التقييم: 4.95 ⭐ • نقاط الأداء: {captainScore}/100</p>
            </div>
          </div>

          {/* Go Online Switch */}
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-lg ${
              isOnline 
                ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30 font-black' 
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            {isOnline ? 'متصل 🟢' : 'غير متصل'}
          </button>
        </header>

        {/* Operating Mode Bar */}
        <div className="p-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">نمط التشغيل:</span>
          <div className="flex gap-1">
            <button
              onClick={() => setOperatingMode('AKHIL_FLEX')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                operatingMode === 'AKHIL_FLEX' 
                  ? 'bg-amber-500 text-slate-950 font-black' 
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              عمولة مرنة (10%) ⚡
            </button>
            <button
              onClick={() => setOperatingMode('AKHIL_GUARANTEE')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                operatingMode === 'AKHIL_GUARANTEE' 
                  ? 'bg-emerald-500 text-slate-950 font-black' 
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              ضمان مالي شهري 🛡️
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-4 bg-slate-950 border-b border-slate-800 p-1.5 gap-1 text-[11px] font-bold">
          <button
            onClick={() => setActiveTab('radar')}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1 ${
              activeTab === 'radar' ? 'bg-indigo-900 text-amber-300 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Navigation className="w-3 h-3" />
            الرادار
          </button>
          <button
            onClick={() => setActiveTab('wallet')}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1 ${
              activeTab === 'wallet' ? 'bg-indigo-900 text-amber-300 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wallet className="w-3 h-3" />
            المحفظة
          </button>
          <button
            onClick={() => setActiveTab('incentives')}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1 ${
              activeTab === 'incentives' ? 'bg-indigo-900 text-amber-300 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Crown className="w-3 h-3" />
            الحوافز 👑
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1 ${
              activeTab === 'profile' ? 'bg-indigo-900 text-amber-300 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-3 h-3" />
            الرتبة
          </button>
        </div>

        {/* TAB 1: RADAR & ACTIVE ORDERS */}
        {activeTab === 'radar' && (
          <div className="flex-1 flex flex-col justify-between p-4 overflow-y-auto">
            {driverState === 'idle' && (
              <div className="space-y-3.5 text-center py-2">
                <div className="flex justify-between items-center px-1 text-right">
                  <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                    <span>🛰️</span> خريطة الرادار الملاحي والطلب الحي
                  </span>
                  <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full animate-pulse">
                    ● أنت متصل الآن (Live GPS)
                  </span>
                </div>

                <LiveInteractiveMap
                  height="220px"
                  center={[30.0444, 31.2357]}
                  zoom={13}
                  markers={[
                    { id: 'me', lat: 30.0444, lng: 31.2357, title: 'موقعك الحالي (كابتن أخيل 👑)', car: 'تويوتا كورولا 2023', type: 'driver' },
                    { id: 'hot1', lat: 30.0580, lng: 31.2500, title: 'منطقة طلب مرتفع: العتبة ورمسيس 🔥', type: 'heat' },
                    { id: 'hot2', lat: 30.0733, lng: 31.3467, title: 'منطقة طلب مرتفع: سيتي ستارز ومصر الجديدة 🔥', type: 'heat' },
                  ]}
                />

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-right text-xs space-y-2">
                  <div className="flex justify-between text-slate-400">
                    <span>حد المديونية المتاح:</span>
                    <strong className="text-emerald-400 font-mono">{(1000 - cashDebt).toFixed(0)} / 1,000 ج.م</strong>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${((1000 - cashDebt) / 1000) * 100}%` }} />
                  </div>
                </div>

                <button
                  onClick={handleSimulateIncoming}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs transition shadow-lg shadow-amber-500/20"
                >
                  محاكاة استقبال طلب رحلة جديد ⚡
                </button>
              </div>
            )}

            {/* Incoming Order Card */}
            {driverState === 'incoming' && (
              <div className="p-4 bg-gradient-to-b from-indigo-950 to-slate-950 border-2 border-amber-500 rounded-3xl space-y-4 shadow-2xl">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span>🚗</span> AKHIL PLUS (بلس)
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">يبعد 1.2 كم (3 د)</span>
                </div>

                <div className="space-y-2 text-right">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">نقطة الركوب</span>
                      <span className="text-xs font-bold text-white">ميدان طلعت حرب، وسط البلد</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-1" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">الوجهة</span>
                      <span className="text-xs font-bold text-amber-300">سيتي ستارز، مدينة نصر (12.4 كم)</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-2xl flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">سعر الراكب المقترح</span>
                    <span className="text-xl font-black text-amber-400 font-mono">{currentFare} ج.م</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">صافي ربحك كاش (90%)</span>
                    <span className="text-sm font-black text-emerald-400 font-mono">{(currentFare * 0.9).toFixed(1)} ج.م</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAcceptBid(currentFare)}
                    className="py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs shadow-lg"
                  >
                    قبول السعر ({currentFare} ج) 🚀
                  </button>
                  <button
                    onClick={() => handleAcceptBid(currentFare + 15)}
                    className="py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-lg"
                  >
                    مزايدة (+15 ج) 🤝
                  </button>
                </div>
              </div>
            )}

            {/* Arrived / Waiting & PIN Verification */}
            {driverState === 'arrived' && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-3xl space-y-4">
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-xl">
                    📍
                  </div>
                  <h3 className="font-extrabold text-sm text-white">وصلت إلى نقطة الركوب</h3>
                  <p className="text-[11px] text-slate-400">أول دقيقتين مجاناً ثم يحتسب الانتظار تلقائياً</p>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-2xl space-y-2">
                  <label className="text-xs text-slate-300 font-bold block text-center">أدخل كود أمان بدء الرحلة (PIN):</label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="8492"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 text-center text-lg font-mono font-black text-amber-400 tracking-widest"
                  />
                  <button
                    onClick={handleVerifyOtp}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                  >
                    تحقق وابدأ الرحلة 🟢
                  </button>
                </div>
              </div>
            )}

            {/* In Progress */}
            {driverState === 'in_progress' && (
              <div className="p-4 bg-gradient-to-b from-indigo-950 to-slate-950 border border-indigo-500/40 rounded-3xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Navigation className="w-4 h-4" />
                    الملاحة الحية للوجهة
                  </span>
                  <span className="text-xs font-mono font-bold text-white bg-slate-900 px-2 py-0.5 rounded">
                    متبقي 4.2 كم (7 د)
                  </span>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-2xl text-center space-y-1">
                  <span className="text-xs text-slate-400">قيمة الأجرة المستحقة عند الوصول:</span>
                  <span className="text-2xl font-black text-amber-400 font-mono block">{currentFare} ج.م</span>
                  <span className="text-[10px] text-emerald-400">طريقة الدفع: كاش (نقداً)</span>
                </div>

                <button
                  onClick={handleCompleteTrip}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-xs shadow-lg"
                >
                  إنهاء المشوار وتحصيل الأجرة 🏁
                </button>
              </div>
            )}

            {/* Settled Trip Summary */}
            {driverState === 'settled' && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-3xl space-y-4 text-center">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                  💵
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-white">تم تحصيل {currentFare} ج.م كاش بنجاح!</h3>
                  <p className="text-xs text-slate-400">
                    عمولة أخيل 10%: <strong className="text-rose-400 font-mono">{(currentFare * 0.10).toFixed(1)} ج.م</strong> | صافي ربحك: <strong className="text-emerald-400 font-mono">{(currentFare * 0.90).toFixed(1)} ج.م</strong>
                  </p>
                </div>

                <button
                  onClick={() => {
                    setDriverState('idle');
                    setOtpInput('');
                  }}
                  className="w-full py-3 bg-amber-500 text-slate-950 font-black rounded-2xl text-xs hover:bg-amber-400 shadow-lg"
                >
                  العودة للرادار واستقبال طلبات جديدة 🐎
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: WALLET & INSTAPAY CASHOUT */}
        {activeTab === 'wallet' && (
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-medium">رصيد الأرباح القابل للسحب:</span>
                <span className="text-xl font-black text-emerald-400 font-mono">{walletBalance} ج.م</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span>مديونية عمولات الكاش المستحقة:</span>
                <span className="font-bold text-rose-400 font-mono">{cashDebt} ج.م (من 1,000 ج حد أقصى)</span>
              </div>
            </div>

            <button
              onClick={() => setShowWithdrawModal(true)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <Zap className="w-4 h-4" />
              سحب أرباح لحظي 24/7 عبر InstaPay ⚡
            </button>

            {/* InstaPay & Wallet Payout Modal */}
            {showWithdrawModal && (
              <div className="p-4 bg-slate-900 border border-amber-500/40 rounded-2xl space-y-3 shadow-2xl">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h4 className="font-bold text-xs text-amber-400 flex items-center gap-1.5">
                    <span>⚡</span> تحويل وسحب الأرباح الفوري (Instant Payout)
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">المتاح: {walletBalance} ج.م</span>
                </div>

                {/* Method Switcher */}
                <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setPayoutMethod('instapay')}
                    className={`py-1.5 rounded-lg transition ${
                      payoutMethod === 'instapay' ? 'bg-indigo-900 text-amber-300 shadow' : 'text-slate-400'
                    }`}
                  >
                    ⚡ إنستاباي (InstaPay)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayoutMethod('wallet')}
                    className={`py-1.5 rounded-lg transition ${
                      payoutMethod === 'wallet' ? 'bg-indigo-900 text-amber-300 shadow' : 'text-slate-400'
                    }`}
                  >
                    📱 محفظة كاش
                  </button>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">المبلغ المطلوب سحبه (ج.م):</label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                {payoutMethod === 'instapay' ? (
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">عنوان الدفع اللحظي (IPA):</label>
                    <input
                      type="text"
                      value={withdrawAddress}
                      onChange={(e) => setWithdrawAddress(e.target.value)}
                      className="w-full bg-slate-950 border border-amber-500/50 rounded-xl p-2 text-amber-300 text-xs font-mono font-bold"
                    />
                    <span className="text-[9px] text-emerald-400 block mt-1">✓ حساب الاختبار المعتمد: hisham15008@instapay</span>
                  </div>
                ) : (
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">رقم المحفظة الإلكترونية (فودافون / أورنج / ميزة كاش):</label>
                    <input
                      type="text"
                      value={withdrawPhone}
                      onChange={(e) => setWithdrawPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-amber-500/50 rounded-xl p-2 text-amber-300 text-xs font-mono font-bold"
                    />
                    <span className="text-[9px] text-emerald-400 block mt-1">✓ محفظة الاختبار المعتمدة: 01206777771</span>
                  </div>
                )}

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleExecuteInstaPayPayout}
                    className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white text-xs font-black rounded-xl shadow"
                  >
                    تأكيد التحويل الفوري ({withdrawAmount} ج.م)
                  </button>
                  <button
                    onClick={() => setShowWithdrawModal(false)}
                    className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: 9 CAPTAIN INCENTIVES HUB */}
        {activeTab === 'incentives' && (
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <div className="p-3 bg-gradient-to-r from-amber-500/20 to-indigo-500/20 border border-amber-500/30 rounded-2xl">
              <h3 className="font-extrabold text-xs text-amber-300 flex items-center gap-1.5">
                <Crown className="w-4 h-4" />
                مركز حوافز الكابتن (أخيل طريق للأفضل)
              </h3>
              <p className="text-[10px] text-slate-300 mt-1">مكافآت يومية، أسبوعية، وجائزة الفئة الملكية سيارة زيرو سنوياً 👑</p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {[
                { title: '1. AKHIL READY', desc: 'رصيد تشغيلي مقدم لتغطية عمولات أول 20 مشواراً.', tag: 'رصيد' },
                { title: '2. AKHIL FLEX RATE', desc: 'عمولة متناقصة تبدأ من 10% وتنخفض مع كثرة المشاوير.', tag: '10%' },
                { title: '3. AKHIL FREE MOBILE', desc: 'هاتف ذكي هدية لأفضل كباتن كل ربع سنة.', tag: 'موبايل 📱' },
                { title: '4. AKHIL WEEKLY FLOW', desc: 'بونص نقدي أسبوعي عند إتمام 40 مشواراً منتظماً.', tag: '+350 ج' },
                { title: '5. FREE CAR (الجائزة الكبرى 👑)', desc: 'سيارة زيرو سنوياً لأعلى كابتن برتبة القائد الملكي.', tag: 'سيارة 🚗' },
                { title: '6. AKHIL LINK', desc: 'اكسب 200 ج.م مع كل كابتن ينضم بدعوتك.', tag: 'دعوة' },
                { title: '7. AKHIL SERVICES', desc: 'خصم 25% على الزيوت والصيانة والإطارات.', tag: 'صيانة' },
                { title: '8. AKHIL FAMILY', desc: 'كوبونات مشاوير مجانية وتأمين صحي لعائلتك.', tag: 'عائلتك' },
                { title: '9. برامج الدعم والحماية', desc: 'تأمين ضد الحوادث وتعويض فوري عن أي مشاوير كاش متعثرة.', tag: 'حماية 🛡️' },
              ].map((inc, i) => (
                <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-xs text-amber-400">{inc.title}</h4>
                    <p className="text-[10px] text-slate-400">{inc.desc}</p>
                  </div>
                  <span className="text-[10px] font-bold bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-slate-200">
                    {inc.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: 100-POINT TIERS */}
        {activeTab === 'profile' && (
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center mx-auto text-2xl font-black shadow-lg">
                👑
              </div>
              <h3 className="font-extrabold text-sm text-white">الكابتن: محمود السيد</h3>
              <p className="text-xs text-amber-400 font-bold">{captainTier}</p>
              <div className="pt-2">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>مجموع نقاط الأداء:</span>
                  <strong className="text-white font-mono">{captainScore} / 100 نقطة</strong>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full" style={{ width: `${captainScore}%` }} />
                </div>
              </div>
            </div>

            {/* Live Camera KYC Biometric Verification Section */}
            <div className="p-4 bg-gradient-to-br from-indigo-950 to-slate-950 border border-slate-800 rounded-2xl space-y-3 shadow-xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📸</span>
                  <div>
                    <h4 className="font-black text-xs text-white">التوثيق الرقمي بالكاميرا (KYC)</h4>
                    <p className="text-[10px] text-slate-400">توثيق الوجه البيومتري وفحص المستندات الرسمية</p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  موثق 100% 🟢
                </span>
              </div>

              {/* Document Thumbnails Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'selfie', name: 'سيلفي الوجه الحي 👤', photo: capturedPhotos.selfie, desc: 'مطابقة بيومترية' },
                  { id: 'nationalId', name: 'بطاقة الرقم القومي 🪪', photo: capturedPhotos.nationalId, desc: 'سارية ومطابقة' },
                  { id: 'license', name: 'رخصة القيادة والسيارة 🚗', photo: capturedPhotos.license, desc: 'فحص مروري معتمد' },
                  { id: 'drugTest', name: 'الفحص الطبي والمخدرات 🧪', photo: capturedPhotos.drugTest, desc: 'خلو من السموم' },
                ].map((doc) => (
                  <div key={doc.id} className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-white text-[11px] flex items-center justify-between">
                        <span>{doc.name}</span>
                        {doc.photo ? <span className="text-emerald-400 text-xs">✓</span> : <span className="text-amber-400 text-[10px]">مكتمل</span>}
                      </div>
                      <span className="text-[9px] text-slate-400 block mt-0.5">{doc.desc}</span>
                    </div>
                    {doc.photo && (
                      <div className="mt-2 h-14 rounded-lg overflow-hidden border border-emerald-500/40">
                        <img src={doc.photo} alt={doc.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <button
                      onClick={() => {
                        setKycDocType(doc.id as any);
                        setShowCameraModal(true);
                        startCamera(doc.id === 'selfie' ? 'user' : 'environment');
                      }}
                      className="mt-2 py-1 px-2 bg-slate-800 hover:bg-indigo-900 text-amber-300 hover:text-white rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1"
                    >
                      <Camera className="w-3 h-3" />
                      {doc.photo ? 'إعادة التصوير 📸' : 'فتح الكاميرا 📸'}
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setKycDocType('selfie');
                  setShowCameraModal(true);
                  startCamera('user');
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" />
                فتح الكاميرا والتحقق المباشر (Live Face Scanner)
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300">سلم مستويات أخيل (100 نقطة):</span>
              {[
                { name: '1. كابتن / برثونة أخيل', pts: '0 - 40 نقطة', active: false },
                { name: '2. فريق أخيل (TEAM)', pts: '41 - 70 نقطة', active: false },
                { name: '3. قادة أخيل (LEADERS)', pts: '71 - 85 نقطة', active: false },
                { name: '4. نخبة أخيل (ELITE)', pts: '86 - 95 نقطة', active: true },
                { name: '5. القائد الملكي (ROYAL AKHIL) 👑', pts: '96 - 100 نقطة (مؤهل للسيارة)', active: false },
              ].map((tier, idx) => (
                <div key={idx} className={`p-3 rounded-2xl border flex justify-between items-center text-xs ${
                  tier.active ? 'bg-indigo-950/80 border-amber-500 text-white font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}>
                  <span>{tier.name}</span>
                  <span className="font-mono text-[10px]">{tier.pts}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LIVE CAMERA KYC SCANNER MODAL */}
        {showCameraModal && (
          <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col justify-end p-0">
            <div className="bg-slate-900 border-t-2 border-amber-500 rounded-t-3xl p-5 space-y-4 max-h-[90%] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
              
              {/* Header */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📸</span>
                  <div>
                    <h3 className="font-black text-sm text-white">
                      {kycDocType === 'selfie' && 'التقاط سيلفي الوجه الحي (Live Selfie)'}
                      {kycDocType === 'nationalId' && 'مسح بطاقة الرقم القومي (National ID)'}
                      {kycDocType === 'license' && 'مسح رخصة القيادة والسيارة (License)'}
                      {kycDocType === 'drugTest' && 'مسح شهادة الفحص الطبي (Medical Test)'}
                    </h3>
                    <p className="text-[10px] text-slate-400">وجه الكاميرا داخل الإطار واضغط لالتقاط الصورة</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    stopCamera();
                    setShowCameraModal(false);
                  }}
                  className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Document Selector Pills */}
              <div className="grid grid-cols-4 gap-1 text-[9px] font-bold">
                {[
                  { id: 'selfie', label: '👤 سيلفي' },
                  { id: 'nationalId', label: '🪪 البطاقة' },
                  { id: 'license', label: '🚗 الرخصة' },
                  { id: 'drugTest', label: '🧪 الفحص' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setKycDocType(t.id as any);
                      startCamera(t.id === 'selfie' ? 'user' : 'environment');
                    }}
                    className={`py-1.5 rounded-lg transition ${
                      kycDocType === t.id ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Live Video Camera Viewfinder Box */}
              <div className="relative aspect-[4/3] bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-700 flex items-center justify-center shadow-inner">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />

                {/* AR Frame Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-6">
                  {kycDocType === 'selfie' ? (
                    <div className="w-44 h-56 rounded-[50%] border-2 border-dashed border-amber-400/80 ring-8 ring-amber-500/10 animate-pulse flex items-center justify-center">
                      <span className="text-[10px] text-amber-300 font-bold bg-slate-950/70 px-2 py-0.5 rounded-full">
                        ضع وجهك داخل الإطار 👤
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-44 rounded-2xl border-2 border-dashed border-emerald-400/80 ring-8 ring-emerald-500/10 animate-pulse flex items-center justify-center">
                      <span className="text-[10px] text-emerald-300 font-bold bg-slate-950/70 px-2 py-0.5 rounded-full">
                        ضع المستند داخل الإطار 🪪
                      </span>
                    </div>
                  )}
                </div>

                {/* AI Scan Scanning Line */}
                {isScanningAi && (
                  <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2">
                    <div className="w-10 h-10 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-black text-emerald-300 bg-slate-950/90 px-3 py-1 rounded-xl shadow">
                      جاري التحقق والمطابقة بالذكاء الاصطناعي... 🟢
                    </span>
                  </div>
                )}
              </div>

              {/* Camera Actions */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={handleSnapPhoto}
                    disabled={isScanningAi}
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    التقاط الصورة واعتماد التوثيق 📸
                  </button>

                  <button
                    onClick={() => {
                      const next = cameraFacing === 'user' ? 'environment' : 'user';
                      setCameraFacing(next);
                      startCamera(next);
                    }}
                    className="px-3 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1 border border-slate-700"
                    title="تبديل الكاميرا الأمامية والخلفية"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                {/* File Upload Fallback for Any Device */}
                <label className="w-full py-2.5 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-2 cursor-pointer">
                  <span>📁</span>
                  <span>أو اختر صورة من ألبوم الموبايل / المعرض</span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={handleFileCaptureFallback}
                    className="hidden"
                  />
                </label>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
