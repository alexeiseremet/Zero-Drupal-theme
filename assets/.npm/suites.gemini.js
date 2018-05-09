/* jslint node: true */
/* global gemini */

'use strict';

var guideUrl = '/themes/zero/assets/public/patternlab/styleguide/html/styleguide.html';

var processData = function (data, options) {
  gemini.suite(options.suiteName || data, function (suite) {
    suite.setUrl(options.url || guideUrl)
        .setCaptureElements(options.selector)
        .capture('plain');

    if (options.before) {
      suite.before(options.before);
    }

    if (options.states) {
      Object.keys(options.states).forEach(function (key) {
        suite.capture(key, options.states[key]);
      });
    }
  });
};

module.exports = function (options) {
  if (Array.isArray(options.data)) {
    options.data.forEach(function (data) {
      processData(data, options);
    });
  } else {
    processData(options.data, options);
  }
};
