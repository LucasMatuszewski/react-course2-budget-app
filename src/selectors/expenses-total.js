export default (expenses) => {
    if(!expenses || expenses.length === 0) {
        return 0;
    } else {
        // MY VERSION:
        return expenses.reduce((previousTotal, currentExpense) => {
            return previousTotal + currentExpense.amount;
        }, 0);
        // UDEMY VERSION: (map to make array of numbers ==> reduce to sum this numbers)
        /* return expenses
            .map((expense) => expense.amount)
            .reduce((sum, value) => sum + value, 0); */
    }
};

//https://stackoverflow.com/questions/5732043/javascript-reduce-on-array-of-objects