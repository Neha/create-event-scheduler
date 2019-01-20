//@flow

import * as React from "react";
import { Component } from "react";
import EventDetail from "../src/EventDetails";
import updateEventList from "./actions/updateEventList";
import { connect } from "react-redux";
import {
  eventNameError,
  eventDateError,
  eventTimeError,
  eventDetailsError,
  wordCount,
} from "../src/constant";
import Constant from "../src/constant";
const {pastDateError, sameDayError, commanError} = Constant;

type Props = {};

type State = {
  totalCharCount: number
};

class ScheduleEvent extends Component {
  constructor() {
    super();
    this.state = {
      flag: false,
      totalCharCount: wordCount,
      charLeft: 0,
      display: "show",
      displayCharError: "hidden",
      nameError: "",
      detailError: "",
      dateError: "",
      timeError: "",
      commanErrorMessage: commanError,
      submitButtonIntialStatus: true, 
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
      if (e.target.name == "eventName") {
        this.setState({
          nameError : "",
          data: newdata,
          commanErrorMessage : "",
        });
      }
      else if (e.target.name == "eventDate") {
        this.setState({
          dateError : "",
          data: newdata,
          commanErrorMessage : "",
        });
      }
      else if (e.target.name == "eventTime") {
        this.setState({
          timeError : "",
          data: newdata,
          commanErrorMessage : "",
        });
      }
      else if (e.target.name == "eventDetail") {
        let newDetailLength = e.target.value.length;
        if (newDetailLength > this.state.totalCharCount) {
          e.preventDefault();
          this.setState({
            displayCharError: "show",
            charLeft: newDetailLength,
            detailError : "",
            data: newdata,
          commanErrorMessage : "",
          });
        }
        else{
          this.setState({
            data: newdata,
            charLeft: newDetailLength,
            displayCharError: "hidden",
            detailError : "",
            commanErrorMessage : "",
          });
        }
      }
    }
  };

  dateValidator = date =>{
    let dateObj = new Date(date);
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth();
    let day = dateObj.getDate();
    let currentDate = new Date();
    if(currentDate.getFullYear()>year){
      return pastDateError;
    }
    else if(currentDate.getFullYear()==year){
      if(currentDate.getMonth()>month){
        return pastDateError;
      }
      else if(currentDate.getMonth()==month){
        if(currentDate.getDate()>day){
          return pastDateError;
        }
        else if(currentDate.getDate()==day){
          return sameDayError;
        }
        else{
          return "";
        }
      }
      return "";
    }
    return ""
  }

  handleOnblur = e => {
    if (e.target.value === "" || e.target.value === undefined) {
      if (e.target.name == "eventName") {
        this.setState({
          nameError : eventNameError,
          submitButtonIntialStatus : false,
        });
      }
      else if (e.target.name == "eventDate") {
        this.setState({
          dateError : eventDateError,
          submitButtonIntialStatus : false,
        });
      }
      else if (e.target.name == "eventTime") {
        this.setState({
          timeError : eventTimeError,
          submitButtonIntialStatus : false,
        });
      }
      else if (e.target.name == "eventDetail") {
        this.setState({
          detailError : eventDetailsError,
          submitButtonIntialStatus : false,
        });
      } 
    }
    else if(e.target.name == "eventDate"){
      let errorMessage = this.dateValidator(e.target.value)
      this.setState({
        dateError : errorMessage,
        submitButtonIntialStatus : false,
      });
    }
  };

  getSubmibuttonStatus = () =>{
    const {nameError,detailError,dateError,timeError,commanErrorMessage} = this.state;
    const {eventDate,eventDetail,eventName,eventTime} = this.state.data
    
    console.log("ifooooo",this.state)
    if(nameError || detailError || dateError || timeError  || !eventDate || !eventDetail || !eventName || !eventTime){
     return true;
    }
    return false;
    

      
  }

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
        this.state.formErrors["eventName"] = eventNameError;
      }
      if (this.state.data.eventDate == "") {
        this.state.formErrors["eventDate"] = eventDateError;
      }
      if (this.state.data.eventTime == "") {
        this.state.formErrors["eventTime"] = eventTimeError;
      }
      if (this.state.data.eventDetail == "") {
        this.state.formErrors["eventDetail"] = eventDetailsError;
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
    const {
      eventName,
      eventDate,
      eventTime,
      eventDetails,
      wordsLimitError,
      submit
    } = Constant;
    const {nameError,detailError,dateError,timeError, submitButtonIntialStatus, commanErrorMessage} = this.state;
    return (
      <div>
        {!this.state.flag && (
          <form>
            <label>{eventName}</label>
            <input
              type="text"
              name="eventName"
              placeholder={eventName}
              value={this.state.data.eventName}
              onChange={e => {
                this.handleChange(e);
              }}
              onBlur = {e => {
                this.handleOnblur(e);
              }}
            />
            <div className={this.state.display}>{nameError}</div>
            <label>{eventDate}</label>
            <input
              type="date"
              name="eventDate"
              value={this.state.data.eventDate}
              onChange={e => {
                this.handleChange(e);
              }}
              onBlur = {e => {
                this.handleOnblur(e);
              }}
            />
            <div className={this.state.display}>{dateError}</div>
            <label>{eventTime}</label>
            <input
              type="time"
              name="eventTime"
              value={this.state.data.eventTime}
              onChange={e => {
                this.handleChange(e);
              }}
              onBlur = {e => {
                this.handleOnblur(e);
              }}
            />
           <div className={this.state.display}>{timeError}</div>
            <label>{eventDetails}</label>
            <textarea
              name="eventDetail"
              placeholder="enter details"
              value={this.state.data.eventDetail}
              onChange={e => {
                this.handleChange(e);
              }}
              // onKeyPress={e => {
              //   this.handlePress(e);
              // }}
              onBlur = {e => {
                this.handleOnblur(e);
              }}
            />
            <div className={this.state.display}>{detailError}</div>
            <p>
              {this.state.charLeft} / {this.state.totalCharCount}
            </p>
            <div className={this.state.displayCharError}>{wordsLimitError}</div>
            <div className="show">{commanErrorMessage}</div>
            <button
              onClick={e => {
                this.onSubmit(e);
              }}
              disabled = {submitButtonIntialStatus||this.getSubmibuttonStatus()}
            >
              {submit}
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
