import { useState } from 'react';
import { 
  Share2,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import type { SimulatorScenario } from '../../types';

// Initial local bank of diverse scenarios
const initialLocalScenarios: SimulatorScenario[] = [
  {
    id: 'sim_boarding_overshare',
    platform: 'Instagram Story',
    scenarioType: 'Oversharing & Barcode Leaks',
    senderName: 'Travel Enthusiast Post',
    senderHandle: '@travel_diaries_live',
    message: '[SIMULATED MESSAGE]\n✈️ "Europe trip finally starting! See you all in 3 weeks! 🌍✨" (Attached photo clearly shows airline boarding pass barcode and booking reference PNR: XY9482)',
    question: 'What security risk is created by posting this photo publicly?',
    options: [
      'Airline loyalty points might expire faster',
      'Anyone with the PNR code or barcode can access passport details, change seats, or cancel flights, and burglars know the house is empty',
      'Friends might feel jealous',
      'The airline will charge extra luggage fees'
    ],
    correctAnswer: 'Anyone with the PNR code or barcode can access passport details, change seats, or cancel flights, and burglars know the house is empty',
    explanation: 'Boarding pass barcodes store unencrypted passenger records (PNR, e-ticket number, passport info). Broadcasting it announces your empty residence to thieves.',
    riskLevel: 'High',
    warningSigns: [
      'Visible 2D barcode and booking reference code',
      'Announcing 3-week absence in real time'
    ],
    recommendedAction: 'Never post boarding passes, tickets, or travel schedules publicly. If sharing, blur barcodes and post only after returning home.'
  },
  {
    id: 'sim_ig_copyright',
    platform: 'Instagram',
    scenarioType: 'Phishing & Impersonation',
    senderName: 'Instagram Copyright Desk',
    senderHandle: '@meta_support_notice99',
    message: '[SIMULATED MESSAGE]\n⚠️ Notice: Your account has received multiple copyright strikes. Your profile will be terminated in 24 hours. Verify your account ownership here: hxxps://meta-appeal-form.example.org/verify',
    question: 'How should you respond to this direct message?',
    options: [
      'Click the link and submit your login details quickly',
      'Reply to the message asking for more details',
      'Do not click the link; report the account as a scam and block it',
      'Share the link with friends to ask if they received it'
    ],
    correctAnswer: 'Do not click the link; report the account as a scam and block it',
    explanation: 'Instagram and Meta never notify users about copyright strikes through direct DMs or shortened/unofficial links. This is a credential harvesting phishing scheme.',
    riskLevel: 'High',
    warningSigns: [
      'High-pressure urgency ("terminated in 24 hours")',
      'Unofficial domain (meta-appeal-form.example.org instead of instagram.com)',
      'Direct message notification instead of in-app official Support Inbox'
    ],
    recommendedAction: 'Never click the link. Tap the three dots on the profile, report as "Scam or Fraud", and block immediately.'
  },
  {
    id: 'sim_wa_contest_otp',
    platform: 'WhatsApp',
    scenarioType: 'OTP Hijacking & Friend Impersonation',
    senderName: 'College Friend (Rohan)',
    senderHandle: '+91 98765 43210',
    message: '[SIMULATED MESSAGE]\n"Hey buddy! I entered an online youth contest and need 2 more votes to win! I accidentally sent the SMS verification code to your number, can you please tell me the 6-digit code you just received? Please hurry! 🙏"',
    question: 'What is actually happening here?',
    options: [
      'Your friend needs your help in a genuine contest voting system',
      'Your friend\'s account is hacked, and attackers are triggering a password/2FA reset on YOUR account',
      'WhatsApp is conducting an automated network verification',
      'It is an invite to become a brand ambassador'
    ],
    correctAnswer: 'Your friend\'s account is hacked, and attackers are triggering a password/2FA reset on YOUR account',
    explanation: 'Attackers take over contacts\' accounts, trigger password reset codes to victims\' phones, and trick them into handing over the OTP under the guise of an innocent contest.',
    riskLevel: 'High',
    warningSigns: [
      'Requesting a 6-digit SMS code',
      'Artificial sense of urgency ("Please hurry!")',
      'Unusual out-of-character request via messaging app'
    ],
    recommendedAction: 'NEVER share any OTP. Call Rohan directly on a voice call to warn him that his WhatsApp account has been hijacked.'
  },
  {
    id: 'sim_sms_parcel',
    platform: 'SMS',
    scenarioType: 'Smishing & Payment Scam',
    senderName: 'Postal Delivery Bot',
    senderHandle: '+91 91234 56789',
    message: '[SIMULATED MESSAGE]\n"Alert: Your parcel #IN73921 could not be delivered due to an incorrect house address. Update your address and pay ₹25 redelivery fee to avoid return: hxxps://indiapost-update.example.net/redeliver"',
    question: 'What should you do with this SMS?',
    options: [
      'Pay the ₹25 fee since the amount is small and harmless',
      'Click the link and re-enter your home address and card details',
      'Delete the message, block the number, and verify tracking on official indiapost.gov.in',
      'Forward the message to postal customer care'
    ],
    correctAnswer: 'Delete the message, block the number, and verify tracking on official indiapost.gov.in',
    explanation: 'This is smishing. The small ₹25 payment is a lure designed to capture your debit/credit card CVV or net banking credentials on a fake phishing gateway.',
    riskLevel: 'High',
    warningSigns: [
      'Sent from a normal 10-digit mobile number instead of an official postal shortcode',
      'Suspicious domain (.example.net instead of .gov.in)',
      'Small payment demand to harvest banking credentials'
    ],
    recommendedAction: 'Do not click the link. If you are expecting a package, check tracking only on the official postal website.'
  },
  {
    id: 'sim_internship_offer',
    platform: 'LinkedIn / Instagram',
    scenarioType: 'Fake Job / Internship Scam',
    senderName: 'Global Tech Recruitment',
    senderHandle: '@tech_talent_hr',
    message: '[SIMULATED MESSAGE]\n"Congratulations! We reviewed your profile and you have been shortlisted for our Remote Social Media Intern position (₹45,000/month, 1 hr/day). Contact our hiring manager on Telegram: @quick_hire_hr to collect your offer letter."',
    question: 'What is the red flag in this job offer?',
    options: [
      'The salary is too realistic',
      'Legitimate companies do not hire via anonymous Telegram handles without an interview or formal application',
      'Remote internships are prohibited by law',
      'You must have 10 years experience for social media jobs'
    ],
    correctAnswer: 'Legitimate companies do not hire via anonymous Telegram handles without an interview or formal application',
    explanation: 'Fake employment scams redirect candidates to unmoderated Telegram channels, where scammers ask for "registration fees", equipment deposits, or task-based crypto scams.',
    riskLevel: 'High',
    warningSigns: [
      'Unsolicited offer without an interview',
      'Unrealistic pay for minimal effort',
      'Shifting conversation to Telegram'
    ],
    recommendedAction: 'Ignore and report the account. Research job opportunities only through verified corporate careers pages.'
  }
];

export const OvershareSim: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState<SimulatorScenario>(initialLocalScenarios[0]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [seenScenarioIds, setSeenScenarioIds] = useState<string[]>([initialLocalScenarios[0].id]);
  const [stats, setStats] = useState({ tested: 0, correct: 0 });

  // Handle user decision
  const handleSelectOption = (opt: string) => {
    if (hasEvaluated) return;
    setSelectedOption(opt);
    setHasEvaluated(true);

    const isCorrect = opt === currentScenario.correctAnswer;
    setStats((prev) => ({
      tested: prev.tested + 1,
      correct: isCorrect ? prev.correct + 1 : prev.correct
    }));
  };

  // Try Another Scenario (Dynamic Gemini Generation with Local Fallback & Deduplication)
  const handleNextScenario = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/simulator-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ excludeIds: seenScenarioIds })
      });

      if (res.ok) {
        const data = (await res.json()) as { scenario?: SimulatorScenario };
        if (data.scenario && data.scenario.message) {
          setCurrentScenario(data.scenario);
          setSeenScenarioIds((prev) => [...prev, data.scenario!.id]);
          setSelectedOption(null);
          setHasEvaluated(false);
          setIsGenerating(false);
          return;
        }
      }

      // Local fallback: pick an unseen scenario from the bank
      pickLocalUnseen();
    } catch {
      pickLocalUnseen();
    } finally {
      setIsGenerating(false);
    }
  };

  const pickLocalUnseen = () => {
    const unseen = initialLocalScenarios.filter((s) => !seenScenarioIds.includes(s.id));
    const next = unseen.length > 0 ? unseen[0] : initialLocalScenarios[Math.floor(Math.random() * initialLocalScenarios.length)];
    setCurrentScenario(next);
    setSeenScenarioIds((prev) => [...prev, next.id]);
    setSelectedOption(null);
    setHasEvaluated(false);
  };

  const isCorrect = selectedOption === currentScenario.correctAnswer;
  const isHighRisk = currentScenario.riskLevel === 'High';

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
          backgroundColor: 'rgba(236, 72, 153, 0.12)',
          border: '1px solid rgba(236, 72, 153, 0.3)',
          color: '#f472b6',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '0.75rem'
        }}>
          <Share2 size={16} /> Think Before You Post & Respond
        </div>
        <h1 className="heading-display" style={{ fontSize: '2.2rem', color: '#f8fafc', marginBottom: '0.5rem' }}>
          "Safe to Share?" Social Media Simulator
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '640px', margin: '0 auto' }}>
          Interactive simulator to practice spotting oversharing hazards, phishing direct messages, and deceptive verification traps.
        </p>

        {/* Action Controls & Session Counter */}
        <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleNextScenario}
            disabled={isGenerating}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.25rem',
              borderRadius: '9999px',
              backgroundColor: isGenerating ? 'rgba(236, 72, 153, 0.25)' : 'rgba(236, 72, 153, 0.15)',
              border: '1px solid rgba(236, 72, 153, 0.45)',
              color: '#f472b6',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: isGenerating ? 'wait' : 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 10px rgba(236, 72, 153, 0.15)'
            }}
          >
            <RefreshCw size={16} className={isGenerating ? 'animate-spin' : ''} />
            {isGenerating ? 'Generating New Scenario...' : 'Try Another Scenario'}
          </button>

          {stats.tested > 0 && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              color: '#38bdf8',
              fontSize: '0.825rem',
              fontWeight: 600
            }}>
              <span>Tested: {stats.tested}</span> • <span>Safe Decisions: {stats.correct}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Interactive Simulation Card */}
      <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative' }}>
        
        {/* MANDATORY SIMULATED MESSAGE BANNER */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 1rem',
          backgroundColor: 'rgba(245, 158, 11, 0.15)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          borderRadius: '10px',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontWeight: 700, fontSize: '0.85rem' }}>
            <AlertTriangle size={16} />
            <span>SIMULATED MESSAGE</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
            Educational Cyber Awareness Simulation — Safe Demonstration
          </span>
        </div>

        {/* Message / Post Mockup Header */}
        <div style={{
          backgroundColor: '#070b15',
          border: '1px solid rgba(56, 189, 248, 0.2)',
          borderRadius: '14px',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}>
                {currentScenario.senderName.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {currentScenario.senderName}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {currentScenario.senderHandle} • Platform: {currentScenario.platform}
                </div>
              </div>
            </div>

            <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
              {currentScenario.scenarioType}
            </span>
          </div>

          {/* Message Content Bubble */}
          <div style={{
            padding: '1.25rem',
            borderRadius: '10px',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap'
          }}>
            {currentScenario.message}
          </div>
        </div>

        {/* Question Prompt */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.5rem' }}>
            {currentScenario.question}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Choose the most responsible and safe reaction:
          </p>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
          {currentScenario.options.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            const isOptCorrect = opt === currentScenario.correctAnswer;
            let bgColor = 'var(--bg-card)';
            let borderColor = 'var(--border-color)';
            let textColor = 'var(--text-primary)';

            if (hasEvaluated) {
              if (isOptCorrect) {
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
              <button
                key={idx}
                onClick={() => handleSelectOption(opt)}
                disabled={hasEvaluated}
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  backgroundColor: bgColor,
                  border: `1.5px solid ${borderColor}`,
                  cursor: hasEvaluated ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '0.95rem', fontWeight: 500, color: textColor }}>
                  {opt}
                </span>
                {hasEvaluated && (
                  <div>
                    {isOptCorrect ? (
                      <CheckCircle2 size={20} color="#10b981" />
                    ) : isSelected ? (
                      <XCircle size={20} color="#ef4444" />
                    ) : null}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Educational Breakdown (Shows after choice) */}
        {hasEvaluated && (
          <div style={{
            padding: '1.5rem',
            borderRadius: '12px',
            backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {isCorrect ? <CheckCircle2 size={20} color="#10b981" /> : <ShieldAlert size={20} color="#ef4444" />}
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: isCorrect ? '#10b981' : '#ef4444' }}>
                  {isCorrect ? 'Correct & Safe Decision!' : 'Dangerous Reaction — Scam Alert!'}
                </h4>
              </div>
              <span className={`badge ${isHighRisk ? 'badge-rose' : 'badge-amber'}`}>
                Risk: {currentScenario.riskLevel}
              </span>
            </div>

            <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1rem' }}>
              {currentScenario.explanation}
            </p>

            {/* Warning Signs */}
            {currentScenario.warningSigns && currentScenario.warningSigns.length > 0 && (
              <div style={{ marginBottom: '0.75rem' }}>
                <strong style={{ fontSize: '0.85rem', color: '#d97706', display: 'block', marginBottom: '0.35rem' }}>
                  🚩 Warning Signs in this scenario:
                </strong>
                <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {currentScenario.warningSigns.map((sign, i) => (
                    <li key={i} style={{ marginBottom: '0.2rem' }}>{sign}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended Action */}
            {currentScenario.recommendedAction && (
              <div style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
                borderLeft: '3px solid #06b6d4',
                color: '#7dd3fc',
                fontSize: '0.85rem'
              }}>
                <strong>Recommended Action:</strong> {currentScenario.recommendedAction}
              </div>
            )}
          </div>
        )}

        {/* Next Scenario Button */}
        {hasEvaluated && (
          <button
            onClick={handleNextScenario}
            disabled={isGenerating}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <span>{isGenerating ? 'Generating...' : 'Try Another Scenario'}</span>
            <ChevronRight size={16} />
          </button>
        )}

      </div>

    </div>
  );
};
