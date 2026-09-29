import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { createSystemSculpture } from './createSystemSculpture';

const steps = ['Input', 'Structure', 'Logic', 'Application', 'Result'];
const notes = ['Many moving parts. One possibility.', 'Turn scattered information into a dependable foundation.', 'Connect the parts. Make the system understandable.', 'Give the information a useful interface.', 'Complexity resolved. Ready for the real world.'];
type Sculpture = ReturnType<typeof createSystemSculpture>;

export function SystemLens({ onInteract }: { onInteract: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  const engine = useRef<Sculpture | null>(null);
  const selected = useRef(0);
  const manual = useRef(false);
  const [step,setStep] = useState(0);
  useEffect(() => {
    const element = host.current;
    if(!element) return;
    let cancelled = false, frame = 0;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const render = () => {
      frame=0;
      if(manual.current || preference.matches || document.hidden || element.closest('[inert]')) return;
      const hero=element.closest('.studio-hero');
      if(!hero)return;
      const value=Math.max(0,Math.min(4,-hero.getBoundingClientRect().top/(hero.clientHeight*.8)*4));
      if(value===selected.current)return;
      selected.current=value;engine.current?.setPhase(value);setStep(Math.round(value));
    };
    const schedule = () => {if(!frame)frame=requestAnimationFrame(render);};
    void import('./createSystemSculpture').then(({createSystemSculpture})=>{
      if(cancelled)return;
      engine.current=createSystemSculpture(element);engine.current.setPhase(selected.current);
    }).catch(()=>{element.dataset.renderer='fallback';});
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    return ()=>{cancelled=true;cancelAnimationFrame(frame);engine.current?.dispose();engine.current=null;window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
  },[]);
  return <div className="system-lens" data-step={step}>
    <div className="sculpture-caption"><span>THE SYSTEM LENS</span><span>FORM / 0{step+1}</span></div>
    <div className="sculpture-stage" ref={host} aria-hidden="true" onPointerMove={event=>{if(event.pointerType==='touch')return;const rect=event.currentTarget.getBoundingClientRect();engine.current?.setPointer((event.clientX-rect.left)/rect.width*2-1,(event.clientY-rect.top)/rect.height*2-1);}} onPointerLeave={()=>engine.current?.setPointer(0,0)} onPointerCancel={()=>engine.current?.setPointer(0,0)}>
      <div className="sculpture-fallback">{Array.from({length:32},(_,i)=><i key={i} style={{'--rib':i} as CSSProperties}/>)}</div>
    </div>
    <div className="lens-controls" role="group" aria-label="Explore the system transformation">{steps.map((label,index)=><button key={label} aria-pressed={step===index} onClick={()=>{manual.current=true;selected.current=index;engine.current?.setPhase(index);setStep(index);onInteract();}}><span>0{index+1}</span>{label}</button>)}</div>
    <p className="lens-description" aria-live="polite">{notes[step]}</p>
  </div>;
}
