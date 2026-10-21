# Turso storage

Set server-only TURSO_DATABASE_URL and TURSO_AUTH_TOKEN secrets in your hosting environment. Never commit the token or prefix either variable with NEXT_PUBLIC_.

Run `node --env-file=.env.local scripts/setup-turso.mjs` to create the table before activating the new connection.

To preserve current website content, download `/api/content` from the existing site as a JSON file before configuring Turso, then run `node --env-file=.env.local scripts/setup-turso.mjs content-export.json`. Import never overwrites an existing profile.

When both Turso secrets are configured, all content reads and admin saves use Turso. While neither is configured, the existing Sites D1 database remains active. A partial configuration or failed Turso connection produces an error, never a silent write to a second database.

Images are stored in R2; their URLs are included in Turso content. Existing bundled images remain in public/images. External deployment still requires adapting Sites authentication and R2 bindings.

The live site was migrated from its public content export to the supplied Turso database. The source D1 row was retained. `scripts/migrate-current.mjs` accepts credentials via stdin, verifies the copied profile, and backs up an existing target profile before replacement. Do not rerun it to restore old content after new admin edits.

The website assistant uses server-only `GROQ_API_KEY` and optional `GROQ_MODEL` (default `openai/gpt-oss-20b`). Browser code never receives either provider key. Chats are not persisted; rate counters are stored in `chat_limits` with expiry. Default limits: 30 requests per hashed IP per hour and 300 requests across the site per day. It is a website information assistant and does not provide diagnosis or treatment.
