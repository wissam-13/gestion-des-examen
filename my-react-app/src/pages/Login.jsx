import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function AuthenticationPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-yellow-100 p-6">
      <div className="w-full max-w-[1200px] bg-[#FFE8A3]/80 backdrop-blur-md shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden p-10 gap-10">

        {/* LEFT SECTION */}
        <div className="md:w-1/2 flex flex-col items-center justify-center text-center md:pr-10">
          <img
            src={logo}
            alt="University Logo"
            className="w-56 md:w-72 mb-6"
          />
          <h3 className="text-lg md:text-xl font-medium text-gray-700">
            Connectez-vous à votre université
          </h3>
        </div>

        {/* RIGHT SECTION */}
        <div className="md:w-1/2 flex flex-col justify-center md:pl-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 tracking-wide">
            MY EXAMS UNIVERSITY
          </h2>

          <p className="text-gray-600 mb-5 text-base md:text-lg">
            Se connecter à votre compte
          </p>

          <div className="flex flex-col mb-4">
            <label className="text-xs font-semibold text-gray-700 mb-1">
              IDENTIFIANT
            </label>
            <input
              type="text"
              placeholder="Identifiant"
              className="border border-gray-300 px-4 py-3 rounded-lg w-full md:w-[400px]
                         focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white/80"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-xs font-semibold text-gray-700 mb-1">
              MOT DE PASSE
            </label>
            <input
              type="password"
              placeholder="Mot de passe"
              className="border border-gray-300 px-4 py-3 rounded-lg w-full md:w-[400px]
                         focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white/80"
            />
          </div>

          <div className="flex items-center gap-2 mb-6">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="text-xs text-gray-700">
              Se souvenir de moi
            </label>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full md:w-[400px] bg-[#F4C430] hover:bg-[#eab308]
                       text-gray-900 font-semibold py-3 rounded-lg
                       shadow-md hover:shadow-lg transition-all"
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}
