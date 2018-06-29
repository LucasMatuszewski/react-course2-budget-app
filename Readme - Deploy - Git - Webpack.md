# GIT

    GIT Flow:
    1. Untracked Files --> 2. Unstaged Changes --> 3. Staged Changes --> 4. Commits

1. Initialize a new repository for a project (in root folder of our project):
> git init

2. Add Untracked files and Unstaged Changes (in tracked files which have changed)
> git add FILE/FOLDER NAME
> Git add .

3. After Git add our files changes are Staged and ready to Commit
> git commit -m "MESSAGE"

We can commit with a shortcut:
> git commit -am "MESSAGE"
-a flag will automatically add all unstaged modified filles, but will not add new files (not tracked).


4. Commited files (many versions/commits from a past)


Working tree = your actual files we are working on in a project
Working tree clean = all changes commited

## .gitignore
add in this file names of folders and files to ignore, one in each line:
> node_modules
> coverage

## git STATUS & git LOG
Check a status of files in our repository:
> git status

Check log of recent commits
> git log



## SSH Key - with GIT BASH - Connect with Github.com
Using the SSH protocol, you can connect and authenticate to remote servers and services. With SSH keys, you can connect to GitHub without supplying your username or password at each visit.

On Windows this could not work in normal Command Line. Git bash could be used for this.

### CREATE NEW SSH KEYs with Github and use it
https://help.github.com/articles/connecting-to-github-with-ssh/

1. Check if you have SSH keys (in hidden folder ".ssh")
> ls -al ~/.ssh
ls = list files
-a = all (including hidden)
l = more detailed list
~ = shortcut for "USER DIRECTORY" (on my laptop = c:/Users/Samsung)

2.Open GIT Bash

3. Type it to create a new ssh key using the provided email as a label:
> ssh-keygen -t rsa -b 4096 -C "lucas.matuszewski@gmail.com"
-t = type of Key
rsa = one of types of SSH keys
-b = bits (how big file will be. Bigger = harder to crack)
4096 = number of bits
-C = Comment
"email" = used on github account

4. Accept a folder and name for a file (its better to use default "~/.ssh/id_rsa")

5. Dont set a password for this tutorial
https://help.github.com/articles/working-with-ssh-key-passphrases/

6. Check again:
> ls -al ~/.ssh
YOU HAVE NOW:
id_rsa = private key (secure it, don't use it - its your password)
id_rsa.pub = public key to giv to other services


7. check if ssl-agent is running or start it:
> eval "$(ssh-agent -s)"
if it is running we will get Agent pid nr.

8. Add key to your agent to use it:
> ssh-add ~/.ssh/id_rsa

9. Copy SSH key to clipboard:
> clip < ~/.ssh/id_rsa.pub

10. Add SSH key in your github account in settings > SSH and PGP Keys

In terminal try to log in to Github using SSH:
> ssh -T git@github.com
type yes = you are connected and authenticated

### Add your new repository to github repository:
> git remote add origin git@github.com:LucasMatuszewski/react-course2-budget-app.git
origin = default name for main repository

> git remote
will show us name of remote repository (origin by default, but we can use other name)

> git remote -v
give some more information and address of our repository (fetch / push)

> git push -u origin master
to push our repository to github

> git push
SHORTCUT to push to default remote repository
(if our id_rsa SSH Key have a password, we have to type it, or we can configure ssh-agent to do it)



# Production Webpack
https://webpack.js.org/guides/production/ (more up to date instruction for newer version)

1. Use Webpack to make a new bundle.js and check its size:
> yarn run build (our script for: webpack --watch)

Our bundle is now 6.32 MB - huge. But most of it are SOURCEMAPS.
We will make it smaller for production :)

On development we want strong source mapping and localhost server with live reloading.

On Production our goal is to minify and optmize assets to improve load time.

2. In package.json add scripts:
>    "build:dev": "webpack --watch",
>    "build:prod": "webpack -p",

> yarn run build:prod
Our bundle is now 4.14 MB (better, but still not good)

3. In webpack.config.js move all your configs to a function:
> module.exports = (env) => {
>    return { all configs here }
> }

