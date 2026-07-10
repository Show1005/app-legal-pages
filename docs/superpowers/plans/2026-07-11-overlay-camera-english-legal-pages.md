# Overlay Camera English Legal Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add English Privacy Policy and Support pages for the Overlay Camera iOS app under `overlay-camera/en/`, matching the existing Japanese pages' design and content, with working language-switch links in both directions, without touching the Overlay Camera app repository or any other app's pages.

**Architecture:** Three new static HTML files under `overlay-camera/en/` (`index.html`, `privacy-policy.html`, `support.html`), each a direct English translation of its Japanese counterpart in `overlay-camera/`, reusing the exact same inline `<style>` block (same CSS custom properties, same class names) so the pages are visually identical apart from language. The three existing Japanese pages in `overlay-camera/` each gain one small added link to their English counterpart. No JavaScript, no build step, no new dependencies — this is a static GitHub Pages site (see `.github/workflows/static.yml`, which just uploads the whole repo as-is).

**Tech Stack:** Plain HTML + inline CSS. No frameworks, no bundler. Verified with a local static file server (`python3 -m http.server`) and `curl`, not a browser.

## Global Constraints

- Source: GitHub issue #29 (Show1005/app-legal-pages), following on from PR #28 (which added the Japanese `overlay-camera/` pages) and R03/PR #18 in the Overlay Camera app repo (which added English UI to the app itself).
- Target URLs once published: `https://show1005.github.io/app-legal-pages/overlay-camera/en/privacy-policy.html`, `.../overlay-camera/en/support.html`, `.../overlay-camera/en/`.
- Static HTML only. No server, no required JavaScript, no external API calls, no tracking, no ads.
- Do not modify the Overlay Camera app repository (`overlay-camera-ios`) — this task is `app-legal-pages` only.
- Do not break the existing Japanese pages (`overlay-camera/index.html`, `overlay-camera/privacy-policy.html`, `overlay-camera/support.html`) — Japanese content stays intact; only a small added link per page.
- Match the existing site's design/structure: reuse `overlay-camera/`'s own CSS variables and layout classes verbatim (do not invent a new visual style, do not import shopping-profile's different CSS — shopping-profile's `-en.html` suffix convention and CSS are a different, unrelated app's style).
- Language-switch link convention (established by `shopping-profile/privacy-policy.html` / `privacy-policy-en.html`): a small link near the top of the page reading "English" on Japanese pages, and "Japanese" on English pages.
- No dynamic language switching (no JS-based locale detection) — plain links only.
- No site-wide redesign. Do not add an English link to the root `index.html` card — the issue marks this optional ("してもよい"), and the existing precedent (`shopping-profile`, which already has `-en` pages) does not link its English pages from the root `index.html` either. Skipping it keeps the change minimal and consistent with that precedent.
- Do not claim browser/device visual verification was performed — verification in this plan is limited to a local static file server + `curl`/`grep`, which does not confirm rendered visual appearance.
- PR description must include: Summary, Changed Files, Verification, Out of Scope, Remaining Issues.

---

## File Structure

- `overlay-camera/en/index.html` — new. English overview/landing page, mirrors `overlay-camera/index.html`.
- `overlay-camera/en/privacy-policy.html` — new. English Privacy Policy, mirrors `overlay-camera/privacy-policy.html`.
- `overlay-camera/en/support.html` — new. English Support page, mirrors `overlay-camera/support.html`.
- `overlay-camera/index.html` — modify. Add one link to `en/index.html`.
- `overlay-camera/privacy-policy.html` — modify. Add one link to `en/privacy-policy.html`.
- `overlay-camera/support.html` — modify. Add one link to `en/support.html`.

Relative path reference (the `en/` pages are one directory deeper than their Japanese counterparts):

| From | To Japanese counterpart | To English sibling | To app icon | To root list |
|---|---|---|---|---|
| `overlay-camera/en/*.html` | `../<file>.html` | `<file>.html` (same dir) | `../../assets/icons/overlay-camera.png` | `../../index.html` |
| `overlay-camera/*.html` | — | `en/<file>.html` | `../assets/icons/overlay-camera.png` (unchanged) | `../index.html` (unchanged) |

---

### Task 1: Create the three English pages under `overlay-camera/en/`

**Files:**
- Create: `overlay-camera/en/index.html`
- Create: `overlay-camera/en/privacy-policy.html`
- Create: `overlay-camera/en/support.html`

**Interfaces:**
- Produces: three files at `overlay-camera/en/{index,privacy-policy,support}.html`. Task 2 links to these exact paths from the existing Japanese pages — file names and relative structure must match exactly.
- Consumes: nothing from other tasks. Task 1 can be implemented standalone; it links back to the (unmodified in this task) Japanese pages at `../index.html`, `../privacy-policy.html`, `../support.html`, which already exist on `main`.

- [ ] **Step 1: Create `overlay-camera/en/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Overlay Camera</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f3f6ff;
        --panel: #ffffff;
        --text: #24303b;
        --muted: #5b6875;
        --accent: #2563eb;
        --accent-soft: #dbeafe;
        --border: #d8e1e8;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: linear-gradient(180deg, #fbfcff 0%, var(--bg) 100%);
        color: var(--text);
        line-height: 1.8;
      }

      main {
        max-width: 680px;
        margin: 0 auto;
        padding: 40px 20px 56px;
      }

      .page {
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: 22px;
        box-shadow: 0 14px 36px rgba(36, 48, 59, 0.08);
        padding: 30px 24px;
        text-align: center;
      }

      .lang-switch {
        text-align: right;
        margin: 0 0 10px;
        color: var(--muted);
        font-size: 0.9rem;
      }

      .app-icon {
        width: 96px;
        height: 96px;
        border-radius: 22px;
        box-shadow: 0 8px 24px rgba(36, 48, 59, 0.14);
        margin-bottom: 18px;
      }

      h1 {
        margin: 0 0 12px;
        font-size: clamp(1.9rem, 5vw, 2.6rem);
        line-height: 1.35;
      }

      p.lead {
        color: var(--muted);
        margin: 0 auto 24px;
        max-width: 480px;
      }

      ol {
        text-align: left;
        margin: 0 auto 28px;
        padding-left: 22px;
        max-width: 480px;
      }

      li + li {
        margin-top: 8px;
      }

      .links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
      }

      .chip {
        display: inline-flex;
        align-items: center;
        padding: 9px 18px;
        border-radius: 999px;
        font-size: 0.9rem;
        font-weight: 600;
        text-decoration: none;
        white-space: nowrap;
      }

      .chip-primary {
        background: var(--accent);
        color: #fff;
      }

      .chip-secondary {
        background: var(--accent-soft);
        color: var(--accent);
        border: 1px solid rgba(37, 99, 235, 0.18);
      }

      .backlink {
        display: block;
        margin-top: 28px;
        color: var(--muted);
      }

      a {
        color: var(--accent);
      }
    </style>
  </head>
  <body>
    <main>
      <article class="page">
        <p class="lang-switch"><a href="../index.html">Japanese</a></p>
        <img class="app-icon" src="../../assets/icons/overlay-camera.png" alt="Overlay Camera icon" width="96" height="96">
        <h1>Overlay Camera</h1>
        <p class="lead">
          Overlay Camera is an iOS app that shows a photo you choose as a translucent guide on the camera screen, so you can align your composition and take a new photo in the same framing.
        </p>

        <ol>
          <li>Choose a guide/reference photo</li>
          <li>Show it as a translucent guide on the camera screen</li>
          <li>Take a new photo while aligning the composition</li>
          <li>Compare the guide photo and captured photo with the comparison slider</li>
        </ol>

        <div class="links">
          <a class="chip chip-primary" href="support.html">Support</a>
          <a class="chip chip-secondary" href="privacy-policy.html">Privacy Policy</a>
        </div>

        <p class="backlink"><a href="../../index.html">Back to app list</a></p>
      </article>
    </main>
  </body>
</html>
```

- [ ] **Step 2: Create `overlay-camera/en/privacy-policy.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Overlay Camera | Privacy Policy</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f3f6ff;
        --panel: #ffffff;
        --text: #24303b;
        --muted: #5b6875;
        --accent: #2563eb;
        --border: #d8e1e8;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: linear-gradient(180deg, #fbfcff 0%, var(--bg) 100%);
        color: var(--text);
        line-height: 1.8;
      }

      main {
        max-width: 860px;
        margin: 0 auto;
        padding: 32px 20px 56px;
      }

      .page {
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: 22px;
        box-shadow: 0 14px 36px rgba(36, 48, 59, 0.08);
        padding: 30px 24px;
      }

      .lang-switch {
        text-align: right;
        margin: 0 0 10px;
        color: var(--muted);
        font-size: 0.9rem;
      }

      .eyebrow {
        display: inline-block;
        margin-bottom: 14px;
        padding: 6px 10px;
        border-radius: 999px;
        background: #dbeafe;
        color: var(--accent);
        font-weight: 700;
        font-size: 0.9rem;
      }

      h1,
      h2 {
        line-height: 1.35;
      }

      h1 {
        margin: 0 0 10px;
        font-size: clamp(1.9rem, 5vw, 2.8rem);
      }

      h2 {
        margin: 32px 0 10px;
        font-size: 1.25rem;
      }

      p,
      li {
        color: var(--text);
      }

      .lead,
      .meta,
      .backlink {
        color: var(--muted);
      }

      ul {
        margin: 10px 0 0;
        padding-left: 20px;
      }

      li + li,
      p + p {
        margin-top: 10px;
      }

      a {
        color: var(--accent);
      }
    </style>
  </head>
  <body>
    <main>
      <article class="page">
        <p class="lang-switch"><a href="../privacy-policy.html">Japanese</a></p>
        <div class="eyebrow">Privacy Policy</div>
        <h1>Overlay Camera Privacy Policy</h1>
        <p class="meta">Effective date: July 10, 2026</p>
        <p class="lead">
          This Privacy Policy explains how the iOS app "Overlay Camera" handles user information.
        </p>

        <h2>1. Camera Access</h2>
        <p>This app accesses the camera to take photos.</p>
        <p>Photos taken with the camera are not used for any purpose other than taking the photo.</p>

        <h2>2. Photo Library Access</h2>
        <p>This app accesses your photo library so you can choose a guide/reference photo to align your composition with.</p>
        <p>The selected guide/reference photo is used only to display it as a translucent guide on the camera screen.</p>

        <h2>3. Data Stored on This Device</h2>
        <p>This app does not collect personal information.</p>
        <p>The selected guide/reference photo and the captured photo are stored only inside this app's own container on your device.</p>
        <p>The guide/reference photo is not composited into the captured photo. They are stored as separate data.</p>

        <h2>4. Data Transmission</h2>
        <p>Data saved in this app is not sent to the developer's server.</p>
        <p>This app has no backend server and does not communicate with any external API.</p>
        <p>Your data is managed only on your own device.</p>

        <h2>5. Accounts and Third-Party Services</h2>
        <p>This app does not use any of the following:</p>
        <ul>
          <li>Account creation or login</li>
          <li>Advertising SDKs</li>
          <li>Paid features or in-app purchases (in this first release)</li>
          <li>Analytics SDKs</li>
          <li>Third-party tracking tools</li>
          <li>Cloud sync</li>
        </ul>

        <h2>6. Data Deletion</h2>
        <p>When you delete a session (a guide/reference photo and captured photo pair) inside the app, the related images and metadata are deleted from your device.</p>
        <p>If you delete the app itself, all data stored on your device is also deleted.</p>

        <h2>7. Contact</h2>
        <p>If you have any questions about this app, please use the form below.</p>
        <p><a href="https://docs.google.com/forms/d/e/1FAIpQLSdN1mS5y-9_8NZxLXNguQIPyZ5Dk2-fAgHY6IveXnw5l_YAGg/viewform?usp=pp_url&entry.1400069445=Overlay%20Camera">Contact form</a></p>

        <h2>8. Changes</h2>
        <p>This Privacy Policy may be revised as needed.</p>
        <p>Any revision takes effect from the time it is posted on this page.</p>

        <p class="backlink"><a href="../../index.html">Back to app list</a></p>
      </article>
    </main>
  </body>
</html>
```

- [ ] **Step 3: Create `overlay-camera/en/support.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Overlay Camera | Support</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f3f6ff;
        --panel: #ffffff;
        --text: #23303b;
        --muted: #5d6975;
        --accent: #2563eb;
        --border: #d7e0e8;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: linear-gradient(180deg, #fbfcff 0%, var(--bg) 100%);
        color: var(--text);
        line-height: 1.8;
      }

      main {
        max-width: 860px;
        margin: 0 auto;
        padding: 32px 20px 56px;
      }

      .page {
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: 22px;
        box-shadow: 0 14px 36px rgba(35, 48, 59, 0.08);
        padding: 30px 24px;
      }

      .lang-switch {
        text-align: right;
        margin: 0 0 10px;
        color: var(--muted);
        font-size: 0.9rem;
      }

      .eyebrow {
        display: inline-block;
        margin-bottom: 14px;
        padding: 6px 10px;
        border-radius: 999px;
        background: #dbeafe;
        color: var(--accent);
        font-weight: 700;
        font-size: 0.9rem;
      }

      h1,
      h2 {
        line-height: 1.35;
      }

      h1 {
        margin: 0 0 10px;
        font-size: clamp(1.9rem, 5vw, 2.8rem);
      }

      h2 {
        margin: 30px 0 10px;
        font-size: 1.25rem;
      }

      p,
      li {
        color: var(--text);
      }

      .lead,
      .backlink {
        color: var(--muted);
      }

      ul,
      ol {
        margin: 10px 0 0;
        padding-left: 22px;
      }

      li + li,
      p + p {
        margin-top: 10px;
      }

      a {
        color: var(--accent);
      }
    </style>
  </head>
  <body>
    <main>
      <article class="page">
        <p class="lang-switch"><a href="../support.html">Japanese</a></p>
        <div class="eyebrow">Support</div>
        <h1>Overlay Camera Support</h1>
        <p class="lead">
          "Overlay Camera" is a camera app that shows a guide/reference photo as a translucent overlay so you can align your composition and take a new photo in the same framing.
        </p>

        <h2>Basic Usage</h2>
        <ol>
          <li>Choose a guide/reference photo.</li>
          <li>It appears as a translucent guide on the camera screen.</li>
          <li>Take a new photo while aligning your composition with the guide.</li>
          <li>Compare the guide photo and the captured photo with the comparison slider.</li>
        </ol>

        <h2>FAQ</h2>
        <ol>
          <li>
            Is the guide/reference photo included in the saved captured photo?
            <p>No. The guide/reference photo is not composited into the captured photo — they are stored as separate data.</p>
          </li>
          <li>
            Are photos saved to the Photos app?
            <p>No. In this first release, photos are stored only inside the app, not in your device's Photos app.</p>
          </li>
          <li>
            Is data sent outside the device?
            <p>No. This app has no backend server or external API, and all data is stored on your device.</p>
          </li>
          <li>
            What happens when I delete a session?
            <p>The guide/reference photo, captured photo, and their metadata for that session are deleted from your device.</p>
          </li>
          <li>
            Do I need to create an account?
            <p>No. This app can be used without creating an account or signing in.</p>
          </li>
          <li>
            Are there ads or paid features?
            <p>No. This first release has no advertising and no paid features.</p>
          </li>
        </ol>

        <h2>Contact</h2>
        <p>For questions, bug reports, or feature requests about this app, please use the form below.</p>
        <p><a href="https://docs.google.com/forms/d/e/1FAIpQLSdN1mS5y-9_8NZxLXNguQIPyZ5Dk2-fAgHY6IveXnw5l_YAGg/viewform?usp=pp_url&entry.1400069445=Overlay%20Camera">Contact form</a></p>

        <p class="backlink"><a href="../../index.html">Back to app list</a></p>
      </article>
    </main>
  </body>
</html>
```

- [ ] **Step 4: Verify the three new files exist and are well-formed**

Run:
```bash
ls overlay-camera/en/
python3 -c "
import html.parser, sys
for f in ['overlay-camera/en/index.html', 'overlay-camera/en/privacy-policy.html', 'overlay-camera/en/support.html']:
    with open(f) as fh:
        html.parser.HTMLParser().feed(fh.read())
    print(f, 'parsed OK')
"
```
Expected: `index.html`, `privacy-policy.html`, `support.html` listed; all three print `parsed OK` with no parser exceptions.

- [ ] **Step 5: Commit**

```bash
git add overlay-camera/en
git commit -m "feat: add English privacy policy and support pages for Overlay Camera"
```

---

### Task 2: Add English-language links to the existing Japanese pages

**Files:**
- Modify: `overlay-camera/index.html`
- Modify: `overlay-camera/privacy-policy.html`
- Modify: `overlay-camera/support.html`

**Interfaces:**
- Consumes: the three files created in Task 1 at `overlay-camera/en/{index,privacy-policy,support}.html` — the links added here point at those exact paths.

- [ ] **Step 1: Add the `.lang-switch` style and link to `overlay-camera/index.html`**

Change:
```html
      .app-icon {
        width: 96px;
        height: 96px;
        border-radius: 22px;
        box-shadow: 0 8px 24px rgba(36, 48, 59, 0.14);
        margin-bottom: 18px;
      }
```
to:
```html
      .lang-switch {
        text-align: right;
        margin: 0 0 10px;
        color: var(--muted);
        font-size: 0.9rem;
      }

      .app-icon {
        width: 96px;
        height: 96px;
        border-radius: 22px;
        box-shadow: 0 8px 24px rgba(36, 48, 59, 0.14);
        margin-bottom: 18px;
      }
```

Change:
```html
      <article class="page">
        <img class="app-icon" src="../assets/icons/overlay-camera.png" alt="Overlay Camera アイコン" width="96" height="96">
```
to:
```html
      <article class="page">
        <p class="lang-switch"><a href="en/index.html">English</a></p>
        <img class="app-icon" src="../assets/icons/overlay-camera.png" alt="Overlay Camera アイコン" width="96" height="96">
```

- [ ] **Step 2: Add the `.lang-switch` style and link to `overlay-camera/privacy-policy.html`**

Change:
```html
      .eyebrow {
        display: inline-block;
        margin-bottom: 14px;
        padding: 6px 10px;
        border-radius: 999px;
        background: #dbeafe;
        color: var(--accent);
        font-weight: 700;
        font-size: 0.9rem;
      }
```
to:
```html
      .lang-switch {
        text-align: right;
        margin: 0 0 10px;
        color: var(--muted);
        font-size: 0.9rem;
      }

      .eyebrow {
        display: inline-block;
        margin-bottom: 14px;
        padding: 6px 10px;
        border-radius: 999px;
        background: #dbeafe;
        color: var(--accent);
        font-weight: 700;
        font-size: 0.9rem;
      }
```

Change:
```html
      <article class="page">
        <div class="eyebrow">Privacy Policy</div>
```
to:
```html
      <article class="page">
        <p class="lang-switch"><a href="en/privacy-policy.html">English</a></p>
        <div class="eyebrow">Privacy Policy</div>
```

- [ ] **Step 3: Add the `.lang-switch` style and link to `overlay-camera/support.html`**

Change:
```html
      .eyebrow {
        display: inline-block;
        margin-bottom: 14px;
        padding: 6px 10px;
        border-radius: 999px;
        background: #dbeafe;
        color: var(--accent);
        font-weight: 700;
        font-size: 0.9rem;
      }
```
to:
```html
      .lang-switch {
        text-align: right;
        margin: 0 0 10px;
        color: var(--muted);
        font-size: 0.9rem;
      }

      .eyebrow {
        display: inline-block;
        margin-bottom: 14px;
        padding: 6px 10px;
        border-radius: 999px;
        background: #dbeafe;
        color: var(--accent);
        font-weight: 700;
        font-size: 0.9rem;
      }
```

Change:
```html
      <article class="page">
        <div class="eyebrow">Support</div>
```
to:
```html
      <article class="page">
        <p class="lang-switch"><a href="en/support.html">English</a></p>
        <div class="eyebrow">Support</div>
```

- [ ] **Step 4: Verify the three modified files are well-formed and Japanese content is unchanged apart from the new link**

Run:
```bash
git diff --stat overlay-camera/index.html overlay-camera/privacy-policy.html overlay-camera/support.html
python3 -c "
import html.parser
for f in ['overlay-camera/index.html', 'overlay-camera/privacy-policy.html', 'overlay-camera/support.html']:
    with open(f) as fh:
        html.parser.HTMLParser().feed(fh.read())
    print(f, 'parsed OK')
"
```
Expected: diff shows only the added `.lang-switch` CSS block (7 lines) and one added `<p class="lang-switch">` line per file — no other lines changed or removed. All three print `parsed OK`.

- [ ] **Step 5: Commit**

```bash
git add overlay-camera/index.html overlay-camera/privacy-policy.html overlay-camera/support.html
git commit -m "feat: add English language-switch links to Overlay Camera Japanese pages"
```

---

### Task 3: Final verification and PR

**Files:** none (verification only).

- [ ] **Step 1: Serve the repo locally and confirm every new/changed link resolves**

Run (from the repo root):
```bash
python3 -m http.server 8123 >/tmp/als-server.log 2>&1 &
SERVER_PID=$!
sleep 1
for path in \
  overlay-camera/en/index.html \
  overlay-camera/en/privacy-policy.html \
  overlay-camera/en/support.html \
  overlay-camera/index.html \
  overlay-camera/privacy-policy.html \
  overlay-camera/support.html \
  assets/icons/overlay-camera.png \
  index.html; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:8123/$path")
  echo "$code $path"
done
kill $SERVER_PID
```
Expected: every line reads `200 <path>` (no 404s). This confirms all the relative links Task 1 and Task 2 added point at files that actually exist and are served — it does not confirm visual rendering.

- [ ] **Step 2: Confirm no leftover placeholder text or broken relative paths**

Run:
```bash
grep -rn "TODO\|TBD\|lorem ipsum" overlay-camera/en/
grep -c "en/index.html\|en/privacy-policy.html\|en/support.html" overlay-camera/index.html overlay-camera/privacy-policy.html overlay-camera/support.html
```
Expected: first command returns no matches. Second command prints `1` for the corresponding file that references its English counterpart (e.g. `overlay-camera/index.html:1`).

- [ ] **Step 3: Open a PR**

Push the branch and open a PR against `main` with a body containing Summary, Changed Files, Verification, Out of Scope, and Remaining Issues sections, per Global Constraints.
