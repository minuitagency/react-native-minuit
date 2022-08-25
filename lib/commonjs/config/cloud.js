"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settingsRef = exports.default = exports.credentials = void 0;

var _app = _interopRequireDefault(require("firebase/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('firebase/functions');

require('firebase/firestore');

require('firebase/storage');

const credentials = {
  apiKey: 'AIzaSyCPXNqQaCr3lBpKfezmI6hlu672AmPVlMA',
  authDomain: 'minuitcloud.firebaseapp.com',
  projectId: 'minuitcloud',
  storageBucket: 'minuitcloud.appspot.com',
  messagingSenderId: '943006074419',
  appId: '1:943006074419:web:d23d3a14046b6492658546'
};
exports.credentials = credentials;
let cloudInstance = _app.default;

if (!_app.default.apps.filter(_ref => {
  let {
    name_
  } = _ref;
  return name_ === 'CLOUD';
}).length) {
  cloudInstance = _app.default.initializeApp(credentials, 'CLOUD');
  __DEV__ && cloudInstance.functions().useEmulator('localhost', 5001);
}

const settingsRef = cloudInstance.firestore().collection('settings');
exports.settingsRef = settingsRef;
var _default = cloudInstance;
exports.default = _default;
//# sourceMappingURL=cloud.js.map