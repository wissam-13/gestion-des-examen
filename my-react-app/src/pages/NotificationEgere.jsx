import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Sidebar from "../pages/Sidebar";

/* ==========================================
   TEMP USER
========================================== */
const currentUser = {
  role: "responsable",
};

/* ==========================================
   TEMP NOTIFICATION PERMISSIONS
========================================== */
const initialPermissions = {
  newExam: true,
  examChange: true,
  teacherFeedback: false,
  groupUpdates: true,
  salleChanges: false,
  systemAnnouncements: true,
};

const labels = {
  newExam: "Nouveaux examens",
  examChange: "Changements dans les examens",
  teacherFeedback: "Feedback des enseignants",
  groupUpdates: "Mises à jour des groupes",
  salleChanges: "Changements de salle",
  systemAnnouncements: "Annonces système",
};

export default function NotificationEgere() {
  const role = currentUser.role;
  const [permissions, setPermissions] = useState(initialPermissions);

  const togglePermission = (key) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <Sidebar role={role} />

      <main className="flex-1 p-12 space-y-8">
        <div className="flex items-center gap-4 mb-6">
          <ArrowLeft className="text-gray-700" />
          <h1 className="text-2xl font-bold text-gray-800">NotificationEgere</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.keys(permissions).map((key) => (
            <div
              key={key}
              onClick={() => togglePermission(key)}
              className="cursor-pointer bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 flex items-center justify-between hover:scale-[1.02] transition"
            >
              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-800">{labels[key]}</h3>
                <p className="text-sm text-gray-600">Recevoir ou non ce type de notification</p>
              </div>
              <input
                type="checkbox"
                checked={permissions[key]}
                onChange={() => togglePermission(key)}
                className="w-6 h-6 accent-orange-400"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-3 bg-orange-400 text-white rounded-xl shadow hover:bg-orange-500 transition">
            Sauvegarder les permissions
          </button>
        </div>
      </main>
    </div>
  );
}
