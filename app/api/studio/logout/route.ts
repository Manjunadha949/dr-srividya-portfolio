import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {tursoClient} from '@/lib/storage';
import {SESSION_COOKIE,digest,sameOrigin,cookieOptions} from '@/lib/studio-auth';
export async function POST(req:Request){if(!sameOrigin(req))return Response.json({error:'Invalid origin'},{status:403});const token=(await cookies()).get(SESSION_COOKIE)?.value;const client=tursoClient();try{if(token&&client)await client.execute({sql:'DELETE FROM studio_sessions WHERE token_hash=?',args:[await digest(token)]});}finally{client?.close();}const response=NextResponse.json({ok:true});response.cookies.set(SESSION_COOKIE,'',{...cookieOptions,maxAge:0});return response;}
