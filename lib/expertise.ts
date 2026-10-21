import type { Content } from './defaults';
export function expertiseSlug(title:string,child=false){return (child?'child-':'')+title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
export const careCategories=[
 {slug:'mood-anxiety',title:'Mood & Anxiety',summary:'Understanding anxiety, depression, OCD, and changes in mood.',items:['Anxiety','Depression','OCD','Bipolar disorder']},
 {slug:'children-adolescents',title:'Children & Adolescents',summary:'Development, learning, emotions, and behaviour in the context of a child’s life.',items:[]},
 {slug:'womens-mental-health',title:'Women’s Mental Health',summary:'Mental health support through pregnancy, the postpartum period, and perimenopause.',items:['Mood disorders in pregnancy and postpartum','Perimenopause mental health issues']},
 {slug:'sleep-wellbeing',title:'Sleep & Well-being',summary:'A closer look at sleep, daily routines, and emotional well-being.',items:['Sleep problems']},
 {slug:'across-life-stages',title:'Across Life Stages',summary:'Support for complex mental health concerns and changing needs over time.',items:['Schizophrenia','Addictions','Dementia']}
];
const summaries:Record<string,string>={
 'Anxiety':'Anxiety can involve persistent worry, fear, or physical tension that interferes with everyday activities.',
 'Depression':'Depression can affect mood, interest, energy, sleep, and everyday functioning. In younger people, changes may also appear as irritability.',
 'OCD':'Obsessive-compulsive disorder involves unwanted recurring thoughts and repetitive behaviours or mental rituals that can become distressing and time-consuming.',
 'Sleep problems':'Sleep concerns can include difficulty falling asleep, staying asleep, or feeling rested. A review considers sleep patterns alongside physical and mental health.',
 'Schizophrenia':'Schizophrenia can affect perception, thinking, emotions, and functioning. Assessment and ongoing professional support are important.',
 'Bipolar disorder':'Bipolar disorder involves episodes of depression and episodes of unusually elevated or irritable mood, with changes in energy and activity.',
 'Addictions':'Addiction concerns can involve difficulty controlling substance use despite harm to health, relationships, or daily life.',
 'Mood disorders in pregnancy and postpartum':'Changes in mood or anxiety during pregnancy and after birth deserve attention. Assessment considers both the parent’s well-being and the needs of the family.',
 'Perimenopause mental health issues':'Mood, anxiety, and sleep concerns during perimenopause need an individual review that also considers physical health and life circumstances.',
 'Dementia':'Dementia describes difficulties with memory and other thinking abilities that affect daily life. Memory changes require assessment rather than assumptions about ageing.',
 'Autism':'Autism is a neurodevelopmental difference involving communication, social interaction, and patterns of behaviour or interests. Support is tailored to the individual’s strengths and needs.',
 'ADHD':'ADHD involves ongoing difficulties with attention, activity level, or impulse control that affect functioning. Assessment looks at development and experiences across settings.',
 'Speech delay':'Speech and language concerns need a developmental review. Hearing assessment and speech-language evaluation may form part of a wider referral plan.',
 'Behaviour problems':'Behaviour concerns are understood alongside a child’s development, emotions, relationships, and environment, rather than through blame.',
 'Academic difficulty':'Difficulties at school can have several causes. Understanding learning, attention, emotional well-being, and the school environment helps identify useful support.',
 'Learning Disability':'Learning concerns need an individual developmental and educational assessment. Terminology can mean different things, so identifying the specific difficulty is an important first step.',
 'Dyslexia':'Dyslexia affects aspects of reading and spelling. A learning assessment can help identify needs and guide educational support.',
 'School Refusal':'Difficulty attending school may be connected to anxiety, bullying, learning concerns, or other stresses. A collaborative review helps understand the underlying reasons.',
 'Anxiety in children':'Children may express anxiety through worries, avoidance, physical complaints, or changes in behaviour. Assessment considers age, development, and home and school life.',
 'Bed wetting':'Bed wetting is not a child’s fault. A review considers age, patterns, and possible medical or developmental factors before deciding what support is appropriate.',
 'Conduct Disorder':'Persistent behaviour that harms others or seriously breaks rules needs careful assessment. Family, school, developmental, and mental health factors all need consideration.'
};
export function expertiseEntries(d:Content){return [...d.adult.map(title=>({title,child:false,slug:expertiseSlug(title)})),...d.child.map(title=>({title,child:true,slug:expertiseSlug(title,true)}))];}
export function detailFor(d:Content,slug:string){const entry=expertiseEntries(d).find(x=>x.slug===slug);const category=careCategories.find(x=>x.slug===slug);if(!entry&&!category)return null;const child=entry?.child||slug==='children-adolescents';const base={slug,title:entry?.title||category!.title,child,overview:entry?(summaries[entry.title]||'An individual consultation can help explore this concern and identify the next steps.'):category!.summary,assessment:child?'A consultation explores development, health history, emotions, behaviour, and daily life. Information from parents or carers and, where appropriate, school can help build a fuller picture. Further assessments or referrals may be discussed.':'A consultation explores the concerns you bring, their timing and effect on daily life, your health history, sleep, and any current treatment. Further assessment or referral may be discussed where needed.',support:'The next steps depend on the assessment and your preferences. A plan may include information, psychological support, practical changes, medication when appropriate, or referral to another professional. The suitability of each option is discussed individually.',when:child?'Consider an assessment when concerns persist, cause distress, or affect learning, relationships, sleep, or everyday life. Bring relevant school reports and previous assessments if available.':'Consider an assessment when symptoms persist, cause distress, or affect daily activities and relationships. Bring a list of current medicines and previous reports if available.'};return {...base,...d.expertiseDetails.find(x=>x.slug===slug)};}
