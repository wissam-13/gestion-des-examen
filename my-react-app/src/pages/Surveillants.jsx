import { useState } from "react";
import Sidebar from "../pages/Sidebar";

/* ==========================================
   TEMP USER
========================================== */
const currentUser = {
  role: "teacher", // student | teacher | responsable | admin
};

/* ==========================================
   INITIAL DATA
========================================== */
const initialSurveillants = [
  { exam: "Web Application", salle: "N001", surveillant: "Merzouga & Etchiali" },
  { exam: "Web Application", salle: "N002", surveillant: "Benammar Med" },
  { exam: "Web Application", salle: "N003", surveillant: "Amraoui" },
  { exam: "System Exploitation", salle: "N001", surveillant: "Benammar Med" },
];

export default function Surveillants() {
  const role = currentUser.role;

  const [surveillants, setSurveillants] = useState(initialSurveillants);

  const [newExam, setNewExam] = useState("");
  const [newSalle, setNewSalle] = useState("");
  const [newProf, setNewProf] = useState("");

  const [validated, setValidated] = useState(false);

  const canEdit = role === "responsable" || role === "admin";

  /* ==========================================
     HANDLERS
  ========================================== */
  const handleAdd = () => {
    if (!newExam || !newSalle || !newProf) return;
    setSurveillants([
      ...surveillants,
      { exam: newExam, salle: newSalle, surveillant: newProf },
    ]);
    setNewExam("");
    setNewSalle("");
    setNewProf("");
  };

  const handleDelete = (index) => {
    const updated = surveillants.filter((_, i) => i !== index);
    setSurveillants(updated);
  };

  const handleAutoAssign = () => {
    const salles = ["N001", "N002", "N003", "N004"];
    const profs = ["Merzouga & Etchiali", "Benammar Med", "Amraoui"];
    const updated = surveillants.map((row) => ({
      ...row,
      salle: salles[Math.floor(Math.random() * salles.length)],
      surveillant: profs[Math.floor(Math.random() * profs.length)],
    }));
    setSurveillants(updated);
  };

  const handleValidate = () => {
    setValidated(true);
    alert("Surveillants validated ✅");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Content */}
      <main className="flex-1 p-12 space-y-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          📷 Surveillants
        </h1>

        {/* Only show controls if responsable/admin */}
        {canEdit && (
          <div className="flex flex-wrap items-center gap-4">
            <input
              placeholder="Examen"
              value={newExam}
              onChange={(e) => setNewExam(e.target.value)}
              className="px-4 py-2 rounded-xl bg-yellow-100 outline-none"
            />
            <input
              placeholder="Salle"
              value={newSalle}
              onChange={(e) => setNewSalle(e.target.value)}
              className="px-4 py-2 rounded-xl bg-yellow-100 outline-none"
            />
            <input
              placeholder="Prof"
              value={newProf}
              onChange={(e) => setNewProf(e.target.value)}
              className="px-4 py-2 rounded-xl bg-yellow-100 outline-none"
            />
            <button
              onClick={handleAdd}
              className="bg-yellow-400 text-white px-4 py-2 rounded-xl font-semibold"
            >
              + Ajouter
            </button>
            <button
              onClick={handleAutoAssign}
              className="bg-yellow-300 px-4 py-2 rounded-xl font-semibold"
            >
              Auto Assign
            </button>
          </div>
        )}

        {/* Table */}
        <div className="bg-white/70 rounded-3xl shadow-md overflow-hidden max-w-5xl">
          <table className="w-full text-sm">
            <thead className="bg-yellow-100">
              <tr>
                <th className="text-left px-6 py-3">Examen</th>
                <th className="text-left px-6 py-3">Salle</th>
                <th className="text-left px-6 py-3">Surveillant</th>
                {canEdit && <th className="text-center px-6 py-3">Action</th>}
              </tr>
            </thead>
            <tbody>
              {surveillants.map((row, i) => (
                <tr key={i} className="border-t">
                  <td className="px-6 py-3">{row.exam}</td>
                  <td className="px-6 py-3">{row.salle}</td>
                  <td className="px-6 py-3">{row.surveillant}</td>
                  {canEdit && (
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => handleDelete(i)}
                        className="text-red-500 font-bold"
                      >
                        🗑
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Validate Button only for responsable/admin */}
        {canEdit && (
          <button
            onClick={handleValidate}
            className={`px-10 py-3 rounded-xl font-semibold ${
              validated ? "bg-green-400 text-white cursor-not-allowed" : "bg-yellow-400"
            }`}
            disabled={validated}
          >
            {validated ? "Validé ✅" : "Valider"}
          </button>
        )}
      </main>
    </div>
  );
}
