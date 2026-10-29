"use client";
import { useState } from "react";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { AnnotationPath } from "@/components/player/AnnotationCanvas";
export function ReviewClient({videoUrl, video, shareToken}:{videoUrl:string; video:any; shareToken:string;}){
  const [activeAnnotation,setActiveAnnotation]=useState<AnnotationPath[]|undefined>(undefined);
  const [currentTime,setCurrentTime]=useState(0);
  const [currentPaths,setCurrentPaths]=useState<AnnotationPath[]>([]);
  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col lg:flex-row">
      <div className="flex-1 p-4">
        <VideoPlayer src={videoUrl} fps={video.fps||24} activeAnnotation={activeAnnotation} onComment={async (t,f,p)=>{ setCurrentTime(t); setCurrentPaths(p); (document.getElementById('comment-input') as HTMLTextAreaElement)?.focus(); }} />
        <div className="mt-4 text-center text-xs opacity-40">Powered by <a href="/?ref=badge" className="underline">FrameProof</a></div>
      </div>
      <div className="w-full lg:w-[400px] border-l border-white/10 bg-[#0A0A0A]"><div className="p-4">Client Review UI - use /api/comments with shareToken {shareToken}</div></div>
    </div>
  );
}
