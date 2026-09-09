import React from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle2, MapPin, Quote, Sparkles, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonials';

// Helper to get clean initials skipping common honorifics
const getCustomerInitials = (name: string): string => {
  const clean = name.replace(/^(Bpk\.|Ibu|Kang|Teh|Hj\.)\s*/i, '').trim();
  const words = clean.split(' ').filter(Boolean);
  if (words.length === 0) return name.slice(0, 2).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).replace(/\*/g, '').toUpperCase() || 'PL';
  return (words[0][0] + words[1][0]).toUpperCase();
};

export const Testimonials: React.FC = () => {
  return (
    <section id="testimoni" className="py-16 md:py-24 bg-[#F8FAFC] border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#E0040B] text-[10px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3 text-[#E0040B]" />
            <span>Kepuasan Pelanggan Asli</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Cerita Pelanggan di Bandung &amp; Sekitarnya
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed">
            Bukti nyata pemasangan cepat dan pelayanan ramah langsung dari warga yang telah menikmati internet rumah stabil.
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[11px] font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Privasi Terjaga • Sebagian karakter nama disamarkan</span>
          </div>
        </div>

        {/* 3 Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between relative"
            >
              {/* Quote Mark Accent */}
              <div className="absolute top-6 right-6 text-slate-200 pointer-events-none">
                <Quote className="w-7 h-7 rotate-180" />
              </div>

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3 text-yellow-400 text-xs">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400" />
                  ))}
                  <span className="text-[11px] font-bold text-slate-700 ml-1">5.0</span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-5">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Customer Profile & Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                  {getCustomerInitials(t.name)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{t.name}</h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin className="w-3 h-3 text-[#E0040B]" />
                    <span>{t.location}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-medium">
                    Paket: {t.packageChosen}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
