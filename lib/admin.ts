import { env } from 'cloudflare:workers';
import { tursoClient } from './storage';
export const OWNER_EMAIL='2110030107cse@gmail.com';
export async function adminEmails(){const client=tursoClient();if(!client)return [];try{await client.execute('CREATE TABLE IF NOT EXISTS site_admins (email TEXT PRIMARY KEY NOT NULL)');const r=await client.execute('SELECT email FROM site_admins ORDER BY email');return r.rows.map(row=>String(row.email));}finally{client.close()}}
export async function isAdmin(email:string){const normalized=email.trim().toLowerCase();if([OWNER_EMAIL,...(env.ADMIN_EMAILS||'').split(',').map(x=>x.trim().toLowerCase())].includes(normalized))return true;try{return (await adminEmails()).includes(normalized);}catch{return false}}
