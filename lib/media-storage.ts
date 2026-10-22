import type {InStatement} from '@libsql/client';
import {env} from './runtime-env';
import {tursoClient} from './storage';
const CHUNK_SIZE=128*1024;
export const MAX_IMAGE_BYTES=3*1024*1024;
export async function storeImage(key:string,bytes:Uint8Array,mime:string){
 if(env.BUCKET){await env.BUCKET.put(key,bytes,{httpMetadata:{contentType:mime}});return;}
 const client=tursoClient();if(!client)throw Error('Image storage unavailable');
 try{
  // Small BLOB chunks keep each database row bounded on both hosting platforms.
  await client.batch([
   'CREATE TABLE IF NOT EXISTS site_media (id TEXT PRIMARY KEY NOT NULL,mime TEXT NOT NULL,size INTEGER NOT NULL)',
   'CREATE TABLE IF NOT EXISTS site_media_chunks (media_id TEXT NOT NULL,part INTEGER NOT NULL,data BLOB NOT NULL,PRIMARY KEY(media_id,part))',
  ],'write');
  const statements:InStatement[]=[{sql:'INSERT INTO site_media(id,mime,size) VALUES(?,?,?)',args:[key,mime,bytes.length]}];
  for(let i=0;i<bytes.length;i+=CHUNK_SIZE)statements.push({sql:'INSERT INTO site_media_chunks(media_id,part,data) VALUES(?,?,?)',args:[key,i/CHUNK_SIZE,bytes.slice(i,i+CHUNK_SIZE)]});
  await client.batch(statements,'write');
 }finally{client.close()}
}
export async function storedImage(key:string):Promise<Response|null>{
 const headers={'Cache-Control':'public, max-age=31536000, immutable','X-Content-Type-Options':'nosniff'};
 if(env.BUCKET){const object=await env.BUCKET.get(key);if(object)return new Response(object.body,{headers:{...headers,'Content-Type':object.httpMetadata?.contentType||'application/octet-stream'}});}
 const client=tursoClient();if(!client)return null;
 try{
  let result;try{result=await client.execute({sql:'SELECT mime,size FROM site_media WHERE id=?',args:[key]});}catch(e){if(e instanceof Error&&/no such table/i.test(e.message))return null;throw e;}
  if(!result.rows[0])return null;
  const chunks=await client.execute({sql:'SELECT data FROM site_media_chunks WHERE media_id=? ORDER BY part',args:[key]});
  const bytes=new Uint8Array(Number(result.rows[0].size));let offset=0;
  for(const row of chunks.rows){const part=new Uint8Array(row.data as ArrayBuffer);bytes.set(part,offset);offset+=part.byteLength;}
  if(offset!==bytes.length)throw Error('Incomplete stored image');
  return new Response(bytes,{headers:{...headers,'Content-Type':String(result.rows[0].mime)}});
 }finally{client.close()}
}
