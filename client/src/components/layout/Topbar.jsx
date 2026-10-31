import { Bell, Search, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const titles = { "/app": ["Overview", "Welcome back. Here's what's happening with your links."], "/app/links": ["My links", "Create, organize, and manage all your short links."], "/app/analytics": ["Analytics", "Understand how people engage with your links."], "/app/settings": ["Settings", "Manage your profile and workspace preferences."] };

export default function Topbar({ onMenu }) {
  const location = useLocation();
  const { user } = useAuth();
  const [title, subtitle] = titles[location.pathname] || titles["/app"];
  return <header className="topbar">
    <button className="mobile-menu icon-button" onClick={onMenu}><Menu size={20}/></button>
    <div className="topbar-heading"><h1>{title}</h1><p>{subtitle}</p></div>
    <div className="topbar-actions"><button className="search-trigger"><Search size={17}/><span>Search links</span><kbd>⌘ K</kbd></button><button className="icon-button notification-btn" aria-label="Notifications"><Bell size={18}/><i/></button><span className="topbar-avatar">{(user?.name || "R").slice(0,1).toUpperCase()}</span></div>
  </header>;
}
