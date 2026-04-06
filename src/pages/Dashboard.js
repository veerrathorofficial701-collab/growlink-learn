import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import { useContact } from "../context/ContactContext";

const NAV_ITEMS = [
  { key: "overview",    icon: "📊", label: "Overview" },
  { key: "campaigns",   icon: "🚀", label: "Campaigns" },
  { key: "backlinks",   icon: "🔗", label: "Backlinks" },
  { key: "marketplace", icon: "🏪", label: "Marketplace" },
  { key: "content",     icon: "📝", label: "Content" },
  { key: "posts",       icon: "✍️",  label: "Posts" },
  { key: "pages",       icon: "📄", label: "Pages" },
  { key: "reports",     icon: "📈", label: "Reports" },
  { key: "billing",     icon: "💳", label: "Billing" },
  { key: "users",       icon: "👥", label: "Users" },
  { key: "support",     icon: "🎧", label: "Support" },
  { key: "contacts",    icon: "📬", label: "Contacts" },
];

const CAMPAIGNS = [
  { id: 1, name: "Tech Blog Outreach",   status: "Active",   links: 42, budget: "$800",  progress: 72 },
  { id: 2, name: "Finance PR Campaign",  status: "Active",   links: 28, budget: "$1,200", progress: 55 },
  { id: 3, name: "Crypto Niche Links",   status: "Paused",   links: 15, budget: "$600",  progress: 30 },
  { id: 4, name: "E-commerce Boost",     status: "Complete", links: 80, budget: "$2,000", progress: 100 },
  { id: 5, name: "SaaS Authority Build", status: "Active",   links: 19, budget: "$950",  progress: 40 },
];

const BACKLINKS = [
  { id: 1, url: "forbes.com/tech-trends",       da: 94, status: "Live",    date: "2025-01-10", campaign: "Tech Blog Outreach" },
  { id: 2, url: "entrepreneur.com/seo-guide",   da: 88, status: "Live",    date: "2025-01-08", campaign: "Finance PR Campaign" },
  { id: 3, url: "coindesk.com/crypto-seo",      da: 82, status: "Pending", date: "2025-01-12", campaign: "Crypto Niche Links" },
  { id: 4, url: "techcrunch.com/startup-links", da: 91, status: "Live",    date: "2025-01-05", campaign: "Tech Blog Outreach" },
  { id: 5, url: "inc.com/growth-hacks",         da: 85, status: "Live",    date: "2025-01-03", campaign: "E-commerce Boost" },
  { id: 6, url: "wired.com/ai-marketing",       da: 90, status: "Pending", date: "2025-01-14", campaign: "SaaS Authority Build" },
];

const PUBLISHERS = [
  { id: 1, name: "Forbes",        niche: "Business",  da: 94, price: "$450", turnaround: "3 days" },
  { id: 2, name: "TechCrunch",    niche: "Tech",      da: 91, price: "$380", turnaround: "2 days" },
  { id: 3, name: "Entrepreneur",  niche: "Business",  da: 88, price: "$320", turnaround: "4 days" },
  { id: 4, name: "CoinDesk",      niche: "Crypto",    da: 82, price: "$290", turnaround: "3 days" },
  { id: 5, name: "Wired",         niche: "Tech",      da: 90, price: "$410", turnaround: "5 days" },
  { id: 6, name: "Inc Magazine",  niche: "Business",  da: 85, price: "$300", turnaround: "3 days" },
  { id: 7, name: "Decrypt",       niche: "Crypto",    da: 76, price: "$220", turnaround: "2 days" },
  { id: 8, name: "Search Engine Journal", niche: "SEO", da: 79, price: "$260", turnaround: "3 days" },
];

const CONTENT = [
  { id: 1, title: "10 SEO Trends for 2025",         status: "Published", campaign: "Tech Blog Outreach",   date: "2025-01-09" },
  { id: 2, title: "How Backlinks Drive Authority",   status: "In Review", campaign: "Finance PR Campaign",  date: "2025-01-11" },
  { id: 3, title: "Crypto SEO: A Complete Guide",    status: "Draft",     campaign: "Crypto Niche Links",   date: "2025-01-13" },
  { id: 4, title: "E-commerce Link Building Tips",   status: "Published", campaign: "E-commerce Boost",     date: "2025-01-04" },
  { id: 5, title: "SaaS Growth via PR Campaigns",    status: "In Review", campaign: "SaaS Authority Build", date: "2025-01-14" },
];

