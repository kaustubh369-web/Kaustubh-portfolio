/* ============================================================
   CONTENT DATA
   Edit these arrays to add/change Skills, Experience, and Projects
   without touching any HTML or layout code.
============================================================ */

const SKILLS = [
  {
    category: "Backend Development",
    items: [
      { name: "Node.js", desc: "Building server-side applications and APIs." },
      { name: "REST APIs", desc: "Designing and consuming structured web APIs." },
      { name: "Java", desc: "Object-oriented programming for backend logic." },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "SQL", desc: "Querying and managing relational databases." },
      { name: "Database Design", desc: "Structuring schemas and data models." },
    ],
  },
  {
    category: "Tools & Core Skills",
    items: [
      { name: "Git", desc: "Version control for tracking code changes." },
      { name: "GitHub", desc: "Collaborating and hosting project repositories." },
      { name: "Problem Solving", desc: "Breaking down and solving technical challenges." },
      { name: "Teamwork", desc: "Collaborating effectively in project teams." },
      { name: "Time Management", desc: "Balancing coursework, projects, and deadlines." },
    ],
  },
];

const EXPERIENCE = [
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
const PROJECTS = [
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
============================================================ */
function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;

  SKILLS.forEach((group) => {
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
============================================================ */
function renderExperience() {
  const list = document.getElementById("expList");
  if (!list) return;

  EXPERIENCE.forEach((exp) => {
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
============================================================ */
function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;

  if (PROJECTS.length === 0) {
    grid.innerHTML = `
      <div class="glass-card project-card project-card--empty">
        <span class="mono" style="font-size:12px;">MORE PROJECTS COMING SOON</span>
        <p class="project-card__desc">New backend, database, and AI projects will appear here as they're built.</p>
      </div>
    `;
    return;
  }

  PROJECTS.forEach((p) => {
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
  renderSkills();
  renderExperience();
  renderProjects();
  setupNav();
  setupScrollReveal();
  setupCursor();
  setupContactForm();
  setupFooterYear();
});
