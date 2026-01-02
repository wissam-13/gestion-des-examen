import Sidebar from "../pages/Sidebar";

/* ==========================================
   TEMP USER
========================================== */
const currentUser = { role: "responsable" };

/* ==========================================
   GUIDE STEPS
========================================== */
const guideSteps = [
  { title: "Se connecter", desc: "Allez sur la page d’authentification et utilisez vos identifiants pour accéder au tableau de bord." },
  { title: "Paramètres", desc: "Accédez à Paramètres pour gérer votre profil et vos préférences, comme les notifications." },
  { title: "Gérer les notifications", desc: "Dans NotificationEgere, choisissez quelles notifications vous souhaitez recevoir." },
  { title: "Consulter les examens", desc: "Cliquez sur Examens pour voir les horaires, les détails et les changements éventuels." },
  { title: "Gestion des utilisateurs et groupes", desc: "Dans Utilisateurs et Les groupes, vous pouvez voir les membres et leurs informations." },
  { title: "Déconnexion", desc: "Pour quitter votre session, utilisez le bouton Déconnexion dans Paramètres." },
];

export default function UserGuide() {
  const role = currentUser.role;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <Sidebar role={role} />

      <main className="flex-1 p-12 space-y-8">
        <h1 className="text-2xl font-bold text-red-500 flex items-center gap-2">📖 Guide d'utilisation</h1>

        <div className="space-y-6 max-w-4xl">
          {guideSteps.map((step, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 hover:scale-[1.01] transition">
              <h3 className="font-semibold text-gray-800 text-lg">Étape {index + 1}: {step.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