const INVOICES = [
  { id: "INV-001", date: "2025-01-01", amount: "$800",  status: "Paid",    plan: "Growth" },
  { id: "INV-002", date: "2024-12-01", amount: "$800",  status: "Paid",    plan: "Growth" },
  { id: "INV-003", date: "2024-11-01", amount: "$500",  status: "Paid",    plan: "Starter" },
  { id: "INV-004", date: "2025-01-15", amount: "$1,200", status: "Pending", plan: "Pro" },
];

const USERS = [
  { id: 1, name: "Alice Johnson",  email: "alice@agency.com",   role: "Manager",  status: "Active",   joined: "2024-10-01" },
  { id: 2, name: "Bob Smith",      email: "bob@agency.com",     role: "Editor",   status: "Active",   joined: "2024-11-15" },
  { id: 3, name: "Carol White",    email: "carol@agency.com",   role: "Viewer",   status: "Inactive", joined: "2024-09-20" },
  { id: 4, name: "David Lee",      email: "david@agency.com",   role: "Manager",  status: "Active",   joined: "2025-01-02" },
];

const TICKETS = [
  { id: "TKT-001", subject: "Backlink not showing as live", status: "Open",     priority: "High",   date: "2025-01-13" },
  { id: "TKT-002", subject: "Invoice discrepancy",          status: "Resolved", priority: "Medium", date: "2025-01-10" },
  { id: "TKT-003", subject: "Publisher response delay",     status: "Open",     priority: "Low",    date: "2025-01-14" },
];

function StatCard({ label, value, change, icon }) {
  const positive = change && change.startsWith("+");
  return (
    <div className="db-stat-card">
      <div className="db-stat-icon">{icon}</div>
      <div className="db-stat-info">
        <span className="db-stat-label">{label}</span>
        <span className="db-stat-value">{value}</span>
        {change && (
          <span className={`db-stat-change ${positive ? "positive" : "negative"}`}>
            {change} vs last month
          </span>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    Active: "badge-active", Live: "badge-active", Published: "badge-active", Paid: "badge-active",
    Paused: "badge-paused", Pending: "badge-paused", "In Review": "badge-paused",
    Complete: "badge-complete", Resolved: "badge-complete",
    Inactive: "badge-inactive", Draft: "badge-inactive", Open: "badge-open",
  };
  return <span className={`db-badge ${map[status] || ""}`}>{status}</span>;
}

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="db-section-header">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && <button className="db-btn-primary">{action}</button>}
    </div>
  );
}

/* ── SECTIONS ── */

