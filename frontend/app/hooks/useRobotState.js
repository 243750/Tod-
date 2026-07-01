'use client';
import { useState } from 'react';

export function useRobotState() {
  const [emocionActual, setEmocionActual] = useState(1); // 1 = Idle / Normal
  const [mensaje, setMensaje] = useState("¡Hola! ¿Qué tenemos para hoy?");

  const gatillarEstadoTemporal = (nuevoEstadoId, mensajeTemporal, duracion = 4000) => {
    setEmocionActual(nuevoEstadoId);
    setMensaje(mensajeTemporal);
    
    setTimeout(() => {
      setEmocionActual(1);
      setMensaje("¡Hola! ¿Qué tenemos para hoy?");
    }, duracion);
  };

  const simularAprobacionTarea = () => {
    gatillarEstadoTemporal(2, "¡Excelente trabajo! Tarea verificada por la IA.");
  };

  const simularNivelUp = () => {
    gatillarEstadoTemporal(5, "¡Genial! Has añadido una nueva meta al tablero.");
  };

  return {
    emocionActual,
    mensaje,
    simularAprobacionTarea,
    simularNivelUp,
  };
}