/* ============================================================
   SUPABASE CONNECTION
   Fill these in once you've created your Supabase project:
   Dashboard → Project Settings → API → "Project URL" and "anon public" key.
   The anon key is SAFE to put here — it's a public, read-only key by
   design (the SQL schema locks it to read-only via Row Level Security).
   Never put your "service_role" key here — that one is truly secret.
============================================================ */
const SUPABASE_URL = "https://rzzdbcbolhocklhzcnpl.supabase.co"; // EDIT ME
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6emRiY2JvbGhvY2tsaHpjbnBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2MzU1NjQsImV4cCI6MjEwMzIxMTU2NH0.i521TNqL9Em9Fc6WrLxAy8zScQX7T4DtLmRxT_Lhv9U"; // EDIT ME

/* ============================================================
   CONTENT DATA — FALLBACK DEFAULTS
   These are used if Supabase isn't configured yet, or if a fetch
   ever fails (offline, Supabase down, etc.) — the site always has
   something to show. Once Supabase is set up, live data from your
   database silently replaces these on every page load.
============================================================ */

const DEFAULT_SKILLS = [
  {
    category: "Language",
    items: [
      { name: "JavaScript", desc: "Building interactive web applications." },
      { name: "SQL", desc: "Querying and managing relational databases." },
      { name: "Java", desc: "Object-oriented programming for backend logic." },
      { name: "Python", desc: "Scripting, data analysis, and backend development." },
      { name: "HTML & CSS", desc: "Structuring and styling web pages." },
      
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "Express.js", desc: " A minimalist web application framework built on Node.js to simplify routing, middleware integration, and API development." },
      { name: "node.js", desc: "Server-side JavaScript runtime for building scalable applications." },
      { name: "React.js", desc: "Building dynamic user interfaces with reusable components." },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MySQL", desc: "Managing relational databases." },
      { name: "PostgreSQL", desc: "Advanced relational database management." },
      { name: "MongoDB", desc: "NoSQL document database management." },
      { name: "Supabase", desc: "Backend as a service with PostgreSQL." },
      { name: "Redis", desc: "In-memory data structure store for caching and messaging." },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "Git & GitHub", desc: "Version control and collaboration." },
      { name: "Docker", desc: "Containerization for consistent environments." },
      { name: "Postman", desc: "API testing and development." },
      { name: "npm", desc: "Node.js package manager for development." },
    ],
  },
  { 
    category: "Other Skills & Core",
    items: [
      { name: "REST API", desc: "Designing and implementing RESTful APIs." },
      { name: "System Design", desc: "Structuring systems for efficiency and scalability." },
      { name : "DSA", desc: "Understanding data structures and algorithms for efficient coding."},
      { name : "OOP", desc: "Applying object-oriented programming principles."},
      { name: "DBMS", desc: "Database management systems for data storage and retrieval." },
      { name: "Deployment", desc: "Deploying and managing applications in production environments." },
    ],
  }
];

const DEFAULT_EXPERIENCE = [
  {
    title: "SOA Ideathon 2026 — Smart India Hackathon Preparation",
    role: "Backend / Database & Prototype Development",
    tag: "Hackathon · 2026",
    desc: "Participated in the 2026 SOA Ideathon for Smart India Hackathon (SIH).",
    points: [
      "Database design",
      "REST API development",
      "Backend-related architecture",
      "Python-based prototype development",
      "Team collaboration",
      "Problem-solving and system design",
    ],
  },
  // EDIT: copy the block above to add another entry — internships,
  // freelance projects, more hackathons, or open-source contributions.
];

// The AI Operation Controller is rendered separately in index.html as the
// large featured showcase card. This array is for everything ELSE —
// add a new project any time by adding an object here.
const DEFAULT_PROJECTS = [
  // Example of how to add a project once you have one ready:
  // {
  //   name: "Project Name",
  //   desc: "One or two sentence description of what it does.",
  //   tags: ["Python", "REST API"],
  //   github: "https://github.com/your-handle/repo",
  //   demo: "https://your-demo-link.com",
  // },
];

