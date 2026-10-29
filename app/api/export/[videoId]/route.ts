import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { generateFCPXML, generatePremiereCSV } from "@/lib/nle-export";
export async function GET(req: NextRequest, {params}:{params:{videoId:string}}){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
  const {data:profile}=await supabase.from("profiles").select("plan_tier").eq("id",user.id).single();
  if(profile?.plan_tier==="free") return NextResponse.json({error:"Pro feature"}, {status:403});
  const admin=createAdminClient();
  const {data:video}=await admin.from("videos").select("*, projects!inner(owner_id, title)").eq("id",params.videoId).single();
  if(!video || (video.projects as any).owner_id!==user.id) return NextResponse.json({error:"Not found"},{status:404});
  const {data:comments}=await admin.from("comments").select("*").eq("video_id",params.videoId).order("timestamp_seconds");
  const format=req.nextUrl.searchParams.get("format")||"fcpxml";
  if(format==="csv"){
    const csv=generatePremiereCSV((comments||[]) as any, video.fps||24);
    return new NextResponse(csv,{headers:{"Content-Type":"text/csv","Content-Disposition":`attachment; filename="${(video.projects as any).title}-markers.csv"`}});
  }
  const xml=generateFCPXML((comments||[]) as any, {duration_seconds:video.duration_seconds||0, fps:video.fps||24, resolution:video.resolution||"1920x1080", filename:video.original_filename});
  return new NextResponse(xml,{headers:{"Content-Type":"application/xml","Content-Disposition":`attachment; filename="${(video.projects as any).title}-markers.fcpxml"`}});
}
