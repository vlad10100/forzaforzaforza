import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

const popup = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential) return

    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user, token)
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

export {popup}