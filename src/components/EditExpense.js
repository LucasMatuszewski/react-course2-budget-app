// NEW VERSION WITH STATEFULL CLASS COMPONENT, mapDispatchToProps and named exporting to JEST test
// REFACTOR MADE THE SAME WAY LIKE FOR AddExpense.js Component.
// OLD VERSION WITH MORE COMMENTS INSIDE: EditExpense-OLD-STATELESS.js

import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';
// import { removeExpense } from '../actions/expenses'; // we can import two in one line



export class EditExpense extends React.Component {
    onSubmit = (expense) => {
        // this.props.editExpense(expense); // MY VERSION (works fine...)
        this.props.editExpense(this.props.expense.id, expense); // UDEMY VERSION
        this.props.history.push('/');
    }
    onRemove = () => {
        // this.props.removeExpense(); // MY VERSION (works fine...)
        this.props.removeExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    }
    render() {
        return(
            <div>
                <h1>Edit Expense: {this.props.expense.description}</h1>
                <p>You are editing expense id: {this.props.expense.id}</p>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={ this.onSubmit }
                />
                <button onClick={ this.onRemove }>
                    Remove
                </button>
            </div>
        );
    }
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
/* 
// MY VERSION (worked fine, but why???)
const mapDispatchToProps = (dispatch) => ({
    editExpense: (expense) => dispatch(editExpense(props.expense.id, expense)),
    removeExpense: () => dispatch(removeExpense({id: props.expense.id}))
}); // NOW WE CAN USE: props.onSubmit(expense) and TEST it with JEST SPY.
*/

//UDEMY VERSION:
const mapDispatchToProps = (dispatch, props) => ({
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    removeExpense: (data) => dispatch(removeExpense(data))
}); // NOW WE CAN USE: props.onSubmit(expense) and TEST it with JEST SPY.


export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);