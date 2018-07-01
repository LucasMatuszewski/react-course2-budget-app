import React from 'react';
import { connect } from 'react-redux';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

// MY VERSION:
// 1. Summary Component inside ExpenseList with Filtered Expenses as props
// 2. I don't selectExpenses here to filter expenses (why do it twice if we do this in ExpenseList?)
export const ExpensesSummary = (props) => (
    <div>
        {
            props.expenseCount > 0 && (
                <p>
                    Total: {props.expensesTotal}, 
                    from {props.expenseCount} expense{ props.expenseCount !== 1 && 's' }
                </p>
            )
        }
    </div>
);

const mapStateToProps = (state, props) => {
    return {
        expenseCount: props.expenses.length, // number of expenses after filter.
        expensesTotal: numeral(selectExpensesTotal(props.expenses) / 100).format('$0,0.00') 
    };
};

// UDEMY VERSION:
// 1. Summary Component inside Dashboard without any props from parent (only state from a store)
// 2. He selectExpenses here again (doubled with ExpenseList)
// 3. He destruct props and use destructed variables in component (instead props.expensesTotal)
import selectExpenses from '../selectors/expenses';

export const ExpensesSummaryUdemy = ({ expenseCount, expensesTotal }) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses' ;
    const formatedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');

    return (
        <div>
            <h2>Viewing {expenseCount} {expenseWord} totalling {formatedExpensesTotal} </h2>
        </div>
    );
};

const mapStateToPropsUdemy = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
    };
};

//DEFAULT UNNAMED EXPORT:
export default connect(mapStateToPropsUdemy)(ExpensesSummaryUdemy);