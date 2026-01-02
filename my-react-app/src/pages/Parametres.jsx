import logo from "../assets/logo.png";
import { ArrowLeft, Lock, Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

/* ==========================================
   TEMP USER
========================================== */
const currentUser = {
  role: "teacher", // student | teacher | responsable | admin
};

export default function Parametres() {
  const navigate = useNavigate();
  const role = currentUser.role;

  const settings = [
    {
      icon: <Lock />,
      title: "Sécurité",
      desc: "Changer le mot de passe",
    },
    {
      icon: <Bell />,
      title: "Notifications",
      desc: "Gérer les alertes",
    },
  ];

  // ✅ Logout function
  const handleLogout = () => {
    // Clear user info (or token if using localStorage)
    localStorage.removeItem("currentUser"); // example
    // redirect to login
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">

      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main */}
      <main className="flex-1 p-12">
        <div className="max-w-5xl space-y-8">

          {/* Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-3 rounded-full bg-white/70 shadow hover:scale-110 transition"
            >
              <ArrowLeft />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Paramètres</h1>
              <p className="text-sm text-gray-600">Configurer votre application</p>
            </div>
          </div>

          {/* Settings Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {settings.map((s, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6
                  flex items-center justify-between hover:scale-[1.02] transition cursor-pointer"
                onClick={() => {
                  if (s.title === "Sécurité") navigate("/dashboard/parametres/security");
                  else if (s.title === "Notifications") navigate("/dashboard/notificationegere");
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-400 to-yellow-400 text-white">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{s.title}</h3>
                    <p className="text-sm text-gray-600">{s.desc}</p>
                  </div>
                </div>
                <span className="text-gray-400">›</span>
              </div>
            ))}
          </div>

          {/* Logout */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6
            flex items-center justify-between hover:bg-red-50 transition">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-500 text-white">
                <LogOut />
              </div>
              <div>
                <h3 className="font-semibold text-red-600">Déconnexion</h3>
                <p className="text-sm text-red-500">Quitter la session</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
