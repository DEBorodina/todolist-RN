import * as firebase from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDmh9P_INq41th6y9AtyKTLesADuFImowM',
  authDomain: 'todolist-e6233.firebaseapp.com',
  projectId: 'todolist-e6233',
  storageBucket: 'todolist-e6233.firebasestorage.app',
  messagingSenderId: '779966552234',
  appId: '1:779966552234:web:e42b683463a92b8e4fd8d3',
  measurementId: 'G-GYJ6NX6ZXP',
};

const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);
