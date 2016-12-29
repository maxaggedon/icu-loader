'use strict'

const execSync = require('child_process').execSync
const isDate = require('lodash.isdate')

/**
 * @description
 * A Date class that cover 3 methods of JavaScript Intl API
 *
 * @class IDate
 */
module.exports = class IDate {
  /**
   * @description
   * Creates an instance of IDate.
   *
   * @param {date} dateObj - the reference Date object
   * @memberOf IDate
   */
  constructor (dateObj) {
    dateObj = new Date(dateObj)

    // Check the type of parameter
    if (dateObj.toString === 'Invalid Date') throw Error('Invalid Date object, enter correct dateString.')
    else if (!isDate(dateObj)) throw Error('Invalid Date object, enter correct date.')

    this.date = dateObj
    this.locale = 'en-US'
    this.options = {}
  }
  /**
   * @description
   * A method that handle other methods because of all methods have same prototype.
   *
   * @param {string} method - the method's name that will be called by execSync
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
    let script = `new Date("${this.date}").${method}("${locale}", ${json})`

    // Run node command with script
    return execSync(`node --icu-data-dir=./node_modules/full-icu -p '${script}'`).toString().trim()
  }
  /**
   * @description
   * The toLocaleString() method returns a string with a language sensitive representation of this date.
   *
   * @param {string} locale
   * @param {object} options
   */
  toLocaleString (locale, options) {
    return this.methodHandler('toLocaleString', locale, options)
  }
  /**
   * @description
   * The toLocaleDateString() method returns a string with a language sensitive representation of
   * the date portion of this date.
   *
   * @param {string} locale
   * @param {object} options
   */
  toLocaleDateString (locale, options) {
    return this.methodHandler('toLocaleDateString', locale, options)
  }
  /**
   * @description
   * The toLocaleTimeString() method returns a string with a language sensitive representation of
   * the time portion of this date.
   *
   * @param {string} locale
   * @param {object} options
   */
  toLocaleTimeString (locale, options) {
    return this.methodHandler('toLocaleTimeString', locale, options)
  }
}
