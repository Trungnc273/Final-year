import React, { useEffect, useRef, useState } from 'react';
import { Heart, Share2, MapPin, Check } from 'lucide-react';
import { invitation } from '../../config/invitation';

export const Gate5Section: React.FC = () => {
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const feedbackTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (feedbackTimer.current !== null) window.clearTimeout(feedbackTimer.current);
  }, []);

  const showShareFeedback = (message: string) => {
    if (feedbackTimer.current !== null) window.clearTimeout(feedbackTimer.current);
    setShareFeedback(message);
    feedbackTimer.current = window.setTimeout(() => setShareFeedback(null), 3000);
  };

  // Share handler: Web Share API when supported, clipboard copy fallback
  const handleShare = async () => {
    const shareUrl = new URL(window.location.href);
    shareUrl.hash = '';
    const shareData = {
      title: `Lễ Tốt Nghiệp 2026 • ${invitation.graduateName}`,
      text: `Mời bạn đến chung vui trong lễ tốt nghiệp lớp 12 của ${invitation.graduateName} vào ngày ${invitation.ceremonyDateFormatted} tại ${invitation.school}.`,
      url: shareUrl.toString()
    };

    if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
      try {
        await navigator.share(shareData);
        showShareFeedback('ĐÃ CHIA SẺ THIỆP');
        return;
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
      }
    }

    // Fallback: Copy URL to clipboard
    try {
      await navigator.clipboard.writeText(shareData.url);
      showShareFeedback('ĐÃ SAO CHÉP LIÊN KẾT');
    } catch {
      prompt('Sao chép đường dẫn thiệp mời:', shareData.url);
    }
  };

  return (
    <section
      id="gate-5"
      aria-label="Hẹn gặp lại"
      className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center bg-[#eef3f8] text-[#162e51] overflow-hidden p-2 sm:p-4 lg:p-5"
    >
      {/* ============================================================
          GATE 5 DESKTOP (lg+):
          Composition matching gate5-desktop-target.png
          - Background: decorative neoclassical architectural illustration
          - Right: Featured graduate photograph celebrating
          - Left: Script title 'Hẹn gặp lại vào ngày đặc biệt!' + heartfelt closing + Maps CTA + Share CTA
          - Bottom: Tagline & minimal identity
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
                A NEW CHAPTER BEGINS
              </span>
            </div>
          </div>

          {/* Decorative architectural illustration; not an event venue photograph. */}
          <div className="absolute inset-x-0 bottom-6 top-10 pointer-events-none flex items-center justify-end pr-[20%] opacity-35 mix-blend-multiply z-5">
            <img decoding="async" loading="lazy"
              src="/assets/invitation-decor/decorative-facade.png"
              alt=""
              aria-hidden="true"
              className="max-h-[85%] max-w-[60%] object-contain"
            />
          </div>

          {/* Main Visual Spread (Left: Closing Typography & CTAs | Right: Celebrating Graduate Photo) */}
          <div className="relative flex-1 grid grid-cols-12 gap-6 items-center z-15 my-auto">
            
            {/* Left Column (cols 1-7): Large Script Title + Prose + CTA Buttons */}
            <div className="col-span-7 flex flex-col items-center justify-start text-center px-4 xl:px-12 pt-16 z-20">
              
              {/* Script Title matching target */}
              <h2 className="font-script font-normal text-6xl xl:text-7xl text-[#2d5584] leading-[1.08] mb-3 drop-shadow-xs select-none">
                Hẹn gặp lại<br />
                vào ngày đặc biệt!
              </h2>

              {/* Heartfelt Closing Note */}
              <p className="font-serif italic text-[#385679] text-base xl:text-lg leading-relaxed max-w-[480px] mx-auto mb-4">
                Cảm ơn bạn đã xem thiệp mời của mình.<br />
                Mình rất mong được gặp bạn tại lễ tốt nghiệp<br />
                để cùng nhau tạo nên một kỷ niệm thật đẹp.
              </p>

              {/* Small Blue Heart Divider */}
              <div className="flex items-center justify-center my-2">
                <Heart className="w-4 h-4 fill-[#2d5584] text-[#2d5584]" />
              </div>

              {/* Action Buttons Row: Google Maps CTA + Share CTA */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                {/* Google Maps CTA matching pill target */}
                <a
                  href={invitation.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Xem chỉ đường tới Trường THPT Chuyên Hà Giang trên Google Maps"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#3d658e] hover:bg-[#30557b] text-white text-xs font-sans tracking-[0.2em] font-semibold uppercase shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer min-h-[44px]"
                >
                  <MapPin className="w-4 h-4" />
                  <span>XEM CHỈ ĐƯỜNG &rarr;</span>
                </a>

                {/* Share Invitation CTA */}
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Chia sẻ thiệp mời lễ tốt nghiệp"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white border border-[#b8cee2] text-[#30557b] text-xs font-sans tracking-[0.18em] font-semibold uppercase shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer min-h-[44px]"
                >
                  {shareFeedback ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  <span aria-live="polite">{shareFeedback ?? 'CHIA SẺ THIỆP'}</span>
                </button>
              </div>

              {/* Tagline */}
              <div className="mt-8">
                <p className="font-sans text-[11px] tracking-[0.28em] text-[#557699] uppercase font-semibold">
                  {invitation.graduateName} &bull; CLASS OF {invitation.graduationYear}
                </p>
                <p className="font-sans text-[11px] tracking-[0.12em] text-[#557699] mt-2">
                  {invitation.ceremonyDateFormatted} &bull; {invitation.ceremonyTimeDisplay} &bull; {invitation.school}
                </p>
              </div>

            </div>

            {/* Right Column (cols 8-12): Celebrating Graduate Photograph */}
            <div className="col-span-5 relative flex items-center justify-center pr-2 xl:pr-6 z-20">
              <div className="relative w-full h-[680px] overflow-hidden">
                <div className="w-full h-full overflow-hidden">
                  <img decoding="async"
                    src={invitation.photos.cover}
                    alt={`${invitation.familyName} ${invitation.shortName} hân hoan ngày tốt nghiệp`}
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_15%]"
                    style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 25%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%)' }}
                  />
                </div>
              </div>

              {/* Surrounding Floral Accents & Ribbon Bow */}
              <div className="absolute -bottom-8 -right-8 w-64 h-64 pointer-events-none z-30">
                <img decoding="async" loading="lazy"
                  src="/assets/invitation-decor/bouquet-cluster.png"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-contain filter drop-shadow-sm opacity-95 scale-x-[-1]"
                />
              </div>

              <div className="absolute -top-6 -left-6 w-32 h-32 pointer-events-none z-30">
                <img decoding="async" loading="lazy"
                  src="/assets/invitation-decor/floral-sprig.png"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-contain rotate-[-30deg] opacity-90"
                />
              </div>
            </div>

          </div>

          {/* Bottom-Left Watercolor Floral Sprig & Streamer */}
          <div className="absolute bottom-0 left-0 w-52 h-52 pointer-events-none z-10 -ml-6 -mb-6">
            <img decoding="async" loading="lazy"
              src="/assets/invitation-decor/bouquet-cluster.png"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain filter drop-shadow-sm opacity-90"
            />
          </div>

          {/* Bottom Ribbon Streamer */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-24 pointer-events-none z-10 opacity-70 mix-blend-multiply">
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
          GATE 5 MOBILE (<lg):
          Independent mobile composition matching gate5-mobile-target.png
          - Top header
          - Celebrating photo with floral framing
          - Title 'Hẹn gặp lại vào ngày đặc biệt!'
          - Closing note
          - Heart divider
          - Google Maps CTA button
          - Share CTA button
          - Bottom tagline & identity
          ============================================================ */}
      <div className="lg:hidden flex flex-col w-full max-w-[430px] mx-auto bg-[#fbfaf7] rounded-xl border border-[#b8cee2] p-2.5 sm:p-3 shadow-[0_15px_35px_rgba(160,190,220,0.25)] relative overflow-hidden z-10 my-2">
        <div className="relative w-full rounded-lg border border-[#c8d9ea] p-4 flex flex-col items-center overflow-hidden">
          
          {/* Top Running Header Bar */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-[#e2edf7]">
            <span className="text-[10px] font-sans tracking-[0.25em] text-[#557699] uppercase font-semibold">
              CLASS OF {invitation.graduationYear} &bull; COMMENCEMENT
            </span>
          </div>

          {/* Celebrating Photo with Floral Framing */}
          <div className="relative w-[calc(100%+32px)] -mx-4 h-[250px] overflow-hidden mt-1 mb-2">
            <div className="w-full h-full overflow-hidden bg-[#eef3f8]">
              <img decoding="async"
                src={invitation.photos.cover}
                alt="Hẹn gặp lại trong Lễ Tốt Nghiệp"
                loading="lazy"
                className="w-full h-full object-cover object-[center_28%]"
                style={{ maskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)' }}
              />
            </div>
            {/* Top-Right Floral Sprig */}
            <div className="absolute -top-4 -right-4 w-20 h-20 pointer-events-none opacity-90">
              <img decoding="async" loading="lazy"
                src="/assets/invitation-decor/floral-sprig.png"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-contain rotate-12"
              />
            </div>
          </div>

          {/* Script Title */}
          <h2 className="font-script font-normal text-4xl sm:text-5xl text-[#2d5584] leading-tight text-center mt-3 mb-2 select-none">
            Hẹn gặp lại<br />
            vào ngày đặc biệt!
          </h2>

          {/* Closing Note */}
          <p className="font-serif italic text-[#385679] text-sm leading-relaxed text-center px-2 max-w-[320px] mx-auto mb-2">
            Cảm ơn bạn đã xem thiệp mời của mình.<br />
            Mình rất mong được gặp bạn tại lễ tốt nghiệp<br />
            để cùng nhau tạo nên một kỷ niệm thật đẹp.
          </p>

          {/* Heart Divider */}
          <div className="flex items-center justify-center my-2">
            <Heart className="w-3.5 h-3.5 fill-[#2d5584] text-[#2d5584]" />
          </div>

          {/* Google Maps CTA Pill */}
          <a
            href={invitation.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Xem chỉ đường Google Maps"
            className="w-full max-w-[280px] py-3.5 px-6 rounded-full bg-[#3d658e] hover:bg-[#30557b] text-white text-xs font-sans tracking-[0.2em] font-semibold uppercase text-center shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer min-h-[44px]"
          >
            <MapPin className="w-4 h-4" />
            <span>XEM CHỈ ĐƯỜNG &rarr;</span>
          </a>

          {/* Share CTA Button */}
          <button
            type="button"
            onClick={handleShare}
            aria-label="Chia sẻ thiệp mời"
            className="w-full max-w-[280px] py-3 px-6 rounded-full bg-white hover:bg-slate-50 border border-[#b8cee2] text-[#30557b] text-xs font-sans tracking-[0.18em] font-semibold uppercase text-center shadow-xs flex items-center justify-center gap-2 mt-2.5 cursor-pointer min-h-[44px]"
          >
            {shareFeedback ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span aria-live="polite">{shareFeedback ?? 'CHIA SẺ THIỆP'}</span>
          </button>

          {/* Bottom Tagline & Identity */}
          <div className="text-center mt-5 pt-3 border-t border-[#e2edf7] w-full">
            <p className="font-sans text-[9px] tracking-[0.25em] text-[#557699] uppercase font-semibold">
              {invitation.ceremonyDateFormatted} &bull; {invitation.ceremonyTimeDisplay}
            </p>
            <p className="font-serif italic text-xs text-[#2c4d72] mt-1">
              {invitation.graduateName} &bull; Class of {invitation.graduationYear}
            </p>
            <p className="font-sans text-[10px] text-[#557699] mt-1">{invitation.school}</p>
          </div>

        </div>
      </div>
    </section>
  );
};
