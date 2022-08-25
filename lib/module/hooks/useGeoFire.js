import { useState, useEffect } from 'react';
import * as geofirex from 'geofirex';

const useGeoFire = _ref => {
  let {
    ref,
    firebase,
    // require
    center,
    formatFunction = null,
    radius = 100,
    parameter = 'point'
  } = _ref;
  const geo = geofirex.init(firebase);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (center !== null && center !== void 0 && center.latitude && center !== null && center !== void 0 && center.longitude) {
      console.log('FETCH');
      fetchQuery();
    } else {
      console.log(center);
    }
  }, [center, radius]);

  const fetchQuery = async function () {
    let {
      customLocation = null
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    try {
      const geoQuery = geo.query(ref).within(geo.point(center.latitude, center.longitude), radius, parameter);
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