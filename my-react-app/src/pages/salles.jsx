import { useState } from "react";
import Sidebar from "./Sidebar";

/* ==========================================
   TEMP USER (later from auth)
========================================== */
const currentUser = {
  role: "responsable", // student | teacher | responsable | admin
};

export default function Salles() {
  const role = currentUser.role;
  const canManage = role === "responsable";

  /* ==========================================
     STATE
  ========================================== */
  const [salles, setSalles] = useState([
    { name: "Salle N001", capacite: 30, etat: "vide", exam: null },
    { name: "Salle N002", capacite: 40, etat: "occupée", exam: "Math" },
    { name: "Salle N003", capacite: 25, etat: "vide", exam: null },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCapacite, setNewCapacite] = useState("");

  /* ==========================================
     ACTIONS
  ========================================== */
  const assignExam = (index) => {
    const examName = prompt("Nom de l'examen ?");
    if (!examName) return;

    const updated = [...salles];
    updated[index] = {
      ...updated[index],
      etat: "occupée",
      exam: examName,
    };

    setSalles(updated);
  };

  const addSalle = () => {
    if (!newName || !newCapacite) return;

    setSalles([
      ...salles,
      {
        name: newName,
        capacite: newCapacite,
        etat: "vide",
        exam: null,
      },
    ]);

    setNewName("");
    setNewCapacite("");
    setShowAddForm(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <Sidebar role={role} />

      <main className="flex-1 p-12 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">🚪 Salles</h1>

          {canManage && (
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-xl font-semibold"
            >
              ➕ Ajouter une salle
            </button>
          )}
        </div>

        {/* ADD SALLE FORM */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-2xl shadow max-w-md space-y-4">
            <h2 className="font-bold">Nouvelle salle</h2>

            <input
              className="w-full border p-2 rounded"
              placeholder="Nom de la salle"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              placeholder="Capacité"
              type="number"
              value={newCapacite}
              onChange={(e) => setNewCapacite(e.target.value)}
            />

            <div className="flex gap-4">
              <button
                onClick={addSalle}
                className="bg-green-500 text-white px-4 py-2 rounded-xl"
              >
                Ajouter
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 px-4 py-2 rounded-xl"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* SALLES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salles.map((salle, i) => (
            <div
              key={i}
              className="bg-white/70 rounded-3xl p-6 shadow flex flex-col gap-4"
            >
              <div className="flex justify-between">
                <h2 className="font-semibold">{salle.name}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    salle.etat === "vide"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {salle.etat}
                </span>
              </div>

              <p>Capacité : {salle.capacite}</p>

              {salle.exam && (
                <p className="text-sm text-gray-600">
                  📘 Examen : <strong>{salle.exam}</strong>
                </p>
              )}

              {canManage && salle.etat === "vide" && (
                <button
                  onClick={() => assignExam(i)}
                  className="mt-auto bg-blue-500 text-white py-2 rounded-xl font-semibold"
                >
                  ➕ Assigner à un examen
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
