import selectExpenses from '../../selectors/expenses';
import moment from 'moment';

// test data for this file:
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

test('should filter by text value', () => {
    const filters = {
        text: 'R',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[1]]); // Rent and Credit contains "r" (case insensitive)
}); // ORDERED BY DATE FROM NEWER!!!

test('should filter by startDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    }; //Expected filtered objects: first expense is on 0, third expense is +4 days
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0]]); // ORDERED BY DATE FROM NEWER
});

test('should filter by endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(2, 'days')
    }; //Expected filtered objects: first expense is on 0, second expense is -4 days
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[0], expenses[1]]);  // ORDERED BY DATE FROM NEWER
});

test('should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }; //Expected: all object sorted by date (default)
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);  // ORDERED BY DATE FROM NEWER
});

test('should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }; //Expected: all object sorted by amount (DESC)
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);  // ORDERED BY AMOUNT FROM MORE EXPENSIVE
});
