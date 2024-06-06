import firebase from "firebase/compat/app";
import "firebase/compat/functions";
import "firebase/compat/firestore";
import "firebase/compat/storage";

export const credentials: firebase.app.AppOptions = {
  apiKey: "AIzaSyCPXNqQaCr3lBpKfezmI6hlu672AmPVlMA",
  authDomain: "minuitcloud.firebaseapp.com",
  projectId: "minuitcloud",
  storageBucket: "minuitcloud.appspot.com",
  messagingSenderId: "943006074419",
  appId: "1:943006074419:web:d23d3a14046b6492658546",
};

let cloudInstance: firebase.app.App = firebase;

if (!firebase.apps.filter(({ name_ }) => name_ === "CLOUD").length) {
  cloudInstance = firebase.initializeApp(credentials, "CLOUD");
}

export const projectsRef: firebase.firestore.CollectionReference = cloudInstance.firestore().collection("projects");
export const settingsRef: firebase.firestore.CollectionReference = cloudInstance.firestore().collection("settings");

export default cloudInstance;