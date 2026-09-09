import { SalesAgent } from '../types';

/**
 * WhatsApp Integration Configuration & Multi-Sales Management
 * ============================================================
 */
export const WHATSAPP_CONFIG = {
  // Default WhatsApp Phone Number (Fallback)
  phoneNumber: '6282116505311',
  salesRepName: 'Rian (Sales Resmi IndiHome by Telkomsel)',
  serviceAreas: [
    'Bandung',
    'Cimahi',
    'Padalarang',
    'Cianjur',
    'Lembang',
    'Cisarua',
    'Sukabumi',
    'Soreang',
  ],
  workingHours: 'Setiap Hari: 07.00 - 22.00 WIB (Fast Response)',
};

/**
 * Data Tim Sales Bawaan / Default
 */
export const DEFAULT_SALES_AGENTS: SalesAgent[] = [
  {
    id: 'sales-rian',
    slug: 'rian',
    name: 'Rian',
    phone: '6282116505311',
    displayPhone: '0821-1650-5311',
    area: 'Bandung, Cimahi, Padalarang & Sekitarnya',
    roleTitle: 'Konsultan Sales Resmi IndiHome by Telkomsel',
    isDefault: true,
    isActive: true,
    createdAt: 1700000000000,
  },
];

/**
 * Helper to normalize any phone number format (08xxx, +62xxx, 62xxx) into WhatsApp standard '628xxx'
 */
export function normalizePhoneNumber(rawNumber: string): string {
  if (!rawNumber) return WHATSAPP_CONFIG.phoneNumber;
  let cleaned = rawNumber.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  } else if (cleaned.startsWith('8')) {
    cleaned = '62' + cleaned;
  }
  return cleaned;
}

/**
 * Format nomor telpon untuk tampilan UI yang nyaman dibaca
 * Contoh: 6281223344556 -> 0812-2334-4556
 */
export function formatPhoneNumberDisplay(rawNumber: string): string {
  if (!rawNumber) return '0821-1650-5311';
  let cleaned = rawNumber.replace(/\D/g, '');
  if (cleaned.startsWith('62')) {
    cleaned = '0' + cleaned.slice(2);
  }
  if (cleaned.length >= 10) {
    return cleaned.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3');
  }
  return cleaned;
}

/**
 * Parameter untuk membuat tautan WhatsApp yang rapi dan terformat otomatis
 */
export interface WhatsAppMessageParams {
  intent?: 'general' | 'package' | 'coverage' | 'consultation';
  packageName?: string;
  speed?: string;
  price?: string;
  city?: string;
  district?: string;
  subDistrict?: string;
  address?: string;
  customNote?: string;
  customerName?: string;
  primaryPhone?: string;
  backupPhone?: string;
  customerEmail?: string;
  // Specific sales recipient overrides
  salesPhoneNumber?: string;
  salesName?: string;
  salesSlug?: string;
}

/**
 * Helper function global untuk menghasilkan URL redirect WhatsApp
 * Contoh output: https://wa.me/6281223344556?text=Halo%20Kak%20Budi...
 */
export function getWhatsAppUrl(params: WhatsAppMessageParams = {}): string {
  const {
    intent = 'general',
    packageName,
    speed,
    price,
    city,
    district,
    subDistrict,
    address,
    customNote,
    customerName,
    primaryPhone,
    backupPhone,
    customerEmail,
    salesPhoneNumber,
    salesName,
  } = params;

  // Tentukan nomor tujuan (sales aktif atau fallback default)
  const targetPhone = normalizePhoneNumber(salesPhoneNumber || WHATSAPP_CONFIG.phoneNumber);
  const targetName = salesName ? salesName.split('(')[0].trim() : 'Sales Resmi';

  let messageLines: string[] = [];

  if (intent === 'package' && packageName) {
    const detailLokasi = (address || customNote || '').trim();
    const wilayahStr = city ? city.trim() : '-';
    const wilayahDetailLine = detailLokasi
      ? `• Wilayah: ${wilayahStr}  Detail Lokasi: ${detailLokasi}`
      : `• Wilayah: ${wilayahStr}  Detail Lokasi: -`;

    messageLines = [
      `Halo Kak ${targetName},`,
      `Saya ingin mendaftar pemasangan WiFi IndiHome:`,
      ``,
      `🗒️*DATA CALON PELANGGAN:*`,
      `• Nama Lengkap: ${customerName ? customerName.trim() : '-'}`,
      `• No. HP Utama: ${primaryPhone ? primaryPhone.trim() : '-'}`,
      `• No. HP Cadangan: ${backupPhone ? backupPhone.trim() : '-'}`,
      `• Email Aktif: ${customerEmail ? customerEmail.trim() : '-'}`,
      ``,
      `📦*PAKET YANG DIPILIH:*`,
      `• Paket: ${packageName}`,
      speed ? `• Kecepatan: ${speed}` : '',
      price ? `• Harga: ${price}` : '',
      wilayahDetailLine,
      ``,
      `Mohon bantu proses registrasi dan cek jadwal teknisinya ya Kak. Terima kasih!`,
    ].filter((line) => line !== '');
  } else if (intent === 'coverage') {
    const locParts = [
      city ? `Wilayah: ${city}` : '',
      district ? `Daerah / Lokasi: ${district}` : '',
      subDistrict ? `Kelurahan/Desa: ${subDistrict}` : '',
      address ? `Detail Alamat / Patokan: ${address}` : '',
    ].filter(Boolean);

    messageLines = [
      `Halo Kak ${targetName} (Sales Resmi IndiHome),`,
      ``,
      `Saya ingin *Cek Coverage Area (Ketersediaan Jaringan Fiber & Slot ODP)* untuk pasang WiFi:`,
      ``,
      ...locParts.map((line) => `📍 ${line}`),
      ``,
      `Apakah lokasi rumah/daerah saya tersebut sudah ada jaringan fiber aktif dan slot ODP kosong? Mohon bantu cek ya, terima kasih!`,
    ];
  } else if (intent === 'consultation') {
    messageLines = [
      `Halo Kak ${targetName} (Sales Resmi IndiHome),`,
      ``,
      `Saya ingin konsultasi rekomendasi paket WiFi yang paling pas untuk kebutuhan rumah & keluarga saya.`,
      city ? `Lokasi saya di area: ${city}` : `Area Bandung, Cimahi, Sukabumi / Sekitarnya`,
      ``,
      `Bisa bantu info proses dan estimasi pemasangan untuk lokasi saya? Terima kasih.`,
    ];
  } else {
    // General
    messageLines = [
      `Halo Kak ${targetName} (Sales Resmi IndiHome),`,
      ``,
      `Saya ingin tanya info pemasangan baru WiFi IndiHome by Telkomsel untuk area Bandung, Cimahi, Padalarang, Cianjur, Lembang, Cisarua, Sukabumi, dan sekitarnya.`,
      ``,
      `Bisa bantu info promo terbaru dan cek ketersediaan jaringan di rumah saya? Terima kasih.`,
    ];
  }

  // Tambahkan catatan tambahan jika ada (kecuali package yang sudah diformat rapi di atas)
  if (customNote && intent !== 'package') {
    messageLines.push(``, `Catatan tambahan: ${customNote}`);
  }

  const fullText = messageLines.join('\n');
  const encodedText = encodeURIComponent(fullText);

  return `https://wa.me/${targetPhone}?text=${encodedText}`;
}
