import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAf7AvgsLfEOzSrBU7T-93N1-he2cYZ0ME",
    authDomain: "snapchat-clone-94487.firebaseapp.com",
    projectId: "snapchat-clone-94487",
    storageBucket: "snapchat-clone-94487.appspot.com",
    messagingSenderId: "269265980446",
    appId: "1:269265980446:web:e3a3bd3e4f621e23a8720f",
    measurementId: "G-HH2D544FPR"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const storage = firebase.storage()
  const provider = new firebase.auth.GoogleAuthProvider();
  export {db,storage,auth,provider}