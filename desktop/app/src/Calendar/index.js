import React, { Component } from "react";
import "Calendar/css/index.css";

class Calendar extends Component {
  render() {
    return (
      <div className="calendar">
        <a className="left-button" /> Календарь <a className="right-button" />
      </div>
    );
  }
}

export default Calendar;
