# FrameProof - Production Build
1. npm install
2. cp .env.example .env.local and fill keys
3. Run supabase/migrations/0001_initial.sql in Supabase SQL Editor
4. Enable Realtime for comments table in Supabase Dashboard
5. npm run dev
6. npm run build to verify zero errors

Deployment: Vercel + Supabase + S3/R2 + Stripe + Upstash Redis
