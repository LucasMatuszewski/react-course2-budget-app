import React from 'react';
import { Link } from 'react-router-dom';
/* // REFACTOR: move "remove" button to EditExpense.js (connect & removeEx no more needed here)
import { connect } from 'react-redux';
import { removeExpense } from '../actions/expenses'; */

/* // MY VERSION:
export default (expense) => (
    <li>
        {expense.description}
        , {(expense.amount / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})} 
        , added: {(new Date(expense.createdAt)).toLocaleDateString()}<br />
        note: {expense.note}
    </li>
); */

// UDEMY VERSION:
const ExpenseListItem = ({ id, description, amount, createdAt, note}) => (
/* const ExpenseListItem = (props) => ( */
    <div>
        {/* <Link to={'/edit/' + id } title="Edit this expense"> */} {/* MY VERSION */}
        <Link to={`/edit/${id}`} title="Edit this expense">
            <h3>{description}</h3>
        </Link>
        <p>
            {(amount / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}
            , {(new Date(createdAt)).toLocaleDateString()}<br />
            note: {note}
        </p>

        {/* REFACTOR: move "remove" button to EditExpense.js */}
        {/* <button onClick={() => { */}
            {/* console.log(props.id); */}
            {/* dispatch(removeExpense({id: id})); */}
            {/* dispatch(removeExpense({ id })); */} {/* ES6 Object definition shorthand for "id: id" */}
        {/* }} >Remove</button> */}
        {/* <button
            onClick={() => {

            }}
        >Edit</button> */}

    </div>
);


// export default connect()(ExpenseListItem);
// Refactor: move "remove" button to EditExpense.js (connect no more needed here)
export default ExpenseListItem;

// https://stackoverflow.com/questions/12196689/how-to-convert-milliseconds-to-a-date-string
// .toDateString()
// .toLocaleDateString()
// https://javascript.info/date

// https://stackoverflow.com/questions/32768494/convert-a-whole-number-amount-of-cents-to-a-readable-dollar-amount-in-javascript/32768579
// .toLocaleString("en-US", {style:"currency", currency:"USD"})

// .map() vs .forEach():
// https://codeburst.io/javascript-map-vs-foreach-f38111822c0f