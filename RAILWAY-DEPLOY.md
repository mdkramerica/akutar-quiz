# Deploy Akutar Quiz to Railway

## Quick Deploy (Browser - Recommended)

**Fastest path: Deploy from GitHub UI**

1. **Go to Railway Dashboard:**
   https://railway.app/new

2. **Click "Deploy from GitHub repo"**

3. **Select repo:**
   - Connect your GitHub account if needed
   - Choose `maverickMolt/akutar-quiz`

4. **Add Environment Variables:**
   Click "Variables" tab and add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://npnqnsjmcyzkpoqynadr.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbnFuc2ptY3l6a3BvcXluYWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MjcxMDcsImV4cCI6MjA4NTMwMzEwN30.unckvGv1xozWSGGt5adOFKgffzZtyGNn5j_tsCm72WU
   ```

5. **Click "Deploy"**
   - Railway auto-detects Next.js
   - Build takes ~2-3 minutes
   - You'll get a URL like: `akutar-quiz-production.up.railway.app`

**Done!** ✓

---

## CLI Deploy (If You Prefer Terminal)

```bash
cd ~/clawd/akutar-quiz

# Login (opens browser)
railway login

# Create new project
railway init

# Set environment variables
railway variables set NEXT_PUBLIC_SUPABASE_URL=https://npnqnsjmcyzkpoqynadr.supabase.co
railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbnFuc2ptY3l6a3BvcXluYWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MjcxMDcsImV4cCI6MjA4NTMwMzEwN30.unckvGv1xozWSGGt5adOFKgffzZtyGNn5j_tsCm72WU

# Deploy
railway up
```

---

## What Railway Will Auto-Detect

- Framework: Next.js
- Build command: `npm run build`
- Start command: `npm run start`
- Port: 3000 (Railway will expose publicly)

---

## After Deployment

**Test the site:**
- Click through the quiz
- Check analytics in Supabase (new rows should appear in `akutar_quiz_results`)
- Test on mobile
- Share with friends for feedback

**Get the URL:**
- Railway Dashboard → Your Project → Deployments
- Copy the URL (e.g., `akutar-quiz-production.up.railway.app`)

**Custom Domain (Optional):**
- Railway Dashboard → Settings → Domains
- Add `quiz.akutars.com` or whatever you want

---

**Ready to deploy? Takes 5 minutes via the Railway dashboard!** 🚀
