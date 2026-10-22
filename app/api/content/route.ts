import {studioIdentity} from '@/lib/studio-auth';
import { writeStoredContent } from "@/lib/storage";
import { readContent } from "@/lib/content";
import { socialPlatforms,safeSocialUrl } from "@/lib/social-links";
import { defaults } from "@/lib/defaults";
export async function GET(){ return Response.json(await readContent(),{headers:{"Cache-Control":"no-store"}}); }
export async function PUT(req:Request){
// Authorize edits independently of public site access.
if(!await studioIdentity())return Response.json({error:"Sign in required"},{status:401});
if(req.headers.get("origin") !== new URL(req.url).origin) return Response.json({error:"Invalid origin"},{status:403});
if(Number(req.headers.get("content-length")||0)>200000) return Response.json({error:"Content too large"},{status:413});
try {const data:any=await req.json(); if(!data||typeof data!=="object")throw Error("Invalid content");
for(const platform of socialPlatforms)if(data[platform.key]===undefined)data[platform.key]="";if(data.customLinks===undefined)data.customLinks=[];
if(data.testimonials===undefined)data.testimonials=[];if(data.siteText===undefined)data.siteText={};if(data.expertiseDetails===undefined)data.expertiseDetails=[];for(const key of ["logo","chatEnabled","chatGreeting","mapEmbedUrl","googleRating","googleReviewCount","bookingPhone","bookingMessage","locationUrl","clinicPhone","clinicAltPhone","clinicEmail","clinicWebsite","hospitalHours"])if(data[key]===undefined)data[key]=(defaults as any)[key];
if(!data.siteText||typeof data.siteText!=="object"||Array.isArray(data.siteText)||Object.entries(data.siteText).some(([k,v])=>k.length>100||typeof v!=="string"||v.length>20000))throw Error("Invalid website text");
for(const [key,value] of Object.entries(defaults)){if(key==="siteText")continue;if(Array.isArray(value)){if(!Array.isArray(data[key])||data[key].length>100)throw Error("Invalid "+key);}else if(typeof data[key]!=="string"||data[key].length>20000)throw Error("Invalid "+key);}
for(const key of ["adult","child","education","experience"])if(data[key].some((v:unknown)=>typeof v!=="string"))throw Error("Invalid list");
if(!/^(https:\/\/|\/[^/])/.test(data.photo))throw Error("Use HTTPS or a local image path");
if(!/^(https:\/\/|\/[^/])/.test(data.logo))throw Error("Use HTTPS or a local logo path");
for(const platform of socialPlatforms){data[platform.key]=data[platform.key].trim();if(data[platform.key]&&!safeSocialUrl(data[platform.key]))throw Error("Enter a valid HTTPS link for "+platform.label);}
if(data.customLinks.length>20)throw Error("Use at most 20 additional links");for(const link of data.customLinks){if(!link||typeof link.label!=="string"||!link.label.trim()||link.label.length>80||!safeSocialUrl(link.url))throw Error("Additional links need a label and valid HTTPS URL");link.label=link.label.trim();link.url=link.url.trim();}
for(const item of data.expertiseDetails){if(!item||["slug","overview","assessment","support","when"].some(k=>typeof item[k]!=="string"||item[k].length>20000)||!/^[a-z0-9-]+$/.test(item.slug))throw Error("Invalid expertise detail");}
if(data.googleRating&&(!Number.isFinite(Number(data.googleRating))||Number(data.googleRating)<=0||Number(data.googleRating)>5))throw Error("Rating must be between 0 and 5");if(data.googleReviewCount&&!/^[0-9]{1,8}$/.test(data.googleReviewCount))throw Error("Enter a whole review count");if(data.mapEmbedUrl){const u=new URL(data.mapEmbedUrl);if(u.protocol!=="https:"||!["google.com","www.google.com"].includes(u.hostname)||!u.pathname.startsWith("/maps/embed")||u.username||u.password)throw Error("Use a Google Maps embed source URL");}
if(data.clinicWebsite&&!safeSocialUrl(data.clinicWebsite))throw Error("Enter a valid HTTPS hospital website");
if(data.locationUrl&&!safeSocialUrl(data.locationUrl))throw Error("Enter a valid HTTPS location link");
if(data.bookingPhone&&!/^[+0-9 ()-]{8,25}$/.test(data.bookingPhone))throw Error("Enter a WhatsApp number including country code");
for(const t of data.testimonials)if(!t||["name","quote","source","url"].some(k=>typeof t[k]!=="string"||t[k].length>10000)||(t.url&&!safeSocialUrl(t.url)))throw Error("Invalid testimonial");
for(const a of data.articles)if(typeof a.title!=="string"||typeof a.body!=="string")throw Error("Invalid article");
for(const a of data.faqs)if(typeof a.question!=="string"||typeof a.answer!=="string")throw Error("Invalid FAQ");
for(const a of data.videos)if(typeof a.title!=="string"||typeof a.url!=="string"||!a.url.startsWith("https://"))throw Error("Invalid video");
for(const item of [...data.articles,...data.videos]){if(item.image && (typeof item.image!=="string" || !/^(https:\/\/|\/[^/])/.test(item.image)))throw Error("Invalid image URL");} for(const a of data.articles)if(a.id && (typeof a.id!=="string"||!/^[a-zA-Z0-9-]+$/.test(a.id)))throw Error("Invalid article ID");
for(const key of ["adult","child","education","experience"])data[key]=data[key].map((v:string)=>v.trim()).filter(Boolean);
const encoded=JSON.stringify(data);if(encoded.length>200000)throw Error("Content too large");
await writeStoredContent(encoded);return Response.json({ok:true});
}catch(e){return Response.json({error:e instanceof Error?e.message:"Invalid data"},{status:400});}}
