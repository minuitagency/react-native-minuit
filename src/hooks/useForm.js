import _ from 'lodash';
import { useMemo, useState } from 'react';

export function useForm({ initialUserData = {}, formState = {} }) {
  const [userData, setUser] = useState(formState);

  const initialData = useMemo(() => {
    return _.pick(initialUserData, Object.keys(formState));
  }, [initialUserData]);

  const onChangeInput = (name, value) => {
    setUser({ ...userData, [name]: value });
  };

  const updatedData = useMemo(() => {
    if (_.isEmpty(initialData)) {
      return {};
    }
    return _.pickBy(userData, (value, key) => {
      return !_.isEqual(value, initialData[key]);
    });
  }, [userData]);

  function reset() {
    setUser(initialData);
  }

  return {
    userData,
    onChangeInput,
    initialData,
    updatedData,
    contentChange: !_.isEqual(userData, initialData),
    reset,
  };
}
