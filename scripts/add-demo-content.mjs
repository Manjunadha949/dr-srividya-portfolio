// Explicit operator utility. Credentials arrive through stdin, never source or logs.
import {createClient} from '@libsql/client/web';
let input='';for await(const chunk of process.stdin){input+=chunk;if(input.includes('\n'))break;}
const config=JSON.parse(input.trim());
const client=createClient({url:config.url,authToken:config.authToken});
const articles=[
 {id:'demo-first-visit',title:'Your first consultation: a gentle introduction (Sample)',body:'DEMO ARTICLE — placeholder copy for reviewing the website layout, pending approval by Dr. Srividya.\n\nA first appointment is a chance to share what brings you here, ask questions, and talk about what you hope to understand.\n\nReplace this sample with the doctor’s own explanation of the consultation process before using it as patient guidance.',image:'/images/srividya-clinic-1200.webp'},
 {id:'demo-child-emotions',title:'Making space for children’s feelings (Sample)',body:'DEMO ARTICLE — editorial placeholder, pending the doctor’s review.\n\nThis space can feature an article about everyday conversations with children, listening to their experiences, and understanding their school and home environment.\n\nThe doctor can replace this text, add practical examples, and publish her own educational resources through the admin panel.',image:'/images/srividya-chair-960.webp'},
 {id:'demo-everyday-wellbeing',title:'Small moments for everyday wellbeing (Sample)',body:'DEMO ARTICLE — this is sample website content, not medical advice.\n\nUse this article space to introduce the doctor’s approach to everyday wellbeing, routines, and making time for meaningful conversations.\n\nReplace this placeholder with approved content and any relevant references before publication as a clinical resource.',image:'/images/srividya-clinic-1200.webp'}
];
const videos=[['Jane the Brain and the Stress Mess','BEpTSgLfv18'],['Jane the Brain and the Frustration Sensation','AfKOuJ-s3iA'],['Jane the Brain and the Upset Reset','rasvHAWjBj0']].map(([title,id])=>({title:'Sample resource · NIMH: '+title,url:'https://www.youtube.com/watch?v='+id,image:'https://i.ytimg.com/vi/'+id+'/hqdefault.jpg'}));
const testimonials=[
 {name:'Demo testimonial 1',quote:'Sample text: a welcoming space to feel heard and ask questions. This is fictional layout content, not a real patient review.',source:'DEMO ONLY · Not a patient review',url:''},
 {name:'Demo testimonial 2',quote:'Sample text: clear conversations and a thoughtful approach to family concerns. This is fictional layout content, not a real patient review.',source:'DEMO ONLY · Not a patient review',url:''},
 {name:'Demo testimonial 3',quote:'Sample text: taking time to understand each person’s story. This is fictional layout content, not a real patient review.',source:'DEMO ONLY · Not a patient review',url:''}
];
try{
 const result=await client.execute({sql:'SELECT data FROM content WHERE id=?',args:['profile']});
 if(!result.rows.length)throw Error('Profile missing');
 const previous=String(result.rows[0].data);const data=JSON.parse(previous);
 for(const [key,items] of Object.entries({articles,videos,testimonials})){
  const current=data[key]||[];
  data[key]=[...current,...items.filter(item=>!current.some(existing=>key==='articles'?existing.id===item.id:key==='videos'?existing.url===item.url:existing.name===item.name))];
 }
 const next=JSON.stringify(data);
 await client.batch([{sql:'INSERT INTO content(id,data) VALUES(?,?)',args:['backup-demo-'+Date.now(),previous]},{sql:'UPDATE content SET data=? WHERE id=? AND data=?',args:[next,'profile',previous]}],'write');
 const check=await client.execute({sql:'SELECT data FROM content WHERE id=?',args:['profile']});
 if(String(check.rows[0].data)!==next)throw Error('Concurrent edit; no content overwritten. Retry with fresh profile.');
 console.log(JSON.stringify({verified:true,articles:data.articles.length,videos:data.videos.length,testimonials:data.testimonials.length}));
}finally{client.close();}
