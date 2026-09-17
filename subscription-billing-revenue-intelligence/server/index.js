import express from "express";
import cors from "cors";
import crypto from "crypto";

const app=express();
app.use(cors());
app.use(express.json());

const db={
 products:[
  {id:"p1",name:"Core Platform",description:"Subscription management and billing essentials",active:true},
  {id:"p2",name:"Revenue Intelligence",description:"Advanced analytics and AI revenue insights",active:true},
  {id:"p3",name:"Enterprise Suite",description:"Controls, auditability and premium support",active:true}
 ],
 plans:[
  {id:"plan1",productId:"p1",name:"Starter",price:4900,currency:"USD",interval:"month",trialDays:14},
  {id:"plan2",productId:"p1",name:"Growth",price:14900,currency:"USD",interval:"month",trialDays:14},
  {id:"plan3",productId:"p2",name:"Intelligence",price:29900,currency:"USD",interval:"month",trialDays:30},
  {id:"plan4",productId:"p3",name:"Enterprise",price:79900,currency:"USD",interval:"month",trialDays:30}
 ],
 customers:[
  {id:"cus1",name:"Northstar Labs",email:"billing@northstar.io",planId:"plan3",status:"active",mrr:299},
  {id:"cus2",name:"Vertex Studio",email:"finance@vertex.studio",planId:"plan2",status:"active",mrr:149},
  {id:"cus3",name:"Atlas Commerce",email:"ops@atlascommerce.co",planId:"plan2",status:"past_due",mrr:149},
  {id:"cus4",name:"Lumen Health",email:"accounts@lumen.health",planId:"plan1",status:"trialing",mrr:49}
 ],
 invoices:[
  {id:"inv_1001",customer:"Northstar Labs",amount:299,status:"paid",due:"2026-09-08"},
  {id:"inv_1002",customer:"Vertex Studio",amount:149,status:"paid",due:"2026-09-10"},
  {id:"inv_1003",customer:"Atlas Commerce",amount:149,status:"past_due",due:"2026-09-11"},
  {id:"inv_1004",customer:"Lumen Health",amount:49,status:"open",due:"2026-09-20"}
 ],
 coupons:[
  {id:"SAVE20",name:"Launch Saver",type:"percent",value:20,redemptions:38,active:true},
  {id:"ANNUAL50",name:"Annual Advantage",type:"percent",value:15,redemptions:21,active:true}
 ],
 events:[],
 processedWebhooks:new Set(),
 role:"admin"
};

function audit(action,actor="admin"){
 db.events.unshift({id:crypto.randomUUID(),action,actor,at:new Date().toISOString()});
}
function money(n){return `$${Number(n).toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:0})}`}

app.get("/api/dashboard",(req,res)=>{
 const mrr=db.customers.reduce((s,c)=>s+c.mrr,0);
 const active=db.customers.filter(c=>c.status==="active").length;
 const pastDue=db.customers.filter(c=>c.status==="past_due").length;
 const paid=db.invoices.filter(i=>i.status==="paid").reduce((s,i)=>s+i.amount,0);
 res.json({mrr,arr:mrr*12,active,pastDue,paid,products:db.products,plans:db.plans});
});
app.get("/api/customers",(req,res)=>res.json(db.customers));
app.get("/api/products",(req,res)=>res.json(db.products));
app.get("/api/plans",(req,res)=>res.json(db.plans));
app.get("/api/invoices",(req,res)=>res.json(db.invoices));
app.get("/api/coupons",(req,res)=>res.json(db.coupons));
app.get("/api/audit",(req,res)=>res.json(db.events));

