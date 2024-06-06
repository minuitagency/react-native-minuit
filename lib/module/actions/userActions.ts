import { Linking } from 'react-native';
import cloudInstance from '../config/cloud';
export const openURL = (url: string): void => {
  if (url) {
    Linking.openURL(url);
  }
};
interface UploadParams {
  uri: string;
  path?: string | null;
}
export function uploadToCloud({ uri, path = null }: UploadParams): Promise<{ uri: string }> {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(path);
      const response = await fetch(uri);
      const blob = await response.blob();
      const uploadTask = cloudInstance.storage().ref(path).put(blob);
      uploadTask.on('state_changed', snapshot => {
        console.log(snapshot);
      }, error => {
        reject(error);
      }, async () => {
        const url = await cloudInstance.storage().ref(path).getDownloadURL();
        resolve({
          uri: url
        });
      });
    } catch (e) {
      reject(e);
    }
  });
}
export function calcNbOfRating(rating: number[]): number | undefined {
  return rating?.reduce((t, n) => t + n);
}
export function calcRating(rating: number[]): string {
  const numberOfRating = calcNbOfRating(rating);
  if (numberOfRating === 0) {
    return '0';
  }
  return ((rating?.reduce((t, n, i) => t + n * i, 0)) / numberOfRating).toFixed(1);
}