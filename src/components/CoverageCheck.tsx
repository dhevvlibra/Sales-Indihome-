import React, { useState } from 'react';
import {
  MapPin,
  Send,
  CheckCircle2,
  Building,
  Navigation,
  MessageCircle,
  Sparkles,
  Info,
} from 'lucide-react';
import { GENERAL_REGIONS } from '../data/coverage';
import { getWhatsAppUrl } from '../config/whatsapp';
import { useSales } from '../context/SalesContext';

export const CoverageCheck: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Bandung');
  const [districtInput, setDistrictInput] = useState<string>('');
  const [addressDetail, setAddressDetail] = useState<string>('');
  const { activeSales } = useSales();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetUrl = getWhatsAppUrl({
      salesPhoneNumber: activeSales.phone,
      salesName: activeSales.name,
      intent: 'coverage',
      city: selectedCity,
      district: districtInput.trim() || undefined,
      address: addressDetail.trim() || undefined,
    });
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="cek-area" className="py-16 md:py-24 bg-[#0F172A] text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-[10px] font-bold uppercase tracking-widest mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Pengecekan Jaringan Fiber Optik</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Cek Jangkauan WiFi di Wilayah Anda
          </h2>
          <p className="mt-3 text-slate-400 text-xs sm:text-sm leading-relaxed">
            Pilih wilayah tempat tinggal Anda, lalu sebutkan nama daerah atau jalan rumah Anda. Sales resmi kami akan langsung mengecek ketersediaan tiang ODP (Optical Distribution Point) terdekat via WhatsApp!
          </p>
        </div>

        {/* Interactive Form Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            
            {/* Step 1: Select General Region (8 Wilayah) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  1. Pilih Wilayah Utama
                </label>
                <span className="text-[11px] text-slate-400">
                  Terpilih: <strong className="text-red-400 font-bold">{selectedCity}</strong>
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {GENERAL_REGIONS.map((region) => {
                  const isSelected = selectedCity === region.name;
                  return (
                    <button
                      type="button"
                      key={region.id}
                      onClick={() => setSelectedCity(region.name)}
                      className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-bold text-center border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-[#E0040B] border-red-500 text-white shadow-md shadow-red-600/30 ring-2 ring-red-400/40'
                          : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white'
                      }`}
                    >
                      <span>{region.name}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Input Specific Area/District & Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="district-input"
                  className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"
                >
                  2. Nama Daerah / Kelurahan / Kecamatan <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <input
                    id="district-input"
                    type="text"
                    required
                    placeholder={`Ketik nama daerah/kelurahan di ${selectedCity}...`}
                    value={districtInput}
                    onChange={(e) => setDistrictInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address-input"
                  className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"
                >
                  3. Nama Jalan / Komplek / Patokan (Opsional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building className="w-4 h-4" />
                  </div>
                  <input
                    id="address-input"
                    type="text"
                    placeholder="Contoh: Jl. Sukamulya No. 4, Dekat SDN 1 / Indomaret"
                    value={addressDetail}
                    onChange={(e) => setAddressDetail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Explanatory Info Notice */}
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3 text-xs text-slate-300">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Pengecekan nomor tiang ODP (Optical Distribution Point) dan ketersediaan port fiber optik di daerah <strong className="text-white">{selectedCity}</strong> akan dicek secara langsung dan akurat oleh Sales kami saat chat WhatsApp dimulai.
              </p>
            </div>

            {/* Submit Action Button */}
            <div className="pt-3 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Format pesan coverage disiapkan otomatis, langsung terhubung ke sales</span>
              </div>

              <button
                id="btn-submit-coverage-wa"
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Cek Daerah Saya via WhatsApp</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Trust Guarantees on Coverage */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 text-xs text-slate-300">
            <span className="font-bold text-white block text-sm mb-0.5">Tiang ODP Terpadat</span>
            Didukung jaringan kabel fiber optik terluas di Jawa Barat
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 text-xs text-slate-300">
            <span className="font-bold text-white block text-sm mb-0.5">Audit Lapangan Cepat</span>
            Jika slot penuh, sales bantu cari alternatif tiang terdekat
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 text-xs text-slate-300">
            <span className="font-bold text-white block text-sm mb-0.5">Bebas Konsultasi</span>
            Cek coverage &amp; konsultasi paket langsung bersama sales resmi
          </div>
        </div>

      </div>
    </section>
  );
};
