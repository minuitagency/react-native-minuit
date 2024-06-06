import { useEffect, useMemo, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import _ from "lodash";

interface AlgoliaObject {
  index: string | null;
  projectID: string;
  publicKey: string;
}

interface AlgoliaParams {
  [key: string]: any;
}

interface SearchParams {
  filters?: string;
  aroundLatLng?: string;
  aroundRadius?: number;
  [key: string]: any;
}

interface Props {
  query?: string;
  algoliaObject: AlgoliaObject;
  algoliaParams?: AlgoliaParams;
  searchParams?: SearchParams;
  format?: (rst: any) => any;
  batch?: number;
  condition?: boolean;
}

interface Hit {
  objectID: string;
  [key: string]: any;
}

const useAlgoliaSearch = ({
  query = "",
  algoliaObject: { index = null, projectID, publicKey },
  algoliaParams = {},
  searchParams = {},
  format = (rst) => rst,
  batch = 20,
  condition = true,
}: Props) => {
  const [result, setResult] = useState<any[]>([]);
  const [currPage, setCurrPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [nbHits, setNbHits] = useState(0);

  const indexAlgolia = useMemo(
    () => algoliasearch(projectID, publicKey, algoliaParams).initIndex(index),
    [index]
  );

  function resetAllStates() {
    setResult([]);
    setCurrPage(0);
    setTotalPage(0);
    setNbHits(0);
  }

  useEffect(() => {
    resetAllStates();
    if (indexAlgolia && condition) {
      getSearchResult(0);
    }
  }, [
    query,
    indexAlgolia,
    searchParams.filters,
    searchParams.aroundLatLng,
    searchParams.aroundRadius,
    condition,
  ]);

  async function getSearchResult(pageToSearch = 0) {
    try {
      if (loading) {
        return;
      }
      if (query.length > 0 || _.size(searchParams) > 0) {
        setLoading(true);
        const {
          hits = [],
          nbPages = 0,
          nbHits = 0,
        } = await indexAlgolia.search(query, {
          page: pageToSearch,
          hitsPerPage: batch,
          ...searchParams,
        });
        const unformattedHit = hits.map((itemHit: Hit) => ({
          ...itemHit,
          id: itemHit.objectID,
        }));
        const formattedHits = await format(unformattedHit);
        if (formattedHits.length > 0) {
          setResult((prev) => [...prev, ...formattedHits]);
        }
        setCurrPage(pageToSearch + 1);
        setTotalPage(nbPages);
        setNbHits(nbHits);
      } else {
        setResult([]);
      }
    } catch (e) {
      setResult([]);
      console.log("Algolia", e);
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    try {
      if (currPage > totalPage || loading) {
        return;
      }
      await getSearchResult(currPage);
    } catch (e) {
      console.log(e);
    }
  }

  return {
    hits: result,
    loading,
    currPage: currPage === 0 ? 0 : currPage - 1,
    totalPage,
    totalHits: nbHits,
    loadMore,
  };
};

export default useAlgoliaSearch;