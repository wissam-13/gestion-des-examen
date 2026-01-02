import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, HelpCircle, MessageCircle } from "lucide-react";
import Sidebar from "../pages/Sidebar";

/* ==========================================
   TEMP USER
========================================== */
const currentUser = { role: "responsable" };

/* ==========================================
   HELP CARDS (without Support technique)
========================================== */
const helpCards = [
  { icon: <BookOpen />, title: "Guide d’utilisation", desc: "Apprendre à utiliser l’application", route: "/dashboard/userguide" },
  { icon: <HelpCircle />, title: "Questions fréquentes", desc: "Réponses aux problèmes courants", route: "/dashboard/faq" },
  { icon: <MessageCircle />, title: "Nous contacter", desc: "Envoyer un message ou une suggestion", route: "/dashboard/contact" },
];

export default function Aide() {
  const navigate = useNavigate();
  const role = currentUser.role;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main content */}
      <main className="flex-1 p-12 animate-[fadeUp_0.6s_ease-out]">
        <div className="max-w-5xl space-y-10">

          {/* Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-3 rounded-full bg-white/70 shadow hover:scale-110 transition"
            >
              <ArrowLeft />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Aide & Support</h1>
              <p className="text-sm text-gray-600">Besoin d’aide ? On est là pour toi 👋</p>
            </div>
          </div>

          {/* Help Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {helpCards.map((h, i) => (
              <div
                key={i}
                onClick={() => navigate(h.route)}
                className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 flex items-center justify-between hover:scale-[1.02] transition cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-400 to-yellow-400 text-white">
                    {h.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{h.title}</h3>
                    <p className="text-sm text-gray-600">{h.desc}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-xl">›</span>
              </div>
            ))}
          </div>

          <div className="text-center text-sm text-gray-600">
            Si vous ne trouvez pas la réponse à votre problème, n’hésitez pas à contacter le support technique 💛
          </div>
        </div>

        {/* Animations */}
        <style>{`
          @keyframes fadeUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>
      </main>
    </div>
  );
}
