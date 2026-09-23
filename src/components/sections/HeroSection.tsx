import React from 'react';
import { ArrowDown } from 'lucide-react';
import { invitation } from '../../config/invitation';
import { RibbonKnotIcon } from '../ui/InvitationDecor';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      aria-label="Phần mở đầu Lễ Tốt Nghiệp"
      className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center bg-[#eef3f8] text-[#162e51] overflow-hidden p-3 sm:p-5 lg:p-6"
    >
      {/* 
        ==================================================
        DESKTOP HERO (lg+):
        Direct pixel-accurate composition of design-targets/hero-desktop-target.png
        Reveals gown, bouquet, stairs, and keeps annotation off the body
        ==================================================
      */}
      <div className="hidden lg:flex w-full max-w-[1380px] h-[850px] max-h-[95vh] my-auto mx-auto bg-[#fbfaf7] rounded-xl border border-[#b8cee2] p-2.5 lg:p-3.5 shadow-[0_20px_50px_rgba(160,190,220,0.3)] relative overflow-hidden flex-col z-10">
        
        {/* Inner Hairline Frame */}
        <div className="relative w-full h-full rounded-lg border border-[#c8d9ea] overflow-hidden flex flex-col justify-between p-6 lg:p-8">
          
          {/* 1. Integrated Right Photo: Full seated pose showing gown, hands, bouquet & stairs */}
          <div className="absolute inset-y-0 right-0 w-[55%] overflow-hidden pointer-events-none z-0">
            <img
              src={invitation.photos.hero}
              alt={invitation.graduateName}
              loading="eager"
              className="w-full h-full object-cover object-[center_26%]"
              style={{
                maskImage: 'linear-gradient(to left, black 65%, transparent 98%)',
                WebkitMaskImage: 'linear-gradient(to left, black 65%, transparent 98%)'
              }}
            />
            {/* Smooth gradient overlay to blend staircase into #fbfaf7 */}
            <div className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[#fbfaf7] via-[#fbfaf7]/60 to-transparent" />
          </div>

          {/* Top-Right Ribbon Bow: In corner above stairs, safely off face and hair */}
          <div className="absolute -top-4 -right-4 w-40 h-40 xl:-top-6 xl:-right-6 xl:w-72 xl:h-72 pointer-events-none opacity-90 mix-blend-multiply z-30">
            <img
              src="/assets/invitation-decor/ribbon-bow.jpg"
              alt=""
              className="w-full h-full object-contain -rotate-12"
              style={{ filter: 'contrast(1.1) brightness(1.02)' }}
            />
          </div>

          {/* 
            Handwritten script annotation:
            STRICTLY off the graduate's face, hair, gown, sash, bouquet and hands.
            Positioned in the open background space between her arm and the right edge, stacked as in target.
          */}
          <div className="absolute top-[35%] right-[3.5%] z-20 pointer-events-none select-none text-center -rotate-6">
            <span className="font-script text-2xl xl:text-3xl text-[#557699] font-normal leading-[1.15] block tracking-wide">
              Một thời<br />
              áo trắng<br />
              <span className="text-xl inline-block mt-0.5">&hearts;</span>
            </span>
          </div>

          {/* Bottom-Right Blue Floral Cluster overlapping bottom edge & bouquet */}
          <div className="absolute -bottom-8 right-2 w-64 h-64 pointer-events-none opacity-90 mix-blend-multiply z-30">
            <img
              src="/assets/invitation-decor/floral-sprig.jpg"
              alt=""
              className="w-full h-full object-contain"
              style={{ filter: 'contrast(1.12) brightness(1.02)' }}
            />
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
              <span className="text-[11px] font-sans tracking-[0.22em] text-[#557699] uppercase font-semibold">
                {invitation.ceremonyDateFormatted}
              </span>
            </div>
          </div>

          {/* 3. Left Typography Block: Calibrated scale to balance with photo mass */}
          <div className="absolute inset-y-0 left-0 w-[48%] flex flex-col justify-center text-left p-8 lg:p-12 z-20">
            
            {/* Eyebrow */}
            <span className="text-xs font-sans tracking-[0.28em] text-[#557699] uppercase font-semibold block mb-2">
              LỄ TỐT NGHIỆP LỚP 12
            </span>

            {/* Monumental name: script family name and serif given name. */}
            <div className="my-1">
              <span className="font-script text-6xl xl:text-7xl text-[#3d658e] font-normal leading-tight block mb-0 select-none">
                {invitation.familyName}
              </span>
              <h1 className="name-display text-5xl lg:text-6xl xl:text-[4.2rem] text-[#142b4a] font-normal tracking-wide uppercase leading-none mb-3 whitespace-nowrap">
                {invitation.shortName.toLocaleUpperCase('vi-VN')}
              </h1>
            </div>

            {/* Ceremony Subtitle & Date with Ribbon Knot */}
            <div className="space-y-1.5 mb-5">
              <p className="text-xs font-sans tracking-[0.28em] text-[#4d6c8e] uppercase font-semibold">
                {invitation.graduationContext.toLocaleUpperCase('vi-VN')}
              </p>
              <div className="flex items-center gap-2 pt-0.5">
                <RibbonKnotIcon className="w-5 h-4 text-[#7ea4cb]" />
                <span className="text-xs font-sans tracking-[0.22em] text-[#6b88a8] uppercase font-medium">
                  {invitation.ceremonyDateFormatted}
                </span>
              </div>
            </div>

            {/* Poetic Graduation Quote */}
            <div className="max-w-md my-2">
              <p className="font-serif italic text-base xl:text-lg text-[#4d6888] leading-relaxed">
                &ldquo;Cột mốc của những ước mơ,<br />
                khởi đầu cho những hành trình mới.&rdquo;
              </p>
            </div>

          </div>

          {/* 4. Bottom Colophon Row */}
          <div className="flex items-end justify-between z-20 relative">
            <div className="text-left text-[10px] font-sans text-[#6885a3] tracking-[0.18em] uppercase leading-tight font-medium">
              <span>{invitation.school}</span>
            </div>

            <div className="text-right">
              <a
                href="#gate-2"
                aria-label="Khám phá câu chuyện lễ tốt nghiệp"
                className="inline-flex items-center gap-1.5 text-[10px] font-sans text-[#557699] tracking-[0.2em] uppercase font-semibold hover:text-[#142b4a] transition-colors"
              >
                <span>KHÁM PHÁ CÂU CHUYỆN</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* 
        ==================================================
        MOBILE HERO (< lg):
        Direct pixel-accurate continuous natural flow of design-targets/hero-mobile-target.png
        - Ribbon strictly outside face safe-zone (top-right decorative corner)
        - Zero dead whitespace: continuous natural document flow
        - Gown, bouquet, seated pose, and surrounding stairs visible
        - Natural vertical density: photo (~380px) -> transition -> title -> name -> date -> 28px -> quote -> 24px -> cue
        ==================================================
      */}
      <div className="lg:hidden w-full min-h-[100dvh] flex flex-col justify-center items-center py-2 px-3 bg-[#eef3f8]">
        {/* Natural height card matching target proportions */}
        <div className="w-full max-w-[364px] bg-[#fbfaf7] rounded-2xl border border-[#b8cee2] p-2.5 shadow-[0_12px_36px_rgba(160,190,220,0.35)] relative overflow-hidden flex flex-col">
          
          {/* Inner Hairline Frame */}
          <div className="w-full rounded-xl border border-[#c8d9ea] p-3.5 flex flex-col relative overflow-hidden">
            
            {/* Top Running Header */}
            <div className="flex items-center justify-between pb-1 z-20 relative w-full">
              <span className="text-[10px] font-sans tracking-[0.25em] text-[#557699] uppercase font-semibold whitespace-nowrap">
                CLASS OF {invitation.graduationYear}
              </span>
              <span className="text-[10px] font-sans tracking-[0.18em] text-[#557699] uppercase font-semibold">
                {invitation.ceremonyDateFormatted}
              </span>
            </div>

            {/* Photo Section: ~385px natural height, showing seated pose, gown, bouquet & surrounding stairs */}
            <div className="relative h-[385px] shrink-0 overflow-hidden pointer-events-none -mx-3.5 w-[calc(100%+28px)]">
              <img
                src={invitation.photos.hero}
                alt={invitation.graduateName}
                className="w-full h-full object-cover object-[center_36%]"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 80%, transparent 98%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 98%)'
                }}
              />
              <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#fbfaf7] via-[#fbfaf7]/40 to-transparent" />

              {/* 
                FACE SAFE ZONE:
                Ribbon bow strictly anchored in the upper-right corner over empty stairs/border.
                Completely clear (>40px margin) of face, eyes, hairline, and sash.
              */}
              <div className="absolute -top-2.5 -right-2.5 w-26 h-26 pointer-events-none opacity-90 mix-blend-multiply z-20">
                <img
                  src="/assets/invitation-decor/ribbon-bow.jpg"
                  alt=""
                  className="w-full h-full object-contain -rotate-12"
                  style={{ filter: 'contrast(1.1) brightness(1.02)' }}
                />
              </div>

              {/* Left Floral Accent climbing along stairs edge */}
              <div className="absolute bottom-4 -left-3 w-28 h-28 pointer-events-none opacity-85 mix-blend-multiply z-10">
                <img
                  src="/assets/invitation-decor/floral-sprig.jpg"
                  alt=""
                  className="w-full h-full object-contain -rotate-45"
                  style={{ filter: 'contrast(1.12) brightness(1.02)' }}
                />
              </div>

              {/* Right Floral Accent */}
              <div className="absolute bottom-6 -right-3 w-28 h-28 pointer-events-none opacity-85 mix-blend-multiply z-10">
                <img
                  src="/assets/invitation-decor/floral-sprig.jpg"
                  alt=""
                  className="w-full h-full object-contain rotate-45"
                  style={{ filter: 'contrast(1.12) brightness(1.02)' }}
                />
              </div>
            </div>

            {/* Continuous Identity Content Block: Natural document flow directly below photo */}
            <div className="flex flex-col items-center text-center -mt-3 z-20 relative">
              
              {/* Eyebrow */}
              <span className="text-[10px] font-sans tracking-[0.25em] text-[#557699] uppercase font-semibold block mb-0.5">
                LỄ TỐT NGHIỆP LỚP 12
              </span>

              {/* Graduate name: script family name and serif given name. */}
              <div className="my-0.5 space-y-0 text-[#142b4a]">
                <span className="font-script text-[42px] text-[#3d658e] font-normal leading-tight block select-none -mb-1">
                  {invitation.familyName}
                </span>
                <h1 className="name-display text-[32px] sm:text-[34px] font-normal tracking-wide uppercase leading-none">
                  {invitation.shortName.toLocaleUpperCase('vi-VN')}
                </h1>
              </div>

              {/* Ceremony Subtitle & Ribbon Knot */}
              <div className="mt-2 mb-1 space-y-0.5">
                <p className="text-[10px] font-sans tracking-[0.24em] text-[#4d6c8e] uppercase font-semibold">
                  {invitation.graduationContext.toLocaleUpperCase('vi-VN')}
                </p>
                <div className="flex items-center justify-center gap-1.5 pt-0.5">
                  <RibbonKnotIcon className="w-4 h-3.5 text-[#7ea4cb]" />
                  <span className="text-[10px] font-sans tracking-[0.18em] text-[#6b88a8] uppercase font-medium">
                    {invitation.ceremonyDateFormatted}
                  </span>
                </div>
              </div>

              {/* 24–40px gap: Poetic Quote */}
              <div className="mt-6 mb-5 max-w-[280px]">
                <p className="font-serif italic text-xs text-[#527092] leading-relaxed">
                  &ldquo;Cột mốc của những ước mơ,<br />
                  khởi đầu cho những hành trình mới.&rdquo;
                </p>
              </div>

              {/* 20–32px gap: Scroll Cue */}
              <div className="pb-1">
                <a
                  href="#gate-2"
                  aria-label="Khám phá câu chuyện lễ tốt nghiệp"
                  className="inline-flex items-center gap-1 text-[10px] font-sans text-[#557699] tracking-[0.18em] uppercase font-semibold hover:text-[#142b4a] transition-colors"
                >
                  <span>KHÁM PHÁ CÂU CHUYỆN</span>
                  <ArrowDown className="w-3 h-3 animate-bounce" />
                </a>
              </div>

            </div>

            {/* Bottom Corners Floral Accents */}
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
    </section>
  );
};
