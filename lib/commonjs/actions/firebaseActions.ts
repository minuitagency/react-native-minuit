"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadToFirebase = uploadToFirebase;
import firebase from 'firebase/app';
import 'firebase/storage';
enum TaskState {
  SUCCESS = 'success',
  FAILURE = 'failure'
}
interface UploadResult {
  resultURI: string;
}
function uploadToFirebase(firebase: firebase.app.App, file: File, path: string): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    try {
      firebase.storage().ref(path).put(file).on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: firebase.storage.UploadTaskSnapshot) => {
        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          snapshot.ref.getDownloadURL().then((resultURI: string) => {
            resolve({
              resultURI
            });
          });
        }
      }, (error: Error) => {
        reject(error);
      });
    } catch (e) {
      reject(e);
    }
  });
}
//# sourceMappingURL=firebaseActions.js.map