"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcNbOfRating = calcNbOfRating;
exports.calcRating = calcRating;
exports.openURL = void 0;
exports.uploadToCloud = uploadToCloud;

import { Linking } from "react-native";
import cloud from "../config/cloud";

const openURL = (url: string | null): void => {
  if (url) {
    Linking.openURL(url);
  }
};

exports.openURL = openURL;

interface UploadParams {
  uri: string;
  path?: string | null;
}

function uploadToCloud({ uri, path = null }: UploadParams): Promise<{ uri: string }> {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(path);
      const response = await fetch(uri);
      const blob = await response.blob();

      const uploadTask = cloud.storage().ref(path).put(blob);

      uploadTask.on('state_changed', snapshot => {
        console.log(snapshot);
      }, error => {
        reject(error);
      }, async () => {
        const url = await cloud.storage().ref(path).getDownloadURL();
        resolve({
          uri: url
        });
      });
    } catch (e) {
      reject(e);
    }
  });
} // calc from array of rating [0, 1, 1, 2, 2, 1]


function calcNbOfRating(rating: number[]): number {
  return rating?.reduce((t, n) => t + n, 0) ?? 0;
}

function calcRating(rating: number[]): string {
  const numberOfRating = calcNbOfRating(rating);

  if (numberOfRating === 0) {
    return "0";
  }

  return ((rating?.reduce((t, n, i) => t + n * i, 0) ?? 0) / numberOfRating).toFixed(1);
}
//# sourceMappingURL=userActions.js.map