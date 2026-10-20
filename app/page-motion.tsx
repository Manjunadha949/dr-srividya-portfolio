'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
export function PageMotion(){
 const pathname=usePathname();
 useEffect(()=>{
  const preference=window.matchMedia('(prefers-reduced-motion: no-preference)');
  let observer:IntersectionObserver|undefined;
  const items=Array.from(document.querySelectorAll<HTMLElement>('.referenceCare>div,.referenceCareItem,.referenceArticles>div,.referenceArticle,.pageBody>.split>*,.expertiseList>div,.articleTile,.videoCard,.resourceFaq,.siteFooter .footerIdentity,.siteFooter .footerNavigation'));
  const clear=()=>{observer?.disconnect();items.forEach(item=>{item.classList.remove('revealPending');item.style.removeProperty('--reveal-delay')})};
  const setup=()=>{clear();if(!preference.matches||!('IntersectionObserver' in window))return;observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('revealPending');observer?.unobserve(entry.target)}})},{threshold:0.08,rootMargin:'0px 0px -24px 0px'});items.forEach((item,i)=>{if(item.getBoundingClientRect().top>window.innerHeight){item.style.setProperty('--reveal-delay',`${(i%4)*55}ms`);item.classList.add('revealPending');observer?.observe(item)}})};
  setup();preference.addEventListener('change',setup);
  return()=>{clear();preference.removeEventListener('change',setup)};
 },[pathname]);
 return null;
}
