import {cors,json} from "../_shared/cors.ts";
Deno.serve(async req=>{
 if(req.method==="OPTIONS") return new Response("ok",{headers:cors});
 const {email,name,gym_id}=await req.json(), url=Deno.env.get("CRM_WEBHOOK_URL");
 if(!url) return json({ok:true,mode:"demo",lead:{email,name,gym_id}});
 const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,name,gym_id,source:"google_trial"} )});
 return json({ok:r.ok,crm_status:r.status});
});
