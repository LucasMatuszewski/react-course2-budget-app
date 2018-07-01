
#Jest - Unit Test framework from Facebook, dedicated to React
Jest have all we need to test React and Node Apps (renderers, snapshots, coverage...)
Jest is a framework, not a library. It comes with a test runner, assertion library, and good mocking support. Jest is built on top of Jasmine.

Jest is best for React.js but we can test Vanilla JS with Jest too :)
Who use Jest? Facebook, Twitter, Airbnb, Spotify, New York Times.

Very good documentation: https://facebook.github.io/jest/


        Other popular Unit Test Frameworks / Test Runners:
        Jasmine, Mocha (for Node.js). Karma (for Angular).


## Instal and run Jest:
1. Install Jest locally for our app in Dev-dep:
> yarn add jest -D

2. In package.json add new script:
> "test": "jest" // (for normal mode)
> "test": "jest --watch" // (for watch mode = rerun tests on file changes)
We can run Jest in separate console and watch tests results during programming.

3. in console use on app folder:
> yarn test (shortcut from: yarn run test)
> npm test
We can leave jest without --watch in package.json and run special command:
> yarn test -- --watch //first -- corresponds to "yarn" and is empty.

**ERROR --watch --> --watchAll**
> --watch is not supported without git/hg, please use --watchAll
https://github.com/cosmin/git-hg

BUT --watch is working now.

4. add new folder and file (with extension NAME.test.js - Jest is looking for files with this extension, and detect them automatically):
> src/tests/add.test.js


## FLAGS:
--watch -> runs only tests relative to changed files
--watchAll -> runs all tests on eny change
-o --onlyFailures -> runs only failed tests
-u --updateSnapshot
--onlyChanged
--lastCommit -> Run all tests affected by file changes in the last commit made.
--coverage -> Indicates that test coverage information should be collected and reported in the output.
--changedSince -> Runs tests related the changes since the provided branch. If the current branch has diverged from the given branch, then only changes made locally will be tested.
example:
> yarn test --coverage --changedSince=master
https://medium.com/@stipsan/thats-for-changes-done-on-uncommitted-files-while-this-post-shows-you-how-to-do-it-for-changes-9312f4bae576


## Add new tests:
5. Add new test to our add.test.js file:
> test('DESCRIPTION WHAT WE ARE TESTING and WHAT SHOULD BE A RESULT', () => {
>     const result = add(3, 4); // example of function, we can test here
>     if(result !== 7) {
>         throw new Error(`You added 4 and 3. The result was ${result}. Expect 7`); //ERROR DESCR.
>     }
> });

6. in console type again:
> yarn test
(we get a result of a test, and time it takes)

7. We can set manually our own test end Error (like in point 5) but we can also use build in Jest Methods and throw automated errors:
https://facebook.github.io/jest/docs/en/api
https://facebook.github.io/jest/docs/en/expect
e.g.
> Expect(VARIABLE).toBe(number|string);

8. CLONE FOLDER/FILE STRUCTURE of your app inside tests folder:
> actions/expenses.js --> tests/actions/expenses.test.js
> reducers/expenses.js --> tests/reducers/expenses.test.js

9. To tests an component/function you have to import it to adecuate test file (with ES6/babel syntax):
> import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

10. make a test('test description', () => { functionToTest; assertion/expect; });
(assertion = twierdzenie)

__we don't have to import anything (Jest is global)__


**We can tell Webpack to Deploy only if all tests are passed.**

We can get Test Coverage % by adding: "--coverage" on the end of command:
> yarn test --coverage
or
> yarn jest --coverage

Jest is already configured when you use **create-react-app** or react-native init to create your React and React Native projects. Place your tests in a __tests__ folder, or name your test files with a .spec.js or .test.js extension. Whatever you prefer, Jest will find and run your tests.

integrates seamlessly with Babel and with TypeScript through ts-jest


**Fixtures** - Dummy Data, Test Data.
Set a folder/file: /tests/fixtures/expenses.js
and put your dummy data for tests there (it could be reused in many test files)


## Snapshot - testing components
https://facebook.github.io/jest/docs/en/snapshot-testing
Testing actions/reducers/selectors (functions) is different from testing components (JSX/renders).
We have to check if user interactions work correctly, when user click a button, set an endDate in calendar Date Picker etc.

