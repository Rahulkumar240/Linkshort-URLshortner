import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="app-shell">
    <div className={`sidebar-wrap ${menuOpen ? "sidebar-open" : ""}`}><Sidebar/></div>
    {menuOpen && <button className="mobile-scrim" aria-label="Close menu" onClick={() => setMenuOpen(false)}/>}
    <main className="main-panel"><Topbar onMenu={() => setMenuOpen(!menuOpen)}/><div className="page-content"><Outlet/></div></main>
  </div>;
}
