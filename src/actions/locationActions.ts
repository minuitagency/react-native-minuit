import { Linking, Platform } from 'react-native';
import { setGlobal } from 'reactn';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type MapRef = {
  current: {
    animateToRegion: (region: Region, duration: number) => void;
  };
};

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export const animateToCoordinates = ({
  coordinates: { latitude, longitude },
  mapRef,
}: {
  coordinates: Coordinates;
  mapRef: MapRef;
}) => {
  mapRef.current.animateToRegion(
    {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    1000
  );
};

export function getDistance(point1: Coordinates, point2: Coordinates): string | null {
  if (!point1?.latitude || !point2?.latitude) {
    return null;
  }
  let lat1 = point1.latitude;
  let lat2 = point2.latitude;
  let lon1 = point1.longitude;
  let lon2 = point2.longitude;
  let radlat1 = (Math.PI * lat1) / 180;
  let radlat2 = (Math.PI * lat2) / 180;
  let theta = lon1 - lon2;
  let radtheta = (Math.PI * theta) / 180;
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

export async function openInMap({
  name,
  latitude,
  longitude,
  errorMsg = "Impossible d'ouvrir la carte",
}: {
  name: string;
  latitude: number;
  longitude: number;
  errorMsg?: string;
}): Promise<void> {
  try {
    await Linking.openURL(
      Platform.select({
        ios: `maps:${latitude},${longitude}?q=${name}`,
        android: `geo:${latitude},${longitude}?q=(${name})`,
      }) || ''
    );
  } catch (e) {
    console.log(e);
    await setGlobal({
      _tooltip: {
        msg: errorMsg,
        type: 'error',
      },
    });
  }
}