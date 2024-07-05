import moment from 'moment';

export type DateInput = string | Date | moment.Moment | null;

export const validateDate = function (date: DateInput = null): Date | null {
  if (!date) {
    return null;
  }

  if (moment(date).isValid()) {
    return date instanceof Date ? date : moment(date).toDate();
  }

  if (typeof (date as any)?.toDate === 'function') {
    return (date as any).toDate();
  }

  return null;
};

export function getAge(birthDate: moment.Moment): number {
  return moment().diff(birthDate.toDate(), 'years', false);
}
//# sourceMappingURL=dateActions.js.map
