import React from 'react';
// Import React Router for Browsers (not for Native Apps)
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import ExpenseDash from "../components/ExpenseDash";
import AddExpense from '../components/AddExpense';
import EditExpense from '../components/EditExpense';
import HelpPage from '../components/HelpPage';

import Header from '../components/Header';
import NotFound from '../components/NotFound';

// Stateless Arrow Component with our Routes to export:
const AppRouter = () => (
    <BrowserRouter>
        <div> {/* Container tag is needed if we have more then one direct-child component */}
            <Header /> {/* Before <Switch> - it will be always rendered */}
            <Switch> {/* When we use a Switch, Router will stop when it found first match. Without it Router will check all Routes */}
                <Route path="/" component={ExpenseDash} exact={true} /> {/* Main page, without "exact" it will match all URLs by "/" */}
                <Route path="/create" component={AddExpense} /> {/* ITS not RESTfull route !!! */}
                <Route path="/edit/:id" component={EditExpense} />
                <Route path="/help" component={HelpPage} />
                {/* MatchAll / 404 route have to be ON THE END */}
                {/* <Route path="*" component={NotFound} exact={true} /> */} {/* Match all pages, but its not a solution */}
                <Route component={NotFound} /> {/* Component without path will match all unspecified routes, like patch="*" */}
                {/*
                If we hit http://localhost:8080/create it won't work by default,
                because browser will try tu use Server Side Routing, Not Client Side Routing.
                We have to tell Server to serve index.html on all routes/URLs user try to hit:
                1. On production we will use Express Route * for this
                2. On development we will configure webpack.config.js in devServer: { historyApiFallback: true }

                By default on /create we will see both "/" and "/create" because Router match on "/".
                The same result for: http://localhost:8080/create/jhjkhkj (both routes matched)
                But not for: http://localhost:8080/createjhjkhkj (only "/" matched)
                WE HAVE to use EXACT prop = true (false is default)
                */}
            </Switch>
        </div>
    </BrowserRouter> 
);

export default AppRouter;
