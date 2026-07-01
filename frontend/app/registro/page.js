'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, X } from 'lucide-react';

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false);
  
  // Estados independientes para cada recuadro (Modal)
  const [modalTerminos, setModalTerminos] = useState(false);
  const [modalPrivacidad, setModalPrivacidad] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans relative">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg border border-gray-100 p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0046b0] mb-2">Todú</h1>
          <p className="text-gray-600 text-sm">Crea tu cuenta para comenzar.</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre(s)</label>
            <input type="text" className="w-full border-b-2 border-gray-200 focus:border-[#0046b0] outline-none py-2 transition-colors bg-transparent" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Apellido Paterno</label>
            <input type="text" className="w-full border-b-2 border-gray-200 focus:border-[#0046b0] outline-none py-2 transition-colors bg-transparent" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Apellido Materno</label>
            <input type="text" className="w-full border-b-2 border-gray-200 focus:border-[#0046b0] outline-none py-2 transition-colors bg-transparent" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha de Nacimiento</label>
            <input type="date" className="w-full border-b-2 border-gray-200 focus:border-[#0046b0] outline-none py-2 transition-colors text-gray-500 bg-transparent" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
            <input type="email" className="w-full border-b-2 border-gray-200 focus:border-[#0046b0] outline-none py-2 transition-colors bg-transparent" />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
            <input type={showPassword ? "text" : "password"} className="w-full border-b-2 border-gray-200 focus:border-[#0046b0] outline-none py-2 transition-colors bg-transparent" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 bottom-2 text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#0046b0] focus:ring-[#0046b0]" />
              <span>
                Acepto los{' '}
                <span 
                  onClick={(e) => {
                    e.preventDefault(); // Evita que marque el checkbox al dar clic en el texto
                    setModalTerminos(true);
                  }} 
                  className="underline text-[#0046b0] font-medium hover:text-[#00368a]"
                >
                  Términos y Condiciones
                </span>
              </span>
            </label>
            
            <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#0046b0] focus:ring-[#0046b0]" />
              <span>
                He leído el{' '}
                <span 
                  onClick={(e) => {
                    e.preventDefault(); // Evita que marque el checkbox al dar clic en el texto
                    setModalPrivacidad(true);
                  }} 
                  className="underline text-[#0046b0] font-medium hover:text-[#00368a]"
                >
                  Aviso de Privacidad
                </span>
              </span>
            </label>
          </div>

          <button type="submit" className="w-full bg-[#0046b0] hover:bg-[#00368a] text-white font-bold py-3 rounded-lg shadow-md transition-all mt-4">
            Crear mi cuenta
          </button>
        </form>

        <div className="text-center mt-8">
          <Link href="/login" className="text-[#0046b0] font-medium hover:underline text-sm">
            Ya tengo cuenta. Iniciar sesión
          </Link>
        </div>
      </div>

      {/* ================= RECUADRO EMERGENTE: TÉRMINOS Y CONDICIONES ================= */}
      {modalTerminos && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col max-h-[75vh] overflow-hidden border border-gray-100">
            <div className="px-6 pt-6 pb-4 flex justify-between items-center bg-white sticky top-0">
              <h2 className="text-xl font-bold text-[#0046b0]">Términos y Condiciones</h2>
              <button onClick={() => setModalTerminos(false)} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                <X size={22} />
              </button>
            </div>
            <div className="px-6 pb-6 overflow-y-auto flex-grow text-[14px] text-gray-600 space-y-5 pr-4 leading-relaxed text-justify">
              <h3 className="font-bold text-gray-800 text-base">Términos y Condiciones de Uso</h3>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">1. Aceptación de los Términos</p>
                <p>Al crear una cuenta y utilizar la aplicación "Todú" (en adelante, "El Servicio"), usted acepta estar sujeto a los presentes Términos y Condiciones. Si no está de acuerdo con alguna parte de los mismos, no deberá utilizar la aplicación.</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">2. Restricción de Edad</p>
                <p>El Servicio está estrictamente dirigido a personas mayores de 18 años. Al crear una cuenta, aceptar estos Términos y Condiciones y utilizar la aplicación, usted declara y garantiza que tiene al menos 18 años de edad y que posee la capacidad legal para celebrar este contrato. Si determinamos que una cuenta pertenece a un menor de edad, nos reservamos el derecho de suspender o eliminar dicha cuenta y todo su historial de datos de forma inmediata y sin previo aviso.</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">3. Naturaleza del Servicio</p>
                <p>Todú es una herramienta digital de gestión de tiempo y gamificación diseñada para ayudar a mitigar la procrastinación. El Servicio se proporciona con fines de productividad personal y de ninguna manera sustituye el tratamiento, diagnóstico o asesoramiento médico o psicológico profesional para trastornos de atención, ansiedad u otras condiciones de salud mental.</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">4. Propiedad Intelectual</p>
                <p>Todo el contenido, diseño visual, animaciones del avatar interactivo, código fuente, logotipos y mecánicas de evolución (incluyendo la lógica de experiencia e inventario) son propiedad exclusiva de los desarrolladores de Todú. Se otorga al usuario una licencia personal, limitada, no transferible y revocable para utilizar la aplicación estrictamente para fines personales y no comerciales.</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">5. Reglas de Uso y Conducta (Fair Use)</p>
                <p>El usuario se compromete a utilizar la aplicación de manera legítima. Queda estrictamente prohibido:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Realizar ingeniería inversa, descompilar o modificar el código del cliente o servidor.</li>
                  <li>Manipular las peticiones de red (API) o explotar vulnerabilidades técnicas con el fin de alterar artificialmente las estadísticas de experiencia (XP), eludir la pérdida del sistema de rachas o desbloquear accesorios del inventario sin cumplir los requisitos de la aplicación.</li>
                </ul>
                <p className="pt-1">Cualquier violación a esta cláusula resultará en la suspensión o eliminación inmediata y permanente de la cuenta del usuario sin previo aviso.</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">6. Limitación de Responsabilidad</p>
                <p>El Servicio se proporciona "tal cual" y "según disponibilidad". El equipo de desarrollo no garantiza que la aplicación esté libre de interrupciones o errores. No nos hacemos responsables por la pérdida temporal o permanente de datos (historial de tareas o rachas) ocasionada por fallas en la infraestructura de la nube, mantenimientos del servidor o problemas de conectividad en el dispositivo del usuario.</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50">
              <button onClick={() => setModalTerminos(false)} className="bg-[#0046b0] hover:bg-[#00368a] text-white font-semibold py-2 px-5 rounded-xl text-sm transition-all shadow-xs">
                Aceptar y Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= RECUADRO EMERGENTE: AVISO DE PRIVACIDAD ================= */}
      {modalPrivacidad && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col max-h-[75vh] overflow-hidden border border-gray-100">
            <div className="px-6 pt-6 pb-4 flex justify-between items-center bg-white sticky top-0">
              <h2 className="text-xl font-bold text-[#0046b0]">Aviso de Privacidad</h2>
              <button onClick={() => setModalPrivacidad(false)} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                <X size={22} />
              </button>
            </div>
            <div className="px-6 pb-6 overflow-y-auto flex-grow text-[14px] text-gray-600 space-y-5 pr-4 leading-relaxed text-justify">
              <h3 className="font-bold text-gray-800 text-base">Aviso de Privacidad Simplificado</h3>
              
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">Identidad del Responsable</p>
                <p>El equipo de desarrollo de "Todú" (en adelante, "El Responsable"), con sede en Chiapas, México, en el marco de sus actividades académicas y de desarrollo de software, es responsable del uso y protección de sus datos personales, en estricto apego a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).</p>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-gray-900">Datos Personal que Recabamos</p>
                <p>Para llevar a cabo las finalidades descritas en el presente aviso, recabaremos los siguientes datos personales:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong className="text-gray-700">Datos de identificación y contacto:</strong> Nombre de usuario y correo electrónico.</li>
                  <li><strong className="text-gray-700">Datos de uso y comportamiento:</strong> Historial de creación, cumplimiento y vencimiento de tareas, así como el progreso de experiencia (XP) y rachas dentro de la aplicación.</li>
                  <li><strong className="text-gray-700">Datos de ubicación (Geolocalización):</strong> Coordenadas de latitud y longitud, las cuales se obtienen única y exclusivamente con su consentimiento expreso y explícito en el momento de uso.</li>
                </ul>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-gray-900">Tratamiento de Datos de Menores de Edad</p>
                <p>Todú no está diseñado para, ni dirigido a, menores de 18 años. Por lo tanto, no recabamos, procesamos ni almacenamos intencionalmente datos personales ni de geolocalización de menores de edad. Si usted es padre, madre o tutor legal y tiene conocimiento de que un menor a su cargo nos ha proporcionado información personal, le solicitamos que nos contacte para proceder con la eliminación definitiva de dichos datos de nuestros servidores.</p>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-gray-900">Finalidades del Tratamiento de Datos</p>
                <p>Los datos personales que recabamos tienen como finalidad principal:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Crear y gestionar su perfil de usuario dentro del sistema.</li>
                  <li>Alimentar el algoritmo de la máquina de estados que controla las animaciones, nivel de evolución y estado emocional del avatar virtual.</li>
                  <li>Sugerir puntos de interés y zonas de descanso al finalizar la jornada, mediante el uso de interfaces de programación (APIs) de terceros.</li>
                </ul>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-gray-900">Cláusula Especial sobre Geolocalización</p>
                <p>La información de geolocalización es procesada de manera efímera. Esto significa que las coordenadas se utilizan momentáneamente para realizar la consulta de lugares recomendados y no se almacenan en nuestras bases de datos, garantizando su privacidad y seguridad espacial.</p>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-gray-900">Derechos ARCO y Revocación de Consentimiento</p>
                <p>Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse (Derechos ARCO) al tratamiento de sus datos personales. Podrá ejercer estos derechos, así como eliminar permanentemente su cuenta y el historial de tareas, directamente desde la sección "Ajustes de Perfil" dentro de la aplicación.</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50">
              <button onClick={() => setModalPrivacidad(false)} className="bg-[#0046b0] hover:bg-[#00368a] text-white font-semibold py-2 px-5 rounded-xl text-sm transition-all shadow-xs">
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}