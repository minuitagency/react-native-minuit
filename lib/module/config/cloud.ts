import firebase from 'firebase/compat/app';
import 'firebase/compat/functions';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

export interface FirebaseCredentials {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export const credentials: FirebaseCredentials = {
  apiKey: 'AIzaSyCPXNqQaCr3lBpKfezmI6hlu672AmPVlMA',
  authDomain: 'minuitcloud.firebaseapp.com',
  projectId: 'minuitcloud',
  storageBucket: 'minuitcloud.appspot.com',
  messagingSenderId: '943006074419',
  appId: '1:943006074419:web:d23d3a14046b6492658546'
};

let cloudInstance: firebase.app.App = firebase;

if (!firebase.apps.filter((app: firebase.app.App) => {
  const { name_ } = app;
  return name_ === 'CLOUD';
}).length) {
  cloudInstance = firebase.initializeApp(credentials, 'CLOUD');
  if (__DEV__) {
    cloudInstance.functions().useEmulator('localhost', 5001);
  }
}

export const settingsRef = cloudInstance.firestore().collection('settings');
export default cloudInstance;
//# sourceMappingURL=cloud.js.map
