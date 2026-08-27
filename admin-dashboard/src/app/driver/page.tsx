'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  UserCheck,
  Phone,
  MessageSquare,
  AlertTriangle,
  Compass,
  Star,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Flame,
  Check
} from 'lucide-react';
import LiveInteractiveMap from '../../components/LiveInteractiveMap';

interface HotspotArea {
  id: string;
  name: string;
  area: string;
  surge: string;
  demand: 'عالي جداً 🔥' | 'مرتفع ⚡' | 'متوسط';
  lat: number;
  lng: number;
}

const CAIRO_GIZA_HOTSPOTS: HotspotArea[] = [
  { id: 'tahrir', name: 'وسط البلد والتحرير', area: 'القاهرة', surge: '1.4x', demand: 'عالي جداً 🔥', lat: 30.0444, lng: 31.2357 },
  { id: 'dokki', name: 'ميدان الدقي ومصدق', area: 'الجيزة', surge: '1.3x', demand: 'مرتفع ⚡', lat: 30.0385, lng: 31.2115 },
  { id: 'mohandessin', name: 'المهندسين وجامعة الدول', area: 'الجيزة', surge: '1.5x', demand: 'عالي جداً 🔥', lat: 30.0610, lng: 31.2010 },
  { id: 'zayed', name: 'الشيخ زايد وهايبر وان', area: 'الجيزة', surge: '1.3x', demand: 'مرتفع ⚡', lat: 30.0350, lng: 30.9850 },
  { id: 'october', name: '6 أكتوبر ومول العرب', area: 'الجيزة', surge: '1.4x', demand: 'مرتفع ⚡', lat: 29.9720, lng: 30.9450 },
  { id: 'citystars', name: 'مدينة نصر وسيتي ستارز', area: 'القاهرة', surge: '1.6x', demand: 'عالي جداً 🔥', lat: 30.0733, lng: 31.3467 },
  { id: 'tagamoa', name: 'التجمع الخامس وكايرو فيستيفال', area: 'القاهرة الجديدة', surge: '1.5x', demand: 'عالي جداً 🔥', lat: 30.0280, lng: 31.4050 },
  { id: 'airport', name: 'مطار القاهرة الدولي (مبنى 3)', area: 'مصر الجديدة', surge: '1.7x', demand: 'عالي جداً 🔥', lat: 30.1120, lng: 31.4020 },
];

interface RideOrder {
  id: string;
  riderName: string;
  riderAvatar: string;
  riderRating: number;
  riderTrips: number;
  serviceCategory: string;
  serviceIcon: string;
  pickup: string;
  pickupLat: number;
  pickupLng: number;
  destination: string;
  destLat: number;
  destLng: number;
  distanceKm: number;
  durationMin: number;
  proposedFare: number;
  paymentMethod: string;
  paymentAccount?: string;
  isParthona?: boolean;
}

const SAMPLE_ORDERS: RideOrder[] = [
  {
    id: 'ORD-8921',
    riderName: 'أحمد محمود',
    riderAvatar: '👨🏻‍💼',
    riderRating: 4.95,
    riderTrips: 48,
    serviceCategory: 'أخيل اقتصادي (ECONOMY)',
    serviceIcon: '🚗',
    pickup: 'ميدان التحرير، وسط البلد',
    pickupLat: 30.0444,
    pickupLng: 31.2357,
    destination: 'مول سيتي ستارز، مدينة نصر',
    destLat: 30.0733,
    destLng: 31.3467,
    distanceKm: 12.4,
    durationMin: 22,
    proposedFare: 75,
    paymentMethod: 'إنستاباي (InstaPay)',
    paymentAccount: 'hisham15008@instapay'
  },
  {
    id: 'ORD-8922',
    riderName: 'م. سارة كمال',
    riderAvatar: '👩🏻‍💻',
    riderRating: 4.98,
    riderTrips: 112,
    serviceCategory: 'أخيل بلس (PLUS)',
    serviceIcon: '🚘',
    pickup: 'ميدان الدقي، شارع مصدق',
    pickupLat: 30.0385,
    pickupLng: 31.2115,
    destination: 'التجمع الخامس، كايرو فيستيفال سيتي',
    destLat: 30.0280,
    destLng: 31.4050,
    distanceKm: 24.5,
    durationMin: 35,
    proposedFare: 130,
    paymentMethod: 'محفظة كاش (Meeza)',
    paymentAccount: '01206777771'
  },
  {
    id: 'ORD-8923',
    riderName: 'د. ياسمين الشريف',
    riderAvatar: '🌸',
    riderRating: 5.00,
    riderTrips: 64,
    serviceCategory: 'أخيل برثونة (PARTHONA 🌸)',
    serviceIcon: '🌸',
    pickup: 'المهندسين، ميدان لبنان',
    pickupLat: 30.0610,
    pickupLng: 31.2010,
    destination: 'هايبر وان، الشيخ زايد',
    destLat: 30.0350,
    destLng: 30.9850,
    distanceKm: 18.2,
    durationMin: 25,
    proposedFare: 105,
    paymentMethod: 'محفظة أخيل الرقمية',
    isParthona: true
  }
];

