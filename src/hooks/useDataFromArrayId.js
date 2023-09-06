import React, { useEffect, useState } from 'react';

export default function useDataFromArrayDocId({
  ref,
  format = null,
  arrayId = [],
  condition = true,
  pagination = false,
  batchSize = 20,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  async function getAllDocs(arrayToGet) {
    try {
      setLoading(true);
      const promises = arrayToGet.map(async (id) => {
        return new Promise(async (resolve) => {
          const doc = await ref.doc(id).get();
          if (doc.exists) {
            resolve({ ...doc.data(), id: doc.id });
          } else {
            resolve(null);
          }
        });
      });
      await Promise.all(promises).then(async (values) => {
        const validData = values.filter((value) => value !== null);
        const newData = format ? await format(validData) : validData;
        if (currentPage > 0) {
          setData((prev) => [...prev, ...newData]);
        } else {
          setData(newData);
        }
        if (pagination && newData.length > 0) {
          setCurrentPage((prev) => prev + 1);
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  function getNewArrayToGet(currPage = 0) {
    const start = currPage * batchSize;
    const end = (currPage + 1) * batchSize;
    const newArray = arrayId.slice(start, end);
    return newArray.filter(Boolean);
  }

  useEffect(() => {
    if (ref && arrayId?.length > 0 && !!condition && !loading) {
      if (pagination) {
        setCurrentPage(0);
        getAllDocs(getNewArrayToGet(0));
      } else {
        getAllDocs(arrayId);
      }
    } else {
      if (data !== []) {
        setData([]);
      }
    }
  }, [ref, arrayId?.length, condition]);

  async function loadMore() {
    if (ref && arrayId?.length > 0 && !!condition && !loading) {
      getAllDocs(getNewArrayToGet(currentPage));
    }
  }

  return { data, loading, loadMore };
}
