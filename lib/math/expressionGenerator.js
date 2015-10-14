'use strict';
var operators = ['+', '-', '*', '/', '^'];

function randNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randOperator() {
  return operators[randNumber(0, operators.length - 1)];
}

/**
 * @param numbersCount
 * @return {Array} An array of random numbers
 */
function randNumbers(numbersCount) {
  return (new Array(numbersCount))
    .fill('n')
    .map(randNumber.bind(null, 1, 100));
}

/**
 * Generate a random, valid, mathematical expression
 *  Example: "2+3+15="
 * @param [numbersCount] Optionally specify the "amount of numbers to be operated on"
 * @return {string}
 */
function randomExpression(numbersCount) {
  const isLast = (array, i) => (i < array.length - 1);
  return randNumbers(numbersCount || randNumber(2, 10))
      .reduce((str, num, i, array) =>
        str + num + (isLast(array, i) ? randOperator() : ''),
      '') + '=';
}

module.exports = {
  randomExpression
};
