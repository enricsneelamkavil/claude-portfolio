# CLAUDE CONTEXT FILE — Read this first. No need to ask for background.

# Portfolio | enric.design

## Goal
Personal product-designer portfolio for **Enric S Neelamkavil** (Bangalore, IN). Clean, minimal B&W base with warm orange accent. 5 main pages + case-study + easter-egg page. Centerpiece interaction: persistent AI agent bar at bottom of every page.

NOTE: User originally referenced enric.design — we do NOT recreate it (copyright). All structure/content is original; details are placeholder content user will swap.

## Tech stack
- Plain HTML / CSS / vanilla JS (no React, no build step)
- Fonts (Google): Instrument Serif (display, italic display em), Manrope (body), JetBrains Mono (meta/labels)
- Agent uses `window.claude.complete` (built-in) with canned fallback if unavailable
- Shared scripts via `<script src="nav.js" data-page="..."></script>` + `<script src="agent.js"></script>` injected on every page

## File map
- `index.html` + `home.css` — landing
- `about.html` + `about.css` — Pro ↔ Personal toggle page
- `work.html` + `work.css` — filterable grid
- `resume.html` + `resume.css` — A4 resume viewer
- `contact.html` + `contact.css` — enquiry form
- `case-study.html` — Lumen inner page (inline styles)
- `old-portfolio.html` — easter egg, CRT/terminal 2022 page (self-contained)
- `styles.css` — global tokens, nav, footer, buttons, page-intro, marquee, placeholders
- `nav.js` — injects shared nav + footer + easter-egg trigger
- `agent.js` + `agent.css` — bottom agent bar
- `Enric_S_Neelamkavil_Resume.pdf` — placeholder (resume page links to it; not yet generated)

## Tokens (in styles.css :root)
- `--bg #ffffff` (pure white), `--bg-2 #f3f1ec` (warm light grey for alt sections), `--paper #ffffff`
- `--ink #0c0c0c`, `--ink-2 #1a1a1a`, `--muted #6e6a63`, `--muted-2 #9b968d`
- `--line rgba(12,12,12,.10)`, `--line-2 rgba(12,12,12,.18)`
- `--accent #ff4d2e` (warm orange) in Pro mode; switches to `#2563eb` (blue) in Personal mode
- `--font-display 'Instrument Serif'`, `--font-body 'Manrope'`, `--font-mono 'JetBrains Mono'`
- `--maxw 1280px`, `--pad-x clamp(20px,4vw,56px)`
- Radii: sm 8 / md 14 / lg 22
- Display headings: italic `<em>` colored muted or accent. Eyebrow = mono 11.5px uppercase letterspaced.

## Pages — content + structure

### Home (index.html)
1. Hero: crumb "Portfolio · v4 · 2026", huge display title "Product designer, crafting calm, considered interfaces.", bio + 3 stats (4+ years / 40+ projects / 1 solo product) + "See the work" + "Read about me" CTAs.
   - **REMOVED**: "Available for 2 projects · Q3 2026" pill (user request).
2. Marquee strip (Product design · Interaction · Design systems …)
3. **Signature feature** = Lumen card with phone mockup ring timer, stickers (Sidebar · Mobbin / 4.8★), bullets, "Read the full story" → case-study.html
4. **Selected work · visual posters** — 6 image-card posters in custom grid:
   - Fennec (lg, amber w/ black card mockup + sun)
   - Method (md, ink w/ color token grid + Aa stack)
   - Sona (wide full-width, violet w/ animated voice wave + REC badge)
   - Cohort.club (sm, mint w/ avatar network + lines)
   - Almanac (sm, cream w/ editorial typography mock)
   - Drift (sm, dark w/ italic wordmark + dot grid)
   - Each links to work.html. Bg `--bg` (white); section has subtle bg.
5. Recognition grid (Awwwards ×2, CSS Awards, Product Hunt, Speaker, Featured, quote card)
6. "A glimpse" personal teaser (3 angled photo placeholders + sticker "19 countries · 412 rolls of film · 1 pod")

