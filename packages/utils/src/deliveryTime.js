import ReactN from 'reactn';
import firebase from '@react-native-firebase/app';
import * as geofirex from 'geofirex';
import { getLocFromGeopoint } from './index';

const geo = geofirex.init(firebase);

// Return the preparation + delivery time (min)
export function calcDeliveryTime(preparationTime = 0, sellerLoc, userLoc) {
  if (!userLoc)
    userLoc = getLocFromGeopoint(ReactN.getGlobal().selectedLocation?.location);

  const distance = geo.distance(
    geo.point(userLoc.latitude, userLoc.longitude),
    geo.point(sellerLoc.latitude, sellerLoc.longitude)
  );

  return parseInt((preparationTime + distance * 5).toFixed());
}

export function deliveryTimeToInterval(deliveryTime) {
  return `${deliveryTime} min`;
  const min = deliveryTime > 10 ? Math.round(deliveryTime / 10) * 10 : 5;
  const max = deliveryTime > 10 ? Math.ceil(deliveryTime / 10) * 10 : 15;
  return `${min}-${max} min`;
}
