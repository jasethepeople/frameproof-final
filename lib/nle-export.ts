import { secondsToTimecode, fpsToFCPDuration } from "./timecode";
export type ExportComment = { id: string; timestamp_seconds: number; frame_number: number; author_name: string; text_content: string; annotation_json?: any; };
function esc(s: string){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
export function generateFCPXML(comments: ExportComment[], meta: { duration_seconds: number; fps: number; resolution: string; filename: string; }){
  const [w,h]=meta.resolution.split('x'); const fps=meta.fps; const fd=fpsToFCPDuration(fps);
  const dur=`${Math.round(meta.duration_seconds*fps)}/${Math.round(fps)}s`;
  const markers=comments.sort((a,b)=>a.timestamp_seconds-b.timestamp_seconds).map(c=>{
    const start=`${Math.round(c.timestamp_seconds*fps)}/${Math.round(fps)}s`; const tc=secondsToTimecode(c.timestamp_seconds,fps); const safe=esc(c.text_content);
    return `<marker start="${start}" duration="${fd}" value="${safe}"><note>${esc(tc)} - ${esc(c.author_name)}: ${safe}</note></marker>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE fcpxml><fcpxml version="1.10"><resources><format id="r1" name="FFVideoFormat${w}x${h}" frameDuration="${fd}" width="${w}" height="${h}"/></resources><library><event name="FrameProof"><project name="${esc(meta.filename)}"><sequence format="r1" duration="${dur}" tcStart="0s" tcFormat="NDF"><spine><asset-clip name="${esc(meta.filename)}" duration="${dur}" format="r1">${markers}</asset-clip></spine></sequence></project></event></library></fcpxml>`;
}
export function generatePremiereCSV(comments: ExportComment[], fps: number){
  return "Marker Name,Description,In,Out,Type\n"+comments.map(c=>`"${secondsToTimecode(c.timestamp_seconds,fps)}","${c.author_name}: ${c.text_content.replace(/"/g,'""')}",${secondsToTimecode(c.timestamp_seconds,fps)},${secondsToTimecode(c.timestamp_seconds,fps)},Comment`).join("\n");
}
