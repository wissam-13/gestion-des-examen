import { useState } from "react";
import { ArrowLeft, Trash2, Plus, CheckCircle, XCircle, X } from "lucide-react";
import Sidebar from "../pages/Sidebar";

/* ==========================================
   TEMP USER
========================================== */
const currentUser = { role: "responsable" };

/* ==========================================
   TEMP USERS DATA
========================================== */
const initialUsers = [
  { id: 1, nom: "lamen yousra", role: "Enseignant", departement: "Informatique", statut: "Actif" },
  { id: 2, nom: "ramdani salma", role: "Enseignant", departement: "Mathematique", statut: "Inactif" },
  { id: 3, nom: "laarbi mohammed", role: "Responsable", departement: "Mathematique", statut: "Actif" },
];

export default function GestionUtilisateurs() {
  const role = currentUser.role;
  const [users, setUsers] = useState(initialUsers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ nom: "", role: "", departement: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleAddUser = () => {
    if (!newUser.nom || !newUser.role || !newUser.departement) return;
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    setUsers([...users, { ...newUser, id, statut: "Actif" }]);
    setNewUser({ nom: "", role: "", departement: "" });
    setShowAddModal(false);
  };

  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteUser = () => {
    setUsers(users.filter((u) => u.id !== userToDelete.id));
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <Sidebar role={role} />

      <main className="flex-1 p-12 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-red-500 flex items-center gap-2">👥 Gestion des utilisateurs</h1>
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-xl shadow-lg hover:scale-105 transition">
            <Plus size={18} /> Ajouter
          </button>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-yellow-200/60 to-orange-200/60">
              <tr className="text-left text-gray-700">
                <th className="p-4">Nom</th>
                <th className="p-4">Rôle</th>
                <th className="p-4">Département</th>
                <th className="p-4">Statut</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b last:border-none hover:bg-yellow-50/50 transition">
                  <td className="p-4 font-semibold text-gray-800">{u.nom}</td>
                  <td className="p-4">{u.role}</td>
                  <td className="p-4">{u.departement}</td>
                  <td className="p-4">
                    {u.statut === "Actif" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        <CheckCircle size={14} /> Actif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium">
                        <XCircle size={14} /> Inactif
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <button onClick={() => confirmDeleteUser(u)} className="p-2 rounded-full text-red-500 hover:bg-red-100 hover:scale-110 transition">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-2xl p-8 w-96 relative shadow-xl">
              <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 p-1 hover:bg-gray-200 rounded-full transition"><X size={18} /></button>
              <h2 className="text-xl font-bold mb-4">Ajouter un utilisateur</h2>
              <div className="flex flex-col gap-3">
                <input type="text" placeholder="Nom" value={newUser.nom} onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })} className="border p-2 rounded-md w-full" />
                <input type="text" placeholder="Rôle" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="border p-2 rounded-md w-full" />
                <input type="text" placeholder="Département" value={newUser.departement} onChange={(e) => setNewUser({ ...newUser, departement: e.target.value })} className="border p-2 rounded-md w-full" />
              </div>
              <button onClick={handleAddUser} className="mt-4 w-full bg-orange-400 text-white py-2 rounded-xl hover:bg-orange-500 transition">Ajouter</button>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-2xl p-6 w-96 relative shadow-xl">
              <button onClick={() => setShowDeleteModal(false)} className="absolute top-4 right-4 p-1 hover:bg-gray-200 rounded-full transition"><X size={18} /></button>
              <h2 className="text-lg font-bold mb-4">Supprimer l’utilisateur</h2>
              <p className="mb-4">Êtes-vous sûr de vouloir supprimer {userToDelete?.nom} ?</p>
              <div className="flex justify-end gap-4">
                <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition">Annuler</button>
                <button onClick={handleDeleteUser} className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition">Oui</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
