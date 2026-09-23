import type { AssessmentQuestion } from '../types';

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'profile_visibility',
    category: 'profile',
    title: 'Profile Visibility',
    subtitle: 'Is your primary social media profile public to anyone on the internet?',
    options: [
      {
        label: 'Yes, my profile is completely Public',
        description: 'Anyone can view my posts, follower lists, stories, and tagged photos.',
        riskWeight: 85,
        triggersRisk: {
          title: 'Publicly Exposed Profile',
          description: 'Your photos, stories, and connections are openly accessible to strangers, scrapers, and potential stalkers.',
          severity: 'critical',
          impact: 'Data scraping, impersonation account creation, stalking, and social engineering.'
        },
        recommendedAction: {
          title: 'Switch Profile to Private',
          description: 'In your Instagram/Facebook/Snapchat settings, change your account privacy from Public to Private so only approved followers see your content.',
          priority: 'critical'
        }
      },
      {
        label: 'No, my profile is set to Private',
        description: 'Only users whom I explicitly approve as followers can see my content.',
        riskWeight: 10
      },
      {
        label: "I'm not sure / some are public, some private",
        description: 'I haven’t specifically audited my visibility settings recently.',
        riskWeight: 60,
        triggersRisk: {
          title: 'Unverified Profile Visibility',
          description: 'You may be broadcasting private moments to public feeds without knowing.',
          severity: 'moderate',
          impact: 'Unintentional leak of personal media and metadata.'
        },
        recommendedAction: {
          title: 'Audit Profile Visibility Settings',
          description: 'Inspect privacy settings across all active social accounts to confirm private status.',
          priority: 'medium'
        }
      }
    ]
  },
  {
    id: 'personal_info_sharing',
    category: 'oversharing',
    title: 'Personal Contact & Bio Details',
    subtitle: 'Do you publicly share your phone number, personal email, or date of birth in your bio or posts?',
    options: [
      {
        label: 'Yes, in my bio or publicly visible about section',
        description: 'My email, phone, or exact birthday is visible on my profile.',
        riskWeight: 90,
        triggersRisk: {
          title: 'Exposed Contact Information in Public Bio',
          description: 'Publishing phone numbers and email addresses enables SIM-swapping, targeted phishing, and credential stuffing.',
          severity: 'critical',
          impact: 'Targeted spam, SIM swapping, identity theft, and password reset attacks.'
        },
        recommendedAction: {
          title: 'Remove Contact Information from Bio',
          description: 'Strip phone numbers, personal email addresses, and full birthdates from public bio fields.',
          priority: 'critical'
        }
      },
      {
        label: 'Only with close friends / private contacts',
        description: 'Shared only via direct encrypted chats or hidden fields.',
        riskWeight: 20
      },
      {
        label: 'Never, I keep contact details strictly hidden',
        description: 'No contact information is publicly displayed.',
        riskWeight: 0
      }
    ]
  },
  {
    id: 'live_location',
    category: 'location',
    title: 'Real-Time Location Sharing',
    subtitle: 'Do you share your live location or tag your exact current location in stories and posts while still there?',
    options: [
      {
        label: 'Frequently / Almost every outing',
        description: 'I tag cafes, gym, college, or share real-time Snapchat Snap Map location.',
        riskWeight: 95,
        triggersRisk: {
          title: 'Real-Time Physical Location Broadcasting',
          description: 'Sharing real-time whereabouts broadcasts when you are away from home and reveals your daily routine.',
          severity: 'critical',
          impact: 'Physical stalking, home burglary during travels, and routine profiling.'
        },
        recommendedAction: {
          title: 'Disable Live Location & Snap Map',
          description: 'Turn on "Ghost Mode" on Snapchat, disable location tags on stories until after you have left the venue.',
          priority: 'critical',
          platform: 'Snapchat & Instagram'
        }
      },
      {
        label: 'Sometimes / Only with close friends',
        description: 'Occasional check-ins or delayed tags.',
        riskWeight: 50,
        triggersRisk: {
          title: 'Intermittent Location Tagging',
          description: 'Even delayed tags build a predictable geo-map of your regular hangout spots and workplace.',
          severity: 'moderate',
          impact: 'Pattern-of-life analysis and geolocation tracking.'
        },
        recommendedAction: {
          title: 'Delay Location Tagging',
          description: 'Post photos and venue tags after leaving the location to prevent live tracking.',
          priority: 'medium'
        }
      },
      {
        label: 'Never, I post after leaving or keep location turned off',
        description: 'I avoid tagging specific real-time locations.',
        riskWeight: 5
      }
    ]
  },
  {
    id: 'unknown_contacts',
    category: 'account',
    title: 'Unknown Friend & Follow Requests',
    subtitle: "Do you accept friend or follow requests from people you don't personally know?",
    options: [
      {
        label: 'Often, to increase my followers and connections',
        description: 'I generally accept most requests.',
        riskWeight: 80,
        triggersRisk: {
          title: 'Accepting Unknown Contacts & Bots',
          description: 'Scammers frequently create fake profiles with mutual friends to infiltrate private feeds and scrape photos.',
          severity: 'high',
          impact: 'Direct access to your stories, photo scraping, and spear-phishing attacks.'
        },
        recommendedAction: {
          title: 'Prune Follower List & Reject Strangers',
          description: 'Audit your followers list. Remove unknown accounts, bots, and suspicious profiles.',
          priority: 'high'
        }
      },
      {
        label: 'Sometimes, if we have mutual friends or common interests',
        description: 'I review their profile quickly first.',
        riskWeight: 45,
        triggersRisk: {
          title: 'Trusting Mutual Friend Illusion',
          description: 'Bots often friend multiple people in the same college/circle to appear legitimate.',
          severity: 'moderate',
          impact: 'Infiltration by impersonation bots.'
        },
        recommendedAction: {
          title: 'Verify Before Accepting',
          description: 'Verify unfamiliar profiles by sending a private message or checking offline before granting access.',
          priority: 'medium'
        }
      },
      {
        label: 'Never, strictly people I know in real life',
        description: 'I reject or ignore all unrecognized requests.',
        riskWeight: 0
      }
    ]
  },
  {
    id: 'password_reuse',
    category: 'password',
    title: 'Password Habits & Reuse',
    subtitle: 'Do you use the same or similar passwords across multiple social media accounts and apps?',
    options: [
      {
        label: 'Yes, I use the same 1 or 2 passwords for almost everything',
        description: 'It is too hard to remember different passwords for every site.',
        riskWeight: 95,
        triggersRisk: {
          title: 'Severe Password Reuse (Credential Stuffing Risk)',
          description: 'If a single low-security site gets breached, hackers test those credentials on Instagram, Google, and banking.',
          severity: 'critical',
          impact: 'Total account takeover across all your platforms simultaneously.'
        },
        recommendedAction: {
          title: 'Adopt Unique Passwords & A Password Manager',
          description: 'Generate unique 14+ character passphrases for each account and use a password manager (Bitwarden / Apple Keychain).',
          priority: 'critical'
        }
      },
      {
        label: 'I use minor variations of the same base word (e.g. Pass123!, Pass2024)',
        description: 'Similar structure with changed numbers or symbols.',
        riskWeight: 70,
        triggersRisk: {
          title: 'Predictable Password Variations',
          description: 'Modern cracking tools easily generate wordlist mutations based on simple year/symbol swaps.',
          severity: 'high',
          impact: 'Fast automated dictionary attacks.'
        },
        recommendedAction: {
          title: 'Replace Password Variations with Passphrases',
          description: 'Switch to 3-4 random unlinked words (e.g., "velvet-comet-lantern-ocean").',
          priority: 'high'
        }
      },
      {
        label: 'No, every account has a unique, strong password',
        description: 'I use distinct passwords, ideally with a password manager.',
        riskWeight: 5
      }
    ]
  },
  {
    id: 'two_factor_auth',
    category: 'account',
    title: 'Two-Factor Authentication (2FA)',
    subtitle: 'Is Two-Factor Authentication (2FA / MFA) enabled on your primary accounts?',
    options: [
      {
        label: 'Yes, enabled via Authenticator App (Google/Microsoft Auth) or Hardware Key',
        description: 'Requires an authenticator code in addition to password.',
        riskWeight: 0
      },
      {
        label: 'Yes, enabled via SMS text message OTP',
        description: 'Receive SMS verification codes when logging in.',
        riskWeight: 25,
        recommendedAction: {
          title: 'Upgrade 2FA from SMS to Authenticator App',
          description: 'SMS is vulnerable to SIM-swapping. Move to Google Authenticator or Microsoft Authenticator.',
          priority: 'medium'
        }
      },
      {
        label: 'No, 2FA is turned off',
        description: 'I only use a single password to log in.',
        riskWeight: 90,
        triggersRisk: {
          title: 'No Two-Factor Authentication Protection',
          description: 'Without 2FA, anyone who discovers or guesses your password gets immediate, unrestricted access.',
          severity: 'critical',
          impact: 'High vulnerability to credential leaks, phishing, and automated takeovers.'
        },
        recommendedAction: {
          title: 'Enable Two-Factor Authentication (2FA) Now',
          description: 'Navigate to Account Settings > Security > Two-Factor Authentication on Instagram, Google, and WhatsApp.',
          priority: 'critical'
        }
      },
      {
        label: "I don't know what 2FA is / Not sure",
        description: 'Never configured any extra verification steps.',
        riskWeight: 80,
        triggersRisk: {
          title: 'Unprotected Accounts (2FA Missing)',
          description: 'Single-factor authentication leaves your accounts exposed to simple dictionary and credential stuffing attacks.',
          severity: 'high',
          impact: 'Instant account compromise upon password breach.'
        },
        recommendedAction: {
          title: 'Learn & Setup Two-Factor Authentication',
          description: 'Check our 2FA guide in the Learn tab and activate 2FA on WhatsApp and Instagram.',
          priority: 'high'
        }
      }
    ]
  },
  {
    id: 'links_and_dms',
    category: 'scam',
    title: 'Unknown Links & DMs',
    subtitle: 'Have you ever clicked a link sent in a DM (e.g., "Look who died in this video", "You won a prize", "Vote for me")?',
    options: [
      {
        label: 'Yes, I sometimes click out of curiosity or to check what it is',
        description: 'Even if the sender is unfamiliar or acting strangely.',
        riskWeight: 90,
        triggersRisk: {
          title: 'Vulnerable to Phishing & Drive-By Malware',
          description: 'Suspicious links in DMs frequently lead to fake login pages that harvest your session cookies or credentials.',
          severity: 'critical',
          impact: 'Session hijacking, phishing credential theft, and malware infection.'
        },
        recommendedAction: {
          title: 'Never Click Unverified Links in DMs',
          description: 'If a friend sends a weird link asking to vote or claim a prize, ask them in person first—their account might be hacked.',
          priority: 'critical'
        }
      },
      {
        label: 'Only if it comes from a verified brand or recognizable contact',
        description: 'I inspect the context, but might click if it looks genuine.',
        riskWeight: 40,
        triggersRisk: {
          title: 'Risk from Compromised Friend Accounts',
          description: 'Scammers frequently take over trusted friends’ accounts and blast malicious links to their whole contact list.',
          severity: 'moderate',
          impact: 'Spear phishing through trusted channels.'
        },
        recommendedAction: {
          title: 'Cross-Verify Urgent or Odd Requests',
          description: 'Call or message the friend on a different channel before interacting with unexpected links.',
          priority: 'medium'
        }
      },
      {
        label: 'Never, I ignore or delete suspicious links and report phishing',
        description: 'I treat all unexpected links with strict skepticism.',
        riskWeight: 5
      }
    ]
  },
  {
    id: 'app_permissions',
    category: 'profile',
    title: 'App Permissions & Third-Party Access',
    subtitle: 'Do you routinely review permissions (Camera, Microphone, Photos, Location, Contacts) granted to social apps?',
    options: [
      {
        label: 'No, I just click "Allow All" when installing apps and never check again',
        description: 'I rarely open my phone’s permission manager.',
        riskWeight: 80,
        triggersRisk: {
          title: 'Excessive App Permissions Granted',
          description: 'Apps may have continuous background access to microphone, precise GPS location, and your entire photo library.',
          severity: 'high',
          impact: 'Continuous background tracking and unintended data telemetry.'
        },
        recommendedAction: {
          title: 'Restrict App Permissions in Phone Settings',
          description: 'Open Phone Settings > Apps > Permissions. Change Location to "While Using App" and set Photos to "Selected Photos Only".',
          priority: 'high'
        }
      },
      {
        label: 'I review them occasionally or when prompted by OS updates',
        description: 'I try to limit what is unnecessary.',
        riskWeight: 35
      },
      {
        label: 'Yes, I strictly grant only minimum necessary permissions',
        description: 'I deny access to contacts, precise GPS, and background microphone.',
        riskWeight: 5
      }
    ]
  }
];
