/* jslint node: true */

'use strict';

var suite = require('../../../../npm/suites.gemini');

// HEADER.
suite({
  url: '/',
  suiteName: 'header',
  selector: '.js-header'
});
