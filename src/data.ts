import { Project, Profile, CategoryInfo, Milestone, Executive, FAQItem } from './types';

export const CATEGORIES: CategoryInfo[] = [
  { key: 'all', label: 'همه بخش‌ها و پروزه‌ها', icon: 'Cpu' },
  { key: 'web', label: 'سامانه‌های ابری تحت وب', icon: 'Globe' },
  { key: 'ai', label: 'هوش مصنوعی و کلان‌داده', icon: 'BrainCircuit' },
  { key: 'mobile', label: 'فناوری‌های نوین و موبایل', icon: 'Smartphone' },
  { key: 'cloud', label: 'زیرساخت ابری و دیتاسنتر', icon: 'Cloud' },
  { key: 'cybersecurity', label: 'امنیت زیست‌بوم دیجیتال', icon: 'Shield' }
];

export const INITIAL_PROFILE: Profile = {
  fullName: 'مهندس آراد بهرامی',
  title: 'مدیر ارشد فناوری و عضو هیئت مدیره هلدینگ',
  bio: 'راهبر ارشد برنامه‌ریزی‌های استراتژیک، معماری‌های پربازده نرم‌افزاری و مشاور جذب سرمایه در صنایع دیجیتال با بیش از یک دهه هدایت تیم‌های چندملیتی مهاجرت ابری و سیستم‌های کلان‌داده هوشمند.',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop',
  resumeUrl: '#',
  email: 'a.bahrami@ariatholdings.com',
  phone: '+982188775533',
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
  telegramUrl: 'https://t.me/aria_holdings_consultant',
  whatsappUrl: 'https://wa.me/989123456789',
  experienceYears: 12,
  completedProjectsCount: 45,
  satisfiedClientsCount: 28,
  holdingName: 'گروه شرکت‌های همکار و هلدینگ فناوری آریا پایتخت',
  holdingSlogan: 'هم‌افزایی نخبگان نواندیش، پایداری زیرساخت‌های ملی، سرمایه‌گذاری خطرپذیر آینده‌ساز',
  holdingAddress: 'تهران، پارک فناوری پردیس، خیابان نوآوری سوم، مجتمع فناوری آریا',
  staffCount: 140,
  investedCapitalAmount: '۴۸۰ میلیارد ریال'
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'h-1',
    title: 'سامانه آموزش مجازی هوشمند و مدیریت یادگیری (LMS)',
    slogan: 'کلاس‌های مجازی زنده، آزمون‌ساز هوش مصنوعی، داشبورد جامع معلمان و پایش بلادرنگ پیشرفت تحصیلی.',
    description: 'این پلتفرم مدرن برای مدیریت سراسری فرآیندهای یادگیری تحصیلی و دانشگاهی ابداع شده است. استفاده از معماری میکروسرویس ابری کلاسترهای موازی پایداری کلاس‌های زنده بالای ۱۰ هزار کاربر همزمان را برآورد می‌کند. ماژول اختصاصی هوش مصنوعی در این برنامه با اسکن رفتار یادگیرنده، مسیر یادگیری اختصاصی و تمرین‌های مکمل اتوماتیک توصیه می‌سازد.',
    category: 'web',
    technologies: ['React 19', 'Express JS', 'Node.js', 'Socket.io', 'MongoDB', 'Redis Node', 'TailwindCSS'],
    demoUrl: 'https://lms-intelligent.aria.demo',
    githubUrl: 'https://github.com/aria-holdings/intelligent-lms-core',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    completionDate: 'مهر ۱۴۰۲',
    difficulty: 'medium',
    clientName: 'سازمان مدیریت و برنامه‌ریزی آموزشی کشور',
    budgetEstimated: '۹.۵ میلیارد تومان'
  },
  {
    id: 'h-2',
    title: 'سامانه پردازش ابری و تشخیص خودکار پلاک خودرو',
    slogan: 'پایش و استخراج بلادرنگ شماره پلاک انواع خودروها با پردازش تصاویر هوشمند و نرخ دقت ۹۹.۸٪.',
    description: 'ابزار پیشرفته پردازش تصویر برای خوانش خودکار و پرسرعت شماره پلاک خودروها در شرایط نوری گوناگون و سرعت‌های بیش از ۱۶۰ کیلومتر بر ساعت. این پلتفرم از تلفیق معماری خوشه‌های پردازنده گرافیکی (GPU) با فریمورک YOLOv8 بهره می‌برد که خروجی متادیتا را به طور آنی در کمتر از ۱۵ میلی‌ثانیه به سرورهای دیتابیس هلدینگ ارسال می‌کند.',
    category: 'ai',
    technologies: ['FastAPI', 'PyTorch', 'YOLOv8', 'OpenCV', 'Next.js', 'PostgreSQL Pool', 'Docker'],
    demoUrl: 'https://plate-recognizer.aria.demo',
    imageUrl: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    completionDate: 'اسفند ۱۴۰۲',
    difficulty: 'hard',
    clientName: 'پلیس راهنمایی و رانندگی و شهرداری‌ها',
    budgetEstimated: '۱۴ میلیارد تومان'
  },
  {
    id: 'h-3',
    title: 'سیستم ردیابی هوشمند خودرو و ناوبری توزیع‌شده',
    slogan: 'ردیابی ماهواره‌ای آنی موقعیت جغرافیایی خودروها با تحلیل الگوهای مصرف سوخت و شتاب‌سنج سه‌محوره.',
    description: 'سامانه ردیابی ناوگان با قابلیت مدیریت ترافیک، مسیریابی بهینه مصرف سوخت، ثبت وقایع مکان‌محور (Geofencing) و اتصال مستقیم به سخت‌افزارهای ره‌گیری ماهواره‌ای. این برنامه با سیستم مانیتورینگ بلادرنگ سوکت کانون‌های رفتاری را ذخیره کرده و گزارش‌های ترافیکی را با تحلیل سری‌های زمانی آماده می‌نماید.',
    category: 'mobile',
    technologies: ['React Native', 'Kotlin', 'Go (Golang)', 'TimescaleDB', 'Redis', 'Leaflet Map', 'TailwindCSS'],
    demoUrl: 'https://smart-tracker.aria.demo',
    githubUrl: 'https://github.com/aria-holdings/smart-gps-tracker',
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    completionDate: 'اردیبهشت ۱۴۰۳',
    difficulty: 'medium',
    clientName: 'شرکت لجستیک و حمل‌ونقل تندبار البرز',
    budgetEstimated: '۸.۲ میلیارد تومان'
  },
  {
    id: 'h-4',
    title: 'سامانه هوش مصنوعی برای خلاصه‌سازی تصاویر و متون بزرگ',
    slogan: 'تلخیص بسیار سریع متون بزرگ و فاکتور چاپی در کنار بازخوانی کامل نمودارها و تصاویر چندوجهی.',
    description: 'ابرپروژه مجهز به ترنسفورمرهای تحلیل زبان طبیعی (NLP) و شبکه‌های پیشرفته بینایی ماشین (Computer Vision) جهت استخراج خودکار چکیده مفاهیم از پی‌دی‌اف‌های حجیم سازمانی، گزارش‌های مالی و تحلیل المان‌های تصویر. پشتیبانی کامل از زبان‌های فارسی و انگلیسی با موتور تبدیل تصویر به متن متمرکز بر مدل‌های عمیق چندوجهی (Multi-Modal LLMs).',
    category: 'ai',
    technologies: ['React 19', 'Python', 'FastAPI', 'PyTorch Multi-Modal', 'Gemini API Pro', 'PostgreSQL', 'TailwindCSS'],
    githubUrl: 'https://github.com/aria-holdings/ai-text-image-summarizer',
    imageUrl: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    completionDate: 'خرداد ۱۴۰۳',
    difficulty: 'hard',
    clientName: 'سازمان اسناد و مدارک نوین کشور',
    budgetEstimated: '۱۱.۵ میلیارد تومان'
  }
];

