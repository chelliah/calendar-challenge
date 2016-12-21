import React from 'react'
import moment from 'moment'
import {getTimes} from '../actions/sidebar'

const Sidebar = () => {
    var hours = getTimes(9, 21);

    return (
        <div className="sidebar">
          <ul className="hours">
            {hours.map(function(moment, index){
                if (moment.minutes() == 0) {
                  return <li className="hour full-hour" key={ index }>
                    <span className="bold">{moment.format('h:mm')}</span>
                    <span>{moment.format('A')}</span>
                    </li>;
                } else {
                  return <li className="hour half-hur" key={ index }>{moment.format('h:mm')}</li>;
                }
            })}
          </ul>
        </div>
    )
}
export default Sidebar
