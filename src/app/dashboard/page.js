'use client';
import ToduAvatar from '../../components/ToduAvatar';
import useRobotState from '../hooks/useRobotState';

export default function DashboardPage() {
  const { 
    emocionActual, 
    simularTareaCompletada 
  } = useRobotState();

  return (
    // Fondo oscuro elegante, no negro puro, sino un azul/gris muy profundo
    <div className="min-h-screen bg-[#0b1120] text-slate-200 font-sans pb-28 overflow-x-hidden relative">
      
      {/* 1. Header Minimalista */}
      <header className="flex justify-between items-center p-6">
        <button className="text-slate-400 hover:text-white transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-white tracking-wide">Todú</h1>
        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <span className="text-lg">⚙️</span>
        </button>
      </header>

      <main className="max-w-md mx-auto px-6 flex flex-col gap-8">
        
        {/* 2. Sección del Avatar y Progreso */}
        <section className="flex flex-col items-center gap-6 mt-2">
          {/* Contenedor del Avatar con un resplandor sutil detrás */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#0046b0]/20 rounded-full blur-3xl"></div>
            {/* ¡Aquí vive tu robot de Rive! */}
            <ToduAvatar emotion={emocionActual} size={220} />
          </div>

          <div className="w-full space-y-4 px-2">
            {/* Barra de Racha (Fuego) */}
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Racha</span>
                <span className="text-xs font-bold text-orange-400 flex items-center gap-1">
                  🔥 5 Días
                </span>
              </div>
              <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>

            {/* Barra de XP */}
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nivel 5</span>
                <span className="text-xs font-bold text-[#0046b0] flex items-center gap-1">
                  ⭐ 150 / 300 XP
                </span>
              </div>
              <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-blue-500 to-[#0046b0] rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Lista de Tareas */}
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-white tracking-tight">Tareas de Hoy</h2>
          
          <div className="flex flex-col gap-3">
            {/* Tarjeta de Tarea (Urgente - Roja) */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 relative overflow-hidden flex items-center justify-between">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
              <div className="ml-3 flex flex-col gap-1">
                <h3 className="font-medium text-white">Ir al Gimnasio</h3>
                <span className="text-xs text-red-400 font-medium">09:00 AM • Atrasada</span>
              </div>
              <button 
                onClick={simularTareaCompletada}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0046b0] transition-colors"
              >
                📸
              </button>
            </div>

            {/* Tarjeta de Tarea (Normal - Azul) */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 relative overflow-hidden flex items-center justify-between">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0046b0]"></div>
              <div className="ml-3 flex flex-col gap-1">
                <h3 className="font-medium text-white">Subir avance a GitHub</h3>
                <span className="text-xs text-slate-400">11:30 AM</span>
              </div>
              <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0046b0] transition-colors">
                📸
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 4. Botón Flotante Central (FAB) */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40">
        <button className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0046b0] to-blue-400 shadow-[0_8px_30px_rgba(0,70,176,0.5)] flex items-center justify-center border-2 border-white/10 hover:scale-105 active:scale-95 transition-all">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* 5. Barra de Navegación Inferior (Bottom Nav) */}
      <nav className="fixed bottom-0 w-full bg-[#0b1120]/90 backdrop-blur-xl border-t border-white/10 z-50 flex justify-around items-center h-20 px-6 pb-2">
        <button className="flex flex-col items-center gap-1 text-blue-400">
          <span className="text-xl">📋</span>
          <span className="text-[10px] font-bold tracking-wider uppercase">Tareas</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
          <span className="text-xl">🤖</span>
          <span className="text-[10px] font-bold tracking-wider uppercase">Mi Todú</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
          <span className="text-xl">🛒</span>
          <span className="text-[10px] font-bold tracking-wider uppercase">Market</span>
        </button>
      </nav>

    </div>
  );
}