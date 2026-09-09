import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/whatsapp';
import { useSales } from '../context/SalesContext';

export const FloatingWhatsApp: React.FC = () => {
  const { activeSales } = useSales();

  const waUrl = getWhatsAppUrl({
    salesPhoneNumber: activeSales.phone,
    salesName: activeSales.name,
    intent: 'general',
    customNote: `Halo Kak ${activeSales.name}, saya mau tanya paket WiFi dan cek coverage di daerah saya.`,
  });

  return (
    <aside aria-label="WhatsApp Bantuan" className="fixed bottom-5 right-4 sm:right-6 z-50">
      {/* Main Circular Floating WhatsApp Button */}
      <a
        id="floating-whatsapp-widget"
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl shadow-green-600/35 hover:shadow-2xl hover:shadow-green-600/50 transition-all duration-200 transform hover:scale-110 active:scale-95"
        title={`Hubungi ${activeSales.name} via WhatsApp`}
        aria-label={`Hubungi ${activeSales.name} via WhatsApp`}
      >
        {/* Pulsing Online Ping Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/25 animate-ping pointer-events-none" />

        {/* Small Active Online Indicator Badge */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white"></span>
        </span>

        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      </a>
    </aside>
  );
};
