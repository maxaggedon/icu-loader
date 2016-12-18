# ICU Loader
A package to load full ICU data in Node.js environment with JavaScript Intl API

ES modules example:
```js
import {date, string, number} from 'icu-loader'; // or import date from 'icu-loader;

date.toLocaleString(new Date(2016, 9, 16), 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }); // October 16, 2016
string.localeCampare('ä', 'z', 'de'); // a negative value: in German, ä sorts before z
number.toLocaleString(30000000000, 'fa-IR', { style: 'currency', currency: 'IRR' }) // ‎ریال۳۰٬۰۰۰٬۰۰۰٬۰۰۰
```
# Table of Contents
  * [Requirements](#requirements)
  * [Usage](#usage)
  * [Contributing](#contributing)

# Requirements
ICU Loader requires the following to run:
  * [Node.js][1] 0.11.15+
  * [full-icu][2] package (It'll be install as dependencies)

# Usage
ICU Loader is easiest to use when installing with [npm][4]:
```js
npm install icu-loader --save
```
Then you can load the module into your code with a require or import way:
```js
// ES modules way
import {date, string, number} from 'icu-loader'; // or import date from 'icu-loader;

// Require way
var date = require('icu-loader').date;
var string = require('icu-loader').string;
var number = require('icu-loader').number;
```
According to JavaScript Intl API, the module has the following objects ([Date](#date), [String](#string), [Number](#number)) and various methods.
> The star (*) sign means the argument is optional.

### Date
All arguments of the methods of Date object are same, the following methods:
  * toLocaleString(dateObj, locales, [options])
  * toLocaleDateString(dateObj, locales, [options])
  * toLocaleTimeString(dateObj, locales, [options])

#### Arguments
| Argument Name        | Type                      | Description                                       |
| -------------------- | ------------------------- | ------------------------------------------------- |
| dateObj              | Date, String, Number      | the reference date object                         |
| locales              | String                    | the locales string that date will be displayed in |
| options *            | Object<String>            | [documents][5]                                    |

#### Example
```js
import date from 'icu-loader';

// US English uses month-day-year order and 12-hour time with AM/PM
date.toLocaleString(new Date(2016, 9, 16), 'en-US'); // "9/16/2016, 0:00:00 PM"

// request a weekday along with a long date
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
date.toLocaleString(new Date(2016, 9, 16), 'de-DE', options); // "Sonntag, 16. Oktober 2016"

// Arabic in most Arabic speaking countries uses real Arabic digits
date.toLocaleDateString(new Date(2016, 9, 16), 'ar-EG'); // "۲۰۱۶/۹/۱۶"

// Korean uses year-month-day order and 12-hour time with AM/PM
date.toLocaleTimeString(new Date(2016, 9, 16, 14, 15, 05), 'ko-KR'); // "오후 2:15:05"

// sometimes even the US needs 24-hour time
date.toLocaleTimeString(new Date(), 'en-US', { hour12: false })); // "19:00:00"
```

### String
The String object just has one method to comparing two string in same or different locales, the following method:
  * localeCampare(referenceStr, compareString, locales, [options])

#### Arguments
| Argument Name        | Type           | Description                                        |
| -------------------- | -------------- | -------------------------------------------------- |
| referenceStr         | String         | the reference string                               |
| compareString        | String         | the comparable string                              |
| locales              | String         | the locales string that string will be compared in |
| options *            | Object<String> | [documents][6]                                     |

#### Example
```js
import string from 'icu-loader';

// The letter "a" is before "c" yielding a negative value
string.localeCompare('a', 'c'); // -2 or -1 (or some other negative value)

// Using locales
string.localeCompare('ä', 'z', 'sv'); // a positive value: in Swedish, ä sorts after z

// in German, ä has a as the base letter
string.localeCompare('ä', 'a', 'de', { sensitivity: 'base' })); // 0
```

### Number
Also, the Number object has one method to represent a number in different locales, the following method:
  * toLocaleString(numberObj, locales, [options])

#### Arguments
| Argument Name        | Type                      | Description                                       |
| -------------------- | ------------------------- | ------------------------------------------------- |
| numberObj            | Number                    | the reference number object                       |
| locales              | String                    | the locales string that date will be displayed in |
| options *            | Object<String>            | [documents][5]                                    |

#### Example
```js
import number from 'icu-loader';

// English locale
number.toLocaleString(3500); // Displays "3,500" if in U.S.

// German uses comma as decimal separator and period for thousands
number.toLocaleString(123456.789, 'de-DE'); // 123.456,789

// Using options
number.toLocaleString(30000000000, 'fa-IR', { style: 'currency', currency: 'IRR' }) // ‎ریال۳۰٬۰۰۰٬۰۰۰٬۰۰۰
```

# Contributing
To contribute to ICU Loader, clone this repo locally and commit your code on the **`development`** branch. Please run the linter before opening a pull request:
```js
npm run lint # To find out the errors

npm run lint:fix # To fix automatically the errors

npm run dev # To run the developing task with the watcher

npm run build # To build the module
```

# License
ICU Loader is licensed under the [MIT][7] license, also [full-icu][2] package is part of [ICU][3].

Copyright © 2016, Masoud Ghorbani

  [1]: https://nodejs.org/api/cli.html#cli_icu_data_dir_file/
  [2]: https://www.npmjs.com/package/full-icu/
  [3]: http://site.icu-project.org/
  [4]: https://www.npmjs.com/
  [5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString#Parameters
  [6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCampare#Parameters
  [7]: https://msudgh.mit-license.org/