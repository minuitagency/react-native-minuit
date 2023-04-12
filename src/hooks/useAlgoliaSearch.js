import React, { useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';

export default ({
  query = '',
  algoliaObject: { index = null, projectID, publicKey },
  searchParams = {},
  format = (rst) => rst,
  batch = 20,
}) => {
  const [result, setResult] = useState([]);
  const [indexAlgolia, setIndexAlgolia] = useState(null);
  const [currPage, setCurrPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [nbHits, setNbHits] = useState(0);

  useEffect(() => {
    if (!indexAlgolia) {
      setIndexAlgolia(algoliasearch(projectID, publicKey).initIndex(index));
    }

    return () => {
      setIndexAlgolia(null);
    };
  }, [index]);

  useEffect(() => {
    if (indexAlgolia) {
      console.log({ currPage });
      setResult([]);
      setCurrPage(0);
      setTotalPage(0);
      setNbHits(0);
      getSearchResult(0);
    }
  }, [query, indexAlgolia]);

  async function getSearchResult(pageToSearch = 0) {
    try {
      setLoading(true);
      if (query.length > 0) {
        console.log('searching for page: ', pageToSearch);
        const {
          hits = [],
          nbPages = 0,
          nbHits = 0,
        } = await indexAlgolia.search(query, {
          page: pageToSearch,
          hitsPerPage: batch,
          ...searchParams,
        });
        setCurrPage(pageToSearch + 1);
        setTotalPage(nbPages);
        setNbHits(nbHits);
        const unformattedHit = hits.map((itemHit) => ({
          ...itemHit,
          id: itemHit.objectID,
        }));
        const formattedHits = await format(unformattedHit);
        setResult((prev) => [...prev, ...formattedHits]);
      } else {
        setResult([]);
      }
    } catch (e) {
      setResult([]);
      console.log('Algolia error');
      console.log(e);
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
