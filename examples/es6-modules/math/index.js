
/* named export */
/**
export function average(numbers=[]) {
  let sum = 0;
  for (let item of numbers) {
    sum += item;
  }
  return sum / numbers.length;
}

exports.average = function(name, age) {
  let sum = 0;
  for (let item of numbers) {
    sum += item;
  }
  return sum / numbers.length;
};

define(function(require, exports, module) {
  let sum = 0;
  for (let item of numbers) {
    sum += item;
  }
  return sum / numbers.length;
});
 **/
define([], function(){
  var match = {};
  match.average = function(numbers) {
    let sum = 0;
    for (let item of numbers) {
      sum += item;
    }
    return sum / numbers.length;
  }
  return match;
});

