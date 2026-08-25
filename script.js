/* ============================================================
   SUPABASE CONNECTION
   Fill these in once you've created your Supabase project:
   Dashboard → Project Settings → API → "Project URL" and "anon public" key.
   The anon key is SAFE to put here — it's a public, read-only key by
   design (the SQL schema locks it to read-only via Row Level Security).
   Never put your "service_role" key here — that one is truly secret.
============================================================ */
const SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co"; // EDIT ME
const SUPABASE_ANON_KEY = "YOUR-ANON-PUBLIC-KEY"; // EDIT ME

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
    category: "Frameworks",
    items: [
      { name: "Spring Boot", desc: "Building scalable backend applications." },
      { name: "JPA/Hibernate", desc: "Object-relational mapping for Java applications." },
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
      { name: "VS Code", desc: "Code editor for development." },
      { name: "claude.ai", desc: "AI-powered coding assistant." },
      { name: "AI TOOLS", desc: "Leveraging AI for development and problem-solving." },
    ],
  },
  { 
    category: "Other Skills & Core",
    items: [
      { name: "REST API Development", desc: "Designing and implementing RESTful APIs." },
      { name: "Database Design", desc: "Structuring databases for efficiency and scalability." },
      {name : "DSA", desc: "Understanding data structures and algorithms for efficient coding."},
      {name : "OOP", desc: "Applying object-oriented programming principles."},
      { name: "DBMS", desc: "Database management systems for data storage and retrieval." },
      { name: "Problem Solving", desc: "Analyzing and solving complex problems." }
      { name: "Team Collaboration", desc: "Working effectively in team environments." },
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
   INTRO SPLASH
============================================================ */
function setupIntro() {
  const intro = document.getElementById("intro");
  const video = document.getElementById("introVideo");
  const skipBtn = document.getElementById("introSkip");
  if (!intro || !video) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    intro.remove();
    return;
  }

  document.body.classList.add("intro-active");

  let dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    intro.classList.add("is-hidden");
    document.body.classList.remove("intro-active");
    setTimeout(() => intro.remove(), 700); // matches the CSS fade duration
  }

  video.addEventListener("ended", dismiss);
  // safety net: if the video can't load/play for any reason, don't trap
  // the visitor on a blank screen — show the site after a short wait
  video.addEventListener("error", dismiss);
  setTimeout(dismiss, 5000);

  skipBtn.addEventListener("click", dismiss);
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
   INIT
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  setupIntro();
  loadContent();
  setupNav();
  setupScrollReveal();
  setupCursor();
  setupContactForm();
  setupFooterYear();
});
