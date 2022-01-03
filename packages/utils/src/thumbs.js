export const getThumb = (url, size = 400) => {
  if ([400, 800].includes(size)) return url.replace('.jpeg', `_${size}.jpeg`);
  else return url;
};
