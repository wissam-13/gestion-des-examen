import logo from "../assets/logo.png";
import { ArrowLeft, Edit, Mail, User, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";

/* ==========================================
   TEMP USER
========================================== */
const currentUser = {
  role: "teacher", // student | teacher | responsable | admin
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const role = currentUser.role;

  const [user, setUser] = useState({
    nom: "Lamen Yousra",
    email: "yousra.lamen@univ.dz",
    role: "Enseignant",
    departement: "Informatique",
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">

      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Content */}
      <main className="flex-1 p-12 animate-[fadeUp_0.6s_ease-out]">
        <div className="max-w-4xl space-y-8">

          {/* Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-3 rounded-full bg-white/70 shadow hover:scale-110 transition"
            >
              <ArrowLeft />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Mon profil</h1>
              <p className="text-sm text-gray-600">Informations personnelles</p>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-10">
            <div className="flex items-center gap-8">

              {/* Avatar */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400
              flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {user.nom.charAt(0)}
              </div>

              {/* Info */}
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">{user.nom}</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail size={16} /> {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <User size={16} /> {user.role}
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Briefcase size={16} /> {user.departement}
                  </div>
                </div>
              </div>

              {/* Edit */}
              <button className="p-3 rounded-full bg-orange-400 text-white shadow
              hover:scale-110 hover:bg-orange-500 transition">
                <Edit />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
