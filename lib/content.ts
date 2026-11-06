import {patientArticles} from './patient-articles';
import {siteTextDefaults} from './site-text';
import { cache } from 'react';
import { readStoredContent } from './storage';
import { defaults,type Content } from './defaults';
export const readContent=cache(async function readContent():Promise<Content>{const stored=await readStoredContent();const saved=stored?JSON.parse(stored):{};const previousClinic={"clinic": "Spinova Super Speciality Hospital", "address": "Opposite Pillar #799, Plot Nos. 2A & 2B, Baghameeri, Kukatpally, Hyderabad, Telangana 500072", "clinicPhone": "+91 90531 11333", "clinicAltPhone": "040 2425 9999", "clinicEmail": "hello@spinovahospitals.com", "clinicWebsite": "https://www.spinovahospitals.com/contact-us", "locationUrl": "https://share.google/ICqkgTom9E8S2ZZV8", "hospitalHours": "Hospital phone support is available 24/7. Doctor consultation hours are separate and require confirmation.", "timings": "By appointment. Please contact the hospital to confirm Dr. Srividya’s consultation days and timings."};for(const [key,oldValue] of Object.entries(previousClinic)){if(saved[key]===oldValue)saved[key]=(defaults as Record<string,unknown>)[key];}for(const [key,old] of Object.entries({clinic:"Clinic details coming soon",address:"Temporary location — to be updated",timings:"Consultation timings to be confirmed"})){if(saved[key]===old)saved[key]=(defaults as Record<string,unknown>)[key];}if(!saved.locationUrl)saved.locationUrl=defaults.locationUrl;if(['/images/doctor-smiling.png','/images/srividya-portrait-1024.webp'].includes(saved.photo))saved.photo=defaults.photo;if(Array.isArray(saved.education))saved.education=saved.education.map((entry:unknown)=>typeof entry==='string'?entry.replace(/^MD(?=\s*[—–-]|$)/,'MD (Psychiatry)'):entry);if(saved.articleContentVersion!=='2'){
const existing:Content['articles']=Array.isArray(saved.articles)?saved.articles:[];
const isDemo=(article:Content['articles'][number])=>/\(sample\)\s*$/i.test(article.title.trim())||/^(?:demo article|lorem ipsum)\b/i.test(article.body.trim())||/^(?:demo|sample|test|placeholder)(?:\s+article)?(?:\s+\d+)?$/i.test(article.title.trim());
const entries=existing.filter(article=>article&&typeof article.title==='string'&&typeof article.body==='string');
const demos=entries.filter(isDemo);
const published=existing.flatMap((article,index)=>entries.includes(article)&&!isDemo(article)?[{...article,id:article.id||String(index)}]:[]);
const replacements=patientArticles.map((article,index)=>({...article,image:demos[index]?.image})).filter(article=>!published.some(item=>item.id===article.id));
saved.articles=demos.length?[...replacements,...published]:saved.articleContentVersion==='1'?published:[...published,...replacements];
saved.articleContentVersion='2';
}const faqUpdates = [
 ['How can I arrange a consultation?', 'Contact details and consultation timings will be added shortly.', 'Visit the Contact page and use the listed phone or WhatsApp option to ask about appointment availability. The clinic can confirm the date, time, location, and what to bring.'],
 ['Does the practice support children and adolescents?', 'Child and adolescent psychiatry is one of Dr. Srividya’s areas of practice.', 'Yes. Dr. Srividya sees children and adolescents. When arranging a visit, tell the clinic your child’s age and what concerns you. If available, bring relevant school feedback or previous assessment reports.'],
];
const faqs:Content['faqs']=(Array.isArray(saved.faqs)?saved.faqs:defaults.faqs).map((faq:Content['faqs'][number])=>{
 const update=faqUpdates.find(([question,answer])=>faq.question===question&&faq.answer===answer);
 return update?{...faq,answer:update[2]}:faq;
});
return {...defaults,...saved,faqs,siteText:{...siteTextDefaults,...saved.siteText}};});
