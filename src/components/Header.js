import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

const Header = () => (
    <div>
        <h1>Expenses App</h1>
        {/*
        NavLink is for navigation menu ( adds classes/style to active links). Normal link is <Link>
        For main page "/" use exact like in <Route /> - other way it will match all sites
        You could use ActiveClassName or activeStyle to style inline (syntax for CSS is camelCase like for HTML tags in JSX)
        We can use also other HTML props like title="" or id="", className=""
        */}
        <NavLink to="/" exact activeClassName="is-active" activeStyle={{ fontWeight: 'bold', color: 'red' }} title="test">Dashboard</NavLink> | <NavLink to="/create" activeClassName="is-active" activeStyle={{ fontWeight: 'bold', color: 'red' }} title="test">Add Expense</NavLink>
        | <NavLink to="/help" activeClassName="is-active" activeStyle={{ fontWeight: 'bold', color: 'red' }} title="test">Help</NavLink><br /> {/* like in XHTML/XML we have to end tags with "/" */}
        <hr />
    </div>
);

export default Header;