import React from 'react';
import { Shield, Lock, EyeOff, AlertOctagon, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-card)',
      borderTop: '1px solid var(--border-color)',
      padding: '3.5rem 0 2rem 0',
      marginTop: '5rem',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          
          {/* Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Shield size={18} color="#fff" />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Priv<span style={{ color: '#06b6d4' }}>Secure</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: '1.5' }}>
              Think Before You Share. Protect Your Digital Privacy. An interactive digital privacy awareness and risk assessment platform designed to turn awareness into practical habits.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-emerald" style={{ textTransform: 'none' }}>
                <Lock size={12} /> Privacy by Design
              </span>
              <span className="badge badge-cyan" style={{ textTransform: 'none' }}>
                <EyeOff size={12} /> Zero Password Storage
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Platform Features
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: 0 }}>
              <li>
                <button 
                  onClick={() => { setActiveTab('checker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textAlign: 'left', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#0284c7')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  → Privacy Risk Assessment (Score 0-100)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('tools'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textAlign: 'left', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#0284c7')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  → Client-Side Password Strength Analyzer
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('learn'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textAlign: 'left', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#0284c7')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  → "Safe to Share?" Oversharing Simulator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('guides'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textAlign: 'left', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#0284c7')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  → Instagram & Social Media Privacy Guides
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textAlign: 'left', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#0284c7')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  → Interactive Privacy Awareness Quiz
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Safety & Cyber Crime Helplines */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Safety & Emergency
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                padding: '0.75rem',
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#dc2626', fontWeight: 700, fontSize: '0.85rem' }}>
                  <AlertOctagon size={16} /> Cyber Fraud Helpline
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  Dial <strong>1930</strong> (National Cyber Crime Helpline - 24/7)
                </p>
                <a 
                  href="https://cybercrime.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ color: '#0284c7', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.35rem', fontWeight: 600 }}
                >
                  National Cyber Crime Portal <ExternalLink size={12} />
                </a>
              </div>

              <button 
                onClick={() => { setActiveTab('safety'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{
                  color: '#d97706',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                🚨 Emergency Playbook: What to do if hacked?
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Disclaimer */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} PrivSecure. Community Engagement Project (CEP).
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Built with <Heart size={14} color="#f43f5e" fill="#f43f5e" /> for Digital Safety Awareness
          </div>
        </div>
      </div>
    </footer>
  );
};
