import { useEffect, useMemo, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import _ from 'lodash';

export default ({
  query = '',
  algoliaObject: { index = null, projectID, publicKey },
  algoliaParams = {},
  searchParams = {},
  format = (rst) => rst,
  batch = 20,
  condition = true,
}) => {
  const [result, setResult] = useState([]);
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
        const unformattedHit = hits.map((itemHit) => ({
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
      console.log('Algolia', e);
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
    setHits: setResult,
    loading,
    currPage: currPage === 0 ? 0 : currPage - 1,
    totalPage,
    totalHits: nbHits,
    loadMore,
  };
};
