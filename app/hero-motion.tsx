'use client';
import { useEffect,useRef } from 'react';
export function HeroMotion({children}:{children:React.ReactNode}){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const element=root.current;if(!element)return;
  const enabled=window.matchMedia('(prefers-reduced-motion: no-preference)');
  let frame=0;let visible=true;
  const paint=()=>{frame=0;if(!enabled.matches||!visible)return;const bounds=element.getBoundingClientRect();const progress=Math.min(Math.max(-bounds.top,0),bounds.height);const mobile=window.innerWidth<=800;element.style.setProperty('--portrait-shift',`${Math.min(progress*(mobile?.075:.23),mobile?38:110).toFixed(1)}px`);element.style.setProperty('--quote-shift',`${-Math.min(progress*(mobile?.025:.11),mobile?14:52).toFixed(1)}px`)};
  const schedule=()=>{if(enabled.matches&&visible&&!frame)frame=requestAnimationFrame(paint)};
  const reset=()=>{if(frame)cancelAnimationFrame(frame);frame=0;element.style.removeProperty('--portrait-shift');element.style.removeProperty('--quote-shift');schedule()};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)schedule()});observer.observe(element);
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});enabled.addEventListener('change',reset);schedule();
  return()=>{window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);enabled.removeEventListener('change',reset);observer.disconnect();if(frame)cancelAnimationFrame(frame);element.style.removeProperty('--portrait-shift');element.style.removeProperty('--quote-shift')};
 },[]);
 return <div className="heroStage" ref={root}>{children}</div>
}
