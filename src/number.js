'use strict'

const methodCaller = require('./methodCaller')
const isNumber = require('lodash.isnumber')

/**
 * @description
 * A Number class that cover toLocaleString() method
 *
 * @class INumber
 */
module.exports = class INumber {
  /**
   * @description
   * Creates an instance of INumber.
   *
   * @param {string} numberObj - the reference Number object
   * @memberOf INumber
   */
  constructor (numberObj) {
    // Check the type of parameter
    if (!isNumber(numberObj)) throw Error('Invalid Number object, enter correct number.')

    this.number = numberObj
    this.locale = 'en-US'
    this.options = {}
  }
  /**
   * @description
   * A method that handle other methods because of all methods have same prototype.
   *
   * @param {string} method - the method's name that will be called by exec
   * @param {string} locale - the method's locale name
   * @param {object} options - the method's options
   * @returns
   */
  methodHandler (method, locale, options) {
    // To support version 4 of Node.js
    locale = locale || this.locale
    options = options || this.options

    // Pass options as JSON
    let json = JSON.stringify(options)
    let script = `new Number("${this.number}").${method}("${locale}", ${json})`

    // Run node command with script
    return new Promise((resolve, reject) => {
      methodCaller(script)
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  }
  /**
   * @description
   * The toLocaleString() method returns a string with a language sensitive representation of this number.
   *
   * @param {string} [locale=en-US] - the method's locale name
   * @param {object} [options={}] - the method's options
   */
  toLocaleString (locale, options) {
    return new Promise((resolve, reject) => {
      this.methodHandler('toLocaleString', locale, options)
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  }
}
