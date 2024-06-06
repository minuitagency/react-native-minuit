import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
export enum TaskState {
  SUCCESS = 'success',
  ERROR = 'error',
  RUNNING = 'running',
  PAUSED = 'paused',
  CANCELED = 'canceled',
}
export enum TaskEvent {
  STATE_CHANGED = 'state_changed',
}
export interface UploadResult {
  resultURI: string;
}
export function uploadToFirebase(
  firebase: typeof import('firebase/app'),
  file: File,
  path: string
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    try {
      firebase
        .storage()
        .ref(path)
        .put(file)
        .on(
          TaskEvent.STATE_CHANGED,
          (snapshot: firebase.storage.UploadTaskSnapshot) => {
            if (snapshot.state === TaskState.SUCCESS) {
              snapshot.ref.getDownloadURL().then((resultURI: string) => {
                resolve({ resultURI });
              });
            }
          },
          (error: Error) => {
            reject(error);
          }
        );
    } catch (e) {
      reject(e);
    }
  });
}
export interface FirestoreCheckParams {
  ref: firebase.firestore.CollectionReference;
  field: string;
  value: any;
  operator?: firebase.firestore.WhereFilterOp;
}
export async function isAlreadyInFirestore({
  ref,
  field,
  value,
  operator = '==',
}: FirestoreCheckParams): Promise<boolean> {
  const { docs = [] } = await ref.where(field, operator, value).get();
  return docs.length > 0;
}