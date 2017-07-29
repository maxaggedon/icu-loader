'use strict'

/*
 * To use JavaScript Intl API, Node.js needs to run with --icu-data-dir option that
 * provides us to have Intl API in our Node environment but because of the structure of
 * the Node.js we're not able to use this option directly as requiring it in our scripts.
 * through child_process module, this feature will be possible.
 */

if (typeof window !== 'undefined') {
  /**
   * Display warning on requiring package in browsers
   */
  console.warn('You\'re trying to run %cICU-Loader %cin Browser environment but it\'s not possible and also you can use JavaScript built-in Intl API in Browser instead of this package.\n→ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl', 'font-weight: bold', 'font-weight: normal')
} else {
  /**
   * Export package
   */
  module.exports = {
    IDate: require('./src/date'),
    IString: require('./src/string'),
    INumber: require('./src/number')
  }
}
