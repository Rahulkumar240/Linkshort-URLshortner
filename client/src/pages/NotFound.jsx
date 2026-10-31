import { ArrowLeft, Link2 } from "lucide-react";
import { Link } from "react-router-dom";
import Brand from "../components/Brand";

export default function NotFound() {
  return <div className="not-found"><Brand/><div className="not-found-content"><span className="not-found-number">404</span><h1>This link went nowhere.</h1><p>The page you're looking for may have moved or doesn't exist.</p><Link to="/" className="btn btn-primary"><ArrowLeft size={16}/> Back to home</Link></div><span className="not-found-mark"><Link2 size={120}/></span></div>;
}
