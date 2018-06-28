import moment from 'moment';
import filtersReducer from '../../reducers/filters';


// type: @@INIT --> value send by REDUX, when it have initialized correctly, to set default state

test('should setup default filter values', () =>{
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = { type: 'SORT_BY_DATE' };
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const currentState = { //could be also undefined. It doesn't matter.
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'date'
    };
    const text = 'filter text';
    const action = {
        type: 'SET_TEXT_FILTER',
        text
    };
    const state = filtersReducer(currentState, action);
    // expect(state.text).toBe('filter text'); // BETTER with variable (misspells)
    expect(state.text).toBe(text); // same 'text' variable in expect and in action
});

test('should set startDate filter', () => {
    const startDate = moment(0);
    const action = {
        type: 'SET_START_DATE',
        startDate
    };
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(startDate); // same variable in action and test - avoid misspells
});

test('should set endDate filter', () => {
    const endDate = moment(0);
    const action = {
        type: 'SET_END_DATE',
        endDate
    };
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(endDate); // same variable in action and test - avoid misspells
});