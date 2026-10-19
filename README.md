# Dr. Srividya portfolio
React and Next.js App Router source, built using Vinext for the Sites Cloudflare runtime. Shared design tokens and responsive styles are in app/globals.css. D1 stores the website content; defaults come from supplied doctor information. Owner Studio is /studio.

## Security and release
Public browsing is enabled. Both the admin API and Studio route authorize the owner by the verified Sites identity email. Search indexing is disabled for this preview.

## Content
Edit profile, contact details, expertise, qualifications, experience, articles, videos and FAQs in Studio and save. Changes persist in D1. Photo fields accept HTTPS URLs or local paths. There is no file uploader or appointment booking workflow. Empty contact details deliberately do not create callable fake numbers. Current workplace needs confirmation. Articles and videos start empty rather than inventing doctor-authored material.

## Development
Install dependencies, run npm run db:generate for schema changes, then npm run build. Hosting-specific imports in db/index.ts need replacement to deploy on standard Next.js hosting such as Vercel (for example with a hosted libSQL database).
