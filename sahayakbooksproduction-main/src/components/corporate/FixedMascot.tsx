import React from 'react';
import { useStore } from '../../context/StoreContext';

export const FixedMascot: React.FC = () => {
  const { settings } = useStore();

  const mascotSrc = settings?.siteImages?.mascotHidden
    ? null
    : (settings?.siteImages?.mascot || '/assets/corporate/sahayak_mascot_full.png');

  if (!mascotSrc) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="hidden sm:block fixed bottom-0 left-2 sm:left-4 z-30 select-none pointer-events-none transition-opacity duration-300"
    >
      <div className="relative inline-block">
        <span className="absolute -top-1 right-1 text-[11px] font-semibold text-stone-400/80 select-none">
          ®
        </span>
        <img
          src={mascotSrc}
          alt="Sahayak Associates Mascot"
          className="h-36 sm:h-48 md:h-56 lg:h-64 w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]"
          loading="eager"
        />
      </div>
    </div>
  );
};
