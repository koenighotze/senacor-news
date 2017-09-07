'use strict';

const compareDates = function (first, second) {

    const [firstDay, firstMonth, firstYear] = first.date.split('.');
    const [secondDay, secondMonth, secondYear] = second.date.split('.');

    if (secondYear !== firstYear) {
        return firstYear - secondYear;
    }

    if (firstMonth !== secondMonth) {
        return firstMonth - secondMonth;
    }

    return firstDay - secondDay;
};


module.exports = { compareDates };
