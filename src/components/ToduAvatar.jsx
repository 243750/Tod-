'use client';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect, useRef } from 'react';

const EMOTION_MAP = {
  idle:      1,
  happy:     2,
  sad:       3,
  scared:    4,
  surprised: 5,
};

function getSeasonalValue() {
  const month = new Date().getMonth() + 1;
  if (month === 4) return 2; 
  if (month === 10) return 3; 
  if (month === 12) return 4; 
  return 1; 
}

export default function ToduAvatar({ emotion = 'idle', size = 300 }) {
  // Referencia para atrapar el lienzo (canvas) en el DOM
  const containerRef = useRef(null);
  
  const { RiveComponent, rive } = useRive({
    src: '/animations/robot.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
  });

  const expressionInput = useStateMachineInput(rive, 'State Machine 1', 'Expressions');
  const seasonalInput = useStateMachineInput(rive, 'State Machine 1', 'Seasonal');

  // EFECTO 1: Emociones
  useEffect(() => {
    if (expressionInput) {
      expressionInput.value = EMOTION_MAP[emotion];
    }
  }, [emotion, expressionInput]);

  // EFECTO 2: Temporada
  useEffect(() => {
    if (seasonalInput) {
      seasonalInput.value = getSeasonalValue();
    }
  }, [seasonalInput]);

  // EFECTO 3: Seguimiento Global del Mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      // isTrusted evita un bucle infinito (solo reacciona a movimientos humanos)
      if (!e.isTrusted || !containerRef.current) return;
      
      const canvas = containerRef.current.querySelector('canvas');
      if (canvas) {
        // Le "inyectamos" un evento de mouse falso al canvas de Rive
        // con las coordenadas reales de toda tu pantalla.
        canvas.dispatchEvent(new MouseEvent('mousemove', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true
        }));
      }
    };

    // Escuchamos a toda la ventana, no solo al componente
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{ width: size, height: size }} 
      className="mx-auto flex justify-center items-center"
    >
      <RiveComponent />
    </div>
  );
}