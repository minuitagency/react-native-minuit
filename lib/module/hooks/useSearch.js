import { useEffect, useState } from 'reactn';
import algoliasearch from 'algoliasearch/lite';
import { algoliaApiKey, algoliaAppId } from '../config/key';
const clientAlgolia = algoliasearch(algoliaAppId, algoliaApiKey);
export default function useSearch(_ref) {
  let {
    query = '',
    index = null,
    documentID = 'objectID'
  } = _ref;
  const [result, setResult] = useState([]);
  const [indexAlgolia, setIndexAlgolia] = useState(null);
  useEffect(() => {
    if (!indexAlgolia) {
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
      if ((query === null || query === void 0 ? void 0 : query.length) > 1) {
        const {
          hits
        } = await indexAlgolia.search(query, {
          hitsPerPage: 800
        });
        setResult(hits.map(hit => ({ ...hit,
          [documentID]: hit.objectID
        })));
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
//# sourceMappingURL=useSearch.js.map