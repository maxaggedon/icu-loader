'use strict'

/**
 * Require modules
 */
const methodCaller = require('./methodCaller')
const isDate = require('lodash.isdate')

/**
 * @description
 * Date class that cover methods of JavaScript Intl API
 *
 * @class IDate
 */
module.exports = class IDate {
  /**
   * @description
   * Creates instance of IDate.
   *
   * @param {date} dateObj - the reference Date object
   * @memberOf IDate
   */
  constructor (dateObj) {
    // Check the type of parameter
    if (dateObj === undefined) {
      this.date = new Date()
    } else if (typeof dateObj === 'string') {
      this.date = new Date(dateObj)
    } else {
      if (!isDate(dateObj)) throw Error('Invalid Date, enter correct date.')
      this.date = dateObj
    }

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
  methodHandler (method, locale, options) {
    // To support version 4 of Node.js
    locale = locale || this.locale
    options = options || this.options

    // Pass options as JSON
    let json = JSON.stringify(options)
    let script = `new Date("${this.date}").${method}("${locale}", ${json})`

    return new Promise((resolve, reject) => {
      methodCaller(script)
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  }
  /**
   * @description
   * The toLocaleString() method returns a string with a language sensitive representation of this date.
   *
   * @param {string} locale
   * @param {object} options
   */
  toLocaleString (locale, options) {
    return new Promise((resolve, reject) => {
      this.methodHandler('toLocaleString', locale, options)
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
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
    return new Promise((resolve, reject) => {
      this.methodHandler('toLocaleDateString', locale, options)
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
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
    return new Promise((resolve, reject) => {
      this.methodHandler('toLocaleTimeString', locale, options)
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  }
}
