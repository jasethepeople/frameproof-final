import { z } from "zod";
export const CommentSchema = z.object({
  video_id: z.string().uuid(),
  timestamp_seconds: z.number().min(0),
  frame_number: z.number().int().min(0),
  author_name: z.string().min(1).max(100),
  author_email: z.string().email().optional(),
  text_content: z.string().min(1).max(2000),
  annotation_json: z.any().optional(),
  share_token: z.string().min(10)
});
export const UploadRequestSchema = z.object({
  project_id: z.string().uuid(),
  filename: z.string(),
  contentType: z.string(),
  size: z.number().max(2147483648)
});
