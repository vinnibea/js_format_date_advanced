'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  function getInfo(dateformat) {
    const info = {};

    for (let index = 0; index < 3; index++) {
      const position = +index;
      const letter = dateformat[index].slice(0, 1);
      const length = dateformat[index].length;

      info[letter] = { position, length };
    }

    return info;
  }

  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const inputDate = date.split(oldSeparator);
  const outputDate = [];

  const transformFrom = getInfo(fromFormat);
  const transformTo = getInfo(toFormat);

  for (const letter in transformFrom) {
    const oldPos = transformFrom[letter].position;
    const oldLen = transformFrom[letter].length;

    const newPos = transformTo[letter].position;
    const newLen = transformTo[letter].length;
    let find;

    switch (letter) {
      case 'Y':
        find = inputDate[oldPos];

        if (oldLen < newLen) {
          find = +find < 30
            ? '20' + find
            : '19' + find;
        }

        if (find.length > newLen) {
          find = find.slice(2);
        }

        outputDate[newPos] = find;

        break;

      case 'D':
        find = inputDate[oldPos];
        outputDate[newPos] = find;

        break;

      case 'M':
        find = inputDate[oldPos];
        outputDate[newPos] = find;

        break;

      default:

        return date;
    }
  }

  return outputDate.join(newSeparator);
}

module.exports = formatDate;
