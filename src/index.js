((exports => {
  exports.date = {
    toLocaleString: (params) => require('./toLocale').default(params, 'toLocaleString'),
    toLocaleDateString: (params) => require('./toLocale').default(params, 'toLocaleDateString'),
    toLocaleTimeString: (params) => require('./toLocale').default(params, 'toLocaleTimeString')
  }
  exports.string = {
    localeCompare: (params) => require('./localeCompare').default(params)
  }
  exports.number = {
    toLocaleString: (params) => require('./toLocale').default(params, 'toLocaleString')
  }
}))(typeof exports === 'undefined' ? this['icu-loader'] = {} : exports)
