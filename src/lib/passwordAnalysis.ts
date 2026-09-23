import type { PasswordAnalysis } from '../types';

const COMMON_PASSWORDS = new Set([
  'password', '123456', '12345678', 'qwerty', '123456789', '12345', '1234',
  '111111', '1234567', 'dragon', 'admin', 'welcome', 'login', 'sunshine',
  'princess', 'football', 'iloveyou', 'charlie', 'monkey', 'password1',
  'password123', 'admin123', 'root', 'superman', 'batman', 'starwars',
  'trustno1', 'secret', 'pass123', 'hello123'
]);

export const analyzePassword = (password: string): PasswordAnalysis => {
  if (!password) {
    return {
      length: 0,
      entropy: 0,
      score: 0,
      level: 'Very Weak',
      color: '#64748b',
      crackTime: 'Instant',
      hasLower: false,
      hasUpper: false,
      hasNumber: false,
      hasSpecial: false,
      hasRepetition: false,
      isCommon: false,
      feedback: ['Enter a password to test strength. Analyzed 100% locally in your browser.']
    };
  }

  const length = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const hasRepetition = /(.)\1{2,}/.test(password);
  const isCommon = COMMON_PASSWORDS.has(password.toLowerCase().trim());

  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasNumber) poolSize += 10;
  if (hasSpecial) poolSize += 33;

  // Shannon entropy estimation: H = L * log2(poolSize)
  const entropy = poolSize > 0 ? Math.round(length * Math.log2(poolSize)) : 0;

  // Scoring rubric (0 - 100)
  let score = 0;

  // Length weight (up to 40 pts)
  if (length >= 16) score += 40;
  else if (length >= 12) score += 30;
  else if (length >= 8) score += 15;
  else score += length * 1.5;

  // Variety weight (up to 40 pts)
  let varietyCount = 0;
  if (hasLower) varietyCount++;
  if (hasUpper) varietyCount++;
  if (hasNumber) varietyCount++;
  if (hasSpecial) varietyCount++;
  score += varietyCount * 10;

  // Entropy bonus (up to 20 pts)
  if (entropy > 75) score += 20;
  else if (entropy > 55) score += 12;
  else if (entropy > 35) score += 5;

  // Penalties
  if (hasRepetition) score = Math.max(10, score - 15);
  if (isCommon) score = Math.min(15, score);
  if (length < 8) score = Math.min(25, score);

  score = Math.min(100, Math.max(5, Math.round(score)));

  let level: PasswordAnalysis['level'] = 'Very Weak';
  let color = '#ef4444'; // red
  let crackTime = 'Instant';

  if (score >= 85 && length >= 12 && varietyCount >= 3) {
    level = 'Very Strong';
    color = '#10b981'; // green
    crackTime = 'Centuries to Trillions of Years';
  } else if (score >= 65 && length >= 10 && varietyCount >= 3) {
    level = 'Strong';
    color = '#06b6d4'; // cyan
    crackTime = 'Several Years to Decades';
  } else if (score >= 45 && length >= 8) {
    level = 'Fair';
    color = '#f59e0b'; // amber
    crackTime = 'A Few Days to Months';
  } else if (score >= 25) {
    level = 'Weak';
    color = '#f97316'; // orange
    crackTime = 'A Few Minutes to Hours';
  } else {
    level = 'Very Weak';
    color = '#ef4444';
    crackTime = 'Instant (< 1 second)';
  }

  const feedback: string[] = [];
  if (isCommon) {
    feedback.push('⚠️ This password appears in known breach lists and dictionaries. Never use it.');
  }
  if (length < 12) {
    feedback.push('Tip: Aim for at least 12-16 characters or a 4-word passphrase.');
  }
  if (!hasUpper) {
    feedback.push('Add uppercase letters to expand possibilities.');
  }
  if (!hasNumber) {
    feedback.push('Include numbers to strengthen randomness.');
  }
  if (!hasSpecial) {
    feedback.push('Include special symbols (!@#$%^&*) to repel automated attacks.');
  }
  if (hasRepetition) {
    feedback.push('Avoid repetitive patterns like "aaa" or sequential characters.');
  }
  if (feedback.length === 0) {
    feedback.push('✓ Excellent password structure! It provides strong resistance against brute-force.');
  }

  return {
    length,
    entropy,
    score,
    level,
    color,
    crackTime,
    hasLower,
    hasUpper,
    hasNumber,
    hasSpecial,
    hasRepetition,
    isCommon,
    feedback,
  };
};
