import { useState } from "react";
import Sidebar from "../pages/Sidebar";

/* ==========================================
   TEMP USER (CHANGE ROLE TO TEST)
========================================== */
const currentUser = {
  role: "student", 
  // student | teacher | responsable | admin
}

export default function EmploiDuTemps() {
  const role = currentUser.role;

  /* ==========================================
     STATE
  ========================================== */
  const [status, setStatus] = useState("EN_ATTENTE"); 
  // EN_ATTENTE | APPROUVÉ | REFUSÉ

  const [emploiDuTemps, setEmploiDuTemps] = useState([
    {
      day: "Dimanche",
      date: "05/01/2026",
      sessions: [
        { time: "09H–10H30", title: "IA" },
        { time: "11H–12H30", title: "Anglais" },
      ],
    },
  ]);

  const [signalements, setSignalements] = useState([]);
  const [showSignalForm, setShowSignalForm] = useState(false);
  const [signalText, setSignalText] = useState("");

  const [newDay, setNewDay] = useState("");
  const [newDate, setNewDate] = useState("");

  /* ==========================================
     PERMISSIONS (FIXED)
  ========================================== */
  const canSignal =
    role === "teacher" && (status === "APPROUVÉ" || status === "EN_ATTENTE");

  const canEdit =
    role === "responsable" && status !== "APPROUVÉ";

  const canApprove =
    role === "admin" && status === "EN_ATTENTE";

  /* ==========================================
     ACTIONS
  ========================================== */
  const handleSignal = () => {
    if (!signalText.trim()) return;

    setSignalements((prev) => [
      ...prev,
      {
        message: signalText,
        by: "Teacher",
        date: new Date().toLocaleString(),
      },
    ]);

    setSignalText("");
    setShowSignalForm(false);
  };

  const addNewDay = () => {
    if (!newDay || !newDate) return;

    setEmploiDuTemps((prev) => [
      ...prev,
      {
        day: newDay,
        date: newDate,
        sessions: [],
      },
    ]);

    setNewDay("");
    setNewDate("");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      
      {/* ✅ SIDEBAR (ROLE PASSED CORRECTLY) */}
      <Sidebar role={role} />

      <main className="flex-1 p-12 space-y-8">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-red-500">
            📄 Emploi du Temps
          </h1>

          <span className="px-4 py-1 rounded-full bg-gray-200 font-semibold">
            Statut : {status}
          </span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 flex-wrap">

          {canSignal && (
            <button
              onClick={() => setShowSignalForm(true)}
              className="bg-red-500 text-white px-6 py-2 rounded-xl font-semibold"
            >
              🚨 Signaler une erreur
            </button>
          )}

          {canApprove && (
            <>
              <button
                onClick={() => setStatus("APPROUVÉ")}
                className="bg-green-500 text-white px-6 py-2 rounded-xl font-semibold"
              >
                ✅ Approuver
              </button>

              <button
                onClick={() => setStatus("REFUSÉ")}
                className="bg-gray-500 text-white px-6 py-2 rounded-xl font-semibold"
              >
                ❌ Refuser
              </button>
            </>
          )}
        </div>

        {/* RESPONSABLE CREATE / EDIT */}
        {canEdit && (
          <div className="bg-white p-6 rounded-2xl shadow max-w-xl space-y-4">
            <h2 className="font-bold text-lg">
              ➕ Ajouter une journée
            </h2>

            <input
              className="w-full border p-2 rounded"
              placeholder="Jour (ex: Lundi)"
              value={newDay}
              onChange={(e) => setNewDay(e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              placeholder="Date (ex: 06/01/2026)"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />

            <button
              onClick={addNewDay}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold"
            >
              Ajouter
            </button>
          </div>
        )}

        {/* EMPLOI DU TEMPS */}
        <div className="space-y-6 max-w-5xl">
          {emploiDuTemps.map((day, i) => (
            <div
              key={i}
              className="bg-[#FFE8A3] rounded-3xl p-6 shadow-md"
            >
              <div className="flex gap-4 mb-4">
                <span className="bg-yellow-400 px-4 py-1 rounded-full font-semibold">
                  {day.day}
                </span>
                <span className="text-gray-600">
                  {day.date}
                </span>
              </div>

              {day.sessions.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Aucune séance
                </p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {day.sessions.map((s, idx) => (
                    <div
                      key={idx}
                      className="bg-yellow-100 rounded-xl p-4 text-center"
                    >
                      <p className="text-red-500 font-semibold">
                        {s.time}
                      </p>
                      <p>{s.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SIGNAL FORM */}
        {showSignalForm && (
          <div className="bg-white p-6 rounded-2xl shadow max-w-xl space-y-4">
            <h2 className="font-bold">
              🚨 Signaler une erreur
            </h2>

            <textarea
              className="w-full border p-2 rounded"
              placeholder="Décris le problème (conflit, salle, horaire...)"
              value={signalText}
              onChange={(e) => setSignalText(e.target.value)}
            />

            <div className="flex gap-4">
              <button
                onClick={handleSignal}
                className="bg-red-500 text-white px-4 py-2 rounded-xl"
              >
                Envoyer
              </button>

              <button
                onClick={() => setShowSignalForm(false)}
                className="bg-gray-300 px-4 py-2 rounded-xl"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* SIGNAL LIST (ADMIN & RESPONSABLE) */}
        {(role === "admin" || role === "responsable") &&
          signalements.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow max-w-4xl">
              <h2 className="font-bold mb-4">
                📢 Signalements
              </h2>

              {signalements.map((s, i) => (
                <div key={i} className="border-b py-2">
                  <p>{s.message}</p>
                  <span className="text-xs text-gray-500">
                    {s.by} – {s.date}
                  </span>
                </div>
              ))}
            </div>
          )}

      </main>
    </div>
  );
}
