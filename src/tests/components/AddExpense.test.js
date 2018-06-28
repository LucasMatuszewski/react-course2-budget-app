import React from 'react';
import { shallow } from 'enzyme';
import { AddExpense } from '../../components/AddExpense';
import expenses from '../fixtures/expenses';

/* 
// 1. OLD VERSION WITH unDRY code (duplicated const):
test('should render AddExpensePage correctly', () => {
    const onSubmit = jest.fn(); //Spy to mock onSubmit function
    const history = { push: jest.fn() };
    const wrapper = shallow(<AddExpense onSubmit={onSubmit} history={history} />);
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubit', () => {
    const onSubmit = jest.fn(); //Spy to mock onSubmit function
    const history = { push: jest.fn() };
    const wrapper = shallow(<AddExpense onSubmit={onSubmit} history={history} />);
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(onSubmit).toHaveBeenLastCalledWith(expenses[1]);
});
*/


// 2. DRY VERSION (without duplicated const):
// http://jestjs.io/docs/en/api#beforeeachfn-timeout

let addExpense, history, wrapper; // define 3 empty variables (fresh copies before every test case)

beforeEach(() => { // set this 3 variables before each test case:
    addExpense = jest.fn(); //Spy to mock addExpense action from AddExpense component
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpense addExpense={addExpense} history={history} />);
});

test('should render AddExpense correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});