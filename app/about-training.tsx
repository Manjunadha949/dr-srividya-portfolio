import type {Content} from '@/lib/defaults';
import {Label} from './components';
function qualification(value:string){
 const split=value.indexOf(' — ');
 if(split>=0)return {title:value.slice(0,split),detail:value.slice(split+3)};
 const match=value.match(/^(Postdoctoral fellowship|Certificate course) in (.+)$/i);
 return match?{title:match[1],detail:match[2]}:{title:value,detail:''};
}
function practice(value:string){
 const match=value.match(/^(Since \d{4})\s*[—–-]\s*(.+)$/i);
 return match?{date:match[1],text:match[2]}:{date:'',text:value};
}
export function AboutTraining({content}:{content:Content}){
 const text=content.siteText;
 return <section className="aboutTraining" aria-labelledby="training-title">
  <header className="trainingHeading"><Label>{text.aboutTrainingLabel}</Label><h2 id="training-title">{text.aboutTrainingTitle}</h2><p>{text.aboutTrainingLead}</p></header>
  <div className="trainingColumns">
   <section className="qualificationPanel" aria-labelledby="qualifications-title"><Label>{text.copy26}</Label><h3 id="qualifications-title">{text.aboutQualificationsTitle}</h3><ol className="qualificationList">{content.education.map((value,index)=>{const entry=qualification(value);return <li key={index}><span className="qualificationNumber" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><div><h4>{entry.title}</h4>{entry.detail&&<p>{entry.detail}</p>}</div></li>})}</ol></section>
   <section className="practicePanel" aria-labelledby="practice-title"><Label>{text.copy27}</Label><h3 id="practice-title">{text.aboutPracticeTitle}</h3><ol className="practiceTimeline">{content.experience.map((value,index)=>{const entry=practice(value);return <li key={index}>{entry.date&&<p className="practiceDate">{entry.date}</p>}<p className="practiceDescription">{entry.text}</p></li>})}</ol></section>
  </div>
 </section>;
}
