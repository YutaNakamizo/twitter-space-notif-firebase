import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDRFSQh4y65zqAix_8ttEBwWXFLREyZr34",
  authDomain: "twitter-space-notif.firebaseapp.com",
  projectId: "twitter-space-notif",
  storageBucket: "twitter-space-notif.appspot.com",
  messagingSenderId: "982475283020",
  appId: "1:982475283020:web:5abec0c5710c53f28ab2e9",
  measurementId: "G-90CVE5055M"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

