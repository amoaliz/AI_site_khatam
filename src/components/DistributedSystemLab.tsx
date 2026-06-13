import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Server, 
  Terminal, 
  Flame, 
  Cpu, 
  ShieldAlert, 
  HelpCircle, 
  RefreshCw, 
  Play, 
  ChevronRight, 
  Hourglass, 
  Sparkles,
  Command,
  Database,
  ArrowRightLeft
} from 'lucide-react';

interface LogLine {
  id: string;
  timestamp: string;
  text: string;
  type: 'info' | 'success' | 'warn' | 'error' | 'cyber';
}

export default function DistributedSystemLab() {
  const [loadMode, setLoadMode] = useState<'idle' | 'nominal' | 'heavy' | 'attack'>('nominal');
  const [systemLogs, setSystemLogs] = useState<LogLine[]>([]);
  const [cpuTemp, setCpuTemp] = useState(44);
  const [dbStatus, setDbStatus] = useState('عادی - ۹۹.۹% پایداری');
  const [sysMemory, setSysMemory] = useState(38);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // AI Assistant states
  const [aiQuestionActive, setAiQuestionActive] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Trigger global custom event so the Hero canvas responds in real-time
  const triggerGlobalLoadChange = (mode: 'idle' | 'nominal' | 'heavy' | 'attack') => {
    setLoadMode(mode);
    const event = new CustomEvent('aria-system-load', { detail: { load: mode } });
    window.dispatchEvent(event);
    
    // Add corresponding technical logs immediately
    const timestamp = new Date().toLocaleTimeString('fa-IR');
    let logsToAdd: Omit<LogLine, 'id'>[] = [];

    switch (mode) {
      case 'idle':
        logsToAdd = [
          { timestamp, text: 'سرویس‌دهنده در حالت بهینه‌سازی انرژی (Green State) قرار گرفت.', type: 'success' },
          { timestamp, text: 'ارتباط کلاستر پایگاه داده ثریا به ۱.۵ گیگاهرتز محدود شد.', type: 'info' },
          { timestamp, text: 'سربار پردازشی سرورهای توزیع بار: زیر ۵٪ ظرفیت.', type: 'info' }
        ];
        break;
      case 'nominal':
        logsToAdd = [
          { timestamp, text: 'سیستم به موازات لود عادی هدایت شد. ۲۸ کلاستر محاسباتی فعال.', type: 'info' },
          { timestamp, text: 'تطبیق بلادرنگ وب‌سرویس‌ها با دیتابیس توزیع شده برقرار است.', type: 'success' },
          { timestamp, text: 'تاخیر کوئری‌ها بر بستر کلاستر آریا: ۲.۴ میلی‌ثانیه.', type: 'success' }
        ];
        break;
      case 'heavy':
        logsToAdd = [
          { timestamp, text: 'هشدار: حجم تراکنش از مرز ۸۰۰ رکوئست بر ثانیه فراتر رفت.', type: 'warn' },
          { timestamp, text: 'سامانه خودکار اسکالر داکر-کوبنتیس فعال شد； تزریق کدهای محاسباتی کمکی.', type: 'info' },
          { timestamp, text: 'دمای هسته لایه ۳ پردازش به ۵۸ درجه سلسیوس افزایش یافت.', type: 'warn' }
        ];
        break;
      case 'attack':
        logsToAdd = [
          { timestamp, text: 'بحرانی: موج ناگهانی حملات شبیه‌سازی شده SYN FLOOD شناسایی شد!', type: 'cyber' },
          { timestamp, text: 'مسدودسازی خودکار آی‌پی‌های مخرب خارج از پروتکل لایه ۴ هلدینگ.', type: 'error' },
          { timestamp, text: 'دیوار دفاعی ایمنی کلاستر آریا با ۹۹.۸٪ موفقیت ترافیک فیک را منحرف ساخت.', type: 'success' },
          { timestamp, text: 'سیستم در موضع امنیت کامل； سرورهای اقماری هلدینگ پایدار هستند.', type: 'cyber' }
        ];
        break;
    }

    setSystemLogs(prev => [
      ...prev,
      ...logsToAdd.map((log, index) => ({
        ...log,
        id: `log-${Date.now()}-${index}`
      }))
    ].slice(-45)); // keep last 45 logs max
  };

  // Auto-scrolling terminal logs to the bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [systemLogs]);

  // Initial logs
  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString('fa-IR');
    setSystemLogs([
      { id: '1', timestamp, text: 'اتصال به سیستم‌های نظارتی هلدینگ آریا پایتخت برقرار شد v4.2', type: 'info' },
      { id: '2', timestamp, text: 'پروتکل پایگاه داده مانیتورینگ متکی بر Timescale رونمایی گردید.', type: 'success' },
      { id: '3', timestamp, text: 'رله‌های دفاعی پدافند غیرعامل در لایه ۳ و لایه ۴ فعال هستند.', type: 'success' }
    ]);
  }, []);

  // Dynamics simulation parameters fluctuating based on state
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuTemp(prev => {
        let target = 44;
        if (loadMode === 'idle') target = 36;
        else if (loadMode === 'nominal') target = 48;
        else if (loadMode === 'heavy') target = 64;
        else if (loadMode === 'attack') target = 79;
        
        const delta = Math.floor(Math.random() * 5) - 2;
        let next = prev + delta;
        if (next < target - 4) next = target - 3;
        if (next > target + 4) next = target + 3;
        return next;
      });

      setSysMemory(prev => {
        let target = 35;
        if (loadMode === 'idle') target = 18;
        else if (loadMode === 'nominal') target = 42;
        else if (loadMode === 'heavy') target = 72;
        else if (loadMode === 'attack') target = 89;
        
        const delta = Math.floor(Math.random() * 5) - 2;
        let next = prev + delta;
        if (next < target - 5) next = target - 4;
        if (next > target + 5) next = target + 4;
        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [loadMode]);

  // Handle diagnostic checks
  const runSelfDiagnostic = () => {
    const timestamp = new Date().toLocaleTimeString('fa-IR');
    const logId = `log-${Date.now()}`;
    setSystemLogs(prev => [
      ...prev,
      {
        id: logId,
        timestamp,
        text: 'درخواست آزمایش کل سیگنال‌ها دریافت شد... مانیتور لایه‌ها در کمال صحت تراکنشی است.',
        type: 'success'
      }
    ].slice(-45));
  };

  // Pre-coded AI questions about projects and holdings
  const aiQueries: Record<string, string> = {
    vision: "هلدینگ آریا متکی بر سه ستون کلیدی تاسیس شده است: ۱. زیرساخت ابری پایدار مگابایت بالا جهت پشتیبانی مراجعین پر ازدحام، ۲. عارضه‌شناسی با هوش مصنوعی و ۳. فناوری‌های مالی امن تجاری. هدف ما شتاب‌دهی بومی و ارتقای استاندارد پایداری است.",
    soraya: "سیستم مانیتورینگ ثریا بر موازات تلفیق هسته‌های ابری با هوش مصنوعی طراحی شده است. این ابزار وظیفه کنترل بسته‌های امنیتی شبکه به طور مستقیم بر بستر هسته‌های داکر و دیتابیس کلاسترینگ را داراست تا پایداری ۹۹.۹٪ سرورها محقق گردد.",
    ariapay: "سوپر اپلیکیشن آریا پی مجهز به تکنولوژی یکپارچه‌ساز مالی بومی و بین‌المللی با ضریب پایداری بالاست. این سامانه با دیتابیس‌های منسجم تراکنشی چرخه‌های پرداخت را بدون وقفه پردازش می‌کند.",
    invest: "میانگین چرخه‌های جذب و سرمایه‌گذاری هلدینگ در بستر رشد طرح‌های نوپا در مقیاس‌های ۵۰ الی ۴۰۰ میلیون تومانی تعریف شده و هم‌زمان زیر نظر مدیر ارشد فنی، تیم تخصصی کدنویسی را با آخرین متدهای امنیتی پایش و ارتقا می‌دهیم."
  };

  const handleAiQuestion = (key: string, title: string) => {
    if (isTyping) return;
    setAiQuestionActive(title);
    setIsTyping(true);
    setAiResponse('');

    const textToType = aiQueries[key] || "اطلاعات مربوطه به بخش آریا یافت نشد.";
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      setAiResponse(prev => prev + textToType.charAt(currentIndex));
      currentIndex++;
      if (currentIndex >= textToType.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 12);
  };

  return (
    <section className="py-16 max-w-5xl mx-auto w-full px-4 md:px-6 space-y-10" id="tech-lab">
      
      {/* Decent branding header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-blue-950/40 text-blue-300 border border-blue-500/20 select-none uppercase tracking-widest font-mono">
          <Command className="w-3.5 h-3.5" />
          <span>Interactive Technology Sandbox</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight text-gradient-blue pb-1">آزمایشگاه زنده فناوری و پایش کلاستر آریا</h3>
        <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
          یک ماژول کنترل هوشمند بر دستان شما； کلاسترهای هلدینگ را مستقیماً تحریک کنید و نحوه واکنش توزیع لود و پدافند سایبری سیستم را بررسی کنید.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.4)]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" style={{ direction: 'rtl' }}>
        
        {/* Left Column (Diagnostic dashboard & Terminal logs) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Visual Telemetry Gauges */}
          <div className="grid grid-cols-3 gap-3">
            
            {/* CPU Gauge */}
            <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
              <span className="text-[10px] text-slate-400 block font-bold leading-none mb-1">دمای هسته مرکزی</span>
              <div className="flex items-end justify-between mt-3">
                <span className={`text-[19px] font-black font-mono ${
                  cpuTemp > 70 ? 'text-rose-400' : cpuTemp > 55 ? 'text-amber-400' : 'text-blue-300'
                }`}>{cpuTemp}°C</span>
                <span className="text-[10px] text-slate-500 font-mono tracking-tight font-medium">Core Temp</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full mt-3 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    cpuTemp > 70 ? 'bg-rose-500' : cpuTemp > 55 ? 'bg-amber-400' : 'bg-blue-500'
                  }`} 
                  style={{ width: `${Math.min(cpuTemp, 100)}%` }} 
                />
              </div>
            </div>

            {/* RAM Gauge */}
            <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
              <span className="text-[10px] text-slate-400 block font-bold leading-none mb-1">مصرف حافظه سیستم</span>
              <div className="flex items-end justify-between mt-3">
                <span className="text-[19px] font-black font-mono text-blue-300">{sysMemory}%</span>
                <span className="text-[10px] text-slate-500 font-mono tracking-tight font-medium">Memory Allocation</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full mt-3 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    sysMemory > 80 ? 'bg-rose-500' : sysMemory > 60 ? 'bg-amber-400' : 'bg-blue-500'
                  }`}
                  style={{ width: `${sysMemory}%` }} 
                />
              </div>
            </div>

            {/* DB Status */}
            <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
              <span className="text-[10px] text-slate-400 block font-bold leading-none mb-1">پایداری دیتابیس</span>
              <div className="flex items-end justify-between mt-3">
                <span className={`text-[11px] font-bold ${
                  loadMode === 'attack' ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {loadMode === 'attack' ? 'مداخله مسدود شد' : 'عادی - پایدار'}
                </span>
                <Database className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <span className="text-[9px] text-slate-500 font-medium block mt-3 select-none leading-none">Timescale NoLock </span>
            </div>

          </div>

          {/* Virtual scrolling system cyber-terminal log screen */}
          <div className="bg-slate-950 rounded-2xl border border-white/5 p-4 flex flex-col h-72 shadow-xl relative overflow-hidden">
            
            {/* Terminal Header decoration */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/85" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/85" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/85" />
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Diagnostics Stream console</span>
              </div>
            </div>

            {/* Scrolling terminal stream lines */}
            <div className="flex-grow overflow-y-auto space-y-2 pr-1 font-mono text-[10px] leading-relaxed select-text">
              {systemLogs.map(log => (
                <div key={log.id} className="flex gap-2 items-start text-justify">
                  <span className="text-slate-600 select-none shrink-0">[{log.timestamp}]</span>
                  <span className={`
                    ${log.type === 'success' ? 'text-emerald-400' : ''}
                    ${log.type === 'warn' ? 'text-amber-400' : ''}
                    ${log.type === 'error' ? 'text-rose-400 font-bold' : ''}
                    ${log.type === 'cyber' ? 'text-cyan-400 font-bold tracking-wide' : ''}
                    ${log.type === 'info' ? 'text-slate-400' : ''}
                  `}>
                    {log.text}
                  </span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Manual test action */}
            <div className="absolute left-4 bottom-4 z-10">
              <button
                onClick={runSelfDiagnostic}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-lg border border-slate-800 text-[9px] font-bold cursor-pointer transition-colors"
                title="تراکنش سیگنال عوارض‌شناس"
              >
                <RefreshCw className="w-3 h-3 anim-spin-custom" />
                <span>عوارض‌شناسی بلادرنگ</span>
              </button>
            </div>

          </div>

        </div>

        {/* Right Column (Control Panel selectors & AI Consultant Chatbot) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Simulated Load Control panel */}
          <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-5 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] font-bold text-blue-400 block mb-1">دیمر شبیه‌ساز بار کلاستر</span>
              <h4 className="text-xs font-bold text-white">حالت پردازش و ترافیک دیتاسنتر:</h4>
            </div>

            <div className="grid grid-cols-2 gap-2">
              
              <button
                onClick={() => triggerGlobalLoadChange('idle')}
                className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between h-20 ${
                  loadMode === 'idle' 
                    ? 'bg-slate-900/40 border-blue-500 text-white shadow-sm shadow-blue-500/5' 
                    : 'bg-slate-900/10 border-white/5 hover:border-white/10 text-slate-400'
                }`}
              >
                <Hourglass className="w-4 h-4 text-slate-500" />
                <div>
                  <span className="text-[11px] font-black block">حالت استراحت (Idle)</span>
                  <span className="text-[9px] text-slate-500 block font-mono">۱۲ RPS / Green Safe</span>
                </div>
              </button>

              <button
                onClick={() => triggerGlobalLoadChange('nominal')}
                className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between h-20 ${
                  loadMode === 'nominal' 
                    ? 'bg-blue-950/40 border-blue-500 text-blue-300 shadow-sm shadow-blue-500/5' 
                    : 'bg-slate-900/10 border-white/5 hover:border-white/10 text-slate-400'
                }`}
              >
                <Server className="w-4 h-4 text-blue-400" />
                <div>
                  <span className="text-[11px] font-black block">پردازش عادی (Nominal)</span>
                  <span className="text-[9px] text-slate-500 block font-mono">۴۵۰ RPS / Standard</span>
                </div>
              </button>

              <button
                onClick={() => triggerGlobalLoadChange('heavy')}
                className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between h-20 ${
                  loadMode === 'heavy' 
                    ? 'bg-cyan-950/40 border-cyan-500 text-cyan-300 shadow-sm shadow-cyan-500/5' 
                    : 'bg-slate-900/10 border-white/5 hover:border-white/10 text-slate-400'
                }`}
              >
                <Flame className="w-4 h-4 text-cyan-400" />
                <div>
                  <span className="text-[11px] font-black block">لود تراکنشی بزرگ</span>
                  <span className="text-[9px] text-slate-500 block font-mono">۱,۲۰۰ RPS / Micro-Scale</span>
                </div>
              </button>

              <button
                onClick={() => triggerGlobalLoadChange('attack')}
                className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between h-20 ${
                  loadMode === 'attack' 
                    ? 'bg-rose-950/40 border-rose-500 text-rose-300 shadow-sm shadow-rose-500/10 active-glow' 
                    : 'bg-slate-900/10 border-white/5 hover:border-white/10 text-slate-400'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-rose-500 blink-anim" />
                <div>
                  <span className="text-[11px] font-black block">حمله سایبری DDoS فیک</span>
                  <span className="text-[9px] text-slate-500 block font-mono">۵,۵۰۰ RPS / IPS Shield</span>
                </div>
              </button>

            </div>
          </div>

          {/* AI Strategic Board Consultant Chatbot simulator */}
          <div className="bg-gradient-to-br from-slate-950 to-slate-950 rounded-2xl p-5 border border-white/5 flex flex-col gap-4 text-white shadow-xl">
            
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-450 animate-pulse" />
                <span className="text-xs font-bold text-white">مشاور سیستمی و مالی هوشمند آریا</span>
              </div>
              <span className="text-[9px] font-mono text-cyan-450 font-semibold uppercase">Holding AI Board</span>
            </div> 

            {/* Quick-query pill buttons */}
            <div className="flex flex-wrap gap-1.5 select-none">
              <button
                onClick={() => handleAiQuestion('vision', 'چشم‌انداز و ماموریت کلیدی هلدینگ')}
                className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[9px] font-bold text-slate-300 hover:text-white transition-all cursor-pointer border border-white/5"
              >
                ماموریت هلدینگ چیست؟
              </button>
              <button
                onClick={() => handleAiQuestion('soraya', 'محیط و ساختار مانیتورینگ هوش مصنوعی ثریا')}
                className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[9px] font-bold text-slate-300 hover:text-white transition-all cursor-pointer border border-white/5"
              >
                پروژه ثریا چگونه کار می‌کند؟
              </button>
              <button
                onClick={() => handleAiQuestion('ariapay', 'بستر امنیت تراکنشی سوپر اپلیکیشن آریا پی')}
                className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[9px] font-bold text-slate-300 hover:text-white transition-all cursor-pointer border border-white/5"
              >
                سوپر اپلیکیشن مالی آریا پی
              </button>
              <button
                onClick={() => handleAiQuestion('invest', 'حجم تقریبی سرمایه‌گذاری خطرپذیر و صندوق سرمایه')}
                className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[9px] font-bold text-slate-300 hover:text-white transition-all cursor-pointer border border-white/5"
              >
                پایش سرمایه‌گذاری خطرپذیر آریا
              </button>
            </div>

            {/* Chat Response and state screen */}
            <div className="bg-black/50 border border-white/5 p-4 rounded-xl min-h-24 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950 transition-all">
              
              <AnimatePresence mode="wait">
                {aiQuestionActive ? (
                  <motion.div key="response" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                    <span className="text-[10px] text-cyan-400 font-bold block">موضوع: {aiQuestionActive}</span>
                    <p className="text-xs text-slate-300 leading-relaxed font-light text-justify">
                      {aiResponse || "آریا بات در حال تحلیل سیگنال‌ها..."}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4 text-slate-500 flex flex-col items-center gap-1">
                    <HelpCircle className="w-5 h-5 text-slate-600 mb-1" />
                    <span className="text-[10px] font-medium leading-none">یکی از دکمه‌های پرسش بالا را جهت همگام‌سازی مشاور انتخاب نمایید.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {isTyping && (
                <div className="flex items-center gap-1 pt-3 self-end">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
