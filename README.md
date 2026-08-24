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