4. Add console.log('env:', env) to show environment variable (undefined).

5. We will change env in package.json by adding  --env production
>    "build:prod": "webpack -p --env production",

we dont have to use env for "development"

6. Set const in webpack.config.js
> const isProduction = env === 'production'; 

7. Now we can use turnery operators to do something if production is true:
devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map'

'source-map' takes a lot more time to build so is not good for development. But its better for production, because it is in external file (downloaded only if somebody will open DevTools). It will make our bunndle.js much lighter.

8. now our bundle.js is: 698 kB, and we have a new bundle.js.map (for DevTools) 3.96 MB.
> yarn run build:prod


# CSS styles outside a bundle.js

By default CSS is inside bundle.js and can be used only after bundle.js is downloaded.
Its better to have separate css files.

We use plugin **Extract text webpack** to extract something out of bundle.js
https://www.npmjs.com/package/extract-text-webpack-plugin
> yarn add extract-text-webpack-plugin -D

We still going to import CSS/SCSS files inside app.js but with this plugin Webpack will move it to separate files and we can import it on production inside <link> Tag at public/index.html

We have to require this plugin inside webpack.config.js and add new module and plugin lines.

After this just run:
> yarn run build:prod

and we get compiled 4 files:
bundle.js = 676kB
styles.css = 15.9 kB // We can load it with HTML before JS to give users faster page load
bundle.js.map = 3.87 MB
styles.css.map = 87 bytes


## A Production Web Server with Express

Live-server or webpack-dev-server are not good for production. They have many thinks for development.
How to serve our app (index.html) to clients on production server (like on Heroku or MyDevil.net ?)

We need to write own small server-side app with Express and Node.js, with will serve our index.html file by routing.
https://expressjs.com/en/4x/api.html

1. Create a new folder and file in root folder of our app:
> /server/server.js

2. install Express:
> yarn add express

3. require express to /server/server.js and write simple app to serve our index.html file

    NODE SYNTAX TO IMPORT FILES/MODULES (ES5):
    > const express = require('express');

    REACT SYNTAX TO IMPORT FILES/MODULES (ES6):
    > import React from 'react';

4. ow we can start a server in console:
> node server/server.js

5. Main page will work, and we can change pages by react routes.
But if we will try to refresh or access directly some url:
http://127.0.0.1:3000/create
we will see error in console and on a screen:
> Cannot GET /create

Its because by default server is using Express/Node Routes, and there is no /public/create directory
We have to tell server to serve index.html for all routes / URLs and pass URL /create to React Router

6. Make a default ROUTE (*) in Express to always sed index.html file


# HEROKU
very easy, without administration knowledge.
We can do everything using Heroku CLI.

1. Install CLI:
https://devcenter.heroku.com/articles/heroku-cli#download-and-install

2. Check if it is installed and running in command line / terminal:
> heroku --version

3. Login to Heroku (if you are not already logged in)
(on windows we have to use command line, NOT working on git bash)
> heroku login
use email and password

4. Create new App on Heroku:
> heroku create name-of-app

we get URL to our app and a GIT repository:
https://udemy-react-2-budget.herokuapp.com/ | https://git.heroku.com/udemy-react-2-budget.git

5. GIT repository is automatically ADDED to our REMOTE repositories!!! :)
> git remote -v

6. Change server.js file to work on heroku Environment:
Set listen port to work on Heroku - we need dynamic Environment port (if env.PORT exist) or default port (if env don't exist):
> const port = process.env.PORT || 3000;

7. add start script in package.json to tell Heroku haw to start a server:
> "start": "node server/server.js"
Now not only Heroku can use this script, but we can too :)
> yarn start
> npm start


7. **Teach Heroku how to run WEBPACK**
Node_modules folder is in .gitignore - so it wont be send to heroku server on Commit.
Heroku will install all dependencies (regenerate this folder) basing on package.json and yarn.lock

The same thing is with: bundle.js, bundle.js.map, styles.css and styles.css.map
They should be regenerated by Heroku on a server, not commited by us.

ON HEROKU:
Webpack will use Production Build

