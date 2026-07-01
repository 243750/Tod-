'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg border border-gray-100 p-8">
        
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0046b0] mb-2">Todú</h1>
          <p className="text-gray-600 text-sm">Ingresa a tu cuenta para continuar</p>
        </div>

        <form className="space-y-6">
          {/* Correo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              className="w-full border-b-2 border-gray-200 focus:border-[#0046b0] outline-none py-2 transition-colors bg-transparent"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          {/* Contraseña */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
            <input 
              type={showPassword ? "text" : "password"} 
              className="w-full border-b-2 border-gray-200 focus:border-[#0046b0] outline-none py-2 transition-colors bg-transparent"
              placeholder="••••••••"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 bottom-2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Recordarme / Olvidé contraseña */}
          <div className="flex items-center justify-between text-sm pt-1">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0046b0] focus:ring-[#0046b0]" />
              <span>Recordarme</span>
            </label>
            <a href="#" className="text-[#0046b0] hover:underline font-medium">¿Olvidaste tu contraseña?</a>
          </div>

          {/* Botón Ingresar */}
          <button 
            type="submit"
            className="w-full bg-[#0046b0] hover:bg-[#00368a] text-white font-bold py-3 rounded-lg shadow-md transition-all mt-2"
          >
            Ingresar
          </button>
        </form>

        {/* Enlace a Registro */}
        <div className="text-center mt-8">
          <Link href="/registro" className="text-[#0046b0] font-medium hover:underline text-sm">
            ¿No tienes cuenta? Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}