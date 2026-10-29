import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
export default async function Dashboard(){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) return <div className="p-10"><Link href="/login">Login</Link></div>;
  const {data:projects}=await supabase.from("projects").select("*").eq("owner_id",user.id);
  return <div className="p-10 max-w-5xl mx-auto"><h1 className="text-3xl font-black">Projects</h1><div className="mt-6 grid gap-4">{projects?.map(p=><Link key={p.id} href={`/dashboard/${p.id}`} className="p-6 border border-white/10 rounded-xl bg-white/[0.03]">{p.title}</Link>)}</div></div>;
}
