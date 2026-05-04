-- ✅ RUN THIS SQL IN YOUR SUPABASE DASHBOARD

-- STEP 1: Copy everything below
-- STEP 2: Go to https://supabase.com/dashboard
-- STEP 3: Open your project (kal-ka-sapna)
-- STEP 4: Click "SQL Editor" on the left
-- STEP 5: Click "New Query"
-- STEP 6: Paste this SQL and click "RUN"

-- ============================================

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

-- Create policy to allow all operations (safe for private app)
CREATE POLICY "Allow all operations" ON memories
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================

-- After running this:
-- 1. Go back to your app (http://localhost:5173)
-- 2. Refresh the page
-- 3. Try adding a memory - it should work now! ✅

-- If you get an error like "policy already exists", 
-- just ignore it and refresh your app anyway.
