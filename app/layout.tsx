import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Dr. Srividya | Psychiatry & Child Mental Health",description:"Meet Dr. Bellapukonda Srividya. Psychiatry and child & adolescent mental health care.",robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
