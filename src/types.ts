export type PackageCategory = 'all' | 'internet-streaming' | 'telkomsel-one' | 'gaming' | 'movie';

export interface PackageItem {
  id: string;
  name: string;
  provider: 'IndiHome by Telkomsel';
  category: 'internet-streaming' | 'telkomsel-one' | 'gaming' | 'movie';
  categoryLabel: string;
  speedMbps: number; // Base speed
  upspeedMbps: number; // Upspeed result
  upspeedDuration: string; // e.g., '3 Bulan', '6 Bulan', '1 Tahun'
  monthlyPrice: number;
  formattedPrice: string;
  priceNote?: string;
  kuotaKeluarga?: '30 GB' | '50 GB';
  includedApps?: string[];
  idealFor: string;
  deviceRecommendation: string;
  isBestSeller?: boolean;
  tag?: string;
  perks: string[];
  ctaMessage: string;
}

export interface TelkomselOneTier {
  id: string;
  name: string;
  speedMbps: number;
  upspeedMbps: number;
  upspeedDuration: string;
  idealFor: string;
  deviceRecommendation: string;
  isBestSeller?: boolean;
  tag?: string;
  includedApps: string[];
  options: {
    '30 GB': {
      monthlyPrice: number;
      formattedPrice: string;
      ctaMessage: string;
    };
    '50 GB': {
      monthlyPrice: number;
      formattedPrice: string;
      ctaMessage: string;
    };
  };
  perks: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  city: 'Bandung' | 'Cimahi' | 'Padalarang' | 'Cianjur' | 'Lembang' | 'Cisarua' | 'Sukabumi' | 'Soreang';
  packageChosen: string;
  rating: number;
  comment: string;
  dateText: string;
  verified: boolean;
}

export interface HowItWorksStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  actionText?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: 'Pemasangan' | 'Biaya' | 'Teknis & Perangkat';
}

export interface CoverageAreaOption {
  city: string;
  districts: string[];
}

export interface SalesAgent {
  id: string;
  slug: string; // e.g. 'rian', 'budi', 'siti' (clean url slug)
  name: string; // e.g. 'Rian', 'Budi Pratama'
  phone: string; // international normalized format: '6282116505311'
  displayPhone?: string; // e.g. '0821-1650-5311'
  area?: string; // e.g. 'Bandung Kota & Cimahi'
  roleTitle?: string; // e.g. 'Sales Resmi IndiHome'
  isDefault?: boolean;
  isActive?: boolean;
  createdAt: number;
}

