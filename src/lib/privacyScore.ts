import { assessmentQuestions } from '../data/assessmentQuestions';
import type { 
  AssessmentResult, 
  RiskLevel, 
  CategoryScore, 
  DetectedRisk, 
  RecommendedAction 
} from '../types';

export const calculatePrivacyScore = (answers: Record<string, number>): AssessmentResult => {
  const categoryTotals: Record<CategoryScore['key'], { totalRisk: number; count: number }> = {
    profile: { totalRisk: 0, count: 0 },
    password: { totalRisk: 0, count: 0 },
    account: { totalRisk: 0, count: 0 },
    oversharing: { totalRisk: 0, count: 0 },
    scam: { totalRisk: 0, count: 0 },
    location: { totalRisk: 0, count: 0 },
  };

  const detectedRisks: DetectedRisk[] = [];
  const recommendations: RecommendedAction[] = [];
  let totalWeightedRisk = 0;
  let totalQuestionsCount = 0;

  assessmentQuestions.forEach((q) => {
    const selectedOptionIndex = answers[q.id];
    if (selectedOptionIndex !== undefined && q.options[selectedOptionIndex]) {
      const opt = q.options[selectedOptionIndex];
      const risk = opt.riskWeight;

      categoryTotals[q.category].totalRisk += risk;
      categoryTotals[q.category].count += 1;

      totalWeightedRisk += risk;
      totalQuestionsCount += 1;

      if (opt.triggersRisk) {
        detectedRisks.push({
          id: `risk_${q.id}`,
          category: q.category,
          severity: opt.triggersRisk.severity,
          title: opt.triggersRisk.title,
          description: opt.triggersRisk.description,
          impact: opt.triggersRisk.impact,
        });
      }

      if (opt.recommendedAction) {
        recommendations.push({
          id: `rec_${q.id}`,
          category: q.category,
          priority: opt.recommendedAction.priority,
          title: opt.recommendedAction.title,
          description: opt.recommendedAction.description,
          completed: false,
          platform: opt.recommendedAction.platform,
        });
      }
    }
  });

  // Convert risk (0-100 where 100 is danger) into a privacy safety score (0-100 where 100 is maximum safety)
  const averageRisk = totalQuestionsCount > 0 ? totalWeightedRisk / totalQuestionsCount : 50;
  const rawScore = Math.max(0, Math.min(100, Math.round(100 - averageRisk)));

  let riskLevel: RiskLevel = 'good';
  if (rawScore < 40) {
    riskLevel = 'critical';
  } else if (rawScore < 60) {
    riskLevel = 'high';
  } else if (rawScore < 80) {
    riskLevel = 'moderate';
  } else {
    riskLevel = 'good';
  }

  // Calculate per-category safety percentages (0-100%)
  const categoryScores: Record<CategoryScore['key'], number> = {
    profile: 80,
    password: 75,
    account: 75,
    oversharing: 80,
    scam: 80,
    location: 80,
  };

  (Object.keys(categoryTotals) as CategoryScore['key'][]).forEach((cat) => {
    const data = categoryTotals[cat];
    if (data.count > 0) {
      const catAvgRisk = data.totalRisk / data.count;
      categoryScores[cat] = Math.max(5, Math.min(100, Math.round(100 - catAvgRisk)));
    }
  });

  return {
    id: `assess_${Date.now()}`,
    totalScore: rawScore,
    riskLevel,
    categoryScores,
    risks: detectedRisks,
    recommendations,
    answers,
    timestamp: Date.now(),
  };
};

export const getRiskBadgeInfo = (level: RiskLevel) => {
  switch (level) {
    case 'good':
      return {
        label: 'Good Privacy',
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.15)',
        border: 'rgba(16, 185, 129, 0.4)',
        icon: '🟢',
        desc: 'Your profile exhibits solid privacy habits. Keep up your active vigilance.'
      };
    case 'moderate':
      return {
        label: 'Moderate Risk',
        color: '#f59e0b',
        bg: 'rgba(245, 158, 11, 0.15)',
        border: 'rgba(245, 158, 11, 0.4)',
        icon: '🟡',
        desc: 'A few significant vulnerabilities exist that could expose your accounts or data.'
      };
    case 'high':
      return {
        label: 'High Risk',
        color: '#f97316',
        bg: 'rgba(249, 115, 22, 0.15)',
        border: 'rgba(249, 115, 22, 0.4)',
        icon: '🟠',
        desc: 'Multiple critical vectors found: easily exploitable by social engineers and scrapers.'
      };
    case 'critical':
      return {
        label: 'Critical Risk',
        color: '#ef4444',
        bg: 'rgba(239, 68, 68, 0.15)',
        border: 'rgba(239, 68, 68, 0.4)',
        icon: '🔴',
        desc: 'Urgent danger of account compromise, SIM swapping, and real-time physical tracking.'
      };
  }
};
