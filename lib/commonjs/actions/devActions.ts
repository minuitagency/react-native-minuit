"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomInt = void 0;

type MaxValue = number;

const getRandomInt = (max: MaxValue): number => {
  return Math.floor(Math.random() * max); // Entre 0 et max -1
};

exports.getRandomInt = getRandomInt;
//# sourceMappingURL=devActions.js.map
