// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = {
  basePath: '',
  frameworks: ['jasmine', '@angular-devkit/build-angular'],
  plugins: [
    require('karma-jasmine'),
    require('karma-chrome-launcher'),
    require('karma-jasmine-html-reporter'),
    require('karma-coverage-istanbul-reporter'),
    require('@angular-devkit/build-angular/plugins/karma')
  ],
  client: {
    clearContext: false // leave Jasmine Spec Runner output visible in browser
  },
  coverageIstanbulReporter: {
    dir: require('path').join(__dirname, './coverage'),
    reports: ['html', 'lcovonly', 'text-summary', "json"],
    fixWebpackSourcePaths: true,
    thresholds: {
      statements: 80,
      lines: 80,
      branches: 60,
      functions: 80
    }
  },
  reporters: ['progress', 'kjhtml'],
  port: 9876,
  colors: true,
  autoWatch: true,
  browsers: ['Chrome'],
  singleRun: false,
  restartOnFileChange: true,
};
