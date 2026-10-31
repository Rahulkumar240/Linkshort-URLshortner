export default function StatCard({ label, value, change, icon: Icon, tone = "blue" }) {
  return <div className="stat-card"><div className="stat-top"><span>{label}</span><span className={`stat-icon ${tone}`}><Icon size={18}/></span></div><div className="stat-value">{value}</div><div className="stat-change"><span>↗ {change}</span> <small>vs. last month</small></div></div>;
}
