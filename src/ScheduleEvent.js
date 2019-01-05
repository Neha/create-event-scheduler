import React, { Component } from "react";
import EventDetail from "../src/EventDetails";
import updateEventList from "./actions/updateEventList";
import { connect } from "react-redux";

class ScheduleEvent extends Component {
  constructor() {
    super();
    this.state = {
      flag: false,
      totalCharCount: 200,
      charLeft: 0,
      display: "hidden",
      displayCharError: "hidden",
      formErrors: {
        eventName: "",
        eventDetail: "",
        eventDate: "",
        eventTime: ""
      },
      data: {
        eventName: "",
        eventDetail: "",
        eventDate: "",
        eventTime: ""
      }
    };
  }

  handlePress = e => {
    let detailCharCount = this.state.data.eventDetail.length;

    this.setState({
      charLeft: detailCharCount
    });

    if (detailCharCount === this.state.totalCharCount) {
      e.preventDefault();
      this.setState({
        displayCharError: "show"
      });
    }
  };

  handleChange = e => {
    let newdata = { ...this.state.data };
    if (e.target.value !== "" || e.target.value !== undefined) {
      newdata[e.target.name] = e.target.value;

      this.setState({
        data: newdata
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.data.eventName !== "" && this.state.data.eventDate !== "") {
      this.setState(
        {
          flag: true,
          data: {
            eventName: this.state.data.eventName,
            eventDetail: this.state.data.eventDetail,
            eventDate: this.state.data.eventDate,
            eventTime: this.state.data.eventTime
          }
        },
        () => {
          this.props.updateEventList(this.state.data);
        }
      );
    } else {
      if (this.state.data.eventName == "") {
        this.state.formErrors["eventName"] = "Name cant be blank";
      }
      if (this.state.data.eventDate == "") {
        this.state.formErrors["eventDate"] = "Date cant be blank";
      }
      if (this.state.data.eventTime == "") {
        this.state.formErrors["eventTime"] = "Time cant be blank";
      }
      if (this.state.data.eventDetail == "") {
        this.state.formErrors["eventDetail"] = "Details cant be blank";
      }
      let newFormErrors = { ...this.state.formErrors };
      this.setState({
        formErrors: newFormErrors,
        display: "show"
      });
    }
  };

  resetForm = e => {
    this.setState({
      flag: false,
      data: {
        eventName: "",
        eventDetail: "",
        eventDate: "",
        eventTime: ""
      }
    });
  };
  render() {
    return (
      <div>
        {!this.state.flag && (
          <form>
            <label>Event Name</label>
            <input
              type="text"
              name="eventName"
              placeholder="Enter Event Name"
              value={this.state.data.eventName}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <div className={this.state.display}>Name can't be blank</div>
            <label>Event Date</label>
            <input
              type="date"
              name="eventDate"
              value={this.state.data.eventDate}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <div className={this.state.display}>Pick the right date</div>
            <label>Event Time</label>
            <input
              type="time"
              name="eventTime"
              value={this.state.data.eventTime}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <div className={this.state.display}>Pick the right time</div>
            <label>Event Details</label>
            <textarea
              name="eventDetail"
              placeholder="enter details"
              value={this.state.data.eventDetail}
              onChange={e => {
                this.handleChange(e);
              }}
              onKeyPress={e => {
                this.handlePress(e);
              }}
            />
            <div className={this.state.display}>Details can't be blank</div>
            <p>
              {this.state.charLeft} / {this.state.totalCharCount}
            </p>
            <div className={this.state.displayCharError}>
              You have crossed the limit
            </div>
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
          <EventDetail data={this.props.eventData} reset={this.resetForm} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventData: state.updateEventList
  };
};

export default connect(
  mapStateToProps,
  { updateEventList }
)(ScheduleEvent);
