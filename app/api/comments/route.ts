import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { CommentSchema } from "@/lib/validations";
import { sanitizeComment } from "@/lib/sanitize";
export async function POST(req: NextRequest){
  const body=await req.json();
  const parsed=CommentSchema.safeParse(body);
  if(!parsed.success) return NextResponse.json({error:"Invalid"}, {status:400});
  const admin=createAdminClient();
  const {data:link}=await admin.from("share_links").select("video_id").eq("share_token",parsed.data.share_token).eq("is_active",true).single();
  if(!link || link.video_id!==parsed.data.video_id) return NextResponse.json({error:"Invalid token"}, {status:403});
  const clean=sanitizeComment(parsed.data.text_content);
  const {data,error}=await admin.from("comments").insert({...parsed.data, text_content:clean}).select().single();
  if(error) return NextResponse.json({error:error.message},{status:500});
  return NextResponse.json(data);
}
export async function GET(req: NextRequest){
  const videoId=req.nextUrl.searchParams.get("videoId");
  const admin=createAdminClient();
  const {data}=await admin.from("comments").select("*").eq("video_id",videoId).order("timestamp_seconds");
  return NextResponse.json(data);
}
