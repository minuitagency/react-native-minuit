import { useState, useEffect } from 'react';
import * as geofirex from 'geofirex';

const useGeoFire = ({
  ref,
  geo, // require
  center,
  formatFunction = null,
  radius = 100,
  parameter = 'point',
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (center?.latitude && center?.longitude) {
      console.log('FETCH');
      fetchQuery();
    } else {
      console.log(center);
    }
  }, [center, radius]);

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
