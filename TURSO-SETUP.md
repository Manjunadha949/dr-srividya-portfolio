# Turso storage

Set server-only TURSO_DATABASE_URL and TURSO_AUTH_TOKEN secrets in your hosting environment. Never commit the token or prefix either variable with NEXT_PUBLIC_.

Run `node --env-file=.env.local scripts/setup-turso.mjs` to create the table before activating the new connection.

To preserve current website content, download `/api/content` from the existing site as a JSON file before configuring Turso, then run `node --env-file=.env.local scripts/setup-turso.mjs content-export.json`. Import never overwrites an existing profile.

When both Turso secrets are configured, all content reads and admin saves use Turso. While neither is configured, the existing Sites D1 database remains active. A partial configuration or failed Turso connection produces an error, never a silent write to a second database.

Images are stored in R2; their URLs are included in Turso content. Existing bundled images remain in public/images. External deployment still requires adapting Sites authentication and R2 bindings.
