import React from 'react';
import { PhoneCall, MapPin, MessageCircle, ShieldAlert, CheckCircle2, Lock } from 'lucide-react';
import { IndiHomeLogo } from './IndiHomeLogo';
import { getWhatsAppUrl, formatPhoneNumberDisplay } from '../config/whatsapp';
import { useSales } from '../context/SalesContext';
import { useAppNavigation, PageId } from '../navigation';

export const Footer: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { activeSales } = useSales();

  const salesDisplayName = activeSales.name ? activeSales.name.split('(')[0].trim() : 'Sales Resmi';
  const footerWaMessage = [
    `Halo Kak ${salesDisplayName} (Sales Resmi IndiHome),`,
    `Saya tertarik untuk pasang WiFi IndiHome. Apakah boleh saya tanya lebih lanjut?`,
  ].join('\n');

  const navLinks: { label: string; page: PageId; anchorId?: string }[] = [
    { label: 'Beranda', page: 'home' },
    { label: 'Paket Internet & Telkomsel One', page: 'paket' },
    { label: 'Cek Coverage ODP Fiber', page: 'cek-area' },
    { label: 'Keunggulan Layanan Resmi', page: 'keunggulan' },
    { label: 'Tahapan & Cara Pasang', page: 'cara-pasang' },
    { label: 'Ulasan / Testimoni Pelanggan', page: 'testimoni' },
    { label: 'Tanya Jawab (FAQ)', page: 'faq' },
  ];

  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-24 md:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Rep Info */}
          <div className="lg:col-span-5 space-y-4">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 text-left cursor-pointer group"
            >
              <div className="w-11 h-11 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <IndiHomeLogo className="w-11 h-11" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">
                  IndiHome <span className="text-[#E0040B]">by Telkomsel</span>
                </span>
                <p className="text-xs text-slate-400">
                  Layanan Pemasangan WiFi Resmi Jawa Barat
                </p>
              </div>
            </button>

            <p className="text-xs text-slate-400 leading-relaxed">
              Website ini dikelola oleh <strong className="text-slate-200">Mitra Sales Representative Mandiri Resmi</strong> yang melayani registrasi, pengecekan coverage ODP, dan pendaftaran pasang baru WiFi IndiHome by Telkomsel tanpa antre untuk area Bandung, Cimahi, Padalarang, Cianjur, Lembang, Cisarua, Sukabumi, dan Soreang.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Konsultan Sales: <strong className="text-white">{activeSales.name}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: <strong>{formatPhoneNumberDisplay(activeSales.phone)}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span>Wilayah Layanan: {activeSales.area || 'Bandung, Cimahi & Sekitarnya'}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigateTo(link.page, link.anchorId)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Coverage Scope & Direct CTA */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Wilayah Jangkauan Resmi
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['Bandung', 'Cimahi', 'Padalarang', 'Cianjur', 'Lembang', 'Cisarua', 'Sukabumi', 'Soreang'].map((loc) => (
                <span key={loc} className="px-2.5 py-1 rounded-md bg-slate-800 text-[11px] text-slate-300 font-medium">
                  {loc}
                </span>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-white block uppercase tracking-wider">Butuh Bantuan Segera?</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Punya pertanyaan atau ingin cek ketersediaan slot ODP di depan rumah sekarang?
              </p>
              <a
                id="footer-chat-wa"
                href={getWhatsAppUrl({
                  salesPhoneNumber: activeSales.phone,
                  salesName: activeSales.name,
                  customMessage: footerWaMessage,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Chat Sales ({activeSales.name})</span>
              </a>
            </div>
          </div>

        </div>

        {/* Security / Fraud Notice */}
        <div className="py-6 border-b border-slate-800">
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start gap-3 text-xs text-slate-400">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200 block mb-0.5">Peringatan Keamanan Transaksi:</strong>
              Seluruh pembayaran tagihan pemasangan resmi WiFi IndiHome by Telkomsel HANYA dilakukan melalui saluran pembayaran resmi Telkomsel (Aplikasi MyTelkomsel, Virtual Account Bank BCA/Mandiri/BRI/BNI, atau gerai resmi Alfamart/Indomaret). Jangan pernah menyerahkan uang tunai di muka kepada sales rep atau teknisi di lapangan.
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            &copy; {new Date().getFullYear()} Layanan WiFi IndiHome by Telkomsel. Seluruh merek dagang dan logo IndiHome dan Telkomsel adalah hak cipta PT Telkom Indonesia (Persero) Tbk.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Halaman Sales Representative Mandiri Resmi.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
