# Environment Variables Setup for Deployment

## Required Environment Variables

### 1. Resend Email Configuration

```bash
# Resend API Key for sending emails
RESEND_API_KEY=re_your_actual_api_key_here

# Your business email (where you'll receive order notifications)
BUSINESS_EMAIL=contact@rajondey.com

# From email address (optional - defaults to your BUSINESS_EMAIL)
FROM_EMAIL=contact@rajondey.com
```

### 2. Base URL Configuration

```bash
# For Vercel deployment, set this to your domain
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app

# For local development, this will default to localhost:3000
```

## Vercel Deployment Setup

1. **Go to your Vercel project dashboard**
2. **Navigate to Settings → Environment Variables**
3. **Add the following variables:**

   - `RESEND_API_KEY`: Your Resend API key
   - `BUSINESS_EMAIL`: Your business email
   - `FROM_EMAIL`: Your from email (optional)
   - `NEXT_PUBLIC_BASE_URL`: Your Vercel domain (e.g., `https://your-project.vercel.app`)

4. **Redeploy** your project after adding environment variables

## Local Development

1. **Create `.env.local` file** in your project root
2. **Add the environment variables** from section 1 above
3. **For local development**, you don't need to set `NEXT_PUBLIC_BASE_URL` as it defaults to `http://localhost:3000`

## Why This Setup?

- **Resend API Key**: Enables email functionality for order notifications
- **Business Email**: Where you receive order notifications
- **Base URL**: Ensures API calls work during build process on Vercel
- **Environment Separation**: Different URLs for local vs production

## Testing

After deployment:

1. **Test order form** to ensure emails are sent
2. **Check blog pages** to ensure they load without errors
3. **Verify API endpoints** work correctly
