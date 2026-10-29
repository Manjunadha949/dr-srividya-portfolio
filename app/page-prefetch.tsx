'use client';
import {useEffect} from 'react';
const publicPath=/^\/(?:about|expertise(?:\/[a-z0-9-]+)?|articles(?:\/[a-zA-Z0-9-]+)?|resources|contact)?$/;
export function PagePrefetch(){
 useEffect(()=>{
  const connection=(navigator as Navigator&{connection?:{saveData?:boolean;effectiveType?:string}}).connection;
  if(connection?.saveData||['slow-2g','2g'].includes(connection?.effectiveType||''))return;
  const links=new Map<string,HTMLLinkElement>();
  const warm=(event:Event)=>{
   if(!(event.target instanceof Element))return;
   const anchor=event.target.closest<HTMLAnchorElement>('a[href]');
   if(!anchor||anchor.closest('.compactTabs,.navigationLinks')||anchor.target==='_blank'||anchor.hasAttribute('download'))return;
   const url=new URL(anchor.href,location.href);
   if(url.origin!==location.origin||!publicPath.test(url.pathname)||url.search||url.pathname===location.pathname||links.has(url.href)||links.size>=6)return;
   const link=document.createElement('link');link.rel='prefetch';link.as='document';link.href=url.href;document.head.appendChild(link);links.set(url.href,link);
  };
  document.addEventListener('pointerover',warm,{passive:true});document.addEventListener('focusin',warm);document.addEventListener('touchstart',warm,{passive:true});
  return()=>{document.removeEventListener('pointerover',warm);document.removeEventListener('focusin',warm);document.removeEventListener('touchstart',warm);links.forEach(link=>link.remove())};
 },[]);
 return null;
}
