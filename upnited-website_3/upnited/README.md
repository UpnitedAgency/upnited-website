# UpNited Marketing — Website Project

**Live URL:** https://upnited.com  
**GitHub Repo:** https://github.com/UpnitedAgency/upnited-website  
**Deployed on:** Vercel (auto-deploys on every GitHub push)

---

## 🏢 About This Project

UpNited Marketing is a creative digital marketing agency based in Colombo, Sri Lanka.  
This website has three main sections:

1. **Marketing Agency** — main public-facing website (services, portfolio, pricing, contact)
2. **Workspace** — private employee portal (invite-only login, attendance, tasks, reports)
3. **Talent Hub** — free public directory for Sri Lankan creatives and skilled professionals

---

## 🎨 Brand

| Property | Value |
|----------|-------|
| Primary Color (Deep Teal) | `#0b4650` |
| Secondary Color (Coral Orange) | `#f97f52` |
| Accent Color (Lime) | `#e6ff2b` |
| Neutral Gray | `#898a8d` |
| Background | `#ffffff` / `#0d0d0d` (dark mode) |
| Heading Font | League Spartan |
| Body Font | Garet |
| Tagline | "Turning Ideas Into Impact" |

**Contact:**
- Email: upnited.marketing@gmail.com
- WhatsApp: +94 72 183 1353

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 16 | React framework |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations |
| Supabase | Database + Authentication |
| Vercel | Hosting + CI/CD |

---

## 📁 Project Structure

```
upnited/
├── app/                        # All pages (Next.js App Router)
│   ├── page.tsx                # Homepage
│   ├── services/               # Services page
│   ├── portfolio/              # Portfolio page
│   ├── pricing/                # Pricing packages
│   ├── about/                  # About page
│   ├── contact/                # Contact + booking
│   ├── talent-hub/             # Talent Hub directory
│   │   ├── [category]/         # Dynamic category pages
│   │   └── submit/             # Talent profile submission
│   ├── workspace/              # Employee portal
│   │   ├── login/              # Employee login
│   │   ├── signup/             # Invite-based signup
│   │   ├── dashboard/          # Employee dashboard
│   │   └── admin/invites/      # Admin: generate invite links
│   └── api/
│       └── invite/             # API: create invite links
├── components/
│   ├── layout/                 # Header, Footer
│   ├── home/                   # Homepage sections
│   └── shared/                 # Reusable components
├── lib/
│   ├── constants.ts            # Site config, nav, contact info
│   ├── services.ts             # Services data
│   ├── talent.ts               # Talent Hub data
│   └── supabase/               # Supabase client setup
│       ├── client.ts           # Browser client
│       ├── server.ts           # Server client
│       └── middleware.ts       # Session middleware
├── supabase/
│   └── schema.sql              # Database schema (run once in Supabase SQL Editor)
├── middleware.ts               # Route protection (redirects to login if not authed)
├── public/                     # Static assets (add logo files here)
│   ├── logo.png                # ← ADD: Main logo (LOGO UPNITED.png)
│   ├── logo-2.png              # ← ADD: Secondary logo
│   └── favicon.ico             # ← ADD: Favicon (logo 3.png → convert to .ico)
└── .env.local.example          # Environment variable template
```

---

## ⚙️ Local Development Setup

### 1. Clone the repo
```bash
git clone https://github.com/UpnitedAgency/upnited-website.git
cd upnited-website/upnited
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Copy the example file and fill in your values:
```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in:
```
NEXT_PUBLIC_SUPABASE_URL=https://frtkrxlxnshcjqaumfts.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_IXfzNWeaUBX7tuEtqZAXmg_EbM-Q3fk
NEXT_PUBLIC_SITE_URL=https://upnited.com
NEXT_PUBLIC_GA_ID=G-RNC1W4EXQB
```

### 4. Run locally
```bash
npm run dev
```
Open http://localhost:3000

---

## 🗄 Supabase Database Setup

The database schema has already been applied to the live Supabase project.  
If setting up fresh, run `supabase/schema.sql` in the Supabase SQL Editor.

**Supabase Project:** https://frtkrxlxnshcjqaumfts.supabase.co  
**Region:** Singapore  
**Tables:** `profiles`, `invites`

### Making the first admin account
After the owner (Pasindu) creates their account, run this in Supabase SQL Editor:
```sql
update public.profiles 
set role = 'admin' 
where email = 'upnited.marketing@gmail.com';
```

---

## 🔐 Employee Invite Flow

1. Admin logs in → goes to `/workspace/admin/invites`
2. Enter employee email → click "Generate Invite Link"
3. Copy the link → send via WhatsApp or email
4. Employee opens link → fills in name, username, password
5. Supabase sends a verification email to the employee
6. Employee clicks the email link → verified
7. Employee logs in at `/workspace/login`

---

## 🚀 Deployment

The site auto-deploys to Vercel on every push to the `main` branch.

**Vercel Environment Variables** (already configured):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID`

To deploy manually: push any commit to `main` on GitHub.

---

## 📋 Pending Tasks for Developer

- [ ] Add real logo files to `/public/` folder:
  - `logo.png` — main logo (LOGO UPNITED.png)
  - `logo-2.png` — secondary logo
  - `favicon.ico` — convert logo 3.png to .ico format
- [ ] Update Header component to use `<Image>` with `/logo.png` instead of the "U" text badge
- [ ] Update Footer to use logo image
- [ ] Add League Spartan font via `next/font/google` (internet access required on build server — Vercel has this, local sandbox did not)
- [ ] Add Garet font via `next/font/local` (not on Google Fonts — client to provide .woff2 font file)
- [ ] Connect contact form to Supabase (`contact_submissions` table) or email service (Resend/SendGrid)
- [ ] Connect booking form to Supabase (`appointments` table)
- [ ] Connect talent submission form to Supabase (`talent_submissions` table with status: pending)
- [ ] Build admin panel for talent submission approvals
- [ ] Add real portfolio images/case studies
- [ ] Add real testimonials
- [ ] Update social media links in `lib/constants.ts` with real profile URLs
- [ ] Set up Supabase Auth email redirect URL in Supabase Dashboard → Authentication → URL Configuration:
  - Add: `https://upnited.com/workspace/login`

---

## 📞 Client Contact

**Pasindu** — UpNited Marketing  
WhatsApp: +94 72 183 1353  
Email: upnited.marketing@gmail.com

