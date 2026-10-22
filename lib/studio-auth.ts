import {cookies} from 'next/headers';
import {tursoClient} from './storage';
import {getChatGPTUser} from '@/app/chatgpt-auth';
import {isAdmin,OWNER_EMAIL} from './admin';
export const SESSION_COOKIE='srividya_studio';
export const SESSION_SECONDS=8*60*60;
const hex=(bytes:ArrayBuffer)=>Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');
export const digest=async(value:string)=>hex(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)));
export function randomToken(){return hex(crypto.getRandomValues(new Uint8Array(32)).buffer);}
export async function passwordHash(password:string,salt:string){const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);return hex(await crypto.subtle.deriveBits({name:'PBKDF2',salt:new TextEncoder().encode(salt),iterations:100000,hash:'SHA-256'},key,256));}
export async function verifyPassword(password:string,salt:string,expected:string){const actual=await passwordHash(password,salt);let mismatch=actual.length^expected.length;for(let i=0;i<actual.length;i++)mismatch|=actual.charCodeAt(i)^(expected.charCodeAt(i)||0);return mismatch===0;}
export async function localAdmin(){const token=(await cookies()).get(SESSION_COOKIE)?.value;if(!token||!/^[a-f0-9]{64}$/.test(token))return null;const client=tursoClient();if(!client)return null;try{const result=await client.execute({sql:'SELECT username FROM studio_sessions WHERE token_hash=? AND expires_at>?',args:[await digest(token),Date.now()]});return result.rows[0]?String(result.rows[0].username):null;}catch{return null;}finally{client.close();}}
export async function studioIdentity(){const username=await localAdmin();if(username)return {username,owner:false,local:true};const user=await getChatGPTUser();if(user&&await isAdmin(user.email))return {username:user.email,owner:user.email.toLowerCase()===OWNER_EMAIL,local:false};return null;}
export async function authRateLimit(req:Request){const client=tursoClient();if(!client)throw Error('Storage unavailable');try{const window=Math.floor(Date.now()/900000);const ip=req.headers.get('cf-connecting-ip')||req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';const key=await digest(ip+':'+window);await client.execute({sql:'DELETE FROM studio_auth_limits WHERE expires_at<?',args:[Date.now()]});const r=await client.execute({sql:'INSERT INTO studio_auth_limits(id,attempts,expires_at) VALUES(?,1,?) ON CONFLICT(id) DO UPDATE SET attempts=attempts+1 RETURNING attempts',args:[key,(window+1)*900000]});return Number(r.rows[0].attempts)<=10;}finally{client.close();}}
export function sameOrigin(req:Request){return req.headers.get('origin')===new URL(req.url).origin;}
export const cookieOptions={httpOnly:true,secure:true,sameSite:'strict' as const,path:'/',maxAge:SESSION_SECONDS};
