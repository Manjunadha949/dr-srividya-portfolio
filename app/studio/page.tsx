import {redirect} from 'next/navigation';
import {studioIdentity} from '@/lib/studio-auth';
import {readContent} from '@/lib/content';
import Editor from './editor';
export const metadata={title:'Owner Studio',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
export default async function Studio(){const identity=await studioIdentity();if(!identity)redirect('/studio/login');return <Editor initial={await readContent()} canManageAdmins={identity.owner} localLogin={identity.local}/>;}
