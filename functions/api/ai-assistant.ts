declare const process: { env?: Record<string, string | undefined> } | undefined;

interface Env {
  GEMINI_API_KEY?: string;
}

function generateSmartResponse(prompt: string): string {
  const lower = prompt.toLowerCase().trim();
  const isHindiOrHinglish = /kya|hai|kaise|kese|kaisey|bhai|mujhe|nahi|kare|karna|samjha|batao|apna|mera|meri|karein|haal|theek|kuch|tu|tum|aap|ho|hain|karo|banao|rakhu|rakhein|sun/.test(lower);

  // 1. GREETINGS & CASUAL CONVERSATION
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
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const body = (await context.request.json()) as { prompt?: string };
    const prompt = body.prompt;

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Server-side only: never expose or accept client-side VITE_ keys
    const apiKey = (
      context.env.GEMINI_API_KEY ||
      (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
      ''
    ).trim();

    if (!apiKey) {
      const fallbackReply = generateSmartResponse(prompt);
      return new Response(
        JSON.stringify({ reply: fallbackReply }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const systemInstruction = 
      "You are PrivSecure AI Assistant, an intelligent digital safety and privacy helper designed for students, youth, and everyday internet users.\n\n" +
      "CRITICAL RULE #1: UNDERSTAND USER INTENT FIRST BEFORE ANSWERING\n" +
      "- Classify the user's message intent:\n" +
      "  1. GREETINGS & CASUAL TALK (e.g. 'hey tum kese ho', 'hi', 'hello', 'how are you', 'aur kya chal raha hai'):\n" +
      "     Respond NATURALLY, politely, and warmly in the user's language. Example: 'Hey! Main bilkul theek hoon 😊 Tum kaise ho? Aaj kis cheez mein help chahiye?' DO NOT force generic cybersecurity/privacy lectures on simple greetings!\n" +
      "  2. CAPABILITIES / WHO ARE YOU (e.g. 'bhai tu kya kar sakta hai?', 'what can you do?', 'who are you?'):\n" +
      "     Explain clearly that you are the PrivSecure AI Assistant and can guide them on social media privacy (Instagram/Snapchat), spotting phishing & scam links, creating unbreakable passwords, 2FA, avoiding OTP scams, and checking oversharing risks.\n" +
      "  3. SPECIFIC TOPIC QUESTIONS (e.g. 'bhai phishing kya hota hai?', 'what is oversharing?', 'mera Instagram account safe kaise rakhu?', 'ye link safe hai?'):\n" +
      "     Answer the specific question directly, practically, and concisely with concrete advice.\n" +
      "  4. GENERAL QUESTIONS: Answer helpfully and naturally without forcing an unrelated privacy template.\n\n" +
      "CRITICAL RULE #2: NATURAL LANGUAGE & TONE MATCHING\n" +
      "- English question -> Clear, friendly English response.\n" +
      "- Hindi (Devanagari) -> Natural, fluent Hindi response.\n" +
      "- Hinglish (Hindi in Roman script, e.g. 'bhai phishing kya hota hai', 'hey tum kese ho', 'mera account safe hai kya'):\n" +
      "  Respond in natural, friendly, conversational Hinglish (e.g. 'Hey! Main badhiya hoon 😊' or 'Bhai, phishing ek online fraud hota hai jahan...').\n" +
      "- Mixed Hindi + English -> Respond in the same natural mixed style.\n\n" +
      "CRITICAL RULE #3: SAFETY & INTEGRITY\n" +
      "- NEVER ask for, store, or accept user passwords, bank details, or OTPs.";

    // Supported candidate models: standard production models with Gemini 3 family fallback
    const candidateModels = [
      "gemini-2.5-flash",
      "gemini-2.5-flash-lite",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-3.8-flash",
      "gemini-3.5-flash-lite",
      "gemini-3.1-flash-lite"
    ];

    const requestBody = {
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}` }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800
      }
    };

    let reply: string | null = null;
    let lastErrorText = "";

    for (const model of candidateModels) {
      const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
      try {
        const response = await fetch(geminiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify(requestBody)
        });

        if (response.ok) {
          const data = (await response.json()) as {
            candidates?: Array<{
              content?: {
                parts?: Array<{ text?: string }>;
              };
            }>;
          };
          reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
          if (reply) {
            break;
          }
        } else {
          lastErrorText = await response.text();
          console.warn(`Model ${model} returned ${response.status}: ${lastErrorText}`);
        }
      } catch (fetchErr: unknown) {
        const err = fetchErr as { message?: string };
        lastErrorText = err.message || 'Fetch error';
        console.warn(`Fetch error for ${model}: ${lastErrorText}`);
      }
    }

    if (!reply) {
      const fallbackReply = generateSmartResponse(prompt);
      return new Response(
        JSON.stringify({ reply: fallbackReply }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: unknown) {
    const error = err as { message?: string };
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