ON DEVELOPMENT / LOCAL:
Webpack will use Development Build

Just use Heroku script to tell it what to do after Building our app (installing dependencies):
> "heroku-postbuild":  "yarn run build:prod"
Heroku will use yarn tu run our build:prod script: "build:prod": "webpack -p --env production"

(we can also use "heroku-prebuild" to do something before building // like Pre-CSS ???)

8. Add to .gitignore files which would be generated by Heroku on a server:
public/bundle.js, public/bundle.js.map, public/styles.css and public/styles.css.map

9. NOW WE CAN COMMIT to Heroku and GITHUB :)
> git push (by default it use "origin" remote and master branch)
> git push heroku master

Heroku is now installing our dependencies, run build:prod and so on.
First time its slow. Next time Heroku will cached many files.

## ERROR: Build failed
## remote:  !     Two different lockfiles found: package-lock.json and yarn.lock
## We have to use only one package manager...

Now it's possible, that some dependencies would not be in yarn.lock....... it could not work...
There is to many of dependencies to check it manually....
I will use yarn.lock and delete package-lock.json (I will have a copy in GIThub repo)
I have to add changes and commit again (Heroku use GIT). Next we push to heroku.

10. We can use our app :)
https://udemy-react-2-budget.herokuapp.com/

HEROKU LOGS - to check for some errors to debug.
> heroku logs


# DevDependencies vs (Production) Dependencies

We don't want to instal on Heroku for Production all dependencies. Heroku will use only some of them.
W should use as DevDependencies:
- enzyme - only for testing, we do tests locally on development
- enzyme-to-json
- jest
- live-server (we will not use it any more on dev too. We have Webpack-Dev-Server)
    - remove also script "serve" for live-server
- react-test-render
- webpack-dev-server


**IMPORTANT:**
Babel, webpack and loaders for css/scss should be installed on Heroku, because we wont to build our app on a server. I have them in DevDependencies on my package.json, so Heroku should not install them (and heroku didn't - I checked in node_modules on Heroku server). BUT HEROKU USED BABEL AND WEBPACK NORMALLY on git push and builded app with them! Did it use Globally installed instances of this dependencies??? DO WE REALLY NEED THEM LOCALLY ON APP DEPENDENCIES? We don't have a control over version of Webpack/Babel which is used to build our App, so maybe thats why we should use locally installed versions, to have control and to lower risk of bugs.


TO INSTALL ONLY PRODUCTION DEPENDENCIES after cloning a project use in terminal:
> yarn install --production
(we usually install all dependencies locally, and production dependencies on a server)



## /public/dist/ or /public/assets/ directory for css and js files
To make it more clear its better to move bundle.js and styles.css with their maps from public to public/dist/. We have to set this directory on index.html in tags <link> and <script>.

And we have to change it in webpack.config.js:
> output: { path: path.join(__dirname, 'public', 'dist'), ... } // join public + dist = public/dist
> devServer: { ..., publicPath: '/dist/' }
https://webpack.js.org/configuration/dev-server/#devserver-publicpath-
The bundled files will be available in the browser under this path (by default the publicPath is "/")

We don't need to create this directory. Webpack will do it on Build.
DevServer don't create real production assets so it won't create this files in dist directory, but it will simulate them in this directory (we can check on Chrome DevTools)

Popular names for this directory are:
/assets
/dist
/styles + /js (but probably not with React and Babel)

Now we can set in **gitignore** file only a directory containing all files to ignore:
public/dist

We can check if everything still works:
> yarn run build:prod
> yarn start // shortcut for: > yarn run start
and check on localhost/3000

If everything is fine, we can commit with a shortcut:
> git commit -am "MESSAGE"
-a flag will automatically add all unstaged modified filles, but will not add new files (not tracked).



# Libraries / Modules:
for number formating: http://numeraljs.com
    for i18n: http://numeraljs.com/#locales
for date formating: https://momentjs.com/

But why to use this modules ???
**toLocaleString** and **toLocaleDateString** works fine.
Why Udemy instructor used external libraries?
It only make a bundle.js bigger...