'use strict'

const execSync = require('child_process').execSync
const isString = require('lodash.isstring')

/**
 * @description
 * A String class that cover localeCompare() method
 *
 * @class IString
 */
module.exports = class IString {
  /**
   * @description
   * Creates an instance of IString.
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
   * The localeCompare() method returns a number indicating whether a reference string comes
   * before or after or is the same as the given string in sort order.
   *
   * @param {string} compareString - the compareable string
   * @param {string} [locale=en-US] - the method's locale name
   * @param {object} [options={}] - the method's options
   */
  localeCompare (compareString, locale, options) {
    // To support version 4 of Node.js
    locale = locale || this.locale
    options = options || this.options

    // Pass options as JSON
    let json = JSON.stringify(options)
    let script = `new String("${this.string}").localeCompare("${compareString}", "${locale}", ${json})`

    // Run node command with script
    return execSync(`node --icu-data-dir=./node_modules/full-icu -p '${script}'`).toString().trim()
  }
}
