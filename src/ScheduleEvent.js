import React, { Component } from "react";
import EventDetail from "../src/EventDetails";
import updateEventList from "./actions/updateEventList";
import {connect, Provider} from "react-redux";

class ScheduleEvent extends Component {
  constructor() {
    super();
    this.state = {
      flag: false,
      data : {
        eventName: "",
        eventDetail: "",
        eventDate: "",
        eventTime: "",
      }
    };
   
  }
  

  handleChange = e => {
    let newdata = {...this.state.data};
   
    if (e.target.value === "" || e.target.value === undefined) {
    } else {
      newdata[e.target.name] =  e.target.value
     
      this.setState({ 
        data : newdata
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.data.eventName === "" && this.state.data.eventDetail === "") {
    } else {
      this.setState({
        flag: true,
        data : {
          eventName: this.state.data.eventName,
          eventDetail: this.state.data.eventDetail,
          eventDate: this.state.data.eventDate,
          eventTime: this.state.data.eventTime
        }
      },() => {
        this.props.updateEventList(this.state.data);
      });
      
  }
  
  
}

  resetForm = e => {
    this.setState({
      flag: false,
      data : {
        eventName: "",
        eventDetail: "",
        eventDate: "",
        eventTime: "",
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
              required
              onChange={e => {
                this.handleChange(e);
              }}
            />
             <label>Event Name</label>
            <input
              type="date"
              name="eventDate"
              value={this.state.data.eventDate}
              required
              onChange={e => {
                this.handleChange(e);
              }}
            />
             <label>Event Time</label>
            <input
              type="time"
              name="eventTime"
              required
              value={this.state.data.eventTime}
              onChange={e => {
                this.handleChange(e);
              }}
            />
             <label>Event Details</label>
            <textarea
              name="eventDetail"
              placeholder="enter details"
              value={this.state.data.eventDetail}
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
            data={this.props.eventData}
            reset={this.resetForm}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
 
  return {
    eventData : state.updateEventList
  }
}

export default connect(mapStateToProps, {updateEventList})(ScheduleEvent);
