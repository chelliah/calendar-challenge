# Calendar Coding Challenge for Appcues
This is a calendar I created for the Appcues coding challenge. The description of the
challenge can be viewed [here](https://gist.github.com/gamache/fe436bf272c8f5a4d5b7af475297e45f).

This project was structured using a boilerplate template I created when learning Redux. Most of the logic
surrounding redux and state management has been removed for this challenge.

The core technologies I used to create this calendar were:
  React,
  ES6,
  HTML,
  SCSS/CSS,
  Axiom,
  Lodash,
  Moment.js


The logic solving part 1 of the challenge can be found in ```app/scripts/actions/calendar.js```.
There is documentation explaining some of the logic surrounding conflict scheduling but the general gist is:
  1. Sort events by start time
  2. Imagining an arbitrarily series of columns, for each event place it in the leftmost column where it doesnt conflict with another event that's already there. If there is a conflict, try again with the column to the right.
  3. For each of these events, now sorted into conflict-free columns, see what events in other columns occupy the same timeframe. Use the number of conflicts to determine the appropriate width for each event.

The API call used for part 2 can be found in ```app/scripts/components/Calendar.js```.

The styling for part 3 can be found in ```app/styles/*```

# Using this project

To use this project you can clone this repository or download a zip.
Then follow these instructions:

```
npm install
npm start
```

Navigate to ```localhost:3000``` in your browser to view the calendar.

To test this project follow these instructions:

```
npm install
npm test
```
