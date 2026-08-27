'use client';

import React, { useState, useEffect } from 'react';
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
  ChevronLeft,
  Calendar,
  Clock,
  Package,
  Award,
  Wallet,
  CreditCard,
  History,
  Maximize2,
  Minimize2,
  MessageSquare,
  Compass,
  ArrowUpDown,
  Search,
  Check,
  Smartphone
} from 'lucide-react';
import LiveInteractiveMap, { MapMarker } from '../../components/LiveInteractiveMap';

interface ServiceCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  multiplier: number;
  desc: string;
  badge?: string;
  color: string;
}

const AKHIL_SERVICES: ServiceCategory[] = [
  { id: 'economy', name: 'أخيل اقتصادي', nameEn: 'AKHIL ECONOMY', icon: '🚗', multiplier: 1.00, desc: 'الخدمة الأساسية للانتقال اليومي بأعلى معايير الجودة (1.00x)', color: 'border-blue-500' },
  { id: 'plus', name: 'أخيل بلس', nameEn: 'AKHIL PLUS', icon: '🚘', multiplier: 1.10, desc: 'سيارات أحدث ومستوى راحة أعلى وتجربة مميزة (1.10x)', color: 'border-sky-500' },
  { id: 'business', name: 'أخيل أعمال', nameEn: 'AKHIL BUSINESS', icon: '💼', multiplier: 1.20, desc: 'الخدمة الفاخرة لرجال الأعمال وأرقى السيارات (1.20x)', color: 'border-purple-500' },
  { id: 'parthona', name: 'أخيل برثونة', nameEn: 'AKHIL PARTHONA', icon: '🌸', multiplier: 1.00, desc: 'رحلة نسائية بقيادة سائقة معتمدة بدون أي زيادة سعرية (1.00x)', badge: 'نسائي حصراً', color: 'border-pink-500' },
  { id: 'time', name: 'أخيل مجدولة', nameEn: 'AKHIL TIME', icon: '⏱️', multiplier: 1.00, desc: 'رحلات مجدولة (ONE / ROUTINE / CONTRACT بخصم حتى 20%)', color: 'border-indigo-500' },
  { id: 'extra', name: 'أخيل إضافي', nameEn: 'AKHIL EXTRA', icon: '➕', multiplier: 1.50, desc: 'نقل ركاب إضافيين (+50% لشخص أو شخصين، +75% لـ 3، +100% لـ 4)', color: 'border-orange-500' },
  { id: 'carry', name: 'أخيل حمولة', nameEn: 'AKHIL CARRY', icon: '📦', multiplier: 2.00, desc: 'نقل حمولة كبيرة (المجاني بالخدمات العادية: شنطة كبيرة + صغيرة)', color: 'border-amber-500' },
  { id: 'box', name: 'أخيل طرد', nameEn: 'AKHIL BOX', icon: '📫', multiplier: 1.00, desc: 'نقل وتسليم طرود ومستندات دون راكب بكود تأكيد تسليم OTP', color: 'border-cyan-500' },
  { id: 'trip', name: 'أخيل سفر', nameEn: 'AKHIL TRIP', icon: '🛣️', multiplier: 1.80, desc: 'سفر بين المحافظات مع استراحة 15د مجاناً/100كم و3ج/د توقف', color: 'border-emerald-500' },
  { id: 'events', name: 'شريك الفعاليات', nameEn: 'PARTNER OF EVENTS', icon: '🎪', multiplier: 2.50, desc: 'شراكة وتنظيم أسطول نقل الفعاليات والمؤتمرات الكبرى', color: 'border-rose-500' },
];

interface GeoLocation {
  id: string;
  name: string;
  area: string;
  governorate: 'القاهرة' | 'الجيزة';
  lat: number;
  lng: number;
  icon: string;
}

