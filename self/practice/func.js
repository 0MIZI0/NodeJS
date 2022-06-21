const { odd, even } = require('./var');

exports.checkOddOrEven = function(num) {
    if (num % 2) return odd;
    return even;
}