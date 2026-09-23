import React, { useState } from 'react';
import { KeyRound, Share2, ShieldAlert } from 'lucide-react';
import { PasswordChecker } from './PasswordChecker';
import { OvershareSim } from './OvershareSim';
import { PhishingSim } from './PhishingSim';

interface ToolsHubProps {
  initialSubTab?: 'password' | 'overshare' | 'phishing';
}

export const ToolsHub: React.FC<ToolsHubProps> = ({ initialSubTab = 'password' }) => {
  const [subTab, setSubTab] = useState<'password' | 'overshare' | 'phishing'>(initialSubTab);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      {/* Tab Selector */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setSubTab('password')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            backgroundColor: subTab === 'password' ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-card)',
            border: subTab === 'password' ? '1.5px solid var(--accent-cyan)' : '1px solid var(--border-color)',
            color: subTab === 'password' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
            fontWeight: subTab === 'password' ? 700 : 500,
            fontSize: '0.95rem',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
        >
          <KeyRound size={18} color={subTab === 'password' ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
          <span>Password Strength Checker</span>
        </button>

        <button
          onClick={() => setSubTab('overshare')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            backgroundColor: subTab === 'overshare' ? 'rgba(236, 72, 153, 0.15)' : 'var(--bg-card)',
            border: subTab === 'overshare' ? '1.5px solid #ec4899' : '1px solid var(--border-color)',
            color: subTab === 'overshare' ? '#ec4899' : 'var(--text-secondary)',
            fontWeight: subTab === 'overshare' ? 700 : 500,
            fontSize: '0.95rem',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
        >
          <Share2 size={18} color={subTab === 'overshare' ? '#ec4899' : 'var(--text-muted)'} />
          <span>"Safe to Share?" Simulator</span>
        </button>

        <button
          onClick={() => setSubTab('phishing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            backgroundColor: subTab === 'phishing' ? 'rgba(249, 115, 22, 0.15)' : 'var(--bg-card)',
            border: subTab === 'phishing' ? '1.5px solid #f97316' : '1px solid var(--border-color)',
            color: subTab === 'phishing' ? '#f97316' : 'var(--text-secondary)',
            fontWeight: subTab === 'phishing' ? 700 : 500,
            fontSize: '0.95rem',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
        >
          <ShieldAlert size={18} color={subTab === 'phishing' ? '#f97316' : 'var(--text-muted)'} />
          <span>Phishing & Scam Detector</span>
        </button>
      </div>

      {/* Render Active Tool */}
      <div>
        {subTab === 'password' && <PasswordChecker />}
        {subTab === 'overshare' && <OvershareSim />}
        {subTab === 'phishing' && <PhishingSim />}
      </div>

    </div>
  );
};
