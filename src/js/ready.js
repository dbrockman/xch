// var currencies = require('./currencies.js');

var tmp_fn = require('./test.jade');
var tmp_fn_2 = require('./test2.jade');

// Exports the domready event listener
module.exports = function () {

  var html = tmp_fn({ msg: 'Hello World!' });
  console.log('html from jade:', html);

  var html2 = tmp_fn_2({ msg: 'Hello World 2!' });
  console.log('html from jade 2:', html2);

};
