"use strict";

import { useState, useEffect } from "react";
import { setGlobal } from "reactn";

interface UseDataFromRefParams {
  ref: any;
  initialState?: any[];
  refreshArray?: any[];
  initialDocumentRef?: any;
  documentID?: string;
  listener?: boolean;
  condition?: boolean;
  simpleRef?: boolean;
  usePagination?: boolean;
  updateGlobalState?: string | null;
  batchSize?: number;
  format?: ((data: any) => any) | null;
  onUpdate?: (data: any) => void;
}

interface UseDataFromRefReturn {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  loadMore: () => void;
}

function useDataFromRef({
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
}: UseDataFromRefParams): UseDataFromRefReturn {
  const [loading, setLoading] = useState(true);
  const [endReached, setEndReached] = useState(false);
  const [data, setData] = useState(initialState);
  const [lastVisible, setLastVisible] = useState(null);

  useEffect(() => {
    if (condition) {
      if (listener && !usePagination) {
        const subData = getListenerData();
        return () => subData?.();
      } else {
        resetState();
        getData({ paginate: usePagination });
      }
    } else {
      resetState();
    }
  }, [...refreshArray, condition, usePagination]);

  const loadMore = () => {
    if (!loading && !endReached) {
      getData({ paginate: true });
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

  const getData = async ({ paginate = false }: { paginate?: boolean } = {}) => {
    try {
      setLoading(true);
      let newData = simpleRef ? null : [];
      let initialDoc = null;

      if (initialDocumentRef && !lastVisible && !simpleRef) {
        initialDoc = await initialDocumentRef.get();
      }

      const dynamicRef = paginate && lastVisible
        ? ref.startAfter(lastVisible).limit(batchSize)
        : initialDoc
          ? ref.startAt(initialDoc).limit(batchSize)
          : paginate
            ? ref.limit(batchSize)
            : ref;

      const dataSnap = await dynamicRef.get();

      if (simpleRef && dataSnap.data()) {
        newData = { ...dataSnap.data(), [documentID]: dataSnap.id };
      } else if (!simpleRef && dataSnap.docs.length > 0) {
        newData = dataSnap.docs.map(item => {
          return { ...item.data(), [documentID]: item.id };
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
    return ref?.onSnapshot(
      async dataSnap => {
        let newData;

        if (simpleRef) {
          newData = { ...dataSnap.data(), [documentID]: dataSnap.id };
        } else {
          newData = dataSnap.docs.map(item => {
            return { ...item.data(), [documentID]: item.id };
          });
        }

        await updateData(newData);
        setLoading(false);
      },
      async e => {
        console.log(e);
        await updateData([]);
        setLoading(false);
      }
    );
  };

  const updateData = async (newData: any) => {
    setData(format ? await format(newData) : newData);
    onUpdate(newData);

    if (updateGlobalState) {
      setGlobal({ [updateGlobalState]: data });
    }
  };

  return {
    data,
    setData,
    loading,
    loadMore
  };
}

export default useDataFromRef;
//# sourceMappingURL=useDataFromRef.js.map
