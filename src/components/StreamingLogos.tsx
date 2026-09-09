import React, { useState } from 'react';

export type StreamingAppName =
  | 'Vision+'
  | 'Prime Video'
  | 'Viu'
  | 'MaxStream'
  | 'Netflix'
  | 'Vidio'
  | 'Disney+ Hotstar'
  | string;

interface StreamingLogoProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Official streaming logo image sources:
 * - Maxstream (trimmed & zoomed)
 * - Prime Video (trimmed & zoomed)
 * - Vision+ (reconstructed full V with clean left breathing room)
 * - Viu (high-res official PNG)
 */
export const OFFICIAL_STREAMING_IMAGES = {
  maxstream: {
    local: '/images/streaming/maxstream.jpg',
    cdn: 'https://cdn.phototourl.com/free/2026-09-09-eaf40b5a-8d5e-4adb-b292-3802bc693900.jpg',
    alt: 'MAXstream TV',
  },
  primeVideo: {
    local: '/images/streaming/prime-video.png',
    cdn: 'https://cdn.phototourl.com/free/2026-09-09-15ec1238-3687-4f8b-bb0d-8872e677c0ca.png',
    alt: 'Prime Video',
  },
  visionPlus: {
    local: '/images/streaming/vision-plus.png',
    cdn: 'https://cdn.phototourl.com/free/2026-09-09-93e0565f-dfbd-488f-a960-63a83675103b.png',
    alt: 'Vision+',
  },
  viu: {
    local: '/images/streaming/viu.png',
    cdn: 'https://cdn.phototourl.com/free/2026-09-09-1a477939-b420-4c12-a1f3-9f23fa668840.png',
    alt: 'Viu',
  },
};

/**
 * Resilient Image component that attempts local file first, then CDN URL
 */
