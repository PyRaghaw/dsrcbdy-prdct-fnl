import React from 'react';

// Common Definitions for Gradients and Filters to be used across scenes
const SvgDefs = () => (
  <defs>
    <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
    </linearGradient>
    <linearGradient id="phoneGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.8" />
      <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
    </linearGradient>
    <radialGradient id="softGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
      <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
    </radialGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="15" stdDeviation="15" floodColor="#0f172a" floodOpacity="0.1" />
    </filter>
    <filter id="strongShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="25" stdDeviation="20" floodColor="#0f172a" floodOpacity="0.2" />
    </filter>
    <filter id="blurEffect">
      <feGaussianBlur stdDeviation="8" />
    </filter>
    <filter id="heavyBlur">
      <feGaussianBlur stdDeviation="16" />
    </filter>
    <linearGradient id="hospitalBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#f8fafc" />
      <stop offset="100%" stopColor="#e2e8f0" />
    </linearGradient>
    <linearGradient id="nightBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#020617" />
      <stop offset="100%" stopColor="#0f172a" />
    </linearGradient>
    
    {/* Character Skin Gradient */}
    <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#fed7aa" />
      <stop offset="100%" stopColor="#fdba74" />
    </linearGradient>
    <linearGradient id="skinShadow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#fdba74" />
      <stop offset="100%" stopColor="#fb923c" />
    </linearGradient>
    
    {/* Clothing Gradients */}
    <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#64748b" />
      <stop offset="100%" stopColor="#475569" />
    </linearGradient>
    <linearGradient id="pantsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#1e293b" />
      <stop offset="100%" stopColor="#0f172a" />
    </linearGradient>
  </defs>
);

export const SceneHospitalExit = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <SvgDefs />
    
    {/* Background Environment - Hospital Glass Facade */}
    <rect width="800" height="600" fill="url(#hospitalBg)" />
    
    {/* Subtle Architectural lines / Glass reflections */}
    <path d="M200 0 L200 600 M400 0 L400 600 M600 0 L600 600" stroke="#cbd5e1" strokeWidth="2" opacity="0.5" />
    <polygon points="0,0 300,600 500,600 0,200" fill="white" opacity="0.3" />
    <polygon points="800,0 500,600 700,600 800,200" fill="white" opacity="0.1" />

    {/* Floor shadow */}
    <ellipse cx="400" cy="550" rx="150" ry="20" fill="#94a3b8" opacity="0.4" filter="url(#blurEffect)" />

    {/* Main Character - Mature Recovering Patient */}
    <g transform="translate(300, 150)">
      {/* Body / Legs */}
      <path d="M80 250 Q80 350 70 380 L100 380 Q110 300 120 250 Z" fill="url(#pantsGrad)" />
      <path d="M120 250 Q130 350 140 380 L170 380 Q160 300 140 250 Z" fill="url(#pantsGrad)" />
      
      {/* Shoes */}
      <path d="M60 380 Q50 395 70 400 L100 400 Q110 390 100 380 Z" fill="#cbd5e1" />
      <path d="M130 380 Q120 395 140 400 L170 400 Q180 390 170 380 Z" fill="#cbd5e1" />

      {/* Torso / Hoodie */}
      <path d="M50 100 Q40 180 60 260 L160 260 Q180 180 160 100 Q105 80 50 100 Z" fill="url(#hoodieGrad)" />
      
      {/* Head */}
      <ellipse cx="105" cy="50" rx="35" ry="45" fill="url(#skinGrad)" />
      {/* Hair */}
      <path d="M70 40 Q80 10 110 10 Q140 10 140 50 Q120 20 70 40 Z" fill="#334155" />
      {/* Exhausted face expression */}
      <path d="M90 45 Q95 42 100 45" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M115 45 Q120 42 125 45" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="95" cy="55" r="2" fill="#78350f" />
      <circle cx="120" cy="55" r="2" fill="#78350f" />
      {/* Eye bags */}
      <path d="M90 60 Q95 63 100 60" stroke="#fdba74" strokeWidth="2" fill="none" />
      <path d="M115 60 Q120 63 125 60" stroke="#fdba74" strokeWidth="2" fill="none" />
      {/* Sighing mouth */}
      <path d="M102 75 Q107 72 112 75" stroke="#78350f" strokeWidth="2" fill="none" />

      {/* Arms & Hands holding paper */}
      <path d="M50 110 Q10 160 30 200 L60 200 Q70 150 70 110 Z" fill="url(#hoodieGrad)" />
      <path d="M160 110 Q190 160 160 200 L130 200 Q140 150 140 110 Z" fill="url(#hoodieGrad)" />
      
      <circle cx="45" cy="205" r="15" fill="url(#skinShadow)" />
      <circle cx="145" cy="205" r="15" fill="url(#skinShadow)" />

      {/* Discharge Papers - Large bundle */}
      <g transform="translate(60, 180) rotate(-10)" filter="url(#softShadow)">
        <rect x="0" y="0" width="70" height="90" rx="4" fill="white" />
        <rect x="5" y="5" width="60" height="80" rx="2" fill="#f8fafc" />
        <line x1="10" y1="15" x2="40" y2="15" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <line x1="10" y1="25" x2="60" y2="25" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <line x1="10" y1="35" x2="50" y2="35" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        
        {/* Red Medical Cross stamp */}
        <path d="M50 70 L50 75 L45 75 L45 80 L50 80 L50 85 L55 85 L55 80 L60 80 L60 75 L55 75 L55 70 Z" fill="#ef4444" opacity="0.6" />
      </g>
    </g>
    
    {/* Depth elements / Light beams */}
    <polygon points="100,-100 250,600 400,600 250,-100" fill="white" opacity="0.15" style={{ mixBlendMode: 'overlay' }} />
  </svg>
);

