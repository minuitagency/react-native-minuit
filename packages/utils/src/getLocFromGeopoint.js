export default function getLocFromGeopoint(loc) {
  const latitude = loc.geopoint._latitude || loc.geopoint.latitude;
  const longitude = loc.geopoint._longitude || loc.geopoint.longitude;
  return { latitude, longitude };
}
