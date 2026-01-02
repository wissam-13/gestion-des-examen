import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Sidebar";

/* ==========================================
   TEMP USER (later from auth)
========================================== */
const currentUser = {
  role: "responsable",
};

/* ==========================================
   DASHBOARD CARDS PER ROLE
========================================== */
const dashboardByRole = {
  student: [
    { title: "Examens validés", value: "04", icon: "📄" },
    { title: "Contrôles cette semaine", value: "03", icon: "📅" },
    { title: "Moyenne générale", value: "12.34", icon: "📊" },
  ],

  teacher: [
    { title: "Examens surveillés", value: "04", icon: "📄" },
    { title: "Conflits détectés", value: "10", icon: "⚠️" },
    { title: "Examens validés", value: "02", icon: "✅" },
    { title: "Examens non validés", value: "06", icon: "❌" },
  ],

  admin: [
    { title: "Examens surveillés", value: "04", icon: "📄" },
    { title: "Examens ajoutés", value: "02", icon: "📝" },
    { title: "Propositions en attente", value: "06", icon: "⏳" },
  ],

  responsable: [
    { title: "Salles disponibles", value: "04", icon: "🚪" },
    { title: "Conflits détectés", value: "10", icon: "⚠️" },
    { title: "Examens planifiés", value: "02", icon: "📆" },
    { title: "Surveillants libres", value: "06", icon: "👨‍🏫" },
  ],
};

export default function Dashboard() {
  const role = currentUser.role;
  const cards = dashboardByRole[role];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      
      {/* Sidebar (REUSED EVERYWHERE) */}
      <Sidebar role={role} />

      {/* Main content */}
      <main className="flex-1 p-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex items-center justify-between
                bg-white/70 px-8 py-6 rounded-2xl shadow-md"
            >
              <div className="flex items-center gap-5">
                <div className="text-3xl">{card.icon}</div>
                <span className="font-semibold">{card.title}</span>
              </div>

              <div
                className="w-14 h-14 rounded-full flex items-center justify-center
                  font-bold text-lg"
                style={{ backgroundColor: "#FFE8A3" }}
              >
                {card.value}
              </div>
            </div>
          ))}
        </div>

        <Outlet />
      </main>
    </div>
  );
}
