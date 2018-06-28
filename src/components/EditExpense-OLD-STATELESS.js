// OLD VERSION WITH STATELESS FUNCTION COMPONENT, without mapDispatchToProps, and named exporting to JEST test
// REFACTOR MADE THE SAME WAY LIKE FOR AddExpense.js Component.

import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';
// import { removeExpense } from '../actions/expenses'; // we can import two in one line

// We have access to Props from <Route /> in AppRouter.js (like with normal React Component)

/* 
// We can use this short version, if we don't use any JS in Component (only wants to render JSX)
const EditExpense = (props) => (
    <div>
        Edit Expense
    </div>
); 

// If we want to use some JS, we have to use normal version with return(): */
const EditExpense = (props) => {
    /* // MY VERSION - filter() returns Array after filter. find() returns first ELEMENT that match!
    // https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/find
    // https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/filter
    const expense = props.expenses.filter(({ id }) => id == props.match.params.id)[0];
    console.log('PROPS:', props);
    console.log('Expense:', expense); */

    //console.log('PROPS from EditExpense.js:', props);
    return(
        <div>
            <h1>Edit Expense: {props.expense.description}</h1>
            <p>You are editing expense id: {props.expense.id}</p>
            <ExpenseForm
                expense={props.expense}
                onSubmit={ (expense) => {
                    {/* MY VERSION:
                    // props.dispatch(editExpense(props.match.params.id, expense)); */}
                    props.dispatch(editExpense(props.expense.id, expense));
                    props.history.push('/');
                }}
            />
            {/* REFACTOR: moved "remove" button from ExpenseListItem.js */}
            <button onClick={() => {
                props.dispatch(removeExpense({id: props.expense.id})); {/* ES6 Object definition shorthand for "id: id" */}
                props.history.push('/');
            }}>
                Remove
            </button>
        </div>
    );
};
/* 
In props we have access to info from React-Router:
* Browser History of URLs (with goBack, goForward), 
* Current location, with pathname
    * Search value (if we use ?query=xxx&sort=xxx in URL or ?anything=xxx)
    * Hash value from URL (if we use edukey.us#header)
* Path : URL Match - isExact: true/false
*/

// const mapStateToProps = (state) => { // MY VERSION
const mapStateToProps = (state, props) => { // UDEMY VERSION
    return {
        // expenses: state.expenses // MY VERSION
        /* expense: state.expenses.find((expense) => { // UDEMY VERSION. I used Filter inside this component
            return expense.id === props.match.params.id;
        }) */
        expense: state.expenses.find((expense) => expense.id === props.match.params.id) //SHORTER VERSION from UDEMY
    };
};

export default connect(mapStateToProps)(EditExpense);