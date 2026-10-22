'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
export function PageMotion(){
 const pathname=usePathname();
 useEffect(()=>{
  if(pathname.startsWith('/studio')||pathname.startsWith('/admin'))return;
  const preference=window.matchMedia('(prefers-reduced-motion: no-preference)');
  const revealSelector='.referenceCare>div,.referenceCareItem,.referenceArticles>div,.referenceArticle,.pageBody>.split>*,.expertiseList>a,.articleTile,.videoCard,.resourceFaq';
  const layerSelector='.referencePortrait,.referenceCare>div:first-child,.referenceCareItem,.referenceArticles>div:first-child,.referenceArticle,.pageHero>.eyebrow,.pageHero>.pageLead,.aboutPhoto,.expertiseList>a,.articleTile,.videoCard,.testimonialCard,.articleCover,.contactColumns>div';
  let revealItems:HTMLElement[]=[];let layers:HTMLElement[]=[];let refreshFrame=0;
  let revealObserver:IntersectionObserver|undefined;let depthObserver:IntersectionObserver|undefined;let resizeObserver:ResizeObserver|undefined;let frame=0;let measure=true;let disposed=false;
  const active=new Set<HTMLElement>();const positions=new Map<HTMLElement,{top:number;height:number;strength:number}>();
  const paint=()=>{frame=0;if(!preference.matches)return;const scroll=window.scrollY;const viewport=window.innerHeight;
   if(measure){layers.forEach((item,index)=>{const bounds=item.getBoundingClientRect();const previous=parseFloat(item.style.getPropertyValue('--parallax-y'))||0;positions.set(item,{top:bounds.top+scroll-previous,height:bounds.height,strength:item.classList.contains('referencePortrait')?12:20+(index%3)*5})});measure=false;}
   active.forEach(item=>{const bounds=positions.get(item);if(!bounds)return;const distance=Math.max(-1,Math.min(1,(scroll+viewport/2-bounds.top-bounds.height/2)/viewport));const strength=window.innerWidth<=800?Math.min(bounds.strength,6):bounds.strength;item.style.setProperty('--parallax-y',(distance*strength).toFixed(2)+'px')});
  };
  const schedule=()=>{if(!disposed&&preference.matches&&!frame)frame=requestAnimationFrame(paint)};
  const remeasure=()=>{measure=true;schedule()};
  const clear=()=>{revealObserver?.disconnect();depthObserver?.disconnect();resizeObserver?.disconnect();active.clear();positions.clear();if(frame)cancelAnimationFrame(frame);frame=0;revealItems.forEach(item=>{item.classList.remove('revealPending');item.style.removeProperty('--reveal-delay')});layers.forEach(item=>{delete item.dataset.parallax;item.classList.remove('parallaxActive');item.style.removeProperty('--parallax-y')})};
  const setup=()=>{clear();revealItems=Array.from(document.querySelectorAll<HTMLElement>(revealSelector));layers=Array.from(document.querySelectorAll<HTMLElement>(layerSelector));if(!preference.matches||!('IntersectionObserver' in window))return;
   revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('revealPending');revealObserver?.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px -24px 0px'});
   revealItems.forEach((item,index)=>{if(item.getBoundingClientRect().top>window.innerHeight){item.style.setProperty('--reveal-delay',`${(index%4)*55}ms`);item.classList.add('revealPending');revealObserver?.observe(item)}});
   depthObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{const item=entry.target as HTMLElement;if(entry.isIntersecting){active.add(item);item.classList.add('parallaxActive')}else{active.delete(item);item.classList.remove('parallaxActive')}});schedule()},{rootMargin:'100px'});
   layers.forEach(item=>{item.dataset.parallax='';depthObserver?.observe(item)});
   if('ResizeObserver' in window){resizeObserver=new ResizeObserver(remeasure);resizeObserver.observe(document.body)}
   remeasure();
  };
  const mutations=new MutationObserver(records=>{if(disposed||refreshFrame)return;const selector=revealSelector+','+layerSelector;const added=records.some(record=>Array.from(record.addedNodes).some(node=>node instanceof HTMLElement&&(node.matches(selector)||node.querySelector(selector))));if(added)refreshFrame=requestAnimationFrame(()=>{refreshFrame=0;if(!disposed)setup()})});
  mutations.observe(document.body,{childList:true,subtree:true});
  setup();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',remeasure,{passive:true});preference.addEventListener('change',setup);document.fonts?.ready.then(remeasure);
  return()=>{disposed=true;mutations.disconnect();if(refreshFrame)cancelAnimationFrame(refreshFrame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',remeasure);preference.removeEventListener('change',setup);clear()};
 },[pathname]);
 return null;
}
