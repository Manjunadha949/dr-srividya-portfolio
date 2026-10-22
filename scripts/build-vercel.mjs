import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const missing=['TURSO_DATABASE_URL','TURSO_AUTH_TOKEN'].filter(key=>!process.env[key]);
if(missing.length)console.warn('[configuration] Missing Vercel variables: '+missing.join(', ')+'. Build-only error pages use bundled text; live database features require these variables.');
const cli=fileURLToPath(new URL('../node_modules/next/dist/bin/next',import.meta.url));
const result=spawnSync(process.execPath,[cli,'build','--webpack',...process.argv.slice(2)],{stdio:'inherit',env:{...process.env,SRIVIDYA_BUILD_PHASE:'1'}});
if(result.error)throw result.error;
process.exit(result.status??1);
