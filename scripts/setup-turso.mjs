import { createClient } from '@libsql/client';
import { readFile } from 'node:fs/promises';
const {TURSO_DATABASE_URL:url,TURSO_AUTH_TOKEN:authToken}=process.env;
if(!url||!authToken)throw Error('Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN first.');
const client=createClient({url,authToken});
try{await client.execute('CREATE TABLE IF NOT EXISTS content (id TEXT PRIMARY KEY NOT NULL, data TEXT NOT NULL)');
const file=process.argv[2];if(file){const data=JSON.parse(await readFile(file,'utf8'));if(!data.name||!Array.isArray(data.adult)||!Array.isArray(data.child))throw Error('Invalid content export');await client.execute({sql:'INSERT INTO content (id,data) VALUES (?,?) ON CONFLICT(id) DO NOTHING',args:['profile',JSON.stringify(data)]});}
console.log('Turso schema ready. Existing content was preserved.');}finally{client.close()}
