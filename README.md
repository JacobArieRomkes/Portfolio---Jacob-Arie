# Portfolio — Jacob Arie

Persoonlijke portfolio-website van Jacob Arie Romkes, student UX Design aan
Hogeschool Windesheim (Zwolle). Puur HTML/CSS/JS, geen build-stap.

## Structuur

```
├── index.html              Home
├── projecten.html          Projectoverzicht
├── over-mij.html           Over mij
├── contact.html            Contact
├── projecten/              Projectdetailpagina's
├── css/                    tokens → base → components → pages → animations
├── js/                     nav, scroll-animaties, contactformulier
├── assets/                 afbeeldingen en iconen
└── DESIGN.MD               design-richtlijnen (bron van alle tokens)
```

## Lokaal bekijken

```
npx serve -l 4173 .
```

Open daarna http://localhost:4173.

## Nog te doen (Jacob)

- **Formspree**: account aanmaken op formspree.io en het form-ID invullen in
  `contact.html` (zoek naar `JOUW_FORM_ID`).
- **Socials**: echte URL's invullen voor LinkedIn, Instagram en GitHub
  (zoek naar `href="#"` in `contact.html` en de footers).
- **Afbeeldingen**: placeholders vervangen — zie `assets/images/AANLEVEREN.md`.
- **Teksten**: definitieve projectteksten en bio schrijven.
- **Hosting** kiezen (GitHub Pages / Vercel / Netlify / eigen domein).
