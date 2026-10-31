import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ value, className = "" }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      window.prompt("Copy this link:", value);
    }
  };
  return <button className={`icon-button ${className}`} onClick={handleCopy} title="Copy link" aria-label="Copy link">
    {copied ? <Check size={16} /> : <Copy size={16} />}
  </button>;
}
