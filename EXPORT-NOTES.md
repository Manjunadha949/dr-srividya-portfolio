# Dr. Srividya website source

Includes the latest typography revision, responsive public pages, images, owner studio, API, database schema and migrations.

This export uses React and Next.js App Router APIs through the Vinext runtime, with Cloudflare D1 storage and ChatGPT Sites authentication. It is the source of the currently hosted Sites project, not a standard Vercel-ready Next.js export.

For deployment outside Sites, configure database bindings and replace the Sites authentication integration with your own secure authentication. The studio and write API both enforce owner access.

The archive contains default website content and SQL migrations, not a backup of the live hosted database. Dependencies and build output are omitted. See package.json and README.md for project scripts.
