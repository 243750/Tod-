'use client';
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { useEffect } from 'react';

export default function ToduAvatar({ emotion = 'idle', size = 110 }) {
  const { rive, RiveComponent } = useRive({
    src: '/todufinal.riv',
    stateMachines: 'State Machine 1', // Asegúrate de que este es el nombre correcto
    autoplay: true,
    // Esto ayuda a que el robot trate de llenar mejor el espacio
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  // 1. Inputs de las Emociones
  const smilingInput = useStateMachineInput(rive, 'State Machine 1', 'Smiling');
  const happyInput = useStateMachineInput(rive, 'State Machine 1', 'Happy');
  const sadInput = useStateMachineInput(rive, 'State Machine 1', 'Sad');
  const scaredInput = useStateMachineInput(rive, 'State Machine 1', 'Scared');
  const surprisedInput = useStateMachineInput(rive, 'State Machine 1', 'Surprised');

  // 2. Inputs de los Accesorios (Desbloqueables)
  const easterInput = useStateMachineInput(rive, 'State Machine 1', 'Easter');
  const halloweenInput = useStateMachineInput(rive, 'State Machine 1', 'Halloween');
  const christmasInput = useStateMachineInput(rive, 'State Machine 1', 'Christmas');

  // Apagar accesorios por defecto al cargar
  useEffect(() => {
    if (easterInput) easterInput.value = false;
    if (halloweenInput) halloweenInput.value = false;
    if (christmasInput) christmasInput.value = false;
  }, [easterInput, halloweenInput, christmasInput]);

  // Manejar el cambio de emociones
  useEffect(() => {
    if (!rive) return;

    // Reseteamos todas a falso primero
    if (smilingInput) smilingInput.value = false;
    if (happyInput) happyInput.value = false;
    if (sadInput) sadInput.value = false;
    if (scaredInput) scaredInput.value = false;
    if (surprisedInput) surprisedInput.value = false;

    // Activamos la que pasamos por prop
    switch (emotion) {
      case 'smiling': if (smilingInput) smilingInput.value = true; break;
      case 'happy': if (happyInput) happyInput.value = true; break;
      case 'sad': if (sadInput) sadInput.value = true; break;
      case 'scared': if (scaredInput) scaredInput.value = true; break;
      case 'surprised': if (surprisedInput) surprisedInput.value = true; break;
      case 'idle':
      default:
        // Todas en falso lo dejan en estado neutral
        break;
    }
  }, [emotion, rive, smilingInput, happyInput, sadInput, scaredInput, surprisedInput]);

return (
    // 1. El marco exacto: Le devolvemos el 'overflow-hidden' para que recorte el lienzo gigante y no se coma tu pantalla
    <div style={{ width: size, height: size }} className="relative flex justify-center items-center overflow-hidden pointer-events-none">
      
      {/* 2. El lienzo de alta resolución: 250% más grande, pero atrapado dentro del marco anterior */}
      <div className="absolute flex justify-center items-center w-[250%] h-[250%]">
        <RiveComponent className="w-full h-full" />
      </div>

    </div>
  );
}