"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { sanitizeComment } from "@/lib/sanitize";
export function CommentSidebar({ videoId, shareToken, onSeek, onSelectAnnotation }: { videoId: string; shareToken: string; onSeek: (s:number)=>void; onSelectAnnotation: (a:any)=>void; }){
  const [comments,setComments]=useState<any[]>([]); const [name,setName]=useState(""); const [text,setText]=useState("");
  const supabase=createClient();
  useEffect(()=>{
    const saved=localStorage.getItem("frameproof_name"); if(saved) setName(saved);
    supabase.from("comments").select("*").eq("video_id",videoId).order("timestamp_seconds").then(({data})=>{ if(data) setComments(data); });
    const ch=supabase.channel(`video-${videoId}`).on('postgres_changes',{event:'INSERT',schema:'public',table:'comments',filter:`video_id=eq.${videoId}`},p=>setComments(prev=>[...prev,p.new as any].sort((a,b)=>a.timestamp_seconds-b.timestamp_seconds))).subscribe();
    return()=>{ supabase.removeChannel(ch); };
  },[videoId]);
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-white/10 font-bold">Comments ({comments.length})</div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {comments.map(c=><button key={c.id} onClick={()=>{onSeek(c.timestamp_seconds); onSelectAnnotation(c.annotation_json?.paths);}} className="w-full text-left p-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/5"><div className="text-xs opacity-50">{new Date(c.timestamp_seconds*1000).toISOString().substr(11,8)} - {c.author_name}</div><div className="text-sm mt-1">{c.text_content}</div></button>)}
      </div>
      <div className="p-3 border-t border-white/10 space-y-2">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full bg-white/10 rounded px-3 py-2 text-sm"/>
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Leave feedback at current frame..." className="w-full bg-white/10 rounded px-3 py-2 text-sm h-20"/>
        <button onClick={async()=>{ if(!name||!text) return; localStorage.setItem("frameproof_name",name); const clean=sanitizeComment(text); const res=await fetch("/api/comments",{method:"POST",body:JSON.stringify({video_id:videoId, share_token:shareToken, author_name:name, text_content:clean, timestamp_seconds:0, frame_number:0})}); if(res.ok){ setText(""); } }} className="w-full bg-white text-black rounded-full py-2 font-bold text-sm">Post Comment</button>
      </div>
    </div>
  );
}
