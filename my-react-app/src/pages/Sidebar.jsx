import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

/* ==========================================
   MENU ITEMS PER ROLE
========================================== */
const menuByRole = {
  student: [
    { icon: "🔔", label: "Notifications", to: "/dashboard/notifications" },
    { icon: "📅", label: "Emploi du temps", to: "/emploi-du-temps" },
    { icon: "👨‍👩‍👧‍👦", label: "Groupes", to: "/modules-groupes" },
    { icon: "⚙️", label: "Paramètres", to: "/dashboard/parametres" },
    { icon: "🆘", label: "Aide", to: "/dashboard/aide" },
  ],

  teacher: [
    { icon: "🔔", label: "Notifications", to: "/dashboard/notifications" },
    { icon: "📅", label: "Emploi du temps", to: "/emploi-du-temps" },
    { icon: "👨‍👩‍👧‍👦", label: "Groupes", to: "/modules-groupes" },
    { icon: "🧑‍🏫", label: "Surveillants", to: "/surveillants" }, // NEW
    { icon: "⚙️", label: "Paramètres", to: "/dashboard/parametres" },
    { icon: "🆘", label: "Aide", to: "/dashboard/aide" },
  ],

  admin: [
    { icon: "🔔", label: "Notifications", to: "/dashboard/notifications" },
    { icon: "📅", label: "Emploi du temps", to: "/emploi-du-temps" },
    { icon: "👥", label: "Utilisateurs", to: "/dashboard/users" },
    { icon: "👨‍👩‍👧‍👦", label: "Groupes", to: "/modules-groupes" },
    { icon: "🚪", label: "Salles", to: "/salles" },
    { icon: "🧑‍🏫", label: "Surveillants", to: "/surveillants" }, // NEW
    { icon: "⚙️", label: "Paramètres", to: "/dashboard/parametres" },
    { icon: "🆘", label: "Aide", to: "/dashboard/aide" },
  ],

  responsable: [
    { icon: "🔔", label: "Notifications", to: "/dashboard/notifications" },
    { icon: "📅", label: "Emploi du temps", to: "/emploi-du-temps" },
    { icon: "👨‍👩‍👧‍👦", label: "Groupes", to: "/modules-groupes" },
    { icon: "🚪", label: "Salles", to: "/salles" },
    { icon: "🧑‍🏫", label: "Surveillants", to: "/surveillants" }, // NEW
    { icon: "⚙️", label: "Paramètres", to: "/dashboard/parametres" },
    { icon: "🆘", label: "Aide", to: "/dashboard/aide" },
  ],
};

export default function Sidebar({ role }) {
  const menu = menuByRole[role] || [];

  return (
    <aside
      className="w-64 p-5 flex flex-col justify-between shadow-xl"
      style={{ backgroundColor: "#FFE8A3" }}
    >
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <img src={logo} alt="Logo" className="w-14 h-14" />
          <div>
            <h1 className="text-sm font-bold">Gestionnaire d’examens</h1>
            <p className="text-xs capitalize">{role}</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="space-y-3 text-sm">
          {menu.map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/60 transition-all"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Profile */}
      <Link
        to="/dashboard/profile"
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/60"
      >
        👤 Profil
      </Link>
    </aside>
  );
}