/* ============================================================
   RENDER: Skills
   `skillGroups` shape: [{ category, items: [{name, desc}] }]
============================================================ */
function renderSkills(skillGroups) {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;
  grid.innerHTML = ""; // clear before re-render (safe to call more than once)

  skillGroups.forEach((group) => {
    const col = document.createElement("div");
    col.className = "skills__col reveal";

    const heading = document.createElement("h3");
    heading.className = "skills__category-title";
    heading.textContent = group.category;
    col.appendChild(heading);

    group.items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "glass-card skill-card";
      card.innerHTML = `
        <div class="skill-card__name">${item.name}</div>
        <div class="skill-card__desc">${item.desc}</div>
      `;
      col.appendChild(card);
    });

    grid.appendChild(col);
  });
}

/* ============================================================
   RENDER: Experience
   `experienceList` shape: [{title, role, tag, desc, points: [...]}]
============================================================ */
function renderExperience(experienceList) {
  const list = document.getElementById("expList");
  if (!list) return;
  list.innerHTML = "";

  experienceList.forEach((exp) => {
    const card = document.createElement("article");
    card.className = "glass-card exp-card reveal";
    card.innerHTML = `
      <div class="exp-card__top">
        <div>
          <h3 class="exp-card__title">${exp.title}</h3>
          <p class="exp-card__role">${exp.role}</p>
        </div>
        <span class="exp-card__tag mono">${exp.tag}</span>
      </div>
      <p class="exp-card__desc">${exp.desc}</p>
      <div class="exp-card__points">
        ${exp.points.map((p) => `<span class="exp-card__point">${p}</span>`).join("")}
      </div>
    `;
    list.appendChild(card);
  });
}

/* ============================================================
   RENDER: Projects grid ("more projects")
   `projectList` shape: [{name, desc, tags: [...], github, demo}]
============================================================ */
function renderProjects(projectList) {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  grid.innerHTML = "";

  if (projectList.length === 0) {
    grid.innerHTML = `
      <div class="glass-card project-card project-card--empty">
        <span class="mono" style="font-size:12px;">MORE PROJECTS COMING SOON</span>
        <p class="project-card__desc">New backend, database, and AI projects will appear here as they're built.</p>
      </div>
    `;
    return;
  }

  projectList.forEach((p) => {
    const card = document.createElement("div");
    card.className = "glass-card project-card reveal";
    card.innerHTML = `
      <h4 class="project-card__title">${p.name}</h4>
      <p class="project-card__desc">${p.desc}</p>
      <div class="project-card__tags">
        ${p.tags.map((t) => `<span class="project-card__tag mono">${t}</span>`).join("")}
      </div>
      <div class="project-card__links">
        ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener">View GitHub</a>` : ""}
        ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">Live Demo</a>` : ""}
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ============================================================
   INTRO SPLASH — 0-100% loading counter, cycling "hello" through
   7 languages as it counts up, then reveals the site.
============================================================ */
function setupIntro() {
  const intro = document.getElementById("intro");
  const percentEl = document.getElementById("introPercent");
  const greetingEl = document.getElementById("introGreeting");
  const barFill = document.getElementById("introBarFill");
  const skipBtn = document.getElementById("introSkip");
  if (!intro || !percentEl || !greetingEl) return;

  // Word order also sets the language-cycle order below.
  const GREETINGS = [
    "Hello",       // English
    "नमस्ते",       // Hindi
    "Bonjour",     // French
    "こんにちは",   // Japanese
    "¡Hola!",      // Spanish
    "Hallo",       // German
    "¿Qué tal?",   // Mexican Spanish
  ];

  document.body.classList.add("intro-active");

  let dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    intro.classList.add("is-hidden");
    document.body.classList.remove("intro-active");
    setTimeout(() => intro.remove(), 700); // matches the CSS fade duration
  }

  skipBtn.addEventListener("click", dismiss);

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    // Respect the preference: show the finished state briefly rather
    // than animating, then reveal the site.
    percentEl.textContent = "100";
    if (barFill) barFill.style.width = "100%";
    setTimeout(dismiss, 400);
    return;
  }

  const DURATION_MS = 3200; // total loading-animation length
  const startTime = performance.now();

  function frame(now) {
    if (dismissed) return;
    const progress = Math.min((now - startTime) / DURATION_MS, 1);
    const percent = Math.floor(progress * 100);

    percentEl.textContent = percent;
    if (barFill) barFill.style.width = `${percent}%`;

    const langIndex = Math.min(
      Math.floor(progress * GREETINGS.length),
      GREETINGS.length - 1
    );
    if (greetingEl.dataset.index !== String(langIndex)) {
      greetingEl.dataset.index = String(langIndex);
      greetingEl.textContent = GREETINGS[langIndex];
      // restart the CSS pulse animation on every language change
      greetingEl.classList.remove("intro__greeting--pulse");
      void greetingEl.offsetWidth;
      greetingEl.classList.add("intro__greeting--pulse");
    }

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      setTimeout(dismiss, 400); // brief pause at 100% before revealing
    }
  }
  requestAnimationFrame(frame);

  // safety net: never trap a visitor here no matter what
  setTimeout(dismiss, DURATION_MS + 2000);
}

