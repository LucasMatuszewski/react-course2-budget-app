/***********
 * REDUCERS
 */

// Expanses Reducer
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => { //default state is empty array
    switch (action.type) {
        case 'ADD_EXPENSE':
            // state.push(action.expense); // We can't use PUSH = it changes array. Reducer wold not be a PURE Function
            // state.concat(action.expense); // CONCAT() don't change array, it returns new one.
            // BUT WE CAN USE ES6 SPREAD OPERATOR:
            return [ //with spread operator we have a control where to add new item (it could be on beginning)
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
            return state.filter(({ id }) => id != action.id); // destructuring id from expense object
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
                    return {
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

// export default expensesReducer; // we don't have to name this reducer if we export it by default