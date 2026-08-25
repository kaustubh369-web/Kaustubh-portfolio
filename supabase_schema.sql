-- ============================================================
-- Run this ONCE in Supabase: Dashboard → SQL Editor → New query
-- → paste this whole file → Run.
--
-- Creates 3 tables (skills, experience, projects), locks them so
-- the public internet can only READ them (never edit/delete), and
-- seeds them with your current content so nothing changes visually
-- the moment you switch over.
-- ============================================================

-- ---------- SKILLS ----------
create table if not exists skills (
  id bigint generated always as identity primary key,
  category text not null,
  name text not null,
  description text not null,
  sort_order int not null default 0
);

alter table skills enable row level security;

create policy "Public can read skills"
  on skills for select
  using (true);
-- No insert/update/delete policy is created for the public —
-- by default that means the public CANNOT write, only you can,
-- via the Supabase dashboard (which uses your login, not this key).

insert into skills (category, name, description, sort_order) values
  ('Backend Development', 'Node.js', 'Building server-side applications and APIs.', 1),
  ('Backend Development', 'REST APIs', 'Designing and consuming structured web APIs.', 2),
  ('Backend Development', 'Java', 'Object-oriented programming for backend logic.', 3),
  ('Database', 'SQL', 'Querying and managing relational databases.', 1),
  ('Database', 'Database Design', 'Structuring schemas and data models.', 2),
  ('Tools & Core Skills', 'Git', 'Version control for tracking code changes.', 1),
  ('Tools & Core Skills', 'GitHub', 'Collaborating and hosting project repositories.', 2),
  ('Tools & Core Skills', 'Problem Solving', 'Breaking down and solving technical challenges.', 3),
  ('Tools & Core Skills', 'Teamwork', 'Collaborating effectively in project teams.', 4),
  ('Tools & Core Skills', 'Time Management', 'Balancing coursework, projects, and deadlines.', 5);


-- ---------- EXPERIENCE ----------
create table if not exists experience (
  id bigint generated always as identity primary key,
  title text not null,
  role text not null,
  tag text not null,
  description text not null,
  points jsonb not null default '[]',
  sort_order int not null default 0
);

alter table experience enable row level security;

create policy "Public can read experience"
  on experience for select
  using (true);

insert into experience (title, role, tag, description, points, sort_order) values
  (
    'SOA Ideathon 2026 — Smart India Hackathon Preparation',
    'Backend / Database & Prototype Development',
    'Hackathon · 2026',
    'Participated in the 2026 SOA Ideathon for Smart India Hackathon (SIH).',
    '["Database design", "REST API development", "Backend-related architecture", "Python-based prototype development", "Team collaboration", "Problem-solving and system design"]',
    1
  );


-- ---------- PROJECTS (the "more projects" grid — NOT the big
-- AI Operation Controller card, which stays hand-written in index.html) ----------
create table if not exists projects (
  id bigint generated always as identity primary key,
  name text not null,
  description text not null,
  tags jsonb not null default '[]',
  github_url text,
  demo_url text,
  sort_order int not null default 0
);

alter table projects enable row level security;

create policy "Public can read projects"
  on projects for select
  using (true);

-- Intentionally left empty — the site shows "More projects coming
-- soon" automatically until you insert a row here.