### About (about.html)
- Two views toggled by **mini Pro/Personal switch** floating top-right (looks like dark/light mode toggle). 48px track, sliding 20px thumb, sun→moon icons, label flips Pro/Personal, accent var changes orange→blue, body bg flips white→#0c0c0c. Implemented in about.css `.mode-switch*` + small inline `<script>` in about.html.
- **Pro view**: summary (2-col lede + dl), journey timeline (5 items 2026→2022), **Companies "Worked with" grid** (12 hand-drawn SVG logo cards, ink-on-hover), **Tools logo grid** (Figma multi-color, Framer, Webflow, Notion, Linear, After Effects, Principle, Cursor, Slack, Rive, Obsidian, iA Writer — colored 40px logo squares), Achievements list, Education cards.
- **Personal view** (dark): hello card (4 blue stats), travel SVG world-map with 6 pins (Reykjavík, Tbilisi, Kyoto, Bangalore, Lisbon, Cape Town), 4 travel cards, Desk setup (hero img + 8-item gear list), Makes (Quiet Pixels podcast card + Medium essays card), Interests chips strip, **"Travel with me" blue gradient CTA form**.
- **Resume section REMOVED** from about (moved to its own page).

### Work (work.html)
- Filter bar (All/Case studies/Design/Brand/System) + grid↔list view toggle + visible count
- Lumen pinned feature card on top (case study)
- 12 project cards in 3-col grid, list view collapses to single column
- **Process** section: 5 cards each with custom orange SVG icon (listen/frame/sketch/make-real/finish) in tinted bg square. `.process__icon` 48×48, accent color, `rgba(255,77,46,0.08)` bg.

### Resume (resume.html) — NEW DEDICATED PAGE
- Toolbar (file name + zoom −/+ + print)
- A4 paper article (aspect 1/1.414) showing full resume content: name, contact column, summary, 4 experience roles (Method/Lumen/Sona/Fennec), education, recognition, skills, tools, footer
- Dark CTA card: Download PDF / Copy link / Email
- Print stylesheet for Cmd+P
- Inline `<script>` handles zoom, print, copy

### Contact (contact.html)
- Sticky form (service chips, name/email/company/role, budget/timeline selects, brief w/ word count, send) → success state
- Sidebar: direct contact card (email/phone/Calendly + live IST clock that ticks), dark Services card (4 numbered items), Socials grid (6: LinkedIn/IG/X/Dribbble/Read.cv/YouTube).
- **FAQ section REMOVED** (user request).
- Outro band with big email link

### Case study (case-study.html)
Lumen inner: hero (huge "Lumen.", meta dl), context → stats grid → dark phone-trio frame → approach → outcome → next nav. Inline styles.

### Old portfolio (old-portfolio.html) — EASTER EGG
- 2022 CRT terminal aesthetic: green-on-black #c7f0c7/#0a1a0a, VT323 + Courier Prime, scanline overlay + flicker, ASCII "ENRIC" banner
- Terminal blocks: about / projects (list with dashed dividers) / gallery / contact
- "← back to 2026" button → index.html
- Self-contained (no shared CSS)

## Nav (nav.js)
- Sticky top, blur bg
- Brand: `E` dot + "Enric S Neelamkavil" (NO subtitle anymore)
- Nav links: Home / About / Work / Resume / Contact (no nums anymore)
- Right: dashed `⟲ 2022` time-warp button (`.nav__timewarp`)
- Click → fullscreen overlay `.timewarp-overlay` shows "2026" → "2022" gradient text + 3 bouncing bars + "Rewinding to 2022 …" → navigates to old-portfolio.html after 1.8s

