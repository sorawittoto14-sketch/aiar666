import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  Cpu, 
  Battery, 
  Cable, 
  Lightbulb, 
  Activity, 
  CheckCircle, 
  AlertTriangle,
  Smartphone,
  FolderOpen,
  Info,
  HelpCircle,
  ToggleLeft,
  ChevronLeft
} from 'lucide-react';
import { LESSONS } from './data';
import { Lesson } from './types';
import CircuitSchematic from './components/CircuitSchematic';
import ArDisplay from './components/ArDisplay';
import QrCodeSection from './components/QrCodeSection';
import MobileView from './components/MobileView';

export default function App() {
  // Mobile vs Desktop toggle state
  const [isMobileMode, setIsMobileMode] = useState<boolean>(false);

  // Application Language state (defaults to Thai as requested)
  const [lang, setLang] = useState<'TH' | 'EN'>('TH');
  
  // Selection state for lessons
  const [selectedLessonId, setSelectedLessonId] = useState<string>('lesson-1');
  const activeLesson = LESSONS.find(l => l.id === selectedLessonId) || LESSONS[0];
  
  // Interactive assembly stepper state
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  
  // Hardware status simulation state (correct vs error). 
  // Helps show the QR Code scanner and warnings when simulated as wrong.
  const [isCorrectState, setIsCorrectState] = useState<boolean>(true);

  // Real-time backend polling to mirror changes from the mobile uploader portal
  useEffect(() => {
    let intervalId: any;

    const checkStatusFromServer = async () => {
      try {
        const response = await fetch(`/api/verification-status/${selectedLessonId}`);
        const result = await response.json();
        if (result.success && result.data) {
          setIsCorrectState(result.data.isCorrect);
        }
      } catch (err) {
        console.warn("Could not connect to fullstack backend polling endpoint. Using offline local state.", err);
      }
    };

    // Run initial check
    checkStatusFromServer();

    // Set polling interval every 2000ms
    intervalId = setInterval(checkStatusFromServer, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [selectedLessonId]); // Primitive string dependency avoids infinite re-renders

  const triggerResetOnServer = async (lessonId: string) => {
    try {
      const response = await fetch(`/api/reset-verification/${lessonId}`, {
        method: 'POST'
      });
      const result = await response.json();
      if (result.success) {
        setIsCorrectState(true);
      }
    } catch (err) {
      setIsCorrectState(true);
    }
  };

  // Link to the Google Drive folder for supplementary slides and course work
  const googleDriveUrl = "https://drive.google.com/drive/folders/1electronics-circuit-learning-resources-mock";

  // Function to map component icon name to Lucide Component
  const renderComponentIcon = (iconName: string) => {
    switch (iconName) {
      case 'Lightbulb': return <Lightbulb className="w-4 h-4 text-amber-500" />;
      case 'Activity': return <Activity className="w-4 h-4 text-sky-500" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-indigo-500" />;
      case 'Battery': return <Battery className="w-4 h-4 text-emerald-500" />;
      case 'Cable': return <Cable className="w-4 h-4 text-purple-500" />;
      default: return <Cpu className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleLessonClick = (id: string) => {
    setSelectedLessonId(id);
    setActiveStepIndex(0);
    triggerResetOnServer(id);
  };

  // If in Mobile simulation portal mode, render the Mobile Viewport
  if (isMobileMode) {
    return (
      <div className="bg-slate-950 min-h-screen">
        <MobileView onBackToDesktop={() => setIsMobileMode(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white flex flex-col">
      
      {/* 1. Global Navigation Bar */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-indigo-600 to-indigo-400 p-2.5 rounded-xl text-white shadow-md shadow-indigo-200">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-display font-bold text-lg bg-gradient-to-r from-slate-950 to-indigo-950 bg-clip-text text-transparent">
                Circuit Lab Verifier
              </span>
              <p className="text-[10px] font-mono tracking-wider text-slate-400 font-semibold uppercase">
                ระบบวิเคราะห์วงจรอิเล็กทรอนิกส์พื้นฐาน
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200/80">
              <button 
                onClick={() => setLang('TH')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${lang === 'TH' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                TH
              </button>
              <button 
                onClick={() => setLang('EN')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${lang === 'EN' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                EN
              </button>
            </div>

            {/* Quick Link to Google Drive */}
            <a 
              href={googleDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl border border-indigo-100 transition-all hover:scale-[1.02] shadow-sm"
            >
              <FolderOpen className="w-4 h-4 text-indigo-600" />
              <span>{lang === 'TH' ? 'ไดรฟ์ข้อมูลเสริม' : 'Google Drive Resources'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* Toggle Mobile Simulation Mode */}
            <button 
              onClick={() => setIsMobileMode(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all hover:scale-[1.02] shadow-sm cursor-pointer border border-slate-800 animate-pulse"
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'TH' ? 'เปิดแอปสแกนบนมือถือ' : 'Open Mobile Scanner'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Lab Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Banner Section */}
        <div className="relative bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl overflow-hidden p-6 sm:p-8 border border-slate-800 shadow-xl">
          <div className="absolute inset-0 lab-grid opacity-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 rounded-full text-xs font-semibold text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart IoT e-Learning Assistant</span>
            </span>
            <h1 className="font-display font-bold text-2xl sm:text-3xl tracking-tight leading-tight">
              {lang === 'TH' ? 'เครื่องมือเรียนรู้และตรวจสอบการต่อวงจรอิเล็กทรอนิกส์' : 'Electronic Circuit Learning & Verification Interface'}
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              {lang === 'TH' 
                ? 'เลือกบทเรียนด้านล่างนี้ประกอบชุดฝึกปฏิบัติ ปฏิบัติตามขั้นตอน และใช้กล้อง AR ในการตรวจสอบความถูกต้องร่วมกับการสแกน QR Code เพื่อรับความช่วยเหลือเมื่อระบบตรวจพบวงจรผิดพลาด'
                : 'Select a laboratory exercise, assemble components following the smart step-by-step schematics, check the AR diagnostic feedback, and use target QR Codes when mistakes are flagged.'
              }
            </p>
          </div>
        </div>

        {/* SECTION A: 3 LESSON CARDS (Learning Media Sections) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            <h2 className="font-display font-bold text-lg text-slate-900">
              {lang === 'TH' ? 'บทเรียนและสื่อนวัตกรรมการศึกษา (3 บทเรียนหลัก)' : 'Innovative Learning Lessons (3 Core Modules)'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {LESSONS.map((lesson) => {
              const isActive = lesson.id === selectedLessonId;
              const diffColors = {
                Easy: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                Medium: 'bg-sky-50 text-sky-700 border-sky-200',
                Hard: 'bg-purple-50 text-purple-700 border-purple-200',
              };

              return (
                <div 
                  key={lesson.id}
                  onClick={() => handleLessonClick(lesson.id)}
                  className={`group cursor-pointer p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                    isActive 
                      ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-500/15' 
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  {/* Active selection dot indicator */}
                  {isActive && (
                    <div className="absolute top-0 right-0 w-4 h-4 bg-indigo-600 rounded-bl-xl flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${diffColors[lesson.difficulty]}`}>
                        {lesson.difficulty}
                      </span>
                      <span className="text-xs text-slate-400 font-mono font-medium">{lesson.duration}</span>
                    </div>

                    <div>
                      <h3 className={`font-display font-bold text-sm group-hover:text-indigo-600 transition-colors ${
                        isActive ? 'text-indigo-600' : 'text-slate-900'
                      }`}>
                        {lang === 'TH' ? lesson.titleTh : lesson.title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed mt-1.5 line-clamp-2">
                        {lang === 'TH' ? lesson.descriptionTh : lesson.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <span className={isActive ? 'text-indigo-600' : 'text-slate-500'}>
                      {lang === 'TH' ? 'เริ่มเรียนรู้ปฏิบัติ' : 'Start Lesson'}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-indigo-600 translate-x-1' : 'text-slate-400 group-hover:translate-x-1'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION B: CORE LAB WORKBENCH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANELS (Col span 7): Guides, Components, and Schematic Instructions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Lesson Guide & Active Connection Stepper */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono font-bold text-indigo-600 tracking-wider uppercase">
                    ACTIVE LESSON COMPANION
                  </span>
                  <h3 className="font-display font-bold text-slate-900 text-base mt-0.5">
                    {lang === 'TH' ? activeLesson.titleTh : activeLesson.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-mono">
                    Step {activeStepIndex + 1} of {activeLesson.steps.length}
                  </span>
                </div>
              </div>

              {/* Component Bill of Materials needed for current circuit */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {lang === 'TH' ? 'รายการอุปกรณ์ที่ต้องเตรียม:' : 'Required Bill of Materials:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeLesson.components.map((comp, idx) => (
                    <div 
                      key={idx} 
                      className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl text-xs text-slate-600"
                    >
                      {renderComponentIcon(comp.icon)}
                      <span className="font-medium">{comp.name}</span>
                      <span className="font-mono bg-slate-200/60 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-500">
                        x{comp.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Connection Stepper Buttons */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {lang === 'TH' ? 'ขั้นตอนการต่อวงจรทีละสเต็ป (คลิกเพื่อดูจุดเชื่อมต่อ):' : 'Interactive Assembly Steps (Click to highlight pins):'}
                </span>

                <div className="space-y-2">
                  {activeLesson.steps.map((step, idx) => {
                    const isSelected = idx === activeStepIndex;
                    const isCompleted = idx < activeStepIndex;

                    return (
                      <div 
                        key={step.id}
                        onClick={() => setActiveStepIndex(idx)}
                        className={`group cursor-pointer p-3.5 rounded-xl border transition-all flex gap-3 items-start ${
                          isSelected 
                            ? 'bg-indigo-50/50 border-indigo-200 shadow-sm' 
                            : 'bg-white border-slate-100 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-mono font-bold transition-all ${
                          isSelected 
                            ? 'bg-indigo-600 text-white' 
                            : isCompleted 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                        }`}>
                          {step.id}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className={`text-xs font-medium leading-relaxed ${
                            isSelected ? 'text-indigo-950 font-semibold' : 'text-slate-700'
                          }`}>
                            {lang === 'TH' ? step.instructionTh : step.instruction}
                          </p>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono bg-slate-100 border border-slate-200/50 px-1.5 py-0.5 rounded text-slate-500">
                              Pin check: {lang === 'TH' ? step.checkPointTh : step.checkPoint}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation stepper buttons */}
              <div className="flex justify-between items-center pt-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-600 text-xs font-medium rounded-xl border border-slate-200/60 flex items-center gap-1 transition-all disabled:pointer-events-none"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{lang === 'TH' ? 'ขั้นตอนก่อนหน้า' : 'Previous Step'}</span>
                </button>
                
                <button
                  disabled={activeStepIndex === activeLesson.steps.length - 1}
                  onClick={() => setActiveStepIndex(prev => Math.min(activeLesson.steps.length - 1, prev + 1))}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-medium rounded-xl flex items-center gap-1 transition-all disabled:pointer-events-none shadow-sm"
                >
                  <span>{lang === 'TH' ? 'ขั้นตอนถัดไป' : 'Next Step'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Expected Result Panel (ผลลัพธ์การทำงาน) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <h3 className="font-display font-semibold text-slate-900 text-base">
                  {lang === 'TH' ? 'ผลลัพธ์การทำงานของวงจรที่ถูกต้อง' : 'Expected Circuit Outcome'}
                </h3>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                {lang === 'TH' ? activeLesson.expectedResultTh : activeLesson.expectedResult}
              </p>
            </div>

            {/* Google Drive Resources box */}
            <div className="bg-indigo-950 text-indigo-100 rounded-2xl p-6 border border-indigo-900 shadow-md relative overflow-hidden">
              <div className="absolute inset-0 lab-grid opacity-5 pointer-events-none"></div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono tracking-widest text-indigo-300 font-bold uppercase">
                    GOOGLE WORKSPACE LEARNING CENTER
                  </span>
                  <h4 className="text-white font-display font-bold text-sm">
                    {lang === 'TH' ? 'ดาวน์โหลดเอกสารปฏิบัติการ & คู่มือเรียนรู้วงจร' : 'Lab Sheets & Reference Course Work'}
                  </h4>
                  <p className="text-indigo-200 text-xs max-w-lg leading-relaxed">
                    {lang === 'TH'
                      ? 'คุณสามารถเข้าถึงโฟลเดอร์ Google Drive ของโรงเรียนเพื่อดึงไฟล์ PDF ตารางค่าตัวต้านทาน วงจรรูปภาพจำลอง และสไลด์อธิบายทฤษฎีไฟฟ้าลัดวงจร'
                      : 'Access Google Drive files including breadboard datasheets, laboratory worksheets, transistor models, and teacher slides.'
                    }
                  </p>
                </div>
                <a 
                  href={googleDriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all self-stretch sm:self-auto text-center justify-center shrink-0 shadow-sm"
                >
                  <span>{lang === 'TH' ? 'เปิดคลังข้อมูลเสริม' : 'Open Google Drive'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT PANELS (Col span 5): Interactive Schematics, AR Viewports, and QR Codes */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Dynamic Circuit Schematic Panel */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {lang === 'TH' ? 'แผนผังจำลองวงจรเสมือนจริง:' : 'Interactive Circuit Schematic:'}
                </span>
                <span className="text-[9px] font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded font-bold uppercase">
                  Step {activeStepIndex + 1} Highlight
                </span>
              </div>
              <CircuitSchematic 
                schematicId={activeLesson.schematicImage} 
                activeStep={activeStepIndex + 1} 
              />
              <div className="flex items-start gap-1.5 text-slate-400 text-[10px]">
                <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <p>
                  {lang === 'TH'
                    ? 'สัญลักษณ์บนผังแสดงการต่อตัวต้านทาน แบตเตอรี่ และชิ้นส่วนที่สอดคล้องกับแถวบนโฟโตบอร์ดปัจจุบัน'
                    : 'Interactive symbols will glow when you transition through the stepper above.'
                  }
                </p>
              </div>
            </div>

            {/* 2. AR DISPLAY CONTAINER (เตรียมสำหรับการแสดงผลภาพ AR ในภายหลัง) */}
            {/* 
              ========================================================
              CRITICAL NOTICE: AR DISPLAY CONTAINER (FOR FUTURE HOOK)
              ========================================================
              This container is styled to mock an AR (Augmented Reality) viewport 
              overlaying 3D lines onto the real physical breadboard image.
              In the future, load camera assets here using navigator.mediaDevices 
              or third party AR engines (A-Frame, Three.js, OpenCV).
            */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {lang === 'TH' ? 'พื้นที่เชื่อมต่อระบบ AR (AR Display Container):' : 'Augmented Reality Viewer:'}
                </span>
                <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold uppercase">
                  Mock ready
                </span>
              </div>

              {/* Mounting our interactive AR Display component */}
              <ArDisplay 
                lessonId={activeLesson.id} 
                isCorrectState={isCorrectState} 
                onVerify={() => setIsCorrectState(true)}
              />

              <div className="text-[10px] text-slate-400 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-2 leading-relaxed">
                <div className="bg-indigo-100 text-indigo-700 p-1 rounded font-mono font-bold text-[8px] shrink-0">
                  DEV_NOTE
                </div>
                <p>
                  {lang === 'TH'
                    ? 'สลัดคอมเมนต์ในโค้ดของ component "ArDisplay" ไว้อย่างชัดเจนสำหรับต่อประสานกล้องจริงและโมเดล TensorFlow.js Object Detection ในอนาคต'
                    : 'The code of "ArDisplay" contains explicit hooks and comments where you can load WebRTC streams and computer vision models.'
                  }
                </p>
              </div>
            </div>

            {/* 3. QR CODE TROUBLESHOOTING CARD */}
            <QrCodeSection 
              lesson={activeLesson}
              isCorrectState={isCorrectState}
              onSimulateSuccess={() => setIsCorrectState(true)}
              onSimulateFailure={() => setIsCorrectState(false)}
            />

          </div>

        </div>

      </main>

      {/* 3. Global Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-500/80" />
            <span>&copy; 2026 Circuit Lab Verifier. For Vocational & Secondary Engineering Science.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-600 cursor-pointer">{lang === 'TH' ? 'คู่มือผู้ใช้' : 'User Guide'}</span>
            <span className="text-slate-200">|</span>
            <span className="hover:text-slate-600 cursor-pointer">{lang === 'TH' ? 'ติดต่อฝ่ายสนับสนุน' : 'Support Desk'}</span>
            <span className="text-slate-200">|</span>
            <a href={googleDriveUrl} target="_blank" rel="noreferrer" className="hover:text-indigo-600 font-semibold flex items-center gap-1 text-indigo-500">
              <span>Google Drive</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
