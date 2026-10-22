# Vercel deployment

This project supports two hosts. Sites uses the existing Vinext/Cloudflare Worker build. Vercel uses a standard Next.js build that creates `.next/routes-manifest.json`.

Import `Manjunadha949/dr-srividya-portfolio`, branch `main`, with the root directory left at the repository root. The committed `vercel.json` sets the Next.js framework, `npm run build:vercel`, and `.next` output. Remove any conflicting dashboard build/output overrides, then deploy the latest commit.

Set these server environment variables in Vercel Project Settings → Environment Variables before deploying:

- `TURSO_DATABASE_URL`: the existing Dr. Srividya Turso database URL.
- `TURSO_AUTH_TOKEN`: its existing access token.
- `GROQ_API_KEY`: the existing chatbot API key.
- `NEXT_PUBLIC_SITE_URL`: the final HTTPS website origin for canonical URLs and the sitemap.
- Optional `GROQ_MODEL`: defaults to `openai/gpt-oss-20b`.

Keep secrets server-only. Do not prefix database credentials or API keys with `NEXT_PUBLIC_`, and do not commit them. Use the same Turso database to preserve content, username/password login, and existing sessions. No database reset or reseed is required.

On Vercel, `/studio/login` uses the existing studio account. ChatGPT hosting identity headers are disabled outside Sites. Uploads use the existing R2 binding on Sites and chunked Turso BLOB storage on Vercel. Both hosts can read Turso uploads; earlier public R2 images retain a legacy URL fallback. Upload limit: 3 MB per image.

A local compatibility build can run with `SRIVIDYA_BUILD_TARGET=next npm run build`, after configuring the required environment variables privately. The ordinary build remains the Sites Worker build outside Vercel.
