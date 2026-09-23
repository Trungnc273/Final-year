import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { invitation } from '../../config/invitation';
import { RibbonKnotIcon } from '../ui/InvitationDecor';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const Gate2Section: React.FC = () => {
  // Check for recipient personalization (?to=...)
  const [recipient, setRecipient] = useState<string>('');
  const [isExpandedMobile, setIsExpandedMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to');
      if (to) {
        setRecipient(to.trim().replace(/[<>"/\\#]/g, '').slice(0, 50));
      }
    }
  }, []);

  // Countdown timer logic
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetDate = new Date(invitation.ceremonyStartAt);
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isPast: false
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const padZero = (n: number) => String(n).padStart(2, '0');

  // Month in English as displayed in locked target
  const ceremonyDateObj = new Date(`${invitation.ceremonyDate}T00:00:00Z`);
  const ceremonyDay = invitation.ceremonyDate.slice(8);
  const ceremonyMonthYear = ceremonyDateObj
    .toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    .toUpperCase(); // e.g. "OCTOBER 2026"

  return (
    <section
      id="gate-2"
      aria-label="Thư ngỏ & Thông tin Lễ Tốt Nghiệp"
      className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center bg-[#eef3f8] text-[#162e51] overflow-hidden p-2 sm:p-4 lg:p-5"
    >
      {/* 
        ==================================================
        GATE 2 DESKTOP (lg+):
        Direct pixel-accurate calibration of design-targets/gate2-desktop-target.png
        - Top: Header bar with tight top margin, major composition moved upward by ~80px
        - Left: Commanding framed portrait (h-650px) with ribbon & rich bouquet cluster
        - Center: "Thư ngỏ" invitation letter starting at the top baseline
        - Right: SAVE THE DATE, event day (framed cleanly by outer floral),
                 Spacious Countdown, Venue, Line Art & Wide Pill CTA
        ==================================================
      */}
      <div className="hidden lg:flex w-full max-w-[1400px] h-[875px] max-h-[97vh] my-auto mx-auto bg-[#fbfaf7] rounded-xl border border-[#b8cee2] p-2.5 lg:p-3 shadow-[0_20px_50px_rgba(160,190,220,0.3)] relative overflow-hidden flex-col z-10">
        
        {/* Inner Hairline Frame */}
        <div className="relative w-full h-full rounded-lg border border-[#c8d9ea] overflow-hidden flex flex-col justify-start p-5 xl:p-6 pb-8">
          
          {/* Top Running Header Bar (Compact top margin) */}
          <div className="flex items-center justify-between z-20 relative shrink-0 pt-0 pb-3 xl:pb-4">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-sans tracking-[0.28em] text-[#557699] uppercase font-semibold whitespace-nowrap">
                CLASS OF {invitation.graduationYear} &bull; COMMENCEMENT
              </span>
              <div className="h-[1px] bg-[#b8cee2] w-40 xl:w-64" />
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

          {/* 3-Column Core Composition Spread (Moved upward, starting directly below header) */}
          <div className="relative w-full flex-1 flex items-start gap-5 xl:gap-7 z-20 mt-1 xl:mt-2">
            
            {/* ── COLUMN 1: Framed Editorial Portrait (~33% width, tall commanding presence) ── */}
            <div className="w-[33%] h-full flex flex-col justify-start items-center relative pl-1">
              
              {/* Photo Mat Frame matching target stationery with paper shadow */}
              <div className="relative w-full max-w-[420px] bg-white p-3 rounded shadow-[0_16px_45px_rgba(20,43,74,0.16)] border border-[#e2e8f0]">
                
                {/* Photo container: tall, commanding editorial presence */}
                <div className="relative w-full h-[645px] overflow-hidden rounded-sm bg-[#eef3f8]">
                  <img decoding="async"
                    src={invitation.photos.hero}
                    alt={invitation.graduateName}
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_26%]"
                  />

                  {/* Handwritten annotation on empty stairs/wall beside subject */}
                  <div className="absolute top-[5%] right-3 z-20 pointer-events-none select-none text-right -rotate-6">
                    <span className="font-script text-2xl xl:text-3xl text-[#4a729e] font-normal leading-[1.1] block">
                      Một thời<br />
                      áo trắng<br />
                      <span className="text-xl inline-block mt-0.5">&hearts;</span>
                    </span>
                  </div>
                </div>

                {/* Top-Left Ribbon Bow on Photo Frame Corner (Transparent PNG) */}
                <div className="absolute -top-10 -left-10 w-52 h-52 pointer-events-none z-30 drop-shadow-[0_4px_12px_rgba(61,101,142,0.18)]">
                  <img decoding="async" loading="lazy"
                    src="/assets/invitation-decor/ribbon-bow.png"
                    alt=""
                    className="w-full h-full object-contain -rotate-12"
                  />
                </div>

                {/* Bottom-Left Floral Cluster: Rich watercolor cluster anchoring the corner (Transparent PNG) */}
                <div className="absolute -bottom-14 -left-14 w-72 h-72 pointer-events-none z-30 drop-shadow-[0_6px_16px_rgba(61,101,142,0.18)]">
                  <img decoding="async" loading="lazy"
                    src="/assets/invitation-decor/bouquet-cluster.png"
                    alt=""
                    className="w-full h-full object-contain -rotate-12"
                  />
                </div>
              </div>
            </div>

            {/* ── COLUMN 2: "Thư ngỏ" Personal Invitation Letter (~29% width, starting at top baseline) ── */}
            <div className="w-[29%] h-full flex flex-col justify-start pt-2 px-2 xl:px-4 relative text-left">
              
              {/* Title: Flowing Calligraphy */}
              <div className="mb-3 xl:mb-4">
                <span className="font-script text-7xl xl:text-8xl text-[#3d658e] font-normal leading-none block select-none">
                  Thư ngỏ
                </span>
              </div>

              {/* Salutation */}
              <p className="font-serif italic text-lg xl:text-xl text-[#142b4a] font-medium mb-3">
                Thân gửi{recipient ? ` ${recipient},` : ','}
              </p>

              {/* Body Prose matching target stationery layout */}
              <div className="space-y-4 font-serif italic text-[15.5px] xl:text-[16.5px] text-[#2d435f] leading-[1.8]">
                <p>
                  Sau những năm tháng học tập và trưởng thành dưới mái trường, mình sắp khép lại một chương thật đẹp của tuổi học trò.
                </p>
                <p>
                  Ngày tốt nghiệp là dịp để mình chia sẻ khoảnh khắc đặc biệt này với những người mình trân quý.
                </p>
                <p>
                  Mình rất vui nếu bạn có thể đến và cùng lưu lại những kỷ niệm đẹp. Hẹn gặp bạn nhé!
                </p>
              </div>

              {/* Sign-off & Handwritten Signature (Personal handwritten scale) */}
              <div className="mt-5 xl:mt-6">
                <p className="font-serif italic text-base text-[#4d6888] mb-0.5">
                  Trân trọng,
                </p>
                <span className="font-script text-4xl xl:text-[44px] text-[#3d658e] block font-normal leading-tight select-none">
                  {invitation.familyName} {invitation.shortName}
                </span>
              </div>

              {/* Decorative Motto at Bottom of Letter */}
              <div className="mt-6 text-center">
                <span className="text-[10px] font-sans tracking-[0.25em] text-[#7ea4cb] uppercase font-semibold block">
                  CLASS OF {invitation.graduationYear} &bull; NEW BEGINNINGS
                </span>
              </div>

              {/* Vertical Hairline Separator between Center and Right Columns */}
              <div className="absolute right-0 top-2 bottom-6 w-[1px] bg-[#dbe5ee]" />
            </div>

            {/* ── COLUMN 3: Save The Date, Monumental Event & Venue (~38% width, substantially enlarged focal mass) ── */}
            <div className="w-[38%] h-full flex flex-col items-center justify-start pt-1 pl-4 pr-1 relative text-center">
              
              {/* Top-Right Outer Floral Corner Accent (Framing cleanly without obscuring text) */}
              <div className="absolute -top-10 -right-8 w-56 h-56 pointer-events-none z-10">
                <img decoding="async" loading="lazy"
                  src="/assets/invitation-decor/floral-sprig.png"
                  alt=""
                  className="w-full h-full object-contain rotate-12"
                />
              </div>

              {/* Save The Date Header with flanking hairline rules */}
              <div className="w-full pt-0.5">
                <div className="flex items-center justify-center gap-3">
                  <div className="h-[1px] bg-[#c8d9ea] w-20 xl:w-28" />
                  <span className="text-xs xl:text-sm font-sans tracking-[0.32em] text-[#557699] uppercase font-semibold">
                    SAVE THE DATE
                  </span>
                  <div className="h-[1px] bg-[#c8d9ea] w-20 xl:w-28" />
                </div>

                {/* Monumental event day (major focal anchor) */}
                <div className="my-0 relative inline-block">
                  <span className="font-serif text-[170px] xl:text-[195px] leading-[0.82] text-[#1b3b64] font-medium tracking-tight block select-none">
                    {ceremonyDay}
                  </span>
                </div>

                {/* Month & Year (Expanded typographic scale spanning width) */}
                <h3 className="font-serif text-[34px] xl:text-[42px] tracking-[0.26em] text-[#142b4a] uppercase font-normal leading-tight mt-1.5">
                  {ceremonyMonthYear}
                </h3>

                {/* Ceremony Subtitle & Ribbon Knot */}
                <div className="mt-1.5 space-y-1">
                  <p className="text-xs xl:text-[13.5px] font-sans tracking-[0.28em] text-[#557699] uppercase font-semibold">
                    LỄ TỐT NGHIỆP LỚP 12
                  </p>
                  <div className="flex justify-center">
                    <RibbonKnotIcon className="w-5 h-4 text-[#7ea4cb]" />
                  </div>
                </div>
              </div>

              {/* Typographic Countdown (Generous width, prominent numbers, clear vertical dividers) */}
              <div className="w-full max-w-[480px] my-4 py-3.5 border-t border-b border-[#dbe7f2]">
                {timeLeft.isPast ? (
                  <div className="text-xs font-serif italic text-[#3d658e]">
                    Buổi lễ đã diễn ra &bull; Cảm ơn sự hiện diện quý báu của tất cả mọi người!
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-8 xl:gap-11">
                    <div className="flex flex-col items-center">
                      <span key={timeLeft.seconds} className="countdown-tick font-serif text-4xl xl:text-5xl text-[#142b4a] font-normal leading-none">
                        {timeLeft.days}
                      </span>
                      <span className="font-sans text-[10px] xl:text-[11px] tracking-[0.22em] text-[#6b88a8] uppercase font-semibold mt-1.5">
                        NGÀY
                      </span>
                    </div>

                    <div className="w-[1px] h-10 xl:h-12 bg-[#c8d9ea]" />

                    <div className="flex flex-col items-center">
                      <span className="font-serif text-4xl xl:text-5xl text-[#142b4a] font-normal leading-none">
                        {padZero(timeLeft.hours)}
                      </span>
                      <span className="font-sans text-[10px] xl:text-[11px] tracking-[0.22em] text-[#6b88a8] uppercase font-semibold mt-1.5">
                        GIỜ
                      </span>
                    </div>

                    <div className="w-[1px] h-10 xl:h-12 bg-[#c8d9ea]" />

                    <div className="flex flex-col items-center">
                      <span className="font-serif text-4xl xl:text-5xl text-[#142b4a] font-normal leading-none">
                        {padZero(timeLeft.minutes)}
                      </span>
                      <span className="font-sans text-[10px] xl:text-[11px] tracking-[0.22em] text-[#6b88a8] uppercase font-semibold mt-1.5">
                        PHÚT
                      </span>
                    </div>

                    <div className="w-[1px] h-10 xl:h-12 bg-[#c8d9ea]" />

                    <div className="flex flex-col items-center">
                      <span className="font-serif text-4xl xl:text-5xl text-[#142b4a] font-normal leading-none">
                        {padZero(timeLeft.seconds)}
                      </span>
                      <span className="font-sans text-[10px] xl:text-[11px] tracking-[0.22em] text-[#6b88a8] uppercase font-semibold mt-1.5">
                        GIÂY
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Venue & Location Row (Enhanced readability & typography) */}
              <div className="w-full flex items-start justify-center gap-2.5 text-center px-1 mb-2.5">
                <MapPin className="w-5 h-5 text-[#3d6894] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm xl:text-[15px] font-sans font-semibold tracking-wider text-[#142b4a] uppercase leading-tight">
                    {invitation.school}
                  </p>
                  <p className="text-xs xl:text-[12.5px] font-sans text-[#5c7a9c] tracking-wide mt-1 leading-tight">
                    {invitation.ceremonyTimeDisplay}
                  </p>
                </div>
              </div>

              {/* Architectural Illustration & Map CTA (Substantially enlarged vignette and wide CTA) */}
              <div className="relative w-full max-w-[480px] flex flex-col items-center justify-center">
                {/* Architectural Building Vignette (Transparent PNG, majestic presence) */}
                <div className="w-full h-44 xl:h-48 overflow-hidden pointer-events-none opacity-90">
                  <img decoding="async" loading="lazy"
                    src="/assets/invitation-decor/decorative-facade.png"
                    alt=""
                    className="w-full h-full object-contain object-bottom"
                  />
                </div>

                {/* Primary Pill Button CTA centered over the illustration base */}
                <a
                  href={invitation.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-1 inline-flex items-center justify-center gap-3 w-full max-w-[360px] py-4 px-8 rounded-lg bg-[#4477a3] hover:bg-[#36648b] text-white text-xs xl:text-[13.5px] font-sans font-semibold tracking-[0.24em] uppercase shadow-[0_6px_20px_rgba(68,119,163,0.38)] transition-all hover:shadow-[0_8px_24px_rgba(68,119,163,0.48)] active:scale-[0.98] z-20 cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>XEM CHỈ ĐƯỜNG &rarr;</span>
                </a>
              </div>

            </div>

          </div>

          {/* Bottom Border Decoration Row: Controlled flowing ribbon streamer & right-aligned note */}
          <div className="relative w-full flex items-center justify-between z-20 pt-1 shrink-0">
            {/* Graceful flowing ribbon streamer across bottom (Subtle height, transparent PNG) */}
            <div className="absolute inset-x-0 bottom-0 h-9 pointer-events-none opacity-55 z-10 overflow-hidden">
              <img decoding="async" loading="lazy"
                src="/assets/invitation-decor/ribbon-streamer.png"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Bottom-right handwritten note (Strictly right-aligned per target) */}
            <div className="absolute right-6 bottom-2.5 z-20 select-none">
              <span className="font-script text-2xl xl:text-3xl text-[#4a6e94] font-normal tracking-wide">
                Hẹn gặp bạn tại đây &hearts;
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* 
        ==================================================
        GATE 2 MOBILE (< lg):
        Strictly calibrated to fit completely within 390 × 844 viewport!
        - Top running header
        - Photo frame with calibrated height (h-[265px]), bouquet & sash visible
        - Ribbon in upper-right corner, florals on outer border (off the gown)
        - "Thư ngỏ" Personal Letter with concise default & subtle non-navigating expand
        - Save The Date with event day
        - Typographic Countdown with compact vertical padding
        - Venue & Address
        - Map CTA (touch height >= 44px)
        - Bottom safe area: "Hẹn gặp bạn tại đây ♥" fully visible on screen!
        ==================================================
      */}
      <div className="lg:hidden w-full min-h-[100dvh] flex flex-col justify-center items-center py-1.5 px-3 bg-[#eef3f8]">
        {/* Natural continuous flow card fitting completely in 390x844 */}
        <div className="w-full max-w-[364px] bg-[#fbfaf7] rounded-2xl border border-[#b8cee2] p-2 shadow-[0_12px_36px_rgba(160,190,220,0.35)] relative overflow-hidden flex flex-col">
          
          {/* Inner Hairline Frame with safe bottom padding */}
          <div className="w-full rounded-xl border border-[#c8d9ea] p-3 flex flex-col relative overflow-hidden pb-4">
            
            {/* Top Running Header */}
            <div className="flex items-center gap-2 pb-1.5 z-20 relative w-full">
              <span className="text-[10px] font-sans tracking-[0.25em] text-[#557699] uppercase font-semibold whitespace-nowrap">
                CLASS OF {invitation.graduationYear}
              </span>
              <div className="h-[1px] bg-[#b8cee2] flex-1" />
            </div>

            {/* Framed Photo Section (Calibrated height: h-[265px], clear face, sash, bouquet) */}
            <div className="relative w-full h-[265px] shrink-0 overflow-hidden pointer-events-none -mx-3 w-[calc(100%+24px)] bg-[#eef3f8]">
              <img decoding="async" loading="lazy"
                src={invitation.photos.hero}
                alt={invitation.graduateName}
                className="w-full h-full object-cover object-[center_28%]"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 80%, transparent 98%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 98%)'
                }}
              />
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#fbfaf7] via-[#fbfaf7]/60 to-transparent" />

              {/* 
                FACE SAFE ZONE:
                Ribbon bow strictly anchored in the upper-right corner over empty stairs/border.
                Completely clear (>40px margin) of face, eyes, hairline, and sash.
              */}
              <div className="absolute -top-2.5 -right-2.5 w-24 h-24 pointer-events-none z-20 drop-shadow-[0_4px_8px_rgba(61,101,142,0.18)]">
                <img decoding="async" loading="lazy"
                  src="/assets/invitation-decor/ribbon-bow.png"
                  alt=""
                  className="w-full h-full object-contain -rotate-12"
                />
              </div>

              {/* Handwritten note on stairs */}
              <div className="absolute top-[22%] right-3 z-20 pointer-events-none select-none text-right -rotate-6">
                <span className="font-script text-base text-[#4a729e] font-normal leading-tight block">
                  Một thời<br />
                  áo trắng<br />
                  <span className="text-xs inline-block mt-0.5">&hearts;</span>
                </span>
              </div>

              {/* Left Floral Accent (Positioned on outer border fade, off person) */}
              <div className="absolute bottom-0 -left-4 w-24 h-24 pointer-events-none z-10">
                <img decoding="async" loading="lazy"
                  src="/assets/invitation-decor/floral-sprig.png"
                  alt=""
                  className="w-full h-full object-contain -rotate-45"
                />
              </div>

              {/* Right Floral Accent (Positioned on outer right border fade, completely off gown) */}
              <div className="absolute bottom-0 -right-4 w-24 h-24 pointer-events-none z-10">
                <img decoding="async" loading="lazy"
                  src="/assets/invitation-decor/floral-sprig.png"
                  alt=""
                  className="w-full h-full object-contain rotate-45"
                />
              </div>
            </div>

            {/* "Thư ngỏ" Personal Letter Block (Compact elegant rhythm) */}
            <div className="flex flex-col items-center text-center -mt-1 z-20 relative px-2">
              <span className="font-script text-3xl text-[#3d658e] font-normal leading-tight block select-none mb-0.5">
                Thư ngỏ
              </span>

              <p className="font-serif italic text-sm text-[#142b4a] font-medium mb-1">
                Thân gửi{recipient ? ` ${recipient},` : ','}
              </p>

              {/* Concise default letter matching mobile target with optional subtle expand */}
              <div className="space-y-2 font-serif italic text-[15px] text-[#2d435f] leading-[1.6] max-w-[320px]">
                <p>
                  Sau những năm tháng học tập dưới mái trường, mình sắp khép lại một chương thật đẹp của tuổi học trò.
                </p>

                {isExpandedMobile && (
                  <p className="transition-all duration-300">
                    Ngày tốt nghiệp là dịp để mình chia sẻ khoảnh khắc đặc biệt này với những người mình trân quý.
                  </p>
                )}

                <p>
                  Mình rất vui nếu bạn có thể đến và cùng lưu lại những kỷ niệm đẹp. Hẹn gặp bạn nhé!
                </p>
              </div>

              {/* Subtle Expand / Collapse Button */}
              <button
                type="button"
                onClick={() => setIsExpandedMobile(!isExpandedMobile)}
                className="mt-0.5 inline-flex items-center gap-1 text-[9.5px] font-sans tracking-wider text-[#557699] hover:text-[#3d658e] uppercase font-semibold py-0.5 px-1.5 rounded cursor-pointer transition-colors"
                aria-expanded={isExpandedMobile}
                aria-label={isExpandedMobile ? "Thu gọn thư mời" : "Đọc tiếp thư mời"}
              >
                <span>{isExpandedMobile ? "Thu gọn" : "Đọc tiếp"}</span>
                {isExpandedMobile ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              <div className="mt-1 mb-2">
                <span className="font-script text-2xl text-[#3d658e] block font-normal leading-tight select-none">
                  {invitation.familyName} {invitation.shortName} &hearts;
                </span>
              </div>
            </div>

            {/* Save The Date Block (Compact & crisp) */}
            <div className="flex flex-col items-center text-center z-20 relative pt-1.5 border-t border-[#e2edf6]">
              <div className="flex items-center justify-center gap-2">
                <div className="h-[1px] bg-[#c8d9ea] w-8" />
                <span className="text-[9.5px] font-sans tracking-[0.25em] text-[#557699] uppercase font-semibold">
                  SAVE THE DATE
                </span>
                <div className="h-[1px] bg-[#c8d9ea] w-8" />
              </div>

              {/* Event day */}
              <div className="my-0">
                <span className="font-serif text-[58px] leading-none text-[#1b3b64] font-medium tracking-tight block select-none">
                  {ceremonyDay}
                </span>
              </div>

              {/* Month & Year */}
              <h3 className="font-serif text-base tracking-[0.2em] text-[#142b4a] uppercase font-normal leading-tight">
                {ceremonyMonthYear}
              </h3>

              {/* Ceremony Subtitle & Ribbon Knot */}
              <div className="mt-0.5 space-y-0.5">
                <p className="text-[8.5px] font-sans tracking-[0.22em] text-[#557699] uppercase font-semibold">
                  LỄ TỐT NGHIỆP LỚP 12
                </p>
                <div className="flex justify-center">
                  <RibbonKnotIcon className="w-3.5 h-3 text-[#7ea4cb]" />
                </div>
              </div>
            </div>

            {/* Typographic Countdown (Compact padding, neat typography) */}
            <div className="my-2 py-1.5 border-t border-b border-[#e2edf6] z-20 relative">
              {timeLeft.isPast ? (
                <div className="text-[11px] font-serif italic text-[#3d658e] text-center">
                  Buổi lễ đã diễn ra &bull; Cảm ơn bạn!
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <div className="flex flex-col items-center">
                    <span key={timeLeft.seconds} className="countdown-tick font-serif text-lg text-[#142b4a] font-normal leading-none">
                      {timeLeft.days}
                    </span>
                    <span className="font-sans text-[7.5px] tracking-[0.18em] text-[#6b88a8] uppercase font-semibold mt-0.5">
                      NGÀY
                    </span>
                  </div>

                  <div className="w-[1px] h-5 bg-[#c8d9ea]" />

                  <div className="flex flex-col items-center">
                    <span className="font-serif text-lg text-[#142b4a] font-normal leading-none">
                      {padZero(timeLeft.hours)}
                    </span>
                    <span className="font-sans text-[7.5px] tracking-[0.18em] text-[#6b88a8] uppercase font-semibold mt-0.5">
                      GIỜ
                    </span>
                  </div>

                  <div className="w-[1px] h-5 bg-[#c8d9ea]" />

                  <div className="flex flex-col items-center">
                    <span className="font-serif text-lg text-[#142b4a] font-normal leading-none">
                      {padZero(timeLeft.minutes)}
                    </span>
                    <span className="font-sans text-[7.5px] tracking-[0.18em] text-[#6b88a8] uppercase font-semibold mt-0.5">
                      PHÚT
                    </span>
                  </div>

                  <div className="w-[1px] h-5 bg-[#c8d9ea]" />

                  <div className="flex flex-col items-center">
                    <span className="font-serif text-lg text-[#142b4a] font-normal leading-none">
                      {padZero(timeLeft.seconds)}
                    </span>
                    <span className="font-sans text-[7.5px] tracking-[0.18em] text-[#6b88a8] uppercase font-semibold mt-0.5">
                      GIÂY
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Venue & Location Row (Compact vertical layout) */}
            <div className="flex items-start justify-center gap-1.5 text-center px-1 z-20 relative mt-1 mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#3d6894] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-sans font-semibold tracking-wide text-[#142b4a] uppercase leading-tight">
                  {invitation.school}
                </p>
                <p className="text-[9px] font-sans text-[#5c7a9c] tracking-wider mt-0.5 leading-tight">
                  {invitation.ceremonyTimeDisplay}
                </p>
              </div>
            </div>

            {/* Primary Pill CTA with min touch height >= 44px */}
            <div className="relative w-full mt-1.5 mb-1.5 flex flex-col items-center justify-center z-20">
              <a
                href={invitation.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-[260px] min-h-[44px] py-2.5 rounded-lg bg-[#4477a3] hover:bg-[#36648b] text-white text-[11px] font-sans font-semibold tracking-[0.2em] uppercase shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>XEM CHỈ ĐƯỜNG &rarr;</span>
              </a>
            </div>

            {/* Bottom Floral & Ribbon & Signature note (Safe bottom breathing room: fully visible in 390x844) */}
            <div className="relative w-full flex items-center justify-end z-20 pt-2 pb-1">
              {/* Subtle bottom streamer */}
              <div className="absolute inset-x-0 bottom-0 h-6 pointer-events-none opacity-50 z-10 overflow-hidden">
                <img decoding="async" loading="lazy"
                  src="/assets/invitation-decor/ribbon-streamer.png"
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="select-none pr-1 z-20 relative">
                <span className="font-script text-xl text-[#4a6e94] font-normal tracking-wide">
                  Hẹn gặp bạn tại đây &hearts;
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
export default Gate2Section;
