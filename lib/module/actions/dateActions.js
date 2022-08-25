import moment from 'moment';
export const validateDate = function () {
  let date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (!date) {
    return null;
  }

  if (moment(date).isValid()) {
    return date;
  }

  if (typeof (date === null || date === void 0 ? void 0 : date.toDate) === 'function') {
    return date === null || date === void 0 ? void 0 : date.toDate();
  }

  return null;
};
export function getAge(birthDate) {
  return moment().diff(birthDate.toDate(), 'years', false);
}
//# sourceMappingURL=dateActions.js.map