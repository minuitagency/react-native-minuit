import moment from 'moment';

export const validateDate = (date: any = null): Date | null => {
  if (!date) {
    return null;
  }
  if (typeof date === 'number') {
    return new Date(date);
  }
  if (moment(date).isValid()) {
    return new Date(date);
  }
  if (typeof date?.toDate === 'function') {
    return date?.toDate();
  }
  return null;
};

export function getAge(birthDate: moment.Moment): number {
  return moment().diff(birthDate.toDate(), 'years', false);
}