# Final Launch Checklist

## Domain

- [x] Production domain connected (`https://aditya-srivastav.netlify.app`)
- [x] HTTPS working with valid TLS 1.3 certificate
- [x] HTTP redirects automatically to HTTPS (301 Moved Permanently)
- [x] Final canonical URL configured (`metadataBase: https://aditya-srivastav.netlify.app`)

## Analytics

- [x] Lightweight GA4 analytics component installed (`src/components/analytics/Analytics.tsx`)
- [x] `NEXT_PUBLIC_GA_ID` environment variable integration configured
- [x] Realtime traffic verification guide documented ([`ANALYTICS-SETUP-GUIDE.md`](./ANALYTICS-SETUP-GUIDE.md))
- [x] Screenshot capture instructions created in [`launch/README.md`](./launch/README.md)

## SEO

- [x] Page title correct (`Aditya Srivastav — Frontend AI Engineer`)
- [x] Meta description correct (Accurate summary of student AI background & systems)
- [x] Canonical URL tag verified (`https://aditya-srivastav.netlify.app/`)
- [x] Open Graph metadata verified (`og:title`, `og:description`, `og:image`, `og:url`)
- [x] Social preview image active ([`public/og-image.svg`](./public/og-image.svg))
- [x] robots.txt verified ([`src/app/robots.ts`](./src/app/robots.ts) allowing crawler indexing)
- [x] sitemap.xml verified ([`src/app/sitemap.ts`](./src/app/sitemap.ts) indexing all 7 routes)

## Branding

- [x] High-contrast monogram Favicon works ([`public/favicon.svg`](./public/favicon.svg))
- [x] Candidate name is correct (Aditya Srivastav)
- [x] Portfolio positioning is honest and verified (Early-career Frontend AI Engineer)

## FlyRank Credential

- [x] Official FlyRank verified credential installed in footer ([`src/components/common/FlyRankCredential.tsx`](./src/components/common/FlyRankCredential.tsx))
- [x] Credential ID matches exactly: `FR-D1-T668H-R789R`
- [x] Verification URL matches exactly: `https://internship.flyrank.ai/verify?id=FR-D1-T668H-R789R&first_name=Aditya`
- [x] Accessible label matches: `Verify Aditya Srivastav's FlyRank AI Internship credential FR-D1-T668H-R789R (opens in a new tab)`
- [x] Credential visible in footer across all pages
- [x] Credential link verified over HTTPS
- [x] Credential layout is responsive and verified on mobile viewports

## Mobile

- [x] Final URL verified on mobile viewports (320px–414px)
- [x] HTTPS security verified on mobile browsers
- [x] Collapsible hamburger navigation works smoothly
- [x] Case study sections wrap cleanly with 0 horizontal overflow
- [x] Contact form inputs sized `text-base sm:text-xs` to prevent iOS zoom
- [x] AI interview chat and Stop button operable on mobile touch screens
- [x] Footer and FlyRank credential badge fit comfortably within mobile widths

## Links

- [x] LinkedIn (`https://www.linkedin.com/in/aditya-srivastav-64906927a/`)
- [x] GitHub (`https://github.com/Adityasri05`)
- [x] Demo links (Live interview evaluator `/interview`, projects)
- [x] Repository links (`https://github.com/Adityasri05/frontend-ai-capstone`)
- [x] FlyRank verification link (`https://internship.flyrank.ai/verify?id=FR-D1-T668H-R789R&first_name=Aditya`)

## Final

- [x] No console errors or uncaught runtime exceptions
- [x] No broken images or missing SVGs
- [x] No horizontal overflow on any breakpoint
- [x] Production build passes cleanly with 0 type errors (`npm run build`)
- [x] All 31 automated unit and component tests passing (`npm run test:run`)
