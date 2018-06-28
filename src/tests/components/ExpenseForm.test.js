import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses'; //dummy data for tests

test('should render ExpenseForm correctly with DEFAULT values to add NEW expense', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});


test('should render ExpenseForm correctly to EDIT existing expense: Rent', () => {
    const wrapper = shallow(<ExpenseForm expense = { expenses[1] } />);
    expect(wrapper).toMatchSnapshot();
});

// SIMULATE USER INTERACTIONS / EVENTS:
test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot(); // We can do snapshots before and after Action to compare
    wrapper.find('form').simulate('submit', { // to simulate submitting a Form
        // We have to remove an error from e.preventDefault (we didn't send any "e" object):
        preventDefault: () => {} // we set empty function to MOCK real preventDefault()
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0); //check if there is some error in State
    expect(wrapper).toMatchSnapshot(); // check if error is still rendered on the snapshot
});

test('should set description on input change. Value = New description', () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
    expect(wrapper.state('error')).toBeUndefined();
    expect(wrapper).toMatchSnapshot();
});

test('should set NOTE on taxtarea change. value = New note', () => {
    const value = 'New note';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
    expect(wrapper.state('error')).toBeUndefined();
    expect(wrapper).toMatchSnapshot();
});

test('should set amount=150.65 if VALID input (a price format). Input type=number, JS+HTML5 validation', () => {
    const value = '150.65';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('[type="number"]').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
    expect(wrapper.state('error')).toBeUndefined();
    expect(wrapper).toMatchSnapshot();
});

test('should set amount=150.50 if VALID input (a price format). Input type=text, only JS validation', () => {
    const value = '150.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(2).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
    expect(wrapper.state('error')).toBeUndefined();
    expect(wrapper).toMatchSnapshot();
});

test('should render ERROR and NOT set amount if INVALID input (not price format). Input type=number, JS+HTML5 validation', () => {
    const value = '150,343234';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input[type="number"]').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper.state('amount')).toBe('');
    expect(wrapper).toMatchSnapshot();
});

test('should render ERROR and NOT set amount if INVALID input (STRING instead of numbers). Input type=text, only JS validation', () => {
    const value = 'invalid Price';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(2).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper.state('amount')).toBe('');
    expect(wrapper).toMatchSnapshot();
});


// TEST SPIES - jest.fn - MOCK FUNCTION

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    //onSubmitSpy(); // without implementation it return UNDEFINED when invoked
    //expect(onSubmitSpy).toHaveBeenCalled();

    // Render Component with MOCKED onSubmit function (it will invoke a Spy):
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });

    expect(wrapper.state('error')).toBe(undefined);
    expect(onSubmitSpy).toHaveBeenLastCalledWith({ // Test if onSubmit is called with proper data
        //we can't compare with expenses[0], onSubmit don't have ID jet. So we create object here:
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt,
    });
});

test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    // We can select Component by its name and take its prop or props:
    // http://airbnb.io/enzyme/docs/api/ShallowWrapper/prop.html
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
    
    // wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    // FAIL: Method “props” is only meant to be run on a single node. 0 found instead.
    /* For more recent version of react-dates the component name no longer works as a selector.
    We have to find an alternative enzyme selector. For Example:
    find('withStyles(SingleDatePicker)')
    find('[onDateChange]')
      */
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused});
    // ({true}) didn't work directly here. Thats why we need a variable.
    expect(wrapper.state('calendarFocused')).toBe(focused);
});