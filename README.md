# Rajon Dey Development Website

This is a personal portfolio website built with **Next.js** to showcase web development services, portfolio projects, blog posts, and contact information. It’s designed to be fast, SEO-friendly, and user-focused, leveraging modern tools and services for a seamless experience.

## Features

- **Home Page**: Highlights services, recent portfolio items (limited to 2), blog posts (limited to 2), and reviews.
- **Blog**: Fetches posts from a WordPress backend with numbered pagination.
- **Portfolio**: Displays a curated selection of projects with a "View All" link to a dedicated page.
- **Contact Form**: Collects leads securely with a third-party service and redirects to a thank-you page.
- **Newsletter**: Embedded subscription form for developer updates.
- **Authentication**: NextAuth.js integration for user sessions (e.g., dashboard access).
- **SEO**: Metadata and Open Graph tags for better search visibility.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: Custom UI components (Button, Card, etc.) with Tailwind
- **Icons**: [Lucide React](https://lucide.dev/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Blog Data**: WordPress REST API (headless CMS)
- **Deployment**: Vercel (assumed, based on Next.js compatibility)

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── blog/             # Blog page with pagination
│   ├── contact/          # Contact form page
│   ├── portfolio/        # Portfolio page
│   ├── thank-you/        # Thank-you page after form submission
│   └── page.tsx          # Home page
├── components/           # Reusable components
│   ├── sections/         # Section-specific components (BlogCard, PortfolioCard, etc.)
│   ├── ui/              # Base UI components (Button, Card, etc.)
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Footer with social links
│   ├── BeehiivSubscribe.tsx # Newsletter signup
│   └── seo.tsx          # SEO metadata component
├── data/                 # Mock data for static content
├── lib/                  # Utility functions (e.g., wp-api.ts for WordPress fetch)
├── types/                # TypeScript types (e.g., WPPost.ts)
├── public/               # Static assets (images, icons)
└── .env.local            # Environment variables (not committed)
```

## Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- A WordPress instance for blog content (e.g., `https://development-admin.rajondey.com/wp-json/wp/v2`)
- Accounts for third-party services (see below)

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd rajondey-portfolio
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add necessary variables:

   ```bash
   # NextAuth.js (if using authentication)
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=<your-secret>  # Generate with `openssl rand -base64 32`

   # Optional: WordPress API URL (if different from default)
   WP_API_URL=https://development-admin.rajondey.com/wp-json/wp/v2
   ```

   - Note: Sensitive keys (e.g., Formspree ID) are hardcoded safely in the code for simplicity but can be moved here if preferred (see Security Notes).

4. **Run Locally**

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000` in your browser.

5. **Build and Deploy**
   ```bash
   npm run build
   npm run start
   ```
   For production, deploy to Vercel or your preferred platform.

## Third-Party Services

### Contact Form

- **Service**: A third-party form submission provider (Formspree).
- **Purpose**: Collects leads (name, email, message) and sends them to the configured email.
- **Setup**:
  - Form endpoint is embedded in `src/app/contact/page.tsx`.
  - Submissions redirect to `https://development.rajondey.com/thank-you`.Why This README Works
- **How to Update**: Sign into the service dashboard, create a form, and replace the endpoint in the code if needed (avoid sharing the ID publicly).
- **Limits**: Free tier allows 50 submissions/month.

### Blog Content

- **Service**: WordPress REST API (headless CMS).
- **Purpose**: Fetches blog posts dynamically for the `/blog` page.
- **Endpoint**: Configured in `src/lib/wp-api.ts` (default: `https://development-admin.rajondey.com/wp-json/wp/v2`).
- **How to Update**: Point `WP_API_URL` to your WordPress instance if different.

### Newsletter

- **Service**: Beehiiv.
- **Purpose**: Embeds a subscription form for developer updates.
- **Setup**: Embedded iframe in `src/components/BeehiivSubscribe.tsx`.
- **How to Update**: Replace the iframe `src` with your Beehiiv form URL from your account.

### Authentication

- **Service**: NextAuth.js.
- **Purpose**: Manages user sessions (e.g., dashboard access).
- **Setup**: Configured in `src/app/api/auth/[...nextauth]/route.ts` (assumed).
- **How to Update**: Add providers (e.g., Google, GitHub) and secrets in `.env.local`.

## Security Notes

- **Formspree ID**: The contact form ID is hardcoded in `src/app/contact/page.tsx`. This is safe as it’s a public identifier, but:
  - Enable CAPTCHA in the Formspree dashboard to prevent spam.
  - Optionally move it to `.env.local` as `NEXT_PUBLIC_FORMSPREE_ID` for cleaner code (e.g., `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`).
- **Environment Variables**: Sensitive data (e.g., `NEXTAUTH_SECRET`) should stay in `.env.local` and never be committed.
- **Public Exposure**: Avoid sharing API keys or private endpoints in public docs or code comments.

## Development Tips

- **Blog Pagination**: Adjust `perPage` in `fetchPostsPage` (`src/app/blog/page.tsx`) to change posts per page.
- **Portfolio**: Add new items to `portfolio` in `src/data/mock-data.ts`.
- **Styling**: Customize Tailwind classes in `src/app/globals.css` or component files.

## Contributing

Feel free to fork this repo, submit PRs, or suggest improvements via issues. For major changes, discuss them with the owner first.

## License

This project is for personal use and not licensed for public distribution. Contact the owner for permissions.
