'use client';
import { useState } from 'react';
import Link from 'next/link';

// Datos de prueba con el campo "toduTip"
const MOCK_PLACES = [
  {
    id: '1',
    name: 'Café de Especialidad 5 B',
    rating: 4.8,
    reviews: 124,
    category: 'Cafeterías',
    distance: '1.2 km',
    isOpen: true,
    address: 'Blvd. Belisario Domínguez, Tuxtla Gutiérrez',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
    toduTip: 'Tiene el WiFi más estable de la zona. Ideal para programar sin interrupciones.'
  },
  {
    id: '2',
    name: 'Biblioteca Central Universitaria',
    rating: 4.9,
    reviews: 312,
    category: 'Bibliotecas',
    distance: '3.5 km',
    isOpen: true,
    address: 'Campus Universitario',
    imageUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=600&q=80',
    toduTip: 'Silencio absoluto. Perfecto si tienes que estudiar para Cálculo o Ecuaciones Diferenciales.'
  },
  {
    id: '3',
    name: 'Parque de la Marimba',
    rating: 4.7,
    reviews: 890,
    category: 'Parques',
    distance: '5.0 km',
    isOpen: true,
    address: 'Centro, Tuxtla Gutiérrez',
    imageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80',
    toduTip: 'Excelente lugar para despejar la mente y tomar aire fresco después de clases.'
  },
  {
    id: '4',
    name: 'El Rincón del Coiteco',
    rating: 4.5,
    reviews: 89,
    category: 'Para comer',
    distance: '0.8 km',
    isOpen: false,
    address: 'Centro, Ocozocoautla',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    toduTip: 'Gran opción para recargar energías con comida local y buen ambiente.'
  }
];

const CATEGORIES = ['Todos', 'Cafeterías', 'Bibliotecas', 'Parques', 'Para comer'];

export default function PlacesPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlaces = MOCK_PLACES.filter(place => {
    const matchesCategory = activeCategory === 'Todos' || place.category === activeCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-200 font-sans pb-10 overflow-x-hidden">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0b1120]/90 backdrop-blur-md px-6 py-4 flex items-center gap-4 border-b border-white/5">
        <Link href="/descubrir" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-white tracking-wide">Todú Places</h1>
          <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Recomendaciones Inteligentes</p>
        </div>
      </header>

      <main className="max-w-md mx-auto flex flex-col mt-4">
        
        {/* Buscador */}
        <div className="px-6 mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="¿Qué estás buscando hoy?" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Filtros Horizontales */}
        <div className="px-6 mb-6 overflow-x-auto pb-2 scrollbar-hide flex gap-2 snap-x">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`snap-start whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]' 
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Lista de Resultados */}
        <div className="px-6 flex flex-col gap-6">
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place) => (
              <div key={place.id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col group cursor-pointer hover:border-white/20 transition-colors">
                
                {/* 1. Imagen del Lugar */}
                <div className="relative h-40 w-full overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${place.imageUrl})` }}
                  ></div>
                  <div className="absolute top-3 left-3 bg-[#0b1120]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-[10px] font-bold text-white">{place.distance}</span>
                  </div>
                </div>

                {/* 2. Info del Lugar */}
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-start gap-2">
                    <h2 className="text-sm font-bold text-white leading-tight line-clamp-2">{place.name}</h2>
                    <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20 flex-shrink-0">
                      <span className="text-xs text-amber-400">★</span>
                      <span className="text-xs font-bold text-amber-400">{place.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-[11px] text-slate-400 line-clamp-1">{place.address}</p>
                  
                  <div className="flex justify-between items-center mt-2 pt-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{place.category}</span>
                    {place.isOpen ? (
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.8)]"></span>
                        Abierto
                      </span>
                    ) : (
                      <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        Cerrado
                      </span>
                    )}
                  </div>
                </div>

                {/* 3. El Todú Tip (Estilo Imagen Referencia) */}
                <div className="p-4 pt-1 flex items-end gap-3">
                  
                  {/* Avatar Blanco con Resplandor */}
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center mb-1">
                    <svg className="w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M75 45 C85 40, 90 60, 80 65" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none"/>
                      <ellipse cx="50" cy="60" rx="30" ry="28" fill="white" />
                      <line x1="50" y1="32" x2="50" y2="15" stroke="white" strokeWidth="5" strokeLinecap="round" />
                      <circle cx="50" cy="12" r="4" fill="#FFC107" />
                      <path d="M35 55 Q40 48 45 55" stroke="#FFC107" strokeWidth="4" strokeLinecap="round" fill="none" />
                      <path d="M55 55 Q60 48 65 55" stroke="#FFC107" strokeWidth="4" strokeLinecap="round" fill="none" />
                    </svg>
                  </div>

                  {/* Burbuja de Chat con flecha (Pointer) */}
                  <div className="relative flex-1 bg-[#232936] border border-white/10 rounded-2xl p-3 shadow-md">
                    {/* Flecha lateral de la burbuja */}
                    <div className="absolute -left-[6px] bottom-[12px] w-3 h-3 bg-[#232936] border-l border-b border-white/10 transform rotate-45"></div>
                    
                    <h4 className="text-[#FFC107] text-[11px] font-bold mb-1">Todú:</h4>
                    <p className="text-[11px] text-slate-300 leading-snug font-medium">
                      {place.toduTip}
                    </p>
                  </div>

                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <span className="text-4xl block mb-3">📍</span>
              <p className="text-sm text-slate-400 font-medium">No encontramos lugares con esos filtros.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}