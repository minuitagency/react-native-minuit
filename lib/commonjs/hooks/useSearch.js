"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useSearch;

var _reactn = require("reactn");

var _lite = _interopRequireDefault(require("algoliasearch/lite"));

var _key = require("../config/key");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const clientAlgolia = (0, _lite.default)(_key.algoliaAppId, _key.algoliaApiKey);

function useSearch(_ref) {
  let {
    query = '',
    index = null,
    documentID = 'objectID'
  } = _ref;
  const [result, setResult] = (0, _reactn.useState)([]);
  const [indexAlgolia, setIndexAlgolia] = (0, _reactn.useState)(null);
  (0, _reactn.useEffect)(() => {
    if (!indexAlgolia) {
      setIndexAlgolia(clientAlgolia.initIndex(index));
    }

    return () => {
      setIndexAlgolia(null);
    };
  }, [index]);
  (0, _reactn.useEffect)(() => {
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