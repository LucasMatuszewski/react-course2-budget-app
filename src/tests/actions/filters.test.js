// THIS TEST ARE QUITE SMALL, there is small chance this will crash/bug.
// BUT WE WILL START RUN MORE COMPLEX TESTS for things often refactored, with high risk of bugs.

import moment from 'moment';
import {
    setTextFilter,
    sortByDate,
    sortByAmount,
    setStartDate,
    setEndDate
} from '../../actions/filters';

test('Should setup setStartDate action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('Should generate set end date action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

test('should setup setTextFilter action object with PROVIDED value', () => {
    const text = 'text to filter';
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    });
});

test('should setup setTextFilter action object with DEFAULT value', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('should setup sortByDate action object', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    });
});

test('should setup sortByAmount action object', () => {
/*     const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    }); */
    // SHORTER VERSION:
    expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' });
});
