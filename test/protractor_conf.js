var PORT = process.env.PORT || 9000;
require('http').createServer(require('./test.server')).listen(PORT);

// An example configuration file.
exports.config = {
  directConnect: true,
  chromeOnly: true,
  chromeDriver: '../node_modules/protractor/selenium/chromedriver',
  baseUrl: 'http://127.0.0.1:' + PORT + '/',


  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine 2 is recommended.
  framework: 'jasmine2',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['e2e/**/*.spec.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
