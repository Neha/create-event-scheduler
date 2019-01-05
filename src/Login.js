import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Constant from "../src/constant";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      displayError: "hidden"
    };
  }

  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validateCredintials = e => {
    e.preventDefault();
    if (this.state.userName == "test" && this.state.password == "test") {
      this.props.history.push("/ScheduleEvent");
    } else {
      this.setState({
        displayError: "show"
      });
    }
  };

  render() {
    const {
      loginHeading,
      loginText,
      loginError,
      username,
      password,
      submit
    } = Constant;
    return (
      <div>
        <h2>{loginHeading}</h2>
        <p>{loginText}</p>
        <div className={this.state.displayError}>{loginError}</div>
        <form>
          <label>{username}</label>
          <input
            type="text"
            placeholder={username}
            name="userName"
            onChange={e => {
              this.onHandleChange(e);
            }}
          />

          <label>{password}</label>
          <input
            type="password"
            placeholder={password}
            name="password"
            onChange={e => {
              this.onHandleChange(e);
            }}
          />

          <button
            onClick={e => {
              this.validateCredintials(e);
            }}
          >
            {submit}
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
