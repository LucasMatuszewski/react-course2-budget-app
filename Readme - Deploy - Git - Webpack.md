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

