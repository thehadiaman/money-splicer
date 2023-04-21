/**
 * Import the functions you need from the SDKs you need
 */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

/**
 * Your web app's Firebase configuration
 * For Firebase JS SDK v7.20.0 and later, measurementId is optional
 */
const firebaseConfig = {
  apiKey: "AIzaSyDUiDve2MamE3muyELUgcNHY_tZeaoOzYY",
  authDomain: "money-splicer.firebaseapp.com",
  databaseURL: "https://money-splicer-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "money-splicer",
  storageBucket: "money-splicer.appspot.com",
  messagingSenderId: "124490451704",
  appId: "1:124490451704:web:97ed6d44007c9edf10c90d",
  measurementId: "G-K571JDXJXC"
};

/**
 * Initialize Firebase
 */
export const fireApp = initializeApp(firebaseConfig);

/**
 * Initialize Realtime Database and get a reference to the service
 */
export const database = getDatabase(fireApp);

/**
 * Initialize Firebase Authentication and get a reference to the service
 */
export const auth = getAuth(fireApp);