We have to **virtually render** our component, to figure out what is rendered to user.
But we won't do it in a browser. We have to install React Library: **React-Test-Render**
https://www.npmjs.com/package/react-test-renderer
https://reactjs.org/docs/test-renderer.html

React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment. Essentially, this package makes it easy to grab a snapshot of the "DOM tree" rendered by a React DOM or React Native component without using a browser or jsdom.

1. Stop Jest. Instal React-Test-Render:
> yarn add react-test-renderer -D

2. Restart Jest

3. in tested Component add:
> import ReactShallowRenderer from 'react-test-renderer/shallow';
(example in: components/Header.test.js)

**Shallow Rendering** - render a component's first level only (shallow = płytki, powierzchowny)
With shallow rendering we don't see <Link> anchor tags or Child components in test.js.snap files.
(Good alternative for shallow rendering is **Enzyme** from Airbnb, supports Ref and Lifecycle)

**FullDOM Rendering** (default) - renders a component going inside children components, until it reaches a leaf component (View, Text, div, area,...)

4. Use .toMatchSnapshot() to ensure that value (current render) matches the most recent snapshot.
https://facebook.github.io/jest/docs/en/expect.html#tomatchsnapshotpropertymatchers-snapshotname

5. On first test run Jest makes new snapshots. On next tests it will compare Snapshot to current rendered JSX. If there are some differences test will FAIL.

6. When Snapshot Test fail we can:
a) repair a code (if there was some bug, misspell)
b) accept changes and make a new snapshot (press 'u' to update a snapshot)

**Snapshot** is a virtual copy of rendered HTML in one point of a time (the first time this test is run, Jest creates a snapshot file / image).
With snapshot tests we track if our UI (snapshot) does not change unexpectedly.
The test will fail if the change is unexpected (some bug), or the screenshot needs to be updated to the new version of the UI component. To Update press "u" after test, or in command type:
> yarn jest --updateSnapshot

We should review snapshots as part of code review process. Jest uses pretty-format to make snapshots human-readable.

### BEST PRACTICES for Snapshot Testing & Unit Testing:
1. Treat snapshots as code - **commit** them (GIT) and **review** them (pull request) as any other test or code in your project. Keeps snapshots readable, focused, short.

2. Tests should be deterministic - running the same test multiple times on a component that has not changed **should produce the same result every time**. So mock (oszukać, udawać, imitować) the Date.now() and similar methods to return a consistent value every time:
> Date.now = jest.fn(() => 1482363367071);

3. Use descriptive snapshot names - The best names **describe the expected snapshot content**, so use true expected values (e.g. surnames, dates etc.)

4. Use both Snapshot Testing AND **Unit Testing** (Jest have more than 20 assertions to use).

5. Snapshots should not be written manually - one of **test-driven development** principle is to write tests before you start write a code. It is OK with Unit Testing. But snapshots should be made after writing a code.

6. One Component = One Test (test each component separately with shallow render / Enzyme, split big components into many small == easy to read and test)

7. Avoid testing components and HoC (Higher Order Components) at the same time, export and test each component by separate.

8. For Prototype/MVP you don't need test coverage=100%, but on Production with 1000000s users it's very important to have tests for everything, to don't have a bug occurred for many users/clients.


# Enzyme (renderer) + Jest + React
Documentation: http://airbnb.io/enzyme/ | Github: https://github.com/airbnb/enzyme
Tutorial: https://www.codementor.io/vijayst/unit-testing-react-components-jest-or-enzyme-du1087lh8

**Enzyme is a testing library** to render the react component into the DOM and query the DOM tree. **Jest is a unit testing framework** and has a test runner, assertion library, and mocking support. Enzyme and Jest is complementary. Enzyme can be used within Jest.

Enzyme works only with React (Jest is more universal).
But could be used with other test runners, like Mocha, Jasmine, Karma, also directly with WebPack.

Enzyme is a **renderer** instead of react-test-render/shallow
(It have **much easier** & user friendly API)

