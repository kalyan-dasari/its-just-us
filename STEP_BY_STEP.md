# 📚 Step-by-Step Deployment Guide

## Overview
This guide walks you through deploying your app from local development to a live URL.

**Total Time**: ~20 minutes

---

## 🔵 STEP 1: Set Up Supabase (5 mins)

### 1.1: Create Supabase Account
1. Go to **https://supabase.com**
2. Click **"Start your project"**
3. Sign up with GitHub (easiest)
4. Authorize Supabase

### 1.2: Create New Project
1. Click **"New Project"**
2. Fill in details:
   - **Name**: `kal-ka-sapna`
   - **Password**: Create a strong one (save it!)
   - **Region**: Choose closest to you
3. Click **"Create new project"**
4. **Wait 2 minutes** for initialization

### 1.3: Get Your API Keys
1. Once project loads, go to **Settings** (gear icon)
2. Click **"API"** in left sidebar
3. **Copy these**:
   - **Project URL** (blue box at top)
   - **anon public** under "Project API keys"
4. Keep these in a safe place for later

### 1.4: Create Database Table
1. In Supabase, click **"SQL Editor"** in left sidebar
2. Click **"New Query"**
3. Paste this exactly:

```sql
-- Create memories table
CREATE TABLE memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  image_url VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Allow all operations" ON memories
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. Click **"RUN"** button
5. ✅ Table created!

---

## 🟢 STEP 2: Configure Local Environment (3 mins)

### 2.1: Update Environment File
1. Open file: `c:\Users\kalya\Desktop\kal-ka-sapna\.env.local`
2. Paste your Supabase values:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-very-long-key-here
```

Replace with **actual values** from Supabase API page

### 2.2: Test Locally
```bash
cd c:\Users\kalya\Desktop\kal-ka-sapna
npm run dev
```

Expected output:
```
➜  Local:   http://localhost:5173/
```

3. Open `http://localhost:5173` in browser
4. Try logging in:
   - Username: `sapna` or `kalyan`
   - Password: `sapna@kalyan26112025`
5. Try adding a memory
6. ✅ Everything works locally!

---

## 🟣 STEP 3: Push to GitHub (4 mins)

### 3.1: Set Up Git Locally
```bash
cd c:\Users\kalya\Desktop\kal-ka-sapna

git config user.name "Your Name"
git config user.email "your@email.com"

git init
git add .
git commit -m "Initial commit: Private memory sharing app"
```

### 3.2: Create GitHub Repository
1. Go to **https://github.com/new**
2. Fill in:
   - **Repository name**: `kal-ka-sapna`
   - **Description**: Private Memory Sharing Website
   - Leave other options as default
3. Click **"Create repository"**
4. Copy the HTTPS URL (looks like: `https://github.com/username/kal-ka-sapna.git`)

### 3.3: Push Code to GitHub
Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kal-ka-sapna.git
git push -u origin main
```

Expected: Code uploads to GitHub
✅ Repository ready!

---

## 🔴 STEP 4: Deploy to Vercel (8 mins)

### 4.1: Connect to Vercel
1. Go to **https://vercel.com**
2. Click **"Sign Up"** (use GitHub)
3. Authorize Vercel to access GitHub
4. You're logged in!

### 4.2: Import Project
1. Click **"Add New"** (top right)
2. Click **"Project"**
3. **Select Repository**: Choose `kal-ka-sapna`
4. Click **"Import"**

### 4.3: Configure Project
1. **Framework Preset**: Keep as `Vite` (auto-selected)
2. **Build & Development Settings**: Keep defaults
3. Don't change other settings
4. Scroll down to **"Environment Variables"**

### 4.4: Add Environment Variables
1. Under "Environment Variables" section:
   - **Name**: `VITE_SUPABASE_URL`
   - **Value**: Paste your Supabase URL
   - Click **"Add"**

2. Add second variable:
   - **Name**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: Paste your Supabase anon key
   - Click **"Add"**

3. Click **"Deploy"** button
4. **Wait 2-3 minutes** for deployment

### 4.5: Get Your Live URL
1. Deployment completes → Shows "Congratulations!"
2. You'll see your live URL, like:
   ```
   https://kal-ka-sapna.vercel.app
   ```
3. Click it to open your live app!
4. Test login works
5. ✅ App is LIVE!

---

## 💌 STEP 5: Share with Partner (1 min)

Send this to your partner:

```
🎉 Our Memory Space is Live!

Link: https://kal-ka-sapna.vercel.app

Login with:
Username: sapna or kalyan
Password: sapna@kalyan26112025

Let's create memories together! 💜
```

---

## 🔄 Making Updates

Anytime you want to update the app:

1. Make changes locally
2. Test with `npm run dev`
3. Push to GitHub:
```bash
git add .
git commit -m "Your changes here"
git push origin main
```
4. Vercel automatically redeploys! ✨

---

## ⚠️ Troubleshooting

### "Deployment failed on Vercel"
- Check build logs (click "Deployments" tab)
- Look for error message
- Usually missing environment variables or typo

### "Error connecting to database"
- Verify `VITE_SUPABASE_URL` is correct
- Check anon key is correct
- Verify database table exists in Supabase

### "Can't log in"
- Check credentials:
  - Username: `sapna` or `kalyan`
  - Password: `sapna@kalyan26112025`
- Exact spelling and case matter!

### "Can't add memories"
- Check Supabase > SQL Editor > `memories` table exists
- Verify RLS policies allow operations
- Check browser console for errors (F12)

---

## ✅ Success Checklist

- [ ] Supabase project created
- [ ] Database table created
- [ ] `.env.local` updated with keys
- [ ] Local development works
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables set on Vercel
- [ ] Deployment successful
- [ ] Live URL works
- [ ] Can login on live site
- [ ] Can add memories on live site
- [ ] Partner can access

---

## 🎉 You're Done!

Your private memory space is now live and ready to share! 💜

**Live URL**: `https://kal-ka-sapna.vercel.app`

Enjoy creating memories together!

---

## 📞 Quick Support

**Supabase Help**: https://supabase.com/docs
**Vercel Help**: https://vercel.com/docs/concepts/deployments
**GitHub Help**: https://docs.github.com

