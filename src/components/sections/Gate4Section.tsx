import React from 'react';
import { Heart, Home, GraduationCap, Users, Sparkles } from 'lucide-react';
import { invitation } from '../../config/invitation';

/**
 * Graduation Cap sketch illustration matching the artistic target
 */
const GraduationCapArt: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="capGrad" x1="10" y1="20" x2="110" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b4cde6" stopOpacity="0.85" />
          <stop offset="0.5" stopColor="#8baecf" stopOpacity="0.75" />
          <stop offset="1" stopColor="#6791b8" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="underCapGrad" x1="35" y1="40" x2="85" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2c4d72" stopOpacity="0.8" />
          <stop offset="1" stopColor="#1e3652" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* Skullcap / Crown underneath */}
      <path
        d="M38 42C38 42 38 62 60 62C82 62 82 42 82 42L60 48L38 42Z"
        fill="url(#underCapGrad)"
        stroke="#1a3452"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Skullcap shadow fold */}
      <path
        d="M45 46C45 56 75 56 75 46"
        stroke="#7ca2c8"
        strokeWidth="0.8"
        strokeDasharray="2 2"
        fill="none"
      />

      {/* Mortarboard Flat Diamond Surface */}
      <polygon
        points="60,16 108,34 60,52 12,34"
        fill="url(#capGrad)"
        stroke="#274669"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Top surface highlight / inner contour */}
      <polygon
        points="60,19 104,34 60,49 16,34"
        stroke="white"
        strokeWidth="0.8"
        strokeOpacity="0.7"
        fill="none"
      />

      {/* Center Button */}
      <ellipse cx="60" cy="34" rx="2.5" ry="1.5" fill="#1b3554" stroke="white" strokeWidth="0.5" />

      {/* Tassel cord flowing to the right */}
      <path
        d="M60 34C75 35 96 40 98 52"
        stroke="#274669"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Tassel fringe */}
      <path
        d="M98 52L96 68M98 52L98 70M98 52L100 68M98 52L101 65"
        stroke="#274669"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="98" cy="53" r="1.8" fill="#1e3a5f" />
    </svg>
  );
};

