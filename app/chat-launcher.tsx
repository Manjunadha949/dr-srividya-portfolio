'use client';
import {lazy,Suspense,useState} from 'react';
const ChatPanel=lazy(()=>import('./chat-panel'));
export function ChatLauncher({greeting,booking}:{greeting:string;booking:string|null}){const [open,setOpen]=useState(false);return <div className="chatWidget">{open&&<Suspense fallback={<div className="chatLoading" role="status">Opening assistant…</div>}><ChatPanel greeting={greeting} booking={booking} onClose={()=>setOpen(false)}/></Suspense>}<button type="button" className="chatToggle" aria-label={open?'Close website assistant':'Open website assistant'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?'×':'Chat'}<span className="srOnly">AI website assistant</span></button></div>}
