export const socialPlatforms=[
 {key:'instagram',label:'Instagram',placeholder:'https://www.instagram.com/yourprofile'},
 {key:'facebook',label:'Facebook',placeholder:'https://www.facebook.com/yourpage'},
 {key:'youtube',label:'YouTube',placeholder:'https://www.youtube.com/@yourchannel'},
 {key:'linkedin',label:'LinkedIn',placeholder:'https://www.linkedin.com/in/yourprofile'},
 {key:'x',label:'X (Twitter)',placeholder:'https://x.com/yourprofile'},
 {key:'threads',label:'Threads',placeholder:'https://www.threads.net/@yourprofile'},
 {key:'whatsapp',label:'WhatsApp',placeholder:'https://wa.me/919876543210'},
 {key:'telegram',label:'Telegram',placeholder:'https://t.me/yourprofile'},
 {key:'website',label:'Website',placeholder:'https://yourwebsite.com'},
] as const;
export function safeSocialUrl(value:unknown):string|null{if(typeof value!=='string'||!value.trim())return null;try{const url=new URL(value.trim());if(url.protocol!=='https:'||!url.hostname||url.username||url.password)return null;return url.href;}catch{return null;}}
