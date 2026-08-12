import React from "react";
import { CalendarDays, Banknote, DoorOpen, BedDouble, TrendingUp, ArrowRight, Pencil } from "lucide-react";
import { bookings } from "../../data";

export default function Overview() {
 return <div className="dash-content"><div className="welcome"><div><h1>Welcome back, Manager</h1><p>Here is the overview of your hotel's performance today.</p></div></div>
 <div className="stats-grid">
  <Stat icon={CalendarDays} label="TOTAL BOOKINGS" value="1,248" trend="+12% vs last month"/>
  <Stat icon={Banknote} label="REVENUE" value="$84,520" trend="+8.5% vs last month"/>
  <Stat icon={DoorOpen} label="AVAILABLE ROOMS" value="42" sub="35% availability"/>
  <Stat icon={BedDouble} label="OCCUPIED ROOMS" value="78" sub="65% occupancy"/>
 </div>
 <div className="two-col"><div className="panel"><div className="panel-head"><h2>Revenue Trends</h2><select><option>Last 6 Months</option><option>This Year</option></select></div><div className="fake-chart">{[45,65,50,78,60,88].map((h,i)=><div className="bar" style={{height:`${h}%`}} key={i}></div>)}</div></div>
 <div className="analytics-panel"><h2>Booking Analytics</h2><p>Quick insights into your guest demographics and booking channels.</p><div className="analytics-row">Direct Bookings <b>45%</b></div><div className="progress"><i style={{width:"45%"}}/></div><div className="analytics-row">Online Travel Agencies <b>35%</b></div><div className="progress"><i style={{width:"35%"}}/></div><div className="analytics-row">Corporate Accounts <b>20%</b></div><div className="progress"><i style={{width:"20%"}}/></div><button className="outline-light">View Detailed Report</button></div></div>
 <div className="panel table-panel"><div className="panel-head"><h2>Recent Bookings</h2><a href="/owner/bookings">View All <ArrowRight size={17}/></a></div><Table rows={bookings}/></div>
 </div>
}
function Stat({icon:Icon,label,value,trend,sub}){return <div className="stat-card"><div className="stat-top"><span>{label}</span><Icon/></div><strong>{value}</strong>{trend?<small className="trend">↗ {trend}</small>:<small>{sub}</small>}</div>}
function Table({rows}){return <div className="table-wrap"><table><thead><tr><th>GUEST</th><th>ROOM</th><th>DATES</th><th>AMOUNT</th><th>STATUS</th><th>ACTIONS</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td><b>{r.guest}</b><small>{r.email}</small></td><td>{r.room}</td><td>{r.dates}</td><td><b>{r.amount}</b></td><td><span className={`status ${r.status.toLowerCase()}`}>{r.status}</span></td><td><Pencil size={17}/></td></tr>)}</tbody></table></div>}