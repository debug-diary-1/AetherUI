# Quick Setup: Vercel Preview Deployments

## 5-Minute Setup for Automatic PR Previews

### Step 1: Import to Vercel

1. **Go to Vercel**: https://vercel.com/new
2. **Sign in with GitHub** (if not already signed in)
3. **Click "Import Project"**
4. **Search** for `pallavL01/AetherUI`
5. **Click "Import"** on the repository

### Step 2: Configure Project

Vercel will auto-detect the settings from `vercel.json`:

- **Framework Preset**: None (static site)
- **Build Command**: `pnpm install && pnpm build && pnpm build-storybook`
- **Output Directory**: `packages/storybook/storybook-static`
- **Install Command**: `pnpm install --frozen-lockfile`

**Just click "Deploy"** - no changes needed!

### Step 3: Wait for First Deploy

- First deployment takes ~3-5 minutes
- You'll get a production URL like: `aetherui.vercel.app`

### Step 4: Configure GitHub Integration

Vercel automatically:

- ✅ Deploys every PR with a unique preview URL
- ✅ Comments on PRs with the preview link
- ✅ Updates preview on every push to the PR
- ✅ Deploys to production on merge to `main`

**No additional configuration needed!**

---

## That's It! 🎉

Now every PR will automatically get a preview deployment.

### Test It

1. Create a test PR
2. Wait 2-3 minutes
3. Check for Vercel bot comment with preview URL
4. Click the link to see your Storybook

---

## Optional: Custom Domain

If you want a custom domain (e.g., `storybook.aetherui.dev`):

1. Go to Vercel dashboard → Settings → Domains
2. Click "Add"
3. Enter your domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (~5 minutes)

Preview URLs will now be: `pr-123-storybook.aetherui.dev`

---

## Environment Variables (If Needed)

If you need to set environment variables:

1. Vercel dashboard → Settings → Environment Variables
2. Add variable name and value
3. Select environments: Production, Preview, Development
4. Save

Example:

```
NODE_OPTIONS = --max-old-space-size=4096
```

---

## Troubleshooting

### Build Fails

Check the build logs in Vercel dashboard. Common issues:

1. **Memory**: Already configured to 4GB in vercel.json
2. **Dependencies**: Check pnpm-lock.yaml is committed
3. **Build command**: Verify in vercel.json

### Preview Not Showing

1. Check Vercel bot has access to repo
2. Verify GitHub App is installed
3. Check Deployments tab in Vercel dashboard

---

## Next Steps

- **Share preview URLs** in PR descriptions
- **Review components visually** before merging
- **Enable Chromatic** (optional) for visual regression testing

---

**Need more details?** See the full [Preview Deployments Guide](./PREVIEW_DEPLOYMENTS.md)
