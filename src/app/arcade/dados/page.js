'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ToduAvatar from '../../../components/ToduAvatar';

// === LÓGICA MATEMÁTICA ===
const calculatePoints = (values) => {
  if (values.length === 0) return 0;
  
  const sorted = [...values].sort((a, b) => a - b);
  
  // 1. Detección de Escaleras (Straight)
  // Escalera pequeña (1-2-3-4-5) o grande (2-3-4-5-6)
  const isSmallStraight = [1, 2, 3, 4, 5].every(v => sorted.includes(v));
  const isLargeStraight = [2, 3, 4, 5, 6].every(v => sorted.includes(v));
  
  if (isSmallStraight || isLargeStraight) {
    return 1500; // ¡Premio gordo por la escalera!
  }

  // 2. Lógica tradicional de Farkle (1s, 5s y Tríos)
  let score = 0;
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  values.forEach(v => { if (v) counts[v]++; });

  for (let i = 1; i <= 6; i++) {
    const count = counts[i];
    if (count >= 3) {
      if (i === 1) score += 1000 + (count - 3) * 100;
      else score += (i * 100) + (i === 5 ? (count - 3) * 50 : 0);
    } else {
      if (i === 1) score += count * 100;
      if (i === 5) score += count * 50;
    }
  }
  return score;
};

const isBust = (values) => values.length > 0 && calculatePoints(values) === 0;

const getScoringIndices = (diceArray) => {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  diceArray.forEach(d => { if (!d.locked && d.value) counts[d.value]++; });
  const indices = [];
  diceArray.forEach((d, i) => {
    if (!d.locked && d.value) {
      if (d.value === 1 || d.value === 5 || counts[d.value] >= 3) indices.push(i);
    }
  });
  return indices;
};

const META_PUNTOS = 3000;

// === COMPONENTE VISUAL DEL DADO (PUNTITOS) ===
const DieFace = ({ value }) => {
  if (!value) return null;
  const dot = <div className="w-2.5 h-2.5 bg-current rounded-full shadow-[0_0_5px_currentColor]"></div>;
  const empty = <div></div>;
  
  const faces = {
    1: [empty, empty, empty, empty, dot, empty, empty, empty, empty],
    2: [empty, empty, dot, empty, empty, empty, dot, empty, empty],
    3: [empty, empty, dot, empty, dot, empty, dot, empty, empty],
    4: [dot, empty, dot, empty, empty, empty, dot, empty, dot],
    5: [dot, empty, dot, empty, dot, empty, dot, empty, dot],
    6: [dot, empty, dot, dot, empty, dot, dot, empty, dot],
  };

  return (
    <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-2 place-items-center">
      {faces[value].map((d, i) => <div key={i}>{d}</div>)}
    </div>
  );
};

