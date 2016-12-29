'use strict'

const execSync = require('child_process').execSync
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
   * The toLocaleString() method returns a string with a language sensitive representation of this number.
   *
   * @param {string} [locale=en-US] - the method's locale name
   * @param {object} [options={}] - the method's options
   */
  toLocaleString (locale, options) {
    // To support version 4 of Node.js
    locale = locale || this.locale
    options = options || this.options

    // Pass options as JSON
    let json = JSON.stringify(options)
    let script = `new Number("${this.number}").toLocaleString("${locale}", ${json})`

    // Run node command with script
    return execSync(`node --icu-data-dir=./node_modules/full-icu -p '${script}'`).toString().trim()
  }
}
