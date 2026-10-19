import Link from "next/link";
import { Navigation } from "./navigation";
export function Header(){return <header className="header"><Navigation/><span className="headerMessage">Mental health for<br/>a more human tomorrow <i/></span></header>}
export function Footer(){return <footer><div><strong>Dr. Srividya</strong><p>A calmer mind. A kinder tomorrow.</p></div><div><Link href="/contact">Get in touch</Link><Link href="/studio">Owner studio</Link><small>Preview · Clinic and contact details are temporary.</small></div></footer>}
export function Label({children}:{children:React.ReactNode}){return <p className="eyebrow">{children}<i/></p>}
