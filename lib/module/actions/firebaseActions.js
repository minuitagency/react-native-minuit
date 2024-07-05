import firebase from 'firebase/app';
import 'firebase/storage';

export enum FirebaseTaskState {
  SUCCESS = 'success',
  ERROR = 'error',
  RUNNING = 'running',
  PAUSED = 'paused',
  CANCELED = 'canceled'
}

export interface UploadResult {
  resultURI: string;
}

export function uploadToFirebase(firebase: typeof import('firebase/app'), file: File, path: string): Promise<UploadResult> {
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
