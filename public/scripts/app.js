'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/********************
 * LIFECYCLE HOOKS (METHODS):
 * https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class
 * only Class based Components have this build in methods (Stateless Fun. Comp. are much faster because don't do many things, eg. watching state and lifecycle)
 * gives us option to take data from DB to render, and to save new data do DB on component state changes
 * We will use here "local storage" instead of Data Base.
 *
 * Lifecycle methods have specific names, eg. componentDidMount() (build in names like constructor() method)
 *  1. componentDidMount() - when component was rendered for first time
 *  2. componentDidUpdate() - when component state or prop values changed
 *  3. componentWillUnmount() - when component goes away (eg. when we switch pages and render something new)
 */

/*****************************
 * REACT COMPONENTS - 2 types:
 * 1. Statefull Class Components - ES6 Classes with states:
 *  class StateComponent extends React.Component {}
 * 2. Stateless Functional Components (for simple components without state, like <Header /> in this app)
 *      const StatelessFComp = (preps) => {}
 * (3.) Elements (not components) with JSX:
 *      const element = <h1>Hello {name}</h1>;
 * 
 * ******* BUILD COMPONENTS, NOT TEMPLATES *******
 * https://www.youtube.com/watch?v=x7cQ3mrcKaY
 * Components gives better separation of concerns, then templates (like EJS or Angular-style directives)
 * 
 * SEPARATION OF CONCERNS: Reduce coupling, increase cohesion.
 * 
 * Coupling - the degree to which each program module relies on each of the other modules
 *  (big coupling = change in one module leads to many changes in other modules)
 * 
 * Cohesion - the degree to which elements of a module belong together.
 * 
 * Templates sometimes use "View model" and mix LOGIC and VIEW (eg. colors) = Coupling.
 * DISPLAY LOGIC and MARKUPS (e.g. JS + HTML like in JSX) could be mixed. Its OK.
 * 
 * Templates separate technologies, not concerns. It's not good.
 * 
 * React Component = a highly cohesive building block for UIs, loosely coupled with other components.
 * Components are unit testable. They are units.
 * 
 * Only put display logic in your components. Keep components small. (don't write spaghetti code)
 * 
 * JSX - optional preprocessor to let you use HTML-like syntax (designers can contribute code)
 * JSX = accessibility of templates + the power of JavaScript.
 */

// Parent Component for whole app (replacing const jsx template):
var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
        _this.handleMakeDecision = _this.handleMakeDecision.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        _this.state = {
            // options: [] // instead of setting empty array, we can use here props.options and:
            // 1. set default value as empty string (after a component)
            // 2. send some values from parent component
            options: props.options
        };
        return _this;
    } /* , - you don’t need to put commas between class method definitions (unlike with objects) */

    /**************************************************************************************
     * STATE is similar to props, but it is private and fully controlled by the component.
     * 
     * PROPS             vs                     STATE
     * -an object                               -an object
     * -can be used when rendering              -can be used when rendering
     * -changes (from above) cause re-renders   -changes cause re-renders
     * -comes from above                        -defined in component itself
     * -can't be changed by component itself    -can be changed be component itself
     * 
     * 
     * Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn’t care whether it is defined as a function or a class.
     * This is why state is often called local or encapsulated.
     * State is not accessible to any component other than the one that owns and sets it.
     * BUT a component may pass its state down as PROPS to its child components:
     * <ChildComp date={this.state.date} />
     **************************************************************************************/

    /**
     * ***** LOCAL STORAGE *****
     * save data during a session, keeps data after page reload. But lose data after live-server reload.
     * 
     * WORKS ONLY WITH STRING DATA! Converts numbers to a string.
     * We can convert it back to a number with number() or parsInt()
     * 
     * localStorage.setItem('name', 'value');
     * 
     * localStorage.getItem('name'); // returns: value
     * 
     * localStorage.removeItem('name');
     * 
     * localStorage.clear() //remove all items in storage
     * 
     * It's easier to work with objects and arrays.
     * Best way is to use JSON:
     * 
     * let data = JSON.stringify({ age: 26 }); // returns string representation of {age:26} object
     * 
     * We save this string to a localStorage
     * 
     * JSON.parse(data) // converts a string to an object
     */

    // LIFECYCLE HOOKS (METHODS):


    _createClass(IndecisionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // typically used to fetch data, e.g. from DB, data storage
            // it could also set a timer and re-render component every x seconds, fetching new data.
            console.log('component did mount!');

            try {
                // try code block to succeed
                // FETCHING DATA FROM LOCAL STORAGE:
                var json = localStorage.getItem('options');
                if (json) {
                    //check if there are some data from dataStorage
                    var options = JSON.parse(json); //parse JSON string to an object
                    this.setState(function () {
                        return { options: options };
                    }); //update a state with data from storage on page refresh (we use shortcut in place of {options: options} === {options})
                }
            } catch (error) {
                //if try block does not succeed:
                console.error(error);
                //do nothing (there was some error)
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            // typically used to save data, eg. to DB
            console.log('component did update!');
            //we have access to new, updated values:
            console.log('new state:', this.state);
            console.log('new props:', this.props);
            //but we have also access to previous values:
            console.log('prevState:', prevState);
            console.log('prevProps:', prevProps);

            if (prevState.options.length !== this.state.options.length) {
                //save only on changes
                var json = JSON.stringify(this.state.options); //convert our state object to an JSON string
                localStorage.setItem('options', json); //save JSON string with a name 'options'
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            console.log('component will unmount - we would see it if we switch pages and render some new parent component');
            // It’s very important to free up resources taken by the components when they are destroyed (unmounted)
        }

        // We are defining a new Methods for the Class:
        // handleDeleteOptions(){
        //     this.setState(() => {
        //         return {
        //             options: []
        //         };
        //     });
        // }
        // REFACTOR - simpler version:

    }, {
        key: 'handleDeleteOptions',
        value: function handleDeleteOptions() {
            this.setState(function () {
                return { options: [] };
            });
            // => ({ RETURN OBJECT }) (with brackets)
            // => { FUNCTION BODY }
        }
    }, {
        key: 'handleDeleteOption',
        value: function handleDeleteOption(option) {
            console.log('delete:', option);
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (e) {
                        return e !== option;
                    }) //filter( ARROW FUNCTION without brackets )
                    // "e" stands for "element of array", but you could use any other name
                    //.filter() creates new array, won't change prevState object (never change it!!!)
                };
            });
        }
    }, {
        key: 'handleMakeDecision',
        value: function handleMakeDecision() {
            var randomNum = Math.floor(Math.random() * this.state.options.length);
            // 1. generate random number (between 0,000000000 - 1,00000000)
            // 2. multiply it by number of options (eg. for 3 options: 0,0021 * 3 = 0,0063)
            // 3. round it to integers (whole numbers) with Math.floor method
            var option = this.state.options[randomNum];
            alert(option);
        }
    }, {
        key: 'handleAddOption',
        value: function handleAddOption(option) {
            // we can't use "e" here, so we keep it as a method inside child component with a form and input
            //e.preventDefault(); // this is to prevent default submit function sending a form on button click
            //const option = e.target.elements.option.value.trim(); //trim() removes spaces from the end and beginning.

            //form validation:
            if (!option) {
                return 'Enter valid value to add option';
            } else if (this.state.options.indexOf(option) > -1) {
                //indexOf() search for value in an array and returns it position or -1 if not find.
                return 'This option already exists';
            } //return will stop a script so we don't need another "else"

            /* this.setState((prevState) => {
                //prevState.options.push(option); //first method. It works, but we should NOT change prevState !!! (push() will change it)
                // concat() does not change the existing arrays, but instead returns a new array:
                return {
                    options: prevState.options.concat(option)
                };
            }); */
            //REFACTOR - SIMPLER VERSION (we can make 1 line version, or 3 lines for better view):
            this.setState(function (prevState) {
                return {
                    options: prevState.options.concat(option)
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var app = {
                title: 'Indecision App',
                subtitle: 'Make decisions easier!'
                // options: ['sdad', 'dasda'] //we move it to the this.state (react component state)
            };

            // React Component Props - communication between components.
            // Sending data like in html attributes:
            return React.createElement(
                'div',
                null,
                React.createElement(Header, { title: app.title, subtitle: app.subtitle }),
                ' ',
                ' ',
                React.createElement(Action, {
                    hasOptions: this.state.options.length > 1,
                    handleMakeDecision: this.handleMakeDecision
                }),
                ' ',
                React.createElement(Options, {
                    options: this.state.options,
                    handleDeleteOption: this.handleDeleteOption
                }),
                ' ',
                React.createElement(AddOption, {
                    handleAddOption: this.handleAddOption,
                    handleDeleteOptions: this.handleDeleteOptions
                }),
                ' '
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

//DEFAULT PROPS VALUES for options:


IndecisionApp.defaultProps = {
    options: []
};

// FOR THIS SIMPLE COMPONENTS WE DON'T NEED STATES.
// SO WE CAN USE STATELESS FUNCTIONAL COMPONENTS:
/* class Header extends React.Component { //take feathers from parent class 'Component' of global class 'React'
    render() { // React Components requires special method 'render()'
        // in nested components we can access to data by 'this.props' object:
        // console.log(this.props)
        return (
            <div>
                <h1>{this.props.title}</h1> //STATELESS FUNCTIONAL COMPONENTS CAN'T USE "THIS" KEYWORD 
                <h2>{this.props.subtitle}</h2>
            </div>
        );
    }
} */

// SIMPLE STATELESS FUNCTIONAL COMPONENT (they are faster & easier to test):
var Header = function Header(props) {
    //they don't have access to "this" keyword, so we have to pass props as an argument
    return (
        // JSX STARTS HERE
        // This funny tag syntax is neither a string nor HTML.
        // Instead of artificially separating technologies by putting markup and logic in separate files,
        // React separates concerns with loosely coupled units called “components” that contain both.
        // React doesn’t require using JSX, but most people find it helpful as a visual aid when working with UI inside the JavaScript code.
        // It also allows React to show more useful error and warning messages.
        React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                props.title
            ),
            ' ',
            props.subtitle && React.createElement(
                'h2',
                null,
                props.subtitle
            ),
            ' '
        )
        // JSX ENDS HERE

    );
};

// Alternative syntax for Stateless Functional Component, without arrow function:
// function Header(props) {}

//DEFAULT PROPS for Header:
Header.defaultProps = {
    title: 'Default title' //we can set default value for title, and not for subtitle
};

/* class Action extends React.Component {
    render() { */
var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        ' ',
        React.createElement(
            'button',
            {
                disabled: !props.hasOptions,
                onClick: props.handleMakeDecision
            },
            'What should I do?'
        )
    );
};

/* class Options extends React.Component {
    render() { */
var Options = function Options(props) {
    var key = 0;
    return React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            null,
            props.options.length > 0 ? 'Your options:' : 'Add your options below:'
        ),
        React.createElement(
            'ul',
            null,
            props.options.map(function (option) {
                return React.createElement(Option, {
                    key: key++,
                    option: option,
                    handleDeleteOption: props.handleDeleteOption
                });
            })
        )
    );
};

