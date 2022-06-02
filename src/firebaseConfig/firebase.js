import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseAuthConfig = {
  apiKey: 'AIzaSyCck7waTXfTMX0y3XoVJMUoWrFPgwFsaNs',
  authDomain: 'bubbo-advertising-platform.firebaseapp.com',
  projectId: 'bubbo-advertising-platform',
  storageBucket: 'bubbo-advertising-platform.appspot.com',
  messagingSenderId: '482575603341',
  appId: '1:482575603341:web:e487a03623fd9f347374c4',
  measurementId: 'G-GFQ17ZYNEQ',
};

const firebaseDatabaseConfig = {
  apiKey: 'AIzaSyCALhw19FZraHBBcAnvxvN7FRuQL4zRMfE',
  authDomain: 'bubbo-app.firebaseapp.com',
  projectId: 'bubbo-app',
  storageBucket: 'bubbo-app.appspot.com',
  messagingSenderId: '544989129874',
  appId: '1:544989129874:web:5408c65719e26779894a4b',
};

const appAuth = initializeApp(firebaseAuthConfig);
const appDatabase = initializeApp(firebaseDatabaseConfig, 'firebaseDatabaseConfig');

export const storage = getStorage(appDatabase);
export const database = getFirestore(appDatabase);
export const auth = getAuth(appAuth);
