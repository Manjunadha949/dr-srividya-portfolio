import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';
import { readContent } from '@/lib/content';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const d=await readContent();return ['','/about','/expertise','/articles','/resources','/contact',...d.articles.map((a,i)=>'/articles/'+(a.id||i))].map(path=>({url:siteUrl+path,changeFrequency:'weekly',priority:path===''?1:0.7}));}
