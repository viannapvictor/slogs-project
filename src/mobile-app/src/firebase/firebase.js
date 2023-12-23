import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseSettings = {
    apiKey: "AIzaSyBFU3k0VlMtwaw-ELEDwVvTQSCA5FznN_Q",
    authDomain: "slogs-mobile.firebaseapp.com",
    projectId: "slogs-mobile",
    storageBucket: "slogs-mobile.appspot.com",
    messagingSenderId: "661116852361",
    appId: "1:661116852361:web:f74614aeb85a60c006ce58"
};

const firebaseApp = initializeApp(firebaseSettings);

export const db = getFirestore(firebaseApp);

export const auth = getAuth(firebaseApp);