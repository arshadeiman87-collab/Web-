import React, {useMemo, useState} from "react";
import {createRoot} from "react-dom/client";
import {BarChart3, Brain, ChevronDown, ChevronLeft, ChevronRight, Download, FileText, Filter, Home, Inbox, Layers3, Menu, MessageSquare, MoreHorizontal, Plus, Search, Settings, ShieldCheck, Sparkles, Tag, TrendingUp, Upload, Users, X} from "lucide-react";
import {AreaChart, Area, BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import "./styles.css";

const feedback = [
  {id:"FB-1048", source:"Support ticket", theme:"Checkout", sentiment:"Negative", score:-0.82, text:"Checkout fails when I use a saved card. I tried three times and received the same error.", product:"Web App", date:"Sep 10, 2026", status:"Reviewed", tags:["payments","checkout"], evidence:"Ticket #4821"},
  {id:"FB-1047", source:"Survey", theme:"Performance", sentiment:"Positive", score:0.71, text:"The new dashboard feels much faster and I can find reports quickly.", product:"Dashboard", date:"Sep 10, 2026", status:"Confirmed", tags:["speed","dashboard"], evidence:"Survey #S-918"},
  {id:"FB-1046", source:"Review", theme:"Mobile UX", sentiment:"Negative", score:-0.64, text:"The mobile filters are difficult to use and the table requires too much horizontal scrolling.", product:"Mobile App", date:"Sep 9, 2026", status:"Needs review", tags:["mobile","filters"], evidence:"Review #R-220"},
  {id:"FB-1045", source:"Support ticket", theme:"Notifications", sentiment:"Neutral", score:0.04, text:"Can we choose which alerts are sent by email? There are too many low priority messages.", product:"Web App", date:"Sep 9, 2026", status:"Reviewed", tags:["email","alerts"], evidence:"Ticket #4790"},
  {id:"FB-1044", source:"Review", theme:"Onboarding", sentiment:"Positive", score:0.79, text:"Setup was surprisingly simple. The guided checklist helped our team get started.", product:"Web App", date:"Sep 8, 2026", status:"Confirmed", tags:["setup","onboarding"], evidence:"Review #R-217"},
  {id:"FB-1043", source:"Survey", theme:"Integrations", sentiment:"Negative", score:-0.55, text:"We need a native Slack integration before we can roll this out to every team.", product:"Web App", date:"Sep 8, 2026", status:"Needs review", tags:["slack","integration"], evidence:"Survey #S-901"},
  {id:"FB-1042", source:"Review", theme:"Reporting", sentiment:"Positive", score:0.66, text:"The export options are useful and the CSV output is clean.", product:"Dashboard", date:"Sep 7, 2026", status:"Confirmed", tags:["csv","reports"], evidence:"Review #R-214"}
];

const trend = [
  {week:"Aug 10", positive:42, neutral:22, negative:18},
  {week:"Aug 17", positive:48, neutral:20, negative:21},
  {week:"Aug 24", positive:55, neutral:24, negative:19},
  {week:"Aug 31", positive:61, neutral:27, negative:24},
  {week:"Sep 7", positive:68, neutral:25, negative:31}
];

const themeData = [
  {name:"Checkout", count:184, change:"+18%", sentiment:-0.58},
  {name:"Mobile UX", count:142, change:"+12%", sentiment:-0.42},
  {name:"Performance", count:119, change:"-6%", sentiment:0.54},
  {name:"Onboarding", count:96, change:"+4%", sentiment:0.63},
  {name:"Notifications", count:83, change:"+9%", sentiment:-0.08},
  {name:"Integrations", count:77, change:"+21%", sentiment:-0.31}
];

function App(){
  const [page,setPage]=useState("Overview");
  const [collapsed,setCollapsed]=useState(false);
  const [mobileOpen,setMobileOpen]=useState(false);
  const [query,setQuery]=useState("");
  const [source,setSource]=useState("All sources");
  const [sentiment,setSentiment]=useState("All sentiment");
  const [selected,setSelected]=useState(null);
  const [toast,setToast]=useState("");
  const [workspace,setWorkspace]=useState("Acme Product");
  const [theme,setTheme]=useState("light");
  const [showImport,setShowImport]=useState(false);

  const filtered = useMemo(()=>feedback.filter(f =>
    (source==="All sources" || f.source===source) &&
    (sentiment==="All sentiment" || f.sentiment===sentiment) &&
    (f.text+f.theme+f.product+f.tags.join(" ")).toLowerCase().includes(query.toLowerCase())
  ),[query,source,sentiment]);

  const notify=(msg)=>{setToast(msg); setTimeout(()=>setToast(""),2200)};

  const nav = [
    ["Overview",Home],["Feedback Explorer",Inbox],["Themes & Clusters",Layers3],["Trends",TrendingUp],
    ["Insights",Sparkles],["Corrections",Tag],["Ingestion",Upload],["Exports",Download],["AI Evaluation",Brain],
    ["Team & Workspace",Users],["Privacy",ShieldCheck],["Settings",Settings]
  ];

  return <div className={theme==="dark"?"app dark":"app"}>
    <aside className={(collapsed?"sidebar collapsed":"sidebar")+(mobileOpen?" mobile-open":"")}>
      <div className="brand"><div className="brand-mark"><Brain size={19}/></div>{!collapsed&&<div><b>FeedbackIQ</b><span>Intelligence Hub</span></div>}<button className="mobile-close" onClick={()=>setMobileOpen(false)}><X size={18}/></button></div>
      <div className="workspace"><div className="workspace-avatar">A</div>{!collapsed&&<><div className="workspace-info"><b>{workspace}</b><span>Product workspace</span></div><ChevronDown size={16}/></>}</div>
      <nav>{nav.map(([name,Icon])=><button key={name} className={page===name?"nav active":"nav"} onClick={()=>{setPage(name);setMobileOpen(false)}}><Icon size={18}/>{!collapsed&&<span>{name}</span>}</button>)}</nav>
      <button className="collapse" onClick={()=>setCollapsed(!collapsed)}>{collapsed?<ChevronRight size={18}/>:<><ChevronLeft size={18}/><span>Collapse sidebar</span></>}</button>
    </aside>

    <main className="main">
      <header className="topbar">
        <button className="mobile-menu" onClick={()=>setMobileOpen(true)}><Menu size={22}/></button>
        <div className="crumb"><span>Workspace</span><b>/</b><strong>{page}</strong></div>
        <div className="top-actions">
          <button className="icon-btn" onClick={()=>notify("No new notifications")}><MessageSquare size={18}/></button>
          <button className="avatar" onClick={()=>setPage("Team & Workspace")}>EA</button>
        </div>
      </header>

      {page==="Overview" ? <Overview setPage={setPage} notify={notify} trend={trend} themeData={themeData}/> :
       page==="Feedback Explorer" ? <Explorer filtered={filtered} query={query} setQuery={setQuery} source={source} setSource={setSource} sentiment={sentiment} setSentiment={setSentiment} setSelected={setSelected} setShowImport={setShowImport}/> :
       page==="Themes & Clusters" ? <Themes setSelected={setSelected} notify={notify}/> :
       page==="Trends" ? <Trends trend={trend}/> :
       page==="Insights" ? <Insights notify={notify}/> :
       page==="Corrections" ? <Corrections notify={notify}/> :
       page==="Ingestion" ? <Ingestion notify={notify} setShowImport={setShowImport}/> :
       page==="Exports" ? <Exports notify={notify}/> :
       page==="AI Evaluation" ? <Evaluation notify={notify}/> :
       page==="Team & Workspace" ? <Team workspace={workspace} setWorkspace={setWorkspace} notify={notify}/> :
       page==="Privacy" ? <Privacy notify={notify}/> :
       <SettingsPage theme={theme} setTheme={setTheme} notify={notify}/>
      }
    </main>

    {selected && <Detail item={selected} onClose={()=>setSelected(null)} notify={notify}/>}
    {showImport && <ImportModal close={()=>setShowImport(false)} notify={notify}/>}
    {toast&&<div className="toast">{toast}</div>}
  </div>
}

function PageHead({eyebrow,title,desc,actions}){return <div className="page-head"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{desc}</p></div><div className="head-actions">{actions}</div></div>}

function Overview({setPage,notify,trend,themeData}){
 return <div className="content">
  <PageHead eyebrow="PRODUCT FEEDBACK" title="Feedback intelligence, at a glance" desc="Understand what customers are saying, why it matters, and where to act next." actions={<><button className="btn ghost" onClick={()=>setPage("Exports")}><Download size={16}/> Export</button><button className="btn primary" onClick={()=>setPage("Ingestion")}><Plus size={16}/> Import feedback</button></>}/>
  <div className="kpis">
   <Kpi label="Total feedback" value="12,842" change="+14.8%" note="vs previous period" icon={Inbox}/>
   <Kpi label="Positive sentiment" value="62.4%" change="+5.2%" note="vs previous period" icon={TrendingUp}/>
   <Kpi label="Active themes" value="38" change="+3" note="new clusters this month" icon={Layers3}/>
   <Kpi label="High-priority issues" value="17" change="-8.4%" note="after human review" icon={ShieldCheck}/>
  </div>
  <div className="grid-2">
   <section className="card chart-card"><div className="card-title"><div><h3>Sentiment trend</h3><span>Weekly volume by sentiment</span></div><button className="dots" onClick={()=>notify("Chart menu opened")}><MoreHorizontal size={18}/></button></div>
    <div className="chart"><ResponsiveContainer width="100%" height={280}><AreaChart data={trend}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="week"/><YAxis/><Tooltip/><Area type="monotone" dataKey="positive" stackId="1" fillOpacity=".35" strokeWidth={2}/><Area type="monotone" dataKey="neutral" stackId="1" fillOpacity=".2" strokeWidth={2}/><Area type="monotone" dataKey="negative" stackId="1" fillOpacity=".18" strokeWidth={2}/></AreaChart></ResponsiveContainer></div>
   </section>
   <section className="card"><div className="card-title"><div><h3>Top themes</h3><span>Clusters with the most mentions</span></div><button className="text-btn" onClick={()=>setPage("Themes & Clusters")}>View all</button></div>
    <div className="theme-list">{themeData.slice(0,5).map(t=><div className="theme-row" key={t.name}><div className="theme-icon"><Tag size={15}/></div><div className="theme-name"><b>{t.name}</b><span>{t.count} mentions</span></div><div className={t.sentiment<0?"pill negative":"pill positive"}>{t.sentiment<0?"Negative":"Positive"}</div><span className="change">{t.change}</span></div>)}</div>
   </section>
  </div>
  <section className="card"><div className="card-title"><div><h3>Evidence-backed product signals</h3><span>Latest reviewed feedback requiring attention</span></div><button className="text-btn" onClick={()=>setPage("Feedback Explorer")}>Open explorer</button></div>
   <div className="table-wrap"><table><thead><tr><th>Feedback</th><th>Theme</th><th>Sentiment</th><th>Source</th><th>Status</th></tr></thead><tbody>{feedback.slice(0,5).map(f=><tr key={f.id} onClick={()=>document.dispatchEvent(new CustomEvent("selectFeedback",{detail:f}))}><td><div className="feedback-cell"><b>{f.id}</b><span>{f.text}</span></div></td><td><span className="tag">{f.theme}</span></td><td><span className={"pill "+f.sentiment.toLowerCase()}>{f.sentiment}</span></td><td>{f.source}</td><td><span className="status-dot">{f.status}</span></td></tr>)}</tbody></table></div>
  </section>
 </div>
}

function Kpi({label,value,change,note,icon:Icon}){return <div className="kpi"><div className="kpi-top"><span>{label}</span><div className="kpi-icon"><Icon size={17}/></div></div><strong>{value}</strong><div><span className="change">{change}</span><span className="muted"> {note}</span></div></div>}

function Explorer({filtered,query,setQuery,source,setSource,sentiment,setSentiment,setSelected,setShowImport}){
 React.useEffect(()=>{const fn=e=>setSelected(e.detail);document.addEventListener("selectFeedback",fn);return()=>document.removeEventListener("selectFeedback",fn)},[]);
 return <div className="content"><PageHead eyebrow="FEEDBACK EXPLORER" title="Search and drill into feedback" desc="Filter raw evidence, inspect AI classifications, and trace every insight to its source." actions={<button className="btn primary" onClick={()=>setShowImport(true)}><Upload size={16}/> Import data</button>}/>
 <section className="card">
  <div className="filters"><div className="search"><Search size={17}/><input placeholder="Search feedback, themes, products..." value={query} onChange={e=>setQuery(e.target.value)}/></div><select value={source} onChange={e=>setSource(e.target.value)}><option>All sources</option><option>Review</option><option>Survey</option><option>Support ticket</option></select><select value={sentiment} onChange={e=>setSentiment(e.target.value)}><option>All sentiment</option><option>Positive</option><option>Neutral</option><option>Negative</option></select><button className="btn ghost"><Filter size={16}/> More filters</button></div>
  <div className="result-meta"><span>{filtered.length} feedback items</span><span>AI enrichment: <b>98.6%</b></span></div>
  <div className="table-wrap"><table><thead><tr><th>Evidence</th><th>Theme / cluster</th><th>Sentiment</th><th>Source</th><th>Product</th><th>Status</th></tr></thead><tbody>{filtered.map(f=><tr key={f.id} onClick={()=>setSelected(f)}><td><div className="feedback-cell"><b>{f.id}</b><span>{f.text}</span><small>{f.evidence}</small></div></td><td><span className="tag">{f.theme}</span><div className="small-tags">{f.tags.map(x=><i key={x}>#{x}</i>)}</div></td><td><span className={"pill "+f.sentiment.toLowerCase()}>{f.sentiment}</span><small className="score">Score {f.score}</small></td><td>{f.source}</td><td>{f.product}</td><td>{f.status}</td></tr>)}</tbody></table></div>
 </section></div>
}

function Themes({setSelected,notify}){return <div className="content"><PageHead eyebrow="AI CLUSTERS" title="Themes & clusters" desc="Automatically grouped topics with representative evidence and human-review controls." actions={<button className="btn ghost" onClick={()=>notify("Cluster refresh queued")}><Sparkles size={16}/> Re-cluster</button>}/><div className="cluster-grid">{themeData.map((t,i)=><div className="card cluster" key={t.name}><div className="cluster-top"><div className="theme-icon"><Tag size={17}/></div><span className={t.sentiment<0?"pill negative":"pill positive"}>{t.sentiment<0?"Needs attention":"Healthy"}</span></div><h3>{t.name}</h3><p>{t.count} mentions · {t.change} this period</p><div className="cluster-bar"><span style={{width:(t.count/184*100)+"%"}}/></div><div className="cluster-foot"><span>AI confidence {92-i*3}%</span><button onClick={()=>setSelected(feedback[i%feedback.length])}>View evidence</button></div></div>)}</div></div>}

function Trends({trend}){return <div className="content"><PageHead eyebrow="ANALYTICS" title="Feedback trends" desc="Track sentiment, theme volume and product signals over time."/><section className="card"><div className="card-title"><div><h3>Sentiment volume</h3><span>Last five weeks</span></div></div><div className="chart tall"><ResponsiveContainer width="100%" height={390}><BarChart data={trend}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="week"/><YAxis/><Tooltip/><Bar dataKey="positive" stackId="a" fillOpacity=".75"/><Bar dataKey="neutral" stackId="a" fillOpacity=".55"/><Bar dataKey="negative" stackId="a" fillOpacity=".35"/></BarChart></ResponsiveContainer></div></section></div>}

function Insights({notify}){const insights=[["Checkout failures are rising","Negative checkout feedback increased 18% week-over-week. 63% of related tickets mention saved cards.","High priority","Ticket #4821 · 6 supporting items"],["Mobile filtering is a recurring friction","Users repeatedly mention horizontal scrolling and hard-to-tap controls on smaller screens.","Medium","Review #R-220 · 14 supporting items"],["Onboarding is a product strength","Positive onboarding feedback is strongly associated with the guided checklist.","Positive","Review #R-217 · 22 supporting items"]];return <div className="content"><PageHead eyebrow="AI INSIGHTS" title="Evidence-linked product insights" desc="AI-generated findings with traceable evidence, confidence and recommended action."/><div className="insight-grid">{insights.map((x,i)=><div className="card insight" key={x[0]}><div className="insight-head"><Sparkles size={18}/><span>{x[2]}</span></div><h3>{x[0]}</h3><p>{x[1]}</p><div className="evidence"><FileText size={15}/>{x[3]}</div><button className="btn ghost full" onClick={()=>notify("Insight marked for review")}>Review insight</button></div>)}</div></div>}

function Corrections({notify}){return <div className="content"><PageHead eyebrow="HUMAN-IN-THE-LOOP" title="Corrections & review queue" desc="Improve model quality by correcting themes, sentiment and priority labels."/><section className="card"><div className="result-meta"><span>12 items awaiting review</span><span>Agreement rate <b>94.1%</b></span></div>{feedback.filter(f=>f.status==="Needs review").concat(feedback.slice(0,2)).map(f=><div className="review-row" key={f.id}><div><b>{f.id}</b><p>{f.text}</p></div><div className="review-controls"><select defaultValue={f.sentiment}><option>Positive</option><option>Neutral</option><option>Negative</option></select><select defaultValue={f.theme}><option>{f.theme}</option><option>Checkout</option><option>Mobile UX</option><option>Performance</option></select><button className="btn primary small" onClick={()=>notify(f.id+" correction saved")}>Save</button></div></div>)}</section></div>}

function Ingestion({notify,setShowImport}){return <div className="content"><PageHead eyebrow="DATA PIPELINE" title="Scheduled ingestion" desc="Connect review, survey and support sources and keep your feedback intelligence current." actions={<button className="btn primary" onClick={()=>setShowImport(true)}><Plus size={16}/> New import</button>}/><div className="ingest-grid">{[["App Store Reviews","Reviews API","Every 6 hours","Connected"],["Typeform Surveys","CSV / API","Daily at 02:00","Connected"],["Support Tickets","Webhook","Real-time","Connected"],["Intercom","API","Every 30 minutes","Paused"]].map(x=><div className="card integration" key={x[0]}><div className="integration-icon"><Inbox size={18}/></div><h3>{x[0]}</h3><p>{x[1]}</p><div className="schedule">{x[2]}</div><div className="integration-foot"><span className="online">● {x[3]}</span><button className="text-btn" onClick={()=>notify("Schedule editor opened")}>Configure</button></div></div>)}</div></div>}

function Exports({notify}){return <div className="content"><PageHead eyebrow="DATA EXPORTS" title="Exports" desc="Download evidence, insights and model evaluation datasets with privacy-safe controls." actions={<button className="btn primary" onClick={()=>notify("Export generated") }><Download size={16}/> Create export</button>}/><div className="export-grid">{["Feedback evidence CSV","Theme & sentiment report","Insight evidence JSON","AI evaluation dataset"].map((x,i)=><div className="card export" key={x}><Download size={21}/><h3>{x}</h3><p>{["12,842 rows · CSV","38 clusters · XLSX","126 insights · JSON","2,000 labeled items · JSONL"][i]}</p><button className="btn ghost full" onClick={()=>notify(x+" is ready")}>Generate</button></div>)}</div></div>}

function Evaluation({notify}){return <div className="content"><PageHead eyebrow="MODEL QUALITY" title="AI evaluation" desc="Measure classification quality, inspect errors and maintain a human-labeled benchmark." actions={<button className="btn primary" onClick={()=>notify("Evaluation run started")}><Brain size={16}/> Run evaluation</button>}/><div className="kpis"><Kpi label="Sentiment accuracy" value="94.8%" change="+1.9%" note="vs last run" icon={Brain}/><Kpi label="Theme precision" value="91.6%" change="+2.7%" note="benchmark set" icon={Tag}/><Kpi label="Evidence coverage" value="98.6%" change="+0.8%" note="insights with sources" icon={FileText}/><Kpi label="Human agreement" value="96.2%" change="+0.6%" note="last 500 labels" icon={Users}/></div><section className="card eval"><h3>Evaluation suite</h3>{["Sentiment classification","Theme clustering","Priority detection","Evidence attribution","PII redaction"].map((x,i)=><div className="eval-row" key={x}><span>{x}</span><div className="progress"><i style={{width:(94-i*2)+"%"}}/></div><b>{94-i*2}%</b></div>)}</section></div>}

function Team({workspace,setWorkspace,notify}){return <div className="content"><PageHead eyebrow="WORKSPACE" title="Team & workspace" desc="Manage organization members, roles and workspace settings." actions={<button className="btn primary" onClick={()=>notify("Invitation dialog opened")}><Plus size={16}/> Invite member</button>}/><section className="card workspace-card"><h3>Organization workspace</h3><div className="form-grid"><label>Workspace name<input value={workspace} onChange={e=>setWorkspace(e.target.value)}/></label><label>Data region<select><option>EU · Frankfurt</option><option>US · Virginia</option><option>Asia · Singapore</option></select></label></div><button className="btn primary" onClick={()=>notify("Workspace saved")}>Save workspace</button></section><section className="card"><h3>Members</h3>{[["Eiman Arshad","Owner","ea@example.com"],["Sara Khan","Analyst","sara@example.com"],["Ali Raza","Reviewer","ali@example.com"]].map(m=><div className="member" key={m[0]}><div className="member-avatar">{m[0][0]}</div><div><b>{m[0]}</b><span>{m[2]}</span></div><select defaultValue={m[1]}><option>Owner</option><option>Analyst</option><option>Reviewer</option><option>Viewer</option></select></div>)}</section></div>}

function Privacy({notify}){return <div className="content"><PageHead eyebrow="PRIVACY & SECURITY" title="Privacy controls" desc="Control retention, PII handling, source access and auditability."/><div className="privacy-grid">{[["PII detection & redaction","Automatically detect email, phone, names and sensitive identifiers before indexing.",true],["Evidence access logging","Record who opened source evidence and exported data.",true],["Raw feedback retention","Keep raw source data for 180 days before automatic deletion.",false],["Model training opt-out","Do not use workspace data for model improvement.",true]].map(x=><div className="card privacy" key={x[0]}><div><ShieldCheck size={20}/><h3>{x[0]}</h3><p>{x[1]}</p></div><button className={x[2]?"toggle on":"toggle"} onClick={()=>notify(x[0]+" setting changed")}><i/></button></div>)}</div></div>}

function SettingsPage({theme,setTheme,notify}){return <div className="content"><PageHead eyebrow="SETTINGS" title="Hub settings" desc="Personalize your intelligence workspace and analysis defaults."/><section className="card settings"><label>Appearance<select value={theme} onChange={e=>setTheme(e.target.value)}><option value="light">Light</option><option value="dark">Dark</option></select></label><label>Default sentiment model<select><option>FeedbackIQ Balanced v3</option><option>High precision v3</option></select></label><label>Timezone<select><option>Asia/Karachi</option><option>UTC</option></select></label><button className="btn primary" onClick={()=>notify("Settings saved")}>Save settings</button></section></div>}

function Detail({item,onClose,notify}){return <div className="overlay"><div className="drawer"><div className="drawer-head"><div><span className="eyebrow">EVIDENCE {item.id}</span><h2>Feedback detail</h2></div><button className="icon-btn" onClick={onClose}><X size={19}/></button></div><div className="detail-text">{item.text}</div><div className="detail-grid"><div><span>Sentiment</span><b className={"pill "+item.sentiment.toLowerCase()}>{item.sentiment}</b></div><div><span>AI score</span><b>{item.score}</b></div><div><span>Theme</span><b>{item.theme}</b></div><div><span>Source</span><b>{item.evidence}</b></div></div><section className="evidence-box"><FileText size={18}/><div><b>Source evidence</b><p>{item.evidence} · imported Sep 10, 2026</p><button className="text-btn" onClick={()=>notify("Source opened in secure viewer")}>Open source</button></div></section><section><h3>Human correction</h3><div className="form-grid"><label>Theme<select defaultValue={item.theme}><option>Checkout</option><option>Mobile UX</option><option>Performance</option><option>Onboarding</option></select></label><label>Sentiment<select defaultValue={item.sentiment}><option>Positive</option><option>Neutral</option><option>Negative</option></select></label></div></section><button className="btn primary full" onClick={()=>{notify("Correction saved");onClose()}}>Save correction</button></div></div>}

function ImportModal({close,notify}){return <div className="overlay"><div className="modal"><div className="drawer-head"><div><span className="eyebrow">INGESTION</span><h2>Import feedback</h2></div><button className="icon-btn" onClick={close}><X size={19}/></button></div><div className="dropzone"><Upload size={28}/><h3>Drop CSV or JSON here</h3><p>Reviews, surveys and support tickets are automatically normalized and enriched.</p><button className="btn primary" onClick={()=>notify("Demo file imported successfully")}>Choose demo file</button></div><div className="import-options"><label>Source<select><option>Customer reviews</option><option>Survey responses</option><option>Support tickets</option></select></label><label>Run AI enrichment<select><option>Immediately</option><option>Schedule later</option></select></label></div></div></div>}

createRoot(document.getElementById("root")).render(<App/>);