/* ============================================================
   SUPABASE: load live content, falling back to defaults on any
   failure (not configured yet, offline, Supabase down, etc.)
============================================================ */
function isSupabaseConfigured() {
  return (
    SUPABASE_URL &&
    !SUPABASE_URL.includes("YOUR-PROJECT-REF") &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_ANON_KEY.includes("YOUR-ANON")
  );
}

async function fetchTable(table, orderColumn = "sort_order") {
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=*&order=${orderColumn}.asc`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch ${table}: ${res.status}`);
  return res.json();
}

// Supabase gives us flat rows; the Skills UI needs them grouped by
// category — this reshapes [{category, name, description}, ...]
// into [{category, items: [{name, desc}]}, ...] in the order they arrive.
function groupSkillsByCategory(rows) {
  const groups = [];
  const index = new Map();
  rows.forEach((row) => {
    if (!index.has(row.category)) {
      index.set(row.category, { category: row.category, items: [] });
      groups.push(index.get(row.category));
    }
    index.get(row.category).items.push({ name: row.name, desc: row.description });
  });
  return groups;
}

function mapExperienceRows(rows) {
  return rows.map((row) => ({
    title: row.title,
    role: row.role,
    tag: row.tag,
    desc: row.description,
    points: row.points || [],
  }));
}

function mapProjectRows(rows) {
  return rows.map((row) => ({
    name: row.name,
    desc: row.description,
    tags: row.tags || [],
    github: row.github_url,
    demo: row.demo_url,
  }));
}

async function loadContent() {
  // Always render defaults immediately so the page is never empty
  // while we wait on a network request.
  renderSkills(DEFAULT_SKILLS);
  renderExperience(DEFAULT_EXPERIENCE);
  renderProjects(DEFAULT_PROJECTS);

  if (!isSupabaseConfigured()) return; // running on defaults only — that's fine

  try {
    const [skillRows, experienceRows, projectRows] = await Promise.all([
      fetchTable("skills"),
      fetchTable("experience"),
      fetchTable("projects"),
    ]);
    renderSkills(groupSkillsByCategory(skillRows));
    renderExperience(mapExperienceRows(experienceRows));
    renderProjects(mapProjectRows(projectRows));
    setupScrollReveal(); // re-tag freshly-inserted cards for the reveal animation
  } catch (err) {
    // Fetch failed (offline, Supabase paused, etc.) — defaults are
    // already showing, so the visitor never sees a broken page.
    console.warn("Could not load live content from Supabase, showing defaults:", err);
  }
}

/* ============================================================
   NAVBAR: scroll state, active link, mobile toggle
============================================================ */
function setupNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const navLinkEls = document.querySelectorAll(".nav__link");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 20);
  });

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinkEls.forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // active-section highlighting
  const sections = document.querySelectorAll("main section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinkEls.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => observer.observe(s));
}

/* ============================================================
   SCROLL REVEAL
============================================================ */
function setupScrollReveal() {
  // auto-tag common content blocks that don't already have .reveal
  const autoTargets = document.querySelectorAll(
    ".section__title, .section__intro, .glass-card, .about__text, .focus-list, .timeline__item"
  );
  autoTargets.forEach((el) => el.classList.add("reveal"));

  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));
}

