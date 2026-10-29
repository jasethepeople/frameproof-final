import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createPresignedUploadUrl } from "@/lib/s3";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
const ratelimit = new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(10, "1 m") });
export async function POST(req: NextRequest){
  const ip=req.headers.get("x-forwarded-for")??"127.0.0.1";
  const {success}=await ratelimit.limit(`upload:${ip}`);
  if(!success) return NextResponse.json({error:"Rate limited"}, {status:429});
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) return NextResponse.json({error:"Unauthorized"}, {status:401});
  const {filename, contentType}=await req.json();
  const key=`uploads/${user.id}/${Date.now()}-${filename}`;
  const url=await createPresignedUploadUrl(key, contentType);
  return NextResponse.json({url,key});
}
