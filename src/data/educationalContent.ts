import type { OvershareScenario, PhishingScenario } from '../types';

export const overshareScenarios: OvershareScenario[] = [
  {
    id: 'boarding_pass',
    title: 'Posting Boarding Pass / Flight Ticket',
    postContent: '✈️ "Off to Goa with the gang for 2 weeks! Paradise awaits! 🌴 #vacation #travel"',
    imageHint: 'Photo of airline boarding pass clearly showing name, flight number, booking reference (PNR), and 2D barcode.',
    riskLevel: 'critical',
    verdict: '🔴 Critical Risk — Never Post!',
    reasons: [
      'The 2D barcode contains full ticket details, passport info, and frequent flyer number.',
      'Anyone with your PNR code can log into the airline website, cancel your flight, or change seat assignments.',
      'It announces to the world that your home is empty for 2 weeks, inviting burglaries.'
    ],
    whatCouldHappen: 'Thieves know your house is vacant; identity thieves can access your travel itinerary and personal documents.'
  },
  {
    id: 'college_id',
    title: 'Posting College ID Card / Work Badge',
    postContent: '🎓 "First day at university! So excited for the journey ahead! 🚀 #studentlife #college"',
    imageHint: 'Selfie holding up student ID card showing student roll number, college branch, full legal name, and barcode.',
    riskLevel: 'critical',
    verdict: '🔴 Critical Risk — Highly Dangerous',
    reasons: [
      'Student roll numbers and campus IDs are commonly used for university portal authentication.',
      'Displays your physical daily routine and exact location on campus.',
      'Can be cloned for unauthorized campus entry or fraudulent student discounts.'
    ],
    whatCouldHappen: 'Physical stalking on campus and unauthorized access to student academic accounts.'
  },
  {
    id: 'new_car_keys',
    title: 'Posting New Car Keys & License Plate',
    postContent: '🚘 "Blessed! Bought my dream car today! Hard work pays off! 🙏✨"',
    imageHint: 'Keys in hand next to car with the vehicle registration plate and street visible in background.',
    riskLevel: 'caution',
    verdict: '🟠 High Risk — Blur Critical Details',
    reasons: [
      'High-resolution photos of physical car keys can be cloned with 3D printers or optical key decoders.',
      'License plate numbers can be used to look up owner registered home address in public transport registries.',
      'Reveals your neighborhood or parking spot.'
    ],
    whatCouldHappen: 'Vehicle tracking, key duplication, or targeted break-ins.'
  },
  {
    id: 'gym_checkin',
    title: 'Daily Live Gym Check-in at 7:00 AM',
    postContent: '💪 "Leg day at PowerFitness Downtown! Daily grind never stops. 🔥 (Location: PowerFitness Gym)"',
    imageHint: 'Posted live from the gym floor every weekday morning at the exact same hour.',
    riskLevel: 'caution',
    verdict: '🟠 Moderate to High Risk',
    reasons: [
      'Establishes a predictable pattern of life: someone knows where you are and when you leave your house.',
      'Allows unwanted individuals to intercept you physically during your commute.'
    ],
    whatCouldHappen: 'Stalking, targeted social engineering, or burglary while you are predictably away.'
  },
  {
    id: 'landscape_sunset',
    title: 'Sunset Photo Posted After Returning Home',
    postContent: '🌅 "Caught this magical sunset over the hills yesterday evening. Nature is healing."',
    imageHint: 'Scenery photo with no location tag, posted 24 hours after the trip concluded.',
    riskLevel: 'safe',
    verdict: '🟢 Safe to Share',
    reasons: [
      'Posted with delayed timing (you are no longer at the physical location).',
      'Contains no identifiable personal numbers, documents, or keys.',
      'Does not reveal private residential interiors or habits.'
    ],
    whatCouldHappen: 'Standard social sharing with minimal privacy exposure.'
  }
];

