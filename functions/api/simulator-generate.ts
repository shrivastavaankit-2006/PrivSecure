declare const process: { env?: Record<string, string | undefined> } | undefined;

interface Env {
  GEMINI_API_KEY?: string;
}

export interface SimulatorScenario {
  id: string;
  platform: string;
  scenarioType: string;
  senderName: string;
  senderHandle: string;
  message: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  riskLevel: 'High' | 'Moderate' | 'Low';
  warningSigns: string[];
  recommendedAction: string;
}

// 10 diverse, high-quality fallback scenarios
const fallbackSimulatorBank: SimulatorScenario[] = [
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
    id: 'sim_snap_ghost',
    platform: 'Snapchat',
    scenarioType: 'Location Privacy & Stalking',
    senderName: 'Snap Map Settings Alert',
    senderHandle: '@snap_community_tip',
    message: '[SIMULATED MESSAGE]\n"Reminder: Your Snap Map is currently broadcasting your live GPS location to All Friends every time the app opens."',
    question: 'Why is keeping live location enabled for all friends a privacy hazard?',
    options: [
      'It increases your mobile data bill by 50%',
      'It enables anyone in your friends list to track your home, school, and routine coordinates in real time',
      'Snapchat will ban your account for battery consumption',
      'Other users will receive notifications when you wake up'
    ],
    correctAnswer: 'It enables anyone in your friends list to track your home, school, and routine coordinates in real time',
    explanation: 'Live GPS beacons build an exact routine of your life—when you are home, when your house is empty, and where you travel—which malicious actors or stalkers can exploit.',
    riskLevel: 'Moderate',
    warningSigns: [
      'Live GPS broadcast enabled without Ghost Mode',
      'Broad friend list with acquaintances having access to coordinates'
    ],
    recommendedAction: 'Open Snap Map, tap the Settings gear icon, and toggle ON "Ghost Mode" to hide your location from everyone.'
  },
  {
    id: 'sim_fb_quizzes',
    platform: 'Facebook',
    scenarioType: 'Social Engineering & Data Mining',
    senderName: 'Viral Personality Games',
    senderHandle: '@fun_quizzes_daily',
    message: '[SIMULATED MESSAGE]\n"🎮 Which 90s Superhero Are You? Answer 3 fun questions: 1. Your first pet\'s name? 2. The street you grew up on? 3. Your mother\'s maiden name! Share your results with friends!"',
    question: 'What is the primary danger of playing and sharing this casual quiz?',
    options: [
      'Your Facebook feed will show older posts',
      'It tricks you into publicly answering standard security questions used to recover email and bank accounts',
      'It will tag all your friends without permission',
      'Your phone screen will lock'
    ],
    correctAnswer: 'It tricks you into publicly answering standard security questions used to recover email and bank accounts',
    explanation: 'Social engineering surveys gather answers to common password reset questions (mother\'s maiden name, childhood street, first pet) for unauthorized account recovery.',
    riskLevel: 'Moderate',
    warningSigns: [
      'Asks for specific personal biographical data',
      'Pretends to be innocent entertainment'
    ],
    recommendedAction: 'Never post answers to personal security recovery questions on public social media feeds.'
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
  },
  {
    id: 'sim_boarding_overshare',
    platform: 'Instagram Story',
    scenarioType: 'Oversharing & Barcode Leaks',
    senderName: 'Travel Enthusiast Post',
    senderHandle: '@travel_diaries_live',
    message: '[SIMULATED MESSAGE]\n✈️ "Europe trip finally starting! See you all in 3 weeks! 🌍✨" (Attached photo clearly shows airline boarding pass barcode and booking reference PNR: XY9482)',
    question: 'What security risk is created by posting this photo?',
    options: [
      'Airline points might expire faster',
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
    id: 'sim_banking_apk',
    platform: 'WhatsApp',
    scenarioType: 'Malware / Remote Access Trojan',
    senderName: 'Bank Customer Security Care',
    senderHandle: '+91 99887 76655',
    message: '[SIMULATED MESSAGE]\n"Dear Customer, your NetBanking services have been suspended due to pending PAN card verification. Download and install this mandatory security utility to reactivate: HDFC_eKYC_Update.apk"',
    question: 'How should you handle this message and APK file?',
    options: [
      'Download and install the APK file immediately',
      'Forward the APK file to a friend to test it',
      'Do not download or install; banks never send APK files via WhatsApp. Block and report.',
      'Open the file on computer instead of phone'
    ],
    correctAnswer: 'Do not download or install; banks never send APK files via WhatsApp. Block and report.',
    explanation: 'Banks never distribute updates as APK files via WhatsApp. These files are Remote Access Trojans (RATs) that intercept bank OTPs and steal funds.',
    riskLevel: 'High',
    warningSigns: [
      'Unsolicited APK file attachment sent via messaging app',
      'Threat of account suspension',
      'Sent from an ordinary mobile number'
    ],
    recommendedAction: 'Immediately delete the message and block the sender. Never install APK files from untrusted chat messages.'
  }
];

