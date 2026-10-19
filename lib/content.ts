import { getDb } from "@/db";
import { content } from "@/db/schema";
import { defaults, type Content } from "./defaults";
export async function readContent(): Promise<Content> { const rows=await getDb().select().from(content).limit(1); const result = rows.length ? {...defaults,...JSON.parse(rows[0].data)} : {...defaults}; if(["/images/doctor.png","/images/doctor-edited.png","/images/doctor-seated.png"].includes(result.photo)) result.photo="/images/doctor-smiling.png"; return result as Content; }
