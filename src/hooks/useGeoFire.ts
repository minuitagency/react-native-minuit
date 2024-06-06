import { useState, useEffect } from 'react';
import * as geofirex from 'geofirex';

interface Center {
  latitude: number;
  longitude: number;
}

interface UseGeoFireProps {
  ref: any;
  geo: any;
  center: Center;
  formatFunction?: ((hits: any) => any) | null;
  condition?: boolean;
  listener?: boolean;
  radius?: number;
  parameter?: string;
  refreshArray?: any[];
  logs?: boolean;
}

const useGeoFire = ({
  ref,
  geo,
  center,
  formatFunction = null,
  condition = true,
  listener = false,
  radius = 100,
  parameter = 'point',
  refreshArray = [],
  logs = false,
}: UseGeoFireProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
  }, [...refreshArray, center, radius, condition]);

  function formatHits(hits: any) {
    if (formatFunction) {
      setData(formatFunction(hits));
    } else {
      setData(hits);
    }
  }

  const fetchQuery = async ({ customLocation = null } = {}) => {
    try {
      setLoading(true);
      const geoQuery = geo
        .query(ref)
        .within(
          geo.point(center.latitude, center.longitude),
          radius,
          parameter
        );

      if (listener) {
        geoQuery.subscribe((hits: any) => formatHits(hits));
      } else {
        const hits = await geofirex.get(geoQuery);
        formatHits(hits);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading };
};

export default useGeoFire;