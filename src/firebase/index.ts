import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuAdF7JIjSCQvJFVhu4KpbaRO2fp-BORE",
  authDomain: "forzaforzaforza-3fb61.firebaseapp.com",
  projectId: "forzaforzaforza-3fb61",
  storageBucket: "forzaforzaforza-3fb61.appspot.com",
  messagingSenderId: "144609460325",
  appId: "1:144609460325:web:806157142379ec969f068c",
  measurementId: "G-NESQ7V2HW4"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export {auth, provider}