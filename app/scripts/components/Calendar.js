import React from 'react'
import {mapValues, values, sortBy, chain, last, map} from 'lodash'


const Calendar = () => {
    var isConflict = (previousEvent, nextEvent) =>
      /*
      does the next event start sometime after the previous event start
      time or sometime before the previous event end time?
      */
      nextEvent.start >= previousEvent.start && nextEvent.start <= previousEvent.end

    var findConflicts = (nextEvents, previousEvents = [], conflicts = 0) => {
      // base case: nextEvents is empty, return previousEvents
      if(nextEvents.length == 0) {
        console.log("returning")
        return previousEvents;
      }

      var currentEvent = nextEvents[0];

      // currentEvent.conflicts = currentEvent.leftShift = 0;
      var previousEvent = last(previousEvents);


      if (isConflict(previousEvent, currentEvent)) {
        // 1. track consecutive intersections via recursion (does current event intersect with the previous one, if so track it)
        conflicts += 1;
        currentEvent.leftShift = conflicts;
        previousEvents.push(currentEvent);
        return findConflicts(nextEvents.slice(1), previousEvents, conflicts);

      } else if (conflicts > 0) {
        // 2. when incrementor is broken, apply conflictTracker number to all
        conflicts += 1;
        previousEvents = map(previousEvents, function(event) {
          if(event.conflicts == 0) {
            event.conflicts = conflicts
          }
          return event
        })
      }

      conflicts = 0;
      previousEvents.push(currentEvent);
      return findConflicts(nextEvents.slice(1), previousEvents, conflicts);
    }

    var events = {
          event1: {start: 60, end: 120},  // an event from 10am to 11am
          event2: {start: 100, end: 240}, // an event from 10:40am to 1pm
          event3: {start: 130, end: 270}, // an event from 10:40am to 1pm
          event4: {start: 700, end: 720}  // an event from 8:40pm to 9pm
      }
    var eventsArray =
      /*
        I want to operate on these events in a collection, as opposed to a large object, the steps of data manipulation are:
        1. map keys as an attribute to each object
        2. extract values into a collection
        3. sort objects in collection by their start date
      */
      chain(events)
      .mapValues(function(value, key) {
        value.eventName = key;
        return value ;})
      .values()
      .sortBy('start')
      .map(function(event) {
        //adds properties i want to use to determine placement (will be modified by findconflicts() function)
        // event.leftShift = 1;
        event.leftShift = event.conflicts = 0;
        return event;
      })
      .value()

   eventsArray = findConflicts(eventsArray.slice(1), [eventsArray[0]], 0)
   console.log(eventsArray)

    var getPercentage = (event) => {
      if (event.conflicts == 0) {
        return '0%'
      } else {
        return 100 / event.conflicts * event.leftShift + '%'
      }
    }
    var getWidth = (event) => {
      if (event.conflicts == 0) {
        return 600
      } else {
        return 600 / event.conflicts
      }
    }
    return (
      <div className="calendar">
        {map(eventsArray, function(event, index) {
          var left = getPercentage(event);
          var width = getWidth(event);
          var eventStyle = {
            width: width,
            height: event.end - event.start,
            backgroundColor: 'skyblue',
            top: event.start,
            left: left
          };
          return <div className="event" style={eventStyle} key={index}/>}) }
      </div>
    )
}


export default Calendar
