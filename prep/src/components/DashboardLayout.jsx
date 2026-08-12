import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Hotel, BedDouble, CalendarDays, Star, Banknote, Sparkles, Settings as SettingsIcon, LogOut, Bell, UserCircle, Menu } from "lucide-react";

const links = [
  ["overview", "Overview", LayoutDashboard],
  ["hotel", "My Hotel", Hotel],
  ["rooms", "Rooms", BedDouble],
  ["bookings", "Bookings", CalendarDays],
  ["reviews", "Reviews", Star],
  ["revenue", "Revenue", Banknote],
  ["cleaning", "Cleaning", Sparkles],
  ["settings", "Settings", SettingsIcon]
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="side-brand">StayEase<span>Premium Management</span></div>
        <nav className="side-nav">
          {links.map(([to, label, Icon]) => (
            <NavLink key={to} to={`/owner/${to}`} className={({isActive}) => isActive ? "side-link active" : "side-link"}>
              <Icon size={20}/><span>{label}</span>
            </NavLink>
          ))}
          <button className="side-link logout" onClick={() => navigate("/login")}><LogOut size={20}/><span>Logout</span></button>
        </nav>
      </aside>
      <main className="dashboard-main">
        <header className="dash-topbar">
          <Menu size={23}/>
          <h2>Dashboard</h2>
          <div className="top-actions"><Bell size={21}/><UserCircle size={23}/></div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}