import {values, sortBy, map, mapValues, chain, forEach, some, size, flatten} from 'lodash'

var isConflict = (previousEvent, thisEvent) => {
  /*
  Checks if two events conflict, based on whether an events start time occurs
  sometime after the previous event start time, or sometime before the
  previous event end time?
  This conflict checker is indifferent to the ordering of events (either can start first)
  */
  let notSameEvent = previousEvent != thisEvent;
  let thisEventIntersect = thisEvent.start >= previousEvent.start && thisEvent.start <= previousEvent.end;
  let previousEventIntersect = previousEvent.start >= thisEvent.start && previousEvent.start <= thisEvent.end

  return notSameEvent && (thisEventIntersect || previousEventIntersect);
  }

var calculateWidth = (event, columnNum, columnMap) => {
  /*
  Takes in an event, and compares it to events in other columns.  If there are conflicts with any other events checked,
  we increase the ratio of subdivision (e.g. if columnDivisions is 4, event width is tableWidth/4) for that event.
  */
  let columnDivisions = 0;
  for(let i = columnNum; i < size(columnMap); i++) {
    let column = columnMap[i];
    for(let j = 0; j < size(column); j ++) {
      let conflictEvent = column[j];
      if(isConflict(event, conflictEvent)){
        return columnDivisions;
      }
    }
    columnDivisions += 1;
  }
  return columnDivisions
}


export const convertToArray = (events) => {
  /*
    converts object of events into an array, sorted by start time
    1. map keys as an attribute to each object
    2. extract values into a collection
    3. sort objects in collection by their start date
  */
  return chain(events)
  .mapValues(function(value, key) {
    value.eventName = key;
    return value ;})
  .values()
  .sortBy(['start', 'end'])
  .value()
}

export const getConflictMap = (events) => {
  /*
  solution for conflict sorting adapted from: http://stackoverflow.com/questions/11311410/visualization-of-calendar-events-algorithm-to-layout-events-with-maximum-width
  This function sorts events into an object, where each key is a column representing sequential conflict-free events.
  Each event is placed in the leftmost column where it does not conflict with any other events in that column.
  */

  let columns = {
    0: []
  }

  forEach(events, function(event) {
    let columnNumber = 0;
    while(some(columns[columnNumber], function(columnEvent) {return isConflict(columnEvent, event)})) {
      columnNumber += 1;
    }

    if(columns[columnNumber] == undefined) {
      columns[columnNumber] = [event];
    } else {
      columns[columnNumber].push(event);
    }

  })

  return columns;
}

export const getWidths = (columnMap, tableWidth) => {
  /*
  Loops through each event in each column, calling calculateWidth() to determine the width of each event.
  */
  var numColumns = size(columnMap);
  var pixelWidth = tableWidth;

  forEach(columnMap, function(column, columnNum) {
    forEach(column, function(event) {
      let widthRatio = calculateWidth(event, columnNum, columnMap);
      let width = widthRatio * pixelWidth / numColumns;
      event.width = width;
      event.leftShift = columnNum * width;
    })
  })

  return flatten(values(columnMap));
}

export const formatEventsForDisplay = (events, tableWidth) => {
  let toArray = convertToArray(events);
  let conflictMap = getConflictMap(toArray);
  return getWidths(conflictMap, tableWidth);
}
