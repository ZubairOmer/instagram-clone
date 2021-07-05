import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtDftYnt9CAICSnEcTQItOYh1_J-86Qas",
  authDomain: "instagram-clone-3735f.firebaseapp.com",
  projectId: "instagram-clone-3735f",
  storageBucket: "instagram-clone-3735f.appspot.com",
  messagingSenderId: "843227845206",
  appId: "1:843227845206:web:5127ef0812305f60c0a1f7",
  measurementId: "G-Z1D1D2L451"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {db, auth, storage}