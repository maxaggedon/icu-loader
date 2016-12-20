/* eslint-env jest */
/*
 * The toLocaleString method should be test just in the Gregorian calendar because of
 * other calendars in Node.js isn't available.
 */
jest.unmock('../src/index.js')
jest.unmock('../src/localeCompare.js')
jest.unmock('../src/toLocale.js')
import index from '../src/index'
import localeCompare from '../src/localeCompare'
import toLocale from '../src/toLocale'

describe('Exporting Objects', () => {
  // Expect 3 method
  it('Date Methods', () => {
    const objectKeys = Object.keys(index.date).length
    expect(objectKeys).toBe(3)
  })

  // Expect 1 method
  it('String Methods', () => {
    const objectKeys = Object.keys(index.string).length
    expect(objectKeys).toBe(1)
  })

  // Expect 1 method
  it('Number Methods', () => {
    const objectKeys = Object.keys(index.number).length
    expect(objectKeys).toBe(1)
  })
})

describe('localeCompare Method', () => {
  // English data
  const data = {
    0: 'A', // Reference string
    1: 'B' // Compareable string
  }

  // Farsi lcoale
  const dataLocale = {
    0: 'ا', // Reference string
    1: 'ب', // Compareable string
    2: 'fa-IR' // Covering locale string
  }

  // German options
  const dataOptions = {
    0: 'ä', // Reference string
    1: 'a', // Compareable string
    2: 'de', // Covering locale string
    3: { sensitivity: 'base' } // Method options
  }

  // Expect -1
  it('Using', () => {
    expect(localeCompare(data)).toBe(-1)
  })

  // Expect -1
  it('Using Locale', () => {
    expect(localeCompare(dataLocale)).toBe(-1)
  })

  // Expect 0
  it('Using Options', () => {
    expect(localeCompare(dataOptions)).toBe(0)
  })
})

describe('toLocaleString Method', () => {
  // Reference Date
  const date = { type: 'object', value: new Date(2016, 9, 16, 2, 0, 0) }

  // Lcoale object
  const dateLocale = { type: 'string', value: 'en-US' }

  // Method options
  let dateOptions = { type: 'object', value: {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'} }

  // Expect "10/16/2016, 2:00:00 AM"
  it('Using', () => {
    expect(toLocale([date], 'toLocaleString')).toBe('10/16/2016, 2:00:00 AM')
  })

  // Expect "Sunday, October 16, 2016"
  it('Using Options', () => {
    expect(toLocale([date, dateLocale, dateOptions], 'toLocaleString')).toBe('Sunday, October 16, 2016')
  })
})
