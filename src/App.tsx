import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { OpeningCover } from './components/invitation/OpeningCover';
import { HeroSection } from './components/sections/HeroSection';
import { Gate2Section } from './components/sections/Gate2Section';
import { Gate3Section } from './components/sections/Gate3Section';
import { Gate4Section } from './components/sections/Gate4Section';
import { Gate5Section } from './components/sections/Gate5Section';
import { FloatingAudioControl } from './components/ui/FloatingAudioControl';
import { lockDocumentScroll } from './utils/documentScrollLock';
import { playInvitationMusic } from './utils/backgroundMusic';

export const App: React.FC = () => {
  const [isCoverOpen, setIsCoverOpen] = useState<boolean>(false);
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (isCoverOpen) {
      const frame = requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        mainRef.current?.focus({ preventScroll: true });
      });
      return () => cancelAnimationFrame(frame);
    }

    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    const previousBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = previousBehavior;
    const unlock = lockDocumentScroll();
    return () => {
      unlock();
      window.history.scrollRestoration = previousRestoration;
    };
  }, [isCoverOpen]);

  useEffect(() => {
    if (!isCoverOpen) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('#gate-2, #gate-3, #gate-4, #gate-5'));
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute('data-entered', '');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });

    sections.forEach((section) => {
      const items = section.querySelectorAll<HTMLElement>('h2, p.font-serif, img[alt]:not([alt=""])');
      items.forEach((item, index) => {
        item.setAttribute('data-reveal-item', '');
        item.style.setProperty('--reveal-delay', `${Math.min(index, 6) * 85}ms`);
      });
      section.setAttribute('data-reveal-ready', '');
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, [isCoverOpen]);

  const handleOpenInvitation = () => {
    playInvitationMusic();
    window.scrollTo(0, 0);
    setIsCoverOpen(true);
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#fbfaf7] text-[#162e51] selection:bg-[#7ea4cb] selection:text-white">
      {/* 1. Digital Invitation Cover (Gate 1 Opening - Frozen) */}
      <OpeningCover isOpen={isCoverOpen} onOpen={handleOpenInvitation} />

      {/* Main Editorial Long-Scroll Story */}
      <main ref={mainRef} tabIndex={-1} inert={!isCoverOpen} aria-hidden={!isCoverOpen} className={`w-full overflow-hidden outline-none ${isCoverOpen ? 'invitation-open' : ''}`}>
        {/* Gate 1: Hero Section (Frozen) */}
        <HeroSection />

        {/* Gate 2: Thư ngỏ + Save The Date (Approved & Frozen) */}
        <Gate2Section />

        {/* Gate 3: Hành trình thanh xuân (Editorial Scrapbook & Lightbox) */}
        <Gate3Section />

        {/* Gate 4: Lời cảm ơn (Gratitude & 4 Pillars) */}
        <Gate4Section />

        {/* Gate 5: Hẹn gặp lại / Closing (Finale, Map CTA & Share) */}
        <Gate5Section />
      </main>

      {/* Floating Audio Controls */}
      {isCoverOpen && <FloatingAudioControl />}
    </div>
  );
};

export default App;
