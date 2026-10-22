export function ArrowIcon({direction='right'}:{direction?:'right'|'up-right'|'left'}){
 return <svg className={'uiArrow uiArrow-'+direction} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
