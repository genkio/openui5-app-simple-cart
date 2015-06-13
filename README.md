openui5-app-shopping-cart
=========================

# Getting Started

1. Replace the sSheetsUrl variable value (util/Util.js line 11) with your own Google spreadsheet key (please refer to [this](https://github.com/j1wu/openui5-module-sheet-as-model) for more information on how to setup your Google spreadsheet).
2. Replace Mailgun API key and address (app.rb line 23) with your own [Mailgun](https://documentation.mailgun.com/quickstart-sending.html#send-via-api) account API key and address.

# Setting up with Git

1. Instantiate this directory as a git repository with "git init".
2. Go to github.com, create a new repository, then follow instructions on how to add a remote repository that links to github.
3. Remember, you have to "git add" changes to ready it for a commit, then "git commit" to commit those changes locally, then "git push origin master" to push it to the remote "origin" repository, which is the previously created github.com repository.

# Deploying to Heroku

1. Download the Heroku Toolbelt.
2. Go to Heroku.com and register.
3. Issue "heroku login" to authenticate, with the credentials from previous step. Make sure it's a git repository, by issuing "git init", and also "git add", "git commit" your files.
4. Then "heroku create" to create this app on heroku. This command also adds a "heroku" remote repository that you can push to.
5. To deploy, issue "git push heroku master".
6. Other helpful heroku commands:
  - heroku logs
  - heroku logs -t
  - heroku rename
  - heroku restart
  - heroku run console
  - heroku help