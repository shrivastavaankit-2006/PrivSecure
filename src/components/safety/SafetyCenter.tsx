import { useState } from 'react';
import { 
  LifeBuoy, 
  ShieldAlert, 
  UserX, 
  AlertTriangle, 
  ExternalLink, 
  PhoneCall, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { emergencyPlaybooks } from '../../data/educationalContent';

export const SafetyCenter: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>(emergencyPlaybooks[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? '' : id);
  };

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#f87171',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '0.75rem'
        }}>
          <LifeBuoy size={16} /> Incident Response Center
        </div>
        <h1 className="heading-display" style={{ fontSize: '2.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Emergency Safety Playbooks
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '620px', margin: '0 auto' }}>
          Actionable protocols for when accounts are hijacked, fake profiles appear, or suspicious links are clicked. Follow these exact steps to limit damage.
        </p>
      </div>

      {/* Quick Helpline Hotline Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          padding: '1.25rem',
          borderRadius: '12px',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.35rem' }}>
            <PhoneCall size={18} /> Cyber Crime Helpline
          </div>
          <a 
            href="tel:1930"
            style={{ 
              display: 'inline-block',
              fontSize: '1.5rem', 
              fontWeight: 800, 
              color: 'var(--text-primary)', 
              marginBottom: '0.25rem',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease'
            }}
            title="Call 1930 Cyber Crime Helpline"
          >
            1930
          </a>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Toll-free 24/7 helpline for reporting cyber fraud, financial scams, and harassment.
          </p>
        </div>

        <div style={{
          padding: '1.25rem',
          borderRadius: '12px',
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          border: '1px solid rgba(6, 182, 212, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0284c7', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.35rem' }}>
            <ExternalLink size={18} /> Official Reporting Portal
          </div>
          <a 
            href="https://cybercrime.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '1.1rem', 
              fontWeight: 700, 
              color: '#0284c7', 
              marginBottom: '0.25rem',
              textDecoration: 'underline',
              textUnderlineOffset: '3px'
            }}
            title="Visit National Cyber Crime Reporting Portal (cybercrime.gov.in)"
          >
            cybercrime.gov.in <ExternalLink size={14} />
          </a>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            File formal complaints for online identity theft, non-consensual image sharing, and hacking.
          </p>
        </div>
      </div>

      {/* Accordion Playbooks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {emergencyPlaybooks.map((pb) => {
          const isExpanded = expandedId === pb.id;
          const isCrit = pb.severity === 'critical';
          return (
            <div 
              key={pb.id}
              className="glass-panel"
              style={{
                border: isExpanded ? `1px solid ${isCrit ? '#ef4444' : '#f59e0b'}` : '1px solid var(--border-color)',
                overflow: 'hidden'
              }}
            >
              {/* Header Toggle */}
              <div
                onClick={() => toggleExpand(pb.id)}
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  backgroundColor: isExpanded ? 'rgba(0, 0, 0, 0.02)' : 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: isCrit ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    border: `1px solid ${isCrit ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {pb.id === 'account_hacked' ? <ShieldAlert size={20} color="#f87171" /> :
                     pb.id === 'someone_impersonating' ? <UserX size={20} color="#fbbf24" /> :
                     <AlertTriangle size={20} color="#f87171" />}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {pb.title}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {pb.steps.length} Critical Action Steps
                    </span>
                  </div>
                </div>

                <div style={{ color: 'var(--text-secondary)' }}>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {/* Steps Body */}
              {isExpanded && (
                <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    {pb.steps.map((step, sIdx) => (
                      <div 
                        key={sIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                          padding: '1rem',
                          borderRadius: '10px',
                          backgroundColor: 'var(--bg-card-subtle)',
                          border: '1px solid var(--border-color)'
                        }}
                      >
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: '#06b6d4',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px'
                        }}>
                          {sIdx + 1}
                        </div>
                        <div>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                            {step.action}
                          </h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
