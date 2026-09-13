# Custom Domain Setup Guide

A complete reference guide for connecting a custom top-level domain (e.g. `adityasrivastav.dev`, `adityasrivastav.me`, or `adityasrivastav.com`) to this Netlify-hosted Next.js portfolio.

---

## 1. Domain Registration & Availability
1. Check domain availability through a standard ICANN-accredited registrar (e.g. Namecheap, Cloudflare Registrar, Google Domains/Squarespace, Porkbun).
2. Recommended domain patterns:
   - `adityasrivastav.dev` (Ideal for Developer & AI positioning)
   - `adityasrivastav.me` (Clean personal brand)
   - `adityasrivastav.com` (Standard international .com)
3. Purchase the chosen domain.

---

## 2. Netlify Domain Management Settings
1. Log in to the [Netlify Dashboard](https://app.netlify.com).
2. Navigate to **Sites** > Select your site (`aditya-srivastav`).
3. Go to **Site Configuration** > **Domain Management** > **Custom Domains**.
4. Click **Add a domain** and enter your registered apex domain (e.g. `adityasrivastav.dev`).
5. Netlify will prompt you to configure the primary domain and `www` alias.

---

## 3. DNS Configuration Records

Configure the following DNS records at your domain registrar / DNS provider:

### Option A: Standard External DNS (Recommended)
| Type | Host / Name | Target / Value | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (Apex domain) | `75.2.60.5` | 3600 (1 hr) | Points apex traffic to Netlify's high-availability load balancer. |
| **CNAME** | `www` | `aditya-srivastav.netlify.app.` | 3600 (1 hr) | Aliases `www` subdomain to the Netlify production deployment edge. |

### Option B: Netlify Managed DNS
1. Select **Set up Netlify DNS** in the Netlify domain dashboard.
2. Replace your registrar's nameservers with Netlify's 4 authoritative nameservers (e.g. `dns1.p01.nsone.net`, `dns2.p01.nsone.net`, `dns3.p01.nsone.net`, `dns4.p01.nsone.net`).

---

## 4. Automated HTTPS Provisioning (TLS/SSL)
1. Once DNS propagates (typically 5–30 minutes), Netlify will automatically request and provision a free TLS/SSL certificate via Let's Encrypt.
2. In **Site Configuration** > **Domain Management** > **HTTPS**, verify that **Status: Certificate issued** is active.
3. Check **Force HTTPS** to ensure all HTTP connections automatically redirect to encrypted HTTPS (`301 Moved Permanently`).

---

## 5. Post-Domain Canonical & Metadata Updates
Once the custom domain is live:
1. Update `metadataBase` in [`src/app/layout.tsx`](file:///d:/Hackathon/frontend-ai-capstone/src/app/layout.tsx):
   ```ts
   metadataBase: new URL("https://adityasrivastav.dev"),
   ```
2. Update `baseUrl` in [`src/app/robots.ts`](file:///d:/Hackathon/frontend-ai-capstone/src/app/robots.ts) and [`src/app/sitemap.ts`](file:///d:/Hackathon/frontend-ai-capstone/src/app/sitemap.ts).
3. Update production URL references in [`FL-WEBSITE-SUBMISSION.md`](file:///d:/Hackathon/frontend-ai-capstone/FL-WEBSITE-SUBMISSION.md).
4. Run `npm run build` and push to GitHub.
