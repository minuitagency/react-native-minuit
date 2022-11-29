import { useState, useEffect } from 'react';
import * as geofirex from 'geofirex';

const useGeoFire = ({
  ref,
  geo, // require
  center,
  formatFunction = null,
  condition = true,
  radius = 100,
  parameter = 'point',
  refreshArray = [],
  logs = false,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (center?.latitude && center?.longitude && condition) {
      if (logs) {
        console.log('Fetch for coordinate', center);
      }
      fetchQuery();
    } else {
      if (logs) {
        console.log(center);
      }
    }
  }, [...refreshArray, center, radius]);

  const fetchQuery = async ({ customLocation = null } = {}) => {
    try {
      const geoQuery = geo
        .query(ref)
        .within(
          geo.point(center.latitude, center.longitude),
          radius,
          parameter
        );

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

  return { data };
};

export default useGeoFire;
