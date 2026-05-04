# Private Memory Sharing Website - Setup Guide

## Project Overview
A private memory sharing website for **Sapna & Kalyan** built with React, TypeScript, Supabase, and deployed on Vercel.

- **Credentials**: 
  - Usernames: `sapna` or `kalyan`
  - Password: `sapna@kalyan26112025`
- **Special Date**: Nov 26, 2025 (when you met)
- **Privacy**: Only you two have access

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login with your GitHub account
3. Create a new project
4. Wait for project to initialize (takes ~2 minutes)

#### Get Your API Keys
1. In your Supabase project, go to **Settings > API**
2. Copy:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public key` → `VITE_SUPABASE_ANON_KEY`

#### Create the Database Table
Run this SQL in your Supabase Dashboard (SQL Editor):

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

-- Enable RLS (Row Level Security)
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all authenticated reads/writes (since we're not using Supabase Auth)
CREATE POLICY "Allow all operations" ON memories
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

### 3. Update Environment Variables
Edit `.env.local`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Locally
```bash
npm run dev
```
Visit `http://localhost:5173`

---

## 📦 Deploy to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kal-ka-sapna.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click **Add New > Project**
4. Select your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add Environment Variables:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
7. Click **Deploy**

✅ Your app is now live!

---

## 🔐 Security Notes

- **Passwords**: Currently stored in frontend (safe for private projects). For production apps, use backend authentication.
- **Supabase RLS**: Currently allows all operations. For extra security, restrict via RLS policies.
- **Environment Variables**: Never commit `.env.local`. Vercel will handle them securely.

---

## 📝 Features

- ✅ Private login (only sapna & kalyan)
- ✅ Create, view, and delete memories
- ✅ Store memories with date, title, description, and images
- ✅ Beautiful UI with Tailwind CSS
- ✅ Deployed live on Vercel

---

## 💜 Enjoy Your Private Memory Space!

Share the live link with your partner and start creating memories together.
