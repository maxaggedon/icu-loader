/*
 * To use JavaScript Intl API, Node.js needs to run with --icu-data-dir option that
 * provides us to have Intl API in our Node environment but because of the structure of
 * the Node.js we're not able to use this option directly as requiring it in our scripts.
 * through child_process module, this feature will be possible.
 */
const libName = require('./package.json').name
const execSync = require('child_process').execSync

function execFunction (object, method, parameters) {
  let jsonObject = JSON.stringify(parameters)

  // Run scripts with ICU option
  return execSync(`node --icu-data-dir=./node_modules/full-icu -p 'require("./node_modules/icu-loader/dist/${libName}.js").${object}.${method}(${jsonObject})'`).toString()
}

/**
 * Filtring types of the toLocale methods
 *
 * @param {any} object
 * @param {string} method
 * @param {any} parameters
 * @returns {any} execFunction
 */
function toLocaleFilter (object, method, parameters) {
  let newParameters = {
    addElement: function addElement (element) {
      [].push.call(this, element)
    }
  }

  parameters.map((variable, index) => {
    newParameters.addElement({
      type: typeof variable,
      value: variable
    })
  })

  return execFunction(object, method, newParameters)
}

module.exports = {
  date: {
    toLocaleString: (...parameters) => toLocaleFilter('date', 'toLocaleString', parameters),
    toLocaleDateString: (...parameters) => toLocaleFilter('date', 'toLocaleDateString', parameters),
    toLocaleTimeString: (...parameters) => toLocaleFilter('date', 'toLocaleTimeString', parameters)
  },
  string: {
    localeCompare: (...parameters) => execFunction('string', 'localeCompare', parameters)
  },
  number: {
    toLocaleString: (...parameters) => toLocaleFilter('number', 'toLocaleString', parameters)
  }
}
