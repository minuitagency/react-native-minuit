"use strict";

import { useState, useEffect } from "react";
import algoliasearch, { SearchIndex } from "algoliasearch/lite";
import { algoliaAppId, algoliaApiKey } from "../config/key";

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
        const { hits } = await indexAlgolia!.search(query, {
          hitsPerPage: 800
        });
        setResult(hits.map(hit => ({ ...hit, [documentID]: hit.objectID })));
      } else {
        setResult([]);
      }
    } catch (e) {
      setResult([]);
      console.log('ALGOLIA' + e);
    }
  };

  return result;
}

export default useSearch;
//# sourceMappingURL=useSearch.js.map
