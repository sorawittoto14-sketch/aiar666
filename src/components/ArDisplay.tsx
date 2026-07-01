import React, { useState, useEffect, useRef } from 'react';
import { Camera, RefreshCw, Layers, Cpu, Compass, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ArDisplayProps {
  lessonId: string;
  isCorrectState: boolean;
  onVerify: () => void;
}

export default function ArDisplay({ lessonId, isCorrectState, onVerify }: ArDisplayProps) {
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [detectedComponents, setDetectedComponents] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Future integration notes:
  // ==========================================
  // AR DISPLAY & COMPUTER VISION INTEGRATION
  // ==========================================
  // 1. Camera Stream: Uses standard navigator.mediaDevices.getUserMedia() to access webcam.
  // 2. CV Model: Load TensorFlow.js / OpenCV.js model to scan and segment components (LEDs, Resistors, Breadboard coordinates).
  // 3. Coordinate mapping: Match detected physical pins against schematic models to draw interactive glowing SVG guides.
  // 4. State synchronization: Feed pins into a solver to update the visual layout state in real-time.

  useEffect(() => {
    if (isCameraActive) {
      // Start simulated scanning animation
      setIsScanning(true);
      const timer = setTimeout(() => {
        setIsScanning(false);
        if (lessonId === 'lesson-1') {
          setDetectedComponents(['Red LED', 'Resistor 220Ω', '9V Battery Connection']);
        } else if (lessonId === 'lesson-2') {
          setDetectedComponents(['Blue LED 1', 'Blue LED 2', '220Ω Resistor', 'Tactile Button']);
        } else {
          setDetectedComponents(['BC547 NPN Transistor', 'Green LED', '1kΩ Resistor', '220Ω Resistor', 'Switch']);
        }
      }, 2000);

      // Attempt to access actual device webcam for rich mockup experience
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
          }
        })
        .catch(err => {
          console.warn("Camera access declined or unavailable in iframe environment. Using animated high-fidelity SVG canvas placeholder.", err);
        });

      return () => {
        clearTimeout(timer);
        stopCamera();
      };
    } else {
      setDetectedComponents([]);
      stopCamera();
    }
  }, [isCameraActive, lessonId]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  return (
    <div className="relative w-full aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col group">
      
      {/* 1. Header with HUD Status Indicators */}
      <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-slate-950/90 to-slate-950/0 p-4 flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${isCameraActive ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'} transition-colors`} />
          <span className="text-[11px] font-mono tracking-wider text-slate-300 uppercase">
            {isCameraActive ? 'AR LIVE RECOGNITION ACTIVE' : 'AR SYSTEM OFFLINE'}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800/80">
          <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin-slow" />
          <span className="text-[10px] font-mono text-sky-400">TRACKING_GRID_V2.5</span>
        </div>
      </div>

      {/* 2. Main AR Viewer Area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        
        {/* Futurist background grid (Active/Inactive states) */}
        <div className="absolute inset-0 lab-grid opacity-20 pointer-events-none z-0"></div>

        {isCameraActive ? (
          <>
            {/* Real Camera Stream Container */}
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Simulated AR Overlay Layer (Renders on top of webcam feed) */}
            <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[0.5px] z-10 pointer-events-none">
              
              {/* Scanline Animation */}
              {isScanning && (
                <div className="absolute inset-x-0 h-0.5 bg-sky-400 shadow-[0_0_15px_#38bdf8] animate-[bounce_4s_infinite] opacity-80" />
              )}

              {/* HUD Target Reticle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-sky-500/20 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 border-2 border-dashed border-sky-400/40 rounded-full animate-spin-slow" />
                <div className="absolute w-4 h-4 border-t-2 border-l-2 border-sky-400 top-0 left-0" />
                <div className="absolute w-4 h-4 border-t-2 border-r-2 border-sky-400 top-0 right-0" />
                <div className="absolute w-4 h-4 border-b-2 border-l-2 border-sky-400 bottom-0 left-0" />
                <div className="absolute w-4 h-4 border-b-2 border-r-2 border-sky-400 bottom-0 right-0" />
              </div>

              {/* AR PIN LABELS / DETECTED NODES */}
              {/* Lesson 1 Mockups */}
              {lessonId === 'lesson-1' && (
                <div className="absolute inset-0">
                  {/* Pin 1: LED */}
                  <div className="absolute top-[35%] left-[60%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-fade-in">
                    <div className="w-4 h-4 bg-emerald-500/80 rounded-full border-2 border-white animate-ping absolute" />
                    <div className="w-3 h-3 bg-emerald-500 rounded-full border border-white z-10" />
                    <div className="mt-2 bg-slate-900/90 border border-emerald-500/50 px-2 py-1 rounded text-[10px] text-emerald-300 font-mono shadow-md backdrop-blur-sm">
                      [OK] LED Anode (Row 10)
                    </div>
                  </div>

                  {/* Pin 2: Resistor */}
                  <div className="absolute top-[45%] left-[38%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full border border-white z-10" />
                    <div className="mt-2 bg-slate-900/90 border border-emerald-500/50 px-2 py-1 rounded text-[10px] text-emerald-300 font-mono shadow-md backdrop-blur-sm">
                      [OK] 220Ω Resistor (Row 10 to V+)
                    </div>
                  </div>

                  {/* Pin 3: Battery connection - Conditional correctness */}
                  <div className="absolute top-[65%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full border-2 border-white animate-ping absolute ${isCorrectState ? 'bg-emerald-500/80' : 'bg-amber-500/80'}`} />
                    <div className={`w-3 h-3 rounded-full border border-white z-10 ${isCorrectState ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <div className={`mt-2 bg-slate-900/90 border px-2 py-1 rounded text-[10px] font-mono shadow-md backdrop-blur-sm ${
                      isCorrectState ? 'border-emerald-500/50 text-emerald-300' : 'border-amber-500/50 text-amber-300'
                    }`}>
                      {isCorrectState 
                        ? '[VCC] Battery Connected (9.12V)' 
                        : '[WARN] No power or polarity reversed? Check clip!'
                      }
                    </div>
                  </div>
                </div>
              )}

              {/* Lesson 2 Mockups */}
              {lessonId === 'lesson-2' && (
                <div className="absolute inset-0">
                  <div className="absolute top-[30%] left-[30%] flex flex-col items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full border border-white" />
                    <div className="mt-1 bg-slate-900/95 border border-emerald-500/40 px-1.5 py-0.5 rounded text-[9px] text-emerald-300 font-mono">
                      LED 1 (Anode) Row 14
                    </div>
                  </div>
                  <div className="absolute top-[30%] left-[55%] flex flex-col items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full border border-white" />
                    <div className="mt-1 bg-slate-900/95 border border-emerald-500/40 px-1.5 py-0.5 rounded text-[9px] text-emerald-300 font-mono">
                      LED 1 (Cathode) Row 15
                    </div>
                  </div>
                  <div className="absolute top-[55%] left-[65%] flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border border-white ${isCorrectState ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <div className={`mt-1 bg-slate-900/95 border px-1.5 py-0.5 rounded text-[9px] font-mono ${isCorrectState ? 'border-emerald-500/40 text-emerald-300' : 'border-amber-500/40 text-amber-300'}`}>
                      {isCorrectState ? '[OK] Button Row 16' : '[WARN] Pin floating or loose'}
                    </div>
                  </div>
                </div>
              )}

              {/* Lesson 3 Mockups */}
              {lessonId === 'lesson-3' && (
                <div className="absolute inset-0">
                  <div className="absolute top-[40%] left-[50%] -translate-x-1/2 flex flex-col items-center">
                    <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full border border-white animate-pulse" />
                    <div className="mt-1 bg-slate-900/95 border border-emerald-500/60 px-2 py-0.5 rounded text-[9px] text-emerald-300 font-mono shadow-lg">
                      BC547 (Collector/Base/Emitter detected)
                    </div>
                  </div>
                  <div className="absolute top-[60%] left-[30%] flex flex-col items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full border border-white" />
                    <div className="mt-1 bg-slate-900/95 border border-purple-500/40 px-1.5 py-0.5 rounded text-[9px] text-purple-300 font-mono">
                      Gate Resistor (1kΩ) Row 21
                    </div>
                  </div>
                </div>
              )}

              {/* Status Box Bottom Left */}
              <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-800 p-3 rounded-lg max-w-[200px] shadow-lg backdrop-blur-sm">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">DETECTION_LOG:</span>
                <div className="space-y-1">
                  {detectedComponents.length > 0 ? (
                    detectedComponents.map((comp, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400">
                        <span className="inline-block w-1 h-1 bg-emerald-400 rounded-full" />
                        {comp}
                      </div>
                    ))
                  ) : (
                    <div className="text-[9px] font-mono text-amber-400 animate-pulse">Scanning board layout...</div>
                  )}
                </div>
              </div>

              {/* Diagnostics Overlay Indicator */}
              <div className="absolute bottom-4 right-4 bg-slate-900/90 border border-slate-800 p-3 rounded-lg shadow-lg backdrop-blur-sm text-right flex flex-col justify-center">
                <span className="text-[10px] font-mono text-slate-400 block mb-1 font-bold">ANALYSIS_RESULT:</span>
                {isCorrectState ? (
                  <div className="flex items-center justify-end gap-1.5 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>วงจรถูกต้องดี 100%</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-end gap-1.5 text-xs font-semibold text-amber-400">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>พบความคลาดเคลื่อน!</span>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Empty / Offline Placeholder Screen with instructions */
          <div className="z-10 flex flex-col items-center justify-center max-w-md text-center px-6 py-8">
            <div className="relative mb-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-slate-900 p-4 rounded-full border border-slate-700">
                <Camera className="w-10 h-10 text-sky-400" />
              </div>
            </div>
            
            <h4 className="text-white font-display text-base font-semibold mb-2">
              Augmented Reality Circuit Display
            </h4>
            
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              เตรียมไว้สำหรับซ้อนทับภาพกราฟิกสามมิติ (3D AR Display) ลงบนวิดีโอวงจรของคุณเพื่อช่วยแนะนำแบบเรียลไทม์ กดเปิดกล้องเพื่อจำลองระบบสแกนบอร์ด
            </p>
            
            <button
              onClick={() => setIsCameraActive(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white text-xs font-medium rounded-lg shadow-lg hover:shadow-sky-500/20 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
              <span>จำลองการเปิดใช้งานระบบ AR</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. Footer Control Bar */}
      {isCameraActive && (
        <div className="bg-slate-900 border-t border-slate-800 px-4 py-3 flex justify-between items-center z-20">
          <button
            onClick={() => {
              setIsScanning(true);
              setTimeout(() => setIsScanning(false), 2000);
            }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 hover:text-white text-[11px] font-mono flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-3 h-3" />
            <span>FORCE_RESCAN</span>
          </button>
          
          <div className="text-[10px] font-mono text-slate-500">
            FRAME RATE: <span className="text-emerald-400">60.0 FPS</span>
          </div>

          <button
            onClick={() => setIsCameraActive(false)}
            className="px-3 py-1.5 bg-rose-950/50 hover:bg-rose-900/50 border border-rose-800/50 text-rose-300 hover:text-rose-100 rounded-lg text-[11px] font-mono transition-all"
          >
            ปิดกล้อง AR
          </button>
        </div>
      )}
    </div>
  );
}
