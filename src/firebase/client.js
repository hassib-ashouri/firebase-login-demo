import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDnS_dhRQM8BKYoCPVy0VX8AQmkkYU2lTg",
    authDomain: "lendnow-login.firebaseapp.com",
    projectId: "lendnow-login",
    storageBucket: "lendnow-login.appspot.com",
    messagingSenderId: "1038614721846",
    appId: "1:1038614721846:web:46f87024b3774e56116f97"
};

export const app = initializeApp(firebaseConfig);