const OfficialLogoImg: React.FC<{
  localSrc: string;
  cdnSrc: string;
  alt: string;
  className?: string;
  fallbackComponent?: React.ReactNode;
}> = ({ localSrc, cdnSrc, alt, className = 'h-5', fallbackComponent }) => {
  const [imgSrc, setImgSrc] = useState<string>(localSrc);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (imgSrc === localSrc) {
      setImgSrc(cdnSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError && fallbackComponent) {
    return <>{fallbackComponent}</>;
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={handleError}
      className={`${className} w-auto object-contain select-none`}
      loading="eager"
    />
  );
};

export const MaxStreamLogo: React.FC<{ className?: string }> = ({ className = 'h-6.5' }) => (
  <OfficialLogoImg
    localSrc={OFFICIAL_STREAMING_IMAGES.maxstream.local}
    cdnSrc={OFFICIAL_STREAMING_IMAGES.maxstream.cdn}
    alt={OFFICIAL_STREAMING_IMAGES.maxstream.alt}
    className={className}
  />
);

export const PrimeVideoLogo: React.FC<{ className?: string }> = ({ className = 'h-5.5' }) => (
  <OfficialLogoImg
    localSrc={OFFICIAL_STREAMING_IMAGES.primeVideo.local}
    cdnSrc={OFFICIAL_STREAMING_IMAGES.primeVideo.cdn}
    alt={OFFICIAL_STREAMING_IMAGES.primeVideo.alt}
    className={className}
  />
);

export const VisionPlusLogo: React.FC<{ className?: string }> = ({ className = 'h-4.5' }) => (
  <OfficialLogoImg
    localSrc={OFFICIAL_STREAMING_IMAGES.visionPlus.local}
    cdnSrc={OFFICIAL_STREAMING_IMAGES.visionPlus.cdn}
    alt={OFFICIAL_STREAMING_IMAGES.visionPlus.alt}
    className={className}
  />
);

export const ViuLogo: React.FC<{ className?: string }> = ({ className = 'h-4.5' }) => (
  <OfficialLogoImg
    localSrc={OFFICIAL_STREAMING_IMAGES.viu.local}
    cdnSrc={OFFICIAL_STREAMING_IMAGES.viu.cdn}
    alt={OFFICIAL_STREAMING_IMAGES.viu.alt}
    className={className}
  />
);

export const NetflixLogo: React.FC<{ className?: string }> = ({ className = 'h-4.5' }) => (
  <svg
    viewBox="0 0 150 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} w-auto max-w-full select-none`}
    aria-label="Netflix"
  >
    <text
      x="75"
      y="30"
      textAnchor="middle"
      fill="#E50914"
      fontFamily="Impact, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="36"
      letterSpacing="2px"
    >
      NETFLIX
    </text>
  </svg>
);

export const VidioLogo: React.FC<{ className?: string }> = ({ className = 'h-4.5' }) => (
  <svg
    viewBox="0 0 135 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} w-auto max-w-full select-none`}
    aria-label="Vidio"
  >
    <rect x="0" y="3" width="36" height="36" rx="10" fill="#E50046" />
    <polygon points="14,13 27,21 14,29" fill="white" />
    <text
      x="44"
      y="29"
      fill="#E50046"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      fontWeight="900"
      fontSize="29"
      letterSpacing="-0.5px"
    >
      vidio
    </text>
  </svg>
);

export const DisneyHotstarLogo: React.FC<{ className?: string }> = ({ className = 'h-4.5' }) => (
  <svg
    viewBox="0 0 210 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} w-auto max-w-full select-none`}
    aria-label="Disney+ Hotstar"
  >
    <text
      x="0"
      y="36"
      fill="#113CCF"
      fontFamily="'Trebuchet MS', 'Arial Black', sans-serif"
      fontWeight="900"
      fontSize="32"
      letterSpacing="0px"
    >
      Disney+
    </text>
    <rect x="130" y="14" width="76" height="24" rx="6" fill="#0A1B3B" />
    <text
      x="168"
      y="31"
      textAnchor="middle"
      fill="#FFB800"
      fontFamily="system-ui, sans-serif"
      fontWeight="800"
      fontSize="12"
      letterSpacing="1px"
    >
      HOTSTAR
    </text>
  </svg>
);

/**
 * Universal component that routes an app name to its official logo image.
 */
export const StreamingLogo: React.FC<StreamingLogoProps> = ({
  name,
  size = 'md',
  className,
}) => {
  const normalized = name.toLowerCase().trim();

  if (normalized.includes('maxstream')) {
    const msHeight =
      className ||
      (size === 'sm' ? 'h-6 sm:h-6.5' : size === 'lg' ? 'h-9' : 'h-7 sm:h-8');
    return <MaxStreamLogo className={`${msHeight} transition-transform`} />;
  }
  if (normalized.includes('prime') || normalized.includes('amazon')) {
    const pvHeight =
      className ||
      (size === 'sm' ? 'h-5 sm:h-5.5' : size === 'lg' ? 'h-8' : 'h-6 sm:h-7');
    return <PrimeVideoLogo className={`${pvHeight} transition-transform`} />;
  }
  if (normalized.includes('vision')) {
    const vpHeight =
      className ||
      (size === 'sm' ? 'h-4.5 sm:h-5' : size === 'lg' ? 'h-7' : 'h-5 sm:h-6');
    return <VisionPlusLogo className={`${vpHeight} transition-transform`} />;
  }
  if (normalized.includes('viu')) {
    const viuHeight =
      className ||
      (size === 'sm' ? 'h-4.5' : size === 'lg' ? 'h-7' : 'h-5 sm:h-5.5');
    return <ViuLogo className={`${viuHeight} transition-transform`} />;
  }
  if (normalized.includes('netflix')) {
    return <NetflixLogo className={className || (size === 'sm' ? 'h-4.5' : 'h-5.5')} />;
  }
  if (normalized.includes('vidio')) {
    return <VidioLogo className={className || (size === 'sm' ? 'h-4.5' : 'h-5.5')} />;
  }
  if (normalized.includes('disney') || normalized.includes('hotstar')) {
    return <DisneyHotstarLogo className={className || (size === 'sm' ? 'h-4.5' : 'h-5.5')} />;
  }

  // Fallback for non-streaming benefit items (like GameQoo, PB, etc.)
  return (
    <span className="text-[11px] font-bold text-slate-800 tracking-tight whitespace-nowrap">
      {name}
    </span>
  );
};

interface StreamingBadgeCardProps {
  appName: string;
  variant?: 'light' | 'white' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Individual badge tile framing the real logo with high contrast and polish.
 */
export const StreamingAppBadge: React.FC<StreamingBadgeCardProps> = ({
  appName,
  variant = 'white',
  size = 'md',
}) => {
  const isStreamingApp = [
    'vision',
    'prime',
    'viu',
    'maxstream',
    'netflix',
    'vidio',
    'disney',
  ].some((s) => appName.toLowerCase().includes(s));

  if (!isStreamingApp) {
    // Non-streaming tag (e.g. games)
    return (
      <span className="text-[10px] font-bold px-2.5 py-1.5 rounded-xl border bg-purple-50 text-purple-700 border-purple-200 shadow-2xs">
        {appName}
      </span>
    );
  }

  // Adjusted container padding and min-heights so every logo has plenty of room
  const containerPadding =
    size === 'sm'
      ? 'px-3 py-1.5 min-h-[38px]'
      : size === 'lg'
      ? 'px-4.5 py-2.5 min-h-[48px]'
      : 'px-3.5 py-2 min-h-[42px]';

  const bgClasses =
    variant === 'white'
      ? 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
      : variant === 'glass'
      ? 'bg-white/95 border-white/80 shadow-xs'
      : 'bg-slate-50 border-slate-200/80 shadow-2xs';

  return (
    <div
      title={`Benefit streaming resmi: ${appName}`}
      className={`inline-flex items-center justify-center rounded-xl border transition-all hover:scale-103 cursor-default select-none ${bgClasses} ${containerPadding}`}
    >
      <StreamingLogo name={appName} size={size} />
    </div>
  );
};

/**
 * Renders a row/grid of streaming logos for package cards or hero section.
 */
export const StreamingLogosList: React.FC<{
  apps: string[];
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'white' | 'glass';
  className?: string;
}> = ({
  apps,
  size = 'md',
  variant = 'white',
  className = 'flex flex-wrap gap-2 items-center',
}) => {
  return (
    <div className={className}>
      {apps.map((app, idx) => (
        <StreamingAppBadge
          key={`${app}-${idx}`}
          appName={app}
          size={size}
          variant={variant}
        />
      ))}
    </div>
  );
};
