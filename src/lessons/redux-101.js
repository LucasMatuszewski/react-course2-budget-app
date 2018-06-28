import { createStore } from 'redux';

/*
//createStore is similar to setState:
this.setState((prevState) => {
    return prevState;
})
*/

///////////////
// REDUCER: //
/////////////
const store = createStore((state = { count: 0 }, action) => { // state = { DEFAULT OBJECT }

    //SWITCH (for more complicated if/else)
    switch (action.type) {
    case 'INCREMENT':
        //we checked this condition inside Action Generator so we can delete it here, and use action.incrementBy directly:
        //const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1; // 1 is default
        return {
            count: state.count + action.incrementBy //we don't change a state, we create a new one
        };
    case 'DECREMENT':
        //we checked this condition inside Action Generator so we can delete it here:
        //const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
        return {
            count: state.count - action.decrementBy
            // count: state.count - 1
        };
    case 'RESET':
        return {
            count: 0
        };
    case 'SET':
        return {
            count: action.count
        };
    default:
        return state;
    }

    //IF STATEMENT (for simple if/else)
/*     if (action.type === 'INCREMENT') {
        return {
            count: state.count + 1 //we don't change a state, we create a new one
        };
    } else {
        return state;
    } */
});

// if we save store.subscribe in const unsubscribe, we can use unsubscribe() to stop subscribing.
const unsubscribe = store.subscribe(() => { //subscribe() will do this every single time store changes:
    console.log(store.getState()); // method to get state from a Redux Store
});


//////////////
// ACTIONS //  (convention to use UPPER_CASE for they names)
////////////

// dispatch (in pl = wysyłka) - access action object in a store.
// We can set our own Action Types.
store.dispatch({
    type: 'INCREMENT'
});

store.dispatch({
    type: 'INCREMENT',
    incrementBy: 5 //we can add our own arguments and use it in Switch cases
});

store.dispatch({
    type: 'RESET'
});

store.dispatch({
    type: 'DECREMENT',
    decrementBy: 3
});

unsubscribe(); //we can call this to stop subscribing. Decrement won't be logged (but Store will change)

store.dispatch({
    type: 'DECREMENT'
});

// console.log(store.getState()); //With store.subscribe we don't need second console.log

store.dispatch({
    type: 'SET', 
    count: 101 // for SET, value is obligatory
});

console.log(store.getState());



//////////////////////////////////////////////////////////////////////////
// in place of separate actions defined in store.dispatch we can use:  //
// ACTION GENERATORS - functions that return ACTION OBJECTS           //
///////////////////////////////////////////////////////////////////////

/* const incrementCount = () => {
    return {
        type: 'INCREMENT'
    };
}; */

//SHORTER SYNTAX without return{}:
const incrementCount = (payload = {}) => ({ //payload is argument from store.dispatch. ={default}
    type: 'INCREMENT',
    incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
});

// we can call this object instead of manually generating store.dispatch({type: '...'}) every time.
// it's usable, because errors in names of Actions don't throw errors in store.dispatch = hard to debug.
// but in Action Generator they throw errors. We have also autocompletion of functions names.

// unsubscribe(); // unfortunately we can't use it subscribe again :(

// we use Action Generator function as a argument of store.dispatch to use this action:
store.dispatch(incrementCount());
store.dispatch(incrementCount({ incrementBy: 15 })); //We can add attributes too
console.log(store.getState());


//DESTRUCTURING of Object in Function argument, example:

// ADD arrow Function:
const add = (data) => {
    return data.a + data.b;
};
console.log(add({ a: 1, b: 12 }));

// destructuring object from add argument:
const add2 = ({a, b}, c) => {
    return a + b;
};
console.log(add2({a:1, b:12}, 100));



// ACTION GENERATOR WITH DESTRUCTURING OBJECT FROM FUNCTION ARGUMENT:
const decrementCount = ({ decrementBy = 1} = {} ) => ({ //we destruct decrementBy from store.dispatch
    type: 'DECREMENT',
    // decrementBy: typeof decrementBy === 'number' ? decrementBy : 1 // We used decrementBy = 1 (default) as a function argument while destructuring. So we don't need it again.
    // decrementBy: decrementBy //we can use decrementBy instead of payload.decrementBy
    decrementBy // we can use even more simple version if names are the same
});

store.dispatch(decrementCount({ decrementBy: 15 })); // argument of decrementCount function is an object, so we can destructure it!
store.dispatch(decrementCount({ })); // decrement by default value = 1
console.log(store.getState());



const resetCount = () => ({
    type: 'RESET'
});

store.dispatch(resetCount());
console.log(store.getState());



const setCount = ({count = 101} = {}) => ({ // set count with default value
//const setCount = ({ count } = {}) => ({ // set count without default value
    type: 'SET',
    count
});

store.dispatch(setCount()); // set to default (but we can use no default value)
console.log(store.getState());

store.dispatch(setCount({ count: 2018 })); // set count to 2018
console.log(store.getState());