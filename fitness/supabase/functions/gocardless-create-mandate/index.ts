import {cors,json} from "../_shared/cors.ts";
Deno.serve(async req=>{
 if(req.method==="OPTIONS") return new Response("ok",{headers:cors});
 const token=Deno.env.get("GOCARDLESS_ACCESS_TOKEN"), env=Deno.env.get("GOCARDLESS_ENVIRONMENT")||"sandbox";
 if(!token) return json({error:"GOCARDLESS_ACCESS_TOKEN is not configured"},503);
 const base=env==="live"?"https://api.gocardless.com":"https://api-sandbox.gocardless.com";
 const body=await req.json();
 const r=await fetch(base+"/customers",{method:"POST",headers:{"Authorization":`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({customers:{given_name:body.given_name,family_name:body.family_name,email:body.email,metadata:{gym_id:body.gym_id}}})});
 return json(await r.json(),r.status);
});
