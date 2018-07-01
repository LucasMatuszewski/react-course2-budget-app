import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import ExpensesSummary from './ExpensesSummary';
import selectExpenses from '../selectors/expenses';

// REGULAR COMPONENT TO USE INSIDE HOC connect():
// (named export for Jest Snapshot Test)
export const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                props.expenses.map((expense) => (
                    <ExpenseListItem key={expense.id} {...expense} /> 
                ))
            )
        }
        <ExpensesSummary expenses={props.expenses} />
        
    </div>
);

// HOC:
/* const ConnectedExpenseList = connect((state) => {
    return {
        expenses: state.expenses
    };
})(ExpenseList);

export default ConnectedExpenseList; */

//MORE COMMON PRACTICE (MORE CLEAR):
const mapStateToProps = (state) => {
    return {
        // Function from our file selectors/expenses.js:
        expenses: selectExpenses(state.expenses, state.filters) // expenses after filter.
        /* expenses: state.expenses,
        filters: state.filters */
    };
};

//DEFAULT UNNAMED EXPORT:
export default connect(mapStateToProps)(ExpenseList);

// connect() give use information from a store / State Tree inside ExpenseList regular component
// it is reactive, when state change in store, ExpenseList component will be re-rendered