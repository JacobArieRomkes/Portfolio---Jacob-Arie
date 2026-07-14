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
└── docs/                   design-richtlijnen (DESIGN.md), spec en plan
```

De pagina's en `404.html` staan bewust in de root: hosting verwacht ze daar.

## Lokaal bekijken

```
npx serve -l 4173 .
```

Open daarna http://localhost:4173.

## Nog te doen (Jacob)

- **Afbeeldingen**: placeholders vervangen, zie `assets/images/AANLEVEREN.md`.
- **Teksten**: definitieve projectteksten en bio schrijven.
- **Hosting** kiezen (GitHub Pages / Vercel / Netlify / eigen domein).
