import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ---------------- MOCK DATA (replace with API later) ---------------- */
const MOCK_RECENT = [
  {
    date: "OCT 12",
    tag: "URGENT",
    id: "#TK-44291",
    title: "Course Registration Error: CSC-302",
    desc: "System prevents enrollment due to prerequisite mismatch...",
    status: "In Progress",
  },
  {
    date: "OCT 09",
    tag: "GENERAL",
    id: "#TK-44182",
    title: "ID Card Replacement Request",
    desc: "Lost original ID card during campus sports event....",
    status: "Resolved",
  },
];

/* ---------------- SIDEBAR ---------------- */
function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-56 bg-[#0d1b3e] flex flex-col min-h-screen flex-shrink-0">
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-[#DC143C] text-white flex items-center justify-center font-bold text-sm">
          AN
        </div>
        <div>
          <div className="text-white font-bold text-sm">Setu</div>
          <div className="text-white/40 text-[9px] tracking-widest">
            ACADEMIC AUTHORITY
          </div>
        </div>
      </div>

      <nav className="p-3 flex-1">
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 px-3 py-2.5 text-white text-sm cursor-pointer bg-[#DC143C]/20 border-l-[3px] border-[#DC143C]"
        >
          ⊞ Dashboard
        </div>

        <div
          onClick={() => navigate("/tickets")}
          className="flex items-center gap-2 px-3 py-2.5 text-white/60 text-sm cursor-pointer hover:text-white"
        >
          🎫 My Tickets
        </div>

        <button
          onClick={() => navigate("/new-ticket")}
          className="mt-4 w-full py-3 rounded-xl bg-[#DC143C] text-white font-bold text-sm hover:bg-[#a50e2d]"
        >
          + New Ticket
        </button>
      </nav>

      <div className="px-3 pb-3 border-t border-white/10 pt-4">
        <div className="px-3 py-2 text-white/60 text-sm cursor-pointer">
          ⚙ Settings
        </div>
        <div
          onClick={() => navigate("/login")}
          className="px-3 py-2 text-[#DC143C] text-sm cursor-pointer"
        >
          → Sign Out
        </div>
      </div>
    </aside>
  );
}

/* ---------------- TOP NAV ---------------- */
function TopNav() {
  return (
    <header className="flex justify-between px-8 h-14 bg-white border-b sticky top-0 z-10">
      <div className="flex gap-6 items-center">
        <span className="text-[#0d1b3e] font-bold border-b-2 border-[#DC143C]">
          Dashboard
        </span>
        <span className="text-gray-400">Tickets</span>
      </div>

      <div className="flex items-center gap-3">
        <input
          className="bg-gray-100 rounded-lg px-3 py-1 text-sm outline-none"
          placeholder="Search tickets..."
        />
        <div className="w-9 h-9 bg-[#0d1b3e] text-white rounded-full flex items-center justify-center text-xs">
          JT
        </div>
      </div>
    </header>
  );
}

/* ---------------- MAIN DASHBOARD ---------------- */
export default function Dashboard() {
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = { name: "Jeshika" }; // later from backend

  useEffect(() => {
    // 🔥 Replace with API later
    setTimeout(() => {
      setRecent(MOCK_RECENT);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f0f2f7] text-[#0d1b3e]">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <TopNav />

        <div className="p-10">
          {/* HEADER */}
          <h1 className="text-3xl font-bold">Welcome back,</h1>
          <h1 className="text-3xl font-bold text-[#DC143C] mb-6">
            {user.name}
          </h1>

          {/* STATS */}
          <div className="flex gap-4 mb-8">
            {[
              { label: "Total Tickets", value: "24" },
              { label: "Active", value: "03" },
              { label: "Resolved", value: "21" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white p-5 rounded-xl flex-1 shadow"
              >
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* RECENT */}
          <h2 className="text-lg font-bold mb-4">Recent Activity</h2>

          {loading ? (
            <p className="text-gray-500">Loading tickets...</p>
          ) : recent.length === 0 ? (
            <p className="text-gray-500">No tickets found</p>
          ) : (
            recent.map((r) => (
              <div
                key={r.id}
                className="bg-white p-4 rounded-xl mb-3 shadow hover:shadow-md cursor-pointer"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">{r.title}</p>
                    <p className="text-sm text-gray-500">{r.desc}</p>
                  </div>

                  <div className="text-sm">
                    <span
                      className={`px-2 py-1 rounded ${
                        r.status === "Resolved"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}