import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import multer from "multer";

const app = express();
const PORT = 3000;

// Enable JSON parser for REST API bodies
app.use(express.json());

// In-memory verification state storage (simulates real-time database state)
// Maps Lesson ID -> Verification Results
interface VerificationResult {
  lessonId: string;
  isCorrect: boolean;
  messageTh: string;
  messageEn: string;
  incorrectStepId?: number;
  lastUpdated: string;
  detectedIssues: Array<{ issueTh: string; issueEn: string; solutionTh: string; solutionEn: string }>;
}

const verificationStates: Record<string, VerificationResult> = {
  "lesson-1": {
    lessonId: "lesson-1",
    isCorrect: true,
    messageTh: "วงจรทำงานถูกต้องดี หลอด LED เปล่งแสงสม่ำเสมอผ่านตัวต้านทาน 220Ω",
    messageEn: "Circuit is operating perfectly. LED glows safely through the 220Ω resistor.",
    lastUpdated: new Date().toISOString(),
    detectedIssues: []
  },
  "lesson-2": {
    lessonId: "lesson-2",
    isCorrect: true,
    messageTh: "วงจรทำงานถูกต้องดี หลอด LED สีน้ำเงินสว่างพร้อมกันเมื่อกดปุ่ม",
    messageEn: "Circuit works correctly. Both Blue LEDs illuminate in series upon pressing the switch.",
    lastUpdated: new Date().toISOString(),
    detectedIssues: []
  },
  "lesson-3": {
    lessonId: "lesson-3",
    isCorrect: true,
    messageTh: "ทรานซิสเตอร์นำกระแสอย่างเหมาะสมเมื่อกระตุ้นขา Base วงจรควบคุม LED สีเขียวสว่างวาบสำเร็จ",
    messageEn: "Transistor conducts nicely when base is excited. Green LED triggers successfully.",
    lastUpdated: new Date().toISOString(),
    detectedIssues: []
  }
};

// Configure Multer for processing physical photo uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
});

