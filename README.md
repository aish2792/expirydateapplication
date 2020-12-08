 <h1 align="center">unXpired: Mobile App</h1>

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
* [Using GitHub](#using-github)
	* [Cloning](#cloning)
	* [Open the application](#open-the-application)
		* [Prerequisites](#prerequisites)
		* [Execute](#execute)
			* [Client Side Execution](#client-side-execution)
			* [Server Side Execution](#server-side-execution)
		* [Troubleshooting](#troubleshooting)

## About the Project

This project brings you a mobile application for tracking expiration dates for food and medicine products by using a few technologies, including React Native, Django and REST. This allows us to store our items, their prices, and their expiration dates in persistent memory (and delete them once they are used or become expired), and enables cross platform use of our application for users of both iOS and Android. The application notifies us when an unused item is closing in on its expiration date, and again once the unused item becomes expired, telling us that it’s time to throw it in the trash. It also gives us insight on how much money we’ve wasted by allowing us to look back at the prices of items we’ve allowed to expire without use.

### Built with
* [React Native]([https://reactnative.dev/](https://reactnative.dev/))
* [Django]([https://www.djangoproject.com/](https://www.djangoproject.com/))
* [Redux Toolkit]([https://redux-toolkit.js.org/](https://redux-toolkit.js.org/))
* [REST api]([https://restfulapi.net/](https://restfulapi.net/))
* [SQLite]([https://www.sqlite.org/index.html](https://www.sqlite.org/index.html))

## Getting Started

Following are the instructions for running the code:

 1. Using GitHub

## 1.	Using GitHub:
For cloning the project repository from the GitHub repository on to your local repository, you must follow the given steps.

### Cloning 
 1. Navigate to the GitHub repo on the GitHub Page ([https://github.com/aish2792/expirydateapplication](https://github.com/aish2792/expirydateapplication))
 2. Click on the 'Clone or download' option, or copy the URL (https://github.com/aish2792/expirydateapplication.git)
 3. Open the Git Bash terminal on your desired directory.
 4. Enter the command `git clone https://github.com/aish2792/expirydateapplication.git`.

## Open the application

### Prerequisites
 1. Before running the project, you need to install all the dependencies and start a certain emulator to test the project. In order to do so you must follow the steps as shown:
	1.	Run `npm i` to install node packages.
	2.	Install CocoaPods links: `cd ios && pod install && cd ..`
	3.	Run `cd android && ./gradlew clean && cd ..`

### Execute
#### Client Side Execution
1.	In	a terminal window, please navigate to the `cd expirydateapplication/client/` directory and enter the following command:
```
> npm start
```
2.	Open a new terminal tab in the same directory and run the following commands:
```
> npm run ios
```
or
```
> npm run android
```
#### Server Side Execution
1.	In	a terminal window, please navigate to the `cd expirydateapplication/server/` directory and enter the following command:
```
> python3 manage.py runserver
```

### Troubleshooting
If you get errors you may need to check for new packages:

1.	Run `npm i`

2.	For iOS:
Run `cd ios && pod install && cd ..`

3.	For Android: 
  Run `cd android && ./gradlew clean && cd ..`

#### How to see the different iOS simulator options
1.	`xcrun simctl list devices`

2.	`npx react-native run-ios --simulator="iPhone SE"`

#### How to see the different Android simulator options
1.	To view available emulators: `emulator –list-avds`

2.	To start an emulator: `emulator -avd <name>`

3.	Finally execute: `react-native run-android`
