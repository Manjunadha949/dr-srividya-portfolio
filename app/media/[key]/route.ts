import {storedImage} from '@/lib/media-storage';
import {env} from '@/lib/runtime-env';
export async function GET(_req:Request,{params}:{params:Promise<{key:string}>}){
 const {key}=await params;if(!/^[a-f0-9-]{36}$/.test(key))return new Response('Not found',{status:404});
 const response=await storedImage(key);if(response)return response;
 // Previously uploaded public R2 images remain available after moving hosts.
 if(!env.BUCKET)return Response.redirect('https://dr-srividya-care.quirkypoppy8.chatgpt.site/media/'+key,307);
 return new Response('Not found',{status:404});
}
