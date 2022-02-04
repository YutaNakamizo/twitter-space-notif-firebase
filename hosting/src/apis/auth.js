import {
  app,
} from '~/apis/firebase';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  TwitterAuthProvider,
  signInWithRedirect,
  onAuthStateChanged as onAuthStateChanged_firebase,
  signOut as signOut_firebase,
  getIdToken as getIdToken_firebase,
} from "firebase/auth";

const auth = getAuth();
const provider = new TwitterAuthProvider();

export const signIn = () => {
  return setPersistence(auth, browserLocalPersistence).then(() => {
    signInWithRedirect(auth, provider);
    return;
  }).catch(err => {
    throw err;
  });
};

export const onAuthStateChanged = (onSuccess, onError, onFinish) => {
  return onAuthStateChanged_firebase(auth, onSuccess, onError, onFinish);
};

export const signOut = () => {
  signOut_firebase(auth).then(() => {
    return;
  }).catch(err => {
    throw err;
  });
};

export const getIdToken = (user) => {
  return getIdToken_firebase(
    user || auth.currentUser,
    true
  );
};

