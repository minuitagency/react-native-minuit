import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';

export function useFormUserData({ initialUserData, initialState }) {
  const [userData, setUser] = useState(initialState);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    setInitialData(_.pick(initialUserData, Object.keys(initialState)));
  }, [initialUserData]);

  const onChangeInput = (name, value) => {
    setUser({ ...userData, [name]: value });
  };

  const updatedData = useMemo(() => {
    if (!userData || !initialData) {
      return {};
    }
    return _.pickBy(userData, (value, key) => {
      return !_.isEqual(value, initialData[key]);
    });
  }, [userData, initialData]);

  return {
    userData,
    onChangeInput,
    initialData,
    updatedData,
    contentChange: !_.isEqual(userData, initialData),
  };
}
