export interface GeneralRegion {
  id: string;
  name: string;
  badge?: string;
}

export const GENERAL_REGIONS: GeneralRegion[] = [
  { id: 'bandung', name: 'Bandung', badge: 'Terpadat' },
  { id: 'cimahi', name: 'Cimahi', badge: 'Aktif' },
  { id: 'padalarang', name: 'Padalarang', badge: 'Aktif' },
  { id: 'cianjur', name: 'Cianjur', badge: 'Aktif' },
  { id: 'lembang', name: 'Lembang', badge: 'Aktif' },
  { id: 'cisarua', name: 'Cisarua', badge: 'Aktif' },
  { id: 'sukabumi', name: 'Sukabumi', badge: 'Aktif' },
  { id: 'soreang', name: 'Soreang', badge: 'Aktif' },
];

export const GENERAL_REGION_NAMES = [
  'Bandung',
  'Cimahi',
  'Padalarang',
  'Cianjur',
  'Lembang',
  'Cisarua',
  'Sukabumi',
  'Soreang',
] as const;

export type GeneralRegionName = typeof GENERAL_REGION_NAMES[number];

