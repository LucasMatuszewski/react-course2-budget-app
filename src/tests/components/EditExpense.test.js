import React from 'react';
import { shallow } from 'enzyme';
import { EditExpense } from '../../components/EditExpense';
import expenses from '../fixtures/expenses';

let expense, editExpense, history, removeExpense, wrapper;

beforeEach(() => { // set this 3 variables before each test case:
    expense = expenses[1]; // ON UDEMY: he use this directly as component props, and didn't let expense.
    editExpense = jest.fn(); //Spy to mock editExpense action from EditExpense component
    removeExpense = jest.fn(); //Spy to mock removeExpense action from EditExpense component
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditExpense
            expense={expense}
            editExpense={editExpense}
            removeExpense={removeExpense}
            history={history}
        />
    );
});

test('should render EditExpense correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit to Edit Expense', () => {
    // 1. Sellect ExpenseForm, 2. Access prop=onSubmit, 3. Call callback function of onSubmit with (this data)
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]); // We send only one argument to this function, in EditExpense.js line 14: onSubmit = (expense) => {
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]); // But this function use two arguments, in EditExpense.js line 69: dispatch(editExpense(id, expense)),
});

test('should handle onClick to Remove Expense', () => {
    wrapper.find('button').prop('onClick')(); // We don't send any arguments to this function
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[1].id }); // But this function us one argument with ID in an object { id: ID }
});