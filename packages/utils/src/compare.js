export const equalsIgnoreOrder = (a = [], b = []) => {
  if (a.length !== b.length) {
    return false;
  }
  const uniqueValues = new Set([...a, ...b]);
  for (const v of uniqueValues) {
    const aCount = a.filter(e => e.id === v.id).length;
    const bCount = b.filter(e => e.id === v.id).length;
    if (aCount !== bCount) {
      return false;
    }
  }
  return true;
};
