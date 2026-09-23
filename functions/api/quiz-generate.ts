declare const process: { env?: Record<string, string | undefined> } | undefined;

interface Env {
  GEMINI_API_KEY?: string;
}

interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty?: string;
}

// Local fallback bank of 25 comprehensive, unique questions
const fallbackQuestionBank: QuizQuestion[] = [
  {
    id: 'fb_q1',
    category: 'Oversharing',
    question: 'Which of the following pieces of information is the most dangerous to share publicly on social media?',
    options: [
      'Your favorite movie or food review',
      'A photo of your boarding pass showing barcode and flight number',
      'A picture of your pet playing in the park',
      'Your weekend gaming achievement'
    ],
    correctIndex: 1,
    explanation: 'Boarding passes contain a 2D barcode and booking reference (PNR) that can be decoded to reveal your full name, passport details, frequent flyer ID, and allows unauthorized persons to alter or cancel your flight.',
    difficulty: 'Easy'
  },
  {
    id: 'fb_q2',
    category: 'Two-Factor Authentication',
    question: 'Which type of Two-Factor Authentication (2FA) provides the highest defense against SIM-swapping attacks?',
    options: [
      'SMS text message OTP code',
      'Automated phone call OTP',
      'Authenticator App (e.g. Google / Microsoft Authenticator) or Hardware Security Key',
      'Security questions (e.g. "What is your mother’s maiden name?")'
    ],
    correctIndex: 2,
    explanation: 'Authenticator apps generate time-based one-time passwords (TOTP) directly on your device without relying on cellular networks, making them immune to SIM swap scams where hackers take over your phone number.',
    difficulty: 'Medium'
  },
  {
    id: 'fb_q3',
    category: 'Phishing',
    question: 'A friend on Instagram sends you a DM saying: "Hey, I entered a contest and need 2 votes! I sent a code to your phone, please tell me the code so my vote counts!" What is actually happening?',
    options: [
      'They are telling the truth and need your help in a genuine brand contest.',
      'Their account is compromised, and the code sent to your phone is an OTP to reset YOUR account password.',
      'It is an automated Instagram system survey for rewards.',
      'You are being invited to become a verified brand ambassador.'
    ],
    correctIndex: 1,
    explanation: 'This is a notorious Instagram takeover tactic. The hacker entered your username on the login screen, triggered a password reset or 2FA code to your phone, and is tricking you into handing over the code.',
    difficulty: 'Medium'
  },
  {
    id: 'fb_q4',
    category: 'Password Security',
    question: 'What makes a password most resilient against modern brute-force and dictionary cracking tools?',
    options: [
      'Replacing letter "e" with "3" in a common word (e.g. "P@ssw0rd3")',
      'Using your birth year and pet name combined',
      'A long passphrase made of 4+ random, unrelated words (e.g. "galaxy-kettle-drift-meadow")',
      'A short 6-letter complex sequence'
    ],
    correctIndex: 2,
    explanation: 'Length and entropy beat predictable character substitutions. Cracking algorithms test common character substitutions (like @ for a) in milliseconds, while a 16+ character multi-word passphrase creates astronomical entropy.',
    difficulty: 'Easy'
  },
  {
    id: 'fb_q5',
    category: 'Location Privacy',
    question: 'What is the safest practice when you want to share photos from a vacation or popular cafe?',
    options: [
      'Tag the exact cafe live while you are still sitting at the table.',
      'Share your live location in your story so friends can drop by.',
      'Post the photos after you have left the venue or returned home from the trip.',
      'Turn on public Snapchat Snap Map without Ghost Mode.'
    ],
    correctIndex: 2,
    explanation: 'Delayed posting ensures you do not announce your real-time physical coordinates, protecting you from physical stalking and ensuring malicious actors do not know your home is currently unoccupied.',
    difficulty: 'Easy'
  },
  {
    id: 'fb_q6',
    category: 'App Permissions',
    question: 'Why should you avoid granting "Allow all the time" location permissions to social media apps?',
    options: [
      'It drains battery slightly faster.',
      'It enables the app to continuously track and log your movements in the background even when the app is closed.',
      'It slows down your Wi-Fi speeds.',
      'It automatically sends your GPS to all your followers.'
    ],
    correctIndex: 1,
    explanation: '"Allow all the time" lets apps build an extensive background log of your physical routines, medical clinics visited, residential areas, and commute patterns for behavioral data harvesting and ad targeting.',
    difficulty: 'Medium'
  },
  {
    id: 'fb_q7',
    category: 'Phishing',
    question: 'You receive a WhatsApp message from an unknown number with a bank logo stating your account will be blocked unless you install an attached APK file for eKYC. What should you do?',
    options: [
      'Install the APK immediately to prevent your account from being frozen.',
      'Forward the APK file to family members to verify.',
      'Delete the message, block the number, and never install APK files sent through messaging apps.',
      'Open the APK in airplane mode to inspect it.'
    ],
    correctIndex: 2,
    explanation: 'Banks never distribute official updates via APK files on WhatsApp. These malicious APKs are Remote Access Trojans (RATs) designed to steal SMS OTPs and control your device remotely.',
    difficulty: 'Medium'
  },
  {
    id: 'fb_q8',
    category: 'Social Engineering',
    question: 'What is "Oversharing" in the context of digital security?',
    options: [
      'Sending too many text messages to a group chat.',
      'Publicly broadcasting personal details (routine, address, tickets, ID numbers) that can be weaponized against you.',
      'Using more than two social media apps at once.',
      'Streaming high-resolution video games.'
    ],
    correctIndex: 1,
    explanation: 'Oversharing provides attackers with the raw puzzle pieces needed for spear phishing, answering your security questions, forging identity documents, or tracking you in real life.',
    difficulty: 'Easy'
  },
  {
    id: 'fb_q9',
    category: 'Account Security',
    question: 'If you suspect someone has unauthorized access to your social media account, what should be your immediate first action?',
    options: [
      'Post an angry story confronting the intruder.',
      'Delete the app and reinstall it tomorrow.',
      'Change your password immediately and select "Log out of all other devices / sessions".',
      'Wait a week to see if anything else happens.'
    ],
    correctIndex: 2,
    explanation: 'Changing your password and terminating all active sessions immediately invalidates any hijacked authentication tokens on the hacker’s device, kicking them out before they can lock you out.',
    difficulty: 'Medium'
  },
  {
    id: 'fb_q10',
    category: 'Digital Footprint',
    question: 'Is deleting a post or story guaranteed to permanently erase that data from the internet?',
    options: [
      'Yes, once deleted from Instagram it disappears completely from reality.',
      'No, because other users could have screenshotted it, scrapers may have cached it, and server logs retain backups.',
      'Yes, provided it was only up for less than 10 minutes.',
      'Yes, if your account is private.'
    ],
    correctIndex: 1,
    explanation: 'Once information is transmitted to any public or semi-public network, it can be screenshotted, downloaded, or indexed within seconds. "Think Before You Share" is the golden rule of digital privacy.',
    difficulty: 'Easy'
  },
  {
    id: 'fb_q11',
    category: 'Privacy Settings',
    question: 'What happens when your social media profile is set to "Public" instead of "Private"?',
    options: [
      'Only mutual friends can view your photos and stories.',
      'Anyone on the internet, including automated scrapers and non-users, can view, download, and index your content.',
      'Your posts are automatically translated into 50 languages.',
      'You are given verified badge status automatically.'
    ],
    correctIndex: 1,
    explanation: 'Public accounts allow anyone—including automated data brokers, scrapers, and malicious stalkers—to compile photos and details without you ever knowing.',
    difficulty: 'Easy'
  },
  {
    id: 'fb_q12',
    category: 'Password Security',
    question: 'Why is reusing the same master password across Instagram, email, and shopping websites extremely risky?',
    options: [
      'Websites will detect duplicate passwords and suspend your account.',
      'If one single website suffers a data breach, attackers will test that password on all your other accounts (credential stuffing).',
      'It makes your keyboard wear out faster.',
      'Password managers refuse to save duplicate passwords.'
    ],
    correctIndex: 1,
    explanation: 'Credential stuffing is an automated attack where bots test username/password pairs leaked from one breached service against hundreds of popular platforms.',
    difficulty: 'Medium'
  },
  {
    id: 'fb_q13',
    category: 'Phishing',
    question: 'You receive an urgent DM: "Instagram Copyright Infringement Notice: Your account will be disabled in 24 hours. Click here to appeal: bit.ly/ig-appeal-form". How should you respond?',
    options: [
      'Click the link immediately to verify your copyright innocence.',
      'Ignore and report the message; official Meta copyright notices appear in Settings > Help > Support Requests, never via direct messages.',
      'Reply to the DM with a copy of your government ID.',
      'Pay the fee mentioned in the link to remove the strike.'
    ],
    correctIndex: 1,
    explanation: 'Meta never sends copyright infringement notices through direct chat DMs or shortened bit.ly links. These are phishing pages designed to steal login credentials.',
    difficulty: 'Medium'
  },
  {
    id: 'fb_q14',
    category: 'Oversharing',
    question: 'Why should you avoid posting photos of your house keys or newly purchased car keys?',
    options: [
      'It makes the key look unattractive.',
      'High-resolution key photos can be optically measured and duplicated with 3D printers or code cutting machines.',
      'Key manufacturers will void your key warranty.',
      'Car keys contain radio signals that transmit through pictures.'
    ],
    correctIndex: 1,
    explanation: 'Locksmiths and burglars can reconstruct physical keys purely from standard photographs by measuring bitting depths against standard keyway blanks.',
    difficulty: 'Hard'
  },
  {
    id: 'fb_q15',
    category: 'Two-Factor Authentication',
    question: 'What is a "Backup / Recovery Code" in Two-Factor Authentication, and where should you store it?',
    options: [
      'A code you post on your profile bio so you do not forget it.',
      'One-time bypass codes generated when setting up 2FA, which should be stored offline in a secure notebook or password vault.',
      'The phone number of your cellular carrier customer care.',
      'The serial number printed on your SIM card.'
    ],
    correctIndex: 1,
    explanation: 'Recovery codes allow you to regain account access if you lose your phone or authenticator app. They must be stored offline or in a secure password vault.',
    difficulty: 'Medium'
  },
  {
    id: 'fb_q16',
    category: 'Social Engineering',
    question: 'A viral quiz on Facebook asks: "Find your Superhero Name! Combine your first pet\'s name with your mother\'s maiden name!" What is the real motive?',
    options: [
      'Entertainment and community building.',
      'Harvesting answers to common security recovery questions to breach accounts.',
      'Testing your knowledge of comic book history.',
      'Optimizing your Facebook feed algorithm.'
    ],
    correctIndex: 1,
    explanation: 'Casual social media surveys and games frequently trick users into publicly revealing answers to standard banking and email security questions.',
    difficulty: 'Easy'
  },
  {
    id: 'fb_q17',
    category: 'Location Privacy',
    question: 'On Snapchat, what does enabling "Ghost Mode" on the Snap Map do?',
    options: [
      'Makes your avatar invisible in direct messages.',
      'Completely prevents all friends and public users from seeing your real-time physical GPS location on the map.',
      'Sends spooky filters to your contacts automatically.',
      'Deletes your old chat history every midnight.'
    ],
    correctIndex: 1,
    explanation: 'Ghost Mode conceals your physical coordinates on the Snap Map so no one can track where you are located.',
    difficulty: 'Easy'
  },
  {
    id: 'fb_q18',
    category: 'App Permissions',
    question: 'Why should you review third-party apps connected to your Google or social media account?',
    options: [
      'Connected apps may retain permanent read/write access to your profile, contacts, or drive even years after you stopped using them.',
      'They make your internet connection slower.',
      'Connected apps can see your physical computer screen.',
      'They will charge your bank account every month.'
    ],
    correctIndex: 0,
    explanation: 'Old games, quizzes, and websites connected via "Sign in with Google/Facebook" often retain broad OAuth scopes and should be audited and revoked periodically.',
    difficulty: 'Medium'
  },
  {
    id: 'fb_q19',
    category: 'Digital Footprint',
    question: 'What is "Doxxing" in social media and cyber safety?',
    options: [
      'Creating multiple social media accounts for business.',
      'Maliciously compiling and publishing an individual’s private personal information (home address, phone, family, employer) online without consent.',
      'Converting text messages into PDF documents.',
      'Using a virtual private network (VPN) while browsing.'
    ],
    correctIndex: 1,
    explanation: 'Doxxing is the non-consensual public release of private identifiers to encourage harassment, swatting, or physical intimidation against a victim.',
    difficulty: 'Easy'
  },
  {
    id: 'fb_q20',
    category: 'Account Security',
    question: 'What should you do if an unfamiliar device from another city appears under "Logged-In Devices" in your account settings?',
    options: [
      'Send a friendly message to the device asking who is using it.',
      'Immediately click "Log Out" on that session and change your password.',
      'Wait until you receive an email before taking any action.',
      'Leave it logged in if it is an iPhone or Mac.'
    ],
    correctIndex: 1,
    explanation: 'An unknown session indicates someone has acquired your credentials or session cookies. Revoke the session immediately and update your password and 2FA.',
    difficulty: 'Medium'
  }
];

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function extractJsonFromText(rawText: string): unknown {
  if (!rawText) return null;
  let text = rawText.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  }
  try {
    return JSON.parse(text);
  } catch {
    const firstBracket = text.indexOf("[");
    const lastBracket = text.lastIndexOf("]");
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
      try {
        return JSON.parse(text.substring(firstBracket, lastBracket + 1));
      } catch {
        return null;
      }
    }
  }
  return null;
}

