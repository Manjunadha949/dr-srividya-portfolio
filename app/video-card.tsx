'use client';
import {useEffect,useId,useRef,useState} from 'react';
type Video={title:string;url:string;image?:string};
function videoMedia(video:Video){
 let id='';
 try{const u=new URL(video.url);if(u.hostname==='youtu.be')id=u.pathname.slice(1);if(['www.youtube.com','youtube.com','m.youtube.com'].includes(u.hostname))id=u.searchParams.get('v')||u.pathname.split('/').filter(Boolean)[1]||'';}catch{}
 const valid=/^[A-Za-z0-9_-]{11}$/.test(id);
 return {embed:valid?'https://www.youtube-nocookie.com/embed/'+id:'',thumbnail:video.image||(valid?'https://i.ytimg.com/vi/'+id+'/hqdefault.jpg':'')};
}
export function VideoGallery({videos,heading='Health, in conversation',previousLabel='← Previous',nextLabel='Next →'}:{videos:Video[];heading?:string;previousLabel?:string;nextLabel?:string}){
 const [index,setIndex]=useState<number|null>(null);
 const dialog=useRef<HTMLDialogElement>(null);
 const titleId=useId();
 const open=index!==null;
 useEffect(()=>{
  if(!open)return;
  const element=dialog.current;
  const previousOverflow=document.body.style.overflow;
  element?.showModal();document.body.style.overflow='hidden';
  return ()=>{element?.close();document.body.style.overflow=previousOverflow;};
 },[open]);
 const selected=index===null?null:videos[index];
 const media=selected?videoMedia(selected):null;
 const close=()=>setIndex(null);
 return <>
  <div className="videoGrid">{videos.map((video,i)=>{const {thumbnail}=videoMedia(video);return <article className="videoCard" key={video.url+'-'+i}>
   <button className="videoPreview" type="button" aria-label={'Play '+video.title} onClick={()=>setIndex(i)}>{thumbnail&&<img src={thumbnail} alt="" loading="lazy" decoding="async" width="1280" height="720"/>}<span className="videoPlay" aria-hidden="true">▶</span><span>Play video</span></button>
   <h3><button className="videoTitleButton" type="button" onClick={()=>setIndex(i)}>{video.title}</button></h3>
   <button className="textLink videoOpenButton" type="button" onClick={()=>setIndex(i)}>Watch video ↗</button>
  </article>})}</div>
  <dialog ref={dialog} className="videoDialog" aria-labelledby={titleId} onCancel={close} onClose={close} onClick={event=>{if(event.target===event.currentTarget){const bounds=event.currentTarget.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)close();}}}>
   {selected&&<div className="videoDialogContent">
    <button className="videoDialogClose" type="button" onClick={close} aria-label="Close video" autoFocus>×</button>
    <p className="eyebrow">{heading}</p><h2 id={titleId}>{selected.title}</h2>
    {media?.embed?<iframe key={index} className="videoDialogPlayer" src={media.embed+'?autoplay=1'} title={selected.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen/>:<a className="button" href={selected.url} target="_blank" rel="noopener noreferrer">Open video ↗</a>}
    <p className="videoDialogNote"><a href={selected.url} target="_blank" rel="noopener noreferrer">Watch original video ↗</a></p>
    <nav className="videoDialogNavigation" aria-label="Video navigation"><button type="button" disabled={index===0} onClick={()=>setIndex(i=>i===null?null:Math.max(0,i-1))}>{previousLabel}</button><span aria-live="polite">Video {(index??0)+1} of {videos.length}</span><button type="button" disabled={index===videos.length-1} onClick={()=>setIndex(i=>i===null?null:Math.min(videos.length-1,i+1))}>{nextLabel}</button></nav>
   </div>}
  </dialog>
 </>;
}
