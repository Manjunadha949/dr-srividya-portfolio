# Website administration

Sign in at `/studio` with the owner’s ChatGPT account. Open **Admin Access**, enter the doctor’s ChatGPT sign-in email, and grant access. The doctor then signs in at `/studio` with that account. The owner can remove additional editors; the owner account is always retained.

Authorized editors can change profile and portrait, clinic details, WhatsApp number and booking message, care descriptions, education, experience, articles, videos, custom thumbnails, FAQs, testimonials, social links, public website wording, and chatbot greeting/enabled status.

The doctor’s email has not yet been supplied, so no additional account has been granted access. Admin membership is stored separately in Turso’s `site_admins` table and is never returned by the public content API. Server-only `ADMIN_EMAILS` remains available for configured editors.

Public content is cached for up to 20 seconds. Admin saves replace the local cached copy immediately; other server instances refresh within that interval. Authentication and admin membership are never cached with public content.
