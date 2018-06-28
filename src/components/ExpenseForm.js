import React from 'react';
import moment from 'moment'; // http://momentjs.com/ (great library to work with time)
import 'react-dates/initialize'; // As of v13.0.0 this project relies on react-with-styles
import { SingleDatePicker } from 'react-dates'; // AIRbnb date picker: http://airbnb.io/react-dates

// It's better to move _datepicker.css to app.js because we will use it in many components:
// import 'react-dates/lib/css/_datepicker.css'; //obligatory CSS for react-dates

/* 
/////////////////////////////
// JS DATE() vs MOMENT(): //
///////////////////////////
const date = new Date(); //now date: Sun Jun 24 2018 16:46:52 GMT+0200 (Central Europe Daylight Time)
// API of Date() is horrible, thats why we use Moment.js (much better, it's a standard now)
console.log('Date():', date);

const now = moment(); // we have to use it only once.
console.log('moment():', now); // returns object with all moment data and methods
console.log('moment().format():', now.format()); // returns a string with default format: 2018-06-24T16:50:46+02:00
// how to format a date: http://momentjs.com/docs/#/displaying/
console.log(now.format('MMM Do, YYYY')); // US format: Jun 24th, 2018
console.log(now.format('DD-MM-YYYY')); // 24-06-2018
// You can use "-,: " how you prefer.

// TO SET LOCAL SETTINGS OF TIME (GLOBALLY FOR a Component)
//moment.locale('pl'); // IT RETURNS TypeError on JEST test: moment.locale is not a function...
*/


// We use Class StateFull Component because we want to track inner state for data changes inside this form.
// With local state we can validate and keep data in local component state etc.
// We will change Redux Store only on Button submit
export default class ExpenseForm extends React.Component {
    /* // MY VERSION (worked OK without constructor super(props) - but how???)
    state = {
        description: this.props.expense ? this.props.expense.description : '', // only description is obligatory
        note: this.props.expense ? this.props.expense.note : '',
        amount: this.props.expense ? this.props.expense.amount : '',
        createdAt: this.props.expense ? moment(this.props.expense.createdAt) : moment(), //default: NOW (object from moment.js)
        calendarFocused: false,
        error: undefined
    }; */
    // UDEMY VERSION:
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '', // only description is obligatory
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(), //default: NOW (object from moment.js)
            // moment(MILLISECONDS) = object with calculated date
            calendarFocused: false,
            error: undefined
        };
    }
    onDescriptionChange = (e) => {
        const description = e.target.value; 
        this.setState(() => ({ description }))
    };
/*  THIS VERSION DIDN'T WORK ON JEST TEST WITH ENZYME:   
    onNoteChange = (e) => {
        // 2nd Way to do this (opposite to description):
        // const note = e.target.value; // We can't use it inside call back function for setState, unless we persist it
        e.persist(); // JEST TEST TYPE ERROR: IS NOT A FUNCTION
        this.setState(() => ({ note: e.target.value }));
    }; */
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        // JS FORM VALIDATION (can be double in HTML5 and in JS):
        // if (amount.match(/^\d*(\.\d{0,2})?$/)) { //test for match  with RegEx = Regular Expression.
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) { //empty amount or amount matching RegEx = Regular Expression.
            // always put RegEx inside /.../
            // ^ = beginning of expression, force to start with (in this case) \d = digit
            // \d = digits only (but only one)
            // * = many (0 to infinity), \d* = many digits (but 0 too)
            // {1,} = 1 to infinity \d{1,} = minimum 1 number
            // ()? = optional part of expression
            // \. = allow one dot "." (\.* = many dots)
            // {0,2} = limit from 0 (min) to 2 (max) characters of what is in front of it, \d{0,2} = 0-2 digits, 
            // $ = end of expression
            // Great generator, tester and Library of RegEx: https://regex101.com/
            this.setState(() => ({ amount }));
        } else {
            this.setState(() => ({ error: 'Amount should be in price format: 100.00 or 100' }));
        }
    };
    onAmountChangeX = (e) => {
        const amount = e.target.value;
        this.setState(() => ({ amount }));
    };
    onDateChange = (createdAt) => {
        createdAt && this.setState(() => ({ createdAt })); // createdAt && = prevent from deleting Date
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmit = (e) => {
        e.preventDefault(); // will stop browser refreshing webpage on submit
        if (!this.state.description || !this.state.amount) {
            // set Error state: Please provide description and amount
            this.setState(() => ({ error: 'Please provide description and amount' }));
        } else {
            //Clear the error
            this.setState(() => ({ error: undefined }));
            // To make ExpenseForm reusable (for Add and Edit) we have to use props with function to add/edit
            // use function from parent container (props) to edit (send data to parent container)
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) *100, // parse string to a float decimals and convert from dollars to cents (* 100)
                createdAt: this.state.createdAt.valueOf(), // takes Unix Timestamp im milliseconds from moment() object
                note: this.state.note
            });
            console.log('Submited');
        }
    };
    render() {
        //console.log('PROPS from ExpenseForm.js:', this.props);
        return (
            <div>
                {/* ERROR */}
                {this.state.error && (<p>{this.state.error}</p>)}
                <form onSubmit={this.onSubmit} action="">
                    <input
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    {/* Validation in HTML 5: */}
                    <input
                        type="number"
                        placeholder="Amount (HTML5 + JS Validation)"
                        min="0"
                        step=".01"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    {/* JS Validation ONLY */}
                    <input
                        type="text"
                        placeholder="Amount (JS validation ONLY)"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    {/* https://github.com/airbnb/react-dates#singledatepicker */}
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        id="DatePicker"
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    /> {/* first 5 settings of SingleDatePicker are obligatory
                    isOutsideRange gives us many advanced settings.
                    Simple function returning false let us choose past dates (by default only future */}
                    <textarea
                        name=""
                        id=""
                        cols="20"
                        rows="3"
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    ></textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        );
    }
}