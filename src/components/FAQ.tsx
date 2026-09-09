import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/faq';
import { getWhatsAppUrl } from '../config/whatsapp';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#E0040B] text-[10px] font-bold uppercase tracking-widest mb-3">
            <HelpCircle className="w-3 h-3" />
            <span>Pertanyaan yang Sering Diajukan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Tanya Jawab Seputar Pemasangan
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed">
            Segala hal penting yang perlu Anda ketahui sebelum memasang WiFi IndiHome by Telkomsel di rumah.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors bg-white hover:border-slate-300 shadow-2xs"
              >
                <button
                  id={`faq-btn-${faq.id}`}
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left py-4 px-5 sm:px-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm focus:outline-none"
                >
                  <span className="leading-snug">{faq.question}</span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-red-50 text-[#E0040B] rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-10 p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
              Punya Pertanyaan Lain yang Belum Terjawab?
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Sales kami siap menjawab langsung via WhatsApp, respon cepat dan ramah!
            </p>
          </div>
          <a
            id="faq-wa-help"
            href={getWhatsAppUrl({ intent: 'consultation' })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-xs shrink-0 transition-colors active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white text-[#25D366]" />
            <span>Tanya Langsung ke Sales</span>
          </a>
        </div>

      </div>
    </section>
  );
};
