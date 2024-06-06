import React, { useEffect, useState } from 'react';

interface UseDataFromArrayDocIdProps {
  ref: any; // Replace 'any' with the appropriate type for your ref
  format?: (data: any[]) => Promise<any[]> | any[];
  arrayId?: string[];
  condition?: boolean;
  pagination?: boolean;
  batchSize?: number;
}

interface DocData {
  id: string;
  [key: string]: any;
}

export default function useDataFromArrayDocId({
  ref,
  format = null,
  arrayId = [],
  condition = true,
  pagination = false,
  batchSize = 20,
}: UseDataFromArrayDocIdProps) {
  const [data, setData] = useState<DocData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  async function getAllDocs(arrayToGet: string[]) {
    try {
      setLoading(true);
      const promises = arrayToGet.map(async (id) => {
        return new Promise<DocData | null>(async (resolve) => {
          const doc = await ref.doc(id).get();
          if (doc.exists) {
            resolve({ ...doc.data(), id: doc.id });
          } else {
            resolve(null);
          }
        });
      });
      await Promise.all(promises).then(async (values) => {
        const validData = values.filter((value) => value !== null) as DocData[];
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

  function getNewArrayToGet(currPage: number = 0): string[] {
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
  }, [ref, arrayId?.length, condition]);

  async function loadMore() {
    if (ref && arrayId?.length > 0 && !!condition && !loading) {
      getAllDocs(getNewArrayToGet(currentPage));
    }
  }

  return { data, setData, loading, loadMore };
}