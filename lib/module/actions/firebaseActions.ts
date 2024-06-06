export enum TaskState {
  SUCCESS = 'success',
  ERROR = 'error',
  RUNNING = 'running',
  PAUSED = 'paused',
  CANCELED = 'canceled'
}
export enum TaskEvent {
  STATE_CHANGED = 'state_changed'
}
export interface Firebase {
  storage: () => {
    ref: (path: string) => {
      putFile: (file: File) => {
        on: (event: TaskEvent, 
             next: (snapshot: Snapshot) => void, 
             error: (error: Error) => void) => void;
      };
    };
  };
}
export interface Snapshot {
  state: TaskState;
  ref: {
    getDownloadURL: () => Promise<string>;
  };
}
export function uploadToFirebase(firebase: Firebase, file: File, path: string): Promise<{ resultURI: string }> {
  return new Promise((resolve, reject) => {
    try {
      firebase.storage().ref(path).putFile(file).on(TaskEvent.STATE_CHANGED, snapshot => {
        if (snapshot.state === TaskState.SUCCESS) {
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