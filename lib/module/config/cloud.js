import firebase from 'firebase/compat/app';

require('firebase/compat/functions');

require('firebase/compat/firestore');

require('firebase/compat/storage');

export const credentials = {
  apiKey: 'AIzaSyCPXNqQaCr3lBpKfezmI6hlu672AmPVlMA',
  authDomain: 'minuitcloud.firebaseapp.com',
  projectId: 'minuitcloud',
  storageBucket: 'minuitcloud.appspot.com',
  messagingSenderId: '943006074419',
  appId: '1:943006074419:web:d23d3a14046b6492658546'
};
let cloudInstance = firebase;

if (!firebase.apps.filter(_ref => {
  let {
    name_
  } = _ref;
  return name_ === 'CLOUD';
}).length) {
  cloudInstance = firebase.initializeApp(credentials, 'CLOUD');
  __DEV__ && cloudInstance.functions().useEmulator('localhost', 5001);
}

export const settingsRef = cloudInstance.firestore().collection('settings');
export default cloudInstance;
//# sourceMappingURL=cloud.js.map
