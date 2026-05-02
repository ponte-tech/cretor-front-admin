# Cretor Admin — CRM Platform

Internal CRM and lead management platform for Daniel Krammes Imoveis.

**Live:** https://adm.danielkrammes.com

## Overview

Admin panel used by the internal sales team to manage leads, track the sales pipeline, generate proposals, and monitor campaign performance. Leads are captured from property landing pages and automatically entered into the pipeline.

## Features

- **Lead Management** — View, search, filter, and manage leads with status tracking
- **Sales Pipeline** — Kanban-style board with stages: First Contact, Qualified, Visit Scheduled, Proposal Sent, Negotiation
- **Landing Pages** — Property-specific pages with lead capture forms, gallery, FAQ, and conversion tracking
- **Proposal Generation** — PDF proposals with property details and payment conditions
- **WhatsApp Integration** — Direct messaging to leads from the CRM
- **Analytics** — GA4 + Meta Pixel event tracking with form field interaction monitoring

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** CSS Modules (dark theme with gold accents)
- **Routing:** React Router v6
- **Hosting:** AWS S3 + CloudFront
- **CI/CD:** GitHub Actions (auto-deploy on push to main)

## Property Landing Pages

Each development gets a dedicated landing page (e.g., `/imovel/porto-belo`) with:
- Hero section with lead capture form
- Image gallery with lightbox
- Floor plans, amenities, pricing conditions
- FAQ section
- Exit intent popup
- Floating WhatsApp button
- Google Ads + GA4 conversion tracking

## Related Repositories

- [cretor-front](https://github.com/ponte-tech/cretor-front) — Public website
- [cretor-back](https://github.com/ponte-tech/cretor-back) — Backend API
- [cretor-ads-automation](https://github.com/ponte-tech/cretor-ads-automation) — Ads automation CLI
