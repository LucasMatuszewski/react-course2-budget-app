# React-Router

## Server-side vs Client-side routing

**Server-side routing** is more traditional approach (routes on the server, e.g. in PHP or Node.js with Express).
Client (browser) request a page by HTTP -> Server -> Render server HTML to a browser
It take time to send request and response by HTTP. There are delays.

**Client-side routing** - JS on client side decide what to show (Angular, React etc.)
First time we request a page it go from a server like in server-side approach.
But next requests are served by a client side JS routing, without sending HTTP request, with minimal delays.
HTML 5 history API available by browsers. This allows us to watch URL changes and render components (sometimes all pages) on client side.
Components simulate a page-change, but it is a **Single Page Application (SPA)** with only one html file send by a server to serve React.


## React & SEO - SPA, MPA, SSR
Single / Multi Page Applications --> Server Side Rendering

React + Create-React-App + React-router + React-Helmet + React Snapshot + Styled-Components:
**Very fast** way to set up an Almost **Static Stack** :)
https://medium.com/superhighfives/an-almost-static-stack-6df0a2791319

SSR with React-Router and React-Helmet + CSS Modules
https://blog.digitalkwarts.com/server-side-rendering-with-reactjs-react-router-v4-react-helmet-and-css-modules/

**Basics of SPA + SEO:**
ReactDOMServer.renderToString(), and then ReactDOM.hydrate() on the client
https://builtvisible.com/javascript-framework-seo/

**React, Netflix, SEO & Speed:**
https://news.ycombinator.com/item?id=15567657


## New Budget application
1. Clone indecision app folder to not do everything again (lost of time).
2. Many things will stay (index.html and app.js with some changes, node_modules, webpack.config.js, package.json with small changes, babelrc, folder structure)
3. Delete all components and styles, but live a folders, styles.scss, _base.scss and _settings.scss
We have ready to re-use boilerplate of React App :)


## Install React-router
1. In a console:
> yarn add react-router-dom
"-dom" is a version for Web Applications
"-native" is a version for Native Mobile Applications
We can also install "react-router" which include both dom and web packages

2. in app.js add import { BrowserRouter, Route } from 'react-router-dom';
 * BrowserRouter - create a router
 * Route - to create every page
Starting Guide: https://reacttraining.com/react-router/web/guides/philosophy


## How to use React-Router:

3. in app.js configure:
const routes = {
    <BrowserRouter>
        <div> || <Switch>
            <Route path="/" component={ComponentName} exact={true} />
            <Route ... />
        </div>
    </BrowserRouter>
}

4. Use it in: ReactDOM.render(routes, ...);

5. Route for 404 Error:
<Route component={NotFound} /> // it will match all URL (so it have to be the last route)

6. To make Router to match only first route, we have to use <Switch> component

