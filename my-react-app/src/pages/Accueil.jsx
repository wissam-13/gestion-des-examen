import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import graduate from "../assets/graduate.png";
import student from "../assets/student.png";

export default function Accueil() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">

      {/* Header */}
      <div className="flex flex-col items-center pt-8">
        <img
          src={logo}
          alt="Logo"
          className="w-[9vw] max-w-[160px]"
        />
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 tracking-wide">
          Gestion des examens
        </h1>
        <p className="text-sm text-gray-500">
          Plateforme académique étudiants & enseignants
        </p>
      </div>

      {/* Main content */}
      <div className="mt-12 px-10">
        <div className="relative flex h-[60vh] items-center gap-10">

          {/* Left image + text */}
          <div className="w-1/2 h-full flex flex-col justify-center">
            <img
              src={graduate}
              alt="Graduate"
              className="h-[80%] w-full object-contain drop-shadow-md"
            />
            <p className="mt-4 text-center text-gray-600 text-sm">
              Where students and teachers communicate
            </p>
          </div>

          {/* Right image */}
          <div className="w-1/2 h-full flex items-center justify-center">
            <img
              src={student}
              alt="Student"
              className="h-[85%] w-full object-contain drop-shadow-md"
            />
          </div>

          {/* Center button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => navigate("/login")}
              className="bg-[#FFE8A3] px-16 py-3 text-lg font-semibold rounded-xl
                         shadow-md hover:shadow-lg hover:bg-yellow-300 transition-all"
            >
              Log In
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
