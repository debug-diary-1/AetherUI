# AetherUI Preview Deployments Guide

## Overview

AetherUI supports **automatic preview deployments** for every Pull Request, allowing you to visually review component changes before merging. This guide covers setup and usage for multiple platforms.

---

## 🚀 Quick Start (Recommended: Vercel)

### Why Vercel?

- ✅ **Automatic PR previews** - Every PR gets a unique URL
- ✅ **Zero configuration** - Works out of the box
- ✅ **Fast deployments** - Optimized for static sites
- ✅ **Free for open source** - Unlimited bandwidth
- ✅ **GitHub integration** - Automatic status checks on PRs
- ✅ **Custom domains** - Production deployments on custom domains

### Setup Vercel (5 minutes)

#### 1. Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import `pallavL01/AetherUI` repository
4. Vercel will auto-detect the configuration from `vercel.json`
5. Click **"Deploy"**

That's it! Vercel will now automatically:

- Deploy Storybook on every PR
- Comment on PRs with preview URL
- Deploy to production on merge to `main`

#### 2. Configure Environment (Optional)

If you need environment variables:

```bash
# In Vercel dashboard → Settings → Environment Variables
NODE_OPTIONS=--max-old-space-size=4096
```

#### 3. Custom Domain (Optional)

In Vercel dashboard → Settings → Domains:

- Add your custom domain
- Production: `storybook.aetherui.dev`
- Previews: `pr-123.storybook.aetherui.dev`

---

## 📋 Alternative: Netlify

### Setup Netlify

#### 1. Import Project

