export interface Lesson {
  id: string;
  title: string;
  titleTh: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  description: string;
  descriptionTh: string;
  components: {
    name: string;
    quantity: number;
    icon: string; // lucide icon name or description
  }[];
  steps: {
    id: number;
    instruction: string;
    instructionTh: string;
    checkPoint: string;
    checkPointTh: string;
  }[];
  expectedResult: string;
  expectedResultTh: string;
  troubleshootingTips: {
    issue: string;
    issueTh: string;
    solution: string;
    solutionTh: string;
  }[];
  qrCodeUrl: string; // QR code image placeholder
  arModelUrl?: string; // prepare for future AR models
  schematicImage: string; // schematic diagram mockup
}

export interface CircuitStatus {
  isCorrect: boolean;
  message: string;
  messageTh: string;
  incorrectStepId?: number;
}
