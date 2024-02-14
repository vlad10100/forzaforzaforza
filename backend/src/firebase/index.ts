import {initializeApp} from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithCustomToken, signInWithCredential } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import admin from "firebase-admin"
import { getDoc, doc } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: 'AIzaSyDuAdF7JIjSCQvJFVhu4KpbaRO2fp-BORE',
  authDomain: 'forzaforzaforza-3fb61.firebaseapp.com',
  projectId: 'forzaforzaforza-3fb61',
  storageBucket: 'forzaforzaforza-3fb61.appspot.com',
  messagingSenderId: '144609460325',
  appId: '1:144609460325:web:806157142379ec969f068c',
  measurementId: 'G-NESQ7V2HW4'
}



// const serviceAccount: Object = {
//   type: "service_account",
//   project_id: "forzaforzaforza-3fb61",
//   private_key_id: "3c602d35f1ca052b2168e31753f5b93e36127bf4",
//   private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDR84853a03a5af\nezQoJQXFWpyOAK5v5xxdu4/pIrBuDeu8oxQDBJrfDCeAIwUlQw71ZlTzMCUr3Pmy\ndnnPaP7WDgfERSQu8JnZUQ8lCvPz2i0Ita9emiLbWlcNVXvX2q4wEiKjfuzlQgBF\n3OPNz6CA9W8i4S2houvpN5pjLhSjkyN5yzWYzVhaDvT0K1MwH0dIxlU+PxX2eyWG\nto9mfh/SG/6EuwJN/Ud0yF67C/Y9vZYEIS0lFlQlW43PBgtp97loAl6rKgaQwVG1\n+37sRB/iaRYsVcySN6anyrwATQcGk8vnPainOUbQBkpqzT/HAXZ9joYJfjJuhxoA\nm+XuzzolAgMBAAECggEAQlUzcVLqgVIKusSQTAa2dg4U3IC2nEBmo+64ny4IlBzt\n2CGmFvYDgGk0qbVm0MkJFtuIB3W0qNEeSxZHkhJYQYUZSxeVQQdfdFu57zgwr2DF\nTbUpfTgxvyAh1OKnSCGdWy6/puxZKG3b7DbH+qSYz2W8AUcnxaPV6U9aBe/vMWae\nvxFO5DiTovGMAswHy4O08gD6L8tg+CnQc6RTQqMUy1CYAYjL5bdekzqEtIdmoIW1\nX0lpoR4SaXFL5Md2B0DiQeaFrP9tE9tkmCoKStpO01VVLFTAAsQl/IZJf2owI62l\nDvoW2uv9sQ3EaT6TSDm1e6KAjsEfJM4snQmURTd02QKBgQD4JZv1qqCP3JJUo74h\nn3rEbEGxAfi9SaDO/AjTQrWuMDSlLqlFPvLmy79CVM+DT4qVe9jo6qkF3I7zMgpN\nTP7+tsSid0uZcQH+oMRmP/6UlIrfoiPD1qXzukCZ7EnFQKYHZMHypELL+CFHo0fq\n+gN5oPwuD0b1m/jihiELMOxZJwKBgQDYmIFFJ1Nu9YwRomV/BBmJ/IQYXob5QkTt\n2o/6Hmm4pNQ+SHvy1XweaK6cRm+LrusYzVXhPSzlvnqw8N2jxRrVgveQlwLS3DyJ\ng0SRKD7+1XHm5dwguVd7YebvC4kC8XOB78NSpTyMiPjl6QnjC8lr5QD4cOKfYr90\no2z3ZAGp0wKBgDoCyNAIwJqBLTBeSz+fAdtTl5Pi6xyNTuu0nfeNe92p5VTMcMQA\ncFamQSMnoo+HE9XYayAgY708D6spAqGJo382iQeWLfVEJvw451EkGsbvZvva8tOA\npbEx1JJnW+OiNm46DuFDp135twYBVPnI0vEnQm0eIy+d8/Q4+RadrFM3AoGAcUbZ\nHLSjgv1ygup+0H3xaWQiJaiSSJwq9oZ/FB2BxyqVQfmgsXCLWFABOgPwZIpXtAH3\nrzPSXllPS2i9UeBM12uGVB1WQbcjBfwcCRqWT6qLxmlixc6I/SNHpq9OubZTZZpi\neb+nOgyMt5k4LYFFl2MOLeDD9P2tCbBK1dt8rzcCgYBwPyZszclThHezOFnzr/69\nsbkBQOIIrhWJFyAAFbnU0L7i4oHD4s9RLNGfrVUm/oAav94fICYqWpUYHFeZVMVT\nXD+tAZE2EI/pr5vkktSUJgB2z58IUE1OVjqcLpDVuLw0/aT6LkSFaQr4E1HHDMWm\nbO/Zb4yw9Qp1pSo+9Xyrgw==\n-----END PRIVATE KEY-----\n",
//   client_email: "firebase-adminsdk-ocsjd@forzaforzaforza-3fb61.iam.gserviceaccount.com",
//   client_id: "116812547731100287289",
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ocsjd%40forzaforzaforza-3fb61.iam.gserviceaccount.com",
//   universe_domain: "googleapis.com"
// }

initializeApp(firebaseConfig);
const db = getFirestore();


// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://forzaforzaforza-3fb61.firebaseio.com"
// });
// const adminDb = admin.firestore()
// let token = ""
// const uid = "ETRZp2uL61anhK2FykGiRtYM1t32"
// admin.auth().createCustomToken(uid)
// .then((customToken) => {
//   console.log(customToken)
//   token = customToken
// })

// const x = async () => {
//   const athleteDoc = doc(db, 'athletes', uid)
//   const resp = await getDoc(athleteDoc)
//   console.log(resp.data())
// }
const id_token = "ETRZp2uL61anhK2FykGiRtYM1t32"
const credential = GoogleAuthProvider.credential(id_token);
const auth = getAuth();
const xyz = signInWithCredential(auth, credential).catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  const email = error.customData.email;
  // The AuthCredential type that was used.
  const credential = GoogleAuthProvider.credentialFromError(error);
  // ...
});
const vlad = async () => {
  await signInWithCredential(auth, credential)
}
vlad()
export { db };
