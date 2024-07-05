import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

export function uploadToFirebase(firebase: firebase.app.App, file: File, path: string): Promise<{ resultURI: string }> {
  return new Promise((resolve, reject) => {
    try {
      firebase
        .storage()
        .ref(path)
        .put(file)
        .on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot: firebase.storage.UploadTaskSnapshot) => {
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
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

interface FirestoreCheckParams {
  ref: firebase.firestore.Query;
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
