'use client';

import React, { useState, useEffect } from 'react';
import { 
  Car, 
  Users, 
  DollarSign, 
  Activity, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Layers, 
  Zap, 
  HandCoins, 
  Globe, 
  Wallet, 
  TrendingUp, 
  Search, 
  Filter, 
  RefreshCw, 
  BellRing, 
  ExternalLink, 
  Flame, 
  Gift, 
  Headphones, 
  ArrowUpRight, 
  ArrowDownLeft, 
  AlertTriangle, 
  Check, 
  Plus, 
  Tag, 
  Percent, 
  BarChart3, 
  FileText, 
  Download, 
  Printer, 
  Calendar, 
  PieChart 
} from 'lucide-react';
import { translations, Locale } from '../locales/translations';

export default function AdminDashboardPage() {
  const [lang, setLang] = useState<Locale>('ar');
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'drivers' | 'rides' | 'wallets' | 'payouts' | 'disputes' | 'quests' | 'promotions' | 'heatmap' | 'pricing'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [simulatedDriversCount, setSimulatedDriversCount] = useState(142);
  const [isSimulating, setIsSimulating] = useState(false);

  // Reports Filter State (Daily, Weekly, Monthly, Yearly)
  const [reportPeriod, setReportPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');

  const t = translations[lang];
  const isRtl = t.dir === 'rtl';

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  // Live Simulation ticker
  useEffect(() => {
    let interval: any;
    if (isSimulating) {
      interval = setInterval(() => {
        setSimulatedDriversCount(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  // KPIs
  const stats = [
    { label: t.kpis.activeDrivers, value: simulatedDriversCount.toString(), icon: Car, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: t.kpis.ongoingTrips, value: '38', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: t.kpis.todayCommissions, value: `4,850 ${t.currency}`, icon: DollarSign, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'طلبات سحب وبلاغات معلقة', value: '7', icon: Headphones, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  ];

  // Report Data Dictionary by Period
  const reportData = {
    daily: {
      periodName: 'اليوم (23 أغسطس 2026)',
      gmv: '38,450 ج.م',
      commissions: '4,850 ج.م',
      completedTrips: '482 مشوار',
      activeCaptainsCount: '142 كابتن',
      newUsersCount: '86 مستخدم',
      avgTripFare: '79.80 ج.م',
      cancelRate: '3.8%',
      biddingShare: '68%',
      instantShare: '32%',
    },
    weekly: {
      periodName: 'هذا الأسبوع (17 - 23 أغسطس)',
      gmv: '264,800 ج.م',
      commissions: '33,100 ج.م',
      completedTrips: '3,310 مشوار',
      activeCaptainsCount: '380 كابتن',
      newUsersCount: '540 مستخدم',
      avgTripFare: '80.00 ج.م',
      cancelRate: '4.1%',
      biddingShare: '66%',
      instantShare: '34%',
    },
    monthly: {
      periodName: 'شهر أغسطس 2026 بالكامل',
      gmv: '1,148,000 ج.م',
      commissions: '143,500 ج.م',
      completedTrips: '14,350 مشوار',
      activeCaptainsCount: '620 كابتن',
      newUsersCount: '2,450 مستخدم',
      avgTripFare: '80.00 ج.م',
      cancelRate: '4.2%',
      biddingShare: '67%',
      instantShare: '33%',
    },
    yearly: {
      periodName: 'عام 2026 (حتى اليوم)',
      gmv: '8,920,000 ج.م',
      commissions: '1,115,000 ج.م',
      completedTrips: '111,500 مشوار',
      activeCaptainsCount: '1,250 كابتن',
      newUsersCount: '18,900 مستخدم',
      avgTripFare: '80.00 ج.م',
      cancelRate: '4.0%',
      biddingShare: '65%',
      instantShare: '35%',
    },
  };

  const currentReport = reportData[reportPeriod];

  // Category Revenue Share in Egypt
  const categoryReports = [
    { category: '🚗 سيارة عادية (اقتصادي)', trips: '8,897 مشوار', gmv: '712,000 ج.م', comm: '89,000 ج.م', share: '62%', color: 'bg-orange-500' },
    { category: '🛵 سكوتر وموتوسيكل', trips: '3,157 مشوار', gmv: '158,000 ج.م', comm: '19,750 ج.م', share: '22%', color: 'bg-amber-500' },
    { category: '🚘 سيارة مريحة (كومفورت)', trips: '1,578 مشوار', gmv: '210,000 ج.م', comm: '26,250 ج.م', share: '11%', color: 'bg-blue-500' },
    { category: '🛺 توكتوك (مشاوير داخلية)', trips: '718 مشوار', gmv: '68,000 ج.م', comm: '8,500 ج.م', share: '5%', color: 'bg-emerald-500' },
  ];

  // Top Revenue Zones in Greater Cairo
  const topZones = [
    { zone: 'مدينة نصر ومصر الجديدة', gmv: '368,000 ج.م', comm: '46,000 ج.م', trips: '4,600' },
    { zone: 'وسط البلد والزمالك والدقي', gmv: '298,000 ج.م', comm: '37,250 ج.م', trips: '3,725' },
    { zone: 'التجمع الخامس والقاهرة الجديدة', gmv: '240,000 ج.م', comm: '30,000 ج.م', trips: '2,000' },
    { zone: 'المعادي والمقطم', gmv: '142,000 ج.م', comm: '17,750 ج.م', trips: '1,775' },
    { zone: 'الشيخ زايد و 6 أكتوبر', gmv: '100,000 ج.م', comm: '12,500 ج.م', trips: '1,250' },
  ];

  // Pending Drivers List
  const [pendingDriversList, setPendingDriversList] = useState([
    { id: '1', name: lang === 'ar' ? 'محمود السيد' : 'Mahmoud El-Sayed', phone: '+201012345678', car: 'Toyota Corolla 2022', plate: 'أ ب ج 1234', category: 'ECONOMY', date: lang === 'ar' ? 'منذ 15 دقيقة' : '15 mins ago' },
    { id: '2', name: lang === 'ar' ? 'كريم عبد الله' : 'Kareem Abdullah', phone: '+201198765432', car: 'Benelli Scooter 2023', plate: 'س ص ع 5678', category: 'SCOOTER', date: lang === 'ar' ? 'منذ 40 دقيقة' : '40 mins ago' },
    { id: '3', name: lang === 'ar' ? 'أحمد فؤاد' : 'Ahmed Fouad', phone: '+201234567890', car: 'Hyundai Elantra 2024', plate: 'ط ك ل 9101', category: 'COMFORT', date: lang === 'ar' ? 'منذ ساعتين' : '2 hours ago' },
  ]);

  // Payout Requests
  const [payoutRequests, setPayoutRequests] = useState([
    { id: 'PAY-101', driver: 'أحمد فؤاد', phone: '+201234567890', amount: 350.0, method: 'InstaPay (fouad@instapay)', date: 'منذ 20 دقيقة' },
    { id: 'PAY-102', driver: 'كريم عبد الله', phone: '+201198765432', amount: 180.0, method: 'Vodafone Cash (01011223344)', date: 'منذ ساعة' },
    { id: 'PAY-103', driver: 'محمود السيد', phone: '+201012345678', amount: 500.0, method: 'InstaPay (mahmoud@instapay)', date: 'منذ ساعتين' },
  ]);

  // Support Disputes
  const [disputeTickets, setDisputeTickets] = useState([
    { id: 'DISP-501', driver: 'محمود السيد', rideId: '#ALT-8821', type: 'الراكب نزل دون دفع الأجرة كاش', amount: 75.0, route: 'ميدان التحرير ➡️ سيتي ستارز', time: 'منذ 10 دقائق' },
    { id: 'DISP-502', driver: 'سامح شكري', rideId: '#ALT-8816', type: 'استرداد رسوم كارتة طريق السويس', amount: 20.0, route: 'مصر الجديدة ➡️ مدينتي', time: 'منذ 45 دقيقة' },
    { id: 'DISP-503', driver: 'طارق كامل', rideId: '#ALT-8812', type: 'الراكب ألغى بعد وصول الكابتن بـ 5 د', amount: 25.0, route: 'المعادي ➡️ التجمع', time: 'منذ ساعتين' },
  ]);

  // Active Quests / Incentives Campaigns
  const [questsList, setQuestsList] = useState([
    { id: 'Q-1', title: 'تارجت ساعات الذروة المسائية 🌙', target: '6 مشاوير', timeWindow: '5:00 م - 9:00 م', reward: '+60.00 ج.م', activeCaptains: 84, completedToday: 29, budgetSpent: '1,740 ج.م' },
    { id: 'Q-2', title: 'تارجت بطل الأسبوع 🏆', target: '40 مشواراً', timeWindow: 'أسبوعي (السبت - الجمعة)', reward: '+300.00 ج.م', activeCaptains: 142, completedToday: 18, budgetSpent: '5,400 ج.م' },
    { id: 'Q-3', title: 'بونص نهاية الأسبوع (الجمعة)', target: '10 مشاوير', timeWindow: 'يوم الجمعة طوال اليوم', reward: '+120.00 ج.م', activeCaptains: 95, completedToday: 42, budgetSpent: '5,040 ج.م' },
  ]);

  // Promo Codes & Marketing Campaigns
  const [promoCodesList, setPromoCodesList] = useState([
    { code: 'ALTAYER50', type: 'نسبة مئوية (50%)', maxDiscount: '25.00 ج.م', uses: 842, budgetSpent: '16,840 ج.م', target: 'الركاب الجدد (أول مشوار)', isActive: true },
    { code: 'WEEKEND20', type: 'نسبة مئوية (20%)', maxDiscount: '20.00 ج.م', uses: 419, budgetSpent: '6,285 ج.م', target: 'مشاوير الخميس والجمعة', isActive: true },
    { code: 'STUDENT15', type: 'نسبة مئوية (15%)', maxDiscount: '15.00 ج.م', uses: 290, budgetSpent: '3,480 ج.م', target: 'منطقة الجامعات والطلاب', isActive: true },
    { code: 'FREE30', type: 'مبلغ ثابت (30 ج.م)', maxDiscount: '30.00 ج.م', uses: 512, budgetSpent: '15,360 ج.م', target: 'مكافآت برنامج دعوة الأصدقاء', isActive: true },
  ]);

  const handleApproveDriver = (id: string) => {
    setPendingDriversList(prev => prev.filter(d => d.id !== id));
    alert(lang === 'ar' ? 'تم اعتماد وتفعيل حساب الكابتن بنجاح 🟢' : 'Captain profile approved successfully');
  };

  const handleApprovePayout = (id: string, amount: number, driver: string) => {
    setPayoutRequests(prev => prev.filter(p => p.id !== id));
    alert(`تم تحويل ${amount} ج.م للكابتن ${driver} واعتماد السحب في النظام 🟢`);
  };

  const handleCompensateDispute = (id: string, amount: number, driver: string) => {
    setDisputeTickets(prev => prev.filter(t => t.id !== id));
    alert(`تم تعويض الكابتن ${driver} بمبلغ ${amount} ج.م وإضافتها لمحفظته فوراً 🟢`);
  };

  // Live Rides
  const activeRides = [
    { id: '#ALT-8821', type: 'BIDDING', rider: lang === 'ar' ? 'سارة إبراهيم' : 'Sara Ibrahim', driver: lang === 'ar' ? 'حسن علي' : 'Hassan Ali', from: lang === 'ar' ? 'مدينة نصر' : 'Nasr City', to: lang === 'ar' ? 'المعادي' : 'Maadi', fare: `95 ${t.currency}`, status: 'IN_PROGRESS' },
    { id: '#ALT-8820', type: 'INSTANT', rider: lang === 'ar' ? 'محمد سامح' : 'Mohamed Sameh', driver: lang === 'ar' ? 'طارق كامل' : 'Tarek Kamel', from: lang === 'ar' ? 'الزمالك' : 'Zamalek', to: lang === 'ar' ? 'التجمع الخامس' : 'New Cairo', fare: `160 ${t.currency}`, status: 'ARRIVED' },
    { id: '#ALT-8819', type: 'BIDDING', rider: lang === 'ar' ? 'عمر خالد' : 'Omar Khaled', driver: lang === 'ar' ? 'جاري استقبال العروض...' : 'Collecting Bids...', from: lang === 'ar' ? 'الدقي' : 'Dokki', to: lang === 'ar' ? 'المهندسين' : 'Mohandessin', fare: `45 ${t.currency}`, status: 'BROADCASTING' },
  ];

  // Financial Ledger Transactions
  const transactions = [
    { id: 'TX-901', driver: 'محمود السيد', rideId: '#ALT-8815', amount: '+7.50 ج.م', type: 'عمولة رحلة كاش (10%)', date: 'منذ 10 دقائق', balance: '132.50 ج.م' },
    { id: 'TX-900', driver: 'أحمد فؤاد', rideId: '#ALT-8814', amount: '+24.00 ج.م', type: 'عمولة رحلة فورية (15%)', date: 'منذ 25 دقيقة', balance: '210.00 ج.م' },
    { id: 'TX-899', driver: 'كريم عبد الله', rideId: '-', amount: '+100.00 ج.م', type: 'شحن محفظة (فودافون كاش)', date: 'منذ ساعة', balance: '100.00 ج.م' },
  ];

  // Hotspots
  const hotspots = [
    { area: 'مدينة نصر ومصر الجديدة', demand: 'مرتفع جداً 🔥🔥', activeCars: 48, surge: '1.2x' },
    { area: 'وسط البلد وميدان التحرير والزمالك', demand: 'مرتفع 🔥', activeCars: 36, surge: '1.1x' },
    { area: 'التجمع الخامس والقاهرة الجديدة', demand: 'متوسط ⚡', activeCars: 29, surge: '1.0x' },
    { area: 'المعادي والمقطم', demand: 'متوسط ⚡', activeCars: 18, surge: '1.0x' },
    { area: 'الدقي والمهندسين وجامعة القاهرة', demand: 'مرتفع 🔥', activeCars: 22, surge: '1.15x' },
  ];

  const handleExportPdfReport = () => {
    window.print();
  };

  return (
    <div className={`flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans ${isRtl ? 'dir-rtl' : 'dir-ltr'}`} dir={t.dir}>
      {/* Sidebar Navigation */}
      <aside className={`w-64 bg-slate-900/95 backdrop-blur flex flex-col justify-between p-4 ${isRtl ? 'border-l' : 'border-r'} border-slate-800`}>
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 px-3 py-4 mb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-bold text-xl shadow-lg shadow-orange-600/30 text-white">
              ⚡
            </div>
            <div>
              <h1 className="font-bold text-base text-white">عالطاير (3altayer)</h1>
              <p className="text-[11px] text-orange-400 font-semibold">{t.appSubtitle}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              {t.tabs.radar}
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'reports' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-amber-400" />
              التقارير والإحصائيات الشاملة 📊
            </button>

            <button
              onClick={() => setActiveTab('drivers')}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'drivers' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Car className="w-4 h-4" />
              {t.tabs.drivers}
              {pendingDriversList.length > 0 && (
                <span className={`${isRtl ? 'mr-auto' : 'ml-auto'} bg-amber-500/20 text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-bold`}>
                  {pendingDriversList.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('rides')}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'rides' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              {t.tabs.rides}
            </button>

            <button
              onClick={() => setActiveTab('promotions')}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'promotions' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Tag className="w-4 h-4 text-orange-400" />
              العروض والبروموكود للركاب 🎟️
            </button>

            <button
              onClick={() => setActiveTab('quests')}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'quests' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Gift className="w-4 h-4 text-amber-400" />
              حملات البونص والتارجت للكباتن 🏆
            </button>

            <button
              onClick={() => setActiveTab('payouts')}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'payouts' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              طلبات سحب الأرباح (Payouts)
              {payoutRequests.length > 0 && (
                <span className={`${isRtl ? 'mr-auto' : 'ml-auto'} bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold font-mono`}>
                  {payoutRequests.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('disputes')}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'disputes' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Headphones className="w-4 h-4 text-rose-400" />
              الشكاوى والنزاعات والتعويضات
              {disputeTickets.length > 0 && (
                <span className={`${isRtl ? 'mr-auto' : 'ml-auto'} bg-rose-500/20 text-rose-400 text-[10px] px-2 py-0.5 rounded-full font-bold font-mono`}>
                  {disputeTickets.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('wallets')}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'wallets' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Wallet className="w-4 h-4" />
              دفتر الحسابات والعمولات
            </button>

            <button
              onClick={() => setActiveTab('heatmap')}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'heatmap' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4" />
              خريطة الكثافة ومناطق الذروة
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pricing' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              {t.tabs.pricing}
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="space-y-2">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl border text-[11px] font-bold transition ${
              isSimulating
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <RefreshCw className={`w-3 h-3 ${isSimulating ? 'animate-spin' : ''}`} />
              محاكاة الرادار
            </span>
            <span>{isSimulating ? 'نشط 🟢' : 'إيقاف ⚪'}</span>
          </button>

          <button
            onClick={toggleLanguage}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] text-slate-200 transition font-bold"
          >
            <span className="flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-orange-400" />
              <span>{t.langName}</span>
            </span>
            <span className="text-orange-400">{t.switchLang}</span>
          </button>
        </div>
      </aside>

      {/* Main Screen Content */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-slate-950">
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/70 backdrop-blur sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-bold text-slate-200">{t.liveOperationsCairo}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/rider"
              target="_blank"
              className="text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1"
            >
              📱 فتح تطبيق الراكب <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href="/driver"
              target="_blank"
              className="text-xs bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1"
            >
              🚗 فتح تطبيق الكابتن <ExternalLink className="w-3 h-3" />
            </a>

            <span className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/30 px-3 py-1.5 rounded-xl font-bold">
              {t.currency} (EGP)
            </span>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* TAB: COMPREHENSIVE REPORTS & ANALYTICS (Daily / Monthly / Yearly) */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              {/* Report Header & Period Filters */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-5 h-5 text-orange-400" />
                    <h2 className="font-bold text-lg text-white">التقارير المالية والتشغيلية الشاملة</h2>
                  </div>
                  <p className="text-xs text-slate-400">
                    كشف حساب وإحصائيات المنصة لـ: <strong className="text-orange-400 font-bold">{currentReport.periodName}</strong>
                  </p>
                </div>

                {/* Period Selector & Export Actions */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex gap-1">
                    <button
                      onClick={() => setReportPeriod('daily')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        reportPeriod === 'daily' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      يومي (Daily)
                    </button>
                    <button
                      onClick={() => setReportPeriod('weekly')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        reportPeriod === 'weekly' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      أسبوعي (Weekly)
                    </button>
                    <button
                      onClick={() => setReportPeriod('monthly')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        reportPeriod === 'monthly' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      شهري (Monthly)
                    </button>
                    <button
                      onClick={() => setReportPeriod('yearly')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        reportPeriod === 'yearly' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      سنوي (Yearly)
                    </button>
                  </div>

                  <button
                    onClick={handleExportPdfReport}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5 text-orange-400" /> طباعة / تصدير PDF
                  </button>
                </div>
              </div>

              {/* Main Executive Summary KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl space-y-1">
                  <span className="text-xs text-slate-400 font-medium">إجمالي قيمة المشاوير (GMV):</span>
                  <div className="text-2xl font-mono font-black text-white">{currentReport.gmv}</div>
                  <p className="text-[10px] text-emerald-400 font-bold">▲ نمو +18.4% مقارنة بالفترة السابقة</p>
                </div>

                <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-orange-500/30 rounded-2xl space-y-1 shadow-lg shadow-orange-600/10">
                  <span className="text-xs text-slate-400 font-medium">صافي أرباح وعمولات المنصة:</span>
                  <div className="text-2xl font-mono font-black text-orange-400">{currentReport.commissions}</div>
                  <p className="text-[10px] text-slate-400">متوسط العمولة: 12.5%</p>
                </div>

                <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl space-y-1">
                  <span className="text-xs text-slate-400 font-medium">عدد المشاوير المكتملة:</span>
                  <div className="text-2xl font-mono font-black text-blue-400">{currentReport.completedTrips}</div>
                  <p className="text-[10px] text-slate-400">المزايدة: {currentReport.biddingShare} • الفوري: {currentReport.instantShare}</p>
                </div>

                <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl space-y-1">
                  <span className="text-xs text-slate-400 font-medium">معدل الإلغاء العام:</span>
                  <div className="text-2xl font-mono font-black text-emerald-400">{currentReport.cancelRate}</div>
                  <p className="text-[10px] text-slate-400">معدل منخفض جداً وممتاز</p>
                </div>
              </div>

              {/* Grid 2: Categories Breakdown & Top Zones */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. Category Share Report */}
                <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                      <PieChart className="w-4 h-4 text-orange-400" /> تقرير الفئات والسيارات الأكثر دخلاً
                    </h3>
                    <span className="text-xs text-slate-400">حصة السوق</span>
                  </div>

                  <div className="space-y-3">
                    {categoryReports.map((cat, idx) => (
                      <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-slate-200">{cat.category}</span>
                          <span className="font-bold text-orange-400 font-mono">{cat.share}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                          <div className={`h-full ${cat.color} rounded-full`} style={{ width: cat.share }}></div>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                          <span>المشاوير: <strong className="text-slate-300 font-mono">{cat.trips}</strong></span>
                          <span>العمولات المحصلة: <strong className="text-emerald-400 font-mono">{cat.comm}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Top Revenue Zones in Cairo */}
                <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-emerald-400" /> تقرير المناطق الأكثر طلباً وإيراداً (القاهرة)
                    </h3>
                    <span className="text-xs text-slate-400">المناطق الأعلى دخلاً</span>
                  </div>

                  <div className="space-y-2.5">
                    {topZones.map((zone, idx) => (
                      <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-slate-200">{idx + 1}. {zone.zone}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{zone.trips} مشوار مكتمل</p>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-white font-mono">{zone.gmv}</p>
                          <p className="text-[10px] text-emerald-400 font-mono">عمولة: {zone.comm}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* OTHER TABS */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
                      <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[420px]">
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <h2 className="font-bold text-base text-white">{t.radar.title}</h2>
                  </div>
                  <span className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full font-bold">
                    {t.radar.badge}
                  </span>
                </div>

                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

                <div className="my-auto flex flex-col items-center justify-center text-center p-8 z-10 space-y-4">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center animate-ping absolute inset-0"></div>
                    <div className="w-28 h-28 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center relative shadow-2xl shadow-orange-500/40">
                      <Car className="w-12 h-12 text-orange-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-100">{t.radar.connected}</h3>
                    <p className="text-xs text-slate-400 max-w-md mt-1">
                      {t.radar.desc}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-slate-800 pt-4 text-center z-10">
                  <div>
                    <span className="text-xs text-slate-500">{t.radar.avgEta}</span>
                    <p className="font-bold text-slate-200 text-sm mt-0.5">{t.radar.avgEtaVal}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">{t.radar.acceptanceRate}</span>
                    <p className="font-bold text-emerald-400 text-sm mt-0.5">{t.radar.acceptanceRateVal}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">{t.radar.topMode}</span>
                    <p className="font-bold text-orange-400 text-sm mt-0.5">{t.radar.topModeVal}</p>
                  </div>
                </div>
              </div>

              {/* Pending Approvals Quick Box */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-bold text-base text-white">{t.drivers.title}</h2>
                    <ShieldCheck className="w-5 h-5 text-amber-500" />
                  </div>
                  <p className="text-xs text-slate-400 mb-4">{t.drivers.subtitle}</p>

                  <div className="space-y-3">
                    {pendingDriversList.slice(0, 3).map((driver) => (
                      <div key={driver.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-xs text-slate-200">{driver.name}</p>
                            <p className="text-[11px] text-slate-400">{driver.car}</p>
                          </div>
                          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                            {driver.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => handleApproveDriver(driver.id)}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-1.5 rounded-lg transition"
                          >
                            {t.drivers.approve}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('drivers')}
                  className="w-full mt-4 text-center text-xs text-orange-400 hover:underline font-bold"
                >
                  {t.drivers.viewAll} ({pendingDriversList.length}) ⬅️
                </button>
              </div>
            </div>
          )}

          {/* TAB: PROMOTIONS */}
          {activeTab === 'promotions' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-lg text-white">إدارة العروض والبروموكود للركاب (Promotions & Coupons)</h2>
                  <p className="text-xs text-slate-400 mt-0.5">إنشاء كوبونات الخصم، ومتابعة ميزانية الحملات التسويقية</p>
                </div>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-bold font-mono">
                  إجمالي ما وفره الركاب: 41,965 ج.م
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className={`w-full ${isRtl ? 'text-right' : 'text-left'} text-sm`}>
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800 text-xs font-bold">
                      <th className="pb-3 px-4">كود الخصم</th>
                      <th className="pb-3 px-4">نوع الخصم</th>
                      <th className="pb-3 px-4">الحد الأقصى</th>
                      <th className="pb-3 px-4">الفئة المستهدفة</th>
                      <th className="pb-3 px-4">مرات الاستخدام</th>
                      <th className="pb-3 px-4">ميزانية الخصومات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {promoCodesList.map((promo, idx) => (
                      <tr key={idx} className="hover:bg-slate-950/60 transition text-slate-300">
                        <td className="py-4 px-4 font-mono font-black text-orange-400 text-sm">{promo.code}</td>
                        <td className="py-4 px-4 font-bold text-slate-100 text-xs">{promo.type}</td>
                        <td className="py-4 px-4 font-mono text-emerald-400 text-xs font-bold">{promo.maxDiscount}</td>
                        <td className="py-4 px-4 text-xs text-slate-400">{promo.target}</td>
                        <td className="py-4 px-4 font-mono font-bold text-white">{promo.uses} مشوار</td>
                        <td className="py-4 px-4 font-mono font-bold text-rose-400">{promo.budgetSpent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: PAYOUTS */}
          {activeTab === 'payouts' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-lg text-white">طلبات سحب أرباح الكباتن (Captain Payouts Queue)</h2>
                  <p className="text-xs text-slate-400 mt-0.5">مراجعة وتحويل مستحقات الكباتن للرحلات الإلكترونية عبر InstaPay والمحافظ الهاتفية</p>
                </div>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-bold">
                  إجمالي طلبات السحب: {payoutRequests.reduce((acc, p) => acc + p.amount, 0)} ج.م
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className={`w-full ${isRtl ? 'text-right' : 'text-left'} text-sm`}>
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800 text-xs font-bold">
                      <th className="pb-3 px-4">رقم الطلب</th>
                      <th className="pb-3 px-4">اسم الكابتن</th>
                      <th className="pb-3 px-4">رقم الهاتف</th>
                      <th className="pb-3 px-4">المبلغ المطلوب</th>
                      <th className="pb-3 px-4">طريقة التحويل والعنوان</th>
                      <th className="pb-3 px-4">الإجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {payoutRequests.map((payout) => (
                      <tr key={payout.id} className="hover:bg-slate-950/60 transition text-slate-300">
                        <td className="py-4 px-4 font-mono font-bold text-orange-400">{payout.id}</td>
                        <td className="py-4 px-4 font-bold text-slate-100">{payout.driver}</td>
                        <td className="py-4 px-4 font-mono text-xs text-slate-400">{payout.phone}</td>
                        <td className="py-4 px-4 font-bold text-emerald-400 font-mono text-base">{payout.amount}.00 ج.م</td>
                        <td className="py-4 px-4 font-mono text-xs text-slate-300">{payout.method}</td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleApprovePayout(payout.id, payout.amount, payout.driver)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition flex items-center gap-1 shadow-md"
                          >
                            <Check className="w-3.5 h-3.5" /> تحويل وتأكيد السحب 🟢
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: DISPUTES */}
          {activeTab === 'disputes' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-lg text-white">تذاكر النزاعات والشكاوى وحسابات التعويض (Dispute Center)</h2>
                  <p className="text-xs text-slate-400 mt-0.5">حل نزاعات الرحلات (عدم دفع كاش، رسوم بوابات، وإلغاءات بعد الوصول)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {disputeTickets.map((ticket) => (
                  <div key={ticket.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3.5 hover:border-slate-700 transition">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-mono font-bold text-orange-400">{ticket.id}</span>
                      <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full font-bold">
                        معلق
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <p><span className="text-slate-500 font-medium">الكابتن:</span> <strong className="text-white">{ticket.driver}</strong></p>
                      <p><span className="text-slate-500 font-medium">المشوار:</span> <strong className="font-mono text-slate-200">{ticket.rideId}</strong></p>
                      <p><span className="text-slate-500 font-medium">المسار:</span> {ticket.route}</p>
                      <p className="text-rose-400 font-bold pt-1">⚠️ {ticket.type}</p>
                      <p><span className="text-slate-500 font-medium">التعويض المطلوب:</span> <strong className="text-emerald-400 font-mono text-sm font-bold">{ticket.amount} ج.م</strong></p>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-slate-800/80">
                      <button
                        onClick={() => handleCompensateDispute(ticket.id, ticket.amount, ticket.driver)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1 shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> اعتماد التعويض بالمحفظة 💰
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: QUESTS */}
          {activeTab === 'quests' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-lg text-white">إدارة حملات التارجت والمكافآت للكباتن (Captain Quests)</h2>
                  <p className="text-xs text-slate-400 mt-0.5">تحفيز الكباتن على تغطية ساعات الذروة والمناطق الأكثر طلباً</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {questsList.map((quest) => (
                  <div key={quest.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3.5 hover:border-slate-700 transition">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-sm text-white">{quest.title}</h3>
                      <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold font-mono">
                        {quest.reward}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300">
                      <p><span className="text-slate-500">المطلوب:</span> <strong className="text-slate-100">{quest.target}</strong></p>
                      <p><span className="text-slate-500">الفترة:</span> {quest.timeWindow}</p>
                      <p><span className="text-slate-500">الكباتن المشاركين:</span> <strong className="text-blue-400 font-mono">{quest.activeCaptains} كابتن</strong></p>
                      <p><span className="text-slate-500">أنجزوا التارجت:</span> <strong className="text-emerald-400 font-mono">{quest.completedToday} كابتن</strong></p>
                      <p><span className="text-slate-500">المكافآت المصروفة:</span> <strong className="text-orange-400 font-mono">{quest.budgetSpent}</strong></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: DRIVERS */}
          {activeTab === 'drivers' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="font-bold text-lg text-white">{t.drivers.title}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">مراجعة الهوية الوطنية ورخص القيادة والسيارة قبل التفعيل في مصر</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {pendingDriversList.map((driver) => (
                  <div key={driver.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-sm text-slate-100">{driver.name}</h3>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{driver.phone}</p>
                      </div>
                      <span className="text-[11px] bg-orange-500/20 text-orange-300 px-2.5 py-0.5 rounded-full font-bold">
                        {driver.category}
                      </span>
                    </div>

                    <div className="bg-slate-900 p-3.5 rounded-xl text-xs space-y-1.5 text-slate-300">
                      <p><span className="text-slate-500 font-medium">{t.drivers.vehicle}:</span> {driver.car}</p>
                      <p><span className="text-slate-500 font-medium">{t.drivers.plate}:</span> <strong className="font-mono text-slate-100">{driver.plate}</strong></p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApproveDriver(driver.id)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1"
                      >
                        <CheckCircle2 className="w-4 h-4" /> {t.drivers.approve}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: RIDES */}
          {activeTab === 'rides' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="font-bold text-lg text-white">{t.rides.title}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{t.rides.subtitle}</p>
              </div>

              <div className="overflow-x-auto">
                <table className={`w-full ${isRtl ? 'text-right' : 'text-left'} text-sm`}>
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800 text-xs font-bold">
                      <th className="pb-3 px-4">{t.rides.rideNumber}</th>
                      <th className="pb-3 px-4">{t.rides.mode}</th>
                      <th className="pb-3 px-4">{t.rides.rider}</th>
                      <th className="pb-3 px-4">{t.rides.driver}</th>
                      <th className="pb-3 px-4">{t.rides.route}</th>
                      <th className="pb-3 px-4">{t.rides.fare}</th>
                      <th className="pb-3 px-4">{t.rides.status}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {activeRides.map((ride) => (
                      <tr key={ride.id} className="hover:bg-slate-950/60 transition text-slate-300">
                        <td className="py-4 px-4 font-mono font-bold text-orange-400">{ride.id}</td>
                        <td className="py-4 px-4">
                          {ride.type === 'INSTANT' ? (
                            <span className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-2.5 py-1 rounded-full font-bold">
                              <Zap className="w-3 h-3" /> {t.rides.instant}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-2.5 py-1 rounded-full font-bold">
                              <HandCoins className="w-3 h-3" /> {t.rides.bidding}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 font-semibold text-slate-200">{ride.rider}</td>
                        <td className="py-4 px-4 text-slate-400">{ride.driver}</td>
                        <td className="py-4 px-4 text-xs font-medium">
                          {ride.from} ➡️ {ride.to}
                        </td>
                        <td className="py-4 px-4 font-bold text-white font-mono">{ride.fare}</td>
                        <td className="py-4 px-4">
                          <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                            ride.status === 'IN_PROGRESS' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            ride.status === 'ARRIVED' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                            'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse'
                          }`}>
                            {ride.status === 'IN_PROGRESS' ? t.rides.inProgress :
                             ride.status === 'ARRIVED' ? t.rides.arrived : t.rides.broadcasting}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: WALLETS */}
          {activeTab === 'wallets' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-lg text-white">دفتر الحسابات والعمولات المالية (Financial Ledger)</h2>
                  <p className="text-xs text-slate-400 mt-0.5">تسجيل عمولات المنصة، تسويات الكاش، وعمليات شحن المحافظ بالجنيه المصري</p>
                </div>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-bold">
                  الحد الائتماني: -150.00 ج.م
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className={`w-full ${isRtl ? 'text-right' : 'text-left'} text-sm`}>
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800 text-xs font-bold">
                      <th className="pb-3 px-4">رقم الحركة</th>
                      <th className="pb-3 px-4">الكابتن</th>
                      <th className="pb-3 px-4">رقم الرحلة</th>
                      <th className="pb-3 px-4">نوع الحركة</th>
                      <th className="pb-3 px-4">المبلغ</th>
                      <th className="pb-3 px-4">الرصيد بعد الحركة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-950/60 transition text-slate-300">
                        <td className="py-4 px-4 font-mono font-bold text-orange-400">{tx.id}</td>
                        <td className="py-4 px-4 font-semibold text-slate-200">{tx.driver}</td>
                        <td className="py-4 px-4 font-mono text-xs">{tx.rideId}</td>
                        <td className="py-4 px-4 text-xs font-medium text-slate-300">{tx.type}</td>
                        <td className="py-4 px-4 font-bold text-emerald-400 font-mono">{tx.amount}</td>
                        <td className="py-4 px-4 font-bold text-white font-mono">{tx.balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: HEATMAP */}
          {activeTab === 'heatmap' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="font-bold text-lg text-white">خريطة الكثافة ومعدلات الطلب في القاهرة الكبرى</h2>
                <p className="text-xs text-slate-400 mt-0.5">مراقبة المناطق الأكثر طلباً وتطبيق التسعير الديناميكي (Surge Pricing)</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {hotspots.map((spot, index) => (
                  <div key={index} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-sm text-slate-100">{spot.area}</h3>
                      <span className="text-xs bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold font-mono">
                        {spot.surge}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-300">
                      <p><span className="text-slate-500">حجم الطلب:</span> {spot.demand}</p>
                      <p><span className="text-slate-500">السيارات المتاحة:</span> <strong className="text-emerald-400">{spot.activeCars} كابتن</strong></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PRICING */}
          {activeTab === 'pricing' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="font-bold text-lg text-white">{t.pricing.title}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{t.pricing.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-orange-400 font-bold">
                    <Zap className="w-5 h-5" />
                    <h3>{t.pricing.instantCommission}</h3>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1.5 font-medium">{t.pricing.commissionRate}</label>
                    <input type="number" defaultValue="15" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-sm font-mono font-bold" />
                  </div>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <HandCoins className="w-5 h-5" />
                    <h3>{t.pricing.biddingCommission}</h3>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1.5 font-medium">{t.pricing.commissionRate}</label>
                    <input type="number" defaultValue="10" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-sm font-mono font-bold" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