## Agent (agent.js + agent.css) — current iteration
- **Always-visible input bar** at bottom-center (no pill state). `.agent-bar-wrap` has rotating conic-gradient border (running glow): full 360° continuous color (orange→pink→purple→blue), 4.5s idle / 3.5s active, steady linear pace. Inner `.agent-bar` is solid white with `›_` prefix, input "ask Enric anything…", **⌘ K pill** (38px, matching close/send dimensions, sits before send, fades out on open), close button, dark send button (turns accent on hover).
- **Ambient halo** soft purple/orange radial glow behind dock.
- **Click/focus input → opens**: chips fade in above bar, staggered. 8 chips with icons: see my work / how do you ship? / what designer are you? / availability / tell me about Lumen / wanna chat? / resume / linkedin.
- **First message sent**: chat container slides in above bar (white card, border, soft shadow). Header: E avatar + "Chat with Enric" + live dot + reset/minimize buttons. Body holds messages. **Chips move INSIDE the chat container** as a horizontal-scrolling footer strip (smaller padding), persisting through the conversation. On reset, chips move back to floating position.
- Backdrop click closes; Esc closes; ⌘K toggles.
- Live mode uses `window.claude.complete` with system prompt in CONTEXT constant. **Strict off-topic rule**: anything not about Enric/portfolio → canned reply "That's a little outside what I'm here for — I only know Enric's world. For anything else, drop him a line directly at hello@enric.design ✦"
- **Critical prompt rule**: do NOT add "you can find on his portfolio" or "reach out at hello@enric.design" sign-off to every reply; only mention contact when user actually asks about reaching/availability.
- Fallback canned answers when window.claude is missing (Lumen/tools/contact/travel/podcast/process/whatKind branches).

## Design decisions / history
- Background started warm `#f6f4ef` → user asked for white → switched to `#ffffff`, alt sections use `--bg-2 #f3f1ec` for separation
- Agent went through 3 iterations: pill→big greeting card → pill→decluttered chips → **always-visible bar with chips on activation** (final)
- Agent close used to blur backdrop → user said no blur → backdrop is transparent click-catcher only
- Glow: initially conic w/ transparent gap → user said "no breaks, constant run" → full 360° continuous color band, slower steady pace
- ⌘ K placement: started as side hint → user said align with send button → pill-shaped matching send/close, fades collapsing when active
- Home work strip: initially text index list → user wanted "visual treat" → 6 custom-illustrated poster cards
- Pro/Personal toggle: started as sticky bar under nav with thumb-segmented control → user wanted dark/light style mini toggle → floating top-right 48px switch with sliding thumb
- Resume: started inline section on about page → spun out to dedicated page with A4 paper + toolbar + download CTA per user request
- Tools section: text list with mono badges → real colored logo squares
- Companies: didn't exist → added 12-card logo grid (hand-drawn inline SVG marks)
- Process cards (work page): just number+text → added orange illustration icons
- Removed: nav "Open to work" pill, nav num prefixes ("01"/"02"), brand "Product Designer" subtitle, hero "Available for 2 projects" tag, contact FAQ accordion
- Easter egg `⟲ 2022` button in nav → CRT-styled old-portfolio.html with rewind overlay

## State
**Done**: all 5 main pages + case-study + old-portfolio. Agent fully functional. All user iterations through May 27, 2026 incorporated.

**Known open items / next steps**:
- Real `Enric_S_Neelamkavil_Resume.pdf` not generated (link in resume.html is placeholder; user can drop in actual PDF or we can build via print-to-PDF skill)
- Image slots are SVG placeholders (striped/colored) with mono captions — user expected to drop in real photography eventually (travel, desk, podcast, project shots)
- Company logos are hand-drawn approximations — user can swap with real wordmarks
- Old-portfolio links are non-functional placeholder anchors
- Linkedin / social URLs are `#` placeholders

## Constraints / rules
- Pure white bg `--bg #ffffff` is core; use `--bg-2` for any section that needs separation
- Accent flips orange (Pro) ↔ blue (Personal) only on about page
- Never recreate enric.design's UI — all original
- Agent must refuse off-topic queries with the exact canned line and NOT add referral sign-offs to normal replies
- ⌘K must be a hint pill not a clickable-looking button
- Mode toggle = mini top-right switch (not bar)
- Email used everywhere: hello@enric.design
- Phone: +91 99999 99999 (placeholder)
