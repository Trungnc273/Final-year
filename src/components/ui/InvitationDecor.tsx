import React from 'react';

/**
 * Reusable Double Hairline Border Frame for Invitation Folio
 */
export const InvitationFrame: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`relative bg-white/95 rounded-2xl border border-[#c8d9ea] p-2 sm:p-3 shadow-[0_20px_60px_rgba(180,205,230,0.35)] ${className}`}>
      {/* Inner delicate hairline border */}
      <div className="relative w-full h-full rounded-xl border border-[#dce7f2] p-5 sm:p-7 lg:p-9 flex flex-col justify-between overflow-hidden">
        {/* Subtle corner flourish marks */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#b5cee4]" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#b5cee4]" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#b5cee4]" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#b5cee4]" />
        {children}
      </div>
    </div>
  );
};

/**
 * Delicate Ribbon Knot Divider "— 🎀 —"
 */
export const RibbonKnotDivider: React.FC<{ className?: string }> = ({ className = 'my-3' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 text-[#7ea4cb] ${className}`}>
      <div className="w-8 sm:w-12 h-[1px] bg-[#c8d9ea]" />
      <svg viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-5 text-[#7ea4cb]" aria-hidden="true">
        <path
          d="M16 11C13.5 6.5 8 5 4.5 7.5C1 10.5 3 15 8.5 13.5L16 11.5M16 11C18.5 6.5 24 5 27.5 7.5C31 10.5 29 15 23.5 13.5L16 11.5M16 11V13M16 13C14 15 12 19 10.5 22M16 13C18 15 20 19 21.5 22"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse cx="16" cy="11.8" rx="2" ry="1.6" fill="currentColor" />
      </svg>
      <div className="w-8 sm:w-12 h-[1px] bg-[#c8d9ea]" />
    </div>
  );
};

/**
 * Single Ribbon Bow Knot Icon
 */
export const RibbonKnotIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-4 text-[#7ea4cb]' }) => {
  return (
    <svg viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M16 11C13.5 6.5 8 5 4.5 7.5C1 10.5 3 15 8.5 13.5L16 11.5M16 11C18.5 6.5 24 5 27.5 7.5C31 10.5 29 15 23.5 13.5L16 11.5M16 11V13M16 13C14 15 12 19 10.5 22M16 13C18 15 20 19 21.5 22"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="16" cy="11.8" rx="2" ry="1.6" fill="currentColor" />
    </svg>
  );
};
