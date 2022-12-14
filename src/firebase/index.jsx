import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const config = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: `1:${import.meta.env.VITE_MESSAGING_SENDER_ID}:web:${import.meta.env.VITE_APP_ID}`
}

const app = initializeApp(config)
const db = getFirestore(app)

const auth = getAuth(app)

// const admin = getAuthAdmin(app)
export { db, auth, config }