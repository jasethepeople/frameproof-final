import { createClient } from "@/lib/supabase/server";
export default async function ProjectPage({params}:{params:{projectId:string}}){
  const supabase=await createClient();
  const {data:videos}=await supabase.from("videos").select("*").eq("project_id",params.projectId).order("version_number",{ascending:false});
  return <div className="p-10"><h1 className="text-2xl font-bold">Versions</h1><div className="mt-4 space-y-2">{videos?.map(v=><div key={v.id} className="p-4 border border-white/10 rounded-xl flex justify-between"><span>{v.original_filename} v{v.version_number}</span><a href={`/api/export/${v.id}`} className="text-xs bg-white text-black px-3 py-1 rounded-full">Export Markers</a></div>)}</div></div>;
}
