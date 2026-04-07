# Planejamento Tecnico — Diamond West Civil Website
**Data:** 2026-04-06
**Fase:** Pre-codigo

---

## 1. Stack Tecnica

| Componente | Tecnologia | Custo |
|---|---|---|
| Frontend | HTML + CSS + JS puro | $0 |
| Formulario | Formspree (free tier - 50 subs/mes) | $0 |
| Hosting | Vercel | $0 |
| CDN/SSL | Vercel (automatico) | $0 |
| Tracking | Google Tag Manager | $0 |
| Analytics | Google Analytics 4 | $0 |
| Ads Tracking | Google Ads Conversion Tag (via GTM) | $0 |
| Icons | SVG inline | $0 |
| Fonts | Inter (auto-hospedada) | $0 |
| **Total** | | **$0/mes** |

---

## 2. Estrutura de Pastas

```
WDC/
├── index.html              # Main Page (homepage)
├── site-prep.html          # Landing Page - Site Preparation
├── grading.html            # Landing Page - Grading
├── retaining-walls.html    # Landing Page - Retaining Walls
├── thank-you.html          # Thank You page (conversion tracking)
├── css/
│   └── styles.css          # CSS unico (todas as paginas)
├── js/
│   └── main.js             # JS unico (form validation, mobile menu, FAQ accordion)
├── assets/
│   ├── images/             # Fotos do projeto (WebP)
│   ├── icons/              # SVGs (se nao inline)
│   └── fonts/              # Inter font files
├── favicon.ico
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── docs/                   # Documentos de referencia (nao sobe pro deploy)
    ├── Excavation_Website_Strategy.docx
    ├── Research_Competitor_Analysis.md
    ├── Copy_All_Pages.md
    └── Technical_Plan.md
```

---

## 3. Arquitetura das Paginas

### Homepage (index.html) — INDEXAVEL
- Menu de navegacao completo (logo, links, telefone, CTA)
- Serve como presenca organica
- Links internos para as landing pages
- Schema markup: LocalBusiness

### Landing Pages (site-prep, grading, retaining-walls) — NOINDEX
- SEM menu de navegacao (so logo + telefone + CTA)
- Formulario acima do fold (lado direito no desktop, abaixo do headline no mobile)
- Uma pagina = um servico = um CTA
- Headline = keyword exata do Google Ads
- Redirect para thank-you.html apos submit

### Thank You Page (thank-you.html) — NOINDEX
- Mensagem de confirmacao
- Google Ads conversion tag dispara aqui
- CTA secundario (voltar ao site / ligar)

---

## 4. Design System

### Cores
```css
--color-bg-primary: #1A1A1A;      /* Charcoal */
--color-bg-secondary: #2D2D2D;    /* Dark gray */
--color-bg-tertiary: #3A3A3A;     /* Medium gray */
--color-text-primary: #FFFFFF;     /* White */
--color-text-secondary: #B0B0B0;  /* Light gray */
--color-accent: #F59E0B;          /* Amber */
--color-accent-hover: #F97316;    /* Orange */
--color-success: #22C55E;         /* Green (form success) */
--color-error: #EF4444;           /* Red (form errors) */
```

### Tipografia
- **Font:** Inter (auto-hospedada, woff2)
- **H1:** 48px / 56px line-height / 700 weight
- **H2:** 36px / 44px / 700
- **H3:** 24px / 32px / 600
- **Body:** 16px / 28px / 400
- **Small:** 14px / 20px / 400

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Espacamento
- Section padding: 80px vertical (desktop), 48px (mobile)
- Container max-width: 1200px
- Grid gap: 32px

---

## 5. Performance Targets (Core Web Vitals)

| Metrica | Meta | Estrategia |
|---|---|---|
| **LCP** | < 2.0s | Hero image em WebP, preload, font-display: swap |
| **CLS** | < 0.05 | Dimensoes explicitas em imagens, font fallback match |
| **INP** | < 100ms | JS minimo, sem frameworks, event delegation |
| **Page Size** | < 500KB | WebP, CSS/JS minificados, font subset |
| **Requests** | < 15 | CSS/JS unicos, SVG inline, font preload |

---

## 6. Formulario (Formspree)

### Setup
- Action: `https://formspree.io/f/{FORM_ID}`
- Method: POST
- Redirect: /thank-you.html

### Validacao (client-side)
- Inline validation em tempo real
- Campos obrigatorios: Name, Phone, Email, Project Type
- Campos opcionais: Location, Timeline, Description
- Regex para phone e email

### Anti-spam
- Formspree honeypot (built-in)
- Sem CAPTCHA visivel (melhor UX)

---

## 7. Tracking Setup

### Google Tag Manager (GTM)
- Container instalado em todas as paginas (head + body)
- Tags configuradas:
  - GA4 page view (todas as paginas)
  - Google Ads conversion (dispara na thank-you page)
  - Google Ads remarketing (todas as paginas)

### UTM Parameters
- Passados automaticamente do ad para a landing page
- Capturados via JS e enviados como hidden fields no form

---

## 8. SEO Checklist

### Homepage (indexavel)
- H1 com keyword principal
- Meta title: "Diamond West Civil | Excavation & Site Development | Scottsdale, AZ"
- Meta description com CTA
- Schema markup: LocalBusiness
- Open Graph tags
- Canonical: self-referencing

### Landing Pages (noindex)
- `<meta name="robots" content="noindex, follow">`
- H1 = keyword do ad group
- Sem canonical (noindex ja resolve)

---

## 9. Acessibilidade Basica

- Alt text em todas as imagens
- Contraste minimo 4.5:1 (WCAG AA)
- Focus states visiveis
- Formulario com labels e aria-labels
- Skip navigation link
- Semantic HTML (header, main, section, footer)

---

## 10. Deploy (Vercel)

### Setup
- Repositorio Git (GitHub)
- Vercel conectado ao repo
- Deploy automatico a cada push
- Branch: main = producao

### Dominio
- Dominio customizado a definir pelo cliente
- Vercel provisiona SSL automaticamente
