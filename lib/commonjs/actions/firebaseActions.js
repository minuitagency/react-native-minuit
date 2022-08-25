"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadToFirebase = uploadToFirebase;

function uploadToFirebase(firebase, file, path) {
  return new Promise((resolve, reject) => {
    try {
      firebase.storage().ref(path).putFile(file).on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          snapshot.ref.getDownloadURL().then(resultURI => {
            resolve({
              resultURI
            });
          });
        }
      }, error => {
        reject(error);
      });
    } catch (e) {
      reject(e);
    }
  });
}
//# sourceMappingURL=firebaseActions.js.map