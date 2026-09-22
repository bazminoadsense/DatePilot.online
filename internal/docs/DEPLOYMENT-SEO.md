# DatePilot Deployment SEO Runbook

This repository can provide public metadata, `robots.txt`, a sitemap, canonical URLs, and application-level HTTPS-aware links. The hosting provider must still enforce the network and verification steps below.

## Required deployment settings

- Serve the production site only on HTTPS.
- Redirect every HTTP request to the HTTPS canonical host with a permanent redirect.
- Choose one canonical host, such as `https://datepilot.online`, and redirect alternate hosts to it.
- Configure the host for SPA fallback so direct visits to calculator, guide, trust, and 404 routes resolve correctly.
- Publish only the build output; never serve the repository root or `internal/` directory.
- Keep `/robots.txt`, `/sitemap.xml`, and `/og-image.svg` available at the domain root.

## Verification steps

1. Open the canonical HTTPS home URL and confirm the certificate is valid.
2. Test HTTP and alternate-host redirects.
3. Test direct navigation to representative calculator, guide, legal, and unknown routes.
4. Add the canonical property to Google Search Console and complete ownership verification.
5. Submit `/sitemap.xml` in Search Console and inspect representative URLs.
6. Confirm the rendered HTML contains the intended title, description, canonical, Open Graph tags, and JSON-LD.
7. Recheck privacy and cookie disclosures before enabling analytics or advertising.

HTTPS certificates, Search Console ownership, indexing, and backlink acquisition require access to the production host and external accounts; they cannot be completed from this local repository alone.