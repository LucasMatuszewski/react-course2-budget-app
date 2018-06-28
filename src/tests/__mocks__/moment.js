// import moment from 'moment'; // BUT it will import mocked version (so this file..)
const moment = require.requireActual('moment'); // it will import real version of Library

// This mocked version will return default timestamp for moment(0) = beginning of Unix Epoch
// but if we will provide a timestamp (from createdAt) it will work normally
export default (timestamp = 0) => {
    return moment(timestamp);
};

// With this ExpenseForm.test.js will get new Expense with moment(0) instead of moment() = NOW.