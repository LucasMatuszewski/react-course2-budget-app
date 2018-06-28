
import React from 'react';
import ReactDOM from 'react-dom';

// REDUX - Provider component (HOC) provides a STORE to other components:
import { Provider } from 'react-redux'; // we don't need to pass a store manually

// Import component with our router <Route />:
import AppRouter from './routes/AppRouter';
// we don't have to import Components used in Router here. We use it inside AppRouter.

// Import REDUX store (Redux Module is imported inside a store, so we don't have to import it here):
import configureStore from './store/configureStore';
// Import other REDUX files:
import getVisibleExpenses from './selectors/expenses'; // for default export
import { addExpense } from './actions/expenses'; // for named exports
// alternative import:
// import * as expenses from './actions/expenses';
// console.log(expenses.addExpense, expenses.removeExpense)
import { setTextFilter } from './actions/filters';

import 'normalize.css/normalize.css'; //RESTART CSS.
// When we import without './' on the path beginning, app looks in node_modules for module

// Import SCSS file to let Webpack CSS-loader to add <styles> tag in html:
import './styles/styles.scss'; // We use './' to import files (without it we import modules)

// Moved from ExpenseForm.js to use it in many components:
import 'react-dates/lib/css/_datepicker.css'; // obligatory CSS for react-dates

// get store (state tree) and save it in value "store" 
const store = configureStore(); // it give us access to Redux methods (dispatch, subscribe, getState)

// SUBSCRIBE HAS TO BE BEFORE ACTIONS
// Subscribe to watch changes on our data Store / State Tree
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(state);
    console.log('visible Expenses:', visibleExpenses); // print in console expenses after filtering.
});

//ACTIONS:
store.dispatch(addExpense({ description: 't-shirt', amount: 1500, note: 'nice', createdAt: 1529432306000 }));
store.dispatch(addExpense({ description: 'coffee', amount: 600, note: 'Starbucks!', createdAt: 1529480105000 }));
store.dispatch(addExpense({ description: 'water', amount: 300, note: 'No from plastic!', createdAt: 1515256105000 }));

store.dispatch(setTextFilter(''));

// <Provider> is a HOC ??? We provide a store to <AppRouter /> component.
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>   
);

// we could also send some data as props to main component, e.g. options:
// ReactDOM.render(<AppRouter />, document.getElementById('app')); // render without Provider
ReactDOM.render(jsx, document.getElementById('app')); // render with Provider