const PRESET_LOCATIONS: GeoLocation[] = [
  { id: 'tahrir', name: 'ميدان التحرير، وسط البلد', area: 'وسط البلد', governorate: 'القاهرة', lat: 30.0444, lng: 31.2357, icon: '🏛️' },
  { id: 'dokki', name: 'ميدان الدقي، شارع مصدق', area: 'الدقي', governorate: 'الجيزة', lat: 30.0385, lng: 31.2115, icon: '🌳' },
  { id: 'mohandessin', name: 'ميدان لبنان / جامعة الدول', area: 'المهندسين', governorate: 'الجيزة', lat: 30.0610, lng: 31.2010, icon: '🏢' },
  { id: 'zayed', name: 'هايبر وان / الكرمة', area: 'الشيخ زايد', governorate: 'الجيزة', lat: 30.0350, lng: 30.9850, icon: '🛍️' },
  { id: 'october', name: 'ميدان الحصري / مول العرب', area: '6 أكتوبر', governorate: 'الجيزة', lat: 29.9720, lng: 30.9450, icon: '🏙️' },
  { id: 'haram', name: 'هضبة الأهرام والمتحف الكبير', area: 'الهرم', governorate: 'الجيزة', lat: 29.9850, lng: 31.1350, icon: '🔺' },
  { id: 'citystars', name: 'مول سيتي ستارز، مكرم عبيد', area: 'مدينة نصر', governorate: 'القاهرة', lat: 30.0733, lng: 31.3467, icon: '🛍️' },
  { id: 'tagamoa', name: 'التجمع الخامس / كايرو فيستيفال', area: 'القاهرة الجديدة', governorate: 'القاهرة', lat: 30.0280, lng: 31.4050, icon: '💎' },
  { id: 'maadi', name: 'حي المعادي / شارع 9', area: 'المعادي', governorate: 'القاهرة', lat: 29.9580, lng: 31.2610, icon: '🌳' },
  { id: 'airport', name: 'مطار القاهرة الدولي (مبنى 3)', area: 'مصر الجديدة', governorate: 'القاهرة', lat: 30.1120, lng: 31.4020, icon: '✈️' },
  { id: 'zamalek', name: 'حي الزمالك / برج القاهرة', area: 'الزمالك', governorate: 'القاهرة', lat: 30.0620, lng: 31.2210, icon: '🗼' },
];