Enzyme is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output. It wraps packages like React TestUtils, JSDOM and CheerIO to create a simpler interface for writing unit tests. It mimic jQuery API for DOM manipulation.

1. **Install Enzyme** (v3.0.0 in Udemy Course):
> yarn add -D enzyme enzyme-adapter-react-16 raf
    * adapter let us specify witch version of React we will test = smaller library, for one version
    * raf - (non obligatory) requestAnimationFrame polyfill for node and the browser. We need it only for this Udemy course, its not required by Enzyme to work).

2. Set up Enzyme in new file: src/test/setupTests.js and write in it:
> import { configure } from 'enzyme';
> import Adapter from 'enzyme-adapter-react-16';
>
> configure({ adapter: new Adapter() });
// This is ES6 version of syntax to config Enzyme.
// (we will configure it only once)

3. Configure Jest to use Enzyme:
In main/root folder of our app add new file (jest.config.json) with content:
{
    "setupFiles": [
        "raf/polyfill",
        "<rootDir>/src/tests/setupTests.js"
    ]
}


4. Change "Scripts" in package.json to:
> "test": "jest --watchAll --config=jest.config.json"

**package.json** vs **jest.config.js/json**
Having separate jest.conf.js will make it more consistent with karma.conf.js and protractor.conf.js way of setup. Also, package.json will be less cluttered. Shouldn't mix concerns inside package.json.
> BUT WHY ON UDEMY HE USE .json not .js ???
> Maybe to have an option to use Enzyme? (jest.config.js is used by Jest by default, without --config flag, but when we use a --config flag we have to use json format without Key "jest")
> It's different way then in docs: https://facebook.github.io/jest/docs/en/configuration


5. in unit test file (e.g. Header.test.js) import Enzyme Shallow:
> import { shallow } from 'enzyme';

6. Install **enzyme-to-json** - Snapshot test your Enzyme wrappers
    // By default snapshot from Enzyme is full of Enzyme properties, we don't need it.
    // We have to use enzyme-to-json library tu make snapshots with Enzyme
> yarn add enzyme-to-json -D

7. We can set enzyme-to-json to work as a **serializer** (recommended) automatically for all files.
Add to Jest configuration file (jest.config.json) new object:
> "snapshotSerializers": ["enzyme-to-json/serializer"]

    There is also an option to run enzyme-to-json only in one file (without just.config.json) or to use it as a helper with only one main function: toJson(wrapper). But its better to use it as serializer. Details: https://github.com/adriantoine/enzyme-to-json#advanced-usage


**EXPORT DEFAULT connect()()**
We can't make snapshot test for connected components (default export).
To make snapshot test for components with:
> export default connect()(COMPONENT_TO_CONNECT)
we have to add named export for a COMPONENT_TO_CONNECT:
> export const COMPONENT_TO_CONNECT = (props) => {}
For Snapshot Test we import by name this unconnected component:
> import { COMPONENT_TO_CONNECT } from '../../components/COMPONENT.js'
In the component we still have default export (so old exports will work).


## Mocking Libraries and Static/CSS files

**ERROR: .css files from node_modules**
Jest Snapshot Test throw "SyntaxError: Unexpected token" on ExpenseDash.js because its children component use react-dates _datepicker.css from node_modules. We have to Mock CSS Modules:
http://jestjs.io/docs/en/webpack#mocking-css-modules
https://github.com/facebook/jest/issues/3094 (similar problem)


**FAIL: Received value does not match stored snapshot**
For ExpenseForm.test.js we get Fail on:
    -       date={"2018-06-26T11:15:44.058Z"}
    +       date={"2018-06-26T11:16:03.798Z"}
It's because we use moment() to generate NOW Object for default createdAt value. Every time we run this test it use current moment.

We have to **Mock out moment()** = create a fake version of moment() library.
http://jestjs.io/docs/en/manual-mocks.html

1. Create a new folder: src/tests/__mocks__
2. Create a file with a name of Library you want to mock:
> src/tests/__mocks__/moment.js
3. In this file type: const moment = require.requireActual('moment'); to import it.
4. Make a new function moment() to mock functioning of real moment(), eg.
> export default (timestamp = 0) => {
>    return moment(timestamp);
> };