export const INITIAL_MILESTONES: Milestone[] = [
  {
    id: 'm-1',
    year: '۱۳۹۷',
    title: 'تاسیس هسته نوآور هلدینگ و تجمیع نخبگان',
    description: 'راه‌اندازی اولیه شرکت آریا پایتخت با تمرکز بر خدمات نوین توسعه وب و سامانه‌های پر ترافیک بانکی با تیمی متشکل از ۱۰ متخصص ارشد دانشگاه‌های معتبر کشور.',
    iconType: 'growth'
  },
  {
    id: 'm-2',
    year: '۱۳۹۹',
    title: 'سرمایه‌گذاری در هوش مصنوعی و کلان داده',
    description: 'گسترش بازوی تحقیق و توسعه R&D و ورود جدی به حوزه پیش‌بینی فرآیندهای مالی و پردازش تصاویر ژنتیکی با سرمایه اولیه ۲۰۰ میلیارد ریالی.',
    iconType: 'technology'
  },
  {
    id: 'm-3',
    year: '۱۴۰۱',
    title: 'دستیابی به رکورد مانیتورینگ ابری یکپارچه ملی',
    description: 'پیاده‌سازی موفق سامانه ثریا برای سازمان ابری کشور و کسب تاییدیه‌های امنیتی تراز اول ملی در پدافند غیرعامل.',
    iconType: 'award'
  },
  {
    id: 'm-4',
    year: '۱۴۰۳',
    title: 'ثبت برند بین‌المللی و جذب سرمایه مرحله دوم',
    description: 'ارتقای ساختار سرمایه‌ای هلدینگ به ۴۸۰ میلیارد ریال با جذب منابع از صندوق سرمایه‌گذاری چند ملیتی نوآفرین.',
    iconType: 'partnership'
  }
];

