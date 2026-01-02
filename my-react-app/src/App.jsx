import { Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil.jsx";
import AuthenticationPage from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import GestionUtilisateurs from "./pages/GestionUtilisateurs.jsx";
import Notifications from "./pages/Notifications.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Parametres from "./pages/Parametres.jsx";
import Security from "./pages/Security.jsx"; // 🔐 NEW
import Aide from "./pages/Aide.jsx";
import SupportTechnique from "./pages/SupportTechnique.jsx";
import NotificationEgere from "./pages/NotificationEgere";
import UserGuide from "./pages/UserGuide";
import EmploiDuTemps from "./pages/EmploiDuTemps";
import ModulesGroupes from "./pages/ModulesGroupes";
import Surveillants from "./pages/Surveillants";
import Salles from "./pages/Salles";
import Faq from "./pages/Faq";   
import Contact from "./pages/Contact";
export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Accueil />} />
      <Route path="/login" element={<AuthenticationPage />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/notifications" element={<Notifications />} />
      <Route path="/dashboard/users" element={<GestionUtilisateurs />} />
      <Route path="/dashboard/profile" element={<ProfilePage />} />

      {/* Paramètres */}
      <Route path="/dashboard/parametres" element={<Parametres />} />
      <Route path="/dashboard/parametres/security" element={<Security />} /> {/* 🔐 */}

      {/* Aide */}
      <Route path="/dashboard/aide" element={<Aide />} />
      <Route
        path="/dashboard/aide/support-technique"
        element={<SupportTechnique />}
      />
      <Route path="/dashboard/notificationegere" element={<NotificationEgere />} />
 <Route path="/dashboard/userguide" element={<UserGuide />} /> {/* <-- new route */}
        {/* other routes */}
     {/* Emploi du Temps */}
      <Route path="/emploi-du-temps" element={<EmploiDuTemps />} />

      {/* Modules & Groupes */}
      <Route path="/modules-groupes" element={<ModulesGroupes />} />
<Route path="/surveillants" element={<Surveillants />} />
<Route path="/salles" element={<Salles />} />
 <Route path="/dashboard/faq" element={<Faq />} />
  <Route path="/dashboard/contact" element={<Contact />} />
    </Routes>
  );
}
