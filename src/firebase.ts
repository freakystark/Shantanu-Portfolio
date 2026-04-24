import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// 1. We import the JSON file
import firebaseConfigData from '../firebase-applet-config.json';

// 2. We cast it to help TypeScript understand the properties
const firebaseConfig: any = firebaseConfigData;

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Use the database ID from the config, or default if missing
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
export const storage = getStorage(app);

export default app;
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// import firebaseConfig from '../firebase-applet-config.json';

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
// export const storage = getStorage(app);

// export default app;
