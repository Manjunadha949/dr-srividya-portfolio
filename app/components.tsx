import {Booking} from './booking';
import {Phone} from 'lucide-react';
import {ChatLauncher} from './chat-launcher';
import {bookingUrl} from '@/lib/booking';
import { readContent } from '@/lib/content';
import { SocialLinks } from './social-links';
import { Navigation } from './navigation';
export async function Header({home=false}:{home?:boolean}={}){const d=await readContent();return <><header className={"header"+(home?" referenceHeader":"")}><Navigation texts={d.siteText}/></header><div className="headerSpacer" aria-hidden="true"/></>}
export async function Footer(){
  const content=await readContent();
  const text=content.siteText;
  return <>
    <footer className="siteFooter minimalFooter">
      <a href="/" className="footerBrand">
        {text.copy44??"Dr. Srividya"}
        <span>{text.copy45??"PSYCHIATRY · CHILD & ADOLESCENT CARE"}</span>
      </a>
      <div className="footerCopyright">
        <small>© {new Date().getFullYear()} {text.footerCopyright}. {text.footerRights??"All rights reserved."}</small>
        <small className="footerCredit">{text.footerCredit??"Designed & developed by Credo Forge"}</small>
      </div>
      <SocialLinks content={content}/>
    </footer>
    <nav className="mobileActionBar" aria-label="Contact and consultation"><div className="mobileActionBarInner"><a className="mobileContactButton" href="/contact"><Phone size={18} strokeWidth={1.7} aria-hidden="true"/><span>{text.navContact??"Contact"}</span></a><Booking content={content}/></div></nav>
    {content.chatEnabled!=='false'&&<ChatLauncher greeting={content.chatGreeting} booking={bookingUrl(content)}/>}
  </>;
}
export function Label({children}:{children:React.ReactNode}){return <p className="eyebrow">{children}<i/></p>}
