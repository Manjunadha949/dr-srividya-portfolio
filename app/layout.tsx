import type { Metadata } from 'next';
import { siteUrl } from '@/lib/seo';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:'Dr. Srividya | Psychiatry & Child Mental Health',template:'%s | Dr. Srividya'},description:'Meet Dr. Bellapukonda Srividya. Psychiatry and child & adolescent mental health care.',robots:{index:true,follow:true},openGraph:{type:'website',siteName:'Dr. Srividya',locale:'en_IN',images:[{url:'/images/doctor-smiling.png',alt:'Dr. Srividya'}]},twitter:{card:'summary_large_image'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