app.post("/api/products",(req,res)=>{
 const p={id:"p"+Date.now(),name:req.body.name||"New Product",description:req.body.description||"",active:true};
 db.products.push(p); audit(`Product created: ${p.name}`); res.status(201).json(p);
});
app.post("/api/plans",(req,res)=>{
 const p={id:"plan"+Date.now(),productId:req.body.productId||"p1",name:req.body.name||"New Plan",price:Number(req.body.price||0),currency:"USD",interval:req.body.interval||"month",trialDays:Number(req.body.trialDays||0)};
 db.plans.push(p); audit(`Plan created: ${p.name}`); res.status(201).json(p);
});
app.post("/api/coupons",(req,res)=>{
 const c={id:(req.body.code||"SAVE"+Date.now()).toUpperCase(),name:req.body.name||"New Coupon",type:"percent",value:Number(req.body.value||10),redemptions:0,active:true};
 db.coupons.push(c); audit(`Coupon created: ${c.id}`); res.status(201).json(c);
});

app.post("/api/dunning/:id",(req,res)=>{
 const inv=db.invoices.find(x=>x.id===req.params.id);
 if(!inv) return res.status(404).json({error:"Invoice not found"});
 inv.dunning={stage:1,nextAttempt:"24 hours",result:"retry_scheduled"};
 audit(`Dunning simulation for ${inv.id}`);
 res.json(inv);
});

app.post("/api/churn-summary",(req,res)=>{
 const atRisk=db.customers.filter(c=>["past_due","trialing"].includes(c.status));
 const summary=atRisk.length
  ? `There are ${atRisk.length} customers needing attention. ${db.customers.filter(c=>c.status==="past_due").length} are past due and should receive payment-recovery outreach. Trial accounts should receive activation guidance before trial expiry.`
  : "No immediate churn-risk signals are present in the current customer sample.";
 res.json({summary,signals:["Past-due invoices","Trial-stage customers","Payment recovery opportunity"],customers:atRisk});
});

app.post("/api/revenue-query",(req,res)=>{
 const q=String(req.body.query||"").toLowerCase();
 const mrr=db.customers.reduce((s,c)=>s+c.mrr,0);
 let answer,metric;
 if(q.includes("mrr")||q.includes("monthly recurring")){metric="MRR";answer=`Current MRR is ${money(mrr)} across ${db.customers.length} customer accounts.`}
 else if(q.includes("arr")||q.includes("annual")){metric="ARR";answer=`Annualized recurring revenue is ${money(mrr*12)}.`}
 else if(q.includes("past")||q.includes("dunning")||q.includes("overdue")){metric="Past-due revenue";const x=db.customers.filter(c=>c.status==="past_due").reduce((s,c)=>s+c.mrr,0);answer=`${money(x)} of MRR is associated with past-due accounts.`}
 else if(q.includes("active")){metric="Active subscriptions";answer=`There are ${db.customers.filter(c=>c.status==="active").length} active subscriptions.`}
 else {metric="Approved metric set";answer="I can answer using approved metrics: MRR, ARR, active subscriptions, paid invoice revenue, past-due revenue, and customer counts."}
 res.json({answer,metric,approved:true});
});

app.post("/api/webhooks/stripe",(req,res)=>{
 const eventId=req.header("Idempotency-Key")||req.body.id||crypto.randomUUID();
 if(db.processedWebhooks.has(eventId)) return res.json({received:true,duplicate:true});
 db.processedWebhooks.add(eventId);
 audit(`Webhook processed: ${req.body.type||"stripe.event"} (${eventId})`,"stripe");
 res.json({received:true,duplicate:false});
});

app.post("/api/entitlements/check",(req,res)=>{
 const c=db.customers.find(x=>x.id===req.body.customerId);
 if(!c) return res.status(404).json({allowed:false});
 const plan=db.plans.find(x=>x.id===c.planId);
 const allowed=c.status==="active"||c.status==="trialing";
 res.json({allowed,customer:c.name,plan:plan?.name||"Unknown",reason:allowed?"Subscription entitlement is valid":"Subscription is not entitled"});
});

app.post("/api/role",(req,res)=>{
 const roles=["admin","billing_manager","analyst","support"];
 if(!roles.includes(req.body.role)) return res.status(400).json({error:"Invalid role"});
 db.role=req.body.role; audit(`Role switched to ${db.role}`); res.json({role:db.role});
});

app.get("/api/health",(req,res)=>res.json({ok:true,service:"billing-api"}));
app.listen(5000,()=>console.log("Billing API running on http://localhost:5000"));
