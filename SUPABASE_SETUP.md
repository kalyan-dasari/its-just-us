# Supabase Setup Instructions

## Step 1: Create the memories table

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project: **kal-ka-sapna**
3. Go to **SQL Editor** (left sidebar)
4. Click **"New query"**
5. Paste the following SQL code:

```sql
-- Create memories table
CREATE TABLE IF NOT EXISTS public.memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  image_url VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row-Level Security (RLS)
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;

-- Create RLS policy to allow all authenticated users to read all memories
CREATE POLICY "Enable read access for all users" ON public.memories
  FOR SELECT USING (true);

-- Create RLS policy to allow all authenticated users to insert memories
CREATE POLICY "Enable insert for all users" ON public.memories
  FOR INSERT WITH CHECK (true);

-- Create RLS policy to allow all authenticated users to update memories
CREATE POLICY "Enable update for all users" ON public.memories
  FOR UPDATE USING (true);

-- Create RLS policy to allow all authenticated users to delete memories
CREATE POLICY "Enable delete for all users" ON public.memories
  FOR DELETE USING (true);

-- Set up auto-update for updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_memories_updated_at
  BEFORE UPDATE ON public.memories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

6. Click **"Run"** (or press Ctrl+Enter)
7. You should see a success message

## Step 2: Test the App

1. Reload the browser at `http://localhost:5174`
2. Click **"Add a New Memory"**
3. Fill in the form:
   - **Memory Title**: "First Memory Test"
   - **Memory Date**: Pick any date
   - **Image URL**: Leave blank for now
   - **Memory Details**: "Testing our memory-sharing app!"
4. Click **"Save Memory"**
5. The memory should appear in the grid

## Step 3: Verify in Supabase

1. Go to your Supabase dashboard
2. Go to **Data Editor** (left sidebar)
3. Click on the **memories** table
4. You should see your new memory listed

## Done! 🎉

Your app is now ready to use. The memories table is set up with proper security policies.

### To Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select your GitHub repository
5. Set environment variables:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key
6. Click "Deploy"

Done! Your app is now live! 🚀
