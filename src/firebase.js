import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA3yyoSO7xBvilO_RtR4N8ynZZQBecR6Xg",
  authDomain: "empoweru-8c11e.firebaseapp.com",
  projectId: "empoweru-8c11e",
  storageBucket: "empoweru-8c11e.firebasestorage.app",
  messagingSenderId: "516353193807",
  appId: "1:516353193807:web:05b476f2a2f414ea2c773a"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
