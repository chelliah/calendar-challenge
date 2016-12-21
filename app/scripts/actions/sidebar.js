import moment from 'moment';

export const getTimes = (start, end) => {
  /* Takes a start time and end time in hours and returns an array of half hour timestamps in that range*/
  var startTime, endTime;
  startTime = moment().set({'hour': start, 'minute': 0, 'second': 0}, 'millisecond': 0);
  endTime = moment().set({'hour': end, 'minute': 0, 'second': 0}, 'millisecond': 0);
  var halfHourArray = [];

  while(startTime <= endTime) {
    let newTime = moment(startTime);
    halfHourArray.push(newTime);
    startTime.add(30, 'minutes');
  }

  return halfHourArray;
}
