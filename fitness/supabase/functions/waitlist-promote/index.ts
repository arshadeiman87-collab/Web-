import {cors,json} from "../_shared/cors.ts";
import {createClient} from "https://esm.sh/@supabase/supabase-js@2";
Deno.serve(async req=>{
 if(req.method==="OPTIONS") return new Response("ok",{headers:cors});
 const {class_id}=await req.json();
 const sb=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
 const {data:next}=await sb.from("waitlist").select("*").eq("class_id",class_id).eq("status","waiting").order("position").limit(1).maybeSingle();
 if(!next)return json({promoted:false,message:"No waiting member"});
 await sb.from("waitlist").update({status:"promoted",promoted_at:new Date().toISOString()}).eq("id",next.id);
 await sb.from("bookings").insert({class_id,member_id:next.member_id,status:"booked"});
 return json({promoted:true,member_id:next.member_id});
});
