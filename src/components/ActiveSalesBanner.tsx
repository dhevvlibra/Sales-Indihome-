import React, { useState } from 'react';
import { ShieldCheck, MessageCircle, Phone, X, Sparkles } from 'lucide-react';
import { useSales } from '../context/SalesContext';
import { formatPhoneNumberDisplay, getWhatsAppUrl } from '../config/whatsapp';

export const ActiveSalesBanner: React.FC = () => {
  const { activeSales, isCustomSalesActive } = useSales();
  const [dismissed, setDismissed] = useState(false);

  // Only display the personalized top referral banner if visitor came via custom sales link or active sales is set
  if (dismissed || !isCustomSalesActive) {
    return null;
  }

  const directWaUrl = getWhatsAppUrl({
    salesPhoneNumber: activeSales.phone,
    salesName: activeSales.name,
    intent: 'general',
    customNote: `Saya membuka website melalui link referral khusus Kak ${activeSales.name}.`,
  });

  return (
    <aside aria-label="Informasi Sales Resmi" className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-b border-red-500/30 px-3 sm:px-6 py-2.5 relative shadow-md z-30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
        
        {/* Left: Rep Info */}
        <div className="flex items-center gap-2.5 text-center sm:text-left flex-wrap justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-black uppercase tracking-wider shrink-0 shadow-xs">
            <ShieldCheck className="w-3 h-3 text-white" />
            <span>Sales Resmi Terverifikasi</span>
          </span>

          <span className="text-slate-200">
            Anda terhubung langsung dengan{' '}
            <strong className="text-white font-black underline decoration-red-500 decoration-2 underline-offset-2">
              {activeSales.name}
            </strong>{' '}
            {activeSales.area ? (
              <span className="text-slate-400 font-medium">({activeSales.area})</span>
            ) : null}
          </span>
        </div>

        {/* Right: Quick Chat CTA & Close Button */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={directWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-[11px] transition-all shadow-sm active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Chat Langsung</span>
          </a>

          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-700/50 transition-colors"
            title="Tutup pemberitahuan"
            aria-label="Tutup"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
