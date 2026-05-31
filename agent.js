/* ==========================================================
   AI Agent dock — always-visible input bar with running glow.
   Chips & chat appear above when clicked.
   ========================================================== */

(function () {
  const CONTEXT = `
You are EnricBot — the AI assistant embedded inside Enric S Neelamkavil's product-design portfolio.
You answer ONLY questions about Enric, his work, process, design career, or things he
shares publicly on this portfolio (about, work, contact, personal interests, photography, podcast,
medium writing, tools, desk setup, services, availability, education, travel, etc.).

Strict rule: If the user asks anything UNRELATED to Enric or this portfolio
(coding help, general trivia, math, news, weather, recipes, jokes, "write me code",
"help with homework", roleplay, anything off-topic) reply with EXACTLY this message
and nothing else:

"That's a little outside what I'm here for — I only know Enric's world.
For anything else, drop him a line directly at hello@enric.design ✦"

Style: warm, concise, first-person on behalf of Enric where natural. 2–4 short
paragraphs max. Use plain text. Don't invent specific clients or numbers beyond what's listed below.

CRITICAL — Do NOT add sign-off lines like "you can find more on his portfolio" or
"reach out at hello@enric.design to chat more" to every reply. Only mention contact
details when the user actually asks how to reach Enric or about availability/hiring.
End most replies with a natural sentence, not a referral.

Here is what you know about Enric S Neelamkavil:

ROLE
- Product Designer · 4+ years
- Based in Bangalore, India · works worldwide remote
- Focuses on calm, considered interfaces for SaaS, fintech and consumer apps
- Open to work (freelance, contract, full-time)

SIGNATURE PROJECT
- Built and shipped **Lumen** — a focus-timer + journaling app, his own product.
  ~38k downloads, 4.8 stars, featured by Sidebar and Mobbin in 2025.

WORK / CASE STUDIES (selected)
- Fennec Bank — reimagined onboarding flow, 19% fewer drop-offs
- Cohort.club — community product, IA + design system
- Sona — voice journaling, end-to-end product
- Almanac — editorial CMS, redesign
- Drift Studio — agency website, brand + build
- Method — design system for a Series B SaaS

PROFESSIONAL TOOLS
- Figma, Framer, Linear, Notion, Principle, After Effects, Webflow, Cursor
- Comfortable handing off to engineering — knows enough Tailwind / React to prototype

EDUCATION
- B.Des, Industrial Design, NID Ahmedabad (2018–2022)

ACHIEVEMENTS
- Awwwards SOTD ×2
- CSS Design Awards
- Featured on Mobbin and Sidebar
- Speaker — Config 2025 (lightning talk on calm interfaces)

PERSONAL
- Loves travel — 19 countries so far, favourites are Iceland, Japan, Georgia
- Avid film photographer (mostly 35mm)
- Hosts a YouTube podcast "Quiet Pixels" — conversations with designers
- Writes monthly essays on Medium about design craft
- Climbing, slow cooking, vinyl records
- Desk setup: M3 MacBook Pro 14, Apple Studio Display, HHKB, Andrea Mosaic chair

SERVICES OFFERED
- Product design (end-to-end)
- Design systems
- Brand & website design
- Design coaching / portfolio review

CONTACT
- hello@enric.design
- +91 99999 99999
- @enric.design on Instagram / Twitter / Dribbble / Read.cv
- Schedule a call via the contact page
`;

  const onTopicHints = /(enric|portfolio|design|work|project|case study|tool|figma|framer|education|nid|award|achievement|service|hire|contact|email|phone|travel|photo|photograph|podcast|youtube|medium|setup|gear|desk|process|approach|experience|career|journey|client|freelance|availability|resume|cv|about|personal|brand|hello|hi|hey|who are you|what (do|can)|tell me|lumen|fennec|sona|drift|method|cohort)/i;

  const CHIPS = [
    { label: 'see my work', icon: 'work', q: 'Walk me through your work — what should I look at first?' },
    { label: 'how do you ship?', icon: 'process', q: 'How do you ship — what\'s your process?' },
    { label: 'what designer are you?', icon: 'person', q: 'What kind of designer are you?' },
    { label: "what's your availability?", icon: 'calendar', q: 'What\'s your availability right now?' },
    { label: 'tell me about Lumen', icon: 'spark', q: 'Tell me about Lumen — the product you built solo.' },
    { label: 'wanna chat?', icon: 'arrow', href: 'contact.html' },
    { label: 'resume', icon: 'arrow', href: 'resume.html' },
    { label: 'linkedin', icon: 'arrow', href: '#' },
  ];

  const ICONS = {
    work:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7 7 7-7"/></svg>`,
    process: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h12"/></svg>`,
    person:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/></svg>`,
    calendar:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>`,
    spark:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4"/></svg>`,
    arrow:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>`,
  };

  // ---- Rich, in-chat content the agent can surface ----
  const WORK_CARDS = {
    lumen:  { name: 'Lumen',        meta: 'Solo product · Case study', tone: 'ink',    href: 'case-study.html' },
    fennec: { name: 'Fennec Bank',  meta: 'Onboarding · 2026',         tone: 'amber',  href: 'work.html' },
    method: { name: 'Method',       meta: 'Design system · 2025',      tone: 'violet', href: 'work.html' },
    sona:   { name: 'Sona',         meta: 'Voice journaling · 2024',   tone: 'green',  href: 'work.html' },
    cohort: { name: 'Cohort.club',  meta: 'Community app · 2025',      tone: 'green',  href: 'work.html' },
    drift:  { name: 'Drift Studio', meta: 'Brand & site · 2023',       tone: 'dark',   href: 'work.html' },
  };
  const ABOUT_TILES = [
    { label: '35mm · Iceland',     tone: 'stripes' },
    { label: 'Quiet Pixels · pod', tone: 'violet' },
    { label: 'Desk · Bangalore',   tone: 'stripes' },
  ];

  function workCardsHtml(keys) {
    const cards = keys.map(k => WORK_CARDS[k]).filter(Boolean);
    if (!cards.length) return '';
    return `<div class="rich-cards">${cards.map(c => `
      <a class="rich-card" data-nav="${c.href}">
        <span class="rich-card__art rich-card__art--${c.tone}">
          <span class="rich-card__mark">${c.name[0]}</span>
        </span>
        <span class="rich-card__body">
          <span class="rich-card__name">${c.name}</span>
          <span class="rich-card__meta">${c.meta}</span>
        </span>
        <span class="rich-card__go">↗</span>
      </a>`).join('')}</div>`;
  }
  function aboutTilesHtml() {
    return `<div class="rich-tiles">${ABOUT_TILES.map(t => `
      <span class="rich-tile rich-tile--${t.tone}"><span>${t.label}</span></span>`).join('')}</div>`;
  }
  function linkChipsHtml(links) {
    if (!links || !links.length) return '';
    return `<div class="rich-links">${links.map(l =>
      `<a class="rich-link" data-nav="${l.href}">${l.label}<span>↗</span></a>`).join('')}</div>`;
  }

  // Decide what visual context to attach to a bot reply, based on the question
  function attachmentsFor(q) {
    const low = q.toLowerCase();
    let html = '';

    // Specific project mentions
    const named = Object.keys(WORK_CARDS).filter(k => low.includes(k));
    if (named.length) {
      html += workCardsHtml(named);
      html += linkChipsHtml([{ label: 'Open the work', href: 'work.html' }]);
      return html;
    }
    // General work / portfolio
    if (/\b(work|works|project|projects|portfolio|case stud|ship|built|made)\b/.test(low)) {
      html += workCardsHtml(['lumen', 'fennec', 'method', 'sona']);
      html += linkChipsHtml([{ label: 'See all 12 projects', href: 'work.html' }]);
      return html;
    }
    // About / personal
    if (/\b(about|who are you|yourself|personal|life|travel|photo|photograph|podcast|desk|hobby|hobbies|interest|film|climb)\b/.test(low)) {
      html += aboutTilesHtml();
      html += linkChipsHtml([
        { label: 'Read about me', href: 'about.html' },
        { label: 'The personal side', href: 'about.html?mode=personal' },
      ]);
      return html;
    }
    // Contact / hire / availability
    if (/\b(contact|hire|hiring|email|reach|avail|freelance|work together|project with|book|call)\b/.test(low)) {
      html += linkChipsHtml([
        { label: 'Start an enquiry', href: 'contact.html' },
        { label: 'Email Enric', href: 'mailto:hello@enric.design' },
        { label: 'View résumé', href: 'resume.html' },
      ]);
      return html;
    }
    // Resume
    if (/\b(resume|résumé|cv|experience|background)\b/.test(low)) {
      html += linkChipsHtml([{ label: 'Open résumé', href: 'resume.html' }]);
      return html;
    }
    return '';
  }

  // --- DOM scaffolding ---
  const root = document.createElement('div');
  root.className = 'agent-root';
  root.innerHTML = `
    <div class="agent-glow" aria-hidden="true"></div>
    <div class="agent-thread" id="agent-thread" hidden>
      <div class="agent-thread__head">
        <div class="agent-thread__id">
          <div class="agent-thread__av">E</div>
          <div class="agent-thread__title"><b>Chat with Enric</b></div>
        </div>
        <div class="agent-thread__actions">
          <button class="agent-thread__btn" id="agent-expand" title="Expand" type="button">
            <svg class="i-expand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5"/></svg>
            <svg class="i-collapse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h5V3M21 8h-5V3M3 16h5v5M21 16h-5v5"/></svg>
          </button>
          <button class="agent-thread__btn" id="agent-reset" title="New chat" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>
          </button>
          <button class="agent-thread__btn" id="agent-minimize" title="Close" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>
      </div>
      <div class="agent-thread__body" id="agent-thread-body"></div>
    </div>
    <div class="agent-chips" id="agent-chips">
      ${CHIPS.map(c => `
        <button class="agent-chip" ${c.href ? `data-href="${c.href}"` : `data-q="${c.q.replace(/"/g,'&quot;')}"`}>
          <span>${c.label}</span>
          ${ICONS[c.icon] || ''}
        </button>
      `).join('')}
    </div>
    <div class="agent-bar-wrap" id="agent-bar-wrap">
      <div class="agent-bar">
        <span class="agent-bar__prefix">›_</span>
        <input type="text" id="agent-input" placeholder="ask Enric anything…" autocomplete="off" />
        <span class="agent-bar__kbd" id="agent-kbd"><b>⌘ K</b></span>
        <button class="agent-bar__close" id="agent-close" aria-label="Close" type="button">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
        <button class="agent-bar__send" id="agent-send" disabled aria-label="Send" type="button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  `;

  const backdrop = document.createElement('div');
  backdrop.className = 'agent-backdrop';

  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(root);
    document.body.appendChild(backdrop);
    bindAll();
  });

  let openState = false;
  let messages = [];
  let busy = false;

  function open() {
    if (openState) return;
    openState = true;
    root.classList.add('is-open');
    document.getElementById('agent-bar-wrap')?.classList.add('is-active');
  }

  function close() {
    if (!openState) return;
    openState = false;
    root.classList.remove('is-open');
    document.getElementById('agent-bar-wrap')?.classList.remove('is-active');
    document.getElementById('agent-input')?.blur();
  }

  // --- Render messages ---
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function renderText(text) {
    const safe = escapeHtml(text);
    return safe
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`).join('');
  }
  function appendMsg(role, text, attachHtml) {
    const thread = document.getElementById('agent-thread');
    const body = document.getElementById('agent-thread-body');
    if (!thread || !body) return null;
    thread.hidden = false;
    const row = document.createElement('div');
    row.className = 'msg-row ' + (role === 'user' ? 'msg-row--user' : 'msg-row--bot');
    if (role === 'user') {
      row.innerHTML = `
        <div class="msg-av msg-av--user">YOU</div>
        <div class="msg-bubble msg-bubble--user">${renderText(text)}</div>
      `;
    } else {
      row.innerHTML = `
        <div class="msg-av msg-av--bot">E</div>
        <div class="msg-col">
          <div class="msg-bubble">${renderText(text)}</div>
          ${attachHtml || ''}
        </div>
      `;
    }
    body.appendChild(row);
    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
    return row.querySelector('.msg-bubble');
  }
  function appendTyping() {
    const thread = document.getElementById('agent-thread');
    const body = document.getElementById('agent-thread-body');
    if (!thread || !body) return;
    thread.hidden = false;
    const row = document.createElement('div');
    row.className = 'msg-row msg-row--bot';
    row.id = 'agent-typing';
    row.innerHTML = `
      <div class="msg-av msg-av--bot">E</div>
      <div class="msg-bubble"><div class="typing"><span></span><span></span><span></span></div></div>
    `;
    body.appendChild(row);
    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
  }
  function removeTyping() { document.getElementById('agent-typing')?.remove(); }

  const OFFTOPIC = `That's a little outside what I'm here for — I only know Enric's world.\n\nFor anything else, drop him a line directly at **hello@enric.design** ✦`;

  async function ask(q) {
    if (!q || busy) return;
    if (!openState) open();
    busy = true;
    messages.push({ role: 'user', content: q });
    appendMsg('user', q);
    appendTyping();

    let answer;
    try {
      if (typeof window.claude !== 'undefined' && window.claude.complete) {
        const system = CONTEXT.trim();
        const transcript = messages.slice(-10)
          .map(m => `${m.role === 'user' ? 'User' : 'Enric'}: ${m.content}`).join('\n\n');
        const prompt = `${system}\n\n---\nConversation so far:\n${transcript}\n\nReply now as Enric's assistant. Remember the off-topic rule.`;
        answer = await window.claude.complete(prompt);
        answer = (answer || '').trim();
        if (!answer) answer = OFFTOPIC;
      } else {
        answer = fallbackAnswer(q);
      }
    } catch (err) {
      answer = fallbackAnswer(q);
    }

    removeTyping();
    const isOffTopic = answer.trim().startsWith("That's a little outside");
    const attach = isOffTopic ? '' : attachmentsFor(q);
    appendMsg('bot', answer, attach);
    messages.push({ role: 'assistant', content: answer });
    busy = false;
    document.getElementById('agent-input')?.focus();
  }

  function fallbackAnswer(q) {
    if (!onTopicHints.test(q)) return OFFTOPIC;
    const low = q.toLowerCase();
    if (/lumen|signature|own product/.test(low))
      return `**Lumen** is the product I'm most proud of — a focus-timer + journaling app I built and shipped solo in 2024. It crossed ~38k downloads with a 4.8 rating, and got featured by Sidebar and Mobbin in 2025.\n\nIt's where my craft, ops and writing skills had to all show up at once. Happy to walk through the design decisions if you'd like.`;
    if (/tool|figma|framer|stack/.test(low))
      return `Day-to-day: **Figma** for design, **Framer** + **Webflow** for sites, **Linear** + **Notion** for ops, **Principle** and **After Effects** for motion, **Cursor** for prototyping in code.`;
    if (/contact|hire|email|reach|avail/.test(low))
      return `Easiest: **hello@enric.design** — or use the form on the Contact page. I'm currently taking on **2 projects for Q3 2026**.`;
    if (/travel|countr/.test(low))
      return `19 countries so far — **Iceland**, **Japan** and **Georgia** are the ones I return to. There's a travel log on the personal side of the About page.`;
    if (/podcast|youtube/.test(low))
      return `I host **Quiet Pixels** on YouTube — long, slow conversations with designers I admire about craft, taste and routine.`;
    if (/ship|process|approach/.test(low))
      return `I work in five quiet steps — listen, frame, sketch wide, make it real, finish. Most of the value sits in the first and last steps.`;
    if (/what kind|what designer/.test(low))
      return `I'm a product designer who works end-to-end — research, IA, interaction, motion, finishing. I care most about calmness, clarity and the boring details no one notices when they're right.`;
    return `Happy to help. Try one of the suggestions, or ask about my work, process, tools, travel, podcast or how to work together.`;
  }

  function bindAll() {
    // Backdrop click closes
    backdrop.addEventListener('click', close);

    // Floating suggestion chips
    root.querySelectorAll('.agent-chip').forEach(el => {
      el.addEventListener('click', () => {
        if (el.dataset.href) location.href = el.dataset.href;
        else if (el.dataset.q) ask(el.dataset.q);
      });
    });

    // Delegate clicks on in-chat rich cards / links
    document.getElementById('agent-thread-body')?.addEventListener('click', (e) => {
      const nav = e.target.closest('[data-nav]');
      if (nav) location.href = nav.dataset.nav;
    });

    // Input
    const input = document.getElementById('agent-input');
    const send = document.getElementById('agent-send');
    input.addEventListener('focus', open);
    input.addEventListener('click', open);
    input.addEventListener('input', () => { send.disabled = !input.value.trim(); });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && input.value.trim()) {
        const v = input.value.trim();
        input.value = ''; send.disabled = true;
        ask(v);
      }
      if (e.key === 'Escape') close();
    });
    send.addEventListener('click', () => {
      const v = input.value.trim();
      if (!v) return;
      input.value = ''; send.disabled = true;
      ask(v);
    });

    // Close button (in input bar)
    document.getElementById('agent-close')?.addEventListener('click', (e) => {
      e.stopPropagation();
      close();
    });

    // Expand / collapse the chat surface
    document.getElementById('agent-expand')?.addEventListener('click', (e) => {
      e.stopPropagation();
      root.classList.toggle('is-expanded');
    });

    // Chat container actions
    document.getElementById('agent-minimize')?.addEventListener('click', (e) => {
      e.stopPropagation();
      close();
    });
    document.getElementById('agent-reset')?.addEventListener('click', (e) => {
      e.stopPropagation();
      messages = [];
      const body = document.getElementById('agent-thread-body');
      const thread = document.getElementById('agent-thread');
      if (body) body.innerHTML = '';
      if (thread) thread.hidden = true;
      root.classList.remove('is-expanded');
    });
  }

  // ⌘K toggle
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (openState) close();
      else {
        open();
        document.getElementById('agent-input')?.focus();
      }
    }
  });
})();
