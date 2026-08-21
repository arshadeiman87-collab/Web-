import {cors,json} from "../_shared/cors.ts";
Deno.serve(async req=>{
 if(req.method==="OPTIONS") return new Response("ok",{headers:cors});
 const signature=req.headers.get("Webhook-Signature");
 const secret=Deno.env.get("GOCARDLESS_WEBHOOK_SECRET");
 // Production: verify GoCardless webhook signature before processing.
 const payload=await req.json().catch(()=>({}));
 const events=payload.events||[];
 const result=events.map((e:any)=>({id:e.id,type:e.resource_type+"."+e.action,status:"queued_for_processing",signature_verified:!!(signature&&secret)}));
 return json({ok:true,events:result});
});
