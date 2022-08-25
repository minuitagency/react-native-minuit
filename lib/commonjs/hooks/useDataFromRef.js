"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useDataFromRef;

var _reactn = require("reactn");

var _react = require("react");

function useDataFromRef(_ref) {
  let {
    ref,
    initialState = [],
    refreshArray = [],
    initialDocumentRef = null,
    documentID = 'id',
    listener = false,
    condition = true,
    simpleRef = false,
    usePagination = false,
    updateGlobalState = null,
    batchSize = 4,
    format = null,
    onUpdate = () => null
  } = _ref;
  const [loading, setLoading] = (0, _reactn.useState)(true);
  const [endReached, setEndReached] = (0, _reactn.useState)(false);
  const [data, setData] = (0, _reactn.useState)(initialState);
  const [lastVisible, setLastVisible] = (0, _reactn.useState)(null);
  (0, _react.useEffect)(() => {
    if (condition) {
      if (listener && !usePagination) {
        const subData = getListenerData();
        return () => subData === null || subData === void 0 ? void 0 : subData();
      } else {
        resetState();
        getData({
          paginate: usePagination
        });
      }
    } else {
      resetState();
    }
  }, [...refreshArray, condition, usePagination]);

  const loadMore = () => {
    if (!loading && !endReached) {
      getData({
        paginate: true
      });
      console.log('Loading more');
    }
  };

  const resetState = () => {
    if (data !== initialState) {
      onUpdate(initialState);
    }

    setEndReached(false);
    setLastVisible(null);
    setData(initialState);
  };

  const getData = async function () {
    let {
      paginate = false
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    try {
      setLoading(true);
      let newData = simpleRef ? null : [];
      let initialDoc = null;

      if (initialDocumentRef && !lastVisible && !simpleRef) {
        initialDoc = await initialDocumentRef.get();
      }

      const dynamicRef = paginate && lastVisible ? ref.startAfter(lastVisible).limit(batchSize) : initialDoc ? ref.startAt(initialDoc).limit(batchSize) : paginate ? ref.limit(batchSize) : ref;
      const dataSnap = await dynamicRef.get();

      if (simpleRef && dataSnap.data()) {
        newData = { ...dataSnap.data(),
          [documentID]: dataSnap.id
        };
      } else if (!simpleRef && dataSnap.docs.length > 0) {
        newData = dataSnap.docs.map(item => {
          return { ...item.data(),
            [documentID]: item.id
          };
        });

        if (paginate) {
          if (batchSize !== dataSnap.docs.length) {
            setEndReached(true);
          }

          setLastVisible(dataSnap.docs[dataSnap.docs.length - 1]);
        }
      }

      if (newData) {
        if (paginate) {
          console.log('new pagination');
          await updateData([...data, ...newData]);
        } else {
          await updateData(newData);
        }
      } else {
        console.log('NO DATA');
      }
    } catch (e) {
      console.log('useDataFromRef ' + e);
      await updateData([]);
    } finally {
      setLoading(false);
    }
  };

  const getListenerData = () => {
    return ref === null || ref === void 0 ? void 0 : ref.onSnapshot(async dataSnap => {
      let newData;

      if (simpleRef) {
        newData = { ...dataSnap.data(),
          [documentID]: dataSnap.id
        };
      } else {
        newData = dataSnap.docs.map(item => {
          return { ...item.data(),
            [documentID]: item.id
          };
        });
      }

      await updateData(newData);
      setLoading(false);
    }, async e => {
      console.log(e);
      await updateData([]);
      setLoading(false);
    });
  };

  const updateData = async newData => {
    setData(format ? await format(newData) : newData);
    onUpdate(newData);

    if (updateGlobalState) {
      (0, _reactn.setGlobal)({
        [updateGlobalState]: data
      });
    }
  };

  return {
    data,
    setData,
    loading,
    loadMore
  };
}
//# sourceMappingURL=useDataFromRef.js.map