import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseConfig from './firebaseConfig'; // Ensure the path is correct

// Initialize Firebase app (only if it has not been initialized yet)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Set persistence to AsyncStorage
});

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

// Initialize Realtime Database
const database = getDatabase(app);

// Export the initialized services
export { app, auth, firestore, storage, database };