/* class Option extends React.Component {
    render() { */
var Option = function Option(props) {
    return React.createElement(
        'li',
        null,
        props.option,
        React.createElement(
            'button',
            {
                //onClick={props.handleDeleteOption(props.option)} //fire function immediately on rendering
                onClick: function onClick(e) {
                    return props.handleDeleteOption(props.option);
                } //fire on onClick event (because of this callback arrow function)
            },
            'delete'
        )
    );
};

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    /* //NOW WE USE METHODS FROM PARENT COMPONENT, so we don't need this:
        constructor(props){
            super(props); //take object 'props' from parent class React.Component
            this.handleDeleteOptions = this.handleDeleteOptions.bind(this); //every time we use this.handleDeleteOptions inside this Class, bind it with 'this' from local context.
        }
        // We are defining a new Methods for the Class:
        handleDeleteOptions(){
            alert('options: ' + this.props.options); //wont work by default - we have to bind(this) to use it inside render()
            //this.props.options = []; //don't work. this.props.options is read only. We can't change it.
            
            //render() //in Components we don't have to re-render on data changes.
            //We use ***COMPONENT STATE***, and it takes care of re-rendering on data changes.
            // 1. We set a default state object with default values for this component
            // 2. Component rendered first time using this default state values
            // 3. Event changes a default state values
            // 4. Components re-rendered automatically using new state values
        }    
        */
    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    _createClass(AddOption, [{
        key: 'handleAddOption',
        value: function handleAddOption(e) {
            //we keep this method here, because we can't use "e" inside parent component
            e.preventDefault(); // this is to prevent default submit function sending a form on button click
            var option = e.target.elements.option.value.trim(); //trim() removes spaces from the end and beginning.
            var error = this.props.handleAddOption(option); //we send option from a form to a method from parent constructor
            //handleAddOption method will return Error message from form validation. We handle with it with local component state
            /* this.setState(() => {
                return {
                    // error: error //if names are identical we can use shortcut with only one name:
                    error
                };
            }); */
            // REFACTOR - SIMPLER VERSION:
            this.setState(function () {
                return { error: error };
            });

            if (!error) {
                e.target.elements.option.value = '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddOption },
                    React.createElement('input', { type: 'text', name: 'option' }),
                    React.createElement(
                        'button',
                        null,
                        'Add Option'
                    )
                ),
                React.createElement(
                    'button',
                    { onClick: this.props.handleDeleteOptions },
                    'Remove all'
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

// If we use parent Component for a template we don't need a const jsx at all
/* const jsx = (
    <div>
        <Header />
        <Action />
        <Options />
        <AddOption />
    </div>
); */

// ReactDOM.render(jsx, document.getElementById('app'));

// we use Parent component in place of const jsx template:
// ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

// we could also send some data as props to main component, e.g. options:


ReactDOM.render(React.createElement(IndecisionApp, { options: ['option 1', 'option 2'] }), document.getElementById('app'));
