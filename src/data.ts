import { Lesson } from './types';

export const LESSONS: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Basic LED & Resistor Circuit',
    titleTh: 'วงจรไฟ LED และตัวต้านทานจำกัดกระแสพื้นฐาน',
    difficulty: 'Easy',
    duration: '10 mins',
    description: 'Learn how to safely connect a Light Emitting Diode (LED) with a current-limiting resistor to a 9V power source to prevent the LED from burning out.',
    descriptionTh: 'เรียนรู้วิธีการต่อหลอด LED เข้ากับตัวต้านทานจำกัดกระแสไฟฟ้าและแบตเตอรี่ 9V อย่างปลอดภัย เพื่อป้องกันไม่ให้หลอด LED ได้รับกระแสเกินจนไหม้เสียหาย',
    components: [
      { name: 'Red LED (5mm)', quantity: 1, icon: 'Lightbulb' },
      { name: '220Ω Resistor (ตัวต้านทาน)', quantity: 1, icon: 'Activity' },
      { name: 'Breadboard (โฟโตบอร์ด)', quantity: 1, icon: 'Cpu' },
      { name: '9V Battery (แบตเตอรี่ 9V)', quantity: 1, icon: 'Battery' },
      { name: 'Jumper Wires (สายจัมเปอร์)', quantity: 2, icon: 'Cable' }
    ],
    steps: [
      {
        id: 1,
        instruction: 'Insert the Red LED into the breadboard. Keep track of the longer leg (Anode, positive +) and shorter leg (Cathode, negative -).',
        instructionTh: 'เสียบ LED สีแดงลงบนโฟโตบอร์ด โดยให้จำว่าขาที่ยาวกว่าคือ ขั้วบวก (Anode) และขาที่สั้นกว่าคือ ขั้วลบ (Cathode) เสียบในรูที่ต่างกัน',
        checkPoint: 'Anode in row 10, Cathode in row 11',
        checkPointTh: 'ขาบวกอยู่ที่แถว 10, ขาลบอยู่ที่แถว 11'
      },
      {
        id: 2,
        instruction: 'Connect one terminal of the 220Ω Resistor into the same row as the LED Anode (longer leg, row 10), and the other terminal to the positive rail (+) of the breadboard.',
        instructionTh: 'เสียบขาด้านหนึ่งของตัวต้านทาน 220Ω ในแถวเดียวกับขาบวกของ LED (แถว 10) และเสียบขาอีกด้านเข้าที่รางบวก (+) ของโฟโตบอร์ด',
        checkPoint: 'Resistor bridges Row 10 to Red (+) Rail',
        checkPointTh: 'ตัวต้านทานเชื่อมแถว 10 เข้ากับรางสีแดง (+)'
      },
      {
        id: 3,
        instruction: 'Use a black jumper wire to connect the LED Cathode (shorter leg, row 11) to the negative rail (-) of the breadboard.',
        instructionTh: 'ใช้สายจัมเปอร์สีดำ เชื่อมต่อจากแถวขาลบของ LED (แถว 11) ไปยังรางลบ (-) ของโฟโตบอร์ด',
        checkPoint: 'Jumper wire bridges Row 11 to Blue (-) Rail',
        checkPointTh: 'สายจัมเปอร์เชื่อมแถว 11 เข้ากับรางสีน้ำเงิน (-)'
      },
      {
        id: 4,
        instruction: 'Connect the 9V Battery clip: Red wire to the positive rail (+), and Black wire to the negative rail (-) of the breadboard.',
        instructionTh: 'ต่อขั้วแบตเตอรี่ 9V: สายสีแดงต่อเข้าที่รางบวก (+) และสายสีดำต่อเข้าที่รางลบ (-) ของโฟโตบอร์ด',
        checkPoint: 'Battery Red to (+) Rail, Battery Black to (-) Rail',
        checkPointTh: 'สายแดงของแบตเตอรี่เข้าราง (+) และสายดำเข้าราง (-)'
      }
    ],
    expectedResult: 'The Red LED lights up steadily and glows safely. The 220Ω resistor successfully limits the current flow to about 32mA, ensuring the LED operates within safe parameters.',
    expectedResultTh: 'หลอด LED สีแดงจะเปล่งแสงสว่างขึ้นอย่างสม่ำเสมอและปลอดภัย ตัวต้านทาน 220 โอห์มจะทำหน้าที่จำกัดกระแสไฟฟ้าให้ไหลผ่านประมาณ 32mA ช่วยถนอมไม่ให้ LED ร้อนจนขาดเสียหาย',
    troubleshootingTips: [
      {
        issue: 'LED does not light up at all',
        issueTh: 'LED ไม่ยอมเปล่งแสงเลย',
        solution: 'Check if the LED is reversed (Anode/Cathode swapped). Ensure the 9V battery is not dead and all connections are pushed firmly into the breadboard.',
        solutionTh: 'ตรวจสอบว่าใส่ขา LED สลับด้านหรือไม่ (ขาบวก/ขาลบสลับกัน) และเช็คว่าสายแบตเตอรี่เสียบแน่นหนาดีแล้ว'
      },
      {
        issue: 'LED flashed brightly once and then went out forever',
        issueTh: 'LED สว่างวาบเพียงครั้งเดียวแล้วดับไปถาวร',
        solution: 'You likely bypassed the 220Ω resistor. High current from the 9V battery burned the internal junction. Replace the LED and ensure the resistor is wired in series.',
        solutionTh: 'เป็นไปได้ว่าคุณไม่ได้ต่อตัวต้านทานจำกัดกระแส หรือต่อลัดวงจรข้ามตัวต้านทาน ทำให้กระแสจากแบตเตอรี่ 9V ไหลเข้าโดยตรงจน LED ขาด ต้องเปลี่ยนหลอดใหม่และต่อผ่านตัวต้านทาน'
      }
    ],
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://circuit-verifier-help.io/troubleshoot/lesson-1',
    schematicImage: 'led_basic_schematic'
  },
  {
    id: 'lesson-2',
    title: 'Series & Parallel LED Networks',
    titleTh: 'วงจรเชื่อมต่อ LED แบบอนุกรมและแบบขนาน',
    difficulty: 'Medium',
    duration: '15 mins',
    description: 'Compare current division and voltage drops across LEDs. Wire two LEDs in series and parallel to analyze differences in luminosity and stability.',
    descriptionTh: 'เปรียบเทียบความแตกต่างระหว่างการต่อหลอด LED สองหลอดแบบอนุกรม (Series) และแบบขนาน (Parallel) เพื่อสังเกตการณ์แบ่งแรงดัน กระแสไฟฟ้า และระดับความสว่าง',
    components: [
      { name: 'Blue LEDs (5mm)', quantity: 2, icon: 'Lightbulb' },
      { name: '220Ω Resistors', quantity: 2, icon: 'Activity' },
      { name: 'Push Button Switch', quantity: 1, icon: 'ToggleLeft' },
      { name: 'Breadboard (โฟโตบอร์ด)', quantity: 1, icon: 'Cpu' },
      { name: '9V Battery (แบตเตอรี่ 9V)', quantity: 1, icon: 'Battery' },
      { name: 'Jumper Wires (สายจัมเปอร์)', quantity: 4, icon: 'Cable' }
    ],
    steps: [
      {
        id: 1,
        instruction: 'Let\'s build the Series circuit first. Insert LED 1 and LED 2 on the breadboard such that the Cathode (short leg) of LED 1 connects directly to the Anode (long leg) of LED 2 in the same row.',
        instructionTh: 'เริ่มจากต่อแบบอนุกรม เสียบ LED 1 และ LED 2 โดยให้ขาลบ (Cathode) ของหลอดที่ 1 อยู่ในแถวเดียวกับขาบวก (Anode) ของหลอดที่ 2 เพื่อให้กระแสไหลต่อกัน',
        checkPoint: 'LED 1 Cathode meets LED 2 Anode on Row 15',
        checkPointTh: 'ขาลบของ LED 1 และขาบวกของ LED 2 ต่อร่วมกันที่แถว 15'
      },
      {
        id: 2,
        instruction: 'Connect a 220Ω resistor from the breadboard\'s positive rail (+) to the Anode of LED 1 (Row 14).',
        instructionTh: 'ต่อตัวต้านทาน 220Ω จากรางบวก (+) มายังแถวขาบวกของ LED 1 (แถว 14)',
        checkPoint: 'Resistor from Red (+) Rail to Row 14',
        checkPointTh: 'ตัวต้านทานเชื่อมจากราง (+) มายังแถว 14'
      },
      {
        id: 3,
        instruction: 'Insert the Push Button Switch bridging the center divide of the breadboard. Connect LED 2\'s Cathode (Row 16) to one pin of the switch.',
        instructionTh: 'เสียบปุ่มกดคร่อมร่องกลางของบอร์ด ต่อสายเชื่อมจากขาลบของ LED 2 (แถว 16) ไปหาขาข้างหนึ่งของปุ่มกด',
        checkPoint: 'Wire bridges Row 16 to Switch Pin 1',
        checkPointTh: 'สายไฟต่อจากแถว 16 ไปหาขาที่ 1 ของปุ่มกด'
      },
      {
        id: 4,
        instruction: 'Connect the other pin of the switch to the negative rail (-) using a jumper wire. Connect the 9V battery and press the button.',
        instructionTh: 'ต่อสายไฟจากขาที่สองของปุ่มกดลงรางลบ (-) เชื่อมต่อขั้วแบตเตอรี่แล้วกดปุ่มเพื่อทดสอบ',
        checkPoint: 'Switch Pin 2 wired to Blue (-) Rail',
        checkPointTh: 'ขาที่ 2 ของปุ่มกดต่อสายจัมเปอร์ลงรางลบ (-)'
      }
    ],
    expectedResult: 'When pressing the button, both Blue LEDs glow in series. They will appear slightly dimmer than a single LED because the 9V voltage is divided between the two LEDs (about 3.2V drop each), leaving less voltage across the resistor.',
    expectedResultTh: 'เมื่อกดปุ่ม หลอดไฟสีน้ำเงินทั้งสองจะสว่างขึ้นพร้อมกัน ทว่าระดับความสว่างจะดูลดลงเล็กน้อย เนื่องจากแรงดันไฟฟ้า 9V ถูกแบ่งกันระหว่าง LED ทั้งสองดวง (ตกคร่อมดวงละประมาณ 3.2V) ทำให้มีแรงดันเหลือผ่านตัวต้านทานลดลง',
    troubleshootingTips: [
      {
        issue: 'Neither LED lights up when pressing the button',
        issueTh: 'กดสวิตช์แล้วไฟไม่ติดเลยทั้งสองดวง',
        solution: 'Since it is a series circuit, if even ONE LED is reversed or loose, the entire circuit is broken. Ensure both LEDs are facing the same direction (Anode to Cathode flow) and the switch is securely clicked.',
        solutionTh: 'เนื่องจากเป็นวงจรอนุกรม หากมีหลอดใดหลอดหนึ่งใส่กลับด้านหรือขั้วหลวม กระแสจะไม่สามารถไหลครบวงจรได้ ให้เช็คขั้วของทั้งสองดวงและตรวจสอบว่าสวิตช์กดได้แน่นดี'
      },
      {
        issue: 'The LEDs stay turned on without pressing the button',
        issueTh: 'หลอดไฟสว่างตลอดเวลาโดยไม่ต้องกดปุ่ม',
        solution: 'You may have connected the wires to the same internal terminal of the tactile switch or short-circuited the switch. Move the jumper to the diagonal pin of the button switch.',
        solutionTh: 'คุณอาจเสียบสายไฟเข้าขาที่เป็นคู่สัมผัสภายในเดียวกันของปุ่มกด หรือต่อข้ามขั้วสวิตช์ ให้ย้ายสายไฟไปยังขาทแยงมุมของปุ่มกดเพื่อใช้งานสวิตช์หน้าสัมผัส'
      }
    ],
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://circuit-verifier-help.io/troubleshoot/lesson-2',
    schematicImage: 'series_parallel_schematic'
  },
  {
    id: 'lesson-3',
    title: 'Transistor as an Electronic Switch',
    titleTh: 'การใช้งานทรานซิสเตอร์เสมือนสวิตช์อิเล็กทรอนิกส์',
    difficulty: 'Hard',
    duration: '20 mins',
    description: 'Use a BC547 NPN Transistor to amplify a micro-current from a push button, acting as a switch to drive a high-brightness Green LED circuit.',
    descriptionTh: 'เรียนรู้การใช้ทรานซิสเตอร์ชนิด NPN เบอร์ BC547 ทำหน้าที่ขยายกระแสไฟฟ้าควบคุมปริมาณน้อยๆ จากปุ่มกด เพื่อสั่งเปิด-ปิดวงจรหลักที่ควบคุม LED สีเขียวความสว่างสูง',
    components: [
      { name: 'NPN Transistor (BC547)', quantity: 1, icon: 'Cpu' },
      { name: 'Green LED (5mm)', quantity: 1, icon: 'Lightbulb' },
      { name: '1kΩ Resistor (ตัวต้านทานควบคุม)', quantity: 1, icon: 'Activity' },
      { name: '220Ω Resistor (ตัวต้านทานจำกัดกระแส)', quantity: 1, icon: 'Activity' },
      { name: 'Push Button Switch', quantity: 1, icon: 'ToggleLeft' },
      { name: '9V Battery (แบตเตอรี่ 9V)', quantity: 1, icon: 'Battery' },
      { name: 'Jumper Wires (สายจัมเปอร์)', quantity: 6, icon: 'Cable' }
    ],
    steps: [
      {
        id: 1,
        instruction: 'Insert the BC547 NPN Transistor. Look at the flat side facing you: Left leg is Emitter (E), Middle is Base (B), Right is Collector (C). Plug them in Row 20, 21, 22.',
        instructionTh: 'เสียบทรานซิสเตอร์ BC547 โดยหันด้านแบนเข้าหาตัวคุณ ขาจะเรียงจากซ้ายไปขวา: Emitter (ขั้วลบ), Base (ฐานควบคุม), Collector (ขั้วรับ) เสียบลงแถว 20, 21, 22',
        checkPoint: 'Emitter in Row 20, Base in Row 21, Collector in Row 22',
        checkPointTh: 'Emitter อยู่แถว 20, Base อยู่แถว 21, Collector อยู่แถว 22'
      },
      {
        id: 2,
        instruction: 'Connect the Emitter (Row 20) directly to the negative ground rail (-) using a black jumper wire.',
        instructionTh: 'เชื่อมขา Emitter (แถว 20) ลงรางลบ (-) ของโฟโตบอร์ดโดยใช้สายจัมเปอร์สีดำ',
        checkPoint: 'Emitter (Row 20) wired to Blue (-) Rail',
        checkPointTh: 'Emitter (แถว 20) ต่อสายจัมเปอร์ลงรางลบ (-)'
      },
      {
        id: 3,
        instruction: 'Connect the Green LED Cathode (short leg) to the Collector (Row 22). Then connect a 220Ω Resistor from the LED Anode (long leg) to the positive rail (+).',
        instructionTh: 'ต่อขาลบ (สั้น) ของ LED สีเขียวเข้ากับ Collector (แถว 22) แล้วต่อตัวต้านทาน 220Ω จากขาบวก (ยาว) ของ LED ไปยังรางบวก (+)',
        checkPoint: 'LED Cathode in Row 22, Anode connected through 220Ω to Red (+) Rail',
        checkPointTh: 'ขาลบ LED อยู่แถว 22, ขาบวกต่อผ่านตัวต้านทาน 220Ω ไปยังรางบวก (+)'
      },
      {
        id: 4,
        instruction: 'Connect a 1kΩ Resistor from the Base (Row 21) to one side of the Tactile Button. Connect the other side of the button to the positive rail (+). Connect the battery and press the button.',
        instructionTh: 'ต่อตัวต้านทาน 1kΩ จากขา Base (แถว 21) ไปยังขาหนึ่งของปุ่มกด และต่ออีกขาหนึ่งของปุ่มกดตรงเข้ารางบวก (+) ต่อแบตเตอรี่แล้วทดสอบกดปุ่ม',
        checkPoint: '1kΩ Resistor bridges Row 21 to Button, Button linked to Red (+) Rail',
        checkPointTh: 'ตัวต้านทาน 1kΩ เชื่อมแถว 21 ไปยังปุ่มกด และปุ่มกดต่อไปที่รางบวก (+)'
      }
    ],
    expectedResult: 'When you press the tactile button, a very small current (approx 8.3mA) flows through the 1kΩ resistor into the Base. This triggers the transistor to "turn on", allowing a larger current (approx 30mA) to flow from Collector to Emitter, lighting up the Green LED brightly.',
    expectedResultTh: 'เมื่อคุณกดปุ่มกด กระแสไฟขนาดเล็กมาก (ประมาณ 8.3mA) จะไหลผ่านตัวต้านทาน 1kΩ เข้าสู่ขา Base ส่งผลให้กระตุ้นทรานซิสเตอร์นำกระแส ยอมให้กระแสปริมาณมากกว่า (ประมาณ 30mA) ไหลผ่านขา Collector ลงสู่ Emitter ทำให้ LED สีเขียวสว่างวาบขึ้นมา',
    troubleshootingTips: [
      {
        issue: 'The Green LED glows faintly or does not light up when pressing the button',
        issueTh: 'LED สีเขียวหรี่มากหรือกระพริบเบาๆ เมื่อกดปุ่ม',
        solution: 'Verify the pinout of the BC547. Swapping Emitter and Collector can cause low gain and unstable operations. Ensure the flat side of the transistor is facing you to confirm Pin 1 (Emitter) is on the left.',
        solutionTh: 'ตรวจสอบขาของ BC547 ให้ดี การสลับขา Emitter และ Collector จะทำให้กำลังขยายตกลงมาก ให้หันด้านแบนเข้าหาตัวแล้วยึดว่าขาซ้ายสุดคือ Emitter'
      },
      {
        issue: 'The LED lights up immediately before pressing the button',
        issueTh: 'LED สว่างทันทีโดยไม่ต้องกดปุ่ม',
        solution: 'Check if there is a short circuit between the Collector (Row 22) and Emitter (Row 20), or if the button switch is wired wrong, keeping the base constantly supplied with current.',
        solutionTh: 'ตรวจสอบว่ามีการลัดวงจรระหว่างขา Collector (แถว 22) กับ Emitter (แถว 20) หรือไม่ หรือปุ่มสวิตช์ค้างจ่ายกระแสเข้าขา Base ตลอดเวลา'
      }
    ],
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://circuit-verifier-help.io/troubleshoot/lesson-3',
    schematicImage: 'transistor_switch_schematic'
  }
];
