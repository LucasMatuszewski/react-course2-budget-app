// Higher Order Components (HOC)
// A component, that renders another component (regular component)
// GOALS of HOC: Reuse code, Render Hijacking, Prop manipulation, Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => ( //regular stateless component
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => { //normal function to render HOC
    return (props) => ( // HOC generating another component (passed as argument) + message
        <div>
            {props.isAdmin && <p>Warning Message - don't share it!</p> }
            {/* <WrappedComponent info={props.info} />  */} {/* OLD WAY TO DO IT */}
            <WrappedComponent {...props} /> {/* SPREAD OBJECT props. It could include many arguments */}
        </div>
    );
};

const AdminInfo = withAdminWarning(Info); //invoke this function to render HOC


//requireAuthentication - Challenge
const requireAuthentication = (WrappedComponent) => { // HOC are reusable and universal (many components can be passed in)
    return (props) => (
        <div>
            {props.isAuthenticated ? (
                <WrappedComponent {...props} />
            ) : (
                <p>Please, login</p>
            )}
        </div>
    );
};

const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<Info info="Details" />, document.getElementById('app')); // rendering regular component
// ReactDOM.render(<AdminInfo isAdmin={true} info="Details" />, document.getElementById('app')); // rendering HOC
ReactDOM.render(<AuthInfo isAuthenticated={true} info="Details" />, document.getElementById('app'));