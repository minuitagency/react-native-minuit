import {useEffect, useState} from 'react';

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
}) {
  const [data, setData] = useState(initialValue);
  const [allListener, setAllListener] = useState([]);
  const [loading, setLoading] = useState(true);


  function getChunkArray() {
    const chunkedArray = [];
    for (let i = 0; i < arrayToChunk.length; i += chunkSize) {
      chunkedArray.push(arrayToChunk.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }

  async function makeAllRequests(chunkedArray) {
    try {
      setLoading(true);
      const snapCollection = [];
      for await (const snap of chunkedArray.map(
        async chunk => await ref.where(keyName, operator, chunk).get(),
      )) {
        snapCollection.push(snap);
      }
      const results = [];
      (await Promise.all(snapCollection)).map(({docs = []}) => {
        docs.map(snap => {
          results.push({...snap.data(), id: snap.id});
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
        chunkedArray.map(chunk => {
          const listener = ref
            .where(keyName, operator, chunk)
            .onSnapshot(snap => {
              const results = [];
              snap?.docs.map(snap => {
                results.push({...snap.data(), id: snap.id});
              });
              if (format) {
                setData(format(results));
              } else {
                setData(results);
              }
              setLoading(false);
            }, (e) => {
              console.log(e);
              setLoading(false);
            });
          setAllListener(prev => [...prev, listener]);
        });
      } else {
        makeAllRequests(chunkedArray);
      }
    }

    return () => {
      if (listener) {
        allListener.map(l => l());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...refreshArray]);

  return {data, setData, loading};
}
