import React from 'react'
import {map} from 'lodash'
import axios from 'axios'
import {formatEventsForDisplay} from '../actions/calendar'

var Calendar = React.createClass({
  getInitialState: function() {
    return {events: [],
            padding: 10,
            tableWidth: 600}
  },
  componentDidMount: function() {
    axios.get('https://appcues-interviews.firebaseio.com/calendar/events.json')
      .then(function(response) {
        this.setState({events: formatEventsForDisplay(response.data, this.state.tableWidth)});
      }.bind(this))
  },
  render: function() {
    return(
        <div className="calendar" style={{width: this.state.tableWidth + (2 * this.state.padding)}}>
          {map(this.state.events, function(event, index) {
            var eventStyle = {
              left: this.state.padding + event.leftShift,
              width: event.width,
              height: event.end - event.start,
              top: event.start
            }
            return(<div className="event" style={eventStyle} key={index}>
                      <h1 className="event--title">Sample Item</h1>
                      <p className="event--location">Sample Location</p>
                  </div>)
          }.bind(this))}
        </div>
    )
  }
})

export default Calendar