export const phishingScenarios: PhishingScenario[] = [
  {
    id: 'phish_instagram_copyright',
    sender: 'Instagram Support Official (@insta_help_desk_294)',
    platform: 'Instagram DM',
    avatarColor: '#e1306c',
    messageText: '⚠️ URGENT: Your account has been reported for trademark copyright infringement. Your profile will be permanently deleted within 24 hours. If you believe this is a mistake, verify your identity immediately: https://instagram-appeal-center-security.com/login',
    isPhishing: true,
    redFlags: [
      'Official Meta/Instagram never contacts users through direct messages for copyright issues (they use in-app notifications & official email).',
      'The URL "instagram-appeal-center-security.com" is a spoofed domain, not instagram.com.',
      'High urgency ("permanently deleted within 24 hours") designed to make you panic and type your password.'
    ],
    explanation: 'This is a classic credential harvesting attack. The fake link leads to an identical-looking login page where your password and 2FA codes are recorded.',
    recommendedAction: 'Do not click! Report the account as "Scam or Fraud" and block immediately.'
  },
  {
    id: 'phish_friend_voting',
    sender: 'High School Friend (@priya_sharma_98)',
    platform: 'Instagram DM',
    avatarColor: '#833ab4',
    messageText: 'Hey! Quick favor please 🙏 I entered an online photography ambassador contest and I only need 2 more votes to win! Can you please vote for me? I just sent a link to your phone number, please copy the code you got and send it to me so my vote counts! 🥺',
    isPhishing: true,
    redFlags: [
      'The "code sent to your phone" is actually YOUR OWN Instagram password reset or 2FA OTP code.',
      'The scammer has hacked Priya’s account and is trying to take over your account using SMS OTP forwarding.',
      'Emotional plea creating an artificial sense of innocent urgency.'
    ],
    explanation: 'Never share any OTP or SMS verification code with anyone—even friends or family! When they ask for a code, they are resetting YOUR login credentials.',
    recommendedAction: 'Call your friend on the phone or WhatsApp to warn them their account is compromised. Never forward OTPs.'
  },
  {
    id: 'phish_parcel_delivery',
    sender: '+91 98210 44921 (Post Alert)',
    platform: 'SMS',
    avatarColor: '#2563eb',
    messageText: 'SpeedPost Alert: Your parcel #IN948201 could not be delivered due to an incomplete house number. Please update your address and pay ₹25 re-delivery fee within 12 hours: http://indiapost-parcel-redirection.me/update',
    isPhishing: true,
    redFlags: [
      'Sent from an ordinary random mobile number, not official postal shortcodes.',
      'Suspicious domain ending in ".me" instead of official ".gov.in" or official logistics site.',
      'Small fee trap (₹25) designed to trick you into entering card/UPI details on a phishing gateway.'
    ],
    explanation: 'This is "Smishing" (SMS Phishing). The ₹25 payment page captures your debit card CVV or net banking credentials and empties your account.',
    recommendedAction: 'Delete the SMS and check directly on the official postal website using your original tracking number.'
  },
  {
    id: 'phish_bank_kyc',
    sender: 'HDFC-KYC Support (+91 93100 22109)',
    platform: 'WhatsApp',
    avatarColor: '#16a34a',
    messageText: 'Dear Customer, Your Bank Account and NetBanking will be suspended today due to pending PAN/KYC update. Download and install this quick APK application to complete video KYC: [HDFC_eKYC_Update.apk]',
    isPhishing: true,
    redFlags: [
      'Banks NEVER ask customers to install APK files through WhatsApp.',
      'The APK contains an Android Trojan / RAT (Remote Access Tool) that intercepts SMS OTPs and reads your screen.',
      'Threat of immediate account suspension.'
    ],
    explanation: 'Installing an APK from unknown sources bypasses Google Play Protect and gives cybercriminals full control over your smartphone and banking notifications.',
    recommendedAction: 'Block the sender, report to Cyber Crime Portal (cybercrime.gov.in / 1930), and never open APK files from chats.'
  }
];

export const emergencyPlaybooks = [
  {
    id: 'account_hacked',
    title: 'If Your Account Is Hacked / Compromised',
    icon: 'ShieldAlert',
    severity: 'critical',
    steps: [
      {
        action: 'Try to reset your password immediately',
        detail: 'Go to the login screen > "Forgot Password". If the hacker has not changed your email/phone yet, request a reset link and change the password immediately to a strong, unique 16-character passphrase.'
      },
      {
        action: 'Force sign-out of all active sessions',
        detail: 'In Instagram/Google/WhatsApp: Settings > Security > "Where you\'re logged in" (or "Active Sessions") > Select "Log out of all unknown devices".'
      },
      {
        action: 'Audit your recovery contact information',
        detail: 'Verify that the email address and phone number attached to your profile belong to you and were not replaced by the attacker.'
      },
      {
        action: 'Enable App-Based Two-Factor Authentication',
        detail: 'Turn on 2FA using Google Authenticator or Duo instead of SMS OTP.'
      },
      {
        action: 'Notify your friends and post a warning',
        detail: 'Use a secondary channel (e.g. WhatsApp status) to inform friends: "My Instagram was temporarily hacked. Please ignore any weird links or money requests sent from my profile."'
      }
    ]
  },
  {
    id: 'someone_impersonating',
    title: 'If Someone Is Impersonating You / Fake Profile',
    icon: 'UserX',
    severity: 'high',
    steps: [
      {
        action: 'Document and gather evidence',
        detail: 'Take full screenshots of the fake profile, including their exact username, bio, follower count, and any offensive posts or DMs they sent.'
      },
      {
        action: 'Report through the platform\'s official impersonation form',
        detail: 'On Instagram: Open fake profile > Tap Three Dots (...) > Report > "It\'s pretending to be someone else" > "Me". Meta may ask for a photo ID to verify ownership and take down the duplicate account.'
      },
      {
        action: 'Ask mutual friends to mass-report the fake profile',
        detail: 'Post on your story asking friends to report the fake account. Platforms process takedowns faster when multiple trusted users report fraudulent activity.'
      },
      {
        action: 'Check if your private photos were scraped',
        detail: 'Check what media was taken. If your real profile was public, immediately switch your real account to private.'
      }
    ]
  },
  {
    id: 'received_suspicious_link',
    title: 'If You Clicked a Suspicious Link or Entered Info',
    icon: 'AlertTriangle',
    severity: 'critical',
    steps: [
      {
        action: 'Immediately change your password from another browser/tab',
        detail: 'If you typed your password into the phishing page, immediately change your real account password before the hacker logs in.'
      },
      {
        action: 'Clear browser cookies and session cache',
        detail: 'Malicious links can attempt cookie theft. Clear browser cookies for that site and restart your browser.'
      },
      {
        action: 'Revoke Third-Party App Authorizations',
        detail: 'Check connected apps: Instagram > Settings > Apps and Websites. Remove any unrecognized third-party integrations.'
      },
      {
        action: 'Scan your device for malware if a file downloaded',
        detail: 'If the link triggered a download (e.g. .apk, .exe, .scr), do not open it. Delete the file from your Downloads folder and run a security scan.'
      }
    ]
  }
];
