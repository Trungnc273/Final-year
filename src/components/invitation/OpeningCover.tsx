import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { invitation } from '../../config/invitation';

interface OpeningCoverProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const OpeningCover: React.FC<OpeningCoverProps> = ({ onOpen, isOpen }) => {
  const [recipient, setRecipient] = useState<string>('Bạn thân mến');
  const [hasCustomRecipient, setHasCustomRecipient] = useState<boolean>(false);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const desktopButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const openTimer = useRef<number | null>(null);

  useEffect(() => {
    const button = window.matchMedia('(min-width: 768px)').matches
      ? desktopButtonRef.current
      : mobileButtonRef.current;
    if (button) button.dataset.initialFocus = 'true';
    button?.focus({ preventScroll: true });
    return () => {
      if (openTimer.current !== null) window.clearTimeout(openTimer.current);
    };
  }, []);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get('to');
      if (toParam && toParam.trim()) {
        const cleanName = toParam.trim().replace(/[<>"/\\#]/g, '').slice(0, 50);
        if (cleanName) {
          setRecipient(cleanName);
          setHasCustomRecipient(true);
        }
      }
    } catch {
      // Fallback
    }
  }, []);

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);

    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 720;
    openTimer.current = window.setTimeout(() => {
      onOpen();
    }, duration);
  };

  if (isOpen) return null;

  return (
    <aside
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Thư mời Lễ Tốt Nghiệp"
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        event.preventDefault();
        const button = window.matchMedia('(min-width: 768px)').matches
          ? desktopButtonRef.current
          : mobileButtonRef.current;
        if (button) {
          delete button.dataset.initialFocus;
          button.focus({ preventScroll: true });
        }
      }}
      className={`opening-cover fixed inset-0 z-50 h-[100dvh] w-[100vw] overflow-hidden bg-[#fbfaf7] text-[#162e51] ${isOpening ? 'is-opening' : ''}`}
    >
      {/* 
        ==================================================
        DESKTOP LAYOUT (md+):
        Direct pixel-accurate composition of design-targets/opening-desktop-target.png
        ==================================================
      */}
      <div className="hidden md:flex min-h-screen w-full items-center justify-center p-3 lg:p-6 relative z-10">
        {/* Outer Folio Card with Double Hairline Frame */}
        <div className="w-full max-w-[1380px] h-[850px] max-h-[95vh] my-auto bg-[#fbfaf7] rounded-xl border border-[#b8cee2] p-2.5 lg:p-3.5 shadow-[0_20px_50px_rgba(160,190,220,0.3)] relative overflow-hidden flex flex-col">
          
          {/* Inner Hairline Frame */}
          <div className="relative w-full h-full rounded-lg border border-[#c8d9ea] overflow-hidden flex flex-col justify-between p-6 lg:p-8">
            
            {/* 1. Integrated Left Photo (fills left ~48% with smooth edge fade into card) */}
            <div className="absolute inset-y-0 left-0 w-[49%] overflow-hidden pointer-events-none z-0">
              <img
                src={invitation.photos.hero}
                alt={invitation.graduateName}
                fetchPriority="high"
                className="w-full h-full object-cover object-[center_28%] scale-105 origin-[40%_20%]"
                style={{
                  maskImage: 'linear-gradient(to right, black 55%, transparent 95%)',
                  WebkitMaskImage: 'linear-gradient(to right, black 55%, transparent 95%)'
                }}
              />
              {/* Secondary smooth gradient overlay to blend marble column into #fbfaf7 */}
              <div className="absolute inset-y-0 right-0 w-36 bg-gradient-to-r from-transparent via-[#fbfaf7]/60 to-[#fbfaf7]" />
            </div>

            {/* Left Edge Delicate Blue Florals */}
            <div className="absolute top-[30%] -left-8 w-44 h-44 pointer-events-none opacity-90 mix-blend-multiply z-10">
              <img
                src="/assets/invitation-decor/floral-sprig.jpg"
                alt=""
                className="w-full h-full object-contain -rotate-45"
                style={{ filter: 'contrast(1.12) brightness(1.02)' }}
              />
            </div>

            {/* Bottom-Left White Rose & Blue Hydrangea Bouquet Cluster */}
            <div className="absolute -bottom-12 -left-16 w-[450px] h-[450px] pointer-events-none opacity-95 z-20">
              <img
                src="/assets/invitation-decor/bouquet-cluster.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            {/* Flowing Ribbon Streamer connecting bottom-left to bottom-right bow */}
            <div className="absolute -bottom-10 left-[22%] w-[58%] h-40 pointer-events-none opacity-85 mix-blend-multiply z-10">
              <img
                src="/assets/invitation-decor/ribbon-streamer.jpg"
                alt=""
                className="w-full h-full object-contain"
                style={{ filter: 'contrast(1.1) brightness(1.02)' }}
              />
            </div>

            {/* Top-Right Floral Sprig */}
            <div className="absolute -top-2 -right-2 w-56 h-56 pointer-events-none opacity-90 mix-blend-multiply z-10">
              <img
                src="/assets/invitation-decor/floral-sprig.jpg"
                alt=""
                className="w-full h-full object-contain rotate-90"
                style={{ filter: 'contrast(1.12) brightness(1.02)' }}
              />
            </div>

            {/* Bottom-Right Large Ribbon Bow with Flowing Tails */}
            <div className="absolute top-6 -left-12 w-72 h-72 pointer-events-none opacity-95 z-20">
              <img
                src="/assets/invitation-decor/ribbon-bow.png"
                alt=""
                className="w-full h-full object-contain -rotate-6"
              />
            </div>

            <div className="absolute -top-16 left-[22%] w-[58%] h-40 pointer-events-none opacity-70 z-10">
              <img src="/assets/invitation-decor/ribbon-streamer.png" alt="" className="w-full h-full object-contain" />
            </div>

            {/* 2. Top Running Header Line */}
            <div className="flex items-center justify-between z-20 relative">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-sans tracking-[0.28em] text-[#557699] uppercase font-semibold whitespace-nowrap">
                  CLASS OF {invitation.graduationYear} &bull; COMMENCEMENT
                </span>
                <div className="h-[1px] bg-[#b8cee2] w-36 lg:w-56" />
              </div>

              <div className="text-right">
                <span className="text-[10px] font-sans tracking-[0.25em] text-[#557699] uppercase font-semibold block leading-tight">
                  A NEW CHAPTER
                </span>
                <span className="text-[10px] font-sans tracking-[0.25em] text-[#557699] uppercase font-semibold block leading-tight">
                  BEGINS
                </span>
              </div>
            </div>

            {/* 3. Center Right Typography Block (Exact target hierarchy) */}
            <div className="absolute inset-y-0 right-0 w-[54%] flex flex-col items-center justify-center text-center p-8 z-20">
              
              {/* Guest Personalization if provided (subtle, non-intrusive) */}
              {hasCustomRecipient && (
                <div className="mb-2 max-w-full">
                  <span className="text-lg font-serif text-[#557699] font-normal italic tracking-wide break-words">
                    Thân gửi {recipient}
                  </span>
                </div>
              )}

              <h1 className="font-script text-[92px] xl:text-[108px] text-[#2d5584] font-normal leading-none mb-3 select-none">
                Chào bạn,
              </h1>
              <p className="font-serif italic text-xl xl:text-2xl text-[#385679] leading-relaxed max-w-[430px] mb-6">
                Cảm ơn bạn đã trở thành một phần trong hành trình thanh xuân của mình!
              </p>

              {/* MỞ THIỆP Button (Stationery rounded-lg pastel blue) */}
              <div className="pt-2 z-30">
                <button
                  ref={desktopButtonRef}
                  onClick={handleOpenInvitation}
                  disabled={isOpening}
                  id="btn-open-invitation-desktop"
                  data-testid="btn-open-invitation"
                  aria-label="Mở thiệp mời tốt nghiệp"
                  className="inline-flex items-center justify-center w-52 h-12 rounded-lg bg-gradient-to-r from-[#7ea4cb] to-[#678eb8] text-white text-xs tracking-[0.25em] font-semibold uppercase shadow-[0_8px_20px_rgba(110,150,190,0.35)] hover:shadow-[0_10px_25px_rgba(110,150,190,0.45)] hover:from-[#729ac3] hover:to-[#5c85b1] transition-all duration-200 group active:scale-[0.98]"
                >
                  <span>{isOpening ? 'Đang mở thiệp...' : 'MỞ THIỆP MỜI'}</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>

            </div>

            {/* 4. Bottom Colophon Row */}
            <div className="flex items-end justify-between z-20 relative">
              <div className="ml-auto text-right text-[10px] font-sans text-[#6885a3] tracking-[0.18em] uppercase leading-tight font-medium">
                <span>{invitation.graduateName}</span>
                <span className="block">CLASS OF {invitation.graduationYear}</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 
        ==================================================
        MOBILE LAYOUT (< md):
        Direct pixel-accurate poster flow of design-targets/opening-mobile-target.png
        Removes dead white space with balanced photo scale and 16-24px transition gap
        ==================================================
      */}
      <div className="md:hidden min-h-[100dvh] flex flex-col justify-center items-center p-3 bg-[#eef3f8]">
        <div className="w-full max-w-[364px] h-[calc(100dvh-28px)] max-h-[800px] bg-[#fbfaf7] rounded-2xl border border-[#b8cee2] p-2.5 shadow-[0_12px_36px_rgba(160,190,220,0.35)] relative overflow-hidden flex flex-col">
          
          {/* Inner Hairline Frame */}
          <div className="w-full h-full rounded-xl border border-[#c8d9ea] p-4 flex flex-col relative overflow-hidden">
            
            {/* Top Running Header */}
            <div className="flex items-center gap-3 pb-2 z-20 relative">
              <span className="text-[10px] font-sans tracking-[0.25em] text-[#557699] uppercase font-semibold whitespace-nowrap">
                CLASS OF {invitation.graduationYear}
              </span>
              <div className="h-[1px] bg-[#b8cee2] flex-1" />
            </div>

            {/* Top Photo Section: Proportionally filling upper ~46% (370px), with smooth fade at bottom */}
            <div className="relative w-full h-[370px] shrink-0 overflow-hidden pointer-events-none -mx-4 -mt-2 w-[calc(100%+32px)]">
              <img
                src={invitation.photos.hero}
                alt={invitation.graduateName}
                fetchPriority="high"
                className="w-full h-full object-cover object-[center_28%] scale-105"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 65%, transparent 98%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 98%)'
                }}
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fbfaf7] via-[#fbfaf7]/60 to-transparent" />

              {/* Left Edge Floral Accent */}
              <div className="absolute bottom-2 -left-3 w-32 h-32 pointer-events-none opacity-90 mix-blend-multiply z-10">
                <img
                  src="/assets/invitation-decor/floral-sprig.jpg"
                  alt=""
                  className="w-full h-full object-contain -rotate-45"
                  style={{ filter: 'contrast(1.12) brightness(1.02)' }}
                />
              </div>

              {/* Right Ribbon Bow at the transition line */}
              <div className="absolute -top-3 -right-3 w-28 h-28 pointer-events-none opacity-95 z-20">
                <img
                  src="/assets/invitation-decor/ribbon-bow.png"
                  alt=""
                  className="w-full h-full object-contain -rotate-12"
                />
              </div>
            </div>

            {/* Invitation Typography Block: Follows immediately 16-24px below photo fade! */}
            <div className="flex flex-col items-center text-center -mt-6 pb-1 z-20 relative">
              
              {/* Guest Personalization if provided */}
              {hasCustomRecipient && (
                <div className="mb-1 max-w-full">
                  <span className="text-sm font-serif text-[#557699] font-normal italic break-words">
                    Thân gửi {recipient}
                  </span>
                </div>
              )}

              <h1 className="font-script text-[66px] text-[#2d5584] font-normal leading-none mb-1 select-none">
                Chào bạn,
              </h1>
              <p className="font-serif italic text-[17px] text-[#385679] leading-[1.45] max-w-[315px] mb-2">
                Cảm ơn bạn đã trở thành một phần trong hành trình thanh xuân của mình!
              </p>

              {/* MỞ THIỆP Button (Stationery touch target) */}
              <div className="pt-2 w-full flex justify-center z-30">
                <button
                  ref={mobileButtonRef}
                  onClick={handleOpenInvitation}
                  disabled={isOpening}
                  id="btn-open-invitation-mobile"
                  data-testid="btn-open-invitation-mobile"
                  aria-label="Mở thiệp mời tốt nghiệp"
                  className="inline-flex items-center justify-center w-52 h-11 rounded-lg bg-gradient-to-r from-[#7ea4cb] to-[#678eb8] text-white text-xs tracking-[0.25em] font-semibold uppercase shadow-[0_8px_20px_rgba(110,150,190,0.35)] active:scale-[0.98] transition-all group"
                >
                  <span>{isOpening ? 'Đang mở...' : 'MỞ THIỆP MỜI'}</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>

              <div className="text-center pt-3 pb-0.5 z-20">
                <span className="text-[9px] font-sans tracking-[0.18em] text-[#6885a3] uppercase block leading-tight font-medium">
                  {invitation.graduateName} · {invitation.ceremonyDateFormatted}
                </span>
              </div>

            </div>

            {/* Corner Floral Accents */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 pointer-events-none opacity-80 mix-blend-multiply z-10">
              <img
                src="/assets/invitation-decor/floral-sprig.jpg"
                alt=""
                className="w-full h-full object-contain -rotate-45"
                style={{ filter: 'contrast(1.12) brightness(1.02)' }}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 pointer-events-none opacity-80 mix-blend-multiply z-10">
              <img
                src="/assets/invitation-decor/floral-sprig.jpg"
                alt=""
                className="w-full h-full object-contain rotate-45"
                style={{ filter: 'contrast(1.12) brightness(1.02)' }}
              />
            </div>

          </div>

        </div>
      </div>
    </aside>
  );
};
