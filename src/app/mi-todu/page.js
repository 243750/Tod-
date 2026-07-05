'use client';
import ToduAvatar from '../../components/ToduAvatar';

// 1. Componente del MiniTodú (Asistente) integrado en la misma vista
function MiniToduHelper() {
  return (
    <div className="relative mt-8 flex items-end gap-4 p-4">
      {/* El Todúcito SVG */}
      <div className="w-16 h-16 flex-shrink-0 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <g transform="rotate(5 60 60)">
            <rect x="35" y="40" width="50" height="55" rx="25" fill="currentColor" />
            <path d="M60 30V40" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="60" cy="27" r="3" fill="#FFD700"/>
            <path d="M45 55Q50 50 55 55" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M65 55Q70 50 75 55" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M85 65Q95 55 90 45" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      </div>

      {/* Globo de diálogo (Speech Bubble) estilo cristal oscuro */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl rounded-bl-none p-4 shadow-lg relative">
        {/* Triangulito del globo */}
        <div className="absolute -left-3 bottom-0 w-0 h-0 border-t-[16px] border-t-transparent border-r-[16px] border-r-white/10 border-b-[0px] border-b-transparent"></div>
        
        <h4 className="text-[#FFD700] font-bold text-sm mb-1">Tip de Todú</h4>
        <p className="text-sm text-slate-200 leading-relaxed">
          ¡Hola! Aquí puedes ver tu progreso. Completa las tareas de tu panel principal para ganar XP y desbloquear nuevos accesorios para mí. 🚀
        </p>
      </div>
    </div>
  );
}

export default function MiToduPage() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-200 font-sans pb-28 overflow-x-hidden relative">
      
{/* Header Consistente */}
      <header className="flex justify-between items-center p-6">
        {/* Ícono de Menú Hamburguesa */}
        <button className="text-slate-400 hover:text-white transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Título Centrado */}
        <h1 className="text-xl font-bold text-white tracking-wide">Mi Todú</h1>
        
        {/* Ícono de la Vista (Trofeo) */}
        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <span className="text-lg">🏆</span>
        </button>
      </header>

      <main className="max-w-md mx-auto px-6 flex flex-col gap-6">
        
        {/* Sección del Avatar Principal en Grande */}
        <section className="flex flex-col items-center justify-center py-4">
          <div className="relative w-56 h-56 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0046b0]/30 to-transparent rounded-full blur-2xl"></div>
            {/* El Todu Grande Animado */}
            <ToduAvatar emotion="happy" size={260} />
          </div>
        </section>

        {/* Tarjeta de Estadísticas (Nivel y Racha) */}
        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Nivel Actual</p>
              <h2 className="text-3xl font-black text-white">Lvl. 5</h2>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Racha</p>
              <h2 className="text-xl font-bold text-orange-400">🔥 5 Días</h2>
            </div>
          </div>
          
          {/* Barra de XP estilo TikTok (Gradiente intenso) */}
          <div className="relative pt-2">
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-[#00f1fe]">150 XP</span>
              <span className="text-slate-500">Siguiente: 300 XP</span>
            </div>
            <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
              <div className="h-full bg-gradient-to-r from-[#00f1fe] via-[#0046b0] to-[#cab3ff] rounded-full shadow-[0_0_10px_rgba(0,241,254,0.5)]" style={{ width: '50%' }}></div>
            </div>
          </div>
        </section>

        {/* Tienda / Desbloqueables de Temporada */}
        <section className="mt-2">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 pl-1">Tus Accesorios</h3>
          <div className="grid grid-cols-3 gap-3">
            
            {/* Item 1: Desbloqueado */}
            <button className="bg-[#0046b0]/20 border border-[#0046b0]/50 rounded-xl p-3 flex flex-col items-center gap-2 hover:bg-[#0046b0]/40 transition-colors">
              <span className="text-2xl drop-shadow-md">🎃</span>
              <span className="text-[10px] font-bold text-[#00f1fe]">Equipado</span>
            </button>

            {/* Item 2: Bloqueado */}
            <button className="bg-black/20 border border-white/5 rounded-xl p-3 flex flex-col items-center gap-2 opacity-60">
              <span className="text-2xl drop-shadow-md grayscale">🎄</span>
              <span className="text-[10px] font-bold text-slate-500">Lvl. 10</span>
            </button>

            {/* Item 3: Bloqueado */}
            <button className="bg-black/20 border border-white/5 rounded-xl p-3 flex flex-col items-center gap-2 opacity-60">
              <span className="text-2xl drop-shadow-md grayscale">🐰</span>
              <span className="text-[10px] font-bold text-slate-500">Lvl. 15</span>
            </button>

          </div>
        </section>

        {/* Aquí entra el Todúcito a dar instrucciones */}
        <MiniToduHelper />

      </main>

      {/* Barra de Navegación Inferior (Igual que el dashboard) */}
      <nav className="fixed bottom-0 w-full bg-[#0b1120]/90 backdrop-blur-xl border-t border-white/10 z-50 flex justify-around items-center h-20 px-6 pb-2">
        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
          <span className="text-xl">📋</span>
          <span className="text-[10px] font-bold tracking-wider uppercase">Tareas</span>
        </button>
        {/* Este botón ahora está activo (Azul) */}
        <button className="flex flex-col items-center gap-1 text-blue-400">
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