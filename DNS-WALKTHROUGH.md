# Understanding Web Infrastructure: DNS, Routing & HTTPS

A plain-language technical walkthrough of what happens under the hood when someone visits my portfolio website.

---

## 1. What DNS Actually Does

Many tutorials oversimplify DNS as just *"the internet's phonebook that converts domain names to IP addresses"*. While IP resolution is a core function, DNS (Domain Name System) is actually a distributed, hierarchical database that maps human-readable domain names (hostnames) to the specific resource records needed to route web traffic to a destination service.

DNS records do not just return raw IPv4 addresses (`A` records) or IPv6 addresses (`AAAA` records). They also manage:
* **Host aliases** (`CNAME` records)
* **Mail exchange routing** (`MX` records)
* **Domain ownership verification and security policies** (`TXT`, `SPF`, `DKIM` records)
* **Service locators** (`SRV` records)

When you type a URL into your browser, DNS coordinates the lookup that translates your request into the exact network endpoint hosting the site.

---

## 2. What is a CNAME Record?

A **CNAME (Canonical Name)** record is an alias record in DNS. Instead of pointing a domain directly to an IP address, a CNAME record points **one hostname to another hostname**.

### Why CNAME Records Are Useful
Modern cloud platforms (like Netlify, Vercel, AWS CloudFront, and Cloudflare) use distributed Content Delivery Networks (CDNs) and Anycast IP routing. Because cloud providers frequently shift IP addresses, balance server loads, and route users to the closest geographical edge nodes, assigning a single static IP address to your domain is fragile.

By pointing your domain alias to the provider's canonical hostname via a CNAME record, the hosting provider can dynamically manage, balance, and update their IP infrastructure without breaking your domain.

### Conceptual CNAME Example:
```text
portfolio.adityasrivastav.com  (Your custom subdomain alias)
               │
             [CNAME]
               ▼
aditya-srivastav.netlify.app   (Netlify's canonical edge router)
               │
             [A / Anycast IP]
               ▼
75.2.60.5 / Edge CDN Node     (Physical hosting server)
```

*(Note: On standard free hosting under `*.netlify.app`, the domain is served directly under Netlify's authoritative DNS zone. A custom CNAME is only configured when attaching your own custom domain, e.g., `www.adityasrivastav.com`.)*

---

## 3. The 10-Step DNS & Web Request Journey

When a recruiter opens a browser and types `https://aditya-srivastav.netlify.app`, here is the step-by-step resolution and rendering journey:

```text
1. User enters URL in Browser
              │
2. Browser & OS Cache Check (Hit? Skip to 8. If Miss, continue)
              │
3. Recursive DNS Resolver (ISP, 1.1.1.1, or 8.8.8.8)
              │
4. Root DNS Nameserver (.) — Directs to TLD Nameserver
              │
5. TLD Nameserver (.app) — Directs to Authoritative Nameserver
              │
6. Authoritative Nameserver (ns1.netlify.com) — Returns A/CNAME record
              │
7. Resolver caches response & returns IP to Browser
              │
8. TCP Handshake & TLS/HTTPS Security Negotiation (Port 443)
              │
9. HTTP GET Request & Netlify Edge Server Response (HTML, CSS, JS)
              │
10. Browser Parsing, React Hydration & Page Rendering
```

### Step-by-Step Explanation:

1. **User Types URL**: The user types `https://aditya-srivastav.netlify.app` into the browser navigation bar.
2. **Local Cache Inspection**: The browser checks its internal DNS cache. If expired or not found, it asks the Operating System's local DNS cache (and `hosts` file). If previously resolved and TTL (Time-To-Live) has not expired, steps 3–6 are skipped completely.
3. **Recursive DNS Resolver**: If the local caches miss, the OS queries the configured recursive resolver (such as Cloudflare `1.1.1.1`, Google `8.8.8.8`, or an ISP resolver). The recursive resolver acts as the coordinator responsible for hunting down the record across the internet hierarchy.
4. **Root Nameserver (`.`)**: If the resolver doesn't have the record cached, it asks one of the global Root Nameservers. The root nameserver doesn't know the exact IP, but it knows which Top-Level Domain (TLD) nameserver manages the `.app` namespace and returns that referral.
5. **TLD Nameserver (`.app`)**: The resolver asks the `.app` TLD nameserver. The TLD server inspects the registry and directs the resolver to the **Authoritative Nameserver** for `netlify.app` (e.g., Netlify's DNS cluster `dns1.p01.nsone.net` / `ns1.netlify.com`).
6. **Authoritative Nameserver**: The authoritative nameserver holds the actual, definitive zone records for `aditya-srivastav.netlify.app`. It returns the Anycast IP address of Netlify's closest edge CDN server.
7. **Cache & Return**: The recursive resolver caches this record according to its TTL duration and returns the resolved IP address to your operating system and browser.
8. **TCP & TLS Handshake**: The browser opens a TCP connection to the resolved edge IP on port 443 (HTTPS) and initiates a TLS 1.3 cryptographic handshake to verify server authenticity and negotiate symmetric encryption keys.
9. **HTTP Response**: The browser sends an encrypted HTTP `GET /` request. Netlify's edge node serves the pre-rendered HTML document and assets.
10. **Browser Rendering & Hydration**: The browser parses the HTML, fetches the compiled Tailwind CSS stylesheets and Next.js JavaScript bundles, executes React hydration, and renders the interactive portfolio.

---

## 4. How HTTPS & TLS Certificates Work

**HTTPS (Hypertext Transfer Protocol Secure)** is HTTP operating over a cryptographically secured **TLS (Transport Layer Security)** connection.

### Core HTTPS Protections:
1. **Confidentiality (Encryption)**: All data transmitted between the visitor's browser and Netlify (URLs, inputs, headers) is encrypted. Attackers or snooping Wi-Fi routers cannot read the payload.
2. **Integrity (Tamper-Proofing)**: TLS verifies that the HTML, CSS, and scripts received by the browser were not modified or injected with malicious code in transit.
3. **Authentication (Identity)**: A cryptographic digital certificate issued by a trusted Certificate Authority (CA) verifies that the user is truly connecting to `aditya-srivastav.netlify.app` and not an impersonator.

### Why Hosting Platforms Provision Certificates Automatically
Modern hosting platforms (Netlify, Vercel, Cloudflare) use the **ACME (Automated Certificate Management Environment)** protocol to interface directly with certificate authorities like **Let's Encrypt**. 

When a project is deployed, Netlify automatically requests, validates domain control via DNS/HTTP challenges, signs, and renews a free TLS certificate without requiring manual key generation or server restarts. The visitor's browser verifies this certificate against its built-in Root CA store and displays the secure lock indicator.
