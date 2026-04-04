import { useState } from "react";

const TICKETS = [
  { id: "#TIC-8492", icon: "✳", iconBg: "bg-red-100",   title: "Course Enrollment Error - CS302",    dept: "Registrar Office • Technical Support", status: "OPEN",        date: "Oct 24, 2023", ago: "2 HOURS AGO" },
  { id: "#TIC-8471", icon: "↻", iconBg: "bg-blue-100",  title: "Scholarship Disbursement Delay",     dept: "Financial Aid Office",                status: "IN PROGRESS", date: "Oct 22, 2023", ago: "2 DAYS AGO" },
  { id: "#TIC-8405", icon: "✔", iconBg: "bg-green-100", title: "Library Access Card Activation",     dept: "Campus Services",                     status: "RESOLVED",    date: "Oct 18, 2023", ago: "COMPLETED" },
  { id: "#TIC-8399", icon: "💬", iconBg: "bg-blue-100", title: "Transcript Request Inquiry",          dept: "Administrative Services",             status: "IN PROGRESS", date: "Oct 15, 2023", ago: "UPDATED YESTERDAY" },
];

const DEPARTMENTS = ["Admissions", "Enrollment", "Financial Aid", "Academic Affairs", "IT Support", "Student Services"];

const statusClass = (s) => {
  if (s === "OPEN")        return "bg-[#DC143C] text-white";
  if (s === "IN PROGRESS") return "bg-[#0d1b3e] text-white";
  if (s === "RESOLVED")    return "bg-green-500 text-white";
  return "";
};

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ page, setPage }) {
  return (
    <aside className="w-56 bg-[#0d1b3e] flex flex-col min-h-screen flex-shrink-0">
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-[#DC143C] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">AN</div>
        <div>
          <div className="text-white font-bold text-sm leading-tight">Academic Nexus</div>
          <div className="text-white/40 text-[9px] tracking-widest mt-0.5">ACADEMIC AUTHORITY</div>
        </div>
      </div>

      <nav className="p-3 flex-1">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-white/60 text-sm cursor-pointer mb-1 hover:text-white/90 transition-colors">
          <span className="w-5 text-center">⊞</span> Dashboard
        </div>
        <div
          onClick={() => setPage("tickets")}
          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm cursor-pointer mb-1 transition-colors ${page === "tickets" ? "bg-[#DC143C]/20 text-white border-l-[3px] border-[#DC143C]" : "text-white/60 hover:text-white/90"}`}
        >
          <span className="w-5 text-center">🎫</span> My Tickets
        </div>
        <button
          onClick={() => setPage("submit")}
          className="mt-4 w-full py-3 rounded-xl bg-[#DC143C] text-white font-bold text-sm cursor-pointer hover:bg-[#a50e2d] transition-colors"
        >
          + New Ticket
        </button>
      </nav>

      <div className="px-3 pb-3 border-t border-white/10 pt-4">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-white/60 text-sm cursor-pointer hover:text-white/90 transition-colors">⚙ Settings</div>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[#DC143C] text-sm cursor-pointer hover:opacity-80 transition-opacity">→ Sign Out</div>
      </div>
    </aside>
  );
}

// ─── TOP NAV ─────────────────────────────────────────────────────────────────
function TopNav({ page, setPage }) {
  return (
    <header className="flex items-center justify-between px-8 h-14 bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="flex gap-7">
        <span className="text-gray-400 text-sm cursor-pointer hover:text-gray-600 transition-colors">Dashboard</span>
        <span className="text-[#0d1b3e] font-bold text-sm cursor-pointer border-b-2 border-[#DC143C] pb-0.5">Tickets</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5 w-48">
          <span className="text-gray-400 text-sm">🔍</span>
          <input className="bg-transparent outline-none text-sm text-[#0d1b3e] w-full placeholder-gray-400" placeholder="Search resources..." />
        </div>
        <button className="border border-gray-200 rounded-lg w-9 h-9 text-sm hover:bg-gray-50 transition-colors">🔔</button>
        <button className="border border-gray-200 rounded-lg w-9 h-9 text-sm hover:bg-gray-50 transition-colors">?</button>
        <div className="w-9 h-9 rounded-full bg-[#0d1b3e] text-white flex items-center justify-center text-xs font-bold">MC</div>
      </div>
    </header>
  );
}

// ─── MY TICKETS ───────────────────────────────────────────────────────────────
function MyTickets({ setPage }) {
  const [filter, setFilter] = useState("All Tickets");
  const filters = ["All Tickets", "Open", "In Progress", "Resolved"];

  const filtered = TICKETS.filter((t) => {
    if (filter === "All Tickets") return true;
    if (filter === "Open")        return t.status === "OPEN";
    if (filter === "In Progress") return t.status === "IN PROGRESS";
    if (filter === "Resolved")    return t.status === "RESOLVED";
    return true;
  });

  return (
    <div className="p-10 pb-16">
      <h1 className="text-4xl font-bold text-[#0d1b3e] mb-2">My Tickets</h1>
      <p className="text-sm text-gray-500 font-sans leading-relaxed mb-8 max-w-2xl">
        Track and manage your academic support requests. Our curators are here to ensure your educational journey remains fluid.
      </p>

      {/* Stats */}
      <div className="flex gap-4 mb-8">
        {[
          { icon: "📋", bg: "bg-blue-100",  value: "04", label: "ACTIVE TICKETS",  val: "text-[#0d1b3e]" },
          { icon: "✔",  bg: "bg-green-100", value: "12", label: "RESOLVED",         val: "text-[#0d1b3e]" },
          { icon: "!",  bg: "bg-red-100",   value: "01", label: "REQUIRES ACTION",  val: "text-[#DC143C]" },
        ].map((st) => (
          <div key={st.label} className="flex-1 bg-white rounded-2xl px-6 py-4 flex items-center gap-4 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${st.bg} flex items-center justify-center text-lg flex-shrink-0`}>{st.icon}</div>
            <div>
              <p className={`text-3xl font-bold ${st.val}`}>{st.value}</p>
              <p className="text-[11px] text-gray-400 font-sans tracking-widest">{st.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-5 bg-blue-100/60 rounded-xl p-1 w-fit">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-sans cursor-pointer transition-all ${
              filter === f
                ? "bg-white text-[#0d1b3e] font-bold shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Ticket List */}
      <div className="flex flex-col gap-3">
        {filtered.map((t) => (
          <div key={t.id} className="bg-white rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <p className="text-xs text-gray-400 font-sans min-w-[80px]">{t.id}</p>
            <div className={`w-10 h-10 rounded-xl ${t.iconBg} flex items-center justify-center text-base flex-shrink-0`}>{t.icon}</div>
            <div className="flex-1">
              <p className="font-bold text-sm text-[#0d1b3e] mb-0.5">{t.title}</p>
              <p className="text-xs text-gray-400 font-sans">{t.dept}</p>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold font-sans whitespace-nowrap ${statusClass(t.status)}`}>{t.status}</span>
            <div className="text-right min-w-[110px]">
              <p className="text-sm font-semibold text-[#0d1b3e] font-sans">{t.date}</p>
              <p className="text-[11px] text-gray-400 font-sans">{t.ago}</p>
            </div>
            <span className="text-gray-300 text-xl ml-2">›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SUBMIT TICKET ────────────────────────────────────────────────────────────
function SubmitTicket() {
  const [title, setTitle]       = useState("");
  const [dept, setDept]         = useState("");
  const [priority, setPriority] = useState("Medium");
  const [desc, setDesc]         = useState("");
  const [files, setFiles]       = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (incoming) => setFiles((f) => [...f, ...Array.from(incoming)]);
  const removeFile  = (i) => setFiles(files.filter((_, idx) => idx !== i));

  const handleSubmit = () => {
    if (!title || !dept || !desc) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setTitle(""); setDept(""); setPriority("Medium"); setDesc(""); setFiles([]);
  };

  const canSubmit = title && dept && desc;

  return (
    <div className="p-10 pb-16 max-w-3xl">
      {/* Badge */}
      <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3.5 py-1 text-[11px] font-bold tracking-widest text-[#0d1b3e] font-sans">
        ⚡ SUPPORT CENTER
      </span>

      <h1 className="text-4xl font-bold text-[#0d1b3e] mt-3 mb-2">Submit Ticket</h1>
      <p className="text-sm text-gray-500 font-sans leading-relaxed mb-8 max-w-lg">
        Our dedicated academic support team is here to assist you. Complete the form below and we will route your inquiry to the appropriate department.
      </p>

      {/* Success Toast */}
      {submitted && (
        <div className="bg-[#0d1b3e] text-white px-5 py-3.5 rounded-xl mb-5 text-sm font-sans border-l-4 border-[#DC143C]">
          ✓ Ticket submitted successfully! We'll be in touch soon.
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-2xl px-10 py-9 shadow-md mb-6">

        {/* Title */}
        <div className="mb-6">
          <label className="block text-[11px] font-bold tracking-widest text-gray-400 font-sans mb-2">TITLE</label>
          <input
            className="w-full px-4 py-3 rounded-lg border-[1.5px] border-gray-200 bg-gray-50 text-sm text-[#0d1b3e] font-sans outline-none focus:border-[#DC143C] transition-colors"
            placeholder="Brief summary of your issue"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Dept + Priority */}
        <div className="flex gap-5 mb-6">
          <div className="flex-1">
            <label className="block text-[11px] font-bold tracking-widest text-gray-400 font-sans mb-2">DEPARTMENT</label>
            <select
              className="w-full px-4 py-3 rounded-lg border-[1.5px] border-gray-200 bg-gray-50 text-sm text-[#0d1b3e] font-sans outline-none focus:border-[#DC143C] transition-colors appearance-none cursor-pointer"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-[11px] font-bold tracking-widest text-gray-400 font-sans mb-2">PRIORITY LEVEL</label>
            <div className="flex rounded-lg border-[1.5px] border-gray-200 overflow-hidden">
              {["Low", "Medium", "High"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-3 text-sm font-sans border-r border-gray-200 last:border-0 cursor-pointer transition-colors ${
                    priority === p ? "bg-[#0d1b3e] text-white font-bold" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-[11px] font-bold tracking-widest text-gray-400 font-sans mb-2">DETAILED DESCRIPTION</label>
          <textarea
            className="w-full px-4 py-3 rounded-lg border-[1.5px] border-gray-200 bg-gray-50 text-sm text-[#0d1b3e] font-sans outline-none focus:border-[#DC143C] transition-colors resize-y min-h-[130px] leading-relaxed"
            placeholder="Please provide as much detail as possible..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        {/* Attachments */}
        <div className="mb-6">
          <label className="block text-[11px] font-bold tracking-widest text-gray-400 font-sans mb-2">ATTACHMENTS</label>
          <div
            className={`border-2 border-dashed rounded-xl py-9 px-5 text-center cursor-pointer transition-colors ${
              dragging ? "border-[#DC143C] bg-red-50" : "border-gray-300 bg-gray-50 hover:border-gray-400"
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
            onClick={() => document.getElementById("fileIn").click()}
          >
            <input id="fileIn" type="file" multiple accept=".pdf,.png,.jpg" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
            <div className="text-3xl mb-2">📄</div>
            <p className="font-semibold text-sm text-[#0d1b3e] font-sans">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-400 font-sans mt-1">PDF, PNG, JPG (Max 10MB)</p>
          </div>

          {files.length > 0 && (
            <div className="mt-3 flex flex-col gap-1.5">
              {files.map((f, i) => (
                <div key={i} className="flex justify-between items-center bg-gray-100 rounded-lg px-3 py-2">
                  <span className="text-sm text-[#0d1b3e] font-sans">📎 {f.name}</span>
                  <button onClick={() => removeFile(i)} className="text-[#DC143C] font-bold text-sm cursor-pointer hover:opacity-70 transition-opacity bg-transparent border-0">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className={`px-8 py-3.5 rounded-xl bg-[#DC143C] text-white font-bold text-[15px] font-sans transition-colors ${
            canSubmit ? "cursor-pointer hover:bg-[#a50e2d]" : "opacity-60 cursor-not-allowed"
          }`}
        >
          Submit Ticket &nbsp;➜
        </button>
      </div>

      {/* Help Banner */}
      <div className="bg-white rounded-2xl px-6 py-5 flex items-start gap-4 shadow-sm">
        <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">💬</div>
        <div>
          <p className="font-bold text-[15px] text-[#0d1b3e] mb-1">Need immediate assistance?</p>
          <p className="text-sm text-gray-500 font-sans">
            Check our Knowledge Base for quick answers to common questions about admissions, enrollment, and technical troubleshooting before submitting a ticket.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function Tickets() {
  const [page, setPage] = useState("tickets");

  return (
    <div className="flex min-h-screen font-serif bg-[#f0f2f7] text-[#0d1b3e]">
      <Sidebar page={page} setPage={setPage} />
      <main className="flex-1 flex flex-col min-h-screen">
        <TopNav page={page} setPage={setPage} />
        {page === "tickets" && <MyTickets setPage={setPage} />}
        {page === "submit"  && <SubmitTicket />}
      </main>
    </div>
  );
}