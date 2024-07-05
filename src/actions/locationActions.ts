import { Linking, Platform } from 'react-native';
import { setGlobal } from 'reactn';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface AnimateToCoordinatesParams {
  coordinates: Coordinates;
  mapRef: React.RefObject<any>;
}

export const animateToCoordinates = ({
  coordinates: { latitude, longitude },
  mapRef,
}: AnimateToCoordinatesParams): void => {
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

interface OpenInMapParams {
  name: string;
  latitude: number;
  longitude: number;
  errorMsg?: string;
}

export async function openInMap({
  name,
  latitude,
  longitude,
  errorMsg = "Impossible d'ouvrir la carte",
}: OpenInMapParams): Promise<void> {
  try {
    await Linking.openURL(
      Platform.select({
        ios: `maps:${latitude},${longitude}?q=${name}`,
        android: `geo:${latitude},${longitude}?q=(${name})`,
      }) as string
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
