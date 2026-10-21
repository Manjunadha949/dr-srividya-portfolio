declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    ADMIN_EMAILS?: string;
    TURSO_DATABASE_URL?: string;
    TURSO_AUTH_TOKEN?: string;
    BUCKET?: R2Bucket;
  }
}