export const SceneOverwhelmed = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <SvgDefs />
    
    {/* Abstract Background */}
    <rect width="800" height="600" fill="#f1f5f9" />
    <circle cx="600" cy="300" r="400" fill="#e2e8f0" opacity="0.5" filter="url(#heavyBlur)" />
    <circle cx="200" cy="100" r="300" fill="#e0e7ff" opacity="0.4" filter="url(#heavyBlur)" />

    {/* Giant Floating Paper */}
    <g transform="translate(350, 50) rotate(5)" filter="url(#strongShadow)">
      <rect width="380" height="500" rx="12" fill="white" />
      
      {/* Paper content */}
      <rect x="40" y="40" width="120" height="12" rx="6" fill="#cbd5e1" />
      <rect x="40" y="70" width="300" height="8" rx="4" fill="#e2e8f0" />
      <rect x="40" y="90" width="280" height="8" rx="4" fill="#e2e8f0" />
      <rect x="40" y="110" width="250" height="8" rx="4" fill="#e2e8f0" />
      
      <rect x="40" y="160" width="180" height="12" rx="6" fill="#cbd5e1" />
      <rect x="40" y="190" width="300" height="8" rx="4" fill="#e2e8f0" />
      <rect x="40" y="210" width="290" height="8" rx="4" fill="#e2e8f0" />
      
      {/* Giant Pill / Tag graphics on paper */}
      <rect x="40" y="260" width="140" height="40" rx="20" fill="#fee2e2" />
      <circle cx="60" cy="280" r="8" fill="#ef4444" />
      <rect x="80" y="276" width="60" height="8" rx="4" fill="#fca5a5" />

      <rect x="200" y="260" width="140" height="40" rx="20" fill="#e0e7ff" />
      <circle cx="220" cy="280" r="8" fill="#6366f1" />
      <rect x="240" y="276" width="60" height="8" rx="4" fill="#a5b4fc" />

      <rect x="40" y="320" width="180" height="40" rx="20" fill="#fef3c7" />
      <circle cx="60" cy="340" r="8" fill="#f59e0b" />
      <rect x="80" y="336" width="100" height="8" rx="4" fill="#fcd34d" />
      
      <path d="M280 400 L320 400 L320 440 L280 440 Z" fill="#94a3b8" opacity="0.2" rx="4" />
    </g>

    {/* Floating Overwhelm Elements */}
    <g filter="url(#softShadow)" opacity="0.9">
      <rect x="150" y="150" width="120" height="40" rx="20" fill="white" stroke="#e2e8f0" />
      <text x="210" y="175" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#64748b" textAnchor="middle">Take 2x Daily</text>

      <rect x="650" y="120" width="130" height="40" rx="20" fill="white" stroke="#e2e8f0" />
      <text x="715" y="145" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#ef4444" textAnchor="middle">No Lifting &gt; 5lb</text>

      <rect x="550" y="480" width="160" height="40" rx="20" fill="white" stroke="#e2e8f0" />
      <text x="630" y="505" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#f59e0b" textAnchor="middle">Follow up in 3 days</text>
    </g>

  </svg>
);