/* ============================================================
   MAGNETIC CURSOR (desktop only)
============================================================ */
function setupCursor() {
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (isTouch) return;

  const ring = document.getElementById("cursorRing");
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function loop() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  const interactiveSelectors = "a, button, .glass-card, input, textarea";
  document.querySelectorAll(interactiveSelectors).forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("is-active"));
    el.addEventListener("mouseleave", () => ring.classList.remove("is-active"));
  });
}

/* ============================================================
   CONTACT FORM (client-side validation + honeypot spam guard)
============================================================ */
function setupContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // honeypot — if this hidden field got filled in, it's a bot
    const honeypot = form.querySelector("#company").value;
    if (honeypot) {
      status.textContent = "";
      return;
    }

    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim();
    const subject = form.querySelector("#subject").value.trim();
    const message = form.querySelector("#message").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subject || !message) {
      status.textContent = "Please fill in every field.";
      status.style.color = "#ff6b6b";
      return;
    }
    if (!emailPattern.test(email)) {
      status.textContent = "Please enter a valid email address.";
      status.style.color = "#ff6b6b";
      return;
    }

    // NOTE: this form does not send email yet — it has no backend.
    // To make it live, connect it to a form service (e.g. Formspree,
    // EmailJS) or your own backend endpoint, and POST the fields there.
    status.style.color = "var(--accent-cyan)";
    status.textContent = "Message ready to send — connect a form service to go live.";
    form.reset();
  });
}

/* ============================================================
   FOOTER YEAR
============================================================ */
function setupFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   RELIABILITY: safe init wrapper + global error resilience
   ------------------------------------------------------------
   Nothing above this line is touched. From here down is all NEW
   code — reliability and functionality additions layered on top
   of the existing site, none of it replacing what already works.
============================================================ */

// Runs a setup function in isolation: if one feature throws, the
// rest of the page keeps working instead of the whole script
// silently dying (which is exactly what happened before — one
// syntax/runtime error anywhere used to take down everything after
// it, including the intro splash and the Supabase content loading).
function safeRun(fn, label) {
  try {
    fn();
  } catch (err) {
    console.error(`[reliability] "${label}" failed — other features are unaffected:`, err);
  }
}

// Catches any otherwise-unhandled runtime error or rejected promise
// anywhere on the page and logs it clearly, instead of letting it
// fail silently or crash something unrelated.
window.addEventListener("error", (e) => {
  console.error("[reliability] Uncaught error:", e.error || e.message);
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("[reliability] Unhandled promise rejection:", e.reason);
});

/* ============================================================
   RELIABILITY: make the existing Supabase fetch resilient
   ------------------------------------------------------------
   This wraps the ORIGINAL fetchTable and loadContent functions
   defined above — their own code is not changed at all. Wrapping
   adds a timeout, one automatic retry, and a localStorage cache
   layer entirely from the outside.
============================================================ */

// A fetch that hangs (slow network, Supabase briefly unresponsive)
// used to be able to hang indefinitely. This makes any single
// attempt give up after 8 seconds so the page never gets stuck
// waiting — the existing fallback-to-defaults behavior still kicks
// in exactly as before if every attempt fails.
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), ms)),
  ]);
}

const _rawFetchTable = fetchTable;
fetchTable = async function (table, orderColumn = "sort_order") {
  try {
    return await withTimeout(_rawFetchTable(table, orderColumn), 8000);
  } catch (firstErr) {
    console.warn(`[reliability] "${table}" fetch failed once (${firstErr.message}) — retrying...`);
    return await withTimeout(_rawFetchTable(table, orderColumn), 8000);
  }
};

// localStorage cache: lets the site show your last-known-good
// content instantly on repeat visits (before the network reply
// even arrives), and keeps showing it if a visitor is offline or
// Supabase is briefly down — layered on top of, not replacing, the
// existing hardcoded DEFAULT_* fallback.
const CONTENT_CACHE_KEY = "kk_portfolio_content_cache_v1";
const CONTENT_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

function getCachedContent() {
  try {
    const raw = localStorage.getItem(CONTENT_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > CONTENT_CACHE_MAX_AGE_MS) return null;
    return parsed.data;
  } catch (err) {
    return null; // localStorage unavailable (private browsing, quota full, etc.) — non-fatal
  }
}

