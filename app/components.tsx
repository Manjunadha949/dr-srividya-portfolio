import Link from 'next/link';
import { readContent } from '@/lib/content';
import { SocialLinks } from './social-links';
import { Navigation } from './navigation';
export function Header(){return <header className="header"><a className="desktopBrand" href="/" aria-label="Dr. Srividya home">Dr. Srividya<span>PSYCHIATRIST</span></a><Navigation/><span className="headerMessage">Mental health for<br/>a more human tomorrow <i/></span></header>}
export async function Footer(){const content=await readContent();return <footer className="siteFooter"><div className="footerIdentity"><a href="/" className="footerBrand">Dr. Srividya<span>PSYCHIATRY · CHILD & ADOLESCENT CARE</span></a><p>A calmer mind. A kinder tomorrow.</p><SocialLinks content={content}/></div><div className="footerNavigation"><a href="/about">About the doctor</a><a href="/expertise">Areas of care</a><a href="/resources">Resources</a><a href="/contact">Get in touch</a></div><div className="footerBottom"><small>© {new Date().getFullYear()} Dr. Srividya</small><small>Information on this website does not replace a personal consultation.</small><Link href="/studio">Owner studio ↗</Link></div></footer>}
export function Label({children}:{children:React.ReactNode}){return <p className="eyebrow">{children}<i/></p>}
