import React from 'react';

interface SchematicProps {
  schematicId: string;
  activeStep: number;
}

export default function CircuitSchematic({ schematicId, activeStep }: SchematicProps) {
  // Step 1: LED, Step 2: Resistor, Step 3: Wire/Gnd, Step 4: Battery
  
  if (schematicId === 'led_basic_schematic') {
    return (
      <div className="relative w-full aspect-[4/3] bg-slate-900 rounded-xl p-6 flex flex-col items-center justify-center border border-slate-800 shadow-inner">
        {/* Schematic Grid Background */}
        <div className="absolute inset-0 lab-grid opacity-10 rounded-xl pointer-events-none"></div>
        
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-[240px]">
          {/* Definitions for Glow filters */}
          <defs>
            <filter id="glow-led" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-wire" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid coordinates or guide text */}
          <text x="10" y="20" fill="#475569" className="text-[10px] font-mono">9V SOURCE SCHEMATIC v1.0</text>

          {/* Wires & Paths */}
          {/* Battery (+) to Resistor */}
          <path 
            d="M 60 150 L 60 70 L 140 70" 
            fill="none" 
            stroke={activeStep === 4 ? '#ef4444' : '#475569'} 
            strokeWidth="3" 
            strokeDasharray={activeStep === 4 ? "4" : "0"}
            className="transition-colors duration-300"
          />
          {/* Resistor to LED Anode */}
          <path 
            d="M 220 70 L 300 70 L 300 110" 
            fill="none" 
            stroke={activeStep === 2 ? '#3b82f6' : '#475569'} 
            strokeWidth="3" 
            className="transition-colors duration-300"
          />
          {/* LED Cathode to Battery (-) */}
          <path 
            d="M 300 170 L 300 230 L 60 230 L 60 190" 
            fill="none" 
            stroke={activeStep === 3 ? '#10b981' : '#475569'} 
            strokeWidth="3" 
            className="transition-colors duration-300"
          />

          {/* 1. 9V Battery Component */}
          <g className={`transition-opacity duration-300 ${activeStep === 4 ? 'opacity-100 scale-105 origin-[60px_170px]' : 'opacity-70'}`}>
            {/* Battery Body */}
            <rect x="35" y="110" width="50" height="80" rx="4" fill="#1e293b" stroke={activeStep === 4 ? '#38bdf8' : '#64748b'} strokeWidth="2" />
            {/* Terminals */}
            <rect x="45" y="102" width="10" height="8" rx="1" fill="#ef4444" />
            <rect x="65" y="102" width="10" height="8" rx="1" fill="#334155" />
            {/* Label */}
            <text x="60" y="150" fill="#94a3b8" className="text-[12px] font-mono text-center" textAnchor="middle">9V</text>
            <text x="47" y="125" fill="#ef4444" className="text-[10px] font-bold">+</text>
            <text x="68" y="125" fill="#64748b" className="text-[10px] font-bold">-</text>
            {activeStep === 4 && (
              <circle cx="60" cy="150" r="30" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3" className="animate-spin" />
            )}
          </g>

          {/* 2. Resistor Component */}
          <g className={`transition-all duration-300 ${activeStep === 2 ? 'opacity-100' : 'opacity-70'}`}>
            {/* Resistor Body */}
            <rect x="140" y="60" width="80" height="20" rx="3" fill="#f59e0b" stroke={activeStep === 2 ? '#38bdf8' : '#b45309'} strokeWidth="2" />
            {/* Band colors: Red, Red, Brown, Gold */}
            <rect x="155" y="60" width="6" height="20" fill="#dc2626" />
            <rect x="168" y="60" width="6" height="20" fill="#dc2626" />
            <rect x="181" y="60" width="6" height="20" fill="#92400e" />
            <rect x="200" y="60" width="6" height="20" fill="#fbbf24" />
            <text x="180" y="95" fill={activeStep === 2 ? '#38bdf8' : '#94a3b8'} className="text-[11px] font-mono" textAnchor="middle">220 Ω</text>
          </g>

          {/* 3. LED Component */}
          <g className={`transition-all duration-300 ${activeStep === 1 ? 'opacity-100' : 'opacity-70'}`}>
            {/* LED Glass Dome */}
            <path 
              d="M 285 140 A 15 15 0 0 1 315 140 L 315 155 L 285 155 Z" 
              fill={activeStep === 1 ? '#f87171' : '#b91c1c'} 
              stroke={activeStep === 1 ? '#ef4444' : '#7f1d1d'} 
              strokeWidth="2"
              filter={activeStep === 1 ? 'url(#glow-led)' : undefined}
            />
            {/* Flat base of LED */}
            <rect x="282" y="155" width="36" height="4" fill={activeStep === 1 ? '#ef4444' : '#7f1d1d'} rx="1" />
            {/* Internal Leads */}
            <line x1="293" y1="155" x2="293" y2="170" stroke="#94a3b8" strokeWidth="2" />
            <line x1="307" y1="155" x2="307" y2="170" stroke="#94a3b8" strokeWidth="2" />
            {/* Label */}
            <text x="330" y="145" fill={activeStep === 1 ? '#ef4444' : '#94a3b8'} className="text-[11px] font-mono">RED LED</text>
            <text x="290" y="180" fill="#64748b" className="text-[9px] font-mono">+</text>
            <text x="312" y="180" fill="#64748b" className="text-[9px] font-mono">-</text>
          </g>

          {/* Interactive highlight circle overlay */}
          {activeStep === 1 && <circle cx="300" cy="145" r="35" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />}
          {activeStep === 2 && <circle cx="180" cy="70" r="50" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />}
          {activeStep === 3 && <circle cx="300" cy="230" r="25" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />}
          {activeStep === 4 && <circle cx="60" cy="150" r="45" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />}
        </svg>

        {/* Current Indicator Overlay */}
        <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center bg-slate-950/80 px-4 py-2 rounded-lg border border-slate-800">
          <span className="text-xs font-mono text-slate-400">Current Flow:</span>
          <span className={`text-xs font-mono font-bold ${activeStep === 4 ? 'text-emerald-400' : 'text-amber-500'}`}>
            {activeStep === 4 ? '⚡ ~32mA (Normal)' : '🔌 Circuit Open'}
          </span>
        </div>
      </div>
    );
  }

  if (schematicId === 'series_parallel_schematic') {
    return (
      <div className="relative w-full aspect-[4/3] bg-slate-900 rounded-xl p-6 flex flex-col items-center justify-center border border-slate-800 shadow-inner">
        <div className="absolute inset-0 lab-grid opacity-10 rounded-xl pointer-events-none"></div>
        
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-[240px]">
          <text x="10" y="20" fill="#475569" className="text-[10px] font-mono">SERIES LED SCHEMATIC v1.0</text>

          {/* Wires */}
          <path d="M 60 150 L 60 70 L 120 70" fill="none" stroke={activeStep === 2 ? '#3b82f6' : '#475569'} strokeWidth="3" />
          <path d="M 180 70 L 230 70 C 230 70, 230 110, 230 110" fill="none" stroke={activeStep === 1 ? '#38bdf8' : '#475569'} strokeWidth="3" />
          <path d="M 230 150 L 230 170" fill="none" stroke={activeStep === 1 ? '#38bdf8' : '#475569'} strokeWidth="3" />
          <path d="M 230 210 L 230 230 L 320 230 L 320 180" fill="none" stroke={activeStep === 3 ? '#a855f7' : '#475569'} strokeWidth="3" />
          <path d="M 320 120 L 320 70 L 60 70" fill="none" stroke={activeStep === 4 ? '#ef4444' : '#475569'} strokeWidth="3" />
          <path d="M 60 230 L 60 190" fill="none" stroke={activeStep === 4 ? '#ef4444' : '#475569'} strokeWidth="3" />
          <path d="M 230 230 L 60 230" fill="none" stroke={activeStep === 4 ? '#ef4444' : '#475569'} strokeWidth="3" />

          {/* Battery */}
          <g className={`transition-opacity duration-300 ${activeStep === 4 ? 'opacity-100 scale-105 origin-[60px_170px]' : 'opacity-70'}`}>
            <rect x="35" y="110" width="50" height="80" rx="4" fill="#1e293b" stroke={activeStep === 4 ? '#38bdf8' : '#64748b'} strokeWidth="2" />
            <text x="60" y="150" fill="#94a3b8" className="text-[12px] font-mono text-center" textAnchor="middle">9V</text>
          </g>

          {/* Resistor */}
          <g className={`transition-all duration-300 ${activeStep === 2 ? 'opacity-100' : 'opacity-70'}`}>
            <rect x="120" y="60" width="60" height="20" rx="3" fill="#f59e0b" stroke={activeStep === 2 ? '#38bdf8' : '#b45309'} strokeWidth="2" />
            <text x="150" y="95" fill="#94a3b8" className="text-[11px] font-mono" textAnchor="middle">220 Ω</text>
          </g>

          {/* LED 1 */}
          <g className={`transition-all duration-300 ${activeStep === 1 ? 'opacity-100' : 'opacity-70'}`}>
            <path d="M 215 125 A 15 15 0 0 1 245 125 L 245 140 L 215 140 Z" fill={activeStep === 1 ? '#60a5fa' : '#1d4ed8'} stroke="#1e40af" strokeWidth="2" />
            <text x="252" y="130" fill="#94a3b8" className="text-[10px] font-mono">BLUE LED 1</text>
          </g>

          {/* LED 2 */}
          <g className={`transition-all duration-300 ${activeStep === 1 ? 'opacity-100' : 'opacity-70'}`}>
            <path d="M 215 185 A 15 15 0 0 1 245 185 L 245 200 L 215 200 Z" fill={activeStep === 1 ? '#60a5fa' : '#1d4ed8'} stroke="#1e40af" strokeWidth="2" />
            <text x="252" y="190" fill="#94a3b8" className="text-[10px] font-mono">BLUE LED 2</text>
          </g>

          {/* Switch (Push Button) */}
          <g className={`transition-all duration-300 ${activeStep === 3 ? 'opacity-100' : 'opacity-70'}`}>
            {/* Base */}
            <rect x="295" y="120" width="50" height="60" rx="4" fill="#334155" stroke={activeStep === 3 ? '#a855f7' : '#475569'} strokeWidth="2" />
            {/* Button cap */}
            <circle cx="320" cy="150" r="14" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
            <text x="320" y="110" fill="#94a3b8" className="text-[10px] font-mono" textAnchor="middle">PUSH</text>
          </g>

          {activeStep === 1 && <circle cx="230" cy="160" r="50" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />}
          {activeStep === 3 && <circle cx="320" cy="150" r="35" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />}
        </svg>

        <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center bg-slate-950/80 px-4 py-2 rounded-lg border border-slate-800">
          <span className="text-xs font-mono text-slate-400">Pressing Switch Result:</span>
          <span className={`text-xs font-mono font-bold ${activeStep === 4 ? 'text-purple-400' : 'text-slate-500'}`}>
            {activeStep === 4 ? '💡 Both Dimly Lit (~14mA)' : '💤 Waiting...'}
          </span>
        </div>
      </div>
    );
  }

  if (schematicId === 'transistor_switch_schematic') {
    return (
      <div className="relative w-full aspect-[4/3] bg-slate-900 rounded-xl p-6 flex flex-col items-center justify-center border border-slate-800 shadow-inner">
        <div className="absolute inset-0 lab-grid opacity-10 rounded-xl pointer-events-none"></div>
        
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-[240px]">
          <text x="10" y="20" fill="#475569" className="text-[10px] font-mono">NPN TRANSISTOR SWITCH v1.0</text>

          {/* Wires */}
          {/* VCC 9V to 220Ω */}
          <path d="M 60 70 L 260 70 L 260 90" fill="none" stroke="#475569" strokeWidth="2" />
          {/* LED to Collector */}
          <path d="M 260 170 L 260 190" fill="none" stroke={activeStep === 3 ? '#10b981' : '#475569'} strokeWidth="2" />
          {/* VCC to Switch */}
          <path d="M 120 70 L 120 100" fill="none" stroke="#475569" strokeWidth="2" />
          {/* Switch to 1kΩ */}
          <path d="M 120 140 L 120 160" fill="none" stroke={activeStep === 4 ? '#f59e0b' : '#475569'} strokeWidth="2" />
          {/* 1kΩ to Base */}
          <path d="M 120 200 L 160 200" fill="none" stroke={activeStep === 4 ? '#f59e0b' : '#475569'} strokeWidth="2" />
          {/* Emitter to GND */}
          <path d="M 180 220 L 180 250 L 60 250 L 60 190" fill="none" stroke={activeStep === 2 ? '#3b82f6' : '#475569'} strokeWidth="2" />

          {/* Battery */}
          <g className={`opacity-70`}>
            <rect x="35" y="110" width="50" height="80" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
            <text x="60" y="150" fill="#94a3b8" className="text-[11px] font-mono" textAnchor="middle">9V</text>
          </g>

          {/* Switch */}
          <g className={`transition-all duration-300 ${activeStep === 4 ? 'opacity-100' : 'opacity-70'}`}>
            <rect x="100" y="100" width="40" height="40" rx="4" fill="#334155" stroke="#475569" strokeWidth="2" />
            <circle cx="120" cy="120" r="10" fill="#ef4444" />
          </g>

          {/* 1kΩ Resistor */}
          <g className={`transition-all duration-300 ${activeStep === 4 ? 'opacity-100' : 'opacity-70'}`}>
            <rect x="105" y="160" width="30" height="40" rx="2" fill="#d97706" stroke="#b45309" strokeWidth="1" />
            <text x="120" y="215" fill="#94a3b8" className="text-[9px] font-mono" textAnchor="middle">1 kΩ</text>
          </g>

          {/* 220Ω Resistor */}
          <g className={`transition-all duration-300 ${activeStep === 3 ? 'opacity-100' : 'opacity-70'}`}>
            <rect x="245" y="90" width="30" height="40" rx="2" fill="#d97706" stroke="#b45309" strokeWidth="1" />
            <text x="260" y="145" fill="#94a3b8" className="text-[9px] font-mono" textAnchor="middle">220 Ω</text>
          </g>

          {/* Transistor symbol BC547 */}
          <g className={`transition-all duration-300 ${activeStep === 1 ? 'opacity-100 scale-105' : 'opacity-80'}`}>
            {/* Circle boundary */}
            <circle cx="180" cy="200" r="24" fill="#1e293b" stroke={activeStep === 1 ? '#10b981' : '#64748b'} strokeWidth="2" />
            {/* Base flat line */}
            <line x1="168" y1="188" x2="168" y2="212" stroke="#f8fafc" strokeWidth="3" />
            {/* Base terminal wire */}
            <line x1="160" y1="200" x2="168" y2="200" stroke="#f8fafc" strokeWidth="2" />
            {/* Collector wire */}
            <line x1="168" y1="194" x2="185" y2="182" stroke="#f8fafc" strokeWidth="2" />
            <line x1="185" y1="182" x2="260" y2="182" stroke="#f8fafc" strokeWidth="2" />
            {/* Emitter wire with arrow */}
            <line x1="168" y1="206" x2="185" y2="218" stroke="#f8fafc" strokeWidth="2" />
            <line x1="185" y1="218" x2="185" y2="230" stroke="#f8fafc" strokeWidth="2" />
            {/* Arrowhead on emitter */}
            <polygon points="180,211 187,219 178,217" fill="#f8fafc" />
            
            <text x="180" y="165" fill={activeStep === 1 ? '#38bdf8' : '#94a3b8'} className="text-[10px] font-mono" textAnchor="middle">BC547 (NPN)</text>
          </g>

          {/* Green LED */}
          <g className={`transition-all duration-300 ${activeStep === 3 ? 'opacity-100' : 'opacity-70'}`}>
            <path d="M 245 155 A 10 10 0 0 1 275 155 L 275 165 L 245 165 Z" fill={activeStep === 4 ? '#4ade80' : '#15803d'} stroke="#166534" strokeWidth="2" />
            <text x="285" y="160" fill="#94a3b8" className="text-[9px] font-mono">GREEN LED</text>
          </g>
        </svg>

        <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center bg-slate-950/80 px-4 py-2 rounded-lg border border-slate-800">
          <span className="text-xs font-mono text-slate-400">Base-Collector State:</span>
          <span className={`text-xs font-mono font-bold ${activeStep === 4 ? 'text-emerald-400' : 'text-slate-500'}`}>
            {activeStep === 4 ? '🔋 Transistor Conducts (Active)' : '🔌 Cut-off State'}
          </span>
        </div>
      </div>
    );
  }

  return null;
}
