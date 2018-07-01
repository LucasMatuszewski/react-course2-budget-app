import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary, ExpensesSummaryUdemy } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render Expenses Summary with 3 expenses totalling $1,500.00', () => {
    const wrapper = shallow(<ExpensesSummary expensesTotal='$1,500.00' expenseCount='3' />);
    expect(wrapper).toMatchSnapshot();
});

test('should render Expenses Summary with 1 expense totalling $100.00', () => {
    const wrapper = shallow(<ExpensesSummary expensesTotal='$100.00' expenseCount='1'  />);
    expect(wrapper).toMatchSnapshot();
});

// UDEMY VERSION:
test('should render Expenses Summary UDEMY with 3 expenses totalling $1,500.00', () => {
    const wrapper = shallow(<ExpensesSummaryUdemy expensesTotal='150000' expenseCount='3' />);
    expect(wrapper).toMatchSnapshot();
});

test('should render Expenses Summary UDEMY with 1 expense totalling $100.00', () => {
    const wrapper = shallow(<ExpensesSummaryUdemy expensesTotal='10000' expenseCount='1' />);
    expect(wrapper).toMatchSnapshot();
});