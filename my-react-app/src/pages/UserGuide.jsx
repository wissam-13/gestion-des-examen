import { useNavigate } from "react-router-dom";
import Sidebar from "../pages/Sidebar";

/* ==========================================
   TEMP USER
========================================== */
const currentUser = {
  role: "teacher", // student | teacher | responsable | admin
};

/* ==========================================
   GUIDE DATA
========================================== */
const guideSteps = [
  {
    title: "Se connecter",
    desc: "Allez sur la page d’authentification et utilisez vos identifiants pour accéder au tableau de bord.",
  },
  {
    title: "Paramètres",
    desc: "Accédez à Paramètres pour gérer votre profil et vos préférences, comme les notifications.",
  },
  {
    title: "Gérer les notifications",
    desc: "Dans NotificationEgere, choisissez quelles notifications vous souhaitez recevoir.",
  },
  {
    title: "Consulter les examens",
    desc: "Cliquez sur Examens pour voir les horaires, les détails et les changements éventuels.",
  },
  {
    title: "Gestion des utilisateurs et groupes",
    desc: "Dans Utilisateurs et Les groupes, vous pouvez voir les membres et leurs informations.",
  },
  {
    title: "Déconnexion",
    desc: "Pour quitter votre session, utilisez le bouton Déconnexion dans Paramètres.",
  },
];

export default function UserGuide() {
  const navigate = useNavigate();
  const role = currentUser.role;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Content */}
      <main className="flex-1 p-12 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard/parametres")}
            className="p-3 rounded-full bg-white/70 shadow hover:scale-110 transition"
          >
            ←
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Guide d'utilisation</h1>
            <p className="text-sm text-gray-600">Découvrez comment utiliser toutes les fonctionnalités du site</p>
          </div>
        </div>

        {/* Guide steps */}
        <div className="space-y-6">
          {guideSteps.map((step, index) => (
            <div
              key={index}
              className="bg-white/70 rounded-2xl shadow-md p-6 hover:scale-[1.01] transition"
            >
              <h3 className="font-semibold text-gray-800 text-lg">
                Étape {index + 1}: {step.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
