'use strict'

/**
 * Require modules
 */
const methodCaller = require('./methodCaller')
const isString = require('lodash.isstring')

/**
 * @description
 * String class that cover localeCompare() method
 *
 * @class IString
 */
module.exports = class IString {
  /**
   * @description
   * Creates instance of IString.
   *
   * @param {string} stringObj - the reference String object
   * @memberOf IString
   */
  constructor (stringObj) {
    // Check the type of parameter
    if (!isString(stringObj)) throw Error('Invalid String object, enter correct string.')

    this.string = stringObj
    this.locale = 'en-US'
    this.options = {}
  }
  /**
   * @description
   * A method that handle other methods because of all methods have same prototype.
   *
   * @param {string} method - the method's name that will be called by exec
   * @param {string} locale - the locale
   * @param {object} options - the options
   * @returns
   */
  methodHandler (method, compareString, locale, options) {
    // To support version 4 of Node.js
    locale = locale || this.locale
    options = options || this.options

    // Pass options as JSON
    let json = JSON.stringify(options)
    let script = `new String("${this.string}").${method}("${compareString}", "${locale}", ${json})`

    return new Promise((resolve, reject) => {
      methodCaller(script)
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  }
  /**
   * @description
   * The localeCompare() method returns a number indicating whether a reference string comes
   * before or after or is the same as the given string in sort order.
   *
   * @param {string} compareString - the compareable string
   * @param {string} locale
   * @param {object} options
   */
  localeCompare (compareString, locale, options) {
    return new Promise((resolve, reject) => {
      this.methodHandler('compareString', compareString, locale, options)
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  }
}
