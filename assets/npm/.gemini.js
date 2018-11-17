module.exports = {
  'gridUrl': 'http://127.0.0.1:4444/wd/hub',
  'rootUrl': 'http://kickvm.test',
  'compositeImage': true,
  'httpTimeout': 200000,
  'screenshotsDir': '../gemini/screens',
  'windowSize': '1024x768',
  'screenshotDelay': 500,
  'retry': 2,
  'system': {
    'plugins': {
      'html-reporter/gemini': {
        'enabled': true,
        'path': '../gemini',
        'defaultView': 'all',
      },
      // 'browserstack': {
      //   'username': 'alexeiseremet1',
      //   'accessKey': '8zRwVDSmsxV6W9yjdsqk',
      //   'localIdentifier': 'kickvm'
      // },
      // 'debug': 'false'
    }
  },
  'sets': {
    'components': {
      'files': [
        '../components/_patterns/**/*.gemini.js'
      ],
      'browsers': [
        'PhantomJS',
        // 'win-edge',
        // 'win-chrome',
        // 'galaxy-note'
      ]
    }
  },
  'browsers': {
    'PhantomJS': {
      'desiredCapabilities': {
        'browser': 'phantomjs'
      }
    },
    'win-edge': {
      'desiredCapabilities': {
        'os': 'WINDOWS',
        'os_version': '10',
        'browser': 'Edge',
        'browser_version': '15.0',
        'browserstack.video': false
      }
    },
    'win-chrome': {
      'desiredCapabilities': {
        'os': 'WINDOWS',
        'os_version': '10',
        'browser': 'Chrome',
        'browser_version': '65.0',
        'browserstack.video': false
      }
    },
    'galaxy-note': {
      'desiredCapabilities': {
        'device': 'Samsung Galaxy Note 4',
        'os_version': 6.0,
        'real_mobile': true,
        'deviceOrientation': 'landscape',
        'browserstack.video': false
      }
    }
  }
}
