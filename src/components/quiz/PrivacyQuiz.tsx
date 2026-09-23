import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  HelpCircle,
  RefreshCw,
  BookOpen,
  Loader2
} from 'lucide-react';
import { quizQuestions, getTenUniqueFallbackQuestions } from '../../data/quizQuestions';
import type { QuizQuestion } from '../../types';

interface PrivacyQuizProps {
  onQuizCompleted?: (score: number, total: number) => void;
}

export const PrivacyQuiz: React.FC<PrivacyQuizProps> = ({ onQuizCompleted }) => {
  // Guaranteed exactly 10 questions from the start
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => getTenUniqueFallbackQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const totalQuestions = 10;
  const currentQ = questions[currentIndex] || questions[0] || quizQuestions[0];

  // Start a fresh quiz session with NEW questions generated from Gemini
  const handleStartFreshSession = async () => {
    setIsGenerating(true);
    const currentIds = questions.map((q) => q.id);
    try {
      const res = await fetch('/api/quiz-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          count: 10,
          excludeIds: currentIds,
          sessionSeed: Date.now().toString(36)
        })
      });

      if (res.ok) {
        const data = (await res.json()) as { questions?: QuizQuestion[]; source?: string };
        if (Array.isArray(data.questions) && data.questions.length === 10) {
          setQuestions(data.questions);
          resetQuizState();
          setIsGenerating(false);
          return;
        }
      }
      
      // Fallback: 10 fresh unique questions excluding recent
      setQuestions(getTenUniqueFallbackQuestions(currentIds));
      resetQuizState();
    } catch {
      // Local fallback: 10 fresh questions
      setQuestions(getTenUniqueFallbackQuestions(currentIds));
      resetQuizState();
    } finally {
      setIsGenerating(false);
    }
  };

  // Automatically trigger fresh Gemini question generation when Privacy Quiz is opened
  useEffect(() => {
    handleStartFreshSession();
  }, []);

  const resetQuizState = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setUserAnswers({});
    setScore(0);
    setQuizFinished(false);
  };

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: idx }));

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setQuizFinished(true);
      if (onQuizCompleted) {
        onQuizCompleted(score, totalQuestions);
      }
    }
  };

  if (quizFinished) {
    const percentage = Math.round((score / totalQuestions) * 100);
    let title = 'Developing Awareness';
    let color = '#f59e0b';
    let feedback = 'You have a solid starting foundation, but several critical privacy risks need tightening.';

    if (score >= 9) {
      title = 'Privacy Guardian';
      color = '#10b981';
      feedback = 'Outstanding awareness! You possess elite instincts against social engineering, credential phishing, and data leakage.';
    } else if (score >= 7) {
      title = 'Strong Privacy Awareness';
      color = '#06b6d4';
      feedback = 'Great job! You recognize most common deceptive patterns, though a few subtle tricks can still catch you.';
    } else if (score < 5) {
      title = 'High Risk Exposure';
      color = '#ef4444';
      feedback = 'Your answers reveal several vulnerabilities that scammers routinely exploit. Review our Social Guides and Safety Center!';
    }

    // Determine missed categories
    const missedCategories = new Set<string>();
    questions.forEach((q, idx) => {
      if (userAnswers[idx] !== q.correctIndex) {
        missedCategories.add(q.category);
      }
    });

    return (
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(15, 23, 42, 0.9) 40%, ${color}22 100%)`,
            border: `3px solid ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <Award size={40} color={color} />
          </div>

          <h2 className="heading-display" style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            Your Privacy IQ Score
          </h2>

          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: color, marginBottom: '0.25rem' }}>
            Score: {score} / {totalQuestions}
          </div>

          <div style={{
            display: 'inline-block',
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            backgroundColor: `${color}18`,
            border: `1px solid ${color}55`,
            color: color,
            fontWeight: 700,
            fontSize: '0.9rem',
            marginBottom: '1.25rem'
          }}>
            {title} ({percentage}%)
          </div>

          {/* Quick Metrics */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10b981',
              fontSize: '0.875rem',
              fontWeight: 600
            }}>
              <CheckCircle2 size={16} /> Correct: {score}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
              fontSize: '0.875rem',
              fontWeight: 600
            }}>
              <XCircle size={16} /> Incorrect: {totalQuestions - score}
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto 1.5rem auto', lineHeight: '1.5' }}>
            {feedback}
          </p>

          {/* Recommended Topics */}
          {missedCategories.size > 0 && (
            <div style={{
              textAlign: 'left',
              padding: '1.25rem',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              marginBottom: '2rem'
            }}>
              <h4 style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <BookOpen size={16} /> Recommended Topics to Strengthen:
              </h4>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {Array.from(missedCategories).map((cat) => (
                  <span 
                    key={cat}
                    style={{
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(6, 182, 212, 0.12)',
                      border: '1px solid rgba(6, 182, 212, 0.25)',
                      color: 'var(--accent-cyan)',
                      fontSize: '0.8rem',
                      fontWeight: 500
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleStartFreshSession}
              disabled={isGenerating}
              className="btn-primary"
              style={{ gap: '0.5rem' }}
            >
              {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              {isGenerating ? 'Generating Fresh Quiz...' : 'Start New Quiz (Fresh 10 Questions)'}
            </button>
            <button
              onClick={resetQuizState}
              className="btn-secondary"
              style={{ gap: '0.5rem' }}
            >
              <RotateCcw size={16} /> Retake Current Quiz
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto' }}>
      
      {/* Quiz Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          backgroundColor: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          color: '#6366f1',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '0.75rem'
        }}>
          <Award size={16} /> Dynamic Privacy IQ Quiz
        </div>

        <h1 className="heading-display" style={{ fontSize: '2.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Test Your Digital Privacy IQ
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          10 real-world cybersecurity & social media scenarios generated fresh for every quiz.
        </p>

        {/* Generate Fresh Quiz trigger */}
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
          <button
            onClick={handleStartFreshSession}
            disabled={isGenerating}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 1.1rem',
              borderRadius: '9999px',
              backgroundColor: isGenerating ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.12)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              color: 'var(--accent-indigo)',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: isGenerating ? 'wait' : 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
            {isGenerating ? 'Generating Fresh 10 Questions...' : 'Restart Quiz (Generate Fresh 10 Questions)'}
          </button>
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <span>Question <strong>{currentIndex + 1}</strong> of <strong>{totalQuestions}</strong></span>
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Score: {score} / 10</span>
        </div>
        <div style={{ width: '100%', height: '7px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
            height: '100%',
            backgroundColor: 'var(--accent-cyan)',
            borderRadius: '4px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.65rem' }}>
            {currentQ.category}
          </span>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: '1.45' }}>
            {currentQ.question}
          </h2>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let bgColor = 'var(--bg-card)';
            let borderColor = 'var(--border-color)';
            let textColor = 'var(--text-primary)';

            if (hasAnswered) {
              if (isCorrect) {
                bgColor = 'rgba(16, 185, 129, 0.14)';
                borderColor = '#10b981';
                textColor = '#059669';
              } else if (isSelected) {
                bgColor = 'rgba(239, 68, 68, 0.14)';
                borderColor = '#ef4444';
                textColor = '#dc2626';
              }
            } else if (isSelected) {
              bgColor = 'rgba(6, 182, 212, 0.14)';
              borderColor = 'var(--accent-cyan)';
              textColor = 'var(--accent-cyan)';
            }

            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`quiz-option-card ${hasAnswered ? 'answered' : ''}`}
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  backgroundColor: bgColor,
                  border: `1.5px solid ${borderColor}`,
                  cursor: hasAnswered ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '0.95rem', fontWeight: 500, color: textColor, lineHeight: '1.4' }}>
                  {opt}
                </span>
                {hasAnswered && (
                  <div style={{ flexShrink: 0, marginLeft: '0.75rem' }}>
                    {isCorrect ? (
                      <CheckCircle2 size={20} color="#10b981" />
                    ) : isSelected ? (
                      <XCircle size={20} color="#ef4444" />
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Explanation & Next Button */}
        {hasAnswered && (
          <div>
            <div style={{
              padding: '1.25rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <HelpCircle size={16} /> Explanation:
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.45' }}>
                {currentQ.explanation}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {currentIndex === totalQuestions - 1 ? 'View Final Score' : 'Next Question'} <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
