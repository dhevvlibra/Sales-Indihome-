import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useAppNavigation, PageId } from '../navigation';

interface PageHeaderProps {
  badge: string;
  title: string;
  highlightedText?: string;
  description: string;
  currentPageTitle: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  highlightedText,
  description,
  currentPageTitle,
}) => {
  const { navigateTo } = useAppNavigation();

  return (
    <div className="bg-[#0F172A] text-white py-12 md:py-16 border-b border-slate-800 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-white transition-colors flex items-center gap-1 font-medium"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Beranda</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-red-400 font-semibold">{currentPageTitle}</span>
        </nav>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-[10px] font-bold uppercase tracking-widest mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
          {badge}
        </div>

        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-3xl leading-tight">
          {title}{' '}
          {highlightedText && (
            <span className="text-[#E0040B]">{highlightedText}</span>
          )}
        </h1>

        {/* Description */}
        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
