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

### CREATE NEW SSH KEYs with Github
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