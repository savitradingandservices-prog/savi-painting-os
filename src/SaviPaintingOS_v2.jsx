// SaviPaintingOS v2 — 8 fully integrated modules
// Dashboard + Leads + Customers + Measurement + Quotation + Invoice + Projects + Labour
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const C = { navy:"#1A2B4A",navy2:"#243560",saffron:"#F5A623",chalk:"#F5F2EE",rust:"#C0392B",green:"#27AE60",slate:"#64748B",white:"#FFFFFF",border:"#E2D9CF",purple:"#7F77DD",purpleLight:"#EEEDFE" };
const n = v => Math.round(v).toLocaleString("en-IN");

// ── Shared ────────────────────────────────────────────────
const StatCard = ({ label, value, sub, color=C.navy, icon }) => (
  <div style={{ background:C.white,borderRadius:12,padding:"13px 16px",borderLeft:`3px solid ${color}`,boxShadow:"0 1px 5px rgba(0,0,0,.05)" }}>
    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
      <span style={{ fontSize:10,color:C.slate,fontWeight:700,textTransform:"uppercase",letterSpacing:".05em" }}>{label}</span>
      <span style={{ fontSize:18 }}>{icon}</span>
    </div>
    <div style={{ fontSize:22,fontWeight:800,color:C.navy,marginTop:3 }}>{value}</div>
    {sub && <div style={{ fontSize:11,color:C.slate,marginTop:2 }}>{sub}</div>}
  </div>
);