function setCachedContent(data) {
  try {
    localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
  } catch (err) {
    // non-fatal — caching is a nice-to-have, never a requirement
  }
}

function renderFromCacheIfAvailable() {
  const cached = getCachedContent();
  if (!cached) return;
  if (cached.skills) renderSkills(cached.skills);
  if (cached.experience) renderExperience(cached.experience);
  if (cached.projects) renderProjects(cached.projects);
}

// Refreshes the cache in the background AFTER the page has already
// shown content — never blocks anything the visitor sees.
async function refreshContentCache() {
  if (!isSupabaseConfigured()) return;
  try {
    const [skillRows, experienceRows, projectRows] = await Promise.all([
      fetchTable("skills"),
      fetchTable("experience"),
      fetchTable("projects"),
    ]);
    setCachedContent({
      skills: groupSkillsByCategory(skillRows),
      experience: mapExperienceRows(experienceRows),
      projects: mapProjectRows(projectRows),
    });
  } catch (err) {
    console.warn("[reliability] Background cache refresh failed — existing content stays as-is:", err);
  }
}

const _originalLoadContent = loadContent;
loadContent = async function () {
  renderFromCacheIfAvailable(); // instant paint from last visit, if any, before the network reply lands
  await _originalLoadContent(); // completely unmodified: defaults → live fetch → render, same as before
  refreshContentCache(); // fire-and-forget — updates the cache for next time, doesn't block anything now
};

/* ============================================================
   NETWORK STATUS BANNER
   Tells the visitor plainly when they've lost connectivity,
   instead of content just silently failing to update.
============================================================ */
function setupNetworkStatus() {
  const banner = document.createElement("div");
  banner.id = "networkBanner";
  banner.className = "network-banner mono";
  banner.textContent = "You're offline — showing the last loaded version of this page.";
  document.body.appendChild(banner);

  function update() {
    banner.classList.toggle("is-visible", !navigator.onLine);
  }
  window.addEventListener("online", update);
  window.addEventListener("offline", update);
  update();
}

/* ============================================================
   BACK TO TOP BUTTON
============================================================ */
function setupBackToTop() {
  const btn = document.createElement("button");
  btn.id = "backToTop";
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.innerHTML = "↑";
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    btn.classList.toggle("is-visible", window.scrollY > 600);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ============================================================
   SCROLL PROGRESS BAR
============================================================ */
function setupScrollProgress() {
  const bar = document.createElement("div");
  bar.id = "scrollProgress";
  bar.className = "scroll-progress";
  document.body.appendChild(bar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${pct}%`;
  });
}

/* ============================================================
   CLICK-TO-COPY CONTACT INFO
   Targets the existing .contact__row / .contact__value elements
   by class — no HTML changes needed to wire this up.
============================================================ */
function setupCopyToClipboard() {
  const rows = document.querySelectorAll(".contact__row");
  if (!rows.length) return;

  const toast = document.createElement("div");
  toast.id = "copyToast";
  toast.className = "copy-toast mono";
  toast.textContent = "Copied!";
  document.body.appendChild(toast);

  let toastTimer = null;
  function showToast(text) {
    toast.textContent = text;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1600);
  }

  rows.forEach((row) => {
    // only intercept copyable info (email/phone) — leave real links
    // (LinkedIn, GitHub) to navigate normally
    const label = row.querySelector(".contact__label")?.textContent || "";
    const isCopyable = /EMAIL|PHONE/i.test(label);
    if (!isCopyable) return;

    row.addEventListener("click", (e) => {
      const value = row.querySelector(".contact__value")?.textContent?.trim();
      if (!value || !navigator.clipboard) return;
      e.preventDefault();
      navigator.clipboard
        .writeText(value)
        .then(() => showToast(`Copied "${value}"`))
        .catch(() => {}); // clipboard permission denied — fail silently, link still works normally otherwise
    });
  });
}

/* ============================================================
   KEYBOARD: Escape closes the mobile nav menu
============================================================ */
function setupEscapeCloses() {
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const links = document.getElementById("navLinks");
    const toggle = document.getElementById("navToggle");
    if (links && links.classList.contains("is-open")) {
      links.classList.remove("is-open");
      toggle?.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    }
  });
}

/* ============================================================
   INLINE CONTACT FORM VALIDATION
   Adds real-time feedback as the visitor types/tabs through the
   form — purely additive, doesn't touch the existing submit
   handler or its validation logic at all.
============================================================ */
function setupInlineFormValidation() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fields = ["name", "email", "subject", "message"];

  fields.forEach((id) => {
    const field = form.querySelector(`#${id}`);
    if (!field) return;
    field.addEventListener("blur", () => {
      const value = field.value.trim();
      const isValid = id === "email" ? emailPattern.test(value) : value.length > 0;
      field.classList.toggle("field-invalid", value.length > 0 && !isValid);
    });
    field.addEventListener("input", () => {
      if (field.classList.contains("field-invalid")) {
        field.classList.remove("field-invalid");
      }
    });
  });
}

