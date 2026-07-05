export default function MiniTodu({ className = "w-16 h-16" }) {
  return (
    <svg 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Cuerpo Inclinado (Dinámico) */}
      <g transform="rotate(5 60 60)">
        <rect x="35" y="40" width="50" height="55" rx="25" fill="currentColor" />
        
        {/* Antena feliz */}
        <path d="M60 30V40" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="60" cy="27" r="3" fill="#FFD700"/>
        
        {/* Ojos haciendo un guiño (^^) */}
        <path d="M45 55Q50 50 55 55" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M65 55Q70 50 75 55" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none" />
        
        {/* Manita apuntando hacia arriba (para dar el consejo) */}
        <path d="M85 65Q95 55 90 45" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}