function extractJsonFromText(rawText: string): unknown {
  if (!rawText) return null;
  let text = rawText.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  }
  try {
    return JSON.parse(text);
  } catch {
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      try {
        return JSON.parse(text.substring(firstBrace, lastBrace + 1));
      } catch {
        return null;
      }
    }
  }
  return null;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const body = (await context.request.json().catch(() => ({}))) as { excludeIds?: string[] };
    const excludeSet = new Set(body.excludeIds || []);

    const apiKey = (
      context.env.GEMINI_API_KEY ||
      (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
      ''
    ).trim();

    // Pick an unseen fallback scenario
    const pickFallback = (): SimulatorScenario => {
      const unseen = fallbackSimulatorBank.filter((s) => !excludeSet.has(s.id));
      const pool = unseen.length > 0 ? unseen : fallbackSimulatorBank;
      return pool[Math.floor(Math.random() * pool.length)];
    };

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          scenario: pickFallback(),
          source: 'local_fallback',
          note: 'GEMINI_API_KEY not configured; serving verified local fallback scenario.'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const candidateModels = [
      "gemini-2.5-flash",
      "gemini-2.5-flash-lite",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-3.8-flash",
      "gemini-3.5-flash-lite",
      "gemini-3.1-flash-lite"
    ];

    const prompt = `You are PrivSecure's Social Media Security & Deception Simulation Educator.
Generate exactly ONE unique, realistic, educational simulation scenario of a suspicious social media message or post.

TOPIC EXAMPLES:
- Phishing direct message (fake copyright, contest vote, verification badge)
- Social engineering (fake friend request, romance scam, impersonation)
- Giveaway or crypto scam
- Urgent fake security alert or OTP request
- Job / internship offer requesting off-platform Telegram contact
- Oversharing risk (boarding pass barcode, keys, live location check-in)

SAFETY RULES:
1. The message MUST be marked clearly as educational: start message with "[SIMULATED MESSAGE]".
2. NEVER include real harmful URLs. Use safe placeholder domains like "hxxps://example.com" or "example.org".
3. Provide realistic multiple-choice options with exactly ONE safe/correct answer.

Return ONLY a valid JSON object matching this schema:
{
  "platform": "Instagram | WhatsApp | Snapchat | Facebook | LinkedIn | SMS",
  "scenarioType": "Phishing | Account Takeover | Impersonation | Oversharing | Scams",
  "senderName": "Realistic sender name",
  "senderHandle": "@realistic_handle or phone",
  "message": "[SIMULATED MESSAGE]\\nContent of the message...",
  "question": "Realistic question asking what to do",
  "options": [
    "Dangerous action",
    "Risky action",
    "Safe action",
    "Alternative action"
  ],
  "correctAnswer": "Exact string matching the safest option",
  "explanation": "Clear educational explanation of the risks and red flags",
  "riskLevel": "High | Moderate | Low",
  "warningSigns": [
    "Red flag 1",
    "Red flag 2"
  ],
  "recommendedAction": "Clear advice for user safety"
}`;

    for (const model of candidateModels) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.85,
              responseMimeType: 'application/json'
            }
          })
        });

        if (response.ok) {
          const data = (await response.json()) as {
            candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
          };
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const parsed = extractJsonFromText(text) as Partial<SimulatorScenario>;
            if (
              parsed &&
              parsed.platform &&
              parsed.message &&
              Array.isArray(parsed.options) &&
              parsed.options.length >= 3 &&
              parsed.correctAnswer &&
              parsed.explanation
            ) {
              const scenario: SimulatorScenario = {
                id: `ai_sim_${Date.now()}`,
                platform: parsed.platform,
                scenarioType: parsed.scenarioType || 'Digital Deception',
                senderName: parsed.senderName || 'Unknown Sender',
                senderHandle: parsed.senderHandle || '@unverified_account',
                message: parsed.message.startsWith('[SIMULATED MESSAGE]') 
                  ? parsed.message 
                  : `[SIMULATED MESSAGE]\n${parsed.message}`,
                question: parsed.question || 'What is the safest action to take?',
                options: parsed.options.slice(0, 4),
                correctAnswer: parsed.correctAnswer,
                explanation: parsed.explanation,
                riskLevel: (parsed.riskLevel === 'Low' || parsed.riskLevel === 'Moderate' || parsed.riskLevel === 'High') 
                  ? parsed.riskLevel 
                  : 'High',
                warningSigns: Array.isArray(parsed.warningSigns) ? parsed.warningSigns : ['Urgent or unsolicited request'],
                recommendedAction: parsed.recommendedAction || 'Do not click unverified links. Report and block suspicious senders.'
              };

              return new Response(
                JSON.stringify({
                  scenario,
                  source: 'gemini'
                }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
              );
            }
          }
        }
      } catch {
        // Continue to fallback model
      }
    }

    // Fallback
    return new Response(
      JSON.stringify({
        scenario: pickFallback(),
        source: 'local_fallback',
        note: 'Gemini service unreachable; serving local fallback scenario.'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: unknown) {
    const error = err as { message?: string };
    const defaultScenario = fallbackSimulatorBank[0];
    return new Response(
      JSON.stringify({
        scenario: defaultScenario,
        source: 'local_fallback',
        error: error.message
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
