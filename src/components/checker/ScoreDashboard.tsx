import { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckSquare, 
  Square, 
  RotateCcw, 
  ExternalLink, 
  TrendingUp, 
  Lock, 
  Eye, 
  MapPin, 
  Key, 
  Share2 
} from 'lucide-react';
import type { AssessmentResult, RecommendedAction } from '../../types';
import { getRiskBadgeInfo } from '../../lib/privacyScore';

interface ScoreDashboardProps {
  result: AssessmentResult;
  onRetake: () => void;
  onChecklistUpdate?: (updatedRecs: RecommendedAction[]) => void;
  onNavigateToGuides?: () => void;
  isLoggedIn?: boolean;
  onOpenAuth?: () => void;
}

export const ScoreDashboard: React.FC<ScoreDashboardProps> = ({
  result,
  onRetake,
  onChecklistUpdate,
  onNavigateToGuides,
  isLoggedIn,
  onOpenAuth
}) => {
  const [recommendations, setRecommendations] = useState<RecommendedAction[]>(
    result.recommendations
  );

  const riskBadge = getRiskBadgeInfo(result.riskLevel);

  const completedCount = recommendations.filter((r) => r.completed).length;
  const totalCount = recommendations.length;
  const checklistPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 100;

  const toggleChecklist = (id: string) => {
    const updated = recommendations.map((r) => 
      r.id === id ? { ...r, completed: !r.completed } : r
    );
    setRecommendations(updated);
    if (onChecklistUpdate) onChecklistUpdate(updated);
  };

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case 'profile': return <Eye size={16} color="#38bdf8" />;
      case 'password': return <Key size={16} color="#f59e0b" />;
      case 'account': return <Lock size={16} color="#10b981" />;
      case 'oversharing': return <Share2 size={16} color="#ec4899" />;
      case 'scam': return <AlertTriangle size={16} color="#f97316" />;
      case 'location': return <MapPin size={16} color="#a855f7" />;
      default: return <ShieldCheck size={16} color="#38bdf8" />;
    }
  };

  const categoryLabels: Record<string, string> = {
    profile: 'Profile Privacy',
    password: 'Password Security',
    account: 'Account Security',
    oversharing: 'Oversharing Habits',
    scam: 'Scam & Link Awareness',
    location: 'Location Privacy'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Logged Out / Anonymous Assessment Alert */}
      {!isLoggedIn && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          backgroundColor: 'rgba(56, 189, 248, 0.1)',
          border: '1px solid rgba(56, 189, 248, 0.3)'
        }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
              Temporary Anonymous Session
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              This Privacy Score is temporary. Log in to permanently link your assessment results and track your security habits over time.
            </p>
          </div>
          {onOpenAuth && (
            <button
              onClick={onOpenAuth}
              className="btn-primary"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
            >
              Login to Save Score
            </button>
          )}
        </div>
      )}

      {/* Top Banner: Score & Risk Gauge */}
      <div 
        id="privacy-risk-results"
        className="glass-panel"
        style={{
          padding: '2.5rem',
          position: 'relative',
          overflow: 'hidden',
          border: `1px solid ${riskBadge.border}`
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          
          {/* Score Circle & Classification */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-card)',
              border: `4px solid ${riskBadge.color}`,
              boxShadow: `0 0 30px ${riskBadge.bg}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                {result.totalScore}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>
                OUT OF 100
              </span>
            </div>

            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                backgroundColor: riskBadge.bg,
                border: `1px solid ${riskBadge.border}`,
                color: riskBadge.color,
                fontWeight: 700,
                fontSize: '0.85rem',
                marginBottom: '0.75rem'
              }}>
                <span>{riskBadge.icon}</span>
                <span>{riskBadge.label}</span>
              </div>
              <h2 className="heading-display" style={{ fontSize: '1.65rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Privacy Profile Analysis
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '440px', lineHeight: '1.5' }}>
                {riskBadge.desc}
              </p>
            </div>
          </div>

          {/* Quick Action Button & Retake */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{
              padding: '1rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              width: '100%'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                <span style={{ color: '#cbd5e1' }}>Checklist Completion:</span>
                <span style={{ fontWeight: 700, color: '#38bdf8' }}>{checklistPercent}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${checklistPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #06b6d4, #10b981)',
                  borderRadius: '4px',
                  transition: 'width 0.4s ease'
                }} />
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
                {completedCount} of {totalCount} recommended actions resolved
              </p>
            </div>

            <button
              onClick={onRetake}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', gap: '0.5rem' }}
            >
              <RotateCcw size={16} /> Retake Assessment
            </button>
          </div>

        </div>
      </div>

      {/* Category Breakdown Progress Grid */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 className="heading-display" style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TrendingUp size={20} color="var(--accent-cyan)" /> Category Privacy Scores
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}>
          {Object.entries(result.categoryScores).map(([catKey, score]) => {
            const isGood = score >= 80;
            const isMod = score >= 60 && score < 80;
            const catColor = isGood ? '#10b981' : isMod ? '#f59e0b' : '#ef4444';
            return (
              <div 
                key={catKey}
                style={{
                  padding: '1.25rem',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {getCategoryIcon(catKey)}
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {categoryLabels[catKey] || catKey}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: catColor }}>
                    {score}%
                  </span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${score}%`,
                    height: '100%',
                    backgroundColor: catColor,
                    borderRadius: '3px',
                    transition: 'width 0.5s ease'
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detected Risks Section */}
      <div id="privacy-solutions-section" className="glass-panel" style={{ padding: '2rem' }}>
        <h3 className="heading-display" style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={20} color="#f43f5e" /> Detected Privacy Risks ({result.risks.length})
        </h3>
        {result.risks.length === 0 ? (
          <div style={{
            padding: '1.5rem',
            borderRadius: '12px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34d399',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <ShieldCheck size={24} />
            <span>Outstanding! No immediate critical vulnerabilities detected based on your answers.</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {result.risks.map((risk) => {
              const isCrit = risk.severity === 'critical';
              return (
                <div 
                  key={risk.id}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    backgroundColor: isCrit ? 'rgba(239, 68, 68, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                    border: `1px solid ${isCrit ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h4 style={{ color: '#f8fafc', fontSize: '1rem', fontWeight: 600 }}>
                      {risk.title}
                    </h4>
                    <span className={isCrit ? 'badge badge-rose' : 'badge badge-amber'}>
                      {risk.severity} severity
                    </span>
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    {risk.description}
                  </p>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    <strong>Potential Impact:</strong> {risk.impact}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Interactive Improvement Checklist */}
      <div id="privacy-checklist-section" className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 className="heading-display" style={{ fontSize: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckSquare size={20} color="#10b981" /> Actionable Improvement Checklist
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Check off tasks as you configure your social profiles.
            </p>
          </div>
          {onNavigateToGuides && (
            <button
              onClick={onNavigateToGuides}
              className="btn-secondary"
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            >
              Open Social Media Guides <ExternalLink size={14} />
            </button>
          )}
        </div>

        {recommendations.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            All basic safety habits are already in place! Check our Social Media Guides for advanced hardening.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                onClick={() => toggleChecklist(rec.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  padding: '1rem',
                  borderRadius: '10px',
                  backgroundColor: rec.completed ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-card)',
                  border: rec.completed ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ marginTop: '2px', color: rec.completed ? '#10b981' : 'var(--text-muted)' }}>
                  {rec.completed ? <CheckSquare size={20} /> : <Square size={20} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: rec.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                      textDecoration: rec.completed ? 'line-through' : 'none'
                    }}>
                      {rec.title}
                    </span>
                    {rec.priority === 'critical' && (
                      <span className="badge badge-rose" style={{ fontSize: '0.65rem' }}>Urgent</span>
                    )}
                  </div>
                  <p style={{
                    fontSize: '0.825rem',
                    color: rec.completed ? 'var(--text-muted)' : 'var(--text-secondary)',
                    lineHeight: '1.4'
                  }}>
                    {rec.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
