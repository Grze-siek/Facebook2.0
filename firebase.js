import firebase from 'firebase';
import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDkJwsgzWZr6xAN2DAl7uM-LArwYMFblzQ',
  authDomain: 'facebook-2-9b565.firebaseapp.com',
  projectId: 'facebook-2-9b565',
  storageBucket: 'facebook-2-9b565.appspot.com',
  messagingSenderId: '483577770912',
  appId: '1:483577770912:web:e4ab3872d3cd21b3cf2ac5',
};

// Initialize Firebase
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const db = app.firestore();
export const storage = firebase.storage();