export const SceneMemoryFog = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <SvgDefs />
    
    {/* Foggy / Blurry Background */}
    <rect width="800" height="600" fill="#cbd5e1" />
    <circle cx="400" cy="300" r="300" fill="#f8fafc" opacity="0.8" filter="url(#heavyBlur)" />
    
    <g filter="url(#blurEffect)" opacity="0.6">
      <path d="M200 100 Q300 50 400 150 T600 100" stroke="#94a3b8" strokeWidth="40" fill="none" strokeLinecap="round" />
      <path d="M100 400 Q200 450 400 350 T700 450" stroke="#cbd5e1" strokeWidth="60" fill="none" strokeLinecap="round" />
    </g>

    {/* Dissolving Paper Fragments */}
    <g opacity="0.8">
      {/* Fragment 1 */}
      <g transform="translate(150, 150) rotate(-15)" filter="url(#blurEffect)">
        <path d="M0 0 L100 10 L80 120 L10 100 Z" fill="white" />
        <rect x="20" y="30" width="50" height="8" rx="4" fill="#cbd5e1" />
        <rect x="20" y="50" width="40" height="8" rx="4" fill="#cbd5e1" />
      </g>
      {/* Fragment 2 */}
      <g transform="translate(550, 200) rotate(25)" filter="url(#heavyBlur)" opacity="0.5">
        <path d="M0 0 L120 -10 L140 150 L-20 130 Z" fill="white" />
        <rect x="20" y="40" width="80" height="10" rx="5" fill="#94a3b8" />
        <rect x="20" y="70" width="60" height="10" rx="5" fill="#94a3b8" />
      </g>
      {/* Fragment 3 */}
      <g transform="translate(350, 50) rotate(5)" filter="url(#blurEffect)" opacity="0.7">
        <path d="M0 0 L150 20 L120 180 L20 150 Z" fill="white" />
        <circle cx="40" cy="60" r="15" fill="#fca5a5" />
        <rect x="70" y="55" width="50" height="10" rx="5" fill="#cbd5e1" />
      </g>
      {/* Fragment 4 */}
      <g transform="translate(600, 400) rotate(-30)" filter="url(#blurEffect)">
        <path d="M0 0 L90 5 L80 80 L5 70 Z" fill="white" />
        <rect x="15" y="20" width="50" height="6" rx="3" fill="#cbd5e1" />
      </g>
    </g>

    {/* Main Character in Fog */}
    <g transform="translate(250, 200)">
      {/* Torso */}
      <path d="M50 150 Q150 120 250 150 L300 400 L0 400 Z" fill="url(#hoodieGrad)" filter="url(#softShadow)" />
      
      {/* Head */}
      <ellipse cx="150" cy="70" rx="50" ry="60" fill="url(#skinGrad)" filter="url(#softShadow)" />
      {/* Hair */}
      <path d="M100 50 Q120 0 160 0 Q200 10 195 50 Q170 10 100 50 Z" fill="#334155" />
      
      {/* Confused / Lost Expression */}
      <path d="M120 60 Q130 55 140 65" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M180 60 Q170 50 160 55" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />
      
      <circle cx="130" cy="75" r="4" fill="#0f172a" />
      <circle cx="170" cy="75" r="4" fill="#0f172a" />
      
      <path d="M140 105 Q150 100 160 105" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Hands on temples */}
      <path d="M30 250 Q50 150 90 90 Q110 80 110 100 Q80 150 60 250 Z" fill="url(#hoodieGrad)" />
      <ellipse cx="100" cy="90" rx="15" ry="20" fill="url(#skinShadow)" />
      
      <path d="M270 250 Q250 150 210 90 Q190 80 190 100 Q220 150 240 250 Z" fill="url(#hoodieGrad)" />
      <ellipse cx="200" cy="90" rx="15" ry="20" fill="url(#skinShadow)" />
    </g>

    {/* Foreground Fog overlay */}
    <rect width="800" height="600" fill="white" opacity="0.15" filter="url(#heavyBlur)" />
  </svg>
);

