export function uploadToFirebase(firebase, file, path) {
  return new Promise((resolve, reject) => {
    try {
      firebase
        .storage()
        .ref(path)
        .putFile(file)
        .on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              snapshot.ref.getDownloadURL().then((resultURI) => {
                resolve({ resultURI });
              });
            }
          },
          (error) => {
            reject(error);
          }
        );
    } catch (e) {
      reject(e);
    }
  });
}

export async function isAlreadyInFirestore({
  ref,
  field,
  value,
  operator = '==',
}) {
  const { docs = [] } = await ref.where(field, operator, value).get();
  return docs.length > 0;
}
