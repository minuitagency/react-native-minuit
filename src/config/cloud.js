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

if (!firebase.apps.filter(({ name_ }) => name_ === "CLOUD").length) {
  cloudInstance = firebase.initializeApp(credentials, "CLOUD");
}

export const projectsRef = cloudInstance.firestore().collection("projects");
export const settingsRef = cloudInstance.firestore().collection("settings");

export default cloudInstance;
