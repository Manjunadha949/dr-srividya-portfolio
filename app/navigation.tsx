'use client';
import { usePathname } from 'next/navigation';
const links=[['/','Home'],['/about','About'],['/expertise','Areas of Care'],['/articles','Articles'],['/resources','Resources'],['/contact','Contact']];
export function Navigation(){const pathname=usePathname();return <nav aria-label="Main navigation">{links.map(([href,label])=><a key={href} href={href} aria-current={pathname===href?'page':undefined}>{label}</a>)}</nav>}
