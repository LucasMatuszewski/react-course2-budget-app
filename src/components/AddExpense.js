import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

// 1. THIS STATELESS COMPONENT HAVE INLINE FUNCTIONS. TO AVOID IT WE WILL REFACTOR IT TO CLASS COMPONENT:
// const AddExpense = (props) => (
//     <div>
//         <h1>Add Expense</h1>
//         <ExpenseForm
//             onSubmit={(expense) => {
//                 {/* Dispatch(imported action) can't be used by JEST TEST: */}
//                 {/* props.dispatch(addExpense(expense)); */}
//                 {/* WE HAVE TO MAP DISPATCH TO PROPS, and use here mapped function: */}
//                 props.onSubmit(expense);
//                 props.history.push('/'); // redirect to main page (dashboard) using browser history
//                 {/* console.log(expense); */}
//             }}
//         />
//     </div>
// );

// 2. TO AVOID INLINE FUNCTIONS WE REFACTORED STATELESS FUNCTION COMPONENT TO THIS:
export class AddExpense extends React.Component { // named export of unconnected component for JEST TESTS
    onSubmit = (expense) => {
        this.props.addExpense(expense); // action generator
        this.props.history.push('/'); // redirect to main page (dashboard) using browser history
    }
    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
};

// Normal Component without Redux gets props only from parent Component and send props to children.
// With mapStateToProps we can connect current state of a component to Redux Store
// With mapDispatchToProps we can connect dispatching ACTIONS to Redux Store ???
// Now, our component dispatch actions and use state only by Redux Store.
// It gives us separation of concerns: Components are only to Display. Fetching data / actions are for Redux.
// We should also split components to:
// * Container (fetch data from Redux Store and send it to Presentational Child Component)
// * Presentational (display data from Container Parent Component)
// https://redux.js.org/basics/usage-with-react#presentational-and-container-components


// We don't need mapStateToProps here - we don't take data from props (e.g. existing expense)

// BUT for Jest Test we need mapDispatchToProps because we want to test:
// props.dispatch(addExpense(expense));
// But Jest don't have access to dispatch. With mapping, we can use props.onSubmit(expense) in Component.
// So lets map dispatch to our props:
/* const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (expense) => dispatch(addExpense(expense))
    }; // NOW WE CAN USE: props.onSubmit(expense);
}; */

//SHORTER VERSION:
const mapDispatchToProps = (dispatch) => ({
    addExpense: (expense) => dispatch(addExpense(expense))
}); // NOW WE CAN USE: props.onSubmit(expense) and TEST it with JEST SPY.

// MORE ABOUT CONNECT AND MAPPING:
// https://github.com/reduxjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
// https://stackoverflow.com/questions/39419237/what-is-mapdispatchtoprops

export default connect(undefined, mapDispatchToProps)(AddExpense);
// export default connect(STATE = UNDEFINED, DISPATCH)(COMPONENT TO CONNECT WITH REDUX STORE);