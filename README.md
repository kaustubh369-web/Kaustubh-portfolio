# Kaustubh Kushagra — Portfolio Website

Plain HTML/CSS/JS. No build step, no npm install, no framework —
open the files in any text editor and change them directly. Open
`index.html` in a browser (just double-click it) to preview.

## Files

- `index.html` — all page content and structure
- `style.css` — all colors, fonts, spacing, animations (see the token
  list at the very top of the file)
- `script.js` — interactions, plus the editable data for Skills,
  Experience, and Projects (see below)
- `resume.pdf` — your resume, linked from both the Resume section and
  the Contact section (see below)
- `intro.mp4` — the video that plays once when the site first loads

## The three things you'll edit most often

Open `script.js` and look near the top for three arrays:

- `SKILLS` — add/remove a skill by adding/removing an object inside
  a category. Add a whole new category by copying a `{ category: ...,
  items: [...] }` block.
- `EXPERIENCE` — add a new internship, hackathon, or freelance entry
  by copying the existing block and changing the text.
- `PROJECTS` — currently empty (shows "More projects coming soon").
  Add a project any time by adding an object like:
  ```js
  {
    name: "Project Name",
    desc: "One or two sentence description.",
    tags: ["Python", "REST API"],
    github: "https://github.com/your-handle/repo",
    demo: "https://your-demo-link.com",
  }
  ```
  The card renders itself automatically — no HTML editing needed.

The **AI Operation Controller** featured project is written directly
in `index.html` (search for `feature-project`) since it's the large
showcase card, not part of the grid.

## Adding your photo

In `index.html`, search for `ADD PHOTO`. Replace the placeholder
`<div class="hero__portrait-placeholder">...</div>` block with:
```html
<img src="your-photo.jpg" alt="Kaustubh Kushagra">
```
Put `your-photo.jpg` in the same folder as `index.html`.

## Filling in the placeholders

Search the files for `#` (empty links) and `Coming Soon` — these mark
the two things intentionally left as placeholders per the brief:
- The AI Operation Controller **live demo link** (in `index.html`,
  `feature-project__links`)
- The **resume download link** (in `index.html`, `contact__resume-btn`)

## Making the contact form actually send email

Right now the form validates input but doesn't send anywhere (there's
no backend). To make it live, sign up for a free service like
[Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com),
and follow their docs to point the form at your new endpoint — this
usually just means changing the `<form>` tag's `action` attribute or
adding a few lines to the submit handler in `script.js`
(`setupContactForm` function).

## Hosting it live

Any static host works since there's no backend:
- **GitHub Pages** (free) — push these 3 files to a GitHub repo,
  enable Pages in repo Settings, done.
- **Vercel** or **Netlify** (free) — drag-and-drop the folder on
  their dashboard, or connect the GitHub repo for auto-deploys.

## Design tokens (colors, fonts)

Everything visual is controlled from the `:root { ... }` block at the
very top of `style.css`. Change a hex value there and it updates
everywhere that color is used — no need to hunt through the file.

## Updating your resume

The Resume section (and the "Download Resume" button in Contact) both
link to a file called `resume.pdf` sitting in this same folder — they
don't point to any specific version, just that filename.

To update your resume, just **replace `resume.pdf` with your new file,
keeping the exact same filename** (`resume.pdf`), then push it the
same way you push any other change:
```
git add .
git commit -m "Update resume"
git push
```
No HTML or code changes needed — every link on the site automatically
points at whatever `resume.pdf` currently contains.

**Keep your resume's links clickable:** if you edit your resume in
Word/Google Docs and re-export to PDF, links (email, LinkedIn, GitHub,
portfolio) usually stay clickable automatically as long as you typed
them as real links (not just plain text) in the original document.
If you're ever unsure, open the exported PDF and click a link to
confirm before pushing it live.

## Changing or removing the intro video

The splash video is `intro.mp4`, referenced in `index.html` inside
the `<div class="intro">` block near the top of the file. To swap it,
replace `intro.mp4` with a new file of the same name (same push steps
as above). A few things to know:
- It's muted and set to autoplay — browsers block autoplay-with-sound,
  so keep any new video muted too, or the intro will just show a
  frozen frame until the visitor unmutes it themselves.
- It plays once, then fades into the homepage automatically when the
  video ends — no fixed timer, so a longer or shorter video "just
  works" without editing any code.
- There's a small "SKIP" button in the corner the whole time, and a
  5-second safety cutoff in `script.js` (`setupIntro` function) in
  case a video ever fails to load — visitors are never stuck on a
  blank screen.
- To remove the intro entirely, delete the `<div class="intro">...
  </div>` block from `index.html`.
