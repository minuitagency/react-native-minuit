import moment from 'moment';

export const validateDate = (date = null) => {
  if (!date) {
    return null;
  }
  if (typeof date === 'number') {
    return new Date(date);
  }
  if (moment(date).isValid()) {
    return date;
  }
  if (typeof date?.toDate === 'function') {
    return date?.toDate();
  }
  return null;
};

export function getAge(birthDate) {
  return moment().diff(birthDate.toDate(), 'years', false);
}
