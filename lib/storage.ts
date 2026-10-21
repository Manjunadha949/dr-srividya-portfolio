import { env } from 'cloudflare:workers';
import { createClient } from '@libsql/client/web';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { content } from '@/db/schema';
export function tursoClient(){const url=env.TURSO_DATABASE_URL||process.env.TURSO_DATABASE_URL;const authToken=env.TURSO_AUTH_TOKEN||process.env.TURSO_AUTH_TOKEN;if(!url&&!authToken)return null;if(!url||!authToken)throw Error('Both Turso environment variables are required');return createClient({url,authToken});}
// Only public website content is cached. Identities and admin permissions never are.
let cached:{value:string|null;expires:number}|undefined;
let pending:Promise<string|null>|undefined;
let generation=0;
async function readSource(){const client=tursoClient();if(client){try{const r=await client.execute({sql:'SELECT data FROM content WHERE id = ? LIMIT 1',args:['profile']});return r.rows[0]?String(r.rows[0].data):null;}finally{client.close()}}const rows=await getDb().select().from(content).where(eq(content.id,'profile')).limit(1);return rows[0]?.data||null;}
export async function readStoredContent(){if(cached&&cached.expires>Date.now())return cached.value;if(pending)return pending;const version=generation;const request=readSource().then(value=>{if(version===generation)cached={value,expires:Date.now()+20000};return value;}).finally(()=>{if(pending===request)pending=undefined;});pending=request;return request;}
export async function writeStoredContent(data:string){const client=tursoClient();if(client){try{await client.execute({sql:'INSERT INTO content (id,data) VALUES (?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data',args:['profile',data]});}finally{client.close()}}else{await getDb().insert(content).values({id:'profile',data}).onConflictDoUpdate({target:content.id,set:{data}});}generation++;pending=undefined;cached={value:data,expires:Date.now()+20000};}
