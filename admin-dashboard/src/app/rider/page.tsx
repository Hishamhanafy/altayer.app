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
  ChevronLeft,
  Calendar,
  Clock,
  Package,
  Award,
  Wallet,
  CreditCard
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
  const [activeTab, setActiveTab] = useState<'book' | 'rewards' | 'wallet'>('book');
  const [bookingMode, setBookingMode] = useState<'BIDDING' | 'INSTANT'>('BIDDING');
  const [selectedService, setSelectedService] = useState<ServiceCategory>(AKHIL_SERVICES[0]);
  
  // Location States
  const [pickup, setPickup] = useState<GeoLocation>(PRESET_LOCATIONS[0]);
  const [destination, setDestination] = useState<GeoLocation>(PRESET_LOCATIONS[6]);
  const [showLocationModal, setShowLocationModal] = useState<'pickup' | 'dest' | null>(null);
  const [locationSearchQuery, setLocationSearchQuery] = useState<string>('');
  const [mapClickMode, setMapClickMode] = useState<'pickup' | 'dest'>('dest');
  
  const [step, setStep] = useState<'create' | 'bidding' | 'en_route' | 'completed'>('create');
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('cash');

  // Scheduled Modal State
  const [showScheduledModal, setShowScheduledModal] = useState<boolean>(false);

  // Welcome Incentive Bonus
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
    { id: '1', driverName: 'محمود السيد (كابتن أخيل 👑)', car: 'تويوتا كورولا 2023', plate: 'أ ب ج 1234', rating: 4.95, trips: 1420, fare: currentFare, eta: 3, isParthona: false },
    { id: '2', driverName: 'أحمد فؤاد (فريق أخيل)', car: 'هيونداي إلنترا 2024', plate: 'ط ك ل 9101', rating: 4.88, trips: 830, fare: currentFare + 10, eta: 5, isParthona: false },
    { id: '3', driverName: 'نورا السعيد (برثونة معتمدة 🌸)', car: 'كيا سيراتو 2023', plate: 'ن ر ا 5544', rating: 5.00, trips: 620, fare: currentFare, eta: 4, isParthona: true },
  ];

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 font-sans" dir="rtl">
      {/* Mobile Shell Simulation Container */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[760px] relative">
        
        {/* AKHIL Brand Header */}
        <header className="p-4 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-900 to-amber-500 flex items-center justify-center text-xl shadow-lg shadow-amber-500/20 text-white font-bold">
              🐎
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-base text-white">أخيل | AKHIL</h1>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded">عميل</span>
              </div>
              <p className="text-[10px] text-amber-400 font-semibold tracking-wide">أبعد من طريق</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowScheduledModal(true)}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-amber-400 transition"
              title="رحلة مجدولة"
            >
              <Calendar className="w-4 h-4" />
            </button>
            <div className="text-right bg-slate-950/80 border border-slate-800 px-2.5 py-1 rounded-xl">
              <span className="text-[9px] text-slate-400 block font-medium">رصيد الترحيب</span>
              <span className="text-xs font-bold text-emerald-400 font-mono">{welcomeBalance} ج.م</span>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 bg-slate-950 border-b border-slate-800 p-1.5 gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('book')}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'book' ? 'bg-indigo-900 text-amber-300 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            طلب رحلة
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'rewards' ? 'bg-indigo-900 text-amber-300 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            حوافز أخيل (8)
          </button>
          <button
            onClick={() => setActiveTab('wallet')}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'wallet' ? 'bg-indigo-900 text-amber-300 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            المحفظة والدفع
          </button>
        </div>

        {/* TAB 1: BOOK RIDE */}
        {activeTab === 'book' && (
          <div className="flex-1 flex flex-col justify-between p-4 overflow-y-auto">
            {step === 'create' && (
              <div className="space-y-4">
                {/* Mode Selector */}
                <div className="grid grid-cols-2 bg-slate-950 p-1 rounded-2xl border border-slate-800 gap-1 text-xs font-bold">
                  <button
                    onClick={() => setBookingMode('BIDDING')}
                    className={`py-2.5 rounded-xl transition flex items-center justify-center gap-2 ${
                      bookingMode === 'BIDDING' ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20' : 'text-slate-400'
                    }`}
                  >
                    <HandCoins className="w-4 h-4" />
                    مزايدة بسعرك 🤝
                  </button>
                  <button
                    onClick={() => setBookingMode('INSTANT')}
                    className={`py-2.5 rounded-xl transition flex items-center justify-center gap-2 ${
                      bookingMode === 'INSTANT' ? 'bg-emerald-600 text-white font-black shadow-lg shadow-emerald-600/20' : 'text-slate-400'
                    }`}
                  >
                    <Zap className="w-4 h-4" />
                    حجز فوري مباشر ⚡
                  </button>
                </div>

                {/* Pickup & Destination Inputs */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-2 shadow-lg relative">
                  {/* Pickup Selector */}
                  <div 
                    onClick={() => setShowLocationModal('pickup')}
                    className="flex items-center justify-between gap-3 p-2 hover:bg-slate-900 rounded-xl cursor-pointer transition border border-transparent hover:border-emerald-500/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                      <div>
                        <span className="text-[10px] text-emerald-400 block font-semibold">نقطة الانطلاق (اضغط للتغيير)</span>
                        <span className="text-xs font-bold text-white flex items-center gap-1">
                          <span>{pickup.icon}</span>
                          <span>{pickup.name}</span>
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded-lg font-bold">
                      تغيير 🔄
                    </span>
                  </div>

                  {/* Swap Button & Divider */}
                  <div className="flex items-center justify-between pr-3 pl-1">
                    <div className="h-px bg-slate-800 flex-1 mr-2" />
                    <button
                      type="button"
                      onClick={() => {
                        const temp = pickup;
                        setPickup(destination);
                        setDestination(temp);
                      }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-indigo-900 text-amber-300 text-[10px] font-bold rounded-lg border border-slate-700 hover:border-amber-500/40 transition flex items-center gap-1 shadow"
                      title="عكس نقطة الانطلاق والوجهة"
                    >
                      <span>🔁</span>
                      عكس الاتجاه
                    </button>
                  </div>

                  {/* Destination Selector */}
                  <div 
                    onClick={() => setShowLocationModal('dest')}
                    className="flex items-center justify-between gap-3 p-2 hover:bg-slate-900 rounded-xl cursor-pointer transition border border-transparent hover:border-amber-500/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
                      <div>
                        <span className="text-[10px] text-amber-400 block font-semibold">الوجهة (اضغط للتغيير)</span>
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                          <span>{destination.icon}</span>
                          <span>{destination.name}</span>
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-1 rounded-lg font-bold">
                      تغيير 🔄
                    </span>
                  </div>
                </div>

                {/* Live Interactive Map with Map Mode Selector (Pickup / Destination) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                      <span>🗺️</span> الخريطة ({tripDistanceKm} كم)
                    </span>
                    <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[9px] font-bold">
                      <button
                        type="button"
                        onClick={() => setMapClickMode('pickup')}
                        className={`px-2 py-0.5 rounded transition ${mapClickMode === 'pickup' ? 'bg-emerald-600 text-white font-black' : 'text-slate-400 hover:text-white'}`}
                      >
                        📍 تحديد الانطلاق
                      </button>
                      <button
                        type="button"
                        onClick={() => setMapClickMode('dest')}
                        className={`px-2 py-0.5 rounded transition ${mapClickMode === 'dest' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'}`}
                      >
                        🏁 تحديد الوجهة
                      </button>
                    </div>
                  </div>

                  <LiveInteractiveMap
                    height="210px"
                    center={[pickup.lat, pickup.lng]}
                    zoom={12}
                    onMapClick={(lat, lng) => {
                      const clickedLocation: GeoLocation = {
                        id: `custom-${Date.now()}`,
                        name: `موقع محدد (${lat.toFixed(3)}, ${lng.toFixed(3)})`,
                        area: 'موقع جغرافي',
                        governorate: lat < 30.01 ? 'الجيزة' : 'القاهرة',
                        lat,
                        lng,
                        icon: mapClickMode === 'pickup' ? '📍' : '🏁'
                      };

                      if (mapClickMode === 'pickup') {
                        setPickup(clickedLocation);
                      } else {
                        setDestination(clickedLocation);
                      }
                    }}
                    markers={[
                      { id: 'pickup', lat: pickup.lat, lng: pickup.lng, title: `الانطلاق: ${pickup.name}`, type: 'pickup' },
                      { id: 'dest', lat: destination.lat, lng: destination.lng, title: `الوجهة: ${destination.name}`, type: 'destination' },
                      { id: 'd1', lat: pickup.lat + 0.005, lng: pickup.lng + 0.006, title: 'محمود السيد (كابتن أخيل 👑)', car: 'تويوتا كورولا', rating: 4.95, type: 'driver' },
                      { id: 'd2', lat: pickup.lat - 0.004, lng: pickup.lng - 0.005, title: 'أحمد فؤاد (أخيل)', car: 'هيونداي إلنترا', rating: 4.88, type: 'driver' },
                      { id: 'd3', lat: pickup.lat + 0.003, lng: pickup.lng - 0.004, title: 'نورا السعيد (برثونة معتمدة 🌸)', car: 'كيا سيراتو', rating: 5.00, type: 'parthona' },
                    ]}
                    routePolyline={[
                      [pickup.lat, pickup.lng],
                      [(pickup.lat + destination.lat) / 2 + 0.005, (pickup.lng + destination.lng) / 2],
                      [destination.lat, destination.lng],
                    ]}
                  />
                </div>

                {/* 10 AKHIL Services Carousel */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-300">خدمات أخيل الـ 10 (Master Services):</span>
                    <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-mono">تقريب لأعلى 5 ج</span>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {AKHIL_SERVICES.map((s) => {
                      const isSelected = selectedService.id === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setSelectedService(s)}
                          className={`flex-shrink-0 w-28 p-2.5 rounded-2xl border text-right transition flex flex-col justify-between ${
                            isSelected 
                              ? 'bg-gradient-to-b from-indigo-950 to-slate-900 border-amber-500 shadow-lg shadow-amber-500/10' 
                              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-xl">{s.icon}</span>
                            <span className="text-[10px] font-mono font-bold text-amber-400">{s.multiplier}x</span>
                          </div>
                          <div className="mt-2">
                            <span className={`text-[11px] font-bold block ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                              {s.name}
                            </span>
                            <span className="text-[9px] text-slate-500 block truncate">{s.nameEn}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Contextual Service Rule Banner */}
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center gap-3">
                  <span className="text-2xl">{selectedService.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">{selectedService.name}</span>
                      {selectedService.badge && (
                        <span className="text-[9px] bg-pink-500/20 text-pink-400 border border-pink-500/30 px-1.5 py-0.2 rounded font-bold">
                          {selectedService.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{selectedService.desc}</p>
                  </div>
                </div>

                {/* Waiting & Security Policy */}
                <div className="p-2.5 bg-slate-950/40 border border-slate-800/80 rounded-xl flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    الانتظار: أول دقيقتين مجاناً ثم 3 ج/دقيقة
                  </span>
                  <span className="flex items-center gap-1 text-indigo-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    كود PIN: 8492
                  </span>
                </div>

                {/* Price Box & CTA */}
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2 px-1">
                    <span className="text-xs text-slate-400">الأجرة التقديرية للرحلة:</span>
                    <div className="text-right">
                      <span className="text-xl font-black text-amber-400 font-mono">{currentFare} ج.م</span>
                      <span className="text-[10px] text-slate-500 block">شاملة الضريبة والخدمة</span>
                    </div>
                  </div>

                  <button
                    onClick={handleRequestRide}
                    className={`w-full py-3.5 rounded-2xl font-black text-sm transition shadow-xl flex items-center justify-center gap-2 ${
                      bookingMode === 'BIDDING'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-600/20 hover:from-emerald-500 hover:to-teal-500'
                    }`}
                  >
                    <span>🐎</span>
                    {bookingMode === 'BIDDING'
                      ? `استدعِ أخيل بسعرك (${currentFare} ج.م)`
                      : `تأكيد الحجز الفوري المباشر (${currentFare} ج.م)`}
                  </button>
                </div>
              </div>
            )}

            {/* Step: Live Bidding */}
            {step === 'bidding' && (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-indigo-950 to-slate-950 border border-indigo-500/30 rounded-2xl text-center space-y-2">
                  <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 animate-pulse text-lg">
                    📡
                  </div>
                  <h3 className="font-extrabold text-sm text-white">جاري استقبال عروض كباتن أخيل...</h3>
                  <p className="text-[11px] text-slate-400">سعر مقترحك: <strong className="text-amber-400 font-mono">{currentFare} ج.م</strong></p>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-slate-400">العروض الواردة لحظياً:</span>
                  {sampleBids.map((bid) => (
                    <div key={bid.id} className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2.5 hover:border-amber-500/50 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-white">{bid.driverName}</span>
                            {bid.isParthona && <span className="text-[9px] bg-pink-500/20 text-pink-300 px-1 rounded">برثونة</span>}
                          </div>
                          <span className="text-[10px] text-slate-400 block">{bid.car} • {bid.plate}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-black text-amber-400 font-mono">{bid.fare} ج.م</span>
                          <span className="text-[10px] text-emerald-400 block font-medium">يبعد {bid.eta} دقائق</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAcceptBid(bid)}
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow"
                        >
                          قبول العرض والانطلاق 🚀
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setStep('create')}
                  className="w-full py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-700"
                >
                  إلغاء الطلب
                </button>
              </div>
            )}

            {/* Step: En Route Tracking */}
            {step === 'en_route' && (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-emerald-950 to-slate-950 border border-emerald-500/30 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Car className="w-4 h-4" />
                      الكابتن في طريقه إليك
                    </span>
                    <span className="text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                      الوصول بعد 3 د
                    </span>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-white block">{selectedDriver?.driverName}</span>
                      <span className="text-[10px] text-slate-400">{selectedDriver?.car} • {selectedDriver?.plate}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">كود أمان البدء</span>
                      <span className="text-base font-black text-amber-400 font-mono tracking-wider">8492</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>طريقة الدفع:</span>
                    <strong className="text-white">كاش (نقداً)</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>قيمة المشوار:</span>
                    <strong className="text-amber-400 font-mono font-bold">{selectedDriver?.fare || currentFare} ج.م</strong>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setStep('completed');
                    setWelcomeBalance(prev => Math.max(0, prev - 25));
                  }}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-xs shadow-lg"
                >
                  محاكاة إنهاء الرحلة بنجاح 🏁
                </button>
              </div>
            )}

            {/* Step: Completed */}
            {step === 'completed' && (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl">
                  🎉
                </div>
                <h3 className="font-black text-lg text-white">حمد الله على سلامتك!</h3>
                <p className="text-xs text-slate-400">تم إكمال مشوار أخيل بنجاح وإضافة 25 نقطة ولاء إلى رصيدك 🎁</p>

                <button
                  onClick={() => setStep('create')}
                  className="w-full py-3 bg-amber-500 text-slate-950 font-black rounded-2xl text-xs hover:bg-amber-400 shadow-lg"
                >
                  طلب مشوار جديد 🐎
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: AKHIL 8 INCENTIVES HUB */}
        {activeTab === 'rewards' && (
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <div className="p-3 bg-gradient-to-r from-amber-500/20 to-indigo-500/20 border border-amber-500/30 rounded-2xl">
              <h3 className="font-extrabold text-xs text-amber-300 flex items-center gap-1.5">
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

        {/* TAB 3: WALLET & PAYMENT METHODS */}
        {activeTab === 'wallet' && (
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-medium">رصيد محفظة أخيل المتاح:</span>
                <span className="text-lg font-black text-emerald-400 font-mono">{welcomeBalance} ج.م</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 pt-1 border-t border-slate-800">
                <span>حد خدمة AKHIL CREDIT (ادفع بعدين):</span>
                <span className="font-bold text-amber-400 font-mono">{akhilCreditLimit} ج.م</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300">وسائل الدفع المعتمدة:</span>
              {[
                { id: 'cash', name: 'نقداً (كاش للكابتن مباشرة)', icon: '💵' },
                { id: 'instapay', name: 'إنستاباي (InstaPay IPA)', icon: '⚡' },
                { id: 'vodafone_cash', name: 'محافظ فودافون كاش وميزة', icon: '📱' },
                { id: 'credit', name: 'خدمة AKHIL CREDIT (ادفع بعدين)', icon: '💳' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPayment(p.id)}
                  className={`w-full p-3 rounded-2xl border text-right transition flex items-center justify-between ${
                    selectedPayment === p.id 
                      ? 'bg-indigo-950 border-amber-500 text-white font-bold' 
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{p.icon}</span>
                    <span className="text-xs">{p.name}</span>
                  </div>
                  {selectedPayment === p.id && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* LOCATION SELECTION MODAL (PICKUP / DESTINATION) */}
        {showLocationModal && (
          <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col justify-end p-0">
            <div className="bg-slate-900 border-t-2 border-amber-500 rounded-t-3xl p-5 space-y-4 max-h-[85%] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
              
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {showLocationModal === 'pickup' ? '📍' : '🏁'}
                  </span>
                  <div>
                    <h3 className="font-black text-sm text-white">
                      {showLocationModal === 'pickup' ? 'تحديد نقطة الانطلاق (موقعك)' : 'تحديد وجهة المشوار'}
                    </h3>
                    <p className="text-[10px] text-slate-400">اختر من الأماكن الشهيرة في القاهرة والجيزة أو اكتب عنوانك</p>
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

              {/* Search Box */}
              <div className="relative">
                <input
                  type="text"
                  value={locationSearchQuery}
                  onChange={(e) => setLocationSearchQuery(e.target.value)}
                  placeholder="ابحث عن مكان، ميدان، مول، أو شارع..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 pr-9"
                />
                <span className="absolute right-3 top-2.5 text-slate-400 text-sm">🔍</span>
              </div>

              {/* Preset Hotspots List */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-60 scrollbar-thin">
                {PRESET_LOCATIONS
                  .filter(loc => 
                    loc.name.includes(locationSearchQuery) || 
                    loc.area.includes(locationSearchQuery) || 
                    loc.governorate.includes(locationSearchQuery)
                  )
                  .map((loc) => (
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
                      className="w-full p-2.5 bg-slate-950/80 hover:bg-indigo-950/60 border border-slate-800 hover:border-amber-500/50 rounded-2xl flex items-center justify-between text-right transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{loc.icon}</span>
                        <div>
                          <span className="text-xs font-bold text-white block">{loc.name}</span>
                          <span className="text-[10px] text-slate-400">{loc.area}</span>
                        </div>
                      </div>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                        loc.governorate === 'الجيزة' 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {loc.governorate}
                      </span>
                    </button>
                  ))}
              </div>

              {/* Custom Address Input (Optional) */}
              {locationSearchQuery.trim().length > 2 && (
                <button
                  onClick={() => {
                    const customGeo: GeoLocation = {
                      id: `custom-${Date.now()}`,
                      name: locationSearchQuery,
                      area: 'عنوان مخصص',
                      governorate: 'القاهرة',
                      lat: 30.0500 + (Math.random() - 0.5) * 0.05,
                      lng: 31.2500 + (Math.random() - 0.5) * 0.05,
                      icon: '📍',
                    };
                    if (showLocationModal === 'pickup') {
                      setPickup(customGeo);
                    } else {
                      setDestination(customGeo);
                    }
                    setShowLocationModal(null);
                    setLocationSearchQuery('');
                  }}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition shadow flex items-center justify-center gap-2"
                >
                  <span>📍</span>
                  تأكيد واختيار: "{locationSearchQuery}"
                </button>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
