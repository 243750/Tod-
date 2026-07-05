'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Gran colección de íconos (Pool). De aquí se elegirán 6 al azar cada partida.
const ICONS_POOL = [
  // 1. Auriculares (Fucsia)
  <svg key="headphones" className="w-12 h-12 text-fuchsia-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>,
  // 2. Gamepad (Cian)
  <svg key="gamepad" className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="2" y="6" width="20" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h4M8 10v4M15 13h.01M18 11h.01" />
  </svg>,
  // 3. Rayo/Energía (Amarillo)
  <svg key="lightning" className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>,
  // 4. Café (Naranja)
  <svg key="coffee" className="w-12 h-12 text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 1v3M10 1v3M14 1v3" />
  </svg>,
  // 5. Código/Terminal (Esmeralda)
  <svg key="code" className="w-12 h-12 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 17l6-6-6-6M12 19h8" />
  </svg>,
  // 6. Robot/Todú (Morado)
  <svg key="robot" className="w-12 h-12 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="5" r="2" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v4M8 16h.01M16 16h.01" />
  </svg>,
  // 7. Base de Datos (Azul Rey)
  <svg key="database" className="w-12 h-12 text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>,
  // 8. Pingüino Linux (Blanco/Gris)
  <svg key="penguin" className="w-12 h-12 text-slate-300 drop-shadow-[0_0_10px_rgba(203,213,225,0.8)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c-3 0-5 3-5 7 0 2-.5 4-2 6v2a2 2 0 002 2h10a2 2 0 002-2v-2c-1.5-2-2-4-2-6 0-4-2-7-5-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h.01M15 10h.01M10 16h4" />
  </svg>,
  // 9. Bug/Insecto (Rojo)
  <svg key="bug" className="w-12 h-12 text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-9M15 8.5L12 11 9 8.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 15c0 2.21-3.13 4-7 4s-7-1.79-7-4 3.13-4 7-4 7 1.79 7 4zM12 3a3 3 0 00-3 3v1h6V6a3 3 0 00-3-3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12l-3 1M4 12l3 1M21 17l-4-1M3 17l4-1" />
  </svg>,
  // 10. Gafas VR (Índigo)
  <svg key="vr" className="w-12 h-12 text-indigo-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.8)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="2" y="7" width="20" height="10" rx="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 17v-2a2 2 0 114 0v2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 11h.01M20 11h.01" />
  </svg>,
  // 11. Cohete (Rosa Fuerte)
  <svg key="rocket" className="w-12 h-12 text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5L21 3v4.5l-6 6M13.5 10.5L15 15l-3 3-4.5-4.5 3-3L13.5 10.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 13.5L3 21h4.5l6-6M9 15l-1.5 1.5M15 9l1.5-1.5" />
  </svg>,
  // 12. Dado (Teal/Turquesa)
  <svg key="dice" className="w-12 h-12 text-teal-400 drop-shadow-[0_0_10px_rgba(45,212,191,0.8)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
    <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>,
  // 13. Chip/CPU (Lima)
  <svg key="cpu" className="w-12 h-12 text-lime-400 drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="4" y="4" width="16" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
  </svg>,
  // 14. Nube (Celeste)
  <svg key="cloud" className="w-12 h-12 text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1332 20.177 10.2016 17.8546 10.0163C17.4339 6.6433 14.5775 4 11 4C7.13401 4 4 7.13401 4 11C1.79086 11 0 12.7909 0 15C0 17.2091 1.79086 19 4 19H17.5Z" />
  </svg>,
  // 15. Llave (Oro)
  <svg key="key" className="w-12 h-12 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a4 4 0 11-8 0 4 4 0 018 0zM12 11v10M12 15h3M12 19h3" />
  </svg>
];

