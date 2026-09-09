import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  UserPlus,
  Link as LinkIcon,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Phone,
  MapPin,
  Trash2,
  Edit3,
  ShieldCheck,
  Lock,
  Unlock,
  Key,
  ArrowLeft,
  Star,
  AlertCircle,
  Sparkles,
  Share2,
  RefreshCw,
  Eye,
} from 'lucide-react';
import { useSales, sanitizeSlug, RESERVED_SLUGS } from '../context/SalesContext';
import { SalesAgent } from '../types';
import { formatPhoneNumberDisplay, normalizePhoneNumber } from '../config/whatsapp';
import { useAppNavigation } from '../navigation';
import { IndiHomeLogo } from '../components/IndiHomeLogo';

const PIN_STORAGE_KEY = 'indihome_admin_pin';

export const AdminSalesPage: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const {
    salesList,
    addSales,
    updateSales,
    deleteSales,
    setDefaultSales,
    formatShareUrl,
    formatSalesShareMessage,
    resetToDefaults,
    setActiveSalesBySlug,
  } = useSales();

  // PIN Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check if session authenticated
    return sessionStorage.getItem('indihome_admin_unlocked') === 'true';
  });
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [changePinModalOpen, setChangePinModalOpen] = useState<boolean>(false);
  const [currentPinInput, setCurrentPinInput] = useState<string>('');
  const [newPinInput, setNewPinInput] = useState<string>('');

  // Toast / Copy notification state
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State for Add / Edit
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState<string>('');
  const [formPhone, setFormPhone] = useState<string>('');
  const [formSlug, setFormSlug] = useState<string>('');
  const [formArea, setFormArea] = useState<string>('');
  const [formIsDefault, setFormIsDefault] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Share Message Modal State
  const [shareAgent, setShareAgent] = useState<SalesAgent | null>(null);

  // Get current stored PIN or fallback to '1234'
  const getStoredPin = (): string => {
    return localStorage.getItem(PIN_STORAGE_KEY) || '1234';
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getStoredPin();
    if (pinInput.trim() === correctPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem('indihome_admin_unlocked', 'true');
      setPinError('');
      setPinInput('');
    } else {
      setPinError('PIN keamanan salah. Silakan coba lagi.');
    }
  };

  const handleLock = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('indihome_admin_unlocked');
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getStoredPin();
    if (currentPinInput !== correctPin) {
      alert('PIN lama yang Anda masukkan salah.');
      return;
    }
    if (newPinInput.length < 4) {
      alert('PIN baru minimal 4 karakter / angka.');
      return;
    }
    localStorage.setItem(PIN_STORAGE_KEY, newPinInput);
    alert('PIN keamanan berhasil diperbarui!');
    setChangePinModalOpen(false);
    setCurrentPinInput('');
    setNewPinInput('');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopy = (text: string, id: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      showToast(`${label} berhasil disalin ke clipboard!`);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleNameChange = (val: string) => {
    setFormName(val);
    if (!isEditing && !formSlug) {
      setFormSlug(sanitizeSlug(val));
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormName('');
    setFormPhone('');
    setFormSlug('');
    setFormArea('');
    setFormIsDefault(false);
    setFormError('');
    setShowAddForm(false);
  };

  const startEdit = (agent: SalesAgent) => {
    setIsEditing(true);
    setEditingId(agent.id);
    setFormName(agent.name);
    setFormPhone(agent.phone);
    setFormSlug(agent.slug);
    setFormArea(agent.area || '');
    setFormIsDefault(Boolean(agent.isDefault));
    setFormError('');
    setShowAddForm(true);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formName.trim()) {
      setFormError('Nama sales wajib diisi.');
      return;
    }

    const normalizedPhone = normalizePhoneNumber(formPhone);
    if (normalizedPhone.length < 9) {
      setFormError('Nomor WhatsApp tidak valid. Masukkan nomor HP aktif.');
      return;
    }

    const cleanSlug = sanitizeSlug(formSlug || formName);
    if (!cleanSlug) {
      setFormError('Slug link tidak boleh kosong.');
      return;
    }

    if (RESERVED_SLUGS.has(cleanSlug)) {
      setFormError(`Slug "${cleanSlug}" tidak dapat digunakan karena merupakan rute sistem. Gunakan slug lain.`);
      return;
    }

    if (isEditing && editingId) {
      const res = updateSales(editingId, {
        name: formName.trim(),
        phone: normalizedPhone,
        slug: cleanSlug,
        area: formArea.trim() || 'Bandung & Sekitarnya',
        isDefault: formIsDefault,
      });

      if (!res.success) {
        setFormError(res.message || 'Gagal memperbarui sales.');
        return;
      }

      showToast(`Sales "${formName}" berhasil diperbarui!`);
      resetForm();
    } else {
      const res = addSales({
        name: formName.trim(),
        phone: normalizedPhone,
        slug: cleanSlug,
        area: formArea.trim() || 'Bandung & Sekitarnya',
        isDefault: formIsDefault,
      });

      if (!res.success) {
        setFormError(res.message || 'Gagal menambahkan sales.');
        return;
      }

      showToast(`Sales "${formName}" berhasil ditambahkan dengan link /${cleanSlug}!`);
      resetForm();
    }
  };

  const handleDelete = (agent: SalesAgent) => {
    const confirmDelete = window.confirm(
      `Apakah Anda yakin ingin menghapus sales "${agent.name}" (link: /${agent.slug})?`
    );
    if (confirmDelete) {
      const res = deleteSales(agent.id);
      if (res.success) {
        showToast(`Sales "${agent.name}" berhasil dihapus.`);
      } else {
        alert(res.message || 'Gagal menghapus sales.');
      }
    }
  };

  // 1. PIN Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-slate-100">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-200 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-[#E0040B] flex items-center justify-center mx-auto mb-5 shadow-sm border border-red-100">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Portal Kelola Tim Sales
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 mb-6">
            Halaman khusus pemilik untuk menambah, mengedit, atau menghapus link domain khusus sales.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-left">
                Masukkan PIN Keamanan
              </label>
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError('');
                }}
                placeholder="••••••••"
                autoFocus
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-center font-black text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-[#E0040B] focus:border-transparent transition-all"
              />
              {pinError && (
                <p className="text-xs text-red-600 font-semibold mt-2 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {pinError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#E0040B] hover:bg-[#B90006] text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/20 active:scale-95 transition-all cursor-pointer"
            >
              Buka Panel Sales
            </button>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-center text-xs text-slate-400">
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className="inline-flex items-center gap-1.5 hover:text-slate-700 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Website</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 2. Main Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-bold border border-slate-700"
          >
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Lihat Website</span>
            </button>
            <div className="h-5 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <IndiHomeLogo className="w-6 h-6" />
              <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                Kelola Tim Sales IndiHome
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setChangePinModalOpen(true)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
              title="Ubah PIN Keamanan"
            >
              <Key className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline">Ubah PIN</span>
            </button>

            <button
              onClick={handleLock}
              className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              title="Kunci Halaman"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Kunci</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Banner Overview */}
        <div className="bg-gradient-to-br from-slate-900 via-[#1E293B] to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden mb-8 border border-slate-800">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-3 border border-red-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Multi-Sales Referral Routing Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Sistem Domain Pribadi Untuk Tiap Sales
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Setiap kali Anda menambahkan sales di sini, sistem otomatis membuat link khusus seperti{' '}
              <span className="text-amber-400 font-mono font-bold bg-slate-800/80 px-2 py-0.5 rounded">
                websiteanda.com/namasales
              </span>
              . Saat calon pelanggan membuka link tersebut, seluruh tombol pendaftaran & chat WhatsApp otomatis tersambung ke nomor HP sales tersebut.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-800/80">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <span className="text-xs text-slate-400 block font-medium">Total Sales Aktif</span>
              <span className="text-2xl font-black text-white mt-1 block">
                {salesList.length} Personel
              </span>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <span className="text-xs text-slate-400 block font-medium">Sales Default Kantor</span>
              <span className="text-base sm:text-lg font-black text-emerald-400 mt-1 block truncate">
                {salesList.find((s) => s.isDefault)?.name || 'Rian'}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Format Link</span>
                <span className="text-xs font-mono font-bold text-amber-300 mt-1 block truncate">
                  /{'{slug}'}
                </span>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setShowAddForm(true);
                }}
                className="px-3.5 py-2 bg-[#E0040B] hover:bg-[#B90006] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Tambah</span>
              </button>
            </div>
          </div>
        </div>

        {/* Add / Edit Form Modal or Accordion */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-red-500/40 relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      {isEditing ? 'Edit Data Sales' : 'Tambah Sales Baru'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isEditing
                        ? 'Perbarui identitas, nomor WhatsApp, atau slug link sales.'
                        : 'Sistem akan langsung mengaktifkan link /namasales secara otomatis.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-slate-400 hover:text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Batal
                  </button>
                </div>

                {formError && (
                  <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nama Sales */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Nama Lengkap Sales <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="Contoh: Budi Pratama"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E0040B] focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Nomor WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Nomor WhatsApp Sales <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="Contoh: 081234567890 atau 6281234567890"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E0040B] focus:border-transparent transition-all"
                      />
                      {formPhone && (
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          Format WhatsApp: <strong className="text-emerald-700 font-mono">{normalizePhoneNumber(formPhone)}</strong> ({formatPhoneNumberDisplay(formPhone)})
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Custom Slug */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Slug / Link Khusus <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center">
                        <span className="px-3.5 py-3 rounded-l-xl bg-slate-100 border border-r-0 border-slate-300 text-xs font-bold text-slate-500 font-mono">
                          /
                        </span>
                        <input
                          type="text"
                          required
                          value={formSlug}
                          onChange={(e) => setFormSlug(sanitizeSlug(e.target.value))}
                          placeholder="budi"
                          className="w-full px-4 py-3 rounded-r-xl border border-slate-300 text-sm font-mono font-bold text-red-600 focus:outline-none focus:ring-2 focus:ring-[#E0040B] focus:border-transparent transition-all"
                        />
                      </div>
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Preview Link: <strong className="text-slate-900 font-mono">{formatShareUrl(formSlug || 'namasales')}</strong>
                      </span>
                    </div>

                    {/* Wilayah Tugas / Area */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Wilayah Tugas / Kota
                      </label>
                      <input
                        type="text"
                        value={formArea}
                        onChange={(e) => setFormArea(e.target.value)}
                        placeholder="Contoh: Bandung Timur & Ujungberung"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E0040B] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Is Default Checkbox */}
                  <div className="pt-2">
                    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formIsDefault}
                        onChange={(e) => setFormIsDefault(e.target.checked)}
                        className="w-4 h-4 text-[#E0040B] rounded border-slate-300 focus:ring-red-500 cursor-pointer"
                      />
                      <span className="text-xs font-bold text-slate-800">
                        Jadikan sebagai Sales Default Utama Kantor
                      </span>
                    </label>
                    <p className="text-[11px] text-slate-500 ml-6">
                      (Jika dicentang, pengunjung yang membuka website tanpa link sales akan diarahkan ke nomor ini)
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#E0040B] hover:bg-[#B90006] text-white font-black text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      {isEditing ? 'Simpan Perubahan' : 'Tambah Sales Sekarang'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sales List Table & Cards */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Users className="w-5 h-5 text-red-600" />
                Daftar Sales & Tautan Domain ({salesList.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Klik tombol "Salin Link" untuk membagikan link ke masing-masing sales.
              </p>
            </div>

            {!showAddForm && (
              <button
                onClick={() => {
                  resetForm();
                  setShowAddForm(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E0040B] hover:bg-[#B90006] text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Tambah Sales Baru</span>
              </button>
            )}
          </div>

          {/* List of Sales Cards */}
          <div className="divide-y divide-slate-100">
            {salesList.map((agent) => {
              const fullLink = formatShareUrl(agent.slug);
              const isDefault = Boolean(agent.isDefault);

              return (
                <div
                  key={agent.id}
                  className="p-5 sm:p-6 hover:bg-slate-50/80 transition-colors flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5"
                >
                  {/* Left: Agent Info */}
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm border border-slate-800">
                      {agent.name.slice(0, 2).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-black text-slate-900 tracking-tight">
                          {agent.name}
                        </h4>
                        {isDefault && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                            <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                            <span>Default Kantor</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-slate-700 font-semibold">
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                          <span>{formatPhoneNumberDisplay(agent.phone)}</span>
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1 text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{agent.area || 'Jawa Barat'}</span>
                        </span>
                      </div>

                      {/* The Magic Link Pill */}
                      <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 max-w-full overflow-hidden">
                        <LinkIcon className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span className="truncate font-bold text-slate-900">{fullLink}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto justify-end w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    {/* Copy Link */}
                    <button
                      onClick={() => handleCopy(fullLink, agent.id, `Link sales ${agent.name}`)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                        copiedId === agent.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#0F172A] hover:bg-slate-800 text-white'
                      }`}
                      title="Salin Link Khusus Sales"
                    >
                      {copiedId === agent.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Link</span>
                        </>
                      )}
                    </button>

                    {/* Preview Website for this sales */}
                    <button
                      onClick={() => {
                        setActiveSalesBySlug(agent.slug);
                        if (typeof window !== 'undefined') {
                          try {
                            window.history.pushState(null, '', `/${agent.slug}`);
                          } catch {}
                        }
                        navigateTo('home');
                      }}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Lihat langsung tampilan website versi sales ini"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-600" />
                      <span>Tes Buka</span>
                    </button>

                    <a
                      href={`/${agent.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 inline-flex items-center justify-center transition-colors"
                      title={`Buka /${agent.slug} di tab baru`}
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </a>

                    {/* Share Text Template */}
                    <button
                      onClick={() => setShareAgent(agent)}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-red-50 hover:bg-red-100 text-[#E0040B] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Lihat & Salin Template Chat WA untuk Sales"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Kirim ke Sales</span>
                    </button>

                    {/* Set As Default if not yet */}
                    {!isDefault && (
                      <button
                        onClick={() => {
                          setDefaultSales(agent.id);
                          showToast(`"${agent.name}" sekarang dijadikan Sales Default Kantor.`);
                        }}
                        className="px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                        title="Jadikan Sales Default"
                      >
                        Set Default
                      </button>
                    )}

                    {/* Edit */}
                    <button
                      onClick={() => startEdit(agent)}
                      className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Edit Data Sales"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(agent)}
                      disabled={salesList.length <= 1}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Hapus Sales"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructions / Tips Box */}
        <div className="mt-8 bg-blue-50/70 rounded-3xl p-6 border border-blue-200/80 text-xs sm:text-sm text-blue-900 space-y-2.5">
          <h4 className="font-black text-blue-950 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            Panduan Penggunaan Sistem Multi-Sales:
          </h4>
          <ul className="list-disc pl-5 space-y-1.5 text-blue-800 leading-relaxed text-xs">
            <li>
              <strong>Penyebaran Link:</strong> Berikan link <code className="bg-blue-100 px-1 py-0.5 rounded font-mono">websiteanda.com/namasales</code> ke sales masing-masing. Mereka bisa membagikannya di bio Instagram, TikTok, Facebook, atau WhatsApp Story.
            </li>
            <li>
              <strong>Anti Tertukar:</strong> Begitu calon pembeli membuka link tersebut, sistem akan mengunci identitas sales tersebut selama sesi browsing, sehingga tombol order WiFi tidak akan tertukar ke sales lain.
            </li>
            <li>
              <strong>Pengunjung Umum:</strong> Jika seseorang membuka langsung domain utama tanpa nama sales (contoh: <code className="bg-blue-100 px-1 py-0.5 rounded font-mono">websiteanda.com</code>), sistem otomatis menghubungkannya ke <strong>Sales Default Kantor</strong>.
            </li>
            <li>
              <strong>Kerahasiaan Admin:</strong> Simpan halaman ini atau akses melalui tautan <code className="bg-blue-100 px-1 py-0.5 rounded font-mono">/admin</code> dengan PIN rahasia Anda.
            </li>
          </ul>
        </div>

      </div>

      {/* Share Modal Dialog */}
      <AnimatePresence>
        {shareAgent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-black text-base sm:text-lg text-slate-900 tracking-tight flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-red-600" />
                  Kirim Link ke {shareAgent.name}
                </h3>
                <button
                  onClick={() => setShareAgent(null)}
                  className="text-slate-400 hover:text-slate-700 text-xs font-bold p-1 rounded-lg hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-500 mb-3">
                Salin teks di bawah ini lalu kirimkan langsung via WhatsApp ke nomor{' '}
                <strong>{formatPhoneNumberDisplay(shareAgent.phone)}</strong>:
              </p>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto mb-4">
                {formatSalesShareMessage(shareAgent)}
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setShareAgent(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    handleCopy(
                      formatSalesShareMessage(shareAgent),
                      'modal-share',
                      'Template pesan WA untuk sales'
                    );
                    setShareAgent(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>Salin Pesan WhatsApp</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Change PIN Modal */}
      <AnimatePresence>
        {changePinModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200"
            >
              <h3 className="font-black text-lg text-slate-900 tracking-tight mb-2">
                Ubah PIN Keamanan Admin
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                PIN ini digunakan untuk membuka halaman kelola tim sales ini.
              </p>

              <form onSubmit={handleChangePin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    PIN Lama
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPinInput}
                    onChange={(e) => setCurrentPinInput(e.target.value)}
                    placeholder="Masukkan PIN saat ini"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E0040B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    PIN Baru (Minimal 4 Angka)
                  </label>
                  <input
                    type="password"
                    required
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    placeholder="Masukkan PIN baru"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E0040B]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setChangePinModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#E0040B] hover:bg-[#B90006] text-white font-black text-xs uppercase tracking-wider shadow-md cursor-pointer"
                  >
                    Simpan PIN Baru
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