1. Go to [netlify.com](https://netlify.com) and sign in with GitHub
2. Click **"Add new site"** → **"Import an existing project"**
3. Select `pallavL01/AetherUI`
4. Netlify will auto-detect settings from `netlify.toml`
5. Click **"Deploy site"**

#### 2. Configure Build Settings

The `netlify.toml` file handles configuration automatically:

- Build command: `pnpm install && pnpm build && pnpm build-storybook`
- Publish directory: `packages/storybook/storybook-static`
- Node version: 20

#### 3. Enable Deploy Previews

In Netlify dashboard → Site settings → Build & deploy → Deploy contexts:

- ✅ Enable deploy previews
- Choose "Any pull request against your production branch"

---

## 🎨 Alternative: Chromatic (Visual Testing + Hosting)

Chromatic is specifically built for Storybook with visual regression testing.

### Setup Chromatic

#### 1. Create Account

1. Go to [chromatic.com](https://www.chromatic.com/)
2. Sign in with GitHub
3. Add `pallavL01/AetherUI` project

#### 2. Get Project Token

```bash
# Copy your project token from Chromatic dashboard
# Add to GitHub Secrets as CHROMATIC_PROJECT_TOKEN
```

#### 3. Add GitHub Action

Create `.github/workflows/chromatic.yml`:

```yaml
name: Chromatic

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: '10.30.2'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build packages
        run: pnpm build

      - name: Publish to Chromatic
        uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          buildScriptName: build-storybook
          autoAcceptChanges: main
```

#### 4. Benefits

- Visual regression testing
- Automatic visual diffs on PRs
- Component history
- Collaboration tools
- Storybook hosting

---

## 🔄 How PR Previews Work

### Workflow

1. **Create PR** → Automatic deployment starts
2. **Build Storybook** → Components are built and deployed
3. **Preview URL** → Unique URL commented on PR
4. **Review** → Team reviews components visually
5. **Merge** → Production deployment updates

### Example PR Comment

```
✅ Deploy Preview ready!

🔍 Inspect: https://aetherui-abc123.vercel.app
📚 Storybook: https://aetherui-abc123.vercel.app

Built with ❤️ by Vercel
```

---

## 📦 What Gets Deployed

The preview deployment includes:

- ✅ **Full Storybook** with all components
- ✅ **Interactive component playground**
- ✅ **Documentation pages**
- ✅ **Accessibility addon**
- ✅ **Theme switcher** (light/dark/minimal themes)
- ✅ **All component variants and states**

---

## 🎯 Using Preview Deployments

### For Developers

```bash
# 1. Create feature branch
git checkout -b feature/new-component

# 2. Make changes to components
# ...edit files...

# 3. Commit and push
git add .
git commit -m "feat: add new component"
git push origin feature/new-component

# 4. Create PR
# GitHub will automatically trigger preview deployment

# 5. Check PR for preview URL
# Click the deployment link to see your changes live
```

### For Reviewers

1. **Open PR** → Look for deployment comment
2. **Click preview URL** → Opens Storybook
3. **Test components visually**:
   - Try all variants (primary, secondary, ghost)
   - Test all sizes (sm, md, lg)
   - Toggle dark/light themes
   - Test interactions (hover, focus, disabled states)
   - Check accessibility tab
4. **Leave feedback** on PR if needed
5. **Approve** when satisfied

---

## 🔧 Configuration Files Explained

### `vercel.json`

```json
{
  "buildCommand": "pnpm install && pnpm build && pnpm build-storybook",
  "outputDirectory": "packages/storybook/storybook-static",
  "github": {
    "enabled": true,
    "autoAlias": true
  }
}
```

**Key settings:**

- `buildCommand`: Builds entire monorepo then Storybook
- `outputDirectory`: Where Storybook outputs static files
- `github.enabled`: Enables automatic PR comments
- `github.autoAlias`: Creates clean preview URLs

### `netlify.toml`

```toml
[build]
  command = "pnpm install && pnpm build && pnpm build-storybook"
  publish = "packages/storybook/storybook-static"

[build.environment]
  NODE_VERSION = "22"
```

**Key settings:**

- `command`: Build command
- `publish`: Output directory
- `environment`: Build environment variables

---

## 🎨 Testing Your Components in Preview

### Visual Testing Checklist

When reviewing a PR preview, check:

#### Theming

- [ ] Light theme works correctly
- [ ] Dark theme works correctly
- [ ] Minimal theme shows unstyled components
- [ ] Custom CSS properties apply correctly

#### Variants

- [ ] Primary variant styled correctly
- [ ] Secondary variant styled correctly
- [ ] Ghost variant styled correctly
- [ ] All color combinations work

#### States

- [ ] Default state
- [ ] Hover state
- [ ] Focus state (keyboard navigation)
- [ ] Active/pressed state
- [ ] Disabled state
- [ ] Loading state (if applicable)

#### Accessibility

- [ ] Check Accessibility addon tab
- [ ] All ARIA attributes present
- [ ] Keyboard navigation works
- [ ] Screen reader labels correct
- [ ] Color contrast passes WCAG AA

#### Responsive

- [ ] Mobile viewport (320px, 375px, 414px)
- [ ] Tablet viewport (768px, 1024px)
- [ ] Desktop viewport (1280px, 1920px)

---

## 🚨 Troubleshooting

### Build Fails on Vercel/Netlify

**Issue**: Build command fails

**Solutions:**

```bash
# Check build locally first
pnpm install
pnpm build
pnpm build-storybook

# If it works locally, check:
# 1. Node version matches (22.x)
# 2. pnpm version matches (10.30.2)
# 3. Environment variables are set
```

### Preview Not Updating

**Issue**: Preview shows old version

**Solutions:**

1. **Force rebuild**: Push an empty commit
   ```bash
   git commit --allow-empty -m "trigger rebuild"
   git push
   ```
2. **Clear cache**: In Vercel/Netlify dashboard
3. **Check deployment logs**: Look for errors

### Out of Memory

**Issue**: Build fails with "JavaScript heap out of memory"

**Solution:** Already configured in both `vercel.json` and `netlify.toml`:

```bash
NODE_OPTIONS=--max-old-space-size=4096
```

If still failing, increase to `8192` in environment settings.

---

## 📊 Comparison: Vercel vs Netlify vs Chromatic

| Feature                | Vercel          | Netlify         | Chromatic           |
| ---------------------- | --------------- | --------------- | ------------------- |
| **PR Previews**        | ✅ Auto         | ✅ Auto         | ✅ Auto             |
| **Build Speed**        | ⚡ Fast         | ⚡ Fast         | 🐢 Slower           |
| **Free Tier**          | ✅ Generous     | ✅ Generous     | ⚠️ Limited          |
| **Custom Domain**      | ✅ Yes          | ✅ Yes          | ❌ No               |
| **Visual Testing**     | ❌ No           | ❌ No           | ✅ Yes              |
| **GitHub Integration** | ✅ Excellent    | ✅ Excellent    | ✅ Good             |
| **Setup Difficulty**   | 🟢 Easy         | 🟢 Easy         | 🟡 Medium           |
| **Best For**           | General hosting | General hosting | Storybook + testing |

### Recommendation

**Use Vercel** for most cases:

- Fastest setup
- Best GitHub integration
- Generous free tier
- Great for component previews

**Add Chromatic** if you need visual regression testing:

- Use both Vercel (for hosting) + Chromatic (for testing)
- Chromatic provides visual diff on every PR
- Catches unintended visual changes

---

## 🎯 Next Steps

1. **Choose platform**: Vercel (recommended) or Netlify
2. **Import project**: Follow setup guide above
3. **Test it**: Create a test PR to verify
4. **Share preview URLs**: Include in PR descriptions
5. **Enable visual testing** (optional): Add Chromatic

---

## 📚 Resources

### Vercel

- [Documentation](https://vercel.com/docs)
- [GitHub Integration](https://vercel.com/docs/git/vercel-for-github)
- [Build Configuration](https://vercel.com/docs/build-step)

### Netlify

- [Documentation](https://docs.netlify.com/)
- [Deploy Previews](https://docs.netlify.com/site-deploys/deploy-previews/)
- [Build Configuration](https://docs.netlify.com/configure-builds/file-based-configuration/)

### Chromatic

- [Documentation](https://www.chromatic.com/docs/)
- [Visual Testing](https://www.chromatic.com/docs/test)
- [Storybook Publishing](https://www.chromatic.com/docs/publish)

---

## 💡 Pro Tips

1. **Use preview URLs in PR descriptions**:

   ```markdown
   ## Preview

   🔍 [View Storybook Preview](https://aetherui-pr-123.vercel.app)

   Changes to review:

   - Button component now supports unstyled mode
   - Added dark theme support
   ```

2. **Share specific component links**:

   ```
   https://aetherui-pr-123.vercel.app/?path=/story/components-button--primary
   ```

3. **Enable automatic deployments** on branch patterns:

   ```json
   {
     "git": {
       "deploymentEnabled": {
         "main": true,
         "feature/*": true,
         "claude/*": true
       }
     }
   }
   ```

4. **Set up deployment notifications** in Slack/Discord for team awareness

---

## ✅ Success Criteria

You'll know preview deployments are working when:

- ✅ Every PR automatically gets a preview comment
- ✅ Preview URL shows your latest Storybook
- ✅ Changes appear within 2-5 minutes of push
- ✅ Team can review components visually before merge
- ✅ Main branch auto-deploys to production URL

---

**Questions?** Check the [Deployment Troubleshooting](https://github.com/pallavL01/AetherUI/wiki/Deployment-Troubleshooting) wiki page.
