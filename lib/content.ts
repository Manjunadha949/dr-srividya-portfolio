import {siteTextDefaults} from './site-text';
import { cache } from 'react';
import { readStoredContent } from './storage';
import { defaults,type Content } from './defaults';
export const readContent=cache(async function readContent():Promise<Content>{const stored=await readStoredContent();const saved=stored?JSON.parse(stored):{};for(const [key,old] of Object.entries({clinic:"Clinic details coming soon",address:"Temporary location — to be updated",timings:"Consultation timings to be confirmed"})){if(saved[key]===old)saved[key]=(defaults as Record<string,unknown>)[key];}if(!saved.locationUrl)saved.locationUrl=defaults.locationUrl;if(['/images/doctor-smiling.png','/images/srividya-portrait-1024.webp'].includes(saved.photo))saved.photo=defaults.photo;return {...defaults,...saved,siteText:{...siteTextDefaults,...saved.siteText}};});
