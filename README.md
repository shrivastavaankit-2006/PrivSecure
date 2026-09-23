# PrivSecure — Digital Privacy Awareness Platform

> **"Think Before You Share. Protect Your Digital Privacy."**  
> An interactive digital privacy education, risk assessment, and incident response platform designed to help everyday internet users, students, and youth build safe digital habits across social media and online services.

[![Cloudflare Workers](https://img.shields.io/badge/Deployment-Cloudflare%20Workers-orange.svg)](https://privsecure.digitalshield-api.workers.dev)
[![React](https://img.shields.io/badge/Frontend-React%2019-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript%205-3178c6.svg)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Auth-Firebase%2012-ffca28.svg)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-Academic%20%2F%20CEP-green.svg)](#academic--community-engagement-project-cep-context)

---

## 1. Overview

**PrivSecure** is a comprehensive, interactive digital privacy and security awareness platform. Developed as part of a **Community Engagement Project (CEP)**, PrivSecure addresses the widespread vulnerability of young users, students, and families to social engineering, profile scraping, oversharing, phishing attacks, and identity theft.

### The Problem
Most privacy educational materials rely on dry, abstract compliance language (such as GDPR or legal terms of service) that fail to change actual user behavior. Meanwhile:
- Social platforms incentivize oversharing (location tags, check-ins, routine broadcasts).
- Attackers exploit small metadata leaks (flight boarding passes, student IDs, work badges) to execute identity theft, spear-phishing, and SIM swapping.
- Users frequently reuse weak passwords and neglect Two-Factor Authentication (2FA).

### The PrivSecure Solution
PrivSecure translates cybersecurity concepts into an actionable, measurable **5-Stage Action Cycle**:
1. **Learn**: Understand real-world tracking, psychological sharing traps, and digital footprints.
2. **Check**: Complete an interactive, multi-category Privacy Risk Assessment.
3. **Understand Risk**: Receive an objective **0–100 Privacy Score** with risk classifications and category breakdowns.
4. **Get Solutions**: Review tailored, prioritized security mitigations.
5. **Improve Privacy**: Track and check off profile hardening steps on an interactive checklist.

---

## 2. Key Features

PrivSecure contains a rich suite of interactive modules, deterministic security calculators, and AI-assisted tools:

### 🛡️ Privacy Risk Assessment & Score (0–100)
- **8-Factor Interactive Evaluation**: Assesses profile visibility, password hygiene, two-factor authentication, live location tagging, photo oversharing, third-party app permissions, public Wi-Fi usage, and phishing awareness.
- **Deterministic Privacy Score Engine**: Transparent mathematical weighting algorithm computing a score from 0 (critical risk) to 100 (hardened privacy).
- **Risk Level Classifications**:
  - `Good` (80–100): Strong privacy habits in place.
  - `Moderate` (60–79): Key vulnerabilities exist (e.g., lack of 2FA, partial oversharing).
  - `High` (40–59): Significant risk of credential leakage and profile scraping.
  - `Critical` (0–39): Severe public exposure and identity theft risks.
- **Category Radar Breakdown**: Individual scores for *Profile Privacy*, *Password Security*, *Account Security*, *Oversharing Habits*, *Scam & Link Awareness*, and *Location Privacy*.
- **Actionable Checklist**: Interactive checklist with real-time progress percentage tracking as users complete mitigations.
- **Strict User Isolation**: Assessments are user-scoped (`privsecure_assessment_${uid}`). Logged-out users start with a clean slate; zero data leakage between accounts or guest sessions.

### 🧩 Dynamic Privacy IQ Quiz
- **10-Question Sessions**: Every quiz session dynamically generates exactly 10 real-world privacy and cybersecurity scenarios.
- **Serverless AI Generation**: Cloudflare Worker backend queries Google Gemini with deduplication (`excludeIds`) and randomized seeds (`temperature: 0.95`).
- **Resilient Fallback Pool**: Curated offline fallback bank guarantees 10 unique, non-repeating questions even without internet connectivity.
- **Educational Explanations**: Immediate feedback with detailed explanations for correct and incorrect answers.

### 🔍 Safe to Share? Oversharing Simulator
- **Interactive Social Feed Mockups**: Simulates realistic Instagram stories, Facebook posts, and chat messages (e.g., flight boarding passes, concert tickets, student ID badges, routine travel posts).
- **Barcode & Metadata Leaks**: Highlights how barcode scanners, PNR lookups, and visual clues compromise private information.
- **Dynamic Scenario Generation**: Option to generate fresh simulator scenarios server-side via Gemini API or local bank rotation.

### 🎣 Phishing & Scam Detector Simulator
- **Real-World Threat Scenarios**: Simulates urgent banking SMS alerts, Instagram copyright strikes, fake courier redelivery notices, and lottery traps.
- **Red Flag Dissection**: Detailed breakdowns of domain spoofs, artificial urgency, mismatched sender addresses, and session-stealing links.
- **Interactive Decision**: Users choose whether to "Report / Delete" or "Click / Follow Instructions", receiving immediate tactical guidance.

### 🔑 Client-Side Password Strength Analyzer
- **Entropy & Pattern Analysis**: Evaluates password length, character diversity (uppercase, lowercase, numbers, symbols), repetitive sequences, and dictionary words.
- **Crack Time Estimation**: Calculates estimated brute-force times across multiple hashing speeds (MD5, SHA-256, bcrypt).
- **100% Privacy-Preserving**: Runs entirely in client-side memory using Shannon entropy mathematics. **Zero passwords are ever transmitted over the network or saved.**

### 📱 Social Media Privacy Guides
- **Platform-Specific Hardening**: Dedicated visual walkthroughs for **Instagram**, **Snapchat**, **WhatsApp**, and **Facebook**.
- **Practical Settings**: Step-by-step instructions for enabling Private Account, Authenticator-based 2FA, disabling Activity Status, enabling Snap Map Ghost Mode, and locking down profile tags.

### 🚨 Emergency Safety Center (Incident Response)
- **Actionable Incident Playbooks**:
  - *Account Hacked / Hijacked*: Emergency recovery steps, revoking sessions, securing linked emails.
  - *Online Impersonation / Fake Profiles*: Evidence collection, takedown reporting protocols, notifying mutual contacts.
  - *Clicked Suspicious Link / Credential Leaked*: Password reset protocols, token invalidation, banking alerts.
- **Helplines & Official Portals**: Quick access to India's National Cyber Crime Helpline (`1930`) and official reporting portal (`cybercrime.gov.in`).

### 💬 Multilingual AI Privacy Assistant
- **Intent-First Architecture**: Classifies user intent before answering (differentiates casual greetings like *"hey tum kese ho"* from specific security queries like *"bhai phishing kya hota hai?"*).
- **Multilingual Understanding**: Seamlessly understands English, Hindi (Devanagari), Hinglish (Roman script Hindi), and mixed dialect queries.
- **Language Style Mirroring**: Automatically matches the user's chosen language and conversational tone.
- **Zero Client Key Exposure**: Backend calls are routed through Cloudflare Workers; Gemini API keys remain strictly server-side.

### 🌓 Complete Dark & Light Mode
- Fully audited, high-contrast theme system powered by CSS custom properties (`--bg-primary`, `--bg-card`, `--text-primary`, `--text-secondary`, `--border-color`).
- Clean, accessible typography in both daylight and dark environments.

---

## 3. Technology Stack

| Layer | Technology | Version | Purpose in PrivSecure |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **React** | `^19.2.8` | Declarative UI component architecture and state management. |
| **Language** | **TypeScript** | `~6.0.2` | End-to-end type safety, strict interface models, and build-time validation. |
| **Build Tool & Bundler** | **Vite** | `^8.2.2` | Rapid HMR development server and optimized rollup production bundles. |
| **Styling** | **Vanilla CSS** | — | Curated CSS custom properties design system with dark/light mode tokens. |
| **Icons** | **Lucide React** | `^1.44.0` | Accessible, consistent iconography across all modules. |
| **Authentication** | **Firebase Auth** | `^12.19.0` | User account authentication, persistent session management, and auth listeners. |
| **Cloud Database** | **Cloud Firestore** | `^12.19.0` | Optional cloud backup for user assessments and quiz history. |
| **Serverless Backend** | **Cloudflare Workers** | — | Full-stack serverless routing (`src/worker.ts`) and asset delivery. |
| **Backend Functions** | **Cloudflare Functions** | — | Secure serverless API endpoints (`/api/ai-assistant`, `/api/quiz-generate`, etc.). |
| **AI Engine** | **Google Gemini API** | 2.5 Flash | Server-side dynamic quiz generation, scenario creation, and multilingual assistant. |
| **Deployment CLI** | **Wrangler** | `^4.130.0` | Cloudflare developer CLI for building, secret management, and worker deployment. |

---

## 4. System Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        User Browser (Client)                           │
│                                                                        │
│   React 19 SPA (TypeScript + Vite)                                     │
│   ├── Home (5-Stage Action Cycle)                                      │
│   ├── Privacy Risk Checker (0–100 Deterministic Scoring)               │
│   ├── Privacy Quiz (Dynamic Questions)                                 │
│   ├── Security Tools (Local Password Analyzer, Simulators)             │
│   ├── Social Media Guides & Safety Center Playbooks                    │
│   └── Multilingual AI Assistant Modal                                  │
└──────────────────┬────────────────────────────────┬────────────────────┘
                   │                                │
        Client-Side Operations                      │ API Fetch Calls
        (Passwords, Local Scoring)                  │ (/api/*)
                   │                                │
                   ▼                                ▼
       ┌──────────────────────┐      ┌───────────────────────────────────┐
       │   Firebase 12 Auth   │      │   Cloudflare Worker (src/worker)  │
       │   & Cloud Firestore  │      │   └── /api/ai-assistant           │
       │                      │      │   └── /api/quiz-generate          │
       │  • User Signup/Login │      │   └── /api/simulator-generate     │
       │  • Cloud Assessment  │      │   └── Static Assets Handler       │
       │    Synchronization   │      └─────────────────┬─────────────────┘
       └──────────────────────┘                        │
                                               Server-Side Only
                                            x-goog-api-key Authentication
                                                       │
                                                       ▼
                                     ┌───────────────────────────────────┐
                                     │      Google Gemini 2.5 Flash      │
                                     │                                   │
                                     │  • Intent-first response engine   │
                                     │  • Dynamic 10-question quiz sets  │
                                     │  • Oversharing scenario synthesis │
                                     └───────────────────────────────────┘
```

### Security & Privacy Architecture Highlights
1. **Server-Side API Keys**: `GEMINI_API_KEY` is bound strictly to Cloudflare Worker environment variables/secrets. It is never exposed in client bundles or `.env` files sent to the browser.
2. **Local-Only Password Processing**: The password strength evaluator executes entirely in in-browser memory. No password inputs are sent across any network connection.
3. **Deterministic Scoring**: Privacy risk calculations are deterministic, ensuring consistency without AI hallucinations.
4. **User Data Isolation**: Storage keys are prefixed with user IDs (`privsecure_assessment_${uid}`). Logging out resets state immediately.

---

## 5. Folder Structure

```text
PrivSecure/
├── .dev.vars.example           # Example local Cloudflare secrets
├── .env.example                # Example client environment variables
├── functions/                  # Cloudflare Pages / Worker Functions
│   └── api/
│       ├── ai-assistant.ts     # Multilingual AI Assistant backend endpoint
│       ├── quiz-generate.ts    # Dynamic 10-question Gemini quiz generator
│       └── simulator-generate.ts # Dynamic simulator scenario generator
├── public/                     # Static public assets
│   ├── favicon.svg             # PrivSecure brand icon
│   └── icons.svg               # SVG sprite definitions
├── src/
│   ├── assets/                 # Component assets
│   ├── components/
│   │   ├── ai/
│   │   │   └── PrivacyAssistantModal.tsx # Floating AI Assistant chat interface
│   │   ├── auth/
│   │   │   └── AuthModal.tsx   # Firebase Login / Signup / Profile modal
│   │   ├── checker/
│   │   │   ├── RiskChecker.tsx # Multi-step questionnaire controller
│   │   │   └── ScoreDashboard.tsx # 0–100 score gauge & category breakdown
│   │   ├── guides/
│   │   │   └── SocialGuides.tsx # Instagram, Snapchat, WhatsApp, FB guides
│   │   ├── home/
│   │   │   └── HomePage.tsx    # Landing page & 5-Stage Action Cycle cards
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Unified navigation & theme/auth controls
│   │   │   └── Footer.tsx      # Brand mission, links, emergency helplines
│   │   ├── learn/
│   │   │   └── LearnSection.tsx # Digital privacy educational articles
│   │   ├── quiz/
│   │   │   └── PrivacyQuiz.tsx # Interactive 10-question quiz module
│   │   ├── safety/
│   │   │   └── SafetyCenter.tsx # Incident response playbooks & 1930 helpline
│   │   └── tools/
│   │       ├── ToolsHub.tsx    # Security tools tab switcher
│   │       ├── PasswordChecker.tsx # Client-side entropy password analyzer
│   │       ├── OvershareSim.tsx # Safe to Share social post simulator
│   │       └── PhishingSim.tsx # Anti-phishing email & DM simulator
│   ├── data/
│   │   ├── assessmentQuestions.ts # 8 risk evaluation questions & weightings
│   │   ├── educationalContent.ts  # Learn articles & safety playbooks
│   │   ├── quizQuestions.ts       # Curated 10-question fallback pool
│   │   └── socialGuidesData.ts    # Step-by-step social platform settings
│   ├── lib/
│   │   ├── firebase.ts         # Firebase Auth & Firestore client init
│   │   ├── passwordAnalysis.ts # Shannon entropy & crack-time math
│   │   └── privacyScore.ts     # Deterministic risk & score calculation engine
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces & domain types
│   ├── App.css                 # Supplemental animation classes
│   ├── App.tsx                 # Root application state & router controller
│   ├── index.css               # Core design tokens, light/dark variables, buttons
│   ├── main.tsx                # React DOM entrypoint
│   └── worker.ts               # Cloudflare Worker entrypoint for full-stack routing
├── dist/                       # Production build output (generated)
├── package.json                # Project dependencies and build scripts
├── tsconfig.json               # TypeScript workspace configuration
├── vite.config.ts              # Vite configuration with @cloudflare/vite-plugin
├── wrangler.jsonc              # Cloudflare Wrangler worker & assets configuration
└── README.md                   # Project documentation
```

---

## 6. Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or later recommended)
- `npm` (bundled with Node.js)
- A Firebase project with Email/Password Authentication enabled (optional for guest usage)
- A Google Gemini API Key (optional for local fallback mode, required for live AI generation)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/PrivSecure.git
   cd PrivSecure
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the project root:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

   For local Cloudflare Worker development with Gemini features, create a `.dev.vars` file:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 7. Build and Deployment

PrivSecure is configured for production deployment via **Cloudflare Workers with Static Assets** and `@cloudflare/vite-plugin`.

### 1. Build Validation
Run the TypeScript compiler and Vite production build:
```bash
npm run build
```
This produces:
- `dist/client/`: Optimized static assets (HTML, CSS, chunked JS).
- `dist/privsecure/`: Worker server bundle dispatching `/api/*` requests.

### 2. Deploy to Cloudflare
Deploy using Wrangler:
```bash
npx wrangler deploy
```

### 3. Binding Production Secrets (Gemini API)
To enable live Gemini generation on your Cloudflare Worker:
```bash
npx wrangler secret put GEMINI_API_KEY
```
*(Enter your Gemini API key when prompted).*

---

## 8. Development & Review Workflow

When making modifications to PrivSecure, adhere to the standard project workflow:
$$\text{EDIT} \longrightarrow \text{npm run build} \longrightarrow \text{VERIFY} \longrightarrow \text{DEPLOY} \longrightarrow \text{VERIFY LIVE}$$

1. **EDIT**: Apply clean, modular TypeScript and CSS modifications.
2. **BUILD**: Confirm `0` TypeScript errors and `0` bundle compilation errors via `npm run build`.
3. **VERIFY**: Test locally or check simulated responses.
4. **DEPLOY**: Deploy bundle updates via `npx wrangler deploy`.
5. **VERIFY LIVE**: Test against the live production worker endpoint.

---

## 9. Academic & Community Engagement Project (CEP) Context

PrivSecure was developed to fulfill the requirements of the **Community Engagement Project (CEP)** / Academic Capstone in Computer Science and Cybersecurity.

### Core Community Objectives
- **Target Audience**: High school students, university undergraduates, seniors, and non-technical social media users.
- **Empowerment through Awareness**: Providing self-directed, measurable security health checks rather than fear-based warnings.
- **Support in Crisis**: Equipping victims of account takeovers with immediate, step-by-step incident response playbooks and legitimate government contact points (`1930`).

---

## 10. Authors & Acknowledgments

- **Developed By**: Ramanand Dubey, Ashish Shrivastava, and the PrivSecure Project Team.
- **Community Partner**: Digital Wellness and Cybersecurity Awareness Initiative.
- **Technologies Used**: Google Gemini API, Cloudflare Workers, Firebase Authentication, React & Vite.

---

## 11. Live Production Deployment

- **Live URL**: [https://privsecure.digitalshield-api.workers.dev](https://privsecure.digitalshield-api.workers.dev)
- **Status**: Production Deployed & Verified