export const INITIAL_EXECUTIVES: Executive[] = [
  {
    id: 'e-1',
    name: 'دکتر علیرضا ترابی',
    role: 'رئیس هیئت مدیره و موسس هلدینگ',
    biography: 'دانش‌آموخته پسا دکتری کلان داده از دانشگاه صنعتی شریف، با بیش از ۱۵ سال تجربه مدیریت صندوق‌های مالی ریسک‌پذیر نوآوری و عضو دائم انجمن بلاکچین ایران.',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&auto=format&fit=crop',
    linkedinUrl: 'https://linkedin.com'
  },
  {
    id: 'e-2',
    name: 'مهندس سارا جلالی',
    role: 'مدیر ارشد عملیات و توسعه سرمایه انسانی',
    biography: 'پژوهشگر ارشد مدیریت فناوری اطلاعات، عهده‌دار سازماندهی مجامع دانش‌بنیان، جذب نخبگان بین‌المللی و بهینه‌سازی زنجیره ارتباطی شرکت‌های اقماری آریا.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop',
    linkedinUrl: 'https://linkedin.com'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'f-1',
    question: 'ساختار مالکیت معنوی (IP) پروژه‌هایی که هلدینگ توسعه می‌دهد به چه صورت است؟',
    answer: 'بر اساس مفاد موافقت‌نامه‌های همکار، مالکیت معنوی به تناسب حجم سرمایه‌گذاری نقدی و فنی تقسیم شده و در پروژه‌های سفارشی، پس از تسویه نهایی، انتقال کامل مالکیت سورس‌کد و پتنت طبق قرارداد رسمی تحویل خریدار محترم می‌شود.',
    category: 'حقوقی والزامات'
  },
  {
    id: 'f-2',
    question: 'آیا امکان سرمایه‌گذاری خطرپذیر هلدینگ وجود دارد؟',
    answer: 'بله. گروه شرکت‌های آریا سالانه بخشی از بودجه انباشته خود را به عنوان شتاب‌دهنده فناوری از طریق صندوق جسورانه به استارتاپ‌های نوپا در زمینه‌های هوش مصنوعی مولد، زنجیره بلوکی فراملی و خدمات ابری اختصاص می‌دهد.',
    category: 'سرمایه گذاری'
  },
  {
    id: 'f-3',
    question: 'سطح پشتیبانی و پایداری (SLA) سیستم‌های ابری دیتاسنتر ارائه شده چگونه تضمین می‌شود؟',
    answer: 'تمامی سامانه‌های سازمانی زیر نظر پدافند غیرعامل و مانیتورینگ هوش مصنوعی ثریا قرار دارند. ما تضمین کتبی ۹۹.۹٪ آپ‌تایم را با بازپرداخت جریمه در صورت بروز قطعی به مشتریان VIP تقدیم می‌داریم.',
    category: 'فنی وپشتیبانی'
  }
];
