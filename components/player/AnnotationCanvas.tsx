"use client";
import { useRef, useState } from "react";
export type AnnotationPath={ tool:'pen'|'rect'|'arrow'; color:string; points:[number,number][]; };
export function AnnotationCanvas({ paths, setPaths, onDrawStart, isDrawing, setIsDrawing }: any){
  const canvasRef=useRef<HTMLCanvasElement>(null); const [tool,setTool]=useState<'pen'|'rect'|'arrow'>('pen'); const [color,setColor]=useState('#FF3B30');
  const getPos=(e:React.MouseEvent)=>{ const r=canvasRef.current!.getBoundingClientRect(); return [((e.clientX-r.left)/r.width)*100, ((e.clientY-r.top)/r.height)*100] as [number,number]; };
  const down=(e:React.MouseEvent)=>{ onDrawStart(); const p=getPos(e); setPaths((prev:AnnotationPath[])=>[...prev,{tool,color,points:[p]}]); };
  const move=(e:React.MouseEvent)=>{ if(!isDrawing) return; const p=getPos(e); setPaths((prev:AnnotationPath[])=>{ const c=[...prev]; c[c.length-1].points.push(p); return c; }); };
  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">{paths.map((pa:AnnotationPath,i:number)=><polyline key={i} points={pa.points.map(p=>`${p[0]}%,${p[1]}%`).join(' ')} fill="none" stroke={pa.color} strokeWidth="3" />)}</svg>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" onMouseDown={down} onMouseMove={move} onMouseUp={()=>setIsDrawing(false)} onMouseLeave={()=>setIsDrawing(false)} />
      <div className="absolute top-3 left-3 flex gap-2 bg-black/50 p-2 rounded-full">{(['pen','rect','arrow'] as const).map(t=><button key={t} onClick={()=>setTool(t)} className={`px-2 py-1 rounded text-xs ${tool===t?'bg-white text-black':'text-white'}`}>{t}</button>)}<input type="color" value={color} onChange={e=>setColor(e.target.value)} className="w-6 h-6 rounded-full"/><button onClick={()=>setPaths([])} className="text-white text-xs px-2">Clear</button></div>
    </div>
  );
}
