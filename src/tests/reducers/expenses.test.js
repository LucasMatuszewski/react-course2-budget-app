import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
/* // Export separate file, INSTEAD OF COPPING DUMMY DATA / FIXTURES in many files (DRY !)
const expenses = [{
    id: '1',
    description: 'gum',
    note: '',
    amount: 1234,
    createdAt: 0
}, {
    id: '2',
    description: 'Rent',
    note: 'test',
    amount: 1212341,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'Credit Card',
    amount: 4503,
    createdAt: moment(0).add(4, 'days').valueOf()
}]; */

test('should set default expenses state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

// This should be moved to separate file if we use it in other test.js files
const newExpense = {
    id: '4',
    description: 'Rent',
    amount: 109500,
    createdAt: 1000,
    note: 'This was last time'
};

test('should ADD new expense to EMPTY state', () => {
    const emptyExpenses = [];
    const action = {
        type: 'ADD_EXPENSE',
        expense: newExpense
    };
    const state = expensesReducer(emptyExpenses, action);
    expect(state).toEqual([newExpense]);
});

test('should ADD new expense to EXISTING state', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: newExpense
    };
    const state = expensesReducer(expenses, action);
    // DOUBLE CHECK with 2 methods:
    expect(state).toEqual([...expenses, newExpense]); // we use spread operator like in reducer. 
    expect(state).toEqual([expenses[0], expenses[1], expenses[2], newExpense]); // without spread operator
});

test('should REMOVE expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]); // without index 1 of array
});

test('should NOT remove expense if id NOT FOUND', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: 'falseID'
    };
    const state = expensesReducer(expenses, action);
    // expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
    expect(state).toEqual(expenses); // simpler, it should be the same, untouched :)
});

// MY VERSION, WITH MANY CHANGES:
test('should EDIT many properties of one expense', () => {
    const editedExpense = {
        id: '2',
        description: 'Rent2',
        note: 'test2',
        amount: 200,
        createdAt: 200000
    };
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            description: 'Rent2',
            note: 'test2',
            amount: 200,
            createdAt: 200000
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], editedExpense, expenses[2]]); // check whole new state array after edit
});

// UDEMY VERSION, WITH SINGLE CHANGE (AMOUNT):
test('should EDIT one property of one expense', () => {
    const amount = 122000;
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            amount
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state[1].amount).toBe(amount); // Check only if this one amount is edited correctly
});

// MY VERSION:
test('should NOT edit expense if id NOT FOUND', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: 'falseID',
        updates: {
            description: 'Rent2',
            note: 'test2',
            amount: 200,
            createdAt: 200000
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses); // it should be the same, untouched :)
});