import {siteTextDefaults} from './site-text';
import { cache } from 'react';
import { readStoredContent } from './storage';
import { defaults,type Content } from './defaults';
export const readContent=cache(async function readContent():Promise<Content>{const stored=await readStoredContent();const saved=stored?JSON.parse(stored):{};if(!saved.locationUrl)saved.locationUrl=defaults.locationUrl;if(['/images/doctor-smiling.png','/images/srividya-portrait-1024.webp'].includes(saved.photo))saved.photo=defaults.photo;return {...defaults,...saved,siteText:{...siteTextDefaults,...saved.siteText}};});
