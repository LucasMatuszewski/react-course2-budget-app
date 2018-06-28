import moment from 'moment';
/******
 * SELECTOR
 * GET FILTERED/Visable EXPENSES & Sort them
 */
export default (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        /* OLD VERSION WITHOUT MOMENT():
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof startDate !== 'number' || expense.createdAt <= endDate; */
        // QUERY with MOMENT() https://momentjs.com/docs/#/query/is-same-or-before/
        // IMPORTANT!!! There is some error/bug because of Redux DevTools on data changes:
        // startDate.isSameOrBefore is not a function
        // After deactivation of Redux DevTools it works fine.
        // similar isue: https://github.com/zalmoxisus/redux-devtools-extension/issues/315
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true; // startDate is already a moment() object, we don't have to convert it
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        // const textMatch = typeof text !== 'string' || expense.description.toLowerCase().indexOf(text.toLowerCase()) !== -1 || expense.note.toLowerCase().indexOf(text.toLowerCase()) !== -1;
        //in ES7 / ES2016 we have .includes(), new method better from .indexOf() in many cases:
        const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase()) || expense.note.toLowerCase().includes(text.toLowerCase());
        // .includes() search also for NaN and undefined (indexOf don't)

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

// TIMESTAMPS (in milliseconds, 1s = 1000 ms )
// start 0 = 01.01.1970 (unix epoch)
// 1000 = 1000 milliseconds = 1s after 01.01.1970
// -60000 = 60s = 1min before 01.01.1970