import _ from 'lodash';
import { useMemo, useState } from 'react';
interface FormProps {
  initialUserData?: Record<string, any>;
  formState?: Record<string, any>;
}
export function useForm({ initialUserData = {}, formState = {} }: FormProps) {
  const [userData, setUser] = useState(formState);
  const initialData = useMemo(() => {
    return _.pick(initialUserData, Object.keys(formState));
  }, [initialUserData]);
  const onChangeInput = (name: string, value: any) => {
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
  return {
    userData,
    onChangeInput,
    initialData,
    updatedData,
    contentChange: !_.isEqual(userData, initialData),
  };
}