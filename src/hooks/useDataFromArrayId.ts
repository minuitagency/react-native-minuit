import React, { useEffect, useState } from 'react';

interface UseDataFromArrayDocIdProps {
  ref: any; // SECOND AGENT: [MISSING CONTEXT] - Define the type for ref based on your data fetching library (e.g., Firestore)
  format?: (data: any[]) => Promise<any[]> | any[];
  arrayId: string[];
  refreshArray?: any[];
  condition?: boolean;
  pagination?: boolean;
  batchSize?: number;
}

interface DocumentData {
  id: string;
  [key: string]: any;
}

export default function useDataFromArrayDocId({
  ref,
  format = null,
  arrayId = [],
  refreshArray = [],
  condition = true,
  pagination = false,
  batchSize = 20,
}: UseDataFromArrayDocIdProps) {
  const [data, setData] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  async function getAllDocs(arrayToGet: string[]) {
    try {
      setLoading(true);
      const promises = arrayToGet.map(async (id) => {
        return new Promise<DocumentData | null>(async (resolve) => {
          const doc = await ref.doc(id).get();
          if (doc.exists) {
            resolve({ ...doc.data(), id: doc.id });
          } else {
            resolve(null);
          }
        });
      });
      await Promise.all(promises).then(async (values) => {
        const validData = values.filter((value) => value !== null) as DocumentData[];
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

  function getNewArrayToGet(currPage = 0): string[] {
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
      if (data.length > 0) {
        setData([]);
      }
    }
  }, [ref, arrayId?.length, condition, ...refreshArray]);

  async function loadMore() {
    if (ref && arrayId?.length > 0 && !!condition && !loading) {
      getAllDocs(getNewArrayToGet(currentPage));
    }
  }

  return { data, setData, loading, loadMore };
}
