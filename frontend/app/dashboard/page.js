'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRobotState } from '../hooks/useRobotState';
import { Trash2, Edit3, Plus, CheckCircle, Circle, X, Save, LogOut } from 'lucide-react';

// Carga Dinámica Segura (SSR: false) para el Canvas de Rive
const ToduAvatar = dynamic(
  () => import('../../components/ToduAvatar'),
  {
    ssr: false,
    loading: () => (
      <div className="w-[180px] h-[180px] flex items-center justify-center text-gray-400 text-xs">
        Cargando Todú...
      </div>
    )
  }
);

export default function DashboardPage() {
  const { 
    emocionActual, 
    mensaje, 
    simularAprobacionTarea, 
    simularTareaUrgente,
    simularNivelUp
  } = useRobotState();

  // --- ESTADO LOCAL COMPLETO PARA LAS TAREAS ---
  const [tareas, setTareas] = useState([
    { id: 1, texto: 'Configurar estructura en VS Code', completada: true },
    { id: 2, texto: 'Diseñar la interfaz de la PWA', completada: true },
    { id: 3, texto: 'Conectar base de datos PostgreSQL', completada: false }
  ]);

  // Estados de control para inputs y modales
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [showForm, setShowForm] = useState(false); // Controla el despliegue del formulario
  const [tareaEnEdicion, setTareaEnEdicion] = useState(null);
  const [textoEdicion, setTextoEdicion] = useState('');

  // Contador de pendientes reales (incompletas)
  const pendientes = tareas.filter(t => !t.completada).length;

  // --- MÉTODOS DEL CRUD ---
  const agregarTarea = (e) => {
    e.preventDefault();
    if (!nuevaTarea.trim()) return;

    const nueva = {
      id: Date.now(),
      texto: nuevaTarea,
      completada: false
    };

    setTareas([...tareas, nueva]);
    setNuevaTarea('');
    setShowForm(false); // Cierra el formulario tras agregar
    simularNivelUp(); // Animación de sorpresa (5)
  };

  const alternarCompletar = (id, estadoActual) => {
    setTareas(tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
    if (!estadoActual) {
      simularAprobacionTarea(); // Animación de felicidad (2)
    }
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter(t => t.id !== id));
  };

  const activarEdicion = (tarea) => {
    setTareaEnEdicion(tarea.id);
    setTextoEdicion(tarea.texto);
  };

  const guardarEdicion = (id) => {
    if (!textoEdicion.trim()) return;
    setTareas(tareas.map(t => t.id === id ? { ...t, texto: textoEdicion } : t));
    setTareaEnEdicion(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-28 relative">
      
      {/* BARRA SUPERIOR IDENTICA A TU CAPTURA */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-[#0046b0]">Todú</h1>
        <button className="text-gray-400 hover:text-red-600 p-1 rounded-lg transition-colors">
          <LogOut size={22} />
        </button>
      </nav>

      <main className="max-w-md w-full mx-auto px-4 mt-6 flex-grow flex flex-col">
        
        {/* TARJETA AZUL EMOCIONAL (TU DISEÑO ACTUALIZADO) */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-3xl shadow-md mb-6 relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1 max-w-[55%]">
            <span className="text-xs font-semibold opacity-80 flex items-center gap-1">
              📅 Hoy, {new Date().getFullYear()}
            </span>
            <h2 className="text-2xl font-bold tracking-tight">Mis pendientes</h2>
            <p className="text-xs opacity-90">
              {pendientes === 0 ? 'Tienes 0 tareas para completar' : `Tienes ${pendientes} ${pendientes === 1 ? 'tarea' : 'tareas'} para completar`}
            </p>
            
            {/* Pequeño globo de diálogo del robot integrado dentro de la tarjeta */}
            <p className="text-[11px] bg-white/10 p-2 rounded-lg font-medium italic mt-2 border border-white/10">
              "{mensaje}"
            </p>
          </div>

          {/* INTEGRACIÓN DEL ROBOT INTERACTIVO DENTRO DE LA TARJETA */}
          <div className="w-[120px] h-[120px] relative flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 shrink-0">
            <ToduAvatar emocionActual={emocionActual} />
            <span className="absolute bottom-1 right-2 bg-blue-700 text-[9px] px-1.5 py-0.5 rounded font-bold">
              ID: {emocionActual}
            </span>
          </div>
        </div>

        {/* INPUT FLOTANTE TEMPORAL PARA CREACIÓN */}
        {showForm && (
          <form onSubmit={agregarTarea} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-lg mb-4 animate-in fade-in duration-200">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Escribe tu nueva tarea aquí..."
                value={nuevaTarea}
                onChange={(e) => setNuevaTarea(e.target.value)}
                className="flex-grow border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0046b0]"
                autoFocus
              />
              <button type="submit" className="bg-[#0046b0] text-white p-2 rounded-xl">
                <Plus size={20} />
              </button>
            </div>
          </form>
        )}

        {/* LISTADO DE TAREAS INTERACTIVO CON TU ESTILO VISUAL */}
        <div className="space-y-3 flex-grow">
          {tareas.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-12">No hay tareas. ¡Buen trabajo!</p>
          ) : (
            tareas.map((tarea) => (
              <div 
                key={tarea.id} 
                className={`bg-white p-4 rounded-2xl border flex items-center justify-between gap-3 shadow-sm transition-all ${
                  tarea.completada ? 'border-gray-100 opacity-60' : 'border-gray-200/80'
                }`}
              >
                <div className="flex items-center gap-4 flex-grow overflow-hidden">
                  {/* Selector circular */}
                  <button 
                    onClick={() => alternarCompletar(tarea.id, tarea.completada)}
                    className="text-gray-300 hover:text-[#0046b0] transition-colors shrink-0"
                  >
                    {tarea.completada ? (
                      <CheckCircle size={24} className="text-green-500" />
                    ) : (
                      <Circle size={24} className="text-gray-300" />
                    )}
                  </button>

                  {/* Modo Edición o Texto Normal */}
                  {tareaEnEdicion === tarea.id ? (
                    <input 
                      type="text"
                      value={textoEdicion}
                      onChange={(e) => setTextoEdicion(e.target.value)}
                      className="border-b-2 border-[#0046b0] flex-grow text-sm outline-none py-0.5 text-gray-800 font-medium"
                      autoFocus
                    />
                  ) : (
                    <p className={`text-sm font-medium truncate flex-grow ${
                      tarea.completada ? 'line-through text-gray-400' : 'text-gray-700'
                    }`}>
                      {tarea.texto}
                    </p>
                  )}
                </div>

                {/* Botones de acción lateral */}
                <div className="flex items-center gap-1 shrink-0">
                  {tareaEnEdicion === tarea.id ? (
                    <>
                      <button onClick={() => guardarEdicion(tarea.id)} className="text-green-600 hover:bg-green-50 p-1.5 rounded-xl">
                        <Save size={18} />
                      </button>
                      <button onClick={() => setTareaEnEdicion(null)} className="text-gray-400 p-1.5 rounded-xl">
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      {!tarea.completada && (
                        <button onClick={() => activarEdicion(tarea)} className="text-gray-400 hover:text-gray-600 p-1.5 rounded-xl">
                          <Edit3 size={16} />
                        </button>
                      )}
                      <button onClick={() => eliminarTarea(tarea.id)} className="text-gray-400 hover:text-red-500 p-1.5 rounded-xl">
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>

              </div>
            ))
          )}
        </div>

        {/* BOTÓN FLOTANTE AZUL "+" (IGUAL A TU CAPTURA) */}
        <button 
          onClick={() => setShowForm(!showForm)}
          className="fixed bottom-6 right-6 bg-[#0046b0] hover:bg-[#00368a] text-white p-4 rounded-full shadow-xl transition-transform active:scale-95 z-20"
        >
          {showForm ? <X size={26} /> : <Plus size={26} />}
        </button>

      </main>
    </div>
  );
}