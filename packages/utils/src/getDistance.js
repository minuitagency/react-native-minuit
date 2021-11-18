import firebase from '@react-native-firebase/app';
import * as geofirex from 'geofirex';

const geo = geofirex.init(firebase);

// Return the distance between 2 locs
export function getDistance(loc1, loc2, number = false) {
  if (number) {
    return geo.distance(
      geo.point(loc1.latitude, loc1.longitude),
      geo.point(loc2.latitude, loc2.longitude)
    );
  }
  return (
    geo
      .distance(
        geo.point(loc1.latitude, loc1.longitude),
        geo.point(loc2.latitude, loc2.longitude)
      )
      .toFixed(1) + ' km'
  );
}
