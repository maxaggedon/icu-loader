/*
 * To use JavaScript Intl API, Node.js needs to run with --icu-data-dir option that
 * provides us to have Intl API in our Node environment but because of the structure of
 * the Node.js we're not able to use this option directly as requiring it in our scripts.
 * through child_process module, this feature will be possible.
 */
if (typeof window !== 'undefined') {
  console.warn('You\'re trying to run %cICU-Loader %cin Browser environment but it\'s not possible and also you can use JavaScript built-in Intl API in Browser instead of this package.\n→ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl', 'font-weight: bold', 'font-weight: normal')
} else {
  const libName = require('./package.json').name
  const execSync = require('child_process').execSync
  const fs = require('fs')

  /**
   * Choose the correct path of library's index to execute
   *
   * @returns indexPath
   */
  let indexChooser = () => {
    let indexPath = `./node_modules/icu-loader/dist/${libName}.js`

    try {
      fs.accessSync(indexPath)
    } catch (e) {
      if (e.code === 'ENOENT') {
        indexPath = `./dist/${libName}.js`
      } else {
        throw e
      }
    }

    return indexPath
  }

  /**
   * A function to handle child_process module and pass arguments of methods
   *
   * @param {string} object
   * @param {string} method
   * @param {any} parameters
   * @returns execSync()
   */
  let execFunction = (object, method, parameters) => {
    let jsonObject = JSON.stringify(parameters)

    // Run scripts with ICU option
    return execSync(`node --icu-data-dir=./node_modules/full-icu -p 'require("${indexChooser()}").${object}.${method}(${jsonObject})'`).toString().trim()
  }

  /**
   * Filtring types of the toLocale methods
   *
   * @param {stirng} object
   * @param {string} method
   * @param {any} parameters
   * @returns {string} execFunction
   */
  let toLocaleFilter = (object, method, parameters) => {
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
}
