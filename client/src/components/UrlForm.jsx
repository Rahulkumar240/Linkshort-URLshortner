import { useState } from "react";
import { ArrowUpRight, Link2, Sparkles } from "lucide-react";
import { useLinks } from "../context/LinksContext";
import { publicShortUrl } from "../utils/format";
import CopyButton from "./CopyButton";

export default function UrlForm({ compact = false }) {
  const { createLink } = useLinks();
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError(""); setResult(""); setLoading(true);
    try {
      const link = await createLink(url, alias);
      setResult(publicShortUrl(link.code));
      setUrl(""); setAlias("");
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <form className={`url-form ${compact ? "url-form-compact" : ""}`} onSubmit={submit}>
      <label className="field-label" htmlFor="long-url">Paste your long URL</label>
      <div className="url-input-wrap"><Link2 size={19} /><input id="long-url" type="url" required placeholder="https://example.com/your/very/long/link" value={url} onChange={(e) => setUrl(e.target.value)} /></div>
      <div className="form-row">
        <div className="alias-field"><label className="field-label" htmlFor="alias">Custom alias <span>(optional)</span></label><div className="alias-input"><span>linkly.app/</span><input id="alias" placeholder="my-link" value={alias} onChange={(e) => setAlias(e.target.value)} /></div></div>
        <button className="btn btn-primary shorten-btn" disabled={loading}>{loading ? "Creating…" : "Shorten URL"} <ArrowUpRight size={17} /></button>
      </div>
      {error && <p className="form-error">{error}</p>}
      {result && <div className="result-box"><div><span className="success-kicker"><Sparkles size={13}/> Your short link is ready</span><a href={result} target="_blank" rel="noreferrer">{result}</a></div><CopyButton value={result}/></div>}
      {!compact && <p className="form-footnote">Free forever for your first links. No credit card required.</p>}
    </form>
  );
}
