import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS || '{}');
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