**TypeError: _moment2.default.locale is not a function**
Test suite failed to run, in ExpenseForm.js on:
> moment.locale('pl');
Webpack + Moment: https://github.com/webpack/webpack/issues/3128
I couldn't fix it so commented this code for a tests...


## Simulate user interaction - action handlers

1. inside a test, select some element of rendered page (like a button or form):
> wrapper.**find('ELEMENT')**
> wrapper.find('input[type="number"]');
http://airbnb.io/enzyme/docs/api/selector.html

2. On selected element use Enzyme method **Simulate(Event)**:
http://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html

3. We can check if after Event something changed, for example:
    a) expect(wrapper.state('NAME_OF_ELEMENT_IN_A_STATE').length).toBeGreaterThen(0);
        http://airbnb.io/enzyme/docs/api/ShallowWrapper/state.html
    b) expect(wrapper.state('error')).toBeUndefined();

4. If there are many elements fonded we can select witch one in array:
http://airbnb.io/enzyme/docs/api/ShallowWrapper/at.html
> wrapper.find('ELEMENT').at(INDEX_NR)


## TEST SPIES / MOCK FUNCTIONS - jest.fn 
Mock Functions let you spy on the behavior of a function that is called indirectly by some
other code, rather than just testing the output.
http://jestjs.io/docs/en/mock-function-api

EXAMPLES IN: ExpenseForm.test.js

> const onSubmitSpy = jest.fn(); // new spy
> onSubmitSpy(); // call new spy
> expect(onSubmitSpy).toHaveBeenCalled(); // check if spy was called

>    // Render Component with MOCKED onSubmit function (it will invoke a Spy):
>    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);

http://jestjs.io/docs/en/expect#tohavebeencalled
.toHaveBeenCalled()
.toHaveBeenCalledTimes(number)
.toHaveBeenCalledWith(arg1, arg2, ...)
.toHaveBeenLastCalledWith(arg1, arg2, ...)
.toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)


## PROPS from COMPONENTS
// We can select Component by its name:
wrapper.find('MyComponent')

We can access props from a selected Component:
http://airbnb.io/enzyme/docs/api/ShallowWrapper/prop.html

We can access props from rendered component:
> wrapper.prop('includedProp')


**wrapper.find('SingleDatePicker').prop('onDateChange')(now);**
**FAIL:** Method “props” is only meant to be run on a single node. 0 found instead.
For more recent version of react-dates they changed a 'SingleDatePicker' component name no longer works as a selector (they probably changed a real name for rendered component).
We have to find an alternative enzyme selector. For Example:
> find('withStyles(SingleDatePicker)') // Name generated in snapshot for this component
> find('[onDateChange]')



# How to make tests faster, and why its worth of time:
https://medium.com/shyp-engineering/speeding-up-javascript-test-time-1000x-460c528418e7

https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22

https://hackernoon.com/testing-react-components-with-jest-and-enzyme-41d592c174f



# TEST DRIVEN DEVELOPMENT
**Write tests FIRST**, before writing functionality (tests are like specification)
All **tests should Fail** before we write proper code.

We can't do it for snapshot tests.
But for some functions/components we can thing about cases when it could failed, and write test cases to check this, before we will start to write a real code.
It will help us to find possible bugs and problems before they will brake our app on production.

Example tests for list of trainers:
1. Should display Message No Trainers if there are no trainers to display
2. Should display one trainer's profile if there is only one
3. Should display list of 5 trainers if there are 5 trainers
4. Should display first 25 trainers if we have 100 000 trainers to display
5. Should display proper trainers if there is empty trainer object in array
6. Should display trainers from London if there is a filter for city: London
7. ...

You can try to refactor your code to make it more optimized. Yo have a reference: Tests must to pass


# REDUX Asynchronous Actions - TESTS with Redux Mock Store
We have to install a middleware to test Async Actions in Redux:
https://github.com/dmitry-zaets/redux-mock-store

It could test synchronous actions and middleware too


# IMPORTANT:
# I DIDN'T END THIS PART OF COURSE (SECTION 15):
# https://www.udemy.com/react-2nd-edition/learn/v4/t/lecture/7900264?start=0


# Creating a separate TEST DATABASE for Development