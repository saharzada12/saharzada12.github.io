# CS Portfolio

A single-page portfolio site. Plain HTML, CSS, and vanilla JS, no build step, free to host on GitHub Pages.

## File tree

```
cs-portfolio/
  index.html
  css/
    styles.css
  js/
    main.js
  assets/
    favicon.svg
  README.md
```

## Preview locally

No build step needed. Either open `index.html` directly in a browser, or serve it so relative paths behave exactly like they will on GitHub Pages:

```
cd cs-portfolio
python -m http.server 8000
# visit http://localhost:8000
```

## Checklist

### 1. Replace placeholders

Every personal detail is marked with `[BRACKETS]`. Find them all with:

```
grep -rn "\[" index.html
```

You need to replace:
- `[YOUR-NAME]` and `[YN]` (name + initials, in the title, meta tags, nav logo, hero, avatar, footer)
- `[YOUR-EMAIL]` (mailto link in the Contact section)
- `[YOUR-SCHOOL]` and `[GRAD-YEAR]` (hero subtext and About facts)
- The bio paragraph in `#about` (currently a bracketed instruction, write 2-3 real sentences)
- `[YOUR-GITHUB-USERNAME]` and `[YOUR-LINKEDIN-USERNAME]` (header, hero visual, footer, contact icons, meta tags)
- `[REPO-NAME]` in the canonical/OG URLs once you know your actual GitHub Pages URL

Also swap the avatar: replace the `.avatar-monogram` div in `index.html` with a real photo:
```html
<img src="assets/headshot.jpg" alt="[YOUR-NAME]" class="avatar-photo">
```

### 2. Push to a GitHub repository

```
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/[YOUR-GITHUB-USERNAME]/[REPO-NAME].git
git push -u origin main
```

### 3. Enable GitHub Pages

In the repo on GitHub: **Settings -> Pages -> Build and deployment -> Source: Deploy from a branch -> Branch: main, folder: / (root)**. Save, wait a minute, then your site is live at:

```
https://[YOUR-GITHUB-USERNAME].github.io/[REPO-NAME]/
```

If you want it at the root of your GitHub account (`https://[YOUR-GITHUB-USERNAME].github.io/`), name the repository exactly `[YOUR-GITHUB-USERNAME].github.io` instead.

### 4. Projects section

The three project cards are already real: Lead Triage, Job Hunter, and LinkedIn Auto-Poster, three n8n + Claude automation workflows, with their "Code" links pointing at [github.com/saharzada12/n8n-automations](https://github.com/saharzada12/n8n-automations) and "How it works" linking to that repo's README.

If you add a fourth project (e.g. something with a live demo instead of a workflow export), follow the same card markup in `index.html`: a "Code" link to the repo, and a second link to either a real deployed demo, a short demo video, or omit the second link entirely if there's nothing to show. Keep the grid at an exact cell count (a 1-featured + 2 or 3-regular split), since an empty trailing cell looks like a mistake, not a design choice.

## What makes a strong project card (for a CS student with limited experience)

**Pick projects that show range, not repetition.** Four frontend to-do apps say less than one full-stack app, one backend/systems project, and one data/ML project. Reviewers skim tags before they read descriptions, so variety in your tag lists matters.

**Prioritize projects you can explain in one sentence of "why it's interesting," not just what it does.** "A to-do app" says nothing. "A task scheduler that handles worker failures with retries and idempotency keys" says you understand a real problem. If you can't name the interesting technical decision in a project, either dig one up (you probably made one) or consider leaving the project out.

**Favor finished over ambitious.** A small project that works, has a README, and is easy to run beats a half-built framework. Reviewers spend seconds per repo; something they can clone and run in under a minute leaves a better impression than something broken-but-complex.

**Pin the same repos on your GitHub profile.** Recruiters click through. If your pinned repos don't match what's showcased here, it reads as inconsistent or stale.

**Write descriptions around decisions, not features.** Lead with the problem, then what you built, then (if relevant) the one tricky part. Skip filler like "built using modern best practices."

**It's fine if not everything has a live demo.** A backend service or ML model doesn't need a fake frontend bolted on just to have a "live" link. A clear README, a short demo video, or sample output is honest and often more convincing than a janky deployed wrapper.
