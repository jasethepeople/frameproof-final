export function secondsToTimecode(seconds: number, fps: number): string {
  const isDrop = Math.abs(fps - 29.97) < 0.01 || Math.abs(fps - 23.976) < 0.01;
  const totalFrames = Math.round(seconds * fps);
  const frame = totalFrames % Math.round(fps);
  const totalSeconds = Math.floor(totalFrames / fps);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}:${String(frame).padStart(2,'0')}${isDrop ? '' : ''}`;
}
export const getFrameStep = (fps: number) => 1 / fps;
export const frameToSeconds = (frame: number, fps: number) => frame / fps;
export const fpsToFCPDuration = (fps: number) => {
  if (Math.abs(fps - 23.976) < 0.01) return "1001/24000s";
  if (Math.abs(fps - 29.97) < 0.01) return "1001/30000s";
  if (Math.abs(fps - 59.94) < 0.01) return "1001/60000s";
  return `1/${Math.round(fps)}s`;
};
