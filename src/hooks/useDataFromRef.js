import { useState, setGlobal } from "reactn";
import { useEffect } from "react";

const log = (d) => console.log(`\x1b[35m ${d}\x1b[0m`);

export default function useDataFromRef({
  ref,

  documentID = "id",
  listener = false,

  condition = true,
  simpleRef = false,

  initialState = simpleRef ? null : [],
  refreshArray = [],

  usePagination = false,

  updateGlobalState = null,

  batchSize = 4,

  format = null,
  onUpdate = () => null,
}) {
  const [hasCompletedInitialLoad, setHasCompletedInitialLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const [endReached, setEndReached] = useState(false);
  const [data, setData] = useState(initialState);
  const [lastVisible, setLastVisible] = useState(null);

  useEffect(() => {
    if (condition) {
      if (data !== initialState) {
        onUpdate(initialState);
      }
      setEndReached(false);
      setLastVisible(null);
      setData(initialState);
      if (listener && !usePagination) {
        const subData = getListenerData();
        return () => subData?.();
      } else {
        getData();
      }
    } else {
      setLoading(false);
    }
  }, [...refreshArray, condition, usePagination]);

  function loadMore() {
    if (!loading && !endReached) {
      if (listener) {
        log("Cannot use loadMore with listener");
      } else {
        log("Loading more");
        getData({ currData: data, startAfter: lastVisible });
      }
    }
  }

  async function getData({ currData = null, startAfter = null } = {}) {
    try {
      setLoading(true);

      let dynamicRef = ref;
      if (startAfter) {
        dynamicRef = dynamicRef.startAfter(startAfter);
      }
      if (usePagination) {
        dynamicRef = dynamicRef.limit(batchSize);
      }
      const dataSnap = await dynamicRef.get();
      const newData = snapshotToData(dataSnap);

      if (newData) {
        await updateData(newData, currData);
      } else {
        log("No data");
      }
    } catch (e) {
      await handleError(e);
    } finally {
      setLoading(false);
    }
  }

  function getListenerData() {
    return ref?.onSnapshot(
      async (dataSnap) => {
        const newData = snapshotToData(dataSnap);
        await updateData(newData, lastVisible);
        setLoading(false);
      },
      async (e) => {
        setLoading(false);
        await handleError(e);
      }
    );
  }

  function snapshotToData(snapshot) {
    if (usePagination) {
      if (batchSize !== snapshot.docs.length) {
        log("End reached");
        setEndReached(true);
      }
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    }
    if (simpleRef) {
      return { ...snapshot.data(), [documentID]: snapshot.id };
    } else {
      return snapshot.docs.map((item) => {
        return { ...item.data(), [documentID]: item.id };
      });
    }
  }

  async function updateData(newData, currData = null) {
    const formatData = format ? await format(newData) : newData;
    const _data = currData ? [...currData, ...formatData] : formatData;
    setData(_data);
    onUpdate(_data);

    if (updateGlobalState) {
      await setGlobal({ [updateGlobalState]: _data });
    }

    setHasCompletedInitialLoad(true);
  }

  async function handleError(e) {
    if (e.code === "firestore/permission-denied") {
      console.warn(
        "Permission denied for ref: ",
        ref?._collectionPath?.relativeName
      );
    } else {
      console.log(e);
    }
    await updateData([]);
  }

  return { hasCompletedInitialLoad, data, setData, loading, loadMore };
}