/* ============================================================
   LAZY FADE-IN FOR IMAGES
============================================================ */
function setupImageFadeIn() {
  const images = document.querySelectorAll("img");
  if (!images.length) return;

  images.forEach((img) => img.classList.add("img-fade"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("img-fade-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  images.forEach((img) => {
    if (img.complete) {
      img.classList.add("img-fade-visible"); // already loaded (e.g. from cache) — just show it
    } else {
      observer.observe(img);
    }
  });
}

/* ============================================================
   COSMIC BACKGROUND: starfield + shooting stars
   ------------------------------------------------------------
   Pure CSS animation (transform + opacity only, both GPU-composited)
   — no per-frame JavaScript, no layout/reflow cost, so this stays
   smooth even on modest hardware. JS only creates the DOM elements
   once at page load; the browser's compositor handles everything
   else after that.
============================================================ */
function setupCosmicBackground() {
  const container = document.createElement("div");
  container.className = "cosmic-bg";
  container.setAttribute("aria-hidden", "true");

  const stars = document.createElement("div");
  stars.className = "cosmic-bg__stars";
  container.appendChild(stars);

  // A handful of shooting stars, each with its own random-ish delay,
  // duration, and starting position so they don't all fire in sync —
  // reads as natural rather than mechanical.
  const STAR_COUNT = 4;
  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement("span");
    star.className = "shooting-star";
    const topStart = Math.random() * 40; // starts somewhere in the upper 40% of the screen
    const leftStart = Math.random() * 70;
    const duration = 6 + Math.random() * 5; // 6–11s full cycle
    const delay = Math.random() * 10; // staggered start
    star.style.top = `${topStart}%`;
    star.style.left = `${leftStart}%`;
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;
    container.appendChild(star);
  }

  document.body.prepend(container);

  // Respect visitors who've asked their OS/browser to reduce motion —
  // same courtesy already given to the intro splash.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    container.classList.add("cosmic-bg--static");
  }
}

/* ============================================================
   INIT — original startup sequence (unchanged in effect: same
   functions, same order — now wrapped in safeRun so that if any
   one of them throws, the rest still run instead of the whole
   page silently breaking, as previously happened).
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  safeRun(setupIntro, "setupIntro");
  safeRun(loadContent, "loadContent");
  safeRun(setupNav, "setupNav");
  safeRun(setupScrollReveal, "setupScrollReveal");
  safeRun(setupCursor, "setupCursor");
  safeRun(setupContactForm, "setupContactForm");
  safeRun(setupFooterYear, "setupFooterYear");
});

/* ============================================================
   INIT — additional features, running alongside the original
   startup sequence above.
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  safeRun(setupNetworkStatus, "setupNetworkStatus");
  safeRun(setupBackToTop, "setupBackToTop");
  safeRun(setupScrollProgress, "setupScrollProgress");
  safeRun(setupCopyToClipboard, "setupCopyToClipboard");
  safeRun(setupEscapeCloses, "setupEscapeCloses");
  safeRun(setupInlineFormValidation, "setupInlineFormValidation");
  safeRun(setupImageFadeIn, "setupImageFadeIn");
  safeRun(setupCosmicBackground, "setupCosmicBackground");
});
