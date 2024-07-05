"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base64ToArrayBuffer = base64ToArrayBuffer;
exports.uint8ToBase64 = uint8ToBase64;

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary_string = atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }

  return bytes.buffer;
}

function uint8ToBase64(u8Arr: Uint8Array): string {
  const CHUNK_SIZE = 0x8000; //arbitrary number

  let index = 0;
  const length = u8Arr.length;
  let result = '';
  let slice;

  while (index < length) {
    slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
    result += String.fromCharCode.apply(null, slice as unknown as number[]);
    index += CHUNK_SIZE;
  }

  return btoa(result);
}
//# sourceMappingURL=pictureActions.js.map
