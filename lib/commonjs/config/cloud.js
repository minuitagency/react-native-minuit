"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settingsRef = exports.default = exports.credentials = void 0;
import firebase from 'firebase/compat/app';
import 'firebase/compat/functions';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
interface Credentials {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
const credentials: Credentials = {
  apiKey: 'AIzaSyCPXNqQaCr3lBpKfezmI6hlu672AmPVlMA',
  authDomain: 'minuitcloud.firebaseapp.com',
  projectId: 'minuitcloud',
  storageBucket: 'minuitcloud.appspot.com',
  messagingSenderId: '943006074419',
  appId: '1:943006074419:web:d23d3a14046b6492658546'
};
exports.credentials = credentials;
let cloudInstance: firebase.app.App = firebase;
if (!firebase.apps.filter(({ name_ }) => name_ === 'CLOUD').length) {
  cloudInstance = firebase.initializeApp(credentials, 'CLOUD');
  if (__DEV__) {
    cloudInstance.functions().useEmulator('localhost', 5001);
  }
}
const settingsRef = cloudInstance.firestore().collection('settings');
exports.settingsRef = settingsRef;
const _default = cloudInstance;
exports.default = _default;