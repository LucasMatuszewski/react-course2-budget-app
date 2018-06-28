import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const demoState = {
    expenses: [{ // array, because we will make many expense objects, with the same attributes
        id: 'pdasdasdofj',
        description: 'January Rent',
        note: 'Last time I pay',
        amount: 54500, //in cents = 545,00 USD
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};


/***********
 * ACTIONS (action generators - functions to generate an Action)
 */ 

// ADD_EXPENSE
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(), // we use uuid - NPM library to generate RFC4122 UUIDs (we have to install and import it)
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
// const removeExpense = (id) => ({ // return object: {id: "UUID"}
const removeExpense = ( {id} = {}) => ({ // return only UUID
    type: 'REMOVE_EXPENSE',
    id
    // expense: { id } // we don't need "expense: { }" here. We only want to pass id to delete it
});

// EDIT_EXPENSE
const editExpanse = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate
});

/***********
 * REDUCERS
 */

// Expanses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => { //default state is empty array
    switch (action.type) {
        case 'ADD_EXPENSE':
        // state.push(action.expense); // We can't use PUSH = it changes array. Reducer wold not be a PURE Function
        // state.concat(action.expense); // CONCAT() don't change array, it returns new one.
        // BUT WE CAN USE ES6 SPREAD OPERATOR:
            return [ //with spread operator we have a controlle where to add new item
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            // console.log(action.id);
            // console.log(state);
            // function removeId(expense) {
            //     console.log(expense.id);
            //     return expense.id != action.id
            // }
            // return state.filter((expense) => expense.id != action.id );
            return state.filter(({id}) => id != action.id ); // destructuring id from expense object
            // filter doesn't change array, returns new one
        case 'EDIT_EXPENSE':
            /* //my idea to do it. Works, but .map() is better :)
            console.log('state:', state.filter(({ id }) => id == action.id)[0]);
            return {
                ...state.filter(({id}) => id == action.id )[0],
                amount: action.updates
            }; */
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return{
                        ...expense, //spread previous values
                        ...action.updates //spread with new values, to edit / overwrite old values
                    }
                } else {
                    return expense;
                }
            });
        // INSTRUCTOR DIDN'T WANT US TO ADD THIS IN EXPENSES REDUCER... ONLY TO FILTERS REDUCER
        /* case 'SET_TEXT_FILTER':
            return state.filter(({ id, description, note, amount }) => {
                return id == action.text || description == action.text || note == action.text || amount == action.text;
                // return description == action.text;
            }); */
        default:
            return state;
    }
};

// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date', //date or amount
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
};


/******
 * SELECTOR:
 * GET FILTERED EXPENSES & Sort them
 */
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof startDate !== 'number' || expense.createdAt <= endDate;
        // const textMatch = typeof text !== 'string' || expense.description.toLowerCase().indexOf(text.toLowerCase()) !== -1 || expense.note.toLowerCase().indexOf(text.toLowerCase()) !== -1;
        //in ES7 / ES2016 we have .includes(), new method better from .indexOf() in many cases:
        const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase()) || expense.note.toLowerCase().includes(text.toLowerCase());
        // .includes() search also for NaN and undefined (indexOf don't)

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

// TIMESTAMPS (in milliseconds, 1s = 1000 ms )
// start 0 = 01.01.1970 (unix epoch)
// 1000 = 1000 milliseconds = 1s after 01.01.1970
// -60000 = 60s = 1min before 01.01.1970

/***********
 * Store creation - we register reducers in our Store / State Tree
 */

// for one reducer:
// const store = createStore(expensesReducer);

// for many reducers combined:
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

// Subscribe to watch changes on our data Store / State Tree
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(store.getState());
    console.log('visible Expenses:', visibleExpenses); // print in console expenses after filtering.
});


// USE AN ACTION to add new expense.
// We can save this action objects in variables to use data from it (id) to change items
const expenseOne = store.dispatch(addExpense({ description: 'rent', amount: 100, createdAt: 1000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'coffee', amount: 350, createdAt: -1000 }));

store.dispatch(removeExpense({ id: expenseOne.expense.id }));



/****
 * ES6 SPREAD OPERATOR FOR OBJECTS
 */

let user = {
    name: 'Jan',
    age: 24
};

user = {
    ...user,
    location: 'US', // we can add new properties
    age: 25 // we can overwrite previous values of properties (it have to after "...user" to overwrite)
};

const users = [ // we can add spread object to array (no "spreaded", valid: "object is spread")
    {...user},
    {
        name: 'Hania',
        age: 5
    }
];

console.log(users);


// Action with spread operator for object, to overwrite value of amount:
// my idea to do it (second argument is only a new value, but how to edit more values???):
// store.dispatch(editExpanse(expenseTwo.expense.id, 500 )); // action sends ID and value to edit
store.dispatch(editExpanse(expenseTwo.expense.id, { amount: 500 } ));
// we can edit many values in the same way:
store.dispatch(editExpanse(expenseTwo.expense.id, { amount: 550, note: 'test' } ));


// Add new expenses:
store.dispatch(addExpense({ description: 'rent', amount: 15000, note: 'last for this location', createdAt: 1000 }));
store.dispatch(addExpense({ description: 't-shirt', amount: 1500, note: 'nice', createdAt: -1000 }));
store.dispatch(addExpense({ description: 'coffee', amount: 600, note: 'Starbucks!', createdAt: 1000 }));

// Filter Actions:

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter('star'));
//my version search in many fields (desc, note, amount, id) of expenses, and add text to filters.
// but... instructor didn't want use to filter expenses, just to add text to filters...
// so I shouldn't add anything to expensesReducer, only to filterReducer


store.dispatch(sortByAmount()); //don't need any value. default value will be "amount"
// store.dispatch(sortByDate()); //don't need any value. default value will be "date"

/* store.dispatch(setStartDate(125)); // we will use Time Stamp in real app
store.dispatch(setStartDate()); // default = undefined
store.dispatch(setEndDate(1250));
store.dispatch(setStartDate(125)); */