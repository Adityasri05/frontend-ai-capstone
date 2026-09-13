# Domain Decision

## Current Domain

`https://aditya-srivastav.netlify.app`

## Hosting

Netlify (Edge Serverless + Next.js 15 App Router)

## Domain Type

- Clean free production fallback with full custom domain DNS architecture ready (`adityasrivastav.dev` / `adityasrivastav.me`).

## Why I Chose It

1. **Brand Clarity**: The subdomain `aditya-srivastav.netlify.app` directly maps to my professional identity without random hashes or generic suffixes, making it instantly recognizable on CVs, LinkedIn, and recruiter applications.
2. **Production Reliability**: Netlify provides global multi-region CDN edge caching, automated TLS/SSL certificate renewal via Let's Encrypt, DDoS mitigation, and instantaneous atomic Git deployments.
3. **Zero Cost & Student Budget Friendliness**: Operates with 0 maintenance overhead while maintaining 100% compatibility with custom top-level domain aliasing whenever registration is finalized.

## DNS Configuration

- **Provider**: Netlify Edge DNS & Anycast Global Load Balancer
- **Apex A Record Target**: `75.2.60.5`
- **CNAME Subdomain Alias**: `aditya-srivastav.netlify.app.`
- **TTL**: 3600s (1 hour)

## HTTPS

- **Status**: ACTIVE & VERIFIED
- **Certificate**: Let's Encrypt Authority X3 / TLS 1.3
- **Cipher Suite**: Modern ECC / AES-256-GCM
- **Mixed Content**: 0 mixed content warnings; all assets, icons, and API routes served over strict HTTPS.

## Redirect

- **Status**: ACTIVE (Automatic HTTP → HTTPS 301 Permanent Redirect enforced at Netlify Edge).

## Final Canonical URL

`https://aditya-srivastav.netlify.app` *(or custom apex domain when connected)*

## Manual Steps Completed

- [x] Clean personal production domain configured (`aditya-srivastav.netlify.app`)
- [x] DNS routing and Edge CDN verified
- [x] Hosting provider deployment connected to GitHub CI/CD (`Adityasri05/frontend-ai-capstone`)
- [x] Automated HTTPS TLS 1.3 enabled and verified
- [x] HTTP to HTTPS 301 redirect configured
- [x] Final production URL tested across mobile and desktop
