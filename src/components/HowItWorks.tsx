import React from 'react';
import { motion } from 'motion/react';
import { Search, FileCheck, Wifi, ArrowRight, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { getWhatsAppUrl } from '../config/whatsapp';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Pilih Paket & Cek Alamat',
      desc: 'Pilih paket yang Anda butuhkan (Internet Streaming, Telkomsel One, Game, atau Movie). Kirimkan detail alamat atau share lokasi rumah Anda via WhatsApp untuk pengecekan box ODP terdekat.',
      icon: Search,
      badge: 'Langkah Awal',
      duration: '5 Menit',
    },
    {
      step: '02',
      title: 'Registrasi & Upload Data Berkas',
      desc: 'Kirimkan data pendaftaran (Foto KTP dan nomor kontak/WhatsApp aktif). Sales kami memproses registrasi resmi ke sistem IndiHome by Telkomsel secara instan tanpa antre.',
      icon: FileCheck,
      badge: 'Praktis via WA',
      duration: '10 Menit',
    },
    {
      step: '03',
      title: 'Pilih Jadwal Pasang (3x24 Jam)',
      desc: 'Setelah upload data diverifikasi, Anda bebas memilih jadwal kedatangan teknisi resmi dalam rentang 3x24 jam kerja. Teknisi pasang modem dan internet langsung aktif!',
      icon: Wifi,
      badge: 'Rentang 3x24 Jam',
      duration: 'Jadwal Fleksibel',
    },
  ];

  return (
    <section id="cara-pasang" className="py-16 md:py-24 bg-[#F8FAFC] border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#E0040B] text-[10px] font-bold uppercase tracking-widest mb-3">
            <Clock className="w-3 h-3" />
            <span>Alur Pemasangan Mudah &amp; Cepat</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Cara Pasang Internet Rumah Tanpa Ribet
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed">
            Hanya 3 langkah praktis dari smartphone Anda. Tidak perlu repot datang dan mengantre di kantor Plaza Telkom atau GraPARI!
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                {/* Step Number Background Accent */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 text-[#E0040B] flex items-center justify-center font-bold">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="w-6 h-6 bg-slate-900 text-white rounded-md text-xs font-black flex items-center justify-center">
                    {idx + 1}
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{item.duration}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">{item.badge}</span>
                  <span className="text-[#E0040B] font-bold flex items-center gap-0.5 text-[10px] uppercase tracking-wider">
                    Step {item.step} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner in How It Works */}
        <div className="mt-10 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">
                Siap Dibantu dari Awal Sampai Internet Nyala?
              </h4>
              <p className="text-xs text-slate-500">
                Konsultasikan kebutuhan Anda langsung dengan Sales Representative resmi hari ini.
              </p>
            </div>
          </div>

          <a
            id="howitworks-cta-wa"
            href={getWhatsAppUrl({ intent: 'general' })}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-sm transition-all active:scale-95 shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
            <span>Mulai Pendaftaran via WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