export default function DriverWebApp() {
  const [activeTab, setActiveTab] = useState<'radar' | 'wallet' | 'history' | 'incentives' | 'profile'>('radar');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isFullscreenMode, setIsFullscreenMode] = useState<boolean>(false);
  const [operatingMode, setOperatingMode] = useState<'AKHIL_FLEX' | 'AKHIL_GUARANTEE'>('AKHIL_FLEX');
  
  // Active Ride Flow State
  const [driverState, setDriverState] = useState<'idle' | 'incoming' | 'en_route_pickup' | 'arrived' | 'in_progress' | 'settled'>('idle');
  const [activeOrder, setActiveOrder] = useState<RideOrder>(SAMPLE_ORDERS[0]);
  const [bidAdjustment, setBidAdjustment] = useState<number>(0);
  const [otpInput, setOtpInput] = useState<string>('');
  const [waitingSeconds, setWaitingSeconds] = useState<number>(0);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotArea>(CAIRO_GIZA_HOTSPOTS[0]);
  const [passengerRating, setPassengerRating] = useState<number>(5);
  const [showSosModal, setShowSosModal] = useState<boolean>(false);

  // Financial Wallet State
  const [walletBalance, setWalletBalance] = useState<number>(450.00);
  const [cashDebt, setCashDebt] = useState<number>(140.00);
  const [todayEarnings, setTodayEarnings] = useState<number>(680.00);
  const [todayTripsCount, setTodayTripsCount] = useState<number>(8);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [showDebtPayModal, setShowDebtPayModal] = useState<boolean>(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(200);
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Captain Tier & Score
  const [captainScore, setCaptainScore] = useState<number>(94);
  const [captainTier, setCaptainTier] = useState<string>('نخبة أخيل (ELITE)');
  const [royalCarPoints, setRoyalCarPoints] = useState<number>(1420);

  // Waiting Timer Effect
  useEffect(() => {
    let interval: any;
    if (driverState === 'arrived') {
      interval = setInterval(() => {
        setWaitingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setWaitingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [driverState]);

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

  // Ride Actions
  const handleSimulateIncoming = (orderIndex: number = 0) => {
    setActiveOrder(SAMPLE_ORDERS[orderIndex % SAMPLE_ORDERS.length]);
    setBidAdjustment(0);
    setDriverState('incoming');
    setActiveTab('radar');
  };

  const handleAcceptBid = (finalFare: number) => {
    setActiveOrder(prev => ({ ...prev, proposedFare: finalFare }));
    setDriverState('en_route_pickup');
  };

  const handleArrivedAtPickup = () => {
    setDriverState('arrived');
  };

  const handleVerifyOtp = () => {
    if (otpInput === '8492' || otpInput.length === 4) {
      setDriverState('in_progress');
    } else {
      alert('كود أمان بدء الرحلة الصحيح هو: 8492');
    }
  };

  const handleCompleteTrip = () => {
    const fare = activeOrder.proposedFare;
    const commission = operatingMode === 'AKHIL_FLEX' ? fare * 0.10 : 0;
    const netEarnings = fare - commission;

    setWalletBalance(prev => prev + netEarnings);
    setTodayEarnings(prev => prev + netEarnings);
    setTodayTripsCount(prev => prev + 1);
    setRoyalCarPoints(prev => prev + 10);
    
    if (activeOrder.paymentMethod.includes('كاش') || activeOrder.paymentMethod.includes('نقداً')) {
      setCashDebt(prev => prev + commission);
    }
    
    setDriverState('settled');
  };

  const handleExecuteInstaPayPayout = () => {
    if (withdrawAmount > walletBalance) {
      alert('الرصيد المتاح غير كافٍ للسحب!');
      return;
    }
    setWalletBalance(prev => prev - withdrawAmount);
    setShowWithdrawModal(false);
    if (payoutMethod === 'instapay') {
      alert(`تم تحويل ${withdrawAmount} ج.م لحظياً إلى عنوان إنستاباي (${withdrawAddress}) بنجاح! ⚡🟢 (رقم الحوالة البنكية: #INS-${Math.floor(10000 + Math.random() * 90000)})`);
    } else {
      alert(`تم تحويل ${withdrawAmount} ج.م لحظياً إلى محفظة كاش (${withdrawPhone}) بنجاح! 📱🟢 (رقم التحويل: #WAL-${Math.floor(10000 + Math.random() * 90000)})`);
    }
  };

  const handlePayCashDebt = () => {
    alert(`تم سداد مديونية عمولات الكاش بقيمة ${cashDebt} ج.م عبر إنستاباي (${withdrawAddress}) بنجاح وتصفير المديونية! 🟢`);
    setCashDebt(0);
    setShowDebtPayModal(false);
  };

  const waitingExtraCost = Math.max(0, Math.floor((waitingSeconds - 120) / 60)) * 3;
  const currentTotalFare = activeOrder.proposedFare + waitingExtraCost;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-2 sm:p-4 font-sans" dir="rtl">
      
      {/* Top Floating Control Bar */}
      <div className="w-full max-w-4xl mb-3 flex items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl shadow-xl backdrop-blur">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-xl flex items-center justify-center text-lg text-slate-950 font-black shadow">
            👨🏻‍✈️
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-sm text-white">أخيل كابتن | AKHIL Driver</h1>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                👑 {captainTier}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">المنظومة التشغيلية المتكاملة للكابتن والبرثونة</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Fullscreen Desktop vs Mobile Shell Switch */}
          <button
            onClick={() => setIsFullscreenMode(!isFullscreenMode)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition"
            title="تبديل العرض بين الموبايل والشاشة الكاملة"
          >
            {isFullscreenMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFullscreenMode ? 'عرض الموبايل 📱' : 'عرض واسع 🖥️'}</span>
          </button>

          {/* Online / Offline Switch */}
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-3.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition shadow-lg ${
              isOnline 
                ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30' 
                : 'bg-rose-600/30 text-rose-300 border border-rose-500/40'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            {isOnline ? 'أنت متصل 🟢' : 'غير متصل 🔴'}
          </button>
        </div>
      </div>

      {/* Main Container (Mobile Shell or Fullscreen Pro Dashboard) */}
      <div className={`w-full ${isFullscreenMode ? 'max-w-4xl' : 'max-w-md'} bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[780px] relative transition-all duration-300`}>
        
        {/* Header Area */}
        <header className="p-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-xl text-slate-950 font-black shadow-lg shadow-amber-500/20">
                👑
              </div>
              <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-white">محمود السيد</span>
                <span className="text-[10px] text-amber-400 flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 4.95
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">تويوتا كورولا 2023 • أ ب ج 1234</p>
            </div>
          </div>

          <div className="text-left">
            <span className="text-[9px] text-slate-400 block">أرباح اليوم:</span>
            <span className="text-sm font-black text-emerald-400 font-mono">{todayEarnings} ج.م</span>
          </div>
        </header>

        {/* Operating Mode Bar */}
        <div className="p-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs px-3">
          <span className="text-slate-400 text-[11px] font-medium">نمط التشغيل:</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setOperatingMode('AKHIL_FLEX')}
              className={`px-3 py-1 rounded-xl text-[10px] font-bold transition flex items-center gap-1 ${
                operatingMode === 'AKHIL_FLEX' 
                  ? 'bg-amber-500 text-slate-950 font-black shadow' 
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <span>⚡</span> عمولة مرنة (10%)
            </button>
            <button
              onClick={() => setOperatingMode('AKHIL_GUARANTEE')}
              className={`px-3 py-1 rounded-xl text-[10px] font-bold transition flex items-center gap-1 ${
                operatingMode === 'AKHIL_GUARANTEE' 
                  ? 'bg-emerald-500 text-slate-950 font-black shadow' 
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <span>🛡️</span> ضمان شهري
            </button>
          </div>
        </div>

        {/* 5 Main Navigation Tabs */}
        <div className="grid grid-cols-5 bg-slate-950 border-b border-slate-800 p-1.5 gap-1 text-[10px] font-bold">
          {[
            { id: 'radar', name: 'الرادار', icon: Navigation },
            { id: 'wallet', name: 'المحفظة', icon: Wallet },
            { id: 'history', name: 'السجل', icon: History },
            { id: 'incentives', name: 'الحوافز', icon: Crown },
            { id: 'profile', name: 'التوثيق', icon: Camera },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 rounded-xl transition flex flex-col items-center justify-center gap-1 ${
                  isActive 
                    ? 'bg-indigo-950 border border-amber-500/50 text-amber-300 font-black shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: RADAR & LIVE ACTIVE RIDES */}
        {/* ========================================================================= */}
        {activeTab === 'radar' && (
          <div className="flex-1 flex flex-col justify-between p-3.5 space-y-3 overflow-y-auto">
            
            {/* OFFLINE STATE */}
            {!isOnline && (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-slate-800/80 rounded-full flex items-center justify-center mx-auto text-2xl text-slate-400 border border-slate-700">
                  😴
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-white">أنت غير متصل الآن</h3>
                  <p className="text-xs text-slate-400">اضغط على زر الاتصال بالشبكة لبدء استقبال طلبات المشاوير</p>
                </div>
                <button
                  onClick={() => setIsOnline(true)}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs transition shadow-lg shadow-emerald-500/20"
                >
                  الاتصال بالرادار الآن 🟢
                </button>
              </div>
            )}

            {/* ONLINE & IDLE RADAR STATE */}
            {isOnline && driverState === 'idle' && (
              <div className="space-y-3">
                {/* Hotspot & Surge Areas Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-400" /> مناطق الطلب المرتفع (Surge Areas):
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono">بونص حتى +70%</span>
                  </div>

                  <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
                    {CAIRO_GIZA_HOTSPOTS.map((h) => (
                      <button
                        key={h.id}
                        onClick={() => setSelectedHotspot(h)}
                        className={`px-3 py-1.5 rounded-xl border text-right shrink-0 transition flex items-center gap-2 text-[10px] ${
                          selectedHotspot.id === h.id 
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow' 
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        <div>
                          <span className="block font-bold">{h.name}</span>
                          <span className="text-[9px] text-slate-400">{h.area}</span>
                        </div>
                        <span className="bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded text-[9px]">
                          {h.surge}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Interactive Map */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                  <LiveInteractiveMap
                    height="210px"
                    center={[selectedHotspot.lat, selectedHotspot.lng]}
                    zoom={13}
                    markers={[
                      { id: 'me', lat: selectedHotspot.lat, lng: selectedHotspot.lng, title: 'موقعك الحالي (كابتن أخيل 👑)', car: 'تويوتا كورولا 2023', type: 'driver' },
                      { id: 'hot1', lat: selectedHotspot.lat + 0.008, lng: selectedHotspot.lng + 0.007, title: `منطقة طلب نشط: ${selectedHotspot.name} 🔥`, type: 'heat' },
                      { id: 'hot2', lat: selectedHotspot.lat - 0.006, lng: selectedHotspot.lng - 0.005, title: 'طلب ركاب فوري ⚡', type: 'heat' },
                    ]}
                  />
                  <div className="absolute top-2 right-2 z-[400] bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded-xl border border-slate-800 text-[10px] text-emerald-400 font-bold flex items-center gap-1.5 shadow">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>رادار الركاب يبحث عن أقرب المشاوير...</span>
                  </div>
                </div>

                {/* Cash Debt Limit Gauge */}
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>حد عمولات الكاش المتاح:</span>
                    <strong className="text-emerald-400 font-mono">{(1000 - cashDebt).toFixed(0)} / 1,000 ج.م</strong>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full" style={{ width: `${((1000 - cashDebt) / 1000) * 100}%` }} />
                  </div>
                </div>

                {/* Dispatch Simulation Triggers */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] text-slate-400 font-bold px-1">جرّب استقبال طلب رحلة حي (محاكاة فورية):</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => handleSimulateIncoming(0)}
                      className="py-2 px-2 bg-indigo-950/80 hover:bg-indigo-900 text-amber-300 border border-amber-500/30 rounded-xl text-[10px] font-bold transition shadow truncate"
                    >
                      🚗 رحلة اقتصادية (75 ج)
                    </button>
                    <button
                      onClick={() => handleSimulateIncoming(1)}
                      className="py-2 px-2 bg-indigo-950/80 hover:bg-indigo-900 text-sky-300 border border-sky-500/30 rounded-xl text-[10px] font-bold transition shadow truncate"
                    >
                      🚘 رحلة بلس (130 ج)
                    </button>
                    <button
                      onClick={() => handleSimulateIncoming(2)}
                      className="py-2 px-2 bg-indigo-950/80 hover:bg-indigo-900 text-pink-300 border border-pink-500/30 rounded-xl text-[10px] font-bold transition shadow truncate"
                    >
                      🌸 برثونة نسائي (105 ج)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* INCOMING RIDE REQUEST CARD */}
            {isOnline && driverState === 'incoming' && (
              <div className="p-4 bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 border-2 border-amber-500 rounded-3xl space-y-3.5 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span>{activeOrder.serviceIcon}</span> {activeOrder.serviceCategory}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg">
                    يبعد 1.2 كم (3 د)
                  </span>
                </div>

                {/* Rider Info Card */}
                <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{activeOrder.riderAvatar}</span>
                    <div>
                      <div className="font-bold text-xs text-white flex items-center gap-1">
                        <span>{activeOrder.riderName}</span>
                        <span className="text-[10px] text-amber-400">★ {activeOrder.riderRating}</span>
                      </div>
                      <span className="text-[9px] text-slate-400">{activeOrder.riderTrips} مشوار مكتمل سابقاً</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-slate-900 text-emerald-300 px-2 py-1 rounded-lg font-bold border border-slate-700">
                    {activeOrder.paymentMethod}
                  </span>
                </div>

                {/* Pickup & Destination */}
                <div className="space-y-2 text-right p-2.5 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <div className="flex items-start gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 ring-2 ring-emerald-400/20" />
                    <div>
                      <span className="text-[9px] text-emerald-400 block font-bold">نقطة الركوب (الانطلاق):</span>
                      <span className="text-xs font-bold text-white">{activeOrder.pickup}</span>
                    </div>
                  </div>
                  <div className="h-px bg-slate-800 mr-1" />
                  <div className="flex items-start gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1 ring-2 ring-amber-400/20" />
                    <div>
                      <span className="text-[9px] text-amber-400 block font-bold">الوجهة المقصودة:</span>
                      <span className="text-xs font-bold text-amber-300">{activeOrder.destination} ({activeOrder.distanceKm} كم)</span>
                    </div>
                  </div>
                </div>

                {/* Fare & Net Earnings */}
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">أجرة الرحلة</span>
                    <span className="text-xl font-black text-amber-400 font-mono">
                      {activeOrder.proposedFare + bidAdjustment} ج.م
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">صافي ربحك (90% فوري)</span>
                    <span className="text-base font-black text-emerald-400 font-mono">
                      {((activeOrder.proposedFare + bidAdjustment) * 0.90).toFixed(1)} ج.م
                    </span>
                  </div>
                </div>

                {/* Bidding & Accept Buttons */}
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
                    <button
                      onClick={() => setBidAdjustment(0)}
                      className={`py-2 rounded-xl transition ${bidAdjustment === 0 ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-950 text-slate-300 border border-slate-800'}`}
                    >
                      السعر الأصلي ({activeOrder.proposedFare} ج)
                    </button>
                    <button
                      onClick={() => setBidAdjustment(10)}
                      className={`py-2 rounded-xl transition ${bidAdjustment === 10 ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-950 text-slate-300 border border-slate-800'}`}
                    >
                      + 10 ج.م 🤝
                    </button>
                    <button
                      onClick={() => setBidAdjustment(20)}
                      className={`py-2 rounded-xl transition ${bidAdjustment === 20 ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-950 text-slate-300 border border-slate-800'}`}
                    >
                      + 20 ج.م 🤝
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAcceptBid(activeOrder.proposedFare + bidAdjustment)}
                      className="flex-1 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black rounded-2xl text-xs transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                    >
                      <span>🚀</span>
                      قبول والتحرك فوراً ({activeOrder.proposedFare + bidAdjustment} ج)
                    </button>
                    <button
                      onClick={() => setDriverState('idle')}
                      className="py-3.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl text-xs"
                    >
                      تخطي ✕
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* EN ROUTE TO PICKUP */}
            {driverState === 'en_route_pickup' && (
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-indigo-950 to-slate-950 border border-indigo-500/40 rounded-2xl flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      🚗
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">أنت في الطريق إلى نقطة الركوب</span>
                      <span className="text-[10px] text-slate-400">{activeOrder.pickup}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg">
                    الوصول: 3 د
                  </span>
                </div>

                {/* Map with Route to Pickup */}
                <div className="rounded-2xl overflow-hidden border border-slate-800">
                  <LiveInteractiveMap
                    height="200px"
                    center={[activeOrder.pickupLat, activeOrder.pickupLng]}
                    zoom={14}
                    markers={[
                      { id: 'driver', lat: activeOrder.pickupLat - 0.005, lng: activeOrder.pickupLng - 0.006, title: 'موقعك الحالي 🚗', type: 'driver' },
                      { id: 'pickup', lat: activeOrder.pickupLat, lng: activeOrder.pickupLng, title: `نقطة الركوب: ${activeOrder.pickup}`, type: 'pickup' },
                    ]}
                    routePolyline={[
                      [activeOrder.pickupLat - 0.005, activeOrder.pickupLng - 0.006],
                      [activeOrder.pickupLat, activeOrder.pickupLng],
                    ]}
                  />
                </div>

                {/* Rider Contact & Arrive Action */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => alert(`جاري الاتصال بالراكب (${activeOrder.riderName})... 📞`)}
                    className="py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    اتصال بالراكب
                  </button>
                  <button
                    onClick={() => alert(`فتح محادثة الشات مع الراكب (${activeOrder.riderName})... 💬`)}
                    className="py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    مراسلة في الشات
                  </button>
                </div>

                <button
                  onClick={handleArrivedAtPickup}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-xs transition shadow-lg flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  وصلت إلى نقطة الركوب 📍
                </button>
              </div>
            )}

            {/* ARRIVED AT PICKUP & WAITING TIMER */}
            {driverState === 'arrived' && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-3xl space-y-4">
                <div className="text-center space-y-1">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl animate-pulse">
                    ⏱️
                  </div>
                  <h3 className="font-extrabold text-sm text-white">وصلت لنقطة الركوب (الراكب في الطريق)</h3>
                  <div className="text-xs text-slate-400 flex items-center justify-center gap-2 pt-1">
                    <span>عداد وقت الانتظار:</span>
                    <span className="text-base font-black font-mono text-amber-400">
                      {Math.floor(waitingSeconds / 60)}:{(waitingSeconds % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  {waitingSeconds > 120 && (
                    <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full inline-block mt-1">
                      + {waitingExtraCost} ج.م انتظار إضافي محسوب
                    </span>
                  )}
                </div>

                <div className="p-3.5 bg-slate-900 rounded-2xl space-y-2.5">
                  <label className="text-xs text-slate-300 font-bold block text-center">أدخل كود أمان بدء الرحلة (PIN):</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="8492"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl py-2.5 text-center text-xl font-mono font-black text-amber-400 tracking-widest focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() => setOtpInput('8492')}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-bold border border-slate-700"
                      title="كود الاختبار التلقائي"
                    >
                      تعبئة 8492
                    </button>
                  </div>
                  <button
                    onClick={handleVerifyOtp}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 text-white font-black rounded-xl text-xs shadow-lg flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    تحقق وتأكيد ركوب العميل 🟢
                  </button>
                </div>
              </div>
            )}

            {/* TRIP IN PROGRESS / LIVE NAVIGATION */}
            {driverState === 'in_progress' && (
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-indigo-950 to-slate-950 border border-indigo-500/40 rounded-2xl flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-amber-400 animate-spin" />
                    <div>
                      <span className="text-xs font-bold text-white block">جاري تنفيذ المشوار للوجهة</span>
                      <span className="text-[10px] text-amber-300">{activeOrder.destination}</span>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-xs font-bold text-white block">متبقي 4.2 كم</span>
                    <span className="text-[9px] text-slate-400">7 دقائق</span>
                  </div>
                </div>

                {/* Map with Route to Destination */}
                <div className="rounded-2xl overflow-hidden border border-slate-800">
                  <LiveInteractiveMap
                    height="200px"
                    center={[(activeOrder.pickupLat + activeOrder.destLat) / 2, (activeOrder.pickupLng + activeOrder.destLng) / 2]}
                    zoom={13}
                    markers={[
                      { id: 'car', lat: (activeOrder.pickupLat + activeOrder.destLat) / 2, lng: (activeOrder.pickupLng + activeOrder.destLng) / 2, title: 'السيارة أثناء المشوار 🚗', type: 'driver' },
                      { id: 'dest', lat: activeOrder.destLat, lng: activeOrder.destLng, title: `الوجهة: ${activeOrder.destination}`, type: 'destination' },
                    ]}
                    routePolyline={[
                      [activeOrder.pickupLat, activeOrder.pickupLng],
                      [(activeOrder.pickupLat + activeOrder.destLat) / 2, (activeOrder.pickupLng + activeOrder.destLng) / 2],
                      [activeOrder.destLat, activeOrder.destLng],
                    ]}
                  />
                </div>

                {/* Live Meter & SOS */}
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">الأجرة الحالية للعداد:</span>
                    <span className="text-xl font-black text-amber-400 font-mono">{currentTotalFare} ج.م</span>
                  </div>
                  <button
                    onClick={() => setShowSosModal(true)}
                    className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>طوارئ SOS 🚨</span>
                  </button>
                </div>

                <button
                  onClick={handleCompleteTrip}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-black rounded-2xl text-xs transition shadow-xl flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  إنهاء المشوار وتحصيل الأجرة 🏁 ({currentTotalFare} ج.م)
                </button>
              </div>
            )}

            {/* SETTLED TRIP SUMMARY */}
            {driverState === 'settled' && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-3xl space-y-4 text-center">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl animate-bounce">
                  💵
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-base text-white">تم إنهاء الرحلة وتحصيل الأجرة بنجاح!</h3>
                  <p className="text-xs text-slate-400">تم تسجيل المشوار وإيداع الأرباح في محفظتك فوراً</p>
                </div>

                {/* Split Ledger Card */}
                <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-right text-xs space-y-2">
                  <div className="flex justify-between text-slate-300 border-b border-slate-800 pb-1.5">
                    <span>إجمالي أجرة المشوار:</span>
                    <strong className="text-amber-400 font-mono text-sm">{currentTotalFare} ج.م</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>صافي أرباحك (90%):</span>
                    <strong className="text-emerald-400 font-mono">{(currentTotalFare * 0.90).toFixed(1)} ج.م</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>عمولة أخيل (10%):</span>
                    <strong className="text-rose-400 font-mono">{(currentTotalFare * 0.10).toFixed(1)} ج.م</strong>
                  </div>
                  <div className="flex justify-between text-slate-400 border-t border-slate-800 pt-1.5">
                    <span>نقاط سيارة العام المكتسبة:</span>
                    <strong className="text-amber-300 font-mono">+10 نقاط 👑</strong>
                  </div>
                </div>

                {/* Rate Passenger */}
                <div className="p-3 bg-slate-900 rounded-2xl space-y-1.5">
                  <span className="text-xs font-bold text-slate-300 block">تقييم العميل ({activeOrder.riderName}):</span>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setPassengerRating(star)}
                        className={`text-xl ${star <= passengerRating ? 'text-amber-400' : 'text-slate-600'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setDriverState('idle');
                    setOtpInput('');
                  }}
                  className="w-full py-3.5 bg-amber-500 text-slate-950 font-black rounded-2xl text-xs hover:bg-amber-400 shadow-lg"
                >
                  العودة للرادار واستقبال رحلات جديدة 🐎
                </button>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: WALLET & INSTANT PAYOUTS */}
        {/* ========================================================================= */}
        {activeTab === 'wallet' && (
          <div className="flex-1 p-4 space-y-3.5 overflow-y-auto">
            {/* Balance Card */}
            <div className="p-4 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl space-y-3 shadow-xl">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-300 font-medium">رصيد الأرباح القابل للسحب الفوري:</span>
                <span className="text-xl font-black text-emerald-400 font-mono">{walletBalance.toFixed(2)} ج.م</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span>مديونية عمولات الكاش المستحقة:</span>
                <span className="font-bold text-rose-400 font-mono">{cashDebt.toFixed(2)} ج.م (من 1,000 ج حد أقصى)</span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 block">أرباح اليوم</span>
                <span className="font-bold text-white font-mono">{todayEarnings} ج</span>
              </div>
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 block">رحلات اليوم</span>
                <span className="font-bold text-amber-300 font-mono">{todayTripsCount} رحلات</span>
              </div>
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 block">نسبة القبول</span>
                <span className="font-bold text-emerald-400 font-mono">98.5%</span>
              </div>
            </div>

            {/* Instant Actions */}
            <div className="space-y-2">
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-black rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <Zap className="w-4 h-4" />
                سحب أرباح لحظي 24/7 عبر InstaPay ⚡
              </button>

              {cashDebt > 0 && (
                <button
                  onClick={() => setShowDebtPayModal(true)}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  سداد مديونية الكاش ({cashDebt} ج.م) عبر إنستاباي
                </button>
              )}
            </div>

            {/* InstaPay Payout Modal */}
            {showWithdrawModal && (
              <div className="p-4 bg-slate-900 border border-amber-500/40 rounded-2xl space-y-3 shadow-2xl animate-in slide-in-from-bottom">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h4 className="font-bold text-xs text-amber-400 flex items-center gap-1.5">
                    <span>⚡</span> تحويل وسحب الأرباح الفوري (Instant Payout)
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">المتاح: {walletBalance} ج.م</span>
                </div>

                <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setPayoutMethod('instapay')}
                    className={`py-1.5 rounded-lg transition ${payoutMethod === 'instapay' ? 'bg-indigo-900 text-amber-300 shadow' : 'text-slate-400'}`}
                  >
                    ⚡ إنستاباي (InstaPay)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayoutMethod('wallet')}
                    className={`py-1.5 rounded-lg transition ${payoutMethod === 'wallet' ? 'bg-indigo-900 text-amber-300 shadow' : 'text-slate-400'}`}
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
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs font-mono font-bold"
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
                    <label className="text-[10px] text-slate-400 block mb-1">رقم المحفظة الإلكترونية:</label>
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
                    className="py-2.5 px-3 bg-slate-800 text-slate-300 text-xs rounded-xl"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}

            {/* Debt Pay Modal */}
            {showDebtPayModal && (
              <div className="p-4 bg-slate-900 border border-rose-500/40 rounded-2xl space-y-3">
                <h4 className="font-bold text-xs text-rose-300">سداد مديونية عمولات الكاش ({cashDebt} ج.م):</h4>
                <p className="text-[10px] text-slate-400">سيتم سداد العمولات المستحقة لشركة أخيل عبر عنوان إنستاباي ({withdrawAddress}).</p>
                <div className="flex gap-2">
                  <button
                    onClick={handlePayCashDebt}
                    className="flex-1 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                  >
                    تأكيد السداد وتصفير المديونية
                  </button>
                  <button
                    onClick={() => setShowDebtPayModal(false)}
                    className="py-2 px-3 bg-slate-800 text-slate-300 text-xs rounded-xl"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: RECENT RIDE HISTORY LEDGER */}
        {/* ========================================================================= */}
        {activeTab === 'history' && (
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-300">سجل المشاوير المكتملة حديثاً:</span>
              <span className="text-[10px] text-slate-400">إجمالي {todayTripsCount} رحلات اليوم</span>
            </div>

            <div className="space-y-2">
              {[
                { id: '#ALT-9102', rider: 'كريم عادل', route: 'التحرير ⬅️ سيتي ستارز', time: 'منذ 25 دقيقة', fare: 75, net: 67.5, method: 'InstaPay' },
                { id: '#ALT-9101', rider: 'م. نورا مصطفى', route: 'الدقي ⬅️ التجمع الخامس', time: 'منذ ساعة', fare: 130, net: 117.0, method: 'كاش' },
                { id: '#ALT-9100', rider: 'حسام حسن', route: 'المهندسين ⬅️ الشيخ زايد', time: 'منذ ساعتين', fare: 105, net: 94.5, method: 'محفظة' },
                { id: '#ALT-9099', rider: 'د. يوسف علي', route: 'الهرم ⬅️ مطار القاهرة', time: 'اليوم 11:30 ص', fare: 185, net: 166.5, method: 'InstaPay' },
              ].map((trip) => (
                <div key={trip.id} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-amber-400 font-bold">{trip.id}</span>
                    <span className="text-[10px] text-slate-400">{trip.time}</span>
                  </div>
                  <div className="text-white font-bold">{trip.route}</div>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-800/80 text-[11px]">
                    <span className="text-slate-400">الراكب: {trip.rider} • ({trip.method})</span>
                    <div>
                      <span className="text-slate-400 mr-1 font-mono">{trip.fare} ج</span>
                      <strong className="text-emerald-400 font-mono font-bold">صافي: +{trip.net} ج</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: 9 CAPTAIN INCENTIVES & ROYAL CAR FUND */}
        {/* ========================================================================= */}
        {activeTab === 'incentives' && (
          <div className="flex-1 p-4 space-y-3.5 overflow-y-auto">
            {/* Grand Prize Royal Car Card */}
            <div className="p-4 bg-gradient-to-br from-amber-500/20 via-indigo-950 to-slate-950 border-2 border-amber-500/50 rounded-2xl space-y-2.5 shadow-xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👑</span>
                  <div>
                    <h3 className="font-black text-xs text-amber-300">جائزة سيارة الكابتن السنوية الملكية (FREE CAR)</h3>
                    <p className="text-[10px] text-slate-300">سيارة زيرو سنوياً لأعلى كابتن برتبة القائد الملكي</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-black text-amber-400 bg-amber-500/20 px-2.5 py-1 rounded-xl border border-amber-500/30">
                  {royalCarPoints} / 2,000 نقطة
                </span>
              </div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-amber-500 via-amber-300 to-emerald-400 h-full" style={{ width: `${(royalCarPoints / 2000) * 100}%` }} />
              </div>
              <p className="text-[9px] text-slate-400 text-left font-mono">متبقي 580 نقطة للتأهل النهائي لسحب سيارة 2026</p>
            </div>

            {/* 9 Incentives Grid */}
            <div className="space-y-2">
              {[
                { title: '1. AKHIL READY', desc: 'رصيد تشغيلي مقدم لتغطية عمولات أول 20 مشواراً.', tag: 'رصيد 💰' },
                { title: '2. AKHIL FLEX RATE', desc: 'عمولة متناقصة تبدأ من 10% وتنخفض مع كثرة المشاوير.', tag: '10% عمولة' },
                { title: '3. AKHIL FREE MOBILE', desc: 'هاتف ذكي هدية لأفضل كباتن كل ربع سنة.', tag: 'موبايل 📱' },
                { title: '4. AKHIL WEEKLY FLOW', desc: 'بونص نقدي أسبوعي (+350 ج) عند إتمام 40 مشواراً.', tag: '+350 ج ⚡' },
                { title: '5. FREE CAR 👑', desc: 'سيارة زيرو سنوياً لأعلى كابتن برتبة القائد الملكي.', tag: 'سيارة 🚗' },
                { title: '6. AKHIL LINK', desc: 'اكسب 200 ج.م مع كل كابتن ينضم بدعوتك.', tag: 'دعوة 🤝' },
                { title: '7. AKHIL SERVICES', desc: 'خصم 25% على الزيوت والصيانة والإطارات.', tag: 'صيانة 🛠️' },
                { title: '8. AKHIL FAMILY', desc: 'كوبونات مشاوير مجانية وتأمين صحي لعائلتك.', tag: 'تأمين 🩺' },
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

        {/* ========================================================================= */}
        {/* TAB 5: PROFILE & LIVE CAMERA KYC */}
        {/* ========================================================================= */}
        {activeTab === 'profile' && (
          <div className="flex-1 p-4 space-y-3.5 overflow-y-auto">
            {/* Captain Badge */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-2 shadow-lg">
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

            {/* Live Camera KYC Biometric Section */}
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
          </div>
        )}

        {/* ========================================================================= */}
        {/* LIVE CAMERA KYC SCANNER MODAL */}
        {/* ========================================================================= */}
        {showCameraModal && (
          <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col justify-end p-0">
            <div className="bg-slate-900 border-t-2 border-amber-500 rounded-t-3xl p-5 space-y-4 max-h-[90%] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
              
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

                {/* File Upload Fallback */}
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

        {/* SOS EMERGENCY MODAL */}
        {showSosModal && (
          <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border-2 border-rose-500 rounded-3xl p-5 space-y-4 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95">
              <div className="w-14 h-14 bg-rose-600/20 text-rose-500 rounded-full flex items-center justify-center mx-auto text-3xl animate-bounce">
                🚨
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-base text-white">غرفة طوارئ ودعم أخيل (SOS)</h3>
                <p className="text-xs text-slate-400">يتم تتبع موقعك المباشر وتسجيل الرحلة صوتياً لحمايتك</p>
              </div>

              <div className="space-y-2">
                <a
                  href="tel:122"
                  className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow"
                >
                  <Phone className="w-4 h-4" />
                  اتصال بشرطة النجدة (122)
                </a>
                <button
                  onClick={() => {
                    alert('تم إرسال إشارة استغاثة فورية لغرفة عمليات أخيل وتحديد موقع سيارتك! 🟢');
                    setShowSosModal(false);
                  }}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow"
                >
                  <ShieldCheck className="w-4 h-4" />
                  إرسال إنذار فوري لعمليات أخيل
                </button>
              </div>

              <button
                onClick={() => setShowSosModal(false)}
                className="w-full py-2 bg-slate-800 text-slate-400 rounded-xl text-xs font-bold"
              >
                إلغاء وإغلاق
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
