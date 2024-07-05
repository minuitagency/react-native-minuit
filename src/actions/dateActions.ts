import moment from 'moment';

type DateInput = string | number | moment.Moment | { toDate: () => Date } | null;

export const validateDate = (date: DateInput = null): Date | string | null => {
  if (!date) {
    return null;
  }
  if (typeof date === 'number') {
    return new Date(date);
  }
  if (moment(date).isValid()) {
    return date;
  }
  if (typeof (date as { toDate: () => Date })?.toDate === 'function') {
    return (date as { toDate: () => Date })?.toDate();
  }
  return null;
};

export function getAge(birthDate: { toDate: () => Date }): number {
  return moment().diff(birthDate.toDate(), 'years', false);
}
