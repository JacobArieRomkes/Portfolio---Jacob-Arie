# Portfolio Website — Design Spec

**Datum:** 2026-07-03
**Voor:** Jacob Arie Romkes, student UX Design (Hogeschool Windesheim, Zwolle)
**Status:** Goedgekeurd door Jacob

## Doel

Persoonlijke portfolio-website die Jacobs UX-designwerk toont aan recruiters en
stagebedrijven. Moet er "gaaf en uniek" uitzien, responsive zijn (desktop én
mobiel), en toegankelijk (Nielsen-heuristieken als leidraad). De Figma-schetsen
(bestand "Portfolio", pagina "Definitief") zijn de structuur-referentie; sizing
en polish worden opnieuw opgebouwd vanuit DESIGN.MD.

## Besluiten (met Jacob afgestemd)

| Onderwerp | Besluit |
|---|---|
| Tech stack | Puur HTML/CSS/JS, geen build-stap |
| Hosting | Nog niet gekozen; site moet overal werken (statisch, relatieve paden) |
| Contactformulier | Formspree (Jacob maakt zelf account aan; endpoint later invullen) |
| Taal | Alleen Nederlands |
| Thema | Alleen licht thema |
| Projecten | 3 volledig uitgewerkt, elk met eigen detailpagina |
| Socials | LinkedIn, Instagram, GitHub |
| Afbeeldingen | Nette placeholders; lijst van aan te leveren beelden met afmetingen |
| Design-vrijheid | Structuur van schetsen houden, flink opwaarderen |
| Creatief concept | "Groei" (zie hieronder) |
| Header/footer | Per pagina herhaald in HTML (geen JS-injectie) |

## Creatief concept: "Groei"

De groene identiteit als verhaal: groei = student in ontwikkeling.

- **Groeilijn**: dunne verticale groene lijn die meegroeit met scrollen;
  prominent op Home (hero → werk → proces) en bij proces-/tijdlijnsecties.
- **Scroll-reveals**: secties faden + stijgen in (IntersectionObserver),
  gestaffeld bij grids en tags.
- **Micro-interacties**: kaarten liften bij hover (schaduw Level 1 → 2),
  zachte knop-transities, meeschuivende pijl-iconen, groene indicator op
  actief nav-item.
- **Studievoortgang**: tijdlijn gevuld t/m jaar 3 (bezig), jaar 4 outline.
- Alles respecteert `prefers-reduced-motion`.

## Structuur

```
Portfolio/
├── index.html              Home
├── projecten.html          Projectoverzicht
├── over-mij.html
├── contact.html
├── projecten/
│   ├── project-1.html
│   ├── project-2.html
│   └── project-3.html
├── css/
│   ├── tokens.css          DESIGN.MD-waarden als CSS-variabelen
│   ├── base.css            reset, typografie, algemene elementen
│   ├── components.css      knoppen, cards, chips, formulier, nav, footer
│   ├── pages.css           pagina-specifieke secties
│   └── animations.css      scroll-reveals, groeilijn, micro-interacties
├── js/
│   ├── main.js             nav, algemene interacties
│   ├── scroll-animations.js reveals, groeilijn, tellers
│   └── contact-form.js     Formspree + validatie + feedback
├── assets/
│   ├── images/             per project een submapje
│   └── icons/              SVG-iconen
├── DESIGN.MD
└── README.md
```

## Pagina's

- **Home**: hero (naam deels groen), 3 uitgelichte projecten, doorlopende
  skill-tag-strip, persoonlijke teaser, "Mijn Proces" (3 verbonden stappen),
  footer.
- **Projecten**: grid met 3 kaarten (2 kolommen desktop, 1 mobiel), onderaan
  "er komen meer projecten"-tekst.
- **Projectdetail ×3** (Foodie App-structuur): opdracht → aanpak → keuzes &
  wireframes → eindresultaat → leerpunten. Plus vorige/volgende-navigatie
  onderaan en "terug naar projecten" bovenaan.
- **Over mij**: bio-kaart met foto, vaardigheden (3 kaarten: Tools, Methodes,
  Soft skills), studievoortgang-tijdlijn (4 jaren).
- **Contact**: formulier (naam, e-mail, onderwerp, bericht; live validatie,
  succes-/foutmeldingen) + social-kaarten.

Placeholder-content gebaseerd op de teksten in de Figma-schetsen (die zijn
zelf ook grotendeels placeholder).

## Design-richtlijnen

Alle waarden uit DESIGN.MD (root van repo): emerald green primary (#22C55E,
donkergroen #006e2f voor tekst-op-licht waar contrast nodig is), Sora voor
koppen, Inter voor body (via Google Fonts), 4px spacing-grid, 1200px container,
sectie-afstand 80px, card-padding 24px, radius 8/16/24px, pill-chips
(#DCFCE7 achtergrond, #166534 tekst), schaduwen Level 1
(0 4px 20px rgba(0,0,0,.04)) en Level 2 (0 10px 30px rgba(0,0,0,.08)).

## Responsive & toegankelijkheid

- Breakpoints: <640px (1 kolom, hamburgermenu), 640–1024px, >1024px
  (1200px container).
- Semantische HTML, skip-link, zichtbare focus-states, contrast ≥ WCAG AA,
  alt-teksten, gekoppelde formulierlabels, aria-live voor formulierfeedback.
- Nielsen: consistente navigatie, zichtbare systeemstatus (formulier, actieve
  pagina), herkenbare patronen, foutpreventie.

## Verificatie

Lokaal draaien; elke pagina bekijken op desktop- en mobiel-formaat
(screenshots + inspectie); formulier, animaties en toetsenbordnavigatie
testen; daarna pas committen en pushen naar GitHub
(JacobArieRomkes/Portfolio---Jacob-Arie, branch main).

## Bewust buiten scope

Dark mode, Engels, CMS/build-tooling, echte foto's en definitieve teksten,
hosting-configuratie, analytics.