/**
 * Validates whether a generated question meets all structural criteria:
 * - Non-empty question
 * - Exactly 4 distinct options
 * - Valid correctIndex (0..3)
 * - Non-empty explanation
 * - Non-empty category
 */
function isValidQuestion(q: Partial<QuizQuestion>): q is QuizQuestion {
  return Boolean(
    q &&
    typeof q.question === 'string' && q.question.trim().length > 10 &&
    Array.isArray(q.options) && q.options.length === 4 &&
    q.options.every((opt) => typeof opt === 'string' && opt.trim().length > 0) &&
    typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex < 4 &&
    typeof q.explanation === 'string' && q.explanation.trim().length > 10
  );
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    let excludeIds: string[] = [];
    let sessionSeed = Date.now().toString(36);
    try {
      const body = (await context.request.json()) as { excludeIds?: string[]; sessionSeed?: string };
      if (Array.isArray(body?.excludeIds)) {
        excludeIds = body.excludeIds;
      }
      if (body?.sessionSeed) {
        sessionSeed = String(body.sessionSeed);
      }
    } catch {
      // Body may be empty
    }

    const apiKey = (
      context.env.GEMINI_API_KEY ||
      (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
      ''
    ).trim();

    // Helper: Select exactly 10 unique fallback questions excluding recent IDs
    const getTenFallback = (): QuizQuestion[] => {
      const excludeSet = new Set(excludeIds);
      const filtered = fallbackQuestionBank.filter((q) => !excludeSet.has(q.id));
      const pool = filtered.length >= 10 ? filtered : fallbackQuestionBank;
      return shuffle(pool).slice(0, 10);
    };

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          questions: getTenFallback(),
          source: 'local_fallback',
          count: 10,
          note: 'Serving 10 verified unique local fallback questions.'
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

    const topicFoci = [
      "social media oversharing, vacation location leaks, Instagram DM scams, and WhatsApp forward traps",
      "two-factor authentication bypass, SIM swapping, public Wi-Fi risks, and password manager best practices",
      "third-party app permissions, suspicious links, phishing red flags, and digital footprint permanence",
      "fake customer care numbers, OTP social engineering, suspicious QR codes, and device screen sharing risks",
      "impersonation accounts, private vs public profile settings, photo metadata (EXIF), and browser extension hygiene"
    ];
    const selectedFocus = topicFoci[Math.floor(Math.random() * topicFoci.length)];

    // Request 13 questions from Gemini with dynamic topic seed to guarantee variety
    const prompt = `You are PrivSecure's Professional Cyber Safety Educator.
Generate exactly 13 completely fresh, unique, high-quality, practical multiple-choice questions for community learners and students.
Session identifier: ${sessionSeed}-${Date.now()}
Special emphasis for this session: ${selectedFocus}.

STRICT REQUIREMENTS:
1. Generate exactly 13 distinct questions covering different practical scenarios (Phishing, Oversharing, 2FA, Passwords, Location, Settings, App Permissions, Social Engineering).
2. Exactly 4 clear, plausible options per question.
3. Exactly ONE clearly correct and safest option.
4. 'correctIndex' MUST be an integer: 0, 1, 2, or 3 pointing to the correct option in 'options'.
5. Provide a clear educational explanation of why the correct option is safest.
6. Absolutely NO DUPLICATE questions.

Return ONLY a valid JSON array of objects matching this exact structure:
[
  {
    "id": "q1",
    "category": "Oversharing | Phishing | Two-Factor Authentication | Password Security | Location Privacy | App Permissions | Account Security | Digital Footprint",
    "question": "Clear realistic scenario question",
    "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
    "correctIndex": 0,
    "explanation": "Clear explanation of why this answer is correct and safest",
    "difficulty": "Easy | Medium | Hard"
  }
]`;

    const validQuestions: QuizQuestion[] = [];
    const seenNormalizedTitles = new Set<string>();

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
              temperature: 0.95,
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
            const rawList = extractJsonFromText(text);
            if (Array.isArray(rawList)) {
              for (const item of rawList) {
                if (isValidQuestion(item)) {
                  const normalized = item.question.toLowerCase().replace(/[^a-z0-9]/g, '');
                  if (!seenNormalizedTitles.has(normalized)) {
                    seenNormalizedTitles.add(normalized);
                    validQuestions.push({
                      id: `ai_${Date.now()}_${validQuestions.length + 1}`,
                      category: item.category || 'Digital Safety',
                      question: item.question.trim(),
                      options: item.options.map((o: string) => o.trim()),
                      correctIndex: item.correctIndex,
                      explanation: item.explanation.trim(),
                      difficulty: item.difficulty || 'Medium'
                    });
                  }
                }
                if (validQuestions.length >= 10) break;
              }
              if (validQuestions.length >= 10) break;
            }
          }
        }
      } catch {
        // Continue to fallback model
      }
    }

    // Step: Guarantee EXACTLY 10 questions
    // If Gemini produced fewer than 10 valid questions, supplement from unique fallback questions
    if (validQuestions.length < 10) {
      const shuffledFallback = shuffle(fallbackQuestionBank);
      for (const fb of shuffledFallback) {
        const normalized = fb.question.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (!seenNormalizedTitles.has(normalized)) {
          seenNormalizedTitles.add(normalized);
          validQuestions.push(fb);
        }
        if (validQuestions.length === 10) break;
      }
    }

    // Final slice guarantees exactly 10 questions
    const finalTenQuestions = validQuestions.slice(0, 10);

    return new Response(
      JSON.stringify({
        questions: finalTenQuestions,
        count: finalTenQuestions.length,
        source: validQuestions.length >= 10 && !finalTenQuestions.some((q) => q.id.startsWith('fb_')) ? 'gemini' : 'gemini_supplemented'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: unknown) {
    const error = err as { message?: string };
    const emergencyTen = shuffle(fallbackQuestionBank).slice(0, 10);
    return new Response(
      JSON.stringify({
        questions: emergencyTen,
        count: emergencyTen.length,
        source: 'local_fallback',
        error: error.message
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
