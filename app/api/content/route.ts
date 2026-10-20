import { writeStoredContent } from "@/lib/storage";
import { readContent } from "@/lib/content";
import { getChatGPTUser } from "@/app/chatgpt-auth";
import { defaults } from "@/lib/defaults";
export async function GET(){ return Response.json(await readContent(),{headers:{"Cache-Control":"no-store"}}); }
export async function PUT(req:Request){
// Authorize edits independently of public site access.
const user=await getChatGPTUser(); if(!user) return Response.json({error:"Sign in required"},{status:401}); if(user.email.toLowerCase()!=="2110030107cse@gmail.com") return Response.json({error:"Owner access required"},{status:403});
if(req.headers.get("origin") !== new URL(req.url).origin) return Response.json({error:"Invalid origin"},{status:403});
if(Number(req.headers.get("content-length")||0)>200000) return Response.json({error:"Content too large"},{status:413});
try {const data:any=await req.json(); if(!data||typeof data!=="object")throw Error("Invalid content");
for(const [key,value] of Object.entries(defaults)){if(Array.isArray(value)){if(!Array.isArray(data[key])||data[key].length>100)throw Error("Invalid "+key);}else if(typeof data[key]!=="string"||data[key].length>20000)throw Error("Invalid "+key);}
for(const key of ["adult","child","education","experience"])if(data[key].some((v:unknown)=>typeof v!=="string"))throw Error("Invalid list");
for(const key of ["photo","instagram"])if(!/^(https:\/\/|\/[^/])/.test(data[key]))throw Error("Use HTTPS or a local image path");
for(const a of data.articles)if(typeof a.title!=="string"||typeof a.body!=="string")throw Error("Invalid article");
for(const a of data.faqs)if(typeof a.question!=="string"||typeof a.answer!=="string")throw Error("Invalid FAQ");
for(const a of data.videos)if(typeof a.title!=="string"||typeof a.url!=="string"||!a.url.startsWith("https://"))throw Error("Invalid video");
for(const item of [...data.articles,...data.videos]){if(item.image && (typeof item.image!=="string" || !/^(https:\/\/|\/[^/])/.test(item.image)))throw Error("Invalid image URL");} for(const a of data.articles)if(a.id && (typeof a.id!=="string"||!/^[a-zA-Z0-9-]+$/.test(a.id)))throw Error("Invalid article ID");
for(const key of ["adult","child","education","experience"])data[key]=data[key].map((v:string)=>v.trim()).filter(Boolean);
const encoded=JSON.stringify(data);if(encoded.length>200000)throw Error("Content too large");
await writeStoredContent(encoded);return Response.json({ok:true});
}catch(e){return Response.json({error:e instanceof Error?e.message:"Invalid data"},{status:400});}}
