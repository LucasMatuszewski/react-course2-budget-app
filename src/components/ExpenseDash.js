import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';

const ExpenseDash = () => (
    <div>
        <h2>Expenses Dashboard</h2>

        <ExpensesSummary />
        <ExpenseListFilters />
        <ExpenseList /> {/* We don't need to pass any data/props here. connect() will pass them directly from a store / state tree */}
        <br />
        <hr />
        <a href="/help">Server Side Rendering HTML Link</a><br />
        (html "a" tag will reload a browser, we can use it to link to external page)
    </div>
);

export default ExpenseDash;