"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcNbOfRating = calcNbOfRating;
exports.calcRating = calcRating;
exports.openURL = void 0;
exports.uploadToCloud = uploadToCloud;

var _reactNative = require("react-native");

var _cloud = _interopRequireDefault(require("../config/cloud"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const openURL = url => {
  if (url) {
    _reactNative.Linking.openURL(url);
  }
};

exports.openURL = openURL;

function uploadToCloud(_ref) {
  let {
    uri,
    path = null
  } = _ref;
  return new Promise(async (resolve, reject) => {
    try {
      console.log(path);
      const response = await fetch(uri);
      const blob = await response.blob();

      const uploadTask = _cloud.default.storage().ref(path).put(blob);

      uploadTask.on('state_changed', snapshot => {
        console.log(snapshot);
      }, error => {
        reject(error);
      }, async () => {
        const url = await _cloud.default.storage().ref(path).getDownloadURL();
        resolve({
          uri: url
        });
      });
    } catch (e) {
      reject(e);
    }
  });
} // calc from array of rating [0, 1, 1, 2, 2, 1]


function calcNbOfRating(rating) {
  return rating === null || rating === void 0 ? void 0 : rating.reduce((t, n) => t + n);
}

function calcRating(rating) {
  const numberOfRating = calcNbOfRating(rating);

  if (numberOfRating === 0) {
    return 0;
  }

  return ((rating === null || rating === void 0 ? void 0 : rating.reduce((t, n, i) => t + n * i, 0)) / numberOfRating).toFixed(1);
}
//# sourceMappingURL=userActions.js.map