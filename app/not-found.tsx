import {Header,Footer,Label} from './components';
import {readContent} from '@/lib/content';
export const metadata={title:'Page not found',robots:{index:false,follow:false}};
export default async function NotFound(){
 const {siteText:text}=await readContent();
 return <div className="notFoundPage"><Header/><main className="notFoundMain section"><div className="notFoundNumber" aria-hidden="true">404<span/></div><div className="notFoundCopy"><Label>{text.notFoundLabel}</Label><h1>{text.notFoundTitle}</h1><p>{text.notFoundDescription}</p><div className="notFoundActions"><a className="button" href="/">{text.notFoundHome} <span aria-hidden="true">→</span></a><a className="button secondary" href="/contact">{text.notFoundContact}</a></div><a className="textLink" href="/resources">{text.notFoundResources} <span aria-hidden="true">↗</span></a></div></main><Footer/></div>;
}
