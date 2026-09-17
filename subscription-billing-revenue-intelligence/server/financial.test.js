import test from "node:test";
import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
import {spawn} from "node:child_process";

let proc;
test.before(()=>{proc=spawn(process.execPath,["index.js"],{stdio:"ignore"});});
test.after(()=>proc.kill());

test("dashboard exposes positive MRR and ARR",async()=>{
 const d=await (await fetch("http://localhost:5000/api/dashboard")).json();
 assert.equal(d.arr,d.mrr*12);
 assert.ok(d.mrr>0);
});
test("entitlement allows active customer",async()=>{
 const r=await (await fetch("http://localhost:5000/api/entitlements/check",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({customerId:"cus1"})})).json();
 assert.equal(r.allowed,true);
});
test("revenue query uses approved metric",async()=>{
 const r=await (await fetch("http://localhost:5000/api/revenue-query",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:"What is our MRR?"})})).json();
 assert.equal(r.approved,true);
 assert.equal(r.metric,"MRR");
});
test("webhook is idempotent",async()=>{
 const body=JSON.stringify({id:"evt_financial_test",type:"invoice.paid"});
 const opts={method:"POST",headers:{"Content-Type":"application/json","Idempotency-Key":"evt_financial_test"},body};
 const a=await (await fetch("http://localhost:5000/api/webhooks/stripe",opts)).json();
 const b=await (await fetch("http://localhost:5000/api/webhooks/stripe",opts)).json();
 assert.equal(a.duplicate,false);
 assert.equal(b.duplicate,true);
});
