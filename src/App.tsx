import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import { RiskChecker } from './components/checker/RiskChecker';
import { LearnSection } from './components/learn/LearnSection';
import { SocialGuides } from './components/guides/SocialGuides';
import { ToolsHub } from './components/tools/ToolsHub';
import { PrivacyQuiz } from './components/quiz/PrivacyQuiz';
import { SafetyCenter } from './components/safety/SafetyCenter';
import { AuthModal } from './components/auth/AuthModal';
import { PrivacyAssistantModal } from './components/ai/PrivacyAssistantModal';
import { 
  auth, 
  onAuthStateChanged, 
  db, 
  doc, 
  setDoc, 
  getDoc,
  type User 
} from './lib/firebase';
import type { AssessmentResult } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  // Strict User Isolation: Logged out users start with null (no stale data leak)
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(() => {
    // Purge legacy global key to prevent stale leaks
    try {
      localStorage.removeItem('privsecure_assessment');
      localStorage.removeItem('privsecure_latest_quiz');
    } catch {
      // Ignore
    }
    return null;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('privsecure_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync auth state with strict user data isolation
  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);
        if (user) {
          // Load this specific user's scoped assessment
          const userKey = `privsecure_assessment_${user.uid}`;
          const localUserSaved = localStorage.getItem(userKey);
          let loadedResult: AssessmentResult | null = null;
          if (localUserSaved) {
            try {
              loadedResult = JSON.parse(localUserSaved);
            } catch {
              loadedResult = null;
            }
          }
          setAssessmentResult(loadedResult);

          if (db) {
            try {
              const userDoc = await getDoc(doc(db, 'users', user.uid));
              if (userDoc.exists() && userDoc.data()?.latestAssessment) {
                const cloudResult = userDoc.data().latestAssessment;
                setAssessmentResult(cloudResult);
                localStorage.setItem(userKey, JSON.stringify(cloudResult));
              }
            } catch (err) {
              console.warn('[PrivSecure] Cloud sync info:', err);
            }
          }
        } else {
          // When logged out, IMMEDIATELY reset assessment state (0 data leakage)
          setAssessmentResult(null);
        }
      });
      return () => unsubscribe();
    }
  }, []);

  const handleAssessmentCompleted = async (result: AssessmentResult) => {
    setAssessmentResult(result);

    // Save only to this specific user's store
    if (currentUser) {
      localStorage.setItem(`privsecure_assessment_${currentUser.uid}`, JSON.stringify(result));
      if (db) {
        try {
          await setDoc(doc(db, 'users', currentUser.uid), {
            latestAssessment: result,
            updatedAt: Date.now()
          }, { merge: true });
        } catch (err) {
          console.warn('[PrivSecure] Failed to sync assessment to Firestore:', err);
        }
      }
    }
  };

  const handleQuizCompleted = async (score: number, total: number) => {
    if (currentUser) {
      localStorage.setItem(`privsecure_latest_quiz_${currentUser.uid}`, JSON.stringify({ score, total, date: Date.now() }));
      if (db) {
        try {
          await setDoc(doc(db, 'users', currentUser.uid), {
            latestQuiz: { score, total, date: Date.now() }
          }, { merge: true });
        } catch (err) {
          console.warn('[PrivSecure] Failed to sync quiz to Firestore:', err);
        }
      }
    }
  };

  const handleNavigateToStage = (stage: 'learn' | 'check' | 'risk' | 'solutions' | 'improve') => {
    if (stage === 'learn') {
      setActiveTab('learn');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (stage === 'check') {
      setActiveTab('checker');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Stages: 'risk', 'solutions', 'improve' navigate to the existing Privacy Check / results destinations
    setActiveTab('checker');
    setTimeout(() => {
      let targetId = '';
      if (stage === 'risk') targetId = 'privacy-risk-results';
      else if (stage === 'solutions') targetId = 'privacy-solutions-section';
      else if (stage === 'improve') targetId = 'privacy-checklist-section';

      const el = targetId ? document.getElementById(targetId) : null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Sticky Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRiskLevel={assessmentResult?.riskLevel || null}
        currentScore={assessmentResult?.totalScore ?? null}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        userEmail={currentUser?.email || null}
        displayName={currentUser?.displayName || null}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, paddingTop: '2.5rem' }}>
        <div className="container">
          
          {activeTab === 'home' && (
            <HomePage
              onStartAssessment={() => { setActiveTab('checker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onNavigateToLearn={() => { setActiveTab('learn'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onNavigateToTools={() => { setActiveTab('tools'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onNavigateToStage={handleNavigateToStage}
              currentScore={assessmentResult?.totalScore ?? null}
              currentRiskLevel={assessmentResult?.riskLevel || null}
            />
          )}

          {activeTab === 'checker' && (
            <RiskChecker
              savedResult={assessmentResult}
              currentUser={currentUser}
              onOpenAuth={() => setIsAuthOpen(true)}
              onAssessmentCompleted={handleAssessmentCompleted}
              onNavigateToGuides={() => { setActiveTab('guides'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
          )}

          {activeTab === 'learn' && (
            <LearnSection
              onTakeAssessment={() => { setActiveTab('checker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onOpenOvershareSim={() => { setActiveTab('tools'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onOpenPasswordChecker={() => { setActiveTab('tools'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
          )}

          {activeTab === 'guides' && (
            <SocialGuides />
          )}

          {activeTab === 'tools' && (
            <ToolsHub />
          )}

          {activeTab === 'quiz' && (
            <PrivacyQuiz
              onQuizCompleted={handleQuizCompleted}
            />
          )}

          {activeTab === 'safety' && (
            <SafetyCenter />
          )}

        </div>
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogoutSuccess={() => { setCurrentUser(null); setAssessmentResult(null); }}
        onAuthSuccess={(user) => setCurrentUser(user)}
      />

      {/* Floating AI Privacy Assistant Modal */}
      <PrivacyAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />

    </div>
  );
}

export default App;
