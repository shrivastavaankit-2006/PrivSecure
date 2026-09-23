import { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Cpu, 
  ShieldAlert 
} from 'lucide-react';
import { analyzePassword } from '../../lib/passwordAnalysis';

export const PasswordChecker: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const analysis = analyzePassword(password);

  const criteria = [
    { label: 'At least 12 characters long', passed: analysis.length >= 12 },
    { label: 'Contains uppercase letters (A-Z)', passed: analysis.hasUpper },
    { label: 'Contains lowercase letters (a-z)', passed: analysis.hasLower },
    { label: 'Contains numbers (0-9)', passed: analysis.hasNumber },
    { label: 'Contains special symbols (!@#$%^&*)', passed: analysis.hasSpecial },
    { label: 'No repeated sequences (e.g. "aaa")', passed: !analysis.hasRepetition },
    { label: 'Not in known leak dictionaries', passed: !analysis.isCommon },
  ];

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: '#34d399',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '0.75rem'
        }}>
          <ShieldCheck size={16} /> 100% Client-Side Privacy Tool
        </div>
        <h1 className="heading-display" style={{ fontSize: '2.2rem', color: '#f8fafc', marginBottom: '0.5rem' }}>
          Password Strength & Entropy Analyzer
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '580px', margin: '0 auto' }}>
          Evaluate password entropy, character diversity, and estimated cracking time. 
          <strong style={{ color: '#38bdf8' }}> Zero network requests:</strong> your input never leaves your browser.
        </p>
      </div>

      {/* Main Analyzer Card */}
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        
        {/* Input Field */}
        <div style={{ marginBottom: '1.75rem' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>
            Enter Password to Test:
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type or paste a test password..."
              autoComplete="off"
              spellCheck="false"
              style={{
                width: '100%',
                padding: '0.9rem 3rem 0.9rem 1rem',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                color: 'var(--text-primary)',
                fontSize: '1.05rem',
                fontFamily: 'monospace',
                outline: 'none'
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '0.85rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                padding: '0.25rem'
              }}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Strength Progress Meter */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Strength Level:
            </span>
            <span style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: analysis.color
            }}>
              {analysis.level} ({analysis.score}/100)
            </span>
          </div>

          <div style={{ width: '100%', height: '10px', backgroundColor: 'var(--border-color)', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{
              width: `${analysis.score}%`,
              height: '100%',
              backgroundColor: analysis.color,
              borderRadius: '5px',
              transition: 'all 0.3s ease',
              boxShadow: `0 0 12px ${analysis.color}`
            }} />
          </div>
        </div>

        {/* Metrics Bar: Crack Time & Entropy */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            padding: '1.1rem',
            borderRadius: '12px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
              <Clock size={16} color="var(--accent-cyan)" /> Estimated Brute-Force Crack Time
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {analysis.crackTime}
            </div>
          </div>

          <div style={{
            padding: '1.1rem',
            borderRadius: '12px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
              <Cpu size={16} color="#a855f7" /> Shannon Entropy
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              ~{analysis.entropy} bits of entropy
            </div>
          </div>
        </div>

        {/* Criteria Checkmarks */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
            Security Criteria Breakdown:
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.6rem' }}>
            {criteria.map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.825rem',
                  color: c.passed ? '#34d399' : '#64748b'
                }}
              >
                {c.passed ? <Check size={16} color="#10b981" /> : <X size={16} color="var(--text-muted)" />}
                <span style={{ color: c.passed ? 'var(--text-primary)' : 'var(--text-muted)' }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback / Suggestions */}
        <div style={{
          padding: '1.25rem',
          borderRadius: '12px',
          backgroundColor: analysis.isCommon ? 'rgba(239, 68, 68, 0.1)' : 'rgba(6, 182, 212, 0.08)',
          border: `1px solid ${analysis.isCommon ? 'rgba(239, 68, 68, 0.3)' : 'rgba(6, 182, 212, 0.2)'}`
        }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: analysis.isCommon ? '#ef4444' : 'var(--accent-cyan)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {analysis.isCommon ? <ShieldAlert size={16} /> : <AlertTriangle size={16} />} 
            Security Assessment & Advice:
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {analysis.feedback.map((item, idx) => (
              <li key={idx} style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
