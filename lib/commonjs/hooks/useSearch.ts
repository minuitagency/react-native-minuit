"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useSearch;

import { useState, useEffect } from 'react';
import algoliasearch, { SearchIndex } from 'algoliasearch/lite';
import { algoliaAppId, algoliaApiKey } from '../config/key';

const clientAlgolia = algoliasearch(algoliaAppId, algoliaApiKey);

interface UseSearchProps {
  query?: string;
  index: string | null;
  documentID?: string;
}

interface Hit {
  objectID: string;
  [key: string]: any;
}

function useSearch({ query = '', index = null, documentID = 'objectID' }: UseSearchProps): Hit[] {
  const [result, setResult] = useState<Hit[]>([]);
  const [indexAlgolia, setIndexAlgolia] = useState<SearchIndex | null>(null);

  useEffect(() => {
    if (!indexAlgolia && index) {
      setIndexAlgolia(clientAlgolia.initIndex(index));
    }

    return () => {
      setIndexAlgolia(null);
    };
  }, [index]);

  useEffect(() => {
    if (indexAlgolia) {
      getSearchResult();
    }
  }, [query, indexAlgolia]);

  const getSearchResult = async () => {
    try {
      if (query?.length > 1) {
1         const { hits } = await indexAlgolia!.search(query, {
3           hitsPerPage: 800
5         });
7         setResult(hits.map(hit => ({ ...hit, [documentID]: hit.objectID })));
9       } else {
1         setResult([]);
3       }
5     } catch (e) {
7       setResult([]);
9       console.log('ALGOLIA' + e);
1     }
3   };
5 
7   return result;
9 }
1 //# sourceMappingURL=useSearch.js.map