// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBckJg7zK_k4nBg5IZxZDPT8UbTRoO4m9w",
  authDomain: "hubla-df29d.firebaseapp.com",
  projectId: "hubla-df29d",
  storageBucket: "hubla-df29d.appspot.com",
  messagingSenderId: "777617026551",
  appId: "1:777617026551:web:0d2265f7834e2ce4ba52f2",
  measurementId: "G-QSHH1CK7GH",
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
