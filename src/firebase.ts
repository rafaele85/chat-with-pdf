import {getApp, getApps, initializeApp,} from 'firebase/app';
import {getFirestore,} from '@firebase/firestore';
import {getStorage,} from '@firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyBON5LyIEiT5Rvt9eHVcGWZ-ywlDSlFo5U',
  authDomain: 'chat-with-pdf-3bfd6.firebaseapp.com',
  projectId: 'chat-with-pdf-3bfd6',
  storageBucket: 'chat-with-pdf-3bfd6.appspot.com',
  messagingSenderId: '958615767831',
  appId: '1:958615767831:web:9637f49a1d6edf0799c552',
};

// Initialize Firebase
const app = getApps()?.length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const storage = getStorage(app);

