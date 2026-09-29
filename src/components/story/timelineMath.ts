export const clamp = (value: number) => Math.max(0, Math.min(1, value));
export const smooth = (value: number) => { const p = clamp(value); return p * p * (3 - 2 * p); };
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
/** Copy hands off at one boundary; the visual field continues moving throughout. */
export function captionOpacity(progress: number, index: number, stops: readonly number[], lead: number) {
  const start = stops[index] - lead, end = (stops[index + 1] ?? 1.1) - lead;
  return (index === 0 ? 1 : smooth((progress - start) / .012)) * (1 - smooth((progress - end + .012) / .012));
}
export type FilmShape = { x: number; y: number; w: number; h: number; alpha: number; round: number };
export function blendShape(a: FilmShape, b: FilmShape, p: number): FilmShape {
  return { x: mix(a.x,b.x,p), y: mix(a.y,b.y,p), w: mix(a.w,b.w,p), h: mix(a.h,b.h,p), alpha: mix(a.alpha,b.alpha,p), round: mix(a.round,b.round,p) };
}
export const WORLD_STOPS = [0, .12, .22, .31, .4, .49, .58, .68, .78, .88, 1];
export function worldShape(index: number, phase: number, compact = false): FilmShape {
  const column = index % 3, row = Math.floor(index / 3), angle = index / 12 * Math.PI * 2;
  if (compact && (phase === 6 || phase === 7)) return { x:3+(index%2)*49,y:3+Math.floor(index/2)*16,w:45,h:14,alpha:1,round:2 };
  switch (phase) {
    case 0: return { x:52+Math.cos(angle)*24,y:44+Math.sin(angle)*30,w:1.4,h:1.4,alpha:.25,round:50 };
    case 1: return { x:12+(index%2)*39,y:8+Math.floor(index/2)*13,w:35,h:9,alpha:.8,round:2 };
    case 2: return { x:7+column*30,y:12+row*19,w:25,h:13,alpha:1,round:2 };
    case 3: return { x:9+index*7,y:80-[20,38,55,31,65,43,29,49,58,37,62,46][index],w:4.8,h:[20,38,55,31,65,43,29,49,58,37,62,46][index],alpha:1,round:0 };
    case 4: return { x:13+column*31,y:25+row*13,w:24,h:8,alpha:.85,round:2 };
    case 5: return { x:49+Math.cos(angle)*45,y:48+Math.sin(angle)*43,w:2,h:2,alpha:.45,round:50 };
    case 6: return { x:7+column*31,y:8+row*23,w:24,h:14,alpha:1,round:2 };
    case 7: return { x:7+column*31,y:8+row*23,w:24,h:14,alpha:1,round:2 };
    case 8: return { x:12+(index%2)*44,y:7+Math.floor(index/2)*16,w:33,h:11,alpha:index<5?1:.08,round:2 };
    case 9: return { x:50+Math.cos(angle)*37,y:49+Math.sin(angle)*37,w:1.5,h:1.5,alpha:.8,round:50 };
    default:return { x:8+index*7.2,y:50,w:1.8,h:1.8,alpha:.6,round:50 };
  }
}
export function filmSegment(progress: number, stops: readonly number[]) {
  const next = stops.findIndex(stop => stop > progress);
  const index = next < 0 ? stops.length - 2 : Math.max(0,next - 1);
  return { index, fraction: smooth((progress - stops[index]) / (stops[index + 1] - stops[index])) };
}
