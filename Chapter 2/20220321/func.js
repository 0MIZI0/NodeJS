const { odd, even } = require('./var');

exports.checkOddOrEven = function(num){
  if (num % 2) { // 홀수면
    return odd;
  }
  return even;
}