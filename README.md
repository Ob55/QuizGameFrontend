# Quiz Application

## Overview

This React-based quiz application allows users to answer multiple-choice questions within a time limit. It features a home page to start the quiz, a quiz page to answer questions, and a results page to view scores and time consumed.

## Features

- **Home Page**: Introduces the application and includes a button to start the quiz. Displays a loading indicator during navigation.
- **Quiz Page**: Presents questions with multiple-choice options, a countdown timer, and a submit button.
- **Results Page**: Shows the user's score, whether they passed or failed, and the total time consumed.
- **Navbar**: A navigation bar with links to various sections and a login button.
- **Loading Indicator**: Displays a message indicating that the quiz is starting.

## Technologies

- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Bundler**: Vite

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

auther
name:Brian Mwangi
email:brian55mwangi@gaml.com
