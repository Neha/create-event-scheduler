import React, { Component } from "react";
import EventDetail from "../src/EventDetails";

class ScheduleEvent extends Component {
  constructor() {
    super();
    this.state = {
      eventName: "",
      eventDetail: "",
      flag: false,
      eventDate: "",
      eventTime: ""
    };
  }
  handleChange = e => {
    if (e.target.value === "" || e.target.value === undefined) {
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.eventName === "" && this.state.eventDetail === "") {
    } else {
      this.setState({
        eventName: this.state.eventName,
        eventDetail: this.state.eventDetail,
        flag: true,
        eventDate: this.state.eventDate,
        eventTime: this.state.eventTime
      });
    }
  };

  resetForm = e => {
    this.setState({
      flag: false,
      eventName: "",
      eventDetail: ""
    });
  };
  render() {
    return (
      <div>
        {!this.state.flag && (
          <form>
            <input
              type="text"
              name="eventName"
              placeholder="Enter Event Name"
              value={this.state.eventName}
              required
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <input
              type="date"
              name="eventDate"
              value={this.state.eventDate}
              required
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <input
              type="time"
              name="eventTime"
              required
              value={this.state.eventTime}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <textarea
              name="eventDetail"
              placeholder="enter details"
              value={this.state.eventDetail}
              required
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <button
              onClick={e => {
                this.onSubmit(e);
              }}
            >
              Submit
            </button>
          </form>
        )}
        {this.state.flag && (
          <EventDetail
            name={this.state.eventName}
            detail={this.state.eventDetail}
            date={this.state.eventDate}
            time={this.state.eventTime}
            reset={this.resetForm}
          />
        )}
      </div>
    );
  }
}

export default ScheduleEvent;
