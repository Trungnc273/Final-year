# GRADUATION INVITATION — DESIGN SPECIFICATION
**Project:** Digital invitation for Nguyễn Hồng Hạnh's Grade 12 graduation (Class of 2026)  
**Persona:** Senior Creative Frontend Engineer + Motion & Interactive Designer  

---

## 1. Design Concept & Emotional Arc
A bespoke, editorial-grade digital graduation invitation that feels like a luxury printed announcement merged with a contemporary fashion editorial and personal photo story.

- **Theme:** Academic Achievement, Youthful Grace, New Chapter (*Commencement / Class of 2026*).
- **First Impression:** When opened from Zalo, Messenger, or Safari, the recipient is greeted by an elegant wax-seal / ribbon digital envelope with personalized recipient name (`?to=...`).
- **Emotional Rhythm:**
  1. *Anticipation:* Opening digital envelope & seal.
  2. *Grand Entrance (Hero):* Editorial portrait and graduate typography.
  3. *Intimacy (Thư ngỏ):* Warm, personal invitation with verified event details.
  4. *Visual Poetry (Photo Story):* Real photography and interactive lightbox.
  5. *Gratitude:* Family, teachers, friends, and those who accompanied her.
  6. *See You There:* Closing sentiment, Google Maps, and sharing.

---

## 2. Photo Analysis & Section Mapping
Analysis of the 5 authentic graduation photographs in `imgs/`:

| File | Specs | Composition & Lighting | Assigned Role |
| :--- | :--- | :--- | :--- |
| `...8a062457ac869019bf3ca07e482bf3bd.jpg` | 1366×2049 (2:3) | Direct eye contact, warm smile, leaning on stone window ledge, blue "CONGRAD" sash visible | **Opening Cover & Seal Preview / Final Send-off** |
| `...5c86546411cd8f466d021caf529a0200.jpg` | 1366×2049 (2:3) | Seated on stone steps, full gown & sash, bouquet in lap, architectural perspective | **Hero Section (Primary Feature Portrait)** |
| `...da403d38f5e448d8fe520b4a78b3cef4.jpg` | 1366×2049 (2:3) | Intimate bust portrait, looking thoughtfully left, radiant natural sunlight, auburn hair highlights | **Personal Intro (Accompanying the Letter)** |
| `...8c3667a743b33ee432bbadd6fcba733e.jpg` | 1366×2049 (2:3) | Campus green background, holding flowers, fresh youthful vibrancy | **Photo Story (Milestones & Journey)** |
| `...8a8bb6cc2abe29f13d33bc48eb814641.jpg` | 1366×2049 (2:3) | High angle, gazing down tenderly at flower bouquet, quiet reflection & gratitude | **Personal Message & Gallery Focal Piece** |

*All 5 images are also accessible in the high-fidelity Interactive Gallery with full-screen lightbox.*

---

## 3. Color Palette (Derived from Real Photography)
- **Deep Academic Navy** (`#132238`, `#1B2E4B`): Sourced from her sash; provides authoritative contrast and dignity.
- **Warm Ivory / Alabaster Paper** (`#FAF8F5`, `#F4EFEA`): Soft tactile paper background, easy on the eyes.
- **Champagne Gold & Warm Ochre** (`#C5A880`, `#D4AF37`, `#A68252`): Sourced from bouquet ribbons and certificate trim.
- **Charcoal Slate** (`#1E2229`, `#3D444E`): High-legibility typography without harsh pure-black contrast.
- **Blossom Peach Accent** (`#F3E6E0`, `#E4B7A5`): Delicate accent from the petals of her bouquet.

---

## 4. Typography Pairing
- **Display / Editorial:** Bundled *Alex Brush* and *Playfair Display* keep the invitation typography consistent across devices.
- **Body & Functional:** Bundled *Plus Jakarta Sans* keeps event details legible on mobile screens.

---

## 5. UX Insights Learned from Reference (Reinterpreted)
**Reference:** `ngaychungdoi.com/w/rbeuj7krkthx`
- *What we learned:*
  - The power of an opening greeting cover before entering the long scroll page.
  - Clear visual rhythm alternating between full-bleed visuals, airy editorial text, and crisp functional cards.
  - Floating action pill (audio toggle, quick RSVP/contact, scroll indicator).
  - Countdown and quick map navigation buttons.
- *What we intentionally do NOT copy:*
  - No wedding motifs (no rings, no bride/groom, no love story, no pastel wedding heart arches).
  - No bloated heavy scripts or slow third-party trackers.
  - Instead, reinterpreted into a Grade 12 graduation announcement, ribbon, graduate reflection, and friendship celebration.

---

## 6. ThreeUI & Interactive Motion System
1. **Stardust & Constellation Field (Canvas 2D / ThreeUI concept):**
   - *Why:* Evokes the sparkling future and celebration of graduation.
   - *Where:* Subtle hero background and opening cover.
   - *Mobile Behavior:* Capped particle density (35 particles), DPR capped at 1.5, pauses when scrolled out of view.
2. **Invitation stationery:**
   - *Why:* Gives the Grade 12 celebration the feel of a printed invitation.
   - *Where:* Opening and the event details section.
   - *Design:* Fine borders, watercolor florals, ribbon accents, and editorial typography.
3. **Interactive Editorial Gallery & Lightbox:**
   - *Why:* Lets friends inspect her stunning graduation portraits in full detail.
   - *Features:* Touch-friendly swipe, ESC key close, keyboard arrows, zero layout shift.
4. **Subtle Motion Language:**
   - Fade-up reveals (0.6s ease-out), staggered text reveal, micro-hover interactions on buttons (180ms).
   - Fully respects `prefers-reduced-motion: reduce`.
