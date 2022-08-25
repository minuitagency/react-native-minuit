"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAge = getAge;
exports.validateDate = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateDate = function () {
  let date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (!date) {
    return null;
  }

  if ((0, _moment.default)(date).isValid()) {
    return date;
  }

  if (typeof (date === null || date === void 0 ? void 0 : date.toDate) === 'function') {
    return date === null || date === void 0 ? void 0 : date.toDate();
  }

  return null;
};

exports.validateDate = validateDate;

function getAge(birthDate) {
  return (0, _moment.default)().diff(birthDate.toDate(), 'years', false);
}
//# sourceMappingURL=dateActions.js.map