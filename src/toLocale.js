// @flow
import _ from 'lodash'

/**
 * @flow
 *
 * The toLocale*() methods converts a Date or Number object to a string, using locale settings.
 *
 * @param {any} parameters - Covering all of variables
 * @param {string} functionName - Reference function
 * @var {string} object - Reference object
 * @var {string} locales - Covering locale string
 * @var {any} options - An object with some or all of the function properties
 * @returns {string} output - Returns a Date or Number object to a string, using locale settings.
 */
export default (parameters/* : any */, functionName/* : string */) => {
  // Check out empty object or inadequacy of the parameters
  if (_.isEmpty(parameters) || !parameters.length) {
    throw Error('Parameters are empty or not enough!')
  }

  let object/* : any */ = parameters[0]
  let locales/* : string */ = parameters[1] ? parameters[1].value : 'en-US' // 'en-US' as default locale
  let options/* : any */ = parameters[2] ? parameters[2].value : {}
  let output/* : string */ = ''

  // Check out type of object parameter
  if ((object.type === 'object') && (!_.isNaN(new Date(object.value).getMonth()))) {
    // Detect the name of the method called
    if (functionName === 'toLocaleString') {
      output = new Date(object.value).toLocaleString(locales, options)
    } else if (functionName === 'toLocaleDateString') {
      output = new Date(object.value).toLocaleDateString(locales, options)
    } else if (functionName === 'toLocaleTimeString') {
      output = new Date(object.value).toLocaleTimeString(locales, options)
    } else {
      output = new Date(object.value).toLocaleString(locales, options)
    }
  } else if (object.type === 'number') {
    output = object.value.toLocaleString(locales, options)
  } else {
    throw Error('Wrong object type!')
  }

  return output
}
