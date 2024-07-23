# Quiz Application

## Overview

This React-based quiz application allows users to answer multiple-choice questions within a time limit. It features a home page to start the quiz, a quiz page to answer questions, and a results page to view scores and time consumed. Additionally, it includes user authentication with registration and login functionalities, different user types, and a logout feature.

## Features

- **Home Page**: Introduces the application and includes a button to start the quiz. Displays a loading indicator during navigation.
- **Quiz Page**: Presents questions with multiple-choice options, a countdown timer, and a submit button.
- **Results Page**: Shows the user's score, whether they passed or failed, and the total time consumed.
- **Navbar**: A navigation bar with links to various sections and a login/logout button.
- **Loading Indicator**: Displays a message indicating that the quiz is starting.
- **User Authentication**: Registration and login functionalities with two user types—Student and Instructor.
- **Logout**: After logging in, the user can view their details and has the option to log out, which will route them back to the login page.

## Technologies

- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Bundler**: Vite
- **Backend**: Node.js with Express
- **Database**: MongoDB

## Components

### `Home`

- Displays an introductory banner and a button to start the quiz.
- Handles navigation to the quiz page and displays a loading indicator during transitions.

### `Quiz`

- Fetches quiz questions from a JSON file.
- Manages user answers, score calculation, and quiz timing.
- Displays results and allows the user to restart the quiz.

### `QuizHeader`

- Displays a countdown timer and a reminder of the time limit and number of questions.

### `Loading`

- Shows a loading overlay with a message indicating that the quiz is starting soon.

### `Login`

- Provides functionality for user login and registration.
- Includes two user types: Student and Instructor.
- Manages authentication state and navigates users to the home page upon successful login or registration.
- Shows user details upon logout and routes back to the login page.

### `Navbar`

- Displays navigation links and a login/logout button.
- Shows user details and provides the option to log out, which routes back to the login page.

## Author

- **Name**: Brian Mwangi
- **Email**: brian55mwangi@gmail.com
