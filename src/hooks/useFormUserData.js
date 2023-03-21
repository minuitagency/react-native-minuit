import _ from 'lodash';
import { useEffect, useState } from 'react';

export async function useFormUserData({ initialUserData, initialState }) {
  const [userData, setUser] = useState(initialState);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    setInitialData(_.pick(initialUserData, Object.keys(initialState)));
  }, [initialUserData]);

  const onChangeInput = (name, value) => {
    setUser({ ...userData, [name]: value });
  };

  return {
    userData,
    onChangeInput,
    initialData,
    contentChange: !_.isEqual(userData, initialData),
  };
}
