import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  AlertTriangle, 
  Share2, 
  ArrowRight
} from 'lucide-react';

interface LearnSectionProps {
  onTakeAssessment: () => void;
  onOpenOvershareSim: () => void;
  onOpenPasswordChecker: () => void;
}

export const LearnSection: React.FC<LearnSectionProps> = ({
  onTakeAssessment,
  onOpenOvershareSim,
  onOpenPasswordChecker
}) => {
  const [activeTopic, setActiveTopic] = useState<'privacy' | 'data' | 'risks' | '2fa'>('privacy');

  const topics = [
    { id: 'privacy', label: 'What is Privacy?', icon: ShieldCheck },
    { id: 'data', label: 'Personal Data', icon: Lock },
    { id: 'risks', label: 'Exploitation Risks', icon: AlertTriangle },
    { id: '2fa', label: '2FA & Passwords', icon: Key },
  ];

  const personalDataCategories = [
    {
      name: 'Direct Identifiers',
      items: 'Full Name, Phone Number, Date of Birth, Email, Home Address',
      risk: 'Identity theft, SIM swap fraud, password reset attacks, spear phishing targeting family members.'
    },
    {
      name: 'Location & Temporal Data',
      items: 'Real-time GPS Check-ins, Boarding Passes, Daily Commute Routines, School/Workplace Tags',
      risk: 'Real-life physical stalking, targeted residential burglary when away, predictive route mapping.'
    },
    {
      name: 'Behavioral & Network Data',
      items: 'Friends list, Tagged Photos, Family Relationship tags, Pet Names, Mother’s Maiden Name',
      risk: 'Social engineering pretexting, cracking security questions, synthetic identity cloning on WhatsApp.'
    }
  ];

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 className="heading-display" style={{ fontSize: '2.4rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          Digital Privacy Masterclass
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
          Learn how personal data is harvested, why your digital footprint never truly vanishes, and how to defend your identity.
        </p>
      </div>

      {/* Topic Switcher Pills */}
      <div style={{
        display: 'flex',
        gap: '0.65rem',
        marginBottom: '2rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {topics.map((t) => {
          const Icon = t.icon;
          const isActive = activeTopic === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTopic(t.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                borderRadius: '12px',
                backgroundColor: isActive ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-card)',
                border: isActive ? '1.5px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <Icon size={16} color={isActive ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: What is Digital Privacy? */}
      {activeTopic === 'privacy' && (
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <h2 className="heading-display" style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Understanding Online Privacy in Modern Social Networks
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Digital privacy isn't about having "something to hide." It is about your fundamental right to control who has access to your life, your conversations, your physical whereabouts, and your relationships.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              padding: '1.25rem',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{ color: 'var(--accent-cyan)', fontSize: '1rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                The Digital Footprint
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Every like, comment, tag, and check-in builds a permanent algorithmic shadow profile used to predict your vulnerabilities and target your emotions.
              </p>
            </div>

            <div style={{
              padding: '1.25rem',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{ color: '#10b981', fontSize: '1rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Data Brokers & Scrapers
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Automated bots continuously harvest publicly exposed phone numbers, followers, and photos to resell on black-market marketing databases.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={onTakeAssessment} className="btn-primary">
              Take Privacy Risk Assessment <ArrowRight size={16} />
            </button>
            <button onClick={onOpenOvershareSim} className="btn-secondary">
              Test "Safe to Share?" Simulator
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Personal Data Categories */}
      {activeTopic === 'data' && (
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <h2 className="heading-display" style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Why Personal Data Matters & What Attackers Do With It
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Items that seem harmless in an Instagram story are often the exact puzzle pieces needed to impersonate you.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {personalDataCategories.map((cat, idx) => (
              <div 
                key={idx}
                style={{
                  padding: '1.25rem',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}>
                    {cat.name}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#e11d48', backgroundColor: 'rgba(225, 29, 72, 0.12)', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 600 }}>
                    High Value Asset
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '0.4rem', fontFamily: 'monospace' }}>
                  Examples: {cat.items}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Exploitation Risk:</strong> {cat.risk}
                </p>
              </div>
            ))}
          </div>

          <button onClick={onOpenOvershareSim} className="btn-primary">
            Try Oversharing Simulator <Share2 size={16} />
          </button>
        </div>
      )}

      {/* Tab 3: Social Media Risks */}
      {activeTopic === 'risks' && (
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <h2 className="heading-display" style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Top 6 Social Media Exploitation Vectors
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {[
              { title: '🔓 Public Profile Scraping', desc: 'Bots compile high-resolution photos for romance scams and AI-generated deepfakes.' },
              { title: '📍 Live Geolocation Stalking', desc: 'Real-time stories alert burglars when your residence is unattended and allow physical stalkers to track you.' },
              { title: '🎣 Spear Phishing & Impersonation', desc: 'Cloning your bio and photos to send emergency money requests to your friends and relatives.' },
              { title: '🔑 Credential Stuffing', desc: 'Reusing simple passwords causes all your linked accounts to be compromised simultaneously.' },
              { title: '📱 Excessive App Telemetry', desc: 'Background microphone and contacts permissions continuously exfiltrating data to ad exchanges.' },
              { title: '🤖 Bot Follower Infiltration', desc: 'Accepting unknown accounts gives bad actors full viewing privileges to your private stories.' }
            ].map((r, i) => (
              <div key={i} style={{
                padding: '1.25rem',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)'
              }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {r.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.4' }}>
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: 2FA & Password Security */}
      {activeTopic === '2fa' && (
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <h2 className="heading-display" style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Two-Factor Authentication (2FA) & Modern Password Hygiene
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            A strong password is only half the battle. If a service suffers a database leak, your password is out in the wild. Two-Factor Authentication ensures that an attacker cannot log in without a physical token.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              padding: '1.25rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)'
            }}>
              <h3 style={{ color: '#ef4444', fontSize: '1rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                SMS OTP (Low Security)
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Vulnerable to SIM swapping, SS7 cellular interception, and malware-infected APKs that read incoming SMS text messages.
              </p>
            </div>

            <div style={{
              padding: '1.25rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)'
            }}>
              <h3 style={{ color: '#10b981', fontSize: '1rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Authenticator App (High Security)
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Google Authenticator / Microsoft Authenticator generate time-based codes locally on your smartphone. Completely immune to SIM-swapping!
              </p>
            </div>
          </div>

          <button onClick={onOpenPasswordChecker} className="btn-primary">
            Test Your Password Strength <Key size={16} />
          </button>
        </div>
      )}

    </div>
  );
};
