import {NextResponse} from 'next/server';
import {tursoClient} from '@/lib/storage';
import {authRateLimit,sameOrigin,verifyPassword,randomToken,digest,SESSION_COOKIE,SESSION_SECONDS,cookieOptions} from '@/lib/studio-auth';
export async function POST(req:Request){
 if(!sameOrigin(req))return Response.json({error:'Invalid origin'},{status:403});
 try{
  if(!await authRateLimit(req))return Response.json({error:'Too many attempts. Please try again in 15 minutes.'},{status:429});
  const raw=await req.text();if(raw.length>2000)throw Error();const {username,password}=JSON.parse(raw);
  if(typeof username!=='string'||typeof password!=='string'||username.length>80||password.length>200)throw Error();
  const client=tursoClient();if(!client)throw Error();
  try{const result=await client.execute({sql:'SELECT username,salt,password_hash FROM studio_accounts WHERE username=?',args:[username.trim().toLowerCase()]});const account=result.rows[0];
   const valid=await verifyPassword(password,account?String(account.salt):'missing-account-salt',account?String(account.password_hash):'0'.repeat(64));
   if(!account||!valid)return Response.json({error:'Incorrect username or password.'},{status:401});
   const token=randomToken();await client.execute({sql:'DELETE FROM studio_sessions WHERE expires_at<?',args:[Date.now()]});await client.execute({sql:'INSERT INTO studio_sessions(token_hash,username,expires_at) VALUES(?,?,?)',args:[await digest(token),String(account.username),Date.now()+SESSION_SECONDS*1000]});
   const response=NextResponse.json({ok:true});response.cookies.set(SESSION_COOKIE,token,cookieOptions);response.headers.set('Cache-Control','no-store');return response;
  }finally{client.close();}
 }catch{return Response.json({error:'Unable to sign in. Please try again.'},{status:400});}
}
