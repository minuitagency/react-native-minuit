export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type MapRef = {
  current: {
    animateToRegion: (region: Region, duration: number) => void;
  };
};

export type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export const animateToCoordinates = ({
  coordinates: { latitude, longitude },
  mapRef
}: {
  coordinates: Coordinates;
  mapRef: MapRef;
}): void => {
  mapRef.current.animateToRegion(
    {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    },
    1000
  );
};

export function getDistance(point1: Coordinates, point2: Coordinates): string {
  const lat1 = point1.latitude;
  const lat2 = point2.latitude;
  const lon1 = point1.longitude;
  const lon2 = point2.longitude;
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  return (dist * 0.8684).toFixed(0);
}
//# sourceMappingURL=locationActions.js.map
