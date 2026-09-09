import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MessageCircle,
  User,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { IndiHomeLogo } from './IndiHomeLogo';
import { useOrderModal } from '../context/OrderContext';
import { useSales } from '../context/SalesContext';
import { getWhatsAppUrl } from '../config/whatsapp';
import { StreamingLogosList } from './StreamingLogos';

interface FormState {
  fullName: string;
  primaryPhone: string;
  backupPhone: string;
  email: string;
  selectedCity: string;
  notes: string;
}

interface FormErrors {
  fullName?: string;
  primaryPhone?: string;
  backupPhone?: string;
  email?: string;
}

export const OrderModal: React.FC = () => {
  const { isModalOpen, selectedPackage, closeOrderModal } = useOrderModal();
  const { activeSales } = useSales();

  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    primaryPhone: '',
    backupPhone: '',
    email: '',
    selectedCity: 'Bandung',
    notes: '',
  });

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedAttempt, setSubmittedAttempt] = useState(false);

  // Reset form when modal opens with new package
  useEffect(() => {
    if (isModalOpen) {
      setSubmittedAttempt(false);
      setTouched({});
      setErrors({});
    }
  }, [isModalOpen, selectedPackage]);

  // Validation function
  const validate = (data: FormState): FormErrors => {
    const errs: FormErrors = {};

    // 1. Validasi Nama Lengkap
    const trimmedName = data.fullName.trim();
    if (!trimmedName) {
      errs.fullName = 'Nama lengkap wajib diisi.';
    } else if (trimmedName.length < 3) {
      errs.fullName = 'Nama terlalu pendek (minimal 3 karakter).';
    }

    // 2. Validasi Nomor HP Utama
    const cleanPrimary = data.primaryPhone.replace(/\D/g, '');
    if (!cleanPrimary) {
      errs.primaryPhone = 'Nomor HP utama wajib diisi.';
    } else if (!cleanPrimary.startsWith('08')) {
      errs.primaryPhone = "Nomor HP utama wajib diawali '08' (contoh: 081234567890).";
    } else if (cleanPrimary.length < 10 || cleanPrimary.length > 14) {
      errs.primaryPhone = `Panjang nomor HP saat ini ${cleanPrimary.length} digit (wajib 10 - 14 digit).`;
    }

    // 3. Validasi Nomor HP Cadangan
    const cleanBackup = data.backupPhone.replace(/\D/g, '');
    if (!cleanBackup) {
      errs.backupPhone = 'Nomor HP cadangan wajib diisi.';
    } else if (!cleanBackup.startsWith('08')) {
      errs.backupPhone = "Nomor HP cadangan wajib diawali '08' (contoh: 085712345678).";
    } else if (cleanBackup.length < 10 || cleanBackup.length > 14) {
      errs.backupPhone = `Panjang nomor cadangan saat ini ${cleanBackup.length} digit (wajib 10 - 14 digit).`;
    } else if (cleanPrimary && cleanBackup === cleanPrimary) {
      errs.backupPhone = 'Nomor HP cadangan tidak boleh sama dengan nomor HP utama.';
    }

    // 4. Validasi Email Aktif (Harus berakhiran @gmail.com)
    const cleanEmail = data.email.trim().toLowerCase();
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!cleanEmail) {
      errs.email = 'Email aktif wajib diisi.';
    } else if (!cleanEmail.endsWith('@gmail.com')) {
      errs.email = 'Email harus berakhiran @gmail.com (contoh: namaanda@gmail.com).';
    } else if (!gmailRegex.test(cleanEmail)) {
      errs.email = 'Format alamat email sebelum @gmail.com tidak valid.';
    }

    return errs;
  };

  // Run validation on every change
  useEffect(() => {
    setErrors(validate(formData));
  }, [formData]);

  if (!isModalOpen || !selectedPackage) return null;

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handlePhoneChange = (field: 'primaryPhone' | 'backupPhone', value: string) => {
    // Only accept numeric digits and trim spaces
    const digitsOnly = value.replace(/\D/g, '').slice(0, 14);
    setFormData((prev) => ({ ...prev, [field]: digitsOnly }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedAttempt(true);
    setTouched({
      fullName: true,
      primaryPhone: true,
      backupPhone: true,
      email: true,
    });

    const currentErrors = validate(formData);
    if (Object.keys(currentErrors).length > 0) {
      // Scroll to first error on mobile
      const firstErrorKey = Object.keys(currentErrors)[0];
      const el = document.getElementById(`input-${firstErrorKey}`);
      el?.focus();
      return;
    }

    // Format WhatsApp message with user data & package details
    const waUrl = getWhatsAppUrl({
      salesPhoneNumber: activeSales.phone,
      salesName: activeSales.name,
      intent: 'package',
      packageName: selectedPackage.packageName,
      speed: selectedPackage.speed,
      price: selectedPackage.price,
      customerName: formData.fullName.trim(),
      primaryPhone: formData.primaryPhone.trim(),
      backupPhone: formData.backupPhone.trim(),
      customerEmail: formData.email.trim().toLowerCase(),
      city: formData.selectedCity,
      address: formData.notes.trim(),
    });

    // Open WhatsApp in a new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    closeOrderModal();
  };

  const isPrimaryPhoneValid =
    formData.primaryPhone.startsWith('08') &&
    formData.primaryPhone.length >= 10 &&
    formData.primaryPhone.length <= 14;

  const isBackupPhoneValid =
    formData.backupPhone.startsWith('08') &&
    formData.backupPhone.length >= 10 &&
    formData.backupPhone.length <= 14 &&
    formData.backupPhone !== formData.primaryPhone;

  const isEmailValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email.trim().toLowerCase());
  const isNameValid = formData.fullName.trim().length >= 3;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop overlay with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeOrderModal}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto z-10 flex flex-col max-h-[92vh]"
        >
          {/* Top Header */}
          <div className="bg-[#0F172A] text-white p-5 sm:p-6 relative shrink-0">
            <button
              onClick={closeOrderModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider border border-red-500/30">
                <Zap className="w-3 h-3 text-[#E0040B]" />
                Formulir Registrasi
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold tracking-wider border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Sales Rekanan: {activeSales.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <IndiHomeLogo className="w-7 h-7 shrink-0" />
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Daftar Pasang WiFi
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Lengkapi data di bawah ini untuk diteruskan langsung ke WhatsApp Sales Resmi IndiHome.
            </p>

            {/* Selected Package Summary Pill */}
            <div className="mt-4 p-3 rounded-2xl bg-slate-800/90 border border-slate-700">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block truncate">
                    Paket Terpilih
                  </span>
                  <h4 className="text-sm font-black text-white truncate">
                    {selectedPackage.packageName}
                  </h4>
                  <div className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                    <span className="font-semibold text-white">{selectedPackage.speed}</span>
                  </div>
                </div>
                <div className="text-right shrink-0 bg-red-600/20 border border-red-500/30 px-3 py-1.5 rounded-xl">
                  <div className="text-[10px] text-red-300 font-bold">Biaya Langganan</div>
                  <div className="text-sm font-black text-white">{selectedPackage.price}</div>
                </div>
              </div>

              {/* Streaming apps indicator if package includes streaming */}
              {(selectedPackage.packageName.toLowerCase().includes('streaming') ||
                selectedPackage.packageName.toLowerCase().includes('telkomsel one') ||
                selectedPackage.packageName.toLowerCase().includes('movie')) && (
                <div className="mt-3 pt-2.5 border-t border-slate-700/80 flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[10px] font-bold text-slate-300">
                    Bonus Streaming Termasuk:
                  </span>
                  <StreamingLogosList
                    apps={
                      selectedPackage.packageName.toLowerCase().includes('movie')
                        ? ['Netflix', 'Vidio', 'Vision+', 'Prime Video', 'Disney+ Hotstar']
                        : selectedPackage.packageName.toLowerCase().includes('telkomsel one')
                        ? ['MaxStream']
                        : ['Vision+', 'Prime Video', 'Viu', 'MaxStream']
                    }
                    size="sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Scrollable Form Body */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4">
            
            {/* Global Error Banner if user tried to submit with errors */}
            {submittedAttempt && Object.keys(errors).length > 0 && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-2.5 text-xs animate-shake">
                <AlertCircle className="w-4 h-4 text-[#E0040B] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Mohon perbaiki format kolom di bawah ini:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px] text-red-600">
                    {errors.fullName && <li>{errors.fullName}</li>}
                    {errors.primaryPhone && <li>{errors.primaryPhone}</li>}
                    {errors.backupPhone && <li>{errors.backupPhone}</li>}
                    {errors.email && <li>{errors.email}</li>}
                  </ul>
                </div>
              </div>
            )}

            {/* 1. Nama Lengkap */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="input-fullName"
                  className="text-xs font-bold text-slate-700 flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Nama Lengkap</span>
                  <span className="text-red-500">*</span>
                </label>
                {touched.fullName && isNameValid && (
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Valid
                  </span>
                )}
              </div>
              <input
                id="input-fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                onBlur={() => handleBlur('fullName')}
                placeholder="Contoh: Budi Santoso"
                className={`w-full px-3.5 py-3 rounded-xl text-base sm:text-sm border transition-all outline-none ${
                  (touched.fullName || submittedAttempt) && errors.fullName
                    ? 'border-red-500 bg-red-50/50 focus:ring-2 focus:ring-red-500/20'
                    : 'border-slate-200 bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                }`}
              />
              {(touched.fullName || submittedAttempt) && errors.fullName && (
                <p className="mt-1 text-[11px] text-red-600 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* 2. No HP Utama */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="input-primaryPhone"
                  className="text-xs font-bold text-slate-700 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>No. HP Utama (WhatsApp)</span>
                  <span className="text-red-500">*</span>
                </label>
                {touched.primaryPhone && isPrimaryPhoneValid && (
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Format Benar
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  id="input-primaryPhone"
                  type="tel"
                  inputMode="numeric"
                  value={formData.primaryPhone}
                  onChange={(e) => handlePhoneChange('primaryPhone', e.target.value)}
                  onBlur={() => handleBlur('primaryPhone')}
                  placeholder="08xxxxxxxxxx (Wajib awalan 08)"
                  className={`w-full px-3.5 py-3 rounded-xl text-base sm:text-sm border transition-all outline-none font-mono ${
                    (touched.primaryPhone || submittedAttempt) && errors.primaryPhone
                      ? 'border-red-500 bg-red-50/50 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-200 bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                  }`}
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                {(touched.primaryPhone || submittedAttempt) && errors.primaryPhone ? (
                  <p className="text-[11px] text-red-600 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.primaryPhone}
                  </p>
                ) : (
                  <p className="text-[10px] text-slate-400">Format wajib: Awalan 08, 10–14 digit angka</p>
                )}
                <span className="text-[10px] text-slate-400 font-mono">
                  {formData.primaryPhone.length}/14
                </span>
              </div>
            </div>

            {/* 3. No HP Cadangan */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="input-backupPhone"
                  className="text-xs font-bold text-slate-700 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>No. HP Cadangan</span>
                  <span className="text-red-500">*</span>
                </label>
                {touched.backupPhone && isBackupPhoneValid && (
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Format Benar
                  </span>
                )}
              </div>
              <input
                id="input-backupPhone"
                type="tel"
                inputMode="numeric"
                value={formData.backupPhone}
                onChange={(e) => handlePhoneChange('backupPhone', e.target.value)}
                onBlur={() => handleBlur('backupPhone')}
                placeholder="08xxxxxxxxxx (Nomor keluarga / cadangan)"
                className={`w-full px-3.5 py-3 rounded-xl text-base sm:text-sm border transition-all outline-none font-mono ${
                  (touched.backupPhone || submittedAttempt) && errors.backupPhone
                    ? 'border-red-500 bg-red-50/50 focus:ring-2 focus:ring-red-500/20'
                    : 'border-slate-200 bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                }`}
              />
              <div className="flex items-center justify-between mt-1">
                {(touched.backupPhone || submittedAttempt) && errors.backupPhone ? (
                  <p className="text-[11px] text-red-600 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.backupPhone}
                  </p>
                ) : (
                  <p className="text-[10px] text-slate-400">Nomor kontak alternatif untuk teknisi lapangan</p>
                )}
                <span className="text-[10px] text-slate-400 font-mono">
                  {formData.backupPhone.length}/14
                </span>
              </div>
            </div>

            {/* 4. Email Aktif (Wajib akhiran @gmail.com) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="input-email"
                  className="text-xs font-bold text-slate-700 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Email Aktif (@gmail.com)</span>
                  <span className="text-red-500">*</span>
                </label>
                {touched.email && isEmailValid && (
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Email Valid
                  </span>
                )}
              </div>
              <input
                id="input-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onBlur={() => handleBlur('email')}
                placeholder="namaanda@gmail.com"
                className={`w-full px-3.5 py-3 rounded-xl text-base sm:text-sm border transition-all outline-none ${
                  (touched.email || submittedAttempt) && errors.email
                    ? 'border-red-500 bg-red-50/50 focus:ring-2 focus:ring-red-500/20'
                    : 'border-slate-200 bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                }`}
              />
              
              {/* Quick Append @gmail.com helper if user hasn't typed it */}
              {!formData.email.includes('@') && formData.email.trim().length > 0 && (
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">Klik cepat akhiran:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, email: `${formData.email.trim()}@gmail.com` })
                    }
                    className="text-[10px] font-bold bg-red-50 text-[#E0040B] hover:bg-red-100 border border-red-200 px-2 py-0.5 rounded-md cursor-pointer transition-colors"
                  >
                    + @gmail.com
                  </button>
                </div>
              )}

              {(touched.email || submittedAttempt) && errors.email ? (
                <p className="mt-1 text-[11px] text-red-600 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.email}
                </p>
              ) : (
                <p className="mt-1 text-[10px] text-slate-400">
                  Wajib akun Google Mail aktif (akhiran <strong>@gmail.com</strong>)
                </p>
              )}
            </div>

            {/* Wilayah Layanan Pemasangan */}
            <div>
              <label
                htmlFor="input-selectedCity"
                className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Wilayah Pemasangan</span>
              </label>
              <select
                id="input-selectedCity"
                value={formData.selectedCity}
                onChange={(e) => setFormData({ ...formData, selectedCity: e.target.value })}
                className="w-full px-3.5 py-3 rounded-xl text-base sm:text-sm border border-slate-200 bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none"
              >
                <option value="Bandung">Kota / Kabupaten Bandung</option>
                <option value="Cimahi">Kota Cimahi</option>
                <option value="Padalarang">Padalarang / Bandung Barat</option>
                <option value="Cianjur">Kabupaten Cianjur</option>
                <option value="Lembang">Lembang</option>
                <option value="Cisarua">Cisarua</option>
                <option value="Sukabumi">Kota / Kabupaten Sukabumi</option>
                <option value="Soreang">Soreang</option>
              </select>
            </div>

            {/* Catatan / Alamat Patokan (Opsional) */}
            <div>
              <label
                htmlFor="input-notes"
                className="text-xs font-bold text-slate-700 block mb-1.5"
              >
                Alamat Singkat / Patokan Rumah (Opsional)
              </label>
              <textarea
                id="input-notes"
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Contoh: Jl. Sukajadi No. 12, dekat Masjid Al-Ikhlas"
                className="w-full px-3.5 py-2.5 rounded-xl text-base sm:text-sm border border-slate-200 bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none resize-none"
              />
            </div>

            {/* Privacy & Guarantee Info */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Data Anda aman, terenkripsi, dan hanya digunakan untuk pendaftaran resmi IndiHome by Telkomsel.
              </span>
            </div>

            {/* Submit CTA Button */}
            <div className="pt-2">
              <button
                id="btn-submit-order-wa"
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20bd5c] text-white py-3.5 px-5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-green-600/25 active:scale-98 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>Kirim Data &amp; Lanjut ke WhatsApp Sales</span>
              </button>
              <p className="text-[10px] text-center text-slate-400 mt-2">
                Pesan WhatsApp akan terisi otomatis dengan data Anda &amp; rincian paket.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