export default function MemoramaPage() {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const startGame = () => {
    // 1. Mezclamos la piscina completa de 15 íconos
    const shuffledPool = [...ICONS_POOL].sort(() => Math.random() - 0.5);
    
    // 2. Extraemos solo los primeros 6 para esta partida
    const selectedIconsForGame = shuffledPool.slice(0, 6);

    // 3. Duplicamos esos 6 para hacer los pares y los volvemos a mezclar
    const shuffledCards = [...selectedIconsForGame, ...selectedIconsForGame]
      .map((iconElement, idx) => ({
        id: idx,
        iconId: iconElement.key, // Usamos la propiedad 'key' del SVG para identificar que son el mismo
        element: iconElement,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlippedIndices([]);
    setMatchedPairs(0);
    setTimeLeft(60);
    setIsPlaying(true);
  };

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0 && matchedPairs < 6) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 || matchedPairs === 6) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, matchedPairs]);

  const handleCardClick = (index) => {
    if (isChecking || cards[index].isFlipped || cards[index].isMatched || !isPlaying) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setIsChecking(true);
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (cards[firstIndex].iconId === cards[secondIndex].iconId) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstIndex].isMatched = true;
          matchedCards[secondIndex].isMatched = true;
          setCards(matchedCards);
          setMatchedPairs((prev) => prev + 1);
          setFlippedIndices([]);
          setIsChecking(false);
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans pb-10 overflow-x-hidden relative selection:bg-fuchsia-500 selection:text-white">
      
      {/* Fondo de Cuadrícula Láser Fucsia */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(236, 72, 153, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(236, 72, 153, 0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 sticky top-0 bg-[#050505]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-fuchsia-500/30">
        <div className="flex items-center gap-4">
          <Link href="/arcade" className="w-10 h-10 rounded-full bg-black border border-fuchsia-500/50 flex items-center justify-center text-fuchsia-400 hover:bg-fuchsia-500 hover:text-white transition-all shadow-[0_0_10px_rgba(236,72,153,0.3)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-sm font-black text-fuchsia-400 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]">Memorama</h1>
          </div>
        </div>

        {/* Temporizador Superior */}
        <div className={`px-4 py-1.5 rounded-full font-black text-sm border shadow-lg ${timeLeft <= 10 ? 'bg-rose-500/20 text-rose-500 border-rose-500 shadow-rose-500/20 animate-pulse' : 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/50 shadow-fuchsia-500/20'}`}>
          00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
        </div>
      </header>

      <main className="relative z-10 max-w-md mx-auto px-6 flex flex-col mt-8">
        
        {/* Marcador */}
        <div className="flex justify-between items-center mb-8 bg-black/50 border border-fuchsia-500/30 rounded-2xl p-4 shadow-[0_0_15px_rgba(236,72,153,0.1)] backdrop-blur-sm">
          <div className="text-center">
            <p className="text-[10px] text-fuchsia-300/70 uppercase tracking-widest font-bold mb-1">Pares Encontrados</p>
            <p className="text-2xl font-black text-white">{matchedPairs} <span className="text-fuchsia-500/50 text-lg">/ 6</span></p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-fuchsia-300/70 uppercase tracking-widest font-bold mb-1">XP Posible</p>
            <p className="text-2xl font-black text-fuchsia-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]">+50</p>
          </div>
        </div>

        {/* Tablero de Cartas o Pantalla Inicial */}
        {!isPlaying && timeLeft === 60 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-6 animate-bounce">
              <svg className="w-20 h-20 text-fuchsia-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="4" y="4" width="12" height="16" rx="2" strokeWidth="1.5" />
                <path d="M8 4v16M20 8v12a2 2 0 01-2 2H8" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="10" cy="12" r="2" fill="currentColor" />
              </svg>
            </div>
            
            <h2 className="text-xl font-bold text-white mb-2">¿Listo para jugar?</h2>
            <p className="text-sm text-slate-400 mb-8 px-4">Encuentra todos los pares antes de que se acabe el tiempo. ¡Buena suerte!</p>
            <button onClick={startGame} className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-black uppercase tracking-widest px-8 py-4 rounded-full shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-all active:scale-95 border border-fuchsia-400">
              Insertar Ficha
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 mb-8">
            {cards.map((card, index) => (
              <div 
                key={card.id} 
                onClick={() => handleCardClick(index)}
                className={`relative w-full aspect-square cursor-pointer transition-transform duration-300 ${!card.isMatched && !card.isFlipped ? 'hover:scale-105' : ''}`}
                style={{ perspective: '1000px' }}
              >
                <div 
                  className="w-full h-full relative transition-transform duration-500"
                  style={{ transformStyle: 'preserve-3d', transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                  {/* Parte Trasera */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-[#111827] border-2 border-fuchsia-500/40 rounded-xl flex items-center justify-center shadow-[0_0_10px_rgba(236,72,153,0.15)] hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-shadow"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <svg className="w-8 h-8 text-fuchsia-500/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="1" />
                      <circle cx="12" cy="12" r="3" strokeWidth="1" />
                    </svg>
                  </div>

                  {/* Parte Delantera */}
                  <div 
                    className={`absolute inset-0 w-full h-full rounded-xl flex items-center justify-center shadow-lg border-2 ${card.isMatched ? 'bg-[#0f172a] border-fuchsia-400 shadow-[0_0_15px_rgba(236,72,153,0.3)]' : 'bg-slate-900 border-slate-700'}`}
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    {card.element}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pantalla de Fin de Juego */}
        {(!isPlaying && timeLeft < 60) && (
          <div className="absolute inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex flex-col items-center justify-center text-center px-6 border-t-4 border-fuchsia-500">
            {matchedPairs === 6 ? (
              <>
                <svg className="w-24 h-24 text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)] mb-6 animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M6 7h12v4a6 6 0 0 1-12 0V7z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v4M9 21h6" />
                </svg>
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-yellow-400 tracking-wider mb-2 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                  ¡VICTORIA!
                </h2>
                <p className="text-slate-300 font-medium mb-1">Has encontrado todos los pares.</p>
                <p className="text-fuchsia-400 font-black tracking-widest mb-8 bg-fuchsia-500/10 px-4 py-2 rounded-lg border border-fuchsia-500/30">
                  +50 XP AÑADIDOS
                </p>
              </>
            ) : (
              <>
                <svg className="w-20 h-20 text-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.8)] mb-6 opacity-90" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12M6 21h12M10 11.5L6 7V3h12v4l-4 4.5M10 12.5L6 17v4h12v-4l-4-4.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 11.5v1" />
                </svg>
                <h2 className="text-3xl font-black text-white tracking-wider mb-2 drop-shadow-[0_0_10px_rgba(244,63,94,0.6)]">
                  GAME OVER
                </h2>
                <p className="text-slate-400 font-medium mb-8">Te faltaron {6 - matchedPairs} pares por encontrar.</p>
              </>
            )}
            
            <button onClick={startGame} className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-black uppercase tracking-widest px-10 py-4 rounded-full shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-all mb-6 border border-fuchsia-400 active:scale-95">
              Jugar de Nuevo
            </button>
            <Link href="/arcade" className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Volver al Lobby
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}