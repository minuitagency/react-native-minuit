import React, { useEffect, useState } from 'react';

export default function useDataFromArrayDocId({ ref, format = null, arrayId }) {
  const [data, setData] = useState([]);

  async function getAllDocs() {
    try {
      const promises = arrayId.map(async (id) => {
        return new Promise(async (resolve) => {
          const doc = await ref.doc(id).get();
          resolve({ ...doc.data(), id: doc.id });
        });
      });
      await Promise.all(promises).then((values) => {
        console.log({ values });
        setData(format ? format(values) : values);
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (ref && arrayId?.length > 0) {
      getAllDocs();
    }
  }, [ref, arrayId]);

  return { data };
}
