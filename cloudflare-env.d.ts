declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    ADMIN_EMAILS?: string;
    GROQ_API_KEY?: string;
    GROQ_MODEL?: string;
    TURSO_DATABASE_URL?: string;
    TURSO_AUTH_TOKEN?: string;
    BUCKET?: R2Bucket;
  }
}
