import { createServerClient } from "@supabase/ssr"; import { cookies } from "next/headers"; import { createClient as createAdmin } from "@supabase/supabase-js";
export async function createClient(){
  const cookieStore = cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { cookies: { get(name: string){ return cookieStore.get(name)?.value; } } });
}
export function createAdminClient(){
  return createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { autoRefreshToken: false, persistSession: false } });
}
