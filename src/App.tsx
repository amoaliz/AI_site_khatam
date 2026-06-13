import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Laptop, 
  Settings, 
  Search, 
  Cpu, 
  Globe, 
  BrainCircuit, 
  Smartphone, 
  Cloud, 
  Shield, 
  RefreshCw,
  Plus, 
  ArrowUpRight, 
  Calendar, 
  Briefcase, 
  Award, 
  Users, 
  Coins, 
  ChevronDown, 
  MessageSquare,
  Building2,
  MapPin,
  Mail,
  Phone,
  Send,
  ExternalLink,
  Github,
  Linkedin,
  HelpCircle,
  Clock,
  Sparkles,
  ChevronLeft
} from 'lucide-react';

import { Project, Profile, Milestone, Executive, FAQItem, CategoryKey } from './types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_PROFILE, 
  CATEGORIES, 
  INITIAL_MILESTONES, 
  INITIAL_EXECUTIVES, 
  INITIAL_FAQS 
} from './data';

import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import AdminPanel from './components/AdminPanel';
import InteractiveHeroGraphic from './components/InteractiveHeroGraphic';
import DistributedSystemLab from './components/DistributedSystemLab';
import TechGridBackground from './components/TechGridBackground';

export default function App() {
  // Primary persistent states
  const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [milestones, setMilestones] = useState<Milestone[]>(INITIAL_MILESTONES);
  const [executives, setExecutives] = useState<Executive[]>(INITIAL_EXECUTIVES);
  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);

  // Filter & interaction states
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Custom navigation menu anchors
  const [activeSection, setActiveSection] = useState('hero');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // FAQ Accordion toggles
  const [openFaqId, setOpenFaqId] = useState<string | null>('f-1');

  // Step-by-Step Quote Configurator States
  const [quoteStep, setQuoteStep] = useState(1);
  const [quoteSector, setQuoteSector] = useState('ai');
  const [quoteComplexity, setQuoteComplexity] = useState('medium');
  const [quoteSla, setQuoteSla] = useState('gold');
  const [quoteDescription, setQuoteDescription] = useState('');
  const [quoteContact, setQuoteContact] = useState('');
  const [estimatedCost, setEstimatedCost] = useState({ min: 80, max: 130 });

  // Load from LocalStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('tech_holding_profile');
    const savedProjects = localStorage.getItem('tech_holding_projects');
    const savedMilestones = localStorage.getItem('tech_holding_milestones');
    const savedExecutives = localStorage.getItem('tech_holding_executives');
    const savedFaqs = localStorage.getItem('tech_holding_faqs');

    if (savedProfile) try { setProfile(JSON.parse(savedProfile)); } catch(e) {}
    if (savedProjects) try { setProjects(JSON.parse(savedProjects)); } catch(e) {}
    if (savedMilestones) try { setMilestones(JSON.parse(savedMilestones)); } catch(e) {}
    if (savedExecutives) try { setExecutives(JSON.parse(savedExecutives)); } catch(e) {}
    if (savedFaqs) try { setFaqs(JSON.parse(savedFaqs)); } catch(e) {}
  }, []);

  // Sync to local storage on manual update
  const handleSaveProfile = (newProfile: Profile) => {
    setProfile(newProfile);
    localStorage.setItem('tech_holding_profile', JSON.stringify(newProfile));
  };

  const handleSaveProject = (updatedProject: Project) => {
    let nextList = [...projects];
    const index = nextList.findIndex(p => p.id === updatedProject.id);
    if (index > -1) {
      nextList[index] = updatedProject;
    } else {
      nextList.push(updatedProject);
    }
    setProjects(nextList);
    localStorage.setItem('tech_holding_projects', JSON.stringify(nextList));
  };

  const handleDeleteProject = (projectId: string) => {
    const filtered = projects.filter(p => p.id !== projectId);
    setProjects(filtered);
    localStorage.setItem('tech_holding_projects', JSON.stringify(filtered));
  };

  const handleResetToDefaults = () => {
    setProfile(INITIAL_PROFILE);
    setProjects(INITIAL_PROJECTS);
    setMilestones(INITIAL_MILESTONES);
    setExecutives(INITIAL_EXECUTIVES);
    setFaqs(INITIAL_FAQS);
    localStorage.removeItem('tech_holding_profile');
    localStorage.removeItem('tech_holding_projects');
    localStorage.removeItem('tech_holding_milestones');
    localStorage.removeItem('tech_holding_executives');
    localStorage.removeItem('tech_holding_faqs');
    alert('تمام اطلاعات پورتفولیو و مایلستون‌های هلدینگ با موفقیت بازنشانی گردید.');
  };

  // Recalculate Quote Estimation on changes
  useEffect(() => {
    let baseMin = 40;
    let baseMax = 70;

    // sector multiplier
    if (quoteSector === 'ai') { baseMin += 50; baseMax += 90; }
    else if (quoteSector === 'cloud') { baseMin += 60; baseMax += 110; }
    else if (quoteSector === 'cybersecurity') { baseMin += 40; baseMax += 80; }
    else if (quoteSector === 'mobile') { baseMin += 30; baseMax += 60; }

    // complexity multiplier
    if (quoteComplexity === 'hard') { baseMin *= 1.8; baseMax *= 2; }
    else if (quoteComplexity === 'medium') { baseMin *= 1.3; baseMax *= 1.4; }

    // SLA multiplier
    if (quoteSla === 'gold') { baseMin += 25; baseMax += 40; }
    else if (quoteSla === 'silver') { baseMin += 10; baseMax += 20; }

    setEstimatedCost({
      min: Math.round(baseMin),
      max: Math.round(baseMax)
    });
  }, [quoteSector, quoteComplexity, quoteSla]);

  // Handle quote submit -> Format WhatsApp/Telegram messenger message
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sectorName = quoteSector === 'ai' ? 'هوش مصنوعی و کلان داده' :
                       quoteSector === 'cloud' ? 'زیرساخت ابری و مهاجرت دیتاسنتر' :
                       quoteSector === 'cybersecurity' ? 'امنیت و بهینه‌سازی نفوذ' :
                       quoteSector === 'mobile' ? 'سوپراپلیکیشن موبایل بومی' : 'سامانه تجاری تحت وب';

    const complexityLabel = quoteComplexity === 'hard' ? 'پیشرفته و چالش برانگیز ملی' :
                             quoteComplexity === 'medium' ? 'متوسط و یکپارچه‌سازی متداول' : 'مقدماتی / سریع الاثر';

    const SLAlabel = quoteSla === 'gold' ? 'پشتیبانی ۲۴/۷ با پایداری ۹۹.۹ درصد' :
                     quoteSla === 'silver' ? 'پشتیبانی اداری همراه با تضمین بازپرداخت جریمه' : 'پشتیبانی تیکتینگ استاندارد';

    const message = `سلام هلدینگ آریا پایتخت، 
من یک درخواست برآورد سرمایه‌گذاری خطرپذیر / ثبت سفارش از ابزار هوشمند سایت شما ایجاد کردم:
- بخش مربوطه: ${sectorName}
- پیچیدگی فنی: ${complexityLabel}
- سطح تفاهم‌نامه پشتیبانی: ${SLAlabel}
- مخاطب مسئول تماس من: ${quoteContact}
- شرح مختصر: ${quoteDescription}
- تخمین اولیه پیش‌فاکتور سایت شما: ${estimatedCost.min} الی ${estimatedCost.max} میلیون تومان.

خواهشمند است جهت برپایی جلسه توجیهی زودهنگام با من تماس حاصل کیند.`;

    const encodedText = encodeURIComponent(message);
    const targetUrl = profile.telegramUrl && profile.telegramUrl.includes('t.me/') 
      ? `${profile.telegramUrl}?text=${encodedText}`
      : `https://wa.me/${profile.phone?.replace(/[^0-9]/g, '') || '982188775533'}?text=${encodedText}`;

    window.open(targetUrl, '_blank');
  };

  // Searching & Category filtering logic
  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = q === '' || 
      p.title.toLowerCase().includes(q) ||
      p.slogan.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.technologies.some(t => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  // Sort: Featured on top
  const sortedProjects = [...filteredProjects].sort((a, b) => (a.featured && !b.featured) ? -1 : (!a.featured && b.featured) ? 1 : 0);

  // Dynamic Icon selector
  const getCategoryIcon = (key: string) => {
    switch (key) {
      case 'all': return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'web': return <Globe className="w-5 h-5 text-blue-300" />;
      case 'ai': return <BrainCircuit className="w-5 h-5 text-emerald-400" />;
      case 'mobile': return <Smartphone className="w-5 h-5 text-sky-400" />;
      case 'cloud': return <Cloud className="w-5 h-5 text-blue-400" />;
      case 'cybersecurity': return <Shield className="w-5 h-5 text-rose-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col tech-grid-subtle ambient-mesh-glow font-sans selection:bg-blue-500/30 selection:text-white text-right relative" style={{ direction: 'rtl' }}>
      
      {/* Dynamic Animated Tech Backdrops */}
      <TechGridBackground />
      
      {/* Decorative premium floating ambient light orbs in the far background */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none select-none animate-pulse-slow" />
      <div className="absolute top-[1200px] left-5 w-80 h-80 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none select-none animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[2400px] right-20 w-[450px] h-[450px] rounded-full bg-indigo-500/4 blur-[130px] pointer-events-none select-none animate-pulse-slow" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-40 left-12 w-96 h-96 rounded-full bg-emerald-500/3 blur-[110px] pointer-events-none select-none animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      {/* Dynamic Top Header border */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 z-50 shadow-sm" />

      {/* Global Transparent Sticky Navigation Header */}
      <nav className="sticky top-0 z-40 glass-panel border-b border-white/5 backdrop-blur-md px-4 md:px-8 py-3.5 flex items-center justify-between bg-slate-950/75" id="nav-header">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          
          {/* Logo & Slogan Header area */}
          <div className="flex items-center gap-3">
            <div className="relative p-2.5 rounded-xl bg-blue-950/40 text-blue-400 border border-blue-500/20 shadow-sm">
              <Building2 className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping" />
            </div>
            <div>
              <span className="text-sm font-black text-white hover:text-blue-400 transition-colors block">
                {profile.holdingName.split(' و ')[0] || 'گروه شرکت‌های همکار آریا'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider block">ENTERPRISE TECH HOLDING GROUP</span>
            </div>
          </div>

          {/* Center Links - desktop only for premium site index look */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-slate-350 font-medium font-sans">
            <a href="#about" className="hover:text-blue-400 transition-colors">درباره ما</a>
            <a href="#services" className="hover:text-blue-400 transition-colors">حوزه‌های تخصصی</a>
            <a href="#showcase" className="hover:text-blue-400 transition-colors">پروژه‌ها و صنایع اقماری</a>
            <a href="#timeline" className="hover:text-blue-400 transition-colors">سیر پیشرفت</a>
            <a href="#directors" className="hover:text-blue-400 transition-colors">اعضای راهبری</a>
            <a href="#partnership" className="hover:text-blue-400 transition-colors">پیش‌فاکتور هوشمند</a>
            <a href="#faq" className="hover:text-blue-400 transition-colors">پرسش و پاسخ علمی</a>
          </div>

          {/* Admin panel launcher button */}
          <div className="flex items-center">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-350 hover:bg-blue-500/20 hover:text-blue-300 hover:border-blue-500/30 transition-all text-xs font-semibold cursor-pointer"
              title="دسترسی به پنل پیکربندی"
            >
              <Settings className="w-3.5 h-3.5 text-blue-400" />
              <span>پنل ویرایش دمو</span>
            </button>
          </div>

        </div>
      </nav>

      {/* COMPREHENSIVE LANDING Hero Section */}
      <header className="relative py-16 lg:py-24 overflow-hidden border-b border-white/5 bg-slate-950/20 backdrop-blur-md">
        
        {/* Soft watercolor glows */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/[0.04] rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-cyan-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none select-none opacity-[0.08]" 
              style={{ backgroundImage: 'radial-gradient(rgba(6, 182, 212, 0.25) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Column (RTL reverse leads this to display on the visual left in desktops): Interactive Constellation Live Dashboard */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 flex items-center justify-center"
          >
            <InteractiveHeroGraphic />
          </motion.div>

          {/* Right Column: Key Branding, Text & Call to Action Buttons */}
          <div className="w-full lg:w-1/2 text-right space-y-6">
            
            {/* Active holding badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/25 select-none shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>جذب و راهبری خطرپذیر طرح‌های استراتژیک هوش مصنوعی و کلان‌بستر ابری</span>
            </motion.div>

            {/* Heading title */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight"
              >
                به هلدینگ فناوری <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 font-extrabold">{profile.holdingName}</span> خوش آمدید
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xs md:text-sm text-slate-350 font-medium tracking-wide leading-relaxed"
              >
                {profile.holdingSlogan}
              </motion.p>
            </div>

            {/* Description biography */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xs md:text-[13px] text-slate-300 leading-relaxed font-light text-justify ml-0 lg:ml-8"
            >
              {profile.bio}
            </motion.p>

            {/* Fast Call actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <a
                href="#partnership"
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] md:text-xs font-bold transition-all shadow-md shadow-blue-500/10 scale-100 hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center gap-1.5"
              >
                <span>تعریف پروژه جدید و برآورد هوشمند</span>
                <ChevronLeft className="w-4 h-4 shrink-0 text-blue-200" />
              </a>

              <a
                href="#showcase"
                className="px-4.5 py-3 rounded-xl bg-slate-900 border border-white/5 hover:bg-slate-800 text-slate-400 text-[11px] md:text-xs font-semibold transition-all cursor-pointer"
              >
                <span>کاتالوگ پروژه‌ها و شرکت‌ها</span>
              </a>
            </motion.div>

          </div>

        </div>

        {/* Major corporate indicators stats dashboard inside Hero space container */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-14 font-sans">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-white/5"
          >
            {/* Stat Card 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 25px -10px rgba(6,182,212,0.15)" }}
              transition={{ type: "spring", stiffness: 350, damping: 20, delay: 0.5 }}
              className="glass-accent-card laser-glow-card rounded-2xl p-5 hover:border-cyan-500/30 transition-all text-center bg-slate-950/40 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-450 flex items-center justify-center mx-auto mb-3 border border-cyan-500/25">
                <Users className="w-4.5 h-4.5" />
              </div>
              <span className="text-[11px] text-slate-400 block font-medium">سرمایه انسانی تخصصی</span>
              <span className="text-lg font-black text-white mt-1 block font-mono">+{profile.staffCount} مهندس</span>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 25px -10px rgba(245,158,11,0.15)" }}
              transition={{ type: "spring", stiffness: 350, damping: 20, delay: 0.58 }}
              className="glass-accent-card laser-glow-card rounded-2xl p-5 hover:border-amber-500/30 transition-all text-center bg-slate-950/40 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-450 flex items-center justify-center mx-auto mb-3 border border-amber-500/25">
                <Coins className="w-4.5 h-4.5" />
              </div>
              <span className="text-[11px] text-slate-400 block font-medium">سرمایه‌گذاری خطرپذیر</span>
              <span className="text-lg font-black text-white mt-1 block font-mono">{profile.investedCapitalAmount}</span>
            </motion.div>

            {/* Stat Card 3 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 25px -10px rgba(168,85,247,0.15)" }}
              transition={{ type: "spring", stiffness: 350, damping: 20, delay: 0.66 }}
              className="glass-accent-card laser-glow-card rounded-2xl p-5 hover:border-purple-500/30 transition-all text-center bg-slate-950/40 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-3 border border-purple-500/25">
                <Laptop className="w-4.5 h-4.5" />
              </div>
              <span className="text-[11px] text-slate-400 block font-medium">پروژه‌های اقماری فعال</span>
              <span className="text-lg font-black text-white mt-1 block font-mono">+{profile.completedProjectsCount} سامانه</span>
            </motion.div>

            {/* Stat Card 4 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 25px -10px rgba(16,185,129,0.15)" }}
              transition={{ type: "spring", stiffness: 350, damping: 20, delay: 0.74 }}
              className="glass-accent-card laser-glow-card rounded-2xl p-5 hover:border-emerald-500/30 transition-all text-center bg-slate-950/40 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-450 flex items-center justify-center mx-auto mb-3 border border-emerald-500/25">
                <Award className="w-4.5 h-4.5" />
              </div>
              <span className="text-[11px] text-slate-400 block font-medium">تجربه تجمعی مدیران</span>
              <span className="text-lg font-black text-white mt-1 block font-mono">+{profile.experienceYears} سال راهبری</span>
            </motion.div>
          </motion.div>
        </div>


      </header>

      {/* SECTION 1: ABOUT THE HOLDING (درباره هلدینگ و گروه همکار) */}
      <section id="about" className="py-20 max-w-5xl mx-auto w-full px-4 md:px-6 space-y-12 animate-float">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-black text-blue-400 tracking-widest uppercase">فلسفه بنیادین و چشم‌انداز هلدینگ</h2>
          <h3 className="text-2xl md:text-3xl font-bold text-white text-gradient">زیرساخت قوی ثبات‌دهنده کسب‌وکار است</h3>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Text block */}
          <div className="space-y-6 text-justify">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              تعالی فناوری در جهت توسعه ارزش‌های پایدار
            </h4>
            <p className="text-xs text-slate-350 leading-relaxed font-light">
              آریا پایتخت صرفا یک شتاب‌دهنده یا مجری نرم‌افزار ساده نیست؛ ما یک شریک و حامی استراتژیک برای سازمان‌هایی هستیم که به بقا در دوران رقابت دیجیتال می‌اندیشند. پروژه‌های تحویلی هلدینگ ما بر مبنای جدیدترین فریمورک‌های معماری با سربار سخت‌افزاری حداقلی و پایداری در تراکنش‌های پرحجم طراحی می‌شوند.
            </p>
            <p className="text-xs text-slate-350 leading-relaxed font-light">
              با تکیه بر اصول مدیریت دانش‌بنیان، ما چرخه‌ی کاملی از نیازهای فنی کارفرمایان را از تدارک ساختار ابری امن تا پیاده‌سازی متدهای پایش بلادرنگ با هوش مصنوعی و امنیت شبکه برآورده می‌سازیم.
            </p>
            
            {/* Highlight quote */}
            <div className="border-r-4 border-blue-500 bg-blue-950/30 p-4 rounded-l-xl text-xs text-slate-300 font-medium leading-relaxed">
              "پروژه‌های ما با در نظر گرفتن سناریوهای مگابایت بالا در سیستم‌های پردازش کلان همواره پاسخگوی خیل مراجعین مشتریان است."
            </div>
          </div>

          {/* Visual card mockup */}
          <div className="relative p-6 glass-accent-card laser-glow-card rounded-2xl space-y-6 bg-slate-950/40">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent" />
            
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-xs text-slate-300 font-bold block">مولفه‌های حاکمیتی هلدینگ</span>
              <span className="text-[10px] font-mono text-blue-400 bg-blue-950/45 border border-blue-500/30 px-2 py-0.5 rounded font-semibold">STANDARDS v4</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0 animate-ping" />
                <div>
                  <h5 className="text-xs font-bold text-white">پایداری تراکنش بالا (Scalability)</h5>
                  <p className="text-[10px] text-slate-450 mt-1 leading-relaxed">تضمین پایداری فرانت و بک‌اند در لایه‌های توزیع داده Timescale و PostgreSQL.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-white">امنیت زیست‌محیطی وب‌سایت‌ها (SLA)</h5>
                  <p className="text-[10px] text-slate-450 mt-1 leading-relaxed">مانیتورینگ فعال پکت‌ها و شناسایی حملات سایبری در زمان واقعی.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-white">سرمایه‌گذاری حمایتی صندوق (VC)</h5>
                  <p className="text-[10px] text-slate-450 mt-1 leading-relaxed">شتاب‌دهی بر لبه دستاوردهای ژنتیکی، داده‌محور و سامانه‌های ابری وب.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: CORE FIELDS OF ACTION / SERVICES */}
      <section id="services" className="py-20 bg-slate-950/20 backdrop-blur-md border-t border-b border-white/5">
        <div className="max-w-5xl mx-auto w-full px-4 md:px-6 space-y-12">
          
          <div className="text-center space-y-2">
            <h2 className="text-xs font-black text-purple-400 tracking-widest uppercase">توانمندی‌ها و تسلط راهبردی</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-white">کلاستر‌های فعالیت استراتژیک هلدینگ آریا</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Field 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.015, boxShadow: "0 15px 35px -10px rgba(168,85,247,0.15)" }}
              transition={{ duration: 0.5, type: "spring", stiffness: 350, damping: 20 }}
              className="group p-6 glass-accent-card laser-glow-card rounded-2xl relative overflow-hidden bg-slate-950/40 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-300 flex items-center justify-center mb-5 border border-purple-500/20">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-purple-400 transition-colors mb-2.5 font-bold">رایانش ابری و سامانه‌های تحت وب</h4>
              <p className="text-xs text-slate-350 leading-relaxed font-light text-justify">
                توسعه حرفه‌ای‌ترین وب‌اپلیکیشن‌ها و داشبوردهای مانیتوری زنده بر بستر React و معماری مقیاس‌پذیر Microservices به منظور پایش و تجمیع داده‌ها.
              </p>
            </motion.div>

            {/* Field 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.015, boxShadow: "0 15px 35px -10px rgba(16,185,129,0.15)" }}
              transition={{ duration: 0.5, type: "spring", stiffness: 350, damping: 20, delay: 0.05 }}
              className="group p-6 glass-accent-card laser-glow-card rounded-2xl relative overflow-hidden bg-slate-950/40 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/20">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors mb-2.5 font-bold">هوش مصنوعی و لبه علمی داده‌ها</h4>
              <p className="text-xs text-slate-350 leading-relaxed font-light text-justify">
                فرم‌دهی مدل‌های عمیق یادگیری (Deep Learning) برای استخراج ضایعات بافتی و محاسب پایش آنومالی ترافیک ورودی سرورها با حداکثر بهره‌وری.
              </p>
            </motion.div>

            {/* Field 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.015, boxShadow: "0 15px 35px -10px rgba(217,70,239,0.15)" }}
              transition={{ duration: 0.5, type: "spring", stiffness: 350, damping: 20, delay: 0.1 }}
              className="group p-6 glass-accent-card laser-glow-card rounded-2xl relative overflow-hidden bg-slate-950/40 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-fuchsia-500/15 text-fuchsia-400 flex items-center justify-center mb-5 border border-fuchsia-500/20">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-fuchsia-400 transition-colors mb-2.5 font-bold">محصولات بومی و بستر مالی موبایل</h4>
              <p className="text-xs text-slate-350 leading-relaxed font-light text-justify">
                پیاده‌سازی سوپر اپلیکیشن‌های پرداخت موبایل بانکی و امن چند ارزی سازگار با تمام دستگاه‌های هوشمند دستی در کمترین تیک همگام‌سازی.
              </p>
            </motion.div>

            {/* Field 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.015, boxShadow: "0 15px 35px -10px rgba(99,102,241,0.15)" }}
              transition={{ duration: 0.5, type: "spring", stiffness: 350, damping: 20, delay: 0.15 }}
              className="group p-6 glass-accent-card laser-glow-card rounded-2xl relative overflow-hidden bg-slate-950/40 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-300 flex items-center justify-center mb-5 border border-indigo-500/20">
                <Cloud className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-indigo-400 transition-colors mb-2.5 font-bold font-sans">زیرساخت‌های توزیع‌شده دیتاسنتر</h4>
              <p className="text-xs text-slate-350 leading-relaxed font-light text-justify">
                فرم‌بندی خوشه‌های خوش تعامل Docker و Kubernetes برای تقسیم ترافیک‌های بزرگ همزمان بدون وقفه و پایداری کلاستر دیتابیس.
              </p>
            </motion.div>

            {/* Field 5 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.015, boxShadow: "0 15px 35px -10px rgba(244,63,94,0.15)" }}
              transition={{ duration: 0.5, type: "spring", stiffness: 350, damping: 20, delay: 0.2 }}
              className="group p-6 glass-accent-card laser-glow-card rounded-2xl relative overflow-hidden bg-slate-950/40 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-450 flex items-center justify-center mb-5 border border-rose-500/20">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-rose-400 transition-colors mb-2.5 font-bold">کلاسترینگ امنیتی و پیشگیری وب</h4>
              <p className="text-xs text-slate-350 leading-relaxed font-light text-justify">
                توسعه بسته‌های ایمن سایبری IPS و بهینه‌سازی کدهای فرانت‌اند و بک‌اند با استفاده از الگوهای پیشگیری خطرات امنیتی تراز اول.
              </p>
            </motion.div>

            {/* Field 6 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.015, boxShadow: "0 15px 35px -10px rgba(245,158,11,0.15)" }}
              transition={{ duration: 0.5, type: "spring", stiffness: 350, damping: 20, delay: 0.25 }}
              className="group p-6 glass-accent-card laser-glow-card rounded-2xl relative overflow-hidden bg-slate-950/40 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-5 border border-amber-500/20">
                <Coins className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-amber-400 transition-colors mb-2.5 font-bold">سرمایه تجمعی و شتاب‌دهی ایده</h4>
              <p className="text-xs text-slate-330 leading-relaxed font-light text-justify">
                تامین بسترهای مالی و پایش مارکت به علاوه انتقال دانش فنی جهت شتاب دهی ایده‌های بزرگ در سازمان‌های نوین تجاری.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE TECHNOLOGY SANDBOX & POWER CYBER-DEFENCE EXPERIMENTAL LAB */}
      <DistributedSystemLab />

      {/* SECTION 3: SUBSIDIARIES & COMPLETED PROJECTS SHOWCASE */}
      <section id="showcase" className="py-20 max-w-5xl mx-auto w-full px-4 md:px-6 space-y-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div>
            <h2 className="text-xs font-black text-purple-400 tracking-widest uppercase">رصد پروژه‌ها و شرکت‌های همکار</h2>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>پرتفولیوی تخصصی و سامانه‌های اقماری</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">با کلیک روی گزینه‌های فیلتر بالا، کارهای زیرمجموعه آریا را تفکیک کنید</p>
          </div>

          {/* Core search controller */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="جستجوی فناوری، سازمان، متدولوژی..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 hover:border-purple-500/30 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 rounded-xl px-10 py-2.5 text-xs text-white placeholder-slate-450 focus:outline-none transition-all text-right shadow-sm"
            />
            <Search className="w-4 h-4 text-purple-400 absolute right-3.5 top-3.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-3.5 text-[10px] bg-slate-900 border border-white/5 text-slate-300 hover:bg-slate-800 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
               >
                حذف
              </button>
            )}
          </div>
        </div>

        {/* Categorization selector pill list */}
        <div className="flex flex-wrap items-center gap-2 select-none relative z-10">
          {CATEGORIES.map(category => {
            const isActive = selectedCategory === category.key;
            
            // Custom multi-color theme colors depending on the selected field (resolves standard blue-only flatness)
            let themeColorClasses = "";
            let iconColor = "";
            switch (category.key) {
              case 'all':
                themeColorClasses = isActive ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.15)]" : "bg-slate-900/50 border-white/5 text-slate-400 hover:text-indigo-300 hover:border-indigo-500/20";
                iconColor = isActive ? "text-indigo-300" : "text-indigo-400/80";
                break;
              case 'web':
                themeColorClasses = isActive ? "bg-sky-500/20 border-sky-400/40 text-sky-100 shadow-[0_0_15px_rgba(56,189,248,0.15)]" : "bg-slate-900/50 border-white/5 text-slate-400 hover:text-sky-300 hover:border-sky-500/20";
                iconColor = isActive ? "text-sky-300" : "text-slate-400";
                break;
              case 'ai':
                themeColorClasses = isActive ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.15)]" : "bg-slate-900/50 border-white/5 text-slate-400 hover:text-emerald-300 hover:border-emerald-500/20";
                iconColor = isActive ? "text-emerald-300" : "text-emerald-400";
                break;
              case 'mobile':
                themeColorClasses = isActive ? "bg-purple-500/20 border-purple-400/40 text-purple-100 shadow-[0_0_15px_rgba(168,85,247,0.15)]" : "bg-slate-900/50 border-white/5 text-slate-400 hover:text-purple-300 hover:border-purple-500/20";
                iconColor = isActive ? "text-purple-300" : "text-purple-400";
                break;
              case 'cloud':
                themeColorClasses = isActive ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.15)]" : "bg-slate-900/50 border-white/5 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/20";
                iconColor = isActive ? "text-cyan-300" : "text-cyan-400";
                break;
              case 'cybersecurity':
                themeColorClasses = isActive ? "bg-rose-500/20 border-rose-400/40 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.15)]" : "bg-slate-900/50 border-white/5 text-slate-400 hover:text-rose-300 hover:border-rose-500/20";
                iconColor = isActive ? "text-rose-300" : "text-rose-450";
                break;
              default:
                themeColorClasses = "bg-slate-900 border-white/5 text-slate-400";
                iconColor = "text-slate-400";
            }

            return (
              <motion.button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs border font-bold cursor-pointer relative overflow-hidden transition-all duration-300 ${themeColorClasses}`}
              >
                {/* Active fluid layout slide shadow capsule background overlay */}
                {isActive && (
                  <motion.div 
                    layoutId="activeCategoryBorderGlow"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                
                <span className={`transition-transform duration-300 group-hover:scale-110 ${iconColor}`}>
                  {getCategoryIcon(category.key)}
                </span>
                <span>{category.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Project cards Grid space */}
        <div className="min-h-[250px]">
          {sortedProjects.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={(item) => setSelectedProject(item)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center bg-slate-950/40 border border-dashed border-white/5 rounded-2xl p-8 shadow-sm"
            >
              <div className="w-12 h-12 bg-slate-900 flex items-center justify-center rounded-full text-slate-400 mb-3.5 border border-white/5">
                <Search className="w-6 h-6 text-purple-400 animate-pulse" />
              </div>
              <p className="text-sm font-bold text-white mb-1">سامانه‌ای در انبار این شاخه یافت نشد</p>
              <p className="text-xs text-slate-350 max-w-sm">
                هیچ پروژه‌ای مطابق با فیلترها و عبارت "{searchQuery}" یافت نشد. بازنشانی زیر را فشار دهید.
              </p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 rounded-lg bg-slate-900 border border-white/5 text-xs text-slate-350 hover:bg-slate-800 transition-all font-semibold cursor-pointer"
              >
                نمایش تمام پروژه‌های هلدینگ
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* SECTION 4: PROGRESS TIMELINE HISTORY (تایم‌لاین رشد هلدینگ) */}
      <section id="timeline" className="py-20 bg-slate-950/20 backdrop-blur-md border-t border-b border-white/5">
        <div className="max-w-5xl mx-auto w-full px-4 md:px-6 space-y-12">
          
          <div className="text-center space-y-2">
            <h2 className="text-xs font-black text-cyan-400 tracking-widest uppercase">شناسنامه سیر تکاملی شرکت</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-white">تایم‌لاین گام‌های کلیدی و افزایش سرمایه</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="relative border-r-2 border-slate-800 mr-4 md:mr-12 space-y-12">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="relative pr-8 md:pr-12 group">
                
                {/* Visual milestone point */}
                <div className="absolute right-0 top-1.5 -mr-[9px] w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 transition-all duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-none">
                  
                  {/* Left: Year badge */}
                  <div className="md:col-span-2">
                    <span className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-lg text-xs font-black font-sans leading-none tracking-tight">
                      سال {milestone.year}
                    </span>
                  </div>

                  {/* Right: Content details */}
                  <div className="md:col-span-10 glass-accent-card laser-glow-card border border-white/5 p-5 rounded-2xl md:-mt-1 hover:border-cyan-500/30 transition-all bg-slate-950/40 shadow-sm text-right">
                    <h4 className="text-sm font-bold text-white mb-2">{milestone.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-light text-justify leading-relaxed">{milestone.description}</p>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: BOARD OF DIRECTORS / LEADERSHIP */}
      <section id="directors" className="py-20 max-w-5xl mx-auto w-full px-4 md:px-6 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-black text-cyan-400 tracking-widest uppercase">امنا و شورای عالی هماهنگی</h2>
          <h3 className="text-2xl md:text-3xl font-bold text-white">هیئت مدیره و مدیران اجرایی</h3>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Executive members mapping */}
          {executives.map(member => (
            <div key={member.id} className="glass-accent-card laser-glow-card border border-white/5 rounded-2xl p-5 hover:border-cyan-500/30 transition-all flex flex-col items-center text-center bg-slate-950/40 shadow-sm">
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-white/5">
                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-sm font-black text-white">{member.name}</h4>
              <span className="text-[10px] text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 font-semibold px-2 py-0.5 rounded-full mt-1.5">{member.role}</span>
              
              <p className="text-xs text-slate-350 leading-relaxed font-light mt-4 text-justify line-clamp-4 leading-relaxed">
                {member.biography}
              </p>

              {member.linkedinUrl && (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/5 text-slate-400 hover:text-white transition-all mt-4 self-center"
                  title="پروفایل لینکدین همکار"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}

          {/* Active CTO Arad Bahrami badge */}
          <div className="glass-accent-card laser-glow-card border border-blue-500/30 bg-blue-950/20 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all text-center shadow-lg shadow-blue-500/[0.02]">
            
            <div className="space-y-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-blue-400 shadow-md shadow-blue-500/10">
                <img src={profile.avatarUrl} alt={profile.fullName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="text-sm font-black text-blue-300">{profile.fullName}</h4>
                <span className="text-[10px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 font-semibold px-2.5 py-0.5 rounded-full mt-1.5 inline-block">عضو راهبر ارشدفنی</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light text-justify leading-relaxed">
                {profile.bio.substring(0, 150)}... مسئول مستقیم نظارت بر مایلستون‌ها, توسعه ابزارها و امنیت ابری کدهای سفارش داده شده.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-3 mt-4">
              {profile.textContactUrl || profile.telegramUrl ? (
                <a href={profile.telegramUrl || '#'} target="_blank" className="p-2 bg-slate-900 border border-white/5 rounded-lg text-slate-450 hover:text-blue-400 hover:border-blue-500/20 transition-all">
                  <Send className="w-4 h-4" />
                </a>
              ) : null}
              {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" className="p-2 bg-slate-900 border border-white/5 rounded-lg text-slate-450 hover:text-blue-400 hover:border-blue-500/20 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              <a href={`mailto:${profile.email}`} className="p-2 bg-slate-900 border border-white/5 rounded-lg text-slate-450 hover:text-blue-400 hover:border-blue-500/20 transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: INTERACTIVE MOOD PROJECT PROPOSAL CONFIGURATOR (فرم چندمرحله‌ای پیش‌فاکتور وب) */}
      <section id="partnership" className="py-20 bg-slate-950/20 backdrop-blur-md border-t border-b border-white/5">
        <div className="max-w-4xl mx-auto w-full px-4 md:px-6 space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-xs font-black text-purple-400 tracking-widest uppercase font-mono">FINTECH ESTIMATION ENGINE</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-white">محاسبه‌گر پیشرفته هزینه و جذب پروژه</h3>
            <p className="text-xs text-slate-350 mt-2 leading-relaxed">صرفاً با چند کلیک، رنج حدودی بودجه، جزئیات SLA و پیچیدگی فنی پروژه‌ی درخواستی خود را تخمین بزنید</p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="bg-slate-950/40 border border-white/5 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-xl relative">
            
            {/* Steps indicator - balanced dark sidebar for elegant aesthetics */}
            <div className="md:col-span-4 bg-slate-950 p-6 flex flex-col justify-between border-l border-white/5 text-right">
              <div className="space-y-6">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">تکمیل گام‌ها</span>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${quoteStep === 1 ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'bg-slate-900 text-slate-400 border border-white/5'}`}>۱</span>
                    <span className={`text-xs font-bold ${quoteStep === 1 ? 'text-white' : 'text-slate-450'}`}>شاخه و تکنولوژی</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${quoteStep === 2 ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'bg-slate-900 text-slate-400 border border-white/5'}`}>۲</span>
                    <span className={`text-xs font-bold ${quoteStep === 2 ? 'text-white' : 'text-slate-450'}`}>پیچیدگی فنی و توافق</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${quoteStep === 3 ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'bg-slate-900 text-slate-400 border border-white/5'}`}>۳</span>
                    <span className={`text-xs font-bold ${quoteStep === 3 ? 'text-white' : 'text-slate-450'}`}>ارسال خلاصه درخواست</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Cost Counter widget inside calculator sidebar */}
              <div className="pt-6 border-t border-white/5 mt-8 space-y-2">
                <span className="text-[11px] text-slate-400 block font-semibold">پیش‌فاکتور تخمینی سرمایه‌گذاری:</span>
                <span className="text-xl font-black text-purple-400 block font-mono leading-none">
                  {estimatedCost.min} الی {estimatedCost.max}
                </span>
                <span className="text-[10px] text-slate-450 block leading-relaxed">میلیون تومان پرداختی به ریال یا تتر بر مبنای قرارداد</span>
              </div>
            </div>

            {/* Steps Workspace Form area */}
            <div className="md:col-span-8 p-6 md:p-8 bg-slate-900/30 backdrop-blur-xs">
              <form onSubmit={handleQuoteSubmit} className="space-y-6">

                {quoteStep === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-200">گام ۱: انتخاب شاخه اصلی و پلتفرم مدنظر</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                      <button
                        type="button"
                        onClick={() => setQuoteSector('ai')}
                        className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between h-28 cursor-pointer ${quoteSector === 'ai' ? 'bg-blue-950/30 border-blue-500/50 text-blue-300 shadow-sm' : 'bg-slate-950/40 border-white/5 text-slate-400 hover:border-blue-500/25'}`}
                      >
                        <BrainCircuit className="w-5 h-5 text-emerald-400" />
                        <div>
                          <span className="text-xs font-bold block text-white">هوش مصنوعی و داده</span>
                          <span className="text-[10px] text-slate-400 block mt-1 leading-relaxed">یادگیری عمیق، پردازش موازی، تشخیص عوارض بافت</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setQuoteSector('cloud')}
                        className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between h-28 cursor-pointer ${quoteSector === 'cloud' ? 'bg-blue-950/30 border-blue-500/50 text-blue-300 shadow-sm' : 'bg-slate-950/40 border-white/5 text-slate-400 hover:border-blue-500/25'}`}
                      >
                        <Cloud className="w-5 h-5 text-blue-400" />
                        <div>
                          <span className="text-xs font-bold block text-white">زیرساخت ابری و دیتاسنتر</span>
                          <span className="text-[10px] text-slate-400 block mt-1 leading-relaxed">خوشه‌های توزیع بار، داکر، دیتابیس کلاسترینگ</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setQuoteSector('web')}
                        className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between h-28 cursor-pointer ${quoteSector === 'web' ? 'bg-cyan-950/30 border-cyan-500/50 text-cyan-300 shadow-sm' : 'bg-slate-950/40 border-white/5 text-slate-400 hover:border-cyan-500/25'}`}
                      >
                        <Globe className="w-5 h-5 text-cyan-400" />
                        <div>
                          <span className="text-xs font-bold block text-white">داشبورد و سامانه وب</span>
                          <span className="text-[10px] text-slate-400 block mt-1 leading-relaxed">مانیتورینگ بلادرنگ، رندرینگ اختصاصی React 19</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setQuoteSector('cybersecurity')}
                        className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between h-28 cursor-pointer ${quoteSector === 'cybersecurity' ? 'bg-blue-950/30 border-blue-500/50 text-blue-300 shadow-sm' : 'bg-slate-950/40 border-white/5 text-slate-400 hover:border-blue-500/25'}`}
                      >
                        <Shield className="w-5 h-5 text-rose-400" />
                        <div>
                          <span className="text-xs font-bold block text-white">پدافند غیرعامل و IPS</span>
                          <span className="text-[10px] text-slate-400 block mt-1 leading-relaxed">دیوار دفاعی ایمنی و پیشگیری وب‌سوکت</span>
                        </div>
                      </button>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={() => setQuoteStep(2)}
                        className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer transition-colors"
                      >
                        گام بعدی: پیچیدگی فنی دپو
                      </button>
                    </div>
                  </motion.div>
                )}

                {quoteStep === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    
                    {/* Complexity selection */}
                    <div className="space-y-5">
                      <span className="text-xs text-slate-200 block font-bold">سطح دشواری و پیچیدگی الگوریتم‌ها:</span>
                      <div className="grid grid-cols-3 gap-2">
                        {['easy', 'medium', 'hard'].map((level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => setQuoteComplexity(level)}
                            className={`py-2.5 px-3 rounded-lg border text-xs transition-all cursor-pointer font-medium ${quoteComplexity === level ? 'bg-purple-500/25 border-purple-500/40 text-purple-300 shadow-sm' : 'bg-slate-950/40 border-white/5 text-slate-300 hover:border-purple-500/20'}`}
                          >
                            {level === 'easy' ? 'ساده / اداری' : level === 'medium' ? 'متوسط / استاندارد' : 'پیشرفته / در سطح ملی'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* SLA support selection */}
                    <div className="space-y-5">
                      <span className="text-xs text-slate-200 block font-bold">موافقت‌نامه تضمین سطح خدمات (SLA):</span>
                      <div className="grid grid-cols-3 gap-2">
                        {['gold', 'silver', 'bronze'].map((sla) => (
                          <button
                            key={sla}
                            type="button"
                            onClick={() => setQuoteSla(sla)}
                            className={`py-2.5 px-3 rounded-lg border text-xs transition-all cursor-pointer font-medium ${quoteSla === sla ? 'bg-purple-500/25 border-purple-500/40 text-purple-300 shadow-sm' : 'bg-slate-950/40 border-white/5 text-slate-300 hover:border-purple-500/20'}`}
                          >
                            {sla === 'gold' ? 'طلایی (۲۴ ساعته زنده)' : sla === 'silver' ? 'نقره‌ای (اداری با ضمانت)' : 'برنزی (تیکت تخصصی)'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setQuoteStep(1)}
                        className="px-4 py-2 rounded-lg bg-slate-950 border border-white/5 hover:bg-slate-800 text-xs text-slate-300 cursor-pointer transition-colors"
                      >
                        بازگشت به گام ۱
                      </button>

                      <button
                        type="button"
                        onClick={() => setQuoteStep(3)}
                        className="px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold cursor-pointer transition-colors"
                      >
                        گام نهایی: خلاصه درخواست
                      </button>
                    </div>

                  </motion.div>
                )}

                {quoteStep === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <h4 className="text-xs font-bold text-purple-400 flex items-center gap-1.5 mb-1">
                      <Clock className="w-4 h-4 text-purple-400" />
                      آماده‌سازی پیش‌نویس نهایی
                    </h4>

                    {/* Sender Direct Contact */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-200 font-semibold block">آدرس ایمیل، شماره تماس یا شناسه تلگرام جهت هماهنگی</label>
                      <input
                        type="text"
                        required
                        value={quoteContact}
                        onChange={e => setQuoteContact(e.target.value)}
                        className="w-full bg-slate-950/50 border border-white/5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-450 focus:outline-none"
                        placeholder="مثال: @mr_bahadori یا ۰۹۱۲۳۴۵۶۷۸۹"
                        style={{ direction: 'ltr' }}
                      />
                    </div>

                    {/* Slogan Description */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-200 font-semibold block">نام شرکت و توضیح خلاصه ایده</label>
                      <textarea
                        rows={3}
                        required
                        value={quoteDescription}
                        onChange={e => setQuoteDescription(e.target.value)}
                        className="w-full bg-slate-950/50 border border-white/5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 rounded-xl p-3 text-xs text-white placeholder-slate-450 focus:outline-none resize-none leading-relaxed"
                        placeholder="به عنوان مثال: ما می‌خواهیم سیستم پایش ترافیکی دفتری خود را متصل کنیم..."
                      />
                    </div>

                    {/* Final Actions buttons */}
                    <div className="flex justify-between items-center pt-4">
                      <button
                        type="button"
                        onClick={() => setQuoteStep(2)}
                        className="px-4 py-2 rounded-lg bg-slate-950 border border-white/5 hover:bg-slate-800 text-xs text-slate-300 cursor-pointer transition-colors"
                      >
                        بازگشت
                      </button>

                      <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-colors"
                      >
                        <Send className="w-4 h-4 shrink-0" />
                        <span>ارسال در پیام‌رسان هماهنگ‌کننده</span>
                      </button>
                    </div>

                  </motion.div>
                )}

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: DETAILED CORPORATE FAQ ACCORDIONS */}
      <section id="faq" className="py-20 max-w-4xl mx-auto w-full px-4 md:px-6 space-y-12">
        
        <div className="text-center space-y-2">
          <h2 className="text-xs font-black text-blue-400 tracking-widest uppercase">الزامات، استانداردها و تفاهم‌نامه‌ها</h2>
          <h3 className="text-2xl md:text-3xl font-bold text-white">پرسش‌های متداول در پورتفولیوی سرمایه‌گذارن</h3>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div 
                key={faq.id} 
                className="bg-slate-950/40 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full px-5 py-4 text-right flex items-center justify-between text-slate-200 hover:text-blue-400 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1 rounded bg-blue-500/10 text-blue-355 border border-blue-500/20 text-[10px] font-mono shrink-0">
                      /{faq.category}
                    </span>
                    <span className="text-xs sm:text-sm font-bold leading-relaxed">{faq.question}</span>
                  </div>
                  <ChevronDown className={`w-4.5 h-4.5 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
                </button>

                {/* Answer space */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-2 text-xs text-slate-350 leading-relaxed font-light text-justify border-t border-white/5 bg-slate-905/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>
      </section>

      {/* RICH PERSIAN CORPORATE FOOTER - Modern Slate Neutral */}
      <footer className="border-t border-white/5 bg-slate-950 text-slate-300 py-12 px-4 shadow-sm relative">
        <div className="max-w-5xl mx-auto space-y-12" style={{ direction: 'rtl' }}>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Holding overview */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-slate-900 text-purple-400 border border-white/5">
                  <Building2 className="w-4 h-4" />
                </span>
                <h4 className="text-sm font-bold text-white">{profile.holdingName}</h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed text-justify font-light leading-relaxed">
                برترین هماهنگ‌کننده راه‌حل‌های توزیع شده، پدافند زیست‌بوم ابری و فناوری‌های عمیق هوش معاصر. ما متعهد به پیوند پایداری به خدمات نوآور هستیم.
              </p>
              
              {/* Address details */}
              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-450 shrink-0 mt-0.5" />
                  <span className="text-[10px] text-slate-450 leading-normal">{profile.holdingAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-450 shrink-0" />
                  <span className="text-[10px] text-slate-450 font-mono" style={{ direction: 'ltr' }}>{profile.phone}</span>
                </div>
              </div>
            </div>

            {/* Middle Quick Links */}
            <div className="md:col-span-3 space-y-4">
              <h5 className="text-xs font-bold text-white border-r-2 border-purple-500 pr-2">ناوبری پورتفولیو</h5>
              <div className="flex flex-col gap-2.5 text-[10px] text-slate-400 font-semibold">
                <a href="#about" className="hover:text-purple-400 transition-colors">مقدمه و رسالت هلدینگ</a>
                <a href="#services" className="hover:text-purple-400 transition-colors">ستون‌های علمی و تکنولوژی</a>
                <a href="#showcase" className="hover:text-purple-400 transition-colors">ویترین پروژه‌های اقماری</a>
                <a href="#partnership" className="hover:text-purple-400 transition-colors">سیستم پیش فاکتور هوشمند</a>
              </div>
            </div>

            {/* Newsletter simulation */}
            <div className="md:col-span-4 space-y-4">
              <h5 className="text-xs font-bold text-white border-r-2 border-purple-500 pr-2">خبرنامه تخصصی آریا</h5>
              <p className="text-[10px] text-slate-400 leading-relaxed font-light leading-relaxed">
                با عضویت در خبرنامه هفتگی ما، به صورت منظم از گزارش‌های بازوی تحقیق و توسعه و راندهای سرمایه‌گذاری جدید مطلع گردید.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="آدرس ایمیل خود را وارد نمایید"
                  className="w-full bg-slate-900 border border-white/5 rounded-xl px-3 py-2 text-[10px] placeholder-slate-500 text-white focus:outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => console.log('ایمیل به خبرنامه افزوده شد')}
                  className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold cursor-pointer transition-colors shrink-0"
                >
                  عضویت
                </button>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Reset memory */}
              <button
                onClick={handleResetToDefaults}
                className="flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-rose-450 transition-colors cursor-pointer"
                title="تمام اطلاعات و فرتورهای دمو تغییر یافته را ملغی می‌سازد"
              >
                <RefreshCw className="w-3 h-3 animate-spin-slow" />
                <span>برگشت پورتفولیو به تنظیمات اولیه</span>
              </button>
            </div>
            
            <div className="text-[10px] text-slate-500 font-mono tracking-wide">
              © {new Date().getFullYear()} {profile.holdingName.split(' و ')[0]}. ALL RIGHTS RESERVED
            </div>
          </div>

        </div>
      </footer>

      {/* MODAL COVERS */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

        {isAdminOpen && (
          <AdminPanel
            profile={profile}
            projects={projects}
            onSaveProfile={handleSaveProfile}
            onSaveProject={handleSaveProject}
            onDeleteProject={handleDeleteProject}
            onResetToDefaults={handleResetToDefaults}
            onClose={() => setIsAdminOpen(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
