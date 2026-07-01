import React from 'react';
import { AlertCircle, QrCode, Smartphone, Check, ArrowRight, HelpCircle } from 'lucide-react';
import { Lesson } from '../types';

interface QrCodeSectionProps {
  lesson: Lesson;
  isCorrectState: boolean;
  onSimulateSuccess: () => void;
  onSimulateFailure: () => void;
}

export default function QrCodeSection({ 
  lesson, 
  isCorrectState, 
  onSimulateSuccess, 
  onSimulateFailure 
}: QrCodeSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between h-full relative overflow-hidden">
      
      {/* Decorative accent ring on top */}
      <div className={`absolute top-0 inset-x-0 h-1.5 ${isCorrectState ? 'bg-emerald-500' : 'bg-amber-500'}`} />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            <h3 className="font-display font-semibold text-slate-900 text-base">
              ระบบตรวจสอบและช่วยเหลือนักเรียน
            </h3>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
            isCorrectState 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            {isCorrectState ? 'สเตตัส: ปกติ/ผ่าน' : 'สเตตัส: ต้องการการซ่อมแซม'}
          </span>
        </div>

        <p className="text-slate-500 text-xs leading-relaxed mb-5">
          จำลองสถานะการประกอบวงจรของท่าน เพื่อทดสอบการแจ้งเตือนสแกนความผิดพลาดผ่านระบบสมาร์ทโฟน
        </p>

        {/* Simulator controls for lesson debugging */}
        <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <button
            onClick={onSimulateSuccess}
            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
              isCorrectState 
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            จำลอง: วงจรต่อถูกต้อง
          </button>
          <button
            onClick={onSimulateFailure}
            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
              !isCorrectState 
                ? 'bg-amber-600 text-white border-amber-600 shadow-sm' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            จำลอง: วงจรต่อไม่สำเร็จ
          </button>
        </div>

        {/* Interactive QR Display & Tips */}
        {!isCorrectState ? (
          <div className="space-y-4 animate-fade-in">
            {/* Warning header */}
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-amber-800 text-xs font-semibold">วงจรมีจุดบกพร่อง!</h4>
                <p className="text-amber-700 text-[11px] leading-relaxed mt-0.5">
                  ระบบตรวจจับการเชื่อมต่อผิดขั้วหรือมีส่วนที่ข้ามขั้นตอน แสกนคิวอาร์โค้ดด้านล่างเพื่อแก้ปัญหาระบบแบบเร่งด่วนในมือถือ
                </p>
              </div>
            </div>

            {/* QR Scanner Container */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col md:flex-row items-center gap-4">
              <div className="bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm shrink-0">
                <img 
                  src={lesson.qrCodeUrl} 
                  alt="Lesson Help QR Code" 
                  className="w-28 h-28 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 text-slate-800 text-xs font-bold mb-1">
                  <Smartphone className="w-4 h-4 text-slate-600" />
                  <span>สแกนคู่มือการแก้ไขวิกฤติ</span>
                </div>
                <p className="text-slate-500 text-[10px] leading-relaxed">
                  สแกนด้วยสมาร์ทโฟนของนักเรียน เพื่อดูรายละเอียดขั้นตอนจำลองการประกอบวงจรที่ผิดพลาดแบบเป็นขั้นเป็นตอน 3 มิติ
                </p>
                <div className="mt-2.5 inline-flex items-center gap-1 text-[10px] text-indigo-600 font-semibold hover:underline cursor-pointer">
                  <span>เปิดคู่มือการซ่อมแซมโดยตรง</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* In-app Troubleshooting Tips */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                แนวทางแก้ไขพื้นฐาน (In-App Tips):
              </span>
              {lesson.troubleshootingTips.map((tip, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-xs">
                  <div className="font-semibold text-slate-800 flex items-center gap-1">
                    <span className="text-rose-500">⚠</span>
                    <span>{tip.issueTh}</span>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-1 pl-4 leading-relaxed border-l border-slate-200">
                    💡 <span className="font-medium text-slate-700">วิธีแก้:</span> {tip.solutionTh}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-3 border border-emerald-200">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-slate-800 font-semibold text-xs mb-1">ยินดีด้วย! บอร์ดทำงานถูกต้อง</h4>
            <p className="text-slate-500 text-[11px] max-w-xs leading-relaxed">
              ในสถานการณ์นี้ไม่ต้องการการแก้ปัญหา นักเรียนสามารถขยับไปทำบทเรียนถัดไป หรือลองกดจำลองว่า "วงจรต่อไม่สำเร็จ" เพื่อสแกน QR Code ตรวจสอบ
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4 flex justify-between items-center text-[10px] text-slate-400 font-mono">
        <span>QR CODE API STATUS: <span className="text-emerald-500 font-bold">READY</span></span>
        <span>ID: {lesson.id}</span>
      </div>
    </div>
  );
}