export default function RiderWebApp() {
  const [activeTab, setActiveTab] = useState<'book' | 'history' | 'rewards' | 'wallet'>('book');
  const [isFullscreenMode, setIsFullscreenMode] = useState<boolean>(false);
  const [bookingMode, setBookingMode] = useState<'BIDDING' | 'INSTANT'>('BIDDING');
  const [selectedService, setSelectedService] = useState<ServiceCategory>(AKHIL_SERVICES[0]);
  
  // Location States
  const [pickup, setPickup] = useState<GeoLocation>(PRESET_LOCATIONS[0]);
  const [destination, setDestination] = useState<GeoLocation>(PRESET_LOCATIONS[6]);
  const [showLocationModal, setShowLocationModal] = useState<'pickup' | 'dest' | null>(null);
  const [locationSearchQuery, setLocationSearchQuery] = useState<string>('');
  
  // Trip Lifecycle
  const [step, setStep] = useState<'create' | 'bidding' | 'en_route' | 'completed'>('create');
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('instapay');
  const [showSosModal, setShowSosModal] = useState<boolean>(false);
  const [driverRating, setDriverRating] = useState<number>(5);

  // Scheduled Modal State
  const [showScheduledModal, setShowScheduledModal] = useState<boolean>(false);
  const [scheduledType, setScheduledType] = useState<'ONE' | 'ROUTINE' | 'CONTRACT'>('ROUTINE');

  // Balances
  const [welcomeBalance, setWelcomeBalance] = useState<number>(200);
  const [akhilCreditLimit, setAkhilCreditLimit] = useState<number>(500);

  // Dynamic Distance Calculation (Haversine approx in KM)
  const calculateDistanceKm = () => {
    const dLat = (destination.lat - pickup.lat) * 111;
    const dLng = (destination.lng - pickup.lng) * 96;
    const dist = Math.sqrt(dLat * dLat + dLng * dLng);
    return Math.max(2.5, Math.round(dist * 10) / 10);
  };

  const tripDistanceKm = calculateDistanceKm();
  const rawBaseFare = Math.round(20 + tripDistanceKm * 4.5);

  const calculateRoundedFare = () => {
    const raw = rawBaseFare * selectedService.multiplier;
    return Math.ceil(raw / 5) * 5;
  };

  const currentFare = calculateRoundedFare();

  const sampleBids = [
    { id: '1', driverName: 'محمود السيد (كابتن أخيل 👑)', car: 'تويوتا كورولا 2023', plate: 'أ ب ج 1234', rating: 4.95, trips: 1420, fare: currentFare, eta: 3, isParthona: false, avatar: '👨🏻‍✈️' },
    { id: '2', driverName: 'أحمد فؤاد (فريق أخيل)', car: 'هيونداي إلنترا 2024', plate: 'ط ك ل 9101', rating: 4.88, trips: 830, fare: currentFare + 10, eta: 5, isParthona: false, avatar: '🚗' },
    { id: '3', driverName: 'نورا السعيد (برثونة معتمدة 🌸)', car: 'كيا سيراتو 2023', plate: 'ن ر ا 5544', rating: 5.00, trips: 620, fare: currentFare, eta: 4, isParthona: true, avatar: '🌸' },
  ];

  const handleSwapLocations = () => {
    const temp = pickup;
    setPickup(destination);
    setDestination(temp);
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

  const filteredLocations = PRESET_LOCATIONS.filter(l => 
    l.name.toLowerCase().includes(locationSearchQuery.toLowerCase()) || 
    l.area.toLowerCase().includes(locationSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-2 sm:p-4 font-sans" dir="rtl">
      
      {/* Top Floating Control Bar */}
      <div className="w-full max-w-4xl mb-3 flex items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl shadow-xl backdrop-blur">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-tr from-indigo-900 to-amber-500 rounded-xl flex items-center justify-center text-lg text-white font-black shadow">
            🐎
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-sm text-white">أخيل راكب | AKHIL Rider</h1>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded-full border border-indigo-500/30">
                ⭐ عضوية الترحيب الفضية
              </span>
            </div>
            <p className="text-[10px] text-slate-400">التسعير العادل والمشاوير الذكية بالقاهرة والجيزة</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Desktop Fullscreen Switch */}
          <button
            onClick={() => setIsFullscreenMode(!isFullscreenMode)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition"
            title="تبديل العرض بين الموبايل والشاشة الكاملة"
          >
            {isFullscreenMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFullscreenMode ? 'عرض الموبايل 📱' : 'عرض واسع 🖥️'}</span>
          </button>

          {/* Wallet Balance Badge */}
          <div className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-1.5 text-xs">
            <span className="text-[10px] text-slate-400">رصيدك:</span>
            <span className="font-black text-emerald-400 font-mono">{welcomeBalance} ج.م</span>
          </div>
        </div>
      </div>

      {/* Main App Shell */}
      <div className={`w-full ${isFullscreenMode ? 'max-w-4xl' : 'max-w-md'} bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[780px] relative transition-all duration-300`}>
        
        {/* App Header */}
        <header className="p-3.5 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-xl text-slate-950 font-black shadow-lg shadow-amber-500/20">
              🐎
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm text-white">تطبيق أخيل للركاب</span>
                <span className="text-[9px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded">AKHIL SMART</span>
              </div>
              <p className="text-[10px] text-slate-400">أول تطبيق نقل ذكي بتسعير عادل ومزايدة حرة</p>
            </div>
          </div>

          <div className="text-left">
            <span className="text-[9px] text-slate-400 block">ادفع بعدين (Credit):</span>
            <span className="text-xs font-black text-amber-400 font-mono">{akhilCreditLimit} ج.م</span>
          </div>
        </header>

        {/* 4 Main Navigation Tabs */}
        <div className="grid grid-cols-4 bg-slate-950 border-b border-slate-800 p-1.5 gap-1 text-[11px] font-bold">
          {[
            { id: 'book', name: 'حجز مشوار', icon: Car },
            { id: 'rewards', name: 'الحوافز الـ 8', icon: Gift },
            { id: 'wallet', name: 'المحفظة والدفع', icon: Wallet },
            { id: 'history', name: 'السجل والفواتير', icon: History },
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
        {/* TAB 1: BOOK RIDE & TRIP ENGINE */}
        {/* ========================================================================= */}
        {activeTab === 'book' && (
          <div className="flex-1 flex flex-col justify-between p-3.5 space-y-3 overflow-y-auto">
            
            {/* STEP 1: CREATE BOOKING & LOCATION SELECTION */}
            {step === 'create' && (
              <div className="space-y-3">
                {/* 10 AKHIL Services Scrollable Carousel */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                      <span>🚗</span> خدمات وفئات أخيل الـ 10:
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono">تسعير عادل بدون تلاعب</span>
                  </div>

                  <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
                    {AKHIL_SERVICES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedService(s)}
                        className={`px-3 py-2 rounded-2xl border text-right shrink-0 transition flex flex-col justify-between w-28 text-[10px] ${
                          selectedService.id === s.id 
                            ? 'bg-gradient-to-b from-indigo-950 to-slate-900 border-amber-500 text-amber-300 font-bold shadow-lg' 
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        <div className="flex justify-between items-center w-full mb-1">
                          <span className="text-xl">{s.icon}</span>
                          <span className="font-mono text-[9px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400 font-bold">
                            {s.multiplier}x
                          </span>
                        </div>
                        <span className="font-bold block truncate">{s.name}</span>
                        {s.badge && (
                          <span className="text-[8px] bg-pink-500/20 text-pink-300 font-bold px-1 rounded mt-0.5 inline-block">
                            {s.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pickup & Destination Interactive Cards */}
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-2.5 relative">
                  {/* Pickup */}
                  <div 
                    onClick={() => setShowLocationModal('pickup')}
                    className="flex items-center justify-between p-2.5 bg-slate-900/90 hover:bg-slate-850 rounded-xl border border-slate-800 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20 shrink-0" />
                      <div className="text-right truncate">
                        <span className="text-[9px] text-slate-400 block">نقطة الانطلاق (الركوب):</span>
                        <span className="text-xs font-bold text-white truncate block">{pickup.name}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-indigo-400 shrink-0 mr-2">تغيير 📍</span>
                  </div>

                  {/* Swap Button */}
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
                    <button
                      type="button"
                      onClick={handleSwapLocations}
                      className="w-7 h-7 rounded-full bg-indigo-900 hover:bg-indigo-800 border border-amber-500/60 text-amber-300 flex items-center justify-center shadow-lg transition"
                      title="عكس الاتجاه"
                    >
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Destination */}
                  <div 
                    onClick={() => setShowLocationModal('dest')}
                    className="flex items-center justify-between p-2.5 bg-slate-900/90 hover:bg-slate-850 rounded-xl border border-slate-800 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-3 h-3 rounded-full bg-amber-400 ring-4 ring-amber-500/20 shrink-0" />
                      <div className="text-right truncate">
                        <span className="text-[9px] text-slate-400 block">الوجهة المقصودة:</span>
                        <span className="text-xs font-bold text-amber-300 truncate block">{destination.name}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-indigo-400 shrink-0 mr-2">تغيير 🏁</span>
                  </div>
                </div>

                {/* Interactive Map with Dynamic Polyline */}
                <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative">
                  <LiveInteractiveMap
                    height="190px"
                    center={[(pickup.lat + destination.lat) / 2, (pickup.lng + destination.lng) / 2]}
                    zoom={12}
                    markers={[
                      { id: 'pick', lat: pickup.lat, lng: pickup.lng, title: `الانطلاق: ${pickup.name}`, type: 'pickup' },
                      { id: 'dest', lat: destination.lat, lng: destination.lng, title: `الوجهة: ${destination.name}`, type: 'destination' },
                    ]}
                    routePolyline={[
                      [pickup.lat, pickup.lng],
                      [destination.lat, destination.lng],
                    ]}
                  />
                  <div className="absolute top-2 right-2 z-[400] bg-slate-950/85 backdrop-blur px-2.5 py-1 rounded-xl border border-slate-800 text-[10px] text-amber-300 font-bold shadow flex items-center gap-1.5">
                    <span>🛣️</span>
                    <span>المسافة التقديرية: {tripDistanceKm} كم</span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[11px] font-bold text-slate-300">طريقة الدفع المختارة:</span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">المحفظة: {welcomeBalance} ج</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {[
                      { id: 'instapay', name: 'إنستاباي (hisham15008@instapay) ⚡' },
                      { id: 'vodafone_cash', name: 'محفظة كاش (01206777771) 📱' },
                      { id: 'wallet', name: `محفظة أخيل (${welcomeBalance} ج) 💳` },
                      { id: 'cash', name: 'كاش للكابتن نقداً 💵' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedPayment(m.id)}
                        className={`py-2 px-2 rounded-xl border text-right transition flex items-center justify-between text-[10px] font-bold ${
                          selectedPayment === m.id 
                            ? 'bg-indigo-950 border-amber-500 text-amber-300 shadow' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{m.name}</span>
                        {selectedPayment === m.id && <span className="text-amber-400 text-xs">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fare Display & Booking Button */}
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">الأجرة العادلة المقترحة:</span>
                    <span className="text-2xl font-black text-amber-400 font-mono">{currentFare} ج.م</span>
                  </div>
                  <button
                    onClick={handleRequestRide}
                    className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black rounded-2xl text-xs transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
                  >
                    <span>🐎</span>
                    <span>طلب المشوار الآن</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: BIDDING & CAPTAINS OFFERS */}
            {step === 'bidding' && (
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-indigo-950 to-slate-950 border border-indigo-500/40 rounded-2xl flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <div>
                      <span className="text-xs font-bold text-white block">رادار أخيل يبحث عن أقرب الكباتن...</span>
                      <span className="text-[10px] text-slate-400">عروض أسعار حية مباشرة</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep('create')}
                    className="text-[10px] text-slate-400 hover:text-rose-400"
                  >
                    إلغاء الطلب ✕
                  </button>
                </div>

                <div className="space-y-2">
                  {sampleBids.map((bid) => (
                    <div 
                      key={bid.id}
                      className="p-3.5 bg-slate-950 border border-slate-800 hover:border-amber-500/60 rounded-2xl space-y-2.5 transition shadow-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{bid.avatar}</span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs text-white">{bid.driverName}</span>
                              <span className="text-[10px] text-amber-400 font-bold">★ {bid.rating}</span>
                            </div>
                            <p className="text-[10px] text-slate-400">{bid.car} • {bid.plate}</p>
                          </div>
                        </div>
                        <div className="text-left font-mono">
                          <span className="text-base font-black text-amber-400">{bid.fare} ج.م</span>
                          <span className="text-[9px] text-emerald-400 block font-bold">يصل خلال {bid.eta} د</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAcceptBid(bid)}
                        className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-black rounded-xl text-xs transition shadow flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        قبول عرض الكابتن ({bid.fare} ج) 🚀
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: EN ROUTE TRIP TRACKING */}
            {step === 'en_route' && (
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-indigo-950 to-slate-950 border border-indigo-500/40 rounded-2xl flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-amber-400 animate-spin" />
                    <div>
                      <span className="text-xs font-bold text-white block">الكابتن في الطريق إليك</span>
                      <span className="text-[10px] text-slate-400">{selectedDriver?.car} ({selectedDriver?.plate})</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg">
                    الوصول: 3 دقائق
                  </span>
                </div>

                {/* Map with Live Car */}
                <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                  <LiveInteractiveMap
                    height="200px"
                    center={[pickup.lat, pickup.lng]}
                    zoom={13}
                    markers={[
                      { id: 'driver', lat: pickup.lat - 0.006, lng: pickup.lng - 0.005, title: 'سيارة الكابتن 🚗', car: selectedDriver?.car, type: 'driver' },
                      { id: 'pickup', lat: pickup.lat, lng: pickup.lng, title: `موقعك: ${pickup.name}`, type: 'pickup' },
                    ]}
                    routePolyline={[
                      [pickup.lat - 0.006, pickup.lng - 0.005],
                      [pickup.lat, pickup.lng],
                    ]}
                  />
                </div>

                {/* Start PIN Code Display */}
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">كود أمان بدء الرحلة (PIN):</span>
                    <span className="text-xl font-black text-amber-400 font-mono tracking-widest">8492</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => alert(`جاري الاتصال بالكابتن (${selectedDriver?.driverName})... 📞`)}
                      className="p-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl border border-slate-700"
                      title="اتصال"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => alert(`محادثة الشات مع الكابتن (${selectedDriver?.driverName})... 💬`)}
                      className="p-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl border border-slate-700"
                      title="محادثة"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Simulation Button */}
                <button
                  onClick={() => {
                    const fare = selectedDriver?.fare || currentFare;
                    if (selectedPayment === 'wallet') {
                      setWelcomeBalance(prev => Math.max(0, prev - fare));
                    }
                    setStep('completed');
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-black rounded-2xl text-xs shadow-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  محاكاة إنهاء الرحلة وتسوية الحساب 🏁
                </button>
              </div>
            )}

            {/* STEP 4: COMPLETED & DIGITAL INVOICE */}
            {step === 'completed' && (
              <div className="text-center py-4 space-y-3.5 animate-in zoom-in-95">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl animate-bounce">
                  🎉
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-base text-white">حمد الله على سلامتك!</h3>
                  <p className="text-xs text-slate-400">تم إكمال مشوار أخيل وتسوية الحساب بنجاح</p>
                </div>

                {/* Digital Receipt Card */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-right text-xs space-y-2 max-w-sm mx-auto shadow-inner">
                  <div className="flex justify-between text-slate-400 border-b border-slate-800 pb-1.5 font-bold">
                    <span>فاتورة المشوار الرقمية:</span>
                    <span className="font-mono text-amber-400">#ALT-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>طريقة السداد:</span>
                    <span className="font-bold text-emerald-400">
                      {selectedPayment === 'wallet' && 'تم الخصم من محفظة أخيل 💳'}
                      {selectedPayment === 'instapay' && 'تم التحويل عبر InstaPay (hisham15008@instapay) ⚡'}
                      {selectedPayment === 'vodafone_cash' && 'سُدد من محفظة (01206777771) 📱'}
                      {selectedPayment === 'cash' && 'سُدد نقداً للكابتن 💵'}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>المبلغ المسدد:</span>
                    <span className="font-mono font-bold text-white">{selectedDriver?.fare || currentFare} ج.م</span>
                  </div>
                  <div className="flex justify-between text-slate-400 border-t border-slate-800 pt-1.5 text-[11px]">
                    <span>رصيد محفظتك الحالي:</span>
                    <span className="font-mono font-bold text-emerald-400">{welcomeBalance} ج.م</span>
                  </div>
                </div>

                {/* Rate Captain */}
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-1.5 max-w-sm mx-auto">
                  <span className="text-xs font-bold text-slate-300 block">تقييم الكابتن ({selectedDriver?.driverName}):</span>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setDriverRating(star)}
                        className={`text-xl ${star <= driverRating ? 'text-amber-400' : 'text-slate-600'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep('create')}
                  className="w-full py-3.5 bg-amber-500 text-slate-950 font-black rounded-2xl text-xs hover:bg-amber-400 shadow-lg"
                >
                  طلب مشوار جديد 🐎
                </button>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: AKHIL 8 INCENTIVES HUB */}
        {/* ========================================================================= */}
        {activeTab === 'rewards' && (
          <div className="flex-1 p-4 space-y-3.5 overflow-y-auto">
            <div className="p-3.5 bg-gradient-to-r from-amber-500/20 to-indigo-500/20 border border-amber-500/30 rounded-2xl">
              <h3 className="font-black text-xs text-amber-300 flex items-center gap-1.5">
                <Gift className="w-4 h-4" />
                برامج حوافز عملاء أخيل الـ 8 (AKHIL Rewards)
              </h3>
              <p className="text-[10px] text-slate-300 mt-1">وفر واكسب نقاطاً وهدايا من أول مشوار وحتى رحلتك اليومية</p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {[
                { title: '1. AKHIL FIRST', desc: 'تجربة أول مشوار بخصم 50% ترحيبي.', tag: 'مفعّل' },
                { title: '2. AKHIL WELCOME', desc: '200 جنيه رصيد ترحيبي بمحفظتك + 100 نقطة.', tag: '200 ج.م' },
                { title: '3. AKHIL SHARE', desc: 'شارك كودك واكسب 30 ج.م مع كل صديق ينضم.', tag: 'دعوة' },
                { title: '4. AKHIL CASH UP', desc: 'مشوار مجاني كل شهر عند إتمام 20 مشواراً.', tag: 'شهري' },
                { title: '5. AKHIL YOUR PRICE', desc: 'حدد سعرك اليومي الثابت لروتينك المفضل.', tag: 'روتين' },
                { title: '6. AKHIL SPECIAL', desc: 'خصم 50% في يوم ميلادك ومناسباتك الخاصة.', tag: 'هدية' },
                { title: '7. AKHIL CREDIT', desc: 'رحلتك الآن وادفع بعدين للمستخدمين الملتزمين.', tag: 'آجل' },
                { title: '8. AKHIL WIN', desc: 'سحوبات شهرية على هواتف وجوائز كبرى.', tag: 'سحب 👑' },
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
        {/* TAB 3: WALLET & INSTAPAY TOP-UP */}
        {/* ========================================================================= */}
        {activeTab === 'wallet' && (
          <div className="flex-1 p-4 space-y-3.5 overflow-y-auto">
            <div className="p-4 bg-gradient-to-br from-indigo-950 to-slate-950 border border-slate-800 rounded-2xl space-y-3 shadow-lg">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-300 font-medium">رصيد محفظة أخيل المتاح:</span>
                <span className="text-xl font-black text-emerald-400 font-mono">{welcomeBalance} ج.م</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span>حد خدمة AKHIL CREDIT (ادفع بعدين):</span>
                <span className="font-bold text-amber-400 font-mono">{akhilCreditLimit} ج.م</span>
              </div>
            </div>

            {/* Quick Top-Up Wallet via InstaPay */}
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span>⚡</span> شحن المحفظة فوري (InstaPay / Wallet):
                </span>
                <span className="text-[10px] text-emerald-400">إيداع لحظي 24/7</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[50, 100, 200].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setWelcomeBalance(prev => prev + amt);
                    }}
                    className="py-2.5 px-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 rounded-xl text-xs font-bold transition shadow"
                  >
                    + {amt} ج.م
                  </button>
                ))}
              </div>
            </div>

            {/* Supported Payment Channels */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300">وسائل الدفع المعتمدة بحساباتك:</span>
              {[
                { id: 'instapay', name: 'إنستاباي: hisham15008@instapay', icon: '⚡', sub: 'حساب IPA المعتمد للتجربة' },
                { id: 'vodafone_cash', name: 'محفظة كاش: 01206777771', icon: '📱', sub: 'فودافون / أورنج / ميزة كاش' },
                { id: 'wallet', name: `محفظة أخيل (${welcomeBalance} ج.م)`, icon: '💳', sub: 'خصم رقمي آلي' },
                { id: 'cash', name: 'نقداً (كاش للكابتن مباشرة)', icon: '💵', sub: 'دفع يدوي' },
              ].map((p) => (
                <div
                  key={p.id}
                  className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{p.icon}</span>
                    <div>
                      <span className="font-bold text-white block">{p.name}</span>
                      <span className="text-[9px] text-slate-400">{p.sub}</span>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-bold text-[10px]">مفعل 🟢</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: RIDE HISTORY & INVOICES */}
        {/* ========================================================================= */}
        {activeTab === 'history' && (
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-300">مشاويرك السابقة والفواتير:</span>
              <span className="text-[10px] text-slate-400">إجمالي 14 مشواراً</span>
            </div>

            <div className="space-y-2">
              {[
                { id: '#ALT-8491', route: 'التحرير ⬅️ سيتي ستارز', time: 'أمس 09:30 م', fare: 75, driver: 'محمود السيد (4.95⭐)', method: 'InstaPay' },
                { id: '#ALT-8490', route: 'الدقي ⬅️ التجمع الخامس', time: 'منذ 3 أيام', fare: 130, driver: 'نورا السعيد (برثونة 🌸)', method: 'المحفظة' },
                { id: '#ALT-8489', route: 'المهندسين ⬅️ الشيخ زايد', time: 'منذ أسبوع', fare: 105, driver: 'أحمد فؤاد (4.88⭐)', method: 'كاش' },
              ].map((trip) => (
                <div key={trip.id} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-amber-400 font-bold">{trip.id}</span>
                    <span className="text-[10px] text-slate-400">{trip.time}</span>
                  </div>
                  <div className="text-white font-bold">{trip.route}</div>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-800/80 text-[11px]">
                    <span className="text-slate-400">الكابتن: {trip.driver} • ({trip.method})</span>
                    <strong className="text-white font-mono">{trip.fare} ج.م</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LOCATION SELECTOR MODAL (PICKUP / DESTINATION) */}
        {/* ========================================================================= */}
        {showLocationModal && (
          <div className="absolute inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col justify-end p-0">
            <div className="bg-slate-900 border-t-2 border-amber-500 rounded-t-3xl p-5 space-y-4 max-h-[85%] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
              
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{showLocationModal === 'pickup' ? '📍' : '🏁'}</span>
                  <div>
                    <h3 className="font-black text-sm text-white">
                      {showLocationModal === 'pickup' ? 'تحديد نقطة الانطلاق (الركوب)' : 'تحديد الوجهة المقصودة'}
                    </h3>
                    <p className="text-[10px] text-slate-400">اختر من الأماكن الرئيسية أو ابحث في القاهرة والجيزة</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowLocationModal(null);
                    setLocationSearchQuery('');
                  }}
                  className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ابحث عن مكان أو معلم سياحي..."
                  value={locationSearchQuery}
                  onChange={(e) => setLocationSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pr-9 pl-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Locations Grid */}
              <div className="overflow-y-auto max-h-64 space-y-1.5 pr-1">
                {filteredLocations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => {
                      if (showLocationModal === 'pickup') {
                        setPickup(loc);
                      } else {
                        setDestination(loc);
                      }
                      setShowLocationModal(null);
                      setLocationSearchQuery('');
                    }}
                    className="w-full p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-xl text-right transition flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{loc.icon}</span>
                      <div>
                        <span className="font-bold text-white block">{loc.name}</span>
                        <span className="text-[10px] text-slate-400">{loc.area} • {loc.governorate}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-amber-400 font-bold">اختيار 📍</span>
                  </button>
                ))}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
