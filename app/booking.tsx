import type { Content } from '@/lib/defaults';
import { bookingUrl } from '@/lib/booking';
export function Booking({content}:{content:Content}){const url=bookingUrl(content);return <a className="button bookingButton" href={url||'/contact'} target={url?'_blank':undefined} rel={url?'noopener noreferrer':undefined}>{content.siteText.bookingLabel??'Book a consultation'} <span aria-hidden="true">↗</span></a>}