interface GratitudePillar {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const GRATITUDE_PILLARS: GratitudePillar[] = [
  {
    id: 'family',
    title: 'Gia đình',
    subtitle: 'Luôn là điểm tựa',
    icon: <Home className="w-5 h-5 text-[#305782]" />
  },
  {
    id: 'teachers',
    title: 'Thầy cô',
    subtitle: 'Người truyền cảm hứng',
    icon: <GraduationCap className="w-5 h-5 text-[#305782]" />
  },
  {
    id: 'friends',
    title: 'Bạn bè',
    subtitle: 'Thanh xuân rực rỡ',
    icon: <Users className="w-5 h-5 text-[#305782]" />
  },
  {
    id: 'everyone',
    title: 'Và tất cả',
    subtitle: 'Những người đặc biệt',
    icon: <Sparkles className="w-5 h-5 text-[#305782]" />
  }
];

export const Gate4Section: React.FC = () => {
  return (
    <section
      id="gate-4"
      aria-label="Lời cảm ơn"
      className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center bg-[#eef3f8] text-[#162e51] overflow-hidden p-2 sm:p-4 lg:p-5"
    >
      {/* ============================================================
          GATE 4 DESKTOP (lg+):
          Composition matching gate4-desktop-target.png
          - Left: Large framed portrait with floral cluster framing
          - Right: Graduation cap sketch + title 'Lời cảm ơn' + prose + 4 gratitude pillars
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
                GRATITUDE &bull; TRI ÂN
              </span>
            </div>
          </div>

          {/* Main Content Grid: Left Framed Photo | Right Gratitude Narrative & Pillars */}
          <div className="relative flex-1 grid grid-cols-12 gap-8 items-center z-10 my-auto">
            
            {/* Left Column (cols 1-5): Large Framed Portrait */}
            <div className="col-span-5 relative flex items-center justify-center pl-2 xl:pl-6">
              <div className="relative bg-white p-3.5 pb-10 shadow-[0_20px_50px_rgba(30,55,90,0.18)] rounded-xs border border-slate-200/90 -rotate-2 w-[370px] xl:w-[410px] z-10">
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#eef3f8] border border-slate-100">
                  <img decoding="async"
                    src={invitation.photos.message}
                    alt={`${invitation.familyName} ${invitation.shortName} gửi lời cảm ơn`}
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                </div>
                <div className="pt-2 text-center">
                  <span className="font-serif italic text-xs text-[#557699] tracking-wider">
                    {invitation.graduateName} &bull; Class of {invitation.graduationYear}
                  </span>
                </div>
              </div>

              {/* Surrounding Floral Accents */}
              <div className="absolute -bottom-8 -left-8 w-64 h-64 pointer-events-none z-20">
                <img decoding="async" loading="lazy"
                  src="/assets/invitation-decor/bouquet-cluster.png"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-contain filter drop-shadow-sm opacity-95"
                />
              </div>

              <div className="absolute -top-6 -right-6 w-36 h-36 pointer-events-none z-20">
                <img decoding="async" loading="lazy"
                  src="/assets/invitation-decor/floral-sprig.png"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-contain rotate-45 opacity-90"
                />
              </div>
            </div>

            {/* Right Column (cols 6-12): Cap Sketch + Title + Emotional Prose + 4 Pillars */}
            <div className="col-span-7 relative flex flex-col items-center justify-center text-center px-4 xl:px-8 z-10">
              
              {/* Graduation Cap Sketch Art & Top Sprig */}
              <div className="absolute -top-16 right-0 flex items-center justify-center pointer-events-none">
                <GraduationCapArt className="w-28 h-20 filter drop-shadow-xs" />
                <div className="absolute -top-3 -right-10 w-24 h-24 pointer-events-none opacity-85">
                  <img decoding="async" loading="lazy"
                    src="/assets/invitation-decor/floral-sprig.png"
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-contain rotate-12"
                  />
                </div>
              </div>

              {/* Title 'Lời cảm ơn' in Charm calligraphy script */}
              <h2 className="font-script font-normal text-6xl xl:text-7xl text-[#2d5584] leading-tight mb-3 drop-shadow-xs select-none">
                Lời cảm ơn
              </h2>

              {/* Heartfelt Gratitude Prose matching target */}
              <p className="font-serif italic text-[#385679] text-base xl:text-lg leading-relaxed max-w-[540px] mx-auto mb-4">
                Cảm ơn gia đình đã luôn yêu thương và đồng hành.<br />
                Cảm ơn thầy cô vì những bài học và sự tận tâm.<br />
                Cảm ơn bạn bè vì đã cùng mình tạo nên<br />
                một thanh xuân thật đẹp dưới mái trường.
              </p>

              {/* Small Blue Heart Divider */}
              <div className="flex items-center justify-center my-3">
                <Heart className="w-4 h-4 fill-[#2d5584] text-[#2d5584]" />
              </div>

              {/* 4 Gratitude Pillars Row matching target */}
              <div className="w-full max-w-[580px] grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-[#d8e6f3]">
                {GRATITUDE_PILLARS.map((pillar, idx) => (
                  <div
                    key={pillar.id}
                    className={`flex flex-col items-center text-center px-2 ${
                      idx < GRATITUDE_PILLARS.length - 1 ? 'border-r border-[#d8e6f3]' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full border border-[#c4d7e8] bg-[#f2f7fc] flex items-center justify-center mb-2 shadow-xs">
                      {pillar.icon}
                    </div>
                    <span className="font-sans font-bold text-sm text-[#1b3558] whitespace-nowrap">
                      {pillar.title}
                    </span>
                    <span className="font-serif italic text-[11px] xl:text-xs text-[#557699] mt-0.5 whitespace-nowrap">
                      {pillar.subtitle}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Top-Right Decorative Floral Accent */}
          <div className="absolute top-0 right-0 w-52 h-52 pointer-events-none z-5 -mr-6 -mt-6">
            <img decoding="async" loading="lazy"
              src="/assets/invitation-decor/bouquet-cluster.png"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain filter drop-shadow-sm opacity-90"
            />
          </div>

        </div>
      </div>

      {/* ============================================================
          GATE 4 MOBILE (<lg):
          Independent mobile composition matching gate4-mobile-target.png
          - Top header
          - Graduation cap illustration with floral sprig
          - Script title 'Lời cảm ơn'
          - Heartfelt gratitude prose
          - Divider
          - 4 vertically stacked gratitude rows with circular icon badges
          ============================================================ */}
      <div className="lg:hidden flex flex-col w-full max-w-[430px] mx-auto bg-[#fbfaf7] rounded-xl border border-[#b8cee2] p-2.5 sm:p-3 shadow-[0_15px_35px_rgba(160,190,220,0.25)] relative overflow-hidden z-10 my-2">
        <div className="relative w-full rounded-lg border border-[#c8d9ea] p-4 flex flex-col items-center overflow-hidden">
          
          {/* Top Running Header Bar */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-[#e2edf7]">
            <span className="text-[10px] font-sans tracking-[0.25em] text-[#557699] uppercase font-semibold">
              CLASS OF {invitation.graduationYear} &bull; COMMENCEMENT
            </span>
          </div>

          {/* Graduation Cap Sketch Art & Top Floral Sprig */}
          <div className="relative flex items-center justify-center mt-3 mb-1">
            <GraduationCapArt className="w-24 h-18 filter drop-shadow-xs" />
            <div className="absolute -top-3 -left-6 w-20 h-20 pointer-events-none opacity-85">
              <img decoding="async" loading="lazy"
                src="/assets/invitation-decor/floral-sprig.png"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-contain -rotate-12"
              />
            </div>
          </div>

          {/* Script Title 'Lời cảm ơn' */}
          <h2 className="font-script font-normal text-5xl text-[#2d5584] leading-tight mb-2 text-center select-none">
            Lời cảm ơn
          </h2>

          {/* Prose */}
          <p className="font-serif italic text-[#385679] text-base leading-7 text-center px-2 max-w-[330px] mx-auto mb-3">
            Cảm ơn gia đình đã luôn yêu thương và đồng hành.
            Cảm ơn thầy cô vì những bài học và sự tận tâm.
            Cảm ơn bạn bè vì đã cùng mình tạo nên một thanh xuân thật đẹp dưới mái trường.
          </p>

          {/* Heart Divider */}
          <div className="flex items-center justify-center gap-2 text-[#7ea4cb] my-2">
            <div className="w-6 h-[1px] bg-[#c8d9ea]" />
            <Heart className="w-3.5 h-3.5 fill-[#2d5584] text-[#2d5584]" />
            <div className="w-6 h-[1px] bg-[#c8d9ea]" />
          </div>

          {/* 4 Vertically Stacked Gratitude Category Rows */}
          <div className="w-full flex flex-col divide-y divide-[#e2edf7] mt-2">
            {GRATITUDE_PILLARS.map((pillar) => (
              <div key={pillar.id} className="flex items-center gap-3 py-2.5 px-2">
                <div className="w-10 h-10 rounded-full border border-[#c4d7e8] bg-[#f2f7fc] flex items-center justify-center shrink-0 shadow-xs">
                  {pillar.icon}
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-sans font-bold text-sm text-[#1b3558]">
                    {pillar.title}
                  </span>
                  <span className="font-serif italic text-xs text-[#557699]">
                    {pillar.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom subtle floral accent */}
          <div className="w-24 h-12 pointer-events-none mt-3 opacity-85">
            <img decoding="async" loading="lazy"
              src="/assets/invitation-decor/floral-sprig.png"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