export default function DadosPage() {
  const [showHelp, setShowHelp] = useState(false);
  
  // Estados del Juego
  const [dice, setDice] = useState(Array(6).fill({ value: null, locked: false, selected: false }));
  const [turnScore, setTurnScore] = useState(0); 
  const [playerScore, setPlayerScore] = useState(0);
  const [toduScore, setToduScore] = useState(0);
  const [activePlayer, setActivePlayer] = useState('player');
  const [winner, setWinner] = useState(null);
  
  const [isRolling, setIsRolling] = useState(false);
  const [message, setMessage] = useState('');
  
  // Estado para controlar la emoción del avatar de Todú en tiempo real
  const [toduEmotion, setToduEmotion] = useState('idle');

  // === TURNO DEL JUGADOR ===
  const rollDice = () => {
    setIsRolling(true);
    setMessage('');
    setToduEmotion('idle'); // Reseteamos emoción
    
    const currentSelectedValues = dice.filter(d => d.selected && !d.locked).map(d => d.value);
    const newPoints = calculatePoints(currentSelectedValues);
    setTurnScore(prev => prev + newPoints);

    setTimeout(() => {
      let newDice = dice.map(d => {
        if (d.locked || d.selected) return { ...d, locked: true, selected: false };
        return { value: Math.floor(Math.random() * 6) + 1, locked: false, selected: false };
      });
      
      if (newDice.every(d => d.locked)) {
        newDice = Array(6).fill({ value: Math.floor(Math.random() * 6) + 1, locked: false, selected: false });
      }
      
      setDice(newDice);
      setIsRolling(false);
      
      if (isBust(newDice.filter(d => !d.locked).map(d => d.value))) {
        setMessage('¡ZOUNDS! Perdiste el turno.');
        setToduEmotion('happy'); // Todú se ríe de que perdiste
        setTimeout(() => { passTurn('todu'); }, 2000);
      }
    }, 500);
  };

  const toggleDieSelection = (index) => {
    if (activePlayer !== 'player' || dice[index].locked || isRolling || message || dice[index].value === null) return;
    const newDice = [...dice];
    newDice[index].selected = !newDice[index].selected;
    setDice(newDice);
  };

  const bankPoints = () => {
    const currentSelectedValues = dice.filter(d => d.selected && !d.locked).map(d => d.value);
    const newPoints = calculatePoints(currentSelectedValues);
    setPlayerScore(prev => prev + turnScore + newPoints);
    setToduEmotion('idle');
    passTurn('todu');
  };

  const passTurn = (nextPlayer) => {
    setTurnScore(0);
    setDice(Array(6).fill({ value: null, locked: false, selected: false }));
    setMessage('');
    setActivePlayer(nextPlayer);
  };

  // === INTELIGENCIA ARTIFICIAL DE TODÚ ===
  useEffect(() => {
    let isMounted = true;
    if (activePlayer !== 'todu' || winner) return;

    const playToduTurn = async () => {
      let activeDice = Array(6).fill({ value: null, locked: false, selected: false });
      let currentTurnScore = 0;
      setToduEmotion('idle');

      const updateUI = async (d, s, delayMs = 1000) => {
        if(!isMounted) return;
        setDice([...d]);
        setTurnScore(s);
        await new Promise(r => setTimeout(r, delayMs));
      };

      setMessage('Todú está pensando...');
      await new Promise(r => setTimeout(r, 1200));

      while (isMounted && activePlayer === 'todu' && !winner) {
        setMessage('Todú tira los dados...');
        setIsRolling(true);
        activeDice = activeDice.map(d => 
          (d.locked || d.selected) ? { ...d, locked: true, selected: false } : { value: Math.floor(Math.random() * 6) + 1, locked: false, selected: false }
        );
        if (activeDice.every(d => d.locked)) activeDice = Array(6).fill({ value: Math.floor(Math.random() * 6) + 1, locked: false, selected: false });
        
        await updateUI(activeDice, currentTurnScore, 600);
        setIsRolling(false);

        const unlockedVals = activeDice.filter(d => !d.locked).map(d => d.value);
        if (isBust(unlockedVals)) {
          setMessage('¡Todú sacó ZOUNDS y pierde el turno!');
          setToduEmotion('sad'); // Todú se sorprende/entristece por perder turno
          await new Promise(r => setTimeout(r, 2500));
          if(isMounted) {
             setToduEmotion('idle');
             passTurn('player');
          }
          return;
        }

        setMessage('Todú separa dados...');
        const scoringIndices = getScoringIndices(activeDice);
        scoringIndices.forEach(i => activeDice[i].selected = true);
        await updateUI(activeDice, currentTurnScore, 1000);

        const selectedVals = activeDice.filter(d => d.selected && !d.locked).map(d => d.value);
        currentTurnScore += calculatePoints(selectedVals);
        setToduEmotion('happy'); // Se pone feliz porque sumó puntos
        await updateUI(activeDice, currentTurnScore, 1000);

        const unlockedCount = activeDice.filter(d => !d.locked && !d.selected).length;
        if (toduScore + currentTurnScore >= META_PUNTOS || unlockedCount === 0 || currentTurnScore >= 400 || unlockedCount <= 2) {
          setMessage('Todú se planta y asegura.');
          await new Promise(r => setTimeout(r, 1500));
          if(isMounted) {
            setToduScore(prev => prev + currentTurnScore);
            setToduEmotion('idle');
            passTurn('player');
          }
          return;
        }
        setToduEmotion('idle');
      }
    };

    playToduTurn();
    return () => { isMounted = false; };
  }, [activePlayer, winner, toduScore]);

  // === COMPROBAR GANADOR ===
  useEffect(() => {
    if (playerScore >= META_PUNTOS) setWinner('Jorge');
    else if (toduScore >= META_PUNTOS) setWinner('Todú');
  }, [playerScore, toduScore]);

  const selectedValues = dice.filter(d => d.selected && !d.locked).map(d => d.value);
  const currentSelectionPoints = calculatePoints(selectedValues);
  const canRollOrBank = currentSelectionPoints > 0;
  const isFirstRoll = dice.every(d => d.value === null);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans pb-10 overflow-x-hidden relative selection:bg-cyan-500 selection:text-white">
      
      {/* Fondo Neón */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10" style={{ backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.4) 1px, transparent 1px)`, backgroundSize: '40px 40px', backgroundPosition: 'center center' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80"></div>
      </div>

      <header className="relative z-10 sticky top-0 bg-[#050505]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-cyan-500/30">
        <div className="flex items-center gap-4">
          <Link href="/arcade" className="w-10 h-10 rounded-full bg-black border border-cyan-500/50 flex items-center justify-center text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <h1 className="text-sm font-black text-cyan-400 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">Dados vs Todú</h1>
        </div>
        <button onClick={() => setShowHelp(true)} className="w-10 h-10 rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400 hover:bg-cyan-900 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.3)]">
          <span className="font-black text-lg">?</span>
        </button>
      </header>

      <main className="relative z-10 max-w-md mx-auto px-6 flex flex-col mt-6">
        
        {/* Marcadores Principales (Versus) */}
        <div className="flex justify-between items-center mb-6 gap-3">
          {/* Jugador */}
          <div className={`flex-1 rounded-2xl p-3 text-center border transition-all ${activePlayer === 'player' ? 'bg-cyan-900/40 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-black/40 border-cyan-500/20'}`}>
            <p className="text-[10px] text-cyan-300/70 uppercase tracking-widest font-bold mb-1">Tú</p>
            <p className="text-2xl font-black text-white">{playerScore}</p>
          </div>
          
          <div className="text-cyan-600 font-black text-xl italic opacity-50 px-2">VS</div>
          
          {/* Todú (Con su Avatar reaccionando) */}
          <div className={`flex-1 rounded-2xl p-3 flex flex-col items-center justify-center border transition-all relative overflow-hidden ${activePlayer === 'todu' ? 'bg-purple-900/40 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'bg-black/40 border-purple-500/20'}`}>
             <div className="absolute opacity-20 -right-4 -bottom-4 w-20 h-20 pointer-events-none">
                <ToduAvatar emotion={toduEmotion} size={80} />
             </div>
             <p className="text-[10px] text-purple-300/70 uppercase tracking-widest font-bold mb-1 relative z-10">Todú</p>
             <p className="text-2xl font-black text-white relative z-10">{toduScore}</p>
          </div>
        </div>
        
        <div className="text-center mb-4">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Meta: {META_PUNTOS} PTS</p>
        </div>

        {/* Zona de Dados */}
        <div className={`bg-black/60 border-2 rounded-3xl p-6 min-h-[280px] flex flex-col justify-center items-center relative transition-colors ${activePlayer === 'player' ? 'border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.05)]' : 'border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.05)]'}`}>
          
          <div className="absolute top-4 left-0 w-full text-center">
            {message ? (
              <span className="text-xs font-black uppercase tracking-widest text-white animate-pulse bg-black/80 px-4 py-1 rounded-full border border-white/10">{message}</span>
            ) : (
              <span className={`text-xs font-black uppercase tracking-widest ${activePlayer === 'player' ? 'text-cyan-400' : 'text-purple-400'}`}>
                {activePlayer === 'player' ? 'Tu Turno' : 'Turno de Todú'}
              </span>
            )}
          </div>

          <div className="mt-8 mb-6 text-center">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Acumulado del Turno</p>
            <p className={`text-4xl font-black drop-shadow-[0_0_10px_currentColor] ${activePlayer === 'player' ? 'text-cyan-400' : 'text-purple-400'}`}>
              {turnScore + (activePlayer === 'player' ? currentSelectionPoints : 0)}
            </p>
          </div>

          {isFirstRoll && !message ? (
            <div className="text-center opacity-50 my-6">
              <span className="text-5xl mb-4 block">🎲</span>
              <p className="text-sm font-bold tracking-widest uppercase">Tira para empezar</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-5 w-full place-items-center">
              {dice.map((d, index) => (
                <button
                  key={index}
                  onClick={() => toggleDieSelection(index)}
                  disabled={d.locked || d.value === null || activePlayer !== 'player'}
                  className={`w-16 h-16 rounded-xl transition-all duration-300 transform ${
                    isRolling ? 'animate-spin opacity-50 scale-75' : 'scale-100'
                  } ${
                    d.value === null ? 'bg-transparent border-2 border-slate-800' :
                    d.locked ? 'bg-slate-900 border-2 border-slate-700 text-slate-600 cursor-not-allowed opacity-40' :
                    d.selected ? (activePlayer === 'player' ? 'bg-cyan-600 border-2 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.8)] -translate-y-2' : 'bg-purple-600 border-2 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.8)] -translate-y-2') :
                    'bg-slate-800 border-2 border-slate-500 text-white hover:border-white shadow-lg'
                  }`}
                >
                  <DieFace value={d.value} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Controles de Acción */}
        <div className={`mt-8 flex flex-col gap-4 transition-opacity duration-500 ${activePlayer === 'player' ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
          <button 
            onClick={rollDice}
            disabled={!isFirstRoll && !canRollOrBank && !message}
            className={`w-full py-4 rounded-full font-black uppercase tracking-widest transition-all ${
              (!isFirstRoll && !canRollOrBank && !message)
                ? 'bg-slate-800 text-slate-500'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] active:scale-95'
            }`}
          >
            {isFirstRoll ? 'Tirar Dados' : 'Separar y Volver a Tirar'}
          </button>
          
          <button 
            onClick={bankPoints}
            disabled={isFirstRoll || turnScore + currentSelectionPoints === 0 || message !== ''}
            className={`w-full py-4 rounded-full font-black uppercase tracking-widest transition-all border-2 ${
              (isFirstRoll || turnScore + currentSelectionPoints === 0 || message !== '')
                ? 'border-slate-800 text-slate-700'
                : 'border-cyan-500 text-cyan-400 hover:bg-cyan-950 active:scale-95'
            }`}
          >
            Plantarse y Asegurar Puntos
          </button>
        </div>

        {/* Modal de Victoria/Derrota con Reacciones de Todú */}
        {winner && (
          <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center border-t-4 border-cyan-500">
             
             {/* Rive Avatar en lugar de emojis */}
             <div className="mb-6 bg-[#0b1120] rounded-full p-4 border border-white/10 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
               <ToduAvatar 
                 emotion={winner === 'Jorge' ? 'surprised' : 'happy'} 
                 size={100} 
               />
             </div>
             
             <h2 className={`text-4xl font-black tracking-widest mb-4 drop-shadow-[0_0_15px_currentColor] ${winner === 'Jorge' ? 'text-cyan-400' : 'text-purple-400'}`}>
                {winner === 'Jorge' ? '¡GANASTE!' : 'TODÚ GANA'}
             </h2>
             
             <p className="text-slate-300 font-medium mb-2">
               Marcador Final
             </p>
             <p className="text-white text-2xl font-black mb-10 bg-white/10 px-6 py-2 rounded-2xl border border-white/20">
               Tú: {playerScore} <span className="text-slate-500 mx-2">|</span> Todú: {toduScore}
             </p>
             
             <button onClick={() => { setPlayerScore(0); setToduScore(0); setWinner(null); setActivePlayer('player'); }} className="bg-cyan-600 text-white font-black uppercase tracking-widest px-10 py-4 rounded-full shadow-[0_0_25px_rgba(6,182,212,0.6)] mb-6 border border-cyan-400 active:scale-95 transition-transform">
               Jugar Revancha
             </button>
             
             <Link href="/arcade" className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Volver al Lobby</Link>
          </div>
        )}
      </main>

      {/* Modal de Ayuda */}
      {showHelp && (
        <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex flex-col items-center justify-center p-6">
          <div className="bg-[#111827] border border-cyan-500/30 rounded-3xl p-6 w-full max-w-sm relative shadow-[0_0_30px_rgba(6,182,212,0.2)]">
            <button onClick={() => setShowHelp(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
              <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" viewBox="0 0 100 100" fill="none">
                  <path d="M75 45 C85 40, 90 60, 80 65" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                  <ellipse cx="50" cy="60" rx="30" ry="28" fill="white" />
                  <line x1="50" y1="32" x2="50" y2="15" stroke="white" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="50" cy="12" r="4" fill="#06B6D4" />
                  <path d="M35 55 Q40 48 45 55" stroke="#06B6D4" strokeWidth="4" strokeLinecap="round" />
                  <path d="M55 55 Q60 48 65 55" stroke="#06B6D4" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-cyan-400 font-black tracking-widest uppercase text-sm">Todú te explica</h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">El primero en {META_PUNTOS} gana</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-300 font-medium">
              <p>Tira los 6 dados. Para seguir tirando, <span className="text-white font-bold">selecciona dados que sumen puntos</span>.</p>
              
              <ul className="bg-black/50 rounded-xl p-4 border border-white/5 space-y-3">
                <li className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    Dado con 
                    <div className="w-4 h-4 rounded-md border border-cyan-500/50 flex items-center justify-center bg-slate-900">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_3px_currentColor]"></div>
                    </div> 
                    (1)
                  </span> 
                  <span className="font-bold text-white">100 pts</span>
                </li>
                
                {/* Corrección del Dado 5 */}
                <li className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    Dado con 
                    <div className="w-4 h-4 rounded-md border border-cyan-500/50 bg-slate-900 p-0.5 grid grid-cols-3 grid-rows-3 place-items-center">
                      <div className="w-0.5 h-0.5 bg-cyan-400 rounded-full"></div><div></div><div className="w-0.5 h-0.5 bg-cyan-400 rounded-full"></div>
                      <div></div><div className="w-0.5 h-0.5 bg-cyan-400 rounded-full"></div><div></div>
                      <div className="w-0.5 h-0.5 bg-cyan-400 rounded-full"></div><div></div><div className="w-0.5 h-0.5 bg-cyan-400 rounded-full"></div>
                    </div>
                    (5)
                  </span> 
                  <span className="font-bold text-white">50 pts</span>
                </li>
                
                <li className="flex justify-between pt-1 border-t border-white/10"><span>Trío de 1s</span> <span className="font-bold text-yellow-400">1000 pts</span></li>
                <li className="flex justify-between"><span>Otros Tríos (ej. 4-4-4)</span> <span className="font-bold text-white">Valor x 100</span></li>
              </ul>

              <p className="text-rose-400 font-bold bg-rose-500/10 p-3 rounded-xl border border-rose-500/20 text-xs">
                ⚠️ Si tiras y no sale ningún 1, 5 o trío, pierdes los puntos del turno (ZOUNDS) y le toca a Todú.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}