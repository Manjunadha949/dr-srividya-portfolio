import {redirect} from 'next/navigation';
import {localAdmin} from '@/lib/studio-auth';
import {LoginForm} from './login-form';
export const metadata={title:'Admin login',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
export default async function Login(){if(await localAdmin())redirect('/studio');return <main className="studioLogin"><div className="studioLoginCard"><a href="/" className="eyebrow">Dr. Srividya</a><h1>Welcome back.</h1><p>Sign in to manage your website.</p><LoginForm/><a className="textLink" href="/">← Back to website</a></div></main>;}
