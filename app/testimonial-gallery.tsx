'use client';
import {ArrowIcon} from './arrow-icon';
import {useId,useState} from 'react';
import {safeSocialUrl} from '@/lib/social-links';
import type {Content} from '@/lib/defaults';
export function TestimonialGallery({testimonials,showAllLabel='Show all testimonials',showLessLabel='Show fewer testimonials'}:{testimonials:Content['testimonials'];showAllLabel?:string;showLessLabel?:string}){
 const [expanded,setExpanded]=useState(false);const id=useId();
 return <><div className="testimonialGrid resourceCards" id={id}>{(expanded?testimonials:testimonials.slice(0,3)).map((t,i)=><figure className="testimonialCard" key={i}><blockquote>{t.quote}</blockquote><figcaption>{t.name}{t.source&&<span>{t.source}</span>}{safeSocialUrl(t.url)&&<a className="textLink" href={safeSocialUrl(t.url)!} target="_blank" rel="noopener noreferrer">View original <ArrowIcon direction="up-right"/></a>}</figcaption></figure>)}</div><div className="resourceShowAll"><button type="button" className="button" aria-expanded={expanded} aria-controls={id} onClick={()=>setExpanded(value=>!value)}>{expanded?showLessLabel:showAllLabel}<span aria-hidden="true">{expanded?'−':'+'}</span></button>{expanded&&<small role="status">Showing all {testimonials.length} testimonials</small>}</div></>;
}
