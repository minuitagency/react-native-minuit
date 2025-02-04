import firebase from "firebase/compat/app";
require("firebase/compat/functions");
require("firebase/compat/firestore");
require("firebase/compat/storage");

export const credentials = {
  apiKey: "AIzaSyCPXNqQaCr3lBpKfezmI6hlu672AmPVlMA",
  authDomain: "minuitcloud.firebaseapp.com",
  projectId: "minuitcloud",
  storageBucket: "minuitcloud.appspot.com",
  messagingSenderId: "943006074419",
  appId: "1:943006074419:web:d23d3a14046b6492658546",
};

let cloudInstance = firebase;

// Initialize Firebase only if it hasn't been initialized yet
if (!firebase.apps.filter(({ name_ }) => name_ === "CLOUD").length) {
  try {
    cloudInstance = firebase.initializeApp(credentials, "CLOUD");
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

// Check if Firestore is enabled before creating references
let projectsRef, settingsRef;
try {
  const firestoreInstance = cloudInstance.firestore();
  projectsRef = firestoreInstance.collection("projects");
  settingsRef = firestoreInstance.collection("settings");
} catch (error) {
  console.error("Firestore service error:", error);
  // You might want to handle this error appropriately in your application
}

export { projectsRef, settingsRef };
export default cloudInstance;
