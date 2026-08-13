import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Upload, MapPin, CheckCircle2 } from "lucide-react";

const fields = [
 ["hotelName","Hotel Name"],["ownerName","Business / Owner Name"],["email","Email"],["phone","Phone Number"],
 ["address","Hotel Address"],["city","City"],["country","Country"],["maps","Google Maps Location"],
 ["rooms","Number of Rooms"],["category","Hotel Category"]
];

export default function Register() {
  const [submitted,setSubmitted]=useState(false); const navigate=useNavigate();
  if(submitted) return <div className="success-page"><CheckCircle2 size={70}/><h1>Application Submitted</h1><p>Your hotel registration is now <b>Pending Approval</b>. The admin team will review your application.</p><button className="gold-btn" onClick={()=>navigate("/")}>Back to Home</button></div>;
  return <div className="register-page section"><div className="register-header"><span className="eyebrow">HOTEL OWNER ONBOARDING</span><h1>List Your Hotel</h1><p>Submit your property for review and become part of StayEase.</p></div>
    <form className="register-form" onSubmit={e=>{e.preventDefault();setSubmitted(true)}}><div className="form-section"><h2>1. Property Information</h2><div className="form-grid">{fields.map(([name,label])=><div className="form-group" key={name}><label>{label}</label>{name==="category"?<select required><option value="">Select category</option><option>1–5 Star</option><option>Boutique</option><option>Guest House</option><option>Apartment</option><option>Business</option></select>:<input name={name} required placeholder={`Enter ${label.toLowerCase()}`}/>}</div>)}</div><div className="form-group full-width"><label>Hotel Description</label><textarea rows="5" placeholder="Describe your property..." required/></div></div>
    <div className="form-section"><h2>2. Verification & Images</h2><div className="upload-grid">{["Business License","CNIC / Identity Verification","Hotel Logo","Cover Image","Gallery Images"].map(x=><label className="upload-box" key={x}><Upload/><span>{x}</span><small>Click to upload</small><input type="file" hidden/></label>)}</div></div>
    <div className="notice">After submission your hotel will remain in <b>Pending Approval</b>. You cannot publish rooms or receive bookings until an admin approves the application.</div><button className="gold-btn large">Submit Registration Request</button></form>
  </div>
}