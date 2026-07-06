'use client';
import { useState } from 'react';
import { HelpCircle, Plus, Camera, X, CheckCircle2, Clock } from 'lucide-react';
import ToduAvatar from '../../components/ToduAvatar';

export default function TareasPage() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-200 font-sans pb-28 overflow-x-hidden relative">
      
      {/* 1. Header Minimalista con Saludo */}
      <header className="flex items-center justify-between p-6">
        <button className="text-slate-400 hover:text-white transition-colors">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex flex-col items-center">
          <h1 className="text-sm font-black text-white uppercase tracking-widest">Mis Tareas</h1>
          <span className="text-[10px] text-cyan-400 font-bold tracking-wide">¡Qué onda, Jorge! A darle.</span>
        </div>

        <button 
          onClick={() => setShowHelp(true)}
          className="text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-500/10 p-2 rounded-full border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </header>

      {/* 2. Hero Section: Todú Protagonista con FX */}
      <section className="flex flex-col items-center justify-center pt-2 pb-8">
        <div className="relative w-32 h-32 mb-6">
          {/* FX: Resplandor con pulso animado */}
          <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-2xl animate-pulse"></div>
          
          {/* FX: Partículas flotantes decorativas */}
          <div className="absolute -top-2 -left-4 w-3 h-3 bg-yellow-400 rounded-full blur-[2px] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute top-1/2 -right-6 w-2 h-2 bg-cyan-300 rounded-full blur-[1px] animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute -bottom-2 -left-2 w-2.5 h-2.5 bg-rose-400 rounded-full blur-[1px] animate-bounce" style={{ animationDelay: '0.8s' }}></div>

          {/* Contenedor principal de Todú */}
          <div className="relative z-10 w-full h-full flex items-center justify-center overflow-visible">
          <div className="absolute top-0">
          <ToduAvatar emotion="idle" size={130} />
          </div>
        </div>
        </div>

        {/* Barras de Progreso Minimalistas */}
        <div className="w-full max-w-xs space-y-4 px-4">
          <div>
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest flex items-center gap-1">
                Racha
              </span>
              <span className="text-xs font-black text-white drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]">🔥 5 Días</span>
            </div>
            <div className="h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5 shadow-inner">
              <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.8)]" style={{ width: '70%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-[10px] font-bold text-[#00f1fe] uppercase tracking-widest">Nivel 5</span>
              <span className="text-[10px] font-bold text-slate-400">150 / 300 XP</span>
            </div>
            <div className="h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5 shadow-inner">
              <div className="h-full bg-gradient-to-r from-[#00f1fe] to-[#0046b0] rounded-full shadow-[0_0_10px_rgba(0,241,254,0.5)]" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Lista de Tareas (Tarjetas Squircle) */}
      <main className="max-w-md mx-auto px-6 flex flex-col gap-4">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tareas de Hoy</h2>

        {/* Tarea 1: Atrasada */}
        <div className="bg-[#131b2f] border-l-4 border-l-rose-500 border border-white/5 rounded-3xl p-4 flex items-center justify-between shadow-lg">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-white">Ir al Gimnasio</h3>
            <div className="flex items-center gap-1.5 text-rose-400">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">09:00 AM • Atrasada</span>
            </div>
          </div>
          <button className="w-12 h-12 rounded-[1.2rem] bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors">
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* Tarea 2: Pendiente */}
        <div className="bg-[#131b2f] border border-white/5 rounded-3xl p-4 flex items-center justify-between shadow-lg">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-white">Subir avance a GitHub</h3>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">11:30 AM</span>
            </div>
          </div>
          <button className="w-12 h-12 rounded-[1.2rem] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors">
            <Camera className="w-5 h-5" />
          </button>
        </div>

      </main>

      {/* 4. Botón Flotante para Agregar Tareas */}
      <div className="fixed bottom-24 w-full flex justify-center z-40 pointer-events-none">
        <button className="pointer-events-auto w-14 h-14 bg-gradient-to-tr from-[#0046b0] to-[#00f1fe] rounded-[1.5rem] flex items-center justify-center text-white shadow-[0_10px_30px_rgba(0,241,254,0.4)] hover:scale-105 active:scale-95 transition-transform">
          <Plus className="w-7 h-7" strokeWidth={2.5} />
        </button>
      </div>

      {/* 5. Modal de Ayuda */}
      {showHelp && (
        <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex flex-col items-center justify-center p-6">
          <div className="bg-[#111827] border border-cyan-500/30 rounded-[2rem] p-6 w-full max-w-sm relative shadow-[0_0_40px_rgba(6,182,212,0.15)]">
            <button onClick={() => setShowHelp(false)} className="absolute top-5 right-5 text-slate-400 hover:text-white bg-white/5 p-1.5 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center mb-6 border-b border-white/5 pb-6 pt-2">
              <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl flex items-center justify-center text-cyan-400 mb-4">
                <HelpCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white mb-1">¿Cómo funciona?</h3>
              <p className="text-xs text-slate-400">Guía rápida de tus tareas y Todú</p>
            </div>

            <div className="space-y-5 text-sm">
              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-blue-500/20 p-2 rounded-xl text-blue-400"><Plus className="w-4 h-4" /></div>
                <div>
                  <h4 className="text-white font-bold mb-0.5">Añadir y Editar</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Toca el botón central <span className="text-cyan-400 font-bold">(+)</span> para crear un nuevo hábito o tarea. Mantén presionada una tarea para editarla.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-purple-500/20 p-2 rounded-xl text-purple-400"><Camera className="w-4 h-4" /></div>
                <div>
                  <h4 className="text-white font-bold mb-0.5">Verificación Fotográfica</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Toca el ícono de cámara en tus tareas. Toma una foto y <span className="text-white font-bold">la IA de Todú la analizará</span> para confirmar que la completaste.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-green-500/20 p-2 rounded-xl text-green-400"><CheckCircle2 className="w-4 h-4" /></div>
                <div>
                  <h4 className="text-white font-bold mb-0.5">Gana Experiencia</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Las tareas verificadas te otorgan XP. Úsala para evolucionar a Todú y desbloquear minijuegos.</p>
                </div>
              </div>
            </div>
            
            <button onClick={() => setShowHelp(false)} className="w-full mt-8 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-2xl transition-colors text-sm tracking-wider uppercase shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* 6. Bottom Navigation (Pestaña "Tareas" Activa) */}
      <nav className="fixed bottom-0 w-full bg-[#0b1120]/90 backdrop-blur-xl border-t border-white/10 z-30 flex justify-around items-center h-20 px-6 pb-2">
        <button className="flex flex-col items-center gap-1 text-cyan-400 group">
          <svg className="w-7 h-7 mb-0.5 group-active:scale-90 transition-transform drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
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

        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors group">
          <svg className="w-7 h-7 mb-0.5 group-active:scale-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2ZM6.5 6.5L7.5 9.5L10.5 10.5L7.5 11.5L6.5 14.5L5.5 11.5L2.5 10.5L5.5 9.5L6.5 6.5Z" />
          </svg>
          <span className="text-[10px] font-bold tracking-wider uppercase">Descubrir</span>
        </button>
      </nav>

    </div>
  );
}