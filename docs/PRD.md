# PRD — bilawalsami.vercel.app (v2.2)

**Owner:** Bilawal Ullah Sami
**Audience:** Tech recruiters and hiring managers (primary), PhD supervisors (secondary)
**Domain:** bilawalsami.vercel.app (custom domain TBD, build domain-agnostic)
**Status:** Ready to build
**Intended consumer of this PRD:** Claude Code / Cursor / v0 — build the whole thing from this brief.

**Changelog (v2.2):**
- Added **Gesture Control** (Python · OpenCV · MediaPipe) as SIDE-04, status `IN DEV`. Webcam-driven hand gesture recognition.
- Folded selected coursework into the About section education line (ZeroMQ WSN sim, Arduino FSM, CAP-theorem DBMS study) — they were on the CV but missing from the PRD.
- **Removed the gift-sites "ALSO" subsection.** Tighter recruiter pitch.

**Changelog (v2.1):**
- Added status badge system (LIVE / BETA / CLIENT / ACADEMIC / BUSINESS / IN DEV) so recruiters can scan project credibility at a glance.
- Expanded More section from 4 to 8 cards. Added: Go Ride (client work, live), JetLagPro (TestFlight beta), Exam Guide (in dev).

---

## 1. Goal

A single-page personal site that makes a recruiter scrolling on the train at 9am stop and think "wait, who is this guy." Award-worthy in feel (think awwwards SOTD candidates: wodniack.dev, logartis.info, rauno.me). Brutalist-cyberpunk dev energy, animation-driven, with **two genuinely interactive AI product demos** embedded in the page so the recruiter is *using* the work, not just looking at screenshots.

### Success criteria
- A recruiter spends >60 seconds on the page on average (industry average is 6–12s for personal sites).
- The live demos work and feel magical, not laggy.
- Lighthouse Performance ≥ 90 on mobile, Accessibility ≥ 95.
- No "AI personal site" clichés (no purple gradients, no glass cards, no generic mesh blobs, no "✨ AI-powered ✨" copy).
- Loads under 2s on a mid-tier mobile connection (4G).

### Non-goals
- Blog / CMS / writing section. Not needed for this audience, and an empty blog hurts more than no blog.
- Multi-page architecture. Single-page only.
- Dark/light theme toggle. Dark only, committed.
- E-commerce, contact forms with backend, newsletters. Email link is enough.

---

## 2. Brand & design system

This is the most important section. **Do not deviate without explicit reason.**

### 2.1 Palette

```
--ink:        #0A0A0A    /* near-black, page background */
--bone:       #F2EFE8    /* off-white, primary text and large type */
--ash:        #6B6B6B    /* muted grey, secondary text and metadata */
--steel:      #1A1A1A    /* elevated surfaces, code blocks, cards */
--hairline:   #2A2A2A    /* borders, 1px dividers */
--signal:    #E6FF00     /* SIGNATURE ACCENT — acid electric yellow, used sparingly */
--signal-dim: #B8CC00    /* darker variant for hover/pressed */
--blood:      #FF3D00    /* warning / live demo "REC" dot only */
```

