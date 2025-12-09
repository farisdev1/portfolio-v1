# Deployment Guide

This portfolio can be easily deployed to any static site hosting provider. Here are instructions for the most popular free options.

## GitHub Pages

1.  **Push your code to GitHub**:
    *   Create a new repository on GitHub.
    *   Initialize git in your project folder: `git init`
    *   Add files: `git add .`
    *   Commit: `git commit -m "Initial commit"`
    *   Add remote: `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git`
    *   Push: `git push -u origin main`

2.  **Enable GitHub Pages**:
    *   Go to your repository **Settings**.
    *   Click on **Pages** in the left sidebar.
    *   Under **Source**, select `Deploy from a branch`.
    *   Select `main` branch and `/ (root)` folder.
    *   Click **Save**.
    *   Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`.

## Netlify (Drag & Drop)

1.  Log in to [Netlify](https://www.netlify.com/).
2.  Go to the **Sites** tab.
3.  Drag and drop your project folder onto the drag-and-drop area.
4.  Netlify will automatically deploy your site. You can then configure a custom domain if desired.

## Vercel

1.  Install Vercel CLI: `npm i -g vercel`
2.  Run `vercel` in your project directory.
3.  Follow the prompts (accept defaults).
4.  Your site will be deployed instantly.

## Custom Domain

If you have a custom domain (e.g., `johndoe.com`):

*   **GitHub Pages**: Go to Settings > Pages > Custom domain. Enter your domain and configure the DNS settings (CNAME/A records) with your domain registrar as provided by GitHub.
*   **Netlify/Vercel**: Go to Domain Management in the respective dashboard and follow the instructions to verify ownership and update DNS records.
