import Sidebar from "../pages/Sidebar";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const currentUser = { role: "responsable" };

export default function Contact() {
  const navigate = useNavigate();
  const role = currentUser.role;

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message envoyé ! Merci de nous avoir contacté 💛");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <Sidebar role={role} />
      <main className="flex-1 p-12 space-y-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/dashboard/aide")} className="p-3 rounded-full bg-white/70 shadow hover:scale-110 transition">
            <ArrowLeft />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Nous contacter</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl">
          <input type="text" placeholder="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full p-3 rounded-xl border" />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full p-3 rounded-xl border" />
          <textarea placeholder="Votre message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full p-3 rounded-xl border h-32 resize-none"></textarea>
          <button type="submit" className="w-full py-3 bg-orange-400 text-white rounded-xl shadow hover:bg-orange-500 transition">Envoyer</button>
        </form>
      </main>
    </div>
  );
}
