import { Link } from "react-router-dom";
import { Link2 } from "lucide-react";

export default function Brand({ light = false }) {
  return (
    <Link to="/" className={`brand ${light ? "brand-light" : ""}`}>
      <span className="brand-mark"><Link2 size={20} strokeWidth={2.7} /></span>
      <span>linkly<span className="brand-dot">.</span></span>
    </Link>
  );
}
