// Server-only replacement selected by the Next.js build on Vercel.
// Hosting identity headers are not trusted outside Sites.
export const env=process.env as unknown as Cloudflare.Env;
export const trustChatGPTHeaders=false;

// This private flag exists only in the build child process, never in deployment runtime.
export const buildTime=process.env.SRIVIDYA_BUILD_PHASE==='1';