function Overview() {
  return (
    <div className="db-section">
      <SectionHeader title="Overview" subtitle="Your SEO performance at a glance" />

      <div className="db-stats-grid">
        <StatCard label="Active Campaigns" value="5"      change="+2"    icon="🚀" />
        <StatCard label="Total Backlinks"  value="1,240"  change="+184"  icon="🔗" />
        <StatCard label="Avg Domain Auth." value="86"     change="+3"    icon="📊" />
        <StatCard label="Monthly Spend"    value="$3,550" change="+$550" icon="💳" />
      </div>

      <div className="db-two-col">
        <div className="db-panel">
          <h3>Campaign Performance</h3>
          <div className="db-campaign-bars">
            {CAMPAIGNS.map(c => (
              <div key={c.id} className="db-bar-row">
                <span className="db-bar-label">{c.name}</span>
                <div className="db-bar-track">
                  <div className="db-bar-fill" style={{ width: `${c.progress}%` }}></div>
                </div>
                <span className="db-bar-pct">{c.progress}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="db-panel">
          <h3>Recent Activity</h3>
          <ul className="db-activity-list">
            <li><span className="db-dot yellow"></span><div><strong>Backlink live</strong> on Forbes.com<span>2 hours ago</span></div></li>
            <li><span className="db-dot green"></span><div><strong>Campaign launched</strong> — SaaS Authority Build<span>5 hours ago</span></div></li>
            <li><span className="db-dot purple"></span><div><strong>Content approved</strong> — 10 SEO Trends 2025<span>Yesterday</span></div></li>
            <li><span className="db-dot yellow"></span><div><strong>Invoice paid</strong> — INV-002 $800<span>2 days ago</span></div></li>
            <li><span className="db-dot green"></span><div><strong>New user added</strong> — David Lee<span>3 days ago</span></div></li>
          </ul>
        </div>
      </div>

      <div className="db-two-col">
        <div className="db-panel">
          <h3>Top Performing Backlinks</h3>
          <table className="db-table">
            <thead><tr><th>URL</th><th>DA</th><th>Status</th></tr></thead>
            <tbody>
              {BACKLINKS.filter(b => b.status === "Live").slice(0, 4).map(b => (
                <tr key={b.id}>
                  <td>{b.url}</td>
                  <td><span className="db-da">{b.da}</span></td>
                  <td><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="db-panel">
          <h3>Billing Summary</h3>
          <div className="db-billing-summary">
            <div className="db-plan-card">
              <span className="db-plan-name">Growth Plan</span>
              <span className="db-plan-price">$800<small>/mo</small></span>
              <span className="db-plan-renew">Renews Feb 1, 2025</span>
              <button className="db-btn-outline">Upgrade Plan</button>
            </div>
            <div className="db-billing-row"><span>Last Invoice</span><strong>$800 — Paid</strong></div>
            <div className="db-billing-row"><span>Next Invoice</span><strong>$800 — Feb 1</strong></div>
            <div className="db-billing-row"><span>Credits Available</span><strong>$150</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Campaigns() {
  return (
    <div className="db-section">
      <SectionHeader title="Campaigns" subtitle="Manage all your SEO campaigns" action="+ New Campaign" />
      <div className="db-stats-grid">
        <StatCard label="Total Campaigns" value="5"   icon="🚀" />
        <StatCard label="Active"          value="3"   icon="✅" />
        <StatCard label="Paused"          value="1"   icon="⏸️" />
        <StatCard label="Completed"       value="1"   icon="🏁" />
      </div>
      <div className="db-panel">
        <table className="db-table">
          <thead>
            <tr><th>#</th><th>Campaign Name</th><th>Status</th><th>Links Placed</th><th>Budget</th><th>Progress</th><th>Action</th></tr>
          </thead>
          <tbody>
            {CAMPAIGNS.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td><strong>{c.name}</strong></td>
                <td><StatusBadge status={c.status} /></td>
                <td>{c.links}</td>
                <td>{c.budget}</td>
                <td>
                  <div className="db-bar-track inline">
                    <div className="db-bar-fill" style={{ width: `${c.progress}%` }}></div>
                  </div>
                  <span style={{ fontSize: 12, color: "#888" }}>{c.progress}%</span>
                </td>
                <td>
                  <button className="db-btn-sm">View</button>
                  <button className="db-btn-sm outline">Pause</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Backlinks() {
  return (
    <div className="db-section">
      <SectionHeader title="Backlinks" subtitle="Track all your placed backlinks" action="+ Request Backlink" />
      <div className="db-stats-grid">
        <StatCard label="Total Backlinks" value="1,240" icon="🔗" />
        <StatCard label="Live"            value="1,180" icon="✅" />
        <StatCard label="Pending"         value="60"    icon="⏳" />
        <StatCard label="Avg DA"          value="86"    icon="📊" />
      </div>
      <div className="db-panel">
        <table className="db-table">
          <thead>
            <tr><th>#</th><th>URL</th><th>DA</th><th>Campaign</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {BACKLINKS.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td><a href={`https://${b.url}`} target="_blank" rel="noreferrer" className="db-link">{b.url}</a></td>
                <td><span className="db-da">{b.da}</span></td>
                <td>{b.campaign}</td>
                <td>{b.date}</td>
                <td><StatusBadge status={b.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Marketplace() {
  return (
    <div className="db-section">
      <SectionHeader title="Publisher Marketplace" subtitle="Browse 80,000+ curated publishers and place your links" />
      <div className="db-publisher-grid">
        {PUBLISHERS.map(p => (
          <div key={p.id} className="db-publisher-card">
            <div className="db-pub-top">
              <span className="db-pub-name">{p.name}</span>
              <span className="db-pub-niche">{p.niche}</span>
            </div>
            <div className="db-pub-stats">
              <div><span>DA</span><strong>{p.da}</strong></div>
              <div><span>Price</span><strong>{p.price}</strong></div>
              <div><span>Turnaround</span><strong>{p.turnaround}</strong></div>
            </div>
            <button className="db-btn-primary full">Order Placement</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="db-section">
      <SectionHeader title="Content" subtitle="Manage articles and content for your campaigns" action="+ New Content" />
      <div className="db-panel">
        <table className="db-table">
          <thead>
            <tr><th>#</th><th>Title</th><th>Campaign</th><th>Date</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {CONTENT.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td><strong>{c.title}</strong></td>
                <td>{c.campaign}</td>
                <td>{c.date}</td>
                <td><StatusBadge status={c.status} /></td>
                <td>
                  <button className="db-btn-sm">Edit</button>
                  <button className="db-btn-sm outline">Preview</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Reports() {
  return (
    <div className="db-section">
      <SectionHeader title="Reports" subtitle="Detailed analytics and performance reports" action="Export CSV" />
      <div className="db-stats-grid">
        <StatCard label="Organic Traffic"   value="48,200" change="+12%" icon="📈" />
        <StatCard label="Keyword Rankings"  value="320"    change="+28"  icon="🔍" />
        <StatCard label="Domain Authority"  value="58"     change="+4"   icon="🏆" />
        <StatCard label="Referring Domains" value="214"    change="+31"  icon="🌐" />
      </div>
      <div className="db-two-col">
        <div className="db-panel">
          <h3>Monthly Backlinks Placed</h3>
          <div className="db-chart-bars">
            {[
              { month: "Aug", val: 60 }, { month: "Sep", val: 80 }, { month: "Oct", val: 70 },
              { month: "Nov", val: 95 }, { month: "Dec", val: 110 }, { month: "Jan", val: 130 },
            ].map(d => (
              <div key={d.month} className="db-chart-col">
                <div className="db-chart-bar" style={{ height: `${d.val}px` }}></div>
                <span>{d.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="db-panel">
          <h3>Traffic by Campaign</h3>
          <div className="db-campaign-bars">
            {[
              { name: "Tech Blog Outreach",   pct: 35 },
              { name: "Finance PR Campaign",  pct: 25 },
              { name: "E-commerce Boost",     pct: 20 },
              { name: "SaaS Authority Build", pct: 12 },
              { name: "Crypto Niche Links",   pct: 8  },
            ].map((r, i) => (
              <div key={i} className="db-bar-row">
                <span className="db-bar-label">{r.name}</span>
                <div className="db-bar-track">
                  <div className="db-bar-fill" style={{ width: `${r.pct * 2.8}%` }}></div>
                </div>
                <span className="db-bar-pct">{r.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Billing() {
  return (
    <div className="db-section">
      <SectionHeader title="Billing" subtitle="Manage your plan, payments and invoices" />
      <div className="db-billing-plans">
        {[
          { name: "Starter", price: "$299", links: "50 Links/mo",  features: ["Basic Analytics", "Email Support"] },
          { name: "Growth",  price: "$800", links: "200 Links/mo", features: ["Advanced Analytics", "Priority Support", "Publisher Access"], current: true },
          { name: "Pro",     price: "$1,500", links: "Unlimited",  features: ["Full Analytics", "Dedicated Manager", "Custom Campaigns", "API Access"] },
        ].map(plan => (
          <div key={plan.name} className={`db-plan-option ${plan.current ? "current" : ""}`}>
            {plan.current && <span className="db-current-badge">Current Plan</span>}
            <h3>{plan.name}</h3>
            <div className="db-plan-price-big">{plan.price}<small>/mo</small></div>
            <p className="db-plan-links">{plan.links}</p>
            <ul>
              {plan.features.map(f => <li key={f}>✓ {f}</li>)}
            </ul>
            <button className={`db-btn-primary full ${plan.current ? "disabled" : ""}`}>
              {plan.current ? "Current Plan" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>
      <div className="db-panel" style={{ marginTop: 32 }}>
        <h3>Invoice History</h3>
        <table className="db-table">
          <thead>
            <tr><th>Invoice</th><th>Date</th><th>Plan</th><th>Amount</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {INVOICES.map(inv => (
              <tr key={inv.id}>
                <td>{inv.id}</td>
                <td>{inv.date}</td>
                <td>{inv.plan}</td>
                <td>{inv.amount}</td>
                <td><StatusBadge status={inv.status} /></td>
                <td><button className="db-btn-sm">Download</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Users() {
  return (
    <div className="db-section">
      <SectionHeader title="User Management" subtitle="Manage team members and their access" action="+ Invite User" />
      <div className="db-panel">
        <table className="db-table">
          <thead>
            <tr><th>#</th><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {USERS.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>
                  <div className="db-user-cell">
                    <span className="db-avatar">{u.name[0]}</span>
                    {u.name}
                  </div>
                </td>
                <td>{u.email}</td>
                <td><span className="db-role-badge">{u.role}</span></td>
                <td>{u.joined}</td>
                <td><StatusBadge status={u.status} /></td>
                <td>
                  <button className="db-btn-sm">Edit</button>
                  <button className="db-btn-sm outline">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Support() {
  return (
    <div className="db-section">
      <SectionHeader title="Support" subtitle="Get help from our team" action="+ New Ticket" />
      <div className="db-two-col" style={{ marginBottom: 24 }}>
        <div className="db-support-card">
          <span className="db-support-icon">💬</span>
          <h4>Live Chat</h4>
          <p>Chat with our support team in real time.</p>
          <button className="db-btn-primary">Start Chat</button>
        </div>
        <div className="db-support-card">
          <span className="db-support-icon">📧</span>
          <h4>Email Support</h4>
          <p>Send us an email and we'll respond within 24 hours.</p>
          <button className="db-btn-primary">Send Email</button>
        </div>
        <div className="db-support-card">
          <span className="db-support-icon">📚</span>
          <h4>Knowledge Base</h4>
          <p>Browse guides, FAQs and tutorials.</p>
          <button className="db-btn-primary">Browse Docs</button>
        </div>
      </div>
      <div className="db-panel">
        <h3>My Tickets</h3>
        <table className="db-table">
          <thead>
            <tr><th>Ticket</th><th>Subject</th><th>Priority</th><th>Date</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {TICKETS.map(t => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.subject}</td>
                <td>
                  <span className={`db-priority ${t.priority.toLowerCase()}`}>{t.priority}</span>
                </td>
                <td>{t.date}</td>
                <td><StatusBadge status={t.status} /></td>
                <td><button className="db-btn-sm">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── POSTS ── */
/* Post data is managed via PostsContext — see src/context/PostsContext.js */

const INIT_PAGES = [
  { id: 1, title: "Home",         status: "Published", template: "Default", date: "2025-01-01", slug: "",            content: "Welcome to Grolinq — your trusted link building partner." },
  { id: 2, title: "About Us",     status: "Published", template: "About",   date: "2025-01-01", slug: "about",       content: "We are a data-driven link building marketplace..." },
  { id: 3, title: "Contact",      status: "Published", template: "Contact", date: "2025-01-01", slug: "Contact",     content: "Get in touch with our team for any inquiries." },
  { id: 4, title: "How It Works", status: "Published", template: "Default", date: "2025-01-10", slug: "cta",         content: "Our simple 4-step process to grow your digital presence." },
  { id: 5, title: "Solutions",    status: "Published", template: "Default", date: "2025-01-10", slug: "testimonials",content: "Comprehensive digital growth solutions." },
  { id: 6, title: "Blog",         status: "Published", template: "Default", date: "2025-01-10", slug: "blog",        content: "Insights and guides for digital growth." },
];

const CATEGORIES = ["SEO", "Link Building", "Crypto", "Finance", "Tech", "E-commerce", "SaaS"];
const TEMPLATES  = ["Default", "About", "Contact", "Full Width", "Landing Page"];

function PostEditor({ post, onSave, onCancel, type }) {
  const blank = type === "post"
    ? { title: "", status: "Draft", category: "SEO", tags: "", excerpt: "", featured: "", content: "", author: "Admin", date: new Date().toISOString().slice(0,10) }
    : { title: "", status: "Draft", template: "Default", slug: "", content: "", date: new Date().toISOString().slice(0,10) };
  const [form, setForm] = useState(post || blank);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="wp-editor-wrap">
      <div className="wp-editor-main">
        <div className="wp-editor-topbar">
          <button className="db-btn-sm outline" onClick={onCancel}>← Back</button>
          <h2>{post ? `Edit ${type === "post" ? "Post" : "Page"}` : `Add New ${type === "post" ? "Post" : "Page"}`}</h2>
          <div className="wp-pub-actions">
            <button className="db-btn-sm" onClick={() => onSave({ ...form, status: "Draft" })}>Save Draft</button>
            <button className="db-btn-primary" onClick={() => onSave({ ...form, status: "Published" })}>Publish</button>
          </div>
        </div>

        <div className="wp-title-field">
          <input
            className="wp-title-input"
            placeholder={`${type === "post" ? "Post" : "Page"} title`}
            value={form.title}
            onChange={e => set("title", e.target.value)}
          />
          {type === "page" && (
            <div className="wp-slug-row">
              <span>Permalink:</span>
              <input className="wp-slug-input" value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="page-slug" />
            </div>
          )}
        </div>

        <div className="wp-toolbar">
          {["B","I","U","H1","H2","H3","Link","Img","List","Quote"].map(t => (
            <button key={t} className="wp-tool-btn">{t}</button>
          ))}
        </div>
        <textarea
          className="wp-content-area"
          placeholder="Write your content here..."
          value={form.content}
          onChange={e => set("content", e.target.value)}
        />

        {type === "post" && (
          <div className="wp-excerpt-box">
            <h4>Excerpt</h4>
            <textarea
              className="wp-excerpt-input"
              placeholder="Short description (optional)"
              value={form.excerpt}
              onChange={e => set("excerpt", e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="wp-editor-sidebar">
        <div className="wp-meta-box">
          <h4>Publish</h4>
          <div className="wp-meta-row"><span>Status</span>
            <select value={form.status} onChange={e => set("status", e.target.value)}>
              <option>Draft</option><option>Published</option><option>Pending Review</option>
            </select>
          </div>
          <div className="wp-meta-row"><span>Date</span>
            <input type="date" value={form.date} onChange={e => set("date", e.target.value)} />
          </div>
          <div className="wp-meta-row"><span>Author</span>
            <select value={form.author || "Admin"} onChange={e => set("author", e.target.value)}>
              <option>Admin</option><option>Alice Johnson</option><option>Bob Smith</option>
            </select>
          </div>
          <div className="wp-pub-btns">
            <button className="db-btn-sm" onClick={() => onSave({ ...form, status: "Draft" })}>Save Draft</button>
            <button className="db-btn-primary" onClick={() => onSave({ ...form, status: "Published" })}>Publish</button>
          </div>
        </div>

        {type === "post" && (
          <>
            <div className="wp-meta-box">
              <h4>Category</h4>
              {CATEGORIES.map(c => (
                <label key={c} className="wp-check-label">
                  <input type="radio" name="cat" checked={form.category === c} onChange={() => set("category", c)} /> {c}
                </label>
              ))}
            </div>
            <div className="wp-meta-box">
              <h4>Tags</h4>
              <input className="wp-tag-input" placeholder="Add tags, comma separated" value={form.tags} onChange={e => set("tags", e.target.value)} />
              <div className="wp-tag-list">
                {form.tags.split(",").filter(Boolean).map(t => (
                  <span key={t} className="wp-tag">{t.trim()}</span>
                ))}
              </div>
            </div>
            <div className="wp-meta-box">
              <h4>Featured Image</h4>
              <div className="wp-featured-img">
                {form.featured ? (
                  <div className="wp-img-preview">
                    <img src={form.featured} alt="featured" />
                    <button
                      className="wp-img-remove"
                      onClick={() => set("featured", "")}
                    >✕ Remove</button>
                  </div>
                ) : (
                  <label className="wp-img-placeholder">
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={e => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = ev => set("featured", ev.target.result);
                        reader.readAsDataURL(file);
                      }}
                    />
                    <span className="wp-img-icon">📷</span>
                    <span>Click to upload image</span>
                    <span className="wp-img-hint">PNG, JPG, WEBP supported</span>
                  </label>
                )}
                <div className="wp-img-url-row">
                  <span>Or paste URL:</span>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={form.featured.startsWith("data:") ? "" : form.featured}
                    onChange={e => set("featured", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {type === "page" && (
          <div className="wp-meta-box">
            <h4>Page Template</h4>
            <select value={form.template} onChange={e => set("template", e.target.value)}>
              {TEMPLATES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        )}

        <div className="wp-meta-box">
          <h4>SEO Settings</h4>
          <div className="wp-seo-bar">
            <span className="wp-seo-dot green"></span>
            <span>SEO Score: Good</span>
          </div>
          <input className="wp-seo-input" placeholder="Meta title" />
          <textarea className="wp-seo-desc" placeholder="Meta description" rows={3} />
        </div>
      </div>
    </div>
  );
}

function Posts() {
  const { posts, savePost, deletePost } = usePosts();
  const [view, setView]       = useState("list");
  const [editing, setEditing] = useState(null);
  const [filter, setFilter]   = useState("All");
  const [search, setSearch]   = useState("");

  function handleSave(data) {
    savePost(data);
    setView("list"); setEditing(null);
  }

  const filtered = posts
    .filter(p => filter === "All" || p.status === filter)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  if (view === "edit" || view === "new") {
    return <PostEditor post={editing} onSave={handleSave} onCancel={() => { setView("list"); setEditing(null); }} type="post" />;
  }

  return (
    <div className="db-section">
      <SectionHeader title="Posts" subtitle="Create and manage blog posts" />
      <div className="wp-list-toolbar">
        <div className="wp-filter-tabs">
          {["All","Published","Draft"].map(f => (
            <button key={f} className={`wp-filter-tab ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f} <span className="wp-count">{f === "All" ? posts.length : posts.filter(p => p.status === f).length}</span>
            </button>
          ))}
        </div>
        <div className="wp-toolbar-right">
          <input className="wp-search" placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)} />
          <button className="db-btn-primary" onClick={() => { setEditing(null); setView("new"); }}>+ Add New Post</button>
        </div>
      </div>
      <div className="db-panel">
        <table className="db-table">
          <thead>
            <tr><th><input type="checkbox" /></th><th>Title</th><th>Author</th><th>Category</th><th>Tags</th><th>Date</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <strong className="db-link" style={{cursor:"pointer"}} onClick={() => { setEditing(p); setView("edit"); }}>{p.title}</strong>
                  <div className="wp-row-actions">
                    <span onClick={() => { setEditing(p); setView("edit"); }}>Edit</span> |
                    <span className="red" onClick={() => deletePost(p.id)}> Delete</span> |
                    <a href={`/posts/${p.slug}`} target="_blank" rel="noreferrer"> View</a>
                  </div>
                </td>
                <td>{p.author}</td>
                <td><span className="wp-cat-badge">{p.category}</span></td>
                <td><span className="wp-tags-cell">{p.tags}</span></td>
                <td>{p.date}</td>
                <td><StatusBadge status={p.status} /></td>
                <td>
                  <button className="db-btn-sm" onClick={() => { setEditing(p); setView("edit"); }}>Edit</button>
                  <button className="db-btn-sm outline" onClick={() => deletePost(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="wp-empty">No posts found.</div>}
      </div>
    </div>
  );
}

function Pages() {
  const [pages, setPages]     = useState(INIT_PAGES);
  const [view, setView]       = useState("list");
  const [editing, setEditing] = useState(null);
  const [search, setSearch]   = useState("");

  function handleSave(data) {
    if (editing) {
      setPages(ps => ps.map(p => p.id === editing.id ? { ...data, id: editing.id } : p));
    } else {
      setPages(ps => [...ps, { ...data, id: Date.now() }]);
    }
    setView("list"); setEditing(null);
  }

  function handleDelete(id) { setPages(ps => ps.filter(p => p.id !== id)); }

  const filtered = pages.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  if (view === "edit" || view === "new") {
    return <PostEditor post={editing} onSave={handleSave} onCancel={() => { setView("list"); setEditing(null); }} type="page" />;
  }

  return (
    <div className="db-section">
      <SectionHeader title="Pages" subtitle="Create and manage static pages" />
      <div className="wp-list-toolbar">
        <div className="wp-filter-tabs">
          <button className="wp-filter-tab active">All <span className="wp-count">{pages.length}</span></button>
          <button className="wp-filter-tab">Published <span className="wp-count">{pages.filter(p=>p.status==="Published").length}</span></button>
          <button className="wp-filter-tab">Draft <span className="wp-count">{pages.filter(p=>p.status==="Draft").length}</span></button>
        </div>
        <div className="wp-toolbar-right">
          <input className="wp-search" placeholder="Search pages..." value={search} onChange={e => setSearch(e.target.value)} />
          <button className="db-btn-primary" onClick={() => { setEditing(null); setView("new"); }}>+ Add New Page</button>
        </div>
      </div>
      <div className="db-panel">
        <table className="db-table">
          <thead>
            <tr><th><input type="checkbox" /></th><th>Title</th><th>Slug</th><th>Template</th><th>Date</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <strong className="db-link" style={{cursor:"pointer"}} onClick={() => { setEditing(p); setView("edit"); }}>{p.title}</strong>
                  <div className="wp-row-actions">
                    <span onClick={() => { setEditing(p); setView("edit"); }}>Edit</span> |
                    <span className="red" onClick={() => handleDelete(p.id)}> Delete</span> |
                    <a href={`/${p.slug}`} target="_blank" rel="noreferrer"> View</a>
                  </div>
                </td>
                <td><code className="wp-slug-code">/{p.slug}</code></td>
                <td>{p.template}</td>
                <td>{p.date}</td>
                <td><StatusBadge status={p.status} /></td>
                <td>
                  <button className="db-btn-sm" onClick={() => { setEditing(p); setView("edit"); }}>Edit</button>
                  <button className="db-btn-sm outline" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="wp-empty">No pages found.</div>}
      </div>
    </div>
  );
}

function Contacts() {
  const { submissions, updateStatus, deleteSubmission } = useContact();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = submissions
    .filter(s => filter === "All" || s.status === filter)
    .filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.subject.toLowerCase().includes(search.toLowerCase())
    );

  const counts = {
    All: submissions.length,
    Unread: submissions.filter(s => s.status === "Unread").length,
    Read: submissions.filter(s => s.status === "Read").length,
    Replied: submissions.filter(s => s.status === "Replied").length,
  };

  if (selected) {
    const s = selected;
    return (
      <div className="db-section">
        <div className="db-section-header">
          <div>
            <button className="db-btn-sm outline" onClick={() => setSelected(null)}>← Back</button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["Unread", "Read", "Replied"].map(st => (
              <button
                key={st}
                className={`db-btn-sm ${s.status === st ? "" : "outline"}`}
                onClick={() => { updateStatus(s.id, st); setSelected({ ...s, status: st }); }}
              >{st}</button>
            ))}
            <button className="db-btn-sm outline" style={{ color: "#e74c3c", borderColor: "#e74c3c" }}
              onClick={() => { deleteSubmission(s.id); setSelected(null); }}
            >Delete</button>
          </div>
        </div>

        <div className="contact-detail-card">
          <div className="contact-detail-header">
            <div className="db-avatar" style={{ width: 48, height: 48, fontSize: 20 }}>{s.name[0]}</div>
            <div>
              <h3>{s.name}</h3>
              <span>{s.email} · {s.phone}</span>
            </div>
            <StatusBadge status={s.status} />
          </div>

          <div className="contact-detail-meta">
            <div><span>Subject</span><strong>{s.subject}</strong></div>
            <div><span>Date</span><strong>{s.date}</strong></div>
          </div>

          <div className="contact-detail-message">
            <h4>Message</h4>
            <p>{s.message}</p>
          </div>

          <div className="contact-detail-reply">
            <h4>Reply</h4>
            <textarea
              className="wp-content-area"
              rows={5}
              placeholder={`Write your reply to ${s.name}...`}
            />
            <button
              className="db-btn-primary"
              style={{ marginTop: 12 }}
              onClick={() => { updateStatus(s.id, "Replied"); setSelected({ ...s, status: "Replied" }); }}
            >Send Reply & Mark as Replied</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="db-section">
      <SectionHeader title="Contacts" subtitle="All contact form submissions" />

      <div className="db-stats-grid">
        <StatCard label="Total"   value={counts.All}     icon="📬" />
        <StatCard label="Unread"  value={counts.Unread}  icon="🔴" />
        <StatCard label="Read"    value={counts.Read}    icon="🟡" />
        <StatCard label="Replied" value={counts.Replied} icon="🟢" />
      </div>

      <div className="wp-list-toolbar">
        <div className="wp-filter-tabs">
          {["All", "Unread", "Read", "Replied"].map(f => (
            <button
              key={f}
              className={`wp-filter-tab ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >{f} <span className="wp-count">{counts[f]}</span></button>
          ))}
        </div>
        <div className="wp-toolbar-right">
          <input
            className="wp-search"
            placeholder="Search by name, email or subject..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="db-panel">
        <table className="db-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: 40, color: "#aaa" }}>No submissions found.</td></tr>
            ) : (
              filtered.map(s => (
                <tr key={s.id}>
                  <td>
                    <div className="db-user-cell">
                      <span className="db-avatar">{s.name[0]}</span>
                      <strong
                        className="db-link"
                        style={{ cursor: "pointer", fontWeight: s.status === "Unread" ? 700 : 400 }}
                        onClick={() => { setSelected(s); updateStatus(s.id, s.status === "Unread" ? "Read" : s.status); }}
                      >{s.name}</strong>
                    </div>
                  </td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.subject}</td>
                  <td>{s.date}</td>
                  <td><StatusBadge status={s.status} /></td>
                  <td>
                    <button className="db-btn-sm" onClick={() => { setSelected(s); updateStatus(s.id, s.status === "Unread" ? "Read" : s.status); }}>View</button>
                    <button className="db-btn-sm outline" onClick={() => deleteSubmission(s.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const SECTION_MAP = { overview: Overview, campaigns: Campaigns, backlinks: Backlinks, marketplace: Marketplace, content: Content, reports: Reports, billing: Billing, users: Users, support: Support, posts: Posts, pages: Pages, contacts: Contacts };

export default function Dashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (sessionStorage.getItem("isAdmin") !== "true") {
    navigate("/admin");
    return null;
  }

  function handleLogout() {
    sessionStorage.removeItem("isAdmin");
    navigate("/admin");
  }

  const ActiveSection = SECTION_MAP[active];

  return (
    <div className="db-page">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="db-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`db-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="db-sidebar-logo">
          <img src="/img/logo/logo.png" alt="Grolinq" />
        </div>
        <nav className="db-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              className={`db-nav-item ${active === item.key ? "active" : ""}`}
              onClick={() => { setActive(item.key); setSidebarOpen(false); }}
            >
              <span className="db-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="db-sidebar-footer">
          <a href="/" className="db-view-site">🌐 View Site</a>
          <button className="db-logout-btn" onClick={handleLogout}>⏻ Logout</button>
        </div>
      </aside>

      <div className="db-body">
        <header className="db-topbar">
          <button className="db-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <div className="db-topbar-right">
            <span className="db-topbar-notif">🔔</span>
            <div className="db-topbar-user">
              <span className="db-topbar-avatar">A</span>
              <span>Admin</span>
            </div>
          </div>
        </header>
        <div className="db-content">
          <ActiveSection />
        </div>
      </div>
    </div>
  );
}
