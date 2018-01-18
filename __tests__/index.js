let IDate = require('../src/date')
let IString = require('../src/string')
let INumber = require('../src/number')

describe('Creating an instance of', () => {
  it('IDate class', () => {
    expect(typeof new IDate()).toBe('object')
  })

  it('IString class', () => {
    expect(typeof new IString('icu-loader')).toBe('object')
  })

  it('INumber class', () => {
    expect(typeof new INumber(123456789)).toBe('object')
  })
})

describe('toLocaleString Method', () => {
  // Reference Date
  const date = new Date(2016, 9, 16, 2, 0, 0)

  // Method options
  let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  // Expect "10/16/2016, 2:00:00 AM"
  it('Using', () => {
    new IDate(date).toLocaleString().then(result => {
      expect(result).toBe('10/16/2016, 2:00:00 AM')
    })
  })

  // Expect "Sunday, October 16, 2016"
  it('Using Options', () => {
    new IDate(date).toLocaleString('en-US', dateOptions).then(result => {
      expect(result).toBe('Sunday, October 16, 2016')
    })
  })

  // Expect "Sunday, October 16, 2016"
  it('Farsi locale', () => {
    new IDate(date).toLocaleString('fa-IR', dateOptions).then(result => {
      expect(result).toBe('یکشنبه ۲۵ مهر ۱۳۹۵ ه‍.ش.')
    })
  })
})
