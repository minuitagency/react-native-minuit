import { calcTotal, calcTVA } from './calcPrices';
import { equalsIgnoreOrder } from './compare';
import { calcDeliveryTime, deliveryTimeToInterval } from './deliveryTime';
import { isFavorite } from './favorites';
import { getDistance } from './getDistance';
import { calcNbOfRating, calcRating } from './rating';
import { formatPhoneNumber, removeSpaces } from './phoneAuth';
import { getThumb } from './thumbs';
import getLocFromGeopoint from './getLocFromGeopoint';

export {
  calcTotal,
  calcTVA,
  equalsIgnoreOrder,
  calcDeliveryTime,
  deliveryTimeToInterval,
  isFavorite,
  getDistance,
  calcNbOfRating,
  calcRating,
  formatPhoneNumber,
  removeSpaces,
  getThumb,
  getLocFromGeopoint,
};
