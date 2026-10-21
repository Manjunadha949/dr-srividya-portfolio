// Credentials must be supplied through hidden stdin, never command arguments.
import {createClient} from '@libsql/client/web';
import {pbkdf2Sync,randomBytes} from 'node:crypto';
let input='';for await(const chunk of process.stdin){input+=chunk;if(input.includes('\n'))break;}
const config=JSON.parse(input.trim());const client=createClient({url:config.url,authToken:config.authToken});
try{const salt=randomBytes(32).toString('hex');const hash=pbkdf2Sync(config.password,salt,100000,32,'sha256').toString('hex');await client.batch([
 'CREATE TABLE IF NOT EXISTS studio_accounts(username TEXT PRIMARY KEY,salt TEXT NOT NULL,password_hash TEXT NOT NULL)',
 'CREATE TABLE IF NOT EXISTS studio_sessions(token_hash TEXT PRIMARY KEY,username TEXT NOT NULL,expires_at INTEGER NOT NULL)',
 'CREATE TABLE IF NOT EXISTS studio_auth_limits(id TEXT PRIMARY KEY,attempts INTEGER NOT NULL,expires_at INTEGER NOT NULL)',
 {sql:'INSERT INTO studio_accounts(username,salt,password_hash) VALUES(?,?,?) ON CONFLICT(username) DO NOTHING',args:[config.username,salt,hash]}
],'write');const r=await client.execute({sql:'SELECT salt,password_hash FROM studio_accounts WHERE username=?',args:[config.username]});const row=r.rows[0];const verified=pbkdf2Sync(config.password,String(row.salt),100000,32,'sha256').toString('hex')===row.password_hash;if(!verified)throw Error('An account already exists with a different password.');console.log(JSON.stringify({created:true,passwordHashVerified:true}));}finally{client.close();}
