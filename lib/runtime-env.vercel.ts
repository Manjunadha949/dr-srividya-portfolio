// Server-only replacement selected by the Next.js build on Vercel.
// Hosting identity headers are not trusted outside Sites.
export const env=process.env as unknown as Cloudflare.Env;
export const trustChatGPTHeaders=false;
