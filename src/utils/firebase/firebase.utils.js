import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmUvJlUqyJNVDI4e3Es5ueoBoji6y8H4E",
  authDomain: "capstone-project-b5fc9.firebaseapp.com",
  projectId: "capstone-project-b5fc9",
  storageBucket: "capstone-project-b5fc9.appspot.com",
  messagingSenderId: "507179738447",
  appId: "1:507179738447:web:bb0e160520dbbcde1b513a",
  measurementId: "G-T3EJQMX620",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());

  // if user data does not exist
  if (!userSnapShot.exists()) {
    // console.log("I'm in");
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error==>", error.message);
    }
  }
  return userDocRef;
};
// if user data exists
