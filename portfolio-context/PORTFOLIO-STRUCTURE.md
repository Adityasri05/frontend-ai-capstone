# Portfolio Sitemap & Structure

## Routes & Pages

| Route | Component File | Purpose |
|---|---|---|
| `/` | `src/app/page.tsx` | Main Portfolio Homepage (Hero, Selected Work, About, Tech, Contact) |
| `/projects` | `src/app/projects/page.tsx` | All Projects Index Catalog |
| `/projects/hirevium` | `src/app/projects/hirevium/page.tsx` | HIREVIUM Case Study Breakdown |
| `/projects/indra-ai` | `src/app/projects/indra-ai/page.tsx` | INDRA AI Case Study Breakdown |
| `/projects/stackscout` | `src/app/projects/stackscout/page.tsx` | StackScout Case Study Breakdown |
| `/projects/[slug]` | `src/app/projects/[slug]/page.tsx` | Dynamic Case Study Route Handler |
| `/interview` | `src/app/interview/page.tsx` | Interactive HIREVIUM AI Qualification Interview Workspace |
| `/resume` | `src/app/resume/page.tsx` | Online Resume & Credentials |
| `/workspace` | `src/app/workspace/page.tsx` | Interactive 3D Digital Twin Workspace |
| `/api/chat` | `src/app/api/chat/route.ts` | Serverless AI Streaming & Tool Calling Route |
| `/api/contact` | `src/app/api/contact/route.ts` | Serverless Rate-Limited Contact Dispatch |
