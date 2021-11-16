# OTP by Email for Vlocity OmnniScript
Simple OTP by Email for embedding into OmniScripts.

## Overview
This is a node.js app generating a one time passcode and sending by Email using nodemailer. The intent for this app is to be used in a Vlocity OmniScript for user acknowledgement of document reviews. Current support for app runtime is local and Heroku only.

Node version is specified but you may change from the [package.json][1]. Build artifacts are ignored by version control using [.gitignore][2]. OmniStudio tools are available in the [omnistudio][3] folder.

## Prerequisites
We assume that you have:

1. [Node.js][4] and npm installed.
1. a [free Heroku account][5].
1. the [Heroku CLI][6].

## Running OTP by Email

### 1. Setup your local project

```zsh
# Clone this project onto your machine
git clone https://github.com/ThomasSmithIRE/otp_omniscript.git

# Change into the project
cd otp_omniscript/

# Install the dependencies
npm install
```

### 2. Run locally
```zsh
heroku local web
```
Your app should now be running on http://localhost:5000/.

### 3. Create your Heroku app
**Note: You need to deploy your local source code to Github before creating the Heroku app.**
```zsh
git add .
git commit -m "Added a Procfile."
heroku login
heroku create
```

### 4. Deploy to Heroku
```zsh
git push heroku main
```

### 4. Open Heroku app
```zsh
heroku open
```

## Contributing

### Issues and questions
Found a bug or have a question about this project? We'd love to hear from you!

1. Browse to [ThomasSmithIRE/otp_omniscript/issues][7]
1. Create a new issue
1. Select the `[x] examples` category

See you there and thanks for helping to improve OTP by Email for everyone!

[1]: https://github.com/ThomasSmithIRE/otp_omniscript/blob/main/package.json
[2]: https://github.com/ThomasSmithIRE/otp_omniscript/blob/main/.gitignore
[3]: https://github.com/ThomasSmithIRE/otp_omniscript/tree/main/omnistudio
[4]: https://nodejs.org/en/
[5]: https://signup.heroku.com/dc
[6]: https://devcenter.heroku.com/articles/heroku-cli
[7]: https://github.com/ThomasSmithIRE/otp_omniscript/issues/new
