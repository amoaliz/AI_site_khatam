import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Send, MessageCircle, AlertCircle, FileText, ArrowUpRight } from 'lucide-react';
import { Profile } from '../types';

interface InteractiveHeroProps {
  profile: Profile;
  onOpenAdmin: () => void;
  onOpenContact: () => void;
}

export default function InteractiveHero({ profile, onOpenAdmin, onOpenContact }: InteractiveHeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-8 md:py-20 flex flex-col items-center justify-center">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] md:w-[650px] h-[450px] md:h-[650px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/2 right-10 w-[250px] h-[250px] bg-brand-blue/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-5xl px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left / Top Side: Text Details */}
          <div className="lg:col-span-8 space-y-6 text-right order-2 lg:order-1" style={{ direction: 'rtl' }}>
            
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#02f0ff]/10 text-cyan-300 border border-brand-cyan/20 glow-pill select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping" />
              <span>آماده ثبت و توسعه پروژه‌های چالش‌برانگیز جدید</span>
            </motion.div>

            {/* Main Hero Header */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight"
              >
                سلام! من <span className="text-gradient-blue font-extrabold">{profile.fullName}</span> هستم
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base md:text-xl font-medium text-cyan-200/90 tracking-wide font-sans text-right"
              >
                {profile.title}
              </motion.h2>
            </div>

            {/* Custom Brief Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm md:text-base text-gray-300 leading-relaxed max-w-2xl font-light text-justify"
            >
              {profile.bio}
            </motion.p>

            {/* Call to Actions buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={onOpenContact}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-brand-blue hover:from-cyan-400 hover:to-brand-blue text-white text-xs font-bold transition-all shadow-lg shadow-brand-blue/30 scale-100 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
              >
                <span>ارتباط مستقیم و سفارش پروژه</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAdmin}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer"
              >
                <span>تنظیمات و مدیریت پورتفولیو</span>
              </button>
            </motion.div>

            {/* Social handles bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-3 pt-3"
            >
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2.5 rounded-lg bg-[#0a1931] border border-white/5 hover:border-cyan-400/40 text-gray-400 hover:text-cyan-400 transition-all"
                  title="ارسال ایمیل"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#0a1931] border border-white/5 hover:border-cyan-400/40 text-gray-400 hover:text-cyan-400 transition-all"
                  title="گیت‌هاب"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#0a1931] border border-white/5 hover:border-cyan-400/40 text-gray-400 hover:text-cyan-400 transition-all"
                  title="لینکدین"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile.telegramUrl && (
                <a
                  href={profile.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#0a1931] border border-white/5 hover:border-cyan-400/40 text-gray-400 hover:text-cyan-400 transition-all"
                  title="تلگرام"
                >
                  <Send className="w-4 h-4" />
                </a>
              )}
              {profile.whatsappUrl && (
                <a
                  href={profile.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#0a1931] border border-white/5 hover:border-cyan-400/40 text-gray-400 hover:text-cyan-400 transition-all"
                  title="واتس‌اپ"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          </div>

          {/* Right / Bottom Side: User Portrait Canvas with Stats inside floating widgets */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="relative w-56 h-56 md:w-64 md:h-64 animate-float"
            >
              {/* Outer Glowing Circle Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-brand-blue to-purple-600 rounded-full animate-spin-slow opacity-60 blur-xs p-[1.5px]">
                <div className="w-full h-full bg-[#050b1a] rounded-full" />
              </div>

              {/* Real Profile Image or High-tech dynamic geometric placeholder */}
              <div className="absolute inset-2 bg-[#0d213f] rounded-full overflow-hidden border border-white/10 shadow-2xl relative">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    className="w-full h-full object-cover grayscale-xs hover:grayscale-0 transition-all duration-500 scale-100 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-2 text-brand-cyan">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] text-gray-300 font-bold">بدون فرتور</span>
                  </div>
                )}
                {/* Overlay vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050b1a]/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Mini statistic floating widget (Projects completed info) */}
              <div className="absolute -bottom-2 -right-4 glass-panel border border-brand-cyan/20 rounded-xl py-2 px-3 flex items-center gap-2 shadow-xl select-none">
                <span className="text-md font-extrabold text-cyan-300 font-mono tracking-tight">+{profile.completedProjectsCount}</span>
                <span className="text-[9px] text-gray-300 font-semibold leading-none">پروژه<br />موفق</span>
              </div>

              {/* Mini experience timeline badge */}
              <div className="absolute -top-1.5 -left-4 glass-panel border border-brand-cyan/20 rounded-xl py-2 px-3 flex items-center gap-2 shadow-xl select-none">
                <span className="text-md font-extrabold text-cyan-300 font-mono tracking-tight">+{profile.experienceYears}</span>
                <span className="text-[9px] text-gray-300 font-semibold leading-none">سال<br />سابقه کار</span>
              </div>
            </motion.div>
          </div>

        </div>
        
        {/* Statistics Metric cards dashboard section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 md:mt-16" style={{ direction: 'rtl' }}>
          <div className="glass-panel border-white/5 rounded-xl p-5 hover:border-brand-cyan/25 transition-all text-center">
            <h3 className="text-2xl font-black text-brand-cyan font-mono">{profile.experienceYears} سال+</h3>
            <p className="text-[11px] text-gray-400 mt-1">تخصص و سابقه کار مفید در صنایع دیجیتال</p>
          </div>
          <div className="glass-panel border-white/5 rounded-xl p-5 hover:border-brand-cyan/25 transition-all text-center">
            <h3 className="text-2xl font-black text-brand-cyan font-mono">{profile.completedProjectsCount} پروژه</h3>
            <p className="text-[11px] text-gray-400 mt-1">تحت‌وب، موبایل و سیستم‌های پردازش پیشرفته</p>
          </div>
          <div className="glass-panel border-white/5 rounded-xl p-5 hover:border-brand-cyan/25 transition-all text-center">
            <h3 className="text-2xl font-black text-brand-cyan font-mono">{profile.satisfiedClientsCount} مشتری</h3>
            <p className="text-[11px] text-gray-400 mt-1">رضایتمندی حداکثری و همکاری بلند مدت</p>
          </div>
        </div>

      </div>
    </section>
  );
}
