import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Smartphone, 
  Sparkles, 
  Cpu, 
  Sliders, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { LESSONS } from '../data';

interface MobileViewProps {
  onBackToDesktop: () => void;
}

export default function MobileView({ onBackToDesktop }: MobileViewProps) {
  const [selectedLessonId, setSelectedLessonId] = useState<string>('lesson-1');
  const activeLesson = LESSONS.find(l => l.id === selectedLessonId) || LESSONS[0];

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [processingStage, setProcessingStage] = useState<string>('');
  
  // Simulation switches
  const [simulateError, setSimulateError] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<any | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const startCamera = async () => {
    try {
      setImagePreview(null);
      setImageFile(null);
      setUploadResult(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Camera access failed", err);
      // Fallback to file picker if camera fails in safe sandboxed frame
      alert("ไม่สามารถเปิดใช้งานกล้องโดยตรงได้ ระบบจะนำท่านไปใช้ตัวเลือกอัปโหลดไฟล์แทน");
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setUploadResult(null);
      stopCamera();
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && streamRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const capturedFile = new File([blob], "captured_circuit.jpg", { type: "image/jpeg" });
            setImageFile(capturedFile);
            setImagePreview(URL.createObjectURL(capturedFile));
            stopCamera();
          }
        }, 'image/jpeg');
      }
    }
  };

  // ==========================================
  // API REQUEST: UPLOAD TO SERVER & RUN SAM 3
  // ==========================================
  const handleUploadAndAnalyze = async () => {
    if (!imageFile) {
      alert("กรุณาเลือกหรือถ่ายภาพแผงวงจรก่อนส่งตรวจ");
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);
    setProcessingStage("1. กำลังอัปโหลดไฟล์รูปภาพไปยัง Server...");

    // Simulated timing steps to mimic professional backend analysis & SAM 3 processing
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    try {
      await delay(800);
      setUploadProgress(35);
      setProcessingStage("2. กำลังเริ่มสแกนพิกัดโฟโตบอร์ด (SAM 3 Auto-Segmentation)...");

      await delay(1000);
      setUploadProgress(70);
      setProcessingStage("3. ตรวจสอบความสอดคล้องตามลำดับขาสัญญาณอิเล็กทรอนิกส์...");

      await delay(900);
      setUploadProgress(90);
      setProcessingStage("4. วิเคราะห์การเชื่อมโยงระบบสมบูรณ์...");

      // Prepare real multipart/form-data POST request
      const formData = new FormData();
      formData.append("photo", imageFile);
      formData.append("lessonId", selectedLessonId);
      formData.append("forceError", simulateError.toString());

      // API Connection endpoint
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      
      if (result.success) {
        setUploadProgress(100);
        setUploadResult(result.data);
      } else {
        throw new Error(result.messageTh || "Upload failed");
      }
    } catch (err: any) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อวิเคราะห์: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setImagePreview(null);
    setUploadResult(null);
    setUploadProgress(0);
    stopCamera();
  };

  return (
    <div className="max-w-md mx-auto bg-slate-900 text-slate-100 min-h-screen flex flex-col font-sans relative shadow-2xl border-x border-slate-800">
      
      {/* 1. Header Area with Smartphone Status Vibes */}
      <div className="p-4 border-b border-slate-800 bg-slate-950 sticky top-0 z-50 flex items-center justify-between">
        <button 
          onClick={onBackToDesktop}
          className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>หน้าจอหลัก (PC)</span>
        </button>

        <div className="flex items-center gap-1.5 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
          <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[10px] font-mono font-bold text-indigo-400 tracking-wider">MOBILE_PORTAL</span>
        </div>
      </div>

      <div className="flex-1 p-5 space-y-6 overflow-y-auto pb-24">
        
        {/* Banner */}
        <div className="bg-gradient-to-tr from-slate-950 to-indigo-950 p-4.5 rounded-2xl border border-slate-800 text-center space-y-2">
          <div className="w-9 h-9 bg-indigo-600/30 rounded-lg flex items-center justify-center mx-auto border border-indigo-500/40">
            <Camera className="w-5 h-5 text-indigo-400" />
          </div>
          <h2 className="font-display font-bold text-sm tracking-tight">กล้องมือถือช่วยสแกนวงจร (AR Scan Tool)</h2>
          <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
            ถ่ายภาพหรือเลือกไฟล์รูปภาพที่ท่านประกอบลงบนบอร์ดทดลองเพื่อประมวลผลด้วยปัญญาประดิษฐ์ SAM 3 บนคลาวด์
          </p>
        </div>

        {/* 2. Step 1: Select Lesson to Verify */}
        <div className="space-y-2.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            1. เลือกบทเรียนที่กำลังทดสอบอยู่:
          </label>
          <div className="grid grid-cols-1 gap-2">
            {LESSONS.map((lesson) => (
              <div 
                key={lesson.id}
                onClick={() => {
                  setSelectedLessonId(lesson.id);
                  setUploadResult(null);
                }}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  selectedLessonId === lesson.id 
                    ? 'bg-indigo-600/20 border-indigo-500/80' 
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-200 block">{lesson.titleTh}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                    lesson.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    lesson.difficulty === 'Medium' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                    'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                  }`}>
                    {lesson.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Simulator Mode Selector */}
        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              โหมดทดสอบผลลัพธ์ (Simulation):
            </span>
            <div className="flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[9px] font-mono text-indigo-400">TESTER</span>
            </div>
          </div>
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setSimulateError(false)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                !simulateError 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              จำลอง: ต่อบอร์ดสำเร็จ (Pass)
            </button>
            <button
              onClick={() => setSimulateError(true)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                simulateError 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              จำลอง: ต่อพินผิดตำแหน่ง (Error)
            </button>
          </div>
          <p className="text-[9px] text-slate-500 italic text-center">
            *ปรับสวิตช์เพื่อสั่งให้โมเดลจำลองการตรวจจับเพื่อดูการแสดงผล QR code บนจอใหญ่และมือถือสลับกัน
          </p>
        </div>

        {/* 3. Capture / Upload Section */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            2. แนบรูปถ่ายการต่อวงจรจริงของคุณ:
          </span>

          <div className="bg-slate-950 border-2 border-dashed border-slate-800 rounded-2xl aspect-[4/3] relative overflow-hidden flex flex-col items-center justify-center p-4">
            
            {/* Real Webcam Feed */}
            {isCameraActive && (
              <div className="absolute inset-0 w-full h-full bg-black z-10 flex flex-col">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={capturePhoto}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5"
                >
                  <Camera className="w-4 h-4" />
                  <span>กดแชะภาพถ่ายวงจร</span>
                </button>
                <button
                  onClick={stopCamera}
                  className="absolute top-4 right-4 bg-slate-900/80 p-1.5 rounded-full text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Static Image Preview */}
            {imagePreview ? (
              <div className="absolute inset-0 w-full h-full bg-slate-950 flex flex-col z-10">
                <img 
                  src={imagePreview} 
                  alt="Breadboard Upload Preview" 
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={handleReset}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 bg-slate-900/90 border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-medium rounded-full shadow-md"
                >
                  ถ่ายใหม่ / ยกเลิก
                </button>
              </div>
            ) : null}

            {/* Default UI controls if nothing is active */}
            {!isCameraActive && !imagePreview && (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-500">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-300">ยังไม่ได้อัปโหลดภาพวงจร</p>
                  <p className="text-[10px] text-slate-500">กรุณาเลือกช่องทางการเปิดรับรูปภาพ</p>
                </div>
                <div className="flex gap-2 justify-center pt-2">
                  <button
                    onClick={startCamera}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all"
                  >
                    <Camera className="w-4 h-4 text-sky-400" />
                    <span>ใช้กล้องมือถือ</span>
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    <span>เลือกรูปภาพจากคลัง</span>
                  </button>
                </div>
              </div>
            )}

            {/* Hidden Input File Element */}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {/* 4. Action Verification Trigger */}
        {imagePreview && !isUploading && !uploadResult && (
          <button
            onClick={handleUploadAndAnalyze}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-900/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>ส่งรูปภาพวิเคราะห์ด้วย AI (SAM 3 Inference)</span>
          </button>
        )}

        {/* 5. Loading Processing State Screen */}
        {isUploading && (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-center animate-pulse">
            <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block">AI INFERENCE IN PROGRESS</span>
              <p className="text-xs font-semibold text-slate-300">{processingStage}</p>
            </div>
            
            {/* Custom visual progress bar */}
            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
              <div 
                className="bg-gradient-to-r from-sky-400 to-indigo-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-indigo-400 font-bold">{uploadProgress}%</span>
          </div>
        )}

        {/* 6. Scan Analysis Results Showcase */}
        {uploadResult && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <div className="flex items-center gap-1.5">
                {uploadResult.isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                )}
                <span className="text-xs font-bold text-slate-200">ผลการวิเคราะห์พินล่าสุด:</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                uploadResult.isCorrect ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
              }`}>
                {uploadResult.isCorrect ? 'SUCCESS' : 'DIVERGENT'}
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-slate-300 font-medium">
                {uploadResult.messageTh}
              </p>

              {/* Troubleshooting specific tips returned from server */}
              {!uploadResult.isCorrect && uploadResult.detectedIssues.length > 0 && (
                <div className="space-y-2 pt-1 border-t border-slate-900">
                  <span className="text-[9px] font-bold text-rose-400 uppercase tracking-wider block">
                    แนวทางปรับพินด่วนบนบอร์ดจริง:
                  </span>
                  {uploadResult.detectedIssues.map((issue: any, index: number) => (
                    <div key={index} className="bg-slate-900 border border-slate-800/80 p-3 rounded-lg text-[11px] space-y-1.5">
                      <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                        <span>{issue.issueTh}</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed">
                        👉 <span className="text-emerald-400 font-bold">วิธีแก้ไข:</span> {issue.solutionTh}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Restart testing buttons */}
            <div className="pt-2 flex gap-2">
              <button
                onClick={handleReset}
                className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-white text-xs font-semibold transition-all"
              >
                สแกนรูปอื่นอีกครั้ง
              </button>
              
              <button
                onClick={onBackToDesktop}
                className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all text-center"
              >
                กลับไปดูสเตตัสจอใหญ่
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Footer Branding Navigation */}
      <div className="absolute bottom-0 inset-x-0 bg-slate-950 border-t border-slate-800 p-4 text-center text-[10px] text-slate-500 font-mono">
        CIRCUIT VERIFIER MOBILE SYSTEM &copy; 2026
      </div>

    </div>
  );
}
