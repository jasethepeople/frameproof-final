"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { secondsToTimecode, getFrameStep } from "@/lib/timecode";
import { AnnotationCanvas, AnnotationPath } from "./AnnotationCanvas";
export function VideoPlayer({ src, fps=24, onComment, activeAnnotation }: { src: string; fps: number; onComment: (time:number, frame:number, paths:AnnotationPath[])=>void; activeAnnotation?: AnnotationPath[]; }) {
  const videoRef=useRef<HTMLVideoElement>(null);
  const [time,setTime]=useState(0); const [isPlaying,setIsPlaying]=useState(false);
  const [paths,setPaths]=useState<AnnotationPath[]>([]); const [isDrawing,setIsDrawing]=useState(false);
  const frameStep=getFrameStep(fps); const currentFrame=Math.round(time*fps);
  const togglePlay=useCallback(()=>{ if(!videoRef.current) return; videoRef.current.paused?videoRef.current.play():videoRef.current.pause(); },[]);
  useEffect(()=>{
    const h=(e:KeyboardEvent)=>{ if(e.target instanceof HTMLInputElement) return; const v=videoRef.current; if(!v) return;
      if(e.code==="Space"){e.preventDefault(); togglePlay();} if(e.code==="KeyJ") v.currentTime=Math.max(0,v.currentTime-5);
      if(e.code==="KeyL") v.currentTime=Math.min(v.duration,v.currentTime+5); if(e.code==="KeyK") togglePlay();
      if(e.code==="ArrowLeft"){e.preventDefault(); v.currentTime=e.shiftKey?v.currentTime-1:v.currentTime-frameStep;}
      if(e.code==="ArrowRight"){e.preventDefault(); v.currentTime=e.shiftKey?v.currentTime+1:v.currentTime+frameStep;}
    }; window.addEventListener("keydown",h); return()=>window.removeEventListener("keydown",h);
  },[frameStep,togglePlay]);
  useEffect(()=>{ const v=videoRef.current; if(!v) return; const u=()=>setTime(v.currentTime); const p=()=>setIsPlaying(true); const pa=()=>setIsPlaying(false);
    v.addEventListener("timeupdate",u); v.addEventListener("play",p); v.addEventListener("pause",pa); return()=>{v.removeEventListener("timeupdate",u); v.removeEventListener("play",p); v.removeEventListener("pause",pa);}; },[]);
  return (
    <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
      <video ref={videoRef} src={src} className="w-full h-full" crossOrigin="anonymous" playsInline />
      <AnnotationCanvas paths={activeAnnotation||paths} setPaths={setPaths} isDrawing={isDrawing} setIsDrawing={setIsDrawing} onDrawStart={()=>{videoRef.current?.pause(); setIsDrawing(true);}} />
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 flex justify-between text-white">
        <div className="flex items-center gap-3"><button onClick={togglePlay} className="p-2 bg-white/20 rounded-full">{isPlaying?"❚❚":"▶"}</button><span className="font-mono text-sm">{secondsToTimecode(time,fps)} | F:{currentFrame}</span></div>
        <button onClick={()=>{onComment(time,currentFrame,paths); setPaths([]);}} className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold">Comment at this frame</button>
      </div>
    </div>
  );
}
