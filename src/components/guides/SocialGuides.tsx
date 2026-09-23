import React, { useState } from 'react';
import { socialGuidesData } from '../../data/socialGuidesData';
import { Lock } from 'lucide-react';

export const SocialGuides: React.FC = () => {
  const [activePlatformId, setActivePlatformId] = useState<string>(socialGuidesData[0].id);

  const currentGuide = socialGuidesData.find((g) => g.id === activePlatformId) || socialGuidesData[0];

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 className="heading-display" style={{ fontSize: '2.4rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          Social Media Privacy Hardening
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
          Exact step-by-step instructions to lock down default tracking, restrict discoverability, and disable background data telemetry.
        </p>
      </div>

      {/* Platform Switcher Pills */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        marginBottom: '2rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {socialGuidesData.map((guide) => {
          const isActive = guide.id === activePlatformId;
          return (
            <button
              key={guide.id}
              onClick={() => setActivePlatformId(guide.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.7rem 1.25rem',
                borderRadius: '12px',
                backgroundColor: isActive ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-card)',
                border: isActive ? '1.5px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.95rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: guide.color
              }} />
              <span>{guide.name}</span>
            </button>
          );
        })}
      </div>

      {/* Guide Card Content */}
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        
        {/* Platform Overview Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '1.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <h2 className="heading-display" style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>
                {currentGuide.name}
              </h2>
              <span className="badge badge-cyan">
                {currentGuide.badge}
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', maxWidth: '640px' }}>
              {currentGuide.overview}
            </p>
          </div>
        </div>

        {/* Settings List: Risk -> Recommendation -> How To */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {currentGuide.settings.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '14px',
                padding: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Lock size={16} color="var(--accent-cyan)" /> {item.feature}
                </h3>
                <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                  Target: {item.recommended}
                </span>
              </div>

              {/* Risk Description */}
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderLeft: '3px solid #ef4444',
                marginBottom: '1rem',
                fontSize: '0.85rem',
                color: '#ef4444'
              }}>
                <strong style={{ color: '#dc2626' }}>Privacy Risk:</strong> {item.risk}
              </div>

              {/* How to configure steps */}
              <div>
                <h4 style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Step-by-Step Instructions:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {item.howTo.map((step, sIdx) => (
                    <div key={sIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                      <span style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(6, 182, 212, 0.14)',
                        border: '1px solid rgba(6, 182, 212, 0.4)',
                        color: 'var(--accent-cyan)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        {sIdx + 1}
                      </span>
                      <span style={{ lineHeight: '1.45' }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
