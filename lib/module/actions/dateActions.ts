import moment from 'moment';

export const validateDate = function (date: any = null): Date | null {
  if (!date) {
    return null;
  }

  if (moment(date).isValid()) {
    return date;
  }

  if (typeof (date?.toDate) === 'function') {
    return date?.toDate();
  }

  return null;
};

export function getAge(birthDate: { toDate: () => Date }): number {
  return moment().diff(birthDate.toDate(), 'years', false);
}

//# sourceMappingURL=dateActions.js.map