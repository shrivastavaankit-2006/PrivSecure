import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  type User,
  type Auth
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  type Firestore 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBIbgTcVJz-HPEfeW6Rqgk_UCwfLCFhNvs',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'priv-8fc3f.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'priv-8fc3f',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'priv-8fc3f.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '834549421691',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:834549421691:web:4258bf8fd63779d49874de',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ''
};

export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    firebaseConfig.apiKey && 
    firebaseConfig.apiKey !== 'your_api_key_here' && 
    firebaseConfig.projectId &&
    firebaseConfig.projectId !== 'your_project_id'
  );
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    console.log('[PrivSecure] Firebase successfully initialized.');
  } catch (err) {
    console.warn('[PrivSecure] Firebase init failed, operating in offline/guest mode:', err);
  }
} else {
  console.info('[PrivSecure] Firebase keys not yet configured. Operating seamlessly in secure Guest/Local Mode.');
}

export { 
  app, 
  auth, 
  db,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs
};
export type { User };
