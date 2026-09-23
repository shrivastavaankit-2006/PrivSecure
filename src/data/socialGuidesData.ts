import type { SocialGuide } from '../types';

export const socialGuidesData: SocialGuide[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    badge: 'Photo & Story Privacy',
    color: '#e1306c',
    overview: 'Instagram has over 2 billion active users. Default settings often expose your activity status, exact story views, follower lists, and allow strangers to message or mention you without permission.',
    settings: [
      {
        feature: 'Account Privacy (Public vs Private)',
        risk: 'Public accounts allow anyone on the internet to screenshot photos, scrape bio data, view highlights, and track your daily movements.',
        recommended: 'Private Account',
        howTo: [
          'Go to your Profile > Tap Menu (3 lines in top right) > Settings and activity',
          'Under "Who can see your content", select "Account privacy"',
          'Toggle "Private account" ON',
          'Confirm "Switch to private"'
        ]
      },
      {
        feature: 'Story & Live Sharing',
        risk: 'Strangers can re-share your stories to their own feeds or forward private moments to unknown third parties.',
        recommended: 'Disable re-sharing and limit story replies',
        howTo: [
          'Go to Settings and activity > "Stories and reels"',
          'Turn OFF "Allow sharing to story" and "Allow sharing to messages"',
          'Set "Who can reply to stories" to "Only people you follow"'
        ]
      },
      {
        feature: 'Tags and Mentions Control',
        risk: 'Spam bots and crypto scammers tag you in giveaways or inappropriate posts without your consent.',
        recommended: 'Manual Tag Approval',
        howTo: [
          'Go to Settings and activity > "Tags and mentions"',
          'Under "Who can tag you", choose "Allow tags from people you follow"',
          'Enable "Manually approve tags" so you can reject unwanted tags before they appear on your profile'
        ]
      },
      {
        feature: 'Activity Status ("Active Now")',
        risk: 'Exposes exact timestamps of when you are awake, online, or actively checking messages.',
        recommended: 'Turn Off Activity Status',
        howTo: [
          'Go to Settings and activity > "Messages and story replies"',
          'Tap "Show activity status"',
          'Toggle OFF "Show activity status"'
        ]
      },
      {
        feature: 'Two-Factor Authentication (2FA)',
        risk: 'Password leaks allow instantaneous hijacking of your Instagram presence.',
        recommended: 'Authentication App 2FA Enabled',
        howTo: [
          'Go to Accounts Center > Password and security',
          'Tap "Two-factor authentication" > Select your Instagram account',
          'Select "Authentication app (recommended)" and link with Google Authenticator'
        ]
      }
    ]
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    badge: 'End-to-End Chat & Group Security',
    color: '#25d366',
    overview: 'While WhatsApp messages are end-to-end encrypted, profile pictures, last seen, read receipts, and unsolicited group additions can expose you to stalkers and spam groups.',
    settings: [
      {
        feature: 'Profile Photo & About Visibility',
        risk: 'Anyone who saves your phone number can view your profile photo and about status.',
        recommended: 'My Contacts (or My Contacts Except...)',
        howTo: [
          'Open WhatsApp > Settings > Privacy',
          'Tap "Profile photo" > Change to "My contacts"',
          'Tap "About" > Change to "My contacts"'
        ]
      },
      {
        feature: 'Group Add Permissions',
        risk: 'Scammers add your number to fraud investment, crypto, or lottery groups without your approval.',
        recommended: 'My Contacts Except...',
        howTo: [
          'Open WhatsApp > Settings > Privacy > Groups',
          'Change from "Everyone" to "My contacts" or "My contacts except..."',
          'Anyone not in your contacts will be forced to send a private invitation link instead'
        ]
      },
      {
        feature: 'Live Location in Chats',
        risk: 'Accidentally sharing continuous live GPS broadcast reveals your home and route.',
        recommended: 'Check Active Live Locations & Stop',
        howTo: [
          'Open WhatsApp > Settings > Privacy > "Live location"',
          'Verify if any active live location sessions exist and tap "Stop sharing"'
        ]
      },
      {
        feature: 'Two-Step Verification PIN',
        risk: 'If someone clones your SIM card, they can register your WhatsApp on their phone and access your groups.',
        recommended: '6-Digit Security PIN Enabled',
        howTo: [
          'Open WhatsApp > Settings > Account > "Two-step verification"',
          'Tap "Turn on" and choose a secret 6-digit PIN',
          'Provide a recovery email'
        ]
      },
      {
        feature: 'Disappearing Messages by Default',
        risk: 'Old media, addresses, and sensitive chat records stay permanently stored on recipients\' phones.',
        recommended: 'Enable 7 or 90 days timer for sensitive chats',
        howTo: [
          'Open WhatsApp > Settings > Privacy > "Default message timer"',
          'Select "7 days" or "90 days"'
        ]
      }
    ]
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    badge: 'Snap Map & Ephemeral Safety',
    color: '#fffc00',
    overview: 'Snapchat is built around camera and real-time social interactions. Snap Map is one of the most common vectors for unintentional continuous location leakage among teenagers and college students.',
    settings: [
      {
        feature: 'Snap Map (Ghost Mode)',
        risk: 'Broadcasting your exact street-level coordinates to friends whenever you open the app.',
        recommended: 'Ghost Mode ON (Always)',
        howTo: [
          'Open Snapchat > Tap the Map icon (bottom left)',
          'Tap the Settings gear icon (top right corner)',
          'Toggle ON "Ghost Mode" > Select "Until turned off"'
        ]
      },
      {
        feature: 'Who Can Contact Me Directly',
        risk: 'Strangers can send unsolicited snaps, voice notes, and scam links.',
        recommended: 'Friends Only',
        howTo: [
          'Open Profile > Tap Settings gear (top right)',
          'Scroll to "Privacy Controls"',
          'Tap "Contact Me" > Choose "Friends" (not "Friends and Contacts")'
        ]
      },
      {
        feature: 'Quick Add Feature',
        risk: 'Suggests your profile to strangers based on phone book hashing or location proximity.',
        recommended: 'Remove from Quick Add',
        howTo: [
          'Open Profile > Settings > "See Me in Quick Add"',
          'Uncheck / Toggle OFF "Show me in Quick Add"'
        ]
      },
      {
        feature: 'Two-Factor Authentication',
        risk: 'Snapchat account takeover leads to private My Eyes Only leak attempts.',
        recommended: 'Enable 2FA with Authenticator App',
        howTo: [
          'Profile > Settings > "Two-Factor Authentication"',
          'Choose "Authentication App" > Follow prompt to register'
        ]
      }
    ]
  },
  {
    id: 'facebook',
    name: 'Facebook',
    badge: 'Deep Identity & History Lockdown',
    color: '#1877f2',
    overview: 'Facebook profiles often hold a decade of historical posts, hometowns, high schools, family relationships, and tagged photos accessible to third-party advertisers and stalkers.',
    settings: [
      {
        feature: 'Future & Past Posts Privacy',
        risk: 'Old posts from years ago containing sensitive location check-ins and family photos remain public.',
        recommended: 'Limit Past Posts & Set Future to Friends',
        howTo: [
          'Go to Settings & Privacy > Settings > Privacy Checkup',
          'Select "Who can see what you share"',
          'Under Posts and stories, tap "Limit Past Posts" to convert old public posts to Friends only'
        ]
      },
      {
        feature: 'Profile and Tagging Review',
        risk: 'Friends tag you in photos or check-ins that show up on your timeline without your pre-approval.',
        recommended: 'Enable Timeline Review',
        howTo: [
          'Settings > "Profile and Tagging"',
          'Turn ON "Review posts that you\'re tagged in before the post appears on your profile"'
        ]
      },
      {
        feature: 'Searchability by Email & Phone',
        risk: 'Anyone who obtains a leaked email or phone list can look up your personal Facebook profile.',
        recommended: 'Only Friends or Only Me',
        howTo: [
          'Settings > "How people can find and contact you"',
          'Set "Who can look you up using the email address you provided?" to "Only me"',
          'Set "Who can look you up using the phone number you provided?" to "Only me"',
          'Disable "Allow search engines outside of Facebook to link to your profile"'
        ]
      },
      {
        feature: 'Off-Facebook Activity & Ad Tracking',
        risk: 'Facebook tracks websites you browse and apps you use outside of Facebook to build behavioral ad profiles.',
        recommended: 'Disconnect Off-Facebook Activity',
        howTo: [
          'Settings > Accounts Center > "Your information and permissions"',
          'Tap "Your off-Meta technologies"',
          'Select "Disconnect future activity"'
        ]
      }
    ]
  },
  {
    id: 'youtube',
    name: 'YouTube',
    badge: 'Watch History & Playlist Privacy',
    color: '#ff0000',
    overview: 'YouTube subscriptions and saved playlists can inadvertently expose personal interests, political beliefs, and medical research queries to people who view your channel.',
    settings: [
      {
        feature: 'Subscriptions and Saved Playlists',
        risk: 'Public visibility of channels you subscribe to and your custom video playlists.',
        recommended: 'Keep Subscriptions & Playlists Private',
        howTo: [
          'Open YouTube > Tap Profile avatar > "Your channel"',
          'Tap the Edit pencil icon next to Manage Videos',
          'Under Privacy, toggle ON "Keep all my subscriptions private" and "Keep all my saved playlists private"'
        ]
      },
      {
        feature: 'YouTube Watch & Search History Auto-Delete',
        risk: 'Permanent records of every video you ever watched retained on Google servers.',
        recommended: 'Enable Auto-Delete (3 Months)',
        howTo: [
          'Go to myactivity.google.com/product/youtube',
          'Select "Auto-delete" > Choose "Auto-delete activity older than 3 months"'
        ]
      }
    ]
  }
];
