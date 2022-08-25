import { useEffect, useState } from 'react';
export default function usePlacesApi(_ref) {
  let {
    queryFields = 'formatted_address,geometry,name,address_components',
    queryCountries = ['fr'],
    language = 'fr-FR',
    minChars = 2,
    query = '',
    apiKey = ''
  } = _ref;
  const [places, setPlaces] = useState([]);
  const [placeDetails, setPlaceDetails] = useState(null);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  useEffect(() => {
    if (query < minChars) {
      setPlaces([]);
      setPlaceDetails(null);
    }

    if ((query === null || query === void 0 ? void 0 : query.length) >= minChars && !loadingPlaces) {
      search();
    }
  }, [query]);

  function buildCountryQuery() {
    if (!queryCountries) {
      return '';
    }

    return `&components=${queryCountries.map(countryCode => {
      return `country:${countryCode}`;
    }).join('|')}`;
  }

  async function search() {
    try {
      setLoadingPlaces(true);

      const _places = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${apiKey}&inputtype=textquery&language=${language}&fields=${queryFields}${buildCountryQuery()}`).then(response => response.json());

      setPlaces(_places === null || _places === void 0 ? void 0 : _places.predictions);
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
      const placeDetails = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.place_id}&key=${apiKey}&fields=${queryFields}&language=${language}`).then(response => response.json());
      setPlaceDetails({ ...(placeDetails === null || placeDetails === void 0 ? void 0 : placeDetails.result),
        ...place
      });
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

  return {
    places,
    placeDetails,
    getPlaceData,
    clearSearch
  };
}
//# sourceMappingURL=usePlacesApi.js.map