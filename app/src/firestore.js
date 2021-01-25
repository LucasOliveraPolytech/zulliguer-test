import * as firebase from 'firebase'
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAOSD8-KDOHsGz94P_fdJKg9-6hG7JJY3g",
  authDomain: "my-first-test-1e6f4.firebaseapp.com",
  databaseURL: "https://my-first-test-1e6f4.firebaseio.com",
  projectId: "my-first-test-1e6f4",
  storageBucket: "my-first-test-1e6f4.appspot.com",
  messagingSenderId: "1062040545280",
  appId: "1:1062040545280:web:fda37d79913a38339110e5"
};
// Initialize Firebase firestore only once
export default !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore();