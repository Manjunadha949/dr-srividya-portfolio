import { env } from 'cloudflare:workers';
import { createClient } from '@libsql/client/web';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { content } from '@/db/schema';
function turso(){const url=env.TURSO_DATABASE_URL||process.env.TURSO_DATABASE_URL;const authToken=env.TURSO_AUTH_TOKEN||process.env.TURSO_AUTH_TOKEN;if(!url&&!authToken)return null;if(!url||!authToken)throw Error('Both Turso environment variables are required');return createClient({url,authToken});}
export async function readStoredContent(){const client=turso();if(client){try{const r=await client.execute({sql:'SELECT data FROM content WHERE id = ? LIMIT 1',args:['profile']});return r.rows[0]?String(r.rows[0].data):null;}finally{client.close()}}const rows=await getDb().select().from(content).where(eq(content.id,'profile')).limit(1);return rows[0]?.data||null;}
export async function writeStoredContent(data:string){const client=turso();if(client){try{await client.execute({sql:'INSERT INTO content (id,data) VALUES (?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data',args:['profile',data]});}finally{client.close()}return;}await getDb().insert(content).values({id:'profile',data}).onConflictDoUpdate({target:content.id,set:{data}});}
