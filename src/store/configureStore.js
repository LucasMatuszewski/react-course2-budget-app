import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

/***********
 * Store creation - we register reducers in our Store / State Tree
 */


// we have to move "const store = createStore()" to an arrow function and export this new function.
// We can't invoke variables, so it have to be closed inside a function.
// (to fire this function somewhere else, when we want to set a store)
export default () => {
    // for one reducer:
    // const store = createStore(expensesReducer);

    // for many reducers combined:
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};