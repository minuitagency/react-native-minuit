"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAge = getAge;
exports.validateDate = void 0;

import moment from 'moment';

type DateInput = string | moment.Moment | null;

const validateDate = function (date: DateInput = null): Date | null {
  if (!date) {
    return null;
  }

  if (moment(date).isValid()) {
    return new Date(date.toString());
  }

  if (typeof (date as moment.Moment).toDate === 'function') {
    return (date as moment.Moment).toDate();
  }

  return null;
};

exports.validateDate = validateDate;

function getAge(birthDate: moment.Moment): number {
  return moment().diff(birthDate.toDate(), 'years', false);
}
//# sourceMappingURL=dateActions.js.map
