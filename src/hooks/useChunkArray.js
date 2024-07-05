import { useEffect, useState } from 'react';
import { Firestore, QuerySnapshot, DocumentData } from '@firebase/firestore-types';

interface UseChunkArrayProps {
  ref: Firestore;
  keyName?: string;
  operator?: string;
  arrayToChunk?: any[];
  chunkSize?: number;
  condition?: boolean;
  listener?: boolean;
  refreshArray?: any[];
  initialValue?: any[];
  format?: ((data: any[]) => any[]) | null;
}

interface UseChunkArrayReturn {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  loading: boolean;
}

export default function useChunkArray({
  ref,
  keyName = '',
  operator = 'in',
  arrayToChunk = [],
  chunkSize = 10,
  condition = true,
  listener = false,
  refreshArray = [],
  initialValue = [],
  format = null,
}: UseChunkArrayProps): UseChunkArrayReturn {
  const [data, setData] = useState<any[]>(initialValue);
  const [allListener, setAllListener] = useState<(() => void)[]>([]);
  const [loading, setLoading] = useState(true);

  function getChunkArray(): any[][] {
    const chunkedArray: any[][] = [];
    for (let i = 0; i < arrayToChunk.length; i += chunkSize) {
      chunkedArray.push(arrayToChunk.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }

  async function makeAllRequests(chunkedArray: any[][]): Promise<void> {
    try {
      setLoading(true);
      const snapCollection: QuerySnapshot<DocumentData>[] = [];
      for await (const snap of chunkedArray.map(
        async (chunk) => await ref.where(keyName, operator, chunk).get()
      )) {
        snapCollection.push(snap);
      }
      const results: any[] = [];
      (await Promise.all(snapCollection)).map(({ docs = [] }) => {
        docs.map((snap) => {
          results.push({ ...snap.data(), id: snap.id });
        });
      });
      if (format) {
        setData(format(results));
      } else {
        setData(results);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (condition) {
      const chunkedArray = getChunkArray();
      if (listener) {
        chunkedArray.map((chunk) => {
          const listener = ref.where(keyName, operator, chunk).onSnapshot(
            (snap) => {
              const results: any[] = [];
              snap?.docs.map((snap) => {
                results.push({ ...snap.data(), id: snap.id });
              });
              if (format) {
                setData(format(results));
              } else {
                setData(results);
              }
              setLoading(false);
            },
            (e) => {
              console.log(e);
              setLoading(false);
            }
          );
          setAllListener((prev) => [...prev, listener]);
        });
      } else {
        makeAllRequests(chunkedArray);
      }
    }

    return () => {
      if (listener) {
        allListener.map((l) => l());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...refreshArray]);

  return { data, setData, loading };
}
