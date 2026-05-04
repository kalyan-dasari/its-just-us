# 🎯 Quick Reference Guide

## 🔐 Access Credentials

```
USERNAMES: sapna OR kalyan
PASSWORD:  sapna@kalyan26112025
```

**Special Date**: Nov 26, 2025 💜

## 📍 Important URLs

### Local Development
```
http://localhost:5173
```

### After Deployment (Vercel)
```
https://kal-ka-sapna.vercel.app
(This will be your live URL)
```

### Supabase Dashboard
```
https://supabase.com/dashboard/projects
```

### Vercel Dashboard
```
https://vercel.com/dashboard
```

---

## ⚡ Quick Commands

```bash
# Start local development
npm run dev

# Build for production
npm run build

# Install dependencies
npm install
```

---

## 🚀 Deployment Steps (Summary)

1. **Set up Supabase**
   - Create account at supabase.com
   - Create new project
   - Get API keys
   - Create `memories` table
   - Update `.env.local`

2. **Test Locally**
   - Run `npm run dev`
   - Test login and add memories

3. **Deploy to Vercel**
   - Push code to GitHub
   - Connect repo to Vercel
   - Add environment variables
   - Deploy!

---

## 📋 Supabase Table Schema

```sql
CREATE TABLE memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  image_url VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔑 Environment Variables

**Local** (`.env.local`):
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Vercel** (Set in project settings):
- Same variable names as above
- Values from Supabase

---

## 📁 Project Structure

```
kal-ka-sapna/
├── src/
│   ├── app/
│   │   └── App.tsx              # Main app component
│   ├── pages/
│   │   ├── Login.tsx            # Login page
│   │   └── Home.tsx             # Home/dashboard
│   ├── components/
│   │   ├── MemoryCard.tsx       # Memory display
│   │   └── MemoryForm.tsx       # Add memory form
│   ├── context/
│   │   └── AuthContext.tsx      # Auth management
│   ├── hooks/
│   │   └── useMemories.ts       # Supabase hook
│   ├── lib/
│   │   └── supabase.ts          # Supabase config
│   ├── styles/
│   │   └── index.css            # Tailwind CSS
│   └── main.tsx                 # Entry point
├── index.html                   # HTML entry
├── vite.config.ts               # Vite config
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies
├── .env.local                   # Environment (local)
├── .env.example                 # Environment template
├── vercel.json                  # Vercel config
└── README.md                    # This file
```

---

## ✅ Pre-Deployment Checklist

- [ ] `.env.local` has Supabase credentials
- [ ] `npm run dev` works locally
- [ ] Can login with credentials
- [ ] Can add/view memories
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables set on Vercel
- [ ] Deployment successful
- [ ] Live URL accessible
- [ ] Partner can login and use app

---

## 💡 Tips

- **Lost Supabase keys?** Go to Supabase > Settings > API
- **Build fails?** Check `npm run build` locally first
- **Memories not saving?** Check Supabase connection + table exists
- **Auto-deploy not working?** Check GitHub connection in Vercel

---

## 📞 Help

- Supabase docs: https://supabase.com/docs
- Vercel docs: https://vercel.com/docs
- React docs: https://react.dev
- Tailwind docs: https://tailwindcss.com/docs

---

**Ready to go live! 🚀💜**
