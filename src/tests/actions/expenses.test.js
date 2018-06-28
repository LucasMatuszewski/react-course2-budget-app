import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('Should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    // expect(action).toBe({
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

// Arrays and Objects are never equal:
// {} === {} // false
// [] === [] // false
// toBe checks for equality, so it will always turn FAIL on arrays and objects.
// To compare if Array/Object have the same values use .toEqual()

test('Should setup EDIT expense action object', () => {
    const action = editExpense('123abc', {note: 'New note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    });
});


test('Should setup ADD expense action object with PROVIDED values', () => {
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'This was last time'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

// When we have some random data (like dynamic ID) we can expect.any(Number | String)
// https://facebook.github.io/jest/docs/en/expect.html#expectanyconstructor


test('Should setup ADD expense action object with DEFAULT values', () => {
    const expenseData = {
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            amount: 0,
            createdAt: 0,
            note: '',
            id: expect.any(String)
        }
    });
});