import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { invitation } from '../../config/invitation';
import { lockDocumentScroll } from '../../utils/documentScrollLock';

interface StoryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

const STORY_PHOTOS: StoryPhoto[] = [0, 4, 1, 2, 3].map((index) => {
  const photo = invitation.photos.gallery[index];
  return { id: photo.id, src: photo.src, alt: photo.title, title: photo.title, subtitle: photo.subtitle };
});

export const Gate3Section: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const isLightboxOpen = activePhotoIndex !== null;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  const closeLightbox = useCallback(() => {
    if (closeTimerRef.current !== null) return;
    setIsClosing(true);
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220;
    closeTimerRef.current = window.setTimeout(() => {
      setActivePhotoIndex(null);
      setIsClosing(false);
      closeTimerRef.current = null;
    }, duration);
  }, []);

  useEffect(() => () => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
  }, []);

  const openPhotoWithKeyboard = (event: React.KeyboardEvent<HTMLElement>, index: number) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setActivePhotoIndex(index);
  };

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActivePhotoIndex((prev) => (prev !== null ? (prev - 1 + STORY_PHOTOS.length) % STORY_PHOTOS.length : 0));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % STORY_PHOTOS.length : 0));
      }
    },
    [activePhotoIndex, closeLightbox]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const unlock = lockDocumentScroll();
    closeButtonRef.current?.focus({ preventScroll: true });
    return () => {
      unlock();
      previousFocus?.focus({ preventScroll: true });
    };
  }, [isLightboxOpen]);

  return (
    <section
      id="gate-3"
      aria-label="Hành trình thanh xuân"
      className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center bg-[#eef3f8] text-[#162e51] overflow-hidden p-2 sm:p-4 lg:p-5"
    >
      {/* ============================================================
          GATE 3 DESKTOP (lg+):
          Scrapbook editorial photo story matching gate3-desktop-target.png
          - Left: Dominant polaroid + smaller overlapping polaroid
          - Center: Script title 'Hành trình thanh xuân' + italic prose + handwritten note
          - Right: Dynamic polaroid cluster (tilted with washi tape)
          - Bottom: Flowing watercolor ribbon + corner floral bouquets
          ============================================================ */}
      <div className="hidden lg:flex w-full max-w-[1400px] h-[875px] max-h-[97vh] my-auto mx-auto bg-[#fbfaf7] rounded-xl border border-[#b8cee2] p-2.5 lg:p-3 shadow-[0_20px_50px_rgba(160,190,220,0.3)] relative overflow-hidden flex-col z-10">
        
        {/* Inner Hairline Frame */}
        <div className="relative w-full h-full rounded-lg border border-[#c8d9ea] overflow-hidden flex flex-col justify-between p-5 xl:p-6 pb-6">
          
          {/* Top Running Header Bar */}
          <div className="flex items-center justify-between z-20 relative shrink-0 pt-0 pb-2">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-sans tracking-[0.28em] text-[#557699] uppercase font-semibold whitespace-nowrap">
                CLASS OF {invitation.graduationYear} &bull; COMMENCEMENT
              </span>
              <div className="h-[1px] bg-[#b8cee2] w-48 xl:w-72" />
            </div>

            <div className="text-right">
              <span className="text-[10px] font-sans tracking-[0.25em] text-[#557699] uppercase font-semibold block leading-tight">
                PHOTO STORY &bull; MEMORIES
              </span>
            </div>
          </div>

          <div className="absolute -top-6 left-[12%] w-[64%] h-44 pointer-events-none opacity-55 z-0">
            <img decoding="async" loading="lazy" src="/assets/invitation-decor/ribbon-streamer.png" alt="" className="w-full h-full object-contain -rotate-3" />
          </div>
          <div className="absolute -top-8 right-[10%] w-40 h-40 pointer-events-none opacity-85 z-10">
            <img decoding="async" loading="lazy" src="/assets/invitation-decor/floral-sprig.png" alt="" className="w-full h-full object-contain rotate-12" />
          </div>

          {/* Main Visual Composition (3-Column Layout: Left Photos, Center Text, Right Cluster) */}
          <div className="relative flex-1 grid grid-cols-12 gap-4 items-center z-10 my-auto">
            
            {/* Left Column (cols 1-4): Featured Dominant Polaroid + Sub Polaroid */}
            <div className="col-span-4 relative flex flex-col items-center justify-center pl-2 xl:pl-6">
              {/* Dominant Polaroid */}
              <div
                role="button"                tabIndex={0}                aria-label={'Phóng to ảnh: ' + STORY_PHOTOS[0].title}                onKeyDown={(event) => openPhotoWithKeyboard(event, 0)}                onClick={() => setActivePhotoIndex(0)}
                className="group relative bg-white p-3 pb-8 shadow-[0_16px_38px_rgba(30,55,90,0.18)] rounded-xs border border-slate-200/90 -rotate-3 hover:-rotate-1 hover:scale-102 transition-all duration-300 cursor-pointer w-[290px] xl:w-[325px] z-10"
                title="Nhấn để xem ảnh phóng to"
              >
                {/* Washi Tape Strip */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-[#a8cae8]/60 backdrop-blur-xs border-y border-white/70 rotate-[2deg] shadow-xs pointer-events-none z-30" />
                
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#eef3f8] border border-slate-100">
                  <img decoding="async"
                    src={STORY_PHOTOS[0].src}
                    alt={STORY_PHOTOS[0].alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_20%] group-hover:scale-104 transition-transform duration-500"
                  />
                </div>
                <div className="pt-2 text-center">
                  <span className="font-serif italic text-[11px] text-[#557699] tracking-wider">
                    {STORY_PHOTOS[0].title}
                  </span>
                </div>
              </div>

              {/* Smaller Overlapping Polaroid Below */}
              <div
                role="button"                tabIndex={0}                aria-label={'Phóng to ảnh: ' + STORY_PHOTOS[1].title}                onKeyDown={(event) => openPhotoWithKeyboard(event, 1)}                onClick={() => setActivePhotoIndex(1)}
                className="group relative bg-white p-2.5 pb-6 shadow-[0_12px_28px_rgba(30,55,90,0.15)] rounded-xs border border-slate-200/90 rotate-4 hover:rotate-1 hover:scale-102 transition-all duration-300 cursor-pointer w-[185px] xl:w-[210px] -mt-10 ml-28 z-20"
                title="Nhấn để xem ảnh phóng to"
              >
                {/* Washi Tape Strip */}
                <div className="absolute -top-2.5 right-4 w-20 h-5 bg-[#b8cee2]/65 backdrop-blur-xs border-y border-white/70 -rotate-3 shadow-xs pointer-events-none z-30" />
                
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#eef3f8] border border-slate-100">
                  <img decoding="async"
                    src={STORY_PHOTOS[1].src}
                    alt={STORY_PHOTOS[1].alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_25%] group-hover:scale-104 transition-transform duration-500"
                  />
                </div>
                <div className="pt-1.5 text-center">
                  <span className="font-serif italic text-[10px] text-[#557699] tracking-wider">
                    {STORY_PHOTOS[1].title}
                  </span>
                </div>
              </div>
            </div>

            {/* Center Column (cols 5-8): Title + Narrative Copy + Handwritten Note */}
            <div className="col-span-4 flex flex-col items-center justify-center text-center px-2 z-20">
              {/* Script Title matching target */}
              <h2 className="font-script font-normal text-6xl xl:text-7xl text-[#2d5584] leading-[1.08] mb-2 drop-shadow-xs select-none">
                Hành trình<br />
                thanh xuân
              </h2>

              {/* Delicate Floral Divider */}
              <div className="flex items-center justify-center gap-2 text-[#7ea4cb] my-3">
                <div className="w-8 h-[1px] bg-[#c8d9ea]" />
                <Heart className="w-3.5 h-3.5 fill-[#7ea4cb] text-[#7ea4cb]" />
                <div className="w-8 h-[1px] bg-[#c8d9ea]" />
              </div>

              {/* Narrative Serif Prose */}
              <p className="font-serif italic text-[#385679] text-base xl:text-[17px] leading-relaxed max-w-[340px] mx-auto mb-6">
                Những năm tháng dưới mái trường<br />
                là một hành trình thật đặc biệt<br />
                đầy ắp kỷ niệm, trải nghiệm<br />
                và những người bạn tuyệt vời.
              </p>

              {/* Handwritten Note / Reenie Beanie font style */}
              <div className="relative pt-2 transform -rotate-2">
                <p
                  className="font-script text-2xl xl:text-3xl text-[#507ca8] leading-tight"
                  style={{ fontFamily: "'Charm', 'Alex Brush', cursive" }}
                >
                  Good friends<br />
                  Brighter days<br />
                  Same dreams.
                </p>
              </div>
            </div>

            {/* Right Column (cols 9-12): Dynamic Polaroid Scrapbook Cluster */}
            <div className="col-span-4 relative h-[620px] flex items-center justify-center pr-2 xl:pr-6">
              
              {/* Top-Left Polaroid in Cluster (Photo 3) */}
              <div
                role="button"                tabIndex={0}                aria-label={'Phóng to ảnh: ' + STORY_PHOTOS[2].title}                onKeyDown={(event) => openPhotoWithKeyboard(event, 2)}                onClick={() => setActivePhotoIndex(2)}
                className="group absolute top-6 left-2 xl:left-6 bg-white p-2.5 pb-7 shadow-[0_12px_26px_rgba(30,55,90,0.15)] rounded-xs border border-slate-200/90 -rotate-4 hover:rotate-0 hover:scale-104 transition-all duration-300 cursor-pointer w-[170px] xl:w-[190px] z-10"
                title="Nhấn để xem ảnh phóng to"
              >
                <div className="absolute -top-2.5 left-1/3 w-16 h-4.5 bg-[#a8cae8]/60 backdrop-blur-xs border-y border-white/70 rotate-[3deg] shadow-xs pointer-events-none z-30" />
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#eef3f8] border border-slate-100">
                  <img decoding="async"
                    src={STORY_PHOTOS[2].src}
                    alt={STORY_PHOTOS[2].alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_20%] group-hover:scale-104 transition-transform duration-500"
                  />
                </div>
                <div className="pt-1.5 text-center">
                  <span className="font-serif italic text-[10px] text-[#557699]">
                    {STORY_PHOTOS[2].title}
                  </span>
                </div>
              </div>

              {/* Top-Right Polaroid in Cluster (Photo 4) */}
              <div
                role="button"                tabIndex={0}                aria-label={'Phóng to ảnh: ' + STORY_PHOTOS[3].title}                onKeyDown={(event) => openPhotoWithKeyboard(event, 3)}                onClick={() => setActivePhotoIndex(3)}
                className="group absolute top-10 right-2 xl:right-4 bg-white p-2.5 pb-7 shadow-[0_12px_26px_rgba(30,55,90,0.15)] rounded-xs border border-slate-200/90 rotate-5 hover:rotate-1 hover:scale-104 transition-all duration-300 cursor-pointer w-[175px] xl:w-[195px] z-10"
                title="Nhấn để xem ảnh phóng to"
              >
                <div className="absolute -top-2.5 right-6 w-16 h-4.5 bg-[#b8cee2]/65 backdrop-blur-xs border-y border-white/70 -rotate-3 shadow-xs pointer-events-none z-30" />
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#eef3f8] border border-slate-100">
                  <img decoding="async"
                    src={STORY_PHOTOS[3].src}
                    alt={STORY_PHOTOS[3].alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_20%] group-hover:scale-104 transition-transform duration-500"
                  />
                </div>
                <div className="pt-1.5 text-center">
                  <span className="font-serif italic text-[10px] text-[#557699]">
                    {STORY_PHOTOS[3].title}
                  </span>
                </div>
              </div>

              {/* Middle-Right Polaroid in Cluster (Photo 5 - seated on grass) */}
              <div
                role="button"                tabIndex={0}                aria-label={'Phóng to ảnh: ' + STORY_PHOTOS[0].title}                onKeyDown={(event) => openPhotoWithKeyboard(event, 0)}                onClick={() => setActivePhotoIndex(0)}
                className="group absolute top-[210px] left-8 xl:left-12 bg-white p-3 pb-8 shadow-[0_16px_34px_rgba(30,55,90,0.18)] rounded-xs border border-slate-200/90 -rotate-2 hover:rotate-0 hover:scale-104 transition-all duration-300 cursor-pointer w-[195px] xl:w-[220px] z-20"
                title="Nhấn để xem ảnh phóng to"
              >
                <div className="absolute -top-3 left-8 w-20 h-5 bg-[#a8cae8]/60 backdrop-blur-xs border-y border-white/70 rotate-[2deg] shadow-xs pointer-events-none z-30" />
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#eef3f8] border border-slate-100">
                  <img decoding="async"
                    src={STORY_PHOTOS[0].src}
                    alt={STORY_PHOTOS[0].alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_20%] group-hover:scale-104 transition-transform duration-500"
                  />
                </div>
                <div className="pt-1.5 text-center">
                  <span className="font-serif italic text-[11px] text-[#557699]">
                    Kỷ Niệm Sân Trường
                  </span>
                </div>
              </div>

              {/* Bottom-Right Supporting Polaroid */}
              <div
                role="button"                tabIndex={0}                aria-label={'Phóng to ảnh: ' + STORY_PHOTOS[4].title}                onKeyDown={(event) => openPhotoWithKeyboard(event, 4)}                onClick={() => setActivePhotoIndex(4)}
                className="group absolute bottom-4 right-1 xl:right-3 bg-white p-2.5 pb-7 shadow-[0_14px_30px_rgba(30,55,90,0.16)] rounded-xs border border-slate-200/90 rotate-6 hover:rotate-2 hover:scale-104 transition-all duration-300 cursor-pointer w-[175px] xl:w-[195px] z-15"
                title="Nhấn để xem ảnh phóng to"
              >
                <div className="absolute -top-2.5 right-8 w-18 h-4.5 bg-[#b8cee2]/65 backdrop-blur-xs border-y border-white/70 -rotate-2 shadow-xs pointer-events-none z-30" />
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#eef3f8] border border-slate-100">
                  <img decoding="async"
                    src={STORY_PHOTOS[4].src}
                    alt={STORY_PHOTOS[4].alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_20%] group-hover:scale-104 transition-transform duration-500"
                  />
                </div>
                <div className="pt-1.5 text-center">
                  <span className="font-serif italic text-[10px] text-[#557699]">
                    {STORY_PHOTOS[4].title}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Decorative Corner Florals & Connecting Ribbon Streamer */}
          <div className="absolute bottom-0 left-0 w-68 h-68 pointer-events-none z-25 -ml-8 -mb-8">
            <img decoding="async" loading="lazy"
              src="/assets/invitation-decor/bouquet-cluster.png"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain filter drop-shadow-sm opacity-95"
            />
          </div>

          <div className="absolute bottom-0 right-0 w-68 h-68 pointer-events-none z-25 -mr-8 -mb-8 scale-x-[-1]">
            <img decoding="async" loading="lazy"
              src="/assets/invitation-decor/bouquet-cluster.png"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain filter drop-shadow-sm opacity-95"
            />
          </div>

          {/* Flowing Watercolor Ribbon Streamer across bottom */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[88%] h-32 pointer-events-none z-20 opacity-80 mix-blend-multiply">
            <img decoding="async" loading="lazy"
              src="/assets/invitation-decor/ribbon-streamer.png"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain"
            />
          </div>

        </div>
      </div>

      {/* ============================================================
          GATE 3 MOBILE (<lg):
          Independent mobile composition matching gate3-mobile-target.png
          - Top header
          - Large featured polaroid tilted counter-clockwise
          - Two smaller polaroids side-by-side
          - Title 'Hành trình thanh xuân'
          - Heart flourish divider
          - Narrative prose
          ============================================================ */}
      <div className="lg:hidden flex flex-col w-full max-w-[430px] mx-auto bg-[#fbfaf7] rounded-xl border border-[#b8cee2] p-2.5 sm:p-3 shadow-[0_15px_35px_rgba(160,190,220,0.25)] relative overflow-hidden z-10 my-2">
        <div className="relative w-full rounded-lg border border-[#c8d9ea] p-4 flex flex-col items-center overflow-hidden">
          
          {/* Top Running Header Bar */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-[#e2edf7]">
            <span className="text-[10px] font-sans tracking-[0.25em] text-[#557699] uppercase font-semibold">
              CLASS OF {invitation.graduationYear} &bull; COMMENCEMENT
            </span>
          </div>

          <div className="absolute -top-4 -left-5 w-24 h-24 pointer-events-none opacity-70">
            <img decoding="async" loading="lazy" src="/assets/invitation-decor/floral-sprig.png" alt="" className="w-full h-full object-contain -rotate-45" />
          </div>

          {/* Top Featured Dominant Polaroid */}
          <div
            role="button"            tabIndex={0}            aria-label={'Phóng to ảnh: ' + STORY_PHOTOS[0].title}            onKeyDown={(event) => openPhotoWithKeyboard(event, 0)}            onClick={() => setActivePhotoIndex(0)}
            className="group relative bg-white p-2.5 pb-7 shadow-[0_10px_25px_rgba(30,55,90,0.15)] rounded-xs border border-slate-200/90 -rotate-2 hover:rotate-0 transition-transform duration-300 cursor-pointer w-[86%] max-w-[300px] mt-4 z-10"
            title="Nhấn để xem ảnh phóng to"
          >
            {/* Washi Tape Strip */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#a8cae8]/60 backdrop-blur-xs border-y border-white/70 rotate-[2deg] shadow-xs pointer-events-none z-30" />
            
            <div className="aspect-[4/5] w-full overflow-hidden bg-[#eef3f8] border border-slate-100">
              <img decoding="async"
                src={STORY_PHOTOS[0].src}
                alt={STORY_PHOTOS[0].alt}
                loading="lazy"
                className="w-full h-full object-cover object-[center_20%]"
              />
            </div>
            <div className="pt-1.5 text-center">
              <span className="font-serif italic text-[10px] text-[#557699] tracking-wider">
                {STORY_PHOTOS[0].title}
              </span>
            </div>

            {/* Corner floral sprig */}
            <div className="absolute -top-5 -right-5 w-16 h-16 pointer-events-none opacity-90">
              <img decoding="async" loading="lazy"
                src="/assets/invitation-decor/floral-sprig.png"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-contain rotate-12"
              />
            </div>
          </div>

          {/* Two Smaller Cascaded Polaroids Side-by-Side */}
          <div className="w-full flex items-center justify-center gap-3 mt-4 z-10 px-2">
            {/* Left Sub Polaroid */}
            <div
              role="button"              tabIndex={0}              aria-label={'Phóng to ảnh: ' + STORY_PHOTOS[1].title}              onKeyDown={(event) => openPhotoWithKeyboard(event, 1)}              onClick={() => setActivePhotoIndex(1)}
              className="group relative bg-white p-2 pb-6 shadow-[0_8px_20px_rgba(30,55,90,0.12)] rounded-xs border border-slate-200/90 -rotate-3 hover:rotate-0 transition-transform duration-300 cursor-pointer w-1/2 max-w-[145px]"
              title="Nhấn để xem ảnh phóng to"
            >
              <div className="absolute -top-2 left-3 w-14 h-4 bg-[#b8cee2]/65 backdrop-blur-xs border-y border-white/70 -rotate-2 pointer-events-none z-30" />
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#eef3f8] border border-slate-100">
                <img decoding="async"
                  src={STORY_PHOTOS[1].src}
                  alt={STORY_PHOTOS[1].alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-[center_25%]"
                />
              </div>
              <div className="pt-1 text-center">
                <span className="font-serif italic text-[9px] text-[#557699]">
                  {STORY_PHOTOS[1].title}
                </span>
              </div>
            </div>

            {/* Right Sub Polaroid */}
            <div
              role="button"              tabIndex={0}              aria-label={'Phóng to ảnh: ' + STORY_PHOTOS[2].title}              onKeyDown={(event) => openPhotoWithKeyboard(event, 2)}              onClick={() => setActivePhotoIndex(2)}
              className="group relative bg-white p-2 pb-6 shadow-[0_8px_20px_rgba(30,55,90,0.12)] rounded-xs border border-slate-200/90 rotate-3 hover:rotate-0 transition-transform duration-300 cursor-pointer w-1/2 max-w-[145px]"
              title="Nhấn để xem ảnh phóng to"
            >
              <div className="absolute -top-2 right-3 w-14 h-4 bg-[#a8cae8]/65 backdrop-blur-xs border-y border-white/70 rotate-2 pointer-events-none z-30" />
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#eef3f8] border border-slate-100">
                <img decoding="async"
                  src={STORY_PHOTOS[2].src}
                  alt={STORY_PHOTOS[2].alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-[center_20%]"
                />
              </div>
              <div className="pt-1 text-center">
                <span className="font-serif italic text-[9px] text-[#557699]">
                  {STORY_PHOTOS[2].title}
                </span>
              </div>
            </div>
          </div>

          {/* Script Title matching mobile target */}
          <div className="text-center mt-5 mb-2 z-10">
            <h2 className="font-script font-normal text-5xl text-[#2d5584] leading-tight select-none">
              Hành trình<br />
              thanh xuân
            </h2>

            {/* Heart Divider */}
            <div className="flex items-center justify-center gap-2 text-[#7ea4cb] my-2.5">
              <div className="w-6 h-[1px] bg-[#c8d9ea]" />
              <Heart className="w-3 h-3 fill-[#7ea4cb] text-[#7ea4cb]" />
              <div className="w-6 h-[1px] bg-[#c8d9ea]" />
            </div>

            {/* Narrative Prose */}
            <p className="font-serif italic text-[#385679] text-sm leading-relaxed px-2 max-w-[320px] mx-auto">
              Những năm tháng dưới mái trường<br />
              là một hành trình thật đặc biệt<br />
              đầy ắp kỷ niệm, trải nghiệm<br />
              và những người bạn tuyệt vời.
            </p>
          </div>

          {/* Bottom subtle floral accent */}
          <div className="w-24 h-12 pointer-events-none mt-2 opacity-85">
            <img decoding="async" loading="lazy"
              src="/assets/invitation-decor/floral-sprig.png"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain"
            />
          </div>

        </div>
      </div>

      {/* ============================================================
          LIGHTBOX MODAL:
          Clean, lightweight, keyboard accessible, mobile friendly
          ============================================================ */}
      {activePhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Phóng to ảnh hành trình thanh xuân"
          className={`lightbox-backdrop fixed inset-0 z-50 bg-[#0c1a2e]/90 backdrop-blur-md flex flex-col items-center justify-center p-4 ${isClosing ? 'is-closing' : ''}`}
          onClick={closeLightbox}
          onKeyDown={(event) => {
            if (event.key !== 'Tab') return;
            const buttons = Array.from(event.currentTarget.querySelectorAll('button'));
            const first = buttons[0];
            const last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }}
        >
          {/* Close Button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Đóng xem ảnh"
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) => (prev !== null ? (prev - 1 + STORY_PHOTOS.length) % STORY_PHOTOS.length : 0));
            }}
            aria-label="Ảnh trước"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors duration-200 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % STORY_PHOTOS.length : 0));
            }}
            aria-label="Ảnh tiếp theo"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors duration-200 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Photo Card inside Lightbox */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="lightbox-photo relative max-w-[85vw] max-h-[82vh] bg-white p-3 sm:p-4 pb-12 sm:pb-14 rounded-xs shadow-2xl flex flex-col items-center"
          >
            <img decoding="async" loading="eager"
              src={STORY_PHOTOS[activePhotoIndex].src}
              alt={STORY_PHOTOS[activePhotoIndex].alt}
              className="max-w-full max-h-[68vh] object-contain rounded-xs"
            />
            <div className="absolute bottom-2.5 sm:bottom-3 left-4 right-4 text-center">
              <h3 className="font-serif italic text-sm sm:text-base text-[#1b3558] font-medium">
                {STORY_PHOTOS[activePhotoIndex].title}
              </h3>
              <p className="font-sans text-xs text-[#557699] mt-0.5">
                {STORY_PHOTOS[activePhotoIndex].subtitle}
              </p>
            </div>
          </div>

          {/* Counter pill */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-sans tracking-widest backdrop-blur-xs">
            {activePhotoIndex + 1} / {STORY_PHOTOS.length}
          </div>
        </div>
      )}
    </section>
  );
};
