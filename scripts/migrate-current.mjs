// Read credentials through stdin. Never writes them to disk or logs them.
import { createClient } from '@libsql/client/web';
import { readFile } from 'node:fs/promises';
import { once } from 'node:events';
process.stdout.write('Ready for migration credentials on stdin.\n');
let input='';for await(const chunk of process.stdin){input+=chunk;if(input.includes('\n'))break;}
const config=JSON.parse(input.trim());
const client=createClient({url:config.url,authToken:config.authToken});
try{
 const data=JSON.parse(await readFile(process.argv[2],'utf8'));
 if(!data.name||!Array.isArray(data.adult)||!Array.isArray(data.child))throw Error('Invalid content export');
 data.bookingPhone='919347622694';data.clinicWebsite='';
 await client.execute('CREATE TABLE IF NOT EXISTS content (id TEXT PRIMARY KEY NOT NULL,data TEXT NOT NULL)');
 const existing=await client.execute({sql:'SELECT data FROM content WHERE id=?',args:['profile']});
 const statements=[];
 if(existing.rows.length)statements.push({sql:'INSERT INTO content (id,data) VALUES (?,?)',args:['backup-'+Date.now(),String(existing.rows[0].data)]});
 statements.push({sql:'INSERT INTO content (id,data) VALUES (?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data',args:['profile',JSON.stringify(data)]});
 await client.batch(statements,'write');
 const result=await client.execute({sql:'SELECT data FROM content WHERE id=?',args:['profile']});
 const saved=JSON.parse(String(result.rows[0].data));if(JSON.stringify(saved)!==JSON.stringify(data))throw Error('Content verification failed');
 console.log(JSON.stringify({migrated:true,verified:true,fields:Object.keys(saved).length,articles:saved.articles.length,videos:saved.videos.length,existingTargetBackedUp:existing.rows.length>0}));
}catch{console.error('Migration failed. Check database credentials and network access.');process.exitCode=1;}finally{client.close();}
