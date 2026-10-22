import {studioIdentity} from '@/lib/studio-auth';
import {storeImage,MAX_IMAGE_BYTES} from '@/lib/media-storage';
export async function POST(req:Request){
 if(!await studioIdentity())return Response.json({error:'Owner access required'},{status:403});
 if(req.headers.get('origin')!==new URL(req.url).origin)return Response.json({error:'Invalid origin'},{status:403});
 if(Number(req.headers.get('content-length')||0)>MAX_IMAGE_BYTES+100000)return Response.json({error:'Choose an image under 3 MB'},{status:413});
 try{
 const form=await req.formData();const file=form.get('file');
 if(!(file instanceof File)||file.size>MAX_IMAGE_BYTES||!file.size)throw Error('Choose an image under 3 MB');
 const bytes=new Uint8Array(await file.arrayBuffer());
 const png=bytes[0]===137&&bytes[1]===80&&bytes[2]===78&&bytes[3]===71;
 const jpg=bytes[0]===255&&bytes[1]===216&&bytes[2]===255;
 const webp=new TextDecoder().decode(bytes.slice(0,4))==='RIFF'&&new TextDecoder().decode(bytes.slice(8,12))==='WEBP';
 if(!png&&!jpg&&!webp)throw Error('Use a JPG, PNG, or WebP image');
 const type=png?'image/png':jpg?'image/jpeg':'image/webp';const key=crypto.randomUUID();
 await storeImage(key,bytes,type);
 return Response.json({url:'/media/'+key});
 }catch(e){return Response.json({error:e instanceof Error?e.message:'Upload failed'},{status:400});}
}
