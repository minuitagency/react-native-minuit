export const getThumb = (url, size = 400) => {
  const containsJpeg = url.includes('.jpeg');
  const containsJpg = url.includes('.jpg');
  if ([400, 800, 1600].includes(size) && (containsJpeg || containsJpg)) {
    return url.replace(containsJpeg ? '.jpeg' : '.jpg', `_${size}.jpeg`);
  } else {
    return url;
  }
};
