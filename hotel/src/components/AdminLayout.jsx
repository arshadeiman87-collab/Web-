import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, ClipboardClock, Hotel, Users, CalendarDays, Banknote, Settings as SettingsIcon, LogOut, Bell, UserCircle } from "lucide-react";

const links = [
  ["overview", "Overview", LayoutDashboard],
  ["pending", "Pending Requests", ClipboardClock],
  ["approved", "Approved Hotels", Hotel],
  ["owners", "Owners", Users],
  ["bookings", "Bookings", CalendarDays],
  ["revenue", "Revenue", Banknote],
  ["settings", "Settings", SettingsIcon]
];

export default function AdminLayout() {
  const navigate = useNavigate();
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="side-brand">StayEase<span>Admin Dashboard</span></div>
        <nav className="side-nav">
          {links.map(([to, label, Icon]) => (
            <NavLink key={to} to={`/admin/${to}`} className={({isActive}) => isActive ? "side-link active" : "side-link"}>
              <Icon size={20}/><span>{label}</span>
            </NavLink>
          ))}
          <button className="side-link logout" onClick={() => navigate("/login")}><LogOut size={20}/><span>Logout</span></button>
        </nav>
      </aside>
      <main className="dashboard-main">
        <header className="dash-topbar">
          <h2>Dashboard Overview</h2>
          <div className="admin-user"><Bell size={21}/><UserCircle size={30}/><span><b>Admin User</b><small>Super Administrator</small></span></div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}