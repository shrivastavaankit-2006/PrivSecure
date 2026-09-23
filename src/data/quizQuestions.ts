import type { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'Oversharing',
    question: 'Which of the following pieces of information is the most dangerous to share publicly on social media?',
    options: [
      'Your favorite movie or food review',
      'A photo of your boarding pass showing barcode and flight number',
      'A picture of your pet playing in the park',
      'Your weekend gaming achievement'
    ],
    correctIndex: 1,
    explanation: 'Boarding passes contain a 2D barcode and booking reference (PNR) that can be decoded to reveal your full name, passport details, frequent flyer ID, and allows unauthorized persons to alter or cancel your flight.'
  },
  {
    id: 'q2',
    category: 'Two-Factor Authentication',
    question: 'Which type of Two-Factor Authentication (2FA) provides the highest defense against SIM-swapping attacks?',
    options: [
      'SMS text message OTP code',
      'Automated phone call OTP',
      'Authenticator App (e.g. Google / Microsoft Authenticator) or Hardware Security Key',
      'Security questions (e.g. "What is your mother’s maiden name?")'
    ],
    correctIndex: 2,
    explanation: 'Authenticator apps generate time-based one-time passwords (TOTP) directly on your device without relying on cellular networks, making them immune to SIM swap scams where hackers take over your phone number.'
  },
  {
    id: 'q3',
    category: 'Phishing',
    question: 'A friend on Instagram sends you a DM saying: "Hey, I entered a contest and need 2 votes! I sent a code to your phone, please tell me the code so my vote counts!" What is actually happening?',
    options: [
      'They are telling the truth and need your help in a genuine brand contest.',
      'Their account is compromised, and the code sent to your phone is an OTP to reset YOUR account password.',
      'It is an automated Instagram system survey for rewards.',
      'You are being invited to become a verified brand ambassador.'
    ],
    correctIndex: 1,
    explanation: 'This is a notorious Instagram takeover tactic. The hacker entered your username on the login screen, triggered a password reset or 2FA code to your phone, and is tricking you into handing over the code.'
  },
  {
    id: 'q4',
    category: 'Password Security',
    question: 'What makes a password most resilient against modern brute-force and dictionary cracking tools?',
    options: [
      'Replacing letter "e" with "3" in a common word (e.g. "P@ssw0rd3")',
      'Using your birth year and pet name combined',
      'A long passphrase made of 4+ random, unrelated words (e.g. "galaxy-kettle-drift-meadow")',
      'A short 6-letter complex sequence'
    ],
    correctIndex: 2,
    explanation: 'Length and entropy beat predictable character substitutions. Cracking algorithms test common character substitutions (like @ for a) in milliseconds, while a 16+ character multi-word passphrase creates astronomical entropy.'
  },
  {
    id: 'q5',
    category: 'Location Privacy',
    question: 'What is the safest practice when you want to share photos from a vacation or popular cafe?',
    options: [
      'Tag the exact cafe live while you are still sitting at the table.',
      'Share your live location in your story so friends can drop by.',
      'Post the photos after you have left the venue or returned home from the trip.',
      'Turn on public Snapchat Snap Map without Ghost Mode.'
    ],
    correctIndex: 2,
    explanation: 'Delayed posting ensures you do not announce your real-time physical coordinates, protecting you from physical stalking and ensuring malicious actors do not know your home is currently unoccupied.'
  },
  {
    id: 'q6',
    category: 'App Permissions',
    question: 'Why should you avoid granting "Allow all the time" location permissions to social media apps?',
    options: [
      'It drains battery slightly faster.',
      'It enables the app to continuously track and log your movements in the background even when the app is closed.',
      'It slows down your Wi-Fi speeds.',
      'It automatically sends your GPS to all your followers.'
    ],
    correctIndex: 1,
    explanation: '"Allow all the time" lets apps build an extensive background log of your physical routines, medical clinics visited, residential areas, and commute patterns for behavioral data harvesting and ad targeting.'
  },
  {
    id: 'q7',
    category: 'Phishing',
    question: 'You receive a WhatsApp message from an unknown number with a bank logo stating your account will be blocked unless you install an attached APK file for eKYC. What should you do?',
    options: [
      'Install the APK immediately to prevent your account from being frozen.',
      'Forward the APK file to family members to verify.',
      'Delete the message, block the number, and never install APK files sent through messaging apps.',
      'Open the APK in airplane mode to inspect it.'
    ],
    correctIndex: 2,
    explanation: 'Banks never distribute official updates via APK files on WhatsApp. These malicious APKs are Remote Access Trojans (RATs) designed to steal SMS OTPs and control your device remotely.'
  },
  {
    id: 'q8',
    category: 'Social Engineering',
    question: 'What is "Oversharing" in the context of digital security?',
    options: [
      'Sending too many text messages to a group chat.',
      'Publicly broadcasting personal details (routine, address, tickets, ID numbers) that can be weaponized against you.',
      'Using more than two social media apps at once.',
      'Streaming high-resolution video games.'
    ],
    correctIndex: 1,
    explanation: 'Oversharing provides attackers with the raw puzzle pieces needed for spear phishing, answering your security questions, forging identity documents, or tracking you in real life.'
  },
  {
    id: 'q9',
    category: 'Account Security',
    question: 'If you suspect someone has unauthorized access to your social media account, what should be your immediate first action?',
    options: [
      'Post an angry story confronting the intruder.',
      'Delete the app and reinstall it tomorrow.',
      'Change your password immediately and select "Log out of all other devices / sessions".',
      'Wait a week to see if anything else happens.'
    ],
    correctIndex: 2,
    explanation: 'Changing your password and terminating all active sessions immediately invalidates any hijacked authentication tokens on the hacker’s device, kicking them out before they can lock you out.'
  },
  {
    id: 'q10',
    category: 'Digital Footprint',
    question: 'Is deleting a post or story guaranteed to permanently erase that data from the internet?',
    options: [
      'Yes, once deleted from Instagram it disappears completely from reality.',
      'No, because other users could have screenshotted it, scrapers may have cached it, and server logs retain backups.',
      'Yes, provided it was only up for less than 10 minutes.',
      'Yes, if your account is private.'
    ],
    correctIndex: 1,
    explanation: 'Once information is transmitted to any public or semi-public network, it can be screenshotted, downloaded, or indexed within seconds. "Think Before You Share" is the golden rule of digital privacy.'
  },
  {
    id: 'q11',
    category: 'Privacy Settings',
    question: 'What happens when your social media profile is set to "Public" instead of "Private"?',
    options: [
      'Only mutual friends can view your photos and stories.',
      'Anyone on the internet, including automated scrapers and non-users, can view, download, and index your content.',
      'Your posts are automatically translated into 50 languages.',
      'You are given verified badge status automatically.'
    ],
    correctIndex: 1,
    explanation: 'Public accounts allow anyone—including automated data brokers, scrapers, and malicious stalkers—to compile photos and details without you ever knowing.'
  },
  {
    id: 'q12',
    category: 'Password Security',
    question: 'Why is reusing the same master password across Instagram, email, and shopping websites extremely risky?',
    options: [
      'Websites will detect duplicate passwords and suspend your account.',
      'If one single website suffers a data breach, attackers will test that password on all your other accounts (credential stuffing).',
      'It makes your keyboard wear out faster.',
      'Password managers refuse to save duplicate passwords.'
    ],
    correctIndex: 1,
    explanation: 'Credential stuffing is an automated attack where bots test username/password pairs leaked from one breached service against hundreds of popular platforms.'
  },
  {
    id: 'q13',
    category: 'Phishing',
    question: 'You receive an urgent DM: "Instagram Copyright Infringement Notice: Your account will be disabled in 24 hours. Click here to appeal: bit.ly/ig-appeal-form". How should you respond?',
    options: [
      'Click the link immediately to verify your copyright innocence.',
      'Ignore and report the message; official Meta copyright notices appear in Settings > Help > Support Requests, never via direct messages.',
      'Reply to the DM with a copy of your government ID.',
      'Pay the fee mentioned in the link to remove the strike.'
    ],
    correctIndex: 1,
    explanation: 'Meta never sends copyright infringement notices through direct chat DMs or shortened bit.ly links. These are phishing pages designed to steal login credentials.'
  },
  {
    id: 'q14',
    category: 'Oversharing',
    question: 'Why should you avoid posting photos of your house keys or newly purchased car keys?',
    options: [
      'It makes the key look unattractive.',
      'High-resolution key photos can be optically measured and duplicated with 3D printers or code cutting machines.',
      'Key manufacturers will void your key warranty.',
      'Car keys contain radio signals that transmit through pictures.'
    ],
    correctIndex: 1,
    explanation: 'Locksmiths and burglars can reconstruct physical keys purely from standard photographs by measuring bitting depths against standard keyway blanks.'
  },
  {
    id: 'q15',
    category: 'Two-Factor Authentication',
    question: 'What is a "Backup / Recovery Code" in Two-Factor Authentication, and where should you store it?',
    options: [
      'A code you post on your profile bio so you do not forget it.',
      'One-time bypass codes generated when setting up 2FA, which should be stored offline in a secure notebook or password vault.',
      'The phone number of your cellular carrier customer care.',
      'The serial number printed on your SIM card.'
    ],
    correctIndex: 1,
    explanation: 'Recovery codes allow you to regain account access if you lose your phone or authenticator app. They must be stored offline or in a secure password vault.'
  },
  {
    id: 'q16',
    category: 'Social Engineering',
    question: 'A viral quiz on Facebook asks: "Find your Superhero Name! Combine your first pet\'s name with your mother\'s maiden name!" What is the real motive?',
    options: [
      'Entertainment and community building.',
      'Harvesting answers to common security recovery questions to breach accounts.',
      'Testing your knowledge of comic book history.',
      'Optimizing your Facebook feed algorithm.'
    ],
    correctIndex: 1,
    explanation: 'Casual social media surveys and games frequently trick users into publicly revealing answers to standard banking and email security questions.'
  },
  {
    id: 'q17',
    category: 'Location Privacy',
    question: 'On Snapchat, what does enabling "Ghost Mode" on the Snap Map do?',
    options: [
      'Makes your avatar invisible in direct messages.',
      'Completely prevents all friends and public users from seeing your real-time physical GPS location on the map.',
      'Sends spooky filters to your contacts automatically.',
      'Deletes your old chat history every midnight.'
    ],
    correctIndex: 1,
    explanation: 'Ghost Mode conceals your physical coordinates on the Snap Map so no one can track where you are located.'
  },
  {
    id: 'q18',
    category: 'App Permissions',
    question: 'Why should you review third-party apps connected to your Google or social media account?',
    options: [
      'Connected apps may retain permanent read/write access to your profile, contacts, or drive even years after you stopped using them.',
      'They make your internet connection slower.',
      'Connected apps can see your physical computer screen.',
      'They will charge your bank account every month.'
    ],
    correctIndex: 0,
    explanation: 'Old games, quizzes, and websites connected via "Sign in with Google/Facebook" often retain broad OAuth scopes and should be audited and revoked periodically.'
  },
  {
    id: 'q19',
    category: 'Digital Footprint',
    question: 'What is "Doxxing" in social media and cyber safety?',
    options: [
      'Creating multiple social media accounts for business.',
      'Maliciously compiling and publishing an individual’s private personal information (home address, phone, family, employer) online without consent.',
      'Converting text messages into PDF documents.',
      'Using a virtual private network (VPN) while browsing.'
    ],
    correctIndex: 1,
    explanation: 'Doxxing is the non-consensual public release of private identifiers to encourage harassment, swatting, or physical intimidation against a victim.'
  },
  {
    id: 'q20',
    category: 'Account Security',
    question: 'What should you do if an unfamiliar device from another city appears under "Logged-In Devices" in your account settings?',
    options: [
      'Send a friendly message to the device asking who is using it.',
      'Immediately click "Log Out" on that session and change your password.',
      'Wait until you receive an email before taking any action.',
      'Leave it logged in if it is an iPhone or Mac.'
    ],
    correctIndex: 1,
    explanation: 'An unknown session indicates someone has acquired your credentials or session cookies. Revoke the session immediately and update your password and 2FA.'
  },
  {
    id: 'q21',
    category: 'Privacy Settings',
    question: 'In WhatsApp, what is the privacy benefit of disabling "Read Receipts" (blue ticks) and "Last Seen"?',
    options: [
      'Messages will send faster over cellular data.',
      'It prevents contacts and stalkers from monitoring your active hours, sleeping patterns, and response status.',
      'It allows you to read deleted messages automatically.',
      'It stops WhatsApp from backing up your chats.'
    ],
    correctIndex: 1,
    explanation: 'Restricting Last Seen and Read Receipts stops intrusive contacts from monitoring your active schedule or pressuring you based on when you were online.'
  },
  {
    id: 'q22',
    category: 'Social Engineering',
    question: 'What is "Catfishing" on social media platforms?',
    options: [
      'Posting pictures of marine animals.',
      'Creating a completely deceptive online persona with stolen photos to lure victims into romance, emotional trust, or financial fraud.',
      'Using a pseudonym for privacy reasons while interacting honestly.',
      'Automated spam comments on YouTube videos.'
    ],
    correctIndex: 1,
    explanation: 'Catfishing involves orchestrating fake online identities using photos stolen from models or strangers to deceive and manipulate individuals.'
  },
  {
    id: 'q23',
    category: 'Password Security',
    question: 'What is a Password Manager, and why is it considered best practice by cybersecurity professionals?',
    options: [
      'A spreadsheet saved on your desktop named "passwords.xlsx".',
      'An encrypted vault that generates and remembers unique 20+ character passwords for every single website.',
      'A feature where browsers save passwords without any master password encryption.',
      'A person who writes your passwords down on paper.'
    ],
    correctIndex: 1,
    explanation: 'Dedicated password managers (like Bitwarden or 1Password) use zero-knowledge end-to-end encryption to generate and autofill strong, unique passwords across all your accounts.'
  },
  {
    id: 'q24',
    category: 'Two-Factor Authentication',
    question: 'If you lose your phone with your Authenticator App, how can you regain access to your account?',
    options: [
      'Contact the app developer to turn off security for you.',
      'Use one of the one-time Backup/Recovery Codes you saved during the initial 2FA setup.',
      'Buy a new phone and the codes will automatically appear without any backup.',
      'Wait 30 days for 2FA to expire automatically.'
    ],
    correctIndex: 1,
    explanation: 'Recovery codes are designed specifically as an emergency master key when your primary 2FA device is lost, damaged, or wiped.'
  },
  {
    id: 'q25',
    category: 'Digital Footprint',
    question: 'What is "Metadata" in a photo taken with a smartphone, and why can it be a privacy concern?',
    options: [
      'The file extension (.jpg or .png) of the image.',
      'Embedded EXIF data that can record the exact GPS coordinates, date, time, and camera device model where the photo was captured.',
      'The number of likes the photo receives on Instagram.',
      'The filter applied to the image.'
    ],
    correctIndex: 1,
    explanation: 'EXIF metadata embedded in raw photos can expose your exact home coordinates or child’s school location unless stripped by the platform or camera settings.'
  }
];

/**
 * Returns a randomized set of EXACTLY 10 unique questions from the fallback bank.
 * Ensures that different quiz sessions present fresh variety even when offline.
 */
export function getTenUniqueFallbackQuestions(excludeIds: string[] = []): QuizQuestion[] {
  const excludeSet = new Set(excludeIds);
  
  // Prioritize questions not recently seen
  const unseen = quizQuestions.filter((q) => !excludeSet.has(q.id));
  const pool = unseen.length >= 10 ? unseen : quizQuestions;
  
  // Fisher-Yates shuffle
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, 10);
}
