import Sidebar from "../pages/Sidebar";

/* ==========================================
   TEMP USER (later from auth)
========================================== */
const currentUser = {
  role: "responsable",
};

/* ==========================================
   DATA (TEMP)
========================================== */
const modules = [
  "Management de projet",
  "Web Avancée",
  "Ingénierie des exigences",
  "Arduino",
];

const groupes = ["Group A", "Group B", "Group C"];

const selectedGroup = {
  name: "Group B",
  module: "Management de projet",
  members: 25,
  description: "Students of Grade 10 in Groupe B",
};

export default function ModulesGroupes() {
  const role = currentUser.role;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      
      {/* Sidebar (SAME CALL EVERYWHERE) */}
      <Sidebar role={role} />

      {/* Main content */}
      <main className="flex-1 p-12 space-y-8">
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-red-500 flex items-center gap-2">
          📄 Modules & Groupes
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
          
          {/* ================= MODULES LIST ================= */}
          <div className="bg-[#FFE8A3] rounded-3xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-yellow-400 px-4 py-1 rounded-full text-sm font-semibold">
                Modules list
              </span>
              <button className="text-xs bg-yellow-300 px-3 py-1 rounded-full">
                Add module
              </button>
            </div>

            <input
              type="text"
              placeholder="Search"
              className="w-full mb-4 px-4 py-2 rounded-xl outline-none"
            />

            <ul className="space-y-2">
              {modules.map((m, i) => (
                <li
                  key={i}
                  className="bg-yellow-100 px-4 py-2 rounded-xl text-sm"
                >
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* ================= GROUPES LIST ================= */}
          <div className="bg-[#FFE8A3] rounded-3xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-yellow-400 px-4 py-1 rounded-full text-sm font-semibold">
                Groupes List
              </span>
              <button className="text-xs bg-yellow-300 px-3 py-1 rounded-full">
                Add list
              </button>
            </div>

            <ul className="space-y-2">
              {groupes.map((g, i) => (
                <li
                  key={i}
                  className="bg-yellow-100 px-4 py-2 rounded-xl text-sm"
                >
                  {g}
                </li>
              ))}
            </ul>
          </div>

          {/* ================= GROUP DETAILS ================= */}
          <div className="bg-[#FFE8A3] rounded-3xl p-6 shadow-md">
            <h2 className="font-bold text-green-600 mb-4">
              {selectedGroup.name}
            </h2>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Module:</strong> {selectedGroup.module}
              </p>
              <p>
                <strong>Membres:</strong> {selectedGroup.members}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                <span className="text-red-500">
                  {selectedGroup.description}
                </span>
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-green-400 text-white py-2 rounded-xl">
                Edit
              </button>
              <button className="flex-1 bg-red-400 text-white py-2 rounded-xl">
                Delete
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
