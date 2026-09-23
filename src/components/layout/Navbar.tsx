import React, { useState } from 'react';
import { 
  ShieldCheck, 
  User as UserIcon, 
  LogIn,
  Menu, 
  X,
  Sun,
  Moon,
  MessageSquare
} from 'lucide-react';
import type { RiskLevel } from '../../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentRiskLevel: RiskLevel | null;
  currentScore: number | null;
  onOpenAuth: () => void;
  onOpenAssistant: () => void;
  userEmail: string | null;
  displayName?: string | null;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentRiskLevel: _currentRiskLevel,
  currentScore: _currentScore,
  onOpenAuth,
  onOpenAssistant,
  userEmail,
  displayName,
  theme,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Pure text navigation labels with consistent styling
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'checker', label: 'Privacy Check' },
    { id: 'learn', label: 'Learn' },
    { id: 'guides', label: 'Social Guides' },
    { id: 'tools', label: 'Security Tools' },
    { id: 'quiz', label: 'Privacy Quiz' },
    { id: 'safety', label: 'Safety Center' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAssistantClick = () => {
    onOpenAssistant();
    setMobileMenuOpen(false);
  };

  // Derive real display text: Never use fake or hardcoded usernames
  const isAuthenticated = Boolean(userEmail);
  const accountLabel = isAuthenticated
    ? (displayName || (userEmail ? userEmail.split('@')[0] : 'My Account'))
    : 'Login';

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: theme === 'dark' ? 'rgba(7, 11, 20, 0.92)' : 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: theme === 'dark' ? '1px solid rgba(56, 189, 248, 0.15)' : '1px solid #cbd5e1',
      padding: '0.65rem 0',
      transition: 'background-color 0.25s ease, border-color 0.25s ease'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        gap: '1.25rem'
      }}>
        
        {/* Left: Brand Logo & Title with dedicated spacing */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.65rem', 
            cursor: 'pointer',
            flexShrink: 0,
            marginRight: '0.5rem'
          }}
          title="PrivSecure Home"
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(6, 182, 212, 0.35)'
          }}>
            <ShieldCheck size={22} color="#ffffff" strokeWidth={2.5} />
          </div>
          <span style={{ 
            fontSize: '1.35rem', 
            fontWeight: 800, 
            letterSpacing: '-0.02em', 
            color: theme === 'dark' ? '#f8fafc' : '#0f172a' 
          }}>
            Priv<span style={{ color: '#06b6d4' }}>Secure</span>
          </span>
        </div>

        {/* Center: Desktop Navigation Links with unified hover and active styling */}
        <nav 
          className="desktop-nav"
          style={{ 
            display: 'none', 
            alignItems: 'center', 
            gap: '0.3rem',
            flexWrap: 'nowrap'
          }} 
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* AI Assistant Navigation Item with unified navigation styling */}
          <button
            onClick={handleAssistantClick}
            className="nav-link"
            title="Ask AI Privacy Assistant"
            style={{
              gap: '0.35rem',
              color: theme === 'dark' ? '#c084fc' : '#7c3aed',
            }}
          >
            <MessageSquare size={14} style={{ color: theme === 'dark' ? '#38bdf8' : '#0284c7' }} />
            <span>AI Assistant</span>
          </button>
        </nav>

        {/* Right Action Group: Theme Toggle & Real Authentication Profile */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.65rem',
          flexShrink: 0 
        }}>
          
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle light or dark theme"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.75rem',
              borderRadius: '9px',
              backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : '#f1f5f9',
              border: theme === 'dark' ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid #cbd5e1',
              color: theme === 'dark' ? '#f8fafc' : '#0f172a',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {theme === 'dark' ? (
              <>
                <Moon size={14} color="#38bdf8" />
                <span>Dark</span>
              </>
            ) : (
              <>
                <Sun size={14} color="#d97706" />
                <span style={{ color: '#0f172a' }}>Light</span>
              </>
            )}
          </button>

          {/* Real Authentication State Button: Shows Login when logged out, real username when logged in */}
          <button
            onClick={onOpenAuth}
            title={isAuthenticated ? `Logged in as ${userEmail}` : 'Log In or Sign Up'}
            aria-label={isAuthenticated ? 'Account Profile' : 'Log In'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '9px',
              backgroundColor: isAuthenticated
                ? (theme === 'dark' ? 'rgba(16, 185, 129, 0.14)' : 'rgba(5, 150, 105, 0.1)')
                : (theme === 'dark' ? 'rgba(6, 182, 212, 0.12)' : 'rgba(2, 132, 199, 0.08)'),
              border: isAuthenticated
                ? (theme === 'dark' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(5, 150, 105, 0.35)')
                : (theme === 'dark' ? '1px solid rgba(6, 182, 212, 0.35)' : '1px solid rgba(2, 132, 199, 0.35)'),
              color: isAuthenticated
                ? (theme === 'dark' ? '#34d399' : '#059669')
                : (theme === 'dark' ? '#38bdf8' : '#0284c7'),
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              maxWidth: '180px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {isAuthenticated ? (
              <>
                <UserIcon size={15} style={{ flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {accountLabel}
                </span>
              </>
            ) : (
              <>
                <LogIn size={15} style={{ flexShrink: 0 }} />
                <span>Login</span>
              </>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              padding: '0.45rem',
              color: theme === 'dark' ? '#e2e8f0' : '#0f172a',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: theme === 'dark' ? '#0a101f' : '#ffffff',
          borderTop: theme === 'dark' ? '1px solid rgba(56, 189, 248, 0.15)' : '1px solid #e2e8f0',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.45rem',
          boxShadow: theme === 'dark' ? '0 12px 30px rgba(0,0,0,0.7)' : '0 12px 30px rgba(0,0,0,0.08)'
        }}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{ width: '100%', justifyContent: 'flex-start', padding: '0.65rem 1rem' }}
              >
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={handleAssistantClick}
            className="nav-link"
            style={{ 
              width: '100%', 
              justifyContent: 'flex-start', 
              padding: '0.65rem 1rem',
              color: theme === 'dark' ? '#c084fc' : '#7c3aed' 
            }}
          >
            <MessageSquare size={15} />
            <span>AI Assistant</span>
          </button>

          <div style={{ height: '1px', backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#e2e8f0', margin: '0.25rem 0' }} />

          <button
            onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
            className="nav-link"
            style={{ 
              width: '100%', 
              justifyContent: 'flex-start', 
              padding: '0.65rem 1rem',
              color: isAuthenticated ? (theme === 'dark' ? '#34d399' : '#059669') : undefined
            }}
          >
            {isAuthenticated ? <UserIcon size={16} /> : <LogIn size={16} />}
            <span>{isAuthenticated ? `Account (${accountLabel})` : 'Login / Sign Up'}</span>
          </button>
        </div>
      )}

      {/* Responsive CSS Breakpoints */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
