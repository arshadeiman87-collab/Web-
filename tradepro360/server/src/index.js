import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import PDFDocument from 'pdfkit';
import Stripe from 'stripe';
import crypto from 'crypto';
dotenv.config();
const app=express(); app.use(cors()); app.use(express.json({limit:'2mb'}));
const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:5*1024*1024}});
const port=process.env.PORT||4000;
const parts=[
 {id:'p1',name:'15mm Copper Pipe (3m)',category:'Plumbing',price:18.5},
 {id:'p2',name:'Isolation Valve 15mm',category:'Plumbing',price:9.95},
 {id:'p3',name:'Boiler Pressure Relief Valve',category:'Heating',price:42},
 {id:'p4',name:'Double Socket 13A',category:'Electrical',price:4.8},
 {id:'p5',name:'RCBO 32A',category:'Electrical',price:29.5},
 {id:'p6',name:'LED Downlight',category:'Electrical',price:14.5},
 {id:'p7',name:'Eco Cleaning Kit',category:'Cleaning',price:24},
 {id:'p8',name:'Descaler & Treatment',category:'Cleaning',price:16.75}
];
let settings={name:'TradePro 360',tagline:'Smart Booking & Dispatch',owner:'Northstar Trades',primary:'#0f766e'};
let engineers=[
 {id:'e1',name:'James Wilson',trade:'Plumber',lat:53.3811,lng:-1.4701,available:true,jobs:1,rating:4.9},
 {id:'e2',name:'Amelia Smith',trade:'Electrician',lat:53.386,lng:-1.465,available:true,jobs:0,rating:4.8},
 {id:'e3',name:'Noah Brown',trade:'Cleaner',lat:53.375,lng:-1.478,available:true,jobs:2,rating:4.7},
 {id:'e4',name:'Oliver Jones',trade:'Plumber',lat:53.392,lng:-1.452,available:false,jobs:0,rating:4.6}
];
let bookings=[
 {id:'TP-1001',customer:'Sarah Khan',phone:'07700 900101',email:'sarah@example.com',trade:'Plumber',service:'Emergency leak repair',address:'Sheffield City Centre',lat:53.3838,lng:-1.4708,date:'2026-08-28',time:'10:00',status:'Assigned',engineerId:'e1',quote:165,paid:false,notes:'Leak under kitchen sink.',messages:[{from:'customer',text:'Please call when you are 20 minutes away.'}],photos:[]},
 {id:'TP-1002',customer:'Tom Evans',phone:'07700 900202',email:'tom@example.com',trade:'Electrician',service:'Socket replacement',address:'Ecclesall, Sheffield',lat:53.355,lng:-1.512,date:'2026-08-28',time:'14:00',status:'New',engineerId:null,quote:95,paid:false,notes:'Two sockets need replacing.',messages:[],photos:[]}
];
const dist=(a,b,c,d)=>{const R=6371,p=Math.PI/180;const x=(c-a)*p,y=(d-b)*p;return 2*R*Math.asin(Math.sqrt(Math.sin(x/2)**2+Math.cos(a*p)*Math.cos(c*p)*Math.sin(y/2)**2));};
function dispatch(b){let candidates=engineers.filter(e=>e.available&&e.trade.toLowerCase()===b.trade.toLowerCase()); if(!candidates.length)candidates=engineers.filter(e=>e.available); candidates.sort((a,b)=>{const da=dist(b.lat,b.lng,a.lat,a.lng),db=dist(b.lat,b.lng,b.lat,b.lng);return (da+a.jobs*.7-(a.rating-4)*2)-(db+b.jobs*.7-(b.rating-4)*2)}); const e=candidates[0]; if(e){b.engineerId=e.id;b.status='Assigned';e.jobs++;} return e;}
app.get('/api/settings',(req,res)=>res.json(settings));
app.post('/api/settings',(req,res)=>{settings={...settings,...req.body};res.json(settings)});
app.get('/api/parts',(req,res)=>res.json(parts));
app.get('/api/engineers',(req,res)=>res.json(engineers));
app.get('/api/bookings',(req,res)=>res.json(bookings));
app.get('/api/bookings/:id',(req,res)=>{const b=bookings.find(x=>x.id===req.params.id);if(!b)return res.status(404).json({error:'Booking not found'});res.json({...b,engineer:engineers.find(e=>e.id===b.engineerId)||null});});
app.post('/api/quote',(req,res)=>{const {trade,partIds=[],labour=85,urgency='standard'}=req.body;const items=partIds.map(id=>parts.find(p=>p.id===id)).filter(Boolean);const material=items.reduce((s,p)=>s+p.price,0);const multiplier=urgency==='emergency'?1.35:1;res.json({items,material:Math.round(material*100)/100,labour:Math.round(labour*multiplier*100)/100,subtotal:Math.round((material+labour*multiplier)*100)/100,total:Math.round((material+labour*multiplier)*1.2*100)/100,vatRate:20,trade});});
app.post('/api/bookings',(req,res)=>{const b={...req.body,id:'TP-'+(1000+bookings.length+1),status:'New',engineerId:null,paid:false,messages:[],photos:[]};const e=dispatch(b);b.status=e?'Assigned':'New';bookings.unshift(b);res.status(201).json({...b,engineer:e});});
app.post('/api/bookings/:id/dispatch',(req,res)=>{const b=bookings.find(x=>x.id===req.params.id);if(!b)return res.status(404).json({error:'Not found'});const e=dispatch(b);res.json({...b,engineer:e});});
app.post('/api/bookings/:id/status',(req,res)=>{const b=bookings.find(x=>x.id===req.params.id);if(!b)return res.status(404).json({error:'Not found'});b.status=req.body.status||b.status;res.json(b);});
app.post('/api/bookings/:id/message',(req,res)=>{const b=bookings.find(x=>x.id===req.params.id);if(!b)return res.status(404).json({error:'Not found'});b.messages.push({from:req.body.from||'customer',text:req.body.text,at:new Date().toISOString()});res.json(b.messages);});
app.post('/api/bookings/:id/photo',upload.single('photo'),(req,res)=>{const b=bookings.find(x=>x.id===req.params.id);if(!b)return res.status(404).json({error:'Not found'});if(!req.file)return res.status(400).json({error:'Photo required'});b.photos.push({name:req.file.originalname,size:req.file.size,type:req.file.mimetype,data:`data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`});res.json(b.photos.map(({name,size,type})=>({name,size,type})));});
app.post('/api/bookings/:id/rating',(req,res)=>{const b=bookings.find(x=>x.id===req.params.id);if(!b)return res.status(404).json({error:'Not found'});const rating=Math.max(1,Math.min(5,Number(req.body.rating)));b.rating=rating;res.json({rating})});
app.post('/api/bookings/:id/location',(req,res)=>{const b=bookings.find(x=>x.id===req.params.id);if(!b)return res.status(404).json({error:'Not found'});const e=engineers.find(x=>x.id===b.engineerId);if(!e)return res.status(400).json({error:'No engineer assigned'});e.lat=Number(req.body.lat);e.lng=Number(req.body.lng);res.json(e);});
app.get('/api/invoice/:id',(req,res)=>{const b=bookings.find(x=>x.id===req.params.id);if(!b)return res.status(404).end();const doc=new PDFDocument({margin:50});res.setHeader('Content-Type','application/pdf');res.setHeader('Content-Disposition',`inline; filename=${b.id}-invoice.pdf`);doc.pipe(res);doc.fontSize(24).text('TradePro 360');doc.moveDown().fontSize(18).text('Service Invoice');doc.fontSize(11).text(`Invoice: INV-${b.id}`).text(`Customer: ${b.customer}`).text(`Service: ${b.service}`).text(`Address: ${b.address}`).text(`Date: ${b.date} ${b.time}`);doc.moveDown().fontSize(14).text(`Total incl. VAT: £${Number(b.quote||0).toFixed(2)}`);doc.fontSize(10).text('Thank you for choosing TradePro 360.');doc.end();});
app.post('/api/payments/:id',(req,res)=>{const b=bookings.find(x=>x.id===req.params.id);if(!b)return res.status(404).json({error:'Not found'});if(process.env.STRIPE_SECRET_KEY){const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);return stripe.checkout.sessions.create({mode:'payment',line_items:[{price_data:{currency:'gbp',product_data:{name:b.service},unit_amount:Math.round(Number(b.quote)*100)},quantity:1}],success_url:`${process.env.PUBLIC_APP_URL||'http://localhost:5173'}/dashboard?paid=${b.id}`,cancel_url:`${process.env.PUBLIC_APP_URL||'http://localhost:5173'}/dashboard`,metadata:{bookingId:b.id}}).then(s=>res.json({url:s.url})).catch(e=>res.status(500).json({error:e.message}));}b.paid=true;b.status='Paid';res.json({demo:true,message:'Demo payment completed',booking:b});});
app.get('/api/health',(req,res)=>res.json({ok:true,service:'TradePro 360 API',id:crypto.randomUUID()}));
app.listen(port,()=>console.log(`TradePro API running on http://localhost:${port}`));
