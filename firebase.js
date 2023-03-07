import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyD9nb5_600Cg8h8WOiCZ3-qsq0lCROUJJI",
  authDomain: "amzn-clone-fae9a.firebaseapp.com",
  projectId: "amzn-clone-fae9a",
  storageBucket: "amzn-clone-fae9a.appspot.com",
  messagingSenderId: "425048762",
  appId: "1:425048762:web:984fe2d21eaa84e3556083"
};

export const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()
export const db = getFirestore(app)