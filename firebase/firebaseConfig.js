import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDY7Nk4Xj5kbDMNrZ2Sr0YJQRH2FEYkTc0",
  authDomain: "rick-e5800.firebaseapp.com",
  projectId: "rick-e5800",
  storageBucket: "rick-e5800.firebasestorage.app",
  messagingSenderId: "620976848628",
  appId: "1:620976848628:web:eb37a6eb99805f57b6a8a1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };