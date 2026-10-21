import {siteTextDefaults} from './site-text';
import { cache } from 'react';
import { readStoredContent } from './storage';
import { defaults,type Content } from './defaults';
export const readContent=cache(async function readContent():Promise<Content>{const stored=await readStoredContent();const saved=stored?JSON.parse(stored):{};return {...defaults,...saved,siteText:{...siteTextDefaults,...saved.siteText}};});
