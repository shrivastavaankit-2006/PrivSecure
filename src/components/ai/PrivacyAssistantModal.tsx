import React, { useState, useRef, useEffect } from 'react';
import { X, Send, ShieldCheck } from 'lucide-react';

interface PrivacyAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const PrivacyAssistantModal: React.FC<PrivacyAssistantModalProps> = ({
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I'm your PrivSecure AI Assistant. Ask me anything in English, Hindi, or Hinglish about social media safety, suspicious links, phishing red flags, or privacy settings!",
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    "Should I share my phone number on Instagram?",
    "bhai phishing kya hota hai?",
    "hey tum kese ho",
    "password strong kaise banau?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const getSmartLocalResponse = (prompt: string): string => {
    const lower = prompt.toLowerCase().trim();
    const isHindiOrHinglish = /kya|hai|kaise|kese|kaisey|bhai|mujhe|nahi|kare|karna|samjha|batao|apna|mera|meri|karein|haal|theek|kuch|tu|tum|aap|ho|hain|karo|banao|rakhu|rakhein|sun/.test(lower);

    // 1. GREETINGS & CASUAL TALK
    const isGreeting = /^(hi|hey|hello|sup|yo|namaste|salaam|good\s*(morning|evening|afternoon))([!?. ]|$)/.test(lower) ||
      /tum\s*(kaise|kese|kaisey)\s*ho|aap\s*(kaise|kese|kaisey)\s*(ho|hain)|kya\s*haal|how\s*are\s*you|how\s*r\s*u|what'?s\s*up/.test(lower);
    if (isGreeting) {
      if (isHindiOrHinglish) {
        return "Hey! Main bilkul theek hoon 😊 Tum kaise ho? Aaj main tumhari digital privacy ya account security mein kya help kar sakta hoon?";
      }
      return "Hello! I'm doing well, thank you for asking! 😊 How are you today? Let me know if you need help with your privacy, passwords, or social media safety!";
    }

    // 2. ASSISTANT CAPABILITIES
    const isCapability = /(tu|tum|aap)\s*kya\s*kar\s*(sakta|sakte)|who\s*are\s*you|what\s*can\s*you\s*do|kaun\s*ho|kya\s*kaam\s*hai/.test(lower);
    if (isCapability) {
      if (isHindiOrHinglish) {
        return "Main PrivSecure ka AI Assistant hoon! Main aapko in cheezon mein guide kar sakta hoon:\n\n" +
          "1. 🎣 Phishing aur fake links ko pehchanna\n" +
          "2. 🛡️ Instagram, Snapchat aur social profiles ko private aur secure banana\n" +
          "3. 🔑 Unbreakable passwords aur Two-Factor Authentication (2FA) setup karna\n" +
          "4. 🚫 Oversharing aur online scams se bache rehna\n\n" +
          "Aap mujhse English, Hindi ya Hinglish mein koi bhi sawaal pooch sakte hain!";
      }
      return "I am the PrivSecure AI Assistant! I can help you with:\n\n" +
        "1. 🎣 Spotting phishing scams and malicious links\n" +
        "2. 🛡️ Hardening your Instagram, Snapchat, and social media privacy\n" +
        "3. 🔑 Generating strong passphrases and enabling 2FA\n" +
        "4. 🚫 Understanding oversharing risks and protecting personal data\n\n" +
        "Feel free to ask me anything in English, Hindi, or Hinglish!";
    }

    // 3. PHISHING
    if (lower.includes('phishing') || lower.includes('fake email') || lower.includes('fake message')) {
      if (isHindiOrHinglish) {
        return "Bhai, phishing ek online scam hai jisme attackers fake email, SMS ya DM bhejte hain jo bilkul real bank ya Instagram jaise dikhte hain. Unka maqsad aapka password, OTP ya card number churaana hota hai.\n\n" +
          "🚨 Pehchanne ke tareeqe:\n" +
          "• Urgent baatein ('Account block ho jayega! Verify karo')\n" +
          "• Fake URL spelling (e.g. instagr-login.com)\n" +
          "• Anjaan sender se aaya login link";
      }
      return "Phishing is a deceptive cyber scam where attackers impersonate trusted entities (like banks, Instagram, or Google) via email, SMS, or direct messages. Their goal is to trick you into entering credentials or sensitive data.\n\n" +
        "🚨 Warning Signs:\n" +
        "• Artificial urgency ('Account suspended in 24 hours!')\n" +
        "• Mismatched sender domains (e.g., support@insta-secure-update.xyz)\n" +
        "• Requests to confirm passwords or OTPs.";
    }

    // 4. INSTAGRAM / SOCIAL MEDIA SAFETY
    if (lower.includes('instagram') || lower.includes('insta') || lower.includes('social media') || lower.includes('snapchat')) {
      if (isHindiOrHinglish) {
        return "Apne Instagram aur social media account ko safe rakhne ke 4 golden rules:\n\n" +
          "1. 🔒 Profile ko 'Private' rakhein taaki sirf verified friends aapka content dekhein.\n" +
          "2. 📱 Two-Factor Authentication (2FA) zaroor activate karein (Settings > Accounts Center > Password & Security).\n" +
          "3. 📍 Posts mein live location tag na karein — venue chhodne ke baad photos post karein.\n" +
          "4. 🚫 DMs mein aane wale 'Vote for me' ya contest links par kabhi click na karein.";
      }
      return "To keep your Instagram and social media accounts safe:\n\n" +
        "1. 🔒 Switch your profile to 'Private' so only approved followers see your posts.\n" +
        "2. 📱 Enable Two-Factor Authentication (2FA) via an Authenticator App.\n" +
        "3. 📍 Never post live locations — delay uploads until after leaving the location.\n" +
        "4. 🚫 Never tap links in direct messages asking you to vote in contests or claim badges.";
    }

    // 5. OVERSHARING
    if (lower.includes('overshar') || lower.includes('share kar') || lower.includes('kya share')) {
      if (isHindiOrHinglish) {
        return "Oversharing ka matlab hai social media par apni personal information zaroorat se zyada public karna — jaise boarding passes, college ID card, ghar ka address, routine ya phone number.\n\n" +
          "💡 Rule: 'Think Before You Share.' Agar koi information aapke ghar ka pata, financial status ya location bata sakti hai, toh use public stories par post na karein!";
      }
      return "Oversharing happens when you publicly post sensitive details online — such as flight boarding passes, student IDs, home addresses, phone numbers, or daily travel routines.\n\n" +
        "💡 Malicious actors use this public footprint for identity theft, stalking, and impersonation. Always ask yourself: 'Does the whole internet need to know this?'";
    }

    // 6. PASSWORD & 2FA
    if (lower.includes('password') || lower.includes('strong') || lower.includes('passphrase') || lower.includes('2fa')) {
      if (isHindiOrHinglish) {
        return "Strong password banane ka sabse aasan aur secure formula hai 'Passphrase':\n\n" +
          "• Kam se kam 14–16 characters lambi rakhein.\n" +
          "• 3 se 4 unrelated words combine karein (e.g. 'Coffee#Blue79Rocket!').\n" +
          "• Numbers aur symbols (@, $, #) zaroor add karein.\n" +
          "• Kabhi bhi apna naam, birthday ya phone number password mein mat use karein!";
      }
      return "The most effective way to create a strong password is using a Passphrase:\n\n" +
        "• Aim for at least 14–16 characters.\n" +
        "• Combine 3–4 unrelated random words (e.g., 'Solar#Tiger84Bridge!').\n" +
        "• Include uppercase letters, numbers, and symbols.\n" +
        "• Avoid personal identifiers like birthdays or names, and never reuse passwords!";
    }

    // 7. SUSPICIOUS LINKS
    if (lower.includes('link') || lower.includes('url') || lower.includes('suspicious')) {
      if (isHindiOrHinglish) {
        return "🚨 Anjaan link par click bilkul mat karein! Fake link check karne ke steps:\n\n" +
          "1. Domain dhyan se padhein (jaise paytm.com ki jagah paytm-verify.xyz).\n" +
          "2. Shortened links (bit.ly, tinyurl) se bachein.\n" +
          "3. Agar kisi dost ne bhi achanak link bheja hai, toh pehle call karke confirm karein ki unka account hack toh nahi hua.";
      }
      return "🚨 Do NOT click suspicious links! Here is how to verify them:\n\n" +
        "1. Inspect the domain carefully for subtle misspellings (e.g., paypaI.com with capital 'i').\n" +
        "2. Avoid unverified shortlinks (bit.ly, is.gd) received via SMS or DM.\n" +
        "3. Always navigate directly to the official service or app instead of clicking links.";
    }

    // 8. OTP / SCAMS
    if (lower.includes('otp') || lower.includes('scam') || lower.includes('fraud')) {
      if (isHindiOrHinglish) {
        return "Bhai, yaad rakhein: Kisi bhi bank, company ya customer care executive ko aapka OTP maangne ka haq nahi hai. OTP hamesha private hota hai. Agar koi phone par OTP maange, toh turant call kaat dein!";
      }
      return "Remember: No legitimate bank, telecom provider, or customer service representative will ever ask for your OTP. An OTP is your personal digital signature — never share it with anyone!";
    }

    // 9. GENERAL / CASUAL FALLBACK
    if (isHindiOrHinglish) {
      return `Aapne poocha: "${prompt}". Main PrivSecure AI Assistant hoon, aur main aapko digital privacy, online safety, social media settings aur cyber scams se bache rehne mein guide kar sakta hoon. Aap kisi specific topic jaise Instagram privacy, password security ya phishing ke baare mein pooch sakte hain!`;
    }
    return `You asked: "${prompt}". I'm the PrivSecure AI Assistant, here to assist you with digital privacy, social media safety, phishing prevention, and account security. Feel free to ask me any specific question about protecting your digital footprint!`;
  };

  const handleSend = async (questionText?: string) => {
    const textToSend = (questionText || inputValue).trim();
    if (!textToSend || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Call Cloudflare Worker backend endpoint
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend })
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.reply || data.content;
        if (replyText) {
          setMessages((prev) => [
            ...prev,
            {
              id: `ai_${Date.now()}`,
              sender: 'assistant',
              text: replyText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
          setIsTyping(false);
          return;
        }
      }
    } catch {
      // Local fallback logic below
    }

    // Multilingual & Intent-first smart fallback
    setTimeout(() => {
      const simulatedReply = getSmartLocalResponse(textToSend);

      setMessages((prev) => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          sender: 'assistant',
          text: simulatedReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backgroundColor: 'rgba(5, 8, 16, 0.75)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)'
    }}>
      <div 
        className="glass-panel ai-assistant-modal"
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '620px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        
        {/* Header */}
        <div 
          className="ai-modal-header"
          style={{
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-secondary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0284c7, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={20} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  PrivSecure AI Assistant
                </h3>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                English • Hindi • Hinglish Safety Guidance
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            style={{ color: 'var(--text-muted)', padding: '0.35rem', borderRadius: '6px' }} 
            aria-label="Close assistant"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Body */}
        <div style={{
          flex: 1,
          padding: '1.25rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {messages.map((m) => {
            const isAi = m.sender === 'assistant';
            return (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.6rem',
                  alignSelf: isAi ? 'flex-start' : 'flex-end',
                  maxWidth: '85%'
                }}
              >
                {isAi && (
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'rgba(99, 102, 241, 0.15)',
                    border: '1px solid rgba(99, 102, 241, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <ShieldCheck size={16} color="var(--primary-color)" />
                  </div>
                )}
                <div>
                  <div 
                    className={isAi ? "ai-msg-assistant" : "ai-msg-user"}
                    style={{
                      padding: '0.85rem 1.1rem',
                      borderRadius: isAi ? '14px 14px 14px 2px' : '14px 14px 2px 14px',
                      fontSize: '0.9rem',
                      lineHeight: '1.45',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {m.text}
                  </div>
                  <div style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    marginTop: '0.25rem',
                    textAlign: isAi ? 'left' : 'right'
                  }}>
                    {m.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
              <ShieldCheck size={16} color="var(--primary-color)" />
              <span>Analyzing privacy query...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompt Pills */}
        <div 
          className="ai-quick-prompts"
          style={{
            padding: '0.5rem 1rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            gap: '0.4rem',
            overflowX: 'auto',
            backgroundColor: 'var(--bg-secondary)'
          }}
        >
          {samplePrompts.map((p, i) => (
            <button
              key={i}
              className="ai-quick-btn"
              onClick={() => handleSend(p)}
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                padding: '0.35rem 0.65rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                whiteSpace: 'nowrap'
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div 
          className="ai-input-bar"
          style={{
            padding: '1rem',
            borderTop: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            display: 'flex',
            gap: '0.5rem'
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
            placeholder="Ask in English or Hinglish (e.g. bhai mera account safe hai kya?)..."
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isTyping}
            className="btn-primary"
            style={{ padding: '0.75rem 1.1rem', borderRadius: '10px' }}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};
