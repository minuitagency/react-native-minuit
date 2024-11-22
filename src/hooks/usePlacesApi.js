import { useEffect, useState } from 'react';

export default function usePlacesApi({
  queryFields = 'formatted_address,geometry,name,address_components',
  queryCountries = ['fr'],
  language = 'fr-FR',
  minChars = 2,
  query = '',
  apiKey = '',
  userLoc = null,
  radius = 10000,
  departmentOnly = false,
  baseUrl = 'https://maps.googleapis.com',
}) {
  const [places, setPlaces] = useState([]);
  const [placeDetails, setPlaceDetails] = useState(null);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    if (query < minChars) {
      setPlaces([]);
      setPlaceDetails(null);
    }
    if (query?.length >= minChars && !loadingPlaces) {
      search();
    }
  }, [query]);

  function buildCountryQuery() {
    if (!queryCountries) {
      return '';
    }
    return `&components=${queryCountries
      .map((countryCode) => {
        return `country:${countryCode}`;
      })
      .join('|')}`;
  }

  function buildLocationQuery() {
    return userLoc
      ? `&location=${userLoc.latitude},${userLoc.longitude}&radius=${radius}`
      : '';
  }

  async function search() {
    try {
      setLoadingPlaces(true);
      const _places = await fetch(
        `${baseUrl}/maps/api/place/autocomplete/json?input=${query}&key=${apiKey}&inputtype=textquery&language=${language}&fields=${queryFields}${buildCountryQuery()}${buildLocationQuery()}${
          departmentOnly && '&types=administrative_area_level_2'
        }`
      ).then((response) => response.json());
      setPlaces(_places?.predictions);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingPlaces(false);
    }
  }

  async function getPlaceData(place) {
    try {
      if (loadingDetails) {
        return;
      }
      setLoadingDetails(true);
      const placeDetails = await fetch(
        `${baseUrl}/maps/api/place/details/json?placeid=${place.place_id}&key=${apiKey}&fields=${queryFields}&language=${language}`
      ).then((response) => response.json());
      setPlaceDetails({ ...placeDetails?.result, ...place });
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingDetails(false);
    }
  }

  function clearSearch() {
    setPlaces([]);
    setPlaceDetails(null);
  }

  return { places, placeDetails, getPlaceData, clearSearch };
}
