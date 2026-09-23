import { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  X
} from 'lucide-react';
import type { RiskLevel } from '../../types';

interface HomePageProps {
  onStartAssessment: () => void;
  onNavigateToLearn: () => void;
  onNavigateToTools: () => void;
  onNavigateToStage: (stage: 'learn' | 'check' | 'risk' | 'solutions' | 'improve') => void;
  currentScore: number | null;
  currentRiskLevel: RiskLevel | null;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartAssessment,
  onNavigateToLearn,
  onNavigateToTools,
  onNavigateToStage,
  currentScore: _currentScore,
  currentRiskLevel: _currentRiskLevel
}) => {
  const [selectedRiskCard, setSelectedRiskCard] = useState<{
    title: string;
    icon: string;
    shortDesc: string;
    fullDetail: string;
    mitigation: string;
  } | null>(null);

  const riskCards = [
    {
      title: 'Public Profiles',
      icon: '🔓',
      shortDesc: 'Anyone on the internet can screenshot photos, scrape bio data, and track habits.',
      fullDetail: 'Leaving an Instagram or Facebook profile public lets anyone index your friends, family relationships, routines, and vacation timelines. Data brokers aggregate this into dossiers.',
      mitigation: 'Switch account visibility to Private and restrict follower access to verified individuals.'
    },
    {
      title: 'Location Sharing',
      icon: '📍',
      shortDesc: 'Tagging real-time venues broadcasts when your residence is vacant and where you are right now.',
      fullDetail: 'Live story tagging and Snap Map pinpoint your coordinates. Physical stalkers and burglars exploit real-time geo-tags to plan intrusions while you are predictably away.',
      mitigation: 'Enable Ghost Mode on Snapchat, delay check-in posts until after you have departed the location.'
    },
    {
      title: 'Phishing & Scams',
      icon: '🎣',
      shortDesc: 'Deceptive links and urgency traps disguised as copyright notices or contest votes.',
      fullDetail: 'Attackers create fake login clones (e.g. instagram-appeal.com) or trick you into forwarding 2FA reset codes under the guise of an ambassador contest.',
      mitigation: 'Never click links sent in DMs, never forward SMS OTP codes to anyone, and verify sender domains.'
    },
    {
      title: 'Weak / Reused Passwords',
      icon: '🔑',
      shortDesc: 'Using the same password across multiple platforms creates a catastrophic domino effect.',
      fullDetail: 'When one small game forum or shopping website suffers a credential breach, automated bots test those exact combinations on your Instagram, Google, and banking portals.',
      mitigation: 'Use 14+ character passphrases, never reuse passwords, and utilize a reputable password manager.'
    },
    {
      title: 'Oversharing Habits',
      icon: '👤',
      shortDesc: 'Posting boarding passes, student IDs, and keys gives attackers raw exploitation data.',
      fullDetail: 'Boarding pass barcodes can be decoded to access passport and flight management. Work badges reveal employee numbers and security access.',
      mitigation: 'Never post travel tickets, ID cards, keys, or financial documents. Always blur sensitive metadata.'
    },
    {
      title: 'Excessive App Permissions',
      icon: '📱',
      shortDesc: 'Granting camera, continuous background GPS, and full photo gallery access unconditionally.',
      fullDetail: 'Apps can perform background telemetry, logging physical locations visited and extracting metadata from all photos stored on your device.',
      mitigation: 'Audit phone permissions regularly: set location to "While using app" and limit photo library access.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
      
      {/* 1. Hero Section (Matching Reference Image) */}
      <section style={{
        textAlign: 'center',
        padding: '3.5rem 0 2rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Decorative Shield Watermark */}
        <div style={{
          position: 'absolute',
          right: '2%',
          top: '45%',
          transform: 'translateY(-50%)',
          opacity: 0.12,
          pointerEvents: 'none',
          zIndex: 0
        }}>
          <ShieldCheck size={360} color="#06b6d4" strokeWidth={1} />
        </div>

        {/* Glowing Badge: Icon removed as requested */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.45rem 1.25rem',
          borderRadius: '9999px',
          background: 'rgba(6, 182, 212, 0.12)',
          border: '1px solid rgba(6, 182, 212, 0.4)',
          color: '#0284c7',
          fontSize: '0.875rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.18)'
        }}>
          <span>Think Before You Share</span>
        </div>

        {/* Headline: High contrast visible in BOTH themes */}
        <h1 className="heading-display" style={{
          position: 'relative',
          zIndex: 1,
          fontSize: 'clamp(2.4rem, 5vw, 4.25rem)',
          lineHeight: 1.15,
          color: 'var(--text-primary)',
          fontWeight: 800,
          marginBottom: '1.5rem',
          maxWidth: '920px',
          margin: '0 auto 1.5rem auto',
          letterSpacing: '-0.025em'
        }}>
          Your Privacy Matters. <br />
          <span className="gradient-text">Protect It Before You Share.</span>
        </h1>

        {/* Supporting text */}
        <p style={{
          position: 'relative',
          zIndex: 1,
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          margin: '0 auto 2.5rem auto',
          lineHeight: '1.65'
        }}>
          Learn how to protect your personal information, evaluate social-media privacy risks, and build safer digital habits with an interactive assessment.
        </p>

        {/* Action CTAs */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            onClick={onStartAssessment} 
            className="btn-primary"
            style={{ fontSize: '1.05rem', padding: '0.9rem 2.25rem' }}
          >
            Check My Privacy <ArrowRight size={18} />
          </button>
          <button 
            onClick={onNavigateToLearn} 
            className="btn-secondary"
            style={{ fontSize: '1.05rem', padding: '0.9rem 2rem' }}
          >
            Learn About Privacy
          </button>
          <button 
            onClick={onNavigateToTools} 
            className="btn-secondary"
            style={{ fontSize: '1.05rem', padding: '0.9rem 2rem' }}
          >
            Security Tools
          </button>
        </div>
      </section>

      {/* 2. Why Digital Privacy Matters */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 className="heading-display" style={{ fontSize: '2rem', color: '#f8fafc', marginBottom: '0.5rem' }}>
            Why Digital Privacy Matters
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            Social platforms are designed to maximize engagement, often at the expense of your personal boundaries.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {[
            {
              title: 'Personal Information & Identity',
              desc: 'Your name, date of birth, and college credentials are all that is required to forge identities, apply for predatory loans, or hijack your accounts.'
            },
            {
              title: 'Digital Footprint Permanence',
              desc: 'Screenshots, web archives, and automated scrapers preserve what you post even if you delete it five minutes later. Think before every upload.'
            },
            {
              title: 'Data Tracking & Profiling',
              desc: 'Algorithms track how long you linger on photos, where you walk with your phone, and who you message, building deep psychological profiles.'
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(6, 182, 212, 0.12)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                color: '#38bdf8',
                fontWeight: 700
              }}>
                0{idx + 1}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Common Privacy Risks Cards */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(244, 63, 94, 0.12)',
            color: '#fb7185',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}>
            Vulnerability Breakdown
          </div>
          <h2 className="heading-display" style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Common Social Media Privacy Risks
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Click on any risk card to inspect the technical exploit and recommended defense.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem'
        }}>
          {riskCards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedRiskCard(card)}
              className="glass-panel"
              style={{
                padding: '1.75rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  {card.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.4', marginBottom: '1.25rem' }}>
                  {card.shortDesc}
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem',
                color: 'var(--accent-cyan)',
                fontWeight: 600
              }}>
                Learn more & mitigation <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Risk Card Details */}
      {selectedRiskCard && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          backgroundColor: 'rgba(5, 8, 16, 0.75)',
          backdropFilter: 'blur(12px)'
        }}>
          <div className="glass-panel" style={{
            width: '100%',
            maxWidth: '520px',
            padding: '2rem',
            position: 'relative'
          }}>
            <button
              onClick={() => setSelectedRiskCard(null)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: 'var(--text-muted)' }}
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {selectedRiskCard.icon}
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              {selectedRiskCard.title}
            </h3>

            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                How Attackers Exploit It:
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {selectedRiskCard.fullDetail}
              </p>
            </div>

            <div style={{
              padding: '1rem',
              borderRadius: '10px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Recommended Defense:
              </h4>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                {selectedRiskCard.mitigation}
              </p>
            </div>

            <button
              onClick={() => { setSelectedRiskCard(null); onStartAssessment(); }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Check My Exposure In Assessment <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* 4. How PrivSecure Helps (Cycle) */}
      <section className="glass-panel" style={{ padding: '3rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 className="heading-display" style={{ fontSize: '1.85rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            The PrivSecure 5-Stage Action Cycle
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Moving beyond theoretical advice to measurable, actionable privacy improvement.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '1rem',
          textAlign: 'center'
        }}>
          {[
            { step: '1', title: 'Learn', desc: 'Understand modern data tracking and deception vectors.', stage: 'learn' as const },
            { step: '2', title: 'Check', desc: 'Complete the interactive 8-factor risk evaluation.', stage: 'check' as const },
            { step: '3', title: 'Understand Risk', desc: 'Review your 0–100 privacy score and category radar.', stage: 'risk' as const },
            { step: '4', title: 'Get Solutions', desc: 'Receive tailored, prioritized configuration steps.', stage: 'solutions' as const },
            { step: '5', title: 'Improve Privacy', desc: 'Check off resolved tasks and verify your progress.', stage: 'improve' as const }
          ].map((item, idx) => (
            <button 
              key={idx}
              type="button"
              onClick={() => onNavigateToStage(item.stage)}
              className="action-cycle-card"
              aria-label={`Stage ${item.step}: ${item.title} - ${item.desc}`}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                color: '#fff',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem auto'
              }}>
                {item.step}
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                {item.desc}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 5. Privacy Check Large CTA */}
      <section style={{
        borderRadius: '24px',
        padding: '3.5rem 2rem',
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
        border: '1px solid var(--border-color)',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <h2 className="heading-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--text-primary)', marginBottom: '1rem' }}>
          How Private Are You on Social Media?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto 2rem auto', lineHeight: '1.5' }}>
          Take the 2-minute Privacy Risk Assessment. Discover your vulnerabilities, receive your dynamic 0–100 score, and generate your step-by-step checklist.
        </p>
        <button
          onClick={onStartAssessment}
          className="btn-primary"
          style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}
        >
          Take Privacy Check <ArrowRight size={20} />
        </button>
      </section>

    </div>
  );
};
