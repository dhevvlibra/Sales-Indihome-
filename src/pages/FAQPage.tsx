import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useAppNavigation } from '../navigation';
import { FAQ_DATA } from '../data/faq';
import {
  ChevronDown,
  Search,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  CreditCard,
  Wifi,
  Clock,
} from 'lucide-react';
import { getWhatsAppUrl } from '../config/whatsapp';
import { useSales } from '../context/SalesContext';
import { motion, AnimatePresence } from 'motion/react';

export const FAQPage: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { activeSales } = useSales();
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Pemasangan', 'Biaya', 'Teknis & Perangkat'];

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'Semua' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Subpage Header */}
      <PageHeader
        currentPageTitle="FAQ"
        badge="Pusat Bantuan & Tanya Jawab"
        title="Pertanyaan yang Sering"
        highlightedText="Diajukan Calon Pelanggan"
        description="Semua jawaban yang Anda perlukan mengenai teknis pemasangan, sistem penagihan resmi, perangkat modem WiFi, serta jaminan transparansi dari sales resmi."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        
        {/* Quick Search & Category Filters */}
        <div className="mb-10 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan... (contoh: KTP, jadwal pasang, bayar, FUP)"
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Reset
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0F172A] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordions List */}
        <div className="space-y-3 mb-12">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-colors bg-white hover:border-slate-300 shadow-2xs"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left py-4 px-5 sm:px-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      {faq.category && (
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-100 text-slate-600">
                          {faq.category}
                        </span>
                      )}
                      <span className="leading-snug">{faq.question}</span>
                    </div>
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
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700">Pertanyaan tidak ditemukan</p>
              <p className="text-xs text-slate-400 mt-1">
                Coba gunakan kata kunci lain atau tanyakan langsung ke Sales kami.
              </p>
            </div>
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#E0040B] block mb-1">
              Sales Fast Response
            </span>
            <h4 className="font-bold text-slate-900 text-base sm:text-lg">
              Punya Pertanyaan Spesifik yang Belum Terjawab?
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-md">
              Sales kami siap melayani konsultasi langsung via WhatsApp perihal ketersediaan ODP, status jaringan, atau rekomendasi paket.
            </p>
          </div>
          <a
            href={getWhatsAppUrl({
              salesPhoneNumber: activeSales.phone,
              salesName: activeSales.name,
              intent: 'consultation',
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all active:scale-95 shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Tanya Langsung ke Sales</span>
          </a>
        </div>

      </div>
    </div>
  );
};
