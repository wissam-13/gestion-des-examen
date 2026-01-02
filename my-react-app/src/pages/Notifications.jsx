import logo from "../assets/logo.png";
import { Bell, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

/* ==========================================
   TEMP USER
========================================== */
const currentUser = {
  role: "teacher", // student | teacher | responsable | admin
};

/* ==========================================
   TEMP NOTIFICATIONS DATA
========================================== */
const notifications = [
  { id: 1, title: "Nouvel examen ajouté", desc: "L’examen de Réseaux a été programmé.", time: "Il y a 2h", read: false },
  { id: 2, title: "Salle modifiée", desc: "La salle B12 a été changée.", time: "Hier", read: true },
  { id: 3, title: "Utilisateur ajouté", desc: "Un nouvel enseignant a été ajouté.", time: "2 jours", read: true },
];

export default function Notifications() {
  const navigate = useNavigate();
  const role = currentUser.role;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">

      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Content */}
      <main className="flex-1 p-12 animate-[fadeUp_0.6s_ease-out]">
        <div className="max-w-4xl space-y-8">

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-3 rounded-full bg-white/70 shadow hover:scale-110 transition"
            >
              <ArrowLeft className="text-gray-700" />
            </button>
            <Bell className="text-orange-500" size={28} />
            <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`relative flex items-start gap-5 p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-md transition hover:shadow-xl ${!n.read ? "border-l-4 border-orange-400" : ""}`}
              >
                <div className="text-3xl">🔔</div>
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800">{n.title}</h2>
                  <p className="text-sm text-gray-600">{n.desc}</p>
                  <span className="text-xs text-gray-400">{n.time}</span>
                </div>
                {n.read && <CheckCircle className="text-green-500" />}
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Animations */}
      <style>{`
        @keyframes fadeUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
