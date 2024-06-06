"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

import * as React from 'react';
import * as geofirex from 'geofirex';

type GeoFireParams = {
  ref: any;
  firebase: any;
  center: {
    latitude: number;
    longitude: number;
  } | null;
  formatFunction?: ((hits: any[]) => any[]) | null;
  radius?: number;
  parameter?: string;
};

const useGeoFire = ({
  ref,
  firebase,
  center,
  formatFunction = null,
  radius = 100,
  parameter = 'point'
}: GeoFireParams) => {
  const geo = geofirex.init(firebase);
  const [data, setData] = React.useState<any[]>([]);
  React.useEffect(() => {
    if (center !== null && center.latitude && center.longitude) {
      console.log('FETCH');
      fetchQuery();
    } else {
      console.log(center);
    }
  }, [center, radius]);

  const fetchQuery = async (customLocation: { latitude?: number; longitude?: number } | null = null) => {
    try {
      const geoQuery = geo.query(ref).within(geo.point(center!.latitude, center!.longitude), radius, parameter);
      const hits = await geofirex.get(geoQuery);

      if (formatFunction) {
        setData(formatFunction(hits));
      } else {
        setData(hits);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    data
  };
};

export default useGeoFire;
//# sourceMappingURL=useGeoFire.js.map