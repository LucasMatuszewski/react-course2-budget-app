# GIT

    GIT Flow:
    1. Untracked Files --> 2. Unstaged Changes --> 3. Staged Changes --> 4. Commits

1. Initialize a new repository for a project (in root folder of our project):
> git init
    Check a status of files in our repository:
> git status

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

## SSH Key - with GIT BASH