export type RiskLevel = 'good' | 'moderate' | 'high' | 'critical';

export interface CategoryScore {
  name: string;
  key: 'profile' | 'password' | 'account' | 'oversharing' | 'scam' | 'location';
  score: number; // 0 - 100
  weight: number;
}

export interface DetectedRisk {
  id: string;
  category: CategoryScore['key'];
  severity: 'high' | 'moderate' | 'critical';
  title: string;
  description: string;
  impact: string;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  category: CategoryScore['key'];
  priority: 'high' | 'medium' | 'critical';
  completed: boolean;
  platform?: string;
}

export interface AssessmentQuestion {
  id: string;
  category: CategoryScore['key'];
  title: string;
  subtitle: string;
  options: {
    label: string;
    description?: string;
    riskWeight: number; // 0 (best) to 100 (highest risk)
    triggersRisk?: {
      title: string;
      description: string;
      severity: 'high' | 'moderate' | 'critical';
      impact: string;
    };
    recommendedAction?: {
      title: string;
      description: string;
      priority: 'high' | 'medium' | 'critical';
      platform?: string;
    };
  }[];
}

export interface AssessmentResult {
  id: string;
  totalScore: number; // 0 - 100 (higher is safer)
  riskLevel: RiskLevel;
  categoryScores: Record<CategoryScore['key'], number>;
  risks: DetectedRisk[];
  recommendations: RecommendedAction[];
  answers: Record<string, number>;
  timestamp: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface SocialSettingItem {
  feature: string;
  risk: string;
  recommended: string;
  howTo: string[];
}

export interface SocialGuide {
  id: string;
  name: string;
  badge: string;
  color: string;
  overview: string;
  settings: SocialSettingItem[];
}

export interface OvershareScenario {
  id: string;
  title: string;
  postContent: string;
  imageHint?: string;
  riskLevel: 'safe' | 'caution' | 'critical';
  verdict: string;
  reasons: string[];
  whatCouldHappen: string;
}

export interface PhishingScenario {
  id: string;
  sender: string;
  platform: 'Instagram DM' | 'WhatsApp' | 'SMS' | 'Email' | 'Discord';
  avatarColor: string;
  messageText: string;
  isPhishing: boolean;
  redFlags: string[];
  explanation: string;
  recommendedAction: string;
}

export interface PasswordAnalysis {
  length: number;
  entropy: number;
  score: number; // 0 to 100
  level: 'Very Weak' | 'Weak' | 'Fair' | 'Strong' | 'Very Strong';
  color: string;
  crackTime: string;
  hasLower: boolean;
  hasUpper: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  hasRepetition: boolean;
  isCommon: boolean;
  feedback: string[];
}

export interface UserHistoryItem {
  id: string;
  date: string;
  score: number;
  riskLevel: RiskLevel;
}

export interface SimulatorScenario {
  id: string;
  platform: string;
  scenarioType: string;
  senderName: string;
  senderHandle: string;
  message: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  warningSigns: string[];
  recommendedAction: string;
}
