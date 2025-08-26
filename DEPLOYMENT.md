# Vercel Deployment Guide

This guide will help you deploy your SkincareAI application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to a GitHub repository
3. **Google Sheets Setup**: Ensure you have your Google service account and spreadsheet ready

## Environment Variables

You'll need to configure these environment variables in Vercel:

### Required Variables
- `GOOGLE_SERVICE_ACCOUNT_KEY` - Your Google service account JSON key (complete JSON content)
- `GOOGLE_SPREADSHEET_ID` - Your Google Spreadsheet ID from the URL
- `DATABASE_URL` - PostgreSQL connection string (if using database features)

### Optional Variables
- `NODE_ENV` - Set to "production" (usually auto-configured)

## Deployment Steps

### 1. Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it as a Node.js project

### 2. Configure Build Settings
Vercel should automatically detect the settings from `vercel.json`, but verify:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Set Environment Variables
1. In your Vercel project dashboard, go to "Settings" → "Environment Variables"
2. Add the required environment variables:
   - `GOOGLE_SERVICE_ACCOUNT_KEY`: Paste the entire JSON content from your service account key file
   - `GOOGLE_SPREADSHEET_ID`: The ID from your Google Sheets URL
   - `DATABASE_URL`: Your PostgreSQL connection string (if using database)

### 4. Deploy
1. Click "Deploy"
2. Vercel will build and deploy your application
3. You'll get a URL like `https://your-app-name.vercel.app`

## Google Sheets Permissions

Make sure your Google Spreadsheet is shared with the service account:
1. Open your Google Spreadsheet
2. Click "Share"
3. Add the service account email (from the JSON key file)
4. Give it "Editor" permissions

## Troubleshooting

### Build Errors
- Check that all dependencies are listed in `package.json`
- Verify environment variables are set correctly
- Check the build logs in Vercel dashboard

### Google Sheets Errors
- Verify the service account JSON is valid
- Ensure the spreadsheet is shared with the service account email
- Check that the Google Sheets API is enabled in your Google Cloud project

### Runtime Errors
- Check the function logs in Vercel dashboard
- Verify all environment variables are configured
- Test the API endpoints after deployment

## Post-Deployment

1. Test the waitlist and beta application forms
2. Verify data is being saved to Google Sheets
3. Check that duplicate email detection works
4. Test the application on different devices

## Custom Domain (Optional)

To add a custom domain:
1. Go to "Settings" → "Domains" in your Vercel project
2. Add your domain
3. Configure DNS settings as instructed by Vercel

Your SkincareAI application is now live and ready to collect user data in Google Sheets!