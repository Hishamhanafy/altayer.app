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
  const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'medical_tests' | 'reports' | 'drivers' | 'rides' | 'wallets' | 'payouts' | 'disputes' | 'quests' | 'promotions' | 'heatmap' | 'pricing'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [simulatedDriversCount, setSimulatedDriversCount] = useState(142);
  const [isSimulating, setIsSimulating] = useState(false);

  // Financials Statements & Sub-tabs State
  const [financialsPeriod, setFinancialsPeriod] = useState<'2026_Q2' | '2026_Q1' | '2025_ANNUAL'>('2026_Q2');
  const [financialsViewMode, setFinancialsViewMode] = useState<'statements' | 'startup_capital' | 'chart_of_accounts' | 'journal_entries'>('statements');

  // Startup Capital & Incorporation Expenses State
  const [startupAccounts, setStartupAccounts] = useState({
    authorizedCapital: 5000000, // رأس المال المرخص به
    paidInCapital: 2500000, // رأس المال المصدر والمدفوع
    legalIncorporation: 120000, // رسوم التأسيس والسجل التجاري والتراخيص
    techDevelopment: 350000, // تكاليف البرمجة وتجهيز السيرفرات والخرائط
    initialMarketing: 280000, // حملة الإطلاق والهوية البصرية
    officeSetup: 150000, // تجهيزات المقر والأجهزة
    cashOpeningBank: 1200000, // النقدية الافتتاحية بالبنوك
    cashOpeningWallets: 400000, // المحافظ الرقمية الافتتاحية (InstaPay / فودافون كاش)
    retainedReserve: 0, // الأرباح المبقاة الافتتاحية
  });

  const [showEditStartupModal, setShowEditStartupModal] = useState(false);
  const [startupForm, setStartupForm] = useState({ ...startupAccounts });

  // Chart of Accounts (شجرة الحسابات المحاسبية الموحدة)
  const chartOfAccountsList = [
    { code: '1000', name: 'الأصول (Assets)', type: 'أصول', balance: '4,450,000 ج.م', nature: 'مدين' },
    { code: '1010', name: 'النقدية بالبنوك المحلية (CIB / الأهلي / مصر)', type: 'أصول متداولة', balance: '2,450,000 ج.م', nature: 'مدين' },
    { code: '1020', name: 'محافظ الدفع اللحظي (InstaPay / فودافون كاش)', type: 'أصول متداولة', balance: '680,000 ج.م', nature: 'مدين' },
    { code: '1030', name: 'مديونيات الكاش المستحقة لدى الكباتن', type: 'أصول متداولة', balance: '185,000 ج.م', nature: 'مدين' },
    { code: '1040', name: 'مصاريف تأسيس مؤجلة (أصول غير ملموسة)', type: 'أصول غير ملموسة', balance: '750,000 ج.م', nature: 'مدين' },
    { code: '1050', name: 'أصول ثابتة وتجهيزات وأجهزة خوادم', type: 'أصول ثابتة', balance: '385,000 ج.م', nature: 'مدين' },
    { code: '2000', name: 'الخصوم والالتزامات (Liabilities)', type: 'خصوم', balance: '610,000 ج.م', nature: 'دائن' },
    { code: '2010', name: 'مستحقات الكباتن القابلة للسحب الفوري', type: 'خصوم متداولة', balance: '390,000 ج.م', nature: 'دائن' },
    { code: '2020', name: 'أمانات وأرصدة محافظ الركاب', type: 'خصوم متداولة', balance: '220,000 ج.م', nature: 'دائن' },
    { code: '3000', name: 'حقوق الملكية ورأس المال (Equity)', type: 'حقوق ملكية', balance: '2,705,000 ج.م', nature: 'دائن' },
    { code: '3010', name: 'رأس المال المصدر والمدفوع (Paid-in Capital)', type: 'حقوق ملكية', balance: '2,500,000 ج.م', nature: 'دائن' },
    { code: '3020', name: 'الاحتياطي النظامي والأرباح المرحلة', type: 'حقوق ملكية', balance: '205,000 ج.م', nature: 'دائن' },
    { code: '4000', name: 'الإيرادات التشغيلية (Revenue)', type: 'إيرادات', balance: '1,085,000 ج.م', nature: 'دائن' },
    { code: '4010', name: 'إيرادات عمولات الرحلات (10% Take Rate)', type: 'إيرادات', balance: '845,000 ج.م', nature: 'دائن' },
    { code: '4020', name: 'إيرادات اشتراكات الضمان المالي (AKHIL GUARANTEE)', type: 'إيرادات', balance: '145,000 ج.م', nature: 'دائن' },
    { code: '4030', name: 'إيرادات عقود شراكات الفعاليات', type: 'إيرادات', balance: '95,000 ج.م', nature: 'دائن' },
    { code: '5000', name: 'المصروفات التشغيلية والتأسيسية (Expenses)', type: 'مصروفات', balance: '670,000 ج.م', nature: 'مدين' },
    { code: '5010', name: 'مصاريف السيرفرات والبنية السحابية وبوابات الدفع', type: 'مصروفات تشغيل', balance: '165,000 ج.م', nature: 'مدين' },
    { code: '5020', name: 'مخصصات حوافز الركاب والترحيب (200 ج)', type: 'مصروفات تسويق', balance: '110,000 ج.م', nature: 'مدين' },
    { code: '5030', name: 'مخصصات حوافز الكباتن وصندوق السيارة الملكية', type: 'مصروفات حوافز', balance: '185,000 ج.م', nature: 'مدين' },
    { code: '5040', name: 'المصروفات الإدارية ورواتب الدعم الفني والعمليات', type: 'مصروفات إدارية', balance: '210,000 ج.م', nature: 'مدين' },
  ];

  // Journal Entries (سجل قيود اليومية المحاسبية)
  const [journalEntriesList, setJournalEntriesList] = useState([
    {
      id: 'JV-001',
      date: '01/01/2026',
      desc: 'قيد الافتتاح: إيداع رأس المال النقدي بالبنك ومصاريف التأسيس',
      debitAcc: '1010 النقدية بالبنك (1,200,000) + 1040 مصاريف التأسيس (1,300,000)',
      creditAcc: '3010 رأس المال المدفوع',
      amount: 2500000,
      ref: 'عقد التأسيس #849',
    },
    {
      id: 'JV-002',
      date: '15/01/2026',
      desc: 'سداد مصاريف التراخيص والرسوم الحكومية وتراخيص التطبيق',
      debitAcc: '1040 مصاريف تأسيس وتراخيص',
      creditAcc: '1010 النقدية بالبنك',
      amount: 120000,
      ref: 'إيصال حكومي #310',
    },
    {
      id: 'JV-003',
      date: '01/02/2026',
      desc: 'تغذية المحافظ الرقمية الافتتاحية (InstaPay وفودافون كاش)',
      debitAcc: '1020 محافظ الدفع اللحظي',
      creditAcc: '1010 النقدية بالبنك',
      amount: 400000,
      ref: 'تحويل بنكي #552',
    },
    {
      id: 'JV-004',
      date: '30/06/2026',
      desc: 'إثبات إيرادات العمولات المحصلة للربع الثاني (10%)',
      debitAcc: '1020 المحافظ + 1030 مديونيات الكاش',
      creditAcc: '4010 إيرادات عمولات الرحلات',
      amount: 845000,
      ref: 'تسوية شهرية Q2',
    },
  ]);

  const [showAddJournalModal, setShowAddJournalModal] = useState(false);
  const [newJournal, setNewJournal] = useState({
    desc: '',
    debitAcc: '1010 النقدية بالبنوك',
    creditAcc: '3010 رأس المال المدفوع',
    amount: 100000,
    ref: '',
  });

  const handleUpdateStartupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStartupAccounts({ ...startupForm });
    setShowEditStartupModal(false);
    alert('تم حفظ وتحديث الحسابات الافتتاحية ومصاريف التأسيس ورأس المال بنجاح 🟢');
  };

  const handleCreateJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJournal.desc) {
      alert('يرجى كتابة بيان القيد!');
      return;
    }
    const created = {
      id: `JV-00${journalEntriesList.length + 1}`,
      date: '26/08/2026',
      desc: newJournal.desc,
      debitAcc: newJournal.debitAcc,
      creditAcc: newJournal.creditAcc,
      amount: Number(newJournal.amount),
      ref: newJournal.ref || `سند #${Date.now().toString().slice(-4)}`,
    };
    setJournalEntriesList(prev => [created, ...prev]);
    setShowAddJournalModal(false);
    setNewJournal({
      desc: '',
      debitAcc: '1010 النقدية بالبنوك',
      creditAcc: '3010 رأس المال المدفوع',
      amount: 100000,
      ref: '',
    });
    alert(`تم تسجيل القيد المحاسبي (${created.id}) وترحيله لدفتر الأستاذ العام بنجاح 📑🟢`);
  };

  // Interactive Data Entry Modals State
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
  const [newDriver, setNewDriver] = useState({ name: '', phone: '', car: '', plate: '', category: 'ECONOMY' });

  const [showAddMedicalModal, setShowAddMedicalModal] = useState(false);
  const [newMedical, setNewMedical] = useState({
    driverName: '',
    phone: '',
    car: '',
    labName: 'معامل البرج (Al-Borg Lab)',
    testType: 'تحليل سموم ومخدرات شامل (7 مواد)',
    testDate: '26/08/2026',
    expiryDate: '26/02/2027',
    result: 'NEGATIVE',
  });

  const [showAddPromoModal, setShowAddPromoModal] = useState(false);
  const [newPromo, setNewPromo] = useState({ code: '', type: 'نسبة مئوية (20%)', maxDiscount: '25.00 ج.م', target: 'جميع الركاب' });

  const t = translations[lang];
  const isRtl = t.dir === 'rtl';

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleCreateDriver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDriver.name || !newDriver.phone) {
      alert('يرجى كتابة اسم الكابتن ورقم الهاتف!');
      return;
    }
    const created = {
      id: Date.now().toString(),
      name: newDriver.name,
      phone: newDriver.phone,
      car: newDriver.car || 'تويوتا كورولا 2023',
      plate: newDriver.plate || 'ق هـ و 9876',
      category: newDriver.category,
      date: 'الآن (مضاف يدوياً)',
    };
    setPendingDriversList(prev => [created, ...prev]);
    setShowAddDriverModal(false);
    setNewDriver({ name: '', phone: '', car: '', plate: '', category: 'ECONOMY' });
    alert('تمت إضافة الكابتن بنجاح إلى قائمة الانتظار والاعتماد 🟢');
  };

  const handleCreateMedical = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedical.driverName) {
      alert('يرجى إدخال اسم الكابتن!');
      return;
    }
    const created = {
      id: `MED-${Date.now().toString().slice(-4)}`,
      driverName: newMedical.driverName,
      phone: newMedical.phone || '+201000000000',
      car: newMedical.car || 'سيارة معتمدة',
      labName: newMedical.labName,
      testType: newMedical.testType,
      testDate: newMedical.testDate,
      expiryDate: newMedical.expiryDate,
      result: newMedical.result,
      criminalRecord: 'VALID',
      status: newMedical.result === 'NEGATIVE' ? 'ACTIVE' : 'SUSPENDED',
      certificateUrl: 'https://akhil.app/certs/new.pdf',
    };
    setMedicalTestsList(prev => [created, ...prev]);
    setShowAddMedicalModal(false);
    setNewMedical({
      driverName: '',
      phone: '',
      car: '',
      labName: 'معامل البرج (Al-Borg Lab)',
      testType: 'تحليل سموم ومخدرات شامل (7 مواد)',
      testDate: '26/08/2026',
      expiryDate: '26/02/2027',
      result: 'NEGATIVE',
    });
    alert('تم حفظ نتيجة التحليل الطبي والفحص بنجاح في المنظومة 🟢');
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromo.code) {
      alert('يرجى إدخال كود الخصم!');
      return;
    }
    const created = {
      code: newPromo.code.toUpperCase(),
      type: newPromo.type,
      maxDiscount: newPromo.maxDiscount,
      uses: 0,
      budgetSpent: '0 ج.م',
      target: newPromo.target,
      isActive: true,
    };
    setPromoCodesList(prev => [created, ...prev]);
    setShowAddPromoModal(false);
    setNewPromo({ code: '', type: 'نسبة مئوية (20%)', maxDiscount: '25.00 ج.م', target: 'جميع الركاب' });
    alert(`تم إنشاء كود الخصم (${created.code}) وتفعيله فوراً للركاب 🎟️🟢`);
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
    { code: 'AKHIL50', type: 'نسبة مئوية (50%)', maxDiscount: '25.00 ج.م', uses: 842, budgetSpent: '16,840 ج.م', target: 'الركاب الجدد (أول مشوار)', isActive: true },
    { code: 'WEEKEND20', type: 'نسبة مئوية (20%)', maxDiscount: '20.00 ج.م', uses: 419, budgetSpent: '6,285 ج.م', target: 'مشاوير الخميس والجمعة', isActive: true },
    { code: 'STUDENT15', type: 'نسبة مئوية (15%)', maxDiscount: '15.00 ج.م', uses: 290, budgetSpent: '3,480 ج.م', target: 'منطقة الجامعات والطلاب', isActive: true },
    { code: 'AKHIL30', type: 'مبلغ ثابت (30 ج.م)', maxDiscount: '30.00 ج.م', uses: 512, budgetSpent: '15,360 ج.م', target: 'مكافآت برنامج دعوة الأصدقاء', isActive: true },
  ]);

  // Closing Financials Datasets (P&L, Balance Sheet, Cash Flow, Unit Economics)
  const closingFinancialsData = {
    '2026_Q2': {
      periodName: 'الربع الثاني 2026 (أبريل - يونيو 2026)',
      gmv: 8450000, // Gross Merchandise Value (EGP)
      commissionRevenue: 845000, // 10% Platform Commission
      guaranteeRevenue: 145000, // Monthly Guarantee Plans
      eventsRevenue: 95000, // Partner of Events
      totalRevenue: 1085000, // Total Gross Revenue
      techOpex: 165000, // Cloud, Maps APIs, Payment Gateways
      riderIncentives: 110000, // 200 EGP Welcome + Promotions
      driverRewards: 185000, // Weekly Flow + Free Car Amortization Fund
      adminSalaries: 210000, // Support & Operations Staff
      ebitda: 415000, // Earnings Before Tax & Depreciation
      netProfit: 325000, // Net Profit (30% Profit Margin)
      // Balance Sheet
      cashInBank: 2450000,
      instaPayWallets: 680000,
      receivablesDebt: 185000,
      driverPayables: 390000,
      riderDeposits: 220000,
      equityReserve: 2705000,
    },
    '2026_Q1': {
      periodName: 'الربع الأول 2026 (يناير - مارس 2026)',
      gmv: 6200000,
      commissionRevenue: 620000,
      guaranteeRevenue: 110000,
      eventsRevenue: 60000,
      totalRevenue: 790000,
      techOpex: 140000,
      riderIncentives: 95000,
      driverRewards: 135000,
      adminSalaries: 180000,
      ebitda: 240000,
      netProfit: 190000,
      cashInBank: 1950000,
      instaPayWallets: 510000,
      receivablesDebt: 140000,
      driverPayables: 310000,
      riderDeposits: 180000,
      equityReserve: 2110000,
    },
    '2025_ANNUAL': {
      periodName: 'القوائم الختامية للعام المالي 2025 (كامل)',
      gmv: 18400000,
      commissionRevenue: 1840000,
      guaranteeRevenue: 280000,
      eventsRevenue: 180000,
      totalRevenue: 2300000,
      techOpex: 420000,
      riderIncentives: 260000,
      driverRewards: 380000,
      adminSalaries: 520000,
      ebitda: 720000,
      netProfit: 580000,
      cashInBank: 1650000,
      instaPayWallets: 420000,
      receivablesDebt: 110000,
      driverPayables: 240000,
      riderDeposits: 150000,
      equityReserve: 1790000,
    },
  };

  // Driver Drug Tests & Medical Screening Compliance Records
  const [medicalTestsList, setMedicalTestsList] = useState([
    {
      id: 'MED-101',
      driverName: 'محمود السيد (كابتن أخيل)',
      phone: '+201012345678',
      car: 'تويوتا كورولا 2023 (أ ب ج 1234)',
      labName: 'معامل البرج (Al-Borg Lab)',
      testType: 'تحليل سموم ومخدرات شامل (7 مواد)',
      testDate: '15/07/2026',
      expiryDate: '15/01/2027',
      result: 'NEGATIVE', // Negative / Pass
      criminalRecord: 'VALID', // سليم وخال من السوابق
      status: 'ACTIVE',
      certificateUrl: 'https://akhil.app/certs/med-101.pdf',
    },
    {
      id: 'MED-102',
      driverName: 'أحمد فؤاد (فريق أخيل)',
      phone: '+201234567890',
      car: 'هيونداي إلنترا 2024 (ط ك ل 9101)',
      labName: 'معامل المختبر (Al-Mokhtabar)',
      testType: 'فحص مخدرات وكشف سريري معتمد',
      testDate: '01/08/2026',
      expiryDate: '01/02/2027',
      result: 'NEGATIVE',
      criminalRecord: 'VALID',
      status: 'ACTIVE',
      certificateUrl: 'https://akhil.app/certs/med-102.pdf',
    },
    {
      id: 'MED-103',
      driverName: 'نورا السعيد (برثونة معتمدة 🌸)',
      phone: '+201198765432',
      car: 'كيا سيراتو 2023 (ن ر ا 5544)',
      labName: 'المعامل المركزية لوزارة الصحة',
      testType: 'فحص مخدرات وسلامة عامة (برثونة)',
      testDate: '20/06/2026',
      expiryDate: '20/12/2026',
      result: 'NEGATIVE',
      criminalRecord: 'VALID',
      status: 'ACTIVE',
      certificateUrl: 'https://akhil.app/certs/med-103.pdf',
    },
    {
      id: 'MED-104',
      driverName: 'حسام عبد العال',
      phone: '+201099887766',
      car: 'نيسان صني 2021 (س ع ص 4411)',
      labName: 'معامل البرج (Al-Borg Lab)',
      testType: 'تحليل سموم ومخدرات دوري',
      testDate: '10/02/2026',
      expiryDate: '10/08/2026', // Expired
      result: 'EXPIRED',
      criminalRecord: 'VALID',
      status: 'SUSPENDED', // Auto-suspended due to test expiration
      certificateUrl: 'https://akhil.app/certs/med-104.pdf',
    },
    {
      id: 'MED-105',
      driverName: 'مصطفى كمال الدين',
      phone: '+201555443322',
      car: 'رينو ميجان 2024 (ق ف م 9988)',
      labName: 'معامل المختبر (Al-Mokhtabar)',
      testType: 'تحليل مخدرات أول انضمام',
      testDate: '25/08/2026',
      expiryDate: '25/02/2027',
      result: 'PENDING_LAB',
      criminalRecord: 'VALID',
      status: 'PENDING_REVIEW',
      certificateUrl: 'https://akhil.app/certs/med-105.pdf',
    },
  ]);

  const handleApproveMedical = (id: string) => {
    setMedicalTestsList(prev => prev.map(m => m.id === id ? { ...m, status: 'ACTIVE', result: 'NEGATIVE' } : m));
    alert('تم اعتماد التحليل الطبي وتفعيل حساب الكابتن بنجاح 🟢');
  };

  const handleSuspendMedical = (id: string) => {
    setMedicalTestsList(prev => prev.map(m => m.id === id ? { ...m, status: 'SUSPENDED' } : m));
    alert('تم تعليق حساب الكابتن مؤقتاً لحين تجديد التحليل الطبي ⚠️');
  };

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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-900 to-amber-500 flex items-center justify-center font-bold text-xl shadow-lg shadow-amber-500/20 text-white">
              🐎
            </div>
            <div>
              <h1 className="font-bold text-base text-white">أخيل | AKHIL</h1>
              <p className="text-[11px] text-amber-400 font-semibold">{t.appSubtitle}</p>
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
              onClick={() => setActiveTab('financials')}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'financials' ? 'bg-indigo-900 text-amber-300 shadow-lg shadow-indigo-900/40' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <DollarSign className="w-4 h-4 text-emerald-400" />
              الحسابات الختامية والأرباح 📑
            </button>

            <button
              onClick={() => setActiveTab('medical_tests')}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'medical_tests' ? 'bg-indigo-900 text-amber-300 shadow-lg shadow-indigo-900/40' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-pink-400" />
              تحاليل المخدرات والفحص الطبي 🧪
              <span className={`${isRtl ? 'mr-auto' : 'ml-auto'} bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold`}>
                معتمد
              </span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'reports' ? 'bg-indigo-900 text-amber-300 shadow-lg shadow-indigo-900/40' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-amber-400" />
              التقارير والإحصائيات الشاملة 📊
            </button>

            <button
              onClick={() => setActiveTab('drivers')}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'drivers' ? 'bg-indigo-900 text-amber-300 shadow-lg shadow-indigo-900/40' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
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
              className="text-xs bg-indigo-600/20 hover:bg-indigo-600/30 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 shadow"
            >
              🐎 تطبيق العميل (AKHIL Rider) <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href="/driver"
              target="_blank"
              className="text-xs bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 shadow"
            >
              👨🏻‍✈️ تطبيق الكابتن والبرثونة (AKHIL Captain) <ExternalLink className="w-3 h-3" />
            </a>

            <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-xl font-bold">
              {t.currency} (EGP)
            </span>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">

          {/* TAB: CLOSING FINANCIALS & STARTUP ACCOUNTS */}
          {activeTab === 'financials' && (
            <div className="space-y-6">
              {/* Financials Sub-Tab Navigation */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                <div className="flex flex-wrap gap-1.5 text-xs font-bold">
                  {[
                    { id: 'statements', label: '📊 القوائم المالية الختامية (P&L & Balance Sheet)' },
                    { id: 'startup_capital', label: '🏛️ رأس المال ومصاريف التأسيس والحسابات الافتتاحية' },
                    { id: 'chart_of_accounts', label: '📑 شجرة الحسابات المحاسبية (COA)' },
                    { id: 'journal_entries', label: '📝 قيود اليومية ودفتر الأستاذ' },
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setFinancialsViewMode(sub.id as any)}
                      className={`px-3.5 py-2 rounded-xl transition ${
                        financialsViewMode === sub.id 
                          ? 'bg-indigo-900 text-amber-300 font-black shadow-lg shadow-indigo-900/40 border border-amber-500/30' 
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow"
                  >
                    <Printer className="w-4 h-4" />
                    طباعة التقرير المالي 📄
                  </button>
                </div>
              </div>

              {/* SUB-VIEW 1: FINANCIAL STATEMENTS (P&L & BALANCE SHEET) */}
              {financialsViewMode === 'statements' && (
                <div className="space-y-6">
                  {/* Period Filter */}
                  <div className="flex justify-between items-center bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                    <span className="text-xs text-slate-300 font-bold">
                      الفترة المالية: <strong className="text-amber-400 font-mono font-black">{closingFinancialsData[financialsPeriod].periodName}</strong>
                    </span>
                    <div className="flex gap-1 text-xs font-bold">
                      {(['2026_Q2', '2026_Q1', '2025_ANNUAL'] as const).map((period) => (
                        <button
                          key={period}
                          onClick={() => setFinancialsPeriod(period)}
                          className={`px-3 py-1.5 rounded-lg transition ${
                            financialsPeriod === period ? 'bg-indigo-900 text-amber-300 font-black shadow' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {period === '2026_Q2' ? 'الربع الثاني 2026' : period === '2026_Q1' ? 'الربع الأول 2026' : 'العام المالي 2025'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* KPI Financial Overview Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
                      <span className="text-xs text-slate-400 font-medium block">إجمالي قيمة المشاوير (GMV)</span>
                      <span className="text-2xl font-black text-white font-mono">{closingFinancialsData[financialsPeriod].gmv.toLocaleString()} ج.م</span>
                      <span className="text-[11px] text-emerald-400 font-bold block">↑ +24.8% نمو ربع سنوي</span>
                    </div>

                    <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
                      <span className="text-xs text-slate-400 font-medium block">إجمالي الإيرادات التشغيلية</span>
                      <span className="text-2xl font-black text-amber-400 font-mono">{closingFinancialsData[financialsPeriod].totalRevenue.toLocaleString()} ج.م</span>
                      <span className="text-[11px] text-slate-400 block">عمولات 10% + اشتراكات وفعاليات</span>
                    </div>

                    <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
                      <span className="text-xs text-slate-400 font-medium block">الأرباح التشغيلية (EBITDA)</span>
                      <span className="text-2xl font-black text-indigo-300 font-mono">{closingFinancialsData[financialsPeriod].ebitda.toLocaleString()} ج.م</span>
                      <span className="text-[11px] text-indigo-400 block font-bold">هامش أرباح تشغيلية 38.2%</span>
                    </div>

                    <div className="p-5 bg-slate-900/80 border border-emerald-500/40 rounded-2xl space-y-2 bg-gradient-to-br from-emerald-950/40 to-slate-900">
                      <span className="text-xs text-emerald-300 font-bold block">صافي الربح الصافي بعد الضرائب</span>
                      <span className="text-2xl font-black text-emerald-400 font-mono">{closingFinancialsData[financialsPeriod].netProfit.toLocaleString()} ج.م</span>
                      <span className="text-[11px] text-emerald-300 block font-bold">صافي هامش ربح 30% للمنظومة 🟢</span>
                    </div>
                  </div>

                  {/* Tables: P&L Statement & Balance Sheet */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Income Statement */}
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                        <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                          <PieChart className="w-5 h-5 text-amber-400" />
                          قائمة الدخل والأرباح والخسائر (P&L Statement)
                        </h3>
                        <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                          معتمدة محاسبياً
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="text-slate-400 font-bold text-[11px] uppercase tracking-wider text-emerald-400">الإيرادات (Gross Revenue):</div>
                        <div className="flex justify-between py-1.5 px-3 bg-slate-950 rounded-xl">
                          <span>• عمولات الرحلات (10% Take Rate)</span>
                          <strong className="font-mono text-emerald-400 font-bold">{closingFinancialsData[financialsPeriod].commissionRevenue.toLocaleString()} ج.م</strong>
                        </div>
                        <div className="flex justify-between py-1.5 px-3 bg-slate-950 rounded-xl">
                          <span>• اشتراكات الضمان المالي (AKHIL GUARANTEE)</span>
                          <strong className="font-mono text-emerald-400 font-bold">{closingFinancialsData[financialsPeriod].guaranteeRevenue.toLocaleString()} ج.م</strong>
                        </div>
                        <div className="flex justify-between py-1.5 px-3 bg-slate-950 rounded-xl">
                          <span>• عقود شراكات الفعاليات والمؤتمرات</span>
                          <strong className="font-mono text-emerald-400 font-bold">{closingFinancialsData[financialsPeriod].eventsRevenue.toLocaleString()} ج.م</strong>
                        </div>
                        <div className="flex justify-between py-2 px-3 bg-indigo-950/60 border border-indigo-500/30 rounded-xl font-bold text-white">
                          <span>إجمالي الإيرادات التشغيلية</span>
                          <span className="font-mono text-amber-300">{closingFinancialsData[financialsPeriod].totalRevenue.toLocaleString()} ج.م</span>
                        </div>

                        <div className="text-slate-400 font-bold text-[11px] uppercase tracking-wider text-rose-400 pt-2">المصروفات ومخصصات الجوائز (Operating Expenses):</div>
                        <div className="flex justify-between py-1.5 px-3 bg-slate-950 rounded-xl">
                          <span>• البنية التحتية السحابية وخرائط Google وبوابات الدفع</span>
                          <strong className="font-mono text-rose-400">({closingFinancialsData[financialsPeriod].techOpex.toLocaleString()} ج.م)</strong>
                        </div>
                        <div className="flex justify-between py-1.5 px-3 bg-slate-950 rounded-xl">
                          <span>• مخصصات حوافز الركاب والترحيب (200 ج + العروض)</span>
                          <strong className="font-mono text-rose-400">({closingFinancialsData[financialsPeriod].riderIncentives.toLocaleString()} ج.م)</strong>
                        </div>
                        <div className="flex justify-between py-1.5 px-3 bg-slate-950 rounded-xl">
                          <span>• مخصصات حوافز الكباتن وإهلاك جائزة السيارة السنوية (FREE CAR 👑)</span>
                          <strong className="font-mono text-rose-400">({closingFinancialsData[financialsPeriod].driverRewards.toLocaleString()} ج.م)</strong>
                        </div>
                        <div className="flex justify-between py-1.5 px-3 bg-slate-950 rounded-xl">
                          <span>• المصروفات الإدارية ورواتب الدعم الفني والعمليات</span>
                          <strong className="font-mono text-rose-400">({closingFinancialsData[financialsPeriod].adminSalaries.toLocaleString()} ج.م)</strong>
                        </div>

                        <div className="flex justify-between py-3 px-3.5 bg-emerald-950/80 border border-emerald-500/50 rounded-xl font-black text-sm text-white mt-3">
                          <span>صافي الأرباح الختامية (Net Profit)</span>
                          <span className="font-mono text-emerald-400">{closingFinancialsData[financialsPeriod].netProfit.toLocaleString()} ج.م</span>
                        </div>
                      </div>
                    </div>

                    {/* Balance Sheet */}
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                        <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                          <Wallet className="w-5 h-5 text-emerald-400" />
                          الميزانية العمومية والمركز المالي (Balance Sheet)
                        </h3>
                        <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                          سيولة ممتازة 🟢
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="text-slate-400 font-bold text-[11px] uppercase tracking-wider text-sky-400">الأصول المتداولة والسيولة (Current Assets):</div>
                        <div className="flex justify-between py-1.5 px-3 bg-slate-950 rounded-xl">
                          <span>• النقدية وأرصدة البنوك المحلية</span>
                          <strong className="font-mono text-white">{closingFinancialsData[financialsPeriod].cashInBank.toLocaleString()} ج.م</strong>
                        </div>
                        <div className="flex justify-between py-1.5 px-3 bg-slate-950 rounded-xl">
                          <span>• أرصدة محافظ InstaPay وفودافون كاش وميزة</span>
                          <strong className="font-mono text-white">{closingFinancialsData[financialsPeriod].instaPayWallets.toLocaleString()} ج.م</strong>
                        </div>
                        <div className="flex justify-between py-1.5 px-3 bg-slate-950 rounded-xl">
                          <span>• مديونيات الكاش المستحقة على الكباتن (ضمن حد 1000 ج)</span>
                          <strong className="font-mono text-amber-400 font-bold">{closingFinancialsData[financialsPeriod].receivablesDebt.toLocaleString()} ج.م</strong>
                        </div>
                        <div className="flex justify-between py-2 px-3 bg-slate-800/80 rounded-xl font-bold text-sky-300">
                          <span>إجمالي الأصول والسيولة</span>
                          <span className="font-mono">{(closingFinancialsData[financialsPeriod].cashInBank + closingFinancialsData[financialsPeriod].instaPayWallets + closingFinancialsData[financialsPeriod].receivablesDebt).toLocaleString()} ج.م</span>
                        </div>

                        <div className="text-slate-400 font-bold text-[11px] uppercase tracking-wider text-amber-400 pt-2">الالتزامات وحقوق الملكية (Liabilities & Equity):</div>
                        <div className="flex justify-between py-1.5 px-3 bg-slate-950 rounded-xl">
                          <span>• مستحقات الكباتن القابلة للسحب الفوري (InstaPay Payables)</span>
                          <strong className="font-mono text-amber-300 font-bold">{closingFinancialsData[financialsPeriod].driverPayables.toLocaleString()} ج.م</strong>
                        </div>
                        <div className="flex justify-between py-1.5 px-3 bg-slate-950 rounded-xl">
                          <span>• أمانات وأرصدة محافظ الركاب (Rider Wallet Balances)</span>
                          <strong className="font-mono text-amber-300 font-bold">{closingFinancialsData[financialsPeriod].riderDeposits.toLocaleString()} ج.م</strong>
                        </div>
                        <div className="flex justify-between py-1.5 px-3 bg-slate-950 rounded-xl">
                          <span>• حقوق الملكية وصافي رأس المال الاحتياطي المجمع</span>
                          <strong className="font-mono text-emerald-400 font-bold">{closingFinancialsData[financialsPeriod].equityReserve.toLocaleString()} ج.م</strong>
                        </div>

                        <div className="flex justify-between py-3 px-3.5 bg-indigo-950/80 border border-indigo-500/50 rounded-xl font-black text-sm text-white mt-3">
                          <span>إجمالي الخصوم وحقوق الملكية</span>
                          <span className="font-mono text-amber-400">{(closingFinancialsData[financialsPeriod].driverPayables + closingFinancialsData[financialsPeriod].riderDeposits + closingFinancialsData[financialsPeriod].equityReserve).toLocaleString()} ج.م</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-VIEW 2: STARTUP CAPITAL & INCORPORATION EXPENSES HUB */}
              {financialsViewMode === 'startup_capital' && (
                <div className="space-y-6">
                  {/* Header with Edit Button */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
                    <div>
                      <h3 className="font-black text-lg text-white flex items-center gap-2">
                        <span>🏛️</span> رأس المال والحسابات الافتتاحية ومصاريف التأسيس
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        توثيق رأس المال المصدر، مساهمات المؤسسين، ومصاريف ما قبل التشغيل ورسوم التراخيص القانونية
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setStartupForm({ ...startupAccounts });
                        setShowEditStartupModal(true);
                      }}
                      className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20"
                    >
                      <span>✏️</span> تعديل / إدخال بنود رأس المال والتأسيس
                    </button>
                  </div>

                  {/* Overview Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                      <span className="text-xs text-slate-400 font-medium block">رأس المال المصدر والمدفوع</span>
                      <span className="text-2xl font-black text-emerald-400 font-mono">{startupAccounts.paidInCapital.toLocaleString()} ج.م</span>
                      <span className="text-[11px] text-slate-400 block font-mono">المرخص به: {startupAccounts.authorizedCapital.toLocaleString()} ج.م</span>
                    </div>

                    <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                      <span className="text-xs text-slate-400 font-medium block">إجمالي مصاريف التأسيس والتجهيز</span>
                      <span className="text-2xl font-black text-amber-400 font-mono">{(startupAccounts.legalIncorporation + startupAccounts.techDevelopment + startupAccounts.initialMarketing + startupAccounts.officeSetup).toLocaleString()} ج.م</span>
                      <span className="text-[11px] text-amber-300 block font-bold">مصاريف مؤجلة (أصول غير ملموسة)</span>
                    </div>

                    <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                      <span className="text-xs text-slate-400 font-medium block">السيولة النقدية الافتتاحية بالبنوك</span>
                      <span className="text-2xl font-black text-sky-400 font-mono">{startupAccounts.cashOpeningBank.toLocaleString()} ج.م</span>
                      <span className="text-[11px] text-slate-400 block">حسابات جارية بنكية معتمدة</span>
                    </div>

                    <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                      <span className="text-xs text-slate-400 font-medium block">محافظ الدفع اللحظي الافتتاحية</span>
                      <span className="text-2xl font-black text-purple-400 font-mono">{startupAccounts.cashOpeningWallets.toLocaleString()} ج.م</span>
                      <span className="text-[11px] text-slate-400 block">InstaPay / Vodafone Cash / ميزة</span>
                    </div>
                  </div>

                  {/* Detailed Table of Startup & Incorporation Breakdown */}
                  <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h4 className="font-bold text-sm text-white border-b border-slate-800 pb-3">
                      كشف تفصيلي ببنود مصاريف التأسيس والحسابات الافتتاحية:
                    </h4>

                    <div className="space-y-3 text-xs">
                      {[
                        { name: '1. رسوم التأسيس القانوني، السجل التجاري، والبطاقة الضريبية والتراخيص الحكومية', amount: startupAccounts.legalIncorporation, cat: 'مصاريف قانونية ورسمية' },
                        { name: '2. تكاليف التطوير البرمجي وتجهيز السيرفرات السحابية والخرائط ومفاتيح الـ APIs', amount: startupAccounts.techDevelopment, cat: 'تطوير وبنية تحتية' },
                        { name: '3. حملة التسويق الافتتاحية وتصميم الهوية البصرية وتجهيز منصات التواصل', amount: startupAccounts.initialMarketing, cat: 'تسويق وإطلاق' },
                        { name: '4. تجهيزات المقر الرئيسي، شبكات الاتصال، أجهزة العمل، والدعم الفني', amount: startupAccounts.officeSetup, cat: 'أصول ثابتة وتجهيزات' },
                        { name: '5. رصيد النقدية الافتتاحي في الحسابات البنكية لتغطية العمليات الأولية', amount: startupAccounts.cashOpeningBank, cat: 'سيولة نقدية جارية' },
                        { name: '6. أرصدة محافظ الدفع اللحظي (InstaPay / فودافون كاش) لتسويات السحب', amount: startupAccounts.cashOpeningWallets, cat: 'محافظ إلكترونية' },
                      ].map((item, idx) => (
                        <div key={idx} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
                          <div>
                            <span className="font-bold text-slate-100 block">{item.name}</span>
                            <span className="text-[10px] text-slate-400">{item.cat}</span>
                          </div>
                          <span className="font-mono font-black text-emerald-400 text-sm">{item.amount.toLocaleString()} ج.م</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-VIEW 3: CHART OF ACCOUNTS (شجرة الحسابات) */}
              {financialsViewMode === 'chart_of_accounts' && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="font-black text-base text-white flex items-center gap-2">
                        <span>📑</span> دليل شجرة الحسابات المحاسبية الموحدة (Chart of Accounts - COA)
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">تصنيف الحسابات الخمسة الرئيسية: الأصول، الخصوم، حقوق الملكية، الإيرادات، والمصروفات</p>
                    </div>
                    <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-xl font-bold font-mono">
                      نظام القيد المزدوج
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                      <thead>
                        <tr className="text-slate-400 border-b border-slate-800 font-bold text-[11px]">
                          <th className="pb-3 px-4">رقم الحساب</th>
                          <th className="pb-3 px-4">اسم الحساب المحاسبي</th>
                          <th className="pb-3 px-4">النوع والتصنيف</th>
                          <th className="pb-3 px-4">طبيعة الحساب</th>
                          <th className="pb-3 px-4">الرصيد الدفتري الحالي</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-200">
                        {chartOfAccountsList.map((acc, idx) => (
                          <tr key={idx} className="hover:bg-slate-950/60 transition">
                            <td className="py-3 px-4 font-mono font-bold text-amber-400">{acc.code}</td>
                            <td className="py-3 px-4 font-bold text-white">{acc.name}</td>
                            <td className="py-3 px-4 text-slate-400">{acc.type}</td>
                            <td className="py-3 px-4 font-bold">
                              <span className={acc.nature === 'مدين' ? 'text-sky-400' : 'text-amber-400'}>
                                {acc.nature}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-mono font-black text-emerald-400">{acc.balance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB-VIEW 4: JOURNAL ENTRIES (قيود اليومية) */}
              {financialsViewMode === 'journal_entries' && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="font-black text-base text-white flex items-center gap-2">
                        <span>📝</span> سجل قيود اليومية العامة ودفتر الأستاذ (General Journal)
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">توثيق جميع العمليات المالية والتأسيسية بالقيد المزدوج المتزن</p>
                    </div>

                    <button
                      onClick={() => setShowAddJournalModal(true)}
                      className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition shadow"
                    >
                      <span>➕</span> تسجيل قيد محاسبي جديد
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                      <thead>
                        <tr className="text-slate-400 border-b border-slate-800 font-bold text-[11px]">
                          <th className="pb-3 px-3">رقم القيد</th>
                          <th className="pb-3 px-3">التاريخ</th>
                          <th className="pb-3 px-3">البيان والشرح</th>
                          <th className="pb-3 px-3">الطرف المدين (Debit)</th>
                          <th className="pb-3 px-3">الطرف الدائن (Credit)</th>
                          <th className="pb-3 px-3">المبلغ (ج.م)</th>
                          <th className="pb-3 px-3">رقم السند المرجعي</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-200">
                        {journalEntriesList.map((entry) => (
                          <tr key={entry.id} className="hover:bg-slate-950/60 transition">
                            <td className="py-3.5 px-3 font-mono font-bold text-amber-400">{entry.id}</td>
                            <td className="py-3.5 px-3 font-mono text-slate-400">{entry.date}</td>
                            <td className="py-3.5 px-3 font-semibold text-white">{entry.desc}</td>
                            <td className="py-3.5 px-3 font-mono text-sky-300">{entry.debitAcc}</td>
                            <td className="py-3.5 px-3 font-mono text-amber-300">{entry.creditAcc}</td>
                            <td className="py-3.5 px-3 font-mono font-black text-emerald-400">{entry.amount.toLocaleString()} ج.م</td>
                            <td className="py-3.5 px-3 text-slate-400 font-mono text-[11px]">{entry.ref}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB: MEDICAL TESTS & DRUG SCREENING (تحاليل المخدرات والفحص الطبي المعتمد) */}
          {activeTab === 'medical_tests' && (
            <div className="space-y-6">
              {/* Header & Controls */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-6 h-6 text-pink-400" />
                    <h2 className="font-extrabold text-xl text-white">سجل تحاليل المخدرات والفحص الطبي الدوري للكباتن 🧪</h2>
                  </div>
                  <p className="text-xs text-slate-400">
                    متابعة التحاليل المعتمدة (معامل البرج، المختبر، والمعامل المركزية) وصلاحيتها (تجديد كل 6 أشهر) لضمان أمان الرحلات 100%
                  </p>
                </div>

                {/* Filter Tabs & Add Action */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex gap-1 text-xs font-bold">
                    {(['all', 'valid', 'expired', 'pending'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setMedicalFilter(filter)}
                        className={`px-3 py-1.5 rounded-lg transition ${
                          medicalFilter === filter ? 'bg-indigo-900 text-amber-300 font-black shadow' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {filter === 'all' ? 'جميع الكباتن' : filter === 'valid' ? 'تحاليل سارية 🟢' : filter === 'expired' ? 'تحاليل منتهية ⚠️' : 'قيد الفحص ⏳'}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowAddMedicalModal(true)}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-lg shadow-pink-600/20"
                  >
                    <span>➕</span> تسجيل فحص طبي جديد 🧪
                  </button>
                </div>
              </div>

              {/* Compliance Statistics Banner */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">إجمالي الكباتن المسجلين</span>
                    <span className="text-xl font-black text-white font-mono block">142 كابتن</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg">👨🏻‍✈️</div>
                </div>

                <div className="p-4 bg-slate-900/80 border border-emerald-500/30 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">تحاليل سارية ومعتمدة</span>
                    <span className="text-xl font-black text-emerald-400 font-mono block">138 كابتن (97.2%)</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-lg">✅</div>
                </div>

                <div className="p-4 bg-slate-900/80 border border-rose-500/30 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">تحاليل منتهية (معلق تلقائياً)</span>
                    <span className="text-xl font-black text-rose-400 font-mono block">1 كابتن</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center text-lg">⚠️</div>
                </div>

                <div className="p-4 bg-slate-900/80 border border-amber-500/30 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">عينات قيد الفحص بالمعمل</span>
                    <span className="text-xl font-black text-amber-400 font-mono block">3 كباتن</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-lg">⏳</div>
                </div>
              </div>

              {/* Medical Screening Table */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-base text-white">جدول الامتثال الطبي وسجل تحاليل المخدرات:</h3>
                  <span className="text-xs text-slate-400">المعامل المعتمدة: البرج • المختبر • المعامل المركزية</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-800 font-bold text-[11px]">
                        <th className="pb-3 px-3">الكابتن والمركبة</th>
                        <th className="pb-3 px-3">المعمل المعتمد</th>
                        <th className="pb-3 px-3">نوع الفحص</th>
                        <th className="pb-3 px-3">تاريخ الفحص</th>
                        <th className="pb-3 px-3">تاريخ الانتهاء</th>
                        <th className="pb-3 px-3">نتيجة التحليل</th>
                        <th className="pb-3 px-3">الفيش الجنائي</th>
                        <th className="pb-3 px-3">حالة الحساب</th>
                        <th className="pb-3 px-3">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-200">
                      {medicalTestsList
                        .filter(item => {
                          if (medicalFilter === 'valid') return item.result === 'NEGATIVE' && item.status === 'ACTIVE';
                          if (medicalFilter === 'expired') return item.result === 'EXPIRED' || item.status === 'SUSPENDED';
                          if (medicalFilter === 'pending') return item.result === 'PENDING_LAB' || item.status === 'PENDING_REVIEW';
                          return true;
                        })
                        .map((item) => (
                          <tr key={item.id} className="hover:bg-slate-950/60 transition">
                            <td className="py-3.5 px-3">
                              <div className="font-bold text-white text-xs">{item.driverName}</div>
                              <div className="text-[10px] text-slate-400">{item.car} • {item.phone}</div>
                            </td>
                            <td className="py-3.5 px-3 font-semibold text-amber-300">{item.labName}</td>
                            <td className="py-3.5 px-3 text-slate-300">{item.testType}</td>
                            <td className="py-3.5 px-3 font-mono">{item.testDate}</td>
                            <td className="py-3.5 px-3 font-mono font-bold">
                              <span className={item.result === 'EXPIRED' ? 'text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded' : 'text-emerald-400'}>
                                {item.expiryDate}
                              </span>
                            </td>
                            <td className="py-3.5 px-3 font-bold">
                              {item.result === 'NEGATIVE' ? (
                                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-lg">
                                  سلبي (سليم 🟢)
                                </span>
                              ) : item.result === 'EXPIRED' ? (
                                <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-lg">
                                  منتهي الصلاحية ⚠️
                                </span>
                              ) : (
                                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-lg">
                                  قيد الفحص ⏳
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-3">
                              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                                خال من السوابق ✅
                              </span>
                            </td>
                            <td className="py-3.5 px-3 font-bold">
                              {item.status === 'ACTIVE' ? (
                                <span className="text-emerald-400 text-xs font-bold">مفعل 🟢</span>
                              ) : item.status === 'SUSPENDED' ? (
                                <span className="text-rose-400 text-xs font-bold">معلق مؤقتاً 🚫</span>
                              ) : (
                                <span className="text-amber-400 text-xs font-bold">بانتظار النتيجة ⏳</span>
                              )}
                            </td>
                            <td className="py-3.5 px-3">
                              <div className="flex gap-1.5">
                                {item.status !== 'ACTIVE' ? (
                                  <button
                                    onClick={() => handleApproveMedical(item.id)}
                                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[10px] transition"
                                  >
                                    اعتماد وتفعيل
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleSuspendMedical(item.id)}
                                    className="px-2.5 py-1 bg-rose-600/80 hover:bg-rose-600 text-white rounded-lg font-bold text-[10px] transition"
                                  >
                                    تعليق الفحص
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

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
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddPromoModal(true)}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black px-3.5 py-2 rounded-xl transition shadow-lg shadow-amber-500/20"
                  >
                    <span>➕</span> إنشاء كود خصم جديد 🎟️
                  </button>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-bold font-mono">
                    إجمالي التوفير: 41,965 ج.م
                  </span>
                </div>
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
                <button
                  onClick={() => setShowAddDriverModal(true)}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black px-3.5 py-2 rounded-xl transition shadow-lg shadow-amber-500/20"
                >
                  <span>➕</span> إضافة كابتن / برثونة جديد 👨🏻‍✈️
                </button>
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
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-lg text-white">إعدادات تسعير منظومة أخيل (AKHIL SERVICES & PRICING MASTER)</h2>
                  <p className="text-xs text-slate-400 mt-0.5">التحكم في مضاعفات التسعير للخدمات الـ 10، عمولة المنصة (10%)، وحدود المديونية</p>
                </div>
                <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-xl font-bold font-mono">
                  إصدار الماستر: v2.0.0
                </span>
              </div>

              {/* 10 Services Configuration Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: '1. AKHIL ECONOMY 🚗', key: 'economy', mult: '1.00x', desc: 'الخدمة الأساسية للانتقال اليومي', color: 'border-blue-500/40 text-blue-400' },
                  { name: '2. AKHIL PLUS 🚘', key: 'plus', mult: '1.10x', desc: 'سيارات أحدث ومستوى راحة أعلى', color: 'border-sky-500/40 text-sky-400' },
                  { name: '3. AKHIL BUSINESS 💼', key: 'business', mult: '1.20x', desc: 'خدمة رجال الأعمال المميزة', color: 'border-purple-500/40 text-purple-400' },
                  { name: '4. AKHIL PARTHONA 🌸', key: 'parthona', mult: '1.00x', desc: 'خدمة نسائية بسائقات معتمدات (بدون زيادة)', color: 'border-pink-500/40 text-pink-400' },
                  { name: '5. AKHIL TIME ⏱️', key: 'time', mult: 'ONE/ROUTINE/CONTRACT', desc: 'رحلات مجدولة (خصم التعاقد حتى 20%)', color: 'border-indigo-500/40 text-indigo-400' },
                  { name: '6. AKHIL EXTRA ➕', key: 'extra', mult: '+50% .. +100%', desc: 'نقل ركاب إضافيين (+50% لشخص أو شخصين)', color: 'border-orange-500/40 text-orange-400' },
                  { name: '7. AKHIL CARRY 📦', key: 'carry', mult: '2.00x', desc: 'حمولة كبيرة (المجاني: شنطة كبيرة + صغيرة)', color: 'border-amber-500/40 text-amber-400' },
                  { name: '8. AKHIL BOX 📫', key: 'box', mult: '1.00x', desc: 'نقل طرود ومستندات دون راكب بكود OTP', color: 'border-cyan-500/40 text-cyan-400' },
                  { name: '9. AKHIL TRIP 🛣️', key: 'trip', mult: 'سفر محافظات', desc: 'استراحة 15د مجاناً/100كم و3ج/د توقف', color: 'border-emerald-500/40 text-emerald-400' },
                  { name: '10. PARTNER OF EVENTS 🎪', key: 'events', mult: 'تعاقدي مخصص', desc: 'تنظيم أسطول نقل الفعاليات والمؤتمرات', color: 'border-rose-500/40 text-rose-400' },
                ].map((s, idx) => (
                  <div key={idx} className={`p-4 bg-slate-950 rounded-2xl border ${s.color} space-y-2`}>
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-xs text-white">{s.name}</h4>
                      <span className="text-[11px] font-mono font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-amber-300">{s.mult}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{s.desc}</p>
                  </div>
                ))}
              </div>

              {/* Commission & Operating Modes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Zap className="w-5 h-5" />
                    <h3>أخيل فليكس — AKHIL FLEX (عمولة مرنة متناقصة)</h3>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1.5 font-medium">نسبة العمولة الأساسية (تبدأ من 10%)</label>
                    <input type="number" defaultValue="10" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-sm font-mono font-bold" />
                  </div>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <ShieldCheck className="w-5 h-5" />
                    <h3>أخيل ضمان — AKHIL GUARANTEE (الضمان المالي الشهري)</h3>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1.5 font-medium">قيمة الضمان الشهري للكابتن (ج.م)</label>
                    <input type="number" defaultValue="15000" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-sm font-mono font-bold" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MODAL 1: ADD NEW DRIVER / PARTHONA */}
        {showAddDriverModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                  <span>👨🏻‍✈️</span> إضافة وتسجيل كابتن / برثونة جديد
                </h3>
                <button
                  onClick={() => setShowAddDriverModal(false)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateDriver} className="space-y-3.5 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">اسم الكابتن بالكامل:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: يوسف إبراهيم الشناوي"
                    value={newDriver.name}
                    onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">رقم الهاتف:</label>
                    <input
                      type="text"
                      required
                      placeholder="+201012345678"
                      value={newDriver.phone}
                      onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">نوع الخدمة / الفئة:</label>
                    <select
                      value={newDriver.category}
                      onChange={(e) => setNewDriver({ ...newDriver, category: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                    >
                      <option value="ECONOMY">AKHIL ECONOMY (اقتصادي)</option>
                      <option value="PLUS">AKHIL PLUS (بلس)</option>
                      <option value="BUSINESS">AKHIL BUSINESS (أعمال)</option>
                      <option value="PARTHONA">AKHIL PARTHONA (برثونة 🌸)</option>
                      <option value="BOX">AKHIL BOX (توصيل طرود 📫)</option>
                      <option value="SCOOTER">AKHIL SCOOTER (سكوتر)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">طراز وسنة المركبة:</label>
                    <input
                      type="text"
                      placeholder="مثال: كيا سيراتو 2023"
                      value={newDriver.car}
                      onChange={(e) => setNewDriver({ ...newDriver, car: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">رقم اللوحات المعدنية:</label>
                    <input
                      type="text"
                      placeholder="مثال: أ ب ج 1234"
                      value={newDriver.plate}
                      onChange={(e) => setNewDriver({ ...newDriver, plate: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition shadow"
                  >
                    حفظ وإضافة الكابتن فوراً 🟢
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddDriverModal(false)}
                    className="py-2.5 px-4 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: ADD MEDICAL / DRUG TEST RECORD */}
        {showAddMedicalModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                  <span>🧪</span> تسجيل نتيجة فحص طبي وتحليل مخدرات
                </h3>
                <button
                  onClick={() => setShowAddMedicalModal(false)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateMedical} className="space-y-3.5 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">اسم الكابتن:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: محمود السيد"
                    value={newMedical.driverName}
                    onChange={(e) => setNewMedical({ ...newMedical, driverName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">المعمل المعتمد:</label>
                    <select
                      value={newMedical.labName}
                      onChange={(e) => setNewMedical({ ...newMedical, labName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                    >
                      <option value="معامل البرج (Al-Borg Lab)">معامل البرج (Al-Borg Lab)</option>
                      <option value="معامل المختبر (Al-Mokhtabar)">معامل المختبر (Al-Mokhtabar)</option>
                      <option value="المعامل المركزية لوزارة الصحة">المعامل المركزية لوزارة الصحة</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">نتيجة التحليل:</label>
                    <select
                      value={newMedical.result}
                      onChange={(e) => setNewMedical({ ...newMedical, result: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                    >
                      <option value="NEGATIVE">سلبي (سليم وخالٍ من السموم 🟢)</option>
                      <option value="PENDING_LAB">قيد الفحص المعملي ⏳</option>
                      <option value="EXPIRED">منتهي الصلاحية ⚠️</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">تاريخ الفحص:</label>
                    <input
                      type="text"
                      value={newMedical.testDate}
                      onChange={(e) => setNewMedical({ ...newMedical, testDate: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">تاريخ انتهاء الصلاحية (6 أشهر):</label>
                    <input
                      type="text"
                      value={newMedical.expiryDate}
                      onChange={(e) => setNewMedical({ ...newMedical, expiryDate: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl transition shadow"
                  >
                    حفظ وتوثيق التحليل في السجل 🟢
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddMedicalModal(false)}
                    className="py-2.5 px-4 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 3: ADD NEW PROMO CODE */}
        {showAddPromoModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                  <span>🎟️</span> إنشاء وتفعيل كود خصم جديد (Promo Code)
                </h3>
                <button
                  onClick={() => setShowAddPromoModal(false)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreatePromo} className="space-y-3.5 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">رمز كود الخصم (Promo Code):</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: CAIRO2026 أو EID30"
                    value={newPromo.code}
                    onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono uppercase font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">نوع الخصم:</label>
                    <select
                      value={newPromo.type}
                      onChange={(e) => setNewPromo({ ...newPromo, type: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                    >
                      <option value="نسبة مئوية (50%)">نسبة مئوية (50%)</option>
                      <option value="نسبة مئوية (30%)">نسبة مئوية (30%)</option>
                      <option value="نسبة مئوية (20%)">نسبة مئوية (20%)</option>
                      <option value="مبلغ ثابت (25 ج.م)">مبلغ ثابت (25 ج.م)</option>
                      <option value="مبلغ ثابت (50 ج.م)">مبلغ ثابت (50 ج.م)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">الحد الأقصى للتوفير:</label>
                    <input
                      type="text"
                      value={newPromo.maxDiscount}
                      onChange={(e) => setNewPromo({ ...newPromo, maxDiscount: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">الجمهور المستهدف:</label>
                  <input
                    type="text"
                    value={newPromo.target}
                    onChange={(e) => setNewPromo({ ...newPromo, target: e.target.value })}
                    placeholder="مثال: ركاب أول مشوار / منطقة الجامعات"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition shadow"
                  >
                    تفعيل كود الخصم فوراً للركاب 🎟️🟢
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddPromoModal(false)}
                    className="py-2.5 px-4 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 4: EDIT STARTUP CAPITAL & INCORPORATION EXPENSES */}
        {showEditStartupModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-2xl w-full space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                  <span>🏛️</span> تعديل وإدخال بيانات رأس المال ومصاريف التأسيس
                </h3>
                <button
                  onClick={() => setShowEditStartupModal(false)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleUpdateStartupSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">رأس المال المرخص به (ج.م):</label>
                    <input
                      type="number"
                      required
                      value={startupForm.authorizedCapital}
                      onChange={(e) => setStartupForm({ ...startupForm, authorizedCapital: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">رأس المال المصدر والمدفوع (ج.م):</label>
                    <input
                      type="number"
                      required
                      value={startupForm.paidInCapital}
                      onChange={(e) => setStartupForm({ ...startupForm, paidInCapital: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-emerald-400 font-mono font-black"
                    />
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-3">
                  <span className="text-xs font-bold text-amber-400 block mb-2">بنود مصاريف التأسيس والتجهيز (ما قبل التشغيل):</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 font-medium block mb-1">رسوم التأسيس القانوني والتراخيص الحكومية:</label>
                      <input
                        type="number"
                        value={startupForm.legalIncorporation}
                        onChange={(e) => setStartupForm({ ...startupForm, legalIncorporation: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-medium block mb-1">تطوير المنصة والسيرفرات والخرائط:</label>
                      <input
                        type="number"
                        value={startupForm.techDevelopment}
                        onChange={(e) => setStartupForm({ ...startupForm, techDevelopment: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-medium block mb-1">حملة التسويق الافتتاحية والهوية:</label>
                      <input
                        type="number"
                        value={startupForm.initialMarketing}
                        onChange={(e) => setStartupForm({ ...startupForm, initialMarketing: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-medium block mb-1">تجهيزات المقر والأجهزة والشبكات:</label>
                      <input
                        type="number"
                        value={startupForm.officeSetup}
                        onChange={(e) => setStartupForm({ ...startupForm, officeSetup: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-3">
                  <span className="text-xs font-bold text-sky-400 block mb-2">الأرصدة النقدية الافتتاحية:</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 font-medium block mb-1">النقدية الافتتاحية بالحسابات البنكية:</label>
                      <input
                        type="number"
                        value={startupForm.cashOpeningBank}
                        onChange={(e) => setStartupForm({ ...startupForm, cashOpeningBank: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-medium block mb-1">محافظ الدفع اللحظي (InstaPay / فودافون كاش):</label>
                      <input
                        type="number"
                        value={startupForm.cashOpeningWallets}
                        onChange={(e) => setStartupForm({ ...startupForm, cashOpeningWallets: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition shadow-lg shadow-amber-500/20"
                  >
                    حفظ وتحديث الأرقام المحاسبية فوراً 🟢
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditStartupModal(false)}
                    className="py-3 px-5 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 5: ADD MANUAL JOURNAL ENTRY */}
        {showAddJournalModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                  <span>📝</span> تسجيل قيد يومية محاسبي (Journal Entry)
                </h3>
                <button
                  onClick={() => setShowAddJournalModal(false)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateJournalSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">البيان / شرح العملية المالية:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: سداد اشتراك السيرفرات السحابية لشهر أغسطس"
                    value={newJournal.desc}
                    onChange={(e) => setNewJournal({ ...newJournal, desc: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">الطرف المدين (Debit):</label>
                    <select
                      value={newJournal.debitAcc}
                      onChange={(e) => setNewJournal({ ...newJournal, debitAcc: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                    >
                      <option value="1010 النقدية بالبنوك">1010 النقدية بالبنوك</option>
                      <option value="1020 محافظ الدفع اللحظي">1020 محافظ الدفع اللحظي</option>
                      <option value="1030 مديونيات الكباتن">1030 مديونيات الكباتن</option>
                      <option value="1040 مصاريف التأسيس والتراخيص">1040 مصاريف التأسيس والتراخيص</option>
                      <option value="5010 مصاريف السيرفرات والتقنية">5010 مصاريف السيرفرات والتقنية</option>
                      <option value="5020 مصاريف الحوافز والترحيب">5020 مصاريف الحوافز والترحيب</option>
                      <option value="5040 المصروفات الإدارية">5040 المصروفات الإدارية</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">الطرف الدائن (Credit):</label>
                    <select
                      value={newJournal.creditAcc}
                      onChange={(e) => setNewJournal({ ...newJournal, creditAcc: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                    >
                      <option value="3010 رأس المال المدفوع">3010 رأس المال المدفوع</option>
                      <option value="1010 النقدية بالبنوك">1010 النقدية بالبنوك</option>
                      <option value="1020 محافظ الدفع اللحظي">1020 محافظ الدفع اللحظي</option>
                      <option value="2010 مستحقات الكباتن">2010 مستحقات الكباتن</option>
                      <option value="2020 أمانات محافظ الركاب">2020 أمانات محافظ الركاب</option>
                      <option value="4010 إيرادات عمولات الرحلات">4010 إيرادات عمولات الرحلات</option>
                      <option value="4020 إيرادات الضمان المالي">4020 إيرادات الضمان المالي</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">المبلغ (ج.م):</label>
                    <input
                      type="number"
                      required
                      value={newJournal.amount}
                      onChange={(e) => setNewJournal({ ...newJournal, amount: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-emerald-400 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">رقم السند المرجعي:</label>
                    <input
                      type="text"
                      placeholder="مثال: فاتورة #492"
                      value={newJournal.ref}
                      onChange={(e) => setNewJournal({ ...newJournal, ref: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition shadow"
                  >
                    ترحيل القيد لدفتر الأستاذ 🟢
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddJournalModal(false)}
                    className="py-2.5 px-4 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