export const SceneNightAnxiety = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <SvgDefs />
    
    {/* Dark Night Bedroom Background */}
    <rect width="800" height="600" fill="url(#nightBg)" />
    
    {/* Moonlight from window (top right) */}
    <polygon points="500,0 800,0 800,400 400,600" fill="#e0e7ff" opacity="0.05" />
    <rect x="650" y="50" width="100" height="150" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="4" opacity="0.5" />
    
    {/* Bed Headboard */}
    <rect x="100" y="300" width="400" height="300" rx="20" fill="#0f172a" stroke="#1e293b" strokeWidth="4" />
    
    {/* Ambient Clock (Subtle in background) */}
    <g transform="translate(550, 350)" opacity="0.4">
      <rect width="80" height="40" rx="8" fill="#020617" />
      <text x="40" y="27" fontFamily="monospace" fontSize="20" fontWeight="bold" fill="#ef4444" textAnchor="middle" filter="url(#blurEffect)">03:00</text>
      <text x="40" y="27" fontFamily="monospace" fontSize="20" fontWeight="bold" fill="#ef4444" textAnchor="middle">03:00</text>
    </g>

    {/* Main Patient Hero */}
    <g transform="translate(150, 200)">
      {/* Pillows */}
      <rect x="30" y="100" width="240" height="120" rx="30" fill="#1e293b" opacity="0.8" />
      
      {/* Torso sitting up */}
      <path d="M50 150 Q150 120 250 150 L280 400 L20 400 Z" fill="url(#hoodieGrad)" filter="url(#softShadow)" />
      
      {/* Blankets */}
      <path d="M-50 300 Q150 250 450 300 L450 450 L-50 450 Z" fill="#334155" filter="url(#strongShadow)" />
      <path d="M-50 320 Q150 280 450 320 L450 450 L-50 450 Z" fill="#475569" />

      {/* Head illuminated by phone */}
      <ellipse cx="150" cy="70" rx="45" ry="55" fill="url(#skinGrad)" />
      {/* Phone Screen Glow on Face */}
      <ellipse cx="150" cy="70" rx="45" ry="55" fill="url(#phoneGlow)" opacity="0.4" style={{ mixBlendMode: 'overlay' }} />
      
      {/* Hair */}
      <path d="M105 45 Q120 0 160 0 Q195 10 190 50 Q160 10 105 45 Z" fill="#0f172a" />
      
      {/* Worried Expression looking down at phone */}
      <path d="M125 65 Q135 60 145 68" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M175 65 Q165 60 155 68" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      
      <ellipse cx="135" cy="80" rx="3" ry="2" fill="#0f172a" />
      <ellipse cx="165" cy="80" rx="3" ry="2" fill="#0f172a" />
      
      <path d="M142 105 Q150 100 158 105" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Arms holding phone */}
      <path d="M70 180 Q100 250 130 250 Q160 250 150 200 L100 150 Z" fill="url(#hoodieGrad)" />
      <path d="M230 180 Q200 250 170 250 Q140 250 150 200 L200 150 Z" fill="url(#hoodieGrad)" />
      
      {/* Hands */}
      <circle cx="135" cy="245" r="12" fill="url(#skinShadow)" />
      <circle cx="165" cy="245" r="12" fill="url(#skinShadow)" />

      {/* Phone emitting light */}
      <g transform="translate(135, 230) rotate(-10)">
        <rect x="0" y="0" width="30" height="50" rx="4" fill="#f8fafc" filter="url(#softShadow)" />
        {/* Phone screen glow */}
        <polygon points="-50,-150 80,-150 30,0 0,0" fill="url(#phoneGlow)" />
      </g>
    </g>

    {/* Floating Intrusive Thoughts / Questions */}
    <g filter="url(#softShadow)">
      {/* Question 1 */}
      <g transform="translate(450, 100)">
        <rect x="0" y="0" width="220" height="46" rx="23" fill="#1e293b" fillOpacity="0.8" stroke="#334155" />
        <text x="110" y="28" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#f8fafc" textAnchor="middle">Is this pain normal?</text>
      </g>
      
      {/* Question 2 */}
      <g transform="translate(50, 80)">
        <rect x="0" y="0" width="200" height="46" rx="23" fill="#1e293b" fillOpacity="0.8" stroke="#334155" />
        <text x="100" y="28" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#f8fafc" textAnchor="middle">Did I take my meds?</text>
      </g>

      {/* Question 3 */}
      <g transform="translate(520, 220)">
        <rect x="0" y="0" width="240" height="46" rx="23" fill="#1e293b" fillOpacity="0.8" stroke="#334155" />
        <text x="120" y="28" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#f8fafc" textAnchor="middle">Should I call my doctor?</text>
      </g>

      {/* Question 4 */}
      <g transform="translate(80, 450)">
        <rect x="0" y="0" width="240" height="46" rx="23" fill="#1e293b" fillOpacity="0.8" stroke="#334155" />
        <text x="120" y="28" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#f8fafc" textAnchor="middle">Can I sleep on this side?</text>
      </g>
    </g>

    {/* Atmospheric Depth Blur Overlay */}
    <circle cx="400" cy="300" r="400" fill="none" stroke="#0f172a" strokeWidth="80" filter="url(#heavyBlur)" opacity="0.6" />
  </svg>
);
