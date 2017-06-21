const compareDates = function (first, second) {
    const [a_day, a_month, a_year] = first.date.split(".");
    const [b_day, b_month, b_year] = second.date.split(".");

    if (b_year !== a_year) {
        return a_year - b_year
    }

    if (a_month !== b_month) {
        return a_month - b_month
    }

    return a_day - b_day
}


module.exports = { compareDates }