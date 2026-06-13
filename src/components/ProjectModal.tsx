import { motion } from 'motion/react';
import { X, ExternalLink, Github, Calendar, Briefcase, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Mock key features for presentation based on project ID or category
  const getFeatures = (item: Project) => {
    if (item.category === 'ai') {
      return [
        'تحلیل زنده داده‌های بدون ساختار بر پایه هوش مصنوعی',
        'دقت مدل ردیابی خطای زمانی بالاتر از ۹۵ درصد',
        'رابط گرافیکی پیشرفته جهت پردازش موازی داده‌ها',
        'یکپارچه‌سازی و استخراج خودکار گزارش تفصیلی'
      ];
    } else if (item.category === 'cloud' || item.category === 'cybersecurity') {
      return [
        'معماری امن و سبک با حداقل تاخیر تراکنش',
        'مقاومت کامل در برابر حملات تزریق کد و رباتیک',
        'پیمانه‌بندی زیرساخت ابری با قابلیت خوشه‌بندی خودکار',
        'پایش زنده و رصد بسته‌ها با پروتکل پاسخ هماهنگ'
      ];
    } else {
      return [
        'رابط کاربری مدرن با کارایی بالا و انیمیشن‌های نرم',
        'بخش مدیریت پیشرفته جهت دسترسی به تنظیمات پلتفرم',
        'پویایی بومی جهت اجرا روی تمام دستگاه‌های موبایل و دسکتاپ',
        'امنیت انتقال اطلاعات و کدگذاری پیشرفته داده کاربران'
      ];
    }
  };

  const getDifficultyLabel = (difficulty?: string) => {
    switch (difficulty) {
      case 'hard': return 'پیشرفته / چالش‌برانگیز';
      case 'medium': return 'متوسط / کاربردی';
      case 'easy': return 'مقدماتی / ساده';
      default: return 'نامشخص';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-2xl bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        style={{ direction: 'rtl' }}
      >
        {/* Top Accent line */}
        <div className="h-1.5 bg-gradient-to-r from-purple-500 via-fuchsia-400 to-pink-500 shrink-0" />

        {/* Project Premium Cover Header */}
        {project.imageUrl ? (
          <div className="relative h-52 w-full overflow-hidden border-b border-white/10 shrink-0">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/10" />
            
            {/* Absolute close button on the image */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-xl bg-black/50 hover:bg-black/70 text-white/90 hover:text-white backdrop-blur-md transition-all cursor-pointer border border-white/10 z-20"
              title="بستن دیالوگ"
            >
              <X className="w-4 h-4" />
            </button>

            {/* floating details inside cover */}
            <div className="absolute bottom-4 right-6 left-6 flex flex-col gap-0.5 text-white">
              <span className="text-[9px] font-bold text-fuchsia-400 uppercase tracking-widest font-mono">
                {project.category === 'web' ? 'CLOUD ENTERPRISE WEB ENVIRONMENT' : 
                 project.category === 'ai' ? 'COGNITIVE NEURAL AI PROCESSING' : 
                 project.category === 'mobile' ? 'NATIVE RESPONSIVE MOBILE ECOSYSTEM' : 
                 project.category === 'cloud' ? 'DISTRIBUTED CONTAINER INFRASTRUCTURE' : 'HIGH-LEVEL PROTECTION FIREWALL'}
              </span>
              <h3 className="text-base md:text-lg font-black text-white leading-tight mt-1">{project.title}</h3>
              <p className="text-[11px] text-slate-300 opacity-90 font-light mt-1.5">{project.slogan}</p>
            </div>
          </div>
        ) : (
          /* Fallback Header if no cover image */
          <div className="px-6 py-5 border-b border-white/5 flex items-start justify-between bg-slate-900/40">
            <div>
              <h2 className="text-xl font-bold text-white leading-snug mb-1">
                {project.title}
              </h2>
              <p className="text-xs text-purple-400 font-semibold tracking-wide">
                {project.slogan}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Modal Scroll Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              توضیحات و اهداف پروژه
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-light text-justify">
              {project.description}
            </p>
          </div>

          {/* Project Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {project.completionDate && (
              <div className="bg-white/[0.03] p-3 rounded-lg border border-white/5 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400">تاریخ اتمام</p>
                  <p className="text-xs text-white mt-0.5 truncate font-medium">{project.completionDate}</p>
                </div>
              </div>
            )}
            
            {project.clientName && (
              <div className="bg-white/[0.03] p-3 rounded-lg border border-white/5 flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-purple-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400">طرف حساب / کارفرما</p>
                  <p className="text-xs text-white mt-0.5 truncate font-medium">{project.clientName}</p>
                </div>
              </div>
            )}

            <div className="bg-white/[0.03] p-3 rounded-lg border border-white/5 flex items-center gap-3">
              <Award className="w-5 h-5 text-purple-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400">سطح پیچیدگی فنی</p>
                <p className="text-xs text-white mt-0.5 truncate font-medium">{getDifficultyLabel(project.difficulty)}</p>
              </div>
            </div>
          </div>

          {/* Key Achievements */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              دستاوردهای کلیدی و امکانات فنی
            </h4>
            <ul className="space-y-2 text-xs text-slate-350 font-light">
              {getFeatures(project).map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Spec section */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              فناوری‌ها و فریمورک‌های استفاده شده
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-md text-xs font-mono bg-white/[0.03] text-slate-300 border border-white/5 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-slate-900/30 border-t border-white/5 flex items-center gap-3 md:justify-end justify-center">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-white/5 hover:border-white/10 rounded-xl text-xs text-slate-300 hover:text-white bg-white/5 font-medium transition-all cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>مشاهده سورس گیت‌هاب</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:opacity-90 text-xs text-white rounded-xl shadow-md shadow-purple-500/10 font-bold transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>باز کردن نسخه دمو</span>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
