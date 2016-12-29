/* eslint-env jest */
/*
 * The toLocaleString method should be test just in the Gregorian calendar because of
 * other calendars in Node.js isn't available.
 */
jest.unmock('../src/date.js')
jest.unmock('../src/string.js')
jest.unmock('../src/number.js')
import IDate from '../src/date'
import IString from '../src/string'
import INumber from '../src/number'

describe('Creating an instance of', () => {
  it('IDate class', () => {
    expect(typeof new IDate()).toBe('object')
  })

  it('IString class', () => {
    expect(typeof new IString()).toBe('object')
  })

  it('INumber class', () => {
    expect(typeof new INumber()).toBe('object')
  })
})

describe('toLocaleString Method', () => {
  // Reference Date
  const date = new Date(2016, 9, 16, 2, 0, 0)

  // Method options
  let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  // Expect "10/16/2016, 2:00:00 AM"
  it('Using', () => {
    expect(new IDate(date).toLocaleString()).toBe('10/16/2016, 2:00:00 AM')
  })

  // Expect "Sunday, October 16, 2016"
  it('Using Options', () => {
    expect(new IDate(date).toLocaleString('en-US', dateOptions)).toBe('Sunday, October 16, 2016')
  })
})
