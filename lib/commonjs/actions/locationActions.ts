"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animateToCoordinates = void 0;
exports.getDistance = getDistance;

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MapRef {
  current: {
    animateToRegion: (region: Region, duration: number) => void;
  };
}

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface AnimateToCoordinatesParams {
  coordinates: Coordinates;
  mapRef: MapRef;
}

const animateToCoordinates = ({ coordinates: { latitude, longitude }, mapRef }: AnimateToCoordinatesParams): void => {
  mapRef.current.animateToRegion({
    latitude,
    longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  }, 1000);
};

exports.animateToCoordinates = animateToCoordinates;

function getDistance(point1: Coordinates, point2: Coordinates): string {
  let lat1 = point1.latitude;
  let lat2 = point2.latitude;
  let lon1 = point1.longitude;
  let lon2 = point2.longitude;
  let radlat1 = Math.PI * lat1 / 180;
  let radlat2 = Math.PI * lat2 / 180;
  let theta = lon1 - lon2;
  let radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  return (dist * 0.8684).toFixed(0);
}
//# sourceMappingURL=locationActions.js.map
