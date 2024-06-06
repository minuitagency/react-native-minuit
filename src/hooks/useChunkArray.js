import { useEffect, useState } from 'react';

type FirestoreRef = {
  where: (key: string, operator: FirestoreOperator, value: any[]) => {
    get: () => Promise<FirestoreSnapshot>;
    onSnapshot: (
      onNext: (snapshot: FirestoreSnapshot) => void,
      onError?: (error: Error) => void
    ) => () => void;
  };
};

type FirestoreSnapshot = {
  docs: FirestoreDocument[];
};

type FirestoreDocument = {
  id: string;
  data: () => any;
};

type FirestoreOperator = 'in' | '==' | '!=' | '<' | '<=' | '>' | '>=';

type UseChunkArrayProps = {
  ref: FirestoreRef;
  keyName?: string;
  operator?: FirestoreOperator;
  arrayToChunk?: any[];
  chunkSize?: number;
  condition?: boolean;
  listener?: boolean;
  refreshArray?: any[];
  initialValue?: any[];
  format?: ((data: any[]) => any[]) | null;
};

type UseChunkArrayReturn = {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  loading: boolean;
};

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
      const snapCollection: FirestoreSnapshot[] = [];
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