# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Responsive, toegankelijke Nederlandstalige portfolio-site (7 pagina's, puur HTML/CSS/JS) met het "Groei"-concept, conform DESIGN.MD.

**Architecture:** Statische site zonder build-stap. Header/footer per pagina herhaald in HTML. Eén gedeelde CSS-laag (tokens → base → components → pages → animations) en drie kleine JS-modules (nav, scroll-animaties, contactformulier). Verificatie via lokale statische server + browser-preview op desktop- en mobiel-formaat.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS (IntersectionObserver), Google Fonts (Sora + Inter), Formspree (formulier-endpoint, placeholder tot Jacob account heeft).

## Global Constraints

- Alle kleuren/spacing/typografie uit `DESIGN.MD` (repo-root); geen hardcoded waarden buiten `css/tokens.css`.
- Content: Nederlands; teksten gebaseerd op de Figma-schetsen (placeholder-kwaliteit is oké, moet wel geloofwaardig zijn).
- Afbeeldingen: lokale SVG-placeholders in `assets/images/` (geen externe placeholder-services).
- Toegankelijkheid: semantische HTML, skip-link, zichtbare focus-states, WCAG AA contrast, `prefers-reduced-motion` gerespecteerd in alle animaties.
- Contrast-regel: `#22C55E` alleen op donkere/witte vlakken groot gebruiken; teksten in groen op licht = `#166534` of `#006e2f`.
- Container max 1200px; breakpoints 640px en 1024px; mobiel = 1 kolom + hamburgermenu.
- Relatieve paden zodat de site op elke host én via `file://` subpaden werkt (paginas in `projecten/` gebruiken `../`).
- Commits: na elke afgeronde taak, berichten in het Engels, met `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

---

### Task 1: Fundament — mappen, tokens, base styles, preview-server

**Files:**
- Create: `css/tokens.css`, `css/base.css`, `.claude/launch.json`, `assets/images/.gitkeep`, `assets/icons/.gitkeep`, `js/.gitkeep` (verwijderd zodra echte files bestaan)
- Modify: `README.md`

**Interfaces:**
- Produces: CSS custom properties op `:root` — kleuren `--color-primary` (#22C55E), `--color-primary-dark` (#166534), `--color-primary-deep` (#006e2f), `--color-mint` (#DCFCE7), `--color-tint` (#F0FDF4), `--color-text` (#111827), `--color-text-muted` (#4B5563), `--color-bg` (#F9FAFB), `--color-surface` (#FFFFFF), `--color-border` (#E5E7EB), `--color-input-bg` (#F3F4F6), `--color-error` (#BA1A1A); typografie `--font-heading` (Sora), `--font-body` (Inter), maten `--text-xl` (48px/36px mobiel via media query op utility-classes), `--text-lg` (32px), `--text-md` (24px), `--body-lg` (18px), `--body-md` (16px), `--label-sm` (14px); spacing `--space-xs/sm/md/lg/xl` (4/8/16/24/40px), `--section-gap` (80px), `--container-max` (1200px); radius `--radius-sm/md/lg/xl/full` (4/8/16/24px/9999px); schaduw `--shadow-1` (0 4px 20px rgba(0,0,0,.04)), `--shadow-2` (0 10px 30px rgba(0,0,0,.08)).
- Produces: base-classes `.container` (max-width + padding), `.section` (padding-block var(--section-gap)), `.skip-link`, heading-defaults (h1–h3 in Sora met DESIGN.MD-maten), body-defaults (Inter 16px/1.6, kleur --color-text, achtergrond --color-bg), `:focus-visible`-stijl (2px solid --color-primary, offset 2px), `::selection` mint.

- [ ] **Step 1:** Maak `css/tokens.css` met exact bovenstaande custom properties, gegroepeerd met commentaarkoppen (Colors / Typography / Spacing / Radius / Shadows). Google Fonts-import hoort NIET hier (gaat via `<link>` in HTML).
- [ ] **Step 2:** Maak `css/base.css`: moderne reset (box-sizing, margins weg, img max-width 100%), body/heading-typografie, `.container`, `.section`, `.skip-link` (visueel verborgen, zichtbaar bij focus), focus-visible-stijl, `html { scroll-behavior: smooth }` binnen `@media (prefers-reduced-motion: no-preference)`.
- [ ] **Step 3:** Maak `.claude/launch.json` met een statische server-config (naam `portfolio`): probeer `npx serve` (poort 4173); als Node ontbreekt, gebruik `python -m http.server 4173`. Check eerst welke beschikbaar is met `node --version` / `python --version`.
- [ ] **Step 4:** Update `README.md`: projectnaam, korte beschrijving, mappenstructuur, hoe lokaal te bekijken.
- [ ] **Step 5:** Start de preview-server en verifieer dat `README.md`/directory listing bereikbaar is (200-response).
- [ ] **Step 6:** Commit: `feat: project foundation with design tokens and base styles`

### Task 2: Componenten — nav, footer, knoppen, cards, chips

**Files:**
- Create: `css/components.css`, `js/main.js`, `assets/icons/arrow-right.svg`, `assets/icons/menu.svg`, `assets/icons/close.svg`, `assets/icons/linkedin.svg`, `assets/icons/instagram.svg`, `assets/icons/github.svg`
- Create: `index.html` (skelet: head + header + lege main + footer — content komt in Task 3)

**Interfaces:**
- Consumes: alle tokens uit Task 1.
- Produces (HTML-patronen, exact herhaald op elke pagina):
  - Header: `<header class="site-header"><div class="container"><a class="site-logo" href="index.html">Jacob Arie</a><nav class="site-nav" aria-label="Hoofdnavigatie"><ul>…<li><a href="…" [aria-current="page"]>…</a></li>…</ul><a class="btn btn-primary nav-cta" href="contact.html">Contact</a></nav><button class="nav-toggle" aria-expanded="false" aria-controls="site-nav-list">…</button></div></header>`
  - Footer: `<footer class="site-footer"><div class="container">…logo + copyright + sociale links (LinkedIn, Instagram, GitHub als icoon+tekst)…</div></footer>`
  - Knoppen: `.btn`, `.btn-primary`, `.btn-outline`, `.btn-ghost` (met `.btn-ghost .icon` pijl die bij hover 4px naar rechts schuift)
  - `.card` (surface, radius-lg, shadow-1; hover: translateY(-4px) + shadow-2, transitie 200ms), `.chip` (pill, mint bg, #166534 tekst, label-sm)
  - JS: `initNav()` in `main.js` — hamburger toggle (aria-expanded, `.site-nav.is-open`), sluit bij Escape en bij link-klik.
- Sticky header: wit, subtiele border-bottom, blijft bovenaan (`position: sticky`).

- [ ] **Step 1:** Maak de zes SVG-iconen (24×24, `currentColor`, `aria-hidden="true"` waar decoratief).
- [ ] **Step 2:** Schrijf `css/components.css` met header/nav (incl. mobiel menu < 640px: uitklappend paneel onder de header), footer, knoppen, cards, chips, en formulier-elementen (`.field`, `.field input/textarea`, focus 2px groen, `.field-error` rood #BA1A1A met icoon-ruimte).
- [ ] **Step 3:** Schrijf `js/main.js` met `initNav()` en `document.addEventListener('DOMContentLoaded', …)`.
- [ ] **Step 4:** Maak `index.html`-skelet met volledige head (charset, viewport, title "Jacob Arie — UX Designer in opleiding", description-meta, Google Fonts preconnect + link voor Sora 600/700 en Inter 400/500/600, alle css-files in volgorde tokens→base→components→pages→animations, `defer`-scripts), skip-link, header, lege `<main id="main">`, footer.
- [ ] **Step 5:** Bekijk in preview (desktop + 375px): header en footer kloppen, hamburger werkt, focus-states zichtbaar met Tab.
- [ ] **Step 6:** Commit: `feat: shared components (nav, footer, buttons, cards, chips)`

### Task 3: Home-pagina

**Files:**
- Create: `css/pages.css`, `assets/images/portret-hero.svg`, `assets/images/portret-teaser.svg`, `assets/images/project-1-thumb.svg`, `assets/images/project-2-thumb.svg`, `assets/images/project-3-thumb.svg`
- Modify: `index.html`

**Interfaces:**
- Consumes: componenten uit Task 2.
- Produces: sectie-classes in `pages.css`: `.hero`, `.featured-work`, `.skills-strip`, `.about-teaser`, `.process`; project-card-patroon `.project-card` (article met thumb, chips, h3, tekst, ghost-link "Bekijk project →") — hergebruikt in Task 5.
- Placeholders: SVG's met mint/tint-vlakken, subtiel patroon en tekstlabel (bv. "Portretfoto — 800×800").

**Secties (structuur uit Figma-schets 3:1027, opgewaardeerd):**
1. Hero: overline-label, h1 "Hoi, ik ben **Jacob Arie** — **UX Designer** in opleiding." (accenten in `--color-primary-deep`), intro-alinea, knoppen "Bekijk mijn werk" (primary, → projecten.html) + "Meer over mij" (outline), rechts rond portret met decoratieve groene ring.
2. Geselecteerd Werk: h2 + 3 `.project-card`s (Campus-app, CO₂-platform, Zorgportaal — teksten uit schets), linkend naar de detailpagina's.
3. Skills-strip: doorlopende rij chips (UI Design, Frontend, Toegankelijkheid, Figma, UX Research, Prototyping, User Testing, Design Thinking) — CSS-marquee, gepauzeerd bij hover/focus en statisch bij reduced-motion.
4. About-teaser: tint-achtergrond (#F0FDF4), rond portret links, h2 "Gedreven door nieuwsgierigheid", tekst uit schets, ghost-link "Lees mijn hele verhaal →".
5. Mijn Proces: overline "WERKWIJZE", h2, 3 stappen (Ontdekken & Onderzoek / Ontwerp & Prototyping / Testen & Itereren) met genummerde cirkels verbonden door een lijn (de groeilijn-basis; animatie komt in Task 4). Mobiel: verticaal.

- [ ] **Step 1:** Maak de 5 placeholder-SVG's.
- [ ] **Step 2:** Bouw de secties in `index.html` + stijl in `pages.css` (desktop-first schrijven, meteen media queries voor 640/1024 erbij).
- [ ] **Step 3:** Preview desktop (1280) + mobiel (375): alle secties netjes, geen horizontale scroll, chips-strip pauzeert bij hover.
- [ ] **Step 4:** Commit: `feat: home page with hero, featured work, skills strip and process`

### Task 4: "Groei"-animatielaag

**Files:**
- Create: `css/animations.css`, `js/scroll-animations.js`
- Modify: `index.html` (data-attributen + script-tag)

**Interfaces:**
- Produces: `data-reveal` (fade + translateY(24px) → in-view via `.is-visible`), `data-reveal-stagger` op containers (kinderen krijgen oplopende transition-delay), `.growth-line` (verticale lijn, `scaleY` 0→1 gekoppeld aan scroll-voortgang van z'n sectie), procescirkels vullen zich groen zodra in beeld.
- JS: `initReveals()` (IntersectionObserver, threshold 0.15, once), `initGrowthLine()` (rAF-throttled scroll-handler). Beide no-ops bij `matchMedia('(prefers-reduced-motion: reduce)')` — content dan direct zichtbaar.

- [ ] **Step 1:** Schrijf `animations.css` (reveal-states, growth-line, proces-stap-vulling; álle animatie-CSS binnen `@media (prefers-reduced-motion: no-preference)`).
- [ ] **Step 2:** Schrijf `scroll-animations.js`.
- [ ] **Step 3:** Voeg data-attributen toe aan Home-secties; groeilijn langs hero→werk→proces.
- [ ] **Step 4:** Preview: scroll door Home, reveals gestaffeld, lijn groeit mee; check met DevTools-emulatie van reduced-motion dat alles direct zichtbaar is.
- [ ] **Step 5:** Commit: `feat: growth-concept scroll animations with reduced-motion support`

### Task 5: Projectenoverzicht

**Files:**
- Create: `projecten.html`
- Modify: `css/pages.css`

**Interfaces:**
- Consumes: `.project-card` uit Task 3.
- Produces: `.projects-grid` (2 kolommen ≥1024px, 1 kolom mobiel).

- [ ] **Step 1:** Bouw `projecten.html`: page-header (h1 "Mijn Projecten" + intro uit schets 3:758), grid met de 3 kaarten (zelfde data als Home), afsluitende regel "Er zullen nog meer projecten in de toekomst toegevoegd worden." Nav: `aria-current="page"` op Projecten.
- [ ] **Step 2:** Preview desktop + mobiel.
- [ ] **Step 3:** Commit: `feat: projects overview page`

### Task 6: Drie projectdetailpagina's

**Files:**
- Create: `projecten/campus-app.html`, `projecten/co2-platform.html`, `projecten/zorgportaal.html`
- Create: `assets/images/projecten/campus/` (hero + 3 sectie-SVG's), idem `co2/` en `zorg/`
- Modify: `css/pages.css`, `projecten.html` + `index.html` (kaartlinks naar juiste bestanden)

**Interfaces:**
- Consumes: alle componenten; paden met `../` (css, js, assets, nav-links).
- Produces: case-study-patroon: `.case-header` (terug-link, h1, intro, meta-chips: duur, rol, tools), `.case-section` (afwisselend tekst/beeld), `.case-approach` (3 kaartjes: Interviews / Persona's / Journey Mapping), `.case-choices` (genummerde keuzes met groene bullets), `.case-result` (grote beeldsectie op tint-achtergrond), `.case-learnings` (2 leerpunten met iconen), `.case-nav` (vorige/volgende project, footer-navigatie tussen cases).

**Content per project (structuur uit schets 3:1386, teksten geloofwaardig placeholder):**
1. **Campus Navigatie App** — mobiele app waarmee studenten en bezoekers feilloos de campus navigeren (tags: UX Research, UI Design; 4 weken, UX/UI Designer, Figma + Miro).
2. **CO₂-Reisplatform** — webplatform dat de CO₂-voetafdruk van vakanties berekent en alternatieven aanbeveelt (tags: Webdesign, Sustainability).
3. **Zorgportaal** — herontwerp van het online portaal voor zorgvoorzieningen o.b.v. onderzoek onder ouderen (tags: Onderzoek, Service Design).

- [ ] **Step 1:** Bouw `campus-app.html` volledig als referentie-implementatie + case-CSS in `pages.css`.
- [ ] **Step 2:** Preview desktop + mobiel; check terug-link en case-nav.
- [ ] **Step 3:** Bouw de andere twee pagina's met dezelfde structuur, eigen content; case-nav circulair koppelen (campus ↔ co2 ↔ zorg).
- [ ] **Step 4:** Update kaartlinks op Home en Projecten; klik alle links door in preview.
- [ ] **Step 5:** Commit: `feat: three project case study pages`

### Task 7: Over mij-pagina

**Files:**
- Create: `over-mij.html`, `assets/images/portret-overmij.svg`
- Modify: `css/pages.css`

**Interfaces:**
- Produces: `.bio-card` (foto links, tekst rechts; mobiel gestapeld), `.skills-grid` (3 cards: Tools / Methodes / Soft skills met chips uit schets 3:1239), `.study-timeline` (4 jaren; jaar 1–2 "Afgerond", jaar 3 "Bezig" met groene rand, jaar 4 "Afstuderen" outline; verbonden door groeilijn die vult t/m jaar 3).

- [ ] **Step 1:** Bouw `over-mij.html` met bio (tekst uit schets), vaardigheden en tijdlijn; reveals + groeilijn-animatie op de tijdlijn.
- [ ] **Step 2:** Preview desktop + mobiel.
- [ ] **Step 3:** Commit: `feat: about page with skills and study timeline`

### Task 8: Contact-pagina + formulier

**Files:**
- Create: `contact.html`, `js/contact-form.js`
- Modify: `css/pages.css`

**Interfaces:**
- Produces: formulier `#contact-form` met velden `naam` (required), `email` (required, type=email), `onderwerp`, `bericht` (required, textarea); Formspree-action `https://formspree.io/f/JOUW_FORM_ID` met duidelijk HTML-commentaar dat Jacob dit ID moet vervangen; sociale kaarten (LinkedIn, Instagram, GitHub) met `href="#"` + commentaar voor echte URL's.
- JS `contact-form.js`: submit via `fetch` naar Formspree; client-side validatie vóór verzenden (verplichte velden, e-mailformaat) met foutmelding per veld (`aria-describedby`, rood #BA1A1A); status-element met `aria-live="polite"` voor "Versturen…", succes ("Bedankt! Je bericht is verzonden.") en fout ("Er ging iets mis — probeer het later opnieuw of mail direct."); submit-knop disabled tijdens verzenden.

- [ ] **Step 1:** Bouw `contact.html` (formulier-card links, "Vind mij op"-kaarten rechts; mobiel gestapeld).
- [ ] **Step 2:** Schrijf `contact-form.js`.
- [ ] **Step 3:** Preview: lege submit toont veldfouten (geen browser-default maar eigen meldingen via `novalidate`), geldig formulier toont "Versturen…" gevolgd door foutmelding (endpoint is placeholder — verwacht gedrag, noteer in README).
- [ ] **Step 4:** Commit: `feat: contact page with validated Formspree form`

### Task 9: Site-brede review en polish

**Files:**
- Modify: alles waar nodig; Create: `assets/images/AANLEVEREN.md`

**Steps:**
- [ ] **Step 1:** Bekijk álle 7 pagina's in preview op 1280px én 375px; screenshot elk; fix layout-issues (overflow, spacing, te kleine tap-targets < 44px).
- [ ] **Step 2:** Toetsenbord-test: Tab door elke pagina — skip-link, logische volgorde, zichtbare focus, hamburger bedienbaar, Escape sluit menu.
- [ ] **Step 3:** Check contrast van alle tekst/achtergrond-combinaties (met name groen op mint/tint) tegen WCAG AA; fix afwijkingen.
- [ ] **Step 4:** Console-check in preview: geen JS-errors op enige pagina.
- [ ] **Step 5:** Schrijf `assets/images/AANLEVEREN.md`: lijst van te vervangen placeholders met bestandsnaam, plek en aanbevolen afmetingen.
- [ ] **Step 6:** Werk `README.md` bij: Formspree-stap, socials-URL's invullen, afbeeldingen vervangen.
- [ ] **Step 7:** Commit: `polish: site-wide responsive, accessibility and content fixes`

### Task 10: Push naar GitHub

- [ ] **Step 1:** `git log --oneline` — controleer nette commit-reeks.
- [ ] **Step 2:** `git push origin main`.
- [ ] **Step 3:** Verifieer op GitHub dat alles er staat; meld Jacob wat er nog van hem nodig is (Formspree-ID, social-URL's, foto's, definitieve teksten, hosting-keuze).
