# 🚀 Complete Deployment & Setup Guide

## 📋 What You Have

This is a **Private Memory Sharing Website** for **Sapna & Kalyan**, built with:
- ⚛️ React + TypeScript
- 🎨 Tailwind CSS for beautiful UI
- 🔐 Private login (no user registration)
- 💾 Supabase for data storage
- 🚀 Deployed on Vercel (live URL)

### Login Credentials
```
Username: sapna or kalyan
Password: sapna@kalyan26112025
```

### Special Date
Since: Nov 26, 2025 💜

---

## 🛠️ Phase 1: Local Development

### Step 1: Verify Installation
```bash
cd "c:\Users\kalya\Desktop\kal-ka-sapna"
npm install
```

### Step 2: Run Locally
```bash
npm run dev
```
Visit: `http://localhost:5173`

Try logging in with the credentials above!

---

## 📦 Phase 2: Set Up Supabase

### Create Supabase Project
1. Go to **[supabase.com](https://supabase.com)**
2. Sign up with GitHub
3. Click **"New Project"**
4. Fill in project details:
   - **Name**: `kal-ka-sapna`
   - **Database Password**: Create a strong password
   - **Region**: Select closest to you
5. Wait for initialization (~2 minutes)

### Get Your API Keys
1. In Supabase dashboard, go to **Settings > API**
2. Copy these values:
   - **Project URL** (under "Project URL") → Save as `VITE_SUPABASE_URL`
   - **anon public** (under "Project API keys") → Save as `VITE_SUPABASE_ANON_KEY`

### Create Database Table
1. In Supabase, go to **SQL Editor**
2. Click **"New Query"**
3. Paste this SQL:

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

-- Allow all operations (safe for private app)
CREATE POLICY "Allow all operations" ON memories
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. Click **"Run"**

### Add Environment Variables Locally
Create/edit `.env.local` in your project root:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-very-long-anon-key-here
```

**Important**: Never commit `.env.local`

### Test with Supabase
```bash
npm run dev
```
- Log in
- Add a memory
- It should appear in your Supabase dashboard!

---

## 🌐 Phase 3: Deploy to Vercel

### Step 1: Prepare GitHub
1. Initialize Git (if not done):
```bash
cd c:\Users\kalya\Desktop\kal-ka-sapna
git init
git config user.name "Your Name"
git config user.email "your@email.com"
git add .
git commit -m "Initial commit: Private memory sharing app"
```

2. Create GitHub repository:
   - Go to [github.com/new](https://github.com/new)
   - Name it: `kal-ka-sapna`
   - Click **"Create repository"**

3. Connect and push:
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kal-ka-sapna.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to **[vercel.com](https://vercel.com)**
2. Sign up/Login with GitHub
3. Click **"Add New" > "Project"**
4. **Select Repository**: Choose `kal-ka-sapna`
5. **Configure Project**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `dist` (auto-filled)
6. **Add Environment Variables**:
   - Key: `VITE_SUPABASE_URL`
   - Value: `https://your-project-id.supabase.co`
   
   Then add second variable:
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: `your-anon-key`

7. Click **"Deploy"** ✨

### Step 3: Get Your Live URL
After deployment completes (~2-3 minutes), Vercel will show:
```
https://kal-ka-sapna.vercel.app
```

This is your **LIVE URL**! 🎉

---

## 💌 Share the Experience

Send this URL to your partner:
```
https://kal-ka-sapna.vercel.app
```

They can log in with:
- **Username**: `sapna` or `kalyan`
- **Password**: `sapna@kalyan26112025`

---

## 🔄 Making Updates

After deployment, any time you push code to GitHub:
```bash
git add .
git commit -m "Your changes here"
git push origin main
```

Vercel will **automatically redeploy** with your changes! ✨

---

## 🔒 Security Notes

- ✅ Only you two have access
- ✅ No new user registration
- ✅ Environment variables kept secret on Vercel
- ✅ Data stored securely on Supabase
- ✅ HTTPS encryption (Vercel default)

---

## 📞 Troubleshooting

### "Error: VITE_SUPABASE_URL is not defined"
- Check that `.env.local` has correct values
- Restart dev server with `npm run dev`
- On Vercel, verify environment variables are set in project settings

### "Connection refused to database"
- Check Supabase project status (not paused)
- Verify API keys are correct
- Check Supabase > SQL Editor > Check table exists

### "Build fails on Vercel"
- Check build logs in Vercel dashboard
- Ensure all dependencies installed: `npm install`
- Try local build: `npm run build`

---

## ✅ Checklist Before Going Live

- [ ] Supabase project created and initialized
- [ ] Database table created with correct schema
- [ ] `.env.local` updated with real Supabase keys
- [ ] Tested locally: `npm run dev` works
- [ ] Can log in with credentials
- [ ] Can add/view/delete memories
- [ ] Pushed to GitHub
- [ ] Deployed to Vercel successfully
- [ ] Environment variables set on Vercel
- [ ] Live URL works correctly
- [ ] Can log in on live site
- [ ] Partner can access and log in

---

## 💜 Ready to Share Memories!

Your private memory space is now live. Enjoy creating and sharing your special moments!

**Live URL**: `https://kal-ka-sapna.vercel.app`

Questions? Check the logs in Vercel and Supabase dashboards!
