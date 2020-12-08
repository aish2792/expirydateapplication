
# unXpired Mobile App

## Using this File

## Installation

1. Create a new folder and clone the project into it - https://github.com/aish2792/expirydateapplication.git
2. Run `npm i` to install node packages
6. Install CocoaPods links: `cd ios && pod install && cd ..`
7. Run `cd android && ./gradlew clean && cd ..`
8. Run `npm start` to start server
9. Open a new terminal tab and run `npm run ios` or `npm run android`

If you get errors you may need to check for new packages:
Run `npm i`, then

iOS:
Run `cd ios && pod install && cd ..`

How to see the different iOS simulator options

`xcrun simctl list devices`

`npx react-native run-ios --simulator="iPhone SE"`

Android:
Run `cd android && ./gradlew clean && cd ..`

## Submitting Code 

### 1. Create a Feature Branch

Each one of us will create a feature in a dedicated branch in their local repo.
(`yourName/featureName` )

`git checkout -b yourName/featureName master`

Create code and commit with a short yet detailed message. In the first commit of the
new branch it is useful to have a description of what the feature does.

> `git status`  
> `git commit -am "commit message"`

### 2. Push the Branch to Repo

First time:  
 `git push -u origin yourName/featureName`

All following times:  
 `git push`

Steps to follow:
```
git checkout yourName/featureName
git pull origin master
git merge master
```
