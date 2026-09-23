import { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  ChevronRight
} from 'lucide-react';
import { phishingScenarios } from '../../data/educationalContent';

export const PhishingSim: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState(phishingScenarios[0].id);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | null>>({});

  const scenario = phishingScenarios.find((s) => s.id === activeScenarioId) || phishingScenarios[0];
  const userAction = selectedAnswers[scenario.id];

  const handleAction = (action: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [scenario.id]: action
    }));
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          backgroundColor: 'rgba(249, 115, 22, 0.12)',
          border: '1px solid rgba(249, 115, 22, 0.3)',
          color: '#fb923c',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '0.75rem'
        }}>
          <ShieldAlert size={16} /> Interactive Scam Lab
        </div>
        <h1 className="heading-display" style={{ fontSize: '2.2rem', color: '#f8fafc', marginBottom: '0.5rem' }}>
          Phishing & Social Engineering Simulator
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
          Can you spot the red flags in deceptive direct messages and texts? Practice identifying social engineering before real attackers strike.
        </p>
      </div>

      {/* Scenario Selector Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        {phishingScenarios.map((s, index) => {
          const isActive = s.id === activeScenarioId;
          return (
            <button
              key={s.id}
              onClick={() => setActiveScenarioId(s.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1rem',
                borderRadius: '10px',
                backgroundColor: isActive ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-card)',
                border: isActive ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.85rem',
                whiteSpace: 'nowrap'
              }}
            >
              <MessageSquare size={14} />
              <span>{s.platform}: Test {index + 1}</span>
            </button>
          );
        })}
      </div>

      {/* Simulation Card */}
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        
        {/* Chat / DM Mockup Header */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '14px',
          overflow: 'hidden',
          marginBottom: '2rem'
        }}>
          {/* Header Bar */}
          <div style={{
            padding: '0.85rem 1.25rem',
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: scenario.avatarColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}>
                !
              </div>
              <div>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                  {scenario.sender}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  Channel: {scenario.platform}
                </div>
              </div>
            </div>
            <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
              Simulated Message
            </span>
          </div>

          {/* Message Content Bubble */}
          <div style={{ padding: '1.5rem' }}>
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.25rem',
              maxWidth: '90%',
              lineHeight: '1.5',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              whiteSpace: 'pre-wrap'
            }}>
              {scenario.messageText}
            </div>
          </div>
        </div>

        {/* User Choice Interactive Section */}
        {!userAction ? (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1rem', textAlign: 'center' }}>
              What would you do upon receiving this message?
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              <button
                onClick={() => handleAction('click')}
                className="btn-secondary"
                style={{ justifyContent: 'center', borderColor: 'rgba(239, 68, 68, 0.35)', color: '#ef4444' }}
              >
                Click link / Open file
              </button>
              <button
                onClick={() => handleAction('share')}
                className="btn-secondary"
                style={{ justifyContent: 'center', borderColor: 'rgba(245, 158, 11, 0.35)', color: '#d97706' }}
              >
                Reply or forward code
              </button>
              <button
                onClick={() => handleAction('report')}
                className="btn-primary"
                style={{ justifyContent: 'center', background: 'linear-gradient(135deg, #10b981, #059669)' }}
              >
                Report, Block & Ignore
              </button>
            </div>
          </div>
        ) : (
          /* Red Flags & Verdict */
          <div>
            <div style={{
              padding: '1.25rem',
              borderRadius: '12px',
              backgroundColor: userAction === 'report' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
              border: `1px solid ${userAction === 'report' ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)'}`,
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {userAction === 'report' ? (
                  <CheckCircle2 size={20} color="#10b981" />
                ) : (
                  <XCircle size={20} color="#ef4444" />
                )}
                <h4 style={{ color: userAction === 'report' ? '#10b981' : '#ef4444', fontSize: '1.05rem', fontWeight: 700 }}>
                  {userAction === 'report' ? 'Correct Choice! You neutralized the threat.' : 'Danger! You would have fallen for the trap.'}
                </h4>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {scenario.explanation}
              </p>
            </div>

            {/* Red Flags Dissected */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertTriangle size={16} color="#f59e0b" /> Red Flags in this Message:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {scenario.redFlags.map((flag, idx) => (
                  <div key={idx} style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderLeft: '3px solid #f59e0b',
                    fontSize: '0.85rem',
                    color: 'var(--text-primary)'
                  }}>
                    {flag}
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-color)'
            }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <strong>Recommended Action:</strong> {scenario.recommendedAction}
              </div>
              <button
                onClick={() => {
                  const nextIdx = (phishingScenarios.findIndex((s) => s.id === scenario.id) + 1) % phishingScenarios.length;
                  setActiveScenarioId(phishingScenarios[nextIdx].id);
                }}
                className="btn-primary"
                style={{ padding: '0.6rem 1.25rem' }}
              >
                Next Test <ChevronRight size={16} />
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
