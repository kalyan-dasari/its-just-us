# Deployment Checklist for Vercel

Before deploying to Vercel, make sure you have:

## ✅ Pre-Deployment Checklist

- [ ] Supabase project created and initialized
- [ ] Database table `memories` created with proper schema
- [ ] `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` obtained from Supabase
- [ ] `.env.local` updated with Supabase credentials
- [ ] Tested locally with `npm run dev`
- [ ] All features working (login, add memory, view, delete)
- [ ] Project pushed to GitHub
- [ ] Vercel connected to GitHub account

## 🚀 Deployment Steps

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - Framework: Vite
   - Build: `npm run build`
   - Output: `dist`
5. Add environment variables in Vercel dashboard
6. Click "Deploy"

## 📧 Live URL

After deployment, Vercel will provide a URL like:
```
https://your-project.vercel.app
```

Share this link with your partner!

## 🔄 Updates

After deployment, any push to your GitHub main branch will automatically redeploy your app.

## 📞 Support

If you encounter issues:
- Check Supabase logs
- Check Vercel build logs
- Ensure environment variables are set correctly