7. When we hit URL directly in browser, server will reload and we get Server Side Rendered page.
(the same when we use normal <a href="/some-page></a> )
To have Client Side Rendered page, we have to use <Link> component from react-router

8. We can use NavLink to track which link is active (for styling in navigation menu)

9. It's better to keep routes in separate file: src/routes/AppRouter.js and to export/import it as a Component to main app.js file

10. Components has access to Props from <Route /> - by default react-router send us many information:
    * Browser History of URLs (with goBack, goForward), 
    * Current location, with pathname
        * Search value (if we use ?query=xxx&sort=xxx in URL or ?anything=xxx)
        * Hash value from URL (if we use edukey.us#header)
    * Path : URL Match - isExact: true/false
    Example in EditExpanse.js

11. We can take values from user-friendly URL, e.g.: edukey.us/training/120, trainingId=120
    Syntax for dynamic match in <Route patch="/edit/:id" /> (like in .htaccess) 
    We have access to "id" in props > match > params > id: "value"
    Only components from <Route /> have access to props from react-router



# REDUX - State Container (redux store), manage a state of your data
https://redux.js.org/introduction

Redux track changing data, like Component State did, but in more complex way (for more advanced apps with many data states).
(React-router manage only routes with props, but not states)

It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. Provides live code editing combined with a time traveling debugger. Can be used with React or other view libraries. Is tiny (2kB).

Normal State() is only inside Component, we can pass some data to connected Components by props (but only to child = one direction) and use some methods functions from parent component. It's impossible to send data to unconnected Components, like different views in React-Router.
It's hard to re-use components in many places - all time we have to manually send props.

Redux keep states of data and pass it to many Components, even unconnected. It don't need any props. They interact with **Global State Container** - we can take data in any place of our application. Components are reusable in many places.

We can reed data from **Redux Store**, and change a data in a store. Every Component can do it in different way.

> Is it Observer Pattern ??? Rather not...
Redux is a library to manage shared state between components and to coordinate state mutations.


## Redux Installation:
1. in console: Yarn add redux

2. on playground/lessons - change in webpack.config.js a Entry point to test file - to make Webpack compile app from different tes-file: lessons/redux-101.js

3. in main app.js add: import { createStore } from 'redux';

4. To create our first Store use method createState():
> const store = createStore((state = { count: 0 }) => {
>     return state;
> });
// = { count:0 } <-- our default state object

5. To get data from store use method:
> store.getState()


## Actions - change data store:
Action is an plain JS object that gets sent to the store to change something in a State Tree:

{ type: 'INCREMENT', count: 1 }
{ type: 'DECREMENT', count: 1}
{ type: 'RESET' }

We use store.dispatch({ type: 'TYPE' }); to use action object (send it to a reducer function).


## REDUCER
Action objects are send to REDUCER Function, to change a State Tree.
We use "Switch Case 'TYPE':" inside createStore to set Action definitions (REDUCER).
Reducer decide what to do basing on Action and Previous State Tree. Return New State Tree.


## Store.subscribe(() => { ... });
function to watch changes inside a store and do something on this changes (e.g. show new state)

to **unsubscribe** we use the same method.
We can set it as a const:
> const unsubscribe = store.subscribe(() => { ... });
...
and then use it:
> unsubscribe();


## Pass additional own values in ACTIONS:
> store.dispatch({
>    type: 'DECREMENT', 
>    decrementBy: 3 //own value
> });


## Action Generators - function that returns ACTION OBJECT
We can define all Action Generators in one place in our App:
> const incrementCount = () => ({ type: 'INCREMENT' });

To use this generator we just call it inside our app, where we need it:
> store.dispatch(incrementCount());


# REDUX 3 PRINCIPLES:
https://egghead.io/courses/getting-started-with-redux (tutorial from creator of Redux)
https://redux.js.org/introduction/three-principles

## 1. Single source of true: immutable State Tree
Every state of data in your whole application is stored in a single object tree within a single **STORE**. We call it State Tree.

## 2. State Tree is READ ONLY
You can't modify a State Tree directly. If you want to change a state, you need to use ACTION.
ACTION is an JS object, describing what happened, what is changing in our app. Minimum representation of the change of data.

### Pure and Impure functions
**Pure** - are independent and predictable. Return value depending only on a data from a function arguments. Don't have any observable side effects, like data base calls. Just calculate some data. Don't change outer values/items - instead return new values/items (e.g. new array).

**Impure** - change or use some outside data, may call a database or network. May have side effects, may operate a DOM, may override values passed to them.
> let a = 10;
> const add = (b) => a + b;
Only "b" is an input (attribute) of above function, but it use also "a" (global variable).
So it is impure.


## 3. REDUCERS - pure functions to describe a state mutations
All Redux Apps have to implement the Reducer (or many reducers), a function that calculates the next state tree, based on the previous state tree and the action being dispatched.
Action + Previous State Tree => REDUCER => New State Tree.
Reducer is a Pure Function, because it produce output depending only on input (previous state and action), dont change anything outside funcion scope.



### combineReducers - use many reducers
In more complex apps with many states its better to use many smaller reducers combined together.
One big reducer would be hard to read and use.

We use it in file lessons/redux-expensify.js


### ES6 Spread Operator in Reducers

#### Spread Operator for Arrays:
> const names = ['Adam', 'Ewa', 'Beata'];
> names.push('Jan'); //will change a names array
> names.concat('Jan); // will NOT change a names array (returns new array)

Spread Operator - ...arrayName - alternative to concat()
Examples:

1. returns new array with names from "names" array, and Jan added on the end:
> [...names, 'Jan']

2. returns new array with Hania on beginning, Jan on the end, and names in the middle:
> ['Hania', ...names, 'Jan'] 

#### Spread Operator for Objects:
Babel can't compile it by default, we need to install a plugin:
> yarn add -D babel-plugin-transform-object-rest-spread
> npm i -D babel-plugin-transform-object-rest-spread
and add this plugin to ".babelrc" file:
> "plugins": [ "transform-class-properties", "transform-object-rest-spread" ]

We use spread operator the same way for objects like for arrays:
> const user = {
>    name: 'Jan',
>    age: 24
> };
>
> console.log({
>    ...user,
>    location: US, // We can add and overwrite values to spread object
>    age: 25
> });


#### Sorting array of objects
arr.sort() - sorts array of strings (alphabetically) 
arr.sort(compareFunction) - sorts array of objects, compareFunction defines the sort order.


# REACT + REDUX = Connected Components
1. Create folders: src/actions, src/reducers, src/store, src/selectors (queries to redux store)
2. Break all code from one big file (lessons/redux-expensify.js) into multiple small files in separate folders
3. file: actions/expenses.js - for all action generators for expenses + import UUID + export named actions (no default export)
4. file: actions/filters.js - like for expenses, but filters has no dependencies
5. file: reducers/expenses.js - for Expenses Reducer, export default (one reducer here), without dependencies
6. file: reducers/filters.js - like for expenses
7. file: selectors/expenses.js - one selector, so we export it as default. no dependencies
8. file: store/configureStore.js - createStore() goes hee, export default + import Redux as dependency and two reducers from /reducers
8.1. we have to move "const store = createStore()" to an arrow function (to fire this function somewhere else, when we want to set a store) and export this new function. We can't invoke variables, so it have to be closed inside a function.
9. Change webpack.config.js back to "entry: './src/app.js'" & restart a dev-server
10. Import src/store/configureStore.js inside /src/app.js and save result of "configureStore()" in "const store". With it we have access to Redux methods (dispatch, getStore, subscribe)

**Higher Order Components** - reusable components to render another components inside them (pattern)
(more about HOC in file lesson/higherOrderComp.js)

11. instal module react-redux: yarn add react-redux
https://redux.js.org/basics/usage-with-react
12. import { Provider } from 'react-redux // import it as a component, just below react-dom
13. save in variable <Provider> component with main app component <AppRouter /> , render it in ReactDOM. Provider component provides Store / Data Tree to other components.
14. inside components/ExpenseList.js import { connect } from 'react-redux'
15. use connect(function with props to pass)(componentName) to pass props from Store to Component.
This component will be re-rendered when data change in a store (state changes in State Tree).
This **connected component** don't need state.subscribe or state.getState to use data from a State tree. It is a presentational component (present a data, use JSX tags)

**Presentational and Container Components**:
https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

**Controlled Input** - input with value controlled by JS/React

**Validation** - **RegEx = Regular Expressions**
Great generator, tester and library of ready to use RegEx: https://regex101.com/


**React & Date: Moment() + Airbnb DatePicker**
in components/ExpenseForm.js

1. http://www.momentjs.com library to Parse, validate, manipulate, and display dates and times in JavaScript.
> npm install moment --save
> yarn add moment
Queries: https://momentjs.com/docs/#/query/is-same-or-before/
i18n: https://momentjs.com/docs/#/i18n/changing-locale/

2. http://airbnb.io/react-dates/ library to Pick a date from a calendar (time is not supported)
Supports also date range. https://github.com/airbnb/react-dates
Other library to pick date and time: https://github.com/YouCanBookMe/react-datetime
<SingleDatePicker /> - for picking one date
<DateRangePicker /> - for picking range of dates


**REDUX CHROME EXTENSION**
https://github.com/zalmoxisus/redux-devtools-extension
https://chrome.google.com/webstore/detail/redux-devtools
Great tool to use REDUX (and other apps using state)
1. Install it in Chrome
2. Inside configureStore.js in "const store = createStore()" add:
> window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

