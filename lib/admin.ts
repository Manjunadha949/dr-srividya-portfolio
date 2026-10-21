import { env } from 'cloudflare:workers';
export function isAdmin(email:string){return ['2110030107cse@gmail.com',...(env.ADMIN_EMAILS||'').split(',').map(x=>x.trim().toLowerCase())].includes(email.toLowerCase());}
