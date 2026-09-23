import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2 
} from 'lucide-react';
import { assessmentQuestions } from '../../data/assessmentQuestions';
import { calculatePrivacyScore } from '../../lib/privacyScore';
import { ScoreDashboard } from './ScoreDashboard';
import type { AssessmentResult, RecommendedAction } from '../../types';

interface RiskCheckerProps {
  onAssessmentCompleted: (result: AssessmentResult) => void;
  savedResult: AssessmentResult | null;
  onNavigateToGuides?: () => void;
  currentUser?: any;
  onOpenAuth?: () => void;
}

export const RiskChecker: React.FC<RiskCheckerProps> = ({
  onAssessmentCompleted,
  savedResult,
  onNavigateToGuides,
  currentUser,
  onOpenAuth
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>(
    savedResult ? savedResult.answers : {}
  );
  const [viewingResult, setViewingResult] = useState<boolean>(Boolean(savedResult));
  const [activeResult, setActiveResult] = useState<AssessmentResult | null>(savedResult);

  // Synchronize state when savedResult changes (e.g. login/logout / user switch)
  useEffect(() => {
    if (savedResult) {
      setAnswers(savedResult.answers || {});
      setActiveResult(savedResult);
      setViewingResult(true);
    } else {
      // Clean slate for logged out users or users without an existing assessment
      setAnswers({});
      setActiveResult(null);
      setViewingResult(false);
      setCurrentIndex(0);
    }
  }, [savedResult]);

  const currentQuestion = assessmentQuestions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / assessmentQuestions.length) * 100);
  const isAnswered = answers[currentQuestion?.id] !== undefined;

  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < assessmentQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Final submission
      const result = calculatePrivacyScore(answers);
      setActiveResult(result);
      setViewingResult(true);
      onAssessmentCompleted(result);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIndex(0);
    setViewingResult(false);
  };

  const handleChecklistUpdate = (updatedRecs: RecommendedAction[]) => {
    if (activeResult) {
      const updated = {
        ...activeResult,
        recommendations: updatedRecs
      };
      setActiveResult(updated);
      onAssessmentCompleted(updated);
    }
  };

  if (viewingResult && activeResult) {
    return (
      <ScoreDashboard
        result={activeResult}
        onRetake={handleRetake}
        onChecklistUpdate={handleChecklistUpdate}
        onNavigateToGuides={onNavigateToGuides}
        isLoggedIn={Boolean(currentUser)}
        onOpenAuth={onOpenAuth}
      />
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Questionnaire Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          backgroundColor: 'rgba(6, 182, 212, 0.12)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          color: '#38bdf8',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '0.75rem'
        }}>
          <ShieldCheck size={16} /> Privacy Risk Assessment
        </div>
        <h1 className="heading-display" style={{ fontSize: '2.2rem', color: '#f8fafc', marginBottom: '0.5rem' }}>
          How Private Are You on Social Media?
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
          Answer 8 practical questions about your everyday social media habits to compute your dynamic 0–100 privacy score and discover tailored fixes.
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
          <span style={{ color: '#94a3b8' }}>
            Question <strong>{currentIndex + 1}</strong> of <strong>{assessmentQuestions.length}</strong>
          </span>
          <span style={{ color: '#38bdf8', fontWeight: 600 }}>{progressPercent}% Completed</span>
        </div>
        <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
            borderRadius: '4px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Question Card */}
      <div 
        className="glass-panel"
        style={{
          padding: '2.5rem',
          position: 'relative'
        }}
      >
        <div style={{ marginBottom: '1.75rem' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.6rem' }}>
            {currentQuestion.category} privacy
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
            {currentQuestion.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.5' }}>
            {currentQuestion.subtitle}
          </p>
        </div>

        {/* Options List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = answers[currentQuestion.id] === idx;
            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(idx)}
                style={{
                  padding: '1.1rem 1.25rem',
                  borderRadius: '12px',
                  backgroundColor: isSelected ? 'rgba(6, 182, 212, 0.14)' : 'var(--bg-card)',
                  border: isSelected ? '2px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 20px rgba(6, 182, 212, 0.2)' : 'none'
                }}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  border: isSelected ? '6px solid var(--accent-cyan)' : '2px solid var(--text-muted)',
                  backgroundColor: isSelected ? '#ffffff' : 'transparent',
                  marginTop: '2px',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.95rem',
                    fontWeight: isSelected ? 600 : 500,
                    color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)',
                    marginBottom: opt.description ? '0.25rem' : '0'
                  }}>
                    {opt.label}
                  </div>
                  {opt.description && (
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      {opt.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="btn-secondary"
            style={{
              opacity: currentIndex === 0 ? 0.4 : 1,
              pointerEvents: currentIndex === 0 ? 'none' : 'auto'
            }}
          >
            <ArrowLeft size={16} /> Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="btn-primary"
            style={{
              opacity: !isAnswered ? 0.4 : 1,
              pointerEvents: !isAnswered ? 'none' : 'auto'
            }}
          >
            {currentIndex === assessmentQuestions.length - 1 ? (
              <>Calculate Privacy Score <CheckCircle2 size={16} /></>
            ) : (
              <>Next Question <ArrowRight size={16} /></>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
