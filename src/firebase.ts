import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0mssAKAoZAHQNZDqJSR_mtDU5djEKmnk",
  authDomain: "mvp-community-web.firebaseapp.com",
  projectId: "mvp-community-web",
  storageBucket: "mvp-community-web.firebasestorage.app",
  messagingSenderId: "339336485880",
  appId: "1:339336485880:web:6b06374de5fb578216540d",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
export const now = serverTimestamp();
