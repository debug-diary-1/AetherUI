# How to Get and Configure Nx Cloud Token

## Step 1: Create an Nx Cloud Account

1. Go to [https://cloud.nx.app](https://cloud.nx.app)
2. Click "Sign Up" or "Get Started"
3. Sign up using GitHub, Google, or email

## Step 2: Create or Connect to a Workspace

### Option A: Create a New Workspace

1. After signing in, click "Create Workspace"
2. Name your workspace (e.g., "AetherUI")
3. Select the free tier or choose a paid plan

### Option B: Connect to Existing Organization

- If you need to connect to organization `MpAIVrTJI3`, you'll need to be invited by an admin
- Contact the organization admin to get an invitation

## Step 3: Get Your Access Token

1. In your Nx Cloud workspace, go to **Settings** (gear icon)
2. Navigate to **Access Tokens** or **CI Access Tokens**
3. Click **"Generate New Token"**
4. Give it a name like "GitHub Actions CI"
5. Copy the generated token (it looks like: `NzhiZTU4MDktZTQ4MS00YmM5LWE5MDEtZjI5ODg1ZDc2OGQ0|dGVzdA==`)

**⚠️ Important:** Save this token immediately - you won't be able to see it again!

## Step 4: Add Token to GitHub Repository

1. Go to your GitHub repository: https://github.com/pallavL01/AetherUI
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add the secret:
   - **Name:** `NX_CLOUD_ACCESS_TOKEN`
   - **Value:** Paste your token from Step 3
5. Click **"Add secret"**

## Step 5: Verify Configuration

After adding the token, the CI workflow will automatically:

- Use Nx Cloud for remote caching
- Distribute tasks across multiple agents
- Share cache between CI runs and team members

## Local Development (Optional)

To use Nx Cloud locally:

```bash
# Add to your .env.local or export in terminal
export NX_CLOUD_ACCESS_TOKEN="your-token-here"

# Now builds will use cloud cache
pnpm build
```

## Troubleshooting

### Invalid Token Error

- Ensure you copied the entire token (including any `==` at the end)
- Check that the token hasn't expired
- Verify the token is for the correct workspace

### Organization Access

- For organization `MpAIVrTJI3`, you need to be added as a member
- Contact the workspace admin for access

### Token Not Working in CI

- Ensure the secret name is exactly `NX_CLOUD_ACCESS_TOKEN`
- Check that the secret is available to your workflow (not restricted to certain branches)
- Verify the token permissions in Nx Cloud dashboard

## Benefits Once Configured

✅ **30-50% faster CI builds** through remote caching  
✅ **Shared cache** between developers and CI  
✅ **Distributed task execution** across agents  
✅ **Build analytics** and performance insights

## Free Tier Limits

The Nx Cloud free tier includes:

- 500 computation hours per month
- Unlimited users
- 7-day cache retention
- Basic analytics

This is typically sufficient for small to medium open-source projects.
