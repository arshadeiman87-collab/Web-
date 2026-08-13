import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [role,setRole]=useState("owner"); const navigate=useNavigate();
  const submit=e=>{e.preventDefault(); navigate(role==="admin"?"/admin/overview":"/owner/overview")};
  return <div className="login-page">
    <div className="login-card"><div className="brand centered">StayEase</div><p className="login-subtitle">Sign in to your management dashboard</p>
      <div className="role-tabs"><button className={role==="owner"?"selected":""} onClick={()=>setRole("owner")}>Hotel Owner</button><button className={role==="admin"?"selected":""} onClick={()=>setRole("admin")}>Admin</button></div>
      <form onSubmit={submit}><label>Email Address</label><div className="field"><Mail/><input type="email" placeholder="manager@hotel.com" required/></div><label>Password</label><div className="field"><Lock/><input type="password" placeholder="••••••••" required/></div><div className="remember"><label><input type="checkbox"/> Remember Me</label><a href="#forgot">Forgot Password?</a></div><button className="gold-btn full">Login</button></form>
      <p className="register-prompt">Not a partner? <Link to="/register-hotel">List Your Hotel</Link></p>
    </div>
  </div>
}