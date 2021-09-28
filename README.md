# Give Interactive Calculator

## Purpose

The purpose of this repo is to demonstrate a functioning calculator that can toggle between standard numbers and roman numerals.

## Functionality

A user interacts with the calculator by entering a first number, an operator, and then a second number. Once that is done, they can click the `=` button to view the result. At any time, the user can toggle between `standard number` mode and `roman numeral` using the mode checkbox at the top of the screen.

To clear the calculator and start over, the user can click the `C` button.

## Installation and Usage

1. Clone the repo (https://github.com/chrishuman0923/react_calculator.git)
2. Run `npm install`
3. Run `npm start`
4. View the app in your browser at http://localhost:3000

## Tech Stack

This calculator was designed using the following:

- CRA (Create React App) Boilerplate
- React.js
- Typescript
- SCSS

## Notes

This calculator has a few limitations:

- It is purposefully limited to a max range of -10,000 to 10,000 since this is a demo.
  - This can be altered by changing the values in the `constants.ts` file.
  - If a user enters a number outside the defined limit of the calculator, the calculator will display an error message.
- When in `roman numeral` mode, the calculator will only accept values greater than `0`.
  - Any attempt to perform calculations where the result is a value less than `0` will default back to `0`.
