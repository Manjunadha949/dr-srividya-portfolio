import { isAdmin } from '@/lib/admin';
export const metadata={title:"Owner Studio",robots:{index:false,follow:false}};
import { requireChatGPTUser } from "../chatgpt-auth";
import { readContent } from "@/lib/content";
import Editor from "./editor";
export const dynamic="force-dynamic";
export default async function Studio(){const user=await requireChatGPTUser("/studio"); if(!isAdmin(user.email)) return <main className="section"><h1>Owner access required</h1><p>This account does not have permission to edit the website.</p></main>;return <Editor initial={await readContent()}/>}
