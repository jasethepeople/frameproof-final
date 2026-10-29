import { createAdminClient } from "@/lib/supabase/server";
import { createPresignedDownloadUrl } from "@/lib/s3";
import { ReviewClient } from "./ReviewClient";
export default async function ReviewPage({params}:{params:{shareToken:string}}){
  const admin=createAdminClient();
  const {data:link}=await admin.from("share_links").select("*, videos(*)").eq("share_token",params.shareToken).eq("is_active",true).single();
  if(!link) return <div className="p-10">Invalid or expired link</div>;
  const videoUrl=await createPresignedDownloadUrl(link.videos.storage_key);
  return <ReviewClient videoUrl={videoUrl} video={link.videos} shareToken={params.shareToken} />;
}
