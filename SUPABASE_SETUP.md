# Making Skills, Experience & Projects editable from Supabase

Once this is set up, editing your site's content becomes: open a
table in Supabase's dashboard, edit a row, done. No code, no git
push, no redeploy — changes are live the next time someone loads the
page.

## What's changed

- `script.js` now tries to fetch Skills, Experience, and Projects from
  Supabase on every page load.
- If Supabase isn't configured yet, or the fetch fails for any reason
  (offline, project paused, etc.), it silently falls back to the
  same content that used to be hardcoded — **the site can never break
  or show empty sections**, even before you finish setup.
- The big **AI Operation Controller** card stays hand-written in
  `index.html`, untouched — it's your permanent centerpiece, not
  meant to be edited casually.

## One-time setup (about 10 minutes)

### 1. Create a Supabase project
Go to [supabase.com](https://supabase.com), sign up free, create a
new project. Pick any name/region/password (save the password
somewhere, though you won't need it for this).

### 2. Create the tables
In your project's dashboard, go to **SQL Editor** → **New query**.
Open `supabase_schema.sql` (included here), copy the whole thing,
paste it in, and click **Run**. This creates 3 tables (`skills`,
`experience`, `projects`), locks them so the public internet can only
*read* them (never edit), and fills them with your current content so
nothing changes visually the moment you switch over.

### 3. Get your connection details
Go to **Project Settings** (gear icon) → **API**. You need two
values:
- **Project URL** — looks like `https://abcdefgh.supabase.co`
- **anon public** key — a long string starting with `eyJ...`

This "anon" key is **safe to put in your public JS file** — it's
designed to be public, and the SQL above already locked it to
read-only access.

### 4. Paste them into script.js
Open `script.js`, find these two lines near the very top:
```js
const SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co"; // EDIT ME
const SUPABASE_ANON_KEY = "YOUR-ANON-PUBLIC-KEY"; // EDIT ME
```
Replace the placeholder values with your real ones from step 3.

### 5. Push it
```
git add .
git commit -m "Connect Skills/Experience/Projects to Supabase"
git push
```

That's it — from now on, your live site pulls this content from
Supabase instead of the JS file.

## How to actually edit content going forward

1. Go to your Supabase project → **Table Editor** (left sidebar).
2. Click `skills`, `experience`, or `projects`.
3. Click any cell to edit it directly, like a spreadsheet — or click
   **Insert row** to add a brand new skill/experience/project.
4. Changes are live immediately — just refresh your site.

**Adding a new skill:** insert a row with a `category` (use an
existing one to group under it, or a new name to create a new
column), a `name`, a `description`, and a `sort_order` number (lower
numbers show first).

**Adding a new project:** insert a row in `projects` with `name`,
`description`, a `tags` value like `["Python", "REST API"]` (must be
valid JSON), and optionally `github_url` / `demo_url`.

**Adding a new experience entry:** insert a row in `experience` with
`title`, `role`, `tag` (e.g. `"Internship · 2027"`), `description`,
and `points` as a JSON array like
`["Did X", "Built Y", "Learned Z"]`.

## If something looks wrong

Open your browser's console (F12 → Console tab) on your live site.
If Supabase fetching fails for any reason, you'll see a yellow
warning starting with "Could not load live content from Supabase" —
the site will still work fine on its fallback content, but this tells
you something needs attention (usually a typo in the URL/key, or a
malformed `tags`/`points` JSON value in a row).
