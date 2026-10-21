import {ChatLauncher} from './chat-launcher';
import {bookingUrl} from '@/lib/booking';
import { readContent } from '@/lib/content';
import { SocialLinks } from './social-links';
import { Navigation } from './navigation';
export async function Header({home=false}:{home?:boolean}={}){const d=await readContent();return <header className={"header"+(home?" referenceHeader":"")}><Navigation texts={d.siteText}/></header>}
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
        <small>© {new Date().getFullYear()} {text.footerCopyright}</small>
        <small>{text.footerRights??"All rights reserved."}</small>
      </div>
      <SocialLinks content={content}/>
    </footer>
    {content.chatEnabled!=='false'&&<ChatLauncher greeting={content.chatGreeting} booking={bookingUrl(content)}/>}
  </>;
}
export function Label({children}:{children:React.ReactNode}){return <p className="eyebrow">{children}<i/></p>}
