import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
//import moment from 'moment'; // http://momentjs.com/ (great library to work with time)
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates'; // AIRbnb date picker: http://airbnb.io/react-dates
import 'react-dates/lib/css/_datepicker.css';


// CONTROLLED INPUT:
export class ExpenseListFilters extends React.Component {
    /* // MY VERSION:
    constructor(props) {
        super(props);
        this.state = {
            text: props.filters.text,
            sortBy: props.filters.sortBy,
            startDate: props.filters.startDate,
            endDate: props.filters.endDate,
            dispatch: props.dispatch,
            focusedInput: null
        };
    } */
    // UDEMY VERSION: (only focuse is in component local state - rest is only in REDUX state tree)
    state = {
        calendarFocused: null
    };
    onTextChange = (e) => {
        /* //MY VERSION:
        e.persist();
        this.setState(() => ({ text: e.target.value }));
        this.state.dispatch(setTextFilter(e.target.value)); */
        //UDEMY VERSION:
        this.props.setTextFilter(e.target.value);
        // console.log(e.target.value);
    }
    onSortChange = (e) => {
        /* //MY VERSION:
        e.persist();
        this.setState(() => ({ sortBy: e.target.value }));
        this.state.dispatch(e.target.value === 'amount' ? sortByAmount() : sortByDate() );  */ 
        // UDEMY VERSION:
        e.target.value === 'amount' ? this.props.sortByAmount() : this.props.sortByDate();
    }
    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    };
    render() {
        return (
            <div>
                <input type="text" value={this.props.filters.text} onChange={this.onTextChange} />
                <select name="" id="" value={this.props.filters.sortBy} onChange={this.onSortChange} >
                    {/* //ON UDEMY TRAINER USED this syntax:
                    <select 
                        value={props.filters.sortBy}
                        onChange={(e) => {
                            if (e.target.value === "date") {
                                props.dispatch(sortByDate());
                            } else if (e.target.value === "amount") {
                                props.dispatch(sortByAmount());
                            }
                        }}
                    >
                    */}
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
                    startDateId='startDateID' // PropTypes.string.isRequired,
                    endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
                    endDateId='endDateID' // PropTypes.string.isRequired,
                    onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
                    focusedInput={this.state.calendarFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
                    numberOfMonths={1} // set 1 calendar view (by default: 2)
                    isOutsideRange={() => false} // set ability to select past dates (by default only future dates)
                    showClearDates={true} // shows "X" button to clear dates
                />
            </div>
        );
    }
}

/* const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
}; */
//SHORTER VERSION:
const mapStateToProps = (state) => ({
    filters: state.filters
});

//Shorter version without return()
const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (textValue) => dispatch(setTextFilter(textValue)),
    sortByAmount: () => dispatch(sortByAmount()),
    sortByDate: () => dispatch(sortByDate()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
// IF WE DON'T NEED ENYTHING FROM A STATE, BUT WANT OLY DISPATCH SOMETHING WE CAN USE:
// export default connect()(ExpenseListFilters);