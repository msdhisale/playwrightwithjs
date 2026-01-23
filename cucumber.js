module.exports = {
  default: {
    require: ['support/**/*.js', 'steps/**/*.js'],
    requireModule: [],
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    paths: ['features/**/*.feature'],
    dryRun: false,
    failFast: false,
    strict: true,
    retry: 0,
    parallel: 2
  },
  smoke: {
    require: ['support/**/*.js', 'steps/**/*.js'],
    format: [
      'progress-bar',
      'html:reports/cucumber-report-smoke.html',
      'json:reports/cucumber-report-smoke.json'
    ],
    paths: ['features/**/*.feature'],
    tags: '@smoke',
    parallel: 2
  },
  sanity: {
    require: ['support/**/*.js', 'steps/**/*.js'],
    format: [
      'progress-bar',
      'html:reports/cucumber-report-sanity.html',
      'json:reports/cucumber-report-sanity.json'
    ],
    paths: ['features/**/*.feature'],
    tags: '@sanity',
    parallel: 2
  },
  regression: {
    require: ['support/**/*.js', 'steps/**/*.js'],
    format: [
      'progress-bar',
      'html:reports/cucumber-report-regression.html',
      'json:reports/cucumber-report-regression.json'
    ],
    paths: ['features/**/*.feature'],
    tags: '@regression',
    parallel: 2
  },
  positive: {
    require: ['support/**/*.js', 'steps/**/*.js'],
    format: [
      'progress-bar',
      'html:reports/cucumber-report-positive.html',
      'json:reports/cucumber-report-positive.json'
    ],
    paths: ['features/**/*.feature'],
    tags: '@positive',
    parallel: 2
  },
  negative: {
    require: ['support/**/*.js', 'steps/**/*.js'],
    format: [
      'progress-bar',
      'html:reports/cucumber-report-negative.html',
      'json:reports/cucumber-report-negative.json'
    ],
    paths: ['features/**/*.feature'],
    tags: '@negative',
    parallel: 2
  }
};
