import logo from "../assets/logo.png"

export default function AuthenticationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2c2c2c] p-6">
      <div className="w-full max-w-6xl bg-[#fde9a8] shadow-xl rounded-2xl flex overflow-hidden p-10">

        {/* LEFT SECTION */}
        <div className="w-1/2 flex flex-col items-center justify-center text-center pr-10">
          <img
            src={logo}
            alt="University Logo"
            className="w-80 mb-6"
          />
          <h3 className="text-xl font-medium text-[#c76b6b]">
            Connecter avec leur university
          </h3>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-1/2 pl-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-[#c76b6b] leading-tight tracking-wide">
            MY EXAMS UNIVERSITY
          </h2>

          <p className="text-gray-700 mb-4 text-lg">Se connecter à ton compte</p>

          <div className="flex flex-col mb-4">
            <label className="text-xs font-semibold text-gray-700 mb-1">IDENTIFIANT</label>
            <input
              type="text"
              placeholder="Identifiant"
              className="border px-3 py-2 rounded-md w-80 focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-xs font-semibold text-gray-700 mb-1">MODE DE PASSE</label>
            <input
              type="password"
              placeholder="Mode de passe"
              className="border px-3 py-2 rounded-md w-80 focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 mb-6">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="text-xs text-gray-700">
              SOUVIENS-TOI DE MOI
            </label>
          </div>

          <button className="w-80 bg-[#ff5f5f] hover:bg-[#ff4646] text-white font-semibold py-2 rounded-md transition">
            SE CONNECTER
          </button>
        </div>
      </div>
    </div>
  );
}