The accent is **acid electric yellow** (#E6FF00). Use it for: one hero element, link underlines on hover, the live-demo "LIVE" indicators, the cursor follower, and the contact CTA. Nowhere else. Restraint is the point. If everything is highlighted, nothing is.

Hard rule: no purple. No blue-to-pink gradients. No glassmorphism. No emerald (saved for NoteSnap product brand).

### 2.2 Typography

Use **two typefaces**:

1. **Display + body:** [Geist Sans](https://vercel.com/font) (free, Vercel-hosted). Use weights 400, 500, 700, 900. The 900 is for massive hero numerals.
2. **Mono:** [Geist Mono](https://vercel.com/font). Used for project IDs, metadata, code-style labels, binary strings.

Optional flex: swap display for **PP Editorial New** (Pangram Pangram, free for personal use) if Bilawal wants a sharper, more editorial feel. Sample both and pick before commit.

Type scale (rem, base 16px):

```
hero        clamp(4rem, 14vw, 12rem)   weight 900   letter-spacing -0.04em
display     clamp(2.5rem, 6vw, 5rem)   weight 700   letter-spacing -0.03em
h2          clamp(1.75rem, 3vw, 2.5rem) weight 700  letter-spacing -0.02em
h3          1.25rem                     weight 500
body-lg     1.125rem                    weight 400  line-height 1.55
body        1rem                        weight 400  line-height 1.6
mono-sm     0.8125rem                   mono        letter-spacing 0.02em
label       0.6875rem  uppercase  mono  letter-spacing 0.15em
```

### 2.3 Texture and surface

- Subtle **film grain overlay** across the entire page (10–15% opacity, SVG-based, fixed position, pointer-events none). Use [grain.svg](https://noisepng.com) generation or a tiny custom shader.
- 1px hairlines everywhere — sections separated by `border-top: 1px solid var(--hairline)`. Brutalist gridlines, not soft shadows.
- No drop shadows. No rounded corners over 4px. Most things have 0px radius. The site should feel like a print magazine that became digital, not a SaaS dashboard.

### 2.4 Motion principles

- **Easing:** `cubic-bezier(0.65, 0, 0.35, 1)` (smooth in-out) for most things. `cubic-bezier(0.2, 0.8, 0.2, 1)` (expressive overshoot) for accents.
- **Duration:** 400–800ms for entrance animations, 150–250ms for hover states.
- **Stagger:** Lines of text reveal with 30–60ms stagger between words.
- **Scroll behaviour:** Smooth scroll via [Lenis](https://github.com/darkroomengineering/lenis). **No scroll-jacking.** The page scrolls normally, animations are triggered by scroll position.
- **Reduced motion:** Respect `prefers-reduced-motion`. Disable all non-essential motion, keep only fade-ins under 200ms.

### 2.5 Cursor

Custom cursor: a small dot (8px, `--bone`) following the mouse with `lerp` smoothing (~0.15 factor), plus a 32px outlined ring that lags behind slightly. On hover over interactive elements, the dot expands to fill the ring and switches to `--signal` accent. Disabled on touch devices.

### 2.6 Status badges

Every project across the site carries a single status badge (mono, 0.6875rem, uppercase, label letter-spacing). Badges are rendered as text only — no fills, no rounded pills. A 1px `--hairline` underline sits below the badge text. Colour-coding:

```
LIVE          --signal (acid yellow)        Public, in production, real users
BETA          --bone   (off-white)          TestFlight / closed beta / soft-launched
CLIENT        --bone   (off-white)          Built for a paying external client
ACADEMIC      --ash    (muted grey)         University coursework or research
BUSINESS      --ash    (muted grey)         Operating commercial venture
IN DEV        --ash    (muted grey)         Building, not yet shipped
```

The badge always appears next to the project number in mono — e.g. `WORK 001/003   LIVE`, `SIDE-05   BETA`. Recruiters can scan status at a glance, and the site cannot accidentally over-claim. Honesty is a feature; mis-marking gets caught in interviews.

---

## 3. Information architecture

Single-page scroll. Sections in order, each with a mono-cased section number in the top-left corner.

```
NAV (fixed, top)         ┐
SECTION 000 — Hero       │
SECTION 001 — About      │
SECTION 002 — Featured Work  ── NoteSnap, Tally, AriseCode
SECTION 003 — More       │     ResumeHax, PromptForge, NLP/XAI, Seraphize
SECTION 004 — Now        │     What he's doing right now
SECTION 005 — Contact    │
FOOTER                   ┘
```

### 3.1 Navigation

Fixed top bar, 64px tall, `--ink` background with a 1px `--hairline` bottom border. Contents:

- Left: monogram "**BUS**" in mono (initials, all caps, weight 700).
- Center: anchor links — `[Work] [About] [Now] [Contact]` — mono, label-sized.
- Right: a small "Available for grad roles" pill with a pulsing `--signal` dot (8px, animated 1.5s opacity pulse). On hover, becomes a link to the contact section.

On scroll past hero, the nav background shifts from transparent to `rgba(10,10,10,0.85)` with a `backdrop-filter: blur(20px)`.

---

## 4. Section specs (in scroll order)

### 4.1 SECTION 000 — Hero

**Goal:** Stop the scroll in the first second. Tell them who, where, what.

**Layout:** Full viewport height (100svh). Three rows.

- **Top row (metadata strip):** Mono label-sized.
  - Left: `BILAWAL ULLAH SAMI / EST. 2003 / MANCHESTER, UK`
  - Right: Live local time, updating every second, format `[HH:MM:SS BST]`.
- **Middle row (the punch):** Massive type, left-aligned, three lines.
  ```
  Software engineer.
  Building AI tools that
  ship, not slideware.
  ```
  Each line reveals on load with a 60ms word stagger and a 6px `translateY` ease-in. The full name "Bilawal Ullah Sami" sits *above* this block as smaller display type (clamp 2.5rem) in `--ash`, with the word "Bilawal" hover-able to trigger an audio pronunciation file (`/audio/bilawal.mp3` — record a short clip).
- **Bottom row (the canvas + the CTA):**
  - Left half: **a custom canvas/WebGL element.** Suggested: a generative ASCII portrait that morphs slowly (an [aalib](https://github.com/audiolib/aalib.js)-style ASCII rendering of a still photo, with the characters slowly drifting). Or, simpler fallback: a real-time generative grid of monospace characters where each cell pulses based on Perlin noise — feels like a hacker terminal.
  - Right half: short pitch (2 lines) + two CTAs.
    ```
    Final-year CS at Edge Hill (predicted First).
    Solo-shipped 3 AI products and run a profitable
    e-commerce business on the side.

    [SEE THE WORK ↓]   [HIRE ME →]
    ```
    `SEE THE WORK` is a ghost button (1px `--bone` border) that anchor-scrolls to Section 002. `HIRE ME` is the only `--signal`-filled button on the page; it links to the contact section.

**Easter egg:** If the user types their own name on the keyboard (capture letters with `onKeyDown`), echo it back in the middle row briefly: "Software engineer. Building AI tools for [typed name]." Then revert after 4s.

### 4.2 SECTION 001 — About

**Goal:** 30-second read. Establishes credibility without a wall of text.

**Layout:** Two columns on desktop, stacked on mobile.

- Left column (1/3 width): mono labels in a vertical list.
  ```
  LOCATION       Manchester, UK
  EDUCATION      Edge Hill University, BSc Computing (Software Engineering)
                 Predicted First Class Honours, graduating 2026
                 Selected coursework: ZeroMQ WSN simulation, Arduino pelican-
                 crossing FSM with C + x86 NASM, CAP-theorem DBMS feasibility study
  STACK          TypeScript · React · React Native · Next.js · Python · Postgres
  AI             Gemini · GPT · Claude · PyTorch · SHAP/LIME for XAI
  RUNNING        Seraphize Ltd — profitable Amazon FBA, UK + EU markets
  APPLYING TO    UKRI AI CDT (Cambridge/Manchester) PhD, XAI track
  ```
- Right column (2/3 width): 3 short paragraphs, body-lg type.
  ```
  I build full products solo, end to end. Auth, schema, AI pipelines,
  payments, the UI — all of it. Three of those products are live and
  used by real people. One is my dissertation, the other two are side
  projects that grew into apps with paying users.

  My dissertation surfaced a trust calibration gap in how people use
  AI study tools: users felt more confident with AI-generated
  schedules but didn't actually retain more. That finding is what's
  pushing me toward XAI research in 2026.

  Outside of code: badminton, music production, building a company
  that funds my own runway.
  ```

The voice is casual-direct. No "passionate about." No "ever-evolving landscape." No emojis.

### 4.3 SECTION 002 — Featured Work

**Goal:** Three deep, interactive showcases. The headliners.

**Layout:** Each project gets a full-viewport "chapter" inside the section. Sticky project title on the left while the right side scrolls through screenshots, details, and the live demo.

For each project, the structure is:

```
[PROJECT NUMBER / TOTAL]      e.g. WORK 001/003
[PROJECT NAME]                 e.g. NoteSnap
[ONE-LINER]                    short, punchy
[STACK TAGS]                   mono pills, --hairline border, no fill
[ROLE]                         "Solo build" or similar

  ↓ scroll triggers:
  • Screenshot carousel (large, generous whitespace)
  • Three-bullet "what I built" list
  • LIVE DEMO panel (where applicable)
  • Two links: [LIVE SITE ↗] [GITHUB ↗]
```

#### 4.3.1 NoteSnap (WORK 001/003 · ACADEMIC + IN DEV)

- **One-liner:** "An AI study companion that turns lecture slides, PDFs, and YouTube videos into flashcards, quizzes, and a personal tutor."
- **Stack:** React Native · Expo · Supabase · Gemini Flash · TypeScript
- **What I built:** Full stack solo, including: auth + RLS Postgres schema, multi-source content ingestion (camera/PDF/PPTX/DOCX/URL/YouTube), AI pipelines for flashcards / quizzes / cheatsheets, SM-2 spaced repetition, an AI tutor with 6 tools, streaks/XP/mastery analytics. 108-page dissertation, predicted First.
- **Live demo:** Not feasible to embed full app, so use a **demo reel autoplay**: a 30s muted MP4 loop of the app in action, with a "watch with sound" toggle. Below the reel, a static screenshot carousel of 5 key screens.
- **Links:** notesnap.dev · github

#### 4.3.2 Tally (WORK 002/003 · LIVE)

- **One-liner:** "Calorie tracking without the database scroll — type or say what you ate, AI does the rest."
- **Stack:** React Native · Expo · Supabase · Gemini · RevenueCat
- **What I built:** Onboarding quiz, AI parsing pipeline (free-text → calories + macros), subscription paywall via RevenueCat, daily tracking, analytics screens. Live on the App Store.
- **Live demo (THE BIG ONE — INTERACTIVE):**
  An embedded input on the page. Recruiter types "two slices of toast with butter and a black coffee". Hits enter. A serverless function calls Gemini, returns `{calories, protein, carbs, fat, fibre}`, and the result animates into a card. Use streaming response with a typewriter effect. Include three pre-filled "try one of these" chips: `"large oat milk latte"`, `"chicken caesar wrap from Pret"`, `"three eggs and avocado on sourdough"`.
  - Rate-limit: 5 requests per IP per minute via Upstash Ratelimit.
  - Use Gemini Flash via `@google/generative-ai` SDK. API key in env, never client-side.
  - Show a "POWERED BY GEMINI" mono label under the result.
- **Links:** App Store · github (private)

#### 4.3.3 AriseCode (WORK 003/003 · LIVE)

- **One-liner:** "A natural-language website builder — describe a site, get a working React + Tailwind preview in seconds."
- **Stack:** Next.js · TypeScript · Gemini · Tailwind · Vercel
- **What I built:** Prompt → spec pipeline, template engine guaranteeing compilable output across 23 section types, live preview, one-click export to GitHub + Vercel.
- **Live demo (THE OTHER BIG ONE):**
  Smaller iframe (60vw × 50vh) showing the AriseCode app embedded directly on the page, with a "try a prompt" hint overlay. If iframe-embed isn't feasible due to auth, alternative: a **mock prompt input** that, on submit, plays a pre-recorded 8s screen capture of a real prompt-to-site generation. Three suggested prompts as chips. The live version is preferable — figure out auth-bypass via a demo mode if needed.
- **Links:** arisecode-zeta.vercel.app · github

### 4.4 SECTION 003 — More

**Goal:** Show breadth without diluting the headliners.

**Layout:** A responsive grid of compact project cards — **3 columns on desktop (≥1024px), 2 columns on tablet, 1 column on mobile**. Each card:

```
[PROJECT ID, mono]   [STATUS BADGE, mono]      e.g.  SIDE-01   LIVE
[PROJECT NAME, display]
[ONE-LINER, 1 line]
[STACK, comma-separated mono]
[PRIMARY LINK ↗]
```

Cards have a 1px `--hairline` border, transparent background, and on hover the border shifts to `--signal` with a 200ms ease. No fill change, no transform. Restrained.

**Contents (8 cards, in order of recruiter relevance):**

- **SIDE-01 / Go Ride** · `CLIENT · LIVE` — "Private-hire car rental site for taxi drivers across the UK — fleet browser, pricing, multi-page flow, WhatsApp lead capture." Next.js, Tailwind, deployed. *go-ridenw.vercel.app*. Tag this as a paid freelance build for a real Rochdale-based client.
- **SIDE-02 / JetLagPro** · `BETA` — "AI-driven jet lag protocol generator — pre-flight schedule, light exposure timing, route-specific recovery plans." React Native, Expo, RevenueCat. *TestFlight invite link* (Bilawal to provide).
- **SIDE-03 / ResumeHax** · `LIVE` — "AI CV and cover letter builder with job-description tailoring." Next.js, Node, Postgres, OpenAI. *resumehax.vercel.app*
- **SIDE-04 / Gesture Control** · `IN DEV` — "Webcam-driven hand gesture recognition — perform actions on the computer with gestures alone. Real-time CV pipeline running fully offline." Python, OpenCV, MediaPipe. *github / short demo video*.
- **SIDE-05 / Exam Guide** · `IN DEV` — "Personal study tool — quiz and flashcard generator for exam prep, built during finals." Next.js. *exam-guide-seven.vercel.app*. Labelled `IN DEV` because it's a working personal tool, not a polished product.
- **SIDE-06 / PromptForge** · `LIVE` — "Turns rough ideas into structured prompts for creative and coding tasks." Next.js, OpenAI, Tailwind. *github*
- **SIDE-07 / NLP-XAI** · `ACADEMIC` — "Transformer text classifier trained from scratch on Edge Hill's HPC. Interpreted with SHAP, LIME, and attention." PyTorch, BERT, Slurm. *github*
- **SIDE-08 / Seraphize** · `BUSINESS` — "Profitable Amazon FBA business across UK and EU marketplaces. Founder, director, and the entire ops team." Amazon SP-API, analytics, forecasting. *role-only, no public link*

### 4.5 SECTION 004 — Now

**Goal:** Recency. Show this is a live person, not a static portfolio.

**Layout:** A `/now` page-style section ([nownownow.com](https://nownownow.com) format). Mono header `LAST UPDATED [DATE]`, then a short bulleted list of 4–6 items, each one short. Auto-update the date from the file's last modified timestamp at build time.

Example content (update before launch):

```
LAST UPDATED 17 MAY 2026

→ Submitting my UKRI AI CDT PhD application — XAI track, Cambridge/Manchester.
→ Tally is live on the App Store and growing through ASO alone.
→ JetLagPro is in TestFlight beta — finalising the pre-flight schedule UX before public launch.
→ Just shipped Go Ride — a private hire rental site for a Rochdale-based client.
→ Writing up the NoteSnap trust-calibration finding for a possible publication.
→ Running Seraphize day-to-day — Q2 inventory planning, ad optimisation.
→ Reading: Bishop's PRML, and Jamnik's recent XAI papers.
→ Practising badminton again twice a week.
```

### 4.6 SECTION 005 — Contact

**Goal:** Make the next step obvious. Email is the conversion event.

**Layout:** Centred, generous whitespace. Three rows.

- Top: a massive mono label, `[CONTACT 005/005]`.
- Middle: display-sized email link, `b.ullahsami@gmail.com` (or whichever email he prefers). Mailto link with prefilled subject `From bilawalsami.vercel.app — [your role here]`. On hover, the underline animates left-to-right and the cursor expands.
- Bottom row of secondary links, mono labels:
  ```
  GITHUB ↗       github.com/Bilawal122
  LINKEDIN ↗     [Bilawal's URL]
  CV.PDF ↓       /Bilawal-Ullah-Sami-CV.pdf
  ```

The CV download is a real file Bilawal will drop into `/public`.

### 4.7 Footer

Single line, mono label-sized, `--ash` color, centred.

```
Built by Bilawal, in Manchester, with Next.js and a lot of Lenis.   © 2026
```

A tiny pulsing `--signal` dot at the end, same as the nav availability indicator.

---

## 5. Live demo implementation (critical)

The two interactive demos (Tally and AriseCode) are the differentiators. Spec them as production features, not afterthoughts.

### 5.1 Tally inline demo

**API route:** `POST /api/tally-demo`

```ts
// Request
{ "input": string }   // max 200 chars

// Response (streamed)
{
  "items": [{ "name": string, "quantity": string, "calories": number,
              "protein": number, "carbs": number, "fat": number, "fibre": number }],
  "total": { "calories": number, "protein": number, "carbs": number, "fat": number, "fibre": number }
}
```

Use Gemini Flash with a strict JSON-mode system prompt. System prompt should be loaded from a server-side constant — never expose it client-side.

Rate-limit via Upstash Redis (`@upstash/ratelimit`): 5 requests per IP per 60s, fail open with a friendly mono-styled error.

Use Vercel AI SDK (`ai` package) for streaming. Render results with a typewriter effect on the totals (animate the numbers counting up over 600ms via Framer Motion's `animate()`).

### 5.2 AriseCode embedded demo

Option A (preferred): If AriseCode supports a public demo mode, embed it in an iframe with `sandbox="allow-scripts allow-same-origin"` and a soft fade-in on scroll-into-view.

Option B (fallback): Pre-record three 6–10s screen captures of real prompts running. On click of a suggested prompt chip, play the matching clip. The illusion is fine here as long as it's clearly labelled "DEMO PLAYBACK" in mono under the player.

---

## 6. Tech stack

**Required:**
- Next.js 15 (App Router, RSC where it makes sense, but most of this is client-side).
- TypeScript, strict mode.
- Tailwind CSS v4 (use the new CSS-variable-driven theme config to wire up the palette above).
- Framer Motion v11+ for animations.
- Lenis for smooth scroll.
- `geist` package for fonts, self-hosted.
- Vercel AI SDK + `@google/generative-ai` for the Tally demo.
- `@upstash/ratelimit` + `@upstash/redis` for rate-limiting.

**Optional, judge by perf cost:**
- `react-three-fiber` + `three` if the hero canvas goes the WebGL route. If using, dynamic-import it and don't ship to mobile (use a lighter SVG/canvas fallback under 768px viewport).

**Dependencies to avoid:**
- shadcn/ui — too generic-looking, will fight the brutalist aesthetic.
- Any UI library with default rounded-2xl, soft-shadow components.
- jQuery or anything legacy.

### Repo structure

```
app/
  layout.tsx               # fonts, grain overlay, cursor, Lenis provider
  page.tsx                 # composes all sections
  api/
    tally-demo/route.ts    # Gemini call
  sections/
    hero/
      Hero.tsx
      AsciiCanvas.tsx
      NameTyper.tsx        # easter egg
    about/About.tsx
    work/
      Work.tsx
      NoteSnap.tsx
      Tally.tsx
      TallyDemo.tsx
      AriseCode.tsx
      AriseCodeDemo.tsx
    more/More.tsx
    now/Now.tsx
    contact/Contact.tsx
  components/
    Nav.tsx
    Footer.tsx
    Cursor.tsx
    GrainOverlay.tsx
    SectionLabel.tsx       # the "WORK 001/003" mono labels
    MagneticButton.tsx
public/
  audio/bilawal.mp3
  cv/Bilawal-Ullah-Sami-CV.pdf
  reels/notesnap.mp4
  reels/arisecode-prompt-1.mp4
  grain.svg
styles/
  globals.css              # CSS vars, base resets
```

---

## 7. Performance budget

- Initial JS payload (compressed) ≤ 110KB.
- Largest Contentful Paint ≤ 2.0s on mobile 4G.
- Cumulative Layout Shift ≤ 0.02.
- Lighthouse Performance ≥ 90 on mobile, ≥ 98 on desktop.
- Lighthouse Accessibility ≥ 95.
- All animations 60fps on a 2020 mid-range Android. If they aren't, simplify.

Implementation rules:
- Dynamic-import the hero canvas, the Tally demo, and the AriseCode iframe. None of them block first paint.
- Use `next/image` for every image. Serve AVIF.
- Preload only Geist Sans 400 + 900 and Geist Mono 400. Subset to Latin.
- Compress all video reels to MP4 (h264, CRF 25, no audio) and WebM (VP9). Provide both via `<source>`.
- Defer Lenis init until after `idle`.
- No analytics on first launch (no Plausible, no PostHog). Add later if needed.

---

## 8. Accessibility

- All interactive elements have visible focus states using a 2px `--signal` outline with 2px offset.
- All images have meaningful alt text. Decorative SVGs use `aria-hidden`.
- The custom cursor is **additive**, not a replacement — the system cursor must still be visible (just dimmed via CSS). Or, cleaner, only show the custom cursor on devices with fine pointer (`@media (pointer: fine)`).
- Keyboard navigable. Tab order matches visual order. Skip-link at top.
- Live demo inputs have labels, even if visually hidden.
- The audio name-pronunciation must require a click to play. Never autoplay audio.
- Honour `prefers-reduced-motion`: disable Lenis smooth scroll, disable hero canvas animation, disable scroll-triggered reveals.

---

## 9. Content checklist (Bilawal to provide)

Before launch, drop these files in:

- [ ] `Bilawal-Ullah-Sami-CV.pdf` — final version, in `/public/cv/`.
- [ ] `bilawal.mp3` — short audio of his name pronunciation, in `/public/audio/`.
- [ ] NoteSnap demo reel — 30s, in `/public/reels/notesnap.mp4` (+ WebM).
- [ ] AriseCode demo reels (3) — 6–10s each.
- [ ] 5 NoteSnap screenshots (already exist from the dissertation appendix).
- [ ] 5 Tally screenshots.
- [ ] 3 JetLagPro screenshots (TestFlight or design files).
- [ ] 1 Go Ride screenshot (hero shot of the fleet page).
- [ ] 1 short Gesture Control demo video or GIF (10–15s, you on webcam doing 3 gestures).
- [ ] Gesture Control GitHub repo URL.
- [ ] TestFlight public invite link for JetLagPro.
- [ ] LinkedIn URL.
- [ ] Final email address to use.
- [ ] Confirm GitHub handle is `Bilawal122`.

---

## 10. Build phases

**Phase 1 — Scaffolding (half a day)**
- Next.js 15 + TS + Tailwind v4 setup.
- Fonts wired up. Palette in CSS variables. Grain overlay. Custom cursor. Lenis provider. Nav + footer shells.
- Deploy to Vercel preview. Confirm Lighthouse baseline before adding content.

**Phase 2 — Static sections (one day)**
- Hero (without the canvas — placeholder block).
- About, More, Now, Contact. All static, all responsive.
- Section labels, scroll-triggered reveals.

**Phase 3 — Featured work + reels (one day)**
- Sticky-title chapters for NoteSnap, Tally, AriseCode.
- Screenshot carousels.
- Embedded reels.

**Phase 4 — Live demos (one day)**
- Tally `/api/tally-demo` route + UI + streaming.
- Upstash rate-limit.
- AriseCode embed (or fallback playback).

**Phase 5 — Hero canvas + polish (half a day)**
- ASCII or generative grid canvas in the hero.
- Magnetic buttons, easter-egg name typer.
- Final accessibility + Lighthouse pass.

**Total: ~4 days of focused work.**

---

## 11. Decisions deferred to Bilawal

These are things this PRD is opinionated on but Bilawal might want to override. If he doesn't say anything, build with the defaults above.

1. **Accent colour.** PRD specifies acid yellow (#E6FF00). Alternatives if he hates it: hot orange #FF4D00, or a near-white #FFFFFF used as the only "highlight" with everything else in greyscale (very brutalist).
2. **Hero canvas style.** ASCII portrait that morphs vs generative monospace grid vs WebGL shader. Default: ASCII portrait, because it's both more personal and more memorable.
3. **PP Editorial New vs Geist Sans** for display. Default: Geist (free, hosted, fast). Editorial New if he wants sharper, more art-direction feel.
4. **AriseCode demo.** Real embed vs pre-recorded playback. Default: try real embed first, fall back to playback if auth gets in the way.
5. **CV button placement.** Currently bottom contact section only. Could also live in the nav for one-click access — recommended for recruiter audience.

---

## 12. Anti-goals (things this site must NOT do)

- "Hi, I'm Bilawal 👋" anywhere. Ever.
- Skill bars or radial progress charts for technologies.
- A "what I do" trio of cards with icons.
- Generic gradient orbs in the background.
- Auto-typed text that says "I'm a [Developer | Designer | Coffee Enthusiast]".
- A testimonials section.
- Any reference to being "passionate" about anything.
- A loading screen that takes longer than 800ms.
- Cookie banners (no analytics, no need).
- A "back to top" button (Lenis handles smooth-scrolling there in one keystroke).

---

End of PRD. Hand this to Claude Code with: *"Build this PRD exactly. Ask before deviating."*
