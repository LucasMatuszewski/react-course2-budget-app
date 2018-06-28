import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { defaultFilters, altFilters } from '../fixtures/filters';

/* // MY VERSION (did't work):
let onTextChange, onSortChange, onDatesChange, setStartDate, setEndDate, wrapper; */
let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => { // set this 3 variables before each test case:
    setTextFilter = jest.fn(); //Spy to mock setTextFilter action from EditExpense component
    sortByDate = jest.fn(); //Spy to mock sortByDate action from EditExpense component
    sortByAmount = jest.fn(); // --||--
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={defaultFilters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
        /* // MY VERSION
        // DIDN't WORK: I should pass here external functions from props (setTextFilter)
        // instead of internal functions defined inside Component (onTextChange)...
        <ExpenseListFilters
            filters={defaultFilters}
            onTextChange={onTextChange}
            onSortChange={onSortChange}
            onDatesChange={onDatesChange}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        /> */
    );
});

test('should render ExpenseListFilters with DEFAULT values correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with FILTER values (ee, amount, dates) correctly', () => {
    // Change only one PROP to altFilters:
    // https://github.com/airbnb/enzyme/blob/master/docs/api/ShallowWrapper/setProps.md
    wrapper.setProps({ filters: altFilters });
    expect(wrapper).toMatchSnapshot();
});


// MY VERSION (didn't worked):
// I'v tried to use .prop()() but should use .simulate() - WHY ????????
// I found that simulate() don't support Custom Events (zdarzenia niestandardowe), created by us.
// So we can use simulate() only on standard events like onClick.
// What Custom Events are: https://www.kirupa.com/html5/custom_events_js.htm
// Enzyme simulate() on custom events: https://stackoverflow.com/questions/39767177/using-enzyme-simulate-on-custom-events
/* test('should handle setTextFilter to Filter by Text', () => {
    // 1. Sellect input, 2. Access prop=onChange, 3. Call callback function of onChange with (this data)
    wrapper.find('input').prop('onChange')({ value: altFilters.text });
    expect(setTextFilter).toHaveBeenLastCalledWith(altFilters.text);
}); */

test('should handle text change to Filter by Text', () => {
    // const value = altFilters.text;
    const value = 'coffee';
    wrapper.find('input').simulate('change', {
        target: { value } // EVENT TARGET VALUE MUST BE AN OBJECT !!! (I was sending a string)
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should handle select change to Sort by DATE', () => {
    const value = 'date';
    wrapper.setProps({
        filters: altFilters
    }); // To change initial default sorting (date) to alternative (amount) before we will simulate change back to date
    wrapper.find('select').simulate('change', {
        target: { value } // EVENT TARGET VALUE MUST BE AN OBJECT !!! (I was sending a string)
    });
    expect(sortByDate).toHaveBeenCalled();
});

test('should handle select change to Sort by AMOUNT', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
        target: { value } 
    });
    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle DateRangePicker change to change a Date', () => {
    const startDate = moment(0);
    const endDate = moment().add(5, 'days');
    // Simulate can't be used with Custom Event (niestandardowe) like "onDatesChange"
    // Simulate works only with standard like "click", "change"
    // wrapper.find('withStyles(DateRangePicker)').simulate('change', {
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({
        startDate,
        endDate
    });
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should set calendar focus on change', () => {
    // const focused = true; // SingleDatePicker had only true/false because there was one calendar
    const calendarFocused = 'endDate'; // DateRangePicker could be focused on: null, endDate, startDate
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
    // ({true}) didn't work directly here. Thats why we need a variable.
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
