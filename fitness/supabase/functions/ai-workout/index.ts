import {cors,json} from "../_shared/cors.ts";
Deno.serve(async req=>{
 if(req.method==="OPTIONS") return new Response("ok",{headers:cors});
 try{
  const {member_id,goal,level,duration_minutes=45,history=[]}=await req.json();
  const apiKey=Deno.env.get("AI_API_KEY"), apiUrl=Deno.env.get("AI_API_URL");
  const prompt=`Create a safe gym workout. Goal:${goal}; level:${level}; duration:${duration_minutes}; performance:${JSON.stringify(history)}. Return JSON exercises with name,sets,reps,notes.`;
  if(apiKey&&apiUrl){
   const r=await fetch(apiUrl,{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${apiKey}`},body:JSON.stringify({prompt})});
   return json({source:"ai_api",member_id,plan:await r.json()});
  }
  return json({source:"demo_adapter",member_id,plan:[
   {name:"Squat",sets:4,reps:6,notes:"RPE 7"},
   {name:"Bench Press",sets:4,reps:8,notes:"Progress gradually"},
   {name:"Row",sets:3,reps:10,notes:"Full range"},
   {name:"Romanian Deadlift",sets:3,reps:8,notes:"Controlled tempo"}
  ]});
 }catch(e){return json({error:String(e)},400)}
});