// ==========================================
// 1. API ENDPOINT: UPLOAD BREADBOARD PHOTO (From Mobile Web App)
// ==========================================
app.post("/api/upload", upload.single("photo"), async (req, res) => {
  try {
    const lessonId = req.body.lessonId || "lesson-1";
    const forceError = req.body.forceError === "true"; // Demo switcher toggle

    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        messageTh: "กรุณาแนบไฟล์รูปภาพวงจร", 
        messageEn: "Please attach a circuit photo file." 
      });
    }

    console.log(`[SAM 3 Processing] Received circuit photo for ${lessonId}. Size: ${req.file.size} bytes.`);

    // ==========================================
    // PLACEHOLDER: HUGGING FACE / SAM 3 SEGMENTATION API CALL
    // ==========================================
    /*
      const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
      const SAM3_ENDPOINT = "https://api-inference.huggingface.co/models/meta-llama/Segment-Anything-2-or-3"; // Mock url
      
      // Convert image to base64 or binary blob
      const base64Image = req.file.buffer.toString("base64");
      
      const response = await fetch(SAM3_ENDPOINT, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: base64Image,
          parameters: {
            box_threshold: 0.25,
            text_prompt: "electronic component: breadboard, LED, resistor, jumper wires"
          }
        })
      });
      const segmentationResult = await response.json();
    */

    // Simulated SAM 3 + custom rule heuristics processing delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Dynamic result determination (allows simulating both correct and incorrect hardware connections)
    let isCorrect = !forceError;
    let messageTh = "";
    let messageEn = "";
    let incorrectStepId: number | undefined = undefined;
    let detectedIssues: Array<{ issueTh: string; issueEn: string; solutionTh: string; solutionEn: string }> = [];

    if (isCorrect) {
      if (lessonId === "lesson-1") {
        messageTh = "SAM 3 ตรวจจับตำแหน่งอุปกรณ์บนโฟโตบอร์ดถูกต้อง: พบ LED ขาบวกที่แถว 10, ขาลบที่แถว 11 ตัวต้านทานเชื่อมข้ามราง (+) สำเร็จ กระแสไฟปกติ";
        messageEn = "SAM 3 successfully segmented the layout: LED Anode is at Row 10, Cathode is at Row 11. Resistor bridges to V+ safely.";
      } else if (lessonId === "lesson-2") {
        messageTh = "ตรวจจับการต่ออนุกรม LED สำเร็จ: ขาลบ LED 1 เชื่อมต่อกับขาบวก LED 2 ที่แถว 15 ครบวงจร";
        messageEn = "Detected correct series alignment: LED 1 Cathode links to LED 2 Anode on Row 15. Circuit complete.";
      } else {
        messageTh = "ตัวนำกระแส BC547 วางตำแหน่งขาถูกต้อง: ขา Emitter เชื่อมต่อลงรางลบ และสายไฟข้ามคู่อยู่ในสภาพพร้อมทำงาน";
        messageEn = "BC547 transistor pins placed properly: Emitter correctly grounded and control loops are fully operational.";
      }
    } else {
      isCorrect = false;
      incorrectStepId = 2; // Simulating that the error happened in Step 2 (Resistor Placement)
      
      if (lessonId === "lesson-1") {
        messageTh = "ตรวจพบความคลาดเคลื่อนระดับพิน: ตัวต้านทานต่อคร่อมผิดรู เสียบแถว 10 ข้ามไปยังแถว 12 (ทำให้วงจรขาด)";
        messageEn = "SAM 3 detected a misalignment: The resistor is plugged into Row 12 instead of Row 10, leaving the LED Anode open.";
        detectedIssues = [{
          issueTh: "ตัวต้านทานต่อคร่อมรูที่เสียบผิดตำแหน่ง",
          issueEn: "Resistor terminals placed on incorrect rows",
          solutionTh: "ดึงขาล่างของตัวต้านทานย้ายกลับมาเสียบที่แถว 10 (แถวเดียวกับขาที่ยาวกว่าของ LED)",
          solutionEn: "Pull and replug the lower lead of the resistor to Row 10 (sharing the same row as the longer leg of the LED)"
        }];
      } else if (lessonId === "lesson-2") {
        messageTh = "เกิดข้อผิดพลาดในการต่อหลอดไฟ: LED ขั้วบวก/ลบสลับด้านกัน";
        messageEn = "Mismatch detected: LED 2 orientation is reversed (Cathode/Anode swapped).";
        detectedIssues = [{
          issueTh: "หลอดไฟดวงที่ 2 สลับด้านขั้วบวกขั้วลบ",
          issueEn: "Second LED polarity is reversed",
          solutionTh: "ถอนหลอด LED 2 ออกมา แล้วหมุน 180 องศาเพื่อสลับขาก่อนเสียบลงบอร์ดใหม่อีกครั้ง",
          solutionEn: "Remove LED 2 and rotate it 180 degrees before plugging it back in"
        }];
      } else {
        messageTh = "ตรวจพบขาทรานซิสเตอร์วางสลับกัน: สลับตำแหน่งขา Emitter และ Collector";
        messageEn = "Transistor package error: BC547 Emitter and Collector pins are swapped.";
        detectedIssues = [{
          issueTh: "เสียบทรานซิสเตอร์กลับด้าน (หันด้านแบนผิดทิศทาง)",
          issueEn: "BC547 package placed backwards",
          solutionTh: "หมุนตัวถังทรานซิสเตอร์ด้านแบนให้หันเข้าหาตัวผู้ต่อ แล้วเสียบ Pin ซ้ายสุดลงช่อง Emitter ตามเดิม",
          solutionEn: "Flip the BC547 package so that the flat side faces you, ensuring Pin 1 (Emitter) resides on the left"
        }];
      }
    }

    // Save current status to state
    verificationStates[lessonId] = {
      lessonId,
      isCorrect,
      messageTh,
      messageEn,
      incorrectStepId,
      lastUpdated: new Date().toISOString(),
      detectedIssues
    };

    return res.status(200).json({
      success: true,
      data: verificationStates[lessonId]
    });

  } catch (error: any) {
    console.error("API error during circuit analysis:", error);
    return res.status(500).json({
      success: false,
      messageTh: `เกิดข้อผิดพลาดภายในระบบ: ${error.message}`,
      messageEn: `Internal server error: ${error.message}`
    });
  }
});

// ==========================================
// 2. API ENDPOINT: GET CURRENT VERIFICATION STATUS (For Desktop polling)
// ==========================================
app.get("/api/verification-status/:lessonId", (req, res) => {
  const { lessonId } = req.params;
  const status = verificationStates[lessonId];
  if (!status) {
    return res.status(404).json({ success: false, message: "Lesson not found" });
  }
  return res.json({ success: true, data: status });
});

// ==========================================
// 3. API ENDPOINT: RESET STATUS TO CORRECT (For demo restarting)
// ==========================================
app.post("/api/reset-verification/:lessonId", (req, res) => {
  const { lessonId } = req.params;
  if (verificationStates[lessonId]) {
    verificationStates[lessonId] = {
      lessonId,
      isCorrect: true,
      messageTh: "วงจรทำงานถูกต้องดี รอนักเรียนอัปโหลดการเปลี่ยนแปลงทางเทคนิคถัดไป",
      messageEn: "Circuit is currently verified as correct. Ready for next mobile image check.",
      lastUpdated: new Date().toISOString(),
      detectedIssues: []
    };
    return res.json({ success: true, data: verificationStates[lessonId] });
  }
  return res.status(404).json({ success: false, message: "Lesson not found" });
});


// ==========================================
// 4. VITE DEV SERVER AND STATIC FILE ROUTING
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode: Inject Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server integration mounted successfully.");
  } else {
    // Production mode: Serve prebuilt static assets from /dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving prebuilt production folder assets.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running and listening on http://localhost:${PORT}`);
  });
}

startServer();
