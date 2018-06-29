const path = require('path'); //Node method to get a root path to a folder where this file is (depending on a computer/server where it is)
const express = require('express');
const app = express();
//create a absolute path to a directory with our public folder:
const publicPath = path.join(__dirname, '..', 'public'); // (this file directory, go 1 upp, folder name)
// Env variable - if it exist (e.g. on Heroku) we will take its value as a port number to listen
const port = process.env.PORT || 3000; // if Env.PORT don't exist we will use port 3000 (for localhost / development environment)

// Set default folder with static files for our app
app.use(express.static(publicPath));
// if we have index.html file in /public directory, it will be used by default
// (files with name "index" always are used by default)

// Express Routes:
app.get('*', (req, res) => { // * for all urls
    res.sendFile(path.join(publicPath, 'index.html'));
    // REACT Router will take URL automatically!!! :)
});

// we can use ES6 ARROW FUNCTIONS in node.js too:
app.listen(port, () => {
    console.log('server is listening on port: 3000');
});

// Now we can start a server in console:
// > node server/server.js
// NOT /server/server.js ('/' refers to root directory = c:/)