import { useEffect, useState } from "reactn";

import algoliasearch from "algoliasearch/lite";

export default ({
  query = "",
  algoliaObject: { index = null, projectID, publicKey },
}) => {
  const [result, setResult] = useState([]);
  const [indexAlgolia, setIndexAlgolia] = useState(null);

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
      getSearchResult();
    }
  }, [query, indexAlgolia]);

  const getSearchResult = async () => {
    try {
      if (query.length > 1) {
        const { hits } = await indexAlgolia.search(query);

        setResult(
          hits.map((itemHit) => ({ ...itemHit, id: itemHit.objectID }))
        );
      } else {
        setResult([]);
      }
    } catch (e) {
      setResult([]);
      console.log("ALGOLIA" + e);
    }
  };

  return result;
};
