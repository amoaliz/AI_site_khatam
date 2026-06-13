import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Save, Plus, Edit2, Trash2, X, AlertTriangle, ArrowLeft, RefreshCw, User, Briefcase, Mail, Phone, Link2, Building2, Landmark, Users2, Coins, MapPin, Sparkles } from 'lucide-react';
import { Project, Profile } from '../types';

interface AdminPanelProps {
  profile: Profile;
  projects: Project[];
  onSaveProfile: (profile: Profile) => void;
  onSaveProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onResetToDefaults: () => void;
  onClose: () => void;
}

export default function AdminPanel({
  profile,
  projects,
  onSaveProfile,
  onSaveProject,
  onDeleteProject,
  onResetToDefaults,
  onClose
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'projects'>('profile');
  
  // Profile state
  const [tempProfile, setTempProfile] = useState<Profile>({ ...profile });

  // Project state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Default empty project
  const getEmptyProject = (): Project => ({
    id: Math.random().toString(36).substring(2, 9),
    title: '',
    slogan: '',
    description: '',
    category: 'web',
    technologies: [],
    demoUrl: '',
    githubUrl: '',
    featured: false,
    completionDate: '',
    difficulty: 'medium',
    clientName: '',
    budgetEstimated: ''
  });

  const [projectForm, setProjectForm] = useState<Project>(getEmptyProject());
  const [techInput, setTechInput] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedPromptText, setGeneratedPromptText] = useState('');

  const handleGenerateAiImage = async () => {
    if (!projectForm.title.trim()) {
      alert('لطفاً ابتدا عنوان پروژه را وارد کنید تا تصویر بر اساس آن پردازش و تولید شود.');
      return;
    }

    setIsGeneratingImage(true);
    setGeneratedPromptText('');

    try {
      const response = await fetch('/api/generate-project-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: projectForm.title,
          category: projectForm.category,
        }),
      });

      if (!response.ok) {
        throw new Error('سیستم پاسخ‌دهی هوش مصنوعی با خطا مواجه شد.');
      }

      const data = await response.json();
      if (data.success && data.imageUrl) {
        setProjectForm(prev => ({
          ...prev,
          imageUrl: data.imageUrl,
        }));
        if (data.prompt) {
          setGeneratedPromptText(data.prompt);
        }
        alert(data.isFallback 
          ? 'پیش‌طرح و پرامپت اختصاصی با موفقیت ساخته شد و تصویر الگوی مرتبط متصل گردید.' 
          : 'عملیات با موفقیت انجام شد! تصویر اختصاصی پروژه با موفقیت مدل‌سازی و ذخیره گردید.'
        );
      } else {
        throw new Error(data.error || 'داده نامعتبر از سرور دریافت شد.');
      }
    } catch (error: any) {
      console.error(error);
      alert('خطا در تولید تصویر هوش مصنوعی: ' + (error.message || error));
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Handle Profile Save
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(tempProfile);
    alert('اطلاعات هلدینگ و لایه مدیریتی با موفقیت بروزرسانی شد.');
  };

  // Turn on edit mode for project
  const handleStartEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({ ...project });
    setTechInput(project.technologies.join(', '));
    setIsAddingNew(false);
    setGeneratedPromptText('');
  };

  // Turn on add mode
  const handleStartAddProject = () => {
    setEditingProject(null);
    setProjectForm(getEmptyProject());
    setTechInput('');
    setIsAddingNew(true);
    setGeneratedPromptText('');
  };

  // Save/Update Project
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const list = techInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const updated = {
      ...projectForm,
      technologies: list
    };

    onSaveProject(updated);
    setIsAddingNew(false);
    setEditingProject(null);
    alert(editingProject ? 'اطلاعات پروژه با موفقیت ویرایش شد.' : 'پروژه جدید با موفقیت اضافه شد.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#070111]/90 backdrop-blur-md" onClick={onClose} />

      {/* Admin Panel Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="relative w-full max-w-4xl bg-slate-950/95 backdrop-blur-xl border border-purple-500/15 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] z-10 overflow-hidden"
        style={{ direction: 'rtl' }}
      >
        {/* Banner with controls */}
        <div className="px-6 py-4 bg-slate-950 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <RefreshCw className="w-5 h-5 animate-spin-slow" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-white">پنل کاربری و ساختارهای مدیریتی هلدینگ</h2>
              <p className="text-[10px] text-slate-400">امکان تغییر در زمان واقعی نام هلدینگ، مایلستون‌ها، پرسنل و جزئیات مالی</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs transition-colors cursor-pointer"
          >
            <span>بازگشت به سایت</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/5 bg-slate-950/40 px-6">
          <button
            onClick={() => { setActiveTab('profile'); setIsAddingNew(false); setEditingProject(null); }}
            className={`py-3.5 px-4 text-xs font-bold transition-all relative ${
              activeTab === 'profile' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ویرایش اطلاعات هلدینگ و مشاوران
          </button>
          <button
            onClick={() => { setActiveTab('projects'); }}
            className={`py-3.5 px-4 text-xs font-bold transition-all relative ${
              activeTab === 'projects' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            مدیریت کاتالوگ پروژه‌ها ({projects.length})
          </button>
        </div>

        {/* Scrollable Content Workspace */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSave} className="space-y-6">
              
              {/* Group / Holding Details Divider */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-purple-400 border-r-2 border-purple-500 pr-2">۱. مشخصات کلیدی شناسنامه هلدینگ</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Holding/Parent Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-purple-400" />
                      نام کامل هلدینگ و شرکت مادر
                    </label>
                    <input
                      type="text"
                      required
                      value={tempProfile.holdingName}
                      onChange={e => setTempProfile({ ...tempProfile, holdingName: e.target.value })}
                      className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                    />
                  </div>

                  {/* Holding capital status */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-purple-400" />
                      مجموع سرمایه‌گذاری خطرپذیر گروه (ریال یا تومان)
                    </label>
                    <input
                      type="text"
                      required
                      value={tempProfile.investedCapitalAmount}
                      onChange={e => setTempProfile({ ...tempProfile, investedCapitalAmount: e.target.value })}
                      className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                    />
                  </div>

                  {/* Holding staff numbers */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 flex items-center gap-1">
                      <Users2 className="w-3.5 h-3.5 text-purple-400" />
                      تعداد پرسنل فعال و کارشناسان فنی
                    </label>
                    <input
                      type="number"
                      required
                      value={tempProfile.staffCount}
                      onChange={e => setTempProfile({ ...tempProfile, staffCount: parseInt(e.target.value) || 0 })}
                      className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                    />
                  </div>

                  {/* Holding Slogan */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 flex items-center gap-1">
                      <Landmark className="w-3.5 h-3.5 text-purple-400" />
                      شعار سازمانی و بیانیه ماموریت کوتاه
                    </label>
                    <input
                      type="text"
                      required
                      value={tempProfile.holdingSlogan}
                      onChange={e => setTempProfile({ ...tempProfile, holdingSlogan: e.target.value })}
                      className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    آدرس فیزیکی دفتر مرکزی هلدینگ
                  </label>
                  <input
                    type="text"
                    required
                    value={tempProfile.holdingAddress}
                    onChange={e => setTempProfile({ ...tempProfile, holdingAddress: e.target.value })}
                    className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                  />
                </div>
              </div>

              {/* Developer Team Leader details */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <h3 className="text-xs font-black text-purple-400 border-r-2 border-purple-500 pr-2">۲. مشخصات نماینده پاسخگو و مشاور ارشد</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full name input */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-purple-400" />
                      نام کامل مشاور یا نماینده
                    </label>
                    <input
                      type="text"
                      required
                      value={tempProfile.fullName}
                      onChange={e => setTempProfile({ ...tempProfile, fullName: e.target.value })}
                      className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                    />
                  </div>

                  {/* Developer Title */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                      عنوان و سمت نمایندگی
                    </label>
                    <input
                      type="text"
                      required
                      value={tempProfile.title}
                      onChange={e => setTempProfile({ ...tempProfile, title: e.target.value })}
                      className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-purple-400" />
                      آدرس ایمیل مستقیم هماهنگی
                    </label>
                    <input
                      type="email"
                      required
                      value={tempProfile.email}
                      onChange={e => setTempProfile({ ...tempProfile, email: e.target.value })}
                      className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30 text-left"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-purple-400" />
                      شماره تلفن هماهنگی و واتس‌آپ
                    </label>
                    <input
                      type="text"
                      value={tempProfile.phone || ''}
                      onChange={e => setTempProfile({ ...tempProfile, phone: e.target.value })}
                      className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                      placeholder="+982188775533"
                    />
                  </div>

                  {/* Avatar URL */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 flex items-center gap-1.5">
                      <Link2 className="w-3.5 h-3.5 text-purple-400" />
                      آدرس عکس پرتره مشاور
                    </label>
                    <input
                      type="text"
                      value={tempProfile.avatarUrl}
                      onChange={e => setTempProfile({ ...tempProfile, avatarUrl: e.target.value })}
                      className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                    />
                  </div>

                  {/* Telegram */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 flex items-center gap-1.5">
                      <Link2 className="w-3.5 h-3.5 text-purple-400" />
                      شناسه و لینک تماس تلگرام
                    </label>
                    <input
                      type="text"
                      value={tempProfile.telegramUrl || ''}
                      onChange={e => setTempProfile({ ...tempProfile, telegramUrl: e.target.value })}
                      placeholder="https://t.me/your_handle"
                      className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                    />
                  </div>
                </div>

                {/* Bio area */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400">ماموریت و درباره هلدینگ (خلاصه پیشینه گروه)</label>
                  <textarea
                    rows={4}
                    required
                    value={tempProfile.bio}
                    onChange={e => setTempProfile({ ...tempProfile, bio: e.target.value })}
                    className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl p-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30 resize-none leading-relaxed"
                  />
                </div>
              </div>

              <div className="border-t border-white/5 pt-5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('آیا از ریست کردن تنظیمات به مراجع اولیه اطمینان دارید؟')) {
                      onResetToDefaults();
                      onClose();
                    }
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-xs text-rose-450 hover:text-white bg-rose-500/10 hover:bg-rose-500 rounded-xl transition-all cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>بازنشانی به قالب پیش‌فرض اولیه</span>
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl text-xs text-white font-bold transition-all shadow-lg hover:shadow-purple-500/20 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>ذخیره‌سازی و همگام‌سازی سایت</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              
              {!isAddingNew && !editingProject ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-gray-400">کاتالوگ پروژه‌های فعال هلدینگ</h3>
                    <button
                      onClick={handleStartAddProject}
                      className="flex items-center gap-1.5 px-3 py-2 bg-purple-500/10 hover:bg-purple-500 hover:text-white border border-purple-500/20 text-purple-300 text-xs rounded-xl transition-all font-semibold cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>افزودن پروژه جدید</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {projects.map(project => (
                      <div
                        key={project.id}
                        className="p-4 bg-purple-950/20 border border-white/5 rounded-xl flex items-center justify-between hover:border-purple-500/15 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white">{project.title}</h4>
                            <span className="text-[10px] bg-purple-950/80 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/15">
                              {project.category === 'web' ? 'وب' : 
                               project.category === 'ai' ? 'هوش مصنوعی' : 
                               project.category === 'mobile' ? 'موبایل' : 
                               project.category === 'cloud' ? 'ابری' : 'امنیت'}
                            </span>
                            {project.featured && (
                              <span className="text-[9px] bg-yellow-500/15 text-yellow-300 px-1.5 py-0.2.5 rounded border border-yellow-500/20">ویژه</span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">{project.slogan}</p>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleStartEditProject(project)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-purple-500/20 text-gray-400 hover:text-purple-300 transition-colors cursor-pointer"
                            title="ویرایش پروژه"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`آیا از حذف پروژه "${project.title}" مطمئن هستید؟`)) {
                                onDeleteProject(project.id);
                              }
                            }}
                            className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-colors cursor-pointer"
                            title="حذف پروژه"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Edit & Add Form screen */
                <form onSubmit={handleProjectSubmit} className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="text-xs font-bold text-purple-400">
                      {isAddingNew ? 'تعریف پروژه فناورانه جدید' : `ویرایش مشخصات: ${editingProject?.title}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => { setIsAddingNew(false); setEditingProject(null); }}
                      className="text-xs text-gray-400 hover:text-white"
                    >
                      لغو و بازگشت
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Project Title */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400">عنوان پروژه</label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                        placeholder="مثال: سامانه مانیتورینگ ثریا"
                      />
                    </div>

                    {/* Slogan */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400">شعار یا خلاصه کوتاه پروژه</label>
                      <input
                        type="text"
                        required
                        value={projectForm.slogan}
                        onChange={e => setProjectForm({ ...projectForm, slogan: e.target.value })}
                        className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                        placeholder="یک خط توضیح جذاب..."
                      />
                    </div>

                    {/* Category Selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400">شاخه / دسته‌بندی</label>
                      <select
                        value={projectForm.category}
                        onChange={e => setProjectForm({ ...projectForm, category: e.target.value as any })}
                        className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30 cursor-pointer"
                      >
                        <option value="web">سامانه‌های تحت وب</option>
                        <option value="ai">هوش مصنوعی و داده بالا</option>
                        <option value="mobile">اپلیکیشن موبایل</option>
                        <option value="cloud">رایانش ابری و زیرساخت</option>
                        <option value="cybersecurity">امنیت سایبری</option>
                      </select>
                    </div>

                    {/* Difficulty */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400">سطح پیچیدگی فنی</label>
                      <select
                        value={projectForm.difficulty}
                        onChange={e => setProjectForm({ ...projectForm, difficulty: e.target.value as any })}
                        className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30 cursor-pointer"
                      >
                        <option value="easy">مقدماتی</option>
                        <option value="medium">متوسط</option>
                        <option value="hard">پیشرفته / چالش‌برانگیز</option>
                      </select>
                    </div>

                    {/* Demo URL */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400">لینک نسخه آنلاین (دمو)</label>
                      <input
                        type="url"
                        value={projectForm.demoUrl || ''}
                        onChange={e => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                        className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2 text-xs text-white text-right focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                        placeholder="https://example.com"
                      />
                    </div>

                    {/* Source Code URL */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400">کد منبع گیت‌هاب</label>
                      <input
                        type="url"
                        value={projectForm.githubUrl || ''}
                        onChange={e => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                        className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2 text-xs text-white text-right focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                        placeholder="https://github.com/your-username/repo"
                      />
                    </div>

                    {/* Date */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400">تاریخ اتمام پروژه</label>
                      <input
                        type="text"
                        value={projectForm.completionDate || ''}
                        onChange={e => setProjectForm({ ...projectForm, completionDate: e.target.value })}
                        className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                        placeholder="مثال: اردیبهشت ۱۴۰۳"
                      />
                    </div>

                    {/* Client Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400">کارفرما / سازمان متقاضی</label>
                      <input
                        type="text"
                        value={projectForm.clientName || ''}
                        onChange={e => setProjectForm({ ...projectForm, clientName: e.target.value })}
                        className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                        placeholder="مثال: سازمان ارتباطات ابری"
                      />
                    </div>

                    {/* Image URL, Live Preview & AI Image Generator Option */}
                    <div className="space-y-1.5 md:col-span-2 border-t border-white/5 pt-4 mt-2">
                      <label className="text-xs text-purple-400 flex items-center gap-1.5 mb-1.5 font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        آدرس تصویر پروژه (Image URL) و مدل‌ساز هوشمند تصویر سفارشی
                      </label>
                      
                      <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                        <div className="flex-1 space-y-2.5">
                          <input
                            type="text"
                            value={projectForm.imageUrl || ''}
                            onChange={e => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                            className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2 text-xs text-white text-left focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                            placeholder="آدرس عکس یا داده پایه base64"
                          />
                          
                          <button
                            type="button"
                            disabled={isGeneratingImage}
                            onClick={handleGenerateAiImage}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 hover:from-purple-500/20 hover:to-fuchsia-500/20 border border-purple-500/20 text-purple-300 text-xs rounded-xl transition-all cursor-pointer font-bold ${
                              isGeneratingImage ? 'opacity-60 cursor-not-allowed' : ''
                            }`}
                          >
                            {isGeneratingImage ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                                <span>در حال تحلیل پروژه و شبیه‌سازی مدل تصویر با هوش مصنوعی...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4 text-purple-400" />
                                <span>تولید خودکار تصویر منحصر‌به‌فرد پروژه با هوش مصنوعی</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Interactive Preview Frame */}
                        {projectForm.imageUrl && (
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-purple-500/20 bg-slate-900 flex-shrink-0 relative group">
                            <img
                              src={projectForm.imageUrl}
                              alt="پیش‌نویس تصویر پروژه"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-[9px] text-purple-300 font-mono tracking-wider font-bold">PREVIEW</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Display prompt constructed by model */}
                      {generatedPromptText && (
                        <div className="mt-3 p-3 bg-purple-950/20 border border-purple-500/10 rounded-xl space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-450" />
                            <span className="text-[10px] text-purple-400 font-bold">پرامپت خلاقانه نگارش‌شده توسط هوش مصنوعی:</span>
                          </div>
                          <p className="text-[10px] text-slate-300 font-mono leading-relaxed select-all pl-1 rtl:text-left" style={{ direction: 'ltr' }}>
                            {generatedPromptText}
                          </p>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Tech specs separated by comma */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400">فناوری‌های بکار گرفته‌شده (جداشده با کامای انگلیسی ",")</label>
                    <input
                      type="text"
                      required
                      value={techInput}
                      onChange={e => setTechInput(e.target.value)}
                      className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                      placeholder="React, Docker, WebSockets, Python"
                    />
                  </div>

                  {/* Full detailed description */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400">شرح عمیق چالش‌ها و مشخصات فنی پروژه</label>
                    <textarea
                      rows={4}
                      required
                      value={projectForm.description}
                      onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="w-full bg-purple-950/20 border border-white/5 focus:border-purple-500/50 rounded-xl p-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/30 resize-none leading-relaxed"
                    />
                  </div>

                  {/* Featured checkbox */}
                  <div className="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={projectForm.featured}
                      onChange={e => setProjectForm({ ...projectForm, featured: e.target.checked })}
                      className="accent-purple-500 rounded cursor-pointer w-4 h-4"
                    />
                    <label htmlFor="featured" className="text-xs text-gray-300 select-none cursor-pointer">
                      این پروژه را به عنوان ویژه یا برگزیده (Featured) معرفی کن و در بالای لیست قرار بده.
                    </label>
                  </div>

                  <div className="border-t border-white/5 pt-4 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => { setIsAddingNew(false); setEditingProject(null); }}
                      className="px-4 py-2 text-xs text-gray-400 hover:text-white"
                    >
                      انصراف
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl text-xs text-white font-bold transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>ثبت تغییرات پروژه</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
