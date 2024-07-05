import { useEffect, useState } from 'react';

interface UsePlacesApiProps {
  queryFields?: string;
  queryCountries?: string[];
  language?: string;
  minChars?: number;
  query?: string;
  apiKey?: string;
  userLoc?: { latitude: number; longitude: number } | null;
  radius?: number;
}

interface Place {
  place_id: string;
  [key: string]: any;
}

interface PlaceDetails extends Place {
  formatted_address?: string;
  geometry?: any;
  name?: string;
  address_components?: any[];
}

export default function usePlacesApi({
  queryFields = 'formatted_address,geometry,name,address_components',
  queryCountries = ['fr'],
  language = 'fr-FR',
  minChars = 2,
  query = '',
  apiKey = '',
  userLoc = null,
  radius = 10000,
}: UsePlacesApiProps) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);
  const [loadingPlaces, setLoadingPlaces] = useState<boolean>(false);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);

  useEffect(() => {
    if (query.length < minChars) {
      setPlaces([]);
      setPlaceDetails(null);
    }
    if (query?.length >= minChars && !loadingPlaces) {
      search();
    }
  }, [query]);

  function buildCountryQuery(): string {
    if (!queryCountries) {
      return '';
    }
    return `&components=${queryCountries
      .map((countryCode) => {
        return `country:${countryCode}`;
      })
      .join('|')}`;
  }

  function buildLocationQuery(): string {
    return userLoc
      ? `&location=${userLoc.latitude},${userLoc.longitude}&radius=${radius}`
      : '';
  }

  async function search(): Promise<void> {
    try {
      setLoadingPlaces(true);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${apiKey}&inputtype=textquery&language=${language}&fields=${queryFields}${buildCountryQuery()}${buildLocationQuery()}`
      );
      const data = await response.json();
      setPlaces(data?.predictions);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingPlaces(false);
    }
  }

  async function getPlaceData(place: Place): Promise<void> {
    try {
      if (loadingDetails) {
        return;
      }
      setLoadingDetails(true);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.place_id}&key=${apiKey}&fields=${queryFields}&language=${language}`
      );
      const data = await response.json();
      setPlaceDetails({ ...data?.result, ...place });
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingDetails(false);
    }
  }

  function clearSearch(): void {
    setPlaces([]);
    setPlaceDetails(null);
  }

  return { places, placeDetails, getPlaceData, clearSearch };
}
