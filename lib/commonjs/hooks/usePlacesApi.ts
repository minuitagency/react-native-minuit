"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usePlacesApi;

import { useState, useEffect } from 'react';

interface UsePlacesApiProps {
  queryFields?: string;
  queryCountries?: string[];
  language?: string;
  minChars?: number;
  query?: string;
  apiKey?: string;
}

interface Place {
  place_id: string;
  [key: string]: any;
}

interface PlaceDetails extends Place {
  [key: string]: any;
}

function usePlacesApi({
  queryFields = 'formatted_address,geometry,name,address_components',
  queryCountries = ['fr'],
  language = 'fr-FR',
  minChars = 2,
  query = '',
  apiKey = ''
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

    if (query.length >= minChars && !loadingPlaces) {
      search();
    }
  }, [query]);

  function buildCountryQuery(): string {
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

      setPlaces(_places?.predictions);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingPlaces(false);
    }
  }

  async function getPlaceData(place: Place) {
    try {
      if (loadingDetails) {
        return;
      }

      setLoadingDetails(true);
      const placeDetails = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.place_id}&key=${apiKey}&fields=${queryFields}&language=${language}`).then(response => response.json());
      setPlaceDetails({ ...(placeDetails?.result), ...place });
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