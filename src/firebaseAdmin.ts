import {App, cert, getApps, initializeApp, getApp,} from 'firebase-admin/app';
import {getFirestore,} from 'firebase-admin/firestore';

import serviceKey from '../service_key.json';


export let adminApp: App;

if (getApps().length === 0) {
  adminApp = initializeApp({
    credential: cert(JSON.stringify(serviceKey)),
  });
} else {
  adminApp = getApp();
}

export const adminDb = getFirestore(adminApp);

