'use client';
import ToduAvatar from '../../components/ToduAvatar';

export default function DescubrirPage() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-200 font-sans pb-28 overflow-x-hidden relative">
      
      {/* 1. Header Híbrido (Menú + Stats RPG + Avatar Animado) */}
      <header className="flex items-center p-6 gap-4">
        {/* Ícono de Menú Hamburguesa */}
        <button className="text-slate-400 hover:text-white transition-colors flex-shrink-0">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Información del Usuario y Barra de XP */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-sm font-bold text-white leading-tight">Jorge Brindis</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-bold text-[#00f1fe] uppercase tracking-widest">Lvl. 5</span>
            <div className="flex-1 h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-[#00f1fe] to-[#0046b0] rounded-full" style={{ width: '50%' }}></div>
            </div>
            <span className="text-[10px] font-bold text-slate-500">150/300</span>
          </div>
        </div>

        {/* Todú Animado en Miniatura */}
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 relative shadow-inner">
          <div className="absolute top-1">
            {/* Reutilizamos tu componente Rive, pero en tamaño pequeño */}
            <ToduAvatar emotion="idle" size={56} />
          </div>
        </div>
      </header>

      {/* 2. Contenido Principal */}
      <main className="max-w-md mx-auto px-6 flex flex-col gap-6 mt-2">
        
        <div className="mb-2">
          <h2 className="text-lg font-bold text-white tracking-tight">Descubrir nuevas funciones</h2>
          <p className="text-sm text-slate-400 mt-1">Sube de nivel para desbloquear herramientas y minijuegos exclusivos.</p>
        </div>

        <div className="flex flex-col gap-6">
          
          {/* Tarjeta 1: Todú Places (Más grande e inmersiva) */}
          <div className="relative w-full h-56 rounded-3xl overflow-hidden border border-white/10 shadow-lg group cursor-pointer hover:border-blue-500/50 transition-colors">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80')" }}
            ></div>
            <div className="absolute inset-0 bg-[#0b1120]/75 backdrop-blur-[3px] flex flex-col items-center justify-center p-6 text-center transition-all">
              <div className="mb-3">
                {/* Ícono SVG de Candado en lugar de Emoji */}
                <svg className="w-9 h-9 text-white/90 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Todú Places</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed mb-4 px-4">
                Encuentra lugares ideales para enfocarte o relajarte con recomendaciones inteligentes.
              </p>
              <div className="bg-[#0046b0] text-white text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-[0_0_10px_rgba(0,70,176,0.6)]">
                Desbloquea a Nivel 4
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Todú Arcade (Juegos) */}
          <div className="relative w-full h-56 rounded-3xl overflow-hidden border border-white/10 shadow-lg group cursor-pointer hover:border-purple-500/50 transition-colors">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80')" }}
            ></div>
            <div className="absolute inset-0 bg-[#0b1120]/75 backdrop-blur-[3px] flex flex-col items-center justify-center p-6 text-center transition-all">
              <div className="mb-3">
                {/* Ícono SVG de Candado en lugar de Emoji */}
                <svg className="w-9 h-9 text-white/90 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Todú Arcade</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed mb-4 px-2">
                Juega Memorama o reta a Todú a los dados para multiplicar tu experiencia diaria.
              </p>
              <div className="bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-[0_0_10px_rgba(147,51,234,0.6)]">
                Desbloquea a Nivel 15
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* 3. Bottom Navigation (3 pestañas limpias con los SVGs) */}
      <nav className="fixed bottom-0 w-full bg-[#0b1120]/90 backdrop-blur-xl border-t border-white/10 z-50 flex justify-around items-center h-20 px-6 pb-2">
        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors group">
          <svg className="w-7 h-7 mb-0.5 group-active:scale-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span className="text-[10px] font-bold tracking-wider uppercase">Tareas</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors group">
          <svg className="w-7 h-7 mb-0.5 group-active:scale-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v4" />
            <circle cx="12" cy="2" r="1.5" fill="currentColor" stroke="none" />
            <rect x="5" y="6" width="14" height="15" rx="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12.5h.01M15 12.5h.01" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 15.5c1 1 3 1 4 0" />
          </svg>
          <span className="text-[10px] font-bold tracking-wider uppercase">Mi Todú</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-blue-400 group">
          <svg className="w-7 h-7 mb-0.5 group-active:scale-90 transition-transform drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2ZM6.5 6.5L7.5 9.5L10.5 10.5L7.5 11.5L6.5 14.5L5.5 11.5L2.5 10.5L5.5 9.5L6.5 6.5Z" />
          </svg>
          <span className="text-[10px] font-bold tracking-wider uppercase">Descubrir</span>
        </button>
      </nav>

    </div>
  );
}