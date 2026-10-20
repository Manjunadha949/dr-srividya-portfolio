import { readStoredContent } from './storage';
import { defaults,type Content } from './defaults';
export async function readContent():Promise<Content>{const stored=await readStoredContent();return {...defaults,...(stored?JSON.parse(stored):{})};}
