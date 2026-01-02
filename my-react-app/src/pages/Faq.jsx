import Sidebar from "../pages/Sidebar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const currentUser = { role: "responsable" };

const faqs = [
  { q: "Comment changer mon mot de passe ?", a: "Allez dans Paramètres > Sécurité et utilisez l’option de changement de mot de passe." },
  { q: "Comment créer un groupe ?", a: "Dans la section Groupes, cliquez sur 'Ajouter' et remplissez les informations." },
  { q: "Comment contacter un enseignant ?", a: "Utilisez l’option Support technique ou envoyez un message via Nous contacter." },
];

export default function Faq() {
  const navigate = useNavigate();
  const role = currentUser.role;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <Sidebar role={role} />
      <main className="flex-1 p-12 space-y-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/dashboard/aide")} className="p-3 rounded-full bg-white/70 shadow hover:scale-110 transition">
            <ArrowLeft />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Questions fréquentes</h1>
        </div>

        <div className="space-y-4 max-w-3xl">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 hover:scale-[1.01] transition">
              <h3 className="font-semibold text-gray-800">{f.q}</h3>
              <p className="text-sm text-gray-600 mt-1">{f.a}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
