import { isAdmin } from '@/lib/admin';
import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '@/app/chatgpt-auth';
export async function POST(req:Request){
 const user=await getChatGPTUser();
 if(!user||!await isAdmin(user.email))return Response.json({error:'Owner access required'},{status:403});
 if(req.headers.get('origin')!==new URL(req.url).origin)return Response.json({error:'Invalid origin'},{status:403});
 if(!env.BUCKET)return Response.json({error:'Image storage unavailable'},{status:503});
 if(Number(req.headers.get('content-length')||0)>5500000)return Response.json({error:'Choose an image under 5 MB'},{status:413});
 try{
 const form=await req.formData();const file=form.get('file');
 if(!(file instanceof File)||file.size>5000000||!file.size)throw Error('Choose an image under 5 MB');
 const bytes=new Uint8Array(await file.arrayBuffer());
 const png=bytes[0]===137&&bytes[1]===80&&bytes[2]===78&&bytes[3]===71;
 const jpg=bytes[0]===255&&bytes[1]===216&&bytes[2]===255;
 const webp=new TextDecoder().decode(bytes.slice(0,4))==='RIFF'&&new TextDecoder().decode(bytes.slice(8,12))==='WEBP';
 if(!png&&!jpg&&!webp)throw Error('Use a JPG, PNG, or WebP image');
 const type=png?'image/png':jpg?'image/jpeg':'image/webp';const key=crypto.randomUUID();
 await env.BUCKET.put(key,bytes,{httpMetadata:{contentType:type}});
 return Response.json({url:'/media/'+key});
 }catch(e){return Response.json({error:e instanceof Error?e.message:'Upload failed'},{status:400});}
}
