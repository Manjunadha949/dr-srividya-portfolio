import {PagePrefetch} from './page-prefetch';
import type { Metadata } from 'next';
import { siteUrl } from '@/lib/seo';
import './globals.css';
import { PageMotion } from './page-motion';
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:'Dr. Srividya | Psychiatry & Child Mental Health',template:'%s | Dr. Srividya'},description:'Meet Dr. Bellapukonda Srividya. Psychiatry and child & adolescent mental health care.',robots:{index:true,follow:true},openGraph:{type:'website',siteName:'Dr. Srividya',locale:'en_IN',images:[{url:'/images/srividya-clinic-1200.webp',alt:'Dr. Bellapukonda Srividya'}]},twitter:{card:'summary_large_image'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><head><link rel="preload" href="/fonts/lora-500.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/fonts/inter-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body>{children}<PageMotion/><PagePrefetch/></body></html>}
