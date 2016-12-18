// @flow
import _ from 'lodash'

/**
 *
 * The localeCompare() method compares two strings in same or different locale.
 *
 * @param {any} object - Covering all of variables
 * @var {string} referenceStr - Reference string
 * @var {string} compareString - Compareable string
 * @var {string} locales - Covering locale string
 * @var {any} options - An object with some or all of the function properties
 * @returns {number} output - Returns a number indicating whether a reference string comes
 * before or after or is the same as the given string in sort order.
 */
export default (object/* : any */) => {
  // Check out emoty object or inadequacy of the parameters
  if (_.isEmpty(object) || object.length < 2) {
    throw Error('Parameters are empty or not enough!')
  }

  let referenceStr/* : string */ = object[0]
  let compareString/* : string */ = object[1]
  let locales/* : string */ = object[2]
  let options/* : any */ = object[3]

  // Comaring Strings
  let output = referenceStr.localeCompare(compareString, locales, options)

  return output
}
