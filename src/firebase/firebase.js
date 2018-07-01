import * as firebase from 'firebase';
// * take all named export from 'firebase' module and add it to firebase object
// we can use now firebase.METHOD

// Install firebase node_module:
// > yarn add firebase

// OLD WAY TO ADD ACTIONS TO DB:
// import * as expensesActions from '../actions/expenses';
// We dont need it with firebase

// On firebase Project Overview click: Add to Web App,
// and past a code: var config = {OBJECT} (without <script> tags)
const config = {
    apiKey: "AIzaSyBCcvZ5gEVdDS8fB-_OAQ4e5e0cAkDsr8g",
    authDomain: "react-2nd-udemy.firebaseapp.com",
    databaseURL: "https://react-2nd-udemy.firebaseio.com",
    projectId: "react-2nd-udemy",
    storageBucket: "react-2nd-udemy.appspot.com",
    messagingSenderId: "665820001932"
};

// Start a connection:
firebase.initializeApp(config);

firebase.database().ref().set({
    name: 'Andrew Mead'
});