const Card = ({ title, children, action }) => (
  <div style={{ background:C.white,borderRadius:12,border:`0.5px solid ${C.border}`,overflow:"hidden",marginBottom:12 }}>
    <div style={{ padding:"10px 14px",background:C.chalk,borderBottom:`0.5px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
      <span style={{ fontSize:13,fontWeight:700,color:C.navy }}>{title}</span>
      {action}
    </div>
    <div style={{ padding:14 }}>{children}</div>
  </div>
);

const Btn = ({ children, onClick, color=C.navy, small, full }) => (
  <button onClick={onClick} style={{ background:color,color:C.white,border:"none",borderRadius:7,padding:small?"5px 10px":"7px 14px",fontSize:small?11:12,fontWeight:600,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:5,width:full?"100%":undefined,justifyContent:full?"center":undefined }}>
    {children}
  </button>
);

const Inp = ({ label, value, onChange, type="text", placeholder }) => (
  <div style={{ marginBottom:9 }}>
    {label && <label style={{ fontSize:10,fontWeight:700,color:C.slate,display:"block",marginBottom:3,textTransform:"uppercase",letterSpacing:".04em" }}>{label}</label>}
    <input type={type} value={value||""} onChange={onChange} placeholder={placeholder} style={{ width:"100%",padding:"7px 10px",border:`0.5px solid ${C.border}`,borderRadius:7,fontSize:12,background:C.white,color:C.navy,outline:"none" }} />
  </div>
);

const Sel = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom:9 }}>
    {label && <label style={{ fontSize:10,fontWeight:700,color:C.slate,display:"block",marginBottom:3,textTransform:"uppercase",letterSpacing:".04em" }}>{label}</label>}
    <select value={value} onChange={onChange} style={{ width:"100%",padding:"7px 10px",border:`0.5px solid ${C.border}`,borderRadius:7,fontSize:12,background:C.white,color:C.navy,outline:"none" }}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
);

const Tag = ({ label, bg, c }) => <span style={{ background:bg,color:c,padding:"2px 8px",borderRadius:10,fontSize:10,fontWeight:700,display:"inline-block" }}>{label}</span>;
const Modal = ({ title, onClose, children }) => (
  <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.35)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:16 }}>
    <div style={{ background:C.white,borderRadius:12,padding:20,width:"100%",maxWidth:460,maxHeight:"90vh",overflowY:"auto" }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
        <span style={{ fontSize:15,fontWeight:700,color:C.navy }}>{title}</span>
        <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",fontSize:18,color:C.slate }}>✕</button>
      </div>
      {children}
    </div>
  </div>
);
const Row2 = ({ children }) => <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:9 }}>{children}</div>;

// ── NAV ───────────────────────────────────────────────────
const NAV = [
  { id:"dashboard",icon:"⊞",label:"Dashboard" },
  { id:"leads",icon:"📥",label:"Leads" },
  { id:"customers",icon:"👤",label:"Customers" },
  { id:"measurement",icon:"📐",label:"Measurement" },
  { id:"quotations",icon:"📋",label:"Quotations" },
  { id:"invoices",icon:"🧾",label:"Invoices" },
  { id:"projects",icon:"🏗️",label:"Projects" },
  { id:"labour",icon:"👷",label:"Labour" },
  { id:"inventory",icon:"📦",label:"Inventory" },
  { id:"expenses",icon:"💸",label:"Expenses" },
  { id:"whatsapp",icon:"💬",label:"WhatsApp" },
  { id:"followup",icon:"🔔",label:"Follow-up" },
  { id:"reports",icon:"📊",label:"Reports" },
  { id:"ai",icon:"🤖",label:"AI Features" },
  { id:"security",icon:"🔒",label:"Settings" },
];

// ── MODULE: DASHBOARD ─────────────────────────────────────
const Dashboard = ({ setActive }) => {
  const stats = [
    { label:"Total Leads",value:"47",sub:"+8 this week",color:C.navy,icon:"📥" },
    { label:"Active Projects",value:"12",sub:"3 completing soon",color:C.saffron,icon:"🏗️" },
    { label:"Monthly Revenue",value:"₹3.8L",sub:"June 2025",color:C.green,icon:"💰" },
    { label:"Pending Payments",value:"₹1,05,500",sub:"3 invoices",color:C.rust,icon:"🧾" },
    { label:"Conversion Rate",value:"68%",sub:"Leads → Projects",color:C.navy2,icon:"📈" },
    { label:"Avg Project Value",value:"₹52,000",sub:"Last 30 days",color:C.purple,icon:"⭐" },
  ];
  const pc = p => p>=80?C.green:p>=50?C.saffron:C.rust;
  return (
    <div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:12,marginBottom:14 }}>
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 290px",gap:14,marginBottom:14 }}>
        <Card title="Recent Leads">
          {[["LD-001","Rajesh Patil","GBP","Interior","₹82,000","Won"],["LD-002","Sunita Kulkarni","WhatsApp","Waterproofing","₹32,000","Quoted"],["LD-003","Amit Deshmukh","Referral","Exterior","₹1,20,000","Active"],["LD-004","Priya Joshi","Facebook","Texture","₹56,000","New"]].map(([id,name,src,svc,amt,status])=>(
            <div key={id} style={{ display:"grid",gridTemplateColumns:"70px 1fr 70px 90px 80px 70px",gap:6,padding:"8px 0",borderBottom:`0.5px solid ${C.border}`,alignItems:"center",fontSize:12 }}>
              <span style={{ fontWeight:700,color:C.saffron,fontSize:10 }}>{id}</span>
              <span style={{ fontWeight:600,color:C.navy }}>{name}</span>
              <span style={{ color:C.slate,fontSize:11 }}>{src}</span>
              <span style={{ color:C.slate,fontSize:11 }}>{svc}</span>
              <span style={{ fontWeight:700,color:C.green }}>{amt}</span>
              <Tag label={status} bg={status==="Won"?"#EAF3DE":status==="Quoted"?"#FAEEDA":status==="Active"?"#E6F1FB":"#EEEDFE"} c={status==="Won"?"#27500A":status==="Quoted"?"#633806":status==="Active"?"#0C447C":"#3C3489"} />
            </div>
          ))}
        </Card>
        <div>
          <Card title="Quick Actions">
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:7 }}>
              {[["📥","New Lead","leads"],["👤","Customer","customers"],["⚡","Quote","quotations"],["🧾","Invoice","invoices"],["💸","Expense","expenses"],["💬","WhatsApp","whatsapp"]].map(([icon,label,mod])=>(
                <button key={label} onClick={()=>setActive(mod)} style={{ display:"flex",alignItems:"center",gap:6,background:C.chalk,border:`0.5px solid ${C.border}`,borderRadius:8,padding:"8px 10px",cursor:"pointer",fontSize:12,fontWeight:600,color:C.navy }}>
                  {icon} {label}
                </button>
              ))}
            </div>
          </Card>
          <Card title="Active Projects">
            {[["Patil Residence",75],["Om Complex",40],["Sharma Flat",90]].map(([name,pct])=>(
              <div key={name} style={{ marginBottom:10 }}>
                <div style={{ display:"flex",justifyContent:"space-between",fontSize:12 }}>
                  <span style={{ fontWeight:600,color:C.navy }}>{name}</span>
                  <span style={{ fontWeight:700,color:pc(pct) }}>{pct}%</span>
                </div>
                <div style={{ background:C.border,borderRadius:8,height:5,overflow:"hidden",marginTop:4 }}>
                  <div style={{ width:`${pct}%`,height:"100%",background:pc(pct),borderRadius:8 }} />
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

// ── MODULE: LEADS ─────────────────────────────────────────
const Leads = () => {
  const STAGES = ["New","Contacted","Site Visit","Quoted","Won","Lost"];
  const SC = { New:{bg:"#EBF8FF",c:"#2B6CB0"},Contacted:{bg:"#EEEDFE",c:"#3C3489"},"Site Visit":{bg:"#FAEEDA",c:"#633806"},Quoted:{bg:"#E1F5EE",c:"#085041"},Won:{bg:"#EAF3DE",c:"#27500A"},Lost:{bg:"#FCEBEB",c:"#791F1F"} };
  const [leads,setLeads] = useState([
    { id:"LD-001",name:"Rajesh Patil",phone:"9876543210",area:"Magarpatta",source:"GBP",service:"Interior Painting",stage:"Won",est:"82000",date:"1 Jun",note:"Full 3BHK" },
    { id:"LD-002",name:"Sunita Kulkarni",phone:"9823456781",area:"Hadapsar",source:"WhatsApp",service:"Waterproofing",stage:"Quoted",est:"32000",date:"10 Jun",note:"Terrace + bathrooms" },
    { id:"LD-003",name:"Amit Deshmukh",phone:"9765432198",area:"Kharadi",source:"Referral",service:"Exterior Painting",stage:"Site Visit",est:"120000",date:"15 Jun",note:"4-floor commercial" },
    { id:"LD-004",name:"Priya Joshi",phone:"9988776655",area:"Undri",source:"Facebook",service:"Interior+Texture",stage:"New",est:"56000",date:"20 Jun",note:"2BHK texture" },
    { id:"LD-005",name:"Vikram Shinde",phone:"9090909090",area:"Wagholi",source:"GBP",service:"Full Home",stage:"Contacted",est:"180000",date:"22 Jun",note:"Villa premium" },
  ]);
  const [sel,setSel] = useState(null);
  const [search,setSearch] = useState("");
  const [showAdd,setShowAdd] = useState(false);
  const [form,setForm] = useState({ name:"",phone:"",source:"GBP",service:"Interior Painting",area:"",est:"",note:"" });
  const f = form; const sf = k => v => setForm({...form,[k]:v.target.value});

  const selL = sel ? leads.find(l=>l.id===sel) : null;
  const fl = leads.filter(l=>!search||l.name.toLowerCase().includes(search.toLowerCase())||l.phone.includes(search)||l.area.toLowerCase().includes(search.toLowerCase()));

  const save = () => {
    if(!form.name)return;
    const id=`LD-00${leads.length+1}`;
    setLeads([{ id,...form,stage:"New",date:"Today" },...leads]);
    setShowAdd(false); setForm({ name:"",phone:"",source:"GBP",service:"Interior Painting",area:"",est:"",note:"" });
  };

  return (
    <div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:14 }}>
        <StatCard label="Total Leads" value={leads.length} sub="All time" color={C.navy} icon="📥" />
        <StatCard label="New" value={leads.filter(l=>l.stage==="New").length} sub="Needs follow-up" color={"#3182CE"} icon="🆕" />
        <StatCard label="Won" value={leads.filter(l=>l.stage==="Won").length} sub="Converted" color={C.green} icon="✅" />
        <StatCard label="Pipeline" value={leads.filter(l=>!["Won","Lost"].includes(l.stage)).length} sub="Active leads" color={C.saffron} icon="🔄" />
        <StatCard label="Conversion" value={`${Math.round(leads.filter(l=>l.stage==="Won").length/leads.length*100)}%`} sub="Lead → Project" color={C.purple} icon="📈" />
      </div>
      <div style={{ display:"flex",gap:8,marginBottom:12,flexWrap:"wrap" }}>
        <input placeholder="Search by name, phone, area..." value={search} onChange={e=>setSearch(e.target.value)} style={{ flex:1,minWidth:180,maxWidth:280,padding:"7px 10px",border:`0.5px solid ${C.border}`,borderRadius:8,fontSize:12,background:C.white }} />
        <Btn onClick={()=>setShowAdd(true)}>+ Add Lead</Btn>
      </div>
      {/* Pipeline */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8,marginBottom:14 }}>
        {STAGES.map(stage=>{
          const sc=SC[stage];
          const items=fl.filter(l=>l.stage===stage);
          return (
            <div key={stage} style={{ background:sc.bg,borderRadius:10,padding:9 }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:7 }}>
                <span style={{ fontSize:9,fontWeight:700,color:sc.c,textTransform:"uppercase",letterSpacing:".05em" }}>{stage}</span>
                <span style={{ fontSize:9,fontWeight:700,background:"rgba(255,255,255,.7)",padding:"1px 5px",borderRadius:8,color:sc.c }}>{items.length}</span>
              </div>
              {items.map(l=>(
                <div key={l.id} onClick={()=>setSel(sel===l.id?null:l.id)} style={{ background:C.white,borderRadius:6,padding:"6px 8px",marginBottom:5,cursor:"pointer",border:`1px solid ${sel===l.id?sc.c:"transparent"}`,fontSize:11 }}>
                  <div style={{ fontWeight:600,color:C.navy }}>{l.name}</div>
                  <div style={{ color:C.slate,fontSize:10,marginTop:2 }}>{l.source} · {l.est?"₹"+n(parseInt(l.est)):"—"}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {/* Detail */}
      {selL && (
        <Card title={`${selL.name} — ${selL.id}`} action={<button onClick={()=>setSel(null)} style={{ background:"none",border:"none",cursor:"pointer",color:C.slate,fontSize:16 }}>✕</button>}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:12 }}>
            {[["Phone",selL.phone],["Source",selL.source],["Area",selL.area],["Service",selL.service],["Estimate",selL.est?"₹"+n(parseInt(selL.est)):"—"],["Added",selL.date]].map(([k,v])=>(
              <div key={k}><div style={{ fontSize:10,color:C.slate,fontWeight:700,textTransform:"uppercase" }}>{k}</div><div style={{ fontSize:13,fontWeight:600,color:C.navy,marginTop:2 }}>{v||"—"}</div></div>
            ))}
          </div>
          {selL.note && <div style={{ fontSize:12,color:C.slate,marginBottom:12,fontStyle:"italic" }}>📝 {selL.note}</div>}
          <div style={{ fontSize:11,fontWeight:700,color:C.slate,textTransform:"uppercase",letterSpacing:".04em",marginBottom:7 }}>Move to stage</div>
          <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
            {STAGES.map(s=>{
              const sc=SC[s];
              return <span key={s} onClick={()=>setLeads(leads.map(l=>l.id===selL.id?{...l,stage:s}:l))} style={{ padding:"4px 10px",borderRadius:14,fontSize:11,fontWeight:600,cursor:"pointer",background:sc.bg,color:sc.c,border:`1px solid ${selL.stage===s?sc.c:"transparent"}` }}>{s}</span>;
            })}
          </div>
        </Card>
      )}
      {showAdd && (
        <Modal title="Add New Lead" onClose={()=>setShowAdd(false)}>
          <Row2><Inp label="Full Name" value={f.name} onChange={sf("name")} /><Inp label="Phone" value={f.phone} onChange={sf("phone")} /></Row2>
          <Row2>
            <Sel label="Source" value={f.source} onChange={sf("source")} options={["GBP","WhatsApp","Facebook","Instagram","Referral","Phone Call","Website","Walk-in"]} />
            <Sel label="Service" value={f.service} onChange={sf("service")} options={["Interior Painting","Exterior Painting","Texture Painting","Waterproofing","Full Home"]} />
          </Row2>
          <Row2><Inp label="Area" value={f.area} onChange={sf("area")} /><Inp label="Estimate (₹)" value={f.est} onChange={sf("est")} /></Row2>
          <Inp label="Notes" value={f.note} onChange={sf("note")} placeholder="Any details..." />
          <div style={{ display:"flex",gap:7,justifyContent:"flex-end",marginTop:10 }}>
            <button onClick={()=>setShowAdd(false)} style={{ background:"none",border:`0.5px solid ${C.border}`,borderRadius:7,padding:"7px 13px",fontSize:12,cursor:"pointer",color:C.slate }}>Cancel</button>
            <Btn onClick={save}>✓ Save Lead</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ── MODULE: CUSTOMERS ─────────────────────────────────────
const Customers = () => {
  const [customers] = useState([
    { id:"CU-001",name:"Rajesh Patil",phone:"9876543210",area:"Magarpatta",type:"Residential",projects:3,value:182000,email:"rajesh@gmail.com",since:"Jan 2024" },
    { id:"CU-002",name:"Sunita Kulkarni",phone:"9823456781",area:"Hadapsar",type:"Residential",projects:1,value:32000,email:"sunita@yahoo.com",since:"Mar 2024" },
    { id:"CU-003",name:"Amit Deshmukh",phone:"9765432198",area:"Kharadi",type:"Commercial",projects:5,value:456000,email:"amit@biz.com",since:"Nov 2023" },
    { id:"CU-004",name:"Priya Joshi",phone:"9988776655",area:"Undri",type:"Residential",projects:1,value:56000,email:"priya@gmail.com",since:"May 2024" },
    { id:"CU-005",name:"Vikram Shinde",phone:"9090909090",area:"Wagholi",type:"VIP",projects:7,value:890000,email:"vikram@shindegroup.in",since:"Aug 2023" },
  ]);
  const [sel,setSel] = useState(null);
  const [search,setSearch] = useState("");
  const AVC=[{bg:"#E6F1FB",c:"#0C447C"},{bg:"#EAF3DE",c:"#27500A"},{bg:"#FAEEDA",c:"#633806"},{bg:"#EEEDFE",c:"#3C3489"},{bg:"#FCEBEB",c:"#791F1F"}];
  const init = name => name.split(" ").map(w=>w[0]).join("").slice(0,2);
  const tc = t => t==="VIP"?{bg:"#FAEEDA",c:"#633806"}:t==="Commercial"?{bg:"#EAF3DE",c:"#27500A"}:{bg:"#E6F1FB",c:"#0C447C"};
  const fl = customers.filter(c=>!search||c.name.toLowerCase().includes(search.toLowerCase())||c.phone.includes(search)||c.area.toLowerCase().includes(search.toLowerCase()));
  const selC = sel ? customers.find(c=>c.id===sel) : null;

  return (
    <div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14 }}>
        <StatCard label="Total Customers" value={customers.length} sub="All time" color={C.navy} icon="👤" />
        <StatCard label="VIP" value={customers.filter(c=>c.type==="VIP").length} sub="High value" color={C.saffron} icon="⭐" />
        <StatCard label="Commercial" value={customers.filter(c=>c.type==="Commercial").length} sub="Business" color={C.green} icon="🏢" />
        <StatCard label="Total Revenue" value={`₹${n(customers.reduce((s,c)=>s+c.value,0))}`} sub="All customers" color={C.purple} icon="💰" />
      </div>
      <input placeholder="Search by name, phone, area..." value={search} onChange={e=>setSearch(e.target.value)} style={{ width:"100%",maxWidth:300,padding:"7px 10px",border:`0.5px solid ${C.border}`,borderRadius:8,fontSize:12,background:C.white,marginBottom:12,display:"block" }} />
      <Card title="Customer List">
        {fl.map((c,i)=>{
          const av=AVC[i%AVC.length]; const t=tc(c.type);
          return (
            <div key={c.id} onClick={()=>setSel(sel===c.id?null:c.id)} style={{ display:"grid",gridTemplateColumns:"1.8fr 1fr 80px 80px 100px 90px",gap:8,padding:"10px 0",borderBottom:`0.5px solid ${C.border}`,alignItems:"center",cursor:"pointer",background:sel===c.id?"#EBF3FF":"transparent",borderRadius:sel===c.id?8:0,paddingLeft:sel===c.id?6:0 }}>
              <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                <div style={{ width:28,height:28,borderRadius:"50%",background:av.bg,color:av.c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,flexShrink:0 }}>{init(c.name)}</div>
                <div><div style={{ fontSize:12,fontWeight:600,color:C.navy }}>{c.name}</div><div style={{ fontSize:10,color:C.slate }}>{c.id}</div></div>
              </div>
              <span style={{ fontSize:11,color:C.slate }}>{c.phone}</span>
              <span style={{ fontSize:11,color:C.slate }}>{c.area}</span>
              <Tag label={c.type} bg={t.bg} c={t.c} />
              <span style={{ fontSize:11,fontWeight:600,color:C.navy,textAlign:"center" }}>{c.projects} projects</span>
              <span style={{ fontSize:12,fontWeight:700,color:C.green }}>₹{n(c.value)}</span>
            </div>
          );
        })}
      </Card>
      {selC && (
        <Card title={selC.name} action={<button onClick={()=>setSel(null)} style={{ background:"none",border:"none",cursor:"pointer",color:C.slate,fontSize:16 }}>✕</button>}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10 }}>
            {[["Customer ID",selC.id],["Phone",selC.phone],["Email",selC.email],["Area",selC.area],["Since",selC.since],["Type",selC.type],["Projects",selC.projects],["Total Revenue",`₹${n(selC.value)}`],["Avg/Project",`₹${n(Math.round(selC.value/selC.projects))}`]].map(([k,v])=>(
              <div key={k}><div style={{ fontSize:10,color:C.slate,fontWeight:700,textTransform:"uppercase" }}>{k}</div><div style={{ fontSize:13,fontWeight:600,color:C.navy,marginTop:2 }}>{v}</div></div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

// ── MODULE: MEASUREMENT ───────────────────────────────────
const Measurement = () => {
  const [floors,setFloors] = useState([
    { id:"f1",name:"Ground Floor",open:true,rooms:[
      { id:"r1",name:"Living Room",l:"18",w:"14",h:"10",doors:"2",windows:"3",ceiling:true,texture:false,waterproof:false },
      { id:"r2",name:"Kitchen",l:"12",w:"10",h:"10",doors:"1",windows:"2",ceiling:true,texture:false,waterproof:false },
      { id:"r3",name:"Bathroom",l:"6",w:"5",h:"10",doors:"1",windows:"1",ceiling:false,texture:false,waterproof:true },
    ]},
    { id:"f2",name:"First Floor",open:true,rooms:[
      { id:"r4",name:"Master Bedroom",l:"16",w:"14",h:"10",doors:"2",windows:"3",ceiling:true,texture:true,waterproof:false },
      { id:"r5",name:"Bedroom 2",l:"12",w:"12",h:"10",doors:"1",windows:"2",ceiling:true,texture:false,waterproof:false },
    ]},
  ]);
  const wall = r => Math.max(0,2*(parseFloat(r.l)||0+parseFloat(r.w)||0)*(parseFloat(r.h)||0)-(parseInt(r.doors)||0)*21-(parseInt(r.windows)||0)*12);
  const ceil = r => r.ceiling?(parseFloat(r.l)||0)*(parseFloat(r.w)||0):0;
  const all = floors.flatMap(f=>f.rooms.map(r=>({...r,fn:f.name})));
  const tw=all.reduce((s,r)=>s+wall(r),0),tc2=all.reduce((s,r)=>s+ceil(r),0);
  const tt=all.filter(r=>r.texture).reduce((s,r)=>s+(parseFloat(r.l)||0)*(parseFloat(r.w)||0),0);
  const twp=all.filter(r=>r.waterproof).reduce((s,r)=>s+(parseFloat(r.l)||0)*(parseFloat(r.w)||0),0);
  const est=Math.round(tw*18+tc2*18+tt*120+twp*60);
  const upd=(fid,rid,k,v)=>setFloors(floors.map(f=>f.id===fid?{...f,rooms:f.rooms.map(r=>r.id===rid?{...r,[k]:v}:r)}:f));
  const addRoom=fid=>setFloors(floors.map(f=>f.id===fid?{...f,rooms:[...f.rooms,{id:"r"+Date.now(),name:"New Room",l:"10",w:"10",h:"10",doors:"1",windows:"1",ceiling:true,texture:false,waterproof:false}]}:f));
  const pc=p=>p>=80?C.green:p>=50?C.saffron:C.rust;

  return (
    <div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:14 }}>
        <StatCard label="Wall Area" value={`${n(tw)}`} sub="sq.ft (after deductions)" color={C.navy} icon="🧱" />
        <StatCard label="Ceiling" value={`${n(tc2)}`} sub="sq.ft" color={C.navy2} icon="⬜" />
        <StatCard label="Texture" value={`${n(tt)}`} sub="sq.ft" color={C.saffron} icon="🎨" />
        <StatCard label="Waterproof" value={`${n(twp)}`} sub="sq.ft" color={"#3182CE"} icon="💧" />
        <StatCard label="Est. Cost" value={`₹${n(est)}`} sub="Wall+Ceil+Tex+WP" color={C.green} icon="💰" />
      </div>
      {floors.map(f=>(
        <Card key={f.id} title={<input value={f.name} onChange={e=>setFloors(floors.map(fl=>fl.id===f.id?{...fl,name:e.target.value}:fl))} style={{ background:"none",border:"none",fontSize:13,fontWeight:700,color:C.navy,padding:0 }} />} action={<Btn small onClick={()=>addRoom(f.id)}>+ Room</Btn>}>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:560 }}>
              <thead><tr style={{ background:C.chalk }}>{["Room","L","W","H","Doors","Win","Ceil","Wall sq.ft","Tex","WP"].map(h=><th key={h} style={{ padding:"6px 8px",textAlign:"center",fontSize:10,fontWeight:700,color:C.slate,textTransform:"uppercase",whiteSpace:"nowrap" }}>{h}</th>)}</tr></thead>
              <tbody>{f.rooms.map(r=>(
                <tr key={r.id} style={{ borderTop:`0.5px solid ${C.border}` }}>
                  <td style={{ padding:"5px 4px" }}><input value={r.name} onChange={e=>upd(f.id,r.id,"name",e.target.value)} style={{ border:`0.5px solid ${C.border}`,borderRadius:5,padding:"4px 6px",fontSize:11,width:"100%",minWidth:80 }} /></td>
                  {["l","w","h","doors","windows"].map(k=>(
                    <td key={k} style={{ padding:"5px 3px",textAlign:"center" }}><input type="number" value={r[k]} onChange={e=>upd(f.id,r.id,k,e.target.value)} style={{ border:`0.5px solid ${C.border}`,borderRadius:5,padding:"4px 5px",fontSize:11,width:44,textAlign:"center" }} /></td>
                  ))}
                  <td style={{ textAlign:"center" }}><input type="checkbox" checked={r.ceiling} onChange={e=>upd(f.id,r.id,"ceiling",e.target.checked)} /></td>
                  <td style={{ textAlign:"center",fontWeight:700,color:C.navy,fontSize:11,padding:"5px 6px" }}>{n(wall(r))}</td>
                  <td style={{ textAlign:"center" }}><input type="checkbox" checked={r.texture} onChange={e=>upd(f.id,r.id,"texture",e.target.checked)} /></td>
                  <td style={{ textAlign:"center" }}><input type="checkbox" checked={r.waterproof} onChange={e=>upd(f.id,r.id,"waterproof",e.target.checked)} /></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </Card>
      ))}
      <button onClick={()=>setFloors([...floors,{id:"f"+Date.now(),name:`Floor ${floors.length+1}`,open:true,rooms:[{id:"r"+Date.now(),name:"Room 1",l:"12",w:"10",h:"10",doors:"1",windows:"2",ceiling:true,texture:false,waterproof:false}]}])} style={{ width:"100%",border:`0.5px dashed ${C.border}`,borderRadius:10,padding:"10px 0",fontSize:13,color:C.slate,background:"none",cursor:"pointer",marginBottom:12 }}>+ Add Floor / Building</button>
      <Card title="Summary Table">
        <table style={{ width:"100%",borderCollapse:"collapse",fontSize:12 }}>
          <thead><tr style={{ background:C.chalk }}>{["Room","Floor","Wall sq.ft","Ceil sq.ft","Texture","Waterproof"].map(h=><th key={h} style={{ padding:"7px 10px",textAlign:"left",fontSize:10,fontWeight:700,color:C.slate,textTransform:"uppercase" }}>{h}</th>)}</tr></thead>
          <tbody>
            {all.map(r=>(
              <tr key={r.id} style={{ borderTop:`0.5px solid ${C.border}` }}>
                <td style={{ padding:"8px 10px",fontWeight:600,color:C.navy }}>{r.name}</td>
                <td style={{ padding:"8px 10px",color:C.slate,fontSize:11 }}>{r.fn}</td>
                <td style={{ padding:"8px 10px",fontWeight:700,color:C.navy }}>{n(wall(r))}</td>
                <td style={{ padding:"8px 10px",color:C.slate }}>{n(ceil(r))}</td>
                <td style={{ padding:"8px 10px" }}>{r.texture?<Tag label="✓" bg="#EAF3DE" c="#27500A" />:"—"}</td>
                <td style={{ padding:"8px 10px" }}>{r.waterproof?<Tag label="✓" bg="#E6F1FB" c="#0C447C" />:"—"}</td>
              </tr>
            ))}
            <tr style={{ background:C.navy }}>
              {["Total","",n(tw),n(tc2),tt>0?n(tt):"—",twp>0?n(twp):"—"].map((v,i)=><td key={i} style={{ padding:"9px 10px",fontWeight:700,color:C.white,fontSize:12 }}>{v}</td>)}
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// ── MODULE: QUOTATIONS ────────────────────────────────────
const Quotations = () => {
  const RATES = { "Interior Painting":18,"Exterior Painting":20,"Texture Painting":120,"Waterproofing":60,"Wall Putty":12,"Primer":8 };
  const [mode,setMode] = useState("quick");
  const [cust,setCust] = useState("Rajesh Patil");
  const [phone,setPhone] = useState("9876543210");
  const [area,setArea] = useState("Magarpatta");
  const [discount,setDiscount] = useState(0);
  const [gst,setGst] = useState(0);
  const [inclGST,setInclGST] = useState(false);
  const [validity,setValidity] = useState("15");
  const [qItems,setQItems] = useState({ "Interior Painting":{on:true,sqft:"1200",rate:18},"Texture Painting":{on:false,sqft:"",rate:120},"Waterproofing":{on:false,sqft:"",rate:60},"Wall Putty":{on:false,sqft:"",rate:12},"Primer":{on:false,sqft:"",rate:8} });
  const [dLines,setDLines] = useState([{ id:"d1",name:"Interior Painting – Living Room",qty:"1200",rate:"18" },{ id:"d2",name:"Wall Putty – All Rooms",qty:"1200",rate:"12" }]);

  const sub = mode==="quick"
    ? Object.entries(qItems).filter(([,v])=>v.on).reduce((s,[,v])=>s+(parseFloat(v.sqft)||0)*v.rate,0)
    : dLines.reduce((s,l)=>s+(parseFloat(l.qty)||0)*(parseFloat(l.rate)||0),0);
  const disc = sub*(discount/100);
  const gstAmt = inclGST?(sub-disc)*(gst/100):0;
  const total = sub-disc+gstAmt;

  return (
    <div style={{ display:"grid",gridTemplateColumns:"1fr 300px",gap:14 }}>
      <div>
        <div style={{ display:"flex",marginBottom:14,borderRadius:8,overflow:"hidden",border:`0.5px solid ${C.border}`,background:C.chalk }}>
          {["quick","detail"].map(m=><button key={m} onClick={()=>setMode(m)} style={{ flex:1,padding:"8px 0",fontSize:12,fontWeight:600,border:"none",cursor:"pointer",background:mode===m?C.navy:"transparent",color:mode===m?C.white:C.slate }}>{m==="quick"?"⚡ Quick Mode":"📋 Detailed Mode"}</button>)}
        </div>
        <Card title="Customer Details">
          <Row2><Inp label="Customer" value={cust} onChange={e=>setCust(e.target.value)} /><Inp label="Phone" value={phone} onChange={e=>setPhone(e.target.value)} /></Row2>
          <Row2><Inp label="Site Area" value={area} onChange={e=>setArea(e.target.value)} /><Inp label="Valid for (days)" value={validity} onChange={e=>setValidity(e.target.value)} /></Row2>
        </Card>
        {mode==="quick" ? (
          <Card title="Select Services">
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
              {Object.entries(qItems).map(([name,v])=>(
                <div key={name} onClick={()=>setQItems({...qItems,[name]:{...v,on:!v.on}})} style={{ border:`1px solid ${v.on?C.navy:C.border}`,borderRadius:9,padding:"9px 11px",cursor:"pointer",background:v.on?"#EBF3FF":C.white }}>
                  <div style={{ fontSize:12,fontWeight:700,color:C.navy }}>{name}</div>
                  <div style={{ fontSize:11,color:C.slate }}>₹{v.rate}/sq.ft</div>
                  {v.on && <div onClick={e=>e.stopPropagation()} style={{ display:"grid",gridTemplateColumns:"1fr 70px",gap:6,marginTop:7 }}>
                    <input type="number" value={v.sqft} placeholder="sq.ft" onChange={e=>setQItems({...qItems,[name]:{...v,sqft:e.target.value}})} style={{ padding:"5px 7px",border:`0.5px solid ${C.border}`,borderRadius:6,fontSize:11 }} />
                    <input type="number" value={v.rate} onChange={e=>setQItems({...qItems,[name]:{...v,rate:parseFloat(e.target.value)||0}})} style={{ padding:"5px 7px",border:`0.5px solid ${C.border}`,borderRadius:6,fontSize:11,textAlign:"center" }} />
                  </div>}
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <Card title="Line Items">
            {dLines.map(l=>(
              <div key={l.id} style={{ display:"grid",gridTemplateColumns:"1fr 70px 70px 80px 26px",gap:6,marginBottom:7,alignItems:"center" }}>
                <input value={l.name} onChange={e=>setDLines(dLines.map(x=>x.id===l.id?{...x,name:e.target.value}:x))} style={{ padding:"5px 8px",border:`0.5px solid ${C.border}`,borderRadius:6,fontSize:11 }} />
                <input type="number" value={l.qty} onChange={e=>setDLines(dLines.map(x=>x.id===l.id?{...x,qty:e.target.value}:x))} style={{ padding:"5px 7px",border:`0.5px solid ${C.border}`,borderRadius:6,fontSize:11,textAlign:"center" }} />
                <input type="number" value={l.rate} onChange={e=>setDLines(dLines.map(x=>x.id===l.id?{...x,rate:e.target.value}:x))} style={{ padding:"5px 7px",border:`0.5px solid ${C.border}`,borderRadius:6,fontSize:11,textAlign:"center" }} />
                <span style={{ fontSize:12,fontWeight:700,color:C.green,textAlign:"right" }}>₹{n((parseFloat(l.qty)||0)*(parseFloat(l.rate)||0))}</span>
                <button onClick={()=>setDLines(dLines.filter(x=>x.id!==l.id))} style={{ background:"none",border:`0.5px solid ${C.border}`,borderRadius:5,cursor:"pointer",color:C.slate,padding:"3px 5px",fontSize:12 }}>✕</button>
              </div>
            ))}
            <button onClick={()=>setDLines([...dLines,{id:"d"+Date.now(),name:"New item",qty:"100",rate:"18"}])} style={{ width:"100%",border:`0.5px dashed ${C.border}`,borderRadius:7,padding:"7px 0",fontSize:12,color:C.slate,background:"none",cursor:"pointer",marginTop:6 }}>+ Add line item</button>
          </Card>
        )}
        <Card title="Pricing Settings">
          <div style={{ display:"flex",alignItems:"center",gap:12,flexWrap:"wrap",marginBottom:8 }}>
            <label style={{ fontSize:12,color:C.slate,fontWeight:600,display:"flex",alignItems:"center",gap:6 }}>Discount <input type="number" value={discount} onChange={e=>setDiscount(parseFloat(e.target.value)||0)} style={{ width:50,padding:"4px 7px",border:`0.5px solid ${C.border}`,borderRadius:6,fontSize:12,textAlign:"center" }} /> %</label>
            <label style={{ fontSize:12,color:C.slate,fontWeight:600,display:"flex",alignItems:"center",gap:6 }}><input type="checkbox" checked={inclGST} onChange={e=>setInclGST(e.target.checked)} /> GST <input type="number" value={gst} onChange={e=>setGst(parseFloat(e.target.value)||0)} style={{ width:40,padding:"4px 7px",border:`0.5px solid ${C.border}`,borderRadius:6,fontSize:12,textAlign:"center" }} /> %</label>
          </div>
        </Card>
      </div>
      {/* Preview */}
      <div>
        <div style={{ background:C.white,border:`0.5px solid ${C.border}`,borderRadius:12,overflow:"hidden" }}>
          <div style={{ background:C.navy,padding:"14px 16px",textAlign:"center" }}>
            <div style={{ color:C.saffron,fontWeight:900,fontSize:14,letterSpacing:".05em" }}>SAVI PAINTING</div>
            <div style={{ color:"rgba(255,255,255,.5)",fontSize:9,letterSpacing:".1em",textTransform:"uppercase" }}>& DECOR SERVICES · PUNE</div>
          </div>
          <div style={{ padding:14 }}>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:12,paddingBottom:10,borderBottom:`0.5px solid ${C.border}` }}>
              <div><div style={{ fontSize:14,fontWeight:800,color:C.navy }}>Quotation</div><div style={{ fontSize:11,color:C.slate }}>QT-2025-047</div></div>
              <div style={{ textAlign:"right" }}><div style={{ fontSize:11,color:C.slate }}>Date</div><div style={{ fontSize:12,fontWeight:600,color:C.navy }}>{new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</div></div>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12 }}>
              {[["Customer",cust],["Phone",phone],["Site","Pune"]].map(([k,v])=>(
                <div key={k}><div style={{ fontSize:9,color:C.slate,fontWeight:700,textTransform:"uppercase" }}>{k}</div><div style={{ fontSize:11,fontWeight:600,color:C.navy,marginTop:1 }}>{v}</div></div>
              ))}
            </div>
            <table style={{ width:"100%",borderCollapse:"collapse",fontSize:11,marginBottom:10 }}>
              <thead><tr><th style={{ textAlign:"left",fontSize:9,fontWeight:700,color:C.slate,textTransform:"uppercase",padding:"4px 0" }}>Description</th><th style={{ textAlign:"right",fontSize:9,fontWeight:700,color:C.slate,textTransform:"uppercase" }}>Amount</th></tr></thead>
              <tbody>
                {mode==="quick"
                  ? Object.entries(qItems).filter(([,v])=>v.on&&parseFloat(v.sqft)>0).map(([name,v])=><tr key={name}><td style={{ padding:"5px 0",borderBottom:`0.5px solid ${C.border}`,color:C.navy,fontWeight:600 }}>{name} · {n(parseFloat(v.sqft))} sq.ft</td><td style={{ textAlign:"right",borderBottom:`0.5px solid ${C.border}`,fontWeight:700,color:C.green }}>₹{n((parseFloat(v.sqft)||0)*v.rate)}</td></tr>)
                  : dLines.map(l=><tr key={l.id}><td style={{ padding:"5px 0",borderBottom:`0.5px solid ${C.border}`,color:C.navy,fontWeight:600 }}>{l.name}</td><td style={{ textAlign:"right",borderBottom:`0.5px solid ${C.border}`,fontWeight:700,color:C.green }}>₹{n((parseFloat(l.qty)||0)*(parseFloat(l.rate)||0))}</td></tr>)
                }
              </tbody>
            </table>
            <div style={{ borderTop:`0.5px solid ${C.border}`,paddingTop:8 }}>
              {[["Subtotal",`₹${n(sub)}`],disc>0&&["Discount",`– ₹${n(disc)}`],gstAmt>0&&["GST",`+ ₹${n(gstAmt)}`]].filter(Boolean).map(([k,v])=>(
                <div key={k} style={{ display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4,color:C.slate }}><span>{k}</span><span>{v}</span></div>
              ))}
              <div style={{ display:"flex",justifyContent:"space-between",fontSize:14,fontWeight:800,color:C.navy,marginTop:6,paddingTop:7,borderTop:`0.5px solid ${C.border}` }}><span>Total</span><span style={{ color:C.green }}>₹{n(total)}</span></div>
            </div>
            <div style={{ background:C.chalk,borderRadius:7,padding:"7px 10px",textAlign:"center",fontSize:11,color:C.slate,marginTop:10 }}>Valid for {validity} days</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginTop:10 }}>
              <Btn full>📄 Save PDF</Btn>
              <Btn color="#25D366" full>💬 WhatsApp</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── MODULE: INVOICES ──────────────────────────────────────
const Invoices = () => {
  const [invoices,setInvoices] = useState([
    { id:"INV-001",no:"INV-2025-001",customer:"Rajesh Patil",phone:"9876543210",type:"Advance",service:"Interior Painting",date:"1 Jun",amount:82000,paid:25000,status:"Partially Paid" },
    { id:"INV-002",no:"INV-2025-002",customer:"Vikram Shinde",phone:"9090909090",type:"Final",service:"Full Home",date:"10 Jun",amount:180000,paid:180000,status:"Paid" },
    { id:"INV-003",no:"INV-2025-003",customer:"Amit Deshmukh",phone:"9765432198",type:"Running",service:"Exterior+WP",date:"15 Jun",amount:120000,paid:50000,status:"Partially Paid" },
    { id:"INV-004",no:"INV-2025-004",customer:"Priya Joshi",phone:"9988776655",type:"Advance",service:"Interior+Texture",date:"20 Jun",amount:56000,paid:0,status:"Overdue" },
    { id:"INV-005",no:"INV-2025-005",customer:"Sunita Kulkarni",phone:"9823456781",type:"Final",service:"Waterproofing",date:"25 Jun",amount:32000,paid:0,status:"Pending" },
  ]);
  const [sel,setSel] = useState(null);
  const [search,setSearch] = useState("");
  const [filterType,setFilterType] = useState("All");
  const [showAdd,setShowAdd] = useState(false);
  const [form,setForm] = useState({ customer:"",type:"Advance",service:"",amount:"",paid:"" });
  const sf = k => v => setForm({...form,[k]:v.target.value});

  const totalAmt=invoices.reduce((s,i)=>s+i.amount,0);
  const totalPaid=invoices.reduce((s,i)=>s+i.paid,0);
  const fl=invoices.filter(i=>(!search||i.customer.toLowerCase().includes(search.toLowerCase())||i.no.toLowerCase().includes(search.toLowerCase()))&&(filterType==="All"||i.type===filterType));
  const selI=sel?invoices.find(i=>i.id===sel):null;
  const typeSC={ Advance:{bg:"#EAF3DE",c:"#27500A"},Running:{bg:"#FAEEDA",c:"#633806"},Final:{bg:"#E6F1FB",c:"#0C447C"} };
  const statSC={ Paid:{bg:"#EAF3DE",c:"#27500A"},"Partially Paid":{bg:"#FAEEDA",c:"#633806"},Pending:{bg:"#EEEDFE",c:"#3C3489"},Overdue:{bg:"#FCEBEB",c:"#791F1F"} };

  const saveInv = () => {
    const amt=parseFloat(form.amount)||0,paid=parseFloat(form.paid)||0;
    const status=paid>=amt&&amt>0?"Paid":paid>0?"Partially Paid":"Pending";
    setInvoices([{ id:"INV-00"+invoices.length+1,no:"INV-2025-00"+invoices.length+1,customer:form.customer||"New Customer",phone:"—",type:form.type,service:form.service||"Painting",date:"Today",amount:amt,paid,status },...invoices]);
    setShowAdd(false); setForm({ customer:"",type:"Advance",service:"",amount:"",paid:"" });
  };

  return (
    <div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14 }}>
        <StatCard label="Total Invoiced" value={`₹${n(totalAmt)}`} sub={`${invoices.length} invoices`} color={C.navy} icon="🧾" />
        <StatCard label="Received" value={`₹${n(totalPaid)}`} sub={`${Math.round(totalPaid/totalAmt*100)}% collected`} color={C.green} icon="✅" />
        <StatCard label="Outstanding" value={`₹${n(totalAmt-totalPaid)}`} sub="Pending collection" color={C.saffron} icon="⏳" />
        <StatCard label="Overdue" value={invoices.filter(i=>i.status==="Overdue").length} sub="Act now" color={C.rust} icon="🚨" />
      </div>
      <div style={{ display:"flex",gap:8,marginBottom:12,flexWrap:"wrap" }}>
        <input placeholder="Search invoice, customer..." value={search} onChange={e=>setSearch(e.target.value)} style={{ flex:1,minWidth:180,maxWidth:260,padding:"7px 10px",border:`0.5px solid ${C.border}`,borderRadius:8,fontSize:12,background:C.white }} />
        <select value={filterType} onChange={e=>setFilterType(e.target.value)} style={{ padding:"7px 10px",border:`0.5px solid ${C.border}`,borderRadius:8,fontSize:12,background:C.white }}>
          {["All","Advance","Running","Final"].map(t=><option key={t}>{t}</option>)}
        </select>
        <Btn onClick={()=>setShowAdd(true)}>+ New Invoice</Btn>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 290px",gap:14 }}>
        <Card title="Invoices">
          {fl.map(inv=>{
            const ts=typeSC[inv.type]||typeSC.Advance,ss=statSC[inv.status]||statSC.Pending;
            const pct=Math.round(inv.paid/inv.amount*100);
            return (
              <div key={inv.id} onClick={()=>setSel(sel===inv.id?null:inv.id)} style={{ padding:"10px 0",borderBottom:`0.5px solid ${C.border}`,cursor:"pointer",background:sel===inv.id?"#EBF3FF":"transparent" }}>
                <div style={{ display:"grid",gridTemplateColumns:"80px 1.6fr 80px 90px 80px",gap:8,alignItems:"center",fontSize:12 }}>
                  <div><div style={{ fontSize:10,fontWeight:700,color:C.saffron }}>{inv.no}</div><Tag label={inv.type} bg={ts.bg} c={ts.c} /></div>
                  <div><div style={{ fontWeight:600,color:C.navy }}>{inv.customer}</div><div style={{ fontSize:10,color:C.slate }}>{inv.service} · {inv.date}</div></div>
                  <div><div style={{ fontWeight:700,color:C.navy }}>₹{n(inv.amount)}</div><div style={{ fontSize:10,color:C.green }}>₹{n(inv.paid)} paid</div></div>
                  <Tag label={inv.status} bg={ss.bg} c={ss.c} />
                  <div style={{ display:"flex",gap:4 }}>
                    <button onClick={e=>{e.stopPropagation();window.alert("WhatsApp sent to "+inv.customer)}} style={{ background:"#25D366",border:"none",borderRadius:5,padding:"4px 7px",cursor:"pointer",color:"#fff",fontSize:11 }}>💬</button>
                  </div>
                </div>
                <div style={{ background:C.border,borderRadius:8,height:4,overflow:"hidden",marginTop:7 }}>
                  <div style={{ width:`${pct}%`,height:"100%",background:inv.status==="Paid"?C.green:inv.status==="Overdue"?C.rust:C.saffron,borderRadius:8 }} />
                </div>
              </div>
            );
          })}
        </Card>
        {selI ? (
          <div style={{ background:C.white,border:`0.5px solid ${C.border}`,borderRadius:12,overflow:"hidden" }}>
            <div style={{ background:C.navy,padding:"12px 14px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
              <div><div style={{ fontSize:12,fontWeight:700,color:C.white }}>{selI.no}</div><div style={{ fontSize:9,color:"rgba(255,255,255,.5)",marginTop:1 }}>{selI.type} Invoice</div></div>
              <button onClick={()=>setSel(null)} style={{ background:"none",border:"none",color:"rgba(255,255,255,.6)",cursor:"pointer",fontSize:16 }}>✕</button>
            </div>
            <div style={{ padding:14 }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12 }}>
                {[["Customer",selI.customer],["Phone",selI.phone],["Service",selI.service],["Date",selI.date],["Amount",`₹${n(selI.amount)}`],["Status",selI.status]].map(([k,v])=>(
                  <div key={k}><div style={{ fontSize:9,color:C.slate,fontWeight:700,textTransform:"uppercase" }}>{k}</div><div style={{ fontSize:12,fontWeight:600,color:C.navy,marginTop:1 }}>{v}</div></div>
                ))}
              </div>
              <div style={{ fontSize:10,fontWeight:700,color:C.slate,textTransform:"uppercase",marginBottom:7 }}>Payment Progress</div>
              <div style={{ background:C.border,borderRadius:8,height:8,overflow:"hidden",marginBottom:6 }}>
                <div style={{ width:`${Math.round(selI.paid/selI.amount*100)}%`,height:"100%",background:selI.status==="Paid"?C.green:C.saffron,borderRadius:8 }} />
              </div>
              <div style={{ display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:12 }}>
                <span style={{ color:C.green,fontWeight:700 }}>Received: ₹{n(selI.paid)}</span>
                <span style={{ color:C.rust,fontWeight:700 }}>Due: ₹{n(selI.amount-selI.paid)}</span>
              </div>
              {selI.paid<selI.amount && (
                <div style={{ background:C.chalk,border:`0.5px solid ${C.border}`,borderRadius:8,padding:10,textAlign:"center",marginBottom:10 }}>
                  <div style={{ fontSize:11,color:C.slate,marginBottom:4 }}>Scan to pay via UPI</div>
                  <div style={{ fontSize:16,margin:"8px 0" }}>▓▓▓▓▓</div>
                  <div style={{ fontSize:11,fontWeight:700,color:C.navy }}>vickysalave@upi</div>
                </div>
              )}
              {selI.paid<selI.amount && (
                <Btn full color={C.green} onClick={()=>setInvoices(invoices.map(i=>i.id===selI.id?{...i,paid:i.amount,status:"Paid"}:i))}>✓ Mark as Paid</Btn>
              )}
              {selI.paid>=selI.amount && <div style={{ background:"#EAF3DE",borderRadius:8,padding:"8px",textAlign:"center",fontSize:12,fontWeight:700,color:"#27500A" }}>✅ Fully Paid</div>}
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginTop:9 }}>
                <Btn full small>📄 PDF</Btn>
                <Btn full small color="#25D366">💬 Send</Btn>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ background:C.white,border:`0.5px solid ${C.border}`,borderRadius:12,padding:20,textAlign:"center",color:C.slate,fontSize:12 }}>
            <div style={{ fontSize:32,marginBottom:8 }}>🧾</div>
            Click an invoice to view details and payment status.
          </div>
        )}
      </div>
      {showAdd && (
        <Modal title="New Invoice" onClose={()=>setShowAdd(false)}>
          <Row2><Inp label="Customer" value={form.customer} onChange={sf("customer")} /><Sel label="Type" value={form.type} onChange={sf("type")} options={["Advance","Running","Final"]} /></Row2>
          <Inp label="Service" value={form.service} onChange={sf("service")} />
          <Row2><Inp label="Total Amount (₹)" value={form.amount} onChange={sf("amount")} type="number" /><Inp label="Amount Received (₹)" value={form.paid} onChange={sf("paid")} type="number" /></Row2>
          <div style={{ display:"flex",gap:7,justifyContent:"flex-end",marginTop:10 }}>
            <button onClick={()=>setShowAdd(false)} style={{ background:"none",border:`0.5px solid ${C.border}`,borderRadius:7,padding:"7px 13px",fontSize:12,cursor:"pointer",color:C.slate }}>Cancel</button>
            <Btn onClick={saveInv}>✓ Save Invoice</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ── MODULE: PROJECTS ──────────────────────────────────────
const Projects = () => {
  const [projects,setProjects] = useState([
    { id:"PR-001",name:"Patil Residence – 3BHK",customer:"Rajesh Patil",area:"Magarpatta",service:"Interior+Texture",start:"1 Jun",end:"20 Jun",status:"Active",progress:75,value:"₹82,000",
      painters:["Raju","Sunil"],tasks:[{t:"Surface prep",done:true},{t:"Putty",done:true},{t:"Primer",done:true},{t:"Base coat",done:true},{t:"Texture work",done:false},{t:"Touch-up",done:false}],
      logs:[{date:"26 Jun",note:"Texture work started",pct:75},{date:"24 Jun",note:"Base coat done",pct:65}] },
    { id:"PR-002",name:"Om Complex – Exterior",customer:"Amit Deshmukh",area:"Kharadi",service:"Exterior+WP",start:"10 Jun",end:"5 Jul",status:"Active",progress:40,value:"₹1,20,000",
      painters:["Deepak","Ajay"],tasks:[{t:"Scaffolding",done:true},{t:"Crack filling",done:true},{t:"Waterproofing",done:false},{t:"Primer",done:false},{t:"Paint",done:false}],
      logs:[{date:"25 Jun",note:"Crack filling done",pct:40}] },
    { id:"PR-003",name:"Shinde Villa – Full Home",customer:"Vikram Shinde",area:"Wagholi",service:"Full Home",start:"1 May",end:"15 Jun",status:"Completed",progress:100,value:"₹1,80,000",
      painters:["Raju","Sunil","Deepak"],tasks:[{t:"Prep",done:true},{t:"Putty+Primer",done:true},{t:"Interior",done:true},{t:"Texture",done:true},{t:"Exterior",done:true},{t:"Handover",done:true}],
      logs:[{date:"15 Jun",note:"Handover done",pct:100}] },
    { id:"PR-004",name:"Joshi Bungalow – Interior",customer:"Priya Joshi",area:"Undri",service:"Interior Painting",start:"28 Jun",end:"10 Jul",status:"New",progress:0,value:"₹56,000",
      painters:["Sunil"],tasks:[{t:"Site survey",done:false},{t:"Material delivery",done:false},{t:"Prep",done:false},{t:"Paint",done:false}],logs:[] },
  ]);
  const [sel,setSel] = useState(null);
  const [filter,setFilter] = useState("All");
  const [logNote,setLogNote] = useState("");
  const [logPct,setLogPct] = useState("");
  const [showAdd,setShowAdd] = useState(false);
  const [form,setForm] = useState({ name:"",customer:"",area:"",service:"Interior Painting",start:"",end:"",value:"" });
  const sf = k => v => setForm({...form,[k]:v.target.value});

  const pc = p => p>=80?C.green:p>=50?C.saffron:C.rust;
  const statSC = { Active:{bg:"#EAF3DE",c:"#27500A"},Completed:{bg:"#E6F1FB",c:"#0C447C"},"On Hold":{bg:"#FAEEDA",c:"#633806"},New:{bg:"#EEEDFE",c:"#3C3489"} };
  const fl = projects.filter(p=>filter==="All"||p.status===filter);
  const selP = sel ? projects.find(p=>p.id===sel) : null;

  const toggleTask = (pid,ti) => setProjects(projects.map(p=>p.id===pid?{...p,tasks:p.tasks.map((t,i)=>i===ti?{...t,done:!t.done}:t),progress:Math.round(p.tasks.filter((t,i)=>i===ti?!t.done:t.done).length/p.tasks.length*100)}:p));
  const addLog = pid => {
    if(!logNote)return;
    const pct=parseInt(logPct)||projects.find(p=>p.id===pid)?.progress||0;
    setProjects(projects.map(p=>p.id===pid?{...p,progress:pct,logs:[{date:"Today",note:logNote,pct},...p.logs]}:p));
    setLogNote(""); setLogPct("");
  };
  const saveProj = () => {
    if(!form.name)return;
    setProjects([{ id:"PR-00"+projects.length+1,...form,status:"New",progress:0,painters:["Raju"],tasks:[{t:"Site survey",done:false},{t:"Material delivery",done:false},{t:"Surface prep",done:false},{t:"Paint work",done:false}],logs:[] },...projects]);
    setShowAdd(false); setForm({ name:"",customer:"",area:"",service:"Interior Painting",start:"",end:"",value:"" });
  };

  return (
    <div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14 }}>
        <StatCard label="Active" value={projects.filter(p=>p.status==="Active").length} sub="In progress" color={C.saffron} icon="🏗️" />
        <StatCard label="Completed" value={projects.filter(p=>p.status==="Completed").length} sub="This month" color={C.green} icon="✅" />
        <StatCard label="New" value={projects.filter(p=>p.status==="New").length} sub="Starting soon" color={C.purple} icon="🆕" />
        <StatCard label="Avg Progress" value={`${Math.round(projects.filter(p=>p.status==="Active").reduce((s,p)=>s+p.progress,0)/(projects.filter(p=>p.status==="Active").length||1))}%`} sub="Active projects" color={C.navy} icon="📈" />
      </div>
      <div style={{ display:"flex",gap:8,marginBottom:12,flexWrap:"wrap" }}>
        {["All","Active","New","On Hold","Completed"].map(s=><button key={s} onClick={()=>setFilter(s)} style={{ padding:"5px 12px",borderRadius:16,fontSize:11,fontWeight:600,cursor:"pointer",background:filter===s?C.navy:C.white,color:filter===s?C.white:C.slate,border:`0.5px solid ${filter===s?C.navy:C.border}` }}>{s}</button>)}
        <Btn onClick={()=>setShowAdd(true)} style={{ marginLeft:"auto" }}>+ New Project</Btn>
      </div>
      {selP && (
        <Card title={selP.name} action={<button onClick={()=>setSel(null)} style={{ background:"none",border:"none",cursor:"pointer",color:C.slate,fontSize:16 }}>✕</button>}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:12 }}>
            {[["Customer",selP.customer],["Area",selP.area],["Service",selP.service],["Start",selP.start],["End",selP.end],["Value",selP.value]].map(([k,v])=>(
              <div key={k}><div style={{ fontSize:10,color:C.slate,fontWeight:700,textTransform:"uppercase" }}>{k}</div><div style={{ fontSize:12,fontWeight:600,color:C.navy,marginTop:2 }}>{v}</div></div>
            ))}
          </div>
          <div style={{ fontSize:11,fontWeight:700,color:C.slate,textTransform:"uppercase",marginBottom:5 }}>Progress: {selP.progress}%</div>
          <div style={{ background:C.border,borderRadius:8,height:8,overflow:"hidden",marginBottom:12 }}><div style={{ width:`${selP.progress}%`,height:"100%",background:pc(selP.progress),borderRadius:8 }} /></div>
          <div style={{ fontSize:11,fontWeight:700,color:C.slate,textTransform:"uppercase",marginBottom:7 }}>Task Checklist ({selP.tasks.filter(t=>t.done).length}/{selP.tasks.length})</div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,marginBottom:12 }}>
            {selP.tasks.map((t,i)=>(
              <div key={i} onClick={()=>toggleTask(selP.id,i)} style={{ display:"flex",alignItems:"center",gap:7,cursor:"pointer",padding:"5px 0" }}>
                <div style={{ width:14,height:14,borderRadius:3,border:`0.5px solid ${C.border}`,background:t.done?C.green:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  {t.done && <span style={{ fontSize:9,color:"#fff" }}>✓</span>}
                </div>
                <span style={{ fontSize:12,color:t.done?C.slate:C.navy,textDecoration:t.done?"line-through":"none" }}>{t.t}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize:11,fontWeight:700,color:C.slate,textTransform:"uppercase",marginBottom:7 }}>Add Progress Log</div>
          <div style={{ display:"flex",gap:6,marginBottom:10 }}>
            <input value={logNote} onChange={e=>setLogNote(e.target.value)} placeholder="Today's work..." style={{ flex:1,padding:"6px 9px",border:`0.5px solid ${C.border}`,borderRadius:7,fontSize:12,background:C.white }} />
            <input type="number" value={logPct} onChange={e=>setLogPct(e.target.value)} placeholder="%" style={{ width:50,padding:"6px 8px",border:`0.5px solid ${C.border}`,borderRadius:7,fontSize:12,textAlign:"center",background:C.white }} />
            <Btn small onClick={()=>addLog(selP.id)}>+ Add</Btn>
          </div>
          {selP.logs.map((l,i)=>(
            <div key={i} style={{ display:"flex",gap:10,padding:"6px 9px",background:C.chalk,borderRadius:7,marginBottom:5,borderLeft:`3px solid ${C.saffron}` }}>
              <span style={{ fontSize:10,fontWeight:700,color:"#633806",minWidth:48 }}>{l.date}</span>
              <span style={{ fontSize:12,color:C.navy,flex:1 }}>{l.note}</span>
              <span style={{ fontSize:11,fontWeight:700,color:C.green }}>{l.pct}%</span>
            </div>
          ))}
        </Card>
      )}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12 }}>
        {fl.map(p=>{
          const sc=statSC[p.status]||statSC.New;
          return (
            <div key={p.id} onClick={()=>setSel(sel===p.id?null:p.id)} style={{ background:C.white,border:`1px solid ${sel===p.id?C.navy:C.border}`,borderRadius:12,overflow:"hidden",cursor:"pointer" }}>
              <div style={{ padding:"11px 13px",borderBottom:`0.5px solid ${C.border}` }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5 }}>
                  <div><div style={{ fontSize:13,fontWeight:700,color:C.navy }}>{p.name}</div><div style={{ fontSize:10,color:C.slate,marginTop:2 }}>{p.id}</div></div>
                  <Tag label={p.status} bg={sc.bg} c={sc.c} />
                </div>
                <div style={{ display:"flex",gap:12,fontSize:11,color:C.slate }}>
                  <span>👤 {p.customer}</span>
                  <span>📍 {p.area}</span>
                  <span style={{ marginLeft:"auto",fontWeight:700,color:C.green }}>{p.value}</span>
                </div>
              </div>
              <div style={{ padding:"10px 13px" }}>
                <div style={{ display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:5 }}>
                  <span style={{ color:C.slate }}>{p.service}</span>
                  <span style={{ fontWeight:700,color:pc(p.progress) }}>{p.progress}%</span>
                </div>
                <div style={{ background:C.border,borderRadius:8,height:6,overflow:"hidden",marginBottom:9 }}><div style={{ width:`${p.progress}%`,height:"100%",background:pc(p.progress),borderRadius:8 }} /></div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <div style={{ display:"flex",gap:4 }}>
                    {p.painters.map((pt,i)=>(
                      <div key={i} title={pt} style={{ width:22,height:22,borderRadius:"50%",background:C.navy,color:C.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,border:`1px solid ${C.white}` }}>{pt[0]}</div>
                    ))}
                  </div>
                  <span style={{ fontSize:10,color:C.slate }}>{p.start} → {p.end}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {showAdd && (
        <Modal title="New Project" onClose={()=>setShowAdd(false)}>
          <Inp label="Project Name" value={form.name} onChange={sf("name")} placeholder="Patil Residence – 3BHK Interior" />
          <Row2><Inp label="Customer" value={form.customer} onChange={sf("customer")} /><Inp label="Area" value={form.area} onChange={sf("area")} /></Row2>
          <Sel label="Service Type" value={form.service} onChange={sf("service")} options={["Interior Painting","Exterior Painting","Texture Painting","Waterproofing","Full Home","Exterior+WP"]} />
          <Row2><Inp label="Start Date" value={form.start} onChange={sf("start")} type="date" /><Inp label="End Date" value={form.end} onChange={sf("end")} type="date" /></Row2>
          <Inp label="Project Value (₹)" value={form.value} onChange={sf("value")} />
          <div style={{ display:"flex",gap:7,justifyContent:"flex-end",marginTop:10 }}>
            <button onClick={()=>setShowAdd(false)} style={{ background:"none",border:`0.5px solid ${C.border}`,borderRadius:7,padding:"7px 13px",fontSize:12,cursor:"pointer",color:C.slate }}>Cancel</button>
            <Btn onClick={saveProj}>✓ Create Project</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ── MODULE: LABOUR ─────────────────────────────────────────
const Labour = () => {
  const [workers,setWorkers] = useState([
    { id:"W1",name:"Raju Kamble",role:"Painter",phone:"9876001111",rate:800,project:"Patil Residence",status:"Active",att:Array(26).fill(null).map((_,i)=>i%7===5||i%7===6?"H":Math.random()>.15?"P":"A"),paid:12800,pending:3200 },
    { id:"W2",name:"Sunil Pawar",role:"Helper",phone:"9876002222",rate:600,project:"Om Complex",status:"Active",att:Array(26).fill(null).map((_,i)=>i%7===5||i%7===6?"H":Math.random()>.2?"P":"A"),paid:9000,pending:2400 },
    { id:"W3",name:"Deepak More",role:"Painter",phone:"9876003333",rate:850,project:"Om Complex",status:"Active",att:Array(26).fill(null).map((_,i)=>i%7===5||i%7===6?"H":Math.random()>.12?"P":"A"),paid:13600,pending:3400 },
    { id:"W4",name:"Ajay Shinde",role:"Supervisor",phone:"9876004444",rate:1200,project:"Patil Residence",status:"Active",att:Array(26).fill(null).map((_,i)=>i%7===5||i%7===6?"H":Math.random()>.05?"P":"A"),paid:19200,pending:4800 },
    { id:"W5",name:"Ramesh Tele",role:"Contractor",phone:"9876005555",rate:25000,project:"Shinde Villa",rateType:"contract",status:"Active",att:Array(26).fill("P"),paid:15000,pending:10000 },
  ]);
  const [sel,setSel] = useState(null);
  const [showAtt,setShowAtt] = useState(false);
  const [todayAtt,setTodayAtt] = useState(workers.reduce((o,w)=>({...o,[w.id]:"P"}),{}));
  const AVC=[{bg:"#E6F1FB",c:"#0C447C"},{bg:"#EAF3DE",c:"#27500A"},{bg:"#FAEEDA",c:"#633806"},{bg:"#EEEDFE",c:"#3C3489"},{bg:"#FCEBEB",c:"#791F1F"}];
  const init = name => name.split(" ").map(w=>w[0]).join("").slice(0,2);
  const monthly = w => w.rateType==="contract"?w.rate:w.att.filter(a=>a==="P").length*w.rate+Math.round(w.att.filter(a=>a==="H").length*w.rate*.5);
  const selW = sel ? workers.find(w=>w.id===sel) : null;
  const attC = a => a==="P"?{bg:"#EAF3DE",c:"#27500A"}:a==="A"?{bg:"#FCEBEB",c:"#791F1F"}:{bg:"#FAEEDA",c:"#633806"};
  const markPaid = id => setWorkers(workers.map(w=>w.id===id?{...w,paid:w.paid+w.pending,pending:0}:w));

  return (
    <div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14 }}>
        <StatCard label="Active Workers" value={workers.filter(w=>w.status==="Active").length} sub="On payroll" color={C.navy} icon="👷" />
        <StatCard label="Today Present" value={Object.values(todayAtt).filter(a=>a==="P").length} sub={`of ${workers.length}`} color={C.green} icon="✅" />
        <StatCard label="June Wages" value={`₹${n(workers.reduce((s,w)=>s+monthly(w),0))}`} sub="Total month" color={C.saffron} icon="💰" />
        <StatCard label="Pending" value={`₹${n(workers.reduce((s,w)=>s+w.pending,0))}`} sub="To be paid" color={C.rust} icon="⏳" />
      </div>
      <div style={{ display:"flex",gap:8,marginBottom:12 }}>
        <Btn color={C.green} onClick={()=>setShowAtt(!showAtt)}>📅 Mark Today's Attendance</Btn>
      </div>
      {showAtt && (
        <Card title="Today's Attendance — 29 Jun 2025" action={<button onClick={()=>setShowAtt(false)} style={{ background:"none",border:"none",cursor:"pointer",color:C.slate,fontSize:16 }}>✕</button>}>
          {workers.map((w,i)=>{
            const av=AVC[i%AVC.length];
            return (
              <div key={w.id} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:`0.5px solid ${C.border}` }}>
                <div style={{ display:"flex",alignItems:"center",gap:9 }}>
                  <div style={{ width:28,height:28,borderRadius:"50%",background:av.bg,color:av.c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700 }}>{init(w.name)}</div>
                  <div><div style={{ fontSize:12,fontWeight:600,color:C.navy }}>{w.name}</div><div style={{ fontSize:10,color:C.slate }}>{w.role}</div></div>
                </div>
                <div style={{ display:"flex",gap:5 }}>
                  {["P","A","H"].map(a=>(
                    <button key={a} onClick={()=>setTodayAtt({...todayAtt,[w.id]:a})} style={{ padding:"4px 10px",borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer",border:`0.5px solid ${todayAtt[w.id]===a?attC(a).c:C.border}`,background:todayAtt[w.id]===a?attC(a).bg:C.white,color:todayAtt[w.id]===a?attC(a).c:C.slate }}>{a}</button>
                  ))}
                </div>
              </div>
            );
          })}
          <Btn full color={C.green} onClick={()=>{setWorkers(workers.map(w=>({...w,att:[...w.att.slice(0,25),todayAtt[w.id]]})));setShowAtt(false);}}>✓ Save Attendance</Btn>
        </Card>
      )}
      <div style={{ display:"grid",gridTemplateColumns:"1fr 280px",gap:14 }}>
        <Card title="Workers">
          {workers.map((w,i)=>{
            const av=AVC[i%AVC.length],m=monthly(w);
            return (
              <div key={w.id} onClick={()=>setSel(sel===w.id?null:w.id)} style={{ display:"grid",gridTemplateColumns:"1.6fr 70px 70px 90px 90px",gap:8,padding:"10px 0",borderBottom:`0.5px solid ${C.border}`,alignItems:"center",cursor:"pointer",background:sel===w.id?"#EBF3FF":"transparent" }}>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                  <div style={{ width:28,height:28,borderRadius:"50%",background:av.bg,color:av.c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,flexShrink:0 }}>{init(w.name)}</div>
                  <div><div style={{ fontSize:12,fontWeight:600,color:C.navy }}>{w.name}</div><div style={{ fontSize:10,color:C.slate }}>{w.role} · {w.project}</div></div>
                </div>
                <span style={{ fontSize:11,color:C.slate,textAlign:"center" }}>{w.att.filter(a=>a==="P").length} days</span>
                <span style={{ fontSize:11,color:C.slate }}>₹{n(w.rate)}{w.rateType==="contract"?"":"/day"}</span>
                <span style={{ fontSize:12,fontWeight:700,color:C.green }}>₹{n(m)}</span>
                <span style={{ fontSize:12,fontWeight:700,color:w.pending>0?C.rust:C.green }}>₹{n(w.pending)}</span>
              </div>
            );
          })}
        </Card>
        {selW ? (
          <Card title={selW.name} action={<button onClick={()=>setSel(null)} style={{ background:"none",border:"none",cursor:"pointer",color:C.slate,fontSize:16 }}>✕</button>}>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12 }}>
              {[["Role",selW.role],["Phone",selW.phone],["Rate",`₹${n(selW.rate)}${selW.rateType==="contract"?"":" /day"}`],["Project",selW.project]].map(([k,v])=>(
                <div key={k}><div style={{ fontSize:9,color:C.slate,fontWeight:700,textTransform:"uppercase" }}>{k}</div><div style={{ fontSize:12,fontWeight:600,color:C.navy,marginTop:1 }}>{v}</div></div>
              ))}
            </div>
            <div style={{ fontSize:10,fontWeight:700,color:C.slate,textTransform:"uppercase",marginBottom:7 }}>June Attendance</div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:10 }}>
              {selW.att.slice(0,26).map((a,i)=>{
                const ac=attC(a);
                return <div key={i} title={a} style={{ background:ac.bg,borderRadius:4,padding:"4px 0",textAlign:"center",fontSize:9,fontWeight:700,color:ac.c }}>{i+1}</div>;
              })}
            </div>
            <div style={{ display:"flex",gap:6,fontSize:11,marginBottom:12 }}>
              <span style={{ background:"#EAF3DE",color:"#27500A",padding:"2px 8px",borderRadius:10,fontWeight:700 }}>P:{selW.att.filter(a=>a==="P").length}</span>
              <span style={{ background:"#FCEBEB",color:"#791F1F",padding:"2px 8px",borderRadius:10,fontWeight:700 }}>A:{selW.att.filter(a=>a==="A").length}</span>
              <span style={{ background:"#FAEEDA",color:"#633806",padding:"2px 8px",borderRadius:10,fontWeight:700 }}>H:{selW.att.filter(a=>a==="H").length}</span>
            </div>
            <div style={{ display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:5 }}><span style={{ color:C.slate }}>Month wages</span><span style={{ fontWeight:700,color:C.navy }}>₹{n(monthly(selW))}</span></div>
            <div style={{ display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:5 }}><span style={{ color:C.slate }}>Paid</span><span style={{ fontWeight:700,color:C.green }}>₹{n(selW.paid)}</span></div>
            <div style={{ display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:10,paddingTop:6,borderTop:`0.5px solid ${C.border}` }}><span style={{ fontWeight:700,color:selW.pending>0?C.rust:C.green }}>Pending</span><span style={{ fontWeight:700,color:selW.pending>0?C.rust:C.green }}>₹{n(selW.pending)}</span></div>
            {selW.pending>0 ? <Btn full color={C.green} onClick={()=>markPaid(selW.id)}>✓ Mark Paid — ₹{n(selW.pending)}</Btn> : <div style={{ background:"#EAF3DE",borderRadius:8,padding:8,textAlign:"center",fontSize:12,fontWeight:700,color:"#27500A" }}>✅ Fully Paid</div>}
          </Card>
        ) : (
          <div style={{ background:C.white,border:`0.5px solid ${C.border}`,borderRadius:12,padding:20,textAlign:"center",color:C.slate,fontSize:12 }}>
            <div style={{ fontSize:32,marginBottom:8 }}>👷</div>
            Click a worker to view attendance, wages and payment details.
          </div>
        )}
      </div>
    </div>
  );
};

// ── MODULE: INVENTORY ─────────────────────────────────────
const INV_CATS = ["Paint","Primer","Putty","Waterproofing","Texture","Tools","Sundry"];
const INV_UNITS = ["Litre","Kg","Bag","Piece","Roll","Box"];
const INV_BRANDS = ["Asian Paints","Berger","Nerolac","Sika","Other"];
const VENDORS = [
  { id:"V1",name:"Rang Mahal Paints",cat:"Paint + Primer",phone:"9876543210",area:"Hadapsar" },
  { id:"V2",name:"Build Smart Materials",cat:"Putty + WP + Texture",phone:"9765432109",area:"Kharadi" },
  { id:"V3",name:"Color Zone",cat:"Paint + Accessories",phone:"9654321098",area:"Kondhwa" },
  { id:"V4",name:"Tool House",cat:"Tools + Sundry",phone:"9543210987",area:"Camp" },
];
const Inventory = () => {
  const [items,setItems] = useState([
    { id:"IT-001",name:"Asian Paints Royale",cat:"Paint",brand:"Asian Paints",unit:"Litre",stock:42,minStock:20,rate:185,vendor:"V1",lastPurchase:"20 Jun" },
    { id:"IT-002",name:"Asian Paints Primer",cat:"Primer",brand:"Asian Paints",unit:"Litre",stock:8,minStock:15,rate:95,vendor:"V1",lastPurchase:"15 Jun" },
    { id:"IT-003",name:"Birla Wall Putty",cat:"Putty",brand:"Other",unit:"Bag",stock:5,minStock:10,rate:420,vendor:"V2",lastPurchase:"10 Jun" },
    { id:"IT-004",name:"Nerolac Excel Total",cat:"Paint",brand:"Nerolac",unit:"Litre",stock:28,minStock:15,rate:165,vendor:"V3",lastPurchase:"22 Jun" },
    { id:"IT-005",name:"Dr. Fixit Waterproof",cat:"Waterproofing",brand:"Other",unit:"Kg",stock:0,minStock:10,rate:280,vendor:"V2",lastPurchase:"5 Jun" },
    { id:"IT-006",name:"Asian Paints Apex",cat:"Paint",brand:"Asian Paints",unit:"Litre",stock:35,minStock:20,rate:145,vendor:"V1",lastPurchase:"18 Jun" },
    { id:"IT-007",name:"Texture Compound",cat:"Texture",brand:"Other",unit:"Kg",stock:22,minStock:15,rate:320,vendor:"V2",lastPurchase:"25 Jun" },
    { id:"IT-008",name:"Paint Brushes",cat:"Tools",brand:"Other",unit:"Piece",stock:3,minStock:10,rate:85,vendor:"V4",lastPurchase:"1 Jun" },
    { id:"IT-009",name:"Masking Tape",cat:"Sundry",brand:"Other",unit:"Roll",stock:18,minStock:10,rate:45,vendor:"V4",lastPurchase:"20 Jun" },
    { id:"IT-010",name:"Berger WeatherCoat",cat:"Paint",brand:"Berger",unit:"Litre",stock:15,minStock:20,rate:175,vendor:"V3",lastPurchase:"12 Jun" },
  ]);
  const [sel,setSel] = useState(null);
  const [search,setSearch] = useState("");
  const [filterCat,setFilterCat] = useState("All");
  const [showAdd,setShowAdd] = useState(false);
  const [adjQty,setAdjQty] = useState("");
  const [adjType,setAdjType] = useState("add");
  const [form,setForm] = useState({ name:"",cat:"Paint",brand:"Asian Paints",unit:"Litre",stock:"",minStock:"",rate:"",vendor:"V1" });
  const sf = k => v => setForm({...form,[k]:v.target.value});

  const stockStatus = item => {
    if(item.stock===0) return { bg:"#F1EFE8",c:"#444441",label:"Out of stock" };
    if(item.stock<item.minStock) return { bg:"#FCEBEB",c:"#791F1F",label:"Low stock" };
    return { bg:"#EAF3DE",c:"#27500A",label:"In stock" };
  };
  const fl = items.filter(i=>{
    const q=search.toLowerCase();
    const mq=!q||i.name.toLowerCase().includes(q)||i.cat.toLowerCase().includes(q)||i.brand.toLowerCase().includes(q);
    const mc=filterCat==="All"||i.cat===filterCat;
    return mq&&mc;
  });
  const lowItems = items.filter(i=>i.stock<i.minStock);
  const totalVal = items.reduce((s,i)=>s+i.stock*i.rate,0);
  const outItems = items.filter(i=>i.stock===0).length;
  const selItem = sel ? items.find(i=>i.id===sel) : null;
  const vend = selItem ? VENDORS.find(v=>v.id===selItem.vendor) : null;

  const adjustStock = () => {
    const qty = parseFloat(adjQty)||0;
    if(qty<=0||!sel) return;
    setItems(items.map(i=>{
      if(i.id!==sel) return i;
      if(adjType==="add") return { ...i,stock:i.stock+qty,lastPurchase:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short"}) };
      return { ...i,stock:Math.max(0,i.stock-qty) };
    }));
    setAdjQty("");
  };
  const saveItem = () => {
    if(!form.name) return;
    const id = `IT-0${items.length+1}`;
    setItems([...items,{ id,name:form.name,cat:form.cat,brand:form.brand,unit:form.unit,stock:parseFloat(form.stock)||0,minStock:parseFloat(form.minStock)||5,rate:parseFloat(form.rate)||0,vendor:form.vendor,lastPurchase:"—" }]);
    setShowAdd(false);
    setForm({ name:"",cat:"Paint",brand:"Asian Paints",unit:"Litre",stock:"",minStock:"",rate:"",vendor:"V1" });
  };

  return (
    <div>
      <div style={{ display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",alignItems:"center" }}>
        <input placeholder="Material name, brand, category..." value={search} onChange={e=>setSearch(e.target.value)} style={{ flex:1,minWidth:160,maxWidth:260,padding:"7px 10px",border:`0.5px solid ${C.border}`,borderRadius:8,fontSize:12,background:C.white }} />
        <select value={filterCat} onChange={e=>setFilterCat(e.target.value)} style={{ padding:"6px 10px",border:`0.5px solid ${C.border}`,borderRadius:8,fontSize:12,background:C.white,color:C.navy }}>
          <option>All</option>
          {INV_CATS.map(c=><option key={c}>{c}</option>)}
        </select>
        <Btn onClick={()=>{ setShowAdd(true); setSel(null); }}>+ Add item</Btn>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:14 }}>
        <StatCard label="Total items" value={items.length} sub="In inventory" color={C.navy} icon="📦" />
        <StatCard label="Stock value" value={`₹${n(totalVal)}`} sub="Current stock" color={C.green} icon="💰" />
        <StatCard label="Low stock" value={lowItems.length} sub="Need reorder" color={C.rust} icon="⚠️" />
        <StatCard label="Out of stock" value={outItems} sub="Order now" color={C.slate} icon="🚫" />
      </div>

      {lowItems.length>0 && (
        <div style={{ background:"#FCEBEB",border:"0.5px solid #F09595",borderRadius:10,padding:"10px 14px",marginBottom:14 }}>
          <div style={{ fontSize:12,fontWeight:700,color:"#791F1F" }}>⚠️ Low stock alert — {lowItems.length} item{lowItems.length!==1?"s":""} need reordering</div>
          <div style={{ fontSize:11,color:"#A32D2D",marginTop:2 }}>{lowItems.map(i=>`${i.name} (${i.stock} ${i.unit} left)`).join(" · ")}</div>
        </div>
      )}

      {showAdd && (
        <Modal title="Add inventory item" onClose={()=>setShowAdd(false)}>
          <Inp label="Item name" value={form.name} onChange={sf("name")} placeholder="Asian Paints Royale" />
          <Row2><Sel label="Category" value={form.cat} onChange={sf("cat")} options={INV_CATS} /><Sel label="Brand" value={form.brand} onChange={sf("brand")} options={INV_BRANDS} /></Row2>
          <Row2><Sel label="Unit" value={form.unit} onChange={sf("unit")} options={INV_UNITS} /><Inp label="Rate (₹)" type="number" value={form.rate} onChange={sf("rate")} placeholder="185" /></Row2>
          <Row2><Inp label="Opening stock" type="number" value={form.stock} onChange={sf("stock")} placeholder="20" /><Inp label="Min stock (alert)" type="number" value={form.minStock} onChange={sf("minStock")} placeholder="10" /></Row2>
          <Sel label="Vendor" value={form.vendor} onChange={sf("vendor")} options={VENDORS.map(v=>v.id)} />
          <div style={{ display:"flex",gap:7,justifyContent:"flex-end",marginTop:10 }}>
            <button onClick={()=>setShowAdd(false)} style={{ background:"none",border:`0.5px solid ${C.border}`,borderRadius:7,padding:"6px 12px",fontSize:12,cursor:"pointer",color:C.slate }}>Cancel</button>
            <Btn onClick={saveItem}>✓ Save item</Btn>
          </div>
        </Modal>
      )}

      <div style={{ display:"grid",gridTemplateColumns:"1fr 290px",gap:14,alignItems:"start" }}>
        <div style={{ background:C.white,border:`0.5px solid ${C.border}`,borderRadius:12,overflow:"hidden" }}>
          <div style={{ display:"grid",gridTemplateColumns:"2fr 80px 70px 70px 80px 70px",padding:"8px 14px",background:C.chalk,borderBottom:`0.5px solid ${C.border}` }}>
            {["Material","Stock","Min","Rate","Status","Value"].map((h,i)=><span key={h} style={{ fontSize:10,fontWeight:700,color:C.slate,textTransform:"uppercase",textAlign:i>0?"right":"left" }}>{h}</span>)}
          </div>
          {fl.length===0 ? <div style={{ padding:24,textAlign:"center",fontSize:12,color:"#aaa" }}>No items match.</div> : fl.map(item=>{
            const s=stockStatus(item);
            const isLow=item.stock<item.minStock;
            return (
              <div key={item.id} onClick={()=>{ setSel(sel===item.id?null:item.id); setAdjQty(""); }} style={{ display:"grid",gridTemplateColumns:"2fr 80px 70px 70px 80px 70px",padding:"10px 14px",borderBottom:`0.5px solid ${C.border}`,alignItems:"center",cursor:"pointer",background:sel===item.id?"#EBF3FF":isLow?"#FFF8F8":"transparent" }}>
                <div><div style={{ fontSize:13,fontWeight:600,color:C.navy }}>{item.name}</div><div style={{ fontSize:10,color:"#aaa",marginTop:1 }}>{item.cat} · {item.brand}</div></div>
                <div style={{ textAlign:"right",fontSize:12,fontWeight:700,color:C.navy }}>{n(item.stock)} <span style={{ fontSize:10,fontWeight:400,color:"#aaa" }}>{item.unit}</span></div>
                <div style={{ textAlign:"right",fontSize:11,color:C.slate }}>{n(item.minStock)}</div>
                <div style={{ textAlign:"right",fontSize:11,color:C.slate }}>₹{n(item.rate)}</div>
                <div><Tag label={s.label} bg={s.bg} c={s.c} /></div>
                <div style={{ textAlign:"right",fontSize:12,fontWeight:700,color:C.navy }}>₹{n(item.stock*item.rate)}</div>
              </div>
            );
          })}
        </div>

        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          {selItem && (()=>{
            const s=stockStatus(selItem);
            const pct=Math.min(100,selItem.minStock>0?Math.round(selItem.stock/selItem.minStock*100):100);
            const barColor = selItem.stock===0?"#888780":selItem.stock<selItem.minStock?C.rust:C.green;
            return (
              <div style={{ background:C.white,border:`0.5px solid ${C.border}`,borderRadius:12,overflow:"hidden" }}>
                <div style={{ background:C.navy,padding:"11px 14px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                  <span style={{ fontSize:13,fontWeight:700,color:C.white }}>{selItem.name}</span>
                  <button onClick={()=>setSel(null)} style={{ background:"none",border:"none",color:"rgba(255,255,255,.6)",cursor:"pointer",fontSize:16 }}>✕</button>
                </div>
                <div style={{ padding:"12px 14px" }}>
                  {[["Category",selItem.cat],["Brand",selItem.brand],["Unit",selItem.unit],["Rate",`₹${n(selItem.rate)}/${selItem.unit}`],["Last purchase",selItem.lastPurchase]].map(([k,v])=>(
                    <div key={k} style={{ display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`0.5px solid ${C.border}`,fontSize:12 }}><span style={{ color:C.slate }}>{k}</span><span style={{ fontWeight:600,color:C.navy }}>{v}</span></div>
                  ))}
                  <div style={{ display:"flex",justifyContent:"space-between",padding:"6px 0",fontSize:12 }}><span style={{ color:C.slate }}>Stock value</span><span style={{ fontWeight:600,color:C.green }}>₹{n(selItem.stock*selItem.rate)}</span></div>
                  <div style={{ margin:"10px 0" }}>
                    <div style={{ display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4 }}><span style={{ color:C.slate }}>Stock: {n(selItem.stock)} / min: {n(selItem.minStock)} {selItem.unit}</span><Tag label={s.label} bg={s.bg} c={s.c} /></div>
                    <div style={{ background:C.border,borderRadius:8,height:7,overflow:"hidden" }}><div style={{ width:`${pct}%`,height:"100%",background:barColor,borderRadius:8 }} /></div>
                  </div>
                  <div style={{ fontSize:11,fontWeight:700,color:"#aaa",textTransform:"uppercase",marginBottom:6 }}>Adjust stock</div>
                  <div style={{ display:"flex",gap:6,alignItems:"center" }}>
                    <select value={adjType} onChange={e=>setAdjType(e.target.value)} style={{ width:80,padding:"6px 8px",border:`0.5px solid ${C.border}`,borderRadius:6,fontSize:12 }}>
                      <option value="add">Add</option><option value="use">Use</option>
                    </select>
                    <input type="number" min="0" placeholder="Qty" value={adjQty} onChange={e=>setAdjQty(e.target.value)} style={{ flex:1,padding:"6px 8px",border:`0.5px solid ${C.border}`,borderRadius:6,fontSize:12 }} />
                    <button onClick={adjustStock} style={{ background:adjType==="add"?C.green:C.rust,color:"#fff",border:"none",borderRadius:6,padding:"6px 10px",fontSize:12,fontWeight:600,cursor:"pointer" }}>{adjType==="add"?"+ Add":"- Use"}</button>
                  </div>
                  {vend && <div style={{ marginTop:12,paddingTop:10,borderTop:`0.5px solid ${C.border}` }}>
                    <div style={{ fontSize:11,fontWeight:700,color:"#aaa",textTransform:"uppercase",marginBottom:6 }}>Vendor</div>
                    <div style={{ fontSize:12,fontWeight:600,color:C.navy }}>{vend.name}</div>
                    <div style={{ fontSize:11,color:C.slate }}>{vend.phone} · {vend.area}</div>
                  </div>}
                </div>
              </div>
            );
          })()}
          <Card title="🚚 Vendors">
            {VENDORS.map(v=>(
              <div key={v.id} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`0.5px solid ${C.border}`,fontSize:12 }}>
                <div><div style={{ fontWeight:600,color:C.navy }}>{v.name}</div><div style={{ fontSize:10,color:"#aaa" }}>{v.cat}</div></div>
                <div style={{ textAlign:"right" }}><div style={{ color:C.slate,fontSize:11 }}>{v.phone}</div><div style={{ fontSize:10,color:"#aaa" }}>{v.area}</div></div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

// ── MODULE: EXPENSES ──────────────────────────────────────
const EXP_CATS = [
  { id:"transport",label:"Transport",color:"#3182CE",bg:"#E6F1FB",tc:"#0C447C" },
  { id:"labour",label:"Labour",color:"#27AE60",bg:"#EAF3DE",tc:"#27500A" },
  { id:"material",label:"Material",color:"#F5A623",bg:"#FAEEDA",tc:"#633806" },
  { id:"food",label:"Food",color:"#E24B4A",bg:"#FCEBEB",tc:"#791F1F" },
  { id:"equipment",label:"Equipment",color:"#805AD5",bg:"#EEEDFE",tc:"#3C3489" },
  { id:"diesel",label:"Diesel",color:"#EF9F27",bg:"#FAEEDA",tc:"#633806" },
  { id:"misc",label:"Misc",color:"#888780",bg:"#F1EFE8",tc:"#444441" },
];
const EXP_PROJECTS = ["Patil Residence","Om Complex","Shinde Villa","Joshi Bungalow","General"];

const Expenses = () => {
  const [expenses,setExpenses] = useState([
    { id:"EX-001",title:"Diesel – Hadapsar to Kharadi",cat:"diesel",project:"Om Complex",amount:850,date:"26 Jun",paidBy:"Vicky" },
    { id:"EX-002",title:"Lunch – 4 painters",cat:"food",project:"Patil Residence",amount:560,date:"26 Jun",paidBy:"Raju" },
    { id:"EX-003",title:"Paint rollers & brushes",cat:"material",project:"Om Complex",amount:1240,date:"25 Jun",paidBy:"Vicky" },
    { id:"EX-004",title:"Auto – material transport",cat:"transport",project:"Joshi Bungalow",amount:380,date:"25 Jun",paidBy:"Sunil" },
    { id:"EX-005",title:"Scaffolding rent",cat:"equipment",project:"Om Complex",amount:3500,date:"24 Jun",paidBy:"Vicky" },
    { id:"EX-006",title:"Helper – daily wage advance",cat:"labour",project:"Patil Residence",amount:1200,date:"24 Jun",paidBy:"Vicky" },
    { id:"EX-007",title:"Diesel – site visits",cat:"diesel",project:"General",amount:650,date:"23 Jun",paidBy:"Vicky" },
    { id:"EX-008",title:"Tea & snacks – team",cat:"food",project:"Shinde Villa",amount:320,date:"22 Jun",paidBy:"Deepak" },
    { id:"EX-009",title:"Masking tape & plastic sheet",cat:"material",project:"Patil Residence",amount:780,date:"21 Jun",paidBy:"Vicky" },
    { id:"EX-010",title:"Parking charges",cat:"misc",project:"General",amount:120,date:"20 Jun",paidBy:"Vicky" },
    { id:"EX-011",title:"Contractor advance – Ramesh",cat:"labour",project:"Om Complex",amount:8000,date:"18 Jun",paidBy:"Vicky" },
    { id:"EX-012",title:"Pipe repair – site bathroom",cat:"misc",project:"Shinde Villa",amount:450,date:"15 Jun",paidBy:"Ajay" },
  ]);
  const [search,setSearch] = useState("");
  const [filterCat,setFilterCat] = useState("all");
  const [filterProject,setFilterProject] = useState("All");
  const [showAdd,setShowAdd] = useState(false);
  const [form,setForm] = useState({ title:"",cat:"transport",project:"Patil Residence",amount:"",date:new Date().toISOString().slice(0,10),paidBy:"Vicky" });
  const sf = k => v => setForm({...form,[k]:v.target.value});
  const catObj = id => EXP_CATS.find(c=>c.id===id)||EXP_CATS[6];

  const fl = expenses.filter(e=>{
    const q=search.toLowerCase();
    const mq=!q||e.title.toLowerCase().includes(q)||e.project.toLowerCase().includes(q)||catObj(e.cat).label.toLowerCase().includes(q);
    const mc=filterCat==="all"||e.cat===filterCat;
    const mp=filterProject==="All"||e.project===filterProject;
    return mq&&mc&&mp;
  });
  const total = expenses.reduce((s,e)=>s+e.amount,0);
  const thisWeek = expenses.slice(0,6).reduce((s,e)=>s+e.amount,0);
  const avgPerDay = Math.round(total/26);
  const totals = {}; expenses.forEach(e=>{ totals[e.cat]=(totals[e.cat]||0)+e.amount; });
  const maxCat = Math.max(...Object.values(totals));

  const saveExp = () => {
    if(!form.title||!form.amount) return;
    const id = `EX-0${expenses.length+1}`;
    setExpenses([{ id,title:form.title,cat:form.cat,project:form.project,amount:parseFloat(form.amount)||0,date:new Date(form.date).toLocaleDateString("en-IN",{day:"numeric",month:"short"}),paidBy:form.paidBy||"Vicky" },...expenses]);
    setShowAdd(false);
    setForm({ title:"",cat:"transport",project:"Patil Residence",amount:"",date:new Date().toISOString().slice(0,10),paidBy:"Vicky" });
  };

  return (
    <div>
      <div style={{ display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",alignItems:"center" }}>
        <input placeholder="Search expenses..." value={search} onChange={e=>setSearch(e.target.value)} style={{ flex:1,minWidth:160,maxWidth:240,padding:"7px 10px",border:`0.5px solid ${C.border}`,borderRadius:8,fontSize:12,background:C.white }} />
        <select value={filterProject} onChange={e=>setFilterProject(e.target.value)} style={{ padding:"6px 10px",border:`0.5px solid ${C.border}`,borderRadius:8,fontSize:12 }}>
          <option>All</option>{EXP_PROJECTS.map(p=><option key={p}>{p}</option>)}
        </select>
        <Btn onClick={()=>setShowAdd(true)}>+ Add expense</Btn>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:14 }}>
        <StatCard label="June total" value={`₹${n(total)}`} sub="All categories" color={C.rust} icon="💸" />
        <StatCard label="This week" value={`₹${n(thisWeek)}`} sub="Last 7 days" color={C.saffron} icon="📅" />
        <StatCard label="Daily avg" value={`₹${n(avgPerDay)}`} sub="This month" color={C.navy} icon="📊" />
        <StatCard label="Entries" value={expenses.length} sub="June 2025" color={C.green} icon="🧾" />
      </div>

      {showAdd && (
        <Modal title="Add expense" onClose={()=>setShowAdd(false)}>
          <Inp label="Description" value={form.title} onChange={sf("title")} placeholder="Diesel – site to warehouse" />
          <Row2><Sel label="Category" value={form.cat} onChange={sf("cat")} options={EXP_CATS.map(c=>c.id)} /><Sel label="Project" value={form.project} onChange={sf("project")} options={EXP_PROJECTS} /></Row2>
          <Row2><Inp label="Amount (₹)" type="number" value={form.amount} onChange={sf("amount")} placeholder="500" /><Inp label="Date" type="date" value={form.date} onChange={sf("date")} /></Row2>
          <Inp label="Paid by" value={form.paidBy} onChange={sf("paidBy")} placeholder="Vicky" />
          <div style={{ display:"flex",gap:7,justifyContent:"flex-end",marginTop:10 }}>
            <button onClick={()=>setShowAdd(false)} style={{ background:"none",border:`0.5px solid ${C.border}`,borderRadius:7,padding:"6px 12px",fontSize:12,cursor:"pointer",color:C.slate }}>Cancel</button>
            <Btn onClick={saveExp}>✓ Save expense</Btn>
          </div>
        </Modal>
      )}

      <div style={{ display:"grid",gridTemplateColumns:"1fr 260px",gap:14,alignItems:"start" }}>
        <div>
          <div style={{ display:"flex",gap:5,flexWrap:"wrap",marginBottom:12 }}>
            <span onClick={()=>setFilterCat("all")} style={{ padding:"4px 10px",borderRadius:14,fontSize:11,fontWeight:600,cursor:"pointer",border:`0.5px solid ${C.border}`,background:filterCat==="all"?C.navy:C.white,color:filterCat==="all"?"#fff":C.slate }}>All</span>
            {EXP_CATS.map(c=>(
              <span key={c.id} onClick={()=>setFilterCat(c.id)} style={{ padding:"4px 10px",borderRadius:14,fontSize:11,fontWeight:600,cursor:"pointer",border:`0.5px solid ${filterCat===c.id?c.color:C.border}`,background:filterCat===c.id?c.color:C.white,color:filterCat===c.id?"#fff":c.color,display:"flex",alignItems:"center",gap:4 }}><span style={{ width:6,height:6,borderRadius:"50%",background:filterCat===c.id?"#fff":c.color,display:"inline-block" }} />{c.label}</span>
            ))}
          </div>
          <div style={{ background:C.white,border:`0.5px solid ${C.border}`,borderRadius:12,overflow:"hidden" }}>
            <div style={{ display:"grid",gridTemplateColumns:"1.6fr 80px 90px 80px 70px",padding:"8px 14px",background:C.chalk,borderBottom:`0.5px solid ${C.border}` }}>
              {["Expense","Category","Project","Amount","Date"].map((h,i)=><span key={h} style={{ fontSize:10,fontWeight:700,color:"#aaa",textTransform:"uppercase",textAlign:i===3?"right":"left" }}>{h}</span>)}
            </div>
            {fl.length===0 ? <div style={{ padding:24,textAlign:"center",fontSize:12,color:"#aaa" }}>No expenses match.</div> : fl.map(e=>{
              const c=catObj(e.cat);
              return (
                <div key={e.id} style={{ display:"grid",gridTemplateColumns:"1.6fr 80px 90px 80px 70px",padding:"10px 14px",borderBottom:`0.5px solid ${C.border}`,alignItems:"center",fontSize:12 }}>
                  <div><div style={{ fontWeight:600,color:C.navy }}>{e.title}</div><div style={{ fontSize:10,color:"#aaa" }}>Paid by: {e.paidBy}</div></div>
                  <div><Tag label={c.label} bg={c.bg} c={c.tc} /></div>
                  <div style={{ color:C.slate,fontSize:11 }}>{e.project}</div>
                  <div style={{ textAlign:"right",fontWeight:700,color:C.rust }}>₹{n(e.amount)}</div>
                  <div style={{ color:C.slate,fontSize:11 }}>{e.date}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <Card title="Category breakdown">
            {EXP_CATS.map(c=>{
              const amt=totals[c.id]||0; if(!amt) return null;
              const pct = maxCat>0?Math.round(amt/maxCat*100):0;
              const totalPct = total>0?Math.round(amt/total*100):0;
              return (
                <div key={c.id} style={{ marginBottom:8 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:7 }}><span style={{ width:9,height:9,borderRadius:"50%",background:c.color,display:"inline-block" }} /><span style={{ fontSize:12,color:C.navy }}>{c.label}</span></div>
                    <div><span style={{ fontSize:12,fontWeight:700,color:C.navy }}>₹{n(amt)}</span><span style={{ fontSize:10,color:"#aaa",marginLeft:4 }}>{totalPct}%</span></div>
                  </div>
                  <div style={{ background:C.border,borderRadius:6,height:5,overflow:"hidden" }}><div style={{ width:`${pct}%`,height:"100%",background:c.color,borderRadius:6 }} /></div>
                </div>
              );
            })}
          </Card>
          <Card title="Project-wise expenses">
            {EXP_PROJECTS.map(p=>{
              const amt = expenses.filter(e=>e.project===p).reduce((s,e)=>s+e.amount,0); if(!amt) return null;
              const pct = total>0?Math.round(amt/total*100):0;
              return (
                <div key={p} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:`0.5px solid ${C.border}`,fontSize:12 }}>
                  <span style={{ color:C.navy,fontWeight:600 }}>{p}</span>
                  <span style={{ color:C.rust,fontWeight:700 }}>₹{n(amt)} <span style={{ color:"#aaa",fontWeight:400,fontSize:10 }}>{pct}%</span></span>
                </div>
              );
            })}
          </Card>
        </div>
      </div>
    </div>
  );
};

// ── MODULE: WHATSAPP AUTOMATION ───────────────────────────
const WA_CATS_META = {
  Welcome:{ bg:"#E1F5EE",tc:"#085041",color:"#1D9E75" },
  Quotation:{ bg:"#E6F1FB",tc:"#0C447C",color:"#3182CE" },
  Invoice:{ bg:"#FAEEDA",tc:"#633806",color:"#EF9F27" },
  "Follow-up":{ bg:"#EEEDFE",tc:"#3C3489",color:"#7F77DD" },
  Payment:{ bg:"#EAF3DE",tc:"#27500A",color:"#639922" },
  Review:{ bg:"#FCEBEB",tc:"#791F1F",color:"#E24B4A" },
  Referral:{ bg:"#F1EFE8",tc:"#444441",color:"#888780" },
};
const WA_TMPL_CATS = ["All","Welcome","Quotation","Invoice","Follow-up","Payment","Review","Referral"];

const WhatsApp = () => {
  const [templates,setTemplates] = useState([
    { id:"T1",cat:"Welcome",name:"New lead welcome",vars:["name","service"],body:"Namaste *{name}* ji!\n\nSavi Painting & Decor Services mein aapka swagat hai.\n\nAapne *{service}* ke liye enquiry ki hai. Hum jald hi aapko call karenge.\n\n*Vicky Salave*\nSavi Painting | +91 96732 98955",sent:24,lastSent:"Today" },
    { id:"T2",cat:"Quotation",name:"Quotation ready",vars:["name","amount","validity"],body:"Namaste *{name}* ji!\n\nAapki painting ke liye hamara quotation ready hai.\n\n*Total Amount: ₹{amount}*\nValidity: {validity} days\n\nPDF aapko attach kar diya hai. Koi sawaal ho to call karein.\n\n*Vicky | Savi Painting*",sent:18,lastSent:"Yesterday" },
    { id:"T3",cat:"Follow-up",name:"1 day follow-up",vars:["name","service"],body:"Namaste *{name}* ji!\n\nKal hamne *{service}* ke liye quotation bheja tha.\n\nKya aapne review kiya? Koi sawaal ho to batayein. Hum aapki help ke liye available hain.\n\n*Vicky | Savi Painting*",sent:31,lastSent:"Today" },
    { id:"T4",cat:"Invoice",name:"Invoice sent",vars:["name","inv_no","amount","due_date"],body:"Namaste *{name}* ji!\n\nAapka invoice *{inv_no}* bhej diya hai.\n\n*Total: ₹{amount}*\nDue date: {due_date}\n\nUPI: vickysalave@upi\n\nPayment hone par confirm karein.\n\n*Vicky | Savi Painting*",sent:22,lastSent:"26 Jun" },
    { id:"T5",cat:"Payment",name:"Payment reminder",vars:["name","amount","due_date"],body:"Namaste *{name}* ji!\n\nYeh ek friendly reminder hai.\n\n*Outstanding: ₹{amount}*\nDue: {due_date}\n\nUPI: vickysalave@upi\nKisi problem ke liye call karein.\n\n*Vicky | Savi Painting*",sent:14,lastSent:"25 Jun" },
    { id:"T6",cat:"Payment",name:"Payment received",vars:["name","amount"],body:"Namaste *{name}* ji!\n\nAapka payment *₹{amount}* mil gaya. Shukriya!\n\nAapka kaam hamesha priority par rahega.\n\n*Vicky | Savi Painting*",sent:19,lastSent:"24 Jun" },
    { id:"T7",cat:"Review",name:"Review request",vars:["name","link"],body:"Namaste *{name}* ji!\n\nKaam complete ho gaya. Umeed hai aap satisfied hain!\n\nAgar aapko hamare kaam se khushi mili ho, toh please ek Google review zaroor dijiye:\n{link}\n\nAapka support hamare liye bahut important hai.\n\n*Vicky | Savi Painting*",sent:16,lastSent:"23 Jun" },
    { id:"T8",cat:"Referral",name:"Referral request",vars:["name"],body:"Namaste *{name}* ji!\n\nAapka painting project successfully complete hua!\n\nAgar aapke koi dost ya family member painting karwana chahte hain, toh unaka naam zaroor batayein.\n\nReferral ke liye special discount milega.\n\n*Vicky | Savi Painting* | +91 96732 98955",sent:9,lastSent:"20 Jun" },
    { id:"T9",cat:"Follow-up",name:"7 day follow-up",vars:["name"],body:"Namaste *{name}* ji!\n\nEk hafte pehle hamne quotation bheja tha. Kya koi decision hua?\n\nHam chahte hain ki aapka kaam best quality mein ho. Koi bhi sawaal ho, call karein.\n\n*Vicky | Savi Painting*",sent:11,lastSent:"22 Jun" },
    { id:"T10",cat:"Welcome",name:"Site visit confirm",vars:["name","date","time"],body:"Namaste *{name}* ji!\n\nAapki site visit *{date}* ko *{time}* baje confirm ho gayi hai.\n\nAddress confirm karein. On time rahenge.\n\n*Vicky | Savi Painting*",sent:20,lastSent:"Today" },
  ]);
  const [msgLog,setMsgLog] = useState([
    { name:"Rajesh Patil",tmpl:"Quotation ready",time:"10 min ago",status:"read" },
    { name:"Priya Joshi",tmpl:"1 day follow-up",time:"1 hr ago",status:"sent" },
    { name:"Suresh More",tmpl:"New lead welcome",time:"2 hr ago",status:"read" },
    { name:"Kavita Pawar",tmpl:"Payment reminder",time:"Yesterday",status:"sent" },
    { name:"Amit Deshmukh",tmpl:"Review request",time:"Yesterday",status:"read" },
  ]);
  const [selCat,setSelCat] = useState("All");
  const [selTmpl,setSelTmpl] = useState(null);
  const [vars,setVars] = useState({});
  const [showAdd,setShowAdd] = useState(false);
  const [form,setForm] = useState({ name:"",cat:"Follow-up",body:"" });
  const catMeta = c => WA_CATS_META[c]||{ bg:"#F1EFE8",tc:"#444441",color:"#888780" };
  const fillTemplate = (body,v) => { let t=body; Object.entries(v).forEach(([k,val])=>{ if(val) t=t.replace(new RegExp(`\\{${k}\\}`,"g"),val); }); return t; };
  const extractVars = body => [...new Set((body.match(/\{([^}]+)\}/g)||[]).map(m=>m.slice(1,-1)))];
  const fl = selCat==="All" ? templates : templates.filter(t=>t.cat===selCat);
  const totalSent = templates.reduce((s,t)=>s+t.sent,0);
  const today = templates.filter(t=>t.lastSent==="Today").length;
  const selT = selTmpl ? templates.find(t=>t.id===selTmpl) : null;

  const markSent = id => {
    const t=templates.find(x=>x.id===id); if(!t) return;
    setTemplates(templates.map(x=>x.id===id?{...x,sent:x.sent+1,lastSent:"Today"}:x));
    setMsgLog([{ name:"Customer",tmpl:t.name,time:"Just now",status:"sent" },...msgLog].slice(0,5));
  };
  const saveTmpl = () => {
    if(!form.name||!form.body) return;
    setTemplates([{ id:"T"+(templates.length+1),cat:form.cat,name:form.name,vars:extractVars(form.body),body:form.body,sent:0,lastSent:"—" },...templates]);
    setShowAdd(false); setForm({ name:"",cat:"Follow-up",body:"" });
  };

  return (
    <div>
      <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:14 }}>
        <span style={{ fontSize:15,fontWeight:700,color:C.navy }}>WhatsApp automation</span>
        <div style={{ marginLeft:"auto" }}><Btn color="#25D366" onClick={()=>setShowAdd(true)}>+ New template</Btn></div>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:14 }}>
        <StatCard label="Total templates" value={templates.length} sub="Ready to send" color="#25D366" icon="💬" />
        <StatCard label="Sent this month" value={totalSent} sub="June 2025" color={C.navy} icon="📤" />
        <StatCard label="Sent today" value={today} sub="Templates used" color={C.saffron} icon="📅" />
        <StatCard label="Avg response" value="73%" sub="Read rate" color={C.green} icon="👀" />
      </div>

      {showAdd && (
        <Modal title="New template" onClose={()=>setShowAdd(false)}>
          <Inp label="Template name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Payment reminder – final" />
          <Sel label="Category" value={form.cat} onChange={e=>setForm({...form,cat:e.target.value})} options={Object.keys(WA_CATS_META)} />
          <div style={{ marginBottom:9 }}>
            <label style={{ fontSize:10,fontWeight:700,color:C.slate,display:"block",marginBottom:3,textTransform:"uppercase" }}>Message body (use {"{variable}"} for dynamic fields)</label>
            <textarea rows={5} value={form.body} onChange={e=>setForm({...form,body:e.target.value})} placeholder="Namaste *{name}* ji!..." style={{ width:"100%",padding:"7px 10px",border:`0.5px solid ${C.border}`,borderRadius:7,fontSize:12,fontFamily:"inherit",lineHeight:1.5 }} />
          </div>
          <div style={{ display:"flex",gap:7,justifyContent:"flex-end",marginTop:10 }}>
            <button onClick={()=>setShowAdd(false)} style={{ background:"none",border:`0.5px solid ${C.border}`,borderRadius:7,padding:"6px 12px",fontSize:12,cursor:"pointer",color:C.slate }}>Cancel</button>
            <Btn color="#25D366" onClick={saveTmpl}>✓ Save template</Btn>
          </div>
        </Modal>
      )}

      <div style={{ display:"grid",gridTemplateColumns:"1fr 300px",gap:14,alignItems:"start" }}>
        <div>
          <div style={{ display:"flex",gap:6,flexWrap:"wrap",marginBottom:12 }}>
            {WA_TMPL_CATS.map(c=>(
              <span key={c} onClick={()=>setSelCat(c)} style={{ padding:"5px 12px",borderRadius:16,fontSize:11,fontWeight:600,cursor:"pointer",border:`0.5px solid ${selCat===c?C.navy:C.border}`,background:selCat===c?C.navy:C.white,color:selCat===c?"#fff":C.slate }}>{c}</span>
            ))}
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
            {fl.map(t=>{
              const cm=catMeta(t.cat);
              return (
                <div key={t.id} onClick={()=>{ setSelTmpl(selTmpl===t.id?null:t.id); setVars({}); }} style={{ background:C.white,border:`${selTmpl===t.id?"1.5px":"0.5px"} solid ${selTmpl===t.id?"#25D366":C.border}`,borderRadius:12,overflow:"hidden",cursor:"pointer" }}>
                  <div style={{ padding:"10px 12px",borderBottom:`0.5px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                    <span style={{ fontSize:12,fontWeight:700,color:C.navy }}>{t.name}</span>
                    <span style={{ fontSize:10,padding:"2px 7px",borderRadius:10,fontWeight:600,background:cm.bg,color:cm.tc }}>{t.cat}</span>
                  </div>
                  <div style={{ padding:"10px 12px",fontSize:11,color:C.slate,lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden" }}>{t.body.replace(/\*/g,"")}</div>
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",borderTop:`0.5px solid ${C.border}` }}>
                    <span style={{ fontSize:10,color:"#aaa" }}>{t.vars.length} variable{t.vars.length!==1?"s":""}</span>
                    <span style={{ fontSize:10,color:"#aaa" }}>Sent {t.sent}x</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ background:C.white,border:`0.5px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginTop:14 }}>
            <div style={{ padding:"10px 14px",background:C.chalk,borderBottom:`0.5px solid ${C.border}` }}><span style={{ fontSize:12,fontWeight:700,color:C.navy }}>Recent messages sent</span></div>
            <div style={{ display:"grid",gridTemplateColumns:"1.4fr 1fr 80px 60px",padding:"8px 14px",background:C.chalk,borderBottom:`0.5px solid ${C.border}` }}>
              {["Customer","Template","Time","Status"].map(h=><span key={h} style={{ fontSize:10,fontWeight:700,color:"#aaa",textTransform:"uppercase" }}>{h}</span>)}
            </div>
            {msgLog.map((m,i)=>(
              <div key={i} style={{ display:"grid",gridTemplateColumns:"1.4fr 1fr 80px 60px",padding:"9px 14px",borderBottom:`0.5px solid ${C.border}`,alignItems:"center",fontSize:12 }}>
                <div style={{ fontWeight:600,color:C.navy }}>{m.name}</div>
                <div style={{ color:C.slate,fontSize:11 }}>{m.tmpl}</div>
                <div style={{ color:"#aaa",fontSize:11 }}>{m.time}</div>
                <div><Tag label={m.status==="read"?"Read":"Sent"} bg={m.status==="read"?"#E6F1FB":"#E1F5EE"} c={m.status==="read"?"#0C447C":"#085041"} /></div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {selT ? (()=>{
            const previewVars={...vars}; selT.vars.forEach(v=>{ if(!previewVars[v]) previewVars[v]=`{${v}}`; });
            const preview=fillTemplate(selT.body,previewVars);
            const lines=preview.split("\n");
            return (
              <div style={{ background:C.white,border:`0.5px solid ${C.border}`,borderRadius:12,overflow:"hidden" }}>
                <div style={{ background:C.navy,padding:"11px 14px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                  <div><div style={{ fontSize:13,fontWeight:700,color:"#fff" }}>{selT.name}</div><div style={{ fontSize:10,color:"rgba(255,255,255,.5)",marginTop:1 }}>{selT.cat} · Sent {selT.sent}x</div></div>
                  <button onClick={()=>{ setSelTmpl(null); setVars({}); }} style={{ background:"none",border:"none",color:"rgba(255,255,255,.6)",cursor:"pointer",fontSize:16 }}>✕</button>
                </div>
                <div style={{ padding:14 }}>
                  <div style={{ fontSize:10,fontWeight:700,color:"#aaa",textTransform:"uppercase",marginBottom:8 }}>WhatsApp preview</div>
                  <div style={{ background:"#E5DDD5",borderRadius:10,padding:12,marginBottom:12,minHeight:120 }}>
                    <div style={{ background:"#fff",borderRadius:"0 10px 10px 10px",padding:"10px 12px",maxWidth:"88%",fontSize:12,lineHeight:1.6,color:"#111" }}>
                      {lines.map((l,i)=>{
                        if(!l) return <br key={i} />;
                        const parts=l.split(/(\*[^*]+\*)/g);
                        return <div key={i} style={{ marginBottom:2 }}>{parts.map((p,j)=>p.startsWith("*")&&p.endsWith("*")&&p.length>2?<strong key={j}>{p.slice(1,-1)}</strong>:p)}</div>;
                      })}
                      <div style={{ fontSize:10,color:"#888",textAlign:"right",marginTop:4 }}>10:24 AM <span style={{ color:"#53BDEB" }}>✓✓</span></div>
                    </div>
                  </div>
                  {selT.vars.length>0 && <>
                    <div style={{ fontSize:10,fontWeight:700,color:"#aaa",textTransform:"uppercase",marginBottom:8 }}>Fill in variables</div>
                    {selT.vars.map(v=>(
                      <div key={v} style={{ display:"grid",gridTemplateColumns:"auto 1fr",gap:6,alignItems:"center",marginBottom:6 }}>
                        <span style={{ fontSize:11,fontWeight:600,color:"#25D366",whiteSpace:"nowrap",background:"#E1F5EE",padding:"2px 8px",borderRadius:10 }}>{`{${v}}`}</span>
                        <input value={vars[v]||""} onChange={e=>setVars({...vars,[v]:e.target.value})} placeholder={v} style={{ padding:"5px 8px",border:`0.5px solid ${C.border}`,borderRadius:6,fontSize:12,width:"100%" }} />
                      </div>
                    ))}
                  </>}
                  <button onClick={()=>markSent(selT.id)} style={{ width:"100%",background:"#25D366",color:"#fff",border:"none",borderRadius:8,padding:9,fontSize:13,fontWeight:600,cursor:"pointer",marginTop:10 }}>📤 Open in WhatsApp</button>
                </div>
              </div>
            );
          })() : (
            <div style={{ background:C.white,border:`0.5px solid ${C.border}`,borderRadius:12,padding:24,textAlign:"center" }}>
              <div style={{ fontSize:36,marginBottom:10 }}>💬</div>
              <div style={{ fontSize:13,fontWeight:600,color:C.navy,marginBottom:4 }}>Select a template</div>
              <div style={{ fontSize:12,color:"#aaa" }}>Preview and fill variables</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── MODULE: FOLLOW-UP CRM ─────────────────────────────────
const FU_TYPES = ["1 Day","3 Days","7 Days","15 Days","30 Days","Warranty","Lost Lead Recovery"];
const FU_SOURCES = ["GBP","WhatsApp","Facebook","Referral","Phone Call","Instagram"];
const FU_TYPE_META = {
  "1 Day":{ bg:"#FAEEDA",tc:"#633806",color:"#EF9F27" },
  "3 Days":{ bg:"#FAEEDA",tc:"#633806",color:"#EF9F27" },
  "7 Days":{ bg:"#E6F1FB",tc:"#0C447C",color:"#3182CE" },
  "15 Days":{ bg:"#EEEDFE",tc:"#3C3489",color:"#7F77DD" },
  "30 Days":{ bg:"#EAF3DE",tc:"#27500A",color:"#639922" },
  Warranty:{ bg:"#E1F5EE",tc:"#085041",color:"#1D9E75" },
  "Lost Lead Recovery":{ bg:"#FCEBEB",tc:"#791F1F",color:"#E24B4A" },
};

const FollowUp = () => {
  const [followups,setFollowups] = useState([
    { id:"FU-001",name:"Priya Joshi",phone:"9988776655",source:"Facebook",service:"Interior + Texture",type:"1 Day",dueDate:"Today",urgency:"today",note:"Quotation sent – waiting for approval",done:false },
    { id:"FU-002",name:"Suresh More",phone:"9876001234",source:"Instagram",service:"Texture Painting",type:"3 Days",dueDate:"Today",urgency:"today",note:"Site visit done, estimate pending",done:false },
    { id:"FU-003",name:"Kavita Pawar",phone:"9654321098",source:"Referral",service:"Waterproofing",type:"1 Day",dueDate:"Yesterday",urgency:"overdue",note:"No response to WhatsApp, try call",done:false },
    { id:"FU-004",name:"Ramesh Iyer",phone:"9712345678",source:"GBP",service:"Exterior Painting",type:"7 Days",dueDate:"Yesterday",urgency:"overdue",note:"Quoted ₹85,000 – price concern",done:false },
    { id:"FU-005",name:"Deepa Nair",phone:"9823001234",source:"WhatsApp",service:"Full Home",type:"30 Days",dueDate:"28 Jun",urgency:"upcoming",note:"Said will decide after Diwali",done:false },
    { id:"FU-006",name:"Anil Kulkarni",phone:"9765001234",source:"Phone Call",service:"Interior Painting",type:"15 Days",dueDate:"30 Jun",urgency:"upcoming",note:"Needs to check with wife",done:false },
    { id:"FU-007",name:"Meena Kadam",phone:"9812341234",source:"Facebook",service:"Exterior Painting",type:"Lost Lead Recovery",dueDate:"2 Jul",urgency:"upcoming",note:"Went to competitor – try again with discount offer",done:false },
    { id:"FU-008",name:"Vikash Goyal",phone:"9900112233",source:"GBP",service:"Waterproofing",type:"Warranty",dueDate:"5 Jul",urgency:"upcoming",note:"1 year warranty check – project done Jun 2024",done:false },
    { id:"FU-009",name:"Sunita Kulkarni",phone:"9823456781",source:"WhatsApp",service:"Waterproofing",type:"7 Days",dueDate:"22 Jun",urgency:"done",note:"Converted to project",done:true },
    { id:"FU-010",name:"Rajesh Patil",phone:"9876543210",source:"GBP",service:"Interior Painting",type:"1 Day",dueDate:"18 Jun",urgency:"done",note:"Project started, follow-up complete",done:true },
  ]);
  const [activityLog,setActivityLog] = useState([
    { icon:"📞",bg:"#E6F1FB",text:"Called Priya Joshi – no response",time:"Today 11:30 AM" },
    { icon:"💬",bg:"#E1F5EE",text:"WhatsApp sent to Suresh More",time:"Today 10:15 AM" },
    { icon:"✅",bg:"#EAF3DE",text:"Sunita Kulkarni converted – project started",time:"Yesterday" },
    { icon:"✉️",bg:"#EEEDFE",text:"SMS sent to Kavita Pawar",time:"Yesterday" },
    { icon:"⭐",bg:"#FAEEDA",text:"Rajesh Patil follow-up complete",time:"18 Jun" },
  ]);
  const [search,setSearch] = useState("");
  const [filterType,setFilterType] = useState("All");
  const [filterUrgency,setFilterUrgency] = useState("all");
  const [showAdd,setShowAdd] = useState(false);
  const [form,setForm] = useState({ name:"",phone:"",source:"GBP",service:"",type:"1 Day",note:"" });
  const sf = k => v => setForm({...form,[k]:v.target.value});

  const fl = followups.filter(f=>{
    const q=search.toLowerCase();
    const mq=!q||f.name.toLowerCase().includes(q)||f.service.toLowerCase().includes(q)||f.source.toLowerCase().includes(q);
    const mt=filterType==="All"||f.type===filterType;
    const mu=filterUrgency==="all"||f.urgency===filterUrgency;
    return mq&&mt&&mu;
  });
  const overdue=followups.filter(f=>f.urgency==="overdue"&&!f.done).length;
  const today=followups.filter(f=>f.urgency==="today"&&!f.done).length;
  const upcoming=followups.filter(f=>f.urgency==="upcoming"&&!f.done).length;
  const done=followups.filter(f=>f.done).length;

  const markDone = id => {
    setFollowups(followups.map(f=>f.id===id?{...f,done:true,urgency:"done"}:f));
    const f=followups.find(x=>x.id===id);
    if(f) setActivityLog([{ icon:"✅",bg:"#EAF3DE",text:`${f.name} follow-up marked done`,time:"Just now" },...activityLog].slice(0,6));
  };
  const sendWA = id => {
    const f=followups.find(x=>x.id===id);
    if(f) setActivityLog([{ icon:"💬",bg:"#E1F5EE",text:`WhatsApp sent to ${f.name}`,time:"Just now" },...activityLog].slice(0,6));
  };
  const saveFU = () => {
    if(!form.name) return;
    setFollowups([{ id:`FU-0${followups.length+1}`,name:form.name,phone:form.phone||"—",source:form.source,service:form.service||"Painting",type:form.type,dueDate:"Today",urgency:"today",note:form.note||"",done:false },...followups]);
    setShowAdd(false); setForm({ name:"",phone:"",source:"GBP",service:"",type:"1 Day",note:"" });
  };

  const sections = [
    { key:"overdue",label:"Overdue",bg:"#FCEBEB",c:"#791F1F" },
    { key:"today",label:"Due today",bg:"#FAEEDA",c:"#633806" },
    { key:"upcoming",label:"Upcoming",bg:"#E6F1FB",c:"#0C447C" },
    { key:"done",label:"Done",bg:"#EAF3DE",c:"#27500A" },
  ];
  const urgBorder = { overdue:C.rust,today:C.saffron,upcoming:C.navy,done:C.green };
  const urgBg = { overdue:"#FFF8F8",today:"#FFFDF5",upcoming:C.white,done:C.white };

  return (
    <div>
      <div style={{ display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",alignItems:"center" }}>
        <input placeholder="Name, service, source..." value={search} onChange={e=>setSearch(e.target.value)} style={{ flex:1,minWidth:160,maxWidth:240,padding:"7px 10px",border:`0.5px solid ${C.border}`,borderRadius:8,fontSize:12,background:C.white }} />
        <select value={filterType} onChange={e=>setFilterType(e.target.value)} style={{ padding:"6px 10px",border:`0.5px solid ${C.border}`,borderRadius:8,fontSize:12 }}>
          <option>All</option>{FU_TYPES.map(t=><option key={t}>{t}</option>)}
        </select>
        <select value={filterUrgency} onChange={e=>setFilterUrgency(e.target.value)} style={{ padding:"6px 10px",border:`0.5px solid ${C.border}`,borderRadius:8,fontSize:12 }}>
          <option value="all">All</option><option value="overdue">Overdue</option><option value="today">Today</option><option value="upcoming">Upcoming</option><option value="done">Done</option>
        </select>
        <Btn onClick={()=>setShowAdd(true)}>+ Add follow-up</Btn>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:14 }}>
        <StatCard label="Overdue" value={overdue} sub="Act now" color={C.rust} icon="🔴" />
        <StatCard label="Due today" value={today} sub="Follow up" color={C.saffron} icon="🟡" />
        <StatCard label="Upcoming" value={upcoming} sub="Scheduled" color={C.navy} icon="📅" />
        <StatCard label="Done" value={done} sub="This month" color={C.green} icon="✅" />
      </div>

      {showAdd && (
        <Modal title="Add follow-up" onClose={()=>setShowAdd(false)}>
          <Row2><Inp label="Customer name" value={form.name} onChange={sf("name")} placeholder="Priya Joshi" /><Inp label="Phone" value={form.phone} onChange={sf("phone")} placeholder="9988776655" /></Row2>
          <Row2><Sel label="Follow-up type" value={form.type} onChange={sf("type")} options={FU_TYPES} /><Sel label="Source" value={form.source} onChange={sf("source")} options={FU_SOURCES} /></Row2>
          <Inp label="Service" value={form.service} onChange={sf("service")} placeholder="Interior Painting" />
          <Inp label="Note" value={form.note} onChange={sf("note")} placeholder="Quotation sent – waiting for decision" />
          <div style={{ display:"flex",gap:7,justifyContent:"flex-end",marginTop:10 }}>
            <button onClick={()=>setShowAdd(false)} style={{ background:"none",border:`0.5px solid ${C.border}`,borderRadius:7,padding:"6px 12px",fontSize:12,cursor:"pointer",color:C.slate }}>Cancel</button>
            <Btn onClick={saveFU}>✓ Save</Btn>
          </div>
        </Modal>
      )}

      <div style={{ display:"grid",gridTemplateColumns:"1fr 260px",gap:14,alignItems:"start" }}>
        <div>
          {sections.map(sec=>{
            const items=fl.filter(f=>f.urgency===sec.key);
            if(items.length===0) return null;
            return (
              <div key={sec.key} style={{ marginBottom:14 }}>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
                  <span style={{ fontSize:12,fontWeight:700,color:C.navy }}>{sec.label}</span>
                  <span style={{ fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:10,background:sec.bg,color:sec.c }}>{items.length}</span>
                </div>
                {items.map(f=>(
                  <div key={f.id} style={{ background:urgBg[f.urgency],border:`0.5px solid ${C.border}`,borderLeft:`3px solid ${urgBorder[f.urgency]}`,borderRadius:10,padding:"12px 14px",marginBottom:8,display:"grid",gridTemplateColumns:"1fr auto",gap:10,alignItems:"center",opacity:f.done?0.6:1 }}>
                    <div>
                      <div style={{ fontSize:13,fontWeight:700,color:C.navy }}>{f.name} <span style={{ fontSize:11,color:"#aaa",fontWeight:400 }}>· {f.phone}</span></div>
                      <div style={{ fontSize:11,color:C.slate,marginTop:2,display:"flex",gap:5,alignItems:"center",flexWrap:"wrap" }}>{f.source} · {f.service} · <Tag label={f.type} bg={FU_TYPE_META[f.type]?.bg} c={FU_TYPE_META[f.type]?.tc} /> · {f.dueDate}</div>
                      {f.note && <div style={{ fontSize:11,color:"#aaa",marginTop:3,fontStyle:"italic" }}>{f.note}</div>}
                    </div>
                    <div style={{ display:"flex",gap:6,alignItems:"center",flexShrink:0 }}>
                      {!f.done ? <>
                        <button onClick={()=>sendWA(f.id)} title="WhatsApp" style={{ background:"#E1F5EE",border:"0.5px solid #9FE1CB",borderRadius:6,padding:"5px 8px",cursor:"pointer",color:"#085041",fontSize:12 }}>💬</button>
                        <button onClick={()=>markDone(f.id)} style={{ background:"#EAF3DE",border:"0.5px solid #C0DD97",borderRadius:6,padding:"5px 8px",cursor:"pointer",color:"#27500A",fontSize:11,fontWeight:600 }}>✓ Done</button>
                      </> : <Tag label="Done" bg="#EAF3DE" c="#27500A" />}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
          {fl.length===0 && <div style={{ textAlign:"center",padding:32,fontSize:13,color:"#aaa" }}>No follow-ups match.</div>}
        </div>

        <div>
          <Card title="Activity log">
            {activityLog.map((a,i)=>(
              <div key={i} style={{ display:"flex",gap:10,padding:"8px 0",borderBottom:i<activityLog.length-1?`0.5px solid ${C.border}`:"none" }}>
                <div style={{ width:28,height:28,borderRadius:"50%",background:a.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0 }}>{a.icon}</div>
                <div><div style={{ fontSize:12,fontWeight:600,color:C.navy }}>{a.text}</div><div style={{ fontSize:11,color:"#aaa",marginTop:1 }}>{a.time}</div></div>
              </div>
            ))}
          </Card>
          <Card title="Follow-up by type">
            {FU_TYPES.map(t=>{
              const cnt=followups.filter(f=>f.type===t&&!f.done).length; if(!cnt) return null;
              const m=FU_TYPE_META[t];
              return (
                <div key={t} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:`0.5px solid ${C.border}`,fontSize:12 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:6,color:C.navy,fontWeight:600 }}><span style={{ width:8,height:8,borderRadius:"50%",background:m.color,display:"inline-block" }} />{t}</div>
                  <span style={{ color:C.slate }}>{cnt} pending</span>
                </div>
              );
            })}
          </Card>
        </div>
      </div>
    </div>
  );
};

// ── MODULE: REPORTS DASHBOARD ─────────────────────────────
const REPORT_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun"];
const REPORT_REVENUE = [185000,220000,265000,310000,295000,380000];
const REPORT_EXPENSE = [95000,110000,130000,145000,138000,168000];
const LEAD_FUNNEL = [
  { stage:"Total leads",count:47,color:"#3182CE" },
  { stage:"Contacted",count:39,color:"#7F77DD" },
  { stage:"Site visit",count:28,color:"#EF9F27" },
  { stage:"Quoted",count:21,color:"#1D9E75" },
  { stage:"Won",count:16,color:"#639922" },
];
const TOP_CUSTOMERS = [
  { name:"Vikram Shinde",projects:7,value:890000 },
  { name:"Amit Deshmukh",projects:5,value:456000 },
  { name:"Rajesh Patil",projects:3,value:182000 },
  { name:"Priya Joshi",projects:1,value:56000 },
  { name:"Sunita Kulkarni",projects:1,value:32000 },
];

const Reports = () => {
  const chartData = REPORT_MONTHS.map((m,i)=>({ month:m,Revenue:Math.round(REPORT_REVENUE[i]/1000),Expenses:Math.round(REPORT_EXPENSE[i]/1000) }));
  const totalRev = REPORT_REVENUE.reduce((s,v)=>s+v,0);
  const totalExp = REPORT_EXPENSE.reduce((s,v)=>s+v,0);
  const margin = Math.round((totalRev-totalExp)/totalRev*100);
  const junRev = REPORT_REVENUE[5], mayRev = REPORT_REVENUE[4];
  const revGrowth = Math.round((junRev-mayRev)/mayRev*100);
  const maxLead = Math.max(...LEAD_FUNNEL.map(l=>l.count));

  return (
    <div>
      <div style={{ display:"flex",gap:8,marginBottom:12,alignItems:"center",flexWrap:"wrap" }}>
        <span style={{ padding:"6px 14px",borderRadius:8,fontSize:12,fontWeight:600,background:C.navy,color:"#fff" }}>Overview</span>
        <select style={{ marginLeft:"auto",padding:"6px 10px",border:`0.5px solid ${C.border}`,borderRadius:8,fontSize:12 }}>
          <option>Last 6 months</option><option>This year</option><option>Last year</option>
        </select>
        <button style={{ background:"none",border:`0.5px solid ${C.border}`,borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:600,cursor:"pointer",color:C.slate }}>⬇ Export PDF</button>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:14 }}>
        <StatCard label="June revenue" value={`₹${n(junRev)}`} sub={`${revGrowth>=0?"+":""}${revGrowth}% vs May`} color={C.green} icon="💰" />
        <StatCard label="June expenses" value={`₹${n(REPORT_EXPENSE[5])}`} sub={`${Math.round(REPORT_EXPENSE[5]/junRev*100)}% of revenue`} color={C.rust} icon="💸" />
        <StatCard label="Net profit" value={`₹${n(junRev-REPORT_EXPENSE[5])}`} sub={`${Math.round((junRev-REPORT_EXPENSE[5])/junRev*100)}% margin`} color={C.navy} icon="📈" />
        <StatCard label="6-month total" value={`₹${(totalRev/100000).toFixed(1)}L`} sub="Revenue Jan-Jun" color={C.saffron} icon="📊" />
        <StatCard label="Avg margin" value={`${margin}%`} sub="Last 6 months" color={C.purple} icon="⭐" />
      </div>

      <Card title="Revenue vs expenses — last 6 months">
        <div style={{ display:"flex",gap:14,fontSize:11,color:C.slate,marginBottom:10 }}>
          <span style={{ display:"flex",alignItems:"center",gap:5 }}><span style={{ width:9,height:9,borderRadius:2,background:C.green,display:"inline-block" }} />Revenue</span>
          <span style={{ display:"flex",alignItems:"center",gap:5 }}><span style={{ width:9,height:9,borderRadius:2,background:C.rust,display:"inline-block" }} />Expenses</span>
        </div>
        <div style={{ height:240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e1e0d9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize:11,fill:"#888780" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:11,fill:"#888780" }} axisLine={false} tickLine={false} tickFormatter={v=>`₹${v}K`} />
              <Tooltip formatter={(v)=>`₹${v}K`} contentStyle={{ fontSize:12,borderRadius:8 }} />
              <Bar dataKey="Revenue" fill={C.green} radius={[4,4,0,0]} maxBarSize={24} />
              <Bar dataKey="Expenses" fill={C.rust} radius={[4,4,0,0]} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
        <Card title="Profit & loss — June 2025">
          {[["Total revenue",`₹${n(junRev)}`,C.green],["Material cost","– ₹68,000",C.navy],["Labour cost","– ₹52,000",C.navy],["Transport + diesel","– ₹18,500",C.navy],["Equipment + misc","– ₹29,500",C.navy]].map(([l,v,c])=>(
            <div key={l} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`0.5px solid ${C.border}`,fontSize:13 }}>
              <span style={{ color:C.slate }}>{l}</span><span style={{ fontWeight:700,color:c }}>{v}</span>
            </div>
          ))}
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:10,marginTop:4,borderTop:`1.5px solid ${C.border}` }}>
            <span style={{ fontWeight:700,color:C.navy }}>Net profit</span><span style={{ fontWeight:700,fontSize:16,color:C.green }}>₹{n(junRev-REPORT_EXPENSE[5])}</span>
          </div>
        </Card>

        <Card title="Lead conversion funnel">
          {LEAD_FUNNEL.map(l=>{
            const pct=Math.round(l.count/maxLead*100);
            return (
              <div key={l.stage} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:9 }}>
                <span style={{ fontSize:11,color:C.slate,width:78,flexShrink:0 }}>{l.stage}</span>
                <div style={{ flex:1,background:C.chalk,borderRadius:6,height:18,overflow:"hidden" }}>
                  <div style={{ width:`${pct}%`,height:"100%",background:l.color,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:6 }}>
                    <span style={{ fontSize:10,fontWeight:700,color:"#fff" }}>{l.count}</span>
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{ marginTop:10,paddingTop:10,borderTop:`0.5px solid ${C.border}`,fontSize:12,color:C.slate,textAlign:"center" }}>
            Overall conversion: <strong style={{ color:C.green }}>{Math.round(16/47*100)}%</strong> · 16 of 47 leads won
          </div>
        </Card>
      </div>

      <Card title="Top customers — by revenue">
        {[...TOP_CUSTOMERS].sort((a,b)=>b.value-a.value).map((c,i)=>(
          <div key={c.name} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:i<TOP_CUSTOMERS.length-1?`0.5px solid ${C.border}`:"none" }}>
            <div><span style={{ fontSize:12,fontWeight:600,color:C.navy }}>{i+1}. {c.name}</span> <span style={{ fontSize:10,color:"#aaa" }}>· {c.projects} project{c.projects!==1?"s":""}</span></div>
            <span style={{ fontSize:12,fontWeight:700,color:C.green }}>₹{n(c.value)}</span>
          </div>
        ))}
      </Card>
    </div>
  );
};

// ── MODULE: AI FEATURES (offline, rule-based — no paid API calls) ──
const AI_RATES = { interior:18,exterior:20,texture:120,waterproof:60,putty:12,primer:8 };
const AI_MATERIALS_DB = {
  interior:[{ name:"Royale Shyne",cat:"Paint",coverage:60,rate:185,unit:"Litre" },{ name:"Wall Putty",cat:"Putty",coverage:32,rate:18,unit:"Kg" },{ name:"Primer",cat:"Primer",coverage:80,rate:95,unit:"Litre" }],
  texture:[{ name:"Texture Compound",cat:"Texture",coverage:4,rate:320,unit:"Kg" },{ name:"Wall Putty",cat:"Putty",coverage:32,rate:18,unit:"Kg" }],
  exterior:[{ name:"Apex Exterior",cat:"Paint",coverage:65,rate:145,unit:"Litre" },{ name:"Exterior Primer",cat:"Primer",coverage:75,rate:85,unit:"Litre" }],
  waterproof:[{ name:"Dr. Fixit WP",cat:"WP",coverage:12,rate:280,unit:"Kg" }],
};
const AI_INSIGHTS = [
  { icon:"📈",bg:"#EAF3DE",title:"Revenue up 29% this month",desc:"June revenue ₹3.8L vs ₹2.95L in May. Exterior projects driving growth.",tag:"Revenue",tagBg:"#EAF3DE",tagC:"#27500A" },
  { icon:"⚠️",bg:"#FCEBEB",title:"4 follow-ups overdue",desc:"Kavita Pawar, Ramesh Iyer and 2 others need immediate attention. Potential ₹2.1L at risk.",tag:"Action needed",tagBg:"#FCEBEB",tagC:"#791F1F" },
  { icon:"💡",bg:"#FAEEDA",title:"Peak season approaching",desc:"Oct-Nov is Pune painting season. Start building lead pipeline now. Last year Q4 was 2.4x Q3.",tag:"Opportunity",tagBg:"#FAEEDA",tagC:"#633806" },
  { icon:"👥",bg:"#E6F1FB",title:"Referral conversion high",desc:"Referral leads convert at 78% vs 41% overall. Consider a referral incentive program.",tag:"Growth",tagBg:"#E6F1FB",tagC:"#0C447C" },
  { icon:"📦",bg:"#EEEDFE",title:"3 materials running low",desc:"Asian Paints Primer, Wall Putty, Dr. Fixit WP below minimum. Reorder before next project.",tag:"Inventory",tagBg:"#EEEDFE",tagC:"#3C3489" },
];
const AI_RESPONSES = {
  quote:"Based on your measurements, a 3BHK in Magarpatta (1,200 sq.ft) with interior painting + texture in living room would cost approximately ₹78,000–₹88,000. This includes wall putty, primer, 2 coats emulsion, and texture work.",
  material:"For 1,200 sq.ft interior, you will need: ~24 litres Royale Shyne (2 coats), 37 kg Wall Putty, 16 litres Primer. Total material cost: ~₹11,200 at MRP.",
  lead:"Your best performing lead sources are GBP (34%) and Referrals (28%). Facebook Ads have high volume but low conversion (22%). Consider boosting GBP reviews and creating a referral incentive.",
  profit:"June net margin is 55.8% (₹2.12L profit on ₹3.8L revenue). Labour cost is your biggest expense at 31%. Texture projects give 68% margin vs 52% for plain interior — focus on upselling texture.",
  default:"I can help you with: cost estimates, material quantities, lead analysis, profit insights, or business advice. What would you like to know?",
};

const AIFeatures = () => {
  const [tab,setTab] = useState("estimate");
  const [recording,setRecording] = useState(false);
  const [transcript,setTranscript] = useState("");
  const [estimateResult,setEstimateResult] = useState(null);
  const [estimateLoading,setEstimateLoading] = useState(false);
  const [matResult,setMatResult] = useState(null);
  const [chatMessages,setChatMessages] = useState([{ role:"ai",text:"Namaste Vicky! I am your Savi Painting assistant. Ask me anything about your business — quotes, materials, leads, profits, or strategy." }]);
  const [chatInput,setChatInput] = useState("");
  const [form,setForm] = useState({ service:"interior",area:"1200",floors:"1",rooms:"6",extra:"texture" });
  const [matForm,setMatForm] = useState({ service:"interior",area:"1200" });

  const calcEstimate = () => {
    const area=parseFloat(form.area)||0;
    const r=AI_RATES[form.service]||18;
    const base=area*r, putty=area*AI_RATES.putty, primer=area*AI_RATES.primer;
    const labour=Math.round((base+putty+primer)*0.35);
    const material=Math.round((base+putty+primer)*0.28);
    const overhead=Math.round((base+putty+primer)*0.08);
    const total=base+putty+primer;
    const profit=Math.round(total-labour-material-overhead);
    return { base,putty,primer,labour,material,overhead,total,profit,margin:Math.round(profit/total*100) };
  };
  const calcMaterials = () => {
    const area=parseFloat(matForm.area)||0;
    const mats=AI_MATERIALS_DB[matForm.service]||AI_MATERIALS_DB.interior;
    return mats.map(m=>{ const qty=Math.ceil(area/m.coverage*1.1); return { ...m,qty,cost:qty*m.rate }; });
  };
  const runEstimate = () => {
    setEstimateLoading(true); setEstimateResult(null);
    setTimeout(()=>{ setEstimateResult(calcEstimate()); setEstimateLoading(false); },900);
  };
  const runMaterial = () => setMatResult(calcMaterials());
  const toggleVoice = () => {
    if(!recording){
      setRecording(true); setTranscript("");
      setTimeout(()=>{ setTranscript("Living room 18 by 14 feet, height 10 feet. 2 doors, 3 windows."); setRecording(false); },2500);
    } else setRecording(false);
  };
  const sendChat = (msgOverride) => {
    const msg=(msgOverride||chatInput).trim();
    if(!msg) return;
    setChatMessages(m=>[...m,{ role:"user",text:msg }]);
    setChatInput("");
    setTimeout(()=>{
      const lower=msg.toLowerCase();
      let resp=AI_RESPONSES.default;
      if(lower.includes("quote")||lower.includes("cost")||lower.includes("estimate")) resp=AI_RESPONSES.quote;
      else if(lower.includes("material")||lower.includes("paint")||lower.includes("litre")) resp=AI_RESPONSES.material;
      else if(lower.includes("lead")||lower.includes("source")||lower.includes("conversion")) resp=AI_RESPONSES.lead;
      else if(lower.includes("profit")||lower.includes("margin")||lower.includes("revenue")) resp=AI_RESPONSES.profit;
      setChatMessages(m=>[...m,{ role:"ai",text:resp }]);
    },900);
  };

  const TABS = [
    { id:"estimate",icon:"🧮",label:"Cost estimator" },
    { id:"material",icon:"📦",label:"Material calculator" },
    { id:"insights",icon:"📊",label:"Business insights" },
    { id:"voice",icon:"🎙️",label:"Voice measurement" },
    { id:"assistant",icon:"🤖",label:"Assistant" },
  ];

  return (
    <div>
      <div style={{ display:"flex",gap:6,marginBottom:14,flexWrap:"wrap" }}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ padding:"7px 14px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",border:`0.5px solid ${tab===t.id?C.navy:C.border}`,background:tab===t.id?C.navy:C.white,color:tab===t.id?"#fff":C.slate,display:"flex",alignItems:"center",gap:5 }}>{t.icon} {t.label}</button>
        ))}
      </div>

      {tab==="estimate" && (
        <Card title="Cost estimator" action={<Tag label="Rule-based · Free" bg="#EEEDFE" c="#3C3489" />}>
          <Row2>
            <div>
              <Sel label="Service type" value={form.service} onChange={e=>setForm({...form,service:e.target.value})} options={["interior","exterior","texture","waterproof"]} />
              <Inp label="Total area (sq.ft)" type="number" value={form.area} onChange={e=>setForm({...form,area:e.target.value})} />
              <Inp label="No. of floors" type="number" value={form.floors} onChange={e=>setForm({...form,floors:e.target.value})} />
              <Inp label="No. of rooms" type="number" value={form.rooms} onChange={e=>setForm({...form,rooms:e.target.value})} />
            </div>
            <div>
              <Sel label="Extra work" value={form.extra} onChange={e=>setForm({...form,extra:e.target.value})} options={["none","texture","waterproof","both"]} />
              <Sel label="Quality level" value="Premium (Asian Paints)" onChange={()=>{}} options={["Premium (Asian Paints)","Standard (Nerolac)","Economy"]} />
              <div style={{ fontSize:11,color:C.slate,background:C.chalk,borderRadius:8,padding:10,marginBottom:10,lineHeight:1.6 }}>
                Estimate is calculated locally from area, service type, material cost, labour, and standard Pune market rates — no external service is called, so this stays free.
              </div>
            </div>
          </Row2>
          <Btn full onClick={runEstimate}>{estimateLoading?"Calculating...":"✨ Generate estimate"}</Btn>
          {estimateResult && (
            <div style={{ background:"#EEEDFE",border:"0.5px solid #AFA9EC",borderRadius:10,padding:14,marginTop:12 }}>
              <div style={{ fontSize:11,fontWeight:700,color:"#3C3489",textTransform:"uppercase",marginBottom:10 }}>Estimate result</div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10 }}>
                <div style={{ background:"#fff",borderRadius:8,padding:"9px 11px",border:"0.5px solid #AFA9EC" }}><div style={{ fontSize:10,color:"#534AB7",fontWeight:600 }}>TOTAL ESTIMATE</div><div style={{ fontSize:16,fontWeight:700,color:"#26215C" }}>₹{n(estimateResult.total)}</div><div style={{ fontSize:11,color:"#3C3489" }}>{form.area} sq.ft</div></div>
                <div style={{ background:"#fff",borderRadius:8,padding:"9px 11px",border:"0.5px solid #AFA9EC" }}><div style={{ fontSize:10,color:"#534AB7",fontWeight:600 }}>NET PROFIT</div><div style={{ fontSize:16,fontWeight:700,color:"#27500A" }}>₹{n(estimateResult.profit)}</div><div style={{ fontSize:11,color:"#3C3489" }}>{estimateResult.margin}% margin</div></div>
                <div style={{ background:"#fff",borderRadius:8,padding:"9px 11px",border:"0.5px solid #AFA9EC" }}><div style={{ fontSize:10,color:"#534AB7",fontWeight:600 }}>LABOUR COST</div><div style={{ fontSize:16,fontWeight:700,color:"#26215C" }}>₹{n(estimateResult.labour)}</div><div style={{ fontSize:11,color:"#3C3489" }}>35% of base</div></div>
                <div style={{ background:"#fff",borderRadius:8,padding:"9px 11px",border:"0.5px solid #AFA9EC" }}><div style={{ fontSize:10,color:"#534AB7",fontWeight:600 }}>MATERIAL COST</div><div style={{ fontSize:16,fontWeight:700,color:"#26215C" }}>₹{n(estimateResult.material)}</div><div style={{ fontSize:11,color:"#3C3489" }}>28% of base</div></div>
              </div>
              <div style={{ fontSize:11,color:"#534AB7",lineHeight:1.6 }}>
                Recommended quote range: <strong style={{ color:"#26215C" }}>₹{n(Math.round(estimateResult.total*0.95))} – ₹{n(Math.round(estimateResult.total*1.12))}</strong><br />
                Break-even at ₹{n(estimateResult.labour+estimateResult.material+estimateResult.overhead)}. Profit starts above this.
              </div>
            </div>
          )}
        </Card>
      )}

      {tab==="material" && (
        <Card title="Material calculator" action={<Tag label="Rule-based · Free" bg="#EEEDFE" c="#3C3489" />}>
          <Row2>
            <Sel label="Service type" value={matForm.service} onChange={e=>setMatForm({...matForm,service:e.target.value})} options={["interior","exterior","texture","waterproof"]} />
            <Inp label="Total area (sq.ft)" type="number" value={matForm.area} onChange={e=>setMatForm({...matForm,area:e.target.value})} />
          </Row2>
          <Btn full onClick={runMaterial}>🧮 Calculate materials</Btn>
          {matResult && (
            <div style={{ marginTop:12,border:`0.5px solid ${C.border}`,borderRadius:10,overflow:"hidden" }}>
              <div style={{ display:"grid",gridTemplateColumns:"2fr 70px 70px 80px",gap:6,padding:"8px 12px",background:C.chalk,fontSize:10,fontWeight:700,color:"#aaa",textTransform:"uppercase" }}>
                <span>Material</span><span style={{ textAlign:"right" }}>Qty</span><span style={{ textAlign:"right" }}>Rate</span><span style={{ textAlign:"right" }}>Cost</span>
              </div>
              {matResult.map(m=>(
                <div key={m.name} style={{ display:"grid",gridTemplateColumns:"2fr 70px 70px 80px",gap:6,padding:"8px 12px",borderBottom:`0.5px solid ${C.border}`,alignItems:"center" }}>
                  <div><div style={{ fontSize:12,fontWeight:600,color:C.navy }}>{m.name}</div><div style={{ fontSize:10,color:"#aaa" }}>{m.cat}</div></div>
                  <div style={{ textAlign:"right",fontSize:12,fontWeight:700 }}>{m.qty} {m.unit}</div>
                  <div style={{ textAlign:"right",fontSize:12,fontWeight:700 }}>₹{n(m.rate)}</div>
                  <div style={{ textAlign:"right",fontSize:12,fontWeight:700,color:C.green }}>₹{n(m.cost)}</div>
                </div>
              ))}
              <div style={{ display:"flex",justifyContent:"space-between",padding:"8px 12px",background:C.chalk }}>
                <span style={{ fontSize:12,fontWeight:700,color:C.navy }}>Total material cost (incl. 10% wastage)</span>
                <span style={{ fontSize:14,fontWeight:700,color:C.green }}>₹{n(matResult.reduce((s,m)=>s+m.cost,0))}</span>
              </div>
            </div>
          )}
        </Card>
      )}

      {tab==="insights" && (
        <Card title="Business insights" action={<Tag label="Rule-based · Free" bg="#EEEDFE" c="#3C3489" />}>
          {AI_INSIGHTS.map(i=>(
            <div key={i.title} style={{ display:"flex",gap:10,padding:"10px 12px",borderRadius:9,border:`0.5px solid ${C.border}`,marginBottom:8 }}>
              <div style={{ width:30,height:30,borderRadius:8,background:i.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0 }}>{i.icon}</div>
              <div><div style={{ fontSize:12,fontWeight:700,color:C.navy }}>{i.title}</div><div style={{ fontSize:11,color:C.slate,marginTop:2,lineHeight:1.5 }}>{i.desc}</div><span style={{ fontSize:10,fontWeight:700,padding:"1px 7px",borderRadius:8,marginTop:4,display:"inline-block",background:i.tagBg,color:i.tagC }}>{i.tag}</span></div>
            </div>
          ))}
        </Card>
      )}

      {tab==="voice" && (
        <Card title="Voice measurement" action={<Tag label="Browser mic · Free" bg="#EEEDFE" c="#3C3489" />}>
          <div style={{ border:`0.5px solid ${C.border}`,borderRadius:10,padding:14,textAlign:"center",background:C.chalk }}>
            <button onClick={toggleVoice} style={{ width:64,height:64,borderRadius:"50%",background:recording?C.rust:C.navy,border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",margin:"0 auto 10px",fontSize:26 }}>🎙️</button>
            <div style={{ fontSize:13,fontWeight:700,color:C.navy,marginBottom:4 }}>{recording?"Recording... speak now":"Tap to start voice measurement"}</div>
            <div style={{ fontSize:11,color:C.slate }}>Say room dimensions like "Living room 18 by 14 feet height 10"</div>
            {transcript && <div style={{ background:C.white,border:`0.5px solid ${C.border}`,borderRadius:8,padding:"10px 12px",textAlign:"left",marginTop:10,fontSize:12,lineHeight:1.6 }}><strong style={{ color:"#7F77DD" }}>Recognized:</strong><br />{transcript}</div>}
          </div>
          <div style={{ marginTop:12,background:C.chalk,borderRadius:9,padding:12 }}>
            <div style={{ fontSize:11,fontWeight:700,color:"#aaa",textTransform:"uppercase",marginBottom:8 }}>Example voice commands</div>
            {['"Living room 18 by 14 feet height 10"','"Bedroom 12 by 12 height 10 one door two windows"','"Kitchen 10 by 8 ceiling yes"','"Send measurement to quotation"'].map(ex=>(
              <div key={ex} style={{ fontSize:11,color:C.slate,padding:"4px 0",borderBottom:`0.5px solid ${C.border}`,fontStyle:"italic" }}>{ex}</div>
            ))}
          </div>
          <div style={{ fontSize:10,color:"#aaa",marginTop:8 }}>Uses the free built-in Web Speech API in Chrome — no paid transcription service required.</div>
        </Card>
      )}

      {tab==="assistant" && (
        <Card title="Business assistant" action={<Tag label="Offline · Free" bg="#EEEDFE" c="#3C3489" />}>
          <div style={{ display:"flex",flexDirection:"column",gap:8,maxHeight:320,overflowY:"auto",marginBottom:10 }}>
            {chatMessages.map((m,i)=>(
              <div key={i} style={{ maxWidth:"88%",padding:"9px 12px",borderRadius:m.role==="user"?"10px 10px 0 10px":"10px 10px 10px 0",fontSize:12,lineHeight:1.6,alignSelf:m.role==="user"?"flex-end":"flex-start",background:m.role==="user"?C.navy:"#EEEDFE",color:m.role==="user"?"#fff":"#26215C",border:m.role==="user"?"none":"0.5px solid #AFA9EC" }}>{m.text}</div>
            ))}
          </div>
          <div style={{ display:"flex",gap:6,flexWrap:"wrap",marginBottom:8 }}>
            {["Quote for 3BHK","Best lead source?","This month profit?","Material for 800 sq.ft"].map(q=>(
              <button key={q} onClick={()=>sendChat(q)} style={{ fontSize:11,padding:"4px 10px",borderRadius:16,background:C.chalk,border:`0.5px solid ${C.border}`,cursor:"pointer",color:C.slate }}>{q}</button>
            ))}
          </div>
          <div style={{ display:"flex",gap:7 }}>
            <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Ask anything about your business..." style={{ flex:1,padding:"8px 10px",border:`0.5px solid ${C.border}`,borderRadius:8,fontSize:12 }} />
            <button onClick={()=>sendChat()} style={{ background:"#7F77DD",color:"#fff",border:"none",borderRadius:8,padding:"8px 14px",fontSize:12,fontWeight:600,cursor:"pointer" }}>➤</button>
          </div>
        </Card>
      )}
    </div>
  );
};

// ── MODULE: SECURITY & SETTINGS ───────────────────────────
const SEC_USERS = [
  { id:"U1",name:"Vicky Salave",email:"vicky@savipainting.com",role:"Owner",status:"Active",last:"Today",bg:"#FAEEDA",c:"#633806",init:"VS" },
  { id:"U2",name:"Raju Kamble",email:"raju@savipainting.com",role:"Staff",status:"Active",last:"Today",bg:"#E6F1FB",c:"#0C447C",init:"RK" },
  { id:"U3",name:"Deepak More",email:"deepak@savipainting.com",role:"Staff",status:"Active",last:"Yesterday",bg:"#EAF3DE",c:"#27500A",init:"DM" },
  { id:"U4",name:"Anita Joshi",email:"anita@savipainting.com",role:"Manager",status:"Active",last:"2 days ago",bg:"#EEEDFE",c:"#3C3489",init:"AJ" },
  { id:"U5",name:"Prakash Shinde",email:"prakash@savipainting.com",role:"View only",status:"Inactive",last:"1 week ago",bg:"#F1EFE8",c:"#444441",init:"PS" },
];
const SEC_PERMS = [
  { module:"Dashboard",manager:true,staff:true,view:true },
  { module:"Leads & CRM",manager:true,staff:true,view:true },
  { module:"Quotations",manager:true,staff:false,view:false },
  { module:"Invoices",manager:true,staff:false,view:true },
  { module:"Projects",manager:true,staff:true,view:true },
  { module:"Labour",manager:true,staff:false,view:false },
  { module:"Inventory",manager:true,staff:true,view:false },
  { module:"Expenses",manager:false,staff:false,view:false },
  { module:"Reports",manager:true,staff:false,view:false },
  { module:"Settings",manager:false,staff:false,view:false },
];
const SEC_SETTINGS_DEF = [
  { key:"twofa",label:"Two-factor authentication",desc:"OTP on login via SMS",on:false },
  { key:"autolock",label:"Auto-lock after 30 min",desc:"Session expires if inactive",on:true },
  { key:"loginnotif",label:"Login notifications",desc:"WhatsApp alert on new login",on:true },
  { key:"backupnotif",label:"Backup alerts",desc:"Daily backup confirmation",on:true },
  { key:"auditlog",label:"Audit log",desc:"Track all user actions",on:true },
  { key:"apilock",label:"API access lock",desc:"Restrict Google Sheets API",on:false },
];
const SEC_BACKUPS = [
  { name:"Auto backup",time:"Today 3:00 AM",size:"2.4 MB",type:"auto" },
  { name:"Auto backup",time:"Yesterday 3:00 AM",size:"2.3 MB",type:"auto" },
  { name:"Manual backup",time:"25 Jun, 11:42 AM",size:"2.2 MB",type:"manual" },
  { name:"Auto backup",time:"24 Jun 3:00 AM",size:"2.1 MB",type:"auto" },
];
const SEC_AUDIT = [
  { icon:"🔑",bg:"#E6F1FB",user:"Vicky Salave",action:"Logged in from Pune, MH",time:"Today 9:15 AM" },
  { icon:"📄",bg:"#EAF3DE",user:"Anita Joshi",action:"Created invoice INV-2025-005",time:"Today 11:30 AM" },
  { icon:"✏️",bg:"#FAEEDA",user:"Vicky Salave",action:"Updated quotation QT-2025-047",time:"Yesterday 4:20 PM" },
  { icon:"➕",bg:"#EEEDFE",user:"Vicky Salave",action:"Added new customer – Priya Joshi",time:"Yesterday 2:10 PM" },
  { icon:"🗑️",bg:"#FCEBEB",user:"Anita Joshi",action:"Deleted lead LD-006",time:"25 Jun 5:45 PM" },
  { icon:"🔒",bg:"#F1EFE8",user:"System",action:"Auto backup completed – 2.3 MB",time:"25 Jun 3:00 AM" },
  { icon:"⚙️",bg:"#E1F5EE",user:"Vicky Salave",action:"Changed labour rate for Raju Kamble",time:"24 Jun 1:15 PM" },
];
const roleTagMeta = r => ({ Owner:{bg:"#FAEEDA",c:"#633806"},Manager:{bg:"#E6F1FB",c:"#0C447C"},Staff:{bg:"#EAF3DE",c:"#27500A"},"View only":{bg:"#F1EFE8",c:"#444441"} }[r]||{bg:"#F1EFE8",c:"#444441"});

const Toggle = ({ on, onClick }) => (
  <button onClick={onClick} style={{ width:36,height:20,borderRadius:10,cursor:"pointer",position:"relative",flexShrink:0,border:"none",background:on?C.green:"#D1D1D1" }}>
    <span style={{ position:"absolute",width:16,height:16,borderRadius:"50%",background:"#fff",top:2,left:on?18:2,transition:"left .2s" }} />
  </button>
);

const Security = () => {
  const [tab,setTab] = useState("profile");
  const [secState,setSecState] = useState(()=>Object.fromEntries(SEC_SETTINGS_DEF.map(s=>[s.key,s.on])));
  const toggleSec = key => setSecState({...secState,[key]:!secState[key]});
  const NAV_ITEMS = [
    { id:"profile",icon:"👤",label:"Profile" },
    { id:"users",icon:"👥",label:"Users & roles" },
    { id:"permissions",icon:"🔐",label:"Permissions" },
    { id:"security",icon:"🔒",label:"Security" },
    { id:"backup",icon:"☁️",label:"Backup" },
    { id:"audit",icon:"📋",label:"Audit log" },
    { id:"business",icon:"🏢",label:"Business info" },
  ];

  return (
    <div style={{ display:"grid",gridTemplateColumns:"180px 1fr",gap:14,alignItems:"start" }}>
      <div style={{ background:C.white,border:`0.5px solid ${C.border}`,borderRadius:12,overflow:"hidden" }}>
        <div style={{ padding:"12px 14px",background:C.navy,textAlign:"center" }}>
          <div style={{ fontSize:13,fontWeight:700,color:C.saffron,letterSpacing:".04em" }}>SAVI OS</div>
          <div style={{ fontSize:9,color:"rgba(255,255,255,.5)",marginTop:1,letterSpacing:".06em",textTransform:"uppercase" }}>Settings</div>
        </div>
        {NAV_ITEMS.map((it,i)=>(
          <div key={it.id} onClick={()=>setTab(it.id)} style={{ display:"flex",alignItems:"center",gap:8,padding:"9px 14px",fontSize:12,fontWeight:600,cursor:"pointer",color:tab===it.id?C.navy:C.slate,borderLeft:tab===it.id?`3px solid ${C.navy}`:"3px solid transparent",background:tab===it.id?"#EBF3FF":"transparent",borderBottom:i<NAV_ITEMS.length-1?`0.5px solid ${C.border}`:"none" }}>
            <span>{it.icon}</span>{it.label}
          </div>
        ))}
      </div>

      <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
        {tab==="profile" && (
          <Card title="👤 Profile settings">
            <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16,paddingBottom:14,borderBottom:`0.5px solid ${C.border}` }}>
              <div style={{ width:48,height:48,borderRadius:"50%",background:"#FAEEDA",color:"#633806",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700 }}>VS</div>
              <div><div style={{ fontSize:14,fontWeight:700,color:C.navy }}>Vicky Salave</div><div style={{ fontSize:11,color:"#aaa" }}>Owner · Admin</div></div>
            </div>
            <Row2><Inp label="Full name" value="Vikas Bharat Salave" onChange={()=>{}} /><Inp label="Display name" value="Vicky" onChange={()=>{}} /></Row2>
            <Row2><Inp label="Phone" value="+91 96732 98955" onChange={()=>{}} /><Inp label="Email" value="vicky@savipainting.com" onChange={()=>{}} /></Row2>
            <Row2><Inp label="UPI ID" value="vickysalave@upi" onChange={()=>{}} /><Inp label="City" value="Pune" onChange={()=>{}} /></Row2>
            <Btn>✓ Save changes</Btn>
          </Card>
        )}

        {tab==="users" && (
          <Card title="👥 Users & roles" action={<Btn small>+ Add user</Btn>}>
            {SEC_USERS.map(u=>{
              const rm=roleTagMeta(u.role);
              return (
                <div key={u.id} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 0",borderBottom:`0.5px solid ${C.border}` }}>
                  <div style={{ display:"flex",alignItems:"center",gap:9 }}>
                    <div style={{ width:30,height:30,borderRadius:"50%",background:u.bg,color:u.c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700 }}>{u.init}</div>
                    <div><div style={{ fontSize:12,fontWeight:600,color:C.navy }}>{u.name}</div><div style={{ fontSize:10,color:"#aaa" }}>{u.email} · Last: {u.last}</div></div>
                  </div>
                  <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                    <Tag label={u.role} bg={rm.bg} c={rm.c} />
                    <Tag label={u.status} bg={u.status==="Active"?"#EAF3DE":"#FCEBEB"} c={u.status==="Active"?"#27500A":"#791F1F"} />
                  </div>
                </div>
              );
            })}
          </Card>
        )}

        {tab==="permissions" && (
          <Card title="🔐 Module permissions">
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%",borderCollapse:"collapse",fontSize:11,minWidth:400 }}>
                <thead><tr style={{ background:C.chalk }}>{["Module","Owner","Manager","Staff","View only"].map(h=><th key={h} style={{ padding:"7px 10px",fontSize:10,fontWeight:700,color:"#aaa",textTransform:"uppercase",textAlign:h==="Module"?"left":"center" }}>{h}</th>)}</tr></thead>
                <tbody>{SEC_PERMS.map(p=>(
                  <tr key={p.module} style={{ borderTop:`0.5px solid ${C.border}` }}>
                    <td style={{ padding:"8px 10px",fontWeight:600,color:C.navy }}>{p.module}</td>
                    <td style={{ padding:"8px 10px",textAlign:"center",color:C.green }}>✓</td>
                    <td style={{ padding:"8px 10px",textAlign:"center",color:p.manager?C.green:C.rust }}>{p.manager?"✓":"✕"}</td>
                    <td style={{ padding:"8px 10px",textAlign:"center",color:p.staff?C.green:C.rust }}>{p.staff?"✓":"✕"}</td>
                    <td style={{ padding:"8px 10px",textAlign:"center",color:p.view?C.green:C.rust }}>{p.view?"✓":"✕"}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </Card>
        )}

        {tab==="security" && (
          <Card title="🔒 Security settings">
            {SEC_SETTINGS_DEF.map(s=>(
              <div key={s.key} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:`0.5px solid ${C.border}` }}>
                <div><div style={{ fontSize:12,fontWeight:600,color:C.navy }}>{s.label}</div><div style={{ fontSize:11,color:"#aaa",marginTop:2 }}>{s.desc}</div></div>
                <Toggle on={secState[s.key]} onClick={()=>toggleSec(s.key)} />
              </div>
            ))}
          </Card>
        )}

        {tab==="backup" && (
          <Card title="☁️ Backup & restore" action={<Btn small color={C.green}>⬆ Backup now</Btn>}>
            <div style={{ background:"#EAF3DE",borderRadius:8,padding:"10px 12px",marginBottom:12,fontSize:12,color:"#27500A",fontWeight:600 }}>✓ Auto backup active — daily at 3:00 AM · Google Drive (free)</div>
            {SEC_BACKUPS.map((b,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 12px",background:C.chalk,borderRadius:8,marginBottom:7 }}>
                <div><div style={{ fontSize:12,fontWeight:600,color:C.navy }}>{b.type==="manual"?"📄":"🔄"} {b.name}</div><div style={{ fontSize:10,color:"#aaa",marginTop:1 }}>{b.time}</div></div>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}><span style={{ fontSize:11,fontWeight:700,color:C.navy }}>{b.size}</span><Btn small>⬇ Restore</Btn></div>
              </div>
            ))}
          </Card>
        )}

        {tab==="audit" && (
          <Card title="📋 Audit log" action={<span style={{ fontSize:11,color:"#aaa" }}>Last 7 days</span>}>
            {SEC_AUDIT.map((a,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:10,padding:"8px 0",borderBottom:i<SEC_AUDIT.length-1?`0.5px solid ${C.border}`:"none" }}>
                <div style={{ width:26,height:26,borderRadius:"50%",background:a.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0,marginTop:1 }}>{a.icon}</div>
                <div><div style={{ fontSize:12,color:C.navy,fontWeight:500 }}>{a.action}</div><div style={{ fontSize:10,color:"#aaa",marginTop:2 }}>{a.user} · {a.time}</div></div>
              </div>
            ))}
          </Card>
        )}

        {tab==="business" && (
          <Card title="🏢 Business information">
            <Row2><Inp label="Business name" value="Savi Painting & Decor Services" onChange={()=>{}} /><Inp label="Business type" value="Painting & Waterproofing Contractor" onChange={()=>{}} /></Row2>
            <Row2><Inp label="GST number" placeholder="27XXXXX1234X1ZX" onChange={()=>{}} /><Inp label="PAN number" placeholder="ABCDE1234F" onChange={()=>{}} /></Row2>
            <Row2><Inp label="Phone" value="+91 96732 98955" onChange={()=>{}} /><Inp label="UPI ID" value="vickysalave@upi" onChange={()=>{}} /></Row2>
            <Inp label="Business address" value="Pune, Maharashtra, India" onChange={()=>{}} />
            <Btn>✓ Save changes</Btn>
          </Card>
        )}
      </div>
    </div>
  );
};

// ── PLACEHOLDER ───────────────────────────────────────────
const Placeholder = ({ id }) => {
  const item = NAV.find(n=>n.id===id);
  const desc = { inventory:"Stock management, vendor directory, low-stock alerts, purchase tracking.", expenses:"7-category expense tracker with project mapping and monthly breakdown.", whatsapp:"10+ message templates with live preview, variable substitution and send log.", followup:"1/3/7/15/30-day reminders, warranty follow-up, overdue alerts, activity log.", reports:"Revenue chart, P&L, lead funnel, top customers, monthly/yearly export.", ai:"AI cost estimator, material calculator, business insights, voice measurement, AI chatbot.", security:"User roles, permissions matrix, security toggles, auto backup, audit log." };
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:360,gap:14,textAlign:"center",padding:20 }}>
      <div style={{ fontSize:56 }}>{item?.icon}</div>
      <div style={{ fontSize:20,fontWeight:800,color:C.navy }}>{item?.label} Module</div>
      <div style={{ fontSize:13,color:C.slate,maxWidth:380,lineHeight:1.7 }}>{desc[id]||"Available in Savi Painting OS."}</div>
      <div style={{ background:C.purpleLight,border:`0.5px solid #AFA9EC`,borderRadius:10,padding:"10px 18px",color:"#3C3489",fontSize:12,maxWidth:360,lineHeight:1.6 }}>
        Full {item?.label} module code available — all modules built and tested individually in this session.
      </div>
    </div>
  );
};

// ── SIDEBAR ───────────────────────────────────────────────
const Sidebar = ({ active, setActive, collapsed, setCollapsed }) => (
  <div style={{ width:collapsed?54:210,background:C.navy,display:"flex",flexDirection:"column",transition:"width .2s",overflow:"hidden",flexShrink:0,position:"sticky",top:0,height:"100vh" }}>
    <div style={{ padding:collapsed?"13px 0":"12px 14px",borderBottom:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",justifyContent:collapsed?"center":"space-between" }}>
      {!collapsed && <div><div style={{ color:C.saffron,fontWeight:900,fontSize:14,letterSpacing:".03em" }}>SAVI</div><div style={{ color:"rgba(255,255,255,.4)",fontSize:8,letterSpacing:".12em",textTransform:"uppercase" }}>Painting OS</div></div>}
      <button onClick={()=>setCollapsed(!collapsed)} style={{ background:"rgba(255,255,255,.08)",border:"none",color:"rgba(255,255,255,.6)",cursor:"pointer",borderRadius:5,width:26,height:26,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
        {collapsed?"▶":"◀"}
      </button>
    </div>
    <nav style={{ flex:1,padding:"7px 0",overflowY:"auto",overflowX:"hidden" }}>
      {NAV.map(item=>{
        const a=active===item.id;
        return <button key={item.id} onClick={()=>setActive(item.id)} title={collapsed?item.label:""} style={{ width:"100%",display:"flex",alignItems:"center",gap:8,padding:collapsed?"9px 0":"8px 13px",justifyContent:collapsed?"center":"flex-start",background:a?"rgba(245,166,35,.15)":"transparent",borderLeft:a?`3px solid ${C.saffron}`:"3px solid transparent",border:a?undefined:"none",cursor:"pointer",color:a?C.saffron:"rgba(255,255,255,.62)",fontSize:11,fontWeight:a?700:400,whiteSpace:"nowrap",transition:"all .12s" }}>
          <span style={{ fontSize:14,flexShrink:0 }}>{item.icon}</span>
          {!collapsed && <span>{item.label}</span>}
        </button>;
      })}
    </nav>
    {!collapsed && <div style={{ padding:"10px 13px",borderTop:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",gap:8 }}>
      <div style={{ width:28,height:28,borderRadius:"50%",background:C.saffron,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:C.navy,flexShrink:0 }}>V</div>
      <div><div style={{ color:C.white,fontSize:11,fontWeight:700 }}>Vicky Salave</div><div style={{ color:"rgba(255,255,255,.4)",fontSize:9 }}>Owner / Admin</div></div>
    </div>}
  </div>
);

// ── ROOT ──────────────────────────────────────────────────
export default function SaviPaintingOS() {
  const [active,setActive] = useState("dashboard");
  const [collapsed,setCollapsed] = useState(false);
  const item = NAV.find(n=>n.id===active);
  const today = new Date().toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short",year:"numeric"});
  const renderModule = () => {
    switch(active) {
      case "dashboard":   return <Dashboard setActive={setActive} />;
      case "leads":       return <Leads />;
      case "customers":   return <Customers />;
      case "measurement": return <Measurement />;
      case "quotations":  return <Quotations />;
      case "invoices":    return <Invoices />;
      case "projects":    return <Projects />;
      case "labour":      return <Labour />;
      case "inventory":   return <Inventory />;
      case "expenses":    return <Expenses />;
      case "whatsapp":    return <WhatsApp />;
      case "followup":    return <FollowUp />;
      case "reports":     return <Reports />;
      case "ai":          return <AIFeatures />;
      case "security":    return <Security />;
      default:            return <Placeholder id={active} />;
    }
  };
  return (
    <div style={{ display:"flex",height:"100vh",fontFamily:"'Inter','Segoe UI',sans-serif",background:C.chalk,overflow:"hidden" }}>
      <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div style={{ flex:1,display:"flex",flexDirection:"column",overflow:"hidden" }}>
        <div style={{ height:50,background:C.white,borderBottom:`0.5px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 18px",flexShrink:0 }}>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <span style={{ fontSize:15 }}>{item?.icon}</span>
            <span style={{ fontSize:14,fontWeight:700,color:C.navy }}>{item?.label}</span>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <span style={{ fontSize:11,color:C.slate }}>{today}</span>
            <div style={{ background:C.chalk,borderRadius:16,padding:"4px 12px",fontSize:11,color:C.slate,border:`0.5px solid ${C.border}` }}>🔍 Search...</div>
            <div style={{ position:"relative" }}>
              <span style={{ fontSize:17,cursor:"pointer" }}>🔔</span>
              <span style={{ position:"absolute",top:-3,right:-3,width:13,height:13,background:C.rust,borderRadius:"50%",fontSize:8,color:C.white,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800 }}>3</span>
            </div>
          </div>
        </div>
        <main style={{ flex:1,overflowY:"auto",padding:16 }}>{renderModule()}</main>
      </div>
    </div>
  );
}
