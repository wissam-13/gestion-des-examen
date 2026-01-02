import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../pages/Sidebar";

/* ==========================================
   TEMP USER
========================================== */
const currentUser = {
  role: "teacher", // student | teacher | responsable | admin
};

export default function Security() {
  const navigate = useNavigate();
  const role = currentUser.role;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 dark:bg-gray-900 transition-colors">

      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Content */}
      <main className="flex-1 p-12">
        <div className="max-w-3xl space-y-8">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/dashboard/parametres")}
              className="p-3 rounded-full bg-white/70 dark:bg-gray-700 shadow"
            >
              <ArrowLeft className="dark:text-gray-200"/>
            </button>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-yellow-200 dark:bg-gray-700">
                <ShieldCheck className="text-gray-700 dark:text-gray-200" />
              </div>
              <div>
                <h1 className="text-2xl font-bold dark:text-gray-100">
                  Sécurité du compte
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Gérez votre mot de passe et la sécurité
                </p>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white/70 dark:bg-gray-800 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6">

            {/* Username */}
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                IDENTIFIANT
              </label>
              <input
                type="text"
                value="utilisateur.exemple"
                disabled
                className="mt-1 w-full border bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-200 cursor-not-allowed"
              />
            </div>

            {/* Old Password */}
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                MOT DE PASSE ACTUEL
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full border px-4 py-3 rounded-lg
                           focus:ring-2 focus:ring-yellow-400 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                NOUVEAU MOT DE PASSE
              </label>
              <input
                type="password"
                placeholder="Nouveau mot de passe"
                className="mt-1 w-full border px-4 py-3 rounded-lg
                           focus:ring-2 focus:ring-yellow-400 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                CONFIRMER LE MOT DE PASSE
              </label>
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                className="mt-1 w-full border px-4 py-3 rounded-lg
                           focus:ring-2 focus:ring-yellow-400 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              />
            </div>

            {/* Save Button */}
            <button
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-400
                         text-white font-semibold py-3 rounded-xl
                         shadow-lg hover:scale-105 transition"
            >
              Mettre à jour le mot de passe
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
