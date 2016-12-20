import React from 'react'

const Sidebar = () => {
    var hours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"]

    return (
        <div className="sidebar">
          <ul className="hours">
            {hours.map(function(name, index){
                    return <li className="hour" key={ index }>{name}</li>;
                  })}
          </ul>
        </div>
    )
}
export default Sidebar
