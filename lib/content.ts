import {patientArticles} from './patient-articles';
import {siteTextDefaults} from './site-text';
import { cache } from 'react';
import { readStoredContent } from './storage';
import { defaults,type Content } from './defaults';

const additionalHospitalVideos: Content['videos'] = [
  { title: "Helping children remember what they study", url: 'https://www.youtube.com/watch?v=xFCquJbhFRE' },
  { title: "What children can learn from household chores", url: 'https://www.youtube.com/watch?v=kvB6v4oH6ik' },
  { title: "How much time should students spend studying each day? (Short)", url: 'https://www.youtube.com/shorts/sZFJlU77VAw' },
];

const relatedHospitalVideos: Content['videos'] = [
  { title: 'Psychiatry Stories, Episode 1: Doctor and Patient — Mania', url: 'https://www.youtube.com/watch?v=tYYEbjc7W2g' },
  { title: 'How much do young people know about mental health? Featuring the cousins', url: 'https://www.youtube.com/watch?v=sP_es-IvnxA' },
];

const hospitalVideos: Content['videos'] = [
  { title: "Five ways to build confidence in children", url: 'https://www.youtube.com/watch?v=YfM7CXPqNAk' },
  { title: "Why do we feel fear?", url: 'https://www.youtube.com/watch?v=kS1rlppziyQ' },
  { title: "How to help children develop their talents", url: 'https://www.youtube.com/watch?v=nAgV3LA9K8g' },
  { title: "Helping children focus while studying", url: 'https://www.youtube.com/watch?v=FkdRuZjlJcI' },
  { title: "The skills children may be missing", url: 'https://www.youtube.com/watch?v=0pFp-3jb8CM' },
  { title: "When your mind goes blank during an exam (Short)", url: 'https://www.youtube.com/shorts/x5aH7962OQU' },
  { title: "Getting started on difficult tasks without putting them off (Short)", url: 'https://www.youtube.com/shorts/CUnrDWFPkn8' },
  { title: "When children don’t listen (Short)", url: 'https://www.youtube.com/shorts/Haa9cOGd6Bs' },
  { title: "Investing in your children’s dreams (Short)", url: 'https://www.youtube.com/shorts/captshXGxpg' },
  { title: "What to know when trying to lose weight (Short)", url: 'https://www.youtube.com/shorts/_9zNR0MaQ1s' },
  { title: "Foods and children’s brain health (Short)", url: 'https://www.youtube.com/shorts/I3gA9_4mfjU' },
  { title: "What to know about mental resilience (Short)", url: 'https://www.youtube.com/shorts/zWydk65yXsc' },
  { title: "What to do when your child tunes you out (Short)", url: 'https://www.youtube.com/shorts/jeVLnrm9I24' },
];
export const readContent=cache(async function readContent():Promise<Content>{const stored=await readStoredContent();const saved=stored?JSON.parse(stored):{};const previousClinic={"clinic": "Spinova Super Speciality Hospital", "address": "Opposite Pillar #799, Plot Nos. 2A & 2B, Baghameeri, Kukatpally, Hyderabad, Telangana 500072", "clinicPhone": "+91 90531 11333", "clinicAltPhone": "040 2425 9999", "clinicEmail": "hello@spinovahospitals.com", "clinicWebsite": "https://www.spinovahospitals.com/contact-us", "locationUrl": "https://share.google/ICqkgTom9E8S2ZZV8", "hospitalHours": "Hospital phone support is available 24/7. Doctor consultation hours are separate and require confirmation.", "timings": "By appointment. Please contact the hospital to confirm Dr. Srividya’s consultation days and timings."};for(const [key,oldValue] of Object.entries(previousClinic)){if(saved[key]===oldValue)saved[key]=(defaults as Record<string,unknown>)[key];}for(const [key,old] of Object.entries({clinic:"Clinic details coming soon",address:"Temporary location — to be updated",timings:"Consultation timings to be confirmed"})){if(saved[key]===old)saved[key]=(defaults as Record<string,unknown>)[key];}if(!saved.locationUrl)saved.locationUrl=defaults.locationUrl;if(['/images/doctor-smiling.png','/images/srividya-portrait-1024.webp'].includes(saved.photo))saved.photo=defaults.photo;if(Array.isArray(saved.education))saved.education=saved.education.map((entry:unknown)=>typeof entry==='string'?entry.replace(/^MD(?=\s*[—–-]|$)/,'MD (Psychiatry)'):entry);if(saved.articleContentVersion!=='2'){
const existing:Content['articles']=Array.isArray(saved.articles)?saved.articles:[];
const isDemo=(article:Content['articles'][number])=>/\(sample\)\s*$/i.test(article.title.trim())||/^(?:demo article|lorem ipsum)\b/i.test(article.body.trim())||/^(?:demo|sample|test|placeholder)(?:\s+article)?(?:\s+\d+)?$/i.test(article.title.trim());
const entries=existing.filter(article=>article&&typeof article.title==='string'&&typeof article.body==='string');
const demos=entries.filter(isDemo);
const published=existing.flatMap((article,index)=>entries.includes(article)&&!isDemo(article)?[{...article,id:article.id||String(index)}]:[]);
const replacements=patientArticles.map((article,index)=>({...article,image:demos[index]?.image})).filter(article=>!published.some(item=>item.id===article.id));
saved.articles=demos.length?[...replacements,...published]:saved.articleContentVersion==='1'?published:[...published,...replacements];
saved.articleContentVersion='2';
}if (saved.videoContentVersion !== '1' && saved.videoContentVersion !== '2' && saved.videoContentVersion !== '3') {
  saved.videos = hospitalVideos;
  saved.videoContentVersion = '1';
}
if (saved.videoContentVersion === '1') {
  const videos: Content['videos'] = saved.videos;
  saved.videos = [...videos, ...additionalHospitalVideos.filter(video => !videos.some(existing => existing.url === video.url))];
  saved.videoContentVersion = '2';
}
if (saved.videoContentVersion === '2') {
  const videos: Content['videos'] = saved.videos;
  saved.videos = [...relatedHospitalVideos.filter(video => !videos.some(existing => existing.url === video.url)), ...videos];
  saved.videoContentVersion = '3';
}
const faqUpdates = [
 ['How can I arrange a consultation?', 'Contact details and consultation timings will be added shortly.', 'Visit the Contact page and use the listed phone or WhatsApp option to ask about appointment availability. The clinic can confirm the date, time, location, and what to bring.'],
 ['Does the practice support children and adolescents?', 'Child and adolescent psychiatry is one of Dr. Srividya’s areas of practice.', 'Yes. Dr. Srividya sees children and adolescents. When arranging a visit, tell the clinic your child’s age and what concerns you. If available, bring relevant school feedback or previous assessment reports.'],
];
const faqs:Content['faqs']=(Array.isArray(saved.faqs)?saved.faqs:defaults.faqs).map((faq:Content['faqs'][number])=>{
 const update=faqUpdates.find(([question,answer])=>faq.question===question&&faq.answer===answer);
 return update?{...faq,answer:update[2]}:faq;
});
return {...defaults,...saved,faqs,siteText:{...siteTextDefaults,...saved.siteText}};});
