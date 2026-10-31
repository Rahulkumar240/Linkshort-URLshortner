import { ExternalLink, MoreHorizontal, Pause, Play, Trash2 } from "lucide-react";
import { useLinks } from "../context/LinksContext";
import { publicShortUrl, truncate } from "../utils/format";
import CopyButton from "./CopyButton";

export default function LinkTable({ limit }) {
  const { links, deleteLink, toggleStatus } = useLinks();
  const rows = limit ? links.slice(0, limit) : links;
  if (!rows.length) return <div className="empty-state"><span>🔗</span><h3>No links yet</h3><p>Create your first short link to see it here.</p></div>;
  return <div className="table-scroll"><table className="links-table"><thead><tr><th>SHORT LINK</th><th>DESTINATION</th><th>CLICKS</th><th>CREATED</th><th>STATUS</th><th></th></tr></thead><tbody>{rows.map((link) => <tr key={link.id}>
    <td><div className="short-cell"><span className="link-favicon">↗</span><div><a href={publicShortUrl(link.code)} target="_blank" rel="noreferrer">{publicShortUrl(link.code)}</a><small>/{link.code}</small></div></div></td>
    <td><span className="destination-cell" title={link.originalUrl}>{truncate(link.originalUrl, 38)}</span></td>
    <td><b>{link.clicks.toLocaleString()}</b></td><td>{new Date(link.createdAt).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</td>
    <td><span className={`status-pill ${link.status.toLowerCase()}`}><i/>{link.status}</span></td>
    <td><div className="row-actions"><CopyButton value={publicShortUrl(link.code)}/><button className="icon-button" title={link.status === "Active" ? "Pause link" : "Activate link"} onClick={() => toggleStatus(link.id)}>{link.status === "Active" ? <Pause size={15}/> : <Play size={15}/>}</button><button className="icon-button danger-hover" title="Delete link" onClick={() => { if (window.confirm("Delete this short link?")) deleteLink(link.id); }}><Trash2 size={15}/></button></div></td>
  </tr>)}</tbody></table></div>;
}
