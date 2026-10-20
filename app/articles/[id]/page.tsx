import { siteUrl } from "@/lib/seo";
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readContent } from '@/lib/content';
import { Header,Footer,Label } from '@/app/components';
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const {id}=await params;const d=await readContent();const a=d.articles.find((a,i)=>(a.id||String(i))===id);if(!a)return {title:'Article not found',robots:{index:false}};return {title:a.title,description:a.body.slice(0,155),alternates:{canonical:siteUrl+'/articles/'+id},openGraph:{type:'article',title:a.title,description:a.body.slice(0,155),images:a.image?[a.image]:undefined}};}
export const dynamic='force-dynamic';
export default async function Article({params}:{params:Promise<{id:string}>}){const {id}=await params;const d=await readContent();const article=d.articles.find((a,i)=>(a.id||String(i))===id);if(!article)notFound();return <><Header/><main><section className="pageHero section"><Label>ARTICLES</Label><h1>{article.title}</h1></section><article className="articleReading section">{article.image&&<img className="articleCover" src={article.image} alt=""/>}<p className="credentials">By {d.fullName}</p><div className="articleText">{article.body}</div><Link className="textLink" href="/articles">← All articles</Link></article></main><Footer/></>}
