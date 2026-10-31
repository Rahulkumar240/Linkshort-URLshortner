import { BarChart3, ChevronDown, CircleHelp, LayoutDashboard, Link2, LogOut, Settings, Zap } from "lucide-react";
import { NavLink } from "react-router-dom";
import Brand from "../Brand";
import { useAuth } from "../../context/AuthContext";

const nav = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/app/links", label: "My links", icon: Link2 },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/settings", label: "Settings", icon: Settings }
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  return <aside className="sidebar">
    <div className="sidebar-brand"><Brand /></div>
    <div className="workspace-switch"><span className="workspace-avatar">R</span><span><b>Personal workspace</b><small>Free plan</small></span><ChevronDown size={15}/></div>
    <p className="nav-label">WORKSPACE</p>
    <nav className="side-nav">{nav.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}><Icon size={18}/>{label}{label === "My links" && <span className="nav-count">5</span>}</NavLink>)}</nav>
    <div className="sidebar-bottom">
      <div className="upgrade-card"><span className="upgrade-icon"><Zap size={17}/></span><b>Unlock more with Pro</b><p>Get branded domains and deeper insights.</p><button onClick={() => alert("Pro plans will be available soon.")}>Explore plans <span>↗</span></button></div>
      <a className="nav-item muted" href="mailto:support@linkly.app"><CircleHelp size={18}/>Help & support</a>
      <div className="profile-row"><span className="profile-avatar">{(user?.name || "R").slice(0,1).toUpperCase()}</span><span className="profile-info"><b>{user?.name || "Rahul Kumar"}</b><small>{user?.email || "rahul@example.com"}</small></span><button className="icon-button" title="Sign out" onClick={logout}><LogOut size={17}/></button></div>
    </div>
  </aside>